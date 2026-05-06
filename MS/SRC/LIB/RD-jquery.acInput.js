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


// Default settings
var DEFAULT_SETTINGS = {
	// Search settings
    searchDelay: 300,
    minChars: 1,
    propertyToSearch: "name",
	keepNotRecognizedField: false,		// 是否保留在候選清單中顯示搜尋到關鍵字但不支援的標籤欄位

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

	// Manipulation settings
    idPrefix: "token-input-",

	// Candidate list hosted root element
	relativeRootElem: "body",
	
	// Formatters
    resultsFormatter: function(item, term){
		if("nodeType" in item && item.nodeType == 1) {
			if(item.tagName == "Name")	{	// 姓名
				var data = {
					unitName: $(item).closest("Unit").find("> UnitName").text(),
					unitNo: $(item).closest("Unit").attr("UnitCode"),
					roleName: $(item).closest("Role").find("> RoleName").text(),
					roleNo: $(item).closest("Role").attr("RoleNo"),
					account: $(item.parentNode).find("Account").text(),
					name: item.textContent
				};
				data.v = data.unitName + "-" + data.roleName + "-" + data.name;
				return "<li data-detail='" + JSON.stringify(data) + "'><span class='unit'>" + data.unitName + "</span>-<span class='role'>" + data.roleName + "</span>-<span class='occupant'>" + item.textContent.replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>") + "</span></li>";
			}
			else if(item.tagName == "RoleName") {
				var data = {
					unitName: $(item).closest("Unit").find("> UnitName").text(),
					unitNo: $(item).closest("Unit").attr("UnitCode"),
					roleName: item.textContent,
					roleNo: $(item).closest("Role").attr("RoleNo")
				};
				data.v = data.unitName + "-" + data.roleName;
				return "<li data-detail='" + JSON.stringify(data) + "'><span class='unit'>" + data.unitName + "</span>-<span class='role'>" + item.textContent.replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>") + "</span></li>";
			}
			else if(item.tagName == "UnitName") {
				var data = {
					unitName: item.textContent,
					unitNo: $(item).closest("Unit").attr("UnitCode"),
					v: item.textContent
				};
				return "<li data-detail='" + JSON.stringify(data) + "'><span class='unit'>" + item.textContent.replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>") + "</span></li>";
			}
			var data = {v: item.textContent};
			return "<li data-detial='" + JSON.stringify(data) + "'>" + item.textContent.replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>") + "(無法識別的項目類型)</li>";
		}
		if("v" in item && item.v.length)
			return "<li>" + item.v.replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>") + "</li>";
		return "<li>" + item[this.propertyToSearch].replace(new RegExp("(" + term + ")", "gi"), "<b>$1</b>")+ "</li>";
	},

	// Callbacks
    onFilter: null,									// 提供過濾搜尋到的結果清單, 回傳true表示允許列在清單, 否則表示不允許列在清單
	onBeforeDropdown: function(pos) {return pos;},	// 提供校正候選清單位置的功能
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
    init: function(data_doc, options) {
        var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

        return this.each(function () {
            $(this).data("acInputObject", new $.AcInput(this, data_doc, settings));
        });
    },
	get: function() {
		return this.data("acInputObject").getData();
	}
}

// Expose the .acInput function to jQuery as a plugin
$.fn.acInput = function (method) {
    // Method calling and initialization logic
    if(typeof method === "string" && methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
        return methods.init.apply(this, arguments);
    }
};

