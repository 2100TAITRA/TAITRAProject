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
jQuery.fn.draggable = function($work_target, options) {
	//
	// 2012.9.10 - 暫時以直接修改Raymond's source code方式改為符合流程設定需求之行為與樣式
	// todo: 改成較general的jQuery plug-in形式, 以應付同一畫面有二組以上drag&drop操作之需求
	//
	
	var defaults = {
		var helperId = 'dndshadow';
		var helperParent = $(document);
	};
	
	var o = jQuery.extent(defualts, (options ? options : {}));
	
	
	var $dragHelper = $("<div id='dndshadow'><div class='pane' style='posidrtion:relative;'><div class='content'></div><div class='index' style='position:absolute;width:16px;height:16px;left:-2px;top:-2px;border-left:2px solid red;border-top:2px solid red;opacity:1;'></div></div></div>").appendTo('body');
	var dragObj = null;
	var pointOffset = {}, pointOrig = {};
	var flyon = null;
	var roi = new Array();
	var freezed = false;
	var lastCursorPos = {};
	
	var dragSrcElem = null;
	
	function updateroi() {
		console.log('updateroi() invoked...');
		
		roi.length = 0;
		$(".droppable").each(function(idx, elem) {
			var param = {dragSrc: dragObj};
			
			console.log('gonna trigger "acceptdrop" msg.');
			$(elem).trigger("acceptdrop", param);
			
			console.log(elem + " acceptdrop:" + param.res);
			if(param.res) {
				var r = {
					elm: elem,
					pos: getRealPosition(elem),
					ext: {cx:$(elem).width(), cy:$(elem).height()}
				};
				console.log("roi[" + roi.length + "]:" + r.elm + ", (" + r.pos.x + ", " + r.pos.y + ", " + r.ext.cx + ", " + r.ext.cy + ")");
				roi.push(r);
			}
		});
		// 檢查是否為既存於roi陣列中的元素的子孫元素，若是的話要插入於該元素前，以期由內而外觸發事件
		roi.sort(function(a, b) {
			console.log("比較" + a.elm + ":" + b.elm);
			if($.contains(b.elm, a.elm)) {
				console.log(b.elm + " 包含了" + a.elm);
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
	
	function locateFlyon(x, y) {
		var $elemParent = $("#draw_canvas");
		var scroll_x = 0, scroll_y = 0;
		if ($elemParent.length) {
			scroll_x = $elemParent[0].scrollLeft;
			scroll_y = $elemParent[0].scrollTop;
		}
		
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
						flyon.removeClass("highlight").trigger("dragleave", dragObj);
					}
					else {
						return;
					}
				}
				
				console.log('gonna trigger "dragenter" msg.');
				flyon = $(roi[i].elm).addClass("highlight").trigger("dragenter", dragObj);
				console.log("flyon=roi[" + i + "]");
				return;
			}
		}
		if(flyon != null) {
			console.log('gonna trigger "dragleave" msg.');
			flyon.removeClass("highlight").trigger("dragleave", dragObj);
			flyon = null;
		}
	}
	
	if('ontouchstart' in window) {
		$(document).on("touchstart", ".draggable", function(event) {
			console.log(event.type + ":" + event.originalEvent.touches[0].pageX + "," + event.originalEvent.touches[0].pageY);
			
			// dump touch event content.
			var sEventContent = 'touchstart event content:\n';
			var sProp;
			for(var prop in event.originalEvent) {
				sProp = prop + ':' + event.originalEvent[prop] + '\n';
				sEventContent += sProp;
			}
			console.log(sEventContent);
			
			// 記下現在點的位置, 因為taphold事件不帶pageX,pageY屬性
			
			// 以右上方為作用點
			var $srcElem = $(this);
			var srcElem_x = $srcElem[0].x;
			var srcElem_y = $srcElem[0].y;
			
			console.log()
			
			var touch = $(event.originalEvent.touches[0]);
			var client_x = event.originalEvent.touches[0].clientX, // + ($scrElem.outerWidth(false) / 2),
			    client_y = event.originalEvent.touches[0].clientY, // + ($scrElem.outerHeight(false) / 2);
				offset_x = client_x - srcElem_x,
				offset_y = client_y - srcElem_y;
				
			console.log('srcElem x = ' + srcElem_x + ', y = ' + srcElem_y);
			console.log('touch event info: clientX = ' + client_x + ', clientY = ' + client_y +
						', pageX = ' + touch.pageX + ', pageY = ' + touch.pageY +
						', screenX = ' + touch.screenX + ', screenY = ' + touch.screenY);
			console.log('offset_x = ' + offset_x + ', offset_y = ' + offset_y);
			
			//{
			//	var touchEvent = event.originalEvent.touches[0];
			//	for(var name in touchEvent) {
			//		$data = $(touchEvent[name]);
			//		
			//	}
			//}
	
			pointOrig = {x:event.originalEvent.touches[0].pageX, y:event.originalEvent.touches[0].pageY,
						 left:offset_x, top:offset_y}; // 2012.9 - 記錄touch offset (對應dragSrc之左上角)
			
		});
		
		$(document).on("taphold", ".draggable", function(event) {
			var pos = $(this).position();
			console.log('elem pos: l=' + pos.left + ', t=' + pos.top);
			
			dragObj = {elm:this};
			var param = {dragSrc: dragObj, pos: getRealPosition(this), helper: $dragHelper};
			console.log(event.type + ":" + event.pageX + "," + event.pageY + " realPos:" + param.pos.x + "," + param.pos.y);
			
			// 觸發dragstart, 放掉時觸發dragend
			console.log('gonna trigger "dragstart" msg.');
			$(this).trigger("dragstart", param);
			
			pointOffset = {x:pointOrig.x - param.pos.x, y:pointOrig.y - param.pos.y};
			console.log('pointOffset x=' + pointOffset.x + ', y=' + pointOffset.y);
			
			// 2012.3.31 - Eric Peng - draggable item refresh area issue!
			// 2012.3.12 - wrapper size應包含padding+border
			//$dragHelper.html($(this).clone().removeClass('draggable'))
			//           .css({left:pointOrig.x - pointOffset.x, top:pointOrig.y - pointOffset.y,
			//                 width:$(this).width(), height:$(this).height()})
			//           .show();
			$content = $dragHelper.find('.content').html($(this).clone().removeClass('draggable'));
			
			// 2012.9.11 - 拖拉流程點左上方顯示藍色指標
			if (!$(dragObj.elm).hasClass("insert_flow_cmd")) {
				$dragHelper.find('div.index').css({'borderLeft':'2px solid blue', 'borderTop':'2px solid blue'});
			}
			
			// 2012.9.12 - 加計scroll位移
			console.log('this class=\'' + $(this).attr('class') +'\'');
			var $scrollCntr = $('#draw_canvas');
			var scrollLeft = 0, scrollTop = 0;
			if ($(this).hasClass('flow_item') || $(this).hasClass('flow_group')) {
				scrollLeft = $scrollCntr.scrollLeft();
				scrollTop = $scrollCntr.scrollTop();
			}
			
			console.log('\'#draw_canvas\' scroll left=' + scrollLeft + ', top =' + scrollTop);
			
			$dragHelper.css({left:pointOrig.x - pointOffset.x - scrollLeft, top:pointOrig.y - pointOffset.y - scrollTop,
					         width:$(this).outerWidth(), height:$(this).outerHeight()})
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
		$(document).touchmove(function(event) {
			if(dragObj != null) {
				event.preventDefault();	// 禁止Browser panning/scrolling
				//alert("ontouchmove:" + event.originalEvent.touches[0].pageX);
				
				// 2012.9.12 - 加計scroll位移
				console.log('this class=\'' + $(this).attr('class') +'\'');
				var $scrollCntr = $('#draw_canvas');
				var scrollLeft = 0, scrollTop = 0;
				if ($(dragObj.elm).hasClass('flow_item') || $(dragObj.elm).hasClass('flow_group')) {
					scrollLeft = $scrollCntr.scrollLeft();
					scrollTop = $scrollCntr.scrollTop();
				}
				
				console.log('doc.touchmove event: touches:' + event.originalEvent.touches.length +
							', targetTouches:' + event.originalEvent.targetTouches.length +
							', changedTouches:' + event.originalEvent.changedTouches.length);
				
				$dragHelper.css({left:event.originalEvent.touches[0].pageX - pointOffset.x - scrollLeft,
								 top: event.originalEvent.touches[0].pageY - pointOffset.y - scrollTop});
				if(flyon != null)
					flyon.removeClass("highlight");
					
				if(!freezed) {
					// 比對座標找出目前停在哪個可放元素上
					// 2012.9.10 - 以拖拉元件之左上角座標為判定點
					//locateFlyon(event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY);
					locateFlyon(event.originalEvent.touches[0].pageX-pointOrig.left, event.originalEvent.touches[0].pageY-pointOrig.top);
				}
				else {
					lastCursorPos.x = event.originalEvent.touches[0].pageX;
					lastCursorPos.y = event.originalEvent.touches[0].pageY;
				}
			}
		}).touchend(function(event) {
			if(dragObj != null) {
				if(flyon != null) {
					flyon.trigger("drop", dragObj).removeClass("highlight");
				}
				// 向來源觸發dragend
				var param = {dropTarget: flyon, helper: $dragHelper};
				$(dragObj.elm).trigger("dragend", param);
				
				event.stopPropagation(); // 2012.9.11
				event.preventDefault();
			}
			dragObj = null;
			
			// 2012.3.21 - Eric Peng - draggable item refresh area issue!
			//$dragHelper.children().html("").hide();
			$dragHelper.find('.content').children().html("");
			$dragHelper.hide();
		});
	}
	else {
		$(document).on("mousedown", ".draggable", function(event) {
			console.log(event.type + ":" + event.pageX + "," + event.pageY);
			
			var offset_x = event.offsetX,
				offset_y = event.offsetY;
			
			// 記下現在點的位置, 因為taphold事件不帶pageX,pageY屬性	
			pointOrig = {x:event.pageX, y:event.pageY, left:offset_x, top:offset_y};
			
			// 2012.3.8 - 停止文字選取(文字無法選取)
			return false;
			
		});
		
		$(document).on("taphold", ".draggable", function(event) {
			dragObj = {elm:this};
			
			var realpos = getRealPosition(this);
			var off = $(this).offset();
			var realoff = { x:off.left, y:off.top };
			
			console.log('elem realpos : l=' + realpos.x + ', t=' + realpos.y);
			console.log('elem offset  : l=' + off.left + ', t=' + off.top);
			
			//var param = {dragSrc: dragObj, pos: getRealPosition(this), helper: $dragHelper};
			var param = {dragSrc: dragObj, pos: realoff, helper: $dragHelper};
			console.log(event.type + ":" + event.pageX + "," + event.pageY + " realPos:" + param.pos.x + "," + param.pos.y);
			
			// 觸發dragstart, 放掉時觸發dragend
			console.log('gonna trigger "dragstart" msg.');
			$(this).trigger("dragstart", param);
			
			pointOffset = {x:pointOrig.x - param.pos.x, y:pointOrig.y - param.pos.y};
			console.log("\tpointOffset:" + pointOffset.x + "," + pointOffset.y);
			
			// 2012.3.21 - Eric Peng - draggable item refresh area issue!
			//$dragHelper.html($(this).clone().removeClass('draggable'))
			//           .css({left:pointOrig.x - pointOffset.x, top:pointOrig.y - pointOffset.y,
			//		           width:$(this).width(), height:$(this).height()})
			//           .show();	
			$dragHelper.find('.content').html($(this).clone().removeClass('draggable'));
			
			// 2012.9.11 - 拖拉流程點左上方顯示藍色指標
			if (!$(dragObj.elm).hasClass("insert_flow_cmd")) {
				$dragHelper.find('div.index').css({'borderLeft':'2px solid blue', 'borderTop':'2px solid blue'});
			}
			
			$dragHelper.css({left:pointOrig.x - pointOffset.x, top:pointOrig.y - pointOffset.y,
							 width:$(this).outerWidth(), height:$(this).outerHeight()})
					   .show(); // 2012.3.12 - wrapper size應包含padding+border

		    // 2012.3.8 - fix draggable item/group position
			var $target = $dragHelper.find('.flow_item').css({'left':'0px', 'top':'0px'});
			if (!$target || $target.length==0) {
				$target = $dragHelper.find('.flow_group').css({'left':'0px', 'top':'0px'});
			}
			
			// snapshot可放的元素的座標
			updateroi();
		});
		$(document).mousemove(function(event) {
			if(dragObj != null) {
				console.log("onmousemove:" + event.pageX + "," + event.pageY + " pointOffset:" + pointOffset.x + "," + pointOffset.y);
				event.preventDefault();	// 禁止Browser panning/scrolling
				$dragHelper.css({left:event.pageX - pointOffset.x, top:event.pageY - pointOffset.y});
				
				if(!freezed)
				{
					// 比對座標找出目前停在哪個可放(droppable)元素上
					// 2012.9.10 - 以拖拉元件之左上角座標為判定點
					locateFlyon(event.pageX-pointOrig.left, event.pageY-pointOrig.top);
					//locateFlyon(event.pageX, event.pageY);
				}
				else {
					lastCursorPos.x = event.pageX;
					lastCursorPos.y = event.pageY;
				}
			}
		});
		$(document).mouseup(function(event) {
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
			flyon = null;
			
			
			// 2012.3.21 - Eric Peng - draggable item refresh area issue!
			//$dragHelper.html("").hide();
			//$dragHelper.find('.content').html("");
			$dragHelper.hide();
		});
	}
	
	return this.each(function(){
		
	});
};