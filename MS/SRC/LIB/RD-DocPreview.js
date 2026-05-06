/* jshint -W100 */

//
// mDocPreview.js - 實作預覽公文功能
//
// 1080923  1080339     Kevin   Eric    jQuery 3.0 upgrade

var _debug_no_open_folio = false;

// Demo測試用 - 實際可開啟的公文文號
var availableDocNo = ['1000001001', '1000001008'];

/*
 可載入預覽影像的測試公文
 */
var _exValidDocNo = ['1000001001', '1000001008', '1000000014', '1000000308', '0970200395'];

(function($){
	//
	//  預覽公文物件
	//  { docNo:"101xxxxxx", indxe: 0}, index ->索引值(佔用哪一個folio_content)
	//
	var previewDocList = []; // 已開啟的預覽公文清單
	var UVPreviewDocList = []; // for 公文檢索預覽
	
	var $_container = null;
	var $_pageContainer = null;
		
	var _sliderCurrentIndex = -1;
	var _sliderPreviousIndex = -1;
	//var _slider_count = 0;
	var _sliderWidth = 450; // 公文預覽頁面寬度
	var _sliderDuration = 500; // 切換頁面的動畫時間
	var _maxSliderCount = 5; // 預設最多5個預覽頁
	
	//var _currentPreviewCount = 0;
	//var _maxPreviewCount = 5;
	
	// using sn as true index
	//var _currentDisplaySN = '';
	//var _previousDisplaySN = '';
	
	function _initSlider($container, width) {
		var $pageContainer = $container.find('div.folio_content');
		if ($pageContainer.length<1) {
			theLogger.warn('-W- \'div.folio_content\' element not found.');
		}
		var $sliders = $container.find('div.flip_content');
		if ($sliders.length>0) {
			$sliders.remove();
		}
		
		$_container = $container;
		$_pageContainer = $pageContainer;
			
		if (!!width && (width>0)) {
			_sliderWidth = width;
		}
		
		_sliderCurrentIndex = -1;
		
		theLogger.log('Slider initialize, slider count=' + previewDocList.length + ', currentIndex=' + _sliderCurrentIndex);
	}
	/* 切換顯示的預覽頁
	 */
	function _doSlide(next) {
		function _findHTMLElem(docObj) {
			var $sliders = $_pageContainer.find('div.flip_content');
			var length = $sliders.length;
			var idx = 0, $slider;
			for (idx=0; idx<length; idx++) {
				$slider = $($sliders[idx]);
				if ($slider.attr('data-msgid')===docObj.msgId) {
					if (docObj.isDraft) {
						if ($slider.attr('data-ICUser')===docObj.ICUserId)
							return $slider;
					}
					else {
						return $slider;
					}
				}
			}
			return null;
		}
		
		if (next<0 || next>=previewDocList.length || next==_sliderCurrentIndex) {
			return;
		}
		
		var inDoc = previewDocList[next];
		var outDoc = (_sliderCurrentIndex>=0) ? previewDocList[_sliderCurrentIndex] : null;
		if (inDoc===undefined || inDoc===null) {
			theLogger.warn('-W- invalid index, in=' + next + ', out=' + _sliderCurrentIndex + ' (DocObj)');
			return;
		}
				
		//var $in = $($_sliders[next]);
		//var $out = $($_sliders[_sliderCurrentIndex]);
		var $in = _findHTMLElem(inDoc);
		var $out = (outDoc!==null) ? _findHTMLElem(outDoc) : null;
		if ($in===undefined || $in===null) {
			theLogger.warn('-W- invalid index, in=' + next + ' (HTMLElem)');
			return;
		}
		
		var zIndex = 0;
		
		var in_left_before = 0;
		var out_left_after = 0;
		
		var dir = 'slide_left_out';
		var other_pos = -(_sliderWidth*2);
		
		// if 回上頁 -> 不異動內部頁面物件, 直接transition
		// 調整好內部頁面物件,將次頁置於目前顯示頁面的左(或右)側, 再執行transition
		if (next != _sliderPreviousIndex) {
			if (next > _sliderCurrentIndex) {
			   // 下一頁在右, 將指定之次頁置於右方後, 再往左邊slide.
			   in_left_before = _sliderWidth;
			   out_left_after = -_sliderWidth;
			}
			else {
				// 下一頁在左, 將指定之次頁置於右方後, 再往右邊slide.
				in_left_before = - _sliderWidth;
				out_left_after = _sliderWidth;
				dir = 'slide_right_out';
			}
			
			$in.css({'left': '' + in_left_before + 'px', 'z-index': previewDocList.length+2});
		}
		else {
			if (next > _sliderCurrentIndex) {
			   // 下一頁在右, 將指定之次頁置於右方後, 再往左邊slide.
			   in_left_before = _sliderWidth;
			   out_left_after = -_sliderWidth;
			}
			else {
				// 下一頁在左, 將指定之次頁置於右方後, 再往右邊slide.
				in_left_before = - _sliderWidth;
				out_left_after = _sliderWidth;
				dir = 'slide_right_out';
			}
		}
		
		// 改變index,讓次頁在最上面!
		$in.css({'opacity': 0, 'z-index': previewDocList.length+2});
		if (!!$out) {
			$out.css({'z-index': previewDocList.length+1});
		}
		
		theLogger.debug('$in left, before:' + $in.css('left') + ', after: 0px');
		
		// 移入次頁(+FadeIn效果)
		$in.animate({'left': '0px', 'opacity': 1}, _sliderDuration,
		//$in.animate({"left":"225px", "opacity":1}, _sliderDuration,  // 2012.12.3-切換到一半的效果
					function() {
						// callback here...
					});
		
		// 移出目前頁(+FadeOut效果)
		if (!!$out) {
			theLogger.debug('$out left, before:' + $out.css('left') + ', after:' + out_left_after);
			
			$out.animate({'left': '' + out_left_after + 'px', 'opacity': 0}, _sliderDuration,
			//$out.animate({"left":"-225px", "opacity":1}, _sliderDuration, // 2012.12.3-切換到一半的效果
					function() {
						// callback here...
					});	
		}
				
		_sliderPreviousIndex = _sliderCurrentIndex;
		_sliderCurrentIndex = next;
		
		var index = 1;
		var $sliders = $_pageContainer.find('.flip_content');
		for(var i=0;i<$sliders.length; i++) {
			if (i!=_sliderPreviousIndex && i!=_sliderCurrentIndex) {
				zIndex = index++;
				var $slide = $($sliders[i]);
				$slide.css({'left': '' + other_pos + 'px', 'z-index': zIndex});
			}
		}
		
		if (_sliderPreviousIndex>=0) {
			$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_btn_' + (_sliderPreviousIndex+1)).removeClass('selected');
		}
		
		/* 2016.4 - 功能鍵upate */
		if (inDoc.signType=='E') {
            $('#eDocPreviewPane .cmdForDoc .cmdSumitDocForPaper').hide();
        }
		else {
			$('#eDocPreviewPane .cmdForDoc .cmdSumitDocForPaper').show();
		}
		
	}
	/*
	 * 下方導覽按鈕[click]事件處理
	 */
	function _navButtonClicked(event) {
		$btn = $(event.currentTarget);
		
		var next = -1;
		if ($btn.hasClass('folio_btn_next')) {
			// next
			if (_sliderCurrentIndex<(previewDocList.length-1)) {
				next = _sliderCurrentIndex + 1;
			}
			else {
				return;
			}
			
		}
		else if ($btn.hasClass('folio_btn_prev')) {
			// previous
			if (_sliderCurrentIndex>0) {
				next = _sliderCurrentIndex - 1;
			}
			else {
				return;
			}
		}
		else {
			// 指定頁面
			var sIndex = $btn[0].innerText;
			next = parseInt(sIndex);
			if (next<=0 || next>previewDocList.length) {
				theLogger.warn('-W- next index:' + next + ' 超出頁面數[' + previewDocList.length + '] !');
				return;
			}
			next -= 1; // 0-based!
		}
		
		_doSlide(next);
		
		// highlight nav_button
		if (_sliderCurrentIndex>=0) {
			$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_btn_' + (_sliderCurrentIndex+1)).addClass('selected');
		}
	}

	// 是否為有效的線上簽核公文
	function _isValidPreviewDocNo(docno) {
		if (!_standalone) {
			var tdlBuilder = theSSO.MP.todolist.builder;
			var docObj = tdlBuilder.getDocByDocNo(docno);
			if (docObj!=null) {
				return true;
			}
		}
		else {
			var len = _exValidDocNo.length;
			for(var i=0; i<len; i++) {
				if (_exValidDocNo[i]==docno) {
					return true;
				}
			}
		}
		return false;
	}
	
	// 公文是否已在預覽清單?
	function _isDocPreviewing(docno, msgId, isDraft, ICUserId) {
		if (typeof isDraft == 'undefined')
			isDraft = false;
		if (typeof ICUserId == 'undefined')
			ICUserId = '';
			
		for(var i=0; i<previewDocList.length; i++)
		{
			var previewDoc = previewDocList[i];
			if (previewDoc.docNo==docno && previewDoc.msgId==msgId) {
				if (isDraft) {
					if (previewDoc.ICUserId == ICUserId)
						return true;
				}
				else {
					return true;
				}
			}
		}
		return false;
	}
	
	// 2012.12.12 - 預覽窗格狀態
	function _isPreviewPaneClosed(ctrlId, checkMethod) {
		// 2016.4
		// 垂直splitterbar在最右邊, 中間splitbarV方向向左 -> 預覽窗格未開啟!
		var pane_closed = true;
		if (!!checkMethod && checkMethod=='show_hide') {
            pane_closed = $(ctrlId).is(':visible') ? false : true;
        }
		else {
			pane_closed = $(ctrlId).hasClass('invert');
		}
		return pane_closed;
	}
	
	// 2012.12.12 - 開啟預覽窗格
	function _showPreviewPane(ctrlId, show) {
		//$(ctrlId).trigger('click'); // 2016.4
		if (show===true) {
			$_container.show();
		}
		else {
			$_container.hide();
		}
	}
	
	/* 產出預覽內容 DOM Elements */
	function _createElement(index, docNo, msgId, imgUrl, signType, isDraft, ICUserId) {
		/*<div class="folio_content"> <!-- for flip景深 -->
			<div data-index="0" class="flip_content"> <!-- 頁面container -->
			  <div class="page flip_side yellow-one"> <!-- 正面 -->
				<div class="page_inner"></div>
				<div class="docNo_left">1010000001-l</div>
				<div class="docNo_right">1010000001-r</div>
			  </div>
			</div>
		*/
		var sDocInfo = '文號：' + docNo;
		if (!!signType && signType=='P') {
            sDocInfo += ' [紙本]';
        }
		sDocInfo += ' (預覽)'; // 2016.5
		
		var elemTxt = '<div data-index="' + index + '" data-msgid="' + msgId + '" class="flip_content">' +
					  '<div class="page flip_side">' + 
						'<img class="page_inner" src="' + imgUrl + '"></img>' +
						'<div class="docNo_left">' + sDocInfo + '</div>' +
						'<div class="docNo_right" style="display:none;">' + docNo + '-r</div>' +
					  '</div>';
		
		var $elem = $(elemTxt);
		if (isDraft) {
			$elem.attr('data-draft', 'true');
			$elem.attr('data-ICUser', ICUserId)
		}
		return $elem;
	}
	
	function _loadDocPreview(docNo, msgId, isDraft, ICUser) {
		theLogger.debug('typeof docNo=' + typeof docNo + ', msgId=' + typeof msgId);
		
		if (typeof isDraft == 'undefined') {
			isDraft = false;
		}
		if (typeof ICUser == 'undefined') {
			ICUser = '';
		}
		
		var _btn_w = 20;
		var _btn_gap = 10;
		var _border = 5;
		
		var docObj = null;
		if (isDraft) {
			docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId, ICUser);
		}
		else {
			docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
		}
		
		var signType = docObj.signType; // 2016.4
		
		if (!isDraft && (!docNo || docNo.length===0)) {
			alert('_loadDocPreview(), 文號不可為空白');
			return;
		}
		
		var i=0, docIndex=-1;
		if (_isDocPreviewing(docNo, msgId, isDraft, ICUser)) {
			docIndex = -1;
			for(i=0; i<previewDocList.length; i++)
			{
				if (docNo == previewDocList[i].docNo && msgId == previewDocList[i].msgId) {
					if (isDraft) {
						if (previewDocList[i].ICUserId == ICUser) {
							docIndex = i;
							break;
						}
					}
					else {
						docIndex = i;
						break;
					}
				}
			}
			
			if (_sliderCurrentIndex!=docIndex) {
				_doSlide(docIndex);
				
				// highlight nav_button
				if (_sliderCurrentIndex>=0) {
					$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_btn_' + (_sliderCurrentIndex+1)).addClass('selected');
				}
			}
			return;
		}
		
		var $folioList = $_pageContainer.find("div.flip_content");
		
		var newIndex=-1;
		
		// 預覽影像檔名
		var pageFileName = 'default.png';
		
		//if (previewDocList.length<_maxSliderCount)
		{
			var _sampleDoc = false;
			for(i=0; i<_exValidDocNo.length; i++) {
				if (_exValidDocNo[i] == docNo) {
					validDoc = true;
					break;
				}
			}
			
			if (_sampleDoc) {
				pageFileName = docNo + ".png";
				alert("pageFileName=" + pageFileName);
			}
			
			// 下載預覽影像
			// 叫用WebFileIO取得ODWWKF-00.XML
			var fileIOWSUrl = docObj.fileIOWS;
			var fileStoragePath = docObj.fileStoragePath;
			var fileSubDir = docObj.fileSubDir;
			
			var dirPath = fileStoragePath + '\\' + fileSubDir;
			var fileName = 'preview.png';
			theLogger.log('preview image path=' + dirPath + ', filename=' + fileName);
			
			var pngImage = '';
			var wfio = new WebFileIO(fileIOWSUrl, docObj.ownUserId, localStorage.Artifact);
			wfio.download(dirPath, fileName, {
				async : false,
				success: function(fil, res) {
					if(fil !== undefined) {
						var imgData = fil;
						pngImage = imgData;

						if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            SSOUtil.dev_logTimeElapse('顯示預覽影像',  window.tmBeginIconOpenDoc);
                        }
					}
					else {
						theLogger.warn("-W- WebFileIO呼叫成功但夾檔資料未下載");
					}
				},
				error: function(errorText) {
					theLogger.error('-W- WebFileIO呼叫失敗, ErrMsg=' + errorText);
				}
			});
				
			// 未超出範圍, 直接在後面新增一個
			newIndex = previewDocList.length;
			var $folio, $page, $txtLeft, $txtRigth;
			var pageUrl = '';
			if (newIndex < $folioList.length) {
				$folio = $($folioList[newIndex]);
				$page = $folio.find(".page_inner");
				$txtLeft = $folio.find(".docNo_left");
				$txtRight = $folio.find(".docNo_right");
				
				$folio.attr('data-msgid', msgId);
				
				// 下載影像檔失敗, 取用預設的[無預覽影像]image
				if (pngImage.length==0) {
					$page.attr('src', './IMAGE/SSO/' + pageFileName);
				}
				else {
					$page.attr('src', pngImage);
				}
				
				var imgW = $page.attr('width');
				var imgH = $page.attr('height');
				
				var sDocInfo = '文號：' + docNo;
				if (docObj.signType=='P') {
                    sDocInfo += " [紙本]";
                }
				$txtLeft.text(sDocInfo);
				$txtRight.text(docNo + '-r');
				
				previewDocList.push({'docNo': docNo, 'msgId': msgId, 'index': newIndex, 'isDraft': isDraft, 'ICUserId': ICUser});
				//$_sliders = $folioCntr.find('div.flip_content'); // 2013.5 - update sliders count
				_doSlide(newIndex);
			}
			else {
				if (pngImage.length) {
					$folio = _createElement(newIndex, docNo, msgId, pngImage, signType, isDraft, ICUser);
				}
				else {
					if (docObj.signType=='P') {
						pageUrl = './IMAGE/SSO/' + pageFileName;
					}
					else {
						pageUrl = './IMAGE/SSO/' + pageFileName;
					}
					$folio = _createElement(newIndex, docNo, msgId, pageUrl, signType, isDraft, ICUser);
				}
					
				$page = $folio.find(".page_inner");
				$txtLeft = $folio.find(".docNo_left");
				$txtRight = $folio.find(".docNo_right");
								
				// 加入container
				var $cntr = $(theSSO.MP.PreviewCtrl.cntrId + ' .folio_content');
				$folio.appendTo($cntr);
				previewDocList.push({'docNo' : docNo, 'msgId': msgId, 'index': newIndex, 'signType': signType, 'isDraft' : isDraft, 'ICUserId' : ICUser});
				
				//$_sliders = $folioCntr.find('div.flip_content'); // 2013.5 - update sliders count
				_doSlide(newIndex);
			}
		}
		
		if (previewDocList.length>_maxSliderCount) {
			// ToDo: 處理已超出預覽上限狀況
			// 將最舊的一個自清單移除
			var $sliders = $_pageContainer.find('.flip_content');
			$sliders.splice(0, 1);
			previewDocList.splice(0, 1);
			
			if (_sliderPreviousIndex>0) {
				_sliderPreviousIndex -= 1;
			}
			if (_sliderCurrentIndex>=_maxSliderCount) {
				_sliderCurrentIndex -= 1;
			}
		}
		
		// highlight nav_button
		if (_sliderCurrentIndex>=0) {
			$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_btn_' + (_sliderCurrentIndex+1)).addClass('selected');
		}
		
		// navigate bar status update
		var navBarWidth = ((previewDocList.length+2) * _btn_w) + ((previewDocList.length+1) * _btn_gap) + (_border*2); // 包含[前一頁]/[次一頁]兩個按鍵
		
		var cntrWidth = 0;
		if (theSSO.MP.PreviewCtrl.isPreviewPaneClosed()) {
			//cntrWidth = ($('#home').outerWidth() * 0.75) - 8;
			var leftPane_w = SSOUtil.getEMSize($('#tdlPane')[0]) * 25; // tdlPane寬度為25em
			cntrWidth = window.innerWidth - (leftPane_w);
		}
		else {
			if (!!theSSO.MP.PreviewCtrl.contentSubclass && theSSO.MP.PreviewCtrl.contentSubclass.length) {
                cntrWidth = $(theSSO.MP.PreviewCtrl.cntrId + ' .' + theSSO.MP.PreviewCtrl.contentSubclass).width();
            }
			else {
				cntrWidth = $(theSSO.MP.PreviewCtrl.cntrId).width();
			}
		}
		var navBarLeft = (cntrWidth - navBarWidth) / 2;
				
		var goNextBtnLeft = ((previewDocList.length + 1) * (_btn_w + _btn_gap)) + _border;
		var btnSel = ' .folio_btn_' + (newIndex+1);
		$(theSSO.MP.PreviewCtrl.cntrId + btnSel).css('display', 'block');
		$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_preview_nav').css({'width': navBarWidth, 'left': navBarLeft});
		$(theSSO.MP.PreviewCtrl.cntrId + ' div.folio_btn_next').css('left', goNextBtnLeft);
	}
	
	// 2012.12 - 毋須顯示公文基資頁面,故取消!
	// 翻轉 公文預覽頁面<->公文基資頁面
	/*function flipFolio() {
		theLogger.log("flipFolio invoked...");
		
		var $target = $("div.flip_content");
		if ($target.length) {
			if ($target.hasClass("rotated")) {
				$target.removeClass("rotated")
			}
			else {
				$target.addClass("rotated");
			}
		}
	}*/
	
	/*function switchFolioPreivewContent()
	{
		var $target = $("#eDocPreviewPane .flip_content");
		if ($target.length<=0) return;
		
		if ($(this).hasClass("cmdContent")) {
			if ($target.hasClass("rotated")) {
				$target.removeClass("rotated");
			}
		}
		else if ($(this).hasClass("cmdDocInfo")) {
			if (!$target.hasClass("rotated")) {
				$target.addClass("rotated");
			}
		}
	}*/
	
	function _init(containerId) {
		//var sliderSel = " .folio_content";
		var navBtnSel = " .folio_preview_nav div.folio_nav_btn";
		theSSO.MP.PreviewCtrl.cntrId = containerId;
		_initSlider($(containerId), 450);
		$(containerId + navBtnSel).on("click", function(event) { _navButtonClicked(event); });
	}

	if (typeof theSSO.MP.PreviewCtrl == 'undefined') {
		theSSO.MP.PreviewCtrl =  {
			// showHideCtrlId : '#eDocPreviewPane',
			showHideCtrlId : '#eDocPreviewPane',
			contentSubclass : 'preview_content',
			checkMethod: 'show_hide', /* for splitter: 'invert' */
			cntrId : '',
		};
	}
	
	function _getCurrentPreviewDoc() {
		if (previewDocList.length) {
			if (_sliderCurrentIndex>=0 && _sliderCurrentIndex<previewDocList.length) {
				return previewDocList[_sliderCurrentIndex];
			}
		}
		return null;
	}
	
	function _UVLoadDocPreview(unvObj) {
	}
	
	function _UVIsDocPreviewing(docNo) {
		
	}
	
	function _windowSizeChanged() {
		// navigate bar status update
		var _btn_w = 20;
		var _btn_gap = 10;
		var _border = 5;
		var navBarWidth = ((previewDocList.length+2) * _btn_w) + ((previewDocList.length+1) * _btn_gap) + (_border*2); // 包含[前一頁]/[次一頁]兩個按鍵
		var cntrWidth = 0;
		if (theSSO.MP.PreviewCtrl.isPreviewPaneClosed()) {
			//cntrWidth = ($('#home').outerWidth() * 0.75) - 8;
			var leftPane_w = SSOUtil.getEMSize($('#tdlPane')[0]) * 25; // tdlPane寬度為25em
			cntrWidth = window.innerWidth - (leftPane_w);
		}
		else {
			if (!!theSSO.MP.PreviewCtrl.contentSubclass && theSSO.MP.PreviewCtrl.contentSubclass.length) {
				cntrWidth = $(theSSO.MP.PreviewCtrl.cntrId + ' .' + theSSO.MP.PreviewCtrl.contentSubclass).width();
			}
			else {
				cntrWidth = $(theSSO.MP.PreviewCtrl.cntrId).width();
			}
		}
		var navBarLeft = (cntrWidth - navBarWidth) / 2;
		$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_preview_nav').css({'left': '' + navBarLeft + 'px'});
	}
	
	
	var previewCtrl = theSSO.MP.PreviewCtrl;
	
	// 輸出可叫用函式
	previewCtrl.init = _init;
	previewCtrl.isDocPreviewing = _isDocPreviewing; // parameters: docNo, msgId, isDraft, ICUser
	previewCtrl.loadDocPreview = _loadDocPreview; // parameters: docNo, msgId, isDraft, ICUser
	previewCtrl.getMaxPreviewCount = function() { return _maxPreivewCount; };
	previewCtrl.getCurrentPreviewCount = function() { return previewDocList.length; };
	previewCtrl.openPreviewPane = function() { return _showPreviewPane(this.showHideCtrlId, true); };
	previewCtrl.hidePreviewPane = function() { return _showPreviewPane(this.showHideCtrlId, false); };
	previewCtrl.isPreviewPaneClosed = function() { return _isPreviewPaneClosed(this.showHideCtrlId, previewCtrl.checkMethod); };
	previewCtrl.isValidAOLDocNo = _isValidPreviewDocNo;
	previewCtrl.getCurrentPreviewDoc = _getCurrentPreviewDoc;
	previewCtrl.canOpen = function() {
		return (previewDocList.length>0) ? true : false;
	};
	previewCtrl.removePreviewItem = function(msgId, ICUserId) {
		if (typeof ICUserId=='undefined')
			ICUserId = '';
			
		var i=0,j=0;
		var previewDoc, $previewCtrls, $previewCtrl;
		for(i=0; i<previewDocList.length; i++)
		{
			previewDoc = previewDocList[i];
			if (previewDoc.msgId===msgId) {
				// 移除UI項目			
				$previewCtrls = $_pageContainer.find('div.flip_content');
				if ($previewCtrls.length>1) {
					for(j=0; j<$previewCtrls.length; j++) {
						$previewCtrl = $($previewCtrls[j]);
						if ($previewCtrl.attr('data-msgid')===msgId) {
							$previewCtrl.remove();
							theLogger.log('$previewCtrl for MsgId="' + msgId + '" removed.');
							break;
						}
					}
				}
				else {
					$previewCtrls.attr('data-msgid', '');
				}
				// 移除data項目.
				previewDocList.splice(i, 1);
				
				// 若仍有剩餘項目, 顯示最後一個
				var remain = previewDocList.length;
				if (remain>0) {
					if (remain===1) {
						_sliderCurrentIndex = -1;
						_doSlide(0);
					}
					else {
						if (_sliderCurrentIndex>=remain) {
							_sliderCurrentIndex = remain-2;
							_doSlide(_sliderCurrentIndex+1);
						}
						else {
							_sliderCurrentIndex -= 1;
							_doSlide(_sliderCurrentIndex+1);
						}
					}
				}
				break;
			}
		}
	};
	
	/* 2016.8 - 支援公文檢索預覽 */
	previewCtrl.UVLoadDocPreview = _UVLoadDocPreview;
	previewCtrl.UVIsDocPreviewing = _UVIsDocPreviewing;
	
	previewCtrl.windowSizeChanged = _windowSizeChanged;
	
	// 2013.10 - 清除內容
	previewCtrl.resetContent = function() {
		// UI dimension constants
		var _btn_w = 20, _btn_gap = 10, _border = 5;
		
		var $page, $pages = $_pageContainer.find('div.flip_content');
		var idx = 0, count = $pages.length;
		for(idx=0; idx<count; idx++) {
			$page = $($pages[idx]);
			$page.remove();
		}
		previewDocList.splice(0, previewDocList.length);
		_sliderCurrentIndex = -1;
		_sliderPreviousIndex = -1;
		
		_initSlider($(theSSO.MP.PreviewCtrl.cntrId), 450);
		
		// navigate bar status update
		count = 0;
		var navBarWidth = ((count+2) * _btn_w) + ((count+1) * _btn_gap) + (_border*2); // 包含[前一頁]/[次一頁]兩個按鍵
		
		var cntrWidth = 0;
		if (theSSO.MP.PreviewCtrl.isPreviewPaneClosed()) {
			cntrWidth = ($('#home').outerWidth() * 0.75) - 8;
		}
		else {
			cntrWidth = $(theSSO.MP.PreviewCtrl.cntrId).width();
		}
		var navBarLeft = (cntrWidth - navBarWidth) / 2;
				
		var goNextBtnLeft = ((count + 1) * (_btn_w + _btn_gap)) + _border;
		var btnSel = ' .folio_btn_1';
		$(theSSO.MP.PreviewCtrl.cntrId + btnSel).css('display', 'block');
		$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_preview_nav').css({'width': navBarWidth, 'left': navBarLeft});
		$(theSSO.MP.PreviewCtrl.cntrId + ' div.folio_btn_next').css('left', goNextBtnLeft);
		
		// NavButton bar 隱藏 buttons (folio_btn_prev/folio_btn_next/folio_btn_1除外)
		var $navBtns = $(theSSO.MP.PreviewCtrl.cntrId + ' .folio_preview_nav').find('div.folio_nav_btn');
		var btnCnt = $navBtns.length;
		var $navBtn, classStr;
		for(idx=0; idx<btnCnt; idx++) {
			$navBtn = $($navBtns[idx]);
			classStr = $navBtn.attr('class');
			if (classStr.indexOf('folio_nav_btn')!=-1) {
				if (classStr.indexOf('folio_btn_prev')!=-1 ||
					classStr.indexOf('folio_btn_next')!=-1 ||
					classStr.indexOf('folio_btn_1')!=-1) {
					continue;
				}
				$navBtn.css('display', 'none');
			}
		}
	};
})(jQuery);