// AcInput class for each input
$.AcInput = function (inp, data_doc, settings) {
    //
    // Initialization
    //

    // Configure the data source
	// Set the local data to search through
	settings.local_data = data_doc;

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
//	var saved_tokens = [];

    // Keep track of the number of tokens in the list
//	var token_count = 0;

    // Basic cache to save on db hits
//	var cache = new $.TokenEdit.Cache();

    // Keep track of the timeout, old vals
    var timeout;
    var input_val;

    // Create a new text input an attach keyup events
    var input_box = $(inp).attr("autocomplete","off")
        .css({
            outline: "0px"
		})
		// [2019.11 Eric merge] with Raymond!
        //.attr("id", settings.idPrefix + div.id)
        /*.focus(function (event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
            if (settings.tokenLimit === null || settings.tokenLimit !== token_count) {
                show_dropdown_hint();	// 顯示"請輸入單位、角色、姓名"
            }
			if($.isFunction(settings.onFocus))
				settings.onFocus.call();
        })*/
        .on('blur', function () {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
			hide_dropdown();
//			$(this).val("").parent().removeClass(settings.classes.inputFocused);
			if($.isFunction(settings.onBlur))
				settings.onBlur.call();
        })
//		.on("keyup keydown blur update compositionend", resize_input)
        .on('keydown', function (event) {
			//console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
			
			var logged = false;
			$.each(KEY, function(k,v) {
				if(v == event.keyCode) {
					console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + ": " + k);
					logged = true;
					return false;
				}
			});
			if(!logged)
				console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + ": " + event.keyCode);
			
            switch(event.keyCode) {
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                    if(!$(this).val()) {
                    } else {
						// 上下選取候選清單內項目
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

                /* 以oninput事件時機點來跑查詢, 因在iPad上按完BackSpace後, 到oninput前執行查詢的話, val()會回傳的是BackSpace前的文字, 導致搜尋有誤
				case KEY.BACKSPACE:
                    if(!$(this).val().length) {
						// 吃掉BS?
                        return false;
                    } else if($(this).val().length === 1) {	// 目前只有1個字, 所以BS後隱藏候選清單
						setVal(null);	// 清除原本選擇的清單項目明細
                        hide_dropdown();
                    } else {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function(){do_search();}, 5);
                    }
                    break;*/

                case KEY.TAB:
                case KEY.ENTER:
                case KEY.NUMPAD_ENTER:
                //case KEY.COMMA:
					if(selected_dropdown_item) {
						setVal($(selected_dropdown_item).attr("data-detail"));
						input_box.trigger("change");
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
			/*var val = event.originalEvent.data;
			if(val.match(/[,;、]$/)) {
				setTimeout(function() {
					var item = {v: input_box.val().substring(0, input_box.val().length - 1)};
					add_token(item);
					token_list.trigger("change");
				}, 5);
			}
			else
				setTimeout(function(){do_search();}, 5);*/
		}).on("input", function(event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type);
	        if($.isFunction(settings.onInput))
				settings.onInput.call(this);
			// 改在oninput時再執行查詢, 目前看起來iPad跟桌機Safari都有input事件
			$(this).data("acInputData", null);	// 內容異動, 重置明細資料
			setTimeout(function(){do_search();}, 5);
		}).on("compositionstart compositionupdate compositionend", function(event) {
			console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + ": data:'" + event.originalEvent.data + "', locale:'" + event.originalEvent.locale + "'");
		});
	// DIV有id再設input的
	var inpId = input_box.attr("id");

    // Keep a reference to the selected dropdown item
    var selected_dropdown_item = null;

	// 唯讀模式input_box
	if(settings.readOnly)
		input_box.prop("readonly", true); // 2019.11.18 - 1080339 Eric, attr()->prop
	
	var dropdown_container = $("<div/>")
		.addClass(settings.classes.dropdownContainer)
		.appendTo(settings.relativeRootElem)
		//.on("touchstart mousewheel", function(event) {return false;})	// 避免捲動超過時變成捲動Acsent
		.hide();

    // The list to store the dropdown items in
    var dropdown = $("<div/>")
        .addClass(settings.classes.dropdown)
        .appendTo(dropdown_container);

    // Magic element to help us resize the text input
