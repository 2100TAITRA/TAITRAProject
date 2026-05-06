(function( $ ) {
	
	
	$.fn.mcombobox = function(options) {
		
		var tester = $("#mcombobox_tester");
		if(tester.length == 0)
			tester = $("<span id='mcombobox_tester' style='position:absolute; left:0px; top:-100px'></span>").appendTo(document.body);
		
		//1101101 Raymond 1100991 弱掃XSS修正
		function HtmlEncode(s) {
			//1140801	Leslie[1141011]	修正弱掃[Client Dynamic File Inclusion]，使用套件消毒
			// var div = document.createElement('div');
			// div.appendChild(document.createTextNode(s));
			//return div.innerHTML;
			return DOMPurify.sanitize(s);
		}
		
		var opts = $.extend({
			type: 0,			// 0: DropDownBox, 1: DropDownList (若input的readonly為true的話, 一律為DropDownList)
			list: null,			// 自定清單, 目前僅接受Array
			autoexpand: false	// 自動增長寬度
		}, options);
		
		return this.each(function(i, elm) {
			if(elm.tagName == "INPUT" && elm.type == "text") {
				if(elm.readOnly)
					opts.type = 1;	// read only input 只能是drop down list
				
				var $this = $(elm);
				var w = tester.text($this.val()).width();
				
				var ex = (opts.type == 0)?36:24;
				//$this.wrap("<div style='display:inline-block; position:relative; vertical-align:text-bottom; '></div>")
				//	.css({position:"absolute", zIndex:20})
				//	.parent().css("height", $this.outerHeight() + "px");
				if(opts.autoexpand)
					$this.css("width", (w + ex) + "px")
						.parent().css("width", (w + ex) + "px");
				//else
				//	$this.parent().css("width", $this.width() + "px");
				$this.parent().css("position", "relative");
				
				var listCounts = 1, j;
				// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade [bug-fix, add last </select'>']
				var listbox = $("<select style='position:absolute; z-index:10; visibility:hidden; font-family:" + $this.css("font-family") + "; font-size:" + $this.css("font-size") + ";'></select>").insertBefore($this);
				var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
				// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
				// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
				if (!isMobile && !window.realMac) {
					isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
				}

				if(isMobile)
					listbox.css("clip", "rect(0px,0px,0px,px)");
				
				var val = $this.val();
				if(opts.list !== null && Object.prototype.toString.apply(opts.list) === "[object Array]") {	// list參數目前僅支援Array物件
					listCounts = opts.list.length;
					for(j=0; j<opts.list.length; j++) {
						if(val.length > 0)
							listbox.append("<option" + ((val == opts.list[j])?" selected":"") + ">" + opts.list[j] + "</option>");
						else
							listbox.append("<option>" + opts.list[j] + "</option>");
					}
				}
				else {	// 套用的HTML元素直接定義另一個有options的元素ID在"list"屬性
					var listId = $this.attr("list");
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// if(typeof listId !== "undefined" && $("#" + listId).length) {
						// var list = $("#" + listId).children("option");
					if(typeof listId !== "undefined" && $("#" + HtmlEncode(listId)).length) {
						var list = $("#" + HtmlEncode(listId)).children("option");
						listCounts = list.length;
						for(j=0; j<list.length; j++) {
							if(val.length > 0)
								listbox.append("<option" + ((val == list.get(j).value)?" selected":"") + ">" + HtmlEncode(list.get(j).value) + "</option>");	// 2015.1.30 fix, 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							else
								listbox.append("<option>" + HtmlEncode(list.get(j).value) + "</option>");	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
						}
					}
				}
				
				if(opts.type == 0) {	// Drop down box(可輸入)
					if(!isMobile)
						listbox.css("top", ($this.outerHeight() + Number($this.css("margin-bottom").replace(/px/, ""))) + "px");
					listbox.on('change', function() {
						$this.val(this.value).trigger('change').trigger('focus');
					}).on('blur', function() {
						$(this).attr("size", 1).css("visibility", "hidden");
						$this.css("z-index", 20);
					});
					
					$this.css("padding-right", "36px");
					console.log("input.offset = " + typeof $this.prop("offsetLeft") + "," + $this.css("margin-top"));
					if("jQuery" in window && "mobile" in jQuery)	// 2015.1.30 - 新增支援jQuery Mobile的按鈕, 維持jQM風格統一
						//1110113	Joe		1101406		修正jQM改版後，按鈕Class應配合變更統一風格
						// var $btn = $("<a href='#' style='width:40px; height:40px; z-index:10; position:absolute; padding:11px'></a>").append("<div class='ui-icon ui-icon-arrow-d ui-icon-shadow'></div>");
						var $btn = $("<a href='#' style='width:40px; height:30px; z-index:10; position:absolute; padding:11px'></a>").append("<div class='ui-icon-carat-d ui-btn-icon-right ui-btn-c'></div>");
					else
						var $btn = $("<a href='#' style='width:40px; height:40px; background-image:url(image/aol/arrow-down-24.png); background-position:center; background-repeat:no-repeat; z-index:10; position:absolute;'></a>")
						//1110113	Joe		1101406		改將按鈕直接貼齊右邊，非從左邊Textbox開頭計算
					// $btn.css({left: ($this.prop("offsetLeft") + $this.width() + Number($this.css("padding-left").replace(/px/, "")) + Number($this.css("padding-right").replace(/px/, "")) - 36) + "px",
					$btn.css({right: "0px",
						  top: ($this.prop("offsetTop") + (($this.height() + Number($this.css("margin-top").replace(/px/, "")) + Number($this.css("margin-bottom").replace(/px/, "")) - 40) / 2)) + "px"})
					.insertAfter($this)
					.on('click', function(event) {
						event.preventDefault();
						if(isMobile) {
							$this.css("z-index", 30);
							if(opts.autoexpand)
								$this.css("width", (Math.max(listbox.width(), $this.width()) + ex) + "px")
									.parent().css("width", $this.width() + "px");
							listbox.attr("size", listCounts)
								.css("visibility", "")
								.css("clip", "rect(0px,0px,0px,0px)")
								.trigger('focus');
						}
						else {
							$this.css("z-index", 30);
							if(opts.autoexpand)
								$this.css("width", (listbox.width() + ex) + "px")
									.parent().css("width", $this.width() + "px");
							listbox.attr("size", listCounts)
								.css("visibility", "")
								.trigger('focus');
						}
					});
				}
				else {	// Drop down list(不可輸入)
					listbox.on('change', function() {
						$this.val(this.value).trigger('change');
						$(this).trigger('blur');
					}).on('blur', function() {
						$(this).attr("size", 1).css("visibility", "hidden");
						$this.css("z-index", 20);
					});
					$this.on('click' ,function() {
						if(isMobile) {
							$this.css("z-index", 30);
							if(opts.autoexpand)
								$this.css("width", (listbox.width() + ex) + "px")
									.parent().css("width", (Math.max(listbox.width(), $this.width()) + ex) + "px");
							listbox.attr("size", listCounts)
								.css("visibility", "")
								.css("clip", "rect(0px,0px,0px,0px)")
								.trigger('focus');
						}
						else {
							$this.css("z-index", 0);
							if(opts.autoexpand)
								$this.parent().css("width", (Math.max(listbox.width(), $this.width()) + ex) + "px");
							listbox.attr("size", listCounts)
								.css("visibility", "")
								.trigger('focus');
						}
					});
				}
				if(opts.autoexpand) {
					$this.on("textInput change", function() {
						w = tester.css({fontFamily: $this.css("font-family"), fontSize: $this.css("font-size")})
							.text(this.value).width();
						
						$this.css("width", (w + ex) + "px")
						.parent().css("width", (w + ex) + "px");
					});
				}
			}
			else
				console.warn("mcombobox widget僅支援text type的input元素");
		});
	}
	
	$.fn.mdatepicker = function(options) {
		var opts = $.extend({
			type: 0,			// 0: 中華民國年月日, 1: 7碼數字(YYYMMDD)
			format: null		// 自定格式, 目前僅接受function,
								// callback時this指回原input[type=text]元素,
								// 參數則是選取的日期物件javascript的Date物件
								// 若回傳值是字串或數字, 則設為原input元素的value
		}, options);
		
		if(typeof padLeft === "undefined") {
			if(typeof SSOUtil !== "undefined" && "padLeft" in SSOUtil)
				var padLeft = SSOUtil.padLeft;
			else if(typeof Util !== "undefined" && "padLeft" in Util)
				var padLeft = Util.padLeft;
			else
				var padLeft = function(num, len) {
					if(typeof num != "string")
						num = num.toString();
					if(num.length >= len)
						return num;
					else
						return arguments.callee("0" + num, len);
				};
		}
		
		return this.each(function(i, elm) {
			if(elm.tagName == "INPUT") {
				var $inp, $dp, $btn;
				if(elm.type == "text") {
					$inp = $(elm);
					$dp = $("<input type='date' style='position:absolute; clip:rect(0px,0px,0px,0px)'>").insertBefore($inp);
					var val = $inp.val();
					if(!$.isFunction(opts.format)) {
						if(opts.type == 0) {
							if(val.match(/中華民國(\d+)年(\d+)月(\d+)日/g))
								$dp.val((Number(RegExp.$1) + 1911) + "-" + padLeft(Number(RegExp.$2), 2) + "-" + padLeft(Number(RegExp.$3), 2));
						}
						else if(opts.type == 1) {
							if(val.match(/(\d{3})(\d{2})(\d{2})/))
								$dp.val((Number(RegExp.$1) + 1911) + "-" + RegExp.$2 + "-" + RegExp.$3);
						}
					}
					$btn = $("<a href='#' style='position:absolute; width:36px; height:36px; background-image:url(image/aol/calendar-24.png); background-position:center; background-repeat:no-repeat'></a>")
					.css({left: ($inp.prop("offsetLeft") + $inp.width() + Number($inp.css("padding-right").replace(/px/, "")) - 36) + "px",
							  top: ($inp.prop("offsetTop") + (($inp.height() + Number($inp.css("margin-top").replace(/px/, "")) - 36) / 2)) + "px"})
					.insertAfter($inp)
					.on('click', function(event) {
						event.preventDefault();
						$dp.trigger('focus');
					});
					$dp.on('change', function() {
						var d = new Date(this.value);
						console.log("dp:" + [d]);
						if($.isFunction(opts.format)) {
							var res = opts.format.apply($inp.get(0), [d]);
							if(typeof res === "string" || typeof res === "number")
								$inp.val(res);
						}
						else if(opts.type == 0) {
							var v = "中華民國" + (d.getYear() - 11) + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
							$inp.val(v);
						}
						else if(opts.type == 1) {
							$inp.val(typeof padLeft);
							var v = padLeft(d.getYear() - 11, 3) + padLeft(d.getMonth() + 1, 2) + padLeft(d.getDate(), 2);
							$inp.val(v);
						}
					});
				}
			}
		});
	}
})( jQuery );
