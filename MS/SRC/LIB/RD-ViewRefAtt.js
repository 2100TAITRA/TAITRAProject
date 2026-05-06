/*	DATE		MGRNO		SA		PG		Desc
	1061120		1060990		Leslie	Leslie	增修於Tooltip顯示完整單位-人員名稱
	1080125		1070200		Leslie	Leslie	新增中興大學
	1080122		1080043		Leslie	Leslie	新增SHA256演算法
	1081023     1080339     Kevin   Eric    jQuery 3.0 upgrade
	1090522		1080781		Leslie	Leslie	Merge[1070334]增修可一次選擇並加入多個附件
	1090730		1090469		Leslie	Leslie	置換附件功能，應一併更新管理檔紀錄內容，以觸發儲存更新
	1100311		1100200		Leslie	Leslie	針對PDF檔，改為預設以新視窗直接開啟檢視
	1100329		1090927		Raymond	Raymond	修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
	1110823		1110649		Leslie	Leslie	改為可重覆開啟在不同分頁
	1111012		1110865		Leslie	Leslie	新增可顯示異動紀錄
	1111221		1111238		Leslie	Leslie	新增檔案拖拉加入附件功能
	1120417		1111005		Leslie	Leslie	[Merge]檔案拖移排序功能
	1120901 	1120709		Kevin	Leslie  弱掃修正Client Potential XSS
	1131108		北榮序326	Leslie	Zen		支援移交後新承辦人可刪除原有參考附件
	1131204		1131134		Leslie	Leslie	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
	1141217		1141162		Leslie	Leslie	新增參考附件檢核(檔案類型、檔案大小)
	1150112		1141162		Leslie	Leslie	修正參考附件白名單及容量限制設定(各機關自行決定是否啟用)
*/
// 參考附件功能模組
//	掛在nsEditor命名空間下
//	
var nsEditor = nsEditor||{};

nsEditor.onViewRefAttVisible = function() {
	return true;
}