//	var input_resizer = $("<tester/>")
//		.insertAfter(input_box)
//		.css({
//			position: "absolute",
//			top: -900,
//			left: 0,
//			width: "auto",
//			fontSize: input_box.css("fontSize"),
//			fontFamily: input_box.css("fontFamily"),
//			fontWeight: input_box.css("fontWeight"),
//			letterSpacing: input_box.css("letterSpacing"),
//			whiteSpace: "nowrap"
//		});

    //
    // Public functions
    //
	this.getData = function() {
		return input_box.data("acInputData");
	}

    //
    // Private functions
    //

//	function resize_input(event) {
//		console.log(event.target.tagName + "#" + event.target.id + ".on" + event.type + "(resize_input)");
//		if(input_val === (input_val = input_box.val())) {/*return;*/}	// 2015.3.20 修正難點問題

//		if(input_val.length == 0/* && !input_box.is(":focus")*/) {
//			var mr = $(div).parent().width();	// 2015.9.17 修正取父節點的width()會扣除padding
//			if(input_token.prev().length)
//				var l = input_token.prev().offset().left + input_token.prev().width() - $(div).parent().offset().left;
//			else
//				var l = input_box.offset().left - $(div).parent().offset().left;
//			console.log("mr(" + mr + ") - l(" + l + ") = " + (mr - l));
			// 2015.6.24 再修正文字方塊最小長度計算方式
//			if((mr - l - 25) > 100) {
//				console.log("1.input_box.width(100)");	// 2015.3.27 修正, 計算文字方塊長度最小值方式, 避免不正常折行
//				input_box.width(100);
//			}
//			else if((mr - l - 25) < 0) {	// 2015.9.17 修正剩餘空間太小時, 輸入方塊寬度異常問題
//				console.log("1a.input_box.width(100)");
//				input_box.width(100);
//			}
//			else {
//				console.log("1b.input_box.width(" + (mr - l - 25) + ")");
//				input_box.width(mr - l - 25);
//			}
//			return;
//		}
		// Enter new content into resizer and resize input accordingly
