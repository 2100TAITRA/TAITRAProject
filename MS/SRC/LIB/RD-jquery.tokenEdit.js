/*
 * jQuery Plugin: Tokenizing Autocomplete Edit widget
 *
 * 
 * Based on:
 * 
 * jQuery Plugin: Tokenizing Autocomplete Text Entry
 * Version 1.6.0
 *
 * Copyright (c) 2009 James Smith (http://loopj.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */
// 1080923  1080339     Kevin   Eric    jQuery 3.0 upgrade

(function ($) {

// 2014.12.26 - Raymond, 全域的選取狀態切換, 因為頁面上同時存在多組tokenEdit widget時可能會發生select token多筆情況
window.tokenSelector = new function() {

	// private members
	var mem = new Array(),
		selected_token = null,
		place_holder = $("<div style='position:relative; display:inline-block; overflow:visible; user-select:none; height:16px; border:1px solid black'><img src='image/aol/arrow-down-24.png' style='position:absolute; left:0px; top:0px; transform:translate(-12px,-18px)'><img src='image/aol/arrow-down-24.png' style='position:absolute; left:0px; bottom:0px; transform:rotate(180deg) translate(12px,-18px);'></div>");
	
	var check = {};	//2017.2.23	Leslie	新增用於紀錄是否tokenEdit需要更新(依據是否有重新產生FO排版物件)
	var bReset = true;	//是否被重置
	
	return {
		clear: function() {
			mem.length = 0;
		},
		
		add: function(div) {
			//2017.2.23	Leslie	新增用於紀錄是否tokenEdit需要更新(依據是否有重新產生FO排版物件)
			if('guid' in check && check[check.guid] != null){	//已有guid
				var tagId=div.id;
				var restoreObj = check[check.guid][tagId];
				$(div).prepend(restoreObj.children('.token-input-token-facebook'));
				// 1101122 Raymond 1101304 修正若各本別受文者長度剛好接近行尾, 在翻頁時, 會因為重設input_box寬度為100而可能導致折行及頁數增加, 而衍生翻至來文頁面再翻回文稿最末頁時跳出指定頁次超出總頁數問題
				if(restoreObj.find("input").length) {
					var resInpWid = restoreObj.find("input").get(0).style.width;	// 可能是空字串, 所以用style.width
					$(div).find("input").css("width", resInpWid);
				}
				for(var i=0;i<mem.length;i++){
					if(mem[i].id == tagId){
						mem[i] = div;
						break;
					}
				}
				// 1070906 Raymond 1070929 從restoreObj復原的token span沒有onSelect handler, 會導致點選等功能異常, 呼叫新增的afterRestored方法重新設定onSelect
				$(div).data("tokenEditObject").afterRestored();
			}
			else
				mem.push(div);
		},
		
		select: function(span) {
			for(var i=0; i<mem.length; i++) {
				if($(mem[i]).data("tokenEditObject")) {
					if($(mem[i]).data("tokenEditObject").select(span)) {
						selected_token = span;
					}
					else
						$(mem[i]).data("tokenEditObject").unselectAll();
				}
			}
		},
		
		selectNan: function() {
			for(var i=0; i<mem.length; i++) {
				if($(mem[i]).data("tokenEditObject"))
					$(mem[i]).data("tokenEditObject").unselectAll();
			}
		},
		
		refresh: function() {
			for(var i=0; i<mem.length; i++) {
				if($(mem[i]).data("tokenEditObject"))
					$(mem[i]).data("tokenEditObject").refresh();
			}
		},
		
		initPlaceHolder: function(token) {
			token.after(place_holder.text(token.text()));
		},
		
		placeHolder: function(pos, dragging_token) {
			place_holder.css("font-size", dragging_token.css("font-size")).css("font-family", dragging_token.css("font-family"));
			for(var i=0; i<mem.length; i++) {
				if($(mem[i]).data("tokenEditObject")) {
					if($(mem[i]).data("tokenEditObject").placeHolder(pos, place_holder, dragging_token)) {
						break;
					}
				}
			}
		},
		
		getPlaceHolder: function() {
			return place_holder;
		},
		
		//2017.2.23	Leslie	增加Check機制，用guid來檢查是否為同一個文稿，若否，則實際清空整個tokenEdit，反之，則先以jquery.detach()處理(先拔掉，後面再加回來)
		clearByChangeGuid: function(guid){
			if('guid' in check && check.guid == guid){
				check[check.guid] = {};
				for(var i=0;i<mem.length;i++){
					//check[guid].push($(mem[i]).detach());
					check[check.guid][mem[i].id] = $(mem[i]).detach();	//把SPAN暫時移出
				}
				bReset = false;
			}
			else{
				check = {};
				mem.length = 0;
				bReset = true;
			}
		},
		setTokenEditCacheReady: function(guid){	//2017.2.23	Leslie	翻頁畫面完成後，設定tokenEdit物件已Ready
			check.guid = guid;
			bReset = false;
		},
		isResect: function(){
			return bReset;
		}
	};
}

// Default settings
var DEFAULT_SETTINGS = {
	// Search settings
	method: "GET",
	contentType: "json",
	queryParam: "q",
	searchDelay: 300,
	minChars: 1,
	propertyToSearch: "name",
	jsonContainer: null,
	useWS: false,	// 使用WebService方式查詢

	// Display settings
	hintText: "",
	noResultsText: "無相符名稱",
	searchingText: "搜尋中...",
	deleteText: "&times;",
	animateDropdown: true,

	// Tokenization settings
	tokenLimit: null,
	tokenDelimiter: ",",
	preventDuplicates: false,

	// Output settings
	tokenValue: "id",

	// Prepopulation settings
	prePopulate: null,
	processPrePopulate: false,

	// Manipulation settings
	idPrefix: "token-input-",

	// Candidate list hosted root element
	relativeRootElem: "body",
	
	// Formatters
	resultsFormatter: function(item){
		if("v" in item && item.v.length)
			return "<li>" + item.v + "</li>";
		return "<li>" + item[this.propertyToSearch]+ "</li>";
	},
	tokenFormatter: function(item) {
		if("v" in item && item.v.length) {
			if("markAsDeleted" in item && item.markAsDeleted == true)
				// 1070830 Raymond 1070929 增加token-input-token-markasdeleted class, 以避免完稿模式下已刪除雖未顯示, 但「、」仍顯示的問題
				//return "<span><del data-sn='" + item.sn + "'>" + item.v + "</del></span>";
				return "<span class='token-input-token-markasdeleted'><del data-sn='" + item.sn + "'>" + item.v + "</del></span>";
			else if("markAsNew" in item && item.markAsNew == true)
				return "<span><ins data-sn='" + item.sn + "'>" + item.v + "</ins></span>";
			return "<span>" + item.v + "</span>";
		}
		return "<span>" + item[this.propertyToSearch] + "</span>";
	},

	// Callbacks
	onResult: null,
	onPre: null,
	onAdd: null,
	onDelete: null,
	onReady: null,
	onFallbackSelect: null,
	onBeforeDropdown: function(pos) {return pos;},
	onFocus: null,
	onBlur: null,
	onInput: null
};

// Default classes to use when theming
var DEFAULT_CLASSES = {
	tokenList: "token-input-list",
	token: "token-input-token",
	tokenDelete: "token-input-delete-token",
	selectedToken: "token-input-selected-token",
	highlightedToken: "token-input-highlighted-token",
	dropdown: "token-input-dropdown",
	dropdownItem: "token-input-dropdown-item",
	dropdownItem2: "token-input-dropdown-item2",
	selectedDropdownItem: "token-input-selected-dropdown-item",
	inputToken: "token-input-input-token",
	inputFocused: "token-input-input-focused",
	dropdownContainer: "token-input-dropdown-container",
	dragging: "token-input-dragging-token"
};

// Input box position "enum"
var POSITION = {
	BEFORE: 0,
	AFTER: 1,
	END: 2
};

// Keys "enum"
var KEY = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	ESCAPE: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	NUMPAD_ENTER: 108,
	COMMA: 188
};

// Additional public (exposed) methods
var methods = {
	init: function(url_or_data_or_function, options) {
		var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

		return this.each(function () {
			$(this).data("tokenEditObject", new $.TokenEdit(this, url_or_data_or_function, settings));
			
			window.tokenSelector.add(this);	// 收集tokenEdit widget
		});
	},
	clear: function() {
		this.data("tokenEditObject").clear();
		return this;
	},
	add: function(item) {
		this.data("tokenEditObject").add(item);
		return this;
	},
	remove: function(item) {
		this.data("tokenEditObject").remove(item);
		return this;
	},
	get: function() {
		return this.data("tokenEditObject").getTokens();
	},
	refresh: function() {
		this.data("tokenEditObject").refresh();
		return this;
	},
	select: function(span) {
		this.data("tokenEditObject").select(span);
		return this;
	},
	unselectAll: function() {
		this.data("tokenEditObject").unselectAll();
		return this;
	}
}

// Expose the .tokenEdit function to jQuery as a plugin
$.fn.tokenEdit = function (method) {
	// Method calling and initialization logic
	if(methods[method]) {
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else {
		return methods.init.apply(this, arguments);
	}
};

// TokenEdit class for each div
$.TokenEdit = function (div, url_or_data, settings) {
	//
	// Initialization
	//

	// Configure the data source
	if(SSOUtil.typeOf(url_or_data) === "string" || SSOUtil.typeOf(url_or_data) === "function") {
		// Set the url to query against
		settings.url = url_or_data;

		/* 判斷是否crossDomain應在computURL裡做
		// If the URL is a function, evaluate it here to do our initalization work
		var url = computeURL();

		// Make a smart guess about cross-domain if it wasn't explicitly specified
		if(settings.crossDomain === undefined) {
			if(url.indexOf("://") === -1) {
				settings.crossDomain = false;
			} else {
				settings.crossDomain = (location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1]);
			}
		}*/
	} else if(typeof(url_or_data) === "object") {
		// Set the local data to search through
		settings.local_data = url_or_data;
	}

	// Build class names
	if(settings.classes) {
		// Use custom class names
		settings.classes = $.extend({}, DEFAULT_CLASSES, settings.classes);
	} else if(settings.theme) {
		// Use theme-suffixed default class names
		settings.classes = {};
		$.each(DEFAULT_CLASSES, function(key, value) {
			settings.classes[key] = value + "-" + settings.theme;
		});
	} else {
		settings.classes = DEFAULT_CLASSES;
	}


	// Save the tokens
	var saved_tokens = [];

	// Keep track of the number of tokens in the list
	var token_count = 0;

	// Basic cache to save on db hits
	var cache = new $.TokenEdit.Cache();

	// Keep track of the timeout, old vals
	var timeout;
	var input_val;
	
	var _clickondropdown = false;// 1061225 Raymond NCKU10610003 點到dropdown(的Scrollbar)時不要隱藏
	
	// Create a new text input an attach keyup events
	var input_box = $("<input type=\"text\" autocomplete=\"off\">")
		.css({
			outline: "0px"
		})
		//.attr("id", settings.idPrefix + div.id)
		.on('focus', function (event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
			// 1061225 Raymond NCKU10610003 點到dropdown(的Scrollbar)時不要隱藏
			if(_clickondropdown) {
				_clickondropdown = false;
			}
			else {
			if (settings.tokenLimit === null || settings.tokenLimit !== token_count) {
				show_dropdown_hint();
			}
			if(input_token.prev().length)
				input_token.addClass(settings.classes.inputFocused);
			if($.isFunction(settings.onFocus))
				settings.onFocus.call();
			}
		})
		.on('blur', function (event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
			// 1061225 Raymond NCKU10610003 點到dropdown(的Scrollbar)時不要隱藏
			if(_clickondropdown) {
				setTimeout(function() {	// solution from: https://stackoverflow.com/questions/33237769/internet-explorer-11-mouseup-triggered-on-scrollbar-mousedown
					input_box.trigger('focus');
				}, 0);
			}
			else {
			hide_dropdown();
			$(this).val("").parent().removeClass(settings.classes.inputFocused);
			if($.isFunction(settings.onBlur))
				settings.onBlur.call();
			}
		})
		.on("keyup keydown blur update compositionend", resize_input)
		.on('keydown', function (event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
			var previous_token;
			var next_token;
			
			var logged = false;
			$.each(KEY, function(k,v) {
				if(v == event.keyCode) {
					console.log("on" + event.type + ": " + k);
					logged = true;
					return false;
				}
			});
			if(!logged)
				console.log("on" + event.type + ": " + event.keyCode);
			
			switch(event.keyCode) {
				case KEY.LEFT:
				case KEY.RIGHT:
				case KEY.UP:
				case KEY.DOWN:
					if(!$(this).val()) {
						previous_token = input_box.prev();
						next_token = input_box.next();

						if((previous_token.length && previous_token.get(0) === selected_token) || (next_token.length && next_token.get(0) === selected_token)) {
							// Check if there is a previous/next token and it is selected
							if(event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) {
								deselect_token($(selected_token), POSITION.BEFORE);
							} else {
								deselect_token($(selected_token), POSITION.AFTER);
							}
						} else if((event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) && previous_token.length) {
							// We are moving left, select the previous token if it exists
							select_token($(previous_token.get(0)));
						} else if((event.keyCode === KEY.RIGHT || event.keyCode === KEY.DOWN) && next_token.length) {
							// We are moving right, select the next token if it exists
							select_token($(next_token.get(0)));
						}
					} else {
						var dropdown_item = null;

						if(event.keyCode === KEY.DOWN || event.keyCode === KEY.RIGHT) {
							dropdown_item = $(selected_dropdown_item).next();
						} else {
							dropdown_item = $(selected_dropdown_item).prev();
						}

						if(dropdown_item.length) {
							select_dropdown_item(dropdown_item);
						}
						return false;
					}
					break;

				case KEY.BACKSPACE:
					previous_token = input_box.prev();

					if(!$(this).val().length) {
						if(selected_token) {
							delete_token($(selected_token));
							token_list.trigger("change");
						} else if(previous_token.length) {
							select_token($(previous_token.get(0)));
						}

						return false;
					} else if($(this).val().length === 1) {
						hide_dropdown();
					} else {
						// set a timeout just long enough to let this function finish.
						setTimeout(function(){do_search();}, 5);
					}
					break;

				case KEY.TAB:
				case KEY.ENTER:
				case KEY.NUMPAD_ENTER:
				//case KEY.COMMA:
				  if(selected_dropdown_item) {
					add_token($(selected_dropdown_item).data("tokenEdit"));
					token_list.trigger("change");
					return false;
				  }
				  break;

				case KEY.ESCAPE:
				  hide_dropdown();
				  return true;

				/*default:
					if(String.fromCharCode(event.which)) {
						// set a timeout just long enough to let this function finish.
						setTimeout(function(){do_search();}, 5);
					}
					break;*/
			}
		}).on("textInput", function(event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + ": '" + event.originalEvent.data + "'");
			var val = event.originalEvent.data;
			if(val.match(/[,;、，；]$/)) {	// 2016.10.18 FIX for iPad
				setTimeout(function() {
					var item = {v: input_box.val().substring(0, input_box.val().length - 1)};
					add_token(item);
					token_list.trigger("change");
				}, 5);
			}
			else
				setTimeout(function(){do_search();}, 5);
		}).on("input", function(event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + ": '" + event.originalEvent.data + "'");
			if($.isFunction(settings.onInput))
				settings.onInput.call(this);
			
		}).on("compositionstart compositionupdate compositionend", function(event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + ": data:'" + event.originalEvent.data + "', locale:'" + event.originalEvent.locale + "'");
			
			// 2016.8.24 在IE環境下, 要以compositionend取代textInput, IE不會觸發textInput
			if(event.type == "compositionend" && navigator.userAgent.match(/Trident/)) {	// for IE-compatible
				var val = event.originalEvent.data;
				if(val.match(/[,;、]$/)) {
					setTimeout(function() {
						var item = {v: input_box.val().substring(0, input_box.val().length - 1)};
						add_token(item);
						token_list.trigger("change");
					}, 5);
				}
				else
					setTimeout(function(){do_search();}, 5);
			}
		});
	// DIV有id再設input的
	if("id" in div)
		input_box.attr("id", settings.idPrefix + div.id);

	// Keep a reference to the selected token and dropdown item
	var selected_token = null;
	var selected_token_index = 0;
	var selected_dropdown_item = null;

	// The list to store the token items in
	var token_list = $(div)
		.addClass(settings.classes.tokenList)
		/* 2015.7.17 修正點擊input_box軟體鍵盤會跳上又沉下問題
		.click(function (event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + "(token_list)");
			var li = $(event.target).closest("." + settings.classes.token);
			if(li && li.get(0) && $.data(li.get(0), "tokenEdit")) {
				//var deselect = toggle_select_token(li);
				if(selected_token == li.get(0)) {
					deselect_token(li);
					// trigger onSelect Callback
					if($.isFunction($.data(li.get(0), "tokenEdit").onSelect)) {
						$.data(li.get(0), "tokenEdit").onSelect.call(li.get(0), $.data(li.get(0), "tokenEdit"), true);	// 2014.12.25 - Raymond, 增加傳入deselect flag
					}
					else if($.isFunction(settings.onFallbackSelect)) {
						settings.onSelect.call(div, li, true);
					}
				}
				else
					window.tokenSelector.select(li.get(0));	// 叫用全域的select
				event.stopPropagation();
				return false;	// 禁止父層的click
			} else {
				// Deselect selected token
				if(selected_token) {
					var previous_selected_token = selected_token;
					deselect_token($(selected_token), POSITION.END);
					// 2014.12.26 - Raymond, trigger onSelect Callback
					if($.isFunction($.data(previous_selected_token, "tokenEdit").onSelect)) {
						$.data(previous_selected_token, "tokenEdit").onSelect.call(previous_selected_token, $.data(previous_selected_token, "tokenEdit"), true);
					}
					else if($.isFunction(settings.onFallbackSelect)) {
						settings.onSelect.call(div, previous_selected_token, true);
					}
				}
				else
					window.tokenSelector.selectNan();

				// Focus input box
				input_box.trigger('focus');
				event.stopPropagation();
				return false;	// 禁止父層的click
			}
		})*/
		.on('mouseover', function (event) {
			var li = $(event.target).closest("." + settings.classes.token);
			if(li && selected_token !== this) {
				li.addClass(settings.classes.highlightedToken);
			}
		})
		.on('mouseout', function (event) {
			var li = $(event.target).closest("." + settings.classes.token);
			if(li && selected_token !== this) {
				li.removeClass(settings.classes.highlightedToken);
			}
		})
		.on("vmousedown", function(event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
			if(event.target.tagName == "INPUT") {	// 2015.3.20 修正輸入區不好點問題
				// 2015.7.17 修正點擊input_box, 軟體鍵盤會跳走的問題
				//$(event.target).click();
				window.tokenSelector.selectNan();
				
//				event.stopPropagation();
//				return true;
			}
			else {
				var li = $(event.target).closest("." + settings.classes.token);
				if(li.length == 0)	// 2015.9.17 FIX, 點到input_box後面空白處時, event.target其實是token_list, 所以li一定無元素
					return;
				// 2015.10.22 新增唯讀模式, 不可拖拉
				if(!settings.readOnly)
					li.addClass(settings.classes.dragging);
				
				// 2015.7.17 修正點擊input_box, 軟體鍵盤會跳走的問題
				if(selected_token == li.get(0)) {
					deselect_token(li);
					// trigger onSelect Callback
					if($.isFunction($.data(li.get(0), "tokenEdit").onSelect)) {
						$.data(li.get(0), "tokenEdit").onSelect.call(li.get(0), $.data(li.get(0), "tokenEdit"), true);	// 2014.12.25 - Raymond, 增加傳入deselect flag
					}
					else if($.isFunction(settings.onFallbackSelect)) {
						settings.onSelect.call(div, li, true);
					}
				}
				else if(selected_token) {
					var previous_selected_token = selected_token;
					deselect_token($(selected_token), POSITION.END);
					// 2014.12.26 - Raymond, trigger onSelect Callback
					if($.isFunction($.data(previous_selected_token, "tokenEdit").onSelect)) {
						$.data(previous_selected_token, "tokenEdit").onSelect.call(previous_selected_token, $.data(previous_selected_token, "tokenEdit"), true);
					}
					else if($.isFunction(settings.onFallbackSelect)) {
						settings.onSelect.call(div, previous_selected_token, true);
					}
				}
				// 2015.7.17 如果目前focus在INPUT上, 軟體鍵盤是浮上來的, 要blur讓它沉下去
				if(document.activeElement && document.activeElement.tagName == "INPUT")
					$(document.activeElement).trigger('blur');
				
				// 2015.10.22 新增唯讀模式, 不可拖拉
				if(!settings.readOnly) {
					//var $frame = $("<div></div>").before(li);
					$("<div style='position:absolute; z-index:300; user-select:none; background:white; font-size:" + li.css("font-size") + "; font-family:" + li.css("font-family") + "'>" + li.text() + "</div>").appendTo(li.closest(".pg")).movable({
						//baseOffset: getRealPosition(that.$page.get(0)),
						//upperOffset: upperOffset,
						beforeMove: function(opts) {
							opts.scale = li.closest(".viewPort").data("zoomController").currScale / 100;
							//opts.translateX = iscroll.x/* + (16 * opts.scale)*/;
							//opts.translateY = iscroll.y/* + (20 * opts.scale)*/;
							li.closest(".viewPort").data("editCursor").cmdFloat.hide();
							opts.baseOffset = li.closest(".pg").offset();    // 移動前重取$pg的相對座標
							console.log("pg offset: " + opts.baseOffset.left + "," + opts.baseOffset.top + ";  li.pos: " + li.position().left + "," + li.position().top);
							//console.log("l:" + $(this).css("left") + ", t:" + $(this).css("top") + ", pos:" + $(this).position().left + "," + $(this).position().top);
							//$(this).css({left: li.position().left, top: li.position().top});
							// 2015.5.1 修正拖拉折行的受文者,浮動的暫時拖拉物件會出現在左邊,即次行的開始位置問題
							var rng = document.createRange();
							rng.selectNode(li.get(0));
							//window.getSelection().removeAllRanges();
							//window.getSelection().addRange(rng);
							var rcs = rng.getClientRects();
							if(rcs.length > 0) {
								for(var i=0; i<rcs.length; i++)
									console.log("\trcs[" + i + "]: " + rcs[i].left + "," + rcs[i].top + "," + rcs[i].right + "," + rcs[i].bottom);
								console.log("setcss left:" + (rcs[0].left - opts.baseOffset.left) + ", top:" + (rcs[0].top - opts.baseOffset.top));
								// 2015.6.12 修正縮放時位置不正確問題
								$(this).css({left: Math.floor((rcs[0].left-opts.baseOffset.left) / opts.scale), top: Math.floor((rcs[0].top-opts.baseOffset.top) / opts.scale)});
							}
						},
						afterMove: function(pos) {
							console.log("afterMove: " + li.position().left + ", " + li.position().top);
							// TODO: 位移的offset計算還有問題, 先暫時不異動so的pos
							//that.so.pos = Util.getRelativeOffset(that.$so.get(0), that.$pg.get(0));
							
							/*for(var i=0; i<that.signObjects.length; i++) {
								if(that.signObjects[i].id == so.id) {
									that.signObjects[i].pos.x = parseInt($(this).css("left"));
									that.signObjects[i].pos.y = parseInt($(this).css("top"));
									that.signObjects.save();
									break;
								}
							}*/
							//that.so.pos = pos;
							//if(li.parent().is("div"))
							//	li.unwrap();
							var ph = window.tokenSelector.getPlaceHolder();
							if(ph.parent().length) {
								if(ph.parent().get(0) == div) {	// 同一本別調換位置
									var o = $.data(div, "tokenEditObject");
								}
								else {
									var o = $.data(ph.parent().get(0), "tokenEditObject");
								}
								o.moveItem(li, ph);
							}
							else {	// 未插入別的本別
								li.removeClass(settings.classes.dragging);
								window.tokenSelector.select(li.get(0));
							}
							
							$(this).remove();	// this是浮動被拖拉的文字
						},
						click:false,
						duringMove: function(pos) {
							console.log("duringMove: " + pos.left + "," + pos.top + ", scale=" + (li.closest(".viewPort").data("zoomController").currScale / 100));
							var scale = li.closest(".viewPort").data("zoomController").currScale / 100;	// 2015.6.12 修正縮放時位置不正確問題
							window.tokenSelector.placeHolder({left: Math.floor(pos.left * scale), top: Math.floor(pos.top * scale)}, li);
						}
					}).trigger("vmousedown", [event.originalEvent]);	// 2015.6.12 把originalEvent當參數傳入movable外掛
				}
				else {
					window.tokenSelector.select(li.get(0));
				}
				event.stopPropagation();
				return false;
			}
		});
		//.append(input_box);
	
	// The token holding the input box
	var input_token = $("<span/>")
		.addClass(settings.classes.inputToken)
		.appendTo(token_list);
	// 1071113 Raymond 1071148 若settings.noInput設為true, 亦取消加入input_box
	// 2015.10.22 唯讀模式取消input_box
	//if(!settings.readOnly)
	if(!settings.readOnly && !settings.noInput)
		input_token.append(input_box);
	else if(settings.noInput)	// 1071113 Raymond 1071148 若settings.noInput設為true, 則修改input_token樣式為1px寬1em高, 以免拖拉功能失效
		input_token.css({display:"inline-block", minWidth:"1px", minHeight:"1em", fontSize:"inherit", lineHeight:"inherit"});
	
	var dropdown_container = $("<div/>")
		.addClass(settings.classes.dropdownContainer)
		.appendTo(settings.relativeRootElem)
		//.on("touchstart mousewheel", function(event) {return false;})	// 避免捲動超過時變成捲動Acsent
		.hide();

	// The list to store the dropdown items in
	var dropdown = $("<div/>")
		.addClass(settings.classes.dropdown)
		.appendTo(dropdown_container)
		.on('mousedown', function() {console.warn("dropdown.onmousedown");_clickondropdown = true;});// 1061225 Raymond NCKU10610003 點到dropdown(的Scrollbar)時不要隱藏

	// Magic element to help us resize the text input
	var input_resizer = $("<tester/>")
		.insertAfter(input_box)
		.css({
			position: "absolute",
			top: -900,
			left: 0,
			width: "auto",
			fontSize: input_box.css("fontSize"),
			fontFamily: input_box.css("fontFamily"),
			fontWeight: input_box.css("fontWeight"),
			letterSpacing: input_box.css("letterSpacing"),
			whiteSpace: "nowrap"
		});
	
	// 1070906 Raymond 1070929 li_data移至外部供afterRestored使用, doPopulate()會重新取得正確的li_data
	var li_data = null;

	// 2014.12.25 - Raymond, 改包成function, 供重複叫用
	function doPopulate(clearToken) {	//2017.2.23	Leslie	傳入匿名函式，依是否重新產生TokenEdit而決定是否呼叫執行清除
		// Pre-populate list if items exist
		// 1070906 Raymond 1070929 從window.tokenSelector.refresh觸發的doPopulate會傳入clearToken, 以傳入prePopulate, 由prePopulate判斷要重取受文者列表子元素, li_data則保留記錄供翻頁時afterRestored使用
		// 2014.12.25 - Raymond, settings.prePopulate可以是function
		//var li_data = ($.isFunction(settings.prePopulate)? settings.prePopulate() : settings.prePopulate) || $(div).data("pre");
		li_data = ($.isFunction(settings.prePopulate)? settings.prePopulate(clearToken) : settings.prePopulate) || $(div).data("pre");
		if(settings.processPrePopulate && $.isFunction(settings.onResult)) {
			li_data = settings.onResult.call(div, li_data);
		}
		// 1070830 Raymond 1070929 從window.tokenSelector.refresh觸發的doPopulate會傳入clearToken, 以此判定要重新整理token list
		//2017.2.23	Leslie	先檢核window.tokenSelector 是不是 reset
		//if(window.tokenSelector.isResect()){
		if(window.tokenSelector.isResect() || !!clearToken){
			if($.isFunction(clearToken))	//2017.2.23	Leslie	執行實際的Token清除
				clearToken();
			if(li_data && li_data.length) {
				$.each(li_data, function (index, value) {
					var tokenElem = insert_token(value);	// 2015.6.18 - Raymond, 新增將插入的SPAN傳入onSelect
					checkTokenLimit();
					// Execute the onPre callback if defined
					var callback = settings.onPre;
					if($.isFunction(callback)) {
						callback.call(div,value,tokenElem);	// 2015.6.18 - Raymond, 新增將插入的SPAN傳入onSelect
					}
				});
			}
		}
		else{	//2017.2.23	Leslie	tokenEdit內容未重新產生，僅需重置對應index(保持畫面與資料一致)
			if(li_data && li_data.length) {
				var tokenList = token_list.children("span." + settings.classes.token);
				if(tokenList.length == li_data.length){
					$.each(li_data, function (index, value) {
						$(tokenList[index]).data('tokenEdit').indexInXml = value.indexInXml;
					});
				}
			}
		}

		// Initialization is done
		if($.isFunction(settings.onReady)) {
			settings.onReady.call();
		}
		
		// 1090428 Raymond 1090308 初始化時重新計算input_box寬度
		input_box.trigger("update");
	}
	doPopulate();

	//
	// Public functions
	//
	
	this.clear = function() {
		token_list.children("span").each(function() {
			delete_token($(this));
		});
	}

	this.add = function(item) {
		add_token(item);
	}

	this.remove = function(item) {
		token_list.children("span").each(function() {
			var currToken = $(this).data("tokenEdit");
			if(typeof currToken === "object") {
				var match = true;
				for (var prop in item) {
					if (item[prop] !== currToken[prop]) {
						match = false;
						break;
					}
				}
				if (match) {
					delete_token($(this));
				}
			}
		});
	}
	
	this.getTokens = function() {
		return saved_tokens;
	}
	
	this.refresh = function() {
		if(selected_token) {
			$(selected_token).removeClass(settings.classes.selectedToken);;
			var token_data = $.data(selected_token, "tokenEdit");
			if(token_data && $.isFunction(token_data.onSelect))
				token_data.onSelect.call(div, token_data, true);
			selected_token = null;
		}
		//token_list.children("span." + settings.classes.token).remove();	
		doPopulate(function(){token_list.children("span." + settings.classes.token).remove();});//2017.2.23	Leslie	改為匿名函式傳入後，依是否重新產生TokenEdit而決定是否清除
		
		setTimeout(function() {
			var mr = $(div).parent().width();	// 2015.9.17 修正取父節點的width()會扣除padding
			// 1090428 Raymond 1090308 修正左距離計算錯誤
			var ml = $(div).offset().left;
			if(input_token.prev().length) {
				console.log(input_token.prev().offset());
				console.log(input_token.prev().width());
				var rng = document.createRange();
				rng.selectNodeContents(input_token.prev().get(0));
				//window.getSelection().removeAllRanges();
				//window.getSelection().addRange(rng);
				var rcs = rng.getClientRects();
				if(rcs.length) {
					for(var i=0; i<rcs.length; i++) {
						console.log(rcs[i]);
						// 1090428 Raymond 1090308 修正左距離計算錯誤
						//var l = rcs[i].right - $(div).parent().offset().left;
						var l = rcs[i].right - ml;
					}
				}
				else {
					// 1090428 Raymond 1090308 修正左距離計算錯誤
					//var l = input_token.prev().offset().left + input_token.prev().width() - $(div).parent().offset().left;
					var l = input_token.prev().offset().left + input_token.prev().width() - ml;
				}
			}
			else {
				// 1090428 Raymond 1090308 修正左距離計算錯誤
				//var l = input_box.offset().left - $(div).parent().offset().left;
				var l = input_box.offset().left - ml;
			}
			console.log("mr(" + mr + ") - l(" + l + ") = " + (mr - l));	// 1090428 Raymond 1090308 add log
			//console.log("input_box.width(" + (mr - l - 32) + ")");
			//input_box.width(Math.max(32, mr - l - 32));
			// 1090428 Raymond 1090308 修改判定最小容納寬度從25->20, 約1個中文字寬
			// 2015.6.24 再修正文字方塊最小長度計算方式
			if((mr - l - 20) > 100) {
				console.log("refresh: input_box.width(100)");
				input_box.width(100);
			}
			else if((mr - l - 20) < 0) {	// 2015.9.17 修正剩餘空間太小時, 輸入方塊寬度異常問題
				// 1090428 Raymond 1090308 修正前一個受文者長度超過28個字時, 輸入方塊寬度設為100px會超出剩餘空間導致折行的問題
				//console.log("refresh(a): input_box.width(100)");
				//input_box.width(100);
				console.log("refresh(a): input_box.css('width','')");
				input_box.css("width","");
			}
			else {
				console.log("refresh(b): input_box.width(" + (mr - l - 20) + ")");
				input_box.width(mr - l - 20);
			}
		}, 0);
	}
	
	this.select = function(span) {
		var found = false;
		token_list.children("span." + settings.classes.token).each(function(j, sp) {
			if(sp == span) {
				found = true;
				if(selected_token)
					$(selected_token).removeClass(settings.classes.selectedToken);
				select_token($(sp));
				// trigger onSelect Callback
				if($.isFunction($.data(sp, "tokenEdit").onSelect)) {
					$.data(sp, "tokenEdit").onSelect.call(sp, $.data(sp, "tokenEdit"), false);	// 傳入deselect flag
				}
				else if($.isFunction(settings.onFallbackSelect)) {
					settings.onSelect.call(div, sp, false);
				}
				return false;
			}
		});
		if(!found && selected_token) {
			$(selected_token).removeClass(settings.classes.selectedToken);
			if($.isFunction($.data(selected_token, "tokenEdit").onSelect)) {
				$.data(selected_token, "tokenEdit").onSelect.call(selected_token, $.data(selected_token, "tokenEdit"), true);
			}
			else if($.isFunction(settings.onFallbackSelect)) {
				settings.onSelect.call(div, selected_token, true);
			}
			selected_token = null;
		}
		return found;
	}
	
	this.unselectAll = function() {
		console.log("unselectAll...");
		if(selected_token) {
			$(selected_token).removeClass(settings.classes.selectedToken);;
			var token_data = $.data(selected_token, "tokenEdit");
			if(token_data && $.isFunction(token_data.onSelect))
				token_data.onSelect.call(div, token_data, true);
			selected_token = null;
		}
		/* 2015.7.17 不要blur, 會亂跳
		if(document.activeElement == input_box.get(0)) {	// 改用activeElement來判斷input_box是不是focus on
			console.log("input_box.blur()");
			input_box.trigger('blur');
		}*/
	}
	
	this.placeHolder = function(pos, place_holder, dragging_token) {
		//console.log(pos.left + "," + pos.top);
		pos.left++;	// 2016.8.24 movable外掛shadow出來的元素有陰影, 左上角座標會略超出剛點擊的項目, +1把它還原一下
		pos.top++;
		var listPos = token_list.position();
		//console.log("list pos: " + listPos.left + "," + listPos.top);
		if(pos.left >= listPos.left && pos.top >= listPos.top &&
			pos.left < listPos.left + token_list.width() && pos.top < listPos.top + token_list.height()) {
			var off = token_list.closest(".pg").offset();
			//console.log("pg offset: " + off.left + "," + off.top);
			var placed = false;
			token_list.children("span." + settings.classes.token).each(function(i, sp) {
				//console.log("span(" + $(sp).position().left + "," + $(sp).position().top + "," + $(sp).width() + "," + $(sp).height() + ")");
				// 2015.5.1 修正拖拉受文者不能拖拉到比自己後面的問題
				//var spPos = $(sp).position();
				var rng = document.createRange();
				rng.selectNode(sp);
				//window.getSelection().removeAllRanges();
				//window.getSelection().addRange(rng);
				var rcs = rng.getClientRects();
				if(rcs.length > 0) {
					if(rcs.length > 1) {	// 除以2, 1個單行sp會有2個rc, 第1個是全部包含「、」, 第2個是只有span, 比對時只需要比對第1個rc就可
						var n = rcs.length / 2;
						for(var i=0; i<n; i++) {
							//console.log("\trcs[" + i + "]: " + (rcs[i].left-off.left) + "," + (rcs[i].top-off.top) + "," + (rcs[i].right-off.left) + "," + (rcs[i].bottom-off.top));
							var rc = {left: rcs[i].left - off.left, top: rcs[i].top - off.top, right: rcs[i].right - off.left, bottom: rcs[i].bottom - off.top};
							if(pos.top >= rc.top && pos.top < rc.bottom) {
								if(pos.left >= rc.left && pos.left < rc.right && dragging_token.get(0) == sp) {
									console.log("位於已拖拉物件上");
									place_holder.remove();
									placed = true;
									return false;	// break each-loop
								}
								else if(n == 1)	{	// 只有1個rc的話, 判斷前後半部
									if(pos.left >= rc.left && pos.left < ((rc.left + rc.right) / 2)) {
										console.log("位於前半部, 插入Place Holder於前");
										$(sp).before(place_holder);
										placed = true;
										return false;	// break each-loop
									}
									else if(pos.left >= ((rc.left + rc.right) / 2) && pos.left < rc.right) {
										console.log("位於後半部, 插入Place Holder於後");
										$(sp).after(place_holder);
										placed = true;
										return false;	// beak each-loop
									}
								}
								else if(pos.left >= rc.left && pos.left < rc.right) {	// 在範圍內且不只1個rc的話
									if(i == 0)	{	// 第1個rc, 插入於前
										console.log("位於第1分部, 插入Place Holder於前");
										$(sp).before(place_holder);
										placed = true;
										return false;	// break each-loop
									}
									else if(i == n-1) {	// 最後1個rc, 插入於後
										console.log("位於最後分部, 插入Place Holder於後");
										$(sp).after(place_holder);
										placed = true;
										return false;	// beak each-loop
									}
									else {	// 中間rc, 判斷靠左靠右來決定插入於前或後
										if(pos.left >= rc.left && pos.left < ((rc.left + rc.right) / 2)) {
											console.log("位於前半部, 插入Place Holder於前");
											$(sp).before(place_holder);
											placed = true;
											return false;	// break each-loop
										}
										else if(pos.left >= ((rc.left + rc.right) / 2) && pos.left < rc.right) {
											console.log("位於後半部, 插入Place Holder於後");
											$(sp).after(place_holder);
											placed = true;
											return false;	// beak each-loop
										}
									}
								}
							}
						}
					}
					else {
						console.warn("rng.getClientRects()只回傳1個,正常應該有2個");
						var rc = {left: rcs[0].left - off.left, top: rcs[0].top - off.top, right: rcs[0].right - off.left, bottom: rcs[0].bottom - off.top};
						if(pos.top >= rc.top && pos.top < rc.bottom) {
							if(pos.left >= (rc.left - 5) && pos.left < rc.right && dragging_token.get(0) == sp) {
								console.log("位於已拖拉物件上");
								place_holder.remove();
								placed = true;
								return false;	// break each-loop
							}
							else if(pos.left >= rc.left && pos.left < ((rc.left + rc.right) / 2)) {
								console.log("位於前半部, 插入Place Holder於前");
								$(sp).before(place_holder);
								placed = true;
								return false;	// break each-loop
							}
							else if(pos.left >= ((rc.left + rc.right) / 2) && pos.left < rc.right) {
								console.log("位於後半部, 插入Place Holder於後");
								$(sp).after(place_holder);
								placed = true;
								return false;	// beak each-loop
							}
						}
					}
				}
			});
			if(!placed)	// 未拖拉至token上, 插入Place Holder於Input前
				input_token.before(place_holder);
			return true;
		}
		return false;
	}
	
	this.moveItem = function(source_token, place_holder) {
		var prev = place_holder.prev("span." + settings.classes.token), b = true;	// 2015.6.25 新增b, 預設true表示可移動
		if(prev.length) {
			// 2015.6.25 新增回呼settings.onBeforeMove
			if($.isFunction(settings.onBeforeMove)) {
				var r = settings.onBeforeMove.call(div, source_token, prev.eq(0), false);
				if(SSOUtil.typeOf(r) == "boolean")
					b = r;
			}
			if(b) {	// 無回傳值視為enable move
				prev.eq(0).after(source_token);
				// callback
				if($.isFunction(settings.onMove))
					settings.onMove.call(div, source_token, prev.eq(0), false);
			}
		}
		else {
			var next = place_holder.next("span." + settings.classes.token);
			if(next.length) {
				// 2015.6.25 新增回呼settings.onBeforeMove
				if($.isFunction(settings.onBeforeMove)) {
					var r = settings.onBeforeMove.call(div, source_token, next.eq(0), true);
					if(SSOUtil.typeOf(r) == "boolean")
						b = r;
				}
				if(b) {	// 無回傳值視為enable move
					next.eq(0).before(source_token);
					if($.isFunction(settings.onMove))
						settings.onMove.call(div, source_token, next.eq(0), true);
				}
			}
			else {
				// 2015.6.25 新增回呼settings.onBeforeMove
				if($.isFunction(settings.onBeforeMove)) {
					var r = settings.onBeforeMove.call(div, source_token, null, false);
					if(SSOUtil.typeOf(r) == "boolean")
						b = r;
				}
				if(b) {	// 無回傳值視為enable move
					input_token.before(source_token);
					if($.isFunction(settings.onMove))
						settings.onMove.call(div, source_token, null, false);
				}
			}
		}
		source_token.removeClass(settings.classes.dragging);
		place_holder.remove();
	}
	
	// 1070906 Raymond 1070929 新增afterRestored方法, 復原token span後執行, 重新設定onSelect handler
	this.afterRestored = function() {
		var callback = settings.onPre;
		if($.isFunction(callback)) {
			var tokenList = token_list.children("span." + settings.classes.token);
			tokenList.each(function (index, tokenElem) {
				var value = $(tokenElem).data('tokenEdit');
				console.log(index, tokenElem, value);
				if(!value) {
					value = li_data[index];
					$(tokenElem).data('tokenEdit', value);
				}
				callback.call(token_list,value,tokenElem);
				if($(tokenElem).hasClass(settings.classes.selectedToken))
					$(tokenElem).removeClass(settings.classes.selectedToken);
			});
			// 1110809 Raymond 考試院序170 用暫存項目復原後多呼叫一次onReady, 因為init呼叫onReady時沒有項目
			if($.isFunction(settings.onReady)) {
				settings.onReady.call();
			}
		}
	}

	//
	// Private functions
	//

	function checkTokenLimit() {
		if(settings.tokenLimit !== null && token_count >= settings.tokenLimit) {
			input_box.hide();
			hide_dropdown();
			return;
		}
	}

	function resize_input(event) {
		console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + "(resize_input)");
		if(input_val === (input_val = input_box.val())) {/*return;*/}	// 2015.3.20 修正難點問題

		if(input_val.length == 0/* && !input_box.is(":focus")*/) {
			var mr = $(div).parent().width();	// 2015.9.17 修正取父節點的width()會扣除padding
			// 1090428 Raymond 1090308 修正左距離計算錯誤
			var ml = $(div).offset().left;
			if(input_token.prev().length) {
				// 1090428 Raymond 1090308 先用選擇範圍偵測, 若前一個受文者有跨行的話, 正確抓出第2行的右邊界位置
				var rng = document.createRange();
				rng.selectNodeContents(input_token.prev().get(0));
				//window.getSelection().removeAllRanges();
				//window.getSelection().addRange(rng);
				var rcs = rng.getClientRects();
				if(rcs.length) {
					for(var i=0; i<rcs.length; i++) {
						console.log(rcs[i]);
						// 1090428 Raymond 1090308 修正左距離計算錯誤
						//var l = rcs[i].right - $(div).parent().offset().left;
						var l = rcs[i].right - ml;
					}
				}
				else {
					// 1090428 Raymond 1090308 修正左距離計算錯誤
					//var l = input_token.prev().offset().left + input_token.prev().width() - $(div).parent().offset().left;
					var l = input_token.prev().offset().left + input_token.prev().width() - ml;
				}
			}
			else {
				// 1090428 Raymond 1090308 修正左距離計算錯誤
				//var l = input_box.offset().left - $(div).parent().offset().left;
				var l = input_box.offset().left - ml;
			}
			console.log("mr(" + mr + ") - l(" + l + ") = " + (mr - l));
			// 1090428 Raymond 1090308 修改判定最小容納寬度從25->20, 約1個中文字寬
			// 2015.6.24 再修正文字方塊最小長度計算方式
			if((mr - l - 20) > 100) {
				console.log("1.input_box.width(100)");	// 2015.3.27 修正, 計算文字方塊長度最小值方式, 避免不正常折行
				input_box.width(100);
			}
			else if((mr - l - 20) < 0) {	// 2015.9.17 修正剩餘空間太小時, 輸入方塊寬度異常問題
				// 1090428 Raymond 1090308 修正前一個受文者長度超過28個字時, 輸入方塊寬度設為100px會超出剩餘空間導致折行的問題
				//console.log("1a.input_box.width(100)");
				//input_box.width(100);
				console.log("1a.input_box.css('width', '')");
				input_box.css("width", "");
			}
			else {
				console.log("1b.input_box.width(" + (mr - l - 20) + ")");
				input_box.width(mr - l - 20);
			}
			return;
		}
		// Enter new content into resizer and resize input accordingly
		var escaped = input_val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		input_resizer.html(escaped);
		console.log("2.input_box.width(" + (input_resizer.width() + 30) + ")");
		input_box.width(input_resizer.width() + 30);
	}

	function is_printable_character(keycode) {
		return ((keycode >= 48 && keycode <= 90) ||     // 0-1a-z
				(keycode >= 96 && keycode <= 111) ||    // numpad 0-9 + - / * .
				(keycode >= 186 && keycode <= 192) ||   // ; = , - . / ^
				(keycode >= 219 && keycode <= 222));    // ( \ ) '
	}

	// Inner function to a token to the list
	function insert_token(item) {
		var this_token = settings.tokenFormatter(item);
		this_token = $(this_token)
		  .addClass(settings.classes.token)
		  .insertBefore(input_token);

		// Store data on the token
		var token_data = {"id": item.id};
		token_data[settings.propertyToSearch] = item[settings.propertyToSearch];
		$.data(this_token.get(0), "tokenEdit", item);

		// Save this token for duplicate checking
		saved_tokens = saved_tokens.slice(0,selected_token_index).concat([token_data]).concat(saved_tokens.slice(selected_token_index));
		selected_token_index++;

		token_count += 1;

		// Check the token limit
		if(settings.tokenLimit !== null && token_count >= settings.tokenLimit) {
			input_box.hide();
			hide_dropdown();
		}

		return this_token;
	}

	// Add a token to the token list based on user input
	function add_token (item) {
		var callback = settings.onAdd;

		// See if the token already exists and select it if we don't want duplicates
		if(token_count > 0 && settings.preventDuplicates) {
			var found_existing_token = null;
			token_list.children().each(function () {
				var existing_token = $(this);
				var existing_data = $.data(existing_token.get(0), "tokenEdit");
				if(existing_data && existing_data.id === item.id) {
					found_existing_token = existing_token;
					return false;
				}
			});

			if(found_existing_token) {
				select_token(found_existing_token);
				input_token.insertAfter(found_existing_token).trigger('focus');
				return;
			}
		}

		// Insert the new tokens
		if(settings.tokenLimit == null || token_count < settings.tokenLimit) {
			var added_token = insert_token(item);	// 2014.12 - Raymond, 取得新增的token
			checkTokenLimit();
		}

		// Clear input box
		input_box.val("").width(30).trigger('focus');	// 2015.6.24 修正輸入太長的受文者名稱後, 不重設width會導致折行

		// Don't show the help dropdown, they've got the idea
		hide_dropdown();

		// Execute the onAdd callback if defined
		if($.isFunction(callback)) {
			callback.call(div, item, added_token);	// 2014.12 - Raymond, 傳入新增的token
		}
	}

	// Select a token in the token list
	function select_token (token) {
		token.addClass(settings.classes.selectedToken);
		selected_token = token.get(0);

		// Hide input box
		input_box.val("");

		// Hide dropdown if it is visible (eg if we clicked to select token)
		hide_dropdown();
	}

	// Deselect a token in the token list
	function deselect_token (token, position) {
		token.removeClass(settings.classes.selectedToken);
		selected_token = null;

		if(position === POSITION.BEFORE) {
			input_token.insertBefore(token);
			selected_token_index--;
		} else if(position === POSITION.AFTER) {
			input_token.insertAfter(token);
			selected_token_index++;
		} else {
			//input_token.appendTo(token_list);	2015.7.17 目前不會移動input_box位置, 永遠都是最後
			selected_token_index = token_count;
		}

		// Show the input box and give it focus again
		//input_box.focus();	2015.7.17 deselect_token不一定就是跳到input_box
	}

	// Toggle selection of a token in the token list
	function toggle_select_token(token) {
		var previous_selected_token = selected_token;

		if(selected_token) {
			deselect_token($(selected_token), POSITION.END);
		}

		if(previous_selected_token === token.get(0)) {
			deselect_token(token, POSITION.END);
			return true;	// 2014.12.25 - Raymond, 回傳true表示從selected狀態deselect
		} else {
			select_token(token);
		}
	}

	// Delete a token from the token list
	function delete_token (token) {
		// Remove the id from the saved list
		var token_data = $.data(token.get(0), "tokenEdit");
		var callback = settings.onDelete;

		var index = token.prevAll().length;
		if(index > selected_token_index) index--;
		
		// 2014.12.25 - Raymond, 刪除前deselect
		if(selected_token == token.get(0)) {
			token.removeClass(settings.classes.selectedToken);
			if($.isFunction(token_data.onSelect))
				token_data.onSelect.call(div, token_data, true);
		}

		// Delete the token
		token.remove();
		selected_token = null;

		// Show the input box and give it focus again
		input_box.trigger('focus');

		// Remove this token from the saved list
		saved_tokens = saved_tokens.slice(0,index).concat(saved_tokens.slice(index+1));
		if(index < selected_token_index) selected_token_index--;

		token_count -= 1;

		if(settings.tokenLimit !== null) {
			input_box
				.show()
				.val("")
				.trigger('focus');
		}

		// Execute the onDelete callback if defined
		if($.isFunction(callback)) {
			callback.call(div,token_data);
		}
	}

	// Hide and clear the results dropdown
	function hide_dropdown () {
		dropdown.empty();
		dropdown_container.hide();
		selected_dropdown_item = null;
	}

	function show_dropdown() {
		// 1061225 Raymond 改用input_box.height()來計算位置, Chrome下input_token.outerHeight()比IE小
		// 2014.2.11 - Raymond, 可使用回呼修正下拉選單顯示位置
		//var pos = settings.onBeforeDropdown({top:input_box.offset().top + input_token.outerHeight(), left:input_box.offset().left});
		var offs = input_box.offset();
		var pos = settings.onBeforeDropdown({top:offs.top + input_box.height(), left:offs.left});
		dropdown_container.css(pos);
		if(settings.animateDropdown)
			dropdown_container.slideDown("fast");
		else
			dropdown_container.show();
	}

	function show_dropdown_searching () {
		if(settings.searchingText) {
			dropdown.html("<p>"+settings.searchingText+"</p>");
			show_dropdown();
		}
	}

	function show_dropdown_hint () {
		if(settings.hintText) {
			dropdown.html("<p>"+settings.hintText+"</p>");
			show_dropdown();
		}
	}
	
	var _noResultFadeInTimer = null;
	function show_dropdown_noresults() {
		if(settings.noResultsText) {
			dropdown.html("<p>"+settings.noResultsText+"</p>");
			show_dropdown();
			
			_noResultFadeInTimer = setTimeout(function() {
				dropdown_container.fadeOut("slow");
				_noResultFadeInTimer = null;
			}, 2000);
		}
	}

	// Highlight the query part of the search term
	function highlight_term(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
	}
	
	function find_value_and_highlight_term(template, value, term) {
		// BUG: value如果有"?"會有問題, 推測只要是含有RegExp的關鍵字符都會出問題
		//return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "g"), highlight_term(value, term));
		// 2015.3.27 修正上述遇有value含?時, 會出現Exception問題
		var rep = value.replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>");
		console.log(rep);
		return "<li>" + rep + "</li>";
	}

	// Populate the results dropdown with some results
	function populate_dropdown (query, results) {
		// 停止無搜尋結果時的計時器	
		if(_noResultFadeInTimer !== null) {
			clearTimeout(_noResultFadeInTimer);
			_noResultFadeInTimer = null;
		}
		
		dropdown.empty();
		var dropdown_ul = $("<ul>")
			.appendTo(dropdown)
			.on('mouseover', function (event) {
				select_dropdown_item($(event.target).closest("li"));
			})
			.on('mousedown', function (event) {
				add_token($(event.target).closest("li").data("tokenEdit"));
				token_list.trigger("change");
				return false;
			});
			//.hide();
		function do_pop(results, existItems) {

			if(Object.prototype.toString.call(results) === "[object Array]") {
				$.each(results, function(index, value) {
					// 1140617 Raymond 退輔會序112 修正畫面上輸入受文者時, 查詢到的清單會出現{@xsi:nil: 'true'}這種內容, 導致出現錯誤的問題
					if(!("v" in value || (!!settings.propertyToSearch && settings.propertyToSearch in value))) {
						console.debug("value無'v'" + ((!!settings.propertyToSearch)?("或'" + settings.propertyToSearch + "'"):"") + ", 忽略");
						return;
					}
					var this_li = settings.resultsFormatter(value);
					console.log(value);
					if("v" in value)
						this_li = find_value_and_highlight_term(this_li, value.v, query);
					else
						this_li = find_value_and_highlight_term(this_li, value[settings.propertyToSearch], query);
					
					this_li = $(this_li).appendTo(dropdown_ul);
					
					if((existItems + index) % 2) {
						this_li.addClass(settings.classes.dropdownItem);
					} else {
						this_li.addClass(settings.classes.dropdownItem2);
					}

					if((existItems + index) === 0) {
						select_dropdown_item(this_li);
					}

					$.data(this_li.get(0), "tokenEdit", value);
				});
			}
			else {
				// 1140617 Raymond 退輔會序112 修正畫面上輸入受文者時, 查詢到的清單會出現{@xsi:nil: 'true'}這種內容, 導致出現錯誤的問題
				if(!("v" in results || (!!settings.propertyToSearch && settings.propertyToSearch in results))) {
					console.debug("results無'v'" + ((!!settings.propertyToSearch)?("或'" + settings.propertyToSearch + "'"):"") + ", 忽略");
					return;
				}
				var this_li = settings.resultsFormatter(results);
				
				if("v" in results)
					this_li = find_value_and_highlight_term(this_li, results.v, query);
				else
					this_li = find_value_and_highlight_term(this_li, results[settings.propertyToSearch], query);
				
				this_li = $(this_li).appendTo(dropdown_ul);
				
				if(existItems % 2) {
					this_li.addClass(settings.classes.dropdownItem);
				} else {
					this_li.addClass(settings.classes.dropdownItem2);
				}

				if(existItems === 0) {
					select_dropdown_item(this_li);
				}

				$.data(this_li.get(0), "tokenEdit", results);
			}
		}
		
		if(results) {
			
			var cnt = 0;
			if(Object.prototype.toString.call(results) === "[object Array]") {
				if(results.length > 0) {
					do_pop(results, cnt);
					cnt += results.length;
				}
			}
			else if("m_bSuccess" in results && results.m_bSuccess == "false") {	// 1061225 Raymond filter "字數過少不搜尋" 錯誤
				if("m_strErrMsg" in results && results.m_strErrMsg.length) {
					dropdown.html("<p>"+results.m_strErrMsg+"</p>");
					cnt = 1;
				}
			}
			else {
				if("OrgName" in results && typeof results.OrgName === "object") {
					if("P" in results.OrgName) {
						do_pop(results.OrgName.P, cnt);
						
						if(Object.prototype.toString.call(results.OrgName.P) === "[object Array]")
							cnt += results.OrgName.P.length;
						else
							cnt++;
					}
				}
				if("OrgNo" in results && typeof results.OrgNo === "object") {
					if("P" in results.OrgNo) {
						do_pop(results.OrgNo.P, cnt);
						
						if(Object.prototype.toString.call(results.OrgNo.P) === "[object Array]")
							cnt += results.OrgNo.P.length;
						else
							cnt++;
					}
				}
				if("SysId" in results && typeof results.SysId === "object") {
					if("P" in results.SysId) {
						do_pop(results.SysId.P, cnt);
						
						if(Object.prototype.toString.call(results.SysId.P) === "[object Array]")
							cnt += results.SysId.P.length;
						else
							cnt++;
					}
				}
				if("Alias" in results && typeof results.Alias === "object") {
					if("P" in results.Alias) {
						do_pop(results.Alias.P, cnt);
						
						if(Object.prototype.toString.call(results.Alias.P) === "[object Array]")
							cnt += results.Alias.P.length;
						else
							cnt++;
					}
				}
				// 1090929 Raymond 1090555 修正配合GetDictInfo回傳OrgInfo物件
				if("OrgInfo" in results && typeof results.OrgInfo === "object") {
					if("P" in results.OrgInfo) {
						do_pop(results.OrgInfo.P, cnt);
						
						if(Object.prototype.toString.call(results.OrgInfo.P) === "[object Array]")
							cnt += results.OrgInfo.P.length;
						else
							cnt++;
					}
				}
			}
			if(cnt > 0)
				show_dropdown();
			else
				show_dropdown_noresults();
		}
		else
			show_dropdown_noresults();
	}

	// Highlight an item in the results dropdown
	function select_dropdown_item (item) {
		if(item) {
			if(selected_dropdown_item) {
				deselect_dropdown_item($(selected_dropdown_item));
			}

			item.addClass(settings.classes.selectedDropdownItem);
			selected_dropdown_item = item.get(0);
		}
	}

	// Remove highlighting from an item in the results dropdown
	function deselect_dropdown_item (item) {
		item.removeClass(settings.classes.selectedDropdownItem);
		selected_dropdown_item = null;
	}

	// Do a search and show the "searching" dropdown if the input is longer
	// than settings.minChars
	function do_search() {
		var query = input_box.val().toLowerCase();
		console.log("dosearch('" + query + "')");

		if(query && query.length) {
			if(selected_token) {
				deselect_token($(selected_token), POSITION.AFTER);
			}

			if(query.length >= settings.minChars) {
				show_dropdown_searching();
				clearTimeout(timeout);

				timeout = setTimeout(function(){
					run_search(query);
				}, settings.searchDelay);
			} else {
				hide_dropdown();
			}
		}
	}

	// Do the actual search
	function run_search(query) {
		var cache_key = query/* + computeURL()*/;
		//var cached_results = cache.get(cache_key);
		cache.get(cache_key).done(function(cached_results) {
		
			if(cached_results) {
				populate_dropdown(query, cached_results);
			}
			else {
				// Are we doing an ajax search or local data search?
				if(settings.url) {
					
					var url = computeURL();
					if(settings.useWS) {	// 使用WebService方式查詢
						var method = "GetDictInfo";
						if("theWebServices" in window) {
							var params = {
								"argOrgNo": window.theUserInfo.OrgID,
								"argQueryString": query,
								//1061101 Cloud 增加傳入帳號作為owner條件
								"argOwner": window.theUserInfo.UserID
								};
							window.theWebServices.invokeWS(url, method, null, params, true, function(results,xml) {
								console.log(results);
								
								if($.isFunction(settings.onResult)) {
									results = settings.onResult.call(token_list, results);
								}
								cache.add(cache_key, settings.jsonContainer ? results[settings.jsonContainer] : results);
			  
								// only populate the dropdown if the results are associated with the active search query
								if(input_box.val().toLowerCase() === query) {
									populate_dropdown(query, settings.jsonContainer ? results[settings.jsonContainer] : results);
								}
							});                                                      
						}
						else {
							var xmlParams = '<?xml version="1.0" encoding="utf-8"?>' +
											'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
												'<soap:Body>' +
													'<' + method + ' xmlns="http://tempuri.org/">' +
														'<argOrgNo>' + window.theUserInfo.OrgID + '</argOrgNo>' +
														'<argQueryString>' + query + '</argQueryString>' +
													'</' + method + '>' +
												'</soap:Body>' +
											'</soap:Envelope>';
							console.log(xmlParams);
							//var t0 = new Date(), res = null;
							var xmlHttp = new XMLHttpRequest();
							xmlHttp.open("POST", url, true);
							xmlHttp.setRequestHeader("SOAPAction", 'http://tempuri.org/' + method);
							xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
							if(navigator.userAgent.search(/Chrome/) < 0) {  // not chrome!
								//xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");  // 必須加上這個Header, 以免在iOS平台預設會Cache HTTP Request的環境下發生錯誤
							//    xmlHttp.setRequestHeader("Cache-Control", "no-cache");
							}
							// 跨網域應設參數[未測試,無環境]
							xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
							//xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
							//console.log(xmlHttp);
							xmlHttp.onreadystatechange = function() 
							{
								if(xmlHttp.readyState == 4) {
									xmlHttp.responseXML;
								}
							}
							xmlHttp.send(xmlParams);
						}
					}
					else {
						var url = computeURL();
						// Extract exisiting get params
						var ajax_params = {};
						ajax_params.data = {};
						if(url.indexOf("?") > -1) {
							var parts = url.split("?");
							ajax_params.url = parts[0];
		
							var param_array = parts[1].split("&");
							$.each(param_array, function (index, value) {
								var kv = value.split("=");
								ajax_params.data[kv[0]] = kv[1];
							});
						} else {
							ajax_params.url = url;
						}
		
						// Prepare the request
						ajax_params.data[settings.queryParam] = query;
						ajax_params.type = settings.method;
						ajax_params.dataType = settings.contentType;
						if(settings.crossDomain) {
							ajax_params.dataType = "jsonp";
						}
		
						// Attach the success callback
						ajax_params.success = function(results) {
						  if($.isFunction(settings.onResult)) {
							  results = settings.onResult.call(token_list, results);
						  }
						  cache.add(cache_key, settings.jsonContainer ? results[settings.jsonContainer] : results);
		
						  // only populate the dropdown if the results are associated with the active search query
						  if(input_box.val().toLowerCase() === query) {
							  populate_dropdown(query, settings.jsonContainer ? results[settings.jsonContainer] : results);
						  }
						};
		
						// Make the request
						$.ajax(ajax_params);
					}
				}
				else if(settings.local_data) {
					// Do the search through local data
					var results = $.grep(settings.local_data, function (row) {
						return row[settings.propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
					});
	
					if($.isFunction(settings.onResult)) {
						results = settings.onResult.call(token_list, results);
					}
					cache.add(cache_key, results);
					populate_dropdown(query, results);
				}
			}
		
		}).fail(function(err) {
			console.error("Cache發生錯誤: " + err);
		});
	}

	// compute the dynamic URL
	function computeURL() {
		var url = settings.url;
		if(typeof settings.url == 'function') {
			url = settings.url.call(this, settings);
		}
		// Make a smart guess about cross-domain if it wasn't explicitly specified
		//if(settings.crossDomain === undefined) {
			if(url.indexOf("://") === -1) {
				settings.crossDomain = false;
			} else {
				settings.crossDomain = (location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1]);
			}
		//}
		return url;
	}
};

