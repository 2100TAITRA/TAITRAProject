/*
 * Draggable module
 *
 *  提供拖放(Drag & Drop)功能
 *
 *  非jQuery外掛形式，同時使用HTML及JavaScript
 *  拖拉目標元素以包含"draggable" class名稱；放置目標元素以包含"droppable" class名稱識別
 *  定義了"draggable" class的目標元素會接收到"dragstart"、"dragend"事件，分別表示開始拖拉及結束拖拉
 *  定義了"droppable" class的目標元素會接收到"acceptdrop"、"dragenter"、"dragleave"、"drop"事件，分別表示
 *  詢問可否放置、拖進、拖離及放置動作；
 *  "acceptdrop"會傳遞"dragSrc"供"droppable"目標判定是否可放置，"droppable"目標必須實作此事件處理函式，並將回傳值填
 *  入param.res，true表示可放置，false表示不可放置，若"droppable"目標未實作事件處理函式則以false對應；即不可放置。
 */
$(function() {
	//
	// 2012.9.10 - 暫時以直接修改Raymond's source code方式改為符合流程設定需求之行為與樣式
	// todo: 改成較general的jQuery plug-in形式, 以應付同一畫面有二組以上drag&drop操作之需求
	//
	
	//
	// 2012.09 - 測試結果:
	//  mouse events: event.pageX/Y 與 event.clientX/Y 數值相同, screenX/Y不同, 差異?
	//  touch events: pageX/Y, clientX/Y 及 screenX/Y 皆相同 (@iPad Safari)
	//  mouse/touch event之pageX/Y & clientX/Y 與 $elem.offsetLeft/Top 座標值一致!
	//
	
	var m = Math;
	
	//var $dragHelper = $("<div id='dndshadow' style='position:absolute;left:0;top:0;display:none;float:none;opacity:0.5;pointer-events:none;z-index:1000'><div class='content'></div></div>").appendTo('body');
	//var $dragHelper = $("<div id='dndshadow'><div class='content'></div></div>").appendTo('body');
	
	var $dragHelper = $("<div id='dndshadow'><div class='pane' style='position:relative;'><div class='content'></div><div class='pointer'></div></div></div>").appendTo('body');
	var dragObj = null;
	var pointOffset = {},
	    pointOrig = {}; // x: touches[0].clientX, y: touches[0].clientY
						// left: touchstart觸控點在dragObj之x座標, top: touchstart觸控點在dragObj之y座標
	var flyon = null;
	var roi = new Array();
	var freezed = false;
	var lastCursorPos = {};
	
	var dragSrcElem = null;
	
	// region of interested...
	// 記錄droppable object的座標. (using getRealPosition())
	function updateroi() {
		console.log('updateroi() invoked...');
		
		roi.length = 0;
		$(".droppable").each(function(idx, elem) {
			var $elem = $(elem);
			var offset = $elem.offset();
			if ($elem.attr('id')=="test_droppable") {
				var offset = $elem.offset();
				var pos = getRealPosition(elem);
				writeLog('droppable elem offset l/t:' + m.floor(offset.left) + '/' + m.floor(offset.top) +
						 ', realPos x/y:' + pos.x + '/' + pos.y);
			}
			var param = {dragSrc: dragObj};
			
			console.log('gonna trigger "acceptdrop" msg.');
			$(elem).trigger("acceptdrop", param);
			
			console.log(elem + " acceptdrop:" + param.res);
			if(param.res) {
				var r = {
					elm: elem,
					pos: { x: offset.left, y: offset.top }, //getRealPosition(elem),
					ext: {cx:$(elem).width(), cy:$(elem).height()}
				};
				console.log("roi[" + roi.length + "]:" + r.elm + ", (" + r.pos.x + ", " + r.pos.y + ", " + r.ext.cx + ", " + r.ext.cy + ")");
				roi.push(r);
			}
		});
		
		// 檢查是否為既存於roi陣列中的元素的子孫元素，若是的話要插入於該元素前，以期由內而外觸發事件
		roi.sort(function(a, b) {
			//console.log("比較" + a.elm + ":" + b.elm);
			if($.contains(b.elm, a.elm)) {
				//console.log(b.elm + " 包含了" + a.elm);
				return -1;
			}
			return 0;
		});
		for(var i=0; i<roi.length; i++) {
			console.log("roi[" + i + "]:" + roi[i].elm + ", (" + roi[i].pos.x + ", " + roi[i].pos.y + ", " + roi[i].ext.cx + ", " + roi[i].ext.cy + ")");
		}
	}
	$.dragndrop = function(fn, param) {
		switch(fn) {
			case "updateroi":
				updateroi();
				break;
			case "freeze":
				if(param == false) {
					if(freezed)
						locateFlyon(lastCursorPos.x, lastCursorPos.y);
						
					freezed = false;
				}
				else
					freezed = true;
				break;
		}
	}
	//
	// 目的: 測試指定位置是否在droppable物件上面
	//       Note:  指定位置並非touch/mousedown的位置, 而是drag obj的左上角位置!
	//
	function locateFlyon(x, y) {
		writeLog('locateFlyon(x=' + x + ', y=' + y +') invoked...')
		
		if (x==NaN || y==NaN) {
			writeLog('locateFlyon() failed...[Invalid x/y value]');
			return;
		}
		
		var $elemParent = $("#draw_canvas");
		var scroll_x = 0, scroll_y = 0;
		//if ($elemParent.length) {
		//	scroll_x = $elemParent[0].scrollLeft;
		//	scroll_y = $elemParent[0].scrollTop;
		//}
		
		var _x = x + scroll_x;
		var _y = y + scroll_y;
		
		for(var i=0; i<roi.length; i++) {
			if (_x >= roi[i].pos.x &&
				_x <= roi[i].pos.x + roi[i].ext.cx &&
				_y >= roi[i].pos.y &&
				_y <= roi[i].pos.y + roi[i].ext.cy) {
				if(flyon != null) {
					if(flyon.get(0) != roi[i].elm) {
						console.log('gonna trigger "dragleave" msg.');
						dragObj.x = dragObj.y = null;
						flyon.removeClass("highlight").trigger("dragleave", dragObj);
					}
					else {
						return;
					}
				}
				
				console.log('gonna trigger "dragenter" msg.');
				
				// 2012.9 - 加入目前draggedObj之位置!
				dragObj.x = x;
				dragObj.y = y;
				flyon = $(roi[i].elm).addClass("highlight").trigger("dragenter", dragObj);
				console.log("flyon=roi[" + i + "]");
				return;
			}
		}
		if(flyon != null) {
			console.log('gonna trigger "dragleave" msg.');
			dragObj.x = dragObj.y = null;
			flyon.removeClass("highlight").trigger("dragleave", dragObj);
			flyon = null;
		}
	}
	
	if('ontouchstart' in window) {
		$(document).on("touchstart", ".draggable", function(event) {
			var touch = event.originalEvent.touches[0];
			writeLog(event.type + ", pageX/Y:" + touch.pageX + "/" + touch.pageY +
					 ", clientX/Y:" + touch.clientX + "/" + touch.clientY +
					 ", screenX/Y:" + touch.screenX + "/" + touch.screenY );
			
			// 記下現在點的位置, 因為taphold事件不帶pageX, pageY屬性
			
			// 以dragObj之左上點為作用點
			var $srcElem = $(this);
			// drag object相對client左上角的位移...
			var srcElem_x = $srcElem.offset().left; // $srcElem內部叫用 elem.getBoundingClientRect 及 scroll 資訊計算取得!
			var srcElem_y = $srcElem.offset().top;
			
			var touch = event.originalEvent.touches[0];
			var client_x = touch.clientX,
			    client_y = touch.clientY,
				offset_x = client_x - srcElem_x, // 觸控點相對drag object左上角的位移, x方向
				offset_y = client_y - srcElem_y; // 觸控點相對drag object左上角的位移, y方向
				
			writeLog('dragElem l/t = ' + srcElem_x + '/' + srcElem_y);
			
			writeLog('touch event info: clientX/Y=' + client_x + '/' + client_y +
					 ', pageX/Y=' + touch.pageX + '/' + touch.pageY +
					 ', screenX/Y=' + touch.screenX + '/' + touch.screenY);
			writeLog('offset_x = ' + offset_x + ', offset_y = ' + offset_y);
			
			pointOrig = {x:touch.clientX, y:touch.clientY,
						 left:offset_x, top:offset_y}; // 2012.9 - 記錄touch offset (對應dragSrc之左上角)
			writeLog('[touchstart] pointOrig: x/y=' + pointOrig.x + '/' + pointOrig.y +
					 ', l/t=' + pointOrig.left + '/' + pointOrig.top);
			
		});
		
		$(document).on("taphold",  ".draggable", function(event) {
			SSOUtil.clearLog();
			
			SSOUtil.writeLog("[taphold] event handler...");
			
			var $drag = $(this);
			
			//var pos = $(this).position();
			//console.log('elem pos: l=' + pos.left + ', t=' + pos.top);
			
			dragObj = {elm:this};

			var offsetDragObj = $drag.offset();
			var param = {dragSrc: dragObj,
						 pos: { x: offsetDragObj.left, y: offsetDragObj.top }, //getRealPosition(this),
						 helper: $dragHelper};
			//SSOUtil.writeLog("[" + event.type + ", OrgEventType=" + event.originalEvent.type + "]," +
			//		 " pageX/Y:" + event.pageX + "/" + event.pageY +
			//		 ", clientX/Y:" + event.clientX + "/" + event.clientY +
			//		 ", realPos x/y:" + pos.x + "/" + pos.y);
			
			// 觸發dragstart, 放掉時觸發dragend
			console.log('gonna trigger "dragstart" msg.');
			$drag.trigger("dragstart", param);
			
			pointOffset = { x:pointOrig.x - param.pos.x,
							y:pointOrig.y - param.pos.y};
			console.log('pointOffset x=' + pointOffset.x + ', y=' + pointOffset.y);
			
			// 2012.3.31 - Eric Peng - fix draggable item refresh area issue!
			// 2012.3.12 - wrapper size應包含padding+border
			//$dragHelper.html($(this).clone().removeClass('draggable'))
			//           .css({left:pointOrig.x - pointOffset.x, top:pointOrig.y - pointOffset.y,
			//                 width:$(this).width(), height:$(this).height()})
			//           .show();
			$content = $dragHelper.find('.content').html($drag.clone().removeClass('draggable'));
			
			
			if (!$(dragObj.elm).hasClass("insert_flow_cmd")) {
				// 2012.9.11 - 拖拉流程點時, 左上方顯示藍色指標!
				$dragHelper.find('div.pointer').addClass('pointer_blue'); //css({'borderLeft':'2px solid blue', 'borderTop':'2px solid blue'});
			}
			else {
				// 2012.9 - 拖拉新增cmds (左上角顯示預設之紅色指標!)
				var $dragItem = $dragHelper.find('.content').children();
				var w_this = $drag.width();
				var h_this = $drag.height();
				SSOUtil.writeLog('Set $dragItem\'s dimension: w/h=' + w_this + '/' + h_this);
				$dragItem.css({width:(w_this+'px'), height:(h_this+'px')});
			}
			
			// 2012.9.12 - 加計scroll位移
			console.log('this class=\'' + $drag.attr('class') +'\'');
			var $scrollCntr = $('#draw_canvas');
			var scrollLeft = 0, scrollTop = 0;
			if ($drag.hasClass('flow_item') || $drag.hasClass('flow_group')) {
				scrollLeft = $scrollCntr.scrollLeft();
				scrollTop = $scrollCntr.scrollTop();
			}
			
			console.log('\'#draw_canvas\' scroll left=' + scrollLeft + ', top =' + scrollTop);
			
			$dragHelper.css({left:pointOrig.x - pointOffset.x - scrollLeft, top:pointOrig.y - pointOffset.y - scrollTop,
					         width:$drag.outerWidth(), height:$drag.outerHeight()})
						.show(); 
					   
			// 2012.3.8 - fix draggable item/group position
			var $target = $dragHelper.find('.flow_item').css({'left':'0px', 'top':'0px'});
			if (!$target || $target.length==0) {
				$target = $dragHelper.find('.flow_group').css({'left':'0px', 'top':'0px'});
			}
					   
			// snapshot可放的元素的座標
			updateroi();
			
			event.preventDefault();
		});
		
		// document's touchmove event handler...
		$(document).touchmove(function(event) {
			if(dragObj != null) {
				event.preventDefault();	// 禁止Browser panning/scrolling
				//alert("ontouchmove:" + event.originalEvent.touches[0].pageX);
				
				// 2012.9.12 - 加計scroll位移
				console.log('dragObj class=\'' + $(dragObj.elm).attr('class') +'\'');
				
				var $scrollCntr = $('#draw_canvas');
				var scrollLeft = 0, scrollTop = 0;
				if ($(dragObj.elm).hasClass('flow_item') || $(dragObj.elm).hasClass('flow_group')) {
					scrollLeft = $scrollCntr.scrollLeft();
					scrollTop = $scrollCntr.scrollTop();
				}
				
				SSOUtil.writeLog('[touchmove] event, touches/targetTouchs/changeTouches:' +
						 event.originalEvent.touches.length + '/' + event.originalEvent.targetTouches.length + '/' + event.originalEvent.changedTouches.length);
				
				var touch = event.originalEvent.touches[0];
				SSOUtil.writeLog('touch position, clientX/Y:' + touch.clientX + '/' + touch.clientY +
						 ', pageX/Y:' + touch.pageX + '/' + touch.pageY +
						 ', screenX/Y:' + touch.screenX + '/' + touch.screenY)
					
				$dragHelper.css({left:touch.pageX - pointOffset.x - scrollLeft,
								 top: touch.pageY - pointOffset.y - scrollTop});
				
				if(flyon != null)
					flyon.removeClass("highlight");
					
				if(!freezed) {
					// 比對座標找出目前停在哪個可放元素上
					// 2012.9.10 - 以被拖拉物件(隨touch移動之obj)之左上角座標為判定點
					locateFlyon(touch.pageX-pointOrig.left,
								touch.pageY-pointOrig.top);
				}
				else {
					lastCursorPos.x = touch.clientX;
					lastCursorPos.y = touch.clientY;
				}
			}
		})
		.touchend(function(event) {
			if(dragObj != null) {
				if(flyon != null) {
					flyon.trigger("drop", dragObj).removeClass("highlight");
				}
				// 向來源觸發dragend
				var param = {dropTarget: flyon, helper: $dragHelper};
				$(dragObj.elm).trigger("dragend", param);
				
				event.originalEvent.stopPropagation(); // 2012.9.11
				//event.preventDefault();
			}
			
			dragObj = null;
			
			if (flyon != null && $(flyon).hasClass('flow_arrow')) {
				flyon.removeClass("highlight");
				$(flyon).find('img.plus_sign').css('display', 'none');
				flyon = null;
			}
			
			// 2012.3.21 - Eric Peng - draggable item refresh area issue!
			$dragHelper.find('.content').children().html("");
			$dragHelper.hide();
		});
	}
	else {
		$(document).on("mousedown", ".draggable", function(event) {
			console.log(event.type + ":" + event.pageX + "," + event.pageY);
			
			SSOUtil.clearLog();
			
			var offset_x = event.offsetX,
				offset_y = event.offsetY;
			
			// 記下現在點的位置, 因為taphold事件不帶pageX,pageY屬性	
			pointOrig = {x:event.pageX, y:event.pageY, left:offset_x, top:offset_y};
			
			SSOUtil.writeLog('[mousedown] event offsetX/Y:' + event.offsetX + '/' + event.offsetY);
			SSOUtil.writeLog('[mousedown] clientX/Y:' + event.clientX + '/' + event.clientY +
					 ', pageX/Y:' + event.pageX + '/' + event.pageY +
					 ', screenX/Y:' + event.screenX + '/' + event.screenY);
			
			// 2012.3.8 - 停止文字選取(文字無法選取)
			//return false;
			
		});
		
		$(document).on("taphold", ".draggable", function(event) {
			dragObj = {elm:this};
			
			var $this = $(this);
			//var realpos = getRealPosition(this);
			//console.log('elem realpos : l=' + realpos.x + ', t=' + realpos.y);
			var offsetDragObj = $(this).offset();
			// var realoff = { x:off.left, y:off.top };
			console.log('elem offset  : l=' + offsetDragObj.left + ', t=' + offsetDragObj.top);
			
			//var param = {dragSrc: dragObj, pos: getRealPosition(this), helper: $dragHelper};
			var param = { dragSrc: dragObj,
						  pos: { x: offsetDragObj.left, y: offsetDragObj.top }, // realoff,
						  helper: $dragHelper};
			console.log(event.type + ", pageX/Y:" + event.pageX + "/" + event.pageY +
						", param.pos.x/y:" + param.pos.x + "/" + param.pos.y);
			
			// 觸發dragstart, 放掉時觸發dragend
			//console.log('gonna trigger "dragstart" msg.');
			$this.trigger("dragstart", param);
			
			pointOffset = {x:pointOrig.x - param.pos.x, y:pointOrig.y - param.pos.y};
			console.log("\tpointOffset:" + pointOffset.x + "," + pointOffset.y);
			
			// 2012.3.21 - Eric Peng - draggable item refresh area issue!
			//$dragHelper.html($(this).clone().removeClass('draggable'))
			//           .css({left:pointOrig.x - pointOffset.x, top:pointOrig.y - pointOffset.y,
			//		           width:$(this).width(), height:$(this).height()})
			//           .show();
			$dragHelper.find('.content').html($(this).clone().removeClass('draggable'));
			var $dragItem = $dragHelper.find('.content').children();
			$dragItem.css({width:($this.width()+'px'), height:($this.height()+'px')});
			
			// 2012.9.11 - 拖拉流程點左上方顯示藍色指標
			if (!$(dragObj.elm).hasClass("insert_flow_cmd")) {
				$dragHelper.find('div.pointer')
						   .addClass('pointer_blue'); //css({'borderLeft':'2px solid blue', 'borderTop':'2px solid blue'});
			}
			
			$dragHelper.css({left: pointOrig.x - pointOffset.x,
							 top: pointOrig.y - pointOffset.y,
							 width: $(this).outerWidth(),
							 height: $(this).outerHeight()})
					   .show(); // 2012.3.12 - wrapper size應包含padding+border

		    // 2012.3.8 - fix draggable item/group position
			var $target = $dragHelper.find('.flow_item').css({'left':'0px', 'top':'0px'});
			if (!$target || $target.length==0) {
				$target = $dragHelper.find('.flow_group').css({'left':'0px', 'top':'0px'});
				if (!$target || $target.length==0) {
					$target = $dragHelper.find('.flow_cowork').css({'left':'0px', 'top':'0px'});
				}
			}

			// snapshot可放的元素的座標
			updateroi();
		});
		
		$(document).on("tap",  ".draggable",function() {
			console.log('tap event...');
		});
		// 2019.9.17 - 1080339 Eric, .mousemove(fn) => on('mousemove', fn)
		//$(document).mousemove( function(event) {
		$(document).on('mousemove', function(event) {
			if(dragObj != null) {
				console.log("[mousemove] pageX/Y:" + event.pageX + "/" + event.pageY +
							", pointOffset.x/y:" + pointOffset.x + "/" + pointOffset.y);
				event.preventDefault();	// 禁止Browser panning/scrolling
				$dragHelper.css({left:event.pageX - pointOffset.x, top:event.pageY - pointOffset.y});
				
				if(!freezed)
				{
					// 比對座標找出目前移到哪個可放(droppable)元素上
					// 2012.9.10 - 以目前被拖拉物件(dragObj,隨mouse移動之obj)之左上角座標為判定點
					locateFlyon(event.pageX-pointOrig.left, event.pageY-pointOrig.top);
				}
				else {
					lastCursorPos.x = event.pageX;
					lastCursorPos.y = event.pageY;
				}
			}
		});
		// 2019.9.17 - 1080339 Eric, .mouseup(fn) => on('mouseup', fn)
		// $(document).mouseup( function(event) {
		$(document).on('mouseup', function(event) {
			if(dragObj != null) {
				console.log("mouseup:" + event.pageX + "," + event.pageY + " pointOffset:" + pointOffset.x + "," + pointOffset.y);
				if(flyon != null) {
					console.log('gonna trigger "drop" msg.');
					flyon.trigger("drop", dragObj).removeClass("highlight");
				}
				// 向來源觸發dragend
				var param = {dropTarget: flyon, helper: $dragHelper};
				console.log('gonna trigger "dragend" msg.');
				$(dragObj.elm).trigger("dragend", param);
				
				//event['dragEnd'] = true;
				event.stopPropagation();
			}
			dragObj = null;
			
			if (flyon != null && $(flyon).hasClass('flow_arrow')) {
				flyon.removeClass("highlight");
				$(flyon).find('img.plus_sign').css('display', 'none');
				flyon = null;
			}
				
			// 2012.3.21 - Eric Peng - draggable item refresh area issue!
			//$dragHelper.find('.content').children().html("");
			
			var $pointer = $dragHelper.find('div.pointer');
			if ($pointer.hasClass('pointer_blue')) {
				$pointer.removeClass('pointer_blue');
			}
			
			$dragHelper.hide();
		});
	}
});