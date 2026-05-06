/*
 *	watermark.js jQuery plugin
 *	Watermarked images with javascript and htmlcanvas	
 *
 *  2017.6.14 - Eric Peng modified for UniView watermark display/print
 *
 *	author: Patrick Wied ( http://www.patrick-wied.at )
 *	version: 1.0
 *	license: MIT - feel free to use, modify, redistribute
 *	http://letmein.at/software/how-to-correctly-use-code-you-didnt-write/
 */

(function($){
	/*
	 Util functions
	 */

	// 計算浮水印顯示區域
	function _calcAspectRatioRect(rcWindow, imgWidth, imgHeight) {
		var rcAspectRatio = $.extend({}, rcWindow);
		var szWindow = { cx:Math.abs(rcWindow.right-rcWindow.left), cy:Math.abs(rcWindow.bottom-rcWindow.top)};

		var nShrink=0, nTargetWidth=0, nTargetHeight=0;
		var ratio = 1;
		if (imgWidth>szWindow.cx) {
			// 暫定寬度
			nTargetWidth = szWindow.cx; 

			// 縮放比
			ratio = (szWindow.cx / imgWidth);

			// 暫定高度
			nTargetHeight = imgHeight * ratio;

			if (nTargetHeight>szWindow.cy) {
				// 暫定高度超過->szWinodw.cy為最終高度
				ratio = (szWindow.cy / imgHeight);

				nTargetWidth = imgWidth * ratio;
				nTargetHeight = szWindow.cy;
			}
		}
		else if (imgHeight>szWindow.cy) {
			// 暫定高度
			nTargetHeight = szWindow.cy; 

			// 縮放比
			ratio = (szWindow.cy / imgHeight);

			// 暫定寬度
			nTargetWidth = imgWidth * ratio;

			if (nTargetWidth>szWindow.cx) {
				// 暫定寬度超過->szWinodw.cx為最終寬度
				ratio = (szWindow.cx / imgWidth);

				nTargetHeight = imgHeight * ratio;
				nTargetWidth = szWindow.cx;
			}
		}
		else {
			// imgWidth/imgHeight皆小於或等於szWindow
			nTargetHeight = imgHeight;
			nTargetWidth = imgWidth;
		}

		var left = rcWindow.left + ((szWindow.cx - nTargetWidth)/2);
		var top = rcWindow.top + ((szWindow.cy - nTargetHeight)/2);
		return {'left':left, 'top':top, 'right':(left+nTargetWidth), 'bottom':(top+nTargetHeight)};


		/*if (szWindow.cx >= szWindow.cy) {
			nTargetWidth = (szWindow.cy * (imgWidth / imgHeight));
			if (szWindow.cx >= nTargetWidth) {	// Shrink window in X direction
				nShrink = (szWindow.cx - nTargetWidth)/2 + 1;
				rcAspectRatio.left += (nShrink/2);
				rcAspectRatio.right -= (nShrink/2);
			}
			else {								// Shrink window in Y direction
				nTargetHeight = (szWindow.cx * (imgHeight / imgWidth));
				nShrink = (szWindow.cy - nTargetHeight)/2 + 1;
				rcAspectRatio.top += (nShrink/2);
				rcAspectRatio.bottom -= (nShrink/2);
			}
		}
		else {
			nTargetHeight = (szWindow.cx * (imgHeight / imgWidth));
			if (szWindow.cy >= nTargetHeight) {	// Shrink window in Y direction
				nShrink = (szWindow.cy - nTargetHeight)/2+1;
				rcAspectRatio.top += (nShrink/2);
				rcAspectRatio.bottom -= (nShrink/2);
			}
			else {								// Shrink window in X direction
				nTargetWidth = (szWindow.cy * (imgWidth / imgHeight));
				nShrink = (szWindow.cx - nTargetWidth)/2+1;
				rcAspectRatio.left += (nShrink/2);
				rcAspectRatio.right -= (nShrink/2);
			}
		}
		return rcAspectRatio;*/
	}

	function _testCalcAspect() {
		var rc1 = {left:0, top:0, right:300, bottom: 200};
		var szWnd1 = {cx:300, cy:800};
		var rsltRect1 = _calcAspectRatioRect(rc1, szWnd1.cx, szWnd1.cy);
		var w_rslt1 = rsltRect1.right - rsltRect1.left;
		var h_rslt1 = rsltRect1.bottom - rsltRect1.top;
		if (w_rslt1>rc1.right || h_rslt1>rc1.bottom) {
			console.log('ERROR! rslt1 with error!')
		}

		var rc2 = {left:0, top:0, right:300, bottom: 200};
		var szWnd2 = {cx:600, cy:200};
		var rsltRect2 = _calcAspectRatioRect(rc2, szWnd2.cx, szWnd2.cy);
		var w_rslt2 = rsltRect2.right - rsltRect2.left;
		var h_rslt2 = rsltRect2.bottom - rsltRect2.top;
		if (w_rslt2>rc2.right || h_rslt2>rc2.bottom) {
			console.log('ERROR! test 2 with error!')
		}

		var rc3 = {left:0, top:0, right:300, bottom: 200};
		var szWnd3 = {cx:100, cy:150};
		var rsltRect3 = _calcAspectRatioRect(rc3, szWnd3.cx, szWnd3.cy);
		var w_rslt3 = rsltRect3.right - rsltRect3.left;
		var h_rslt3 = rsltRect3.bottom - rsltRect3.top;
		if (w_rslt3>rc3.right || h_rslt3>rc3.bottom) {
			console.log('ERROR! test 3 with error!')
		}
	}

	$.fn.watermark = function(cfg){
		var doc = this,
		gcanvas = {},
		gctx = {},
		imgQueue = [], // 2017.6.29 - 目前實作, 一次只能處理一個, 故array內只能放一個<img> element
		className = "watermark",
		watermark = null,
		watermarkPosition = "bottom-right", // vertical: top/middle/bottom, horizontal: left, center, rigth, default: bottom-right
		watermarkPath = "watermark.png?"+(+(new Date())),
		opacity = (255/(100/25)), // default: 25%
		watermarkSize = 0.8; // 
		callback = null,
		fwmSettings = null,
		userInfo  = null,
		imgDPI = 300,
		theApp = null,
		forceWaterMark = false,
		initCanvas = function(){
			if ($('canvas#wm_canvas').length===0) {
				gcanvas = $('<canvas id="wm_canvas" style="display:none"></canvas>');
				gctx = gcanvas[0].getContext("2d");
				$('body').append(gcanvas);
			}
			else {
				gcanvas = $('canvas#wm_canvas');
				gctx = gcanvas[0].getContext("2d");
			}
		},
		initWatermark = function(_fForceWaterMark){
			var createNew = true;
			if (_fForceWaterMark && !!theApp && theApp.wmIMG) {
				watermark = theApp.wmIMG;
				createNew = false;
			}

			if (createNew) {
				watermark = $('<img src="'+watermarkPath+'" />');
				if (_fForceWaterMark && !!theApp) {
					theApp.wmIMG = watermark;
				}

				if (opacity != 255){
					if (!watermark[0].complete) {
						watermark[0].onload = function() {	
							applyTransparency();
						};
					}
					else {
						applyTransparency();
					}
				}
				else {
					applyWatermarks();
				}
			}
			else {
				applyWatermarks();
			}
		},
		// function for applying transparency to the watermark
		applyTransparency = function(){
			var w = watermark[0].width || watermark[0].offsetWidth,
			h = watermark[0].height || watermark[0].offsetHeight;
			
			setCanvasSize(w, h);
			gctx.drawImage(watermark[0], 0, 0);
					
			var image = gctx.getImageData(0, 0, w, h);
			var imageData = image.data,
			length = imageData.length;
			for(var i=3; i < length; i+=4){  
				imageData[i] = (imageData[i]<opacity)?imageData[i]:opacity;
			}
			image.data = imageData;
			gctx.putImageData(image, 0, 0);

			watermark[0].onload = null;
			watermark.attr("src", "");
			watermark.attr("src", gcanvas[0].toDataURL());
			// assign img attributes to the transparent watermark
			// because browsers recalculation doesn't work as fast as needed
			watermark.width(w);
			watermark.height(h);

			applyWatermarks();
		},
		/*  列印單位/人員姓名及時間資訊!
			userInfo: OUName, UserName => 單位,人員姓名
			fontInfo: fontSize, fontName => 字型名稱及大小
			blendLevel: 透明度(0-100)
			textNoWrap: 文字是否斷行
			w_img: 影像寬度
			h_img: 影像高度
			dpi: 影像DPI
		 */
		getTextWatermark = function(_userInfo, fontInfo, blendLevel, printDate, textNoWrap, w_img, h_img, dpi) {
			function _getEMSize(elem) {
				return Number(getComputedStyle(elem[0], "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
			}
			// 取(單行)文字高度
			function _getTextHeight(font) {
				var text = $('<span>田疊Hg</span>').css({ fontFamily: font });
				var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

				var div = $('<div></div>');
				div.append(text, block);

				var body = $('body');
				body.append(div);

				try {
					var result = {};

					block.css({ verticalAlign: 'baseline' });
					result.ascent = block.offset().top - text.offset().top;

					block.css({ verticalAlign: 'bottom' });
					result.height = block.offset().top - text.offset().top;

					result.descent = result.height - result.ascent;

				} finally {
					div.remove();
				}

				return result;
			}

			// 輸出文字圖案:
			//   top_text
			//   price_int, price_float
			var _dfd = $.Deferred();
			
			var
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			cx = 0,
			cy = 0,
			emSize = _getEMSize(gcanvas),
			printDate = (typeof printDate==='boolean')?printDate:true;
			blendLevel = (typeof blendLevel==='number' && blendLevel>=0 && blendLevel<=255)?blendLevel:0;

			var fontSize = Math.floor(fontInfo.fontSize * dpi / 96);
			var _font = fontSize + 'px ' + fontInfo.fontName;
			
			var date = new Date();
			var line1 = (typeof fwmSettings.TextPrefix=='string' && fwmSettings.TextPrefix.length)?fwmSettings.TextPrefix:'';
			var line2 = '';
			// 1090831 Raymond 1090529 新增信保基金的文字浮水印邏輯
			if(_userInfo.OrgNickName == "SMEG") {
				if (line1.length) {
					line1 += ' ';
				}
				line1 += _userInfo.OUName + '　' + _userInfo.UserId + '　' + (_userInfo.UserTitle || "[USER_TITLE]");

				var sDate = SSOUtil.padLeft(date.getFullYear()-1911, 3) + '/' + SSOUtil.padLeft(date.getMonth()+1, 2) + '/' +  SSOUtil.padLeft(date.getDate(), 2) +
							 ' ' + SSOUtil.padLeft(date.getHours(), 2) + ':' + SSOUtil.padLeft(date.getMinutes(), 2);

				if(fwmSettings.TextNoWrap == true)	// 設定不折行
					line1 += ('　' + sDate + '　' + (_userInfo.ClientIP || "000.000.000.000"));
				else
					line2 = sDate + '　' + (_userInfo.ClientIP || "000.000.000.000");
			}
			// 1120601	Leslie[1120071]	考試院專用文字浮水印邏輯
			else if(_userInfo.OrgNickName == "EXAM"){
				if (line1.length) {
					line1 += ' ';
				}
				line1 += _userInfo.UserId + '　' ;

				var sDate = SSOUtil.padLeft(date.getFullYear()-1911, 3) + '/' + SSOUtil.padLeft(date.getMonth()+1, 2) + '/' +  SSOUtil.padLeft(date.getDate(), 2) +
							 ' ' + SSOUtil.padLeft(date.getHours(), 2) + ':' + SSOUtil.padLeft(date.getMinutes(), 2);
				line1 += ('　' + sDate + '　' + (_userInfo.ClientIP || "000.000.000.000"));
			}
			// 1140513 Raymond 1140779 新增判斷機關暱稱為MOCS(銓敘部)時, 文字浮水印(單位、職稱、姓名、帳號、時間、IP)全都不要顯示
			else if(_userInfo.OrgNickName == "MOCS") {
				line1 = " ";
			}
			else
			if (printDate) {
				if (line1.length) {
					line1 += ' ';
				}
				// 1100623 Raymond 1100780 一般機關再新增職稱、帳號、IP欄位資訊
				//line1 += _userInfo.OUName + '　' + _userInfo.UserName;
				// 1120119 Raymond 銓敘部序102 銓敘部不顯示帳號
				if(_userInfo.OrgNickName == "MOCS")
					line1 += _userInfo.OUName + '　' + (_userInfo.UserTitle || "[USER_TITLE]") + '　' + _userInfo.UserName;
				else
				line1 += _userInfo.OUName + '　' + (_userInfo.UserTitle || "[USER_TITLE]") + '　' + _userInfo.UserName + '　' + _userInfo.UserId;

				var sDate = SSOUtil.padLeft(date.getFullYear()-1911, 3) + '/' + SSOUtil.padLeft(date.getMonth()+1, 2) + '/' +  SSOUtil.padLeft(date.getDate(), 2) +
						     ' ' + SSOUtil.padLeft(date.getHours(), 2) + ':' + SSOUtil.padLeft(date.getMinutes(), 2);

				if (textNoWrap) {
					// 1100623 Raymond 1100780 一般機關再新增職稱、帳號、IP欄位資訊
					//line1 += '　' + sDate;
					line1 += '　' + sDate + '　' + (_userInfo.ClientIP || "000.000.000.000");
				}
				else {
					// 1100623 Raymond 1100780 一般機關再新增職稱、帳號、IP欄位資訊
					//line2 = sDate;
					line2 = sDate + '　' + (_userInfo.ClientIP || "000.000.000.000");
				}
			}
			else {
				if (line1.length) {
					line1 += ' ';
				}
				// 1100623 Raymond 1100780 一般機關再新增職稱、帳號、IP欄位資訊
				//line1 += _userInfo.OUName;
				line1 += _userInfo.OUName + '　' + (_userInfo.UserTitle || "[USER_TITLE]");
				if (textNoWrap) {
					// 1100623 Raymond 1100780 一般機關再新增職稱、帳號、IP欄位資訊
					//line1 += _userInfo.UserName;
					// 1120119 Raymond 銓敘部序102 銓敘部不顯示帳號
					if(_userInfo.OrgNickName == "MOCS")
						line1 += '　' + _userInfo.UserName + '　' + (_userInfo.ClientIP || "000.000.000.000");
					else
					line1 += '　' + _userInfo.UserName + '　' + _userInfo.UserId + '　' + (_userInfo.ClientIP || "000.000.000.000");
				}
				else {
					// 1100623 Raymond 1100780 一般機關再新增職稱、帳號、IP欄位資訊
					//line2 = _userInfo.UserName;
					// 1120119 Raymond 銓敘部序102 銓敘部不顯示帳號
					if(_userInfo.OrgNickName == "MOCS")
						line2 = _userInfo.UserName + '　' + (_userInfo.ClientIP || "000.000.000.000");
					else
					line2 = _userInfo.UserName + '　' + _userInfo.UserId + '　' + (_userInfo.ClientIP || "000.000.000.000");
				}
			}

			// 計算文字區塊高/寬
			var w_text=0, h_text=0, h_line1=0, h_line2=0;

			ctx.font = _font;
			var w_text = ctx.measureText(line1).width;
			var h_text = fontSize; //_getTextHeight(_font).height;
			var h_line1 = h_text;			
			if (line2.length) {
				ctx.font = _font;
				szText = ctx.measureText(line2);
				if (szText.width>w_text) {
					w_text = szText.width;
				}
				h_text *= 2;
				h_line2 = fontSize;
			}

			canvas.width = w_text;
			canvas.height = h_text;
			
			// 畫出第一行文字
			_cntLine = 1;
			ctx.font = _font;
			ctx.textAlign = 'left';
			ctx.fillStyle = '#000000';
			ctx.textBaseline = 'top';
			ctx.fillText(line1, 0, 0);

			// 畫出第二行文字
			if (line2.length) {
				_cntLine++;
				ctx.font = _font;
				ctx.textAlign = 'left';
				ctx.fillStyle = '#000000';
				ctx.textBaseline = 'top';
				ctx.fillText(line2, 0, h_line1);
			}

			if (blendLevel!==0) {
				var _opacity = (255/(100/blendLevel));
				if (_opacity!==255) {
					var image = ctx.getImageData(0, 0, w_text, h_text);
					var imageData = image.data,
					length = imageData.length;
					for(var i=3; i < length; i+=4){  
						imageData[i] = (imageData[i]<_opacity)?imageData[i]:_opacity;
					}
					image.data = imageData;
					ctx.putImageData(image, 0, 0);
				}
			}
			
			var lm = fwmSettings.LeftMargin * dpi / 25.6;
			var bm = fwmSettings.BottomMargin * dpi / 25.6;
			var wmText = new Image();
			wmText.onload = function(event) {
				_dfd.resolve({'wmText':wmText, 'dataUrl':canvas.toDataURL(), cntLine: _cntLine});
			};
			wmText.onerror = function(e){
				_dfd.reject({success:false, errMsg:e.message});
				$canvasOrg.remove();
				$canvasResize.remove();
			};

			wmText.src = canvas.toDataURL();
			return _dfd.promise();
		},
		configure = function(config){
			if (config) {
				if(config["watermark"])
					watermark = config["watermark"];
				if(config["path"])
					watermarkPath = config["path"];
				if(config["position"])
					watermarkPosition = config["position"];
				if(config["opacity"])
					opacity = (255/(100/config["opacity"]));
				if(config["className"])
					className = config["className"];

				// 2017.6.15 - Eric Peng, added for ForceWaterMark functions
				if (config["forceWaterMark"]) {
					var forceWaterMark = config["forceWaterMark"];
					if (typeof forceWaterMark=='boolean' && forceWaterMark===true) {
						theApp = (typeof config["theApp"]=='object')?config["theApp"]:null;
					}
				}

				if(config["callback"])
					callback = config["callback"];

				if (config["settings"]) { // settings: fwmSetting, 'dpi': dpi
					fwmSettings = config["settings"];
					if (typeof fwmSettings.ImageBlendLevel=='number' && (fwmSettings.ImageBlendLevel>=0) && (fwmSettings.ImageBlendLevel<=100)) {
						opacity = (255/(100/fwmSettings.ImageBlendLevel));
					}
				}

				if (config["userInfo"]) {
					userInfo = config["userInfo"];
				}

				if (typeof config["dpi"] == "number" && config["dpi"]) {
					var dpi = config["dpi"];
					if (!isNaN(dpi)) {
				   		imgDPI = dpi;
					}
				}
			}

			initCanvas();
			initWatermark(forceWaterMark);

			// verify settings/parameters
			if (typeof fwmSettings=='undefined' || fwmSettings===null) {
				theLogger.log('無效的強制性浮水印列印設定!');
				return false;
			}
			if (typeof userInfo==='objec') {
				if (typeof userInfo.OUName!=='string' || userInfo.OUName.length===0 ||
					typeof userInfo.UserName!=='string' || userInfo.UserName.length===0) {
					theLogger.log('無效的單位/使用者資訊!');
					return false;
				}
			}

			return true;
		}
		setCanvasSize = function(w, h){
			gcanvas[0].width = w;
			gcanvas[0].height = h;
		},
		applyWatermark = function(img){
			function _resizeWaterMarkImage(watermark, w, h) {
				var _dfd = $.Deferred();

				var $canvasOrg = $('<canvas class="forCopy" style="display:none"></canvas>');
				var $canvasResize = $('<canvas class="forRslt" style="display:none"></canvas>');
				var ctxResize = $canvasResize[0].getContext("2d");
				$('body').append($canvasOrg);
				$('body').append($canvasResize);

				$canvasOrg[0].width = watermark.width;
				$canvasOrg[0].height = watermark.height;
				$canvasOrg[0].getContext('2d').drawImage(watermark, 0, 0);
				var wmOrgDataUrl = $canvasOrg[0].toDataURL();

				$canvasResize[0].width = w;
				$canvasResize[0].height = h;
				ctxResize.drawImage(watermark, 0, 0, watermark.width, watermark.height, 0, 0, w, h)

				var wmResizeDataUrl = $canvasResize[0].toDataURL();
				var wmResize = new Image();
				wmResize.onload = function(event) {
					_dfd.resolve({'wmResize':wmResize, 'dataUrl':wmResizeDataUrl, 'orgDataUrl':wmOrgDataUrl});
					$canvasOrg.remove();
					$canvasResize.remove();
				};
				wmResize.onerror = function(e){
					_dfd.reject({success:false, errMsg:e.message});
					$canvasOrg.remove();
					$canvasResize.remove();
				};
				wmResize.src = wmResizeDataUrl;
				return _dfd.promise();
			}

			setCanvasSize(img[0].width || img[0].offsetWidth, img[0].height || img[0].offsetHeight);
			gctx.drawImage(img[0], 0, 0);

			var position = watermarkPosition, x = 0, y = 0;
			// 2017.8.16 - for 成大 (置於可列印區最上方)
			if (fwmSettings.VertAlign=='top') {
				var idxDash = position.indexOf('-');
				var posVert=fwmSettings.VertAlign, posHorz='';
				posHorz=position.substring(idxDash+1);
				position = posVert + '-' + posHorz;
			}

			if(position.indexOf("top")!=-1) {
				y = 10;
			}
			else if (position.indexOf('middle')!=-1) {
				y = (gcanvas.height()-watermark.height())/2;
			}
			else {
				y = gcanvas.height()-watermark.height()-10;
			}
			
			if(position.indexOf("left")!=-1) {
				x = 10;
			}
			else if (position.indexOf('center')!=-1) {
				x = (gcanvas.width()-watermark.width())/2;
			}
			else {
				x = gcanvas.width()-watermark.width()-10;
			}

			if (watermarkSize==0) {
				gctx.drawImage(watermark[0], x, y);

				// 印出單位/人員姓名
				if (typeof userInfo=='object' && userInfo!==null) {
					var printDate = true;
					var fontInfo = {fontSize:fwmSettings.TextSize, fontName:fwmSettings.TextFont};
					getTextWatermark(userInfo, fontInfo, fwmSettings.TextBlendLevel, printDate, fwmSettings.TextNoWrap, w_img, h_img, _imgDPI)	
					.done(function(rsltWMText) {
						// rslt = {'wmText':wmText, 'dataUrl':canvas.toDataURL()};
						var h_line = rsltWMText.wmText.height / rsltWMText.cntLine;
						var _x = (2 * h_line), _y = h_img - (2 * h_line);
						gctx.drawImage(rsltWMText.wmText, _x, _y);

						var $textInfo = $('img#wmText');
						if ($textInfo.length) {
							$textInfo[0].src = rsltWMText.dataUrl;
							$textInfo.parent().find('span.imgInfo').text('textWM: w=' + rsltWMText.wmText.width + ', h=' + rsltWMText.wmText.height + 
								'left=' + _x + ', top=' + _y);
						}

						img[0].onload = null;
						img.off('load');
						img.attr("src", gcanvas[0].toDataURL());
						if (typeof callback=='function') {
							callback({success:true, 'img':$(img[0]), 'imgStr': gcanvas[0].toDataURL(), naturalWidth:w_img, naturalHeight:h_img});
						}
					})
					.fail(function(rslt) {
						img[0].onload = null;
						img.off('load');
						if (typeof callback=='function') {
							callback({success:false, 'errMsg':rslt.errMsg, 'img': null,  naturalWidth:0, naturalHeight:0});
						}
					});
				}
				else {
					img[0].onload = null;
					img.off('load');
					img.attr("src", gcanvas[0].toDataURL());
					if (typeof callback=='function') {
						callback({success:true, 'img':$(img[0]), 'imgStr': gcanvas[0].toDataURL(), naturalWidth:w_img, naturalHeight:h_img});
					}
				}
			}
			else {
				var _imgDPI = imgDPI;
				var w_img = img[0].width;
				var h_img = img[0].height;
				// 1100624 Raymond 1100780 修正紙本調閱可能影像為200dpi, 寬高小於300dpi下的A4大小, 字型大小及位置以300dpi計算而顯得太大而超出範圍的問題
				if(w_img < h_img && w_img < 2480 && h_img < 3570) {
					theLogger.log("影像寬高小於300dpi下的A4大小, 重新計算dpi...");
					_imgDPI = Math.ceil(w_img / 2480 * 300);
					theLogger.log(_imgDPI);
				}
				else if(w_img > h_img && w_img < 3570 && h_img < 2480) {	// 影像是橫式的
					theLogger.log("影像寬高小於300dpi下的A4大小, 重新計算dpi...");
					_imgDPI = Math.ceil(h_img / 2480 * 300);
					theLogger.log(_imgDPI);
				}

				var w_wm = fwmSettings.ImageWidth * _imgDPI / 25.4;
				var h_wm = fwmSettings.ImageHeight * _imgDPI / 25.4;
				var lm=0, tm=0, rm=0, bm=0; // margins
				lm = fwmSettings.LeftMargin * _imgDPI / 25.4;
				tm = fwmSettings.TopMargin * _imgDPI / 25.4;
				rm = fwmSettings.RightMargin * _imgDPI / 25.4;
				bm = fwmSettings.BottomMargin * _imgDPI / 25.4;

				var w_valid = w_img - lm - rm;
				var h_valid = h_img - tm - bm;

				var paintRect = {
					left: lm, top: tm, 
					right: lm+w_wm, bottom: tm+h_wm
				};

				if (w_wm > w_valid || h_wm > h_valid) {
					paintRect = _calcAspectRatioRect({left:lm, top:tm, right:(w_img-rm), bottom:(h_img-bm)}, w_wm, h_wm);
					w_wm = paintRect.right - paintRect.left;
					h_wm = paintRect.bottom - paintRect.top;
				}
				
				paintRect.left = lm + ((w_valid-w_wm) / 2);
				paintRect.right = paintRect.left + w_wm;

				// 2017.8.16 - 靠上對齊(for成大)
				if (fwmSettings.VertAlign=='top') {
					paintRect.top = tm;
					paintRect.bottom = paintRect.top + h_wm;
				}
				else {
					paintRect.top = tm + ((h_valid-h_wm) / 2);
					paintRect.bottom = paintRect.top + h_wm;
				}

				// 測試_calcAspectRationRect
				//_testCalcAspect();
				
				_resizeWaterMarkImage(watermark[0], w_wm, h_wm)
				.done(function(rslt){
					//x = (gcanvas.width()-rslt.wmResize.width)/2;
					//y = (gcanvas.height()-rslt.wmResize.height)/2;
					x = paintRect.left;
					y = paintRect.top;
					gctx.drawImage(rslt.wmResize, x, y);

					if ($('#wmForMerge').length) {
						$('#wmForMerge')[0].src = rslt.dataUrl;
						$($('#wmForMerge')[0]).parent().find('span.imgInfo').text('[For Merge] w=' + rslt.wmResize.width + ', h=' + rslt.wmResize.height);

						$('#wmOrg')[0].src = rslt.orgDataUrl;
						$($('#wmOrg')[0]).parent().find('span.imgInfo').text('w=' + watermark[0].width + ', h=' + watermark[0].height + '\r\n[Org]');
					}

					// 顯示調閱/列印人員的單位,姓名及時間資訊
					if (typeof userInfo=='object' && userInfo!==null) {
						var printDate = true;
						var fontInfo = {fontSize:fwmSettings.TextSize, fontName:fwmSettings.TextFont};
						getTextWatermark(userInfo, fontInfo, fwmSettings.TextBlendLevel, printDate, fwmSettings.TextNoWrap, w_img, h_img, _imgDPI)	
						.done(function(rsltWMText) {
							// rslt = {'wmText':wmText, 'dataUrl':canvas.toDataURL()};
							var h_line = rsltWMText.wmText.height / rsltWMText.cntLine;
							var _x = lm, _y = h_img - bm - h_line;
							// 1090831 Raymond 1090529 新增信保基金的文字浮水印邏輯, 不管頁面影像橫直向都向右轉90度在寬度1/3、2/3處畫浮水印
							if(userInfo.OrgNickName == "SMEG") {
								gctx.save();
								gctx.translate(w_img, 0);
								gctx.rotate(0.5 * Math.PI);
								_x = (h_img - rsltWMText.wmText.width) / 2;	// 上邊界是旋轉90度的x軸座標
								_y = Math.ceil(w_img / 3);	// 第1行y軸座標是1/3寬度處
								gctx.drawImage(rsltWMText.wmText, _x, _y);
								_y = Math.ceil(w_img * 2 / 3);	// 第2行y軸座標是2/3寬度處
								gctx.drawImage(rsltWMText.wmText, _x, _y);
								gctx.restore();
							}
							else
							gctx.drawImage(rsltWMText.wmText, _x, _y);

							var $textInfo = $('img#wmText');
							if ($textInfo.length) {
								$textInfo[0].src = rsltWMText.dataUrl;
								$textInfo.parent().find('span.imgInfo').text('textWM: w=' + rsltWMText.wmText.width + ', h=' + rsltWMText.wmText.height + 
									'left=' + _x + ', top=' + _y);
							}

							img[0].onload = null;
							img.off('load');
							img.attr("src", gcanvas[0].toDataURL());
							if (typeof callback=='function') {
								callback({success:true, 'img':$(img[0]), 'imgStr': gcanvas[0].toDataURL(), naturalWidth:w_img, naturalHeight:h_img});
							}
						})
						.fail(function(rslt) {
							img[0].onload = null;
							img.off('load');
							if (typeof callback=='function') {
								callback({success:false, 'errMsg':rslt.errMsg, naturalWidth:0, naturalHeight:0});
							}
						});
					}
					else {
						img[0].onload = null;
						img.off('load');
						img.attr("src", gcanvas[0].toDataURL());
						if (typeof callback=='function') {
							callback({success:true, 'img':$(img[0]), 'imgStr': gcanvas[0].toDataURL(), naturalWidth:w_img, naturalHeight:h_img});
						}
					}
				})
				.fail(function(){
					img[0].onload = null;
					img.off('load');
					img.attr("src", '');
					if (typeof callback=='function') {
						callback({success:false, errMsg:'WMProc resizeWaterMarkImage', naturalWidth:0, naturalHeight:0})
					}
				});
			}
		},
		applyWatermarks = function(){
			setTimeout(function(){
				var els;
				if (imgQueue.length) {
					els = $(imgQueue[0]);
				}
				else {
					els = $('.'+className);
				}

				els.each(function(){
					var img = $(this);
					if(img[0].tagName.toUpperCase() != "IMG")
						return;
					
					// 1100624 Raymond 1100780 修正IE的<img>未設定src時, complete會一直都是false, 導致未applyWatermark的問題
					//if(!img[0].complete){
					if(!img[0].complete && !!img[0].getAttribute("src")){
						img[0].onload = function(){
							applyWatermark(img);
						};
					}else{
						applyWatermark(img);
					}
				});
			},10);
		};

		if ($(this).is('img')) {
			imgQueue.push(this);
		}
		configure(cfg);
	};
})(jQuery);