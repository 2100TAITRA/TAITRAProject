/* 公文檢索用js (RD-QueryDoc.js)
 * (window.)QueryDocUtil.initClassifyListSpinWheel
 */

/*
DATE	MGRNO		SA		PG		Desc
1050818	   		    Eric	Eric	修改開啟檢索項目前, 檢核AOL/UniView模組開啟公文狀態, 依此調整公文開啟方式
1080117	1071239		Leslie	Leslie	配合非2100舊系統線簽公文調閱，Merge相關功能
1080405	1080251		Leslie	Leslie	調整調閱取得WebService的來源，改呼叫新增的WebFileIO.GetDocInfo()
1080923 1080339     Kevin   Eric    jQuery 3.0 upgrade
1110309	1101394		Leslie	Leslie	增修共通的MP圖示ToolTip功能
1130913	1130616		Leslie	Leslie	修正編輯模式後，一併重整半開模式清單
1131104	序351		Leslie	Leslie	只刪一次會存到刪除前的文號，修改儲存前取得文號清單方式
1140505	1140556		Kevin	Leslie	取消網址參數權杖
*/

(function($){
    var sidePaneInitialized = false;
		
	if(!!theWebServices){
		theWebServices.QueryDoc = {
			getQueryDocList : function(artifact, argDocList, options){
				if(typeof options === 'undefined'){
					options = null;
				}
				
				var _dfd = $.Deferred();
				var wsFuncName = 'GetDocInfoListByJSON';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- WebFileIO.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('WebFileIO WS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
				var params = new SOAPClientParameters();
				params.add('argArtifact', artifact);
				params.add('argDocList', argDocList);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                                  function(rslt) {
                                    theLogger.log('-I- WebFileIO WS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										_dfd.resolve(rslt.value);
									}
									else {
                                        _dfd.reject(new Error('叫用WebFileIO WS.' + wsFuncName + ' 時發生錯誤!'));
                                    }
                                  });
                return _dfd.promise();
			},
			GetUserEnvSetting : function(artifact, paratype, options){
				if(typeof options === 'undefined'){
					options = null;
				}
				
				var wsFuncName = 'GetUserEnvSetting';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- WebFileIO.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    throw new Error('WebFileIO WS尚未設定服務網址URL');
                }
				
				var async = false;
				var params = new SOAPClientParameters(), res;
				params.add('argArtifact', artifact);
				params.add('argParaType', paratype);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
									function(rslt){
										theLogger.log('-I- WebFileIO.' + wsFuncName + ' returns:');
										theLogger.log(rslt);
										if (typeof rslt === 'object') {
											res = rslt.value;
										}
										else {
											throw new Error('叫用 WebFileIO.' + wsFuncName + ' 時發生錯誤!');
										}
									});
				return res;
			},
			UpdateUserEnvSet : function(artifact, argEnvName, argEnvValue, argRemove, options){
				if(typeof options === 'undefined'){
					options = null;
				}
				var wsFuncName = 'UpdateUserEnvSet';
				
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    throw new Error('AuthWS WS尚未設定服務網址URL');
                }
				
				var async = false;
				var params = new SOAPClientParameters(), res;
				params.add('argArtifact', artifact);
				params.add('argEnvName', argEnvName);
				params.add('argEnvValue', argEnvValue);
				params.add('argRemove', argRemove);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
									function(rslt){
										theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
										theLogger.log(rslt);
										if (typeof rslt === 'object') {
											res = rslt.value;
										}
										else {
											throw new Error('叫用 AuthWS.' + wsFuncName + ' 時發生錯誤!');
										}
									});
				return res;
			},
			//1080405	Leslie[1080251]	調整調閱取得WebService的來源，改呼叫新增的WebFileIO.GetDocInfo()
			GetDocInfo : function(artifact, argDocNo, argOrgNo, options){
				if(typeof options === 'undefined'){
					options = null;
				}
				
				var wsFuncName = 'GetDocInfo';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    _dfd.reject(new Error('WebFileIO WS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var _dfd = $.Deferred();
				var async = false;
				var params = new SOAPClientParameters();
				params.add('argArtifact', artifact);
				params.add('argDocNo', argDocNo);
				params.add('argOrgNo', argOrgNo);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
									function(rslt){
										theLogger.log('-I- WebFileIO.' + wsFuncName + ' returns:');
										theLogger.log(rslt);
										 if (typeof rslt === 'object') {
										_dfd.resolve(rslt.value);
										}
										else {
											_dfd.reject(new Error('叫用WebFileIO WS.' + wsFuncName + ' 時發生錯誤!'));
										}
									});
				return _dfd.promise();
			}
		}
	}
    
    function _initQueryDocPreviewContent() {
        var $searchWrapper = $('#querydoc_leftTopPane .searchViewContent .search-wrapper');
        if (!sidePaneInitialized && $searchWrapper.is(':visible'))
        {
            // setup content
            //var selfolder = $('#selectedFolder_search').attr('value');
            //theSSO.MP.todolist.builder.makeToDoList_SearchList('search-list', selfolder);
			theSSO.MP.queryDocList.builder.makeToDoList_SearchList('querydoc-search-list');
            
            // 2014.8 - 調整高度, 改為動態計算
            var margin_top = 15;
            var window_h = $(window).height();
            var headerbar_h = $('#home_header').height();
            var searchListView_h = window_h - headerbar_h;
            
            $('#querydoc-search-list').removeClass('ui-shadow');
            
            // 設定搜尋結果div之高度
            $('#querydoc-search-list').parent().parent().css('height', '' + searchListView_h + 'px'); // 沒有bottom toolbar + 36px
            
            // searchWrapper, 除文件夾清單外的其它項目!

            //var $searchWrapper = $('#querydoc_leftTopPane .searchViewContent .search-wrapper');
            var $searchFilter = $searchWrapper.find('form');
            
            var searchFolder_h = 0; //$searchViewFolder.height();  // 文件夾清單控制項高度
            var searchFilter_h = $searchFilter.height();	// 文件夾內容篩選文字控制項高度
            var searchList_h = searchListView_h - searchFolder_h - searchFilter_h - margin_top;
            $('#querydoc-search-list').css({'height': ''+searchList_h+'px'}); // 600-(47+5)
            $("#querydoc-search-list").parent().css({'margin-top':'15px'});
                        
            sidePaneInitialized = true;
        }
    }
    
    //
    // 待辦項目清單模式初始化作業.
    // a. 建立清單內容
    // b. 轉換為固定標題,內容可捲動的super table
    // c. 公文燈號資訊
    //
    function _initQueryDocList_List()
    {
		//1050718	Leslie	修改建立檢索側屜
		/* 2016.7.18 - Leslie, 重新定義*/
		/* 2014.2.25 - Eric Peng, _docItemPropIndex 定義移至此處 */
		/* 2012.12.10 - 待辦清單之欄位索引. */
		var _docItemPropIndex = [ 	{name:'speed', index: 0},
									{name:'secret', index: 1},
									{name:'signType', index: 2},
									{name:'dueDate', index: 3},
									{name:'docNo', index: 4},
									{name:'inchargeUserName', index: 5}, // 承辦人
									{name:'subject', index: 6}];
		var tdlBuilder = theSSO.MP.queryDocList.builder;
		
		//重建半開狀態的內容清單
		sidePaneInitialized = false;
		
		// 初始化清單內容
		tdlBuilder.makeQueryDoc_List('querydoc_todolist_tb > tbody', '', '', 0);
		// 2012.2.7 - superTable + jQM scrollview
		
		// 轉換為supertable
		if ($('#querydoc_todolist_cntr .sBase').length > 0) {
			// 已是superTable->登出後登入叫用
		}
		else {
			
			var ListTable = '<tr> <!--th><a href="#">序</a></th-->'+
									'<th data-prop="speed" style="width:2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>'+
									'<th data-prop="secret" style="width:2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>'+
									'<th data-prop="signType" style="width:2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>'+
									'<th style="width:7em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>'+
									'<th class="docno_header"  style="width:10em;" data-prop="docNo"><a href="#" data-prop="docNo">文號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>'+
									'<th style="width:6em;" data-prop="inchargeUserName"><a href="#" data-prop="inchargeUserName">承辦人</a><div class="sortIcon"></div></th>'+
									'<th class="subject_header"  style="min-width:18em;"  data-prop="subject"><a href="#">主旨</a><div class="sortIcon"></div></th>'+
								'</tr>';
			$('#querydoc_todolist_tb thead')[0].innerHTML = ListTable;
			
			var mySuperTable = null;
			if(tdlBuilder.getQueryDocListCount()){
				mySuperTable = new superTable("querydoc_todolist_tb", {
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
			}
			
			// 2015.6 - 提示排序項目(@標題)
			$(document).on('st_headerStyleUpdated', '#querydoc_todolist_cntr .sData #querydoc_todolist_tb', function(event, extra) {
				theLogger.debug('event st_headerStyleUpdated triggered.');
				
				// remove all header information
				var $headers = $('#querydoc_todolist_cntr .sHeader table thead th');
						
				$headers.removeClass(extra.css[0]).removeClass(extra.css[1]);
				var l = extra.list.length;
				for (var i = 0; i < l; i++) {
					$($headers[extra.list[i][0]]).addClass(extra.css[extra.list[i][1]]);
				}    
			});
			
			//1050829	Leslie	測試用的排序基本款
			//$('#querydoc_todolist_cntr .sData #querydoc_todolist_tb').tablesorter({sortList: [[4,0]]});
			
			// 按上方標題可排序功能
			$('#querydoc_todolist_cntr .sData #querydoc_todolist_tb').tablesorter({
				  sortList: [[4,0]],	//預設為文號排序
				  // define a custom text extraction function
				  textExtraction: function(node) {
					var targetProp = $(node).jqmData('prop');
					var $tr = $(node).closest('tr');
					var docNo = $tr.find('[data-prop="docNo"]').jqmData('docno');
					
					// 2013.12 - Eric Peng
					var value = tdlBuilder.getPropValue(docNo, targetProp);
					// extract data from markup and return it 
					//return node.childNodes[0].childNodes[0].innerHTML;
					return value;
				  }
				});
		
			// 2015.5 - 記錄目前sort設定, 後續作業可判定是否反向sort
			$('.sData #querydoc_todolist_tb').attr({'data-sortIndex': '4', 'data-sortReverse': '0'});
			
			$('#querydoc_todolist_cntr .sHeader table thead th a').on('click', function(){
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
					var sIndex = $('.sData #querydoc_todolist_tb').attr('data-sortIndex');
					var currentIndex = parseInt(sIndex);
					
					var sorting = null;
					var reverse = 0;
					var sortDir = 0;
					if (currentIndex==idx) {
						var sReverseSort;
						if (currentIndex==idx) {
							sReverseSort = $('.sData #querydoc_todolist_tb').attr('data-sortReverse');
							sortDir = (sReverseSort=='0' || sReverseSort=='') ? 1 : 0;//code
						}
						
						if (idx==4) {
							sorting = [[idx, sortDir]];
						}
						else {
							sorting = [[idx, sortDir], [4, 0]];
						}
					}
					else {
						// set sorting column and direction, this will sort on the first and third column the column index starts at zero
						if (idx==0 || idx==2) {
							sorting = [[idx,1],[4,0]];
							sortDir = 1;
						}
						else {
							if (idx==4) {
								sorting = [[idx,0]];
							}
							else {
								sorting = [[idx,0],[4,0]];
							}
							sortDir = 0;
						}
					}
					
					// 記錄本次排序設定.
					$('.sData #querydoc_todolist_tb').attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
					
					// sort on the first column
					//var currentSortList = $tableForSort.
					
					// 觸發排序作業.
					var $tableForSort = $(".sData #querydoc_todolist_tb");
					$tableForSort.trigger("sorton",[sorting]);
				}
			});
		}
		//1050718	Leslie	修改建立檢索側屜	--END--
		
        /* 2014.2.25 - Eric Peng, _docItemPropIndex 定義移至此處 */
        /* 2012.12.10 - 待辦清單之欄位索引. */
        /*var _docItemPropIndex = [ 	{name:'secret', index: 1},
                                    {name:'signType', index: 2},
                                    {name:'docno', index: 3},
                                    {name:'ICOUName', index: 4}, // 承辦單位
                                    {name:'inchargeUserName', index: 5}, // 承辦人
                                    {name:'subject', index: 6},
                                    {name:'AppUserName', index: 7}, // 核決者
                                    {name:'AppDate', index: 8}, // 核決日期
                                    {name:'currentPosition', index: 9} ]; // 目前位置
        */
        
        // 初始化清單內容 ...[fixed data]
        
        // superTable + jQM scrollview
        
        // 轉換為supertable
		/*	1050718	Leslie	修改前停用
        var mySuperTable = new superTable("querydoc_todolist_tb", {
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
        $(document).on('st_headerStyleUpdated', '.sData #querydoc_todolist_tb', function(event, extra) {
            theLogger.debug('event st_headerStyleUpdated triggered.');
            
            // remove all header information
            var $headers = $('#querydoc_todolist_cntr .sHeader table thead th');
                    
            $headers.removeClass(extra.css[0]).removeClass(extra.css[1]);
            var l = extra.list.length;
            for (var i = 0; i < l; i++) {
                $($headers[extra.list[i][0]]).addClass(extra.css[extra.list[i][1]]);
            }    
        });*/
        
        _initQueryDocPreviewContent();
                
        // querydoc_todolist_tb項目點擊後預覽公文
		//2016.10.13	Leslie	影像瀏覽無需開啟"預覽"模式，以下marked掉
        /* var docItem;
        if (sysObj.hasTouch) {
            docItem = $('.sData #querydoc_todolist_tb > tbody > tr');
            $(document).on('click', '.sData #querydoc_todolist_tb > tbody > tr',function(event) {
                var $TR = $(event.target).closest('tr');
                var $TD = $TR.find('td[data-prop="signType"]');
                var signType = $TD.attr('data-value');
                if (!!signType && (signType=='E' || signType=='P')) {
                    var sWorkSpaceId = $TR.closest('.doc_desktop_subpage').attr('id');
                    HistoryDocUtil.showInspectPreviewPane(signType, sWorkSpaceId);
                }
            });
        }
        else {
            docItem = $('.sData #querydoc_todolist_tb > tbody > tr td.docno'); */
            /*$(document).on('click', '.sData #querydoc_todolist_tb > tbody > tr td.docno', function() {
                var $TR = $(event.target).closest('tr');
                var $TD = $TR.find('td[data-prop="signType"]');
				var $DocNo = $TR.find('td[data-prop="docNo"]');
                var signType = $TD.attr('data-value');
				var sDocNo = $DocNo.attr('data-docno');
                if (!!signType && (signType=='E' || signType=='P')) {
                    var sWorkSpaceId = $TR.closest('.doc_desktop_subpage').attr('id');
					var docObj = tdlBuilder.getQueryDocObj(sDocNo);
					var rtn = theWebServices.webFileIO.getDocUnvDataByJSON(localStorage.Artifact,sDocNo,docObj.SOURCE_ORGNO,null);
					var sUnvObj = "";
					rtn.done(function(rslt){
						sUnvObj = rslt.rtnJSON;
					}).fail(function(rslt){
						alert(rslt.errMsg);
					});
					if(sUnvObj !== "") {
						var UnvObj = JSON.parse(sUnvObj);
						var objViewDoc = {
							UNVObj:UnvObj,
							docInfoPage:"AKI802",
							openDocModule:(signType == 'E')?'AOL':'UniView',
							readOnlyMode:true
						};
						var $docId = sDocNo+'_'+Util.genGUID();
						localStorage['viewDoc_in_'+$docId] = JSON.stringify(objViewDoc);
						theSSO.MP.viewDoc(localStorage.Artifact, $docId, signType);
					}
                }
            });*/
        //}
        // 按上方標題可排序功能
        /*$('.sData #history_querydoc_todolist_tb').tablesorter({
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
        $('.sData #history_querydoc_todolist_tb').attr({'data-sortIndex': '6', 'data-sortReverse': '0'});
                
        $('#history_querydoc_todolist_cntr .sHeader table thead th a').click(function(){
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
                var sIndex = $('.sData #querydoc_todolist_tb').attr('data-sortIndex');
                var currentIndex = parseInt(sIndex);
                
                var sorting = null;
                var reverse = 0;
                var sortDir = 0;
                if (currentIndex==idx) {
                    var sReverseSort;
                    if (currentIndex==idx) {
                        sReverseSort = $('.sData #querydoc_todolist_tb').attr('data-sortReverse');
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
                //$('.sData #querydoc_todolist_tb').attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
                
                // 觸發排序作業.
                //var $tableForSort = $(".sData #history_querydoc_todolist_tb");
                //$tableForSort.trigger("sorton",[sorting]);
            }
        }); */
    }
    
    function _initWorkSpace() {
        // 條列清單項目篩選
		$('#querydoc_tdl_list_filter').on('change keyup', function(event, ui) {
			// 2019.9.6 - 1080339 Eric, jQuery upgrade ... [bug-fix]
			//var slastKey = $('#history_tdl_list_filter').jqmData('last_key');
			var slastKey = $('#querydoc_tdl_list_filter').data('last_key');
			if (!!slastKey && slastKey.length) {
				slastKey = slastKey.toLowerCase();
			}
			else {
				slastKey = '';
			}
			
			var sFilter = $('#querydoc_tdl_list_filter')[0].value;
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
			$('.sData #querydoc_todolist_tb tbody tr').each(function() {
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
			
			$('#querydoc_tdl_list_filter').data('last_key', sFilter);
			//if (sFilter != )
		});
    }
   
    if (typeof QueryDocUtil == 'undefined') {
         window.QueryDocUtil = {};
    }
    
    if (typeof theSSO.MP.queryDocList == 'undefined') {
         theSSO.MP.queryDocList = new QueryDoc();
    }
    
    window.QueryDocUtil.initQueryDocPreviewContent = _initQueryDocPreviewContent;
    window.QueryDocUtil.initQueryDocList_List = _initQueryDocList_List;
    window.QueryDocUtil.initWorkSpace = _initWorkSpace;
    //註冊檢索功能鍵開啟AKI800
	$(document).on('click','#aki800Link,#btn_aki800Link',function(){
		var sServer = SSO_CONFIG.ServerHost;
		var sArtifact = localStorage.Artifact;
		//1140505	Leslie[1140556]	取消網址參數權杖
		// theStart.ChildWin.push(window.open(sServer + '/ak/aki800.aspx?SAMLart=' + sArtifact));
		theStart.ChildWin.push(window.open(sServer + '/ak/aki800.aspx'));
	});
	
	//1050815	Leslie	註冊點公文後行為(只需註刪一次，故移至此處)
	$(document).on('click', '.sData #querydoc_todolist_tb > tbody > tr td.docno,#querydoc-search-list div.docNo>a', function(event) {
        // 2016.12.19 - 防止連續點擊檢閱公文鍵
        if (typeof theSSO.MP.viewDocClicked !== 'undefined' && theSSO.MP.viewDocClicked===true) {
            return;
        }
        else {
            theSSO.MP.viewDocClicked = true;
            setTimeout(function(){ theSSO.MP.viewDocClicked=false; }, 1000);
        }
        
        if (typeof theAOL=='object' && theAOL.getCurrFolio()) {
            if (theAOL.getCurrFolio().readOnly()===true) {
                alert('已開啟公文檢閱中, 請關閉該份公文後重試. [AOL]');
                return;
            }
        }
        
        if (typeof theUniView=='object' && theUniView.getDocId()!=='') {
            alert('已開啟公文檢閱中, 請關閉該份公文後重試. [UniView]');
            return;
        }
        
		var $TR = $(event.target).closest('tr,li');
		var $TD = $TR.find('td[data-prop="signType"],div[data-prop="signType"]');
		var $DocNo = $TR.find('td[data-prop="docNo"],div.docNo a');
		var signType = $TD.attr('data-value');
		var sDocNo = $DocNo.attr('data-docno');
		if (!!signType && (signType=='E' || signType=='P')) {
			var sWorkSpaceId = $TR.closest('.doc_desktop_subpage').attr('id');
			var docObj = theSSO.MP.queryDocList.builder.getQueryDocObj(sDocNo);
			//1080117	Leslie[1071239]	因應舊公文需求，先取得公文資訊，再確實的叫用FileServer的WebFileIO
			//var rtn = theWebServices.webFileIO.getDocUnvDataByJSON(localStorage.Artifact,sDocNo,docObj.SOURCE_ORGNO,null);
			//1080405	Leslie[1080251]	調整調閱取得WebService的來源，改呼叫新增的WebFileIO.GetDocInfo()
			//var rtn = theWebServices.odmssp.getDocumentInfo(localStorage.Artifact, sDocNo, docObj.SOURCE_ORGNO);
			var rtn = theWebServices.QueryDoc.GetDocInfo(localStorage.Artifact, sDocNo, docObj.SOURCE_ORGNO);
			var sUnvObj = "";
			//1080117	Leslie[1071239]	因應舊公文需求，先取得公文資訊，再確實的叫用FileServer的WebFileIO	--START--
			//rtn.done(function(rslt){
			rtn.then(function(rslt) {
				//1080405	Leslie[1080251]	調整調閱取得WebService的來源，改呼叫新增的WebFileIO.GetDocInfo()
				//return theWebServices.webFileIO.getDocUnvDataByJSON(localStorage.Artifact,sDocNo,docObj.SOURCE_ORGNO,{url:rslt.rtnODWMSG.wsdl});
				return theWebServices.webFileIO.getDocUnvDataByJSON(localStorage.Artifact,sDocNo,docObj.SOURCE_ORGNO,{url:rslt.RtnStr});
			}).then(function(rslt) {
				sUnvObj = rslt.rtnJSON;
				
				//1080117	Leslie[1071239]	Merge舊公文調閱部分修改(From 2018.5.15 - Eric. bug-fix，內政部版)，移到此處
				if(sUnvObj !== "") {
					var UnvObj = JSON.parse(sUnvObj);
					
					//1110422	Leslie[1110370]	整併歷史公文調閱邏輯
					if (typeof UnvObj.UnvRoot.Doc=='undefined' || UnvObj.UnvRoot.Doc===null) {
						// 2019.12.17 - Eric, typo fix. [.Error ->  .error]
						theLogger.error('-E- 無效的UNV物件資訊.[invalid UnvObj.UnvRoot.Doc]\nUnvObj=' + JSON.stringify(UnvObj));
						alert('無效的UNV物件資訊. [invalid UnvObj.UnvRoot.Doc]');
						return;
					}
					let doc = null;
					if (SSOUtil.typeOf(UnvObj.UnvRoot.Doc)=='array' && UnvObj.UnvRoot.Doc.length) {
						doc = UnvObj.UnvRoot.Doc[0];
					}
					else {
						doc = UnvObj.UnvRoot.Doc;
					}
					//1110422	Leslie[1110370]	整併歷史公文調閱邏輯	==END==
					
					//1080117	Leslie[1071239]	配合舊系統公文轉入時，線簽公文影像需改用紙本型式調閱，增加以UNV內容決定調閱型式
					let _openModul = (signType == 'E')?'AOL':'UniView'
					
					//1110422	Leslie[1110370]	整併歷史公文調閱邏輯
					/*let _firstAtt = null;
						
					//1080117	Leslie[1071239]	移到這裡，先檢查以判定開啟模式
					let _unvDoc = UnvObj.UnvRoot.Doc;
					if (typeof _unvDoc=='object' && _unvDoc!=null) {
						if (Array.isArray(_unvDoc.Att)) {
							_firstAtt = _unvDoc.Att[0];
						}
						else {
							_firstAtt = _unvDoc.Att;
						}
					}
					if(_firstAtt.Type != '7')
						_openModul = 'UniView';*/
					let _HistoryDoc = false;
					
					if (doc.Att.length) {
						// 1. 取出所有ATT.Type='8'項目(歷史公文DI), 將其置換為一個AOL項目.
						// 2. 其它項目
						let mainAttArr=[], historyAttArr=[], extraPDocAtt=null;
						if (SSOUtil.typeOf(doc.Att)=='array' && doc.Att.length>1) {
							let i=0;
							for(i=0; i<doc.Att.length; i++) {
								let _att = doc.Att[i];
								if (_att.Type==='8') {
									historyAttArr.push(_att);
								}
								else {
									mainAttArr.push(_att);
								}
							}
						}

						if (historyAttArr.length) {
							if (mainAttArr.length>=1) {
								extraPDocAtt = {
									Type: '99', // 歷史公文一律給'99', 另以RD-ViewDoc.html內嵌AOL開啟
									Alias: '"來文及文稿檔', 
									PrintEnable: 'TRUE',
									File:{
										Pages: '1', 
										FileName: doc.DocNo + '-X.XML',
										FilePath: historyAttArr[0].File.FilePath,
										WSDL: historyAttArr[0].File.WSDL
										},
									Group:{GrpName:'來文附件檔-1', StartPO: '0'}
								};
								_openModul = 'UniView';  // 使用UniView模組開啟公文
							}
							else { // 只有一個ATT, Type='8'
								extraPDocAtt = {
									Type: '0', // 單一歷史公文DI, 給'0', 以紙本簽核公文方式開啟
									Alias: '"來文及文稿檔', 
									PrintEnable: 'TRUE',
									File:{
										Pages: '1', 
										FileName: doc.DocNo + '-X.XML',
										FilePath: historyAttArr[0].FilePath,
										WSDL: historyAttArr[0].WSDL
										},
									Group:{GrpName:'來文附件檔-1', StartPO: '0'}
								};
								_HistoryDoc = true; // for 歷史公文
								_openModul = 'AOL'; // 使用AOL模組開啟公文
							}
							
							mainAttArr.push(extraPDocAtt);
							UnvObj.UnvRoot.Doc.Att = mainAttArr;
							signType = 'P'; // 將公文標記為紙本簽核公文
						}
						//1100827	Leslie[1100784]	因調整Template以支援叡揚舊系統線上簽核，增修配合處理線上簽核歷史公文的調閱行為
						else{
							if(mainAttArr.length && mainAttArr[0].Type!= '7')
								_openModul = 'UniView';
							else if(SSOUtil.typeOf(doc.Att)=='array' && doc.Att[0].Type!= '7')
								_openModul = 'UniView';
							//1100927	Leslie[1101164]	修正線上簽核含來文電子檔時，調閱異常的問題
							//else if(doc.Att.Type != '7')
							else if('Type' in doc.Att && doc.Att.Type != '7')
								_openModul = 'UniView';
						}
					}
					
					//1110422	Leslie[1110370]	整併歷史公文調閱邏輯	==END==
					
					// 2018.11 - 1071045, Eric-先初步篩選以確認第一個group內容無異常
					//1080117	Leslie[1071239]	移到外面去，先檢查以判定開啟模式
					//if (signType=='P') {
					if (_openModul =='UniView') {
						//1080117	Leslie[1071239]	移到外面去，先檢查以判定開啟模式
						/*let _firstAtt = null;
						
						// 2018.12.13 - Eric, bug-fix
						let _unvDoc = UnvObj.UnvRoot.Doc;
						if (typeof _unvDoc=='object' && _unvDoc!=null) {
							if (Array.isArray(_unvDoc.Att)) {
								_firstAtt = _unvDoc.Att[0];
							}
							else {
								_firstAtt = _unvDoc.Att;
							}
						}*/
						//1110422	Leslie[1110370]	整併歷史公文調閱邏輯
						let _firstAtt = null;
						if (Array.isArray(doc.Att)) {
							_firstAtt = doc.Att[0];
						}
						else {
							_firstAtt = doc.Att;
						}
						

						// (1)是否沒有任何Att? (2)是否第一個Att的File內容異常(空字串)?
						if (typeof _firstAtt!='object' || typeof _firstAtt.File!='object') {
							alert('UNV內容異常 [1stAtt or 1stAtt.File is not an object]');
							theLogger.warn('-W- 無效的UNV內容, 第一個Doc.Att or Doc.Att.File 不為物件!');
							return;
						}
						else if (!Array.isArray(_firstAtt.File) && 
								 (typeof _firstAtt.File.FileName!='string' || _firstAtt.File.FileName.length===0 ||
								 typeof _firstAtt.File.FilePath!='string' || _firstAtt.File.FilePath.length===0)) {
							alert('UNV內容異常 [第一個頁面群組檔案路徑/名稱異常!]');
							theLogger.warn('-W- 無效的UNV內容, 第一個Doc.Att.File之FileName or FilePath不為有效字串!');
							return;
						}
					}
					
					var objViewDoc = {
						UNVObj:UnvObj,
						docInfoPage:"AKI802",
						//1080117	Leslie[1071239]	改用前面判定的開啟模式
						//openDocModule:(signType == 'E')?'AOL':'UniView',
						openDocModule:_openModul,
						signType:signType,
						readOnlyMode:true
					};
					
					//1110422	Leslie[1110370]	整併歷史公文調閱邏輯
					if (_HistoryDoc) 
						objViewDoc.HistoryDoc = true; 
					
					var $docId = sDocNo+'_'+Util.genGUID();
					localStorage['viewDoc_in_'+$docId] = JSON.stringify(objViewDoc);
					theSSO.MP.viewDoc(localStorage.Artifact, $docId, signType);
				}
				
			//1080117	Leslie[1071239]	因應舊公文需求，先取得公文資訊，再確實的叫用FileServer的WebFileIO	--END--
			}).fail(function(rslt){
				alert(rslt.errMsg);
			});
			//1080117	Leslie[1071239]	Merge舊公文調閱部分修改(From 2018.5.15 - Eric. bug-fix，內政部版)
			/*
			if(sUnvObj !== "") {
				var UnvObj = JSON.parse(sUnvObj);
				
				// 2018.11 - 1071045, Eric-先初步篩選以確認第一個group內容無異常
				if (signType=='P') {
					let _firstAtt = null;
					
					// 2018.12.13 - Eric, bug-fix
					let _unvDoc = UnvObj.UnvRoot.Doc;
					if (typeof _unvDoc=='object' && _unvDoc!=null) {
						if (Array.isArray(_unvDoc.Att)) {
							_firstAtt = _unvDoc.Att[0];
						}
						else {
							_firstAtt = _unvDoc.Att;
						}
					}

					// (1)是否沒有任何Att? (2)是否第一個Att的File內容異常(空字串)?
					if (typeof _firstAtt!='object' || typeof _firstAtt.File!='object') {
						alert('UNV內容異常 [1stAtt or 1stAtt.File is not an object]');
						theLogger.warn('-W- 無效的UNV內容, 第一個Doc.Att or Doc.Att.File 不為物件!');
						return;
					}
					else if (!Array.isArray(_firstAtt.File) && 
							 (typeof _firstAtt.File.FileName!='string' || _firstAtt.File.FileName.length===0 ||
							 typeof _firstAtt.File.FilePath!='string' || _firstAtt.File.FilePath.length===0)) {
						alert('UNV內容異常 [第一個頁面群組檔案路徑/名稱異常!]');
						theLogger.warn('-W- 無效的UNV內容, 第一個Doc.Att.File之FileName or FilePath不為有效字串!');
						return;
					}
				}
				
				var objViewDoc = {
					UNVObj:UnvObj,
					docInfoPage:"AKI802",
					openDocModule:(signType == 'E')?'AOL':'UniView',
					signType:signType,
					readOnlyMode:true
				};
				var $docId = sDocNo+'_'+Util.genGUID();
				localStorage['viewDoc_in_'+$docId] = JSON.stringify(objViewDoc);
				theSSO.MP.viewDoc(localStorage.Artifact, $docId, signType);
			}*/
			//1080117	Leslie[1071239]	Merge舊公文調閱部分修改(From 2018.5.15 - Eric. bug-fix，內政部版)	--END--
		}
	});
	$(document).on('click','#queryListEdit',function(){
		if($(this).text() == '編輯'){
			$('.btn_Query_Del_Btn').show();
			$(this).text('完成');
		}
		else{
			var delBuffer = theSSO.MP.queryDocList.DeleteBuffer;
			if(delBuffer.length > 0){
				if(window.confirm('檢索清單已編輯，是否儲存?')){
					var EnvName = 'USER_VIEW_LIST';
					var docList = new Array();
					while(delBuffer.length > 0){
						//1130913	Leslie[1130616]	改為刪除清單中的公文紀錄，再一次重整
						// delBuffer.pop().remove();
						let beDelete = delBuffer.pop();
						theSSO.MP.queryDocList.builder.delDocList(beDelete.find('td[data-prop="docNo"]').jqmData('docno'));
					}
					//1131104	Leslie[勤益序351]	只刪一次會存到刪除前的文號，修改儲存前取得文號清單方式
					/*$('#querydoc_todolist_tb tbody').find('td[data-prop="docNo"]').each(function(index){
						docList[index] = $(this).text();
					})
					var sDocListJSON = JSON.stringify(docList)*/
					var sDocListJSON = theSSO.MP.queryDocList.builder.getDocList();
					theWebServices.QueryDoc.UpdateUserEnvSet(localStorage.Artifact,EnvName,sDocListJSON,false);
					//1130913	Leslie[1130616]	改為刪除清單中的公文紀錄，再一次重整					
					window.QueryDocUtil.initQueryDocList_List()
				}
				else{
					while(delBuffer.length > 0)
						//delBuffer.pop().show();
						delBuffer.pop().removeClass('querydoc_ReadyToDelete').find('a.ui-btn').text('刪除');
				}
			}
			$('.btn_Query_Del_Btn').hide();
			$(this).text('編輯');
		}
	});
	$(document).on('click','.btn_Query_Del_Btn',function(event){
		var $TR = $(event.target).closest('tr');
		if($TR.find('a.ui-btn').text() == '刪除'){
			$TR.find('a.ui-btn').text('取消');
			$TR.addClass('querydoc_ReadyToDelete');
			theSSO.MP.queryDocList.DeleteBuffer.push($TR);
		}
		else{
			$TR.find('a.ui-btn').text('刪除');
			$TR.removeClass('querydoc_ReadyToDelete');
			theSSO.MP.queryDocList.DeleteBuffer.splice($.inArray($TR,theSSO.MP.queryDocList.DeleteBuffer));
		}		
	});
})(jQuery);



function QueryDoc()
{
	var builder = QueryDocListBuilder();
	var paraUserViewList = 'USER_VIEW_LIST';
	var _objDeleteBuffer = new Array();
	var _bInitListSuccess = false;
	
	var _GetQueryDocList = function(argArtifact){
		var _dfd = $.Deferred();
		var strdocList = theWebServices.QueryDoc.GetUserEnvSetting(argArtifact,paraUserViewList).RtnStr;
		if(strdocList == "" || strdocList == "[]")
		{
			builder.clearQueryDoc_List('querydoc_todolist_tb > tbody');
			_dfd.reject(new Error('GetUserEnvSetting['+paraUserViewList+'] = 空'));
			return _dfd.promise();
		}
		var docList = JSON.parse(strdocList);
		
		if(docList && docList.length > 0){
			theWebServices.QueryDoc.getQueryDocList(argArtifact,docList,{async:true})
			.then(function(rslt){
				
				if(rslt.m_bSuccess){
					if(rslt.DocInfos.length > 0){
						theLogger.log('QueryDocList cnt=' + (rslt.DocInfos.length)); 
						builder.init(rslt.DocInfos);
					}
				}
				else{
					theLogger.log('QueryDocList Worm='+rslt.m_strErrMsg);
				}
				_dfd.resolve();
			})
			.fail(function(err){
				theLogger.log('QueryDocList errMsg='+err.message);
				_dfd.reject(new Error('QueryDocList errMsg='+err.message));
			});
		}
		
		return _dfd.promise();
	}
	
	var _init = function(){
        try { // 2016.10.26 - Eric, bug tracking
		_GetQueryDocList(localStorage['Artifact']).then(function(){
			QueryDocUtil.initQueryDocList_List();
			_bInitListSuccess = true;
		})
		.fail(function(err){
			theLogger.log('GetQueryDocList Err='+err.message);
			_bInitListSuccess = false;
		});
        }
        catch(e) {
            theLogger.error('GetQueryDocList Err='+ e.message);
            _bInitListSuccess = false;
        }
	}
	
	this.CallBackByImgView = function(){
		_init();
		if($('#aki800ListWorkspace').hasClass('doc_desktop_hiddenpage'))
			$('#tab_aki800').triggerHandler('click');
		if(window.focus)window.focus();
		//alert('檢索清單已完成。');	//Leslie	看起來只剩這個有作用(已試過各種Focus與Event)
		$('#btn_mp').triggerHandler("click");
		return _bInitListSuccess;
	}
	
	this.init = _init;
	this.builder = builder;
	this.DeleteBuffer = _objDeleteBuffer;
}

//回傳用來建立檢索清單之物件
function QueryDocListBuilder() {
	var that = {
		folderCount: 0,
		_nofilterfoldername:'全部',
		lights: { total: 0,
				  red: 0,
				  yellow:0,
				  white:0,
				  green:0,
				  purple:0
		},
		listCntrId : '',	// 條列待辦清單 ContainerId
		iconCntrId : '',    // 圖示待辦清單 ContainerId
		searchListCntrId : '', // 預覽視窗右方待辦清單 ContainerId
		listSortBy: '', // 條列清單排序用欄位 [預設: 文號]
		listFilterFolder: '',  // 條列清單指定要顯示的Folder/SubFolder
		searchListFilterFolder: '' // 搜尋清單指定要顯示的Folder/SubFolder
	};
	
	// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
	var _toolTip = {
		speed:{
			"1":"普通件",
			"2":"速件",
			"3":"最速件",
			"4":"不需填列",
		},
		secret:{
			"":"普通",
			"1":"普通",
			"2":"密件",
			"3":"密件",
			"4":"密件",
			"5":"密件",
		},
		signType:{
			"E": "線上簽核",
			"P": "紙本簽核",
			"W": "通知",
		},
	};
	
	var _self = this;
	var _doclist = [];
	var _sortfunc = {};
	
	var _odwmsgFieldList = [];
	var _proxySetting;
	
// inner functions
	function DocObject() {
		var _doc = this;
		
		function _init(ODWMSG_xn) {}
		function _get(attrName) {}
		function _set(name, value) {}
		
		this.init = _init;
		this.get = get;
		this.set = _set;
		
		return this;
	};
	
		/*
	 * Sorting compare functions
	 */
	
	/* sort by specific property's value [plan value]
	 * 目前用於 docNo, Subject, dueDate 欄位
	 */
	var _sortByValue = function(fieldName, a, b) {
		if (a[fieldName] == b[fieldName]) return 0;
		if (a[fieldName] > b[fieldName]) {
			return 1;
		}
		else {
			return -1;
		}
	};

	// sort by docNo
	var _sortByDocNo = function(a, b) {
		if (a.docNo == b.docNo) return 0;
		if (a.docNo > b.docNo) {
			return 1;
		}
		else {
			return -1;
		}
	};
	
	// sort by subject
	var _sortBySubject = function(a, b) {
		if (a.subject == b.subject) return 0;
		if (a.subject > b.subject) {
			return 1;
		}
		else {
			return -1;
		}
	};
	
	// sort by 辦理期限
	_self._sortByDueDate = function(a, b) {
		if (a.dueDate == b.dueDate) return 0;
		
		if (b.dueDate.length==0)
			return -1;
		
		if (a.dueDate > b.dueDate) return 1;
		
		return -1;
	};
	
	_sortfunc.sort_docno =_sortByDocNo;
	_sortfunc.sort_subject = _sortBySubject;
	_sortfunc.sort_dueDate = _sortByDueDate;
	
	/* 傳統table清單 - [目前使用]
	 * table item之相關style定義於css檔: ToDoList_List.css
	 * 
	 * 參數
	 * doc: 待辦項目的JS object.
	 * sn: [測試用]序號! (目前已不使用!)
	 */
	_self._createNewQueryDocItem_List = function(doc, sn) // doc is an object
	{
		/*
		<tr data-msgid="10207368" data-light="red">
			<td data-prop="speed"><img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png"></td>
			<td data-prop="secret"><img alt="sec:白" src="./IMAGE/ART/Todo-Secret1.png"></td>
			<td data-prop="signType" data-value="E"><img alt="signType:E" src="./IMAGE/ART/Todo-SignTypeOnline.png"></td>
			<td data-prop="dueDate">103/01/20</td>
			<td class="docno" data-prop="docNo">1030000567</td>
			<td data-prop="inchargeUserName">查爾斯一</td>
			<td data-prop="subject">檢索公文-001</td>
		</tr>
		*/
		
		var $item = $('<tr></tr>');
		var $subItem = null;
		
		// 序號, 測試用
		/*if (typeof sn == 'string' && sn.lenght) {
			subItem = $('<td>' + sn + '</td>');
		}
		else {
			subItem = $('<td>' + sn + '</td>');
		}
		if (!!subItem) {
			item.append(subItem);
		}*/
		
		// 速別: 1,普通, 2:速件, 3:最速件
		$subItem = $('<td data-prop="speed"></td>');
		var speed = doc.SPD_NO;
		switch(speed) {
		case "1": $subItem.append($('<img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png" />')); break;
		case "2": $subItem.append($('<img alt="Spd:速件" src="./IMAGE/ART/Todo-Speed2.png" />')); break;
		case "3": $subItem.append($('<img alt="Spd:最速件" src="./IMAGE/ART/Todo-Speed3.png" />')); break;
		}
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		$subItem.attr('title',_toolTip.speed[speed])
		if (!!$subItem)
			$item.append($subItem);
		
		// 密等: 1: 普通, 2:密, 3:機密, 4:極機密, 5:絕對機密
		$subItem = $('<td data-prop="secret"></td>');
		var secret = doc.SEC_NO;
		switch(secret) {
		case "1":
		case "":
			$('<img></img>').attr({alt:'sec:白', src:'./IMAGE/ART/Todo-Secret1.png'}).appendTo($subItem); break;
		case "2":
		case "3":
		case "4":
		case "5":
			$('<img></img>').attr({alt:'sec:黃', src:'./IMAGE/ART/Todo-Secret2.png'}).appendTo($subItem); break;
		}
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		$subItem.attr('title',_toolTip.secret[secret])
		
		if (!!$subItem) {
			$item.append($subItem);
		}
			
		// 2021.10 - 1100991 Eric, add htmlEncode
		// 簽核類型: 'E' -> 線上, 'P' -> 紙本
		$subItem = $('<td data-prop="signType" data-value="'+ theSSO.Util.htmlEncode(doc.SIGN_TYPE) +'"></td>');
		switch(doc.SIGN_TYPE) {
		case "E": $('<img></img>').attr({alt:'signType:E', src:'./IMAGE/ART/Todo-SignTypeOnline.png'}).appendTo($subItem); break;
		case "P": $('<img></img>').attr({alt:'signType:P', src:'./IMAGE/ART/Todo-SignTypePepper.png'}).appendTo($subItem); break;
		}
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		$subItem.attr('title',_toolTip.signType[doc.SIGN_TYPE])
		if (!!$subItem)
			$item.append($subItem);
			
		// 辦理期限
		if (doc.DUE_DATE.length==7) {
			var sDate = doc.DUE_DATE.substring(0, 3) + '/' + doc.DUE_DATE.substring(3, 5) + '/' +
			            doc.DUE_DATE.substring(5, 7);
			$subItem = $('<td data-prop="dueDate">' + theSSO.Util.htmlEncode(sDate) + '</td>');
		}
		else {
			$subItem = $('<td data-prop="dueDate"></td>');	
		}
		if (!!$subItem)
			$item.append($subItem);
		
		// 文號
		if (doc.DOC_NO.length) {
			$subItem = $('<td class="docno context-menu-todo" data-prop="docNo" data-docno="' + theSSO.Util.htmlEncode(doc.DOC_NO) + '">' + theSSO.Util.htmlEncode(doc.DOC_NO) + '</td>');
		}
		else {
			$subItem = $('<td class="docno" data-prop="docNo" data-docno=""></td>');
		}
		if (!!$subItem)
			$item.append($subItem);
			
		// 承辦人
		if (doc.RPSEMP_NAME.length) {
			$subItem = $('<td data-prop="inchargeUserName">' + theSSO.Util.htmlEncode(doc.RPSEMP_NAME) + '</td>');
		}
		else {
			$subItem = $('<td data-prop="inchargeUserName"></td>');
		}
		if (!!$subItem)
			$item.append($subItem);
		
		// 主旨
		if (doc.FROM_SUBJECT.length) {
			var sSubj = '';
			var len = 256;
			if (doc.FROM_SUBJECT.length > len) {
				sSubj = doc.FROM_SUBJECT.substr(0, len);
				sSubj += '...';
			}
			else {
				sSubj = doc.FROM_SUBJECT;
			}
			$subItem = $('<td data-prop="subject" class="to_e">' + theSSO.Util.htmlEncode(sSubj) + '</td>');
		}
		else {
			$subItem = $('<td data-prop="subject" class="to_e"></td>');
		}
		//刪除鈕
		var $btDel = $('<div class="btn_Query_Del_Btn"><a href="#" class="ui-btn ui-btn-d ui-btn-inline ui-mini" data-inline="true">刪除</a></div>');
		$subItem.append($btDel);
		
		if (!!$subItem)
			$item.append($subItem);
			
		return $item;
	};
	
	// 取得圖示公文項目(HTML dom object)
	_self._createNewQueryDocItem_Icon = function(doc) // doc is an object
	{
		/*<li data-msgid="$msgId$">
			<div class="item normal_item working_item opened_normal_item">
				<div class="content">
					<div class="lights">
						<img alt="type:線上簽核" src="./IMAGE/ART/Todo-SignTypeOnline.png"/>
					</div>
					<div class="docNo">
						<a class="folioLink" href="#" data-docno="1000001001" data-msgid="100233">1000001001</a>
					</div>
					<div class="subject">
						<span>測試公文主旨一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</span>
					</div>
					<div class="clerk">
						<img alt="承辦人" src="./IMAGE/ART/Todo-IconUser.png"/>
						<p>人事室二科 查爾斯一</p>
					</div>
				</div>
			</div>
		</li>
		*/
		
		var $item = $('<li></li>');
		var $outer = $('<div></div')
					.attr('class', 'item')
					.appendTo($item);
					
	    var $content = null;
		// 依公文速別/密等區分底色		//Leslie	先留著
		//var extraClass = _getItemExtraClass(doc);
		//$outer.addClass(extraClass);
		
		$content = $('<div></div>').attr('class', 'content').appendTo($outer);
		var $lights = $('<div data-prop="signType" data-value='+ theSSO.Util.htmlEncode(doc.SIGN_TYPE)+'></div>').attr('class', 'lights').appendTo($content);
		
		var $subItem = null;
		
		// 線上/紙本簽核
		if (doc.SIGN_TYPE=='E') {
			$('<img></img>').attr('src', './IMAGE/ART/Todo-SignTypeOnline.png').appendTo($lights);
		}
		else {
			$('<img></img>').attr('src', './IMAGE/ART/Todo-SignTypePepper.png').appendTo($lights);
		}
		
		// 文號
		var sDocNo = doc.DOC_NO;
		if (sDocNo.length===0 && isDraft) {
			sDocNo = '[尚未取號]';
		}
		$subItem = $('<a>' + theSSO.Util.htmlEncode(sDocNo) + '</a>').attr({'class':'folioLink context-menu-todo', href:'#', 'data-docno':theSSO.Util.htmlEncode(doc.DOC_NO)});
		$('<div></div>').attr('class', 'docNo').append($subItem).appendTo($content);
		$subItem = null;
		
		// 主旨
		var subj = '';
		if (doc.FROM_SUBJECT.length>40) {
			subj = doc.FROM_SUBJECT.substring(0, 37) + '...';
		}
		else {
			subj = doc.FROM_SUBJECT;
		}
		
		//刪除鈕
		var btDel = '<div class="btn_Query_Del_Btn"><a href="#" class="ui-btn ui-btn-d ui-btn-inline ui-mini" data-inline="true">刪除</a></div>';
		
		var $subject = $('<div><span>' + theSSO.Util.htmlEncode(subj) + '</span>'+btDel+'</div>').attr('class', 'subject');
		$subject.appendTo($content);
		
		return $item;
	};
	
	// 2012.12.10 - 取得指定欄位的設定值
	var _getPropValue = function(DOC_NO, prop) {
		var targetDoc = null;
		for(var i=0; i<_doclist.length; i++) {
			var doc = _doclist[i];
			if (doc.DOC_NO == DOC_NO)
			{
				targetDoc = doc;
				break;
			}
		}
		
		if (!!targetDoc) {
			switch(prop){
				case "speed":
					return targetDoc.SPD_NO;
				case "secret":
					return targetDoc.SEC_NO;
				case "signType":
					return targetDoc.SIGN_TYPE;
				case "dueDate":
					return targetDoc.DUE_DATE;
				case "docNo":
					return targetDoc.DOC_NO;
				case "inchargeUserName":
					return targetDoc.RPSEMP_NAME;
				case "subject":
					return targetDoc.FROM_SUBJECT;
			}
		}
		
		return '';
	}
	
	var _init = function(jsonToDocList) {
		if ((typeof jsonToDocList=='undefined') || jsonToDocList==null)
			return -1;
		
		// 2013.10 - 清空內容!
		if (_doclist.length) {
			_doclist.splice(0, _doclist.length);
		}
		
		_doclist = jsonToDocList;
		
		return _doclist.length;
	};
	
	/*
	 * cntrId: container's id (<ul>)
	 * listId: 未使用??
	 * folder: 只列出指定公文夾內之公文.
	 * sortBy: 排序方式(尚未實作!)
	*/
	var _makeQueryDoc_List2 = function(cntrId, folder, listId, sortBy)
	{
		theLogger.log('-I- makeQueryDoc_List2() cntrId=' + cntrId + '.');
		
		//alert('_makeQueryDoc_List2() invoked!')
		if (typeof _doclist === 'undefined' || _doclist==null) {
			theLogger.error('Error! _makeQueryDoc_List2() _docList un-initialized!')
			return;
		}
		
		if (typeof cntrId==='undefined' || cntrId==null) {
			theLogger.error('Error! _makeQueryDoc_List2() cntrId is invalid!')
			return;
		}
		
		if (typeof listId==='undefined' || listId==null) {
			theLogger.error('Error! _makeQueryDoc_List2() listId is invalid!')
			return;
		}
		
		// 移除現有的
		_clearQueryDoc_List(cntrId);
		
		// 2014.1 - 記錄container Id
		that.listCntrId = cntrId;
		
		// 2011.11.14
		that.lights.total = 0; // 2012.1.30
		that.lights.red = that.lights.yellow = that.lights.white = 0;
		that.lights.green = that.lights.purple = 0;
		var ligth = '';
		
		var list = null; // <ul> element to be created!
		var doclist = null;
		var doc = null;
		var msgId = '';
		var cnt = 0;
				
		var docCnt = _doclist.length;

		var newItem=null;
		var i=0;
		var tmpFolder='';
		var createItem = false;
		var itemIndex = 0;
		
		if (!!sortBy && sortBy.length>0)
		{
			var doclist = [];
			
			// 先排序, 再產生 item
			for(i=0; i<docCnt; i++) {
				newItem = null;
				doc = _doclist[i];
				doclist.push(doc);	
			}
			
			// sort raw item list here...
			if (doclist.length>0) {
				// 先用文號排序後再以燈號排序...
				doclist.sort(_sortfunc['sort_light']);
			}
			
			itemIndex = 0;
			for(i=0, j=doclist.length; i<j; i++)
			{
				newItem = null;
				doc = doclist[i];
				
				if (doc.submitProcessing)
					continue;
				
				newItem = _self._createNewQueryDocItem_List(doc, itemIndex);
				if (!!newItem) {
					$('#'+cntrId).append(newItem);
				}
				itemIndex++;
			}
		}
		else { // 毋須排序 -> 依清單順序
			for(i=0; i<docCnt; i++)
			{
				newItem = null;
				doc = _doclist[i];
				
				newItem = _self._createNewQueryDocItem_List(doc, itemIndex);
				itemIndex++;
				
				if (!!newItem) {
					$('#' + cntrId).append(newItem);
				}
			}
		}
		
		//$('#' + cntrId + ' ul').listview();
		
		//_setupContextMenu('context-menu-todo');
		
		var id = $('#' + cntrId + ' ul').attr('id');
		theLogger.log('container\'s id=' + id);
	};
	
	var _makeQueryDocList_SearchList = function(cntrId)
	{
		theLogger.log('-I- _makeQueryDocList_SearchList() cntrId=' + cntrId + '.');
		
		// 移除現有的
		var oldlist = $('#' + cntrId);
		if (oldlist.children('li').length>0) {
			oldlist.empty();
		}
		
		// 2014.1 - 記錄container Id
		that.searchListCntrId = cntrId;
		
		var $cntr = $('#'+ cntrId);
		var docCnt = _doclist.length;
		var addAll = true;
		var add = false;
		
		var i=0, cnt=0;
		var $item = null;
		for(i=0; i<docCnt; i++)
		{
			doc = _doclist[i];
			
			if (doc.submitProcessing) {
				continue;
			}
						
			
			$item = _createNewQueryDocItem_Icon(doc);
			if (!!$item)
			{
				if (cnt==0) {
					// 設定上邊框
					$item.addClass('ui-corner-top');
				}
				$cntr.append($item);
				cnt++;
			}
		}
		
		//_setupContextMenu('context-menu-todo');
		
		if (!!$item) {
			// 設定下邊框
			$item.addClass('ui-corner-bottom');	
		}
	}
	
	function _getQueryDocListCount() {
		return _doclist.length;
	}
	
	function _getQueryDocObj(docNo){
		var len = _doclist.length;
		for(var i=0;i<len;i++)
			if(_doclist[i].DOC_NO == docNo)
				return _doclist[i];
		return null;
	}
	
	function _clearQueryDoc_List(cntrId){
		// 移除現有的
		var oldlist = $('#' + cntrId);
		if (oldlist.children('tr').length>0) {
			oldlist.empty();
		}
	}
	
	function _deleteDocList(docNo){
		var len = _doclist.length;
		for(var i=0;i<len;i++){
			if(_doclist[i].DOC_NO == docNo){
				_doclist.splice(i,1);
				return;
			}
		}
	}
	
	function _getDocList(){
		var rtn = new Array();
		for(var _doc in _doclist)		{
			rtn[_doc] = _doclist[_doc].DOC_NO;
		}
		return JSON.stringify(rtn);
	}
	
	that.makeQueryDoc_List = _makeQueryDoc_List2;
	that.makeToDoList_SearchList = _makeQueryDocList_SearchList;
	that.clearQueryDoc_List = _clearQueryDoc_List;
	that.delDocList = _deleteDocList;
	that.getDocList = _getDocList;
	that.init = _init;
	
	that.getPropValue = _getPropValue;
	that.getQueryDocListCount = _getQueryDocListCount;
	that.getQueryDocObj = _getQueryDocObj;
	
	return that;
}