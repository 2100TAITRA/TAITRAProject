// 列印公文功能模組
//	掛在nsEditor命名空間下
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1060804	Raymond		Raymond		1060579		歷史檢視用由封裝檔與AOLProccessData.xml計算過的保留簽核物件顯示
// 1061018	Raymond		Raymond		1060930		修正時戳顯示年時年超出職名章高度問題
// 1071009	Raymond		Raymond		-------		修正歷史檢視的列印分頁, 橫式附件頁面未旋轉90度問題
// 1071024	Raymond		Raymond		-------		修正歷史檢視的列印分頁, 附件頁面大小超過A4時, 在IE下會超出頁面範圍被截斷的問題
// 1080214	Raymond		Raymond		1080179		修正.load()改為.bind("load") for 弱掃
// 1080321	Raymond		Raymond		1080224		修正貼式文字意見若折行數超過2行, 在列印貼式文字意見及數位墨水簽核物件頁面會呈現只折成2行的問題
// 1080322	Raymond		Raymond		1080226		修正橫式影像寬度非A4高度時, 影像轉直後偏右造成超出頁面範圍被裁切問題
// 1080521	Raymond		Raymond		1080370		修正列印貼式簽核物件頁面時, 數位墨水(影像)物件無法顯示問題
// 1080923  Kevin       Eric        1080339     jQuery 3.0 upgrade
// 1081210	Raymond		Raymond		1080785		合併內政部單號1070656, 新增支援"自訂"簽核區域類型
// 1081218	Raymond		Raymond		-------		修正文字意見的XSS漏洞, 並轉換非圖示化文字意見的<br>為折行字元, 以符合未修正漏洞前的顯示行為
// 1090826	Raymond		Raymond		1090620		修正當來文或附件頁面影像寬度非A4寬度時, 計算影像縮放比套用至頁面上的簽核物件的位置及大小, 及本文頁面影像不因反推邊界而縮小, 避免簽核物件位移
// 1091218	Raymond		Raymond		信保序99	判斷若無反推邊界則恢復加attachment class, 以確保信保特殊模式的轉橫向本文頁面及簽核物件會自動轉直向
// 1100715	Raymond		Raymond		1100649		列印簽核物件資訊頁功能新增簽核意見, 及新增僅顯示會辦單位長官意見選項[高大客製化選項]
// 1100715	Raymond		Raymond		1100854		簽核物件資訊頁的簽核物件支援[高大客製化]需求顯示年月日時分秒
// 1100716	Raymond		Raymond		-------		修正列印簽核物件資訊頁的上邊界消失問題
// 1110207	Raymond		Raymond		1110013		新增列印簽核物件資訊頁時, 在核決流程點的簽核意見姓名後註記「[決行]」
// 1110627	Raymond		Raymond		1110271		新增判斷若SSO_CONFIG.js啟用稿件間加蓋騎縫章功能, 下載騎縫章並記錄在特定物件供RD-AOLPrint.js使用, 及新增雙面列印功能(不需啟用稿件間加蓋騎縫章功能)
// 1120106	Raymond		Raymond		1111361		修改成以一個背景的IFrame內嵌列印分頁的方式執行列印
// 1120210	Raymond		Raymond		1111035		由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見的簽核物件資訊頁也要改成會折行, 以免一行太長超出表格範圍的問題
// 1120608	Raymond		Raymond		1120515		新增判斷環境變數「WE_ALLOW_USE_SEALMARK_ROLES」是否有設定, 若有設定則判斷目前公文的OwnRoleID是否符合設定之一, 若不符合則禁止套用騎縫章, 未設定此環境變數時簽核頁面一律套用騎縫章
// 1120620	Raymond		Raymond		標檢局序86	修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9pt的大小, 但瀏覽器最小只能顯示9pt的字, 將導致時戳文字高於職名章的問題, 故再計算縮小行高來調整時戳文字的高度
// 1130605	Raymond		Raymond		1130120		修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標, 以避免一些較早期線上簽核公文寫了錯誤(超大)座標資訊到封裝檔的簽核物件無法藉由XSignObjs.xml修復, 造成預覽列印時產生超多(數千)空白頁的問題
// 1130722	Raymond		Raymond		1130400		修正先列印過一次公文(包括線上轉紙本、參照窗格公文的列印), 再傳送時輸入PIN CODE畫面左半邊會出現前次列印時的文稿內容及簽核物件的問題
// 1130826	Raymond		Raymond		中榮序214	修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
// 1140311	Raymond		Raymond		1140413		修正列印簽核物件資訊頁的簽核意見若內容過多高度超過剩餘單頁高度, 則分頁顯示
// 1140422	Raymond		Leslie		1131223		[退輔會]增修騎縫章顯示邏輯，一律僅於列印時顯示

var nsEditor = nsEditor||{};

nsEditor.onPrintRefDocVisible = function() {
	return true;
}

