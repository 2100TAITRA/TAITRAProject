// Track-Change Control
//   2016.3.28 改套用theLogger.log
// 1070706	-------	Raymond	修正AOL初始化時未設定layout- class導致預設行為不是追蹤修訂選單目前選項的完稿模式而是追蹤修訂模式的問題
// 1080924 1080339     Kevin   Eric    jQuery 3.0 upgrade
// 1130812 1130313     Raymond Raymond 修正登入後第一次創稿(包括離線版公文製作), 若有出現選取樣版/排版設定檔的子視窗, 則點擊儲存、關閉等按鈕都會跳出「目前追蹤修訂非完稿模式，...」訊息的問題
// 1141118 陸委會序360 Raymond Raymond 修正登入後第一次開啟公文若檢查到前次未正常關閉, 而出現詢問是否從自動備份的暫存檔回復的子視窗, 因尚未設定layout- class導致預設行為像追蹤修訂模式的問題

var TCControl = new function() {
	
	if(window.theModMgr != undefined)
		var inst = window.theModMgr.install("RD-TCControl.js");
	
	function BasicMode() {
		
		return {
			unassoc: function(target) {},
			assoc: function(target) {
				theLogger.log("套用追蹤修訂模式...");
				target.find(".pages").flip("refresh");	// 2016.12.3 fix for 切換模式時不會重整頁面的問題
			}
		}
	}
	
	function CompleteMode() {
		
		return {
			unassoc: function(target) {
				target.removeClass("layout-complete-mode");
				// 2016.11.18 非完稿模式恢復
				target.find("ins span.fmt").each(function(i, elm) {
					if(("hasAttribute" in elm && elm.hasAttribute("data-color")) ||		// Chrome
						elm.getAttribute("data-color") != null)							// IE
						$(elm).css("color", elm.getAttribute("data-color"));
				});
			},
			assoc: function(target) {
				theLogger.log("套用完稿模式...");
				target.addClass("layout-complete-mode");
				// 2016.11.18 完稿模式一律黑色
				//target.find("ins span.fmt").each(function(i, elm) {
				//	$(elm).css("color", "black");
				//});
				target.find(".pages").flip("refresh");	// 2016.12.3 fix for 切換模式時不會重整頁面的問題
			}
		}
	}
	
	function CompleteTCMode() {
		
		var flyon = [];
		
		function buildFlyon(ctx, target, pos, zoomLevel) {
			theLogger.log("x:" + pos.x + ", y:" + pos.y);
			var $pg = $(target).closest(".pg"),
				offsPg = $pg.offset(),
				offsPane = $pg.closest(".contentPane").offset();
			theLogger.log("offsPg: " + offsPg.left + ", " + offsPg.top + ", offsPane: " + offsPane.left + ", " + offsPane.top);
			
			var $side = $pg.find("> div").eq(3),
				offsSide = $side.offset();
			theLogger.log("offsSide: " + offsSide.left + ", " + offsSide.top);
			
			var $indicator = $("<div class='tc-indicator'><img src='image/AOL/point_indicator.png'></div>").appendTo($pg);
			flyon.push($indicator.css({
				left: ((pos.x - offsPg.left) * 100 / zoomLevel - 4) + "px",
				top: ((pos.y - offsPg.top) * 100 / zoomLevel - 8) + "px",
				height: "8px",
				width: ((offsSide.left - pos.x + 4) * 100 / zoomLevel) + "px"}));
			
			// 2016.2.2 新增改用para物件取得DraftModel再getTCSess
			var pa = $(target).closest("div.para").data("para");
			if(pa)
				var tcSess = pa.getModel().getTCSess($(target).attr("data-sn"));
			//var tcSess = theAOL.getCurrFolio().getTCSess($(target).attr("data-sn"));
			var $ctx = $("<div class='tc-context'><div class='tc-title'><u>" + ((tcSess)?tcSess.name:"??") + "</u> <b>刪除</b>:</div>" + ctx + "</div>"),
				$pres = $side.find(".tc-context");
			if($pres.length) {
				var $prev = $pres.eq($pres.length - 1),
					py = $prev.offset().top;
				theLogger.log("prev: " + py);
				theLogger.log("calc: " + ((pos.y - py) * 100 / zoomLevel));
				if(pos.y - py < 28) {
					theLogger.log("margin-top: " + $prev.css("margin-top") + "(" + parseInt($prev.css("margin-top")) + "), height: " + $prev.height());
					var mt = parseInt($prev.css("margin-top"));
					if(mt > 2) {
						theLogger.log("上推prev: " + (mt - $prev.height() - 10));
						$prev.css("margin-top", (mt - $prev.height() - 10) + "px");
					}
					else {
						theLogger.log("下推:");
						if($prev.height() > 20)
							$prev.css("height", "20px").addClass("tc-context-collapse");
					}
					flyon.push($ctx.appendTo($side).css("margin-top", "2px"));
				}
				else {
					//$prev.css("height", ((rcs[j].top - py) * 100 / zoomLevel - 16) + "px").addClass("tc-context-collapse");
					flyon.push($ctx.appendTo($side).css("margin-top", ((pos.y - py) * 100 / zoomLevel - $prev.height() - 14) + "px"));
				}
			}
			else {
				flyon.push($ctx.appendTo($side).css("margin-top", ((pos.y - offsSide.top) * 100 / zoomLevel - 10) + "px"));
			}
		}
		
		return {
			unassoc: function(target) {
				target.removeClass("layout-complete-tc-mode");
				
				for(var i=0; i<flyon.length; i++) {
					flyon[i].remove();
				}
				flyon.length = 0;
			},
			assoc: function(target) {
				theLogger.log("套用完稿追蹤修訂模式...");
				target.addClass("layout-complete-tc-mode");
				
				var blks = [];
				target.find("del").each(function() {
					var pr = this.previousSibling;
					if(blks.length && pr != null && pr == blks[blks.length-1].last) {
						theLogger.log("\"" + $(this).text() + "\"接續前一個DEL, sn=" + $(this).attr("data-sn"));
						blks[blks.length-1].last = this;
						blks[blks.length-1].ctx += $(this).html();
					}
					else if(blks.length && pr != null && pr.nodeType == 3 && pr.nodeValue == "") {
						pr = pr.previousSibling;
						if(pr != null && pr == blks[blks.length-1].last) {
							theLogger.log("\"" + $(this).text() + "\"接續前一個DEL(中隔一個Empty Text Node), sn=" + $(this).attr("data-sn"));
							blks[blks.length-1].last = this;
							blks[blks.length-1].ctx += $(this).html();
						}
					}
					else {
						theLogger.log("DEL \"" + $(this).text() + "\", sn=" + $(this).attr("data-sn"));
						blks.push({ctx: $(this).html(), last: this, first: this});
					}
				});
				var zoom = target.data("zoomController"), zoomLevel = 100;
				if(zoom != undefined) {
					zoomLevel = zoom.currScale;
					theLogger.log("zoomLevel: " + zoomLevel);
				}
				var rng = document.createRange();
				for(var i=0; i<blks.length; i++) {
					
					theLogger.log("block[" + i + "]: \"" + blks[i].ctx + "\"");
					theLogger.log("next: " + blks[i].last.nextSibling);
					
					if(blks[i].last.nextSibling != null) {	// 2014.7.15 - Raymond, 檢查有無後一個元素
					
						rng.selectNode(blks[i].last.nextSibling);
						var rcs = rng.getClientRects();
						theLogger.log(rcs);
						
						if(rcs.length > 0) {	// 用下一個元素的起頭位置當作插入點
							buildFlyon(blks[i].ctx, blks[i].last, {x:rcs[0].left, y:rcs[0].top}, zoomLevel);
						}
						else if(blks[i].first.previousSibling != null) {
							theLogger.log("prev: " + blks[i].first.previousSibling);
							
							rng.selectNode(blks[i].first.previousSibling);
							rcs = rng.getClientRects();
							theLogger.log(rcs);
							
							if(rcs.length > 0) {	// 用前一個元素的末尾位置當作插入點
								buildFlyon(blks[i].ctx, blks[i].first, {x:rcs[rcs.length-1].right, y:rcs[rcs.length-1].top}, zoomLevel);
							}
						}
					}
					else if(blks[i].first.previousSibling != null) {	// 刪除最末字, 找前一個字的最後位置做為插入點
						theLogger.log("prev: " + blks[i].first.previousSibling);
					
						rng.selectNode(blks[i].first.previousSibling);
						var rcs = rng.getClientRects();
						theLogger.log(rcs);
						
						if(rcs.length > 0) {	// 用前一個元素的末尾位置當作插入點
							buildFlyon(blks[i].ctx, blks[i].first, {x:rcs[rcs.length-1].right, y:rcs[rcs.length-1].top}, zoomLevel);
						}
					}
					else {	// 前後無元素, 用parent
						theLogger.log("parent: " + blks[i].first.parentNode);
						
						rng.selectNode(blks[i].first.parentNode);
						var rcs = rng.getClientRects();
						theLogger.log(rcs);
						
						if(rcs.length > 0) {
							buildFlyon(blks[i].ctx, blks[i].first, {x:rcs[0].left, y:rcs[0].top}, zoomLevel);
						}
					}
				}
				
				target.find(".pages").flip("refresh");	// 2016.12.3 fix for 切換模式時不會重整頁面的問題
			}
		}
	}
	
	function OriginTCMode() {
		
		var flyon = [];
		return {
			unassoc: function(target) {
				target.removeClass("layout-origin-tc-mode");
				
				for(var i=0; i<flyon.length; i++) {
					flyon[i].remove();
				}
				flyon.length = 0;
			},
			assoc: function(target) {
				theLogger.log("套用原稿追蹤修訂模式...");
				target.addClass("layout-origin-tc-mode");
				
				var blks = [];
				target.find("ins").each(function() {
					var pr = this.previousSibling;
					if(blks.length && pr != null && pr == blks[blks.length-1].last) {
						theLogger.log("\"" + $(this).text() + "\"(pr:" + pr.nodeType + ")接續前一個INS, sn=" + $(this).attr("data-sn"));
						blks[blks.length-1].last = this;
						blks[blks.length-1].ctx += $(this).html();
					}
					else if(blks.length && pr != null && pr.nodeType == 3 && pr.nodeValue == "") {
						pr = pr.previousSibling;
						if(pr != null && pr == blks[blks.length-1].last) {
							theLogger.log("\"" + $(this).text() + "\"接續前一個INS(中隔一個Empty Text Node), sn=" + $(this).attr("data-sn"));
							blks[blks.length-1].last = this;
							blks[blks.length-1].ctx += $(this).html();
						}
					}
					else if(blks.length && pr == null) {
						pr = this.parentNode.previousSibling;
						if(pr != null && pr == blks[blks.length-1].last) {
							theLogger.log("\"" + $(this).text() + "\"父節點是" + this.parentNode.nodeName + "(pr:" + pr.nodeType + ")接續前一個INS, sn=" + $(this).attr("data-sn"));
							blks[blks.length-1].last = this.parentNode;
							blks[blks.length-1].ctx += $(this).parent().html();
						}
						else {
							if(this.parentNode.nodeName == "DEL") {
								theLogger.log("\"" + $(this).text() + "\"父節點是" + this.parentNode.nodeName + ", sn=" + $(this).attr("data-sn") + ", delete sn=" + $(this.parentNode).attr("data-sn"));
							}
							else {
								theLogger.log("INS \"" + $(this).text() + "\", sn=" + $(this).attr("data-sn"));
								blks.push({ctx: $(this).html(), last: this, first: this});
							}
						}
					}
					else {
						if(this.parentNode.nodeName == "DEL") {
							theLogger.log("\"" + $(this).text() + "\"父節點是" + this.parentNode.nodeName + ", sn=" + $(this).attr("data-sn") + ", delete sn=" + $(this.parentNode).attr("data-sn"));
						}
						else {
							theLogger.log("INS \"" + $(this).text() + "\", sn=" + $(this).attr("data-sn"));
							blks.push({ctx: $(this).html(), last: this, first: this});
						}
					}
				});
				var zoom = target.data("zoomController"), zoomLevel = 100;
				if(zoom != undefined) {
					zoomLevel = zoom.currScale;
					theLogger.log("zoomLevel: " + zoomLevel);
				}
				var rng = document.createRange();
				for(var i=0; i<blks.length; i++) {
					theLogger.log("block[" + i + "]: \"" + blks[i].ctx + "\"");
					
					var flag = 0;
					if(blks[i].last.nextSibling != null) {
						theLogger.log("next:  " + [blks[i].last.nextSibling]);
						// 2015.6.12 修正行尾的追蹤修訂不會顯示問題
						if(blks[i].last.nextSibling.nodeType == 3 && blks[i].last.nextSibling.nodeValue.length == 0) {
							theLogger.log("next sibling is empty string!(行尾) 改偵測previous sibling");
							if(blks[i].first.previousSibling != null) {
								theLogger.log("prev:  " + [blks[i].first.previousSibling]);
								rng.selectNode(blks[i].first.previousSibling);
								flag = 1;
							}
							else {
								theLogger.log("parent:" + [blks[i].last.parentNode]);
								rng.selectNode(blks[i].last.parentNode);
							}
						}
						else
							rng.selectNode(blks[i].last.nextSibling);
					}
					else if(blks[i].first.previousSibling != null) {
						theLogger.log("prev:  " + [blks[i].first.previousSibling]);
						rng.selectNode(blks[i].first.previousSibling);
						flag = 1;
					}
					else {
						theLogger.log("parent:" + [blks[i].last.parentNode]);
						rng.selectNode(blks[i].last.parentNode);
					}
					var rcs = rng.getClientRects();
					theLogger.log(rcs);
					for(var j=0; j<rcs.length; j++) {
						theLogger.log("t:" + rcs[j].top + ", b:" + rcs[j].bottom + ", l:" + rcs[j].left + ", r:" + rcs[j].right);
						
						var $pg = $(blks[j].last).closest(".pg"),
							offsPg = $pg.offset(),
							offsPane = $pg.closest(".contentPane").offset();
						theLogger.log("offsPg: " + offsPg.left + ", " + offsPg.top + ", offsPane: " + offsPane.left + ", " + offsPane.top);
						
						var $side = $(blks[j].last).closest(".pg").find("> div").eq(3),
							offsSide = $side.offset();
						theLogger.log("offsSide: " + offsSide.left + ", " + offsSide.top);
						
						var $indicator = $("<div class='tc-indicator'><img src='image/AOL/point_indicator.png'></div>").appendTo($(blks[i].last).closest(".pg"));
						flyon.push($indicator.css({
							left: ((((flag == 1)?rcs[j].right:rcs[j].left) - offsPg.left) * 100 / zoomLevel - 4) + "px",
							top: ((rcs[j].top - offsPg.top) * 100 / zoomLevel - 8) + "px",
							height: "8px",
							width: (offsSide.left - ((flag == 1)?rcs[j].right:rcs[j].left) + 4) * 100 / zoomLevel + "px"}));
						
						// 2016.2.2 新增改用para物件取得DraftModel再getTCSess
						var pa = $(blks[j].first).closest("div.para").data("para");	// 2016.3.16 FIX
						if(pa)
							var tcSess = pa.getModel().getTCSess($(blks[j].first).attr("data-sn"));	// 2016.3.16 FIX
						//var tcSess = theAOL.getCurrFolio().getTCSess($(blks[i].first).attr("data-sn"));
						var $ctx = $("<div class='tc-context'><div class='tc-title'><u>" + ((tcSess)?tcSess.name:"??") + "</u> <b>插入</b>:</div>" + blks[i].ctx + "</div>"),
							$pres = $side.find(".tc-context");
						if($pres.length) {
							var $prev = $pres.eq($pres.length - 1),
								py = $prev.offset().top;
							theLogger.log("prev: " + py);
							theLogger.log("calc: " + ((rcs[j].top - py) * 100 / zoomLevel));
							if(rcs[j].top - py < 28) {
								theLogger.log("margin-top: " + $prev.css("margin-top") + "(" + parseInt($prev.css("margin-top")) + "), height: " + $prev.height());
								var mt = parseInt($prev.css("margin-top"));
								if(mt > 2) {
									theLogger.log("上推prev: " + (mt - $prev.height() - 10));
									$prev.css("margin-top", (mt - $prev.height() - 10) + "px");
								}
								else {
									theLogger.log("下推:");
									if($prev.height() > 20)
										$prev.css("height", "20px").addClass("tc-context-collapse");
								}
								flyon.push($ctx.appendTo($side).css("margin-top", "2px"));
							}
							else {
								//$prev.css("height", ((rcs[j].top - py) * 100 / zoomLevel - 16) + "px").addClass("tc-context-collapse");
								flyon.push($ctx.appendTo($side).css("margin-top", ((rcs[j].top - py) * 100 / zoomLevel - $prev.height() - 12) + "px"));
							}
						}
						else {
							flyon.push($ctx.appendTo($side).css("margin-top", ((rcs[j].top - offsSide.top) * 100 / zoomLevel - 10) + "px"));
						}
						
						$ctx.dele = function() {}
						$ctx.input = function(txt) {
							this.innerHTML += txt;
						}
						var ins = blks[i].first;
						do {
							$(ins).data("tcctx", $ctx);
							ins = ins.nextSibling;
						}while(ins != null && ins != blks[i].last);
						break;
					}
				}
				
				target.find(".pages").flip("refresh");	// 2016.12.3 fix for 切換模式時不會重整頁面的問題
			}
		}
	}
	
	this.modes = [new BasicMode(), new CompleteMode(), new CompleteTCMode(), new OriginTCMode()];
	this.currMode = -1;
	this.associate = function($viewPort, $dropdown) {
		
		var that = this;
		if($dropdown.length > 0) {
			var dup = false;
			if("ddElms" in that) {	// 2016.12.11 新增判斷下拉選單元素是否已bind, 避免重複bind造成行為異常(每開一筆公文就bind一次, 造成開越多筆, trigger(change)就會觸發越多次)
				for(var i=0; i<that.ddElms.length; i++) {
					if(that.ddElms[i] == $dropdown.get(0)) {
						dup = true;
						theLogger.warn("重複綁定追蹤修訂模式下拉選單元素, 忽略");
						break;
					}
				}
			}
			if(!dup) {
				$dropdown.on("change", function(event) {
					var sel = Number($(this).val());
					if(sel < 0 || sel > that.modes.length)
						throw new Error("不支援的追蹤修訂模式(" + sel + ")");
					
					event.preventDefault();
					if(that.currMode < 0 || that.currMode != sel || event.isTrigger) {	// 2015.4.30 新增若是trigger的change也要重新assoc
						if(that.currMode >= 0) {
							that.modes[that.currMode].unassoc($viewPort);
							that.modes[sel].assoc($viewPort);	// 1070612 Raymond fix for 第一次開啟AOL時, 重複執行2次reqPage, 若此時跳出選擇樣版檔的詢問子視窗會導致flipping被設成true, 不會觸發恢復flipping為false的問題
						}
						else {	// 1070706 Raymond 修正初始化時未設定layout- class導致預設行為像追蹤修訂模式的問題
							if(sel == 1)
								$viewPort.addClass("layout-complete-mode");
							else if(sel == 2)
								$viewPort.addClass("layout-complete-tc-mode");
							else if(sel == 3)
								$viewPort.addClass("layout-origin-tc-mode");
						}
						that.currMode = sel;
					}
				});
				$dropdown.find("a").on("click", function(event) {
					event.preventDefault();
					return false;
				});
				if($('#confirmOverlay').length) {	// 2016.12.11 鐵工局新增文稿時必定會出現選樣版的子視窗, 此時不能重複refresh畫面
					theLogger.warn("新增文稿時出現提示視窗, 未按掉之前不要觸發畫面refresh");
					// 1130812 Raymond 1130313 修正登入後第一次創稿(包括離線版公文製作), 若有出現選取樣版/排版設定檔的子視窗, 則點擊儲存、關閉等按鈕都會跳出「目前追蹤修訂非完稿模式，...」訊息的問題
					if(that.currMode < 0) {
						that.currMode = Number($dropdown.val());
						// 1141118 Raymond 陸委會序360 修正登入後第一次開啟公文若檢查到前次未正常關閉, 而出現詢問是否從自動備份的暫存檔回復的子視窗, 因尚未設定layout- class導致預設行為像追蹤修訂模式的問題
						if(that.currMode == 1)
							$viewPort.addClass("layout-complete-mode");
					}
				}
				else
					$dropdown.trigger("change");
				
				if(!("ddElms" in that))
					that.ddElms = [];
				that.ddElms.push($dropdown.get(0));	// 2016.12.11 加入已bind的下拉選單元素清單
				
				// 1100205 Raymond 1090927 新增記錄associate的$viewPort
				that.associatedViewPort = $viewPort;
			}
		}
	}
	// 1100205 Raymond 1090927 新增從RD-TCModeSetting.html設定追蹤修訂模式功能
	this.setCurrMode = function(mode) {
		if(mode < 0 || mode > this.modes.length)
			throw new Error("不支援的追蹤修訂模式(" + mode + ")");
		
		if(!this.associatedViewPort)
			alert("TCControl未初始化?");
		
		if(this.currMode < 0 || this.currMode != mode) {
			if(this.currMode >= 0) {
				this.modes[this.currMode].unassoc(this.associatedViewPort);
				this.modes[mode].assoc(this.associatedViewPort);
			}
			else {	// 1070706 Raymond 修正初始化時未設定layout- class導致預設行為像追蹤修訂模式的問題
				alert("TCControl未初始化?");
				if(mode == 1)
					this.associatedViewPort.addClass("layout-complete-mode");
				else if(mode == 2)
					this.associatedViewPort.addClass("layout-complete-tc-mode");
				else if(mode == 3)
					this.associatedViewPort.addClass("layout-origin-tc-mode");
			}
			this.currMode = mode;
		}
	}
	
	if(inst != undefined)
		inst.finish();
	
}();