//		var escaped = input_val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//		input_resizer.html(escaped);
//		console.log("2.input_box.width(" + (input_resizer.width() + 30) + ")");
//		input_box.width(input_resizer.width() + 30);
//	}

    function is_printable_character(keycode) {
        return ((keycode >= 48 && keycode <= 90) ||     // 0-1a-z
                (keycode >= 96 && keycode <= 111) ||    // numpad 0-9 + - / * .
                (keycode >= 186 && keycode <= 192) ||   // ; = , - . / ^
                (keycode >= 219 && keycode <= 222));    // ( \ ) '
    }

    // 依使用者點選候選清單項目設input_box值
    function setVal(item) {
		console.warn("setVal(" + item + ")");
		if(typeof item === "string")
			item = JSON.parse(item);

		if(item) {
			if("v" in item)
				input_box.val(item.v);				// 設定input_box值
			else
				input_box.val(item[settings.propertyToSearch]);
		}
		input_box.data("acInputData", item);	// 設定選取的清單項目明細or null

        // Don't show the help dropdown, they've got the idea
        hide_dropdown();
    }

    // Hide and clear the results dropdown
    function hide_dropdown () {
        dropdown.empty();
		dropdown_container.hide();
        selected_dropdown_item = null;
    }

    function show_dropdown() {
		// 可使用onBeforeDropdown回呼修正下拉選單顯示位置
		var pos = settings.onBeforeDropdown({top:input_box.offset().top + input_box.outerHeight(), left:input_box.offset().left});
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
				setVal($(event.target).closest("li").attr("data-detail"));
				input_box.trigger("change");
				return false;
			});
			//.hide();
		function do_pop(results, existItems) {

			if(Object.prototype.toString.call(results) === "[object Array]") {
				$.each(results, function(index, value) {
					var this_li = settings.resultsFormatter(value, query);
					/*console.log(value);
					if("v" in value)
						this_li = find_value_and_highlight_term(this_li, value.v, query);
					else
						this_li = find_value_and_highlight_term(this_li, value[settings.propertyToSearch], query);*/
					
					this_li = $(this_li).appendTo(dropdown_ul);
					
					if((existItems + index) % 2) {
						this_li.addClass(settings.classes.dropdownItem);
					} else {
						this_li.addClass(settings.classes.dropdownItem2);
					}

					if((existItems + index) === 0) {
						select_dropdown_item(this_li);
					}

					$.data(this_li.get(0), "acInputData", value);
				});
			}
			else {
				var this_li = settings.resultsFormatter(results, query);
				
				/*if("v" in results)
					this_li = find_value_and_highlight_term(this_li, results.v, query);
				else
					this_li = find_value_and_highlight_term(this_li, results[settings.propertyToSearch], query);*/
				
				this_li = $(this_li).appendTo(dropdown_ul);
				
				if(existItems % 2) {
					this_li.addClass(settings.classes.dropdownItem);
				} else {
					this_li.addClass(settings.classes.dropdownItem2);
				}

				if(existItems === 0) {
					select_dropdown_item(this_li);
				}

				$.data(this_li.get(0), "acInputData", results);
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
			else {	// 分組, 有優先順序
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
			}
			if(cnt > 0)
				show_dropdown();
			else {
				input_box.data("acInputData", null);
				show_dropdown_noresults();
			}
        }
		else {
			input_box.data("acInputData", null);
			show_dropdown_noresults();
		}
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
	
	function enumAllNode(doc, filter) {
	
		var res = [];
		function do_enum(node) {
			if(node.nodeType == 1) {
				if(!!filter(node)) {
					if($.isFunction(settings.onFilter)) {	// Caller提供的過濾函式
						try {
							if(!!settings.onFilter.call(this, node))
								res.push(node);
						}
						catch(e) {
							console.error("Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
						}
					}
					else
						res.push(node);
				}
				
				for(var i=0; i<node.childNodes.length; i++) {
					do_enum(node.childNodes[i]);
				}
			}
			else if(node.nodeType != 3) {
				console.log("nodeType: " + node.nodeType + "  NO enum");
			}
		}
		var t0 = new Date();
		do_enum(doc.documentElement);
		console.log("搜尋經過" + (new Date() - t0) + "ms");
		return res;
	}

    // Do the actual search
    function run_search(query) {
		if(settings.local_data) {
			if("length" in settings.local_data) {
				// Do the search through local data
				var results = $.grep(settings.local_data, function (row) {
					return row[settings.propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
				});

				populate_dropdown(query, results);
			}
			/*else if(typeof settings.local_data === "object" &&									// 支援XML Document查詢, 回傳集合為node
				(Object.prototype.toString.call(settings.local_data) == "[object Document]" ||		// iPad、Safari的XML文件類型為[object Document]
				Object.prototype.toString.call(settings.local_data) == "[object XMLDocument]")) {	// Chrome的XML文件類型為[object XMLDocument]*/
			else if(settings.local_data instanceof Document) {										// 2015.12.4 - Safari跟Chrome的XML文件雖toString雖不同, 但instanceof Document都為true
				var results = enumAllNode(settings.local_data, function(node) {
					if(node.nodeType == 1) {	// element node
						if(node.childNodes.length == 1 && node.childNodes[0].nodeType == 3) {	// 僅判斷只有一個文字節點的欄位
						
							if(settings.keepNotRecognizedField)
								return node.textContent.toLowerCase().indexOf(query.toLowerCase()) > -1;
							// 支援的標籤欄位只有Name(人員)、RoleName(角色)、UnitName(單位)
							if(node.tagName == "Name" || node.tagName == "RoleName" || node.tagName == "UnitName")
								return node.textContent.toLowerCase().indexOf(query.toLowerCase()) > -1;
						}
					}
					return false;
				});
				
				populate_dropdown(query, results);
			}
			else {
				dropdown.html("<p>指定的查詢來源非XML文件</p>");
				show_dropdown();
			}
		}
    }

};


if(window.theModMgr != undefined)
	window.theModMgr.install("RD-jquery.acInput.js").finish();

}(jQuery));
