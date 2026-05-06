// DATE		SA			PRG			MGR_NO		DESC
// 1060707	Raymond		Raymond		1060361		新增範本功能
// 1081023  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.click => $.on('click', ...
// 1081203	Raymond		Raymond		-------		修正點選自訂範本項目後未顯示"加入"、"刪除"按鈕的問題
// 1081210	Raymond		Raymond		1080786		合併內政部單號1070657, 修正新增自訂範本稿件時未傳入id問題(共通版的自訂範本沒有類別cls屬性)
// 1090423	Raymond		Raymond		1090257		點選個人範本加入時, 新增傳入type屬性, 設為2表示為個人範本
// 1100917	Raymond		Raymond		1080763		合併1070348, popPrivSample移到nsEditor下提供SSO呼叫, 新增支援類別階層等功能
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式下不提供自訂範本功能

if(!("nsEditor" in window))
	window.nsEditor = {};
	
window.nsEditor.onNewDraft = function(event, callback){
	var $viewPort = event.data;
	var panelWidget = $viewPort.closest("#aol").data("panelWidget");
	var that = this;	// FolioModel物件
	
	Util.getDlg("RD-NewDraft.html").done(function($dlg) {
		
		panelWidget.open($dlg, function() {
			var $pnl = $(this);	// 1060707 Raymond $pnl取代$(this)
			var $divUl = $pnl.find("#divUl");
			//var $divUl = $(this).find("#divUl");
			
			thePublicRsrc.populateTmpl($divUl, null, function(tmplName, rsrcFile) {
				theLogger.log("加入樣版文稿'" + tmplName + "'(" + rsrcFile.name + ")");
				
				that.newDraft(rsrcFile)
					.done(function(draftIdx) {
						if($.isFunction(callback))
							callback(draftIdx);
					})
					.fail(function(errorText) {
						alert(errorText);
					});
				panelWidget.close();
			}, null, true);	// 2016.11.3 AOL的新增文稿清單不顯示「開啟舊檔」按鈕
			
			// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下不提供範本功能
			if(!!theSSO && theSSO.offlineMode == true) {
				$pnl.find("#newSample").hide();
			}
			else {
			// 1060707 Raymond 1060361 新增共用範本功能
			var $divUl2 = $pnl.find("#divUl2");
			thePublicRsrc.populateSample($divUl2, null, function(sampleName, rsrcFile) {
				theLogger.log("加入範本文稿'" + sampleName + "'(" + rsrcFile.name + ")");
				
				that.newDraft(rsrcFile)
					.done(function(draftIdx) {
						if($.isFunction(callback))
							callback(draftIdx);
					})
					.fail(function(errorText) {
						alert(errorText);
					});
				panelWidget.close();
			}, null);
			
			// 1100922 Raymond 1080763 合併1070348, popPrivSample加到nsEditor下, 以提供SSO呼叫
			//popPrivSample($divUl2, null, function(sampleName, rsrcFile) {	// onClickAdd callback
			nsEditor.popPrivSample($divUl2, null, function(sampleName, rsrcFile) {	// onClickAdd callback
				theLogger.log("加入個人自訂範本文稿'" + sampleName + "'(ID:" + rsrcFile.id + ", FilePath:" + rsrcFile.filePath + ", Class:" + rsrcFile.cls + ")");
				
				that.newDraft(rsrcFile)
					.done(function(draftIdx) {
						if($.isFunction(callback))
							callback(draftIdx);
					})
					.fail(function(errorText) {
						alert(errorText);
					});
				panelWidget.close();
			}, function($li, rsrcFile) {	// onClickDel callback
				theLogger.log("刪除個人自訂範本文稿'" + rsrcFile.name + "'(ID:" + rsrcFile.id + ", FilePath:" + rsrcFile.filePath + ")");
				
				// 1100917 Raymond 1080763 合併1070348, 新增傳入rsrcFile.cls做為新增的sampleClass參數
				//theWebServices.delPrivateExample(rsrcFile.wfioUrl, nsEditor._sampleRootPath, rsrcFile.filePath, rsrcFile.id)
				theWebServices.delPrivateExample(rsrcFile.wfioUrl, nsEditor._sampleRootPath, rsrcFile.filePath, rsrcFile.id, rsrcFile.cls)
					.done(function(sampleId, filePath) {
						theLogger.log("刪除'" + filePath + "'(ID:" + sampleId + ")成功");
						// 1100917 Raymond 1080763 合併1070348, 支援類別
						if($li.closest(".ui-collapsible").length && typeof filePath === "string" && filePath.length > 0) {	// 1100922 Raymond 用filePath是否為空判斷是否為刪除類別, 刪除類別的話, 不用計算剩餘範本數量
							var counts = $li.closest(".ui-collapsible").find("> h2 .ui-li-count").text();
							$li.closest(".ui-collapsible").find("> h2 .ui-li-count").text(counts - 1);
						}
						$li.remove();
						// 1100917 Raymond 1080763 合併1070348, 支援類別
						//var counts = $divUl2.find("> li").eq(0).find(".ui-li-count").text();
						//$divUl2.find("> li").eq(0).find(".ui-li-count").text(counts - 1);
						// 1100917 Raymond 1080763 合併1071123, 設置localStorage旗標, 供MP的範本清單檢查刷新
						localStorage['refreshSampleList'] = "true";
					})
					.fail(function(errorText) {
						theLogger.log("刪除'" + rsrcFile.filePath + "'(ID:" + rsrcFile.id + ")失敗 - " + errorText);
						alert(errorText);
					});
			}, null);
			
			// 1060707 Raymond 106361 新增切換樣版/範本
			$pnl.find("#newTmpl").on('click', function() {
				$pnl.find("#divUl").show();
				$pnl.find("#divUl2").hide();
				$(this).addClass("ui-btn-active");
				$pnl.find("#newSample").removeClass("ui-btn-active")
			});
			$pnl.find("#newSample").on('click', function() {
				$pnl.find("#divUl").removeClass("ui-btn-active").hide();
				$pnl.find("#divUl2").addClass("ui-btn-active").show();
				$(this).addClass("ui-btn-active");
				$pnl.find("#newTmpl").removeClass("ui-btn-active")
			});
			}	// end of if(!theSSO || theSSO.offlineMode != true)
		});
	});
	
};

