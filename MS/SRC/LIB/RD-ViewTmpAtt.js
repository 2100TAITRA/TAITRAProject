/*	DATE		MGRNO		SA		PG		Desc
	1111007		1110865		Leslie	Leslie	新增簽閱附件
	1111221		1111238		Leslie	Leslie	新增檔案拖拉加入附件功能
	1120417		1111005		Leslie	Leslie	[Merge]檔案拖移排序功能
	1120901 	1120709		Kevin	Leslie  弱掃修正Client Potential XSS
	1131204		1131134		Leslie	Leslie	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
*/
// 簽閱附件功能模組
//	掛在nsEditor命名空間下
//	
var nsEditor = nsEditor||{};

nsEditor.onViewTmpAttVisible = function() {
	return true;
}

nsEditor.onViewTmpAtt = function(event, fm, callBack){	//2016.10.24	Leslie	增加取得傳入的FolioModel參數
	
	var $viewPort = event.data;
	var that = this;	//簽閱附件頁籤
	var _tmpAtt = fm.getTmpAttachsClone();		//取得暫時管理檔供後續異動
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	var sn = 0;
	var _readWrite = fm.isTmpAttachsEdit();
	var isDirty = false;
	//1080125	Leslie[1070200]	中興大學簽閱附件權限邏輯
	var editByChief = theSSO.User.EnvSettings.get("AOL_REFATT_EDIT_BY_CHIEF");
	// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	
	Util.getDlg("RD-ViewTmpAtt.html").done(function($dlg) {
		var $ul = $dlg.find('#tmpAttList');
		var choose;
		var currItem = undefined;
		
		//2016.12.15	Leslie	增加防止名稱被清空
		$dlg.find('#tmpAttList').on('blur','#tmpFileName',function(){if(this.innerHTML == ""){this.innerHTML=this.title;this.focus();}})
		
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
				fm.commitTmpAttachs(_tmpAtt);
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
				alert("請選擇欲置換之簽閱附件!");
				return ;
			}
			$dlg.find("#repAtt").trigger('click');
		});
		$dlg.find("#dl").on('click', function(){
			if(!choose){
				alert("請選擇欲下載之簽閱附件!");
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
					$(this).attr({"data-role": "none",
						"href": choose.blbName,
						"rel": "external",
						"data-ajax": "false",
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
				var _attPath = fm.subDirPath + "\\_TmpAtt\\"+choose.blbName;
				var _DocNo = (fm.getDocNo() == "")?"DRAFTDOC":(_attPath.match(fm.getDocNo()))?fm.getDocNo():"DRAFTDOC";	//2017.01.10	Leslie	增加判斷subDirPath裡面有沒文號(可能為已要號的草稿)
				theLogger.log(_attPath);
				var url = "/odtools/docatt.ashx?FileName=" + Base64.encode(_attPath) + "&SAMLart=" + localStorage['Artifact'] + "&DocNo=" + _DocNo;
				$(this).attr({"data-role": "none",
							"href": url,
							"rel": "external",
							"data-ajax": "false",
							"target": "_blank"});
				if(fileType == "PDF")
					this.removeAttribute('download');
				else
					$(this).attr('download',choose.fileName)
			}
		});
		$dlg.find("#del").on('click', function(){
			if(!choose){
				alert("請選擇欲刪除之簽閱附件!");
				return ;
			}
			choose.tmpAtt.bDirty = true;	//註記該附件為本流程異動，儲存時需回寫
			choose.tmpAtt._delMsgId = theAOL.docObj.msgId;
			choose.tmpAtt._delBy = theSSO.User.name + ";" + getDateStrToSave(new Date());
			currItem.remove();
			isDirty = true;
		});
		var colWidths = [];
		var $list = $dlg.find("#tmpAttList");
		$dlg.find("#addNew").on('change', function() {
				if(this.files.length > 0) {
					for(var i=0;i<this.files.length;i++){
						readFromFile(++sn,this.files[i]);
					}				
			}
		});
		
		$dlg.find("#repAtt").on('change', function() {
			if(this.files.length > 0) {
				if(currItem){
					if(this.files.length > 0) {
						var fil = this.files[0];
						try {
							fnSliceArrayBuffer(fil,function(resultBuffer,hash){
								var blb = new Blob([resultBuffer], {type: fil.type});	// 第1個參數要[]啊
								var blbNm = URL.createObjectURL(blb);
								var now = new Date();
								
								// 更新項目內容
								currItem.find("#tmpFileName").text(fil.name);
								currItem.find("#addCUser").text(SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId) + "-" + theSSO.User.name);
								currItem.find("#addTime").text((now.getYear() - 11) + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes());
								var fobj = currItem.data("fileObj");
								fobj.blbName = blbNm;
								fobj.desc = fil.name;
								fobj.size = fil.size;
								fobj.name = fil.name;
								fobj.fileName = fil.name;
								fobj.hash = hash;
								
								fobj.tmpAtt.Filename = fil.name;
								fobj.tmpAtt.Hash = hash;
								fobj.tmpAtt.Title = fil.name;
								fobj.tmpAtt.NewTime = getDateStrToSave(now);
								
								fobj.tmpAtt.bDirty = true;		//觸發上傳檔案
								fobj.tmpAtt.blbName = blbNm;	//儲存前重新開啟時，此附件僅需開啟本地端紀錄之附件
								
								isDirty = true;
							})
						}
						catch(e) {
							theLogger.error("讀取置換的附件電子檔錯誤!" + e.message + " - " + e.sourceURL + ":" + e.line);
							alert(e.message);
						}
					}
				}
			}
		});
		
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
			for(var i=0;i<files.length;i++){
				readFromFile(++sn,files[i]);
			}	
		}
		//1111221	Leslie[1111238]	新增檔案拖拉加入附件功能	==END==
		
		function doPopulate(i, node) {
			if(node.tagName == "簽閱附件") {
				var $li = $("<li class='ui-table-item'></li>");
				$("<div class='ui-table-column-item'>" + (i + 1) + "</div>").appendTo($li).css("width", colWidths[0]);
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// $("<div class='ui-table-column-item'><span contentEditable='true' id='tmpFileName'>" + $(node).find("名稱").text() + "</span></div>").appendTo($li).css("width", colWidths[1]);
				// $("<div class='ui-table-column-item' id='addCUser'>" + $(node).find("人員").text() + "</div>").appendTo($li).css("width", colWidths[2]);
				// $("<div class='ui-table-column-item' id='addTime'>" + $(node).find("加入時間").text() + "</div>").appendTo($li).css("width", colWidths[3]);
				$("<div class='ui-table-column-item'><span contentEditable='true' id='tmpFileName'>" + HtmlEncode($(node).find("名稱").text()) + "</span></div>").appendTo($li).css("width", colWidths[1]);
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
				choose.tmpAtt.bDirty = true;
				choose.tmpAtt.Title = mutation.target.data;
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
				if(isMobile)
					window.history.pushState({foo: "bar"}, "簽閱附件子視窗", "#");
				
				$dlg.trigger("create");
				try{
					var errFile = [];
					
					//1120417	Leslie[1111005]	增加拖曳功能，改為只撈出要顯示的附件，並加以排序後顯示
					var tmpA = _tmpAtt.filter(function(o){return !o._delMsgId;});
					tmpA.sort(function(o,n){return o._dps - n._dps;});	//由小到大排序
					//var total = _tmpAtt.length;
					var total = tmpA.length;
					for(var i=0;i<total;i++)
					{
						//1120417	Leslie[1111005]	增加拖曳功能，改為只撈出要顯示的附件，並加以排序後顯示
						//var nd = _tmpAtt[i];
						var nd = tmpA[i];
						sn = nd._sn;
						if(!nd._delMsgId){
							var nm = nd.Title,
								desc = nd.Title,
								size = 0,
								guid = undefined,
								hash = nd.Hash,
								fname = nd.Filename,
								blbNm = (nd.blbName)?nd.blbName:nd.Filename,
								newTime = nd.NewTime;
							
							//1060817	Leslie[1060740]	增加檢核簽閱附件的實體檔是否存在
							if(!(nd.blbName)){
								var _attPath = fm.subDirPath + "\\_TmpAtt\\"+nd.Filename;
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
					sn = (_tmpAtt.length > 0)?_tmpAtt[_tmpAtt.length-1]._sn:0;
					$ul.listview("refresh");
					
					if(errFile.length > 0){
						var errMsg = "簽閱附件[" + errFile.join(',') + "]不存在";
						alert(errMsg+"，請退回原附件所有人，以檢查並重新加入該附件。");
						theLogger.error(errMsg);
					}
					
					//fm.setViewTmpAtt();
					
					//1120417	Leslie[1111005]	增加拖曳功能
					var currMsgId = theAOL.docObj.msgId;
					$dlg.find('#tmpAttList').sortable({
						stop: function (event, ui) {
							$(this).find('li').each(function (idx) {
								var $currObj = $(this).data('fileObj');
								$currObj.tmpAtt._dps = idx;
							})
							isDirty = true;
						}
					});
					
					//1131204	Leslie[1131134]	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
					var tmpAttTable = $('#tmpAttTable')[0]
					observer.observe(tmpAttTable, {'subtree': true,'characterData':true});
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
			}
		});
		
		// 加入清單, nm:附件名, desc:摘要, size:大小, guid:GUID, hash:雜湊值, fname:附件檔名, blbName:若是已上傳儲存的附件表示附件檔名, 若是新增的尚未儲存附件則表示BLOB超鏈結
		function addItem(i, nm, desc, size, guid, hash, fname, blbNm, bEdit, addDate, tmpAtt) {
			var $li = $("<li class='ui-table-item' data-hash='"+hash+"'></li>");
			if(tmpAtt){	//舊附件
				$("<div class='ui-table-column-item'><span contentEditable='"+bEdit+"' id='tmpFileName' title='"+fname+"'>" + desc + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item' id='addCUser' title='"+tmpAtt.ADD_BY.UnitName+"-"+tmpAtt.ADD_BY.Name+"'>"+tmpAtt.ADD_BY.UnitName+"-"+tmpAtt.ADD_BY.Name+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item' id='addTime'>"+getFormatDate(addDate) +"</div>").appendTo($li).css("width", colWidths[3]);
			}
			else{		//新附件
				fname = checkFileName(fname);//檢查重覆檔名
				desc = nm = fname;
				var strAddUser = SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId)+ "-" + theSSO.User.name;
				
				$("<div class='ui-table-column-item'><span contentEditable='"+bEdit+"' id='tmpFileName' title='"+fname+"'>" + desc + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item' id='addCUser' title='"+strAddUser+"'>" + strAddUser + "</div>").appendTo($li).css("width", colWidths[2]);
				var now = new Date();
				addDate = getDateStrToSave(now);
				$("<div class='ui-table-column-item' id='addTime'>" + getFormatDate(addDate) + "</div>").appendTo($li).css("width", colWidths[3]);
				
				
				
				addBy={
					Id:theSSO.User.account,
					Name:theSSO.User.name,
					RoleId:(theAOL.docObj.ownRoleId == '')?theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].id:theAOL.docObj.ownRoleId,
					RoleName:SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo),theAOL.docObj.ownOUId,theAOL.docObj.ownRoleId),
					UnitId:theAOL.docObj.ownOUId,
					UnitName:SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId)
				}
				tmpAtt={
					_dps: i,			//1120417	Leslie[1111005]	增加拖曳功能，新附件直接用sn的最大號(重排會洗掉)
					bDirty:true,	//註記該附件為本流程異動，儲存時需回寫
					_sn:i,
					_addMsgId:theAOL.docObj.msgId,
					Filename:fname,
					Hash:hash,
					Title:nm,
					NewTime:addDate,
					blbName:blbNm,
					ADD_BY:addBy
				}
				_tmpAtt.push(tmpAtt);
			}				
			
			$("<input type='file' style='display:none'>").appendTo($li);
			 
			
			$li.appendTo($list)
			.data("fileObj", {blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, bEdit: bEdit,tmpAtt:tmpAtt})
			.on('click', function() {
				$dlg.find(".ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				currItem = $(this);
				choose = $(this).data("fileObj");
				if(!_readWrite)
					return false;
				
				var bOwner = false,bCanDel = false,bChief = false;
				var addMsgId = choose.tmpAtt._addMsgId;	//移到外面來宣告
				var currMsgId = theAOL.docObj.msgId;
				if(editByChief == "Y"){
					var flowOUID = theAOL.docObj.ownOUId;
					var flowRoleID = theAOL.docObj.ownRoleId;	//目前流程的OuID及RoleID
					var currUser = theSSO.User.account;
					if(currUser == choose.tmpAtt.ADD_BY.Id)	//目前使用者是附件的原新增人員
						bOwner = true;
					else if(addMsgId == currMsgId)
						bCanDel = true;
					else{	//要檢查是否為長官
						//先判斷是否為同單位
						if((flowOUID == choose.tmpAtt.ADD_BY.UnitId ) ||
							((flowOUID.length != choose.tmpAtt.ADD_BY.UnitId.length) && (flowOUID.substring(0,2) == choose.tmpAtt.ADD_BY.UnitId.substring(0,2)))){
							//同單位，再判斷是否為長官
							if(flowRoleID != 'OD16' && flowRoleID != 'OD17' && flowRoleID < choose.tmpAtt.ADD_BY.RoleId)
								bChief = true;
						}
					}
				}
				
				$dlg.find("#edit,#del,#dl").each(function(){
					if(!choose.bEdit){
						if(editByChief == "Y" && this.id != 'dl'){
							if(bOwner)	//附件原擁有者(附加人)，均可異動
								$(this).removeClass("ui-disabled");
							else if(bCanDel && this.id == "del")	//同一流程點的人開啟進行維護時(可能是代理人)，可刪除
								$(this).removeClass("ui-disabled");
							else if(bChief  && this.id == "del")	//同單位長官，可刪除
								$(this).removeClass("ui-disabled");
							else
								$(this).addClass("ui-disabled");
							return;
						}
						else {
							if(this.id =="del")
								$(this).removeClass("ui-disabled");
							else if(addMsgId == currMsgId && this.id == "edit"){
								$(this).removeClass("ui-disabled");
								currItem.find('#tmpFileName').attr('contentEditable',true);
							}
							else
								$(this).addClass("ui-disabled");
						}
					}
					else
						$(this).removeClass("ui-disabled");
					
					if(this.id == "dl"){
						if(currItem.find('#tmpFileName').text().indexOf('[查無檔案]') != -1)
							$(this).addClass("ui-disabled");
						else
							$(this).removeClass("ui-disabled");
					}
				});
			//1131204	Leslie[1131134]	修正因瀏覽器移除DOMSubtreeModified事件，造成附件名稱異動失效的問題
			// }).on('DOMSubtreeModified','#tmpFileName[contenteditable="true"]',function(){
				// choose.tmpAtt.bDirty = true;
				// choose.tmpAtt.Title = $(this).text()
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
			for(var i=0,iMax=_tmpAtt.length;i<iMax;i++){
				var tmpAtt = _tmpAtt[i];
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
			var SHA256 = CryptoJS.algo.SHA256.create();
			var tmpUnit8Array = new Uint8Array(maxLength);
			
			function sliceRead()
			{
				SSOUtil.loading('show', {text:'檔案載入中...(進度：'+((currLength/maxLength)*100).toFixed(2)+'%)', textVisible:true, theme:'c' });
				let nextRng = ((currLength + buffer) > maxLength)? maxLength:currLength + buffer;
				var blob = file.slice(currLength, nextRng);
				blobToArrayBuffer(blob, function (resultBuffer)
				{
					var wordBuffer = CryptoJS.lib.WordArray.create(resultBuffer); 
					SHA256.update(wordBuffer);
					
					tmpUnit8Array.set(new Uint8Array(resultBuffer),currLength); 
					currLength += resultBuffer.byteLength;
					
					if (currLength < maxLength) //還沒完，繼續切
						sliceRead();
					else{
						var hash = SHA256.finalize();
						var hashHex = hash.toString(CryptoJS.enc.Hex);
						SSOUtil.loading('hide');
						ballBack(tmpUnit8Array.buffer,hashHex);
					}
				})
			}
			sliceRead();
		}
		
		//由檔案讀入並加入簽閱附件列表
		function readFromFile(idx, fil) {
			try {
				fnSliceArrayBuffer(fil,function(resultBuffer,hash){
					var blb = new Blob([resultBuffer], {type: fil.type});	// 第1個參數要[]啊
					var blbNm = URL.createObjectURL(blb);
					
					addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, true);	//目前流程加入的簽閱附件，一律可供維護
					$ul.listview("refresh");
					
					isDirty = true;
				})
			}
			catch(e) {
				theLogger.error("讀取新增的附件電子檔錯誤!" + e.message + " - " + e.sourceURL + ":" + e.line);
				alert(e.message);
			}
		};
		
		//顯示異動紀錄
		var $listHistory = $dlg.find("#tmpAttHistory");
		function initAttHistory(){
			$listHistory.find("li").remove();
			_tmpAtt.forEach(createAttItem);
			$listHistory.listview("refresh");
		}
		
		function createAttItem(tmpAtt){
			var $li = $("<li class='ui-table-item' data-hash='"+tmpAtt.Hash+"'></li>");
			if(tmpAtt._delMsgId){	//舊附件
				let _delBy = tmpAtt._delBy.split(';');
				$li.addClass('delAtt');
				$("<div class='ui-table-column-item'><span title='"+tmpAtt.Filename+"'>" + tmpAtt.Title + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item'>"+tmpAtt.ADD_BY.UnitName+"-"+tmpAtt.ADD_BY.Name+"<br>"+_delBy[0]+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item'>"+getFormatDate(tmpAtt.NewTime) +"<br>"+getFormatDate(_delBy[1])+"</div>").appendTo($li).css("width", colWidths[3]);
			}else{
				$("<div class='ui-table-column-item'><span title='"+tmpAtt.Filename+"'>" + tmpAtt.Title + "</span></div>").appendTo($li).css("width", colWidths[1]);
				$("<div class='ui-table-column-item'>"+tmpAtt.ADD_BY.UnitName+"-"+tmpAtt.ADD_BY.Name+"</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item'>"+getFormatDate(tmpAtt.NewTime) +"</div>").appendTo($li).css("width", colWidths[3]);
			}
			$li.appendTo($listHistory);
		}
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ViewTmpAtt.js").finish();
})();