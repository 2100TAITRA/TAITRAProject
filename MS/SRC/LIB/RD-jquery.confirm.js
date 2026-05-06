/*
 * Better confirm box - jQuery Plugin
 * original from http://tutorialzine.com/2010/12/better-confirm-box-jquery-css3/
 * 2015.11.4 - Raymond remake
 */

 // 1080927  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)

;(function ($) {

	$.confirm = function(params){

		if($('#confirmOverlay').length){
			// A confirm is already shown on the page:
			theLogger.error("已經有一個confirmOverlay在畫面中!");
			return false;
		}

		var buttonHTML = '';
		// 2015.11.4 - Raymond mod, supporting params.buttons as Array
		//if(Object.prototype.toString.call(params.buttons) === "[object Array]") {	// detect Array type
		if(SSOUtil.typeOf(params.buttons) == "array") {	// 2016.8.4 改用jQuery.type判定陣列類型
			// 2020.2.13 - 1080782 Eric, merge MOI 1070309 - 新增[儲存後發文]按鈕, 調整寬度.
			if(params.buttons.length > 2) {
				if (params.buttons.length>=4) {
					$('#confirmBox').css("width", (params.buttons.length * 80 + 280) + "px");
				}
				else {
					$('#confirmBox').css("width", (params.buttons.length * 60 + 280) + "px");
				}
			}
			
			$.each(params.buttons, function(idx, obj) {
				buttonHTML += '<a href="#" class="button'+(('class' in obj && obj.class.length)?' '+obj['class']:'')+'">' + obj['name'] + '<span></span></a>';
				
				if(!obj.action) {
					obj.action = function() {};	// dummy action
				}
			});
		}
		else {
			$.each(params.buttons, function(name,obj){

				// Generating the markup for the buttons:

				buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>';

				if(!obj.action){
					obj.action = function(){};	// dummy action
				}
			});
		}
		
		// 2016.8.4 - Raymond mod, 擴充支援選單
		var msgHTML = '';
		if(params.selectItems) {
			if(SSOUtil.typeOf(params.selectItems) == "array") {
				/* 2016.10.21 - Raymond mod, 選單從select改成ol, 避免iPad上無法支援
				msgHTML = '<select id="confirmItems" size="' + params.selectItems.length + '">';
				$.each(params.selectItems, function(idx, item) {
					if(SSOUtil.typeOf(item) == "string") {
						if("selectedIndex" in params && params.selectedIndex == idx)
							msgHTML += '<option selected>' + item + '</option>';
						else
							msgHTML += '<option>' + item + '</option>';
					}
					else if("selectedIndex" in params && params.selectedIndex == idx)
						msgHTML += '<option' + (("value" in item)?' value="' + item.value + '"':'') + ' selected>' + item.name + '</option>';
					else
						msgHTML += '<option' + (("value" in item)?' value="' + item.value + '"':'') + '>' + item.name + '</option>';
				});
				msgHTML += '</select>';*/
				// 1110111 Raymond 限制選單最大高度, 以免測試環境塞了太多選單項目(ex.樣版選取)變成太長超出畫面高度的問題
				//msgHTML = '<ol id="confirmItems" data-role="listview">';
				msgHTML = '<ol id="confirmItems" data-role="listview" style="max-height:200px;overflow-y:auto;">';
				$.each(params.selectItems, function(idx, item) {
					if(SSOUtil.typeOf(item) == "string") {
						/*if("selectedIndex" in params && params.selectedIndex == idx)
							msgHTML += '<li data-icon="false"><a class="ui-btn-active">' + item + '</a></li>';
						else*/
							msgHTML += '<li data-icon="false"><a>' + item + '</a></li>';
					}
					/*else if("selectedIndex" in params && params.selectedIndex == idx)
						msgHTML += '<li data-icon="false"><a' + (("value" in item)?' data-value="' + item.value + '"':'') + ' class="ui-btn-active">' + item.name + '</a></li>';*/
					else
						msgHTML += '<li data-icon="false"><a' + (("value" in item)?' data-value="' + item.value + '"':'') + '>' + item.name + '</a></li>';
				});
				msgHTML += '</ol>';
			}
			else {	// 選項物件?
				
			}
		}
		else
			msgHTML = '<p>' + params.message + '</p>';

		var markup = [
			'<div id="confirmOverlay">',
			'<div id="confirmBox" class="ui-group-theme-c">',	// 2016.10.21 add ui-group-theme-c for 套用ui-listview的預設樣式
			'<h1>',params.title,'</h1>',
			msgHTML,
			'<div id="confirmButtons">',
			buttonHTML,
			'</div></div></div>'
		].join('');

		// 2015.11.4 - Raymond mod, add extra callback support
		// 2016.10.21 - Raymond mod, 因select改成ol, 所以加上trigger("create")
		$(markup).hide().appendTo('body').trigger("create").fadeIn(function() {
			if("selectItems" in params) {	// 2016.10.21 預設選取項目改在此設定
				$(this).find("#confirmItems").find("a")
				.on('click', function() {
					$(this).closest(".ui-listview").find("a").removeClass("ui-btn-active");
					$(this).addClass("ui-btn-active");
				})
				.each(function(idx, a) {
					if("selectedIndex" in params && params.selectedIndex == idx) {
						$(a).addClass("ui-btn-active");
						// 1120822 Raymond 1120949 新增若提供的預設選取的項目在一開始可見選項之外, 則設定捲動位置使預設選取的項目於可見選項範圍內
						if(params.selectedIndex > 0) {
							let pt = $(a).closest("#confirmItems").offset().top,
								at = $(a).closest("li").offset().top,
								ph = $(a).closest("#confirmItems").height(),
								ah = $(a).closest("li").height();
							if(at - pt + ah > ph) {
								$(a).closest("#confirmItems").prop("scrollTop", at - pt);
							}
						}
					}
				});
			}
			
			if($.isFunction(params.beforeShow))
				params.beforeShow();
		});

		var buttons = $('#confirmBox .button'),
			i = 0;

		// 2015.11.4 - Raymond mod, supporting params.buttons as Array
		//if(Object.prototype.toString.call(params.buttons) === "[object Array]") {	// detect Array type
		if(SSOUtil.typeOf(params.buttons) == "array") {	// 2016.8.4 改用jQuery.type判定陣列類型
			if(params.buttons.length > 2)
				$('#confirmBox').css("width", (params.buttons.length * 60 + 280) + "px");
			$.each(params.buttons, function(idx, obj) {
				buttons.eq(idx).on('click', function() {
					try {	// 2015.12.23 叫用外部callback用try-catch以免外部callback出錯, 影響confirm的運作
						if("selectItems" in params && params.selectItems) {	// 2016.8.4 選單模式, 回傳selectedIndex參數
							var $si = $("#confirmBox #confirmItems").find(".ui-btn-active");
							if($si.length) {
								var si = $si.parent().prevAll().length;
								obj.action(si, obj.data);
							}
							else if("selectedIndex" in params)	// fallback to default selected index
								obj.action(params.selectedIndex, obj.data);
							else	// fallback to default first index
								obj.action(0, obj.data);
						}
						else
							obj.action(obj.data);	// support extra callback data
					}
					catch(e) {
						theLogger.error(e.message + "-" + e.sourceURL + ":" + e.line);
						alert(e.message + "-" + e.sourceURL + ":" + e.line);
					}
					$.confirm.hide(params.afterHide);
					return false;
				})
				.css("width", (99 / params.buttons.length) + "%");
			});
		}
		else {
			$.each(params.buttons, function(name,obj){
				buttons.eq(i++).on('click', function(){

					// Calling the action attribute when a
					// click occurs, and hiding the confirm.

					try {	// 2015.12.23 叫用外部callback用try-catch以免外部callback出錯, 影響confirm的運作
						if(params.selectItems) {	// 2016.8.4 選單模式, 回傳selectedIndex參數
							var si = $("#confirmBox #confirmItems").prop("selectedIndex");
							obj.action(si, obj.data);
						}
						else
							obj.action(obj.data);	// support extra callback data
					}
					catch(e) {
						theLogger.error(e.message + "-" + e.sourceURL + ":" + e.line);
						alert(e.message + "-" + e.sourceURL + ":" + e.line);
					}
					$.confirm.hide(params.afterHide);
					return false;
				});
			});
			// 2015.11.4 - Raymond mod, avg. width
			buttons.css("width", (99 / i) + "%");
			if(i > 2)
				$('#confirmBox').css("width", (i * 60 + 280) + "px");
		}
	}

	// 2015.11.4 - Raymond mod, add extra callback support
	$.confirm.hide = function(cbAfterHide){
		$('#confirmOverlay').fadeOut(function(){
			$(this).remove();
			
			if($.isFunction(cbAfterHide))
				cbAfterHide();
		});
	}

	// Support RD-ModuleMgr.js for dynamically loading
    if(window.theModMgr != undefined)
        window.theModMgr.install("RD-jquery.confirm.js").finish();
})(jQuery);
