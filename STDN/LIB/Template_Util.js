/*
DATE	SA		PRG		MGR_NO		DESC
1061208	Leslie	Leslie	1061103		增修僅可輸入英數欄位，可支援複製、貼上及剪下等功能鍵
1061219	Leslie	Leslie	1061205		針對Chrome的onblur→alert→focus會產生的無窮迴圈，修改原生alert與focus函式
1070817 Kevin   Zen     1070678     弱掃XSS修正
1080110	Kevin	Joe		1071199		增加影像版邏輯(FOR IFM390預覽章戳)
1080122	Kevin	Kevin	1080049		弱掃修正Client JQuery Deprecated Symbols
1080416	Leslie	Leslie	1080309		修正ComboBox文字欄位輸入非選單值時，應一併取消被選取的項目
1080520	Leslie	Leslie	1080367		公文系統的NumberOnly，無需數字以外的符號(-.)
1081203	Leslie	Leslie	--			配合整併Grneric.shtml，部分程式未顯示footStatus時，高度計算會出現誤差
1090115	Leslie	Leslie	1081155		修正升級二代後，ComboBox鍵盤事件控制時序較慢而衍生的異常(連動錯誤)
1091118	Leslie	Leslie	1080943		[搬移]由RD-soapclient搬移整段WSDL修改功能至此
1100104	Leslie	Leslie	1090722		改由共用Cookie欄位取得，以減少無謂的WebService叫用
1100504	Leslie	Leslie	1090634		新增依系統參數，決定是否啟用偵測使用者操作行為
1100505	Leslie	Leslie	1100297		新增對DataGrid中的Checkbox，實作以Shift鍵可批次點擊
1110304	David	David	1101451		調整功能鍵title設定邏輯，避免既有的title被覆蓋
1110630	Leslie	Joe		--			修正參數不一致導致artifact被誤判為undefined的問題，因TBT150有直接叫用T2100FileIoService，故暫不移除UserID
1110701 Kevin 	Kevin	1110629		顯示文字移除快捷鍵
1110818 Kevin	Kevin	1101532		新增背景主題切換
1130215 Leslie	Zen		1121085		新增寫入UserFontSet至Cookie以記錄字型大小
1130626 Kevin 	Kevin	1130291		配合AI設定Combobox關鍵字顏色
1130830 Kevin	Kevin	1130291		修正從子視窗帶回無法觸發信心顏色變換問題
1140610 Kevin	Kevin	1140166		MergeAI功能[1130291]
1141027	Leslie	Leslie	1140845		新增密碼欄位顯示功能
1141210	Leslie	Leslie	問題序407	針對帳號欄位排除
 */

//1061219	Leslie[1061205]	針對Chrome的onblur→alert→focus會產生的無窮迴圈，修改原生alert與focus函式
//增加Flag以識別當前頁面是否可執行alert()
var win_focus = true;
window.onblur = function () {
	win_focus = false;
};
window.onfocus = function () {
	if (document.hasFocus())
		win_focus = true;
};

//覆寫原生alert函式，增加判斷當前瀏覽器(與網頁)是否為作用中
(function (proxied) {
	window.alert = function () {
		if (win_focus || document.hasFocus())
			proxied.apply(this, arguments);
	};
})(window.alert);

//覆寫原生Focus函式，增加setTimeout()以延遲觸發時間
(function (proxiedFocus) {
	HTMLElement.prototype.focus = function () {
		setTimeout(function (a) {
			proxiedFocus.apply(a, arguments)
		}, 150, this);
		win_focus = true;
	};
})(HTMLElement.prototype.focus);
//1061219	Leslie[1061205]	針對Chrome的onblur→alert→focus會產生的無窮迴圈，修改原生alert與focus函式	--END--

//修正FireFox無法Focus的問題
//$.fn.focus = function () { var vid = $(this)[0].id; setTimeout(function () { $('#' + vid)[0].focus(); }, 0); }
$.fn.focus = function () {
	var argObj = this[0];
	if (argObj === undefined)
		return {};
	setTimeout(function () {
		argObj.focus();
	}, 0);
}

//1050603	Leslie	提供動態設定欄位為Number Only
function jf_SetNumOnly(argObj) {
	$(argObj).on('input', function (e) {
		if (this.value.length > 0)
			this.value = this.value.replace(/\D/g, "");
	});
}

function DlgCallBack() {
	var objParent = parent;
	while (!objParent.theForm)
		objParent = objParent.parent;
	objParent.$('#lbReturnValue')[0].length = arguments.length;
	for (var i = 0; i < arguments.length; i++)
		objParent.$('#lbReturnValue')[0].options[i].value = arguments[i];

	if (objParent.CallBack) {
		if (this.theForm)
			objParent.CallBack(this.theForm.name);
		else if (document.forms[0])
			objParent.CallBack(document.forms[0].name);
	}
}

function DlgClose() {
	var objParent = parent;
	while (!objParent.theForm)
		objParent = objParent.parent;
	objParent.$.modal.close();
}

/*用於開啟PDF、檔案下載與代替獨佔式子視窗*/
function openDlg(url, artifact, type, argWidth, argHeight) {
	/*
	 * 注意: $('#dlgASPXPage')之內容須在 jQM 的 page 之外, 否則 $dlg.trigger('create')
	 *
	 * 2013.4 - 目前div#dlgASPXPage HTML DOM內容放在mSSO.html內!
	 */
	 //1140926	Cloud for AQ 暫時使用-調整判斷
	//if (!url || url.length == 0 || !artifact || artifact.length == 0) {
	if (!url || url.length == 0) {
		alert('URL及Artifact不可為空白');
		return;
	}

	var $dlg = $("#dlgASPXPage").clone(true);

	//1080110	Joe		1071199		增加影像版邏輯
	// if (type != 'PortableDocFormat' && type != 'URL')
	if (type != 'PortableDocFormat' && type != 'URL' && type != 'IMAGE') {
		$('body').append($dlg);
		var $frame = $dlg.find('iframe.aspx_page_content');
		if ($frame.length) {
			//1060160	Leslie	配合修改檔案下載邏輯，改為判斷webfile.asmx為固定下載檔案的方式
			//if (url.toLowerCase().lastIndexOf("workpath") != -1 && url.length)
			if (url.toLowerCase().lastIndexOf("webfile.ashx") != -1 && url.length) {
				//1081219	Leslie	修正IE於下載檔案時，會跳出詢問狀態而造成window.onload不被執行，改以setTimeOut後才執行
				//$frame[0].src = url;
				setTimeout(function (elem, u) {
					elem.src = u;
				}, 500, $frame[0], url);
			}
		}
		return;
	}

	/* 按下[關閉]鍵 */
	$dlg.find('a.closeBtn').click(function () {
		$.modal.close();
	});

	//1050822	Leslie	修正Chrome取得視窗大小時，其回傳值為ViewPortSize，改用window.innerHeight、innerWidth
	//var w = $(window).width()-80,
	//	h = $(window).height()-130; // - 80px;
	var w = window.innerWidth - 80,
	h = window.innerHeight - 130;

	if (argWidth != undefined)
		w = argWidth;

	if (argHeight != undefined)
		h = argHeight;

	if (h > (w * 0.75)) //避免超出畫面
		h = h * 0.75 - 80;

	$.modal($dlg, {
		appendTo: $('body'),
		overlayCss: {
			height: h,
			width: w
		},
		//containerCss: { 'background-color' : '#ffd' },
		minWidth: w, // Leslie modify to 80
		minHeight: h
	});

	$dlg.trigger('create');

	var $frame = $dlg.find('iframe.aspx_page_content');
	if ($frame.length) {
		var urlWithParam = '';
		//1060160	Leslie	配合修改檔案下載邏輯，改為判斷webfile.asmx為固定下載檔案的方式
		//if (url.toLowerCase().lastIndexOf("workpath") != -1 && url.length)
		//1080110	Joe		1071199		增加影像版邏輯
		// if (url.toLowerCase().lastIndexOf("webfile.ashx") != -1 && url.length)
		if (url.toLowerCase().lastIndexOf("webfile.ashx") != -1 && url.length && type != 'IMAGE') {
			//$frame[0].onload = function(){$.modal.close();};
			urlWithParam = url;
			$frame[0].src = urlWithParam;
			if (artifact == '1') {
				//1080122 Kevin 1080049 弱掃修正Client JQuery Deprecated Symbols
				//$($frame[0]).load(function(){
				$($frame[0]).on('load', function (event) {
					$frame[0].contentWindow.print();
				});
			} else {
				if (type != 'PortableDocFormat') {
					//1080122 Kevin 1080049 弱掃修正Client JQuery Deprecated Symbols
					//$($frame[0]).load(function () {
					$($frame[0]).on('load', function (event) {
						$.modal.close();
					})
				}
			}
		} else if (!!artifact && artifact.length > 2 && url.length) {
			urlWithParam = url + '&SAMLart=' + artifact;
			$frame[0].src = urlWithParam;
		} else {
			$frame[0].src = url;
		}
	}
}

/*引用於JQueryUI的ComboBox*/
(function ($) {
	$.widget("custom.combobox", {
		options: {
			isDisabled: false,
			
			//1130626 Kevin 1130291 配合AI設定Combobox關鍵字顏色
			keywords: []
		},
		_create: function () {
			//1041230	Leslie	修改原JQueryUI之ComboBox，直接引用原2100ComboBox的欄位
			$('#' + $(this.element)[0].id + '_Button').remove(); //Leslie	移掉多餘的按鈕(舊的ComboBox箭頭)
			//this.wrapper = $( "<span>" )
			this.wrapper = $('#' + $(this.element)[0].id + '_Container')
				.removeAttr('class')
				.removeAttr('style')
				//1041230	Leslie	修改原JQueryUI之ComboBox，直接引用原2100ComboBox的欄位	--END--
				.addClass("custom-combobox")
				.insertAfter(this.element)
				.css('width', parseInt($(this.element)[0].style.width, 10) + 2.2 + 'em');
			this.mainCtr = $(this.element);

			this.element.hide();
			this._createAutocomplete();
			//1050401	Leslie	配合原ComboBox行為，增加傳入原選單Disable狀態
			//this._createShowAllButton();
			this.options.isDisabled = $(this.element)[0].disabled;
			this._createShowAllButton();
		},

		_createAutocomplete: function () {
			var selected = this.element.children(":selected"),
			value = selected.val() ? selected.text() : "";

			//1041230	Leslie	修改原JQueryUI之ComboBox，直接引用原2100ComboBox的欄位
			//this.input = $( "<input>" )
			this.input = $('#' + $(this.element)[0].id + '_Text')
				.removeAttr('class')
				.removeAttr('style')
				.css('width', $(this.element)[0].style.width)
				//1041230	Leslie	修改原JQueryUI之ComboBox，直接引用原2100ComboBox的欄位	--END--
				.appendTo(this.wrapper)
				//.val( value )	//1050311	Leslie	配合原ComboBox行為，取消顯示預設值(不由選取項目取得)
				.attr("title", "")
				.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
				.autocomplete({
					delay: 0,
					minLength: 0,
					source: $.proxy(this, "_source"),
					//1130626 Kevin 1130291 配合AI設定Combobox關鍵字顏色
					open: $.proxy(this, "_open"),
					close: $.proxy(this, "_close"),
				})
				.tooltip({
					tooltipClass: "ui-state-highlight"
				});
			//1090115	Leslie[1081155]	修正升級二代後，ComboBox鍵盤事件控制時序較慢而衍生的異常(連動錯誤)
			var that = this;
			var fEvent = this.input.get(0).onblur;
			if(typeof fEvent == 'function'){	//當input有註冊onblur時，將其重新註冊
				this.input.get(0).onblur  = null;
				this.input.on('blur',function(){
					fEvent.call();
				})
			}

			//1081223	Leslie	修正IE的選單會亂跳的問題
			if ('ActiveXObject' in window)
				this.input.autocomplete('widget').off('blur focus');

			this._on(this.input, {
				autocompleteselect: function (event, ui) {
					ui.item.option.selected = true;
					this._trigger("select", event, {
						item: ui.item.option
					});
				},

				autocompletechange: "_removeIfInvalid"
			});
		},

		//1050401	Leslie	配合原ComboBox行為，增加傳入原選單Disable狀態
		//_createShowAllButton: function() {
		_createShowAllButton: function () {
			var input = this.input,
			wasOpen = false;
			var mainCtr = this.mainCtr;

			var cssClassName = "custom-combobox-toggle ui-corner-right";
			if (mainCtr[0].disabled)
				cssClassName += " ui-button-disable";

			this.btn = $("<a>")
				.attr("tabIndex", -1)
				//.attr( "title", "Show All Items" )	//Leslie	用不到，拿掉
				//.tooltip()
				.appendTo(this.wrapper)
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass("ui-corner-all")
				.addClass(cssClassName) //"custom-combobox-toggle ui-corner-right" 改為 cssClassName變數
				.mousedown(function () {
					wasOpen = input.autocomplete("widget").is(":visible");
				})
				.click(function () {

					//1050401	Leslie	配合原ComboBox行為，增加傳入原選單Disable狀態
					if (mainCtr[0].disabled)
						return;
					//input.focus();	//Leslie	拿掉點擊下拉時，即Focus到欄位上的行為，避免於IPAD中自動跳出數位鍵盤
					this.focus(); //Leslie	解決IE偶爾會無法觸發onblur的問題(因為沒focus到)

					// Close if already visible
					if (wasOpen) {
						input.blur(); //Leslie	追加重覆點選下拉鈕時，收起選單
						return;
					}

					// Pass empty string as value to search for, displaying all results
					input.autocomplete("search", "");
				})
				//1081204	Leslie	配合jQuery 3.4.1，升級jQueryUI至1.2.1後，無需重覆註冊onblur事件
				/*.blur(function(){
				if(mainCtr[0].disabled)
				return;
				input.blur();
				});//Leslie	追加未選取時，點其他欄位即自動收起選單	  */
		},

		_source: function (request, response) {
			var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
			response(this.element.children("option").map(function () {
					var text = $(this).text();
					//1050401	Leslie	愚人節，把原本的空白選項騙出來
					//if ( this.value && ( !request.term || matcher.test(text) ) )
					if ((!request.term || matcher.test(text)))
						return {
							label: text,
							value: text,
							option: this
						};
				}));
		},

		//1130626 Kevin 1130291 配合AI設定Combobox關鍵字顏色
		_open: function (event, ui) {
			
			if(this.options.keywords.length==0)
				return;
			
			var keywords = this.options.keywords; // 保存 this 的引用
			$(".ui-menu-item-wrapper").each(function() {
				var item = $(this);
				keywords.forEach(function(keyword) {
					if (event.target.id === keyword.id && item.text() === keyword.word) {
						item.css("background-color", keyword.cssClass);
					}
				});
			});
		},
		
		//1130626 Kevin 1130291 配合AI設定Combobox關鍵字顏色
		_close: function (event, ui) {
				
			if(this.options.keywords.length==0)
				return;
			
			$('#'+event.target.id).css('background-color','');

			var keywords = this.options.keywords; // 保存 this 的引用
			
			keywords.forEach(function(keyword) {
					if (event.target.id === keyword.id && event.target.value === keyword.word) {
						$('#'+event.target.id).css('background-color',keyword.cssClass);
						//event.target.style.color = keyword.cssClass;
					}
				});
				
		},
		
		//1130626 Kevin 1130291 配合AI設定Combobox關鍵字顏色
		setkeywords: function (val) {
			this.options.keywords = val;
		},
		
		//1130830 Kevin 1130291 修正從子視窗帶回無法觸發信心顏色變換問題
		setTextCss: function (id) {
			
			if(this.options.keywords.length==0)
				return;
			
			$('#'+id).css('background-color','');

			var keywords = this.options.keywords; // 保存 this 的引用
			
			keywords.forEach(function(keyword) {
					if (id === keyword.id && $('#'+id).val() === keyword.word) {
						$('#'+id).css('background-color',keyword.cssClass);
						//event.target.style.color = keyword.cssClass;
					}
				});
			
		},

		_removeIfInvalid: function (event, ui) {

			// Selected an item, nothing to do
			if (ui.item) {
				//leslie	追加觸發Change事件
				this.input.change();
				return;
			}

			// Search for a match (case-insensitive)
			var value = this.input.val(),
			valueLowerCase = value.toLowerCase(),
			valid = false;
			this.element.children("option").each(function () {
				if ($(this).text().toLowerCase() === valueLowerCase) {
					this.selected = valid = true;
					return false;
				}
			});

			// Found a match, nothing to do
			if (valid) {
				return;
			}
			//1080416	Leslie[1080309]	比對不到，則清空selected
			this.element.children("option").each(function () {
				this.selected = false;
			})
			return; //Leslie	比對不到則無需理會

			// Remove invalid value
			/*this.input
			.val( "" )
			.attr( "title", value + " didn't match any item" )
			.tooltip( "open" );
			this.element.val( "" );
			this._delay(function() {
			this.input.tooltip( "close" ).attr( "title", "" );
			}, 2500 );
			this.input.autocomplete( "instance" ).term = "";*/
		},

		_destroy: function () {
			this.wrapper.remove();
			this.element.show();
		},
		setEnable: function () {
			this.mainCtr[0].disabled = false;
			//1081212	Leslie[1080339]	(補)升級jQuery，配合修正為正確寫法
			//this.input.removeAttr('disabled').css('background','white')
			//1081218	Leslie	(補)詳細檢閱jQuery說明，checked、disabled及selected，應使用.prop()設定其為true/false
			//this.input.removeProp('disabled').css('background','white')
			this.input.prop('disabled', false).css('background', 'white')
			this.btn.removeClass('ui-button-disable');
		},
		setDisable: function () {
			this.mainCtr[0].disabled = true;
			//1080905	Leslie[1080339]	升級jQuery，配合修正為正確寫法
			//this.input.attr('disabled','true').css('background','lightgrey')
			this.input.prop('disabled', true).css('background', 'lightgrey')
			this.btn.addClass('ui-button-disable');
		},
		//1081031	Leslie	增修隱藏、顯示函式
		hide: function () {
			this.wrapper.hide();
		},
		show: function () {
			this.wrapper.show();
		}
	});
})(jQuery);

