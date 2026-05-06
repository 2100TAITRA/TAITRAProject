/*	DATE		MGRNO		SA		PG		Desc
	1111122		1110863		Leslie	Leslie	新增附件下載子視窗
	1141021		序310		Leslie	Leslie	修正因採用DOMPurify套件後，全選及清除鍵異常問題
*/
// 附件下載功能模組
//	掛在nsEditor命名空間下
//	
var nsEditor = nsEditor||{};

nsEditor.onExportAttVisible = function() {
	return true;
}

nsEditor.onExportAtt = function(event, fm, callBack){
	
	if(!!fm.durringDownloadAll) {	// 防呆
		theLogger.warn("前次作業仍在下載中, 請稍後再試!");
		alert("前次作業仍在下載中, 請稍後再試!");
		return;
	}
	
	var $viewPort = event.data;
	var that = this;	//附件下載頁籤
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	var _refAtt = fm.getRefAttachsClone();		//參考附件
	var _tmpAtt = fm.getTmpAttachsClone();		//簽閱附件
	var _dlAttObj = [];
	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	
	Util.getDlg("RD-ExportAtt.html").done(function($dlg) {
		var $ul = $dlg.find('#DLAttList');
		
		$dlg.find("header > h1").unwrap();
		$dlg.find("#btnN").on('click', function() {
			$.modal.close();
			// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
			if(isMobile)
				window.history.back();
		});
		$dlg.find("#btnY").on('click', function() {
			_dlAttObj = [];
			$ul.find(':checked').each(function(){
				_dlAttObj.push($(this).closest('li').data('attObj'));
			})
			if(_dlAttObj.length > 0){
				dlAttach(0);
				
				$.modal.close();
				// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
				if(isMobile)
					window.history.back();
			}
			else{
				if(confirm("未選取任一附件,是否要關閉視窗？")) {
					$.modal.close();
					// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
					if(isMobile)
						window.history.back();
				}
			}
		});
		//1141021	Leslie[序310]	修正因採用DOMPurify套件後，全選及清除鍵異常問題
		// $dlg.find("#all").on('click', function() {
		$dlg.find("#exportAll").on('click', function() {
			$ul.find(':checkbox').prop('checked',true);
		});
		$dlg.find("#obverse").on('click', function() {
			$ul.find(':checkbox').each(function(){
				let c = $(this).prop('checked');
				$(this).prop('checked',!c);
			})
		});
		//1141021	Leslie[序310]	修正因採用DOMPurify套件後，全選及清除鍵異常問題
		// $dlg.find("#clear").on('click', function() {
		$dlg.find("#exportClear").on('click', function() {
			$ul.find(':checkbox').prop('checked',false);
		});
		
		var colWidths = [];
		var $list = $dlg.find("#DLAttList");
		
		$dlg.find(".ui-table-header .ui-table-column-header").each(function(i, elem) {
			colWidths.push($(elem).css("width"));
		});
		
		
		$.modal($dlg, {
			appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
			overlayCss: {width: w, height: h},
			containerCss: {width: "600px", height: "480px"},
			close: false,
			onShow: function() {
				if(isMobile)
					window.history.pushState({foo: "bar"}, "附件下載子視窗", "#");
				
				$dlg.trigger("create");
				try{
					var idxTotal = 0;
					var n = fm.getDraftCounts();
					if(fm.getSignType() == "E" && fm.getSignFolder().hasFromDoc())
						--n;
					for(var idxDf = 0;idxDf < n;idxDf++){
						var dfName = fm.getDraftName(idxDf);
						var nCnt = fm.getDraftAttCounts(idxDf);
						var dPath = fm.getDraftDirPath(idxDf);
						for(var idxAtt = 0;idxAtt < nCnt;idxAtt++){
							var attFName = fm.getDraftAttFileName(idxDf,idxAtt);
							var attName = fm.getDraftAttName(idxDf,idxAtt);
							var blbNm = fm.getDraftAttOrigFileName(idxDf,idxAtt);
							//1111202	Leslie	線上簽核公文由封裝檔取得檔案名稱含有目錄，僅取得檔名部分
							blbNm = blbNm.match(/^blob:/)?blbNm:blbNm.split('\\').pop();
							addItem(idxTotal++,`${dfName}：${attName}`,attFName,blbNm,dPath);
						}
					}
					
					var docPath = `${theAOL.docObj.fileStoragePath}\\${theAOL.docObj.fileSubDir}`;
					var tRefAtt = _refAtt.length;
					for(var i=0;i<tRefAtt;i++)
					{
						var nd = _refAtt[i];
						if(!nd._delMsgId){
							var nm = nd.Title,
								fname = nd.Filename,
								blbNm = (nd.blbName)?nd.blbName:nd.Filename;
															
							addItem(idxTotal++,`參考附件：${nm}`,fname,blbNm,`${docPath}\\_RefAtt`);
						}
					}
					
					var tTmpAtt = _tmpAtt.length;
					for(var i=0;i<tTmpAtt;i++)
					{
						var nd = _tmpAtt[i];
						if(!nd._delMsgId){
							var nm = nd.Title,
								fname = nd.Filename,
								blbNm = (nd.blbName)?nd.blbName:nd.Filename;
															
							addItem(idxTotal++,`簽閱附件：${nm}`,fname,blbNm,`${docPath}\\_TmpAtt`);
						}
					}
					
					$ul.listview("refresh");
				}
				catch(e){
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					alert(e.message);
				}
			}
		});
		
		function addItem(i, nm, fname, blbNm, fPath) {
			var $li = $("<li class='ui-table-item'></li>");
			$("<div class='ui-table-column-item'><input type='checkbox'/><span id='tmpFileName' title='"+fname+"'>" + nm + "</span></div>").appendTo($li).css("width", colWidths[1]);
			
			$li.appendTo($list)
			.data("attObj", {blbName: blbNm, idx: i, name: nm, fileName: fname, filePath: fPath})
			.on('click', function(event) {
				if(event.target.tagName == 'INPUT')
					return;
				let ck = $(this).find(':checkbox').prop('checked');
				$(this).find(':checkbox').prop('checked',!ck);
			});
		}
		
		function now() {
			function padLeft(num, len) {
				if(typeof num != "string")
					num = num.toString();
				if(num.length >= len)
					return num;
				else
					return arguments.callee("0" + num, len);
			}
			var t = new Date();
			if(navigator.userAgent.indexOf("Trident") >= 0)
				return padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " ";
			return "%c" + padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " %c";
		}
		
		var q = [];
		function dlAttach(idxAtt) {
			var attObj = _dlAttObj[idxAtt];
			if(attObj.blbName.match(/^blob:/)) {	// 客戶端剛新增的附件
				theLogger.log(`另存BLOB附件(${attObj.blbName}) - '${attObj.name}', '${attObj.fileName}'`);
				q.push({fn: attObj.fileName, dat: attObj.blbName, isBlobUrl: true});
				
				if(idxAtt+1 < _dlAttObj.length)
					dlAttach(idxAtt + 1);
				else
					finish();
			}
			else {	// 從Server上下載附件電子檔
				theLogger.log(`${now()}下載非BLOB附件 - '${attObj.name}', '${attObj.blbName}'`, "color:blue;", "color:black");
				var wfio = new WebFileIO(fm.fileIOWS);
				wfio.download(attObj.filePath, attObj.blbName, {
					keepRawData: true,	// 保持原始資料格式(Typed Array)
					success: function(fil, all) {
						q.push({fn: attObj.blbName, dat: fil});
						
						if(idxAtt+1 < _dlAttObj.length)
							dlAttach(idxAtt + 1);
						else
							finish();
					},
					error: function(errorText) {
						theLogger.error("下載'" + attObj.blbName + "'失敗! " + errorText);
						alert("另存'" + attObj.blbName + "'失敗!\r\n" + errorText);
						if("durringDownloadAll" in fm) {	// 防呆
							delete fm.durringDownloadAll;
							if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
								clearTimeout(nsEditor.durringDownloadAllTimer);
								delete nsEditor.durringDownloadAllTimer;
							}
						}
					}
				});
			}
			
			function finish(){
				if(q.length > 0) {
					var zip = new JSZip();
					var it = 0;
					function doPack() {
						var job = q[it++];
						if(!job) {
							var fname = ((fm.getDocObj().docNo.length > 0)?fm.getDocObj().docNo:(theUserInfo.UserID + "_" + fm.getMsgId())) + "_Att.zip";
							theLogger.log("打包完成產生下載BLOB...下載檔名預設為'" + fname + "'");
							zip.generateAsync({type:"blob"})
							.then(function(content) {
								if("msSaveBlob" in navigator) {
									console.log("\t'" + content.type + "'(" + content.size + " bytes)");
									navigator.msSaveBlob(content, fname);
								}
								else {
									var url = URL.createObjectURL(content);
									console.log("\t%c'" + url + "%c'(" + content.size + " bytes)", "color:lightblue;", "color:lightblue;");
									var link = document.createElement("a");
									link.href = url;
									link.download = fname;
									document.body.appendChild(link);
									link.click();
									document.body.removeChild(link);
								}
								
								if("durringDownloadAll" in fm) {	// 防呆
									delete fm.durringDownloadAll;
									if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
										clearTimeout(nsEditor.durringDownloadAllTimer);
										delete nsEditor.durringDownloadAllTimer;
									}
								}
							});
						}
						else if(job.isBlobUrl) {	// 剛新增的附件電子檔
							theLogger.log("打包剛新增的附件電子檔-" + job.fn, job.dat);
							var xhr = new XMLHttpRequest();
							xhr.open('GET', job.dat, true);
							xhr.responseType = 'blob';
							xhr.onload = function(e) {
								if (this.status == 200) {
									console.log("\t'" + job.dat + "'(" + this.response.size + " bytes)");
									zip.file(job.fn, this.response);
									doPack();
								}
								else
									console.warn(this.status);
							};
							xhr.onerror = function(e) {
								theLogger.error("失敗!", e);
							};
							xhr.send();
						}
						else {	// 文稿檔或已上傳的附件電子檔
							theLogger.log("打包文稿或下載的附件電子檔-" + job.fn);
							zip.file(job.fn, job.dat);
							doPack();
						}
					}
					doPack();
				}
				else if("durringDownloadAll" in fm) {	// 防呆
					delete fm.durringDownloadAll;
					if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
						clearTimeout(nsEditor.durringDownloadAllTimer);
						delete nsEditor.durringDownloadAllTimer;
					}
				}
				return;
			}
		}
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ExportAtt.js").finish();
})();