nsEditor.onPrintRefDoc = function(event, folioModel){	// 2016.9.8 新增folioModel參數
	
	var $viewPort = event.data;
	var fm = folioModel;	// 2016.9.8 新增fm參數
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	var currItem;	// 屬性頁操作對象
	var dlgAttDefStr = theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR");	// 2016.9.13 新增附件下載區字串
	
	var isIE = navigator.userAgent.indexOf("Trident") > 0;	// 2016.12.1 新增IE旗標
	// 2016.12.1 新增使用IE列印時邊界反推
	var pm = 0;
	if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
		pm = 0 - SSO_CONFIG.printMarginForIE;
	}
	var bBothSide = false;	// 1110627 Raymond 1110271 新增雙面列印選項
	
	// 1120607 Raymond 1120515 新增判斷環境變數是否有設定, 若有設定則判斷OwnRoleID是否符合設定之一, 若不符合則不允許套用騎縫章, 未設定環境變數時允許套用騎縫章
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
	// 2017.3.10 建立章戳類型簽核物件
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
		// 1090826 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
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
	// 2017.3.10 建立圖檔類型簽核物件
	function _createImageSO(so, $parent, offsetLP, $pg, dfd, no) {
		var areaLP = DPtoLP(so.content.area, "mm");   // 2016.2.25 先將座標值轉成邏輯座標
		var $img = $("<div class='sign-obj so-img' data-id='" + so.id + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") +
			"<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>" +
			"<img style='display:" + ((so.asIcon)?"none":"inline") + ";vertical-align:top'></img></div>").appendTo($parent).css({	// 2017.2.15 加上vertical-align以免數位墨水物件徧下
				position: "absolute",
				left: (offsetLP.x - (so.asIcon?4:0) + pm) + "mm",	// 2017.2.15 配合修正IE列印邊界問題
				top: (offsetLP.y - (so.asIcon?4:0) + pm) + "mm"});
		// 1090826 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
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
	// 2017.3.10 建立文字類型簽核物件
	function _createTextSO(so, $parent, offsetLP, $pg, no) {
		// 2016.10.3 新增title資訊
		var $tx = $("<div class='sign-obj so-text' data-id='" + so.id + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") +
			"<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>" +
			"<div style='display:" + ((so.asIcon)?"none":"block") +
				";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
				";font-family:" + so.content.font.name +
				";font-size:" + (so.content.font.size+"pt") +
				// 1081217 Raymond FIX XSS & 保留折行
				//";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" +
				//so.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo($parent).css({
				";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")" +
				";white-space:pre'></div></div>").appendTo($parent).css({
					position: "absolute",
					left: (offsetLP.x - (so.asIcon?4:0) + pm) + "mm",	// 2017.2.15 配合修正IE列印邊界問題
					top: (offsetLP.y - (so.asIcon?4:0) + pm) + "mm"});
		// 1090826 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
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
	// 2017.3.10 建立簽核框內物件元素(not used)
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
	// 2017.3.10 建立參照模式下的簽核框內物件元素
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
	// 1060804 Raymond 1060579 建立參照模式下的簽核框內物件元素
	function _buildSOTypeA3(so, signArea, $pg, no) {
		var dfd = $.Deferred();
		if(!so) {
			theLogger.error("簽核物件記錄(" + so.type + ", ID:" + so.id + ")無實際對應物件可顯示");
			dfd.reject("簽核物件記錄(" + so.type + ", ID:" + so.id + ")無實際對應物件可顯示");	// 2017.2.18 bugfix
		}
		else if(so.type == "章戳") {
			var offsetLP = DPtoLP({x:parseInt(so.offset.x) + parseInt(signArea.left), y:parseInt(so.offset.y) + parseInt(signArea.top)}, "mm");
			_createStampSO(so, $pg, offsetLP, dfd, no);
		}
		else if(so.type == "圖檔") {
			var offsetLP = DPtoLP({x:parseInt(so.offset.x) + parseInt(signArea.left), y:parseInt(so.offset.y) + parseInt(signArea.top)}, "mm");
			_createImageSO(so, $pg, offsetLP, $pg, dfd, no);
		}
		else if(so.type == "文字意見") {
			var offsetLP = DPtoLP({x:parseInt(so.offset.x) + parseInt(signArea.left), y:parseInt(so.offset.y) + parseInt(signArea.top)}, "mm");
			_createTextSO(so, $pg, offsetLP, $pg, no);
			dfd.resolve();
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
			dfd.resolve();
		}
		return dfd.promise();
	}
	// 2017.3.10 建立簽核框外物件元素
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
			";font-family:" + so.content.font.name +
			";font-size:" + (so.content.font.size+"pt") +
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
	
	function _printMarginText($pg, docNo, po, sum, type) {
		if(type == "draft")
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>文稿頁面</div>").appendTo($pg);	// 2016.12.1 新增使用IE列印時邊界反推
		else if(type == "textSignObj")	// 2017.3.14 新增列印貼式文字意見頁
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>頁面文字意見</div>").appendTo($pg);
		else if(type == "imageSignObj")	// 2017.3.14 新增列印貼式數位墨水頁
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>頁面圖檔</div>").appendTo($pg);
		if(type == "draft" || type == "signObjs" || type == "textSignObj" || type == "imageSignObj")	// 2017.3.14 新增貼式文字意見及數位墨水頁
			$("<div class='appendex2' style='position:absolute; right:" + ((pm < 0)?50:7) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>文號：" + docNo + "</div>").appendTo($pg);	// 2016.12.1 新增使用IE列印時邊界反推, 2017.3.2 文號向左移(FDA-序1292)
		if(type == "pn")
			$("<div class='appendex3' style='position:absolute; left:calc(50% - " + ((pm < 0)?7:8) + "em); bottom:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>線上簽核文件列印 - 第" + po + "頁/共" + sum + "頁</div>").appendTo($pg);	// 2016.12.1 新增使用IE列印時邊界反推
	}
	
	// 2016.12.28 新增參數printSOPages, 本文列印完後是否接著列印簽核物件資訊頁
	function printDraftPages(draftIdx, opts, $pages, printSOPages) {
		var dfd = $.Deferred();
		var base = $pages.find(".pg").length;	// 啟始頁次
		var deferreds = [];
		// 2017.3.10 歷史檢視用目前流程點向前收集歷史流程點的msgId, 顯示簽核物件時以產生點資訊比對是否在允許顯示的msgId集合中才顯示(比照一代邏輯)
		var revs = fm.getSignFolder().getRevisions();
		var cr = fm.getSignFolder().getCurrRevision();
		theLogger.warn("目前列印流程點為'" + cr + "'");
		var coll = [];
		for(rev in revs) {	// revs不是陣列, 假設for-loop是照加入順序回傳的名稱
			theLogger.warn("允許'" + rev + "'流程點的簽核物件顯示");
			coll.push(rev.substr(5));
			if(rev == cr)
				break;
		}
		var soList = [];	// 2017.3.10 顯示的簽核物件以此陣列記錄, 列印簽核資訊頁時, 以此陣列包含的簽核物件及順序排列顯示
		var scList = [];	// 1100715 Raymond 1100649 新增應顯示的簽核意見陣列記錄
		var n = fm.getDraftPageCounts(draftIdx);
		for(var i=0; i<n; i++) {
			var pg = fm.getDraftPage(draftIdx, i);	// 2016.9.5 FIX
			if(pg) {
				// 1090826 Raymond 1090620 本文頁面有反推邊界不要加attachment class, 
				//var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img /><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1120608 Raymond 1120515 若禁用騎縫章則設定data-printsealmark為false
				if(allowUseSealMark == false)
					$pg.attr("data-printsealmark", false);
				else
				// 1110627 Raymond 1110271 設定data-printsealmark屬性為opts.printSealMark
				if("printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
					$pg.attr("data-printsealmark", true);
				if(pm < 0)
					$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				// 1091218 Raymond 信保序99, 判斷若無反推邊界則恢復加attachment class, 以確保信保特殊模式的轉橫向本文頁面及簽核物件會自動轉直向
				else
					$pg.find("img").addClass("attachment");
				deferreds.push(fm.getPageImage(pg, $pg.find("img"))
					.done(function(data, dpi, $img) {
						$img.on("load", function(event) {
							console.log("本文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								// 1090826 Raymond 1090620 修正本文頁面大小不因IE反推邊界而縮小, 避免簽核物件位移
								//$img.css({width: (w + (pm / 12.7)) + "in", height: (h + (pm / 12.7)) + "in"});	// 2016.12.1 新增使用IE列印時邊界反推
								$img.css({width: w + "in", height: h + "in"});
							}
						}).attr("data-src", data);	// 1110627 Raymond 1110271 因為改用RD-AOLPrint.html列印分頁, 故變更"src" → "data-src"
					}));
				/* 2017.3.10 改從外部記錄檔取以文稿為基礎的簽核物件來顯示
				// 套印簽核物件
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
				// 2017.3.10 從外部記錄檔取以文稿為基礎的簽核物件
				if("guid" in pg.container && !!pg.container.guid) {
					// 1060804 Raymond 1060579 歷史檢視用計算過的保留簽核物件顯示
					/*var d0 = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid);
					if(!!d0) {
						var d = d0.getVer(pg.container.id);
						if(!!d) {
							function doBuildSO(v, cv, showTypeB) {	// 參數1為指定版本, 參數2為目前版本, 參數3為是否顯示框外物件
								if(v.keepSO == "true") {	// 2017.2.23 先顯示前面版本的, 簽核物件加入的順序才會由早至晚
									theLogger.warn("保留顯示前一版本的簽核物件");
									var pv = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid).getPrevVer(v.id);
									if(!!pv)
										doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
								}
								for(var i=0; i<v.xSignObjs.length; i++) {
									var so = v.xSignObjs[i];
									if(coll.indexOf(so.msgId) >= 0) {
										if(so.type == "A") {	// 簽核框內物件, 找此頁有無相同TYPE及ID的簽核區域加蓋
											//if("signAreas" in _memPPD[_currPo.draftIdx]) {
											//	for(var j=0; j<_memPPD[_currPo.draftIdx].signAreas.length; j++) {
											//		var sa = _memPPD[_currPo.draftIdx].signAreas[j];
											//		if(toSAType(so.saType) == toSAType(sa.saType) &&
											//			so.saID == sa.id && sa.po == pg.po) {
											//			theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內(Type:" + sa.saType + ",ID:" + sa.id + ")內(offset:" + so.offset.x + "," + so.offset.y + ")");
											//			buildSOTypeA(so, sa, $pg);
											//			break;	// break for-j-loop
											//		}
											//	}
											//}
											if(cv.xSignAreas.length == 0) {	// 2017.3.30 一代簽核沒有外部簽核記錄檔, 改以框外物件方式顯示, 航港-序603
												if("ref" in so && !!so.ref) {
													if(so.ref.obj == pg.id) {
														theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + ", id:" + pg.id + ")");
														if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
															deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
														else
															deferreds.push(_buildSOTypeB(so, $pg));
														soList.push(so.ref);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
													}
												}
												else {
													theLogger.error("簽核物件(ID:" + so.id + ")無對應實際簽核物件, 由於外部簽核記錄無簽核區域資訊, 無法判定應顯示頁次");
												}
											}
											else {// 調閱非動態產生文稿頁面, 無signAreas, 要改從外部簽核物件記錄檔的目前版本記錄中讀取
												for(var j=0; j<cv.xSignAreas.length; j++) {
													var sa = cv.xSignAreas[j];
													if(toSAType(so.saType) == toSAType(sa.saType) &&
														so.saID == sa.saID && sa.pgIdx == pg.po) {	// 目前版本的簽框區域位於此頁
														theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
														if("ref" in so && !!so.ref) {	// 2017.2.18 bugfix
															if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
																deferreds.push(_buildSOTypeA2(so, sa, $pg, soList.length + 1));
															else
																deferreds.push(_buildSOTypeA2(so, sa, $pg));
															soList.push(so.ref);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
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
							doBuildSO(d, d, true);	// 目前版本要顯示框外物件, 2017.3.31 第2個參數要改用歷史檢視的當前版本, 航港-序603
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
					}*/
					if("draftPages" in pg.container) {
						var existingSO = pg.signObjs;
						if("reservedSO" in pg.container.draftPages)
							// 1130826 Raymond 中榮序214 修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
							//existingSO = pg.signObjs.concat(pg.container.draftPages.reservedSO);
							existingSO = [...pg.container.draftPages.reservedSO, ...pg.signObjs];
						$.each(existingSO, function(i, so) {
							theLogger.log("封裝檔已存在的簽核物件 - #" + (i+1));
							theLogger.log(so);
							
							var fixedPos = null;	// 1060803 Raymond 1060579 用來修正簽核物件的顯示座標
							if("saType" in so) {
								var saFound = null;
								$.each(pg.saInAPD, function(j, signArea) {
									if(so.saID == signArea.id) {
										theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")屬於此頁的簽核區域(ID:" + signArea.id + ")");
										// 用歷史版本的簽核區域的相對位置計算出目前版本的絕對位置來修正簽核物件的顯示座標
										var x = signArea.left + so.offset.x,
											y = signArea.top + so.offset.y;
										fixedPos = DPtoLP({x: x, y: y}, "mm");
										if("area" in so.content)
											theLogger.log("絕對座標從(" + so.content.area.left + "," + so.content.area.top + ")修正為(" + x + "," + y + ")");
										else if("pos" in so.content)
											theLogger.log("絕對座標從(" + so.content.pos.x + "," + so.content.pos.y + ")修正為(" + x + "," + y + ")");
										saFound = signArea;
										return false;
									}
								});
								if(!!saFound) {
									if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
										deferreds.push(_buildSOTypeA3(so, saFound, $pg, soList.length + 1));
									else
										deferreds.push(_buildSOTypeA3(so, saFound, $pg));
									soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
								}
								else
									theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")在此頁找不到所屬簽核區域, 不顯示");
							}
							else {
								// 1130605 Raymond 1130120 修正歷史檢視列印時, 簽核框外物件可套用外部簽核記錄檔的座標
								var xso = undefined, xsos = fm.getSignFolder().xSignFolder().findSignObjById(so.id);	// findSignObjById回傳的是陣列
								if(xsos.length > 0)
									xso = xsos[0];
								if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
									// 1130605 Raymond 1130120 修正歷史檢視列印時, 簽核框外物件可套用外部簽核記錄檔的座標
									//deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
									deferreds.push(_buildSOTypeB(xso || so, $pg, soList.length + 1));
								else
									// 1130605 Raymond 1130120 修正歷史檢視列印時, 簽核框外物件可套用外部簽核記錄檔的座標
									//deferreds.push(_buildSOTypeB(so, $pg));
									deferreds.push(_buildSOTypeB(xso || so, $pg));
								soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
							}
						});

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
			}
			else {
				theLogger.error("取得頁面物件失敗! 無法產生預覽列印頁面");
				dfd.reject("取得頁面物件失敗! 無法產生預覽列印頁面");
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
		var m = aolFlows.flows.length;
		//目前流程點以後的AolFlow要跳過
		var currMsgId = parseInt(cr.substr(5));
		var aolFlow, flowMsgId;
		for(var idx=m-1; idx>=0; idx--) {
			aolFlow = aolFlows.flows[idx];
			flowMsgId = (!!aolFlow) ? aolFlow.id.substr(aolFlow.id.lastIndexOf('_') + 1) : '';
			if(flowMsgId.length && (parseInt(flowMsgId) > currMsgId)) {
				m--;
			}
		}
		var $item, sItem, itemDTDL, nMsgId;
		var comment;
		// 1100715 Raymond 1100648 新增支援分文稿記錄簽核意見功能
		var currDraftInfo = fm.getEDraft(draftIdx);
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
				// 1110207 Raymond 1110013 新增註記核決流程點
				if(!!firstAppFlow && firstAppFlow == flowMsgId)
					scList.push({flowId: "sign_" + flowMsgId, time: aolFlow.refChangeInfo.timeStamp, content: comment, appFlow: true});
				else
				scList.push({flowId: "sign_" + flowMsgId, time: aolFlow.refChangeInfo.timeStamp, content: comment});
			}	// end of 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
		}
		
		$.when.apply(this, deferreds)
		.done(function() {
			theLogger.warn("所有本文頁面及簽核物件已下載完成, 共" + n/*deferreds.length*/ + "頁");
			// 1110627 Raymond 1110271 新增航港局邏輯, 若啟用稿間加蓋騎縫章功能且雙面列印時, 奇數頁文稿跟簽核物件資訊頁間補上空白頁
			if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1) && "printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
				$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);
			
			// 列印簽核資訊頁
			if(printSOPages)
				//printSignObjPages(draftIdx, {}, $pages, soList);	// 2017.3.10 簽核物件資訊頁無影像, 不需要deferred機制, 2017.3.14 傳入第4參數簽核物件清單
				printSignObjPages(draftIdx, {}, $pages, soList, scList);	// 1100715 Raymond 1100649 傳入第5參數簽核意見清單
			else	// 2017.3.14 列印貼式文字意見及數位墨水簽核物件頁面
				printIconizedSOPages(draftIdx, $pages, soList);
			
			// 1110627 Raymond 1110271 新增雙面列印功能
			if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
				$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
			dfd.resolve();
		})
		.fail(function(errorText) {
			dfd.reject(errorText);
		});
		return dfd.promise();
	}
	
	function printAttachPages(draftIdx, attIdx, opts, $pages) {
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成
		var n = fm.getAttPageCounts(draftIdx, attIdx);
		for(var i=0; i<n; i++) {
			var pg = fm.getAttPage(draftIdx, attIdx, i);
			if(pg) {
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1120608 Raymond 1120515 若禁用騎縫章則設定data-printsealmark為false
				if(allowUseSealMark == false)
					$pg.attr("data-printsealmark", false);
				else
				// 1110627 Raymond 1110271 設定data-printsealmark屬性為opts.printSealMark
				if("printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
					$pg.attr("data-printsealmark", true);
				//if(pm < 0)	// 2017.3.23 影像檔反推會造成簽核物件下移 航港-序2103
				//	$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				deferreds.push(fm.getPageImage(pg, $pg.find("img"))	// 2016.12.29 新增$img為回呼參數
					.done(function(data, dpi, $img) {	// 2016.12.29 用回呼參數就不會指定src到不同頁次
						$img.on("load", function(event) {
							console.log("附件頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								// 1071024 Raymond IE會跑到這段, 但設定影像大小可能導致影像超出頁面範圍, 故取消
								//$img.css({width: (w + (pm / 12.7)) + "in", height: (h + (pm / 12.7)) + "in"});	// 2016.12.1 新增使用IE列印時邊界反推
							}
						}).attr("data-src", data);	// 1110627 Raymond 1110271 因為改用RD-AOLPrint.html列印分頁, 故變更"src" → "data-src"
					}));
				// 2017.3.10 補列印附件頁面上的簽核物件
				if("signObjs" in pg) {
					for(var j=0; j<pg.signObjs.length; j++) {
						var so = pg.signObjs[j];
						deferreds.push(_buildSOTypeB(so, $pg));
					}
				}
			}
		}
		if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					// 1110627 Raymond 1110271 新增雙面列印功能
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
	
	function printFromDocPages(draftIdx, opts, $pages) {
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成
		var n = fm.getDraftPageCounts(draftIdx);
		for(var i=0; i<n; i++) {
			var pg = fm.getDraftPage(draftIdx, i);
			if(pg) {
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1120608 Raymond 1120515 若禁用騎縫章則設定data-printsealmark為false
				if(allowUseSealMark == false)
					$pg.attr("data-printsealmark", false);
				else
				// 1110627 Raymond 1110271 設定data-printsealmark屬性為opts.printSealMark
				if("printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
					$pg.attr("data-printsealmark", true);
				// 1090826 Raymond 1090620 來文頁面影像比照附件頁面影像不要套用IE列印邊界反推
				//if(pm < 0)
				//	$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				deferreds.push(fm.getPageImage(pg, $pg.find("img"))
					.done(function(data, dpi, $img) {
						$img.on("load", function(event) {
							console.log("來文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								// 1090826 Raymond IE會跑到這段, 但設定影像大小可能導致影像超出頁面範圍, 故取消
								//$img.css({width: (w + (pm / 12.7)) + "in", height: (h + (pm / 12.7)) + "in"});	// 2016.12.1 新增使用IE列印時邊界反推
							}
						}).attr("data-src", data);	// 1110627 Raymond 1110271 因為改用RD-AOLPrint.html列印分頁, 故變更"src" → "data-src"
					}));
				// 2017.3.10 補來文頁面上的簽核物件
				if("signObjs" in pg) {
					for(var j=0; j<pg.signObjs.length; j++) {
						var so = pg.signObjs[j];
						deferreds.push(_buildSOTypeB(so, $pg));
					}
				}
			}
		}
		if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					// 1110627 Raymond 1110271 新增雙面列印功能
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
	// 2017.3.14 新增取得簽核資訊供列印貼式文字意見及數位墨水頁使用
	function _getSignChargerInfo(flowId) {
		if(flowId != undefined) {
			return fm.getSignFolder().getFlowUserInfo(flowId, 2);
		}
		return {name: theUserInfo.UserName,
				userId: theUserInfo.UserID,
				title: theSSO.User.title,
				role: SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo), fm.getDocObj().ownOUId, fm.getDocObj().ownRoleId)};
	}
	
	// 1100715 Raymond 1100649 新增簽核意見參數
	// 2017.3.14 改用外部簽核物件顯示, 因簽核框內物件出現順序可能與頁次不符, 故改用加入順序顯示
	//function printSignObjPages(draftIdx, opts, $pages, soList) {
	function printSignObjPages(draftIdx, opts, $pages, soList, scList) {
		var n = fm.getDraftPageCounts(draftIdx), po = 1;
		// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
		//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h1 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h1 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		var mh = $container.find(".body").height();
		/* 2017.3.14 改以加入簽核物件順序的清單來顯示
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
							++po;
							$pages.find(".so-pages").text(po);
							$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
							$cmt.appendTo($container.find(".body"));
							sum = h;
						}
					}
				}
				if("reservedSO" in pg) {
					var c = pg.reservedSO.length;
					for(var j=0; j<c; j++) {
						var so = pg.reservedSO[j], $cmt = undefined;
						if(so.type == "文字意見") {
							$cmt = $("<div>序　　號：　" + (m+j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "<br/>文字內容：　" + so.content.text + "</div><hr/>").appendTo($container.find(".body"));
						}
						else if(so.type == "章戳") {
							$cmt = $("<div>序　　號：　" + (m+j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "</div><hr/>").appendTo($container.find(".body"));
						}
						if($cmt) {
							var h = $cmt.height();
							sum += h;
							if(sum > mh) {
								theLogger.warn("簽核物件數量超出頁面, 新增頁面");
								++po;
								$pages.find(".so-pages").text(po);
								$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
								$cmt.appendTo($container.find(".body"));
								sum = h;
							}
						}
					}
				}
			}
		}*/
		// 2017.3.14 改以加入簽核物件順序的清單來顯示
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
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
								$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
										$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100716 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100712 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100712 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$cmt.appendTo($container.find(".body"));
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
					var textStyles = "font-family:" + so.content.font.name + "; font-size:" + so.content.font.size + "pt; ";
					if(so.content.font.style == "粗體")
						textStyles += "font-weight:border; ";
					else if(so.content.font.style == "斜體")
						textStyles += "font-style:italic; ";
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推
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
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推
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
					var textStyles = "font-family:" + so.fontName + "; font-size:" + so.fontSize + "; ";
					if(so.fontWeight)
						textStyles += "font-weight:border; ";
					if(so.fontStyle)
						textStyles += "font-style:italic; ";
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推
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
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推
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
	
	
	
	Util.getDlg("RD-PrintRefDoc.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		$dlg.find("footer > div").unwrap();        
		$dlg.find("#ok").on('click', function() {
			// TODO: 列印
			// 1120620 Raymond 新增z-index:-1;position:absolute;以避免在準備預覽頁面資料時顯示在主頁面
			//var $pages = $("<div class='pages'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
			var $pages = $("<div class='pages' style='z-index:-1;position:absolute;'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
			var q = [], cursor = 0;
			$.each($dlg.find("ul#itemList").find("li"), function(i, li) {
				var $chk = $(li).find("input[type='checkbox']");
				if($chk.length && $chk.prop("checked"))
					q.push($(li).data("info"));
			});
			var printSOPages = $dlg.find("#chkPrintSignObjPages").prop("checked");
			bBothSide = $dlg.find("#bothSide").prop("checked");	// 1110627 Raymond 1110271 新增雙面列印選項
			if("printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
				window.sealMarkDocNo = fm.getDocNo();	// 1110627 Raymond 1110271 騎縫章上的文號改用全域變數記錄
			function doSingle() {
				// 1110627 Raymond 1110271 下載騎縫章並記錄在特定物件供RD-AOLPrint.js使用
				if(!window.sealMarkImgData && "printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true) {
					thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)
						.then(function(fil, size) {
							window.sealMarkImgData = fil;
							window.sealMarkSize = size;
							if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0)
								window.printMarginForIE = SSO_CONFIG.printMarginForIE;
							if(!!window.SSO_CONFIG && "rightSealMarkSpace" in SSO_CONFIG)
								window.rightSealMarkSpace = SSO_CONFIG.rightSealMarkSpace;
						})
						.then(doSingle)
						.fail(function(errorText) {alert(errorText);});
				}
				else
				if(cursor < q.length) {
					var item = q[cursor++];
					if(item.type == "draft") {			// 本文
						printDraftPages(item.draftIdx, item, $pages, printSOPages)	// 2016.12.29 新增參數printSOPages
							.done(doSingle)
							.fail(function(errorText) {alert(errorText);});
					}
					else if(item.type == "attach") {	// 附件
						printAttachPages(item.draftIdx, item.attIdx, item, $pages)
							.done(doSingle)
							.fail(function(errorText) {alert(errorText);});
					}
					else if(item.type == "fromdoc") {	// 來文
						printFromDocPages(item.draftIdx, item, $pages)
							.done(doSingle)
							.fail(function(errorText) {alert(errorText);});
					}
				}
				else {
					if(pm == 0) {	// 2016.12.8 fix for 0邊界的機關
						if(navigator.userAgent.indexOf("Trident") > 0) {	// for IE與眾不同的品味
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
					
					theLogger.warn("本文及附件已等待完成");
					// 1110627 Raymond 1110271 Chrome目前似乎會擋document.write寫的JS, 故改用RD-AOLPrint.html
					//var newWin = window.open();
					// 1090826 Raymond 1090620 若來文或附件頁面影像寬度非A4寬度時, 計算影像縮放比套用至頁面上的簽核物件的位置及大小, 避免簽核物件位移
					// 1080214 Raymond 1080179 修正.load()改為.bind("load") for 弱掃
					// 1071009 Raymond 修正歷史檢視的列印分頁, 橫式附件頁面未旋轉90度問題
					/*newWin.document.write('<!DOCTYPE html><html><head><meta http-equiv="cache-control" content="max-age=0" />\
						<meta http-equiv="cache-control" content="no-cache" />\
						<meta http-equiv="expires" content="0" />\
						<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />\
						<meta http-equiv="pragma" content="no-cache" />\
						<meta http-equiv="Content-Type" content="text/html; charset=utf8" />\
						<title>PRINT</title><link rel="stylesheet" href="CSS/PrintChrome.css?ver=5.0.87"/></head><body style="margin:0mm ' + ((pm < 0)?3:0) + 'mm">');	// 2016.12.1 新增使用IE列印時邊界反推, 2016.12.27 fix for 第1頁會徧下問題*/
					/*newWin.document.write('<!DOCTYPE html><html><head><meta http-equiv="cache-control" content="max-age=0" />\
						<meta http-equiv="cache-control" content="no-cache" />\
						<meta http-equiv="expires" content="0" />\
						<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />\
						<meta http-equiv="pragma" content="no-cache" />\
						<meta http-equiv="Content-Type" content="text/html; charset=utf8" />\
						<title>PRINT</title><link rel="stylesheet" href="CSS/PrintChrome.css?ver=5.0.87"/><script src="lib/jquery.js"></script><script lang="javascript">');	// 1071024 Raymond jquery.js拿掉版號
					// 1080322 Raymond 1080226 修正橫式影像寬度非A4高度時, 影像轉直後偏右造成超出頁面範圍被裁切問題
					// 2019.10.28 - 1080339 Eric, jQuery 3 upgrade
					// $(document).ready(function() {\
					//  => $(function() {
					newWin.document.write('\
						$(function() {\
							console.log(document.readyState);\
							console.log($("img.attachment").length);\
							var shrink = ' + ((0-pm) * 2) + ';\
							$("img.attachment").on("load", function(event) {\
								if("naturalWidth" in event.target && "naturalHeight" in event.target) {\
									if(event.target.naturalWidth > event.target.naturalHeight) {\
										console.log("附件頁面影像為橫向(" + event.target.naturalWidth + " x " + event.target.naturalHeight + "), 向左轉90度");\
										var s1 = (2480 - Math.ceil(11.81 * shrink)) / event.target.naturalHeight;\
										var s2 = (3507 - Math.ceil(11.81 * shrink)) / event.target.naturalWidth;\
										console.log("scale:" + s1 + ", " + s2);\
										var s = (s1 > s2)?s2:s1;\
										$(event.target).css({width: (event.target.naturalWidth / 300) + "in", height: (event.target.naturalHeight / 300) + "in"});\
										var $pg = $(event.target).parent();\
										if(navigator.userAgent.indexOf("Trident") >= 0)\
											$("<div style=\'transform-origin: top right; transform: scale(" + s + ") rotate(-90deg) translate(0mm, -" + ((294 - shrink) / s / s) + "mm); width: " + ((294 - shrink) / s) + "mm\'></div>").append($pg.get(0).childNodes).appendTo($pg);\
										else\
											$("<div style=\'transform-origin: top right; transform: scale(" + s + ") rotate(-90deg) translate(0mm, -" + (294 / s / s) + "mm); width: " + (294 / s) + "mm\'></div>").append($pg.get(0).childNodes).appendTo($pg);\
									}\
									else {\
										var imgRatio = undefined;\
										if(shrink > 0) {\
											var r = Math.floor(2480 * (210 - shrink) / 210);\
											if(event.target.naturalWidth != r) {\
												imgRatio = r / event.target.naturalWidth;\
												$(event.target).parent().attr("data-imgratio", imgRatio);\
												console.log("img.attachment.on" + event.type + ", natural:" + event.target.naturalWidth + "," + event.target.naturalHeight);\
											}\
										}\
										else if(event.target.naturalWidth != 2480) {\
											imgRatio = 2480 / event.target.naturalWidth;\
											$(event.target).parent().attr("data-imgratio", imgRatio);\
											console.log("img.attachment.on" + event.type + ", natural:" + event.target.naturalWidth + "," + event.target.naturalHeight);\
										}\
										if(!!imgRatio) {\
											console.log("imgratio:" + imgRatio + ", .sign-obj:" + $(event.target).parent().find(".sign-obj").length);\
											$(event.target).parent().find(".sign-obj").each(function(oi, div) {\
												var lu = div.style.left.replace(/[\d.]/g, "");\
												var tu = div.style.top.replace(/[\d.]/g, "");\
												var l = parseFloat(div.style.left.replace(lu, "")) * imgRatio;\
												var t = parseFloat(div.style.top.replace(tu, "")) * imgRatio;\
												console.log("頁面影像縮放比=" + imgRatio + ", 修正簽核物件(id:" + $(div).attr("data-id") + ")位置" + div.style.left + "->" + l + lu + ", " + div.style.top + "->" + t + tu);\
												div.style.left = l + lu;\
												div.style.top = t + tu;\
												$(div).find("img").each(function(ii, img) {\
													if(!!img.style.width) {\
														var wu = img.style.width.replace(/[\d.]/g, "");\
														var hu = img.style.height.replace(/[\d.]/g, "");\
														var imw = parseFloat(img.style.width.replace(wu, "")) * imgRatio;\
														var imh = parseFloat(img.style.height.replace(hu, "")) * imgRatio;\
														console.log("\timg寬高" + img.style.width + "->" + imw + wu + ", " + img.style.height + "->" + imh + hu);\
														img.style.width = imw + wu;\
														img.style.height = imh + hu;\
													}\
												});\
												$(div).find("p, div").each(function(pi, p) {\
													$(p).css({transform: "scale(" + imgRatio + ")", transformOrigin: "left top"});\
												});\
											});\
										}\
									}\
								}\
							});\
						});');
					newWin.document.write('</script></head><body style="margin:0mm ' + ((pm < 0)?3:0) + 'mm">');
					for(var i=0; i<$pages.length; i++)
						newWin.document.write($pages.get(i).outerHTML);
					newWin.document.write("</body></html>");
					newWin.document.close();
					// 1081217 Raymond newWin是window物件, 非jQuery物件, 不用改成trigger
					//newWin.trigger('focus');
					newWin.focus();*/
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
					
					$pages.remove();	// 2016.9.8 FIX, 移除暫時appendTo目前DOM的元素
				}
			}
			if(q.length > 0)
				doSingle();
			else {
				$pages.remove();	// 2016.9.8 FIX, 移除暫時appendTo目前DOM的元素
				alert("未勾選任何可列印項目");
			}
			
		});
		$dlg.find("#cancel").on('click', function() {
			$.modal.close();
		});
		
		
		// 點擊文稿
		function onClickDraft(event) {
			if(!$(this).hasClass("ui-btn-active")) {
				$dlg.find("#itemList").find("li.ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				
				currItem = $(this).data("info");
			}
		}
		// 點擊附件
		function onClickAtt(event) {
			if(!$(this).hasClass("ui-btn-active")) {
				$dlg.find("#itemList").find("li.ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				
				currItem = $(this).data("info");
			}
		}
		
		function prepopulate($ul) {
			var dfd = $.Deferred();	// 2016.9.8 改Deferred模式, 開啟時就要下載每個文稿, 因為使用者不會每筆文稿都點開檢查選項跟套用格式就列印了
			var n = fm.getDraftCounts();
			//var currIdx = $viewPort.data("view").currDraftIndex();	// 2016.10.27 新增預設目前文稿為勾選, 其它不要勾選
			var defChecked = true;	// 預設全勾選
			function doNext(idx) {
				if(idx < n) {
					
					if(!fm.isFromDoc(idx)) {
						$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((defChecked)?" checked":"") + ">" + fm.getDraftName(idx) + "</li>").appendTo($ul)
						.on('click', onClickDraft)
							.data("info", {type: "draft", draftIdx: idx, enable: true});
						
						var m = fm.getDraftAttCounts(idx);
						for(var k=0; k<m; k++) {
							var l = fm.getAttPageCounts(idx, k);
							if(l > 0) {
								$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((defChecked)?" checked":"") + ">" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
									.on('click', onClickAtt)
									.data("info", {type: "attach", draftIdx: idx, attIdx: k, enable: true});
							}
							else {
								theLogger.warn("附件無頁面");
								$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle' disabled>" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
									.on('click', onClickAtt)
									.data("info", {type: "attach", draftIdx: idx, attIdx: k, enable: false, msg: "此附件無頁面影像"});
							}
						}
					}
					else {	// 來文
						$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((defChecked)?" checked":"") + ">" + fm.getDraftName(idx) + "</li>").appendTo($ul)
							.on('click', onClickDraft)
							.data("info", {type: "fromdoc", draftIdx: idx, enable: true});
						
						var m = fm.getDraftAttCounts(idx);
						for(var k=0; k<m; k++) {
							var l = fm.getAttPageCounts(idx, k);
							if(l > 0) {
								$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((defChecked)?" checked":"") + ">" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
									.on('click', onClickAtt)
									.data("info", {type: "attach", draftIdx: idx, attIdx: k, enable: true});
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
			containerCss: {width: "500px", height: "458px"},	// 1110627 Raymond 1110271 height變更450px=>458px
			onShow: function() {
				
				// 取出目前公文的文稿及附件等項目, 2016.9.8 改成Deferred模式, 因為要預設列印參數需要先非同步下載文稿
				prepopulate($dlg.find("ul#itemList"))
					.done(function() {
				
					$dlg.trigger("create");
					
					$dlg.find("ul[data-role='listview']").children("li").each(function(idx, li) {	// 2016.10.28 選取目前文稿
						var nfo = $(li).data("info");
						if(nfo && nfo.type == "draft" && nfo.enable) {
							$(li).trigger('click');
							return false;
						}
					});
				});
			}
		});
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-PrintFolio.js").finish();
})();