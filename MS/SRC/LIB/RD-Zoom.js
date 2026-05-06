// Zoom namespace
//   
//  2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
// 1080924 1080339     Kevin   Eric    jQuery 3.0 upgrade
// 1100519 1100298     Raymond Raymond 修正拖拉改變文字意見大小時, 會觸發resize, 致重複觸發onChangeFitMode問題
// 1120331 彙整表序38  Raymond Raymond 修正Chrome在登入系統後第一次開啟唯讀資料夾(ex.會核中-主辦)公文時, 執行放大後, scroll bar沒有更新到高度, 導致無法向下捲到頁底的問題
// 1130430 中榮序94    Raymond Raymond 記憶的前次縮放比小於100時, 開啟公文後未計算scrollHeight為縮小後的高度, 會使頁面捲到底後還多出一段空白, 導致向下滾/撥的動作要多捲幾次到底才會觸發翻下一頁
// 1140619 1140876     Raymond Raymond GestureEnd時先恢復全域阻擋翻頁變數, 不確定是否是因為類似MSGestureEnd的問題, window.blockSwiping未恢復, 導致無法翻頁

//var _zc_y = 0;
	
function ZoomController() {
	
	this.currScale = 100;

	var startScale = 100;
	var startTime = null;
	var suspendPanning = false;
	var duringGesturing = false;
	//var _fw;
	var _center;
	var _anchor;
	var maxScale = 400, minScale = 50;
	var msGesture = ("MSGesture" in window)?new MSGesture():null;	// for IE11/Edge
	
	var that = this;
	function onTouchStart(event) {
		console.log("on" + event.type);
		var zc = $(this).data("zoomController");
		zc.ptOrigin = {x: event.originalEvent.touches[0].pageX, y: event.originalEvent.touches[0].pageY};
		//if(typeof _fw == "undefined")
		//    _fw = $("<div style='position:absolute;background-color:lime;border:1px solid orange;z-index:3000;max-height:600px;overflow-y:scroll'></div>").appendTo("body");
		if(typeof _center == "undefined")
			_center = $("<div style='position:absolute;border:4px solid red;z-index:3000;display:none;color:blue'></div>").appendTo("body");
		if(typeof _anchor == "undefined")
			_anchor = $("<div style='position:absolute;border:4px solid green;z-index:3000;display:none'></div>").appendTo(zc.viewPortElem.parentNode);
		//if(_fw.html().length > 0)
		//    _fw.html(_fw.html() + "<br>");
		//_fw.html(_fw.html() + "touchstart:" + event.originalEvent.touches.length);
		//_fw.html(_fw.html() + "touchstart:scroll:" + this.parentNode.scrollLeft + "," + this.parentNode.scrollTop);
		if(event.originalEvent.touches.length > 1) {
			zc.ptPinch = {x: event.originalEvent.touches[1].pageX, y:event.originalEvent.touches[1].pageY};
			zc.ptCenter = {
				x: (zc.ptOrigin.x + zc.ptPinch.x) / 2,
				y: (zc.ptOrigin.y + zc.ptPinch.y) / 2
			}
			zc.ptOffset = {
				x: Math.floor(zc.ptCenter.x - zc.origX - this.parentNode.scrollLeft),
				y: Math.floor(zc.ptCenter.y - zc.origY - this.parentNode.scrollTop)
			}
			zc.ptClient = {
				x: Math.floor(zc.ptOffset.x  - $(this).offset().left + zc.origX),
				y: Math.floor(zc.ptOffset.y - $(this).offset().top + zc.origY)
			}
			if("$dh" in zc) {
				var scroll = {left: this.parentNode.scrollLeft, top: this.parentNode.scrollTop};
				zc.$dh.text($(this).css("-webkit-transform-origin") + ";" + scroll.left + "," + scroll.top + ";" + zc.ptOffset.x + "," + zc.ptOffset.y + "->" + (zc.ptOffset.x + scroll.left) + "," + (zc.ptOffset.y + scroll.top));
			}
			//_fw.html(_fw.html() + ";center:(" + that.ptCenter.x + "," + that.ptCenter.y + ");calc:(" + that.ptCalc.x + "," + that.ptCalc.y + ")");
			_center.css({left:zc.ptCenter.x + "px", top:zc.ptCenter.y + "px"});
			_anchor.css({left:Math.floor(zc.ptClient.x * zc.currScale / 100) + "px", top:Math.floor(zc.ptClient.y * zc.currScale / 100) + "px"}).text(zc.ptClient.x + "," + zc.ptClient.y);
		}
	}
	
	function onGestureStart(event) {
		console.log("on" + event.type);
		if(!window.disableSecondTouch) {	// 2016.3.8 使用Apple Pencil時取消兩指觸控行為
			event.originalEvent.preventDefault();
			//$("#leftPart #fitMode-button .ui-btn-text").get(0).innerText = event.originalEvent.scale;
			//_draft.$page.find("#viewPort").css("webkitTransformOrigin", "left top");
			startScale = that.currScale;
			startTime = new Date();
			suspendPanning = true;
			duringGesturing = true;
			//_draft.editCursor.hide();   // 縮放時隱藏指令列及游標
			
			//if(_fw.html().length > 0)
			//    _fw.html(_fw.html() + "<br>");
			//_fw.html(_fw.html() + "gesturestart:scale:" + event.originalEvent.scale);
			
			// 1140619 Raymond 1140876 新增記錄全域變數因GestureStart而設為true
			theLogger.log("因觸發gesturestart事件, 全域變數blockSwiping設為true");
			// 2015.4.14 - 設定全域變數, 暫時停用觸控翻頁功能
			window.blockSwiping = true;
		}
	}
	
	function onTouchMove(event) {
		console.log("on" + event.type);
		if(duringGesturing) {
			//if(_fw.html().length > 0)
			//    _fw.html(_fw.html() + "<br>");
			//_fw.html(_fw.html() + "touchmove:" + event.originalEvent.touches.length);
			var zc = $(this).data("zoomController");
			if(event.originalEvent.touches.length > 1) {
				zc.ptOrigin = {x: event.originalEvent.touches[0].pageX, y:event.originalEvent.touches[0].pageY};
				zc.ptPinch = {x: event.originalEvent.touches[1].pageX, y:event.originalEvent.touches[1].pageY};
				zc.ptCenter = {
					x: (zc.ptOrigin.x + zc.ptPinch.x) / 2,
					y: (zc.ptOrigin.y + zc.ptPinch.y) / 2
				}
				zc.ptOffset = {
					x: Math.floor(zc.ptCenter.x - zc.origX - this.parentNode.scrollLeft),
					y: Math.floor(zc.ptCenter.y - zc.origY - this.parentNode.scrollTop)
				}
				//_fw.html(_fw.html() + ";center:(" + that.ptCenter.x + "," + that.ptCenter.y + ");calc:(" + that.ptCalc.x + "," + that.ptCalc.y + ")");
				_center.css({left:zc.ptCenter.x + "px", top:zc.ptCenter.y + "px"}).html(zc.ptCenter.x + "," + zc.ptCenter.y + "<br>" + zc.ptOffset.x + "," + zc.ptOffset.y + "<br>" + zc.origX + "," + zc.origY + "<br>" + Math.floor($(this).offset().left) + "," + Math.floor($(this).offset().top) + "<br>" + zc.ptClient.x + "," + zc.ptClient.y);
				_anchor.css({left:Math.floor(zc.ptClient.x + $(this).offset().left - zc.origX) + "px", top:Math.floor(zc.ptClient.y + $(this).offset().top - zc.origY) + "px"}).text(zc.ptClient.x + "," + zc.ptClient.y);
			}
		}
	}
	
	function onGestureChange(event) {
		//$("#leftPart #fitMode-button .ui-btn-text").get(0).innerText = "onGestureChange:" + duringGesturing;
		console.log("on" + event.type);
		if(duringGesturing) {
			var zc = $(this).data("zoomController");
			//$("#leftPart #fitMode-button .ui-btn-text").get(0).innerText = "onGestureChange";
			var scaleTo = Math.min(maxScale, Math.max(minScale, Math.floor((event.originalEvent.scale * 100) + startScale - 100)));	// 2015.5.12 新增最大最小限制
			var timeSpan = new Date((new Date()) - startTime);
			theLogger.log("scaleTo: " + scaleTo + " (" + timeSpan.getSeconds() + "." + timeSpan.getMilliseconds() + "s)");
			//$(this).css("-webkit-transform", "translate(" + ((100 - scaleTo) * 5) + "px," + ((100 - scaleTo) * 4) + "px) scale(" + scaleTo / 100 + ")");
			//$(this).css("-webkit-transform", "translate(" + (0 - Math.floor((scaleTo - 100) * that.ptCalc.x / 100)) + "px," + (0 - Math.floor((scaleTo - 100) * that.ptCalc.y / 100)) + "px) scale(" + scaleTo / 100 + ")");
			//$(this).css("-webkit-transform", "translate(" + (that.ptOffset.x - Math.floor(that.ptClient.x * scaleTo / 100)) + "px," + (that.ptOffset.y - Math.floor(that.ptClient.y * scaleTo / 100)) + "px) scale(" + scaleTo / 100 + ")");
			var scroll = {left: this.parentNode.scrollLeft, top: this.parentNode.scrollTop};
			if("$dh" in zc)
				zc.$dh.text($(this).css("-webkit-transform-origin") + ";" + scroll.left + "," + scroll.top + ";" + zc.ptOffset.x + "," + zc.ptOffset.y + "->" + (zc.ptOffset.x + scroll.left) + "," + (zc.ptOffset.y + scroll.top));
//			$(this).css("-webkit-transform", "translate(" + Math.floor((zc.ptOffset.x + scroll.left - zc.ptClient.x) * scaleTo / 100) + "px," + Math.floor((zc.ptOffset.y + scroll.top - zc.ptClient.y) * scaleTo / 100) + "px) scale(" + (scaleTo / 100) + ")")// rotate(" + event.originalEvent.rotation + "deg)")
//				.css("-webkit-transform-origin", (zc.ptOffset.x + scroll.left) + "px " + (zc.ptOffset.y + scroll.top) + "px");
//			var off = $(this.parentNode).offset();
			
			// 2015.6.3 修正進行縮放手勢時, 依初始縮放比計算頁面的位移偏量
			var x = zc.ptCenter.x * 100 / startScale, y = zc.ptCenter.y * 100 / startScale;
			// 2015.6.8 強制使用瀏覽器的硬體加速
			$(this).css("-webkit-transform", "scale(" + (scaleTo / 100) + ") translate(" + Math.floor(zc.ptCenter.x - x) + "px, " + Math.floor(zc.ptCenter.y - y) + "px)")
//				.css("-webkit-transform-origin", Math.floor(zc.ptCenter.x * 100 / scaleTo) + "px " + Math.floor(zc.ptCenter.y * 100 / scaleTo) + "px");
				.css("-webkit-transform-origin", Math.floor(zc.ptCenter.x) + "px " + Math.floor(zc.ptCenter.y) + "px");
			zc.currScale = scaleTo;
			if(zc.zoomSelectElem != undefined) {
				/*that.zoomLevelElem.innerText = that.currScale + "%";*/
				$(zc.zoomSelectElem).find("option:first").val(zc.currScale).text(zc.currScale + "%");
				$(zc.zoomSelectElem).prop("selectedIndex", 0);
				$(zc.zoomSelectElem).selectmenu("refresh");
			}
			startTime = new Date();
			
			//_center.text(zc.origX + "," + zc.origY/*event.originalEvent.rotation*/);
		}                
	}
	
	function onGestureEnd(event) {
		//$("#leftPart #fitMode-button .ui-btn-text").get(0).innerText = "onGestureEnd:" + duringGesturing;
		console.log("on" + event.type);
		if(duringGesturing) {
			// 2015.4.14 - 設定全域變數, 恢復停用觸控翻頁功能
			// 1140619 Raymond 1140876 搬到if前, 不確定是否是因為類似MSGesture問題, window.blockSwiping未恢復, 導致無法翻頁
			theLogger.log("因觸發gestureend事件, 以Timeout方式恢復全域變數blockSwiping");
			setTimeout(function() {
				theLogger.log("因觸發gestureend事件, 全域變數blockSwiping設為false");
				window.blockSwiping = false;
			}, 250);
			event.originalEvent.preventDefault();
			suspendPanning = false;
			duringGesturing = false;
			var zc = $(this).data("zoomController");
			var offset = $(zc.viewPortElem).offset();	// 2015.2.6 - scale之前的offset
			//if("$dh" in zc)
			//	zc.$dh.text(Math.floor(offset.left) + "," + Math.floor(offset.top));
			var mt = $(this).css("-webkit-transform");
			//alert(mt);
			mt = mt.replace(/^matrix\(/, "[").replace(/\)$/, "]");
			//alert(mt);
			var m = JSON.parse(mt);
			//alert(m);
			// 2015.6.3 修正結束縮放手勢時, 取m陣列位移及origin位置, 做為頁面的位移偏量
			var of = {
				x: Math.floor(Number(m[4]) / Number(m[0])),
				y: Math.floor(Number(m[5]) / Number(m[0]))
			};
			var og = $(this).css("-webkit-transform-origin");
			og = og.split(" ");
			var x = Number(og[0].replace(/px/g, '')) / Number(m[0]);
			var y = Number(og[1].replace(/px/g, '')) / Number(m[0]);
			//alert("y=" + y + "\r\nCenter.y=" + zc.ptCenter.y + "\r\nscrollTop=" + this.parentNode.scrollTop + "\r\n" + (zc.ptCenter.y - y) + "\r\n" + (zc.ptCenter.y - y - of.y));
			//alert("x=" + x + "\r\nCenter.x=" + zc.ptCenter.x + "\r\nscrollLeft=" + this.parentNode.scrollLeft + "\r\n" + (zc.ptCenter.x - x) + "\r\n" + (zc.ptCenter.x - x - of.x));
			//alert($(this.parentNode).offset().left + "," + $(this.parentNode).offset().top);
			// TODO: 如果parentNode.scrollLeft、scrollTop小於m[4]、m[5],應做bouncing動畫來拉回
			// 2015.6.8 強制使用瀏覽器的硬體加速
			$(this).css("-webkit-transform", "scale(" + m[0] + ") translate(0px, 0px)")
					.css("-webkit-transform-origin", "0px 0px");
			//if(m[0] != that.currScale / 100)
			//	alert(m[0] + " != " + that.currScale / 100);
			//alert("this:" + this.className + "\n" + $(this).width() + "," + $(this).height());
			//$(this).width(Math.floor(zc.origWidth + ((m[0] - 1) * zc.origWidth / m[0]))/* zc.currScale / 100*/ + "px")
			//       .height(Math.floor(zc.origHeight + ((m[0] - 1) * zc.origHeight / m[0])) /* zc.currScale / 100*/ + "px");
			// 2016.2.26 - 若縮放比例小於100%的話, 寬高要調小
			if(zc.currScale < 100) {
				$(this).width(Math.floor(zc.origWidth*zc.currScale/100) + "px")
						.height(Math.floor(zc.origHeight*zc.currScale/100) + "px");
			}
			else
			// 2015.2.6 - fix, width/height不異動的話, scroll range貎似不會更新
			if($(this).width() == zc.origWidth)
				$(this).width(Math.floor(zc.origWidth+1) + "px")
						.height(Math.floor(zc.origHeight+1) + "px");
			else
				$(this).width(Math.floor(zc.origWidth) + "px")
						.height(Math.floor(zc.origHeight) + "px");
			// 2015.6.3 修正結束縮放手勢時, 會回復成僅顯示頁面左上角
			this.parentNode.scrollTop = (zc.ptCenter.y - y - of.y) * Number(m[0]) + this.parentNode.scrollTop;
			this.parentNode.scrollLeft = (zc.ptCenter.x - x - of.x) * Number(m[0]) + this.parentNode.scrollLeft;
			//if("$dh" in zc)
			//	zc.$dh.text(zc.$dh.text() + ";" + this.parentNode.scrollLeft + "," + this.parentNode.scrollTop);
			//this.parentNode.scrollLeft = this.parentNode.scrollLeft - m[4];
			//this.parentNode.scrollTop = this.parentNode.scrollTop - m[5];
//			this.parentNode.scrollLeft = zc.origX - Math.floor(offset.left);
//			this.parentNode.scrollTop = zc.origY - Math.floor(offset.top);
			//if("$dh" in zc)
			//	zc.$dh.text(zc.$dh.text() + ";" + mt + ";" + offset.top + "," + (offset.top * zc.currScale / 100) + ";" + zc.currScale + ";" + this.parentNode.scrollLeft + "," + this.parentNode.scrollTop);
			//alert(this.parentNode.scrollLeft + "," + this.parentNode.scrollTop);
			//alert(that.origWidth + "->" + $(this).width());

			// 2016.9.2 新增記錄所選縮放模式
			var key = "zoomController_" + ($(zc.zoomSelectElem).closest("#zoomControl1, #zoomControl2").length?$(zc.zoomSelectElem).closest("#zoomControl1, #zoomControl2").attr("id"):"global");
			localStorage[key] = zc.currScale;
		}
	}
	
	function onChangeFitMode() {
		var to = $(this).val(); // 2013.9.13 - Raymond, 暫存變數
		theLogger.log("onChangeFitMode(" + this.id + "): " + to);
		// 2016.9.2 新增記錄所選縮放模式
		var key = "zoomController_" + ($(that.zoomSelectElem).closest("#zoomControl1, #zoomControl2").length?$(that.zoomSelectElem).closest("#zoomControl1, #zoomControl2").attr("id"):"global");
		switch(to) {
			case "0":	// 符合視窗
				if(that.viewPortElem != undefined) {
					var scaleTo = 50;
					// 2016.2.26 以目前的Dimension計算符合視窗的放大比例
					var cw = that.viewPortElem.parentNode.clientWidth,
						ch = that.viewPortElem.parentNode.clientHeight;
					var sx = cw / that.origWidth,
						sy = ch / that.origHeight;
					//alert([cw, ch, sx, sy]);
					scaleTo = Math.floor(Math.min(sx, sy) * 100);
					
					$(that.viewPortElem).css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												 "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												  "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
													  "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"
											});
					that.currScale = scaleTo;
					//$(that.viewPortElem).width(that.origWidth * that.currScale / 100 + "px")
					//                    .height(that.origHeight * that.currScale / 100 + "px");
					// 2015.6.5 縮小時scrollLeft、Top要歸0, 否則可能縮小到可視範圍外
					that.viewPortElem.parentNode.scrollLeft = 0;
					that.viewPortElem.parentNode.scrollTop = 0;
					// 2015.11.24 - fix, 先2指放大再選單切回符合視窗時scroll range還是放大時的狀態, 重設一次寬度來更新scroll range
					// 2016.2.26 - 配合scaleTo重新計算, 寬高調整也要重新計算
						$(that.viewPortElem).width(Math.floor(that.origWidth*scaleTo/100) + "px")
											.height(Math.floor(that.origHeight*scaleTo/100) + "px");
				}
				// 2016.9.2 新增記錄所選縮放模式
				localStorage[key] = "0";
				break;
			case "-1":	// 符合寬度
				if(that.viewPortElem != undefined) {
					var scaleTo = 90;
					// 2016.2.26 以目前的Dimension計算符合視窗的放大比例
					var cw = that.viewPortElem.parentNode.clientWidth;
					scaleTo = Math.floor((cw / that.origWidth) * 100);
					//alert([cw, that.origWidth, scaleTo]);
					
					$(that.viewPortElem).css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												 "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												  "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
													  "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"
											});
					that.currScale = scaleTo;
					//$(that.viewPortElem).width(that.origWidth + "px")
					//                    .height(that.origHeight + "px");
					// 2015.6.5 縮小時scrollLeft、Top要歸0, 否則可能縮小到可視範圍外
					that.viewPortElem.parentNode.scrollLeft = 0;
					that.viewPortElem.parentNode.scrollTop = 0;
					// 2015.11.24 - fix, 先2指放大再選單切回符合寬度時scroll range還是放大時的狀態, 重設一次寬度來更新scroll range
					// 2016.2.26 - 配合scaleTo重新計算, 寬高調整也要重新計算
					if($(that.viewPortElem).width() == that.origWidth)
						$(that.viewPortElem).width((that.origWidth+1) + "px")
											.height((that.origHeight+1) + "px");
					else
						$(that.viewPortElem).width(that.origWidth + "px")
											.height(that.origHeight + "px");
				}
				// 2016.9.2 新增記錄所選縮放模式
				localStorage[key] = "-1";
				break;
			case "-2":	// 原尺寸
				if(that.viewPortElem != undefined) {
					var scaleTo = 100;
					$(that.viewPortElem).css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												 "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												  "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
													  "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"
											});
					that.currScale = scaleTo;
					//$(that.viewPortElem).width(that.origWidth + "px")
					//                    .height(that.origHeight + "px");
					// 2015.6.5 縮小時scrollLeft、Top要歸0, 否則可能縮小到可視範圍外
					that.viewPortElem.parentNode.scrollLeft = 0;
					that.viewPortElem.parentNode.scrollTop = 0;
					// 2015.11.24 - fix, 先2指放大再選單切回原尺寸時scroll range還是放大時的狀態, 重設一次寬度來更新scroll range
					if($(that.viewPortElem).width() == that.origWidth)
						$(that.viewPortElem).width((that.origWidth+1) + "px")
								.height((that.origHeight+1) + "px");
					else
						$(that.viewPortElem).width(that.origWidth + "px")
								.height(that.origHeight + "px");
				}
				// 2016.9.2 新增記錄所選縮放模式
				localStorage[key] = "-2";
				break;
			default:    // 2013.9.13 - Raymond, 修正選取第1筆時應套用val()所回傳的百分比
				if(that.viewPortElem != undefined) {
					var scaleTo = Number(to);
					$(that.viewPortElem).css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												 "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
												  "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
													  "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"
											});
					that.currScale = scaleTo;
					// 1130430 Raymond 中榮序94 記憶的前次縮放比小於100時, 開啟公文後未計算scrollHeight為縮小後的高度, 會使頁面捲到底後還多出一段空白, 導致向下滾/撥的動作要多捲幾次到底才會觸發翻下一頁
					if(scaleTo < 100)
						$(that.viewPortElem).width(Math.floor(that.origWidth*scaleTo/100) + "px")
											.height(Math.floor(that.origHeight*scaleTo/100) + "px");
					else
					//$(that.viewPortElem).width(that.origWidth + "px")
					//                    .height(that.origHeight + "px");
					// 2015.6.5 - fix, width/height不異動的話, scroll range貎似不會更新
					if($(that.viewPortElem).width() == that.origWidth)
						$(that.viewPortElem).width(Math.floor(that.origWidth+1) + "px")
								.height(Math.floor(that.origHeight+1) + "px");
					else
						$(that.viewPortElem).width(Math.floor(that.origWidth) + "px")
								.height(Math.floor(that.origHeight) + "px");
				}
				// 2016.9.2 新增記錄所選縮放模式
				localStorage[key] = to;
				break;
		}
	}
	
	// 2016.4.1 新增桌機縮放控制方法
	function onZoomOut() {
		var mode = $(this).val();
		if(that.currScale <= minScale)
			return;
		var scaleTo = that.currScale - 10;
		if(mode <= 0)
			theLogger.log("onZoomOut: " + that.currScale + "->" + scaleTo + " mode:" + mode);
		else
			theLogger.log("onZoomOut: " + that.currScale + "->" + scaleTo);
		$(that.viewPortElem).css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									 "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									  "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
										  "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"
								});
		that.currScale = scaleTo;
		$(that.zoomSelectElem).find("option:first").val(that.currScale).text(that.currScale + "%");
		$(that.zoomSelectElem).prop("selectedIndex", 0);
		$(that.zoomSelectElem).selectmenu("refresh");
		if(that.currScale < 100) {
			$(that.viewPortElem).width(Math.floor(that.origWidth*that.currScale/100) + "px")
					.height(Math.floor(that.origHeight*that.currScale/100) + "px");
		}
		else if($(that.viewPortElem).width() == that.origWidth)
			$(that.viewPortElem).width(Math.floor(that.origWidth+1) + "px")
					.height(Math.floor(that.origHeight+1) + "px");
		else
			$(that.viewPortElem).width(Math.floor(that.origWidth) + "px")
					.height(Math.floor(that.origHeight) + "px");
		// 1120331 Raymond 問題彙整表序38 修正Chrome在登入系統後第一次開啟唯讀資料夾(ex.會核中-主辦)公文時, 執行放大後, scroll bar沒有更新到高度, 導致無法向下捲到頁底的問題
		// solution from https://stackoverflow.com/questions/41425785/scrollbar-not-getting-modifed-when-scale-changes-in-chrome
		that.viewPortElem.style.display = "none";
		that.viewPortElem.offsetHeight;
		that.viewPortElem.style.display = "";
		// 2016.9.2 新增記錄所選縮放模式
		var key = "zoomController_" + ($(that.zoomSelectElem).closest("#zoomControl1, #zoomControl2").length?$(that.zoomSelectElem).closest("#zoomControl1, #zoomControl2").attr("id"):"global");
		localStorage[key] = that.currScale;
	}
	// 2016.4.1 新增桌機縮放控制方法
	function onZoomIn() {
		var mode = $(this).val();
		if(that.currScale >= maxScale)
			return;
		var scaleTo = that.currScale + 10;
		if(mode <= 0)
			theLogger.log("onZoomIn: " + that.currScale + "->" + scaleTo + " mode:" + mode);
		else
			theLogger.log("onZoomIn: " + that.currScale + "->" + scaleTo);
		
		$(that.viewPortElem).css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									 "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									  "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
										  "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"
								});
		
		that.currScale = scaleTo;
		$(that.zoomSelectElem).find("option:first").val(that.currScale).text(that.currScale + "%");
		$(that.zoomSelectElem).prop("selectedIndex", 0);
		$(that.zoomSelectElem).selectmenu("refresh");
		if(that.currScale < 100) {
			$(that.viewPortElem).width(Math.floor(that.origWidth*that.currScale/100) + "px")
					.height(Math.floor(that.origHeight*that.currScale/100) + "px");
		}
		else if($(that.viewPortElem).width() == that.origWidth)
			$(that.viewPortElem).width(Math.floor(that.origWidth+1) + "px")
					.height(Math.floor(that.origHeight+1) + "px");
		else
			$(that.viewPortElem).width(Math.floor(that.origWidth) + "px")
					.height(Math.floor(that.origHeight) + "px");
		// 1120331 Raymond 問題彙整表序38 修正Chrome在登入系統後第一次開啟唯讀資料夾(ex.會核中-主辦)公文時, 執行放大後, scroll bar沒有更新到高度, 導致無法向下捲到頁底的問題
		// solution from https://stackoverflow.com/questions/41425785/scrollbar-not-getting-modifed-when-scale-changes-in-chrome
		that.viewPortElem.style.display = "none";
		that.viewPortElem.offsetHeight;
		that.viewPortElem.style.display = "";
		// 2016.9.2 新增記錄所選縮放模式
		var key = "zoomController_" + ($(that.zoomSelectElem).closest("#zoomControl1, #zoomControl2").length?$(that.zoomSelectElem).closest("#zoomControl1, #zoomControl2").attr("id"):"global");
		localStorage[key] = that.currScale;
	}
	var touches = [];
	// 2016.6.14 新增PointerEvents支援
	function onPointerDown(event) {
		console.log("on" + event.type + "(id:" + event.originalEvent.pointerId + ")");
		console.log(event.originalEvent);
		if(msGesture)
			msGesture.addPointer(event.originalEvent.pointerId);	// for IE11/Edge GestureEvents
		if(event.originalEvent.pointerType == "touch") {
			touches.push(event.originalEvent);
			
			var zc = $(this).data("zoomController");
			zc.ptOrigin = {x: touches[0].pageX, y: touches[0].pageY};
			if(typeof _center == "undefined")
				_center = $("<div style='position:absolute;border:4px solid red;z-index:3000;display:none;color:blue'></div>").appendTo("body");
			if(typeof _anchor == "undefined")
				_anchor = $("<div style='position:absolute;border:4px solid green;z-index:3000;display:none'></div>").appendTo(zc.viewPortElem.parentNode);
			console.log("touchs: " + touches.length);
			if(touches.length > 1) {
				zc.ptPinch = {x: touches[1].pageX, y: touches[1].pageY};
				zc.ptCenter = {
					x: (zc.ptOrigin.x + zc.ptPinch.x) / 2,
					y: (zc.ptOrigin.y + zc.ptPinch.y) / 2
				}
				console.log("ptCenter:" + zc.ptCenter.x + "," + zc.ptCenter.y);
				zc.ptOffset = {
					x: Math.floor(zc.ptCenter.x - zc.origX - this.parentNode.scrollLeft),
					y: Math.floor(zc.ptCenter.y - zc.origY - this.parentNode.scrollTop)
				}
				zc.ptClient = {
					x: Math.floor(zc.ptOffset.x  - $(this).offset().left + zc.origX),
					y: Math.floor(zc.ptOffset.y - $(this).offset().top + zc.origY)
				}
				if("$dh" in zc) {
					var scroll = {left: this.parentNode.scrollLeft, top: this.parentNode.scrollTop};
					zc.$dh.text($(this).css("transform-origin") + ";" + scroll.left + "," + scroll.top + ";" + zc.ptOffset.x + "," + zc.ptOffset.y + "->" + (zc.ptOffset.x + scroll.left) + "," + (zc.ptOffset.y + scroll.top));
				}
				_center.css({left:zc.ptCenter.x + "px", top:zc.ptCenter.y + "px"});
				_anchor.css({left:Math.floor(zc.ptClient.x * zc.currScale / 100) + "px", top:Math.floor(zc.ptClient.y * zc.currScale / 100) + "px"}).text(zc.ptClient.x + "," + zc.ptClient.y);
			}
		}
	}
	
	function onPointerMove(event) {
		//console.log("on" + event.type + "(id:" + event.originalEvent.pointerId + ")");
		if(event.originalEvent.pointerType == "touch") {
		}
		if(duringGesturing) {
			var zc = $(this).data("zoomController");
			if(touches.length > 1) {
				zc.ptOrigin = {x: touches[0].pageX, y: touches[0].pageY};
				zc.ptPinch = {x: touches[1].pageX, y: touches[1].pageY};
				zc.ptCenter = {
					x: (zc.ptOrigin.x + zc.ptPinch.x) / 2,
					y: (zc.ptOrigin.y + zc.ptPinch.y) / 2
				}
				zc.ptOffset = {
					x: Math.floor(zc.ptCenter.x - zc.origX - this.parentNode.scrollLeft),
					y: Math.floor(zc.ptCenter.y - zc.origY - this.parentNode.scrollTop)
				}
				_center.css({left:zc.ptCenter.x + "px", top:zc.ptCenter.y + "px"}).html(zc.ptCenter.x + "," + zc.ptCenter.y + "<br>" + zc.ptOffset.x + "," + zc.ptOffset.y + "<br>" + zc.origX + "," + zc.origY + "<br>" + Math.floor($(this).offset().left) + "," + Math.floor($(this).offset().top) + "<br>" + zc.ptClient.x + "," + zc.ptClient.y);
				_anchor.css({left:Math.floor(zc.ptClient.x + $(this).offset().left - zc.origX) + "px", top:Math.floor(zc.ptClient.y + $(this).offset().top - zc.origY) + "px"}).text(zc.ptClient.x + "," + zc.ptClient.y);
			}
		}
	}
	
	function onPointerUp(event) {
		console.log("on" + event.type + "(id:" + event.originalEvent.pointerId + ")");
		console.log(event.originalEvent);
		if(event.originalEvent.pointerType == "touch") {
			for(var i=0; i<touches.length; i++) {
				if(touches[i].pointerId == event.originalEvent.pointerId) {
					touches.splice(i, 1);
					break;
				}
			}
		}
	}
	
	function onPointerCancel(event) {
		console.log("on" + event.type + "(id:" + event.originalEvent.pointerId + ")");
		console.log(event.originalEvent);
		if(event.originalEvent.pointerType == "touch") {
			for(var i=0; i<touches.length; i++) {
				if(touches[i].pointerId == event.originalEvent.pointerId) {
					touches.splice(i, 1);
					break;
				}
			}
		}
	}
	
	function onMSGestureStart(event) {
		console.log("on" + event.originalEvent.type + "(scale:" + event.originalEvent.scale + ", rotation:" + event.originalEvent.rotation + ")");
		console.log(event.originalEvent);
		if(!window.disableSecondTouch) {	// 2016.3.8 使用Apple Pencil時取消兩指觸控行為
			//event.originalEvent.preventDefault();
			startScale = that.currScale;
			startTime = new Date();
			suspendPanning = true;
			duringGesturing = true;
			//_draft.editCursor.hide();   // 縮放時隱藏指令列及游標
			
			// 2015.4.14 - 設定全域變數, 暫時停用觸控翻頁功能
			window.blockSwiping = true;
		}
	}
	
	function onMSGestureChange(event) {
		console.log("on" + event.originalEvent.type + "(scale:" + event.originalEvent.scale + ", rotation:" + event.originalEvent.rotation + ", detail:" + event.originalEvent.detail + ")");
		console.log(event.originalEvent);
		if(duringGesturing && event.originalEvent.detail != 0) {
			var zc = $(this).data("zoomController");
			var scaleTo = Math.min(maxScale, Math.max(minScale, Math.floor((event.originalEvent.scale * 100) + zc.currScale - 100)));	// 2015.5.12 新增最大最小限制
			var timeSpan = new Date((new Date()) - startTime);
			theLogger.log("scaleTo: " + scaleTo + " (" + timeSpan.getSeconds() + "." + timeSpan.getMilliseconds() + "s)");
			var scroll = {left: this.parentNode.scrollLeft, top: this.parentNode.scrollTop};
			if("$dh" in zc)
				zc.$dh.text($(this).css("transform-origin") + ";" + scroll.left + "," + scroll.top + ";" + zc.ptOffset.x + "," + zc.ptOffset.y + "->" + (zc.ptOffset.x + scroll.left) + "," + (zc.ptOffset.y + scroll.top));
			
			if(typeof zc.ptCenter === "object") {	// 2016.8.22 FIX for 老A的觸控螢幕有MSGesture功能但沒開touch
				// 2015.6.3 修正進行縮放手勢時, 依初始縮放比計算頁面的位移偏量
				var x = zc.ptCenter.x * 100 / startScale, y = zc.ptCenter.y * 100 / startScale;
				// 2015.6.8 強制使用瀏覽器的硬體加速
				$(this).css("transform", "scale(" + (scaleTo / 100) + ") translate(" + Math.floor(zc.ptCenter.x - x) + "px, " + Math.floor(zc.ptCenter.y - y) + "px)")
					//.css("-webkit-transform-origin", Math.floor(zc.ptCenter.x * 100 / scaleTo) + "px " + Math.floor(zc.ptCenter.y * 100 / scaleTo) + "px");
					.css("transform-origin", Math.floor(zc.ptCenter.x) + "px " + Math.floor(zc.ptCenter.y) + "px");
				zc.currScale = scaleTo;
				if(zc.zoomSelectElem != undefined) {
					/*that.zoomLevelElem.innerText = that.currScale + "%";*/
					$(zc.zoomSelectElem).find("option:first").val(zc.currScale).text(zc.currScale + "%");
					$(zc.zoomSelectElem).prop("selectedIndex", 0);
					$(zc.zoomSelectElem).selectmenu("refresh");
				}
				startTime = new Date();
			}
			
			//_center.text(zc.origX + "," + zc.origY/*event.originalEvent.rotation*/);
		}                
	}
	
	function onMSGestureEnd(event) {
		console.log("on" + event.originalEvent.type + "(scale:" + event.originalEvent.scale + ", rotation:" + event.originalEvent.rotation + ")");
		console.log(event.originalEvent);
		if(duringGesturing) {
			// 2015.4.14 - 設定全域變數, 恢復停用觸控翻頁功能
			// 2016.11.16 搬到if前, 因為WIN10下似乎非觸控螢幕也會觸發MSGesture訊息, 但沒有touch相關訊息, 所以不會有座標
			setTimeout(function() {
				window.blockSwiping = false;
			}, 250);
			touches.length = 0;
			event.originalEvent.preventDefault();
			suspendPanning = false;
			duringGesturing = false;
			var zc = $(this).data("zoomController");
			if(typeof zc.ptCenter === "object") {	// 2016.8.22 FIX for 老A的觸控螢幕有MSGesture功能但沒開touch
				var offset = $(zc.viewPortElem).offset();	// 2015.2.6 - scale之前的offset
				//if("$dh" in zc)
				//	zc.$dh.text(Math.floor(offset.left) + "," + Math.floor(offset.top));
				var mt = $(this).css("transform");
				console.log(mt);//alert(mt);
				mt = mt.replace(/^matrix\(/, "[").replace(/\)$/, "]");
				//alert(mt);
				var m = JSON.parse(mt);
				console.log(m);
				//alert(m);
				// 2015.6.3 修正結束縮放手勢時, 取m陣列位移及origin位置, 做為頁面的位移偏量
				var of = {
					x: Math.floor(Number(m[4]) / Number(m[0])),
					y: Math.floor(Number(m[5]) / Number(m[0]))
				};
				var og = $(this).css("transform-origin");
				console.log(og);
				og = og.split(" ");
				var x = Number(og[0].replace(/px/g, '')) / Number(m[0]);
				var y = Number(og[1].replace(/px/g, '')) / Number(m[0]);
				// 2015.6.8 強制使用瀏覽器的硬體加速
				$(this).css("transform", "scale(" + m[0] + ") translate(0px, 0px)")
						.css("transform-origin", "0px 0px");
				// 2016.2.26 - 若縮放比例小於100%的話, 寬高要調小
				if(zc.currScale < 100) {
					$(this).width(Math.floor(zc.origWidth*zc.currScale/100) + "px")
							.height(Math.floor(zc.origHeight*zc.currScale/100) + "px");
				}
				else
				// 2015.2.6 - fix, width/height不異動的話, scroll range貎似不會更新
				if($(this).width() == zc.origWidth)
					$(this).width(Math.floor(zc.origWidth+1) + "px")
							.height(Math.floor(zc.origHeight+1) + "px");
				else
					$(this).width(Math.floor(zc.origWidth) + "px")
							.height(Math.floor(zc.origHeight) + "px");
				// 2015.6.3 修正結束縮放手勢時, 會回復成僅顯示頁面左上角
				this.parentNode.scrollTop = (zc.ptCenter.y - y - of.y) * Number(m[0]) + this.parentNode.scrollTop;
				this.parentNode.scrollLeft = (zc.ptCenter.x - x - of.x) * Number(m[0]) + this.parentNode.scrollLeft;
				// 2016.9.2 新增記錄所選縮放模式
				var key = "zoomController_" + ($(zc.zoomSelectElem).closest("#zoomControl1, #zoomControl2").length?$(zc.zoomSelectElem).closest("#zoomControl1, #zoomControl2").attr("id"):"global");
				localStorage[key] = zc.currScale;
			}
		}
	}
	
	function onMSInertiaStart(event) {
		console.log("on" + event.originalEvent.type + "(scale:" + event.originalEvent.scale + ", rotation:" + event.originalEvent.rotation + ")");
		console.log(event.originalEvent);
	}
	
	this.attach = function(viewPortElem, zoomSelectElem) {	// 2016.6.2 zoomLevelElem在jqm 1.4.5可能會因為refresh而重新產生, 導致此模組keep的元素無效, 故改keep SELECT元素
		theLogger.log("ZoomController.attach(" + viewPortElem + ", " + zoomSelectElem + ")");
		this.viewPortElem = viewPortElem;
		if(zoomSelectElem)
			this.zoomSelectElem = zoomSelectElem;
		var $viewPort = $(viewPortElem);
		theLogger.log("viewPort.width: " + $viewPort.width() + ", height: " + $viewPort.height());
		theLogger.log("pages.width: " + $viewPort.children().eq(0).width() + ", height: " + $viewPort.children().eq(0).height());
		this.origWidth = $viewPort.children().eq(0).width();
		this.origHeight = $viewPort.children().eq(0).height();
		this.origX = /*68;*/$viewPort.offset().left;
		this.origY = /*91;*/$viewPort.offset().top;
		theLogger.log("origX: " + this.origX + ", origY: " + this.origY);
		
		//this.$dh = $("<div style='position:absolute;border:2px solid red;z-index:3000;display:block;left:0px" + ";top:" + (_zc_y+=20) + "px'>" + this.origX + "," + this.origY + "</div>").appendTo("body");
		$viewPort.on("touchstart", onTouchStart)
				 .on("touchmove", onTouchMove)
				 .on("gesturestart", onGestureStart)
				 .on("gesturechange", onGestureChange)
				 .on("gestureend", onGestureEnd)
				 .css("touch-action", "pan-x pan-y")
				 .on("pointerdown", onPointerDown)
				 .on("pointermove", onPointerMove)
				 .on("pointerup", onPointerUp)
				 .on("pointercancel", onPointerCancel)
				 .on("MSGestureStart", onMSGestureStart)
				 .on("MSGestureChange", onMSGestureChange)
				 .on("MSInertiaStart", onMSInertiaStart)
				 .on("MSGestureEnd", onMSGestureEnd)
				 .data("zoomController", this);
		if(msGesture)
			msGesture.target = $viewPort.get(0);	// for IE11/Edge
		if(zoomSelectElem) {
			var defaultScale = 100;	// 2016.2.26 預設顯示比例設為100%
			// 2016.9.2 新增記錄前次縮放比
			var key = "zoomController_" + ($(zoomSelectElem).closest("#zoomControl1, #zoomControl2").length?$(zoomSelectElem).closest("#zoomControl1, #zoomControl2").attr("id"):"global");
			if(key in localStorage && localStorage[key].length > 0) {
				var prevScale = parseInt(localStorage[key]);
				theLogger.log("前次縮放比例:" + prevScale);
				if(prevScale >= minScale && prevScale <= maxScale) {
					this.currScale = prevScale;
					$(zoomSelectElem).find("option:first").val(prevScale).text(prevScale + "%");
					zoomSelectElem.selectedIndex = 0;
				}
				else if(prevScale <= 0 && prevScale >= -2) {	// FitMode
					zoomSelectElem.selectedIndex = 1 - prevScale;
				}
				else {
					theLogger.warn("超出可指定範圍, 忽略");
					$(zoomSelectElem).find("option:first").val(defaultScale).text(defaultScale + "%");
					zoomSelectElem.selectedIndex = 0;
				}
			}
			else {
				$(zoomSelectElem).find("option:first").val(defaultScale).text(defaultScale + "%");
				zoomSelectElem.selectedIndex = 0;
			}
			$(zoomSelectElem).on("change", onChangeFitMode);
			//	.find("option:first").val(defaultScale).text(defaultScale + "%");	// 2016.2.26 設定預設顯示比例
			$(zoomSelectElem).selectmenu("refresh");
			
			// 2016.4.1 支援桌機縮放控制UI
			$(zoomSelectElem).closest(".ui-controlgroup-controls").find("a#zoomOut").on('click', function() {
				//onZoomOut.call($(zoomLevelElem).closest(".ui-select").find("select").get(0));
				onZoomOut.call(zoomSelectElem);
			});
			$(zoomSelectElem).closest(".ui-controlgroup-controls").find("a#zoomIn").on('click', function() {
				//onZoomIn.call($(zoomLevelElem).closest(".ui-select").find("select").get(0));
				onZoomIn.call(zoomSelectElem);
			});
			
			// 1100519 Raymond 1100298 修正拖拉改變文字意見大小時, 會觸發resize, 致重複觸發onChangeFitMode問題
			// 2016.2.26 支援轉直轉橫重新Fit
			//$(window).on("resize", function() {
			$(window).on("resize", function(evt) {
				if(evt.target === window)
					onChangeFitMode.call(zoomSelectElem);
			});
		}
		//alert("orig:" + this.origWidth + "," + this.origHeight + "\nviewport:" + $viewPort.width() + "," + $viewPort.height());
		$viewPort.width(Math.floor(this.origWidth-1) + "px")	// 2015.11.24 初始化時有時scroll range未更新完全, 重設一次不同於原始寬高會強制更新scroll range
				 .height(Math.floor(this.origHeight-1) + "px");
		$("#aol").css("touch-action", "none");
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-Zoom.js").finish();
})();