//1041215	Leslie	增加PopUp處理
// (function setCousr(){
// $('.PopUp').each(function(){
// $(this).css('cursor','pointer');
// })
// })()

//1081219	Leslie	針對升級jQuery3.4.1後，document.ready事件改用Deferred()執行，會造成IE與Chrome行為不同，引起一連串異常現象，改用原生addEventListener('DOMContentLoaded')
//$(document).ready(function(){
document.addEventListener("DOMContentLoaded", function () {
	$('#lbToolTip').click(function () {
		var options = {
			direction: 'up'
		};
		$(this).toggle('slide', options, 500);
	})

	$(".PopUp").mouseover(function (e) {
		HandlePopUp(e);
	});

	$(".PopUp").click(function (e) {
		HandlePopUp(e);
	});

	$(".PopUp").mouseout(function (e) {
		$('#lbToolTip')[0].style.display = "none";
	});

	$('select.comboBox').combobox();

	//1071130	Leslie	修正所有未處理onkeypress的欄位
	$('input[onkeypress*="jf_InpNumOnly()"]').removeAttr('onkeypress').each(function () {
		if ($(this).attr('class') == undefined || $(this).attr('class').indexOf('FieldNumeric') == -1)
			$(this).addClass('AutoFieldNumeric');
	});

	// $('body').on('click',function(){
	// if($('.BannerMenu:visible').length){
	// var options = {direction: 'right'};
	// $(".BannerMenu").hide('slide',options,500);
	// }
	// });

	$('input.DatePicker').datepicker({
		showOn: "button",
		buttonImage: "../../../../../STDN/image/SEARCH_DATE.gif",
		buttonImageOnly: true,
		buttonText: "Select date",
		changeMonth: true, //1050926	Leslie	增加顯示年、月下拉選項
		changeYear: true,
		dateFormat: "Cmmdd" //1050104	Leslie	修改"jquery-ui.js"增加格式"C"，其輸出為民國年(3碼，並自動補0)
	});
	$('#dlgMessage').dialog({
		autoOpen: false,
		buttons: {
			Ok: function () {
				$(this).dialog("close");
			}
		}
	});

	var sDefaultValue = Math.floor($('body').css('font-size').replace('px', '') / 16 * 100);
	$('#nmFontZoom').val(sDefaultValue);

	var oOpener = GetSSOPage();
	try {
		if (oOpener.theSSO) {
			//1100104	Leslie[1090722]	改由共用Cookie欄位取得，以減少無謂的WebService叫用
			//var sFontSetting = fnGetUserEnvsetting('UserFontSet'); //oOpener.theSSO.User.EnvSettings['UserFontSet'];	//1050824	Leslie	theSSO取得之環境變數，為PDA專用，故改為自Server上取得
			var sFontSetting = jf_ReadCookie("UserFontSet");

			//1130215 Zen 1121085 新增寫入UserFontSet至Cookie以記錄字型大小
			let objUserFontSet = JSON.parse(localStorage.getItem("UserFontSet"));
			if (objUserFontSet != null)
				sFontSetting = objUserFontSet.UserFontSet
				
			if (sFontSetting) {
				$('#nmFontZoom').val(sFontSetting);
				$('body').css('font-size', sFontSetting + '%');
				$(window).trigger('resize');
			}
		}
	} catch (e) {}

	$("#nmFontZoom").spinner({
		spin: function (event, ui) {
			$('body').css('font-size', ui.value + '%');
			$(window).trigger('resize');
		}
	});
	$("#btSetDefault").button().click(function (event) {
		var sDefaultValue = Math.floor($('body').css('font-size').replace('px', '') / 16 * 100);
		$('#nmFontZoom').val(sDefaultValue);
		$('body').css('font-size', '');
		$(window).trigger('resize');
		fnSetUserEnvsetting("UserFontSet", "", true);
		//1100104	Leslie[1090722]	更新後回寫當前網頁的Cookie欄位
		jf_SaveCookie("UserFontSet","");
	});
	$("#btSaveFontSet").button().click(function (event) {
		fnSetUserEnvsetting("UserFontSet", $('#nmFontZoom').val(), false);
		//1100104	Leslie[1090722]	更新後回寫當前網頁的Cookie欄位
		
		//1130215 Zen 1121085 新增寫入UserFontSet至Cookie以記錄字型大小
		let objUserFontSet = { UserFontSet: $('#nmFontZoom').val()};
		localStorage.setItem("UserFontSet", JSON.stringify(objUserFontSet));

		jf_SaveCookie("UserFontSet",$('#nmFontZoom').val());
	});
	
	//1110818 Kevin 1101532 新增背景主題
	if(localStorage.webform_color=='LB')
	{
		jf_ColorSwitchClick('LB', '#DBF1FF', '#8FD5FD');
	}
	else if(localStorage.webform_color=='LW')
	{
		jf_ColorSwitchClick('LW', '#f7f9f9', '#c9f3f5'); 
	}
	else
	{
		//1120508	Leslie	若是環境中無法保留localStorage紀錄，則檢查Cookie中是否有保留
		if(jf_ReadCookie("webform_color") == 'LB')
			jf_ColorSwitchClick('LB', '#DBF1FF', '#8FD5FD');
		else
		jf_ColorSwitchClick('LW', '#f7f9f9', '#c9f3f5'); //F4FAFA fAfAfA
	}

	//1050602	Leslie	數字欄位統一改由此函式設定Event
	//1050926	Leslie	修正NumberOnly寫法(參考自網路)	--START--
	/*$("input.DatePicker,input.RequireFieldNumeric,input.InputFieldNumeric,input.KeyFieldNumeric").on("input",function(e){
	if(this.value.length > 0)
	this.value = this.value.replace(/\D/g,"");
	});
	//1050623	Leslie	ED專案專用的"ED_KeyField"、"ED_ReqField"、"ED_InpField"(僅能輸入英、數字)
	$("input.ED_KeyField,input.ED_ReqField,input.ED_InpField").on("input",function(e){
	if(this.value.length>0)
	this.value=this.value.replace(/[^a-zA-Z0-9]/g,"");
	});*/

	//1060908	Leslie	增修"僅可輸入英數"欄位處理
	$("input.KeyEnUpperField,input.InputEnUpperField,input.RequireEnUpperField,input.RequireEnOnlyUpperField,input.InputEnOnlyUpperField,input.ED_KeyField,input.ED_ReqField,input.ED_InpField").on("keydown", function (e) {
		if (e.keyCode == 229)
			return;
		console.log(e.keyCode);
		// Allow: backspace, delete, tab, escape and enter
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			//1061208	Leslie	增加可使用Ctrl-C、Ctrl-V、Ctrl-X (複製、貼上、剪下)
			//(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			((e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 86 || e.keyCode == 88) && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}

		if ((e.shiftKey || (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode != 189 && e.keyCode != 190)))
			 && (e.keyCode < 65 || e.keyCode > 90) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
	$("input.KeyEnUpperField,input.InputEnUpperField,input.RequireEnUpperField,input.RequireEnOnlyUpperField,input.InputEnOnlyUpperField,input.ED_KeyField,input.ED_ReqField,input.ED_InpField").on("input", function (e) {
		if (/[^a-zA-Z0-9\.-]/g.test(this.value))
			this.value = this.value.replace(/[^a-zA-Z0-9\.-]/g, "");
	});
	//1071130	Leslie	修正所有未處理onkeypress的欄位
	//$("input.DatePicker,input.RequireFieldNumeric,input.InputFieldNumeric,input.KeyFieldNumeric").on("keydown",function(e){
	$("input.DatePicker,input.RequireFieldNumeric,input.InputFieldNumeric,input.KeyFieldNumeric,input.AutoFieldNumeric").on("keydown", function (e) {
		//1051116	Leslie	在舊版輸入法狀態下，keyCode會一律收到229，僅能改用keyUp去過濾非數字字元，但右側數字鍵盤則可正常使用
		if (e.keyCode == 229)
			return;
		// Allow: backspace, delete, tab, escape and enter
		//1080520	Leslie[1080367]	公文系統的NumberOnly，無需數字以外的符號(-.)
		/*
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
		// Allow: Ctrl+A, Command+A
		//1061208	Leslie	增加可使用Ctrl-C、Ctrl-V、Ctrl-X (複製、貼上、剪下)
		//(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
		((e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 86 || e.keyCode == 88) && (e.ctrlKey === true || e.metaKey === true)) ||
		// Allow: home, end, left, right, down, up
		(e.keyCode >= 35 && e.keyCode <= 40)) {
		// let it happen, don't do anything
		return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode != 189 && e.keyCode != 190)))
		&& (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
		}
		// 如果使用者輸入-，先判斷現在的值有沒有-，如果有，就不允許輸入
		if (e.keyCode == 189 && /-/g.test(this.value)) {
		e.preventDefault();
		}
		// 如果使用者輸入.，先判斷現在的值有沒有.，如果有，就不允許輸入
		if (e.keyCode == 190 && /\./g.test(this.value)) {
		e.preventDefault();
		}
		 */
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 || //Delete,Backspace,Tab,Escape,Enter
			((e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 86 || e.keyCode == 88) && (e.ctrlKey === true || e.metaKey === true)) || //Ctrl-A、Ctrl-C、Ctrl-V、Ctrl-X(或Command鍵 for IOS)
			(e.keyCode >= 35 && e.keyCode <= 40) || // Allow: home, end, left, right, down, up
			(e.keyCode >= 48 && e.keyCode <= 57) || //中央鍵區數字鍵
			(e.keyCode >= 96 && e.keyCode <= 105) //右側鍵區數字鍵
		) {
			// let it happen, don't do anything
			return;
		} else
			e.preventDefault();
		//1080520	Leslie[1080367]	公文系統的NumberOnly，無需數字以外的符號(-.)	--END--
	});

	//1071130	Leslie	修正所有未處理onkeypress的欄位
	//$('input.DatePicker,input.RequireFieldNumeric,input.InputFieldNumeric,input.KeyFieldNumeric').keyup(function () {
	$('input.DatePicker,input.RequireFieldNumeric,input.InputFieldNumeric,input.KeyFieldNumeric,input.AutoFieldNumeric').keyup(function () {
		//1080520	Leslie[1080367]	公文系統的NumberOnly，無需數字以外的符號(-.)
		/*if (/[^0-9\.-]/g.test(this.value)) {
		this.value = this.value.replace(/[^0-9\.-]/g, '');
		}

		if (/-/g.test(this.value) && !/^-/g.test(this.value)) {
		this.value = this.value.replace(/-/g, '');
		}*/
		if (/[^0-9]/g.test(this.value)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
		//1080520	Leslie[1080367]	公文系統的NumberOnly，無需數字以外的符號(-.)	--END--
	});
	//1050926	Leslie	修正NumberOnly寫法(參考自網路)	--END--
	$('.GridDiv').each(function () {
		if (!$(this).attr('data-fixed')) {
			$(this).attr('data-oldHeight', $(this).height());
			var oldHeight = $(this).height();
			//1081203	Leslie	配合整併Grneric.shtml，部分程式未顯示footStatus時，高度計算會出現誤差
			//var newHeight = window.innerHeight-$(this).offset().top-$('.footStatus').height()-70;
			var newHeight = window.innerHeight - $(this).offset().top - ($('.footStatus').height() | 0) - 70;
			if (oldHeight < newHeight)
				$(this).height(newHeight);
		}
	});
	$('table[id$="head"]').remove();
	$('table[id^="dg"]:not(table[id$="head"])').each(function () {
		InitFixHead(this)
	});

	//1050930	Leslie	增加共通功能鍵的快捷鍵設定
	$('#tbTool input[type=submit]').each(function () {
		var sName = $(this).val();
		var sKey = "";
		switch (sName) {
		case "開啟":
			sKey = "M";
			break;
		case "儲存":
			sKey = "S";
			break;
		case "清除":
		case "取消":
			sKey = "Z";
			break;
		case "刪除":
			sKey = "D";
			break;
		case "查詢":
		case "搜尋":
		case "搜索":
			sKey = "Q";
			break;
		case "預覽":
			sKey = "P";
			break;
		}
		//1110701 Kevin 1110629 顯示文字移除快捷鍵
		$(this).val(sName.split('(')[0]);
		if (sKey != '')
			//1110701 Kevin 1110629 顯示文字移除快捷鍵
			//$(this).val(sName + '(' + sKey + ')').attr('accesskey', sKey).attr('title', sName + '(ALT+' + sKey + ')');
			$(this).attr('accesskey', sKey).attr('title', sName + '(ALT+' + sKey + ')');
	});
	
	//1100126	Leslie[1090927]	統一依作業系統環境，設定快捷鍵的提示文字
	var userAgent = window.navigator.userAgent.toLowerCase();
	var isMacOS = userAgent.indexOf("mac os") >= 0;
	var isFireFox = userAgent.indexOf("firefox") >= 0;
	var macFireFoxCantUseKey = [73,78,85];	//已知MacOS中的FireFox，這幾個快捷鍵無效
	var strAccessKey = "ALT + ";
	if(isMacOS){
		if(isFireFox){
			strAccessKey = "CTRL + OPTION + ";
			$('body').on("keydown",function(e){
				if ($.inArray(e.keyCode, macFireFoxCantUseKey) !== -1){
					if(e.ctrlKey && e.altKey){
						$('[accesskey='+e.originalEvent.code.replace('Key','')+']:visible').click();
					}
				}					
			})
		}
		else
			strAccessKey = "CTRL + SHIFT + OPTION + ";
	}
	else{
		if(isFireFox)
			strAccessKey = "SHIFT + ALT + ";
	}

	$('[accesskey]').each(function(i,o){
		let $key = $(o);
		let accesskey = $key.attr('accesskey');
		//1110304 David 1101451 調整功能鍵title設定邏輯，避免既有的title被覆蓋
		//$key.attr('title',$key.val().replace(accesskey,strAccessKey+accesskey))
		let OriTitle = $key.attr('title');
		//1110701 Kevin 1110629 顯示文字移除快捷鍵
		if(OriTitle)
			$key.attr('title',OriTitle.replace("ALT + "+accesskey,strAccessKey+accesskey));
		//if(OriTitle != undefined && OriTitle != "" && OriTitle.indexOf(accesskey) == -1)
		//	$key.attr('title',OriTitle + "(" + strAccessKey+accesskey + ")");
		//else
		//	$key.attr('title',$key.val().replace(accesskey,strAccessKey+accesskey));
	})
	//1100126	Leslie[1090927]	統一依作業系統環境，設定快捷鍵的提示文字	==END==
	

	//1051013	Leslie	解決二代於行動平台上，activeElement不支援按鈕，造成ClientButtonControl行為異常之問題
	$(':submit:not(#tbTool>input),input[type=image]').on('click', function (e) {
		ClientButtonControl(e);
		e.preventDefault();
	})
	
	//1100504	Leslie[1090634]	新增依系統參數，決定是否啟用偵測使用者操作行為
	var mpMonitorActiveTimeout = localStorage['MP_MONITOR_ACTIVE_TIMEOUT'];
	if( mpMonitorActiveTimeout != undefined && mpMonitorActiveTimeout != '' && parseInt(mpMonitorActiveTimeout) > 0){
		$(document).on('mouseover keyup touchend',function(event){
			let newActive = Date.now();
			if('MP_LASTACTIVE_TIME' in localStorage){
				let lastActive = parseInt(localStorage["MP_LASTACTIVE_TIME"]);
				let passSecond = (newActive - lastActive) / 1000;
				if(passSecond >= parseInt(mpMonitorActiveTimeout)){
					//已超過偵測上限
					jf_CloseSelf('網頁因未異動已超過所設定之閒置時間，因應資安考量，故己將系統登出，如須繼續使用重新登入系統');
					return;
				}
			}
			localStorage["MP_LASTACTIVE_TIME"] = newActive;
		})
	}
	
	//1100505	Leslie[1100297]	新增對DataGrid中的Checkbox，實作以Shift鍵可批次點擊
	var lastCheckID = '';
	$('table[id^="dg"]:not(table[id$="head"]) :checkbox').on('click',function(e){
		if(e.shiftKey){
			if(lastCheckID != ''){
				let lastIdArr = lastCheckID.split('_');
				let currIdArr = this.id.split('_');
				if(lastIdArr.length == currIdArr.length && currIdArr.length == 4 && lastIdArr[0] == currIdArr[0] && lastIdArr[3] == currIdArr[3]){
					let checked = this.checked;
					let idx1 = parseInt(lastIdArr[2].replace('ctl',''))
					let idx2 = parseInt(currIdArr[2].replace('ctl',''))
					let idxStart = (idx1 < idx2)?idx1:idx2;
					let idxEnd = (idx1 > idx2)?idx1:idx2;
					$(this).closest('table').find(':checkbox[id$="'+currIdArr[3]+'"]').each(function(idx,obj){
						let idxCurr = parseInt(obj.id.split('_')[2].replace('ctl',''))
						if(idxCurr >= idxStart && idxCurr <= idxEnd)
							$(this).prop('checked',checked);
					})
				}
			}
		}
		lastCheckID = this.id;
	})

	//1141027	Leslie[1140845]	新增密碼欄位顯示功能
	//1141210	Leslie[問題彙整表 序407]	針對帳號欄位排除
	// $('[type="password"]:visible').each(function(i,o){
	$('[type="password"]:visible:not([id*="Account"])').each(function(i,o){
		var $pwdParent = $(o).parent().css('position','relative');	//設定上層定位為相對模弍
		var $pwd = $(o);
		$('<div class="eye showPW"></div>')
		.css('left',`calc(${$pwd.width()}px - 1em)`)
		.on('click',function(e){
			let pw = $pwd.get(0);
			const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
			pw.setAttribute('type', type);
			
			e.target.classList.toggle("hidePW");
			e.target.classList.toggle("showPW");
		})
		.appendTo($pwdParent);
	})
});

$(window).resize(function () {
	$('.GridDiv').each(function () {
		if (!$(this).attr('data-fixed')) {
			var oldHeight = $(this).attr('data-oldHeight');
			//1081203	Leslie	配合整併Grneric.shtml，部分程式未顯示footStatus時，高度計算會出現誤差
			//var newHeight = window.innerHeight-$(this).offset().top-$('.footStatus').height()-40;
			var newHeight = window.innerHeight - $(this).offset().top - ($('.footStatus').height() | 0) - 40;
			if (oldHeight < newHeight)
				$(this).height(newHeight);
			else
				$(this).height(oldHeight);
		}
	});
	$('table[id$="head"]').remove();
	$('table[id^="dg"]:not(table[id$="head"])').each(function () {
		InitFixHead(this)
	});

	//1071119	Leslie[1070975]	iFrame連動調整大小
	$('.dvFrame').each(function () {
		if ($(this).attr('data-WidthBy')) {
			var wByWidth = $(this).attr('data-WidthBy');
			if ($(wByWidth))
				$(this).width($(wByWidth).width());
		}
		if ($(this).attr('data-FontPercent')) {
			var percent = $(this).attr('data-FontPercent');
			var domFrame = $(this).find('iframe')[0];
			var fSize = $('body').css('font-size').replace('px', '');
			$(domFrame.contentDocument.body).css('font-size', fSize * percent);
		}
	})

	var oOpener = GetSSOPage();
	try {
		if (oOpener.theSSO) {
			if (!oOpener.theSSO.User.EnvSettings['UserFontSet']) {
				var sDefaultValue = Math.floor($('body').css('font-size').replace('px', '') / 16 * 100);
				$('#nmFontZoom').val(sDefaultValue);
			}
		}
	} catch (e) {}
});

function GetSSOPage() {
	var oOpener = opener ? opener : parent;
	try {
		var i = 0;
		if (!oOpener)
			return window;
		while (oOpener.theSSO == undefined && i++ < 5)
			oOpener = oOpener.opener ? oOpener.opener : oOpener.parent;
	} catch (e) {}

	return oOpener;
}

function fnGetUserEnvsetting(argPara) {
	var sArtifact = localStorage["Artifact"];
	var oOpener = GetSSOPage();
	if (!oOpener.theSSO) {
		return;
	}

	var rtnEnvsetting = oOpener.theWebServices.QueryDoc.GetUserEnvSetting(sArtifact, argPara).RtnStr;

	return rtnEnvsetting;
}

function fnSetUserEnvsetting(argPara, argValue, argRemove) {
	var sArtifact = localStorage["Artifact"];
	var oOpener = GetSSOPage();
	if (!oOpener.theSSO) {
		return;
	}
	var params = new SOAPClientParameters(),
	res;
	params.add('argArtifact', sArtifact);
	params.add('argEnvName', argPara);
	params.add('argEnvValue', argValue);
	params.add('argRemove', argRemove);

	var wsUrl = oOpener.theWebServices.url("authws");
	var wsFuncName = "UpdateUserEnvSet";

	SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
		function (rslt) {

		if (typeof rslt === 'object') {
			res = rslt.value;
		} else {
			alert('叫用 AuthWS.' + wsFuncName + ' 時發生錯誤!');
			res.m_strErrMsg = '叫用 AuthWS.' + wsFuncName + ' 時發生錯誤!';
		}
	});
	if (res.m_bSuccess) {
		oOpener.theSSO.User.EnvSettings[argPara] = argValue;
		if (argRemove)
			oOpener.theSSO.User.EnvSettings[argPara] = undefined;
	} else {
		alert("更新使用者設定時發生異常，異常訊息：" + res.m_strErrMsg);
	}
}

function InitFixHead(argDg) {
	//1051201	Leslie	加上參控制參數
	if ($(argDg).hasClass('disableHeadFix'))
		return;
	//複製一個頭
	//1050727	Leslie	部分屬性移至Class裡設定
	// var objhead =  $(argDg).clone().attr('id',argDg.id+'head').css('position','absolute').css('z-index','1').css('width','').css('background-color','#5f9cc5').addClass('dghead');
	var objhead = $(argDg).clone().attr('id', argDg.id + 'head').css('width', '').addClass('dghead');
	objhead.find('tr:not(:first)').remove();

	if (objhead.find('input,select').length > 0) //表示第一列裡有控制項，不是單純標題列
		return;

	var _td = objhead.find('td')
		for (var i = 0; i < _td.length; i++) {
			var idx = i + 1;
			//取得指定目標的指定CSS(最終屬性)
			$(_td[i]).css('width', window.getComputedStyle($('#' + argDg.id + ' td:nth-child(' + idx + ')')[0], null).getPropertyValue('width'));
		}

		objhead.insertBefore($(argDg));
}

function HandlePopUp(e) {
	$('#lbToolTip')[0].style.display = "none";
	element = e.target;

	if (element.value != null) {
		if (element.tagName.toUpperCase() == "SELECT") {
			if (element.selectedIndex != -1)
				Msg = element.options[element.selectedIndex].text;
		} else
			Msg = element.value;
	} else {
		Msg = element.innerHTML;
	}
	if (jf_Trim(Msg) == "")
		return;

	ShowPopUp(element.ownerDocument.all["lbToolTip"], Msg);
}

function ShowPopUp(Obj, argMessage) {
	//1070817 Zen 1070678 弱掃XSS修正
	//Obj.innerHTML = ReplaceSpecialChar(argMessage);
	Obj.innerHTML = HtmlEncode(ReplaceSpecialChar(argMessage));
	//1080731	Leslie[1080614]	調整PopUp位置，先顯示後才能抓到顯示的大小(取消註解)
	Obj.style.display = "";
	Obj.style.width = parseInt(element.offsetWidth) - 10 + "px";
	Obj.style.pisition = "absolute";
	var arrPosition = GetElementScreenPos(element);
	if ((arrPosition[0] + parseInt(element.offsetHeight)) > parseInt(screen.height))
		//1080731	Leslie[1080614]	調整PopUp位置，改抓取顯示區的高度，用以計算位置
		//Obj.style.top = arrPosition[0] - (parseInt(element.offsetHeight) + 16)+"px";
		Obj.style.top = arrPosition[0] - (parseInt(Obj.offsetHeight) + 8) + "px";
	else
		Obj.style.top = arrPosition[0] + parseInt(element.offsetHeight) + 8 + "px";
	Obj.style.left = arrPosition[1] + 10 + "px";
	//1080731	Leslie[1080614]	調整PopUp位置，先顯示後才能抓到顯示的大小
	//Obj.style.display = "";
	//var options = {direction: 'up'};
	//$(Obj).toggle('slide',options,500);
}

function GetElementScreenPos() {
	var HasDiv = false;
	var ElementScreenPos = new Array();
	ElementScreenPos[0] = 0;
	ElementScreenPos[1] = 0;
	var ElementPos = GetObjPosition(element);
	pScrollTop = 0;
	pScrollLeft = 0;
	var Obj = element;
	while ((Obj.tagName.toUpperCase() != "BODY" && Obj != null)) {
		if (Obj.tagName.toUpperCase() == "DIV") {
			if (Obj.style.overflow != "" || $(Obj).css('overflow') != 'visible') {
				HasDiv = true;
				pScrollTop = parseInt(Obj.scrollTop);
				pScrollLeft = parseInt(Obj.scrollLeft);
				break;
			}
		}
		if (Obj.parentElement != null)
			Obj = Obj.parentElement;
		else
			break;
	}

	if (HasDiv) {
		ElementScreenPos[0] = ElementPos[0] - pScrollTop;
		ElementScreenPos[1] = ElementPos[1] - pScrollLeft;
	} else {
		ElementScreenPos[0] = ElementPos[0];
		ElementScreenPos[1] = ElementPos[1];
	}

	return ElementScreenPos;
}

function GetObjPosition(Obj) {
	var arrPosition = new Array();
	arrPosition[0] = 0; // Top
	arrPosition[1] = 0; // Left

	if (Obj.style.position.toLowerCase() == "absolute") {
		arrPosition[0] = parseInt(Obj.style.top);
		arrPosition[1] = parseInt(Obj.style.left);
	} else if (Obj.tagName.toUpperCase() == "BODY" || Obj.offsetParent == null) {
		arrPosition[0] = parseInt(Obj.offsetTop);
		arrPosition[1] = parseInt(Obj.offsetLeft);
	} else {
		var arrParentPosition = GetObjPosition(Obj.offsetParent);
		arrPosition[0] = arrParentPosition[0] + parseInt(Obj.offsetTop);
		arrPosition[1] = arrParentPosition[1] + parseInt(Obj.offsetLeft);
	}
	return arrPosition;
}

function ReplaceSpecialChar(inpString) {
	var outString = inpString;
	while (outString.indexOf("\n") != -1) {
		outString = outString.replace("\n", "<br>");
	}
	return outString;
}
//1041215	Leslie	PopUp處理區-END-


/*新版共用函式區*/

//關閉目前使用視窗
function jf_CloseSelf(alertMsg) {
	if (alertMsg != undefined && alertMsg != '')
		alert(alertMsg);
	// if(parent.$('#dlgASPXPage')){
	// parent.$('#dlgASPXPage').find('a.closeBtn').click();
	// return;
	// }
	open(location, '_self').close();
}

//WebFileIO共用式

//1.

function WebFileIO(url, artifact) {
	if (FileReader.prototype.readAsBinaryString === undefined) {
		FileReader.prototype.readAsBinaryString = function (fileData) {
			var binary = "";
			var pt = this;
			var reader = new FileReader();
			reader.onload = function (e) {
				var bytes = new Uint8Array(reader.result);
				var length = bytes.byteLength;
				for (var i = 0; i < length; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				//pt.result  - readonly so assign content to another property
				pt.content = binary;
				$(pt).trigger('onload');
			}
			reader.readAsArrayBuffer(fileData);
		}
	}

	var _hasError,
	_ErrorMessage;
	var _rtnError,
	_ErrorMsgArr,
	_ErrFileName;
	var _UploadCnt;
	//1110630	Joe		--		修正參數不一致導致artifact被誤判為undefined的問題，因TBT150有直接叫用T2100FileIoService，故暫不移除UserID
	// var _WebFileIO = new T2100FileIoService(url, artifact);
	var _WebFileIO = new T2100FileIoService(url, "", artifact);
	var _callBackFun;
	var _RtnObj = {
		hasError: false,
		ErrorMessage: ""
	};

	function _DoUpload(Path, argFileData) {
		var reader = new FileReader();

		reader.onload = function (f) {
			_WebFileIO.upload(Path, argFileData.name, (this.result) ? this.result : this.content, {
				success: function () {
					_rtnError.push(false);
				},
				error: function (errorText) {
					_rtnError.push(true);
					_ErrorMsgArr.push(errorText);
					_ErrFileName.push(argFileData.name);
				},
				async: false
			});
			_SetRtnMsg();
		}
		reader.readAsBinaryString(argFileData);
	}

	function _SetRtnMsg() {
		if (_rtnError.length < _UploadCnt)
			return;

		var newLine = '';

		for (var i in _rtnError) {
			if (_rtnError[i] == true) {
				_hasError = true;
				_ErrorMessage += newLine + '上傳[' + _ErrFileName[i] + ']發生異常：' + _ErrorMsgArr[i];
				newLine = '\n';
			}
		}
		var strMsg = "";

		_RtnObj.hasError = _hasError;
		_RtnObj.ErrorMessage = _ErrorMessage;

		if (_callBackFun)
			_callBackFun(_RtnObj);
	}

	return {
		upload: function (UpLoadPath, argFileList, callBackFun) {

			if (!argFileList || argFileList.length == 0) {
				_rtnError = [true];
				_ErrorMsgArr = ["無法處理空的上傳檔案清單"];
				_SetRtnMsg(1);
			}

			_callBackFun = callBackFun; //紀錄CallBack Function

			var iFileIdx = 0;
			_UploadCnt = argFileList.length;
			var _fileData,
			_FileName;

			//重置錯誤紀錄與回傳值
			_rtnError = new Array();
			_ErrorMsgArr = new Array();
			_ErrFileName = new Array();
			_hasError = false,
			_ErrorMessage = "";

			for (; iFileIdx < _UploadCnt; iFileIdx++) {
				_fileData = argFileList[iFileIdx];
				_DoUpload(UpLoadPath, _fileData);
			}
		}
	}
}

function SOAPviaDIME() {

	function parseRetrieveFile(fileName, view, len) {
		var dot = fileName.lastIndexOf(".");
		console.log("'" + fileName + "'(dot:" + dot + ")");
		var ext = (dot >= 0) ? fileName.substr(dot) : fileName.substr(fileName.length - 4);
		console.log("ext: '" + ext + "'");
		var curr = view.tell(),
		i;
		if (ext.match(/.tif/i)) {
			var a = (typeof Uint8Array !== "undefined") ? new Uint8Array(len) : new Array(len);
			for (i = 0; i < len; i++)
				a[i] = view.buffer.charCodeAt(curr + i);
			return "data:image/tif;base64," + Base64.encode(a);
		} else if (ext.match(/.png/i)) {
			var a = (typeof Uint8Array !== "undefined") ? new Uint8Array(len) : new Array(len);
			for (i = 0; i < len; i++)
				a[i] = view.buffer.charCodeAt(curr + i);
			return "data:image/png;base64," + Base64.encode(a);
		} else if (ext.match(/.jpg/i)) {
			var a = (typeof Uint8Array !== "undefined") ? new Uint8Array(len) : new Array(len);
			for (i = 0; i < len; i++)
				a[i] = view.buffer.charCodeAt(curr + i);
			return "data:image/jpg;base64," + Base64.encode(a);
		} else if (ext.match(/.bmp/i)) {
			var a = (typeof Uint8Array !== "undefined") ? new Uint8Array(len) : new Array(len);
			for (i = 0; i < len; i++)
				a[i] = view.buffer.charCodeAt(curr + i);
			return "data:image/bmp;base64," + Base64.encode(a);
		} else if (ext.match(/\.(x[ms]l|txt)/i)) {
			var data_s = "",
			deBOM = false,
			bom = 0;
			for (i = 0; i < len; i++) {
				var c = view.getUint8();
				if (!deBOM) {
					if (c == 0xff || c == 0xfe) {
						bom = (c << 8) + view.getUint8();
						++i;
						deBOM = true;
						continue;
					} else if (c == 0xef) {
						var c2 = view.getUint8()
							c3 = view.getUint8(),
						bom = (c << 16) + (c2 << 8) + c3;
						if (bom == 0xefbbbf) {
							i += 2;
							deBOM = true;
							continue;
						} else {
							view.seek(1);
							deBOM = true;
						}
					} else {
						// 偵測是不是無BOM的UTF-8
						if (String.fromCharCode(c) == "<") {
							var str = "";
							for (var j = 0; ; j++) {
								var c2 = view.buffer.charCodeAt(curr + j);
								str += String.fromCharCode(c2);
								if (String.fromCharCode(c2) == ">")
									break;
							}
							//console.log(str);
							if (str.search(/encoding=/) > 0) {
								/encoding=["']([a-zA-Z0-9\-]*)["']/.exec(str);
								//console.log("encoding='" + RegExp.$1 + "'");
								if (typeof RegExp.$1 === "string" && RegExp.$1.match(/utf-8/i)) {
									console.log("此檔案為UTF-8 w/o BOM");
									bom = 0xefbbbf;
								}
							} else { // 2013.12 - Raymond, 未宣告encoding屬性之XML一律以UTF-8視之
								console.log("此檔案未宣告encoding屬性,以UTF-8編碼處理");
								bom = 0xefbbbf;
							}
						}
						deBOM = true;
					}
				}
				if (deBOM) {
					if (bom == 0xfffe) { // UTF-16 LE
						data_s += String.fromCharCode((view.getUint8() << 8) + c);
						++i;
					} else if (bom == 0xfeff) { // UTF-16 BE
						data_s += String.fromCharCode((c << 8) + view.getUint8());
						++i;
					} else if (bom == 0xefbbbf) { // UTF-8
						if (c < 128) {
							data_s += String.fromCharCode(c);
						} else if ((c > 191) && (c < 224)) {
							var c2 = view.getUint8();
							data_s += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
							++i;
						} else {
							var c2 = view.getUint8();
							var c3 = view.getUint8();
							data_s += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
							i += 2;
						}
					} else
						data_s += String.fromCharCode(c);
				}
			}
			view.seek(curr); // 回復原位
			if (ext.match(/\.x[ms]l/i))
				return (new DOMParser()).parseFromString(data_s, "text/xml");
			else // .txt
				//console.log(data_s);
				return data_s;
		} else { // 未知的副檔名
			var a = (typeof Uint8Array !== "undefined") ? new Uint8Array(len) : new Array(len);
			for (i = 0; i < len; i++)
				a[i] = view.buffer.charCodeAt(curr + i);
			if (typeof Blob !== "undefined")
				return new Blob(a);
			else
				return a;
		}
	}

	function parseDIME(data, method, options) {
		var view = new jDataView(data, 0, undefined, false);
		console.log("parsing DIME... (byteLength:" + view.byteLength + ")");
		var res = new Array(),
		idx = 0,
		len = view.byteLength,
		fil,
		h0,
		h1,
		s1,
		s2,
		s3,
		s0p,
		s1p,
		s2p,
		s3p,
		opt_s,
		id_s,
		type_s;
		//view.seek(0);
		while (view.tell() < len) {
			console.log("DIME" + (++idx) + ": (" + view.tell() + "/" + len + ")");
			h0 = view.getUint8();
			h1 = view.getUint8() / 16;
			s0 = view.getUint16();
			s1 = view.getUint16();
			s2 = view.getUint16();
			s3 = view.getUint32();
			s0p = s0 + ((s0 % 4) ? (4 - (s0 % 4)) : 0);
			s1p = s1 + ((s1 % 4) ? (4 - (s1 % 4)) : 0);
			s2p = s2 + ((s2 % 4) ? (4 - (s2 % 4)) : 0);
			s3p = s3 + ((s3 % 4) ? (4 - (s3 % 4)) : 0);
			console.log("\th0:" + h0 + ", h1:" + h1 + "(" + ((h1 == 2) ? "URL" : ((h1 == 1) ? "MIME Type" : "Unknown")) + ")\r\n\
				\topt_len:" + s0 + "(" + s0p + ")\r\n\
				\tid_len:" + s1 + "(" + s1p + ")\r\n\
				\ttype_len:" + s2 + "(" + s2p + ")\r\n\
				\tdata_len:" + s3 + "(" + s3p + ")");
			opt_s = view.getString(s0);
			console.log("\topt: " + opt_s);
			if (s0 != s0p)
				view.seek(view.tell() + 4 - (s0 % 4)); // padding
			id_s = view.getString(s1);
			console.log("\tid: " + id_s + " (" + Utf7.decode(id_s) + ")");
			if (s1 != s1p)
				view.seek(view.tell() + 4 - (s1 % 4)); // padding
			type_s = view.getString(s2);
			console.log("\ttype: " + type_s);
			if (s2 != s2p)
				view.seek(view.tell() + 4 - (s2 % 4)); // padding
			if (h1 == 2) { // SOAP Response (XML格式)
				var data_s = view.getString(s3);

				var soapMsg = (new DOMParser()).parseFromString(data_s, "text/xml");
				console.log(soapMsg);
				var r = soapMsg.getElementsByTagName(method + "Result");
				if (r.length != 1) {
					console.log("找不到<" + method + "Result>, 可能不是合法的SOAP Message!");
					if (options && options.error)
						options.error("找不到<" + method + "Result>, 可能不是合法的SOAP Message");
					else
						break;
				}
				if (options && options.onSoapMsg) {
					var f = options.onSoapMsg(r[0], soapMsg, id_s);
					if (f === false) {
						console.log("onSoapMsg() returns false, break while-loop!");
						break;
					}
				} else if (id_s.length)
					res[id_s] = soapMsg;
				else
					res.push(soapMsg);

				if (s3 != s3p)
					view.seek(view.tell() + 4 - (s3 % 4));
			} else if (h1 == 1) { // 下載的檔案 (Binary格式)
				if (options && options.getFileName) { // 由client提供檔名
					var fn = options.getFileName(idx - 2); // 解析SoapMsg時, idx是1, 第1個File時, idx是2
					if (fn === false) {
						console.log("getFileName(" + (idx - 2) + ") returns false, break while-loop!");
						break;
					}
					fil = parseRetrieveFile(fn, view, s3);
					if (options && options.onRetrieveFile)
						options.onRetrieveFile(fil, fn);
					else
						res[fn] = fil;
				} else if (id_s.length) { // 由DIME ID決定檔名
					fil = parseRetrieveFile(id_s, view, s3);
					if (options && options.onRetrieveFile)
						options.onRetrieveFile(fil, id_s);
					else
						res[id_s] = fil;
				} else { // 未命名檔案(無DIME ID)
					var a = (typeof Uint8Array !== "undefined") ? new Uint8Array(s3) : new Array(s3);
					for (var i = 0; i < s3; i++)
						a[i] = view.buffer.charCodeAt(curr + i);
					fil = (typeof Blob !== "undefined") ? new Blob(a) : a;
					if (options && options.onRetrieveFile)
						options.onRetrieveFile(fil);
					else
						res.push(fil);
				}
				view.seek(view.tell() + s3p);
			} else {
				console.log("\t無法解析未知的DIME格式!");
				if (options && options.error)
					options.error("無法解析未知的DIME格式(" + h1 + ")");
				if (view.tell() + s3p >= len)
					options.error("位移量(" + s3p + ")超出資料長度");
				else
					view.seek(view.tell() + s3p);
			}
		} // end of while-loop
		if (options && options.success)
			options.success(fil, res);
	}

	this.invoke = function (url, method, options) {
		console.log("SOAPviaDIME.invoke(url:'" + url + "', method:'" + method + ", options:" + [options]);
		//var xmlParams = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><' + method + ' xmlns="http://tempuri.org"></' + method + '></soap:Body></soap:Envelope>', 'text/xml');
		var ns = (options && options.getNameSpace) ? options.getNameSpace() : 'http://tempuri.org/';
		var xmlParams = '<?xml version="1.0" encoding="utf-8"?>' +
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
			'<soap:Body>' +
			'<' + method + ' xmlns="' + ns + '">';
		if (options && options.getParams)
			xmlParams += options.getParams();
		xmlParams += '</' + method + '>' +
		'</soap:Body>' +
		'</soap:Envelope>';
		console.log("params:");
		console.log(xmlParams);

		var t0 = new Date(),
		that = this;
		$.ajax(url, {
			type: "POST",
			data: xmlParams,
			dataType: "text",
			async: (options.async === false) ? false : true,
			headers: {
				"Content-Type": "text/xml; charset=utf-8",
				"SOAPAction": '"' + ns + ((ns[ns.length - 1] != '/') ? '/' : '') + method + '"'
			},
			beforeSend: function (jqXHR, settings) {
				//settings.crossDomain = true;
				console.log(settings);
				//jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
				jqXHR.overrideMimeType('application/dime; charset=x-user-defined');
			},
			success: function (data, statusText, jqXHR) {
				console.log("success! " + (new Date() - t0) + "ms elapsed");
				t0 = new Date();
				console.log(jqXHR.getAllResponseHeaders());

				function parseError(data, utf8encoded) {
					var err = (new DOMParser()).parseFromString((utf8encoded) ? that.utf8.decode(data) : data, "text/xml");
					console.log(err);
					err = err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
					err = {
						errIdx: err.childNodes[0].textContent,
						errNo: err.childNodes[1].textContent,
						errMsg: err.childNodes[2].textContent
					}
					return err;
				}

				var cntnType = jqXHR.getResponseHeader("Content-Type");
				if (cntnType.match(/^text\/xml/)) {
					if (cntnType.search(/charset=/) > 0) {
						/charset=([a-zA-Z0-9\-]*)/.exec(cntnType);
						console.log(RegExp.$1);
						var err = parseError(data, RegExp.$1 == "utf-8");
						if (options && options.error)
							options.error(err.errNo + ": " + err.errMsg);
					} else {
						console.log(data);
						if (options && options.error)
							options.error(data);
					}
				} else if (cntnType.match(/application\/dime/)) {
					if (data.match(/^<\?xml /)) { // 2013/5/17 - Raymond, WebFileIO回應錯誤時, Chrome接到的Content-Type仍是"application\dime", 故需要先判斷是不是XML, 是的話, 表示是錯誤資訊, 而不是DIME格式
						if (data.search(/encoding=/) > 0) {
							/encoding=['"]([a-zA-Z0-9\-]*)['"]/.exec(data);
							console.log(RegExp.$1);
							var err = parseError(data, RegExp.$1 == "utf-8");
							if (options && options.error)
								options.error(err.errNo + ": " + err.errMsg);
						} else {
							console.log(data);
							if (options && options.error)
								options.error(data);
						}
					} else {
						parseDIME(data, method, options);
						console.log("finish parsing dime! " + (new Date() - t0) + "ms elapsed");
					}
				} else {
					console.log("不支援無法識別的Content-Type: '" + cntnType + "', data:");
					console.log(data);
					if (options && options.error)
						options.error("不支援無法識別的Content-Type: '" + cntnType + "'");
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log("error! " + textStatus + ", " + errorThrown);
				if (options && options.error)
					options.error(textStatus);
			}
		});
	}

	this.utf8 = {
		encode: function (string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for (var n = 0, k = string.length; n < k; n++) {
				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		decode: function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}
}

//1060526	Leslie	配合TB需求，整個更新WebFileIO底層介面
/*function T2100FileIoService(url, artifact) {
// 2015.3.16 - 因應檔案伺服器可能與AP不同一台, 恢復直接以傳入的URL當作連線網址
var _url = url;//.replace(/^http[s]*:\/\/[a-zA-Z0-9\.]*\//, theWebServices.host + "/");  // [暫時]強制轉為deva的IP, 以避免iPad找不到, 正式版應移除
//alert(_url);
//var _userId = (userId != undefined)?userId:theUserInfo.UserID;
var _artifact = (artifact != undefined)?artifact:theUserInfo.Artifact;
var Utf7 = new Utf7Encoding();

var _base = this;

return {
download: function(filePath, fileName, options) {
console.log("download(" + filePath + ", " + fileName + ")");
_base.invoke(_url, "WebFileIO", $.extend({
getNameSpace: function() {
return "http://2100T.com.tw";
},
getParams: function() {
return '<argArtifact>' + _artifact + '</argArtifact>' +
'<argType>2</argType>' +
'<argFileCollection><argFile>' +
'<FilePath>' + Utf7.encode(filePath) + '</FilePath>' +
'<FileName>' + Utf7.encode(fileName) + '</FileName>' +
'</argFile></argFileCollection>' +
'<argDeleteSource>0</argDeleteSource>';
},
//onSoapMsg: function(res, xml, id) {},
//onRetrieveFile: function(fil, fn) {},
success: function(fil, all) {
if(options.success)
options.success(fil, all);
},
error: function(errorText) {
console.log(errorText);
if(options.error)	// 2015.6.10 修正下載失敗不會呼叫callback
options.error(errorText);
else
alert(errorText);
}
}, options));
},
upload: function(filePath, fileName, data, options) {
console.log("upload(" + filePath + ", " + fileName + ")");
var opts = $.extend({async: true}, options);
var dfd = $.Deferred();
var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
'<soap:Body>' +
'<WebFileIO xmlns="http://2100T.com.tw">' +
'<argArtifact>' + _artifact + '</argArtifact>' +
'<argType>1</argType>' +
'<argFileCollection><argFile>' +
'<FilePath>' + Utf7.encode(filePath) + '</FilePath>' +
'<FileName>' + Utf7.encode(fileName) + '</FileName>' +
'</argFile></argFileCollection>' +
'<argOverWrite>1</argOverWrite>' +
//                                        '<AttachementSent href="cid:' + fileName + '"/>' +
'</WebFileIO>' +
'</soap:Body>' +
'</soap:Envelope>\r\n';
/*xmlParams += '--MIME_boundary\r\n' +
'Content-Type: text/plain\r\n' +
'Content-Transfer-Encoding: 7bit\r\n' +
'Content-Id: ' + fileName + '\r\n\r\n' +
'ABC\r\n' +
'--MIME_boundary--';*/
/*/
/ 1060526 mark start
console.log(envelope);
var xhr = new XMLHttpRequest();

xhr.open("POST", _url, opts.async);

/ / 若payload為XML文件, 則先轉為文字
var payload = "", transcode = 0;
if (data instanceof Document) {
	payload = Util.getXml(data);
	console.log(payload);
	transcode = 1; // 轉成UTF-16的Binary格式
} else
	payload = data;

//Build the DIME message.
var t_envelope = "http://schemas.xmlsoap.org/soap/envelope/";
var t_payload = "Binary";
var p1 = ((t_envelope.length % 4) == 0) ? 0 : (4 - (t_envelope.length % 4));
var p2 = ((envelope.length % 4) == 0) ? 0 : (4 - (envelope.length % 4));
var p3 = ((fileName.length % 4) == 0) ? 0 : (4 - (fileName.length % 4));
var p4 = ((t_payload.length % 4) == 0) ? 0 : (4 - (t_payload.length % 4));
var l_payload = (transcode == 0) ? payload.length : (payload.length * 2 + 2);
var p5 = ((l_payload % 4) == 0) ? 0 : (4 - (l_payload % 4));
var n = 12 + (t_envelope.length + p1) + (envelope.length + p2) + 12 + (fileName.length + p3) + (t_payload.length + p4) + (l_payload + p5);
var a = new Uint8Array(n);
a[0] = 12; // DIMEVersion + MB
a[1] = 32; // URL
a[2] = a[3] = 0; // opt_len
a[4] = a[5] = 0; // id_len
a[6] = 0; // type_len(hibyte)
a[7] = t_envelope.length; // type_len(lobyte)
if ((envelope.length >> 24) > 0)
	a[8] = (envelope.length >> 24);
else
	a[8] = 0;
if (((envelope.length >> 16) & 0xff) > 0)
	a[9] = ((envelope.length >> 16) & 0xff);
else
	a[9] = 0;
if (((envelope.length >> 8) & 0xff) > 0)
	a[10] = ((envelope.length >> 8) & 0xff);
else
	a[10] = 0;
a[11] = (envelope.length & 0xff); // data_len
var s = 12;
for (var i = 0; i < (t_envelope.length + p1); i++) {
	if (i < t_envelope.length)
		a[i + s] = t_envelope.charCodeAt(i);
	else
		a[i + s] = 0;
}
s += i;
for (var i = 0; i < (envelope.length + p2); i++) {
	if (i < envelope.length)
		a[i + s] = envelope.charCodeAt(i); // envelope中的中文檔名及路徑已轉為utf-7, 所以直接填入array
	else
		a[i + s] = 0;
}
s += i;
a[s] = 10; // DIMEVersion + ME
a[s + 1] = 16; // MIMEtype
a[s + 2] = a[s + 3] = 0; // opt_len
a[s + 4] = 0; // id_len(hibyte)
a[s + 5] = fileName.length; // id_len(lobyte)
a[s + 6] = 0; // type_len(hibyte)
a[s + 7] = t_payload.length; // type_len(lobyte)
if ((l_payload >> 24) > 0)
	a[s + 8] = (l_payload >> 24);
else
	a[s + 8] = 0;
if (((l_payload >> 16) & 0xff) > 0)
	a[s + 9] = ((l_payload >> 16) & 0xff);
else
	a[s + 9] = 0;
if (((l_payload >> 8) & 0xff) > 0)
	a[s + 10] = ((l_payload >> 8) & 0xff);
else
	a[s + 10] = 0;
a[s + 11] = (l_payload & 0xff); // data_len
s += 12;
for (var i = 0; i < (fileName.length + p3); i++) {
	if (i < fileName.length)
		a[i + s] = fileName.charCodeAt(i);
	else
		a[i + s] = 0;
}
s += i;
for (var i = 0; i < (t_payload.length + p4); i++) {
	if (i < t_payload.length)
		a[i + s] = t_payload.charCodeAt(i);
	else
		a[i + s] = 0;
}
s += i;
// 編成UTF-16的Binary格式
if (transcode == 1) {
	a[s] = 0xff;
	a[s + 1] = 0xfe;
	s += 2;
	for (var i = 0; i < payload.length; i++) {
		a[s + (i * 2)] = (payload.charCodeAt(i) & 0xff);
		a[s + (i * 2) + 1] = ((payload.charCodeAt(i) >> 8) & 0xff);
	}
	s += (i * 2);
	for (var i = 0; i < p5; i++)
		a[s + i] = 0;
} else {
	for (var i = 0; i < (payload.length + p5); i++) {
		if (i < payload.length)
			a[i + s] = payload.charCodeAt(i);
		else
			a[i + s] = 0;
	}
}
xhr.setRequestHeader("Content-Type", "application/dime");
xhr.setRequestHeader("SOAPAction", "\"http://2100T.com.tw/WebFileIO\"");
console.log(xhr);
console.log(a);
xhr.onreadystatechange = function () {
	console.debug("xhr.onreadystatechange: " + this.readyState);
	if (this.readyState == 4) {
		console.debug(this.status + " " + this.statusText + ", " + (new Date() - t0) + "ms elapsed, " + this.responseText);
		t0 = new Date();
		console.debug(this.getAllResponseHeaders());

		function parseError(data, utf8encoded) {
			var err = (new DOMParser()).parseFromString((utf8encoded) ? that.utf8.decode(data) : data, "text/xml");
			console.debug(err);
			if (err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes.length) {
				err = err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
				err = {
					errIdx: err.childNodes[0].textContent,
					errNo: err.childNodes[1].textContent,
					errMsg: err.childNodes[2].textContent
				}
				return err;
			}
			return false; // WebFileIOResult節點無child, 表示無錯誤
		}

		var cntnType = this.getResponseHeader("Content-Type");
		if (cntnType.match(/^text\/xml/)) {
			var err = parseError(this.responseText);
			if (err) {
				console.error(err);
				if (options && options.error)
					options.error(err.errNo + ": " + err.errMsg);
				dfd.reject(err.errNo + ":" + err.errMsg);
			} else {
				if (options && options.success)
					options.success(fileName, filePath);
				dfd.resolve();
			}
		} else {
			console.error("不支援無法識別的Content-Type: '" + cntnType + "', responseText:");
			console.log(this.responseText);
			if (options && options.error)
				options.error("不支援無法識別的Content-Type: '" + cntnType + "'");
			dfd.reject("不支援無法識別的Content-Type: '" + cntnType + "'");
		}
	}
}
var t0 = new Date();
xhr.send(a.buffer);
/*var t0 = new Date();
$.ajax(_url, {
type: "POST",
data: a.buffer,
headers: {
"Content-Type": "application/dime",
"SOAPAction": "\"http://2100T.com.tw/WebFileIO\""
},
beforeSend: function(jqXHR, settings) {
console.log(settings);
//jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
console.log(jqXHR);
},
success: function(data, statusText, jqXHR) {
console.log("success! elapsed: " + (new Date() - t0) + "ms");
t0 = new Date();
console.log(jqXHR.getAllResponseHeaders());
console.log(data);
parseDIME(data, fileName, options);
},
error: function(jqXHR, textStatus, errorThrown) {
console.log("WebFileIO error! " + textStatus + ", " + errorThrown);
console.log(jqXHR.responseText);
if(options && options.error)
options.error(textStatus);
}
});*/
//1060526	mark start
/*
return dfd.promise();
}
}
}*///1060526	mark end
//1060526	Leslie	配合TB需求，整個更新WebFileIO底層介面，並改為T2100FileIOService
function T2100FileIoService(url, userId, artifact) {
	// 2015.3.16 - 因應檔案伺服器可能與AP不同一台, 恢復直接以傳入的URL當作連線網址
	var _url = url; //.replace(/^http[s]*:\/\/[a-zA-Z0-9\.]*\//, theWebServices.host + "/");  // [暫時]強制轉為deva的IP, 以避免iPad找不到, 正式版應移除
	//alert(_url);
	var _userId = (userId != undefined) ? userId : theSSO.User.account; // 2015.12.16 FIX
	var _artifact = (artifact != undefined) ? artifact : localStorage['Artifact']; // 2015.12.16 FIX
	var Utf7 = new Utf7Encoding();

	var _base = this;

	// 2016.11.7 從RD-Edit.js複製過來, 因為有單獨要incluce RD-WebServices.js但不要RD-Edit.js的需求
	// 單獨include此js還需要額外include: escapeXml.js、Utf7.js、Base64.js、RD-jdataview.js、RD-soapclient.js
	function getXml(elem, childOnly, encoding) { // 2016.8.29 新增encoding參數, 宣告用, 回傳字串仍是JavaScript的string(UTF-16)
		function doGetXml(elem, inds, noWrap) {
			////theLogger.log(elem.tagName + "(" + elem.nodeType + ")");
			if (elem.nodeType == 1) {
				var res = "";
				for (var i = 0; i < inds; i++)
					res += "\t";
				res += "<" + elem.tagName;
				for (var i = 0; i < elem.attributes.length; i++) {
					res += " " + elem.attributes[i].nodeName + "=\'" + escapeXml(elem.attributes[i].nodeValue) + "\'"; // 2015.12.15 屬性內容要escape XML的保留字
				}
				if (elem.childNodes.length > 0) {
					if (elem.childNodes.length == 1 && elem.childNodes[0].nodeType == 3) {
						res += ">" + escapeXml(elem.childNodes[0].nodeValue) + "</" + elem.tagName + ">"; // 2015.12.15 屬性內容要escape XML的保留字
						//if(!noWrap)	// 2017.2.9 搬到最後面才判斷加斷行字元
						//	res += "\r\n";
					} else {
						res += ">";

						// 判斷childNodes是否有不是空白的text node, 若有的話, 不要格式化
						var formatting = true;
						for (var i = 0; i < elem.childNodes.length; i++) {
							if (elem.childNodes[i].nodeType == 3) {
								var t = elem.childNodes[i].nodeValue;
								if (t.trim().length > 0) {
									formatting = false;
									break;
								}
							} // 2017.2.9 新增判斷childNodes若有追蹤修訂或樣式標籤則不要格式化, 以免轉成完稿XML時, 會變成一整排直排的單字
							else if (elem.childNodes[i].nodeType == 1 && (elem.childNodes[i].nodeName == "mi" || elem.childNodes[i].nodeName == "fmt")) {
								formatting = false;
								break;
							}
						}
						if (formatting)
							res += "\r\n";
						for (var i = 0; i < elem.childNodes.length; i++) {
							res += arguments.callee(elem.childNodes[i], (formatting) ? inds + 1 : 0, !formatting);
						}
						if (formatting) {
							for (var i = 0; i < inds; i++)
								res += "\t";
						}
						//res += "</" + elem.tagName + ">\r\n";	// 2017.2.9 搬到最後面才判斷加斷行字元
						res += "</" + elem.tagName + ">";
					}
				} else {
					//res += "/>\r\n";	// 2017.2.9 搬到最後面才判斷加斷行字元
					res += "/>";
				}
				if (!noWrap) // 2017.2.9 最後才判斷加斷行字元
					res += "\r\n";
				return res;
			} else if (elem.nodeType == 3) { // Text
				var t = elem.nodeValue;
				if (t.trim().length > 0)
					return escapeXml(elem.nodeValue); // 2015.12.15 屬性內容要escape XML的保留字
			} else if (elem.nodeType == 9) { // Document
				// TODO: dtd?
				var res = "";
				//for(var i=0; i<inds; i++)
				//    res += "\t";
				if (typeof encoding === "string") // 2016.8.29 用傳入的參數取代encoding宣告
					res += '<?xml version="1.0" encoding="' + encoding + '"?>\r\n';
				else
					res += '<?xml version="1.0" encoding="UTF-16"?>\r\n';
				res += arguments.callee(elem.documentElement, 0);
				return res;
			}
			return "";
		}
		if (childOnly == true) {
			var res = "";
			for (var i = 0; i < elem.childNodes.length; i++) {
				res += doGetXml(elem.childNodes[i], 0);
			}
			return res;
		}
		return doGetXml(elem, 0);
	}

	return {
		download: function (filePath, fileName, options) {
			//theLogger.log("download(" + filePath + ", " + fileName + ")");
			_base.invoke(_url, "WebFileIO", $.extend({
					getNameSpace: function () {
						return "http://2100T.com.tw";
					},
					getParams: function () {
						return '<argArtifact>' + _artifact + '</argArtifact>' +
						'<argType>2</argType>' +
						'<argFileCollection><argFile>' +
						'<FilePath>' + Utf7.encode(filePath) + '</FilePath>' +
						'<FileName>' + Utf7.encode(fileName) + '</FileName>' +
						'</argFile></argFileCollection>' +
						'<argDeleteSource>0</argDeleteSource>';
					},
					//onSoapMsg: function(res, xml, id) {},
					//onRetrieveFile: function(fil, fn) {},
					success: function (fil, all) {
						if (options.success)
							options.success(fil, all);
					},
					error: function (errorText) {
						//theLogger.error("download(" + filePath + ", " + fileName + ") Error! " + errorText);
						if (options.error) // 2015.6.10 修正下載失敗不會呼叫callback
							options.error(errorText);
						else
							alert(errorText);
					}
				}, options));
		},
		upload: function (filePath, fileName, data, options) {
			//theLogger.log("upload(" + filePath + ", " + fileName + ")");
			var opts = $.extend({
					async: true
				}, options);
			var dfd = $.Deferred();
			var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
				'<soap:Body>' +
				'<WebFileIO xmlns="http://2100T.com.tw">' +
				'<argArtifact>' + _artifact + '</argArtifact>' +
				'<argType>1</argType>' +
				'<argFileCollection><argFile>' +
				'<FilePath>' + Utf7.encode(filePath) + '</FilePath>' +
				'<FileName>' + Utf7.encode(fileName) + '</FileName>' +
				'</argFile></argFileCollection>' +
				'<argOverWrite>true</argOverWrite>' + //2016.10.18	Leslie	修改為正確的參數值"true"
				//                                        '<AttachementSent href="cid:' + fileName + '"/>' +
				'</WebFileIO>' +
				'</soap:Body>' +
				'</soap:Envelope>\r\n';
			/*xmlParams += '--MIME_boundary\r\n' +
			'Content-Type: text/plain\r\n' +
			'Content-Transfer-Encoding: 7bit\r\n' +
			'Content-Id: ' + fileName + '\r\n\r\n' +
			'ABC\r\n' +
			'--MIME_boundary--';*/
			////theLogger.debug(envelope);
			var xhr = new XMLHttpRequest();

			xhr.open("POST", _url, opts.async);

			// 若payload為XML文件, 則先轉為文字
			var payload = "",
			transcode = 0;
			if (data instanceof Document) {
				payload = getXml(data); // 2016.11.7 改叫內建getXml()不要用RD-Edit.js的Util.getXml()
				//theLogger.debug(payload);
				transcode = 1; // 轉成UTF-16的Binary格式
			} else if (typeof data === "object" && "xml" in data) { // for IE-compatible, 2016.8.22 add typeof object
				payload = data.xml;
				//theLogger.debug(payload);
				transcode = 1; // 轉成UTF-16的Binary格式
			} else if (data instanceof ArrayBuffer) {
				payload = new Uint8Array(data);
				//theLogger.debug(payload);
			} else
				payload = data;

			//Build the DIME message.
			var t_envelope = "http://schemas.xmlsoap.org/soap/envelope/";
			var t_payload = "Binary";
			var p1 = ((t_envelope.length % 4) == 0) ? 0 : (4 - (t_envelope.length % 4));
			var p2 = ((envelope.length % 4) == 0) ? 0 : (4 - (envelope.length % 4));
			var p3 = ((fileName.length % 4) == 0) ? 0 : (4 - (fileName.length % 4));
			var p4 = ((t_payload.length % 4) == 0) ? 0 : (4 - (t_payload.length % 4));
			var l_payload = (transcode == 0) ? payload.length : (payload.length * 2 + 2);
			var p5 = ((l_payload % 4) == 0) ? 0 : (4 - (l_payload % 4));
			var n = 12 + (t_envelope.length + p1) + (envelope.length + p2) + 12 + (fileName.length + p3) + (t_payload.length + p4) + (l_payload + p5);
			var a = new Uint8Array(n);
			a[0] = 12; // DIMEVersion + MB
			a[1] = 32; // URL
			a[2] = a[3] = 0; // opt_len
			a[4] = a[5] = 0; // id_len
			a[6] = 0; // type_len(hibyte)
			a[7] = t_envelope.length; // type_len(lobyte)
			if ((envelope.length >> 24) > 0)
				a[8] = (envelope.length >> 24);
			else
				a[8] = 0;
			if (((envelope.length >> 16) & 0xff) > 0)
				a[9] = ((envelope.length >> 16) & 0xff);
			else
				a[9] = 0;
			if (((envelope.length >> 8) & 0xff) > 0)
				a[10] = ((envelope.length >> 8) & 0xff);
			else
				a[10] = 0;
			a[11] = (envelope.length & 0xff); // data_len
			var s = 12;
			for (var i = 0; i < (t_envelope.length + p1); i++) {
				if (i < t_envelope.length)
					a[i + s] = t_envelope.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			for (var i = 0; i < (envelope.length + p2); i++) {
				if (i < envelope.length)
					a[i + s] = envelope.charCodeAt(i); // envelope中的中文檔名及路徑已轉為utf-7, 所以直接填入array
				else
					a[i + s] = 0;
			}
			s += i;
			a[s] = 10; // DIMEVersion + ME
			a[s + 1] = 16; // MIMEtype
			a[s + 2] = a[s + 3] = 0; // opt_len
			a[s + 4] = 0; // id_len(hibyte)
			a[s + 5] = fileName.length; // id_len(lobyte)
			a[s + 6] = 0; // type_len(hibyte)
			a[s + 7] = t_payload.length; // type_len(lobyte)
			if ((l_payload >> 24) > 0)
				a[s + 8] = (l_payload >> 24);
			else
				a[s + 8] = 0;
			if (((l_payload >> 16) & 0xff) > 0)
				a[s + 9] = ((l_payload >> 16) & 0xff);
			else
				a[s + 9] = 0;
			if (((l_payload >> 8) & 0xff) > 0)
				a[s + 10] = ((l_payload >> 8) & 0xff);
			else
				a[s + 10] = 0;
			a[s + 11] = (l_payload & 0xff); // data_len
			s += 12;
			for (var i = 0; i < (fileName.length + p3); i++) {
				if (i < fileName.length)
					a[i + s] = fileName.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			for (var i = 0; i < (t_payload.length + p4); i++) {
				if (i < t_payload.length)
					a[i + s] = t_payload.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			// 編成UTF-16的Binary格式
			if (transcode == 1) {
				a[s] = 0xff;
				a[s + 1] = 0xfe;
				s += 2;
				for (var i = 0; i < payload.length; i++) {
					a[s + (i * 2)] = (payload.charCodeAt(i) & 0xff);
					a[s + (i * 2) + 1] = ((payload.charCodeAt(i) >> 8) & 0xff);
				}
				s += (i * 2);
				for (var i = 0; i < p5; i++)
					a[s + i] = 0;
			} else {
				if (payload instanceof Uint8Array) { // 支援ArrayBuffer類型的data複製
					a.set(payload, s);
				} else {
					for (var i = 0; i < (payload.length + p5); i++) {
						if (i < payload.length)
							a[i + s] = payload.charCodeAt(i);
						else
							a[i + s] = 0;
					}
				}
			}
			xhr.setRequestHeader("Content-Type", "application/dime");
			xhr.setRequestHeader("SOAPAction", "\"http://2100T.com.tw/WebFileIO\"");
			////theLogger.debug(xhr);
			////theLogger.debug(a);
			xhr.onreadystatechange = function () {
				//theLogger.debug("xhr.onreadystatechange: " + this.readyState);
				if (this.readyState == 4) {
					//theLogger.debug(this.status + " " + this.statusText + ", " + (new Date() - t0) + "ms elapsed, " + this.responseText);
					t0 = new Date();
					////theLogger.debug(this.getAllResponseHeaders());

					function parseError(data, utf8encoded) {
						var errXml = (new DOMParser()).parseFromString((utf8encoded) ? that.utf8.decode(data) : data, "text/xml");
						////theLogger.debug(err);
						/* 2016.10.27 FIX for Err物件的階層可能有變動, 改用jQuery.find()找Err物件
						if(err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes.length) {
						err = err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
						err = {
						errIdx: err.childNodes[0].textContent,
						errNo: err.childNodes[1].textContent,
						errMsg: err.childNodes[2].textContent
						}
						return err;
						}*/
						var err = $(errXml.documentElement).find("Err");
						if (err.length) {
							return {
								errIdx: err.find("ErrIdx").text(),
								errNo: err.find("ErrNo").text(),
								errMsg: err.find("ErrMsg").text()
							};
						}
						return false; // WebFileIOResult節點無child, 表示無錯誤
					}

					if (this.status == 200) { //2017.3.6	Leslie	加上status==200判斷，以避免當回報為IIS錯誤時(http狀態碼非200)，程式無法正確處理其異常狀態
						var cntnType = this.getResponseHeader("Content-Type");
						if (cntnType != null && cntnType.match(/^text\/xml/)) { //2017.2.16	Leslie	增加異常狀況的判斷，加上null判斷
							var err = parseError(this.responseText);
							if (err) {
								//theLogger.error(err);
								if (options && options.error)
									options.error(err.errNo + ": " + err.errMsg);
								dfd.reject(err.errNo + ":" + err.errMsg);
							} else {
								if (options && options.success)
									options.success(fileName, filePath);
								dfd.resolve();
							}
						} else {
							//theLogger.error("不支援無法識別的Content-Type: '" + cntnType + "', responseText:");
							//theLogger.log(this.responseText);
							if (options && options.error)
								options.error("不支援無法識別的Content-Type: '" + cntnType + "'");
							dfd.reject("上傳檔案[" + fileName + "]發生異常，錯誤訊息：不支援無法識別的Content-Type: '" + cntnType + "'");
						}
					} else { //2017.3.6	Leslie	回報為IIS錯誤時(http狀態碼非200)，處理異常狀態
						//theLogger.error("呼叫服務["+_url+"]時發生異常: HTTP STATUS=" + this.status + ", responseText:");
						//theLogger.log(this.responseText);
						var errXml = (new DOMParser()).parseFromString(this.responseText, "text/xml");
						var err = $(errXml.documentElement).find("title");
						var errText = "";
						if (err.length) //回報基本異常資訊
							errText = "上傳檔案[" + fileName + "]發生異常，錯誤訊息：" + err.text();
						else
							errText = "上傳檔案[" + fileName + "]發生異常，HTTP 狀態碼：" + this.status;
						if (options && options.error)
							options.error(errText);
						dfd.reject(errText);
					}
				}
			}
			var t0 = new Date();
			xhr.send(a.buffer);
			/*var t0 = new Date();
			$.ajax(_url, {
			type: "POST",
			data: a.buffer,
			headers: {
			"Content-Type": "application/dime",
			"SOAPAction": "\"http://2100T.com.tw/WebFileIO\""
			},
			beforeSend: function(jqXHR, settings) {
			//theLogger.log(settings);
			//jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
			//theLogger.log(jqXHR);
			},
			success: function(data, statusText, jqXHR) {
			//theLogger.log("success! elapsed: " + (new Date() - t0) + "ms");
			t0 = new Date();
			//theLogger.log(jqXHR.getAllResponseHeaders());
			//theLogger.log(data);
			parseDIME(data, fileName, options);
			},
			error: function(jqXHR, textStatus, errorThrown) {
			//theLogger.log("WebFileIO error! " + textStatus + ", " + errorThrown);
			//theLogger.log(jqXHR.responseText);
			if(options && options.error)
			options.error(textStatus);
			}
			});*/
			return dfd.promise();
		},
		// 2016.7.12 新增上傳附件電子檔
		uploadAtt: function (filePath, fileName, origFileName, options) {
			//theLogger.log("uploadAtt(" + filePath + ", " + fileName + ", " + origFileName + ")");
			var opts = $.extend({
					async: true
				}, options);
			var dfd = $.Deferred();
			var that = this;
			if (origFileName.match(/^blob:/)) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", origFileName, true);
				xhr.responseType = "arraybuffer";
				xhr.onload = function (e) {
					if (this.status == 200) {
						var data = this.response;
						that.upload(filePath, fileName, data, options)
						.done(dfd.resolve)
						.fail(dfd.reject);
					}
				};
				xhr.send();
			} else {
				//theLogger.error("uploadAtt()僅接受'blob:'類型的資料上傳!");
				dfd.reject("僅接受'blob:'類型的資料上傳");
			}

			return dfd.promise();
		},
		// 2016.7.22 新增複製更名
		copy: function (fromPath, fromFileName, toPath, toFileName, options) {
			/*if(options)
			//theLogger.log("copy(" + fromPath + ", " + fromFileName + ", " + toPath + ", " + toFileName + ", {delSource:" + options.delSource + ", overWrite:" + options.overWrite + ", toWebFileIOUrl:" + options.toWebFileIOUrl + "})");
			else
			//theLogger.log("copy(" + fromPath + ", " + fromFileName + ", " + toPath + ", " + toFileName + ")");*/
			var opts = $.extend({
					delSource: false, // 預設不刪除原檔
					overWrite: true, // 預設要覆蓋目的檔
					toWebFileIOUrl: _url // 預設複製目的為同一WebFileIO主機
				}, options);
			function argFile(fromPath, fromName, toPath, toName) {
				this.FilePath = fromPath;
				this.FileName = fromName;
				this.ToPath = toPath;
				this.ToName = toName;
			}
			var dfd = $.Deferred();

			var params = new SOAPClientParameters();
			params.add('argArtifact', _artifact);
			if (options && "restore" in options && options.restore) // 2016.9.26 新增連同子目錄的搬移功能type為40
				params.add('argType', '40');
			else
				params.add('argType', '4'); // WebFileIO 搬移檔案, Type固定給"4"
			params.add('argFileCollection', [new argFile(fromPath, fromFileName, toPath, toFileName)]);
			params.add('argDeleteSource', (opts.delSource ? 'true' : 'false')); // 作業完成後是否刪除原位置檔案
			params.add('argOverWrite', (opts.overWrite ? 'true' : 'false')); // 是否覆寫目的位置檔案
			params.add('argRemoteService', opts.toWebFileIOUrl); // 複製目的Server的WebFileIO網址!
			SOAPClient.invoke(_url, "WebFileIO", params, true,
				function (rslt) {
				function parseError(rslt) {
					var arrErr = [],
					err,
					i = 0;
					if (rslt.length) {
						for (i = 0; i < rslt.length; i++) {
							err = rslt[i];
							if (err.ErrNo.length && err.ErrNo !== '0') {
								arrErr.push(err);
							}
						}
						if (arrErr.length) {
							return arrErr;
						}
					}
					return null; // WebFileIOResult節點無child, 表示無錯誤
				}

				var res = {},
				_arrErr = null;
				if (typeof rslt === 'object') {
					_arrErr = parseError(rslt);
					if (_arrErr === null) {
						res.success = true;
						res.errCode = res.errMsg = '';
					} else {
						res.success = false;
						res.errCode = _arrErr[0].ErrNo;
						res.errMsg = _arrErr[0].ErrMsg;
						res.errObj = _arrErr;
					}
				} else {
					res = {
						success: false,
						errMsg: '叫用FileIOWS時發生錯誤!'
					};
				}

				if (res.success) {
					dfd.resolve(res);
				} else {
					dfd.reject(res);
				}
			});
			return dfd.promise();
		},
		// 2016.9.21 新增刪除
		del: function (files) {
			function argFile(filePath, fileName) {
				this.FilePath = filePath;
				this.FileName = fileName;
			}
			var dfd = $.Deferred();

			var a = [];
			if ($.type(files) == "array") {
				//theLogger.log("del([");
				for (var i = 0; i < files.length; i++) {
					//theLogger.log("\t'" + files[i].filePath + "', '" + files[i].fileName + "'");
					a.push(new argFile(files[i].filePath, files[i].fileName));
				}
				//theLogger.log("])...");
			} else
				throw new Error("WebFileIO.del()僅接受陣列類型的參數");

			var params = new SOAPClientParameters();
			params.add('argArtifact', _artifact);
			params.add('argType', '3'); // WebFileIO 刪除檔案, Type固定給"3"
			params.add('argFileCollection', a);
			// 1091117 Leslie 1080943 補argDeleteSource及argOverWrite, 以避免invokeJSON發生錯誤
			params.add('argDeleteSource', 'false');	// 作業完成後是否刪除原位置檔案
			params.add('argOverWrite', 'false');	// 是否覆寫目的位置檔案
			SOAPClient.invoke(_url, "WebFileIO", params, true,
				function (rslt) {
				function parseError(rslt) {
					var arrErr = [],
					err,
					i = 0;
					if (rslt.length) {
						for (i = 0; i < rslt.length; i++) {
							err = rslt[i];
							if (err.ErrNo.length && err.ErrNo !== '0') {
								arrErr.push(err);
							}
						}
						if (arrErr.length) {
							return arrErr;
						}
					}
					return null; // WebFileIOResult節點無child, 表示無錯誤
				}

				var res = {},
				_arrErr = null;
				if (typeof rslt === 'object') {
					_arrErr = parseError(rslt);
					if (_arrErr === null) {
						res.success = true;
						res.errCode = res.errMsg = '';
					} else {
						res.success = false;
						res.errCode = _arrErr[0].ErrNo;
						res.errMsg = _arrErr[0].ErrMsg;
						res.errObj = _arrErr;
					}
				} else {
					res = {
						success: false,
						errMsg: '叫用FileIOWS時發生錯誤!'
					};
				}

				if (res.success) {
					dfd.resolve(res);
				} else {
					dfd.reject(res);
				}
			});
			return dfd.promise();
		}
	}
}
T2100FileIoService.prototype = new SOAPviaDIME();

function Utf7Encoding() {
	'use strict';

	function encode(str) {
		var b = new Uint8Array(str.length * 2),
		octets = '',
		i,
		bi,
		len,
		c,
		encoded;

		for (i = 0, bi = 0, len = str.length; i < len; i++) {
			// Note that we can't simply convert a UTF-8 string to Base64 because
			// UTF-8 uses a different encoding. In modified UTF-7, all characters
			// are represented by their two byte Unicode ID.
			c = str.charCodeAt(i);
			// Upper 8 bits shifted into lower 8 bits so that they fit into 1 byte.
			b[bi++] = c >> 8;
			// Lower 8 bits. Cut off the upper 8 bits so that they fit into 1 byte.
			b[bi++] = c & 0xFF;
		}

		// Convert b:Uint8Array to a binary string
		for (i = 0, len = b.length; i < len; i++) {
			octets += String.fromCharCode(b[i]);
		}

		// Modified Base64 uses , instead of / and omits trailing =.
		encoded = '';
		if (typeof window !== 'undefined' && btoa) {
			encoded = btoa(octets);
		} else {
			encoded = (new Buffer(octets, "binary")).toString("base64");
		}
		return encoded.replace(/=+$/, '');
	}

	function decode(str) {
		var octets = '',
		r = [];

		if (typeof window !== 'undefined' && atob) {
			octets = atob(str);
		} else {
			octets = (new Buffer(str || "", "base64")).toString("binary");
		}

		for (var i = 0, len = octets.length; i < len; ) {
			// Calculate charcode from two adjacent bytes.
			r.push(String.fromCharCode(octets.charCodeAt(i++) << 8 | octets.charCodeAt(i++)));
		}
		return r.join('');
	}

	// Escape RegEx from http://simonwillison.net/2006/Jan/20/escape/
	function escape(chars) {
		return chars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	}

	// Character classes defined by RFC 2152.
	var setD = 'A-Za-z0-9' + escape('\'(),-./:?'),
	setO = escape('!"#$%&*;<=>@[]^_\'{|}'),
	setW = escape(' \r\n\t'),

	// Stores compiled regexes for various replacement pattern.
	regexes = {},
	regexAll = new RegExp('[^' + setW + setD + setO + ']+', 'g');

	return {
		// RFC 2152 UTF-7 encoding.
		encode: function (str, mask) {
			// Generate a RegExp object from the string of mask characters.
			if (!mask) {
				mask = '';
			}
			if (!regexes[mask]) {
				regexes[mask] = new RegExp('[^' + setD + escape(mask) + ']+', 'g');
			}

			// We replace subsequent disallowed chars with their escape sequence.
			return str.replace(regexes[mask], function (chunk) {
				// + is represented by an empty sequence +-, otherwise call encode().
				return '+' + (chunk === '+' ? '' : encode(chunk)) + '-';
			});
		},

		// RFC 2152 UTF-7 encoding with all optionals.
		encodeAll: function (str) {
			// We replace subsequent disallowed chars with their escape sequence.
			return str.replace(regexAll, function (chunk) {
				// + is represented by an empty sequence +-, otherwise call encode().
				return '+' + (chunk === '+' ? '' : encode(chunk)) + '-';
			});
		},

		// RFC 2152 UTF-7 decoding.
		decode: function (str) {
			// 2015-1-15 - Raymond fixed, 有些中文encode後會有+號, 所以原過濾函式只挑A-Za-z0-9/這63字元, 少了+, 會導致被編碼成有+字元的中文字被截斷而無法還原成原來的中文字
			//return str.replace(/\+([A-Za-z0-9\/]*)-?/gi, function(_, chunk) {
			return str.replace(/\+([A-Za-z0-9\+\/]*)-?/gi, function (_, chunk) {
				// &- represents &.
				if (chunk === '') {
					return '+';
				}
				return decode(chunk);
			});
		},

		imap: {
			// RFC 3501, section 5.1.3 UTF-7 encoding.
			encode: function (str) {
				// All printable ASCII chars except for & must be represented by themselves.
				// We replace subsequent non-representable chars with their escape sequence.
				return str.replace(/&/g, '&-').replace(/[^\x20-\x7e]+/g, function (chunk) {
					// & is represented by an empty sequence &-, otherwise call encode().
					chunk = (chunk === '&' ? '' : encode(chunk)).replace(/\//g, ',');
					return '&' + chunk + '-';
				});
			},

			// RFC 3501, section 5.1.3 UTF-7 decoding.
			decode: function (str) {
				return str.replace(/&([^-]*)-/g, function (_, chunk) {
					// &- represents &.
					if (chunk === '') {
						return '&';
					}
					return decode(chunk.replace(/,/g, '/'));
				});
			}
		}
	};
}

function SOAPClientParameters() {
	//var _pl = new Array();
	var _pl = new Object();
	this.add = function (name, value) {
		_pl[name] = value;
		return this;
	}

	this.toXml = function () {
		var xml = "";
		for (var p in _pl) {
			/* 2016. 7 - v2.0, support object parameters */
			xml += "<" + p + ">" + SOAPClientParameters._serialize(_pl[p]) + "</" + p + ">";
			/*if(typeof(_pl[p]) != "function")
			 *	xml += "<" + p + ">" + _pl[p].toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</" + p + ">";
			 */
		}
		return xml;
	}
			
	// 1091118 Leslie[1080943]	[搬移]從WebMethodInfo補充缺少的參數
	this.importLacks = function(wmi)
	{
		var reFormatPara = new Object();
		for(var iPara = 0;iPara < wmi.Paremeters.length;iPara++){
			reFormatPara[wmi.Paremeters[iPara]] = (_pl[wmi.Paremeters[iPara]] != undefined)?_pl[wmi.Paremeters[iPara]]:null;
		}
		_pl = reFormatPara;
	}

	//1050715	Leslie	增加回傳JSON格式字串
	this.toJSON = function () {
		return JSON.stringify(_pl)
	}
}

//1070817 Zen 1070678 弱掃XSS修正
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}

/* 2016.7 - Eric Peng, v2.0 support object parameters */
SOAPClientParameters._serialize = function (o) {
	var s = "";
	switch (typeof(o)) {
	case "string":
		s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		break;
	case "number":
	case "boolean":
		s += o.toString();
		break;
	case "object":
		// Date
		if (o.constructor.toString().indexOf("function Date()") > -1) {

			var year = o.getFullYear().toString();
			var month = (o.getMonth() + 1).toString();
			month = (month.length == 1) ? "0" + month : month;
			var date = o.getDate().toString();
			date = (date.length == 1) ? "0" + date : date;
			var hours = o.getHours().toString();
			hours = (hours.length == 1) ? "0" + hours : hours;
			var minutes = o.getMinutes().toString();
			minutes = (minutes.length == 1) ? "0" + minutes : minutes;
			var seconds = o.getSeconds().toString();
			seconds = (seconds.length == 1) ? "0" + seconds : seconds;
			var milliseconds = o.getMilliseconds().toString();
			var tzminutes = Math.abs(o.getTimezoneOffset());
			var tzhours = 0;
			while (tzminutes >= 60) {
				tzhours++;
				tzminutes -= 60;
			}
			tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
			tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
			var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
			s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
		}
		// Array
		else if (o.constructor.toString().indexOf("function Array()") > -1) {
			for (var p in o) {
				if (!isNaN(p)) // linear array
				{
					(/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
					var type = RegExp.$1;
					switch (type) {
					case "":
						type = typeof(o[p]);
					case "String":
						type = "string";
						break;
					case "Number":
						type = "int";
						break;
					case "Boolean":
						type = "bool";
						break;
					case "Date":
						type = "DateTime";
						break;
					}
					s += "<" + type + ">" + SOAPClientParameters._serialize(o[p]) + "</" + type + ">"
				} else // associative array
					s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">"
			}
		}
		// Object or custom function
		else
			for (var p in o)
				s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
		break;
	case "function":
		break;
	default:
		throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
	}
	return s;
}

function SOAPClient() {}

//1050715	Leslie	增加以JSON呼叫WebService之功能
SOAPClient.invokeJSON = function (url, method, parameters, async, callback) {
	if (async)
		SOAPClient._callServiceWithOutWSDL(url, method, parameters, async, callback);
	else
		return SOAPClient._callServiceWithOutWSDL(url, method, parameters, async, callback);
}

SOAPClient._callServiceWithOutWSDL = function (argUrl, funcName, parameters, async, callback) {
	var result = new Object();

	$.ajax({
		type: "POST",
		url: argUrl + "/" + funcName,
		contentType: "application/json; charset=utf-8",
		async: async,
		cache: false,
		dataType: 'json',
		data: parameters.toJSON(),
		success: function (data) {
			if (data.hasOwnProperty("d")) {
				//$("#txValue").val($("#txValue").val() + data.d);
				result.value = data.d;
				result.id = 0;
			} else {
				//$("#txValue").val($("#txValue").val() + data);
				result.value = data;
				result.id = 0;
			}

			if (callback)
				callback(result);
		},
		error: function (err) {
			err.error = true;
			err.errorDetail = new Object();
			err.errorDetail.string = err.statusText;
			err.errorDetail.raw = err;
			result = err;

			if (callback)
				callback(result);
		}
	});
	if (!async)
		return result;
}

//1091118 Leslie[1080943]	[搬移]Raymond 1080943 SOAPClient.invoke替換為WebMethodInfo版本
//SOAPClient.invoke = function (url, method, parameters, async, callback) {
SOAPClient.invokeWSDL = function(url, method, parameters, async, callback){
	if (async)
		SOAPClient._loadWsdl(url, method, parameters, async, callback);
	else
		return SOAPClient._loadWsdl(url, method, parameters, async, callback);
}

// private: wsdl cache
SOAPClient_cacheWsdl = new Array();

// private: invoke async
SOAPClient._loadWsdl = function (url, method, parameters, async, callback) {
	// load from cache?
	var wsdl = SOAPClient_cacheWsdl[url];
	if (wsdl + "" != "" && wsdl + "" != "undefined")
		return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl);
	// get wsdl
	var xmlHttp = SOAPClient._getXmlHttp();
	xmlHttp.open("GET", url + "?wsdl", async);
	if (async) {
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4)
				SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp);
		}
	}
	xmlHttp.send(null);
	if (!async)
		return SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp);
}

//1051129 Kevin 新增自動重試
SOAPClient_RetryWsdl = new Array();

SOAPClient._onLoadWsdl = function (url, method, parameters, async, callback, req) {
	//	console.log(req);
	//	console.log(req.getAllResponseHeaders());
	//1051111 Kevin 新增WS無法叫用時錯誤處理
	if (req.status != 200) {
		//1051129 Kevin 新增自動重試
		if (SOAPClient_RetryWsdl[url] == true) {
			SOAPClient_RetryWsdl[url] = false;
			alert('網頁目前無法使用，請稍後再試，\r\n網址:' + url);
			if (callback)
				callback('');
			return null;
		} else {
			SOAPClient_RetryWsdl[url] = true;
			//alert('網頁目前無法使用，5秒後將重試請稍候，\r\n網址:' + url);
			fnSleep(5000);
			if (async)
				SOAPClient._loadWsdl(url, method, parameters, async, callback);
			else
				return SOAPClient._loadWsdl(url, method, parameters, async, callback);
		}
	}

	var wsdl = req.responseXML;
	SOAPClient_cacheWsdl[url] = wsdl; // save a copy in cache
	return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl);
}
SOAPClient._sendSoapRequest = function (url, method, parameters, async, callback, wsdl) {
	// get namespace
	var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") ? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : wsdl.documentElement.attributes["targetNamespace"].value;
	// build SOAP request
	var sr =
		"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
		"<soap:Envelope " +
		"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
		"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
		"<soap:Body>" +
		"<" + method + " xmlns=\"" + ns + "\">" +
		parameters.toXml() +
		"</" + method + "></soap:Body></soap:Envelope>";
	// send request
	var xmlHttp = SOAPClient._getXmlHttp();
	xmlHttp.open("POST", url, async);
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	// 2013/5/6 Raymond added, for Mobile Safari always cache soap issue.
	if (navigator.userAgent.search(/Chrome/) < 0) { // not chrome!
		/* 2013.12 - iOS Safari以XMLHttpRequest下載設定檔時,常server已新,但browser仍使用client cache,
		 * 以下設定可強制瀏覽器取用server檔案!
		 */
		//xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");  // 必須加上這個Header, 以免在iOS平台預設會Cache HTTP Request的環境下發生錯誤
		xmlHttp.setRequestHeader("Cache-Control", "no-cache");
	}

	// 2013.12 - Eric Peng, synchronous不能設定timeout! (Chrome Error!)
	if (async) {
		// 2013/12/24 - Raymond, 延長逾時
		xmlHttp.timeout = 60000;
	}

	//console.log(xmlHttp);
	if (async) {
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4)
				SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
		}
	}
	xmlHttp.send(sr);
	if (!async)
		return SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
}
SOAPClient._onSendSoapRequest = function (method, async, callback, wsdl, req) {
	//	console.log(req.getAllResponseHeaders());
	var o = null;
	var nd = SOAPClient._getElementsByTagName(req.responseXML, method + "Result");
	if (nd.length == 0) {
		if (req.responseXML.getElementsByTagName("faultcode").length > 0)
			throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
	} else
		o = SOAPClient._soapresult2object(nd[0], wsdl);
	if (callback)
		callback(o, req.responseXML);
	if (!async)
		return o;
}

// private: utils
SOAPClient._getElementsByTagName = function (document, tagName) {
	try {
		// trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
		return document.selectNodes(".//*[local-name()=\"" + tagName + "\"]");
	} catch (ex) {}
	// old XML parser support
	return document.getElementsByTagName(tagName);
}

SOAPClient._soapresult2object = function (node, wsdl) {
	return SOAPClient._node2object(node, wsdl);
}
SOAPClient._node2object = function (node, wsdl) {
	// null node
	if (node == null)
		return null;
	// text node
	if (node.nodeType == 3 || node.nodeType == 4)
		return SOAPClient._extractValue(node, wsdl);
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2object(node.childNodes[0], wsdl);
	// 2012/12/14 Raymond modified
	var elemType = SOAPClient._getTypeFromWsdl(node.nodeName, wsdl);
	if (elemType == "") { // s:element若無type屬性則表示為XML型態
		if (node.childNodes.length == 1)
			return node.childNodes[0];
		return node;
	}
	var isarray = elemType.toLowerCase().indexOf("arrayof") != -1;
	// object node
	if (!isarray) {
		var obj = null;
		//if(node.hasChildNodes())	// 2015.3.16 - Raymond, 無任何子節點的回傳值, 應視為空物件, 而非null
		obj = new Object();
		for (var i = 0; i < node.childNodes.length; i++) {
			var p = SOAPClient._node2object(node.childNodes[i], wsdl);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	// list node
	else {
		// create node ref
		var l = new Array();
		for (var i = 0; i < node.childNodes.length; i++)
			l[l.length] = SOAPClient._node2object(node.childNodes[i], wsdl);
		return l;
	}
	return null;
}
SOAPClient._extractValue = function (node, wsdl) {
	var value = node.nodeValue;
	switch (SOAPClient._getTypeFromWsdl(node.parentNode.nodeName, wsdl).toLowerCase()) {
	default:
	case "s:string":
		return (value != null) ? value + "" : "";
	case "s:boolean":
		return value + "" == "true";
	case "s:int":
	case "s:long":
		return (value != null) ? parseInt(value + "", 10) : 0;
	case "s:double":
		return (value != null) ? parseFloat(value + "") : 0;
	case "s:datetime":
		if (value == null)
			return null;
		else {
			value = value + "";
			value = value.substring(0, value.lastIndexOf("."));
			value = value.replace(/T/gi, " ");
			value = value.replace(/-/gi, "/");
			var d = new Date();
			d.setTime(Date.parse(value));
			return d;
		}
	}
}
SOAPClient._getTypeFromWsdl = function (elementname, wsdl) {
	var ell = wsdl.getElementsByTagName("s:element"); // IE
	if (ell.length == 0)
		ell = wsdl.getElementsByTagName("element"); // MOZ
	for (var i = 0; i < ell.length; i++) {
		if (ell[i].attributes["name"] + "" == "undefined") // IE
		{
			if (ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("name").nodeValue == elementname && ell[i].attributes.getNamedItem("type") != null)
				return ell[i].attributes.getNamedItem("type").nodeValue;
		} else // MOZ
		{
			if (ell[i].attributes["name"] != null && ell[i].attributes["name"].value == elementname && ell[i].attributes["type"] != null)
				return ell[i].attributes["type"].value;
		}
	}
	return "";
}
// private: xmlhttp factory
SOAPClient._getXmlHttp = function () {
	try {
		if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();
			// some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
			if (req.readyState == null) {
				req.readyState = 1;
				req.addEventListener("load",
					function () {
					req.readyState = 4;
					if (typeof req.onreadystatechange == "function")
						req.onreadystatechange();
				},
					false);
			}
			return req;
		}
		if (window.ActiveXObject)
			return new ActiveXObject(SOAPClient._getXmlHttpProgID());
	} catch (ex) {}
	throw new Error("Your browser does not support XmlHttp objects");
}
SOAPClient._getXmlHttpProgID = function () {
	if (SOAPClient._getXmlHttpProgID.progid)
		return SOAPClient._getXmlHttpProgID.progid;
	var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	var o;
	for (var i = 0; i < progids.length; i++) {
		try {
			o = new ActiveXObject(progids[i]);
			return SOAPClient._getXmlHttpProgID.progid = progids[i];
		} catch (ex) {};
	}
	throw new Error("Could not find an installed XML parser");
}

//1091118	Leslie[1080943]	[搬移]由RD-soapclient搬移整段WSDL修改功能至此	--START--
// 1090722 Raymond 1080943 新增取得WebMethodInfo並Cache
SOAPClient.invoke = function(url, method, parameters, async, callback)
{
	if(async)
		// 1090722 Raymond 1080943 改用WebMethodInfo取代WSDL
		SOAPClient._loadWebMethodInfo(url, method, parameters, async, callback);
	else
		// 1090722 Raymond 1080943 改用WebMethodInfo取代WSDL
		return SOAPClient._loadWebMethodInfo(url, method, parameters, async, callback);
}

SOAPClient_cacheWebMethodInfo = new Array();

SOAPClient._loadWebMethodInfo = function(url, method, parameters, async, callback)
{
	var key = url + ((url[url.length - 1] == '/')?"":"/") + method;
	var wmi = SOAPClient_cacheWebMethodInfo[key];
	if(wmi + "" != "" && wmi + "" != "undefined") {
		// 判斷若WebMethodInfo的回傳值無XML格式, 則直接改叫invokeByJSON
		if(wmi.ReturnHasXml != true) {
			parameters.importLacks(wmi);	// 1091117 Raymond 補充缺少的參數
			return SOAPClient.invokeJSON(url, method, parameters, async, function(res) {
					if(res.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
						var err = {m_bSuccess:false};
						if(!!res.errorDetail) {
							err.m_ErrCode = res.errorDetail;
							err.m_strErrMsg = res.errorDetail.string;
							if(!!res.errorDetail.raw && !!res.errorDetail.raw.responseJSON && !!res.errorDetail.raw.responseJSON.Message) {
								err.m_ErrCode = res.errorDetail.raw.responseJSON.ExceptionType;
								err.m_strErrMsg = res.errorDetail.raw.responseJSON.Message + '\r\n' + res.errorDetail.raw.responseJSON.StackTrace;
							}
						}
						else {	// 無errorDetail?
							err.m_ErrCode = res;
							err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
						}
						if(!!callback)
							callback(err);
					}
					else if(!!callback) {
						// 1091117 Raymond invokeJSON的回傳值不用轉成物件
						/*if(typeof res.value === "string" && res.value.match(/^\{/))
							callback(JSON.parse(res.value));
						else*/
							callback(res.value);
					}
				});
		}
		return SOAPClient._sendSoapRequestWithWMI(url, method, parameters, async, callback, wmi);
	}
	// get WebMethodInfo
	var params = new SOAPClientParameters(), res;
	params.add('MethodName', method);
	SOAPClient.invokeJSON(url, "GetWebMethodInfo", params, async, function(r) {
		console.log("GetWebMethodInfo(" + key + ")=" + r.value);
		if(r.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
			var err = {m_bSuccess:false};
			if(!!r.errorDetail) {
				err.m_ErrCode = r.errorDetail;
				err.m_strErrMsg = r.errorDetail.string;
				if(!!r.errorDetail.raw && !!r.errorDetail.raw.responseJSON && !!r.errorDetail.raw.responseJSON.Message) {
					err.m_ErrCode = r.errorDetail.raw.responseJSON.ExceptionType;
					err.m_strErrMsg = r.errorDetail.raw.responseJSON.Message + '\r\n' + r.errorDetail.raw.responseJSON.StackTrace;
				}
			}
			else {	// 無errorDetail?
				err.m_ErrCode = r;
				err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
			}
			if(!!callback)
				callback(err);
			if(!async)
				return err;
		}
		else if(typeof r.value !== "string") {
			theLogger.error("Error! GetWebMethodInfo(" + key + ")回傳值非字串");
			var err = {m_bSuccess:false, m_ErrCode:-999, m_strErrMsg: "Error! GetWebMethodInfo(" + key + ")回傳值非字串"};
			if(!!callback)
				callback(err);
			if(!async)
				return err;
		}
		else if(r.value.length == 0) {
			theLogger.error("Error! GetWebMethodInfo(" + key + ")回傳空字串");
			var err = {m_bSuccess:false, m_ErrCode:-998, m_strErrMsg: "Error! GetWebMethodInfo(" + key + ")回傳空字串"};
			if(!!callback)
				callback(err);
			if(!async)
				return err;
		}
		else
			res = SOAPClient._onLoadWebMethodInfo(url, method, parameters, async, callback, JSON.parse(r.value));
	});
	if(!async)
		return res;
}

SOAPClient._onLoadWebMethodInfo = function(url, method, parameters, async, callback, wmi)
{
	var key = url + ((url[url.length - 1] == '/')?"":"/") + method;
	SOAPClient_cacheWebMethodInfo[key] = wmi;	// save a copy in cache
	// 判斷若WebMethodInfo的回傳值無XML格式, 則直接改叫invokeByJSON
	if(SOAPClient_cacheWebMethodInfo[key].ReturnHasXml != true) {
		parameters.importLacks(wmi);	// 1091117 Raymond 補充缺少的參數
		return SOAPClient.invokeJSON(url, method, parameters, async, function(res) {
				if(res.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
					var err = {m_bSuccess:false};
					if(!!res.errorDetail) {
						err.m_ErrCode = res.errorDetail;
						err.m_strErrMsg = res.errorDetail.string;
						if(!!res.errorDetail.raw && !!res.errorDetail.raw.responseJSON && !!res.errorDetail.raw.responseJSON.Message) {
							err.m_ErrCode = res.errorDetail.raw.responseJSON.ExceptionType;
							err.m_strErrMsg = res.errorDetail.raw.responseJSON.Message + '\r\n' + res.errorDetail.raw.responseJSON.StackTrace;
						}
					}
					else {	// 無errorDetail?
						err.m_ErrCode = res;
						err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
					}
					if(!!callback)
						callback(err);
				}
				else if(!!callback) {
					// 1091117 Raymond invokeJSON的回傳值不用轉成物件
					/*if(typeof res.value === "string" && res.value.match(/^\{/))
						callback(JSON.parse(res.value));
					else*/
						callback(res.value);
				}
			});
	}
	return SOAPClient._sendSoapRequestWithWMI(url, method, parameters, async, callback, SOAPClient_cacheWebMethodInfo[key]);
}

SOAPClient._sendSoapRequestWithWMI = function(url, method, parameters, async, callback, wmi)
{
	// get namespace
	var ns = (!!wmi.Namespace && wmi.Namespace.length > 0) ? wmi.Namespace : "";
	// build SOAP request
	var sr = 
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<soap:Envelope " +
				"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
				"<soap:Body>" +
				"<" + method + " xmlns=\"" + ns + "\">" +
				parameters.toXml() +
				"</" + method + "></soap:Body></soap:Envelope>";
	// send request
	var xmlHttp = SOAPClient._getXmlHttp();
	xmlHttp.open("POST", url, async);
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	// 2013/5/6 Raymond added, for Mobile Safari always cache soap issue.
	if(navigator.userAgent.search(/Chrome/) < 0) {  // not chrome!
		/* 2013.12 - iOS Safari以XMLHttpRequest下載設定檔時,常server已新,但browser仍使用client cache,
		 * 以下設定可強制瀏覽器取用server檔案!
		 */
		//xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");  // 必須加上這個Header, 以免在iOS平台預設會Cache HTTP Request的環境下發生錯誤
		xmlHttp.setRequestHeader("Cache-Control", "no-cache");
	}
	
	// 2013.12 - Eric Peng, synchronous不能設定timeout! (Chrome Error!)
	if (async) {
		// 2018.11 - 1071165 Eric, 延長逾時為5分鐘(300秒)
		// 2013/12/24 - Raymond, 延長逾時
		xmlHttp.timeout = 300000;
	}
	
	//console.log(xmlHttp);
	if(async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			if(xmlHttp.readyState == 4)
				SOAPClient._onSendSoapRequestWithWMI(url, method, async, callback, wmi, xmlHttp);
		}

		// 2018.11 - 1071165 Eric, 處理timeout
		xmlHttp.ontimeout = function(e) {
			if (callback) {
				callback({m_bSuccess:false, m_ErrCode: -1, m_strErrMsg: 'WS作業逾時'});
			}
		}
	}
	xmlHttp.send(sr);
	if (!async)
		return SOAPClient._onSendSoapRequestWithWMI(url, method, async, callback, wmi, xmlHttp);
}

SOAPClient._onSendSoapRequestWithWMI = function(url, method, async, callback, wmi, req)
{
	// 2018.11.22 - 1071165, 處理timeout時req.responseXML為null的情況
	if (typeof req.responseXML=='object' && req.responseXML!==null) {
		console.debug(req.responseXML);
		var o = null;
		var nd = SOAPClient._getElementsByTagName(req.responseXML, method + "Result");
		if(nd.length == 0) {
			if(req.responseXML.getElementsByTagName("faultcode").length > 0)
				throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
		}
		else
			o = SOAPClient._soapresult2objectWithWMI(nd[0], wmi);	// 只取回傳值對
		if(callback)
			callback(o, req.responseXML);
		if(!async)
			return o;
	}
	else {
		let resText = req.responseText;
		console.error("Error! 呼叫" + url + "/" + method + "未回傳responseXML, responseText='" + resText + "'");
		if (typeof resText=='string' && resText.length && callback) {
			callback({m_bSuccess:false, m_ErrCode:req.status, m_strErrMsg: resText});
		}
	}
}
SOAPClient._soapresult2objectWithWMI = function(node, wmi)
{
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2objectWithWMI(node.childNodes[0], wmi);
	return SOAPClient._node2objectWithWMI(node, wmi);
}
SOAPClient._node2objectWithWMI = function(node, wmi)
{
	// null node
	if(node == null) {
		console.log(null);
		return null;
	}
	// text node
	if(node.nodeType == 3 || node.nodeType == 4) {
		var v = SOAPClient._extractValueWithWMI(node, wmi);
		console.log(node.parentNode.nodeName + " = " + v);
		return v;
	}
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2objectWithWMI(node.childNodes[0], wmi);
	var elemType = SOAPClient._getTypeFromWMI(node.nodeName, wmi);
	if(!elemType) {	// node名稱找不到對應type, 可能是Rtn陣列的物件標籤名稱
		console.log("<" + node.nodeName + ">無對應type, 可能是Rtn陣列的物件標籤名稱, childNodes(" + node.childNodes.length + ")");
		var obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++) {
			var p = SOAPClient._node2objectWithWMI(node.childNodes[i], wmi);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	console.log("elemType of <" + node.nodeName + "> = '" + elemType + "'");
	var isarray = elemType.match(/\[\]$/);
	console.log(elemType + " is" + (isarray?"":" NOT") + " Array");
	if(elemType == "System.Xml.XmlDocument" ||	// System.Xml.XMLDocument為XML型態
		elemType == "System.Xml.XmlElement") {	// 1091117 Raymond System.Xml.XmlElement也是XML型態
		if(node.childNodes.length == 1) {
			console.log(node.childNodes[0]);
			return node.childNodes[0];
		}
		console.log(node);
		return node;
	}
	else if(elemType.match(/^System./)) {	// System.開頭的類型為基礎型別, 若node無子節點(ex: <NodeName/>)便會執行到這裡
		if(!isarray) {	// 基礎型別非陣列才直接轉換
			var v = SOAPClient._translateValueWithType(node.nodeValue, elemType);
			console.log(node.nodeName + " = " + v);
			return v;
		}
		else if(node.childNodes.length > 0) {
			var elemProp = [{name: node.childNodes[0].nodeName, type: elemType.substr(0, isarray.index)}];	// 是陣列的話, 會走到for node.childNodes迴圈, 但基礎型別不會有property宣告, 所以直接給一個空陣列
		}
	}
	else {	// 非System.開頭的類型即為自訂型別
		var elemProp = SOAPClient._getPropertyFromWMI(node.nodeName, wmi);
		console.log("elemProp = ", elemProp);
		if(!elemProp)
			throw new Error("<" + node.nodeName + ">為自訂型別'" + elemType + "'卻未定義property, 無法處理其子欄位項目");
	}
	// object node
	if(!isarray)
	{
		var obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++) {
			var p = SOAPClient._node2objectWithWMI(node.childNodes[i], elemProp);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	// list node
	else
	{
		// create node ref
		var l = new Array();
		for(var i = 0; i < node.childNodes.length; i++) {
			l[l.length] = SOAPClient._node2objectWithWMI(node.childNodes[i], elemProp);
		}
		return l;
	}
	return null;
}
SOAPClient._extractValueWithWMI = function(node, wmi)
{
	var elemType = SOAPClient._getTypeFromWMI(node.parentNode.nodeName, wmi);
	return SOAPClient._translateValueWithType(node.nodeValue, elemType);
}
SOAPClient._getTypeFromWMI = function(elementname, wmi)
{
	if(Array.isArray(wmi)) {	// wmi是property array
		for(var i=0, n=wmi.length; i<n; i++) {
			if(wmi[i].name == elementname)
				return wmi[i].type;
		}
		return null;
	}
	else if(!!wmi.type)
		return wmi.type;
	return wmi.ReturnType.Type;
}
SOAPClient._getPropertyFromWMI = function(elementname, wmi)
{
	if(Array.isArray(wmi)) {	// wmi是property array
		for(var i=0, n=wmi.length; i<n; i++) {
			if(wmi[i].name == elementname)
				return wmi[i].property;
		}
		return null;
	}
	return wmi.property;
}
SOAPClient._translateValueWithType = function(value, elemType) {
	switch(elemType) {
		case "System.String":
			return (value != null) ? value + "" : "";
		case "System.Boolean":
			return value+"" == "true";
		case "System.Int16":
		case "System.Int32":
		case "System.Int64":
			return (value != null) ? parseInt(value + "", 10) : 0;
		case "System.Double":
			return (value != null) ? parseFloat(value + "") : 0;
		case "System.DateTime":
			if(value == null)
				return null;
			else {
				value = value + "";
				value = value.substring(0, value.lastIndexOf("."));
				value = value.replace(/T/gi," ");
				value = value.replace(/-/gi,"/");
				var d = new Date();
				d.setTime(Date.parse(value));
				return d;
			}
		default:
			console.error("無法識別的基礎型別'" + elemType + "', 改以字串型態方式處理...");
			return (value != null) ? value + "" : "";
	}
}
//1091118	Leslie[1080943]	[搬移]由RD-soapclient搬移整段WSDL修改功能至此	--END--

///1110818 Kevin 1101532 新增背景主題
function jf_ColorSwitchClick(argName, argBodyColor, argToolColor)
{
	$('.ColorSwitch').css("border-color", "white");
	$('#ColorSwitch' + argName).css("border-color", "red");
	
	//1110902	Leslie	當頁面有特殊要求而設定底色時，不隨設定調整
	if($('body').attr('bgColor') == '' || $('body').attr('bgColor') == undefined)
	$('BODY').css("background", argBodyColor);
	$("input[type='submit'], .BannerBtn , .V2_GenericBannerToolBar, .V3_GenericBannerToolBar, .footStatus ,#btAddFile").css("background-color", argToolColor);
		
	localStorage.webform_color=argName;
	//1120508	Leslie	增加存一份去cookie，以支援在GCB環境仍有機保留使用者設定
	jf_SaveCookie("webform_color",argName);
}