// 1100917 Raymond 1080763 合併1070348, popPrivSample加到nsEditor下, 以提供SSO呼叫
// 1060707 Raymond 1060361 展開自訂範本樹狀目錄, 第1個參數傳入UL, 第2個參數傳入選取的callback, 第3個參數傳入點擊"新增"的callback, 第4個參數傳入點擊"刪除"的callback, 第5個參數提供過濾清單項目功能
nsEditor.popPrivSample = function($divUl, onSelect, onClickAdd, onClickDel, filter) {
	
	function recursive(nd, $ul, ulAmount, wfioUrl, rootPath) {
		var counts = 0;
		for (var i=0; i<nd.childNodes.length; i++) {
			// 1100917 Raymond 1080763 合併1070348, 新增支援類別
			if(nd.childNodes[i].nodeType == 1 && nd.childNodes[i].nodeName == "類別") {
				var clsNm = nd.childNodes[i].getAttribute("名稱");
				var $ul2 = $('<li style="padding:0px" class="ui-li-has-count">\
								<div data-role="collapsible" data-inset="false" data-theme="b" data-collapsed="false">\
									<h2 style="margin:0px">' + ((clsNm.length > 0)?clsNm:"&nbsp;") + '<span class="ui-li-count">0</span></h2>\
									<ul data-role="listview" data-inset="false"></ul>\
								</div>\
							</li>').appendTo($ul).find("ul");
				$ul2.closest("div").find("h2").data("rsrcFile", {name: clsNm}).on('click', function(event) {
					event.preventDefault();
					$divUl.find("a button").remove();
					$divUl.find("a").removeClass("ui-btn-active");
					var $h2 = $(this);
					
					if($.isFunction(onClickDel)) {	// 若無onClickDel callback function, 則不顯示「刪除」按鈕
						$("<button>刪除</button>").appendTo($h2.find("a")).buttonMarkup({corners: true, shadow: true, theme: 'b', inline: true})
							.on('click', function(evt) {
								evt.preventDefault();
								if (parseInt($h2.find(".ui-li-count").text()) == 0 || confirm("刪除此類別一併將以下範本刪除, 是否確定刪除?")) {
									var rsrcFile = $h2.data("rsrcFile");
									onClickDel($h2.closest("li"), {name: rsrcFile.name, id: "", wfioUrl: wfioUrl, filePath: ""/*rootPath*/, cls: rsrcFile.name});
								}
								return false;
							});
					}
				});
				recursive(nd.childNodes[i], $ul2, ulAmount, wfioUrl, rootPath);
				$ul2.listview();
				$ul2.closest("div[data-role='collapsible']").collapsible();
			}
			else if(nd.childNodes[i].nodeType == 1 && nd.childNodes[i].nodeName == "檔案") {
				if(!filter || ($.isFunction(filter) && filter(nd.childNodes[i]))) {	// 未設定filter callback function或filter回傳true則顯示此項目
					var fileData = {
						name: $(nd.childNodes[i]).attr("範本名稱"),
						id: $(nd.childNodes[i]).attr("ID"),
						cls: $(nd).attr("名稱")	// 1100917 Raymond 1080763 合併1070348, 新增類別名稱
					};
					fileData.path = fileData.id + ".xml";
					counts++;
					$("<li data-theme='c' class='list' data-icon='false'><a></a></li>").appendTo($ul).find("a")
						//.attr("href", "pic/" + nd.children[i].path)
						.text(fileData.name)
						.data("rsrcFile", fileData)
						//.on('click', 'a', function(event) {
						.on('click', function(event) {	// 1081203 Raymond 修正點選自訂範本項目後未顯示"加入"、"刪除"按鈕的問題
							event.preventDefault();
							
							$divUl.find("a button").remove();
							$divUl.find("a").removeClass("ui-btn-active");
							$(this).addClass("ui-btn-active");
							
							if($.isFunction(onSelect))
								onSelect($(this).data("rsrcFile").name, $(this).data("rsrcFile"));
							
							if($.isFunction(onClickAdd)) {	// 若無onClickAdd callback function, 則不顯示「加入」按鈕
								$("<button style='right:72px;'>加入</button>").appendTo(this).buttonMarkup({corners: true, shadow: true, theme: 'b', inline: true})
									.on('click', function(evt) {
										evt.preventDefault();
										var $a = $(this).closest("a");
										var rsrcFile = $a.data("rsrcFile");
										// 1100917 Raymond 1080763 合併1070348, 新增cls
										// 1090423 Raymond 1090257 個人範本新增type屬性並設為2
										// 1081210 Raymond 1080786 合併內政部單號1070657, 修正新增自訂範本稿件時未傳入id問題
										//onClickAdd(rsrcFile.name, {name: rsrcFile.name, wfioUrl: wfioUrl, filePath: rootPath + (rootPath.match(/\\$/)?"":"\\") + rsrcFile.path});
										//onClickAdd(rsrcFile.name, {name: rsrcFile.name, wfioUrl: wfioUrl, filePath: rootPath + (rootPath.match(/\\$/)?"":"\\") + rsrcFile.path, id: rsrcFile.id});
										//onClickAdd(rsrcFile.name, {name: rsrcFile.name, wfioUrl: wfioUrl, filePath: rootPath + (rootPath.match(/\\$/)?"":"\\") + rsrcFile.path, id: rsrcFile.id, type:2});
										onClickAdd(rsrcFile.name, {name: rsrcFile.name, wfioUrl: wfioUrl, filePath: rootPath + (rootPath.match(/\\$/)?"":"\\") + rsrcFile.path, id: rsrcFile.id, type:2, cls: rsrcFile.cls});
										return false;
									});
							}
							
							if($.isFunction(onClickDel)) {	// 若無onClickDel callback function, 則不顯示「刪除」按鈕
								var $li = $(this).closest("li");
								$("<button>刪除</button>").appendTo(this).buttonMarkup({corners: true, shadow: true, theme: 'b', inline: true})
									.on('click', function(evt) {
										evt.preventDefault();
										var $a = $(this).closest("a");
										var rsrcFile = $a.data("rsrcFile");
										// 1100917 Raymond 1080763 合併1070348, 新增cls
										//onClickDel($li, {name: rsrcFile.name, id: rsrcFile.id, wfioUrl: wfioUrl, filePath: rootPath + (rootPath.match(/\\$/)?"":"\\") + rsrcFile.path});
										onClickDel($li, {name: rsrcFile.name, id: rsrcFile.id, wfioUrl: wfioUrl, filePath: rootPath + (rootPath.match(/\\$/)?"":"\\") + rsrcFile.path, cls: rsrcFile.cls});
										return false;
									});
							}
							return false;
						});
				}
			}
		}
		//$ul.closest("li").find(".ui-li-count").text(counts);	// 更新數量
		$ul.closest("li").find("> div > h2 > .ui-li-count").text(counts);	// 更新數量
	}
	// 呼叫WebService取得個人自訂的範本清單
	theWebServices.getPrivateExamples({
		success: function(nd) {
		
			nsEditor._sampleRootPath = $(nd).attr("路徑");			// 個人自訂範本的路徑
			nsEditor._sampleWFIOUrl = $(nd).attr("WebfileioURL");	// 及WebFileIO網址, 儲存在nsEditor下
			$divUl.find("> li").eq(0).find("ul").empty();
			recursive(nd, $divUl.find("> li").eq(0).find("ul") ,1, nsEditor._sampleWFIOUrl, nsEditor._sampleRootPath);
			$divUl.find("> li").eq(0).find("ul").listview("refresh");
		},
		error: function(errorText) {
			theLogger.error(errorText);
			alert(errorText);
		}
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-NewDraft.js").finish();

})();