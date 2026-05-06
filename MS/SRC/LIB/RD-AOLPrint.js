
// 1080923  1080339     Kevin   Eric    jQuery 3.0 upgrade
// 1090313	1090036		Leslie	Leslie	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
// 1090825	1090620		Raymond	Raymond	若來文或附件影像寬度非A4寬度時, 計算影像縮放比並調整簽核物件位置及大小, 以避免發生位移問題
// 1090917	1090529		Raymond	Raymond	新增信保基金調閱線上簽核公文列印時套用強制浮水印
// 1100624	1100780		Raymond	Raymond	新增一般機關亦可套用強制浮水印功能, 區分信保與一般機關文字浮水印的個別處理方向
// 1110627	1110271		Raymond	Raymond	新增稿間、附件間加蓋騎縫章, 並依航港局邏輯:雙面列印產生的空白頁不要加蓋任何騎縫章, 被空白頁隔開的前稿件的右騎縫章要能與後稿件的左騎縫章位置、旋轉角度對得起來, 騎縫章的文號從sealMarkDocNo全域物件取得, 以避免歷史檢視列印時文號與當前簽核公文不同的問題
// 1110725	1110416		Raymond	Raymond	新增全部影像載入完成後將localStorage[jobId]變更為"Finish"(AOLPrint->PrintFolio), 用於通知列印子視窗
// 1111014	陸委會序332	Raymond	Raymond	修正Chrome/Edge下某些案例的條列文字在瀏覽器的列印預覽介面中比列印分頁提前一個字斷行的問題
// 1111026	陸委會序347	Raymond	Raymond	取消序332的修正, 改在RD-Layout.js調整
// 1120109	1111361		Raymond	Raymond	新增支援以IFrame內嵌RD-AOLPrint.html的方式, 及載入內容(包括影像檔)完成後立即顯示瀏覽器的預覽列印子視窗功能
// 1120817	1120503		Raymond	Raymond	新增提供另存影像檔(PNG)功能
// 1120828	標檢局序123	Raymond	Raymond	修正Chrome列印時, 有顯示右騎縫章的橫轉直附件頁面, 會被Chrome的列印引擎判定為超出頁面範圍, 而使所有頁面向左上角縮小的問題
// 1121227	1121031		Leslie	Leslie	針對橫式附件頁面的簽核物件，改為單獨轉向
// 1130515	信保序108	Raymond	Raymond	修正目前流程點新加入的簽核物件left、top單位是px不是mm, 當頁面為橫式需要轉直式來列印時, 新加入的簽核物件轉向後單位直接變mm會超出頁面範圍, 導致Chrome/Edge預覽頁面向左上角縮小, 且看不到新加入的簽核物件的問題
// 1140409	1140481		Raymond	Raymond	修正雙面列印時, 偶數頁的裝訂線應顯示在右邊界, 偶數頁的右騎縫章內縮改為左騎縫章原來的內縮距離
// 1140513	1140779		Raymond	Raymond	新增判斷機關暱稱為MOCS(銓敘部)時, 文字浮水印(單位、職稱、姓名、帳號、時間、IP)全都不要顯示
//$(document).ready(function(){
$(function() {
	var $imgList;
	var idx=0;
	var _opener = opener || parent;	// 1120106 Raymond 1111361 新增_opener變數取代_opener, 若RD-AOLPrint.html是由iframe內嵌載入的, 主頁會是parent而不是opener
	var SSO_CONFIG = _opener.SSO_CONFIG;	// 1120106 Raymond 1111361 以下的_opener全部改為__opener
	var shrink = 0;	// 1070713 Raymond 1070750 IE列印邊界會縮小pg的寬高, 附件頁面影像縮放比要再縮小
	var exportImage = false;	// 1120810 Raymond 1120503 新增是否應另存影像檔(PNG)的旗標
	
	// 1090831 Raymond 1090529 套用強制浮水印(信保基金邏輯)
	function applyFWM() {
		// 字串左邊補0, 輸入數字會輸出字串
		function padLeft(num, len) {
			if(typeof num != "string")
				num = num.toString();
			if(num.length >= len)
				return num;
			else
				return arguments.callee("0" + num, len);
		}
		var n = $('div.pg').length;
		if(_opener.tmpApplyFwm == true && n > 0) {
			console.log("共" + n + "頁應套用強制浮水印");
			$("<img class='WMImage-logo' src='" + _opener.tmpFwmPath + "'></img>").appendTo("div.pg")
				.css({position: "absolute",
					opacity: _opener.tmpFwmSettings.ImageBlendLevel / 100,
					width: _opener.tmpFwmSettings.ImageWidth + "mm",
					height: _opener.tmpFwmSettings.ImageHeight + "mm",
					top: (_opener.tmpFwmSettings.VertAlign == "top")?_opener.tmpFwmSettings.TopMargin + "mm":"calc(50% - " + (_opener.tmpFwmSettings.ImageHeight / 2) + "mm)",
					left: "calc(50% - " + (_opener.tmpFwmSettings.ImageWidth / 2) + "mm)"
				});
			var td = new Date();
			// 1100623 Raymond 1100780 新增一般機關亦可套用強制浮水印功能, 故在此區分信保與一般機關文字浮水印的個別處理
			if(_opener.tmpOrgNickName == "SMEG") {	// 信保文字浮水印格式
			var txt = _opener.tmpFwmSettings.TextPrefix + ' ' + _opener.tmpOUName + '　' + _opener.tmpUserId + '　' + (_opener.tmpUserTitle || "[USER_TITLE]") + ((_opener.tmpFwmSettings.TextNoWrap == true)?"　":"<br/>") +
				padLeft(td.getYear()-11, 3) + '/' + padLeft(td.getMonth()+1, 2) + '/' + padLeft(td.getDate(), 2) + ' ' +
				padLeft(td.getHours(), 2) + ':' + padLeft(td.getMinutes(), 2) + '　' + (_opener.tmpClientIP || "000.000.000.000");
			var $wmt = $("<div class='WMImage-text'>" + txt + "</div>").appendTo("div.pg")
				.css({position: "absolute",
					opacity: _opener.tmpFwmSettings.TextBlendLevel / 100,
					fontFamily: _opener.tmpFwmSettings.TextFont,
					fontSize: (_opener.tmpFwmSettings.TextSize * 72 / 96) + "pt",
					fontWeight: "bold",
					left: _opener.tmpFwmSettings.LeftMargin + "mm",
					whiteSpace: "nowrap",
					transform: "rotate(90deg)",
					transformOrigin: "left top",
					left: "33%"
				});
			var _w = $wmt.width();
			$wmt.css("top", "calc((297mm - " + _w + "px) / 2)");
			$("<div class='WMImage-text'>" + txt + "</div>").appendTo("div.pg")
				.css({position: "absolute",
					opacity: _opener.tmpFwmSettings.TextBlendLevel / 100,
					fontFamily: _opener.tmpFwmSettings.TextFont,
					fontSize: (_opener.tmpFwmSettings.TextSize * 72 / 96) + "pt",
					fontWeight: "bold",
					left: _opener.tmpFwmSettings.LeftMargin + "mm",
					whiteSpace: "nowrap",
					transform: "rotate(90deg)",
					transformOrigin: "left top",
					left: "66%",
					top: "calc((297mm - " + _w + "px) / 2)"
				});
			$("div.pg").each(function(idx, pg) {
				var $pg = $(pg);
				if($pg.find("img.attachment").length && !$pg.find("img.attachment").closest("div").hasClass("pg")) {	// 附件頁面為橫轉直
					var $div = $pg.find("img.attachment").closest("div");
					var _h = $pg.find("img.attachment").height();
					$pg.find("img.WMImage-logo").appendTo($div);
					$pg.find("div.WMImage-text").css("top", "calc((" + _h + "px - " + _w + "px) / 2)").appendTo($div);
				}
			});
			}
			else {	// 一般機關的文字浮水印格式
				// 1140513 Raymond 1140779 新增判斷機關暱稱為MOCS(銓敘部)時, 文字浮水印(單位、職稱、姓名、帳號、時間、IP)全都不要顯示
				if(_opener.tmpOrgNickName == "MOCS")
					var txt = "";
				else
				var txt = _opener.tmpFwmSettings.TextPrefix + ' ' + _opener.tmpOUName + '　' + (_opener.tmpUserTitle || "[USER_TITLE]") + '　' + _opener.tmpUserName + '　' + _opener.tmpUserId + ((_opener.tmpFwmSettings.TextNoWrap == true)?"　":"<br/>") +
					padLeft(td.getYear()-11, 3) + '/' + padLeft(td.getMonth()+1, 2) + '/' + padLeft(td.getDate(), 2) + ' ' +
					padLeft(td.getHours(), 2) + ':' + padLeft(td.getMinutes(), 2) + '　' + (_opener.tmpClientIP || "000.000.000.000");
				var $wmt = $("<div class='WMImage-text'>" + txt + "</div>").appendTo("div.pg")
					.css({position: "absolute",
						opacity: _opener.tmpFwmSettings.TextBlendLevel / 100,
						fontFamily: _opener.tmpFwmSettings.TextFont,
						fontSize: (_opener.tmpFwmSettings.TextSize * 72 / 96) + "pt",
						fontWeight: "bold",
						left: _opener.tmpFwmSettings.LeftMargin + "mm",
						bottom: _opener.tmpFwmSettings.BottomMargin + "mm",
						whiteSpace: "nowrap"
					});
				// 1100624 Raymond 修正更新至Chrome 79版後, 設定無邊界列印時會發生文稿頁面後多產生一頁空白頁的問題, 猜測是誤判297mm超過可列印高度, 改設為減1mm的296mm
				if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 79) {	// 判斷是否為Chrome/Chromium 79版以後(預期Google不會很快修)
					$wmt.css("bottom", (_opener.tmpFwmSettings.BottomMargin - 1) + "mm");
				}
				else if(shrink > 0) {	// IE列印邊界會縮小pg的寬高
					$wmt.css({left: (_opener.tmpFwmSettings.LeftMargin - SSO_CONFIG.printMarginForIE) + "mm",
							bottom: (_opener.tmpFwmSettings.BottomMargin - SSO_CONFIG.printMarginForIE - 2) + "mm"});
				}
				$("div.pg").each(function(idx, pg) {
					var $pg = $(pg);
					if($pg.find("img.attachment").length && !$pg.find("img.attachment").closest("div").hasClass("pg")) {	// 附件頁面為橫轉直
						var $div = $pg.find("img.attachment").closest("div");
						var _h = $pg.find("img.attachment").height();
						$pg.find("img.WMImage-logo").appendTo($div);
						$pg.find("div.WMImage-text").appendTo($div);
					}
				});
			}
		}
	}
	
	function LoadImgProcess(){
		$imgList = $('div.pages').find('img.attachment');
		
		var isIE = navigator.userAgent.indexOf("Trident") > 0;	// IE旗標
		// 使用IE列印時邊界反推
		var pm = 0;
		if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
			pm = 0 - SSO_CONFIG.printMarginForIE;
			
			shrink = 2 * SSO_CONFIG.printMarginForIE;	// 1070713 Raymond 1070750 計算因IE列印邊界造成的縮小幅度
			console.log("shrink:" + shrink);
		}
		$('body').css('margin','0mm ' + ((pm < 0)?3:0) + 'mm');
		var h = $(window).height();
		// 1070323 Raymond 改成fixed應該比較符合mask的目的
		//$('<div class="holdon_mask" style="width:100%; height:100%; position:absolute; right:0px; top:0px; background-color: #FFF; opacity: 0.5; background-image: url(\'./IMAGE/SSO/Loading.gif\'); background-position: center; background-repeat: no-repeat;"></div>').appendTo($('body')).css({height:h+'px'});
		$('<div class="holdon_mask" style="width:100%; height:100%; position:fixed; right:0px; top:0px; background-color: #FFF; opacity: 0.5; background-image: url(\'./IMAGE/SSO/Loading.gif\'); background-position: center; background-repeat: no-repeat;"></div>').appendTo($('body')).css({height:h+'px'});
		
		if($imgList.length){
			StepLoadImg($imgList.eq(idx++));
		}
		// 1120810 Raymond 1120503 另存影像檔(PNG)
		else if(exportImage) {
			$('div.holdon_mask').hide();
			var $pgs = $(".pg");
			var dl = 0, ttl = $pgs.length;
			var t0 = new Date(), t1 = t0;
			function dlSinglePg() {
				if(dl < ttl) {
					if(typeof Promise == "undefined") {
						console.error("瀏覽器不支援Promise, 無法執行domtoimage函式庫的功能另存影像檔");
						return;
					}
					
					var $div = $pgs.eq(dl++);
					$div.css({transform: "scale(3.123)", transformOrigin: "top left", backgroundColor: "white", marginTop: "0px", borderWidth: "0px"});	// 指定放大3.123倍, 因為不放大的話, domtoimage會以在螢幕顯示的尺寸(794X1123)來產生影像
					var sa = [];
					$div.find(".sign-area").each(function(idx, elm) {	// 搜尋目前頁面有無簽核區域
						console.log("P#" + dl + " 簽核區域:", elm);
						let $sa = $(elm),
							saOff = $sa.offset(),
							pgOff = $div.offset();
						console.log("\toffset:", saOff.left, saOff.top, "pg.offset:", pgOff.left, pgOff.top, "actural offset:", saOff.left - pgOff.left, saOff.top - pgOff.top, "width:", $sa.width(), "height:", $sa.height());
						sa.push({
							type: $sa.attr("data-satype"),
							id: $sa.attr("data-id"),
							left: saOff.left - pgOff.left,
							top: saOff.top - pgOff.top,
							right: saOff.left - pgOff.left + ($sa.width() * 3.123),
							bottom: saOff.top - pgOff.top + ($sa.height() * 3.123)
						});
					});
					domtoimage.toPng($div[0], {width: 2480, height: 3507})	// 指定寬高為300dpi時的A4尺寸
					.then(function (dataUrl) {
						//var dlnk = document.createElement("a");
						//dlnk.href = dataUrl;
						//dlnk.download = document.title + "-" + dl + ".png";	// 標題是文號_稿序或帳號_MsgID_稿序, 故一頁一檔要再加上頁次
						//dlnk.click();
						
						let t2 = new Date();
						parent.onExportImage(dataUrl, t2 - t1, dl == ttl, t2 - t0, sa);
						t1 = t2;
						
						dlSinglePg();	// 處理下一頁
					})
					.catch(function (error) {
						console.error('oops, something went wrong!', error);
					});
				}
			}
			dlSinglePg();
		}
		else {
			applyFWM();	// 1090828 Raymond 1090529 信保基金調閱線上簽核公文列印時套用強制浮水印
			
			printExtraSealMark();	// 1110613 Raymond 1110271 稿間加蓋騎縫章
			
			$('div.holdon_mask').hide();
			
			setTimeout(window.print, 1000);	// 1120106 Raymond 1111361 載入完成後直接顯示瀏覽器的預覽列印子視窗
			/*var t1 = new Date();
			localStorage["aolPrintLog"] += "\n" + t1.getHours() + ":" + t1.getMinutes() + ":" + t1.getSeconds() + "." + ("" + t1.getMilliseconds()).padStart(3, 0) + " - LoadImgProcess(no images) finished.";
			setTimeout(function() {
				let t = new Date();
				localStorage["aolPrintLog"] += "\n" + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + ("" + t.getMilliseconds()).padStart(3, 0) + " - LoadImgProcess(no images) show print dialog.";
				window.print();
			}, 1000);*/
			
			// 1110722 Raymond 1110416 新增全部影像載入完成後將localStorage[jobId]變更為"Finish"(AOLPrint->PrintFolio)
			var jobId = _getURLParameter('JobId');
			localStorage[jobId] = "Finish";
		}
	}
	
	function StepLoadImg($img){
		if($img){
			var url = $img.attr('data-src');
			// 1080214 Raymond 1080179 .load改.bind("load") for 弱掃
			//$img.attr('src',url).load(function(event){
			$img.attr('src',url).on("load", function(event) {
				// 1060824 Raymond 1060731 檢查若附件頁面為橫式, 向左轉90度
				if("naturalWidth" in event.target && "naturalHeight" in event.target) {
					if(event.target.naturalWidth > event.target.naturalHeight) {
						console.log("附件頁面影像為橫向(" + event.target.naturalWidth + " x " + event.target.naturalHeight + "), 向左轉90度");
						// 1070713 Raymond 1070750 修正因影像尺寸非標準A4造成簽核物件位移的問題
						var s1 = (2480 - Math.ceil(11.81 * shrink)) / event.target.naturalHeight;	// 橫向影像所以用naturalHeight計算水平方向的縮放比
						var s2 = (3507 - Math.ceil(11.81 * shrink)) / event.target.naturalWidth;	// 用naturalWidth計算垂直方向的縮放比
						console.log("scale:" + s1 + ", " + s2);
						var s = (s1 > s2)?s2:s1;	// 取最小縮放比(fit window)
						$(event.target).css({width: (event.target.naturalWidth / 300) + "in", height: (event.target.naturalHeight / 300) + "in"})
							.attr("data-dim", event.target.naturalWidth + "x" + event.target.naturalHeight);
						var $pg = $(event.target).parent();
						// 1070322 Raymond 1061279 IE環境下旋轉的影像會凸出頁面範圍, 將旋轉的DIV再縮小
						if(navigator.userAgent.indexOf("Trident") >= 0)
							// 1080322 Raymond 1080226 修正橫式影像寬度非A4高度時, 影像轉直後偏右造成超出頁面範圍被裁切問題
							//$("<div style='transform-origin: top right; transform: scale(" + s + ") rotate(-90deg) translate(0in, -" + (event.target.naturalWidth / 300 / Math.max(s1, s2)) + "in); width: " + ((294 - shrink) / s) + "mm'></div>").append($pg.get(0).childNodes).appendTo($pg);
							$("<div style='transform-origin: top right; transform: scale(" + s + ") rotate(-90deg) translate(0mm, -" + ((294 - shrink) / s / s) + "mm); width: " + ((294 - shrink) / s) + "mm'></div>").append($pg.get(0).childNodes).appendTo($pg);
						else
							// 1080322 Raymond 1080226 修正橫式影像寬度非A4高度時, 影像轉直後偏右造成超出頁面範圍被裁切問題
							//$("<div style='transform-origin: top right; transform: scale(" + s + ") rotate(-90deg) translate(0in, -" + (event.target.naturalWidth / 300 / Math.max(s1, s2)) + "in); width: " + (294 / s) + "mm'></div>").append($pg.get(0).childNodes).appendTo($pg);
							$("<div style='transform-origin: top right; transform: scale(" + s + ") rotate(-90deg) translate(0mm, -" + (294 / s / s) + "mm); width: " + (294 / s) + "mm'></div>").append($pg.get(0).childNodes).appendTo($pg);
						// 1120828 Raymond 標檢局序123 修正Chrome列印時, 有顯示右騎縫章的橫轉直附件頁面, 會被Chrome的列印引擎判定為超出頁面範圍, 而使所有頁面向左上角縮小的問題
						if(navigator.userAgent.indexOf("Chrome") >= 0 && $pg.find(".rightSealMark").length) {
							let $rsm = $pg.find(".rightSealMark"),
								t = $rsm.get(0).style.top;
							$rsm.css("right", "").css("top", "").css("transform-origin", "top left").css("transform", "rotate(-90deg) translate(-5mm, 0mm)");
							$("<div style='position:absolute; top:5mm; left:" + t + "'></div>").appendTo($pg).append($rsm);
						}
						
						// 1121227	Leslie[1121031]	針對橫式附件頁面的簽核物件，改為單獨轉向
						if(navigator.userAgent.indexOf("Chrome") >= 0 && $pg.find(".sign-obj").length){
							$pg.find(".sign-obj").each(function(i,o){
								let newtop = parseFloat(o.style.left), newleft = parseFloat(o.style.top);	//起始點變更，座標互換
								let fWidth = $(o).children().toArray().reduce((c,obj)=>$(obj).width()+c,0);
								// 1130515 Raymond 信保序108 修正目前流程點新加入的簽核物件left、top單位是px不是mm, 當頁面為橫式需要轉直式來列印時, 新加入的簽核物件轉向後單位直接變mm會超出頁面範圍, 導致Chrome/Edge預覽頁面向左上角縮小, 且看不到新加入的簽核物件的問題
								//let calcTop = (294 - (newtop * s)) + 'mm';
								//let calcleft = (newleft * s) + 'mm';
								let calcTop = (o.style.left.match(/mm$/))?((294 - (newtop * s)) + 'mm'):((1111 - (newtop * s)) + 'px');
								let calcleft = (o.style.top.match(/mm$/))?((newleft * s) + 'mm'):((newleft * s) + 'px');
								$(o).css('top',calcTop).css('left',calcleft).css("transform-origin", "top left").css("transform", `rotate(-90deg) scale(${s})`).width(fWidth);
								$(o).appendTo($pg);
							})
						}						
					}
					// 1090825 Raymond 1090620 若影像寬度非A4寬度時, 記錄影像縮放比於上層div.pg
					else {
						if(shrink > 0) {
							var r = Math.floor(2480 * (210 - shrink) / 210);
							if(event.target.naturalWidth != r)
								$(event.target).parent().attr("data-imgratio", r / event.target.naturalWidth);
						}
						else if(event.target.naturalWidth != 2480) {
							$(event.target).parent().attr("data-imgratio", 2480 / event.target.naturalWidth);
						}
					}
				}
				StepLoadImg($imgList.eq(idx++));
			});
		}
		// 1090825 Raymond 1090620 修正單頁時影像還未下載完及計算縮放比, 簽核物件無法調整位置問題
		//if(idx == $imgList.length){
		if(idx > $imgList.length) {
			// 1090825 Raymond 1090620 修正因來文或附件影像非A4大小時導致簽核物件位移的問題
			$('.sign-obj').each(function(oi, div) {
				var imgRatio = $(div).parent().attr("data-imgratio");
				if(!!imgRatio) {
					var lu = div.style.left.replace(/[\d.]/g, "");
					var tu = div.style.top.replace(/[\d.]/g, "");
					var l = parseFloat(div.style.left.replace(lu, "")) * imgRatio;
					var t = parseFloat(div.style.top.replace(tu, "")) * imgRatio;
					console.log("頁面影像縮放比=" + imgRatio + ", 修正簽核物件(id:" + $(div).attr("data-id") + ")位置" + div.style.left + "->" + l + lu + ", " + div.style.top + "->" + t + tu);
					div.style.left = l + lu;
					div.style.top = t + tu;
					
					$(div).find("img").each(function(ii, img) {	// 數位墨水、職名章也要依縮放比調整寬高
						if(!!img.style.width) {
							var wu = img.style.width.replace(/[\d.]/g, "");
							var hu = img.style.height.replace(/[\d.]/g, "");
							var imw = parseFloat(img.style.width.replace(wu, "")) * imgRatio;
							var imh = parseFloat(img.style.height.replace(hu, "")) * imgRatio;
							console.log("\timg寬高" + img.style.width + "->" + imw + wu + ", " + img.style.height + "->" + imh + hu);
							img.style.width = imw + wu;
							img.style.height = imh + hu;
						}
					});
					
					$(div).find("p, div").each(function(pi, p) {	// 文字式核示語詞隨縮放比縮放
						$(p).css({transform: "scale(" + imgRatio + ")", transformOrigin: "left top"});
					});
				}
			});
			// 1090825 Raymond 1090620 附件頁面影像不套用IE列印邊界反推, 故簽核物件也不需套用
			// 1070713 Raymond 1070750 修正因IE列印邊界導致簽核物件位移的問題
			/*if(shrink > 0) {
				$('.sign-obj').each(function(idx, div) {
					var l = parseInt(div.style.left.replace("mm", "")) + (shrink / 2);
					var t = parseInt(div.style.top.replace("mm", "")) + (shrink / 2);
					console.log(l + "," + t);
					div.style.left = l + "mm";
					div.style.top = t + "mm";
				});
			}*/
			applyFWM();	// 1090828 Raymond 1090529 信保基金調閱線上簽核公文列印時套用強制浮水印
			
			printExtraSealMark();	// 1110613 Raymond 1110271 稿間加蓋騎縫章
			
			$('div.holdon_mask').hide();
			
			setTimeout(window.print, 100);	// 1120106 Raymond 1111361 載入完成後直接顯示瀏覽器的預覽列印子視窗
			/*setTimeout(function() {
				let t = new Date();
				localStorage["aolPrintLog"] += "\n" + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + ("" + t.getMilliseconds()).padStart(3, 0) + " - StepLoadImg(has images) finished.";
				window.print();
			}, 100);*/
			
			// 1110722 Raymond 1110416 新增全部影像載入完成後將localStorage[jobId]變更為"Finish"(AOLPrint->PrintFolio)
			var jobId = _getURLParameter('JobId');
			localStorage[jobId] = "Finish";
		}
	}
	
	// 1110013 Raymond 1110271 判斷頁次是否為空白頁
	function isBlankPage($pg) {
		return (!$pg.attr("data-pgidx") && !$pg.attr("data-printsealmark") && $pg.children("[name='bodyRegion']").length == 0 && $pg.children(".body").length == 0);	// 文稿會有data-pgidx, 附件及來文會有data-printsealmark, 皆無者即為空白頁
	}
	
	// 1110613 Raymond 1110271 稿間、附件間加蓋騎縫章
	function printExtraSealMark() {
		if(!!_opener.sealMarkImgData) {
			var smid = _opener.sealMarkImgData;
			var smsz = _opener.sealMarkSize;
			var printMarginForIE = _opener.printMarginForIE;
			var rightSealMarkSpace = _opener.rightSealMarkSpace;
			var docNo = _opener.sealMarkDocNo;	// 1110627 Raymond 1110271 改用全域的sealMarkDocNo變數, 因歷史檢視列印時有可能與目前簽核公文是不同文號
			var $pgs = $("div.pg");
			// 1090827 Raymond 1090638 修正未勾選分頁設定時, 最末頁非空白頁, 未加蓋騎縫章的問題
			// 1071102 Raymond John說最末一頁空白頁不要加蓋騎縫章
			//var n = $pgs.length;
			//var n = $pgs.length - 1;
			var n = $pgs.length - (($pgs.last().children().length == 0)?1:0);
			var seeds = new Array(n);
			// 1070907 Raymond 1070277 前一組分繕受文者名稱(記錄在.pg的data-receiver屬性)及是否勾選套印騎縫章
			var prevReceiver = "", allowPrintSealMarkEx = true;
			for(var i=0; i<n; i++) {
				var $pg = $pgs.eq(i);
				
				// 1070907 Raymond 1070277 檢查是否有data-receiver屬性, 若有則檢查是否與前一組data-receiver屬性不同
				var dataReceiver = $pg.attr("data-receiver");
				var dataPrintSealMark = $pg.attr("data-printsealmark");
				console.log("dataReceiver=" + dataReceiver + ", dataPrintSealMark=" + dataPrintSealMark);
				
				if(i > 0) {	// 非首頁檢查左騎縫章是否已存在, 不存在則加蓋
					
					// 1070907 Raymond 1070277 分繕第二個以後受文者的第1頁不要加蓋左騎縫章, 且要移除前一頁的右騎縫章
					//if($pg.find(".leftSealMark").length == 0) {
					if(!!dataReceiver && dataReceiver.length && dataReceiver != prevReceiver) {
						console.log("分繕受文者由'" + prevReceiver + "'改為'" + dataReceiver + "', 移除前一頁的額外右騎縫章");
						$pgs.eq(i-1).find(".rightSealMarkEx").remove();
						// 1110613 Raymond 1110271 判斷前一頁若是空白頁則一併移除前一頁的額外左騎縫章及前前頁的額外右騎縫章
						if(isBlankPage($pgs.eq(i-1))) {
							$pgs.eq(i-1).find(".leftSealMarkEx").remove();
							$pgs.eq(i-2).find(".rightSealMarkEx").remove();
						}
						prevReceiver = dataReceiver;
					}
					else if(!!dataPrintSealMark && dataPrintSealMark == "false") {	// 1071102 Raymond John說發文用時, 空白頁與本文末頁不要有騎縫章, 包括附件頁與本文末頁也是
						console.log("本頁不要列印騎縫章, 移除前一頁的額外右騎縫章");
						$pgs.eq(i-1).find(".rightSealMarkEx").remove();
					}
					else if($pg.find(".leftSealMark").length == 0 && allowPrintSealMarkEx && isBlankPage($pgs.eq(i-1))) {	// 1110613 Raymond 1110271 前一頁是空白頁
						console.log("前一頁是空白頁, 不要列印騎縫章, 搬移前一頁的左騎縫章至本頁並移除前一頁的額外右騎縫章");
						$pgs.eq(i-1).find(".leftSealMarkEx").appendTo($pg);		// 將前一頁空白頁的左騎縫章搬到此頁
						$pgs.eq(i-1).find(".rightSealMarkEx").remove();
					}
					else if(i == (n-1) && isBlankPage($pg)) {// 1110613 Raymond 1110271 最末頁是空白頁則不要加蓋額外的左騎縫章並移除前一頁的額外右騎縫章
						console.log("最末頁是空白頁, 不要列印騎縫章, 移除前一頁的額外右騎縫章");
						$pgs.eq(i-1).find(".rightSealMarkEx").remove();
					}
					else if($pg.find(".leftSealMark").length == 0 && allowPrintSealMarkEx) {
						// 1110613 Raymond 1110271 額外套上的左騎縫章增加leftSealMarkEx的類別, 讓下一頁若是接續的文稿、附件頁時可以找到搬移
						var $sm = $("<div class='leftSealMarkEx' style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
						$sm.find("img").attr("src", smid);
						
						var seed = seeds[i-1];
						if(!seed)
							seed = Math.random();
						
						if(typeof smsz === "string") {
							var p = smsz.split(/x/i);
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
						if(printMarginForIE > 0) {	// 2016.12.1 fix for IE列印反推邊界功能
							$sm.css({left: (15 - printMarginForIE - (p[0] / 2)) + "mm"});
						}
						if(p[0] > p[1]) {	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
							$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + ((Number(p[1]) + Number(p[0])) / 2) + "mm, " + (p[0] / 2 + 10) + "mm, " + (p[0] / 2) + "mm)");
							$sm.find("span").css("left", (p[1] / 2 + 2) + "mm");
						}
					}
					// 1070907 Raymond 1070277 左騎縫章是否套印看前一次的printSealMark設定, 套印後再讀取新的printSealMark設定
					if(!!dataPrintSealMark && dataPrintSealMark.length) {
						allowPrintSealMarkEx = dataPrintSealMark.match(/true/i);
						console.log(((allowPrintSealMarkEx)?"須":"不") + "套印額外騎縫章");
					}
				}
				if(i < (n - 1)) {	// 非末頁檢查右騎縫章是否已存在, 不存在則加蓋
					console.log("i=" + i + ", n=" + n + ", .rightSealMark=" + $pg.find(".rightSealMark").length);
					
					// 1070907 Raymond 1070277 分繕第一個受文者的第1頁只要記錄下受文者名稱
					//if($pg.find(".rightSealMark").length == 0) {
					if(!!dataPrintSealMark && dataPrintSealMark.length) {
						allowPrintSealMarkEx = dataPrintSealMark.match(/true/i);
						console.log(((allowPrintSealMarkEx)?"須":"不") + "套印額外騎縫章");
					}
					if(!!dataReceiver && dataReceiver.length && dataReceiver != prevReceiver) {
						prevReceiver = dataReceiver;
					}
					if($pg.find(".rightSealMark").length == 0 && allowPrintSealMarkEx) {
						// 1070907 Raymond 1070277 額外套上的右騎縫章增加rightSealMarkEx的類別, 讓下一頁若是另一個受文者時可以找到刪除
						//var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
						var $sm = $("<div class='rightSealMarkEx' style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
						$sm.find("img").attr("src", smid);
							
						var seed = seeds[i];
						if(!seed)
							seed = seeds[i] = Math.random();
						
						if(typeof smsz === "string") {
							var p = smsz.split(/x/i);
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
						if(!!rightSealMarkSpace)
							cx = rightSealMarkSpace;
						$sm.css({
							top: (Math.ceil(seed * 40) + 30) + "%",
							right: (cx - (p[0] / 2) + 7) + "mm",		// 2016.10.13 列印會超出右邊界可列印範圍, 要內縮
							clip: "rect(-4mm, " + (Number(p[0]) / 2) + "mm, " + (Number(p[1]) + 4) + "mm, " + "-4mm)"
						});
						// 1140409 Raymond 1140481 修正雙面列印時, 偶數頁的裝訂線應顯示在右邊界, 偶數頁的右騎縫章內縮改為左騎縫章原來的內縮距離
						var $rightBinding = $pg.find("[name='rightRegion']").find("span").filter((idx, sp) => {
							if(sp.textContent.match(/\W+裝\W+訂\W+線\W+/))
								return true;
						});
						if($rightBinding.length)	// 此頁的右邊界有裝訂線, 將右騎縫章內縮至右裝訂線內
							$sm.css("right", 15 - (p[0] / 2) + "mm");
						else
						if(printMarginForIE > 0) {	// 2016.12.1 fix for IE列印反推邊界功能
							$sm.css({right: (0 - printMarginForIE) + "mm"});
						}
						if(p[0] > p[1])	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
							$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + (p[0] / 2) + "mm, " + (p[0] / 2 + 10) + "mm, 0mm)");
					}
				}
			}
		}
	}
	
	function getReady(){
		var jobId = _getURLParameter('JobId');
		// 1120810 Raymond 1120503 新增從LocalStorage判讀是否應另存影像檔(PNG)
		if(!!localStorage[jobId] && localStorage[jobId].match(/ExportImage/)) {
			exportImage = true;
			$('body').html(parent.tmpHtml);	// 另存影像檔功能會用IFRAME內嵌輸出的頁面, 所以改用parent讀取
			//1090313	Leslie[1090036]	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
			$('title').text(parent.tmpTitle);
			window.clearInterval(_getReady);
			LoadImgProcess();
			// 1070322 Raymond 修正IE環境下此delete指令會丟出Exception的問題
			try {
				delete parent.tmpHtml;
				delete parent.tmpTitle;
			}
			catch(e) {
				console.warn(e.message);
			}
		}
		else
		// 1110722 Raymond 1110416 新增判斷localStorage[jobId]是否為"Ready"(PrintFolio->AOLPrint)
		//if(localStorage[jobId]){
		if(localStorage[jobId] == "Ready"){
			//var t0 = new Date();
			//localStorage["aolPrintLog"] = t0.getHours() + ":" + t0.getMinutes() + ":" + t0.getSeconds() + "." + ("" + t0.getMilliseconds()).padStart(3, 0) + " - starting load body content...";	// 1120106 for test
			$('body').html(_opener.tmpHtml);
			/*$('body').html(_opener.tmpHtml).ready(function() {
				let t = new Date();
				localStorage["aolPrintLog"] += "\n" + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + ("" + t.getMilliseconds()).padStart(3, 0) + " - body content loaded.";
			});*/
			//1090313	Leslie[1090036]	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
			$('title').text(_opener.tmpTitle);
			
			// 1111026 Raymond 陸委會序347 改在RD-Layout.js調整
			// 1111014 Raymond 陸委會序332 修正Chrome/Edge下某些案例的條列文字在瀏覽器的列印預覽介面中比列印分頁提前一個字斷行的問題
			/*if(navigator.userAgent.indexOf("Chrome") >= 0) {
				$("[name='bodyRegion']").each(function() {$(this).css("width", "calc(" + ($(this).data("width")) + " + 1px)");});
			}*/
			
			LoadImgProcess();
			window.clearInterval(_getReady);
			// 1070322 Raymond 修正IE環境下此delete指令會丟出Exception的問題
			try {
			delete _opener.tmpHtml;
			//1090313	Leslie[1090036]	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
			delete _opener.tmpTitle;
			}
			catch(e) {
				console.warn(e.message);
			}
		}
	}
	
	/*
	 * 目的: 取得指定名稱的網址參數設定值
	 */
	function _getURLParameter(paraname) {
		var rslt = decodeURIComponent((new RegExp('[?|&]' + paraname + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		if (typeof rslt !== 'string') {
			return '';
		}
		else {
			return rslt;
		}
	}
	
	var _getReady = window.setInterval(getReady,300);
});