nsEditor.onViewRefAtt = function(event, fm, callBack){	//2016.10.24	Leslie	增加取得傳入的FolioModel參數
	
	var $viewPort = event.data;
	var that = this;	//參考附件頁籤
	var _refAtt = fm.getRefAttachsClone();		//取得暫時管理檔供後續異動
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	var sn = 0;
	var _readWrite = fm.isRefAttachsEdit();
	var isDirty = false;
	//2016.12.27	Leslie	唯讀模式不判斷會辦
	//var _isConsultingDoc = SSOUtil.isConsultingDoc(theAOL.docObj,theSSO.User.EnvSettings,SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo))
	var _isConsultingDoc = (_readWrite)?SSOUtil.isConsultingDoc(theAOL.docObj,theSSO.User.EnvSettings,SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo)):false;
	//1080125	Leslie[1070200]	中興大學參考附件權限邏輯
	var editByChief = theSSO.User.EnvSettings.get("AOL_REFATT_EDIT_BY_CHIEF");
	// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	//1141217	Leslie[1141162]	新增參考附件可用的附件格式白名單及檔案大小限制
	//1150112	Leslie[1141162]	修正參考附件白名單及容量限制設定(各機關自行決定是否啟用)
	// var strAllowAttFmtP = ("WE_ALLOW_ATTACH_FMT_P" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_ALLOW_ATTACH_FMT_P"] : ("WE_ALLOW_GENPAGE_ATTACH_FMT" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_ALLOW_GENPAGE_ATTACH_FMT"] : "";	//紙本未設定白名單時，等同線上簽核的設定值
	// var strAllowRawAttFmt = ("WE_ALLOW_RAW_ATTACH_FMT" in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ALLOW_RAW_ATTACH_FMT"]:"";
	// var u_allowAttFmt = strAllowAttFmtP.split(';').concat(strAllowRawAttFmt.split(';'))
	// var u_allowAttSize = isNaN(parseInt(theSSO.User.SystemSets["TB_FILE_SIZE_LIMIT"], 10))? 5000 : parseInt(theSSO.User.SystemSets["TB_FILE_SIZE_LIMIT"], 10);
	var u_allowAttFmt = ("WE_ALLOW_REFATTACH_FMT" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_ALLOW_REFATTACH_FMT"].split(';') : ""; 
	var u_allowAttSize = isNaN(parseInt(theSSO.User.SystemSets["WE_ALLOW_REFATTACH_SIZE"], 10))? 1024*9999 : parseInt(theSSO.User.SystemSets["WE_ALLOW_REFATTACH_SIZE"], 10);
	
	Util.getDlg("RD-ViewRefAtt.html").done(function($dlg) {
		var $ul = $dlg.find('#refAttList');
		var choose;
		var currItem = undefined;
		
		//2016.12.15	Leslie	增加防止名稱被清空
		$dlg.find('#refAttList').on('blur','#refFileName',function(){if(this.innerHTML == ""){this.innerHTML=this.title;this.focus();}})
		
		$dlg.find("header > h1").unwrap();
		//$dlg.find("footer > div").unwrap();        
		$dlg.find("#btnN").on('click', function() {
			if(_readWrite && isDirty){
				if(!confirm("附件清單內容已異動, 請問是否不儲存異動, 關閉設定子視窗?"))
					return false;
			}
			$.modal.close();
			// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
			if(isMobile)
				window.history.back();
		});
		$dlg.find("#btnY").on('click', function() {
			if(_readWrite && isDirty){
				fm.commitRefAttachs(_refAtt);
				if(typeof callBack !== "undefined" && $.isFunction(callBack))
					callBack(that);
				if(confirm("附件已儲存完畢,是否要關閉視窗？")) {
					$.modal.close();
					// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
					if(isMobile)
						window.history.back();
				}
			}
			else {
				$.modal.close();
				// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
				if(isMobile)
					window.history.back();
			}
		});
		$dlg.find("#add").on('click', function() {
			$dlg.find("#addNew").trigger('click');
		});
		$dlg.find("#edit").on('click', function(){
			if(!choose){
				alert("請選擇欲置換之參考附件!");
				return ;
			}
			$dlg.find("#repAtt").trigger('click');
		});
		$dlg.find("#dl").on('click', function(){
			if(!choose){
				alert("請選擇欲下載之參考附件!");
				return ;
			}
			//1100311	Leslie[1100200]	針對PDF檔，改為預設以新視窗直接開啟檢視
			let fileType = choose.fileName.substring(choose.fileName.lastIndexOf('.')+1).toUpperCase();
			let dlFileName = (fileType == "PDF")?null:choose.fileName;
			if(choose.blbName.match(/^blob:/)) {
				// 2016.11.7 for IE-compatible
				if("msSaveBlob" in navigator) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', choose.blbName, true);
					xhr.responseType = 'blob';
					xhr.onload = function(e) {
						if (this.status == 200) {
							//var myBlob = this.response;
							navigator.msSaveBlob(this.response, choose.fileName);
						}
					};
					xhr.send();
				}
				else{
					//1100503	Leslie	針對信保現場電腦問題，調整attr的寫法
					/*$(this).attr({"data-role": "none",
						"href": choose.blbName,
						"rel": "external",
						"data-ajax": "false",
						"target": "new",
						//1100311	Leslie[1100200]	針對PDF檔，改為預設以新視窗直接開啟檢視
						//"download": choose.fileName});
						"download": dlFileName});*/
					$(this).attr({"data-role": "none",
						"href": choose.blbName,
						"rel": "external",
						"data-ajax": "false",
						//1110823	Leslie[1110649]	改為可重覆開啟在不同分頁
						//"target": "new"});
						"target": "_blank"});
					if(fileType == "PDF")
						this.removeAttribute('download');
					else
						$(this).attr('download',choose.fileName)
				}
			}
			else
			{
				theLogger.log("開啟非BLOB附件(" + choose.blbName + ")");
				var _attPath = fm.subDirPath + "\\_RefAtt\\"+choose.blbName;
				var _DocNo = (fm.getDocNo() == "")?"DRAFTDOC":(_attPath.match(fm.getDocNo()))?fm.getDocNo():"DRAFTDOC";	//2017.01.10	Leslie	增加判斷subDirPath裡面有沒文號(可能為已要號的草稿)
				theLogger.log(_attPath);
				var url = "/odtools/docatt.ashx?FileName=" + Base64.encode(_attPath) + "&SAMLart=" + localStorage['Artifact'] + "&DocNo=" + _DocNo;
				//1100503	Leslie	針對信保現場電腦問題，調整attr的寫法
				/*$(this).attr({"data-role": "none",
							"href": url,
							"rel": "external",
							"data-ajax": "false",
							"target": "new",
							//1100311	Leslie[1100200]	針對PDF檔，改為預設以新視窗直接開啟檢視
							//"download": choose.fileName});
							"download": dlFileName});*/
				$(this).attr({"data-role": "none",
							"href": url,
							"rel": "external",
							"data-ajax": "false",
							//1110823	Leslie[1110649]	改為可重覆開啟在不同分頁
							//"target": "new"});
							"target": "_blank"});
				if(fileType == "PDF")
					this.removeAttribute('download');
				else
					$(this).attr('download',choose.fileName)
			}
		});
		$dlg.find("#del").on('click', function(){
			if(!choose){
				alert("請選擇欲刪除之參考附件!");
				return ;
			}
			//$ul.find("li[data-hash='"+choose.hash+"']").remove();
			choose.refAtt.bDirty = true;	//註記該附件為本流程異動，儲存時需回寫
			choose.refAtt._delMsgId = theAOL.docObj.msgId;
			choose.refAtt._delBy = theSSO.User.name + ";" + getDateStrToSave(new Date());
			currItem.remove();
			isDirty = true;
		});
		var colWidths = [];
		var $list = $dlg.find("#refAttList");
		$dlg.find("#addNew").on('change', function() {
				if(this.files.length > 0) {
					//1090522	Leslie[1080781]	Merge[1070334]增修可一次選擇並加入多個附件
					//readFromFile(++sn,this.files[0]);
					//1090522	Leslie[1080781]	Merge[1070334]增修可一次選擇並加入多個附件
					var arFmtErr = [],arSizeErr = [];
					for(var i=0;i<this.files.length;i++){
						//1141217	Leslie[1141162]	新增參考附件可用的附件格式白名單及檔案大小限制
						var arfname = this.files[i].name.toUpperCase().split('.');
						var extName = (arfname.length > 1) ? arfname[arfname.length - 1] : "不合法的副件格式";
						var nFileSize = Math.ceil(this.files[i].size / 1024);
						if(u_allowAttFmt.indexOf(extName) < 0){
							arFmtErr.push(`[${this.files[i].name}]`);
							continue;
						}else if(nFileSize > u_allowAttSize){
							arSizeErr.push(`[${this.files[i].name}]`);
							continue;
						}

						readFromFile(++sn,this.files[i]);
					}	
					//1141217	Leslie[1141162]	新增參考附件可用的附件格式白名單及檔案大小限制			
					if(arFmtErr.length > 0 || arSizeErr.length > 0){
						var strFmtErr = arFmtErr.length > 0 ? `您所夾帶的附件\n${arFmtErr.join('\n')}\n不是符合現行規定的附件格式`:'';
						var strSizeErr = arSizeErr.length > 0 ? `\n您所夾帶的附件\n${arSizeErr.join('\n')}\n超過現行規定的附件大小[${u_allowAttSize}MB]`:'';
						alert(strFmtErr+strSizeErr+'\n請選擇符合規定的附件。');
					}
				/* $("<div class='ui-table-column-item'>" + (++n) + "</div>").appendTo($li).css("width", colWidths[0]);
				$("<div class='ui-table-column-item'><span contentEditable='true'>" + this.files[0].name + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item'>" + SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId) + "-" + theSSO.User.name + "</div>").appendTo($li).css("width", colWidths[2]);
				var now = new Date();
				$("<div class='ui-table-column-item'>" + (now.getYear() - 11) + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + "</div>").appendTo($li).css("width", colWidths[3]);
				$("<input type='file' style='display:none'>").appendTo($li);
				$li.appendTo($list).on('click', function() {
					$dlg.find(".ui-btn-active").removeClass("ui-btn-active");
					$(this).addClass("ui-btn-active");
					choose = $(this).data("fileObj");
				}); */
			}
		});
		
		$dlg.find("#repAtt").on('change', function() {
			if(this.files.length > 0) {
				if(currItem){
					if(this.files.length > 0) {
						var fil = this.files[0];
						try {
							//1141217	Leslie[1141162]	新增參考附件可用的附件格式白名單及檔案大小限制
							var arfname = fil.name.toUpperCase().split('.');
							var extName = (arfname.length > 1) ? arfname[arfname.length - 1] : "不合法的副件格式";
							var nFileSize = Math.ceil(fil.size / 1024);
							if(u_allowAttFmt.indexOf(extName) < 0)
								throw `您所夾帶的附件\n${fil.name}\n不是符合現行規定的附件格式\n請選擇符合規定的附件。`;
							else if(nFileSize > u_allowAttSize)
								throw `您所夾帶的附件\n${fil.name}\n超過現行規定的附件大小[${u_allowAttSize}MB]\n請選擇符合規定的附件。`;							

							//1071002	Leslie	改用可讀取大附件的方式，讀入附件檔
							/*var rdr = new FileReader();
							rdr.onload = function() {
								var hash = hex_md5(new Uint8Array(this.result));		// 2016.7.19 新增計算hash功能
								var blb = new Blob([this.result], {type: fil.type});	// 第1個參數要[]啊
								var blbNm = URL.createObjectURL(blb);
								var now = new Date();
								
								// 更新項目內容
								currItem.find("#refFileName").text(fil.name);
								currItem.find("#addCUser").text(SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId) + "-" + theSSO.User.name);
								currItem.find("#addTime").text((now.getYear() - 11) + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes());
								var fobj = currItem.data("fileObj");
								fobj.blbName = blbNm;
								fobj.desc = fil.name;
								fobj.size = fil.size;
								fobj.name = fil.name;
								fobj.fileName = fil.name;
								fobj.hash = hash;
								
								//2016.11.2	Leslie	更新參考附件工作檔的附件資訊
								fobj.refAtt.Filename = fil.name;
								fobj.refAtt.Hash = hash;
								fobj.refAtt.Title = fil.name;
								fobj.refAtt.NewTime = getDateStrToSave(now);
								
								isDirty = true;
							}
							rdr.readAsArrayBuffer(fil);*/
							//1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
							//fnSliceArrayBuffer(fil,function(resultBuffer){
							fnSliceArrayBuffer(fil,function(resultBuffer,hash){
								//1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
								//var hash = hex_md5(resultBuffer);		// 2016.7.19 新增計算hash功能
								var blb = new Blob([resultBuffer], {type: fil.type});	// 第1個參數要[]啊
								var blbNm = URL.createObjectURL(blb);
								var now = new Date();
								
								// 更新項目內容
								currItem.find("#refFileName").text(fil.name);
								currItem.find("#addCUser").text(SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId) + "-" + theSSO.User.name);
								currItem.find("#addTime").text((now.getYear() - 11) + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes());
								var fobj = currItem.data("fileObj");
								fobj.blbName = blbNm;
								fobj.desc = fil.name;
								fobj.size = fil.size;
								fobj.name = fil.name;
								fobj.fileName = fil.name;
								fobj.hash = hash;
								
								//2016.11.2	Leslie	更新參考附件工作檔的附件資訊
								fobj.refAtt.Filename = fil.name;
								fobj.refAtt.Hash = hash;
								fobj.refAtt.Title = fil.name;
								fobj.refAtt.NewTime = getDateStrToSave(now);
								
								//1090730	Leslie[1090469]	置換附件功能，應一併更新管理檔紀錄內容，以觸發儲存更新
								fobj.refAtt.bDirty = true;		//觸發上傳檔案
								fobj.refAtt.blbName = blbNm;	//儲存前重新開啟時，此附件僅需開啟本地端紀錄之附件
								
								isDirty = true;
							})
							//1071002	Leslie	改用可讀取大附件的方式，讀入附件檔	==END==
						}
						catch(e) {
							theLogger.error("讀取置換的附件電子檔錯誤!" + e.message + " - " + e.sourceURL + ":" + e.line);
							alert(e.message);
						}
					}
				}
			}
		});
		
		//1111012	Leslie[1110865]	顯示異動紀錄
		$dlg.find("#history").on('click', function(){
			initAttHistory();
			$dlg.find("#dlgViewHistory").show();
			$dlg.find("#dlgViewHistory").addClass("ui-slide-pane-active");
		})
		
		$dlg.find("#btClose").on('click', function (event) {
            $dlg.find("#dlgViewHistory").removeClass("ui-slide-pane-active");
            $dlg.find("#dlgViewHistory").hide();
        });
		
		//1111221	Leslie[1111238]	新增檔案拖拉加入附件功能
		$dlg.get(0).addEventListener("dragover",HandleDragOver,false);
		$dlg.find('div.FileDrop').get(0).addEventListener("dragleave",HandleDragOver,false);
		
		function HandleDragOver(event){
			if(!_readWrite)
				return;
			event.stopPropagation();
			event.preventDefault();
			if (event.type == "dragover")
				$dlg.find('.FileDrop').addClass('DragOver');
			else
				$dlg.find('.FileDrop').removeClass('DragOver');
		}
		
		$dlg.find('div.FileDrop').get(0).addEventListener("drop",function(event){
			if(!_readWrite)
				return;
			HandleDragOver(event);
			var files = event.dataTransfer.files;
			HandleAddFile(files);
		});
		
		function HandleAddFile(files){
			//1090522	Leslie[1080781]	Merge[1070334]增修可一次選擇並加入多個附件
			var arFmtErr = [],arSizeErr = [];
			for(var i=0;i<files.length;i++){
				//1141217	Leslie[1141162]	新增參考附件可用的附件格式白名單及檔案大小限制
				var arfname = files[i].name.toUpperCase().split('.');
				var extName = (arfname.length > 1) ? arfname[arfname.length - 1] : "不合法的副件格式";
				var nFileSize = Math.ceil(files[i].size / 1024);
				if(u_allowAttFmt.indexOf(extName) < 0){
					arFmtErr.push(`[${files[i].name}]`);
					continue;
				}else if(nFileSize > u_allowAttSize){
					arSizeErr.push(`[${files[i].name}]`);
					continue;
				}
				readFromFile(++sn,files[i]);
			}
			//1141217	Leslie[1141162]	新增參考附件可用的附件格式白名單及檔案大小限制			
			if(arFmtErr.length > 0 || arSizeErr.length > 0){
				var strFmtErr = arFmtErr.length > 0 ? `您所夾帶的附件\n${arFmtErr.join('\n')}\n不是符合現行規定的附件格式`:'';
				var strSizeErr = arSizeErr.length > 0 ? `\n您所夾帶的附件\n${arSizeErr.join('\n')}\n超過現行規定的附件大小[${u_allowAttSize}MB]`:'';
				alert(strFmtErr+strSizeErr+'\n請選擇符合規定的附件。');
			}
		}
		//1111221	Leslie[1111238]	新增檔案拖拉加入附件功能	==END==
		
		function doPopulate(i, node) {
			if(node.tagName == "參考附件") {
				var $li = $("<li class='ui-table-item'></li>");
				$("<div class='ui-table-column-item'>" + (i + 1) + "</div>").appendTo($li).css("width", colWidths[0]);
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// $("<div class='ui-table-column-item'><span contentEditable='true' id='refFileName'>" + $(node).find("名稱").text() + "</span></div>").appendTo($li).css("width", colWidths[1]);
				// $("<div class='ui-table-column-item' id='addCUser'>" + $(node).find("人員").text() + "</div>").appendTo($li).css("width", colWidths[2]);
				// $("<div class='ui-table-column-item' id='addTime'>" + $(node).find("加入時間").text() + "</div>").appendTo($li).css("width", colWidths[3]);
				$("<div class='ui-table-column-item'><span contentEditable='true' id='refFileName'>" + HtmlEncode($(node).find("名稱").text()) + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item' id='addCUser'>" + HtmlEncode($(node).find("人員").text()) + "</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item' id='addTime'>" + HtmlEncode($(node).find("加入時間").text()) + "</div>").appendTo($li).css("width", colWidths[3]);
				$("<input type='file' style='display:none'>").appendTo($li);
				$li.appendTo($list);
				n++;
			}
		}
		$dlg.find(".ui-table-header .ui-table-column-header").each(function(i, elem) {
			colWidths.push($(elem).css("width"));
		});
		
		//1131204	Leslie[1131134]	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
		var observer= new MutationObserver(mutations => {
			mutations.forEach(function(mutation) {
				var $choseAtt = $(mutation.target.parentNode).closest(".ui-btn-active");
				var choose = $choseAtt.data("fileObj");
				choose.refAtt.bDirty = true;
				choose.refAtt.Title = mutation.target.data;
				isDirty = true;
			});
		});
		
		
		$.modal($dlg, {
			appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
			overlayCss: {width: w, height: h},
			//containerCss: {width: "514px", height: "440px"},
			containerCss: {width: "700px", height: "480px"},
			close: false,
			onShow: function() {
				// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
				if(isMobile)
					window.history.pushState({foo: "bar"}, "參考附件子視窗", "#");
				
				$dlg.trigger("create");
				try{
					//1060817	Leslie[1060740]	增加檢核參考附件的實體檔是否存在
					var errFile = [];
					
					//1120417	Leslie[1111005]	增加拖曳功能，改為只撈出要顯示的附件，並加以排序後顯示
					var tmpAtt = _refAtt.filter(function(o){return !o._delMsgId;});
					tmpAtt.sort(function(o,n){return o._dps - n._dps;});	//由小到大排序
					//var total = _refAtt.length;
					var total = tmpAtt.length;
					for(var i=0;i<total;i++)
					{
						//1120417	Leslie[1111005]	增加拖曳功能，改為只撈出要顯示的附件，並加以排序後顯示
						//var nd = _refAtt[i];
						var nd = tmpAtt[i];
						sn = nd._sn;	//Leslie	序號與是否顯無關，整份公文的參考附件序號都一律往下加
						if(!nd._delMsgId){
							var nm = nd.Title,
								desc = nd.Title,
								size = 0,
								guid = undefined,
								hash = nd.Hash,
								fname = nd.Filename,
								blbNm = (nd.blbName)?nd.blbName:nd.Filename,
								newTime = nd.NewTime;
							
							//1060817	Leslie[1060740]	增加檢核參考附件的實體檔是否存在
							if(!(nd.blbName)){
								var _attPath = fm.subDirPath + "\\_RefAtt\\"+nd.Filename;
								var params = new SOAPClientParameters();
								params.add('argFilePath', _attPath);
								
								SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("imgws"), 'CheckFileExist', params, false,function(rslt){
									if (typeof rslt === 'object') {
										if(!rslt.value){
											errFile.push(nd.Title);	//查無檔案，或路徑異常
											desc = "<span style='color:red'>[查無檔案]</span> " + nd.Title;
										}
									}
									else {
                                        theLogger.log("CheckFileExist fail!")
                                    }
								});
							}
								
							addItem(sn,nm,desc,size,guid,hash,fname,blbNm,false,newTime,nd);
						}
					}
					//1120417	Leslie[1111005]	增加拖曳功能，改為只撈出要顯示的附件，最後把最大的sn紀錄起來
					sn = (_refAtt.length > 0)?_refAtt[_refAtt.length-1]._sn:0;
					$ul.listview("refresh");
					
					//1060817	Leslie[1060740]	增加檢核參考附件的實體檔是否存在
					if(errFile.length > 0){
						var errMsg = "參考附件[" + errFile.join(',') + "]不存在";
						alert(errMsg+"，請退回原附件所有人，以檢查並重新加入該附件。");
						theLogger.error(errMsg);
					}
					
					// 1080125 Leslie[1070200]	設定已檢閱過參考附件
					fm.setViewRefAtt();
					
					//1120417	Leslie[1111005]	增加拖曳功能
					var currMsgId = theAOL.docObj.msgId;
					$dlg.find('#refAttList').sortable({
						stop: function (event, ui) {
							$(this).find('li').each(function (idx) {
								var $currObj = $(this).data('fileObj');
								$currObj.refAtt._dps = idx;
							})
							isDirty = true;
						}
					});
					
					//1131204	Leslie[1131134]	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
					var refAttTable = $('#refAttTable')[0]
					observer.observe(refAttTable, {'subtree': true,'characterData':true});
					
				}
				catch(e){
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					alert(e.message);
				}
				if(!_readWrite){
					$dlg.find("#edit,#del,#add").each(function(){
						$(this).addClass("ui-disabled");
					});
				}
				
				//1111012	Leslie[1110865]	顯示異動紀錄
				if(theCustom.getCustomSet('DisplayDeletedRefAtt') == 'Y'){
					$dlg.find("#history").show();
				}
			}
		});
		
		// 加入清單, nm:附件名, desc:摘要, size:大小, guid:GUID, hash:雜湊值, fname:附件檔名, blbName:若是已上傳儲存的附件表示附件檔名, 若是新增的尚未儲存附件則表示BLOB超鏈結
		function addItem(i, nm, desc, size, guid, hash, fname, blbNm, bEdit, addDate, refAtt) {
			var $li = $("<li class='ui-table-item' data-hash='"+hash+"'></li>");
			if(refAtt){	//舊附件
				$("<div class='ui-table-column-item'><span contentEditable='"+bEdit+"' id='refFileName' title='"+fname+"'>" + desc + "</span></div>").appendTo($li).css("width", colWidths[1]);
				//1061120	Leslie[1060990]	增修於Tooltip顯示完整單位-人員名稱
				//$("<div class='ui-table-column-item' id='addCUser'>"+refAtt.ADD_BY.UnitName+"-"+refAtt.ADD_BY.Name+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item' id='addCUser' title='"+refAtt.ADD_BY.UnitName+"-"+refAtt.ADD_BY.Name+"'>"+refAtt.ADD_BY.UnitName+"-"+refAtt.ADD_BY.Name+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item' id='addTime'>"+getFormatDate(addDate) +"</div>").appendTo($li).css("width", colWidths[3]);
			}
			else{		//新附件
				fname = checkFileName(fname);//檢查重覆檔名
				desc = nm = fname;
				//1061120	Leslie[1060990]	增修於Tooltip顯示完整單位-人員名稱
				var strAddUser = SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId)+ "-" + theSSO.User.name;
				
				$("<div class='ui-table-column-item'><span contentEditable='"+bEdit+"' id='refFileName' title='"+fname+"'>" + desc + "</span></div>").appendTo($li).css("width", colWidths[1]);
				//1061120	Leslie[1060990]	增修於Tooltip顯示完整單位-人員名稱
				//$("<div class='ui-table-column-item' id='addCUser'>" + SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId) + "-" + theSSO.User.name + "</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item' id='addCUser' title='"+strAddUser+"'>" + strAddUser + "</div>").appendTo($li).css("width", colWidths[2]);
				var now = new Date();
				addDate = getDateStrToSave(now);
				$("<div class='ui-table-column-item' id='addTime'>" + getFormatDate(addDate) + "</div>").appendTo($li).css("width", colWidths[3]);
				
				
				
				addBy={
					Id:theSSO.User.account,
					Name:theSSO.User.name,
					//1080125	Leslie[1070200]	一併修正，草稿階段無OwnRoleID時，改設定當前使用者RoleID
					//RoleId:theAOL.docObj.ownRoleId,
					RoleId:(theAOL.docObj.ownRoleId == '')?theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].id:theAOL.docObj.ownRoleId,
					RoleName:SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo),theAOL.docObj.ownOUId,theAOL.docObj.ownRoleId),
					UnitId:theAOL.docObj.ownOUId,
					UnitName:SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId)
				}
				refAtt={
					_dps: i,			//1120417	Leslie[1111005]	增加拖曳功能，新附件直接用sn的最大號(重排會洗掉)
					bDirty:true,	//註記該附件為本流程異動，儲存時需回寫
					_sn:i,
					_addMsgId:theAOL.docObj.msgId,
					_isConAtt:_isConsultingDoc,	//會辦流程的參考附件
					Filename:fname,
					Hash:hash,
					Title:nm,
					NewTime:addDate,
					blbName:blbNm,
					ADD_BY:addBy
				}
				_refAtt.push(refAtt);
			}				
			
			$("<input type='file' style='display:none'>").appendTo($li);
			 
			
			$li.appendTo($list)
			.data("fileObj", {blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, bEdit: bEdit,refAtt:refAtt})
			.on('click', function() {
				$dlg.find(".ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				currItem = $(this);
				choose = $(this).data("fileObj");
				if(!_readWrite)
					return false;
				
				//1080125	Leslie[1070200]	中興大學參考附件權限邏輯
				var bOwner = false,bCanDel = false,bChief = false;
				var addMsgId = choose.refAtt._addMsgId;	//移到外面來宣告
				var currMsgId = theAOL.docObj.msgId;
				//1131108 北榮序326 Zen 支援移交後新承辦人可刪除原有參考附件，移至外部
				var currUser = theSSO.User.account;
				if(editByChief == "Y"){
					var flowOUID = theAOL.docObj.ownOUId;
					var flowRoleID = theAOL.docObj.ownRoleId;	//目前流程的OuID及RoleID
					//1131108 北榮序326 Zen 支援移交後新承辦人可刪除原有參考附件，移至外部
					//var currUser = theSSO.User.account;
					if(currUser == choose.refAtt.ADD_BY.Id)	//目前使用者是附件的原新增人員
						bOwner = true;
					else if(addMsgId == currMsgId)
						bCanDel = true;
					else{	//要檢查是否為長官
						//先判斷是否為同單位
						if((flowOUID == choose.refAtt.ADD_BY.UnitId ) ||
							((flowOUID.length != choose.refAtt.ADD_BY.UnitId.length) && (flowOUID.substring(0,2) == choose.refAtt.ADD_BY.UnitId.substring(0,2)))){
							//同單位，再判斷是否為長官
							if(flowRoleID != 'OD16' && flowRoleID != 'OD17' && flowRoleID < choose.refAtt.ADD_BY.RoleId)
								bChief = true;
						}
					}
				}	//1080125	Leslie[1070200]	中興大學參考附件權限邏輯	--END--
				
				//1060817	Leslie[1060740]	加上處理檔案不存在時的按鍵UI處理
				//$dlg.find("#edit,#del").each(function(){
				$dlg.find("#edit,#del,#dl").each(function(){
					if(!choose.bEdit){
						//2016.11.30	Leslie	依原參考附件功能邏輯，修正為：各附件僅原始流程可對該附件"編輯"，其餘俱維護權限流程僅可"刪除"
						//var ICUser = theAOL.docObj.ICUserId;	//公文承辦人
						//var ownUser = theAOL.docObj.ownUserId;	//目前流程點使用者帳號
						
						//1080125	Leslie[1070200]	移到外面去宣告
						//var addMsgId = choose.refAtt._addMsgId;	//該附件新增的流程點
						//var currMsgId = theAOL.docObj.msgId;
						
						//1080125	Leslie[1070200]	中興大學參考附件權限邏輯
						if(editByChief == "Y" && this.id != 'dl'){
							if(bOwner)	//附件原擁有者(附加人)，均可異動
								$(this).removeClass("ui-disabled");
							else if(bCanDel && this.id == "del")	//同一流程點的人開啟進行維護時(可能是代理人)，可刪除
								$(this).removeClass("ui-disabled");
							else if(bChief  && this.id == "del")	//同單位長官，可刪除
								$(this).removeClass("ui-disabled");
							//1131108 北榮序326 Zen 支援移交後新承辦人可刪除原有參考附件
							else if (currUser == theAOL.docObj.ICUserId && this.id == "del")
								$(this).removeClass("ui-disabled");
							else
								$(this).addClass("ui-disabled");
							return;
						}
						else {
							//2016.11.30	Leslie	依原參考附件功能邏輯，修正為：各附件僅原始流程可對該附件"編輯"，其餘俱維護權限流程僅可"刪除"
							//if(ICUser == ownUser && this.id == "del")	//當目前為公文承辦人時，前面加的參考附件有刪除權利，但不可異動
							if(this.id =="del")
								$(this).removeClass("ui-disabled");
							else if(addMsgId == currMsgId && this.id == "edit"){
								$(this).removeClass("ui-disabled");
								currItem.find('#refFileName').attr('contentEditable',true);
							}
							else
								$(this).addClass("ui-disabled");
						}
					}
					else
						$(this).removeClass("ui-disabled");
					
					//1060817	Leslie[1060740]	加上處理檔案不存在時的按鍵UI處理
					if(this.id == "dl"){
						if(currItem.find('#refFileName').text().indexOf('[查無檔案]') != -1)
							$(this).addClass("ui-disabled");
						else
							$(this).removeClass("ui-disabled");
					}
				});
			//1131204	Leslie[1131134]	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
			// }).on('DOMSubtreeModified','#refFileName[contenteditable="true"]',function(){
				// choose.refAtt.bDirty = true;
				// choose.refAtt.Title = $(this).text()
				// isDirty = true;
			}).find('span').on('mousedown',function(event){return event. stopPropagation()});	//1120419	Leslie	針對SPAN取消Event上傳，才能正確觸發編輯行為
		}
		
		//取得格式化的日期時間
		function getFormatDate(argDateTimeStr){
			return argDateTimeStr.substr(0,3)+"/"+argDateTimeStr.substr(3,2)+"/"+argDateTimeStr.substr(5,2)+" "+argDateTimeStr.substr(7,2)+":"+argDateTimeStr.substr(9,2);
		}
		
		//取得標準日期時間(11碼)，用於儲存
		function getDateStrToSave(objDate){
			var mm = (objDate.getMonth() + 1);
			var dd =  objDate.getDate()+"";
			var hh =  objDate.getHours()+"";
			var m = objDate.getMinutes()+"";
			return [(objDate.getYear() - 11),mm>=10?"":"0", mm, dd>=10?"":'0', dd,hh>=10?"":'0', hh, m>=10?"":"0", m].join('');	//2017.2.20	Leslie	bug fixed 應為">="
		}
		
		//檢查檔名是否重覆
		function checkFileName(argName, repeatCnt){
			var bEquName = false;
			for(var i=0,iMax=_refAtt.length;i<iMax;i++){
				var tmpAtt = _refAtt[i];
				if(argName == tmpAtt.Filename){
					if(!tmpAtt._delMsgId || tmpAtt._delMsgId == ""){
						bEquName = true;
						break;
					}
				}
			}
			
			if(bEquName){
				var arName = argName.split('.');
				var tmpName = "";
				if(repeatCnt && argName.match("["+repeatCnt+"]")){
					tmpName = argName.replace("["+repeatCnt+"]","["+(++repeatCnt)+"]");
					tmpName = checkFileName(tmpName,repeatCnt);
				}
				/*if(argName.match(/\[\d\]/)){	//已不止重覆一次
					
				}*/
				else{
					if(arName.length >= 2){
						arName[arName.length-2]+="[1]";
						tmpName = checkFileName(arName.join("."),1);
					}
				}
				
				if(!repeatCnt){
					alert("同檔名附件["+argName+"]已存在，修正附件名稱為["+tmpName+"]。");
				}
				return tmpName;
			}
			return argName;
		}
		
		//1071002	Leslie	增加可讀取大附件，回傳ArrayBuffer
		function blobToArrayBuffer(blob, cb)
		{
			var reader = new FileReader();
			reader.onloadend = function (evt)
			{
				if (evt.target.readyState == FileReader.DONE)
					cb(evt.target.result);
			};
			reader.readAsArrayBuffer(blob);
		};
		
		function fnSliceArrayBuffer(argFile, ballBack){
			var file = argFile;
			var maxLength = file.size;
			var currLength = 0;
			var buffer = 4194304;   //4MB 為一個單位
			//var currBuffer;	//1080125	Leslie	修正切割讀入的暫存寫法
			//1080122	Leslie[1080043]	新增SHA256演算法
			var SHA256 = CryptoJS.algo.SHA256.create();
			//1080125	Leslie	修正切割讀入的暫存寫法
			var tmpUnit8Array = new Uint8Array(maxLength);
			
			function sliceRead()
			{
				SSOUtil.loading('show', {text:'檔案載入中...(進度：'+((currLength/maxLength)*100).toFixed(2)+'%)', textVisible:true, theme:'c' });
				let nextRng = ((currLength + buffer) > maxLength)? maxLength:currLength + buffer;
				//var blob = file.slice(currLength, currLength + buffer);
				var blob = file.slice(currLength, nextRng);
				//1080125	Leslie	修正切割讀入的暫存寫法
				//currLength += buffer;
				blobToArrayBuffer(blob, function (resultBuffer)
				{
					//1080122	Leslie[1080043]	新增SHA256演算法
					var wordBuffer = CryptoJS.lib.WordArray.create(resultBuffer); 
					SHA256.update(wordBuffer);
					
					//1080125	Leslie	修正切割讀入的暫存寫法
					/*if(!currBuffer)
						currBuffer = resultBuffer;
					else{
						var tmp = new Uint8Array(currBuffer.byteLength + resultBuffer.byteLength);
						  tmp.set(new Uint8Array(currBuffer), 0);
						  tmp.set(new Uint8Array(resultBuffer), currBuffer.byteLength);
						  currBuffer = tmp.buffer;
					}*/
					tmpUnit8Array.set(new Uint8Array(resultBuffer),currLength); 
					currLength += resultBuffer.byteLength;
					//1080125	Leslie	修正切割讀入的暫存寫法	--END--
					
					if (currLength < maxLength) //還沒完，繼續切
						sliceRead();
					else{
						//1080122	Leslie[1080043]	新增SHA256演算法，並於讀取完成後一起回傳
						var hash = SHA256.finalize();
						var hashHex = hash.toString(CryptoJS.enc.Hex);
						SSOUtil.loading('hide');
						//1080122	Leslie[1080043]	新增SHA256演算法，並於讀取完成後一起回傳，同時修正切割讀入的暫存寫法
						//ballBack(currBuffer);
						ballBack(tmpUnit8Array.buffer,hashHex);
					}
				})
			}
			sliceRead();
		}
		//1071002	Leslie	增加可讀取大附件，回傳ArrayBuffer	==END==
		
		//由檔案讀入並加入參考附件列表
		function readFromFile(idx, fil) {
			try {
				//1071002	Leslie	改用可讀取大附件的方式，讀入附件檔
				/*var rdr = new FileReader();
				rdr.onload = function() {
					var hash = hex_md5(new Uint8Array(this.result));		// 2016.7.19 新增計算hash功能
					var blb = new Blob([this.result], {type: fil.type});	// 第1個參數要[]啊
					var blbNm = URL.createObjectURL(blb);
					
					addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, true);	//目前流程加入的參考附件，一律可供維護
					$ul.listview("refresh");
					
					isDirty = true;
				}
				rdr.readAsArrayBuffer(fil);*/
				//1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
				//fnSliceArrayBuffer(fil,function(resultBuffer){
				fnSliceArrayBuffer(fil,function(resultBuffer,hash){
					//1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
					//var hash = hex_md5(resultBuffer);		// 2016.7.19 新增計算hash功能
					var blb = new Blob([resultBuffer], {type: fil.type});	// 第1個參數要[]啊
					var blbNm = URL.createObjectURL(blb);
					
					addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, true);	//目前流程加入的參考附件，一律可供維護
					$ul.listview("refresh");
					
					isDirty = true;
				})
				//1071002	Leslie	改用可讀取大附件的方式，讀入附件檔	==END==
			}
			catch(e) {
				theLogger.error("讀取新增的附件電子檔錯誤!" + e.message + " - " + e.sourceURL + ":" + e.line);
				alert(e.message);
			}
		};
		
		//1111012	Leslie[1110865]	顯示異動紀錄
		var $listHistory = $dlg.find("#refAttHistory");
		function initAttHistory(){
			$listHistory.find("li").remove();
			_refAtt.forEach(createAttItem);
			$listHistory.listview("refresh");
		}
		
		function createAttItem(refAtt){
			var $li = $("<li class='ui-table-item' data-hash='"+refAtt.Hash+"'></li>");
			if(refAtt._delMsgId){
				let _delBy = refAtt._delBy.split(';');
				$li.addClass('delAtt');
				$("<div class='ui-table-column-item'><span title='"+refAtt.Filename+"'>" + refAtt.Title + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item'>"+refAtt.ADD_BY.UnitName+"-"+refAtt.ADD_BY.Name+"<br>"+_delBy[0]+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item'>"+getFormatDate(refAtt.NewTime) +"<br>"+getFormatDate(_delBy[1])+"</div>").appendTo($li).css("width", colWidths[3]);
			}else{
				$("<div class='ui-table-column-item'><span title='"+refAtt.Filename+"'>" + refAtt.Title + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item'>"+refAtt.ADD_BY.UnitName+"-"+refAtt.ADD_BY.Name+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item'>"+getFormatDate(refAtt.NewTime) +"</div>").appendTo($li).css("width", colWidths[3]);
			}
			$li.appendTo($listHistory);
		}
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ViewRefAtt.js").finish();
})();