// Really basic cache for the results
$.TokenEdit.Cache = function (options) {
	// 2019.10.17 - 1080905 Eric, iPad OS 13 (@iPad Air2) WebSQL was deprecated!
	function _getIOSVersion() {
		var ua = navigator.userAgent;
				
		// 2019.12.18 - 1081132 Eric, MacPC support! window.realMac
		// iPadOS 13 PC Mode: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15
		// none PC Mode:      Mozilla/5.0 (iPad; CPU OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1
		if(ua.indexOf('iPad')===-1 && (window.realMac || ua.indexOf('Macintosh')===-1))
			return '';
		
		var i = -1;
		let _rslt = '';
		if (ua.indexOf('iPad')!==-1) {
			let keyword = ' OS ';
			i = ua.indexOf(keyword) + keyword.length;
			_rslt = ua.substring(i, ua.indexOf(' ', i)).replace(/_/g, '.');
		}
		else {
			let keyword = ' OS X ';
			i = ua.indexOf(keyword) + keyword.length;
			_rslt = ua.substring(i, ua.indexOf(')', i)).replace(/_/g, '.');
		}

		if (typeof _rslt!=='string') {
			_rslt = '';
		}

		// 若只有2節,加一個成為3節
		// 版號可能是: 13_0, 13_1_3, 一律轉為: 13.0.0, 13.1.3
		if (_rslt.indexOf('.') === _rslt.lastIndexOf('.') && _rslt.indexOf('.')!==-1) {
			_rslt += '.0';
		}
		return _rslt;
	}

	// 2019.12.18 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPad OS 13 (@iPad Air2) WebSQL was deprecated!
	// 先暫時移除所有iPad支援, 後續再找判定版本之方式!
	// var _iOSDevice = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	// if (!_iOSDevice && !window.realMac) {
	// 	_iOSDevice = navigator.userAgent.match(/Macintosh/g) ? true : false;
	// }

	// let supportedIOSDevice = false;
	// if (_iOSDevice) {
	// 	let ver = _getIOSVersion();
	// 	if (typeof ver=='string' && ver.length) {
	// 		if (ver<'13.0.0') {
	// 			supportedIOSDevice = true;
	// 		}
	// 	}
	// }

	// 2019.10.23 - 1080927 Eric, 暫時全部停用WebSQL
	//1091021	Joe		1090715		因應網頁Zap弱掃Client Sql，移除WebSQL功能，不以註解型式保留，避免仍被誤判。
	// let supportWebSQL = false;
	//if((!_iOSDevice || supportedIOSDevice) && "openDatabase" in window) {	// 　使用WebSql做為暫存查詢記錄的媒介
	//if("openDatabase" in window) {	// 　使用WebSql做為暫存查詢記錄的媒介
	//  supportWebSQL = true;
	//}
	//1091021	Joe		1090715		因應網頁Zap弱掃Client Sql，移除WebSQL功能，不以註解型式保留，避免仍被誤判。
	/*
	if (supportWebSQL) {
	}
	*/
	var settings = $.extend({
		max_size: 500
	}, options);

	var data = {};
	var size = 0;

	var flush = function () {
		data = {};
		size = 0;
	};

	this.add = function (query, results) {
		if(size > settings.max_size) {
			flush();
		}

		if(!data[query]) {
			size += 1;
		}

		data[query] = results;
	};

	this.get = function (query) {
		var dfd = $.Deferred();
		dfd.resolve(data[query]);
		return dfd.promise();
	};
};

if(window.theModMgr != undefined)
	window.theModMgr.install("RD-jquery.tokenEdit.js").finish();

}(jQuery));
