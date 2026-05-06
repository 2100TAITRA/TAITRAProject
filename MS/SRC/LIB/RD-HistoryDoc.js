/* 歷史簽辦用js (RD-HistoryDoc.js)
 * (window.)HistoryDocUtil.initClassifyListSpinWheel
 */
/*
DATE	MGRNO		SA		PG		Desc
1060503 			Eric    Eric    iScrol lib 升級至v5.2.0
*/

(function($){
    var sidePaneInitialized = false;
    
    /* inner functions */
    function _getIconFolderH() {
      if ($('#history_leftBottomPane').is(':visible')) {
            var containerH = $('#history_leftBottomPane').height();
            var headerH = $('#history_todolist_icon_cntr').height();
            return containerH - headerH;//code
        }
        return 0;
    }
        
    /*
    * 設定[歷史簽辦]公文清單spin wheel之內容 (新增文稿UI使用!)
    */
    function _initClassifyListSpinWheel(id) //, addAll, display_pos)
    {
        var type = typeof $('#'+id)[0];
        theLogger.debug('_initClassifyListSpinWheel() typeof target element:' + type);
        
        if (id==undefined || id.length==0) {
            alert('_initClassifyListSpinWheel(), invalid "id"');
            return null;
        }
        
        var folderList = [{name:'全部'}, {name:'自已簽辦'},
                          {name:'代簽公文'}, {name:'被代簽公文'}, ];
        
        var wheels = [];
        var obj = { '分類': {} };
        var folderCnt = folderList.length;
        for(var i=0; i<folderCnt; i++) {
            obj['分類'][i] = folderList[i].name;
        }
        wheels.push(obj);
        
        $('#' + id).scroller({
                width: 240,
                wheels: wheels,
                theme: 'ios',
                //align_mode: display_pos, // 2012.2.1 - Eric Peng
                display: 'bubble',
                anchor: $('#'+id),
                setText: '確定',
                cancelText: '取消',
                parseValue: function (s) {
                    var d = [];
                    if (s !== '') {
                        for (var i in wheels[0]['分類']) {
                            var folder = wheels[0]['分類'][i];
                            if (folder == s)
                                d.push(parseInt(i));
                        }
                    }
                    else {
                        d.push(1); //[1,1,1];
                    }
                    return d;
                },
                formatResult: function(d) {
                    var sRslt = wheels[0]['分類'][d[0]];
                    return sRslt;
                }
        });
        
        // 點擊時顯示scroll wheel control
        $('#' + id).on('click', function() { $(this).scroller('show'); });
        
        // 2015.5 - Eric Peng, 解決iOS8取消選取後，再次點擊時不會顯示選單問題.
        $('#' + id).on('focus', function(ev){
            $(this).trigger('blur');
            ev.preventDefault();
        });
        
        return wheels;
    }
    
    function _initHistoryDocPreviewContent() {
        var $searchViewFolder = $('#history_leftTopPane .searchViewContent .searchView_Folder');
        if (!sidePaneInitialized && $searchViewFolder.is(':visible'))
        {
            // setup content
            //var selfolder = $('#selectedFolder_search').attr('value');
            //theSSO.MP.todolist.builder.makeToDoList_SearchList('search-list', selfolder);
            
            // 2014.8 - 調整高度, 改為動態計算
            var margin_top = 15;
            var window_h = $(window).height();
            var headerbar_h = $('#home_header').height();
            var searchListView_h = window_h - headerbar_h;
            
            $('#history-search-list').removeClass('ui-shadow');
            
            // 設定搜尋結果div之高度
            $('#history-search-list').parent().parent().css('height', '' + searchListView_h + 'px'); // 沒有bottom toolbar + 36px
            
            // searchWrapper, 除文件夾清單外的其它項目!

            var $searchWrapper = $('#history_leftTopPane .searchViewContent .search-wrapper');
            var $searchFilter = $searchWrapper.find('form');
            
            var searchFolder_h = $searchViewFolder.height();  // 文件夾清單控制項高度
            var searchFilter_h = $searchFilter.height();	// 文件夾內容篩選文字控制項高度
            var searchList_h = searchListView_h - searchFolder_h - searchFilter_h - margin_top;
            $('#history-search-list').css({'height': ''+searchList_h+'px'}); // 600-(47+5)
            $("#history-search-list").parent().css({'margin-top':'15px'});
                        
            sidePaneInitialized = true;
        }
    }
    
    //
    // 待辦項目清單模式初始化作業.
    // a. 建立清單內容
    // b. 轉換為固定標題,內容可捲動的super table
    // c. 公文燈號資訊
    //
    function _initHistoryDocList_List()
    {
        /* 2014.2.25 - Eric Peng, _docItemPropIndex 定義移至此處 */
        /* 2012.12.10 - 待辦清單之欄位索引. */
        var _docItemPropIndex = [ 	{name:'secret', index: 1},
                                    {name:'signType', index: 2},
                                    {name:'docno', index: 3},
                                    {name:'ICOUName', index: 4}, // 承辦單位
                                    {name:'ICUserName', index: 5}, // 承辦人
                                    {name:'subject', index: 6},
                                    {name:'AppUserName', index: 7}, // 核決者
                                    {name:'AppDate', index: 8}, // 核決日期
                                    {name:'currentPosition', index: 9} ]; // 目前位置
        
        // 初始化清單內容 ...[fixed data]
        
        // superTable + jQM scrollview
        
        // 轉換為supertable
        var mySuperTable = new superTable("history_todolist_tb", {
          cssSkin : "sSky",
          fixedCols : 0,
          headerRows : 1,
          onStart : function () {
              // onStart handler
          },
          onFinish : function () {
              // onFinish handler
          },
          dataTableExtraClass : 'tablesorter',
        });
        
        // 2015.6 - 提示排序項目(@標題)
        $(document).on('st_headerStyleUpdated', '.sData #history_todolist_tb', function(event, extra) {
            theLogger.debug('event st_headerStyleUpdated triggered.');
            
            // remove all header information
            var $headers = $('#history_todolist_cntr .sHeader table thead th');
                    
            $headers.removeClass(extra.css[0]).removeClass(extra.css[1]);
            var l = extra.list.length;
            for (var i = 0; i < l; i++) {
                $($headers[extra.list[i][0]]).addClass(extra.css[extra.list[i][1]]);
            }    
        });
        
        _initHistoryDocPreviewContent();
                
        // 2012.8.30 - 條列清單項目篩選
		$('#history_tdl_list_filter').on('change keyup', function(event, ui) {
			var slastKey = $('#history_tdl_list_filter').jqmData('last_key');
			if (!!slastKey && slastKey.length) {
				slastKey = slastKey.toLowerCase();
			}
			else {
				slastKey = '';
			}
			
			var sFilter = $('#history_tdl_list_filter')[0].value;
			if (!sFilter || (typeof sFilter != 'string')) {
				sFilter = '';
			}
			else {
				sFilter = sFilter.toLowerCase();
			}
			
			if (sFilter==slastKey) {
				theLogger.log('match with last keyword:"' + slastKey + '", do nothing...');
				return;
			}
			else {
				theLogger.log('new filter key:"' + sFilter + '", lastFilder="' + slastKey + '"');
			}
			
			/*/
			// 2012.9.3 - todo:
			//   1. 優化項目 => 若新的filter與舊的比較, 僅新增字元, 則可由目前仍列出的項目篩選
			//   2. 中文字輸入時, 取出的sFilter會有額外的全形底線字元:"＿", 應trim掉.
			/*/
			
			var txt = '';
			$('.sData #history_todolist_tb tbody tr').each(function() {
				if (sFilter==='') {
					$(this).css('display', 'table-row');
				}
				else {
					var txt = this.innerText.toLowerCase();
					//console.log("item txt=" + txt);
					if (txt.indexOf(sFilter) == -1) {
						// 找 <input value="xxx">
						txt = $(this).find('input').val();
						if (!!txt && txt.length) {
							txt = txt.toLowerCase();
						}
						
						if (!txt || txt.indexOf(sFilter)==-1) {
							//console.log("input value=" + txt);
							$(this).css('display', 'none');
							//console.log("display = none");
						}
						else {
							$(this).css('display', 'table-row');
							//console.log("display = table-row");
						}
					}
					else {
						$(this).css('display', 'table-row');
						//console.log("display = table-row");
					}
				}
			});
			
			$('#history_tdl_list_filter').data('last_key', sFilter);
			//if (sFilter != )
		});
        
        // 開啟功能
        // history_todolist_tb項目點擊後預覽公文
        var docItem;
        if (sysObj.hasTouch) {
            docItem = $('#history_todolist_tb > tbody > tr');
            $(document).on('click', '#history_todolist_tb > tbody > tr', function(event) {
                var $TR = $(event.target).closest('tr');
                var $TD = $TR.find('td[data-prop="signType"]');
                var signType = $TD.attr('data-value');
                if (!!signType && (signType=='E' || signType=='P')) {
                    var sWorkSpaceId = $TR.closest('.doc_desktop_subpage').attr('id');
                    _showInspectPreviewPane(signType, sWorkSpaceId);
                }
            });
        }
        else {
            docItem = $('#history_todolist_tb > tbody > tr td.docno');
            $(document).on('click', '#history_todolist_tb > tbody > tr td.docno', function() {
                var $TR = $(event.target).closest('tr');
                var $TD = $TR.find('td[data-prop="signType"]');
                var signType = $TD.attr('data-value');
                if (!!signType && (signType=='E' || signType=='P')) {
                    var sWorkSpaceId = $TR.closest('.doc_desktop_subpage').attr('id');
                    _showInspectPreviewPane(signType, sWorkSpaceId);
                }
            });
        }
        
        // 按上方標題可排序功能
        /*$('.sData #history_todolist_tb').tablesorter({
              sortList: [[3,0]],
              // define a custom text extraction function
              textExtraction: function(node) {
                var targetProp = $(node).jqmData('prop');
                var $tr = $(node).closest('tr');
                var msgId = $tr.jqmData('msgid');
                if (targetProp=='opened') {
                    theLogger.debug('gonna get prop:\'opened\' value\n');	
                }
                
                var value = tdlBuilder.getPropValue(msgId, targetProp);
                if (targetProp=='opened') {
                    theLogger.debug('prop:\'opened\' value\=' + value + '\n');	
                }
                // extract data from markup and return it 
                //return node.childNodes[0].childNodes[0].innerHTML;
                return value;
              },
            });
                
        // 2015.5 - 記錄目前sort設定, 後續作業可判定是否反向sort
        $('.sData #history_todolist_tb').attr({'data-sortIndex': '6', 'data-sortReverse': '0'});
                
        $('#history_todolist_cntr .sHeader table thead th a').click(function(){
            var $th = $(this).closest('th');
            var str = $th.jqmData('prop');
            if (!!str && str.length) {
                // 找到該欄位的索引值
                var idx = 0;
                for(var i=0; i<_docItemPropIndex.length;i++) {
                    var prop = _docItemPropIndex[i];
                    if (prop.name == str) {
                        idx = prop.index;
                        break;
                    }
                }
                
                //
                // 2015.5.7 - Eric Peng
                //  1. 比對目前sort設定, 若同項目, 則反向! 不同項目, 則依欄位預設屬性正/反向
                //  2. 作業完成記錄sort設定於 <table data-sortIndex='xxx' data-sortReverse='x'>, 以供下次排序作業比對.
                //
                var sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
                var currentIndex = parseInt(sIndex);
                
                var sorting = null;
                var reverse = 0;
                var sortDir = 0;
                if (currentIndex==idx) {
                    var sReverseSort;
                    if (currentIndex==idx) {
                        sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
                        sortDir = (sReverseSort=='0' || sReverseSort=='') ? 1 : 0;//code
                    }
                    
                    if (idx==6) {
                        sorting = [[idx, sortDir]];
                    }
                    else {
                        sorting = [[idx, sortDir], [6, 0]];
                    }
                }
                else {
                    // set sorting column and direction, this will sort on the first and third column the column index starts at zero
                    if (idx==0 || idx==2) {
                        sorting = [[idx,1],[6,0]];
                        sortDir = 1;
                    }
                    else {
                        if (idx==6) {
                            sorting = [[idx,0]];
                        }
                        else {
                            sorting = [[idx,0],[6,0]];
                        }
                        sortDir = 0;
                    }
                }
                
                // 記錄本次排序設定.
                //$('.sData #todolist_tb').attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
                
                // 觸發排序作業.
                //var $tableForSort = $(".sData #history_todolist_tb");
                //$tableForSort.trigger("sorton",[sorting]);
            }
        }); */
    }
    
    function _initHistoryDocList_Icon()
    {
        // 注意: 必須使用 new operator, function iScroll() 才會回傳 this.
        
        if (typeof theSSO.MP.historyDocList.tdlicon_Scroll == 'undefined') {
            theSSO.MP.historyDocList.tdlicon_Scroll = new IScroll('#history_icon_list_content'); // 圖示公文清單頁, // 2017.4.18, iScroll -> IScroll, add '#'
            
            theSSO.MP.historyDocList.folderScrolls = [];
            
            var $folders = $('#history_todolist_icon_cntr ul.folderList div.folioList');
            var folderCnt = $folders.length;
            var h_folder = _getIconFolderH();
            for (var i=0; i<folderCnt; i++) {
                var fid = 'hs_fldr_items_' + i;
                $($folders[i]).attr('id', fid).css('height', h_folder + 'px');
                var folderStr = $($folders[i]).closest('#hs_fldr_'+i).attr('data-folder');
                var newScroll = new IScroll('#'+fid); // 2017.4.18
                newScroll.folder = folderStr;
                theSSO.MP.historyDocList.folderScrolls.push(newScroll);
            }
            
            for (var idx in theSSO.MP.historyDocList.folderScrolls)
            {
                theSSO.MP.historyDocList.folderScrolls[idx].refresh();
            }
        }
    }
    
    function _showInspectPreviewPane(signType, sSubPageId) {
        var pagePos = 'full';
        var $subPage = $('#' + sSubPageId);
        if ($subPage.find('.searchViewContent').is(':visible')) {
            pagePos = 'side';
        }
        
        /* 2016.4 - 暫時先顯示紙本公文檢閱 */
        var sTargetWorkPaneId = 'pDocInspectPane'; // 'inspectPreviewPane'
        // hide all work_pane
        var $work_pane = $('.work_pane');
        var i=0, id='', $pane=null;
        for(i=0; i<$work_pane.length; i++) {
            $pane = $($work_pane[i]);
            id =$pane.attr('id');
            if (id!=sTargetWorkPaneId) {
                $pane.hide();
            }
        }
        var $pane = $('#' + sTargetWorkPaneId);
        if (signType=='E') {
           $pane.find('.cmdForDoc .cmdForPDoc').hide();
           $pane.find('.cmdForDoc .cmdForEDoc').show();
           $pane.find('.cmdForDoc .cmdForAttach').hide();
        }
        else {
           $pane.find('.cmdForDoc .cmdForEDoc').hide();
           $pane.find('.cmdForDoc .cmdForPDoc').show();
           $pane.find('.cmdForDoc .cmdForAttach').show();
        }
        //$pane.show();
        
        if (pagePos=='full') {
            $subPage.addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
            if (sSubPageId=='historyDocWorkspace') {
                if ($subPage.find('#history_leftBottomPane').is(':visible')) {
                    $subPage.find('#history_leftTopPane').show();
                    $subPage.find('#history_leftBottomPane').hide();
                }
                
                $subPage.find('.fullViewContent').hide();
                $subPage.find('.searchViewContent').show();
                HistoryDocUtil.initHistoryDocPreviewContent();
            }
            else if (sSubPageId=='aki800ListWorkspace') {
                $subPage.find('.fullViewContent').hide();
                $subPage.find('.searchViewContent').show();
                QueryDocUtil.initQueryDocPreviewContent();
            }
        }
    }
    
    function _initWorkSpace() {
        /* 切換顯示模式為圖示模式 */
		$('#btn_history_iconmode').on('click', function(){
			if ($('#history_leftBottomPane').is(':visible')) {
				return;
			}
			
			$('#history_leftTopPane').css({'display':'none'});
			$('#history_leftBottomPane').css({'display':'block'});
            
            if (typeof theSSO.MP.historyDocList.tdlicon_Scroll == 'undefined') {
                _initHistoryDocList_Icon();
            }
            else {
                // 2014.10 			
                theSSO.MP.historyDocList.tdlicon_Scroll.refresh();
                
                var idx;
                for (idx in theSSO.MP.historyDocList.folderScrolls) {
                    theSSO.MP.historyDocList.folderScrolls[idx].refresh();
                }
            }
		});
        
        $('#btn_history_listmode').on('click', function(){
			if ($('#history_leftTopPane').is(':visible')) {
				return;
			}
			
			// 切換至待辦事項-清單模式
			$('#history_leftBottomPane').css({'display':'none'});
			$('#history_leftTopPane').css({'display':'block'});
						
			// 建立清單表格內容
			if ($('#history_todolist_tb > tbody > tr').length==0) {
				_initHistoryDocList_List();
			}
			
			if (!sidePaneInitialized) {
				_initHistoryDocPreviewContent();
			}
	  
			$('#history_leftTopPane > div').height($('#historyDocWorkspace').height())
			
			home_page_create_event_handled = true;
		});
    }
   
    if (typeof HistoryDocUtil == 'undefined') {
         window.HistoryDocUtil = {};
    }
    
    if (typeof theSSO.MP.historyDocList == 'undefined') {
         theSSO.MP.historyDocList = {};
    }
    
    window.HistoryDocUtil.initHistoryDocPreviewContent = _initHistoryDocPreviewContent;
    window.HistoryDocUtil.initClassifyListSpinWheel = _initClassifyListSpinWheel;
    window.HistoryDocUtil.initHistoryDocList_List = _initHistoryDocList_List;
    window.HistoryDocUtil.initHistoryDocList_Icon = _initHistoryDocList_Icon;
    window.HistoryDocUtil.initWorkSpace = _initWorkSpace;
    window.HistoryDocUtil.showInspectPreviewPane = _showInspectPreviewPane;
})(jQuery);