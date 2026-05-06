/*
DATE    MGRNO       SA      PG      Desc
1061211 1061116     Kevin   Kevin   切回首頁時更新公告以及公布欄
1051005 1050087     Kevin   Kevin   首頁取得系統公告、公布欄、登入通知訊息
1051205	--			Kevin	Kevin	新增額外顯示件數，避免重疊看不見問題
1060413	--			Kevin	Kevin	調整搜尋方式(比照待辦事項)
1060713	1060383		Leslie	Leslie	配合中興單號[1060612]，共通版一併提供"創稿"的快速選單
1070322	1070199		Kevin	Kevin	使用者登入時，系統會自動彈出視窗顯示宣導或警示訊息
1080514	--			Kevin	Kevin	新增登入後通知訊息(原目的為提醒憑證將到期)
1081008	1080339		Kevin	Joe		jQuery升級3.4.1
1090306	1081088		Leslie	Leslie	新增Log相關功能
1091119	1090885		Leslie	Leslie	停用網址列權杖避免滲透弱點
1100504	1090634		Leslie	Leslie	新增依系統參數，決定是否啟用偵測使用者操作行為
1100810	1100580		Leslie	Leslie	Merge MP客製化待辦件數區域
1100922	1100991		Kevin	David	弱掃修正Client Potential XSS
1110302	1101537		Leslie	Leslie	[考試院]新增機關切換選單
1110314	1110167		Leslie	Leslie	[考試院]UI調整
1110402	1110167		Leslie	Leslie	[考試院]UI調整，第二階段
1110422	1110164		Kevin	Leslie	弱掃停用html宣告的Event
1110624	1110630		Kevin	Leslie	系統首頁「待辦件數」主管群組下的增修需求
1110624	1110629		Leslie	Leslie	新增by機關的客製化設定(檢索選單、未讀讀件數)，個人專區件數為0時，修正顯示內容為無資料
1110823	1110652		Leslie	Leslie	新增客製化待辦統計設定，並修改圓餅圖可支援客製化設定
1111107	1110334		Leslie	Leslie	新增可下載DigiPDA按鈕
1120810	1120467		Leslie	Zen		暫時不顯示取公告錯誤之alert，待效能調整完畢後還原
1120901 1120709		Kevin	Leslie  弱掃修正Client DOM Stored XSS
1121130	彙整表序332	Leslie	Leslie	當跑馬燈設定為空時，應取得電子公布欄第一筆的主旨後顯示
1130223	Leslie		Leslie	1120883	新增依設定顯示是否有待補簽公文，並提供點擊後開啟IFT940
1130815 Kevin		Kevin	1130466 支援電腦版使用軟體憑證
1130816	1130313		Raymond	Raymond	合併1111007(1100394), 新增安裝離線版公文製作功能, 並判斷SSO_CONFIG_EDOC.js的enableOfflineMode設為true, 才顯示「安裝離線版公文製作」、「更新資源檔及使用者資迅」「移除離線版公文製作」按鈕
1140814	1140873		Kevin	Leslie	可完全隱藏無件數的個人專區
1140423	1131290		Leslie	Leslie	新增「調案逾期未還案件」統計件數
1140505	1140556		Kevin	Leslie	取消網址參數權杖
1140513	問題序90	Leslie	Leslie	僅多機關架構無切換需求，修改判斷式
1140916	1140873		Leslie	Zen		(中興大學)修正未開啟個人專區客製化PAI001之問題
1141009	1141352		Kevin	Kevin	調整網址串接方式避免後方站台被掃出
1141114	1141452		Raymond	Raymond	新增判斷SSO_CONFIG_EDOC.js的enableOfflineMode參數不為true時, 移除「安裝離線版公文製作」、「更新資源檔及使用者資迅」、「移除離線版公文製作」按鈕, 以避免使用者用F12修改display, 變成可以看到跟點擊執行的問題
1141217	1141314		Leslie	Zen		點擊待辦時件數時支援依當前角色開啟查詢視窗，並依角色所屬單位預設承辦單位選單查詢條件
1150109	1131122		Leslie	Leslie	點擊開啟EDI244時，亦需支援依當前角色開啟
*/

var _dbgStartPageInitLog = ''; // for debug...
var _ToolBoxPageId = 'startContainer';
//
// 2012.4.13 - 測試jQM page relative events
//

// => 頁面載入, 尚未套用jQM相關class叫用 (在 'pagecreate' event 之前)
$(document).on('sso:moduleinit', '#' + _ToolBoxPageId, function (event)
{
    _dbgStartPageInitLog += '#startContainer - sso:moduleinit event.\r\n';
});

// => 頁面載入且套用jQM相關class完成後會叫用(button/list等controls已轉換為jQM UI controls)
$(document).on('sso:modulecreate', '#' + _ToolBoxPageId, function (event)
{
    _dbgStartPageInitLog += '#startContainer - sso:modulecreate event.\r\n';

    //1051005 Kevin 首頁捷徑預設關閉
    if (theSSO.User.EnvSettings.get("DESKTOP_SHORT") == "1")
        theStart.SetInitTreeShort();

    //程式選單
    theStart.InitProgram();
	
	//1100810	Leslie[1100580]	Merge MP
	if(SSO_CONFIG.MP_ENABLE_COUNT_LIST != "Y"){
    //待辦件數
    theStart.InitFlotImp();
    //圓餅圖
    theStart.InitFlotTodo('', '');
    //1110314	Leslie[1110167]	[考試院]UI調整	
	//1110809	Leslie	非考試院設為共通UI
    //$('#btn_mp').show();
	}
	else{
		//1100810	Leslie[1100580]	Merge MP客製化待辦件數區域
		theStart.InitTodoCountList();
		$('#StartImpFlot').hide();
		$('#StartTodoFlot').hide();
		$('#StartTodoCnt').show();
	}

    //1051005 Kevin 首頁公告預設開啟
    if (theSSO.User.EnvSettings.get("DESKTOP_BULLETIN") == "0")
        $('#ListBU').attr("style", "display:none");
    else
        theStart.InitBU();

    //1051005 Kevin 首頁公布欄預設開啟
    if (theSSO.User.EnvSettings.get("DESKTOP_TB") == "0")
        $('#ListTB').attr("style", "display:none");
    else
        theStart.InitTB();

    if (SSO_CONFIG.OrgNickName == 'MPB') {
        theStart.InitLoginMsg();
    }
    //1110314	Leslie[1110167]	[考試院]UI調整	
	//1110809	Leslie	增加一個開關可啟用考試院UI
    if(SSO_CONFIG.OrgNickName == 'EXAM' || SSO_CONFIG.EnableExamCustomUI) {
		$('#latest_notify_subject').hide();
    	$('.ColorSwitch').hide();
    	$('#ColorSwitchTitle').hide();
		//1110809	Leslie	考試院UI用客製化設定
		//$('.date_info').addClass('ExamUI');
		$('#btn_reload').hide();
		$('.date_info').addClass('EXAM');
		$('#MainButton').addClass('EXAM')
		$('#mainMenu').addClass('EXAM')
		$('.last_notification').addClass('EXAM');
	}
	
	//1110607	Leslie	[SMEG]依客戶要求，調整UI
	//1110809	Leslie	非考試院設為共通UI
	/*if(SSO_CONFIG.OrgNickName == 'SMEG'){
		$('#btn_reload').show();
		$('#MainButton').addClass('SMEG_UI');
		$('.last_notification').addClass('SMEG_UI');
	}*/
	
    //1110405	Leslie[1110167]	改用共通參數判斷
    if('USE_PERSONAL' in theSSO.User.SystemSets && theSSO.User.SystemSets['USE_PERSONAL'] == 'Y') {
		theStart.InitPA();
    }
	else{
		$('#ListPA').attr("style", "display:none");
	}

	if(theSSO.getColorScheme()=='')
		$('#ColorSwitchLB').addClass('cs-lb');

	//1081008	Joe		1080339		jQuery升級3.4.1--S
	// $('#ColorSwitchLB').click(function() { theSSO.setColorScheme('');$('#ColorSwitchLB').addClass('cs-lb'); });
	// $('#ColorSwitchLG').click(function() { theSSO.setColorScheme('cs-lg');$('#ColorSwitchLB').removeClass('cs-lb'); });
	// $('#ColorSwitchLP').click(function() { theSSO.setColorScheme('cs-lp');$('#ColorSwitchLB').removeClass('cs-lb'); });
	// $('#ColorSwitchLY').click(function() { theSSO.setColorScheme('cs-ly');$('#ColorSwitchLB').removeClass('cs-lb'); });
	$('#ColorSwitchLB').on("click", function() { theSSO.setColorScheme('');$('#ColorSwitchLB').addClass('cs-lb'); });
	$('#ColorSwitchLG').on("click", function() { theSSO.setColorScheme('cs-lg');$('#ColorSwitchLB').removeClass('cs-lb'); });
	$('#ColorSwitchLP').on("click", function() { theSSO.setColorScheme('cs-lp');$('#ColorSwitchLB').removeClass('cs-lb'); });
	$('#ColorSwitchLY').on("click", function() { theSSO.setColorScheme('cs-ly');$('#ColorSwitchLB').removeClass('cs-lb'); });
	//1081008	Joe		1080339		jQuery升級3.4.1--E
	
	//1090306	Leslie[1081088]	新增Log相關功能
	$('#EnableInfoLog').on('click', function(){ AlternativeLogger.set('logLevel',3); AlternativeLogger.set('autoUploadThreshold',10000) })	//啟用追查模式，設定為InfoLog，並調整上限至10000
	$('#DownloadLog').on('click', function(){ if(AlternativeLogger.get('logLevel') <= 0)alert('未啟用Log檔。'); else AlternativeLogger.dump('download')})	//下載Log檔
	$('#ResetLog').on('click', function(){ AlternativeLogger.clear();})	//重置Log檔
	
	//1111107	Leslie[1110334] 新增可下載DigiPDA按鈕
	if(SSO_CONFIG.EnableDigiPDA){
		$('#DownLoadDigiPDA').show().on('click', function(){ 
			var link = document.createElement('a');
			link.href = SSO_CONFIG.DigiPDAPath;
			link.target = "_blank";
			document.body.appendChild(link);
			link.click();  
			document.body.removeChild(link);
		})	//下載DigiPDA安裝包
	}

	//1130808 Raymond 1130313 合併1111007(1100394), 新增安裝離線版公文製作進度條功能
	var instprogbar = function() {	
		var _ttCnts = 0;			// 總數
		var _progCnts = 0;			// 目前前進數
		var _bkgndInst = false;		// 背景安裝
		var _box;					// 子視窗
		return {
			ttCnts: _ttCnts,
			progCnts: _progCnts,
			bkgndInst: _bkgndInst,
			init: function(totalCounts, title) {	// 總數, 標題
				if(!_bkgndInst) {
					_ttCnts = totalCounts;
					_progCnts = 0;
					if(!_box) {
						var markup = [
							'<div id="confirmOverlay">',
							'<div id="confirmBox">',
							'<h1>' + title + '</h1>',
							'<div class="confirmItems">',
							'<div id="desc" style="margin: 0px 1em">' + _progCnts + '/' + _ttCnts + '</div>',
							'<div id="extraDesc" style="margin: 1em 1em -0.5em"></div>',
							'<input id="progbar" name="progbar" data-role="none" data-corner="false">',
							'<div id="confirmButtons">',
							'<button id="bkgndInst" data-corner="false" data-shadow="false" data-theme="b">背景安裝</button>',
							'</div></div></div>'
						].join('');
						_box = $(markup).appendTo("body").trigger("create").find("#confirmBox");
						_box.find("#progbar").attr({'name':'progbar','data-highlight':'true','min':'0','max':_ttCnts,'value':'0','type':'range'}).slider({
							create: function( event, ui ) {
								$(this).parent().find('input').hide();
								$(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
								$(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
								$(this).parent().find('.ui-slider-handle').hide();
							}
						}).slider("refresh");
						_box.find("#bkgndInst").on("click", function() {
							instprogbar.close();
							_bkgndInst = true;
						});
					}
					else {	// 重設
						_box.find("h1").text(title);
						_box.find("#desc").text(_progCnts + '/' + _ttCnts);
						_box.find("#extraDesc").text("");
						_box.find("#progbar").attr({'max':_ttCnts,'value':'0'}).slider("refresh");
					}
				}
			},
			adv: function(progress, extraDesc, totalCounts, title) {
				if(!_bkgndInst) {
					//var dfd = $.Deferred();
					if(!_box) {
						this.init(totalCounts, title);
						return;
					}
					if(!!extraDesc && typeof extraDesc === "string")
						_box.find("#extraDesc").text(extraDesc);
					_progCnts = progress;
					_box.find("#desc").text(_progCnts + '/' + _ttCnts);
					_box.find("#progbar").val(_progCnts).slider("refresh");
					//setTimeout(dfd.resolve, 100);
					//return dfd.promise();
				}
			},
			text: function(str) {
				if(!_bkgndInst) {
					_box.find("#desc").text(str);
				}
			},
			close: function(message) {
				if(!_bkgndInst) {
					_box.find("#extraDesc").text("");
					$("#confirmOverlay").remove();
					_box = undefined;
					// 1130808 Raymond 1130313 合併1111007(1100394), 修正安裝途中按背景安裝會跳出alert undefined的問題
					if(!!message) {
						setTimeout(function() {
							alert(message);
						}, 500);
					}
				}
			}
		}
	}();
	
	//1130808 Raymond 1130313 合併1111007(1100394), 新增安裝離線版公文製作功能
	if(!theSSO || theSSO.offlineMode != true) {	// 1100816 Raymond 1100394 離線模式下不要postMessage(offlineMode=false), 以避免變成連線模式
		if('serviceWorker' in navigator) {
			if(!!navigator.serviceWorker.controller &&
				navigator.serviceWorker.controller.scriptURL.match(/sw.js$/) &&
				navigator.serviceWorker.controller.state == "activated") {
				navigator.serviceWorker.ready.then(function(registration) {
					console.log("%cService Worker Registered", "background: wheat; color: darkblue", registration);
					registration.active.postMessage("offlineMode=false");	// 若已安裝過離線版ServiceWorker, 登入頁要先通知ServiceWorker預設為線上模式
					$("#installOfflineMode").addClass("ui-disabled");
					$("#updateOfflineMode").removeClass("ui-disabled");
					$("#uninstallOfflineMode").removeClass("ui-disabled");
				});
			}
			// 安裝/更新進度條
			navigator.serviceWorker.addEventListener('message', function(evt) {
				console.log(evt.data);
				if(typeof evt.data == "string" && evt.data.match(/^\{/)) {
					let param = JSON.parse(evt.data);
					if(param.action == "install") {
						instprogbar.init(param.totalFiles, param.title);
					}
					else if(param.action == "update") {
						instprogbar.init(param.totalFiles, param.title);
					}
					else if(param.action == "progress") {
						instprogbar.adv(param.downloadedFiles, param.fileName, param.totalFiles, param.title);
					}
					else if(param.action == "complete") {
						instprogbar.close(param.message);
					}
				}
			});
		}
		$('#installOfflineMode').on('click', function(){
			// 1141114 Raymond 1141452 新增判斷SSO_CONFIG_EDOC.js的enableOfflineMode參數設為true時, 才能執行「安裝離線版公文製作」功能, 以避免使用者用F12修改display, 變成可以看到跟點擊執行的問題
			//if('serviceWorker' in navigator) {
			if('serviceWorker' in navigator && SSO_CONFIG?.enableOfflineMode == true) {
				navigator.serviceWorker
				.register('sw.js')
				.then(function(registration) {
					console.log("%cService Worker Registered", "background: wheat; color: darkblue", registration.installing, registration.waiting, registration.active);
					if(registration.installing) {
						let newInstall = registration.installing;
						var t0 = new Date();
						newInstall.postMessage("offlineMode=false");
						console.log("postMessage0 - ", (new Date() - t0) + "ms");
						$('#installOfflineMode').addClass("ui-disabled");
						// 偵測安裝結束
						newInstall.addEventListener('statechange', function(evt) {
							console.log("ServiceWorker.onstatechange", evt.target.state);
							if(evt.target.state == "activated") {
								evt.target.postMessage("offlineMode=false");	// 安裝結束後連線模式登入頁要先通知ServiceWorker預設為連線模式
								console.log("postMessage1 - ", (new Date() - t0) + "ms");
								t0 = new Date();
								// 將目前登入使用者資訊及有效權杖傳入sw.js
								evt.target.postMessage(JSON.stringify(theSSO.RawUser));
								console.log("postMessage2 - ", (new Date() - t0) + "ms");
								t0 = new Date();
								evt.target.postMessage(JSON.stringify(theUserInfo));
								console.log("postMessage3 - ", (new Date() - t0) + "ms");
								t0 = new Date();
								evt.target.postMessage("SAMLart=" + localStorage['Artifact']);
								console.log("postMessage4 - ", (new Date() - t0) + "ms");
								$('#installOfflineMode').addClass("ui-disabled");
								$('#updateOfflineMode').removeClass("ui-disabled");
								$('#uninstallOfflineMode').removeClass("ui-disabled");
								//location.reload();	// 更新完的ServiceWorker好像要重新整理才會生效
							}
						});
					}
					else if(registration.active) {	// 移除再安裝, 會變成這個狀態
						registration.update()
						.then(function(regUpd) {
							if(regUpd.installing) {
								let reInstall = regUpd.installing;
								var t0 = new Date();
								reInstall.postMessage("offlineMode=false");
								console.log("postMessage0 - ", (new Date() - t0) + "ms");
								$('#installOfflineMode').addClass("ui-disabled");
								// 偵測安裝結束
								reInstall.addEventListener('statechange', function(evt) {
									console.log("ServiceWorker.onstatechange", evt.target.state);
									if(evt.target.state == "activated" || evt.target.state == "installed") {	// registration.update()若SW.js有更新, state會是installed, 跟register()不一樣
										evt.target.postMessage("offlineMode=false");	// 安裝結束後連線模式登入頁要先通知ServiceWorker預設為連線模式
										console.log("postMessage1 - ", (new Date() - t0) + "ms");
										t0 = new Date();
										// 將目前登入使用者資訊及有效權杖傳入sw.js
										evt.target.postMessage(JSON.stringify(theSSO.RawUser));
										console.log("postMessage2 - ", (new Date() - t0) + "ms");
										t0 = new Date();
										evt.target.postMessage(JSON.stringify(theUserInfo));
										console.log("postMessage3 - ", (new Date() - t0) + "ms");
										t0 = new Date();
										evt.target.postMessage("SAMLart=" + localStorage['Artifact']);
										console.log("postMessage4 - ", (new Date() - t0) + "ms");
										$('#installOfflineMode').addClass("ui-disabled");
										$('#updateOfflineMode').removeClass("ui-disabled");
										$('#uninstallOfflineMode').removeClass("ui-disabled");
										//location.reload();	// 更新完的ServiceWorker好像要重新整理才會生效
									}
								});
							}
							else if(regUpd.active) {	// 移除再安裝, 若SW.js無異動, update()的registration也會是這個狀態
								let reInstall = regUpd.active;
								var t0 = new Date();
								reInstall.postMessage("offlineMode=false");	// 安裝結束後連線模式登入頁要先通知ServiceWorker預設為連線模式
								console.log("postMessage1 - ", (new Date() - t0) + "ms");
								t0 = new Date();
								// 將目前登入使用者資訊及有效權杖傳入sw.js
								reInstall.postMessage(JSON.stringify(theSSO.RawUser));
								console.log("postMessage2 - ", (new Date() - t0) + "ms");
								t0 = new Date();
								reInstall.postMessage(JSON.stringify(theUserInfo));
								console.log("postMessage3 - ", (new Date() - t0) + "ms");
								t0 = new Date();
								reInstall.postMessage("SAMLart=" + localStorage['Artifact']);
								console.log("postMessage4 - ", (new Date() - t0) + "ms");
								$('#installOfflineMode').addClass("ui-disabled");
								$('#updateOfflineMode').removeClass("ui-disabled");
								$('#uninstallOfflineMode').removeClass("ui-disabled");
								//alert("安裝成功");
							}
						});
					}
				});
			}
			else
				alert("此瀏覽器不支援Service Worker功能, 無法安裝離線版公文製作系統!\r\n請改用Chrome、FireFox、Safari或Edge使用。");
		});
		//1130808 Raymond 1130313 合併1111007(1100394), 新增更新離線版資源檔及使用者資訊功能
		$('#updateOfflineMode').on('click', function(){
			// 1141114 Raymond 1141452 新增判斷SSO_CONFIG_EDOC.js的enableOfflineMode參數設為true時, 才能執行「更新資源檔及使用者資訊」功能, 以避免使用者用F12修改display, 變成可以看到跟點擊執行的問題
			//if('serviceWorker' in navigator) {
			if('serviceWorker' in navigator && SSO_CONFIG?.enableOfflineMode == true) {
				navigator.serviceWorker.ready.then(function(registration) {
					console.log("%cService Worker Registered", "background: wheat; color: darkblue", registration);
					var t0 = new Date();
					registration.active.postMessage("offlineMode=false");
					console.log("postMessage1 - ", (new Date() - t0) + "ms");
					// 將目前登入使用者資訊及有效權杖傳入sw.js
					registration.active.postMessage(JSON.stringify(theSSO.RawUser));
					console.log("postMessage2 - ", (new Date() - t0) + "ms");
					t0 = new Date();
					registration.active.postMessage(JSON.stringify(theUserInfo));
					console.log("postMessage3 - ", (new Date() - t0) + "ms");
					t0 = new Date();
					registration.active.postMessage("SAMLart=" + localStorage['Artifact']);
					console.log("postMessage4 - ", (new Date() - t0) + "ms");
					t0 = new Date();
				});
			}
		});
		//1130808 Raymond 1130313 合併1111007(1100394), 新增移除離線版公文製作功能
		$('#uninstallOfflineMode').on('click', function(){
			// 1141114 Raymond 1141452 新增判斷SSO_CONFIG_EDOC.js的enableOfflineMode參數設為true時, 才能執行「移除離線版公文製作」功能, 以避免使用者用F12修改display, 變成可以看到跟點擊執行的問題
			//if('serviceWorker' in navigator) {
			if('serviceWorker' in navigator && SSO_CONFIG?.enableOfflineMode == true) {
				navigator.serviceWorker.ready.then(function(registration) {
					registration.unregister('sw.js')
					.then(function(succeeded) {
						if(succeeded) {
							console.log("%cService Worker Unregistered", "background: wheat; color: darkblue", arguments);
							alert("已移除離線版公文製作系統");
							$('#installOfflineMode').removeClass("ui-disabled");
							$('#updateOfflineMode').addClass("ui-disabled");
							$('#uninstallOfflineMode').addClass("ui-disabled");
						}
						else
							console.log("%cService Worker NOT Unregistered", "background: wheat; color: darkblue", arguments);
					});
				});
			}
		});
		// 1130816 Raymond 1130313 新增判斷SSO_CONFIG_EDOC.js的enableOfflineMode參數設為true時, 才顯示「安裝離線版公文製作」、「更新資源檔及使用者資迅」、「移除離線版公文製作」按鈕
		if(!!SSO_CONFIG && SSO_CONFIG.enableOfflineMode == true) {
			theLogger.log("SSO_CONFIG_EDOC.js的enableOfflineMode設為true, 啟用離線模式安裝、更新、移除等按鈕");
			$('#offlineModeGroup').show();
		}
		// 1141114 Raymond 1141452 新增判斷SSO_CONFIG_EDOC.js的enableOfflineMode參數不為true時, 移除「安裝離線版公文製作」、「更新資源檔及使用者資迅」、「移除離線版公文製作」按鈕, 以避免使用者用F12修改display, 變成可以看到跟點擊執行的問題
		else {
			$('#offlineModeGroup').remove();
		}
	}
	
	//1080514 Kevin 新增登入後通知訊息(原目的為提醒憑證將到期)
	////1070322 Kevin 1070199 使用者登入時，系統會自動彈出視窗顯示宣導或警示訊息
	//if(theSSO.User.SystemSets.II_LOGIN_MSG && theSSO.User.SystemSets.II_LOGIN_MSG!="")
	//	theSSO.MP.promptMsg('系統訊息', theSSO.User.SystemSets.II_LOGIN_MSG);
	var Msg = '';
	
	if(theSSO.logonPopMsg !=""  && theSSO.User.SystemSets.II_LOGIN_MSG != "")
		Msg += theSSO.logonPopMsg + "<br><br>" + theSSO.User.SystemSets.II_LOGIN_MSG;
	else if(theSSO.logonPopMsg !=""  || theSSO.User.SystemSets.II_LOGIN_MSG != "")
		Msg += theSSO.logonPopMsg + theSSO.User.SystemSets.II_LOGIN_MSG;
	
	if(Msg != "")
		theSSO.MP.promptMsg('系統訊息', Msg);
    //1100504	Leslie[1090634]	新增依系統參數，決定是否啟用偵測使用者操作行為
	var setName = 'MP_MONITOR_ACTIVE_TIMEOUT';
	var mpMonitorActiveTimeout = theSSO.User.SystemSets.get(setName);
	localStorage[setName] = mpMonitorActiveTimeout;
	if( mpMonitorActiveTimeout != '' && parseInt(mpMonitorActiveTimeout) > 0){
		function checkActive(){
			let newActive = Date.now();
			if('MP_LASTACTIVE_TIME' in localStorage){
				let lastActive = parseInt(localStorage["MP_LASTACTIVE_TIME"]);
				let passSecond = (newActive - lastActive) / 1000;
				if(passSecond >= parseInt(mpMonitorActiveTimeout)){
					//已超過偵測上限
					alert('網頁因未異動已超過所設定之閒置時間，因應資安考量，故己將系統登出，如須繼續使用重新登入系統');
					//theSSO.logoned = false;	//1110824	Leslie	強制登出應正確跑完登出流程，theSSO.logoned先設成fasle會導致未正確登出	Marked
					theSSO.logOutNow = true;
					$(document).off('mouseover keyup touchend',checkActive);
					$('#btn_logout').trigger('click');
					return;
				}
			}
			localStorage["MP_LASTACTIVE_TIME"] = newActive;
		}
		$(document).on('mouseover keyup touchend',checkActive)
	}
	
	//1110314	Leslie[1110167]	[考試院]UI調整	
	$('#Logo').attr('title','回首頁').on('click',function(){$('#btn_start').click()});
});

(function ($)
{
    var _IsInitTreeShort = false;

    if (typeof window.theStart === 'undefined') {
        window.theStart = {
            SetInitTreeShort: function () { _IsInitTreeShort = true; }
                , InitProgram: function ()
                {
                    theWebServices.authws.getUserProgramsJSON(localStorage.Artifact)
                    .done(function (rslt)
                    {
                        var rtn = rslt;

                        initTree(rslt, 'treeProgram');

                        if (_IsInitTreeShort)
                            initTree(rslt, 'treeShort');
                        else
                            $('#treeShort').attr("style", "display:none");

                        initTree(rslt, 'Uptree');
                        //1110314	Leslie[1110167]	[考試院]UI調整	
						$('.Filter').insertBefore('#treeProgram > li');
						//1110302	Leslie[1101537]	[考試院]新增機關切換選單
						//1111014	Leslie	新增僅ASP架構，才顯示機關切換選單
						//1140513	Leslie[問題彙整序90]	僅多機關架構無切換需求，修改判斷式
						// if(SSO_CONFIG.IISystemMode == 'ASP')
						if(SSO_CONFIG.IISystemMode != 'Normal')
							initTree(rslt, 'UpUserLink');
						else
							$('#UpUserLink').hide();

						//1081008	Joe		1080339		jQuery升級3.4.1
                        // $('#txFilter').bind('change keyup', txFilterKeyup)
                        $('#txFilter').on('change keyup', txFilterKeyup)
							.on('compositionstart', function(){
								$(this).prop('comStart', true);
								console.log('程式選單中文輸入 Start');
							})
							.on('compositionend', function(){
								$(this).prop('comStart', false);
								console.log('程式選單中文輸入 End');
								$(this).trigger("change");
							});
                    })
                    .fail(function (errObj)
                    {
                        alert(errObj);
                    });
                }
                , InitFlotImp: function ()
                {
                    var light = theSSO.MP.todolist.builder.getToDoListNumbers();

                    var rawDataImp = [[light.unread, 0], [light.red, 1], [light.yellow, 2], ];

                    var xAxisMax = 50;
                    xAxisMax = light.unread > xAxisMax ? light.unread : xAxisMax;
                    xAxisMax = light.red > xAxisMax ? light.red : xAxisMax;
                    xAxisMax = light.yellow > xAxisMax ? light.yellow : xAxisMax;

                    var dataSetImp = [{ label: "待辦件數", data: rawDataImp, color: "#DE000F" }];

                    var ticksImp = [[0, "未閱讀(" + light.unread + ")"], [1, "已逾期(" + light.red + ")"], [2, "將逾期(" + light.yellow + ")"]];

                    var optionsImp = {
                        series: {
                            bars: {
                                show: true
                            }
                        },
                        bars: {
                            align: "center",
                            barWidth: 0.5,
                            horizontal: true,
                            fillColor: { colors: [{ opacity: 0.8 }, { opacity: 0.9 }] },
                            lineWidth: 1
                        },
                        xaxis: {
                            axisLabel: "待辦件數",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 16,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 10,
                            max: xAxisMax,
                            tickColor: "#5E5E5E",
                            color: "black"
                        },
                        yaxis: {
                            axisLabel: "待辦事項",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 16,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 1,
                            tickColor: "#5E5E5E",
                            ticks: ticksImp,
                            color: "black"
                            //tickLength: 1,
                            //alignTicksWithAxis: 1
                        },
                        legend: {
                            noColumns: 0,
                            labelBoxBorderColor: "#858585",
                            position: "ne"
                        },
                        grid: {
                            hoverable: true,
                            borderWidth: 1,
                            backgroundColor: { colors: ["#D9ECF2", "#EDF7F9"] }
                        }
                    };

                    $.plot($("#StartImpFlot"), dataSetImp, optionsImp);
                }
				//1110913	Leslie[1110652]	新增預設參數(只能放在後面)，以觸發僅更新待辦件數(不含WS取得內容)
                // , InitFlotTodo: function (argForder, argSubFolder)
                , InitFlotTodo: function (argForder, argSubFolder, refreshTodoOnly = false)
                {
                    //20170413 Kevin 套美工
                    //var Color = ['#005CDE', '#00A36A', '#7D0096', '#992B00', '#DE000F', '#ED7B00']
					var Color = ['#ff0000', '#cc00cc', '#6633cc', '#333399', '#336699', '#669933']
                    var iArr = 0;
					
					//1110902	Leslie[1110652]	新增客製化圓餅圖功能
					if(SSO_CONFIG.EnableCustomFlotTodo){
						let arColor = [];
						arColor.push({color:238,offset:48});	//RGB三色的初始值與變量
						arColor.push({color:0,offset:16});
						arColor.push({color:51,offset:48});						
						
						FlotTodoData = [];
						let MPByPassRole = [];
						var mpViewRole = genTodoRecordRole(MPByPassRole);
						if(typeof _mpRoleRecord == 'undefined')
							_mpRoleRecord = mpViewRole;	//紀錄一下原始角色
						if(CntWSData === undefined || !refreshTodoOnly)
							CntWSData = [];	//暫存物件，用來保留WebService取得的件數用
																		
						for(var title in SSO_CONFIG.MPSetting){
							if(title != undefined && mpViewRole.viewList.indexOf(title) != -1){
								var CountSet = ('CountSet' in SSO_CONFIG.MPSetting[title])?SSO_CONFIG.MPSetting[title].CountSet:SSO_CONFIG.MPSetting[title];
								if(CountSet != undefined)
									for(var todoLable in CountSet){
										var rtn = genTodo(title, todoLable, CountSet[todoLable], false, true);
										if(rtn.num > 0 && FlotTodoData.findIndex(function(o){return o.keyObj.key == rtn.KeyObj.key}) == -1){
											let currColor = arColor.reduce(function(s,o){return s+o.color.toString(16).padStart(2,'0')},"");
											FlotTodoData.push({ 
												label: todoLable, 
												data: rtn.num, 
												color: '#'+currColor,
												keyObj : rtn.KeyObj})
											arColor.forEach(function(o){o.color = (o.color + o.offset) % 255});
											arColor.unshift(arColor.pop());	//交換順序
										}
									}
							}
						}
						CntWSData.allDone = true;	//設定所有WebService件數已完成
					}
					else{
						//非第一次初始化，單一資料夾異動之處理
						if (FlotTodoData && argForder != '' && argSubFolder != "") {
							var isChange = false;
							for (var i = 0; i < FlotTodoData.length; i++) {
								if (FlotTodoData[i].label == argForder + '-' + argSubFolder) {
									var Num = theSSO.MP.todolist.builder.getFolderItemCount(argForder, argSubFolder);

									FlotTodoData[i].data = Num;
									isChange = true;
								}
							}
							if (!isChange)
								return;
						}
						else {
							var sPdaFolder = theSSO.User.EnvSettings.get("PDA_SHORTCUT_FOLDER");

							FlotTodoData = new Array();

							if (sPdaFolder != '') {
								var items = $(sPdaFolder).find('shortcut');

								//超過五個，則最多顯示五個(四個加一個其他)
								var LimitCount = -1;
								if (items.length > 5) {
									LimitCount = 0;
									for (var iLen = 4; iLen < items.length; iLen++) {
										var item = $(items[iLen]);
										var folder = item[0].children[0].textContent;
										var subfolder = item[0].children[1].textContent;

										LimitCount += theSSO.MP.todolist.builder.getFolderItemCount(folder, subfolder);
									}
								}

								for (var iLen = 0; iLen < 5; iLen++) {
									var item = $(items[iLen]);
									var sFolder = item[0].children[0].textContent;
									var sSubFolder = item[0].children[1].textContent;

									var iCount = theSSO.MP.todolist.builder.getFolderItemCount(sFolder, sSubFolder);

									if (iLen == 4 && LimitCount != -1) {
										FlotTodoData[iArr++] = { label: '其他', data: LimitCount, color: Color[iArr] };
									}
									else {
										FlotTodoData[iArr++] = { label: sFolder + '-' + sSubFolder, data: iCount, color: Color[iArr] };
									}
								}
							}
							else {
								var iCount = theSSO.MP.todolist.builder.getFolderItemCount("待處理", "主辦");
								FlotTodoData[iArr++] = { label: "待處理-主辦", data: iCount, color: Color[0] };

								iCount = theSSO.MP.todolist.builder.getFolderItemCount("待處理", "待核示");
								FlotTodoData[iArr++] = { label: "待處理-待核示", data: iCount, color: Color[1] };

								iCount = theSSO.MP.todolist.builder.getFolderItemCount("待處理", "受會");
								FlotTodoData[iArr++] = { label: "待處理-受會", data: iCount, color: Color[2] };

								iCount = theSSO.MP.todolist.builder.getFolderItemCount("會核中", "主辦");
								FlotTodoData[iArr++] = { label: "會核中-主辦", data: iCount, color: Color[3] };

								iCount = theSSO.MP.todolist.builder.getFolderItemCount("已送出", "紙本簽核");
								FlotTodoData[iArr++] = { label: "已送出-紙本簽核", data: iCount, color: Color[4] };
							}
						}
					}

                    var optionsTodo = {
                        series: {
                            pie: {
                                show: true,
                                label: {
                                    show: true,
                                    radius: 0.8,
                                    formatter: function (label, series)
                                    {
                                        return '<div style="border:1px solid grey;font-size:8pt;text-align:center;padding:5px;color:white;">'
                                            + label + ' : '
                                            + series.data[0][1]
                                            + '件</div>';
                                    },
                                    background: {
                                        opacity: 0.7,
                                        color: '#000'
                                    }
                                }
                            }
                        },
                        legend: {
                            show: false
                        },
						//1051205 Kevin 新增額外顯示件數，避免重疊看不見問題
                        grid: {
                            hoverable: true,
							clickable: true	//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加點擊功能
                        }
                    };

                    $.plot($("#StartTodoFlot"), FlotTodoData, optionsTodo);
					
					//1051205 Kevin 新增額外顯示件數，避免重疊看不見問題
					$("#StartTodoFlot").append('<div id="StartTodoMemo" ></div>'); //Init圓餅後加入
					
					//1110902	Leslie[1110652]	新增客製化圓餅圖功能，把可能重覆註冊的Event先刪掉
					$("#StartTodoFlot").off("plothover").off("plotclick");
					
					//1081008	Joe		1080339		jQuery升級3.4.1
					// $("#StartTodoFlot").bind("plothover", function (event, pos, item) {
					$("#StartTodoFlot").on("plothover", function (event, pos, item) {
						//1110913	Leslie[1110652]	圖餅圖標籤的醒目顯示
						$('.pieLabel').removeClass('showPieLabel');
						
						if (!item)
						{ 
							$("#StartTodoMemo").html('');
							return; 
						}
						
						//1110913	Leslie[1110652]	圖餅圖標籤的醒目顯示
						$('#pieLabel'+item.seriesIndex).addClass('showPieLabel');

						var strHtml = "<div class=\"FlotMemo\" style=\"background-color:" + item.series.color + "\">" + 
							 "<span style=\"color:white\">" + item.series.label + " : " + item.series.data[0][1] + "件</span></div>";
						$("#StartTodoMemo").html(strHtml);
					});
					
					//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加點擊功能
					$("#StartTodoFlot").on("plotclick", function (event, pos, item) {
						if (!item || !('keyObj' in item.series))
							return;
						if(item.series.keyObj.type == 'Todo')
							triggerTodo(item.series.keyObj.key);
						else if(item.series.keyObj.type == 'Prog')
							triggerProg(item.series.keyObj.key);
					})
                }
            //1050823   Leslie  增加視窗管理，當首頁關閉時，一併關閉所有程式
                , ChildWin: []
                , closeAllChildWin: function ()
                {
                    this.ChildWin.forEach(function (element) { element.close(); });
                    this.ChildWin = [];
                }
            //1051005 Kevin 新增系統公告
                , InitBU: function ()
                {
					//1090812	Leslie[1090473]	配合改為非同步呼叫，顯示載入中(沒延遲則不易看到)
					$('#ListBU').empty().append('<li class="LoadBulletin">載入中</li>')
                    theWebServices.authws.GetUserBulletinNew(localStorage.Artifact, 5)
                    .done(function (rslt)
                    {
                        /*
                         <li data-role="list-divider" data-theme="c" role="heading" class="ui-li-divider ui-bar-c ui-first-child">
                         <a id="ListBULink" href="javascript:theStart.OpenBuletin()" data-theme="c" class="ui-link">系統公告</a>
                         </li>
                        */
						//1061211 Kevin 1061116 切回首頁時更新公告以及公布欄
						$('#ListBU').empty();
                        
						//1141009 Kevin 1141352 調整網址串接方式避免後方站台被掃出
						//var strBUUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_II_SERVER");
                        //strBUUrl += '/IF/IF1/IFI700.aspx';
						var strBUUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_II_SERVER")+'/';
                        strBUUrl += 'IF/IF1/IFI700.aspx';
						//1091119	Leslie[1090885]	停用網址列權杖避免滲透弱點
                        //strBUUrl += "?SAMLart=" + localStorage.Artifact;

                        var sTitleHTML = '<li>';
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                        //sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c ';
                        sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c alert-info';
                        //1110314	Leslie[1110167]	[考試院]UI調整	
                        //sTitleHTML += ' ui-icon-plus';
						//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                        //sTitleHTML += '"data-role="list-divider" data-theme="c" onclick="';
                        //sTitleHTML += 'theStart.ChildWin.push(window.open(\'' + strBUUrl + '\'))';
                        //sTitleHTML += '">';
						sTitleHTML += '"data-role="list-divider" data-theme="c" >';
                        //1110314	Leslie[1110167]	[考試院]UI調整	
                        //sTitleHTML += '系統公告 <span class="ui-li-count" style="position: static;">' + rslt.nTotal + '</span>';
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                        //sTitleHTML += '系統公告 <span class="ui-li-count" style="font-size: 0.7em;">' + rslt.nTotal + '</span>';
                        sTitleHTML += '系統公告 <span class="ui-li-count bg-num bg-info" style="font-size: 0.7em;">' + rslt.nTotal + '</span>';
                        sTitleHTML += '</a>';
                        sTitleHTML += '</li>';

						//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                        // $('#ListBU').append(sTitleHTML);
                        $('#ListBU').append(sTitleHTML).find('a').on('click',function(){
							theStart.ChildWin.push(window.open(strBUUrl));
						});
												
                        var strUrl = window.location.protocol + '//'
                        
						//1141009 Kevin 1141352 調整網址串接方式避免後方站台被掃出
						//strUrl += theSSO.User.EnvSettings.get("WS_II_SERVER");
                        //strUrl += '/IF/IF1/IFI700C1.aspx';
						strUrl += theSSO.User.EnvSettings.get("WS_II_SERVER")+'/';
                        strUrl += 'IF/IF1/IFI700C1.aspx';
						//1091119	Leslie[1090885]	停用網址列權杖避免滲透弱點
                        //strUrl += '?SAMLart=' + localStorage.Artifact;
                        //strUrl += '&nIFI700C1=';
						strUrl += '?nIFI700C1=';

                        for (var iLen = 0; iLen < rslt.BulletinInfo.length; iLen++) {
							
							//1110314	Leslie[1110167]	[考試院]UI調整	
                            // var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c ui-btn-icon-right ';
                            // if (rslt.BulletinInfo[iLen].AttachFile != '無')
                                // sHTML += ' ui-icon-cloud';
                            // else
                                // sHTML += ' ui-icon-plus';
                            //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
							//var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c ';
							var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c bg-fr ';
							if (rslt.BulletinInfo[iLen].AttachFile != '無')
                                sHTML += 'ui-btn-icon-right ui-icon-shop';
							
							//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                            // sHTML += '" data-theme="c" onclick="';
                            // sHTML += 'theStart.ChildWin.push(window.open(\'' + strUrl + rslt.BulletinInfo[iLen].Path + '\'))';
                            // sHTML += '">';
							sHTML += '" data-theme="c" >';

                            sHTML += rslt.BulletinInfo[iLen].PublishDate.substring(0, 3) + '/';
                            sHTML += rslt.BulletinInfo[iLen].PublishDate.substring(3, 5) + '/';
                            sHTML += rslt.BulletinInfo[iLen].PublishDate.substring(5, 7) + ' ';

                            sHTML += rslt.BulletinInfo[iLen].Subject;
                            sHTML += '</a></li>';
							
							//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                            //$('#ListBU').append(sHTML);
							$(sHTML).appendTo('#ListBU').on('click',{url:strUrl + rslt.BulletinInfo[iLen].Path},function(e){
								theStart.ChildWin.push(window.open(e.data.url));
							})
                        }
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                        //$('#ListBU').listview('refresh');
                    })
                    .fail(function (errObj)
                    {
                        theLogger.error('-E- authws.GetUserBulletinNew return:' + errObj);
                        alert(errObj.errCode + ' ' + errObj.errMsg);
                    });
                }
                , InitTB: function () //1051005 Kevin 新增公布欄
                {
					//1090812	Leslie[1090473]	配合改為非同步呼叫，顯示載入中(沒延遲則不易看到)
					$('#ListTB').empty().append('<li class="LoadBulletin">載入中</li>')
                    theWebServices.TBWS.GetUserBulletin(localStorage.Artifact, 5)
                    .done(function (rslt)
                    {
                        /*
                        <li data-role="list-divider" data-theme="c" role="heading" class="ui-li-divider ui-bar-c ui-first-child">
                        <a id="ListTBLink" href="javascript:theStart.OpenTB()" data-theme="c" class="ui-link">電子公布欄</a>
                        </li>
                        */
						//1061211 Kevin 1061116 切回首頁時更新公告以及公布欄
						$('#ListTB').empty();
                        
						//1141009 Kevin 1141352 調整網址串接方式避免後方站台被掃出
						//var strTBUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_TB_SERVER");
						//strTBUrl += '/TB_A/TB1/TBI100.aspx';
						var strTBUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_TB_SERVER") + '/';
                        strTBUrl += 'TB_A/TB1/TBI100.aspx';
						//1091119	Leslie[1090885]	停用網址列權杖避免滲透弱點
                        //strTBUrl += "?SAMLart=" + localStorage.Artifact;

                        var sTitleHTML = '<li>';
                        //1110314	Leslie[1110167]	[考試院]UI調整	
                        //sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c ui-btn-icon-right ';
                        //sTitleHTML += ' ui-icon-plus';
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                        //sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c ';                        
                        sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c alert-orange' ;
						//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                        // sTitleHTML += '"data-role="list-divider" data-theme="c" onclick="';
                        // sTitleHTML += 'theStart.ChildWin.push(window.open(\'' + strTBUrl + '\'));';
                        // sTitleHTML += '">';
						sTitleHTML += '"data-role="list-divider" data-theme="c" >';
                        //1110314	Leslie[1110167]	[考試院]UI調整	
                        //sTitleHTML += '電子公布欄 <span class="ui-li-count" style="position: static;">' + rslt.nTotal + '</span>';
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                        //sTitleHTML += '電子公布欄 <span class="ui-li-count" style="font-size: 0.7em;">' + rslt.nTotal + '</span>';
                        sTitleHTML += '電子公布欄 <span class="ui-li-count bg-num bg-orange" style="font-size: 0.7em;">' + rslt.nTotal + '</span>';
                        sTitleHTML += '</a>';
                        sTitleHTML += '</li>';

						//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                        //$('#ListTB').append(sTitleHTML);
						$('#ListTB').append(sTitleHTML).find('a').on('click',function(){
							theStart.ChildWin.push(window.open(strTBUrl));
						});

                        var strUrl = window.location.protocol + '//'

                        
						//1141009 Kevin 1141352 調整網址串接方式避免後方站台被掃出
						//strUrl += theSSO.User.EnvSettings.get("WS_TB_SERVER");
                        //strUrl += '/TB_A/TB1/TBI130.htm';
						strUrl += theSSO.User.EnvSettings.get("WS_TB_SERVER") + '/';
                        strUrl += 'TB_A/TB1/TBI130.htm';
						//1091119	Leslie[1090885]	停用網址列權杖避免滲透弱點
                        //strUrl += "?SAMLart=" + localStorage.Artifact;
                        //strUrl += "&BulletinId=";
						strUrl += "?BulletinId=";

                        for (var iLen = 0; iLen < rslt.BulletinInfo.length; iLen++) {
							
							//1110314	Leslie[1110167]	[考試院]UI調整	
                            //var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c ui-btn-icon-right ';
                            // if (rslt.BulletinInfo[iLen].AttFileCount > 0)
                                // sHTML += ' ui-icon-cloud';
                            // else
                                // sHTML += ' ui-icon-plus';
                            //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
							//var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c ';
							var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c bg-fr ';
							if (rslt.BulletinInfo[iLen].AttFileCount > 0)
								sHTML += 'ui-btn-icon-right ui-icon-shop';

                            //1110422	Leslie[1110164]	弱掃停用html宣告的Event
							// sHTML += '" data-theme="c" onclick="';
                            // sHTML += 'theStart.ChildWin.push(window.open(\'' + strUrl + rslt.BulletinInfo[iLen].BulletinId + '\'))';
                            // sHTML += '">';
							sHTML += '" data-theme="c" >';

                            sHTML += rslt.BulletinInfo[iLen].PasteDate.substring(0, 3) + '/';
                            sHTML += rslt.BulletinInfo[iLen].PasteDate.substring(3, 5) + '/';
                            sHTML += rslt.BulletinInfo[iLen].PasteDate.substring(5, 7) + ' ';

                            sHTML += rslt.BulletinInfo[iLen].Subject;
                            sHTML += '</a></li>';
							
							//1121130	Leslie[彙整表序332]	當跑馬燈設定為空時，應取得電子公布欄第一筆的主旨後顯示
							if(iLen == 0 && $("#latest_notify_subject").text() == ''){
								$("#latest_notify_subject").text(rslt.BulletinInfo[iLen].Subject);
							}

							//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                            //$('#ListTB').append(sHTML);
							$(sHTML).appendTo('#ListTB').on('click',{url:strUrl + rslt.BulletinInfo[iLen].BulletinId},function(e){
								theStart.ChildWin.push(window.open(e.data.url));
							})
                        }
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                        //$('#ListTB').listview('refresh');
                    })
                    .fail(function (errObj)
                    {
                        theLogger.error('-E- TBWS.GetUserBulletin return:' + errObj);
						//1120810 Zen 1120467 暫時不顯示取公告錯誤之alert，待效能調整完畢後還原
                        //alert(errObj.errCode + ' ' + errObj.errMsg);
                    });
                }
                , InitLoginMsg: function () //登入通知訊息
                {
                    theWebServices.odmssp.GetLoginMsg(localStorage.Artifact)
                    .done(function (rslt)
                    {
                        //1051028 Kevin 調整回傳空字串處理
                        if (rslt != '')
                            alert(rslt);
                    })
                    .fail(function (errObj)
                    {
                        theLogger.error('-E- odmssp.GetLoginMsg return:' + errObj);
                        alert(errObj.errCode + ' ' + errObj.errMsg);
                    });
                }
				//1100810	Leslie[1100580]	Merge MP客製化待辦件數區域
				//1110913	Leslie[1110652]	新增預設參數(只能放在後面)，以觸發僅更新待辦件數(不含WS取得內容)
				// , InitTodoCountList: function(){
				, InitTodoCountList: function(refreshTodoOnly = false){
					var light = theSSO.MP.todolist.builder.getToDoListNumbers(1);	//取得未讀數量(非代理)
					//1110913	Leslie[1110652]	配合客製化圓餅圖功能，修改待辦件數統計可支援客製化統計設定，並整併角色取得方式
					var roleByMpSet = ('CountRoleBySet' in SSO_CONFIG)?SSO_CONFIG.CountRoleBySet:false;
					/*
					var MPViewRoleSet = ["OD91","OD94","OD95","OD96","OD99"];	//定義確定的角色
					var MPViewRoleName = ["總收文","總發文","檔管人員","研考人員","承辦人"];
					var sDivHtml = '';
					var mpViewRole = {
						viewList:[],
						roleList:{}
					};
					let MPByPassRole = [];
					for(var i=0,role;role = theSSO.User.PlayRoles[i++];){
						if(role.proxyAccount != ""){
							MPByPassRole.push(role);
							continue;
						}
						if(role.id < 'OD30' && role.id != 'OD16'){	//角色代碼小於OD30的，除OD16外，都需要找最大角色
							var currSet = '單位登記桌';
							if(role.id != 'OD17')
								currSet = '主管';
							if(mpViewRole.viewList.indexOf(currSet) == -1){
								//直接放入當前角色
								mpViewRole.viewList.push(currSet);
								mpViewRole.roleList[currSet] = role;	//相關角色仍需要加到紀錄中
							}
							if('maxRole' in mpViewRole.roleList){
								//第二角色開始，比對較大角色後替換
								var r = mpViewRole.roleList['maxRole'];
								if(r.id > role.id){
									mpViewRole.roleList['maxRole'] = role;
								}
							}
							else
								mpViewRole.roleList['maxRole'] = role;
						}
						else if(MPViewRoleSet.indexOf(role.id) != -1){
							//其他角色
							if(mpViewRole.viewList.indexOf(MPViewRoleName[MPViewRoleSet.indexOf(role.id)]) == -1){
								//直接放入當前角色
								mpViewRole.viewList.push(MPViewRoleName[MPViewRoleSet.indexOf(role.id)]);
								mpViewRole.roleList[MPViewRoleName[MPViewRoleSet.indexOf(role.id)]] = role;
							}
						}
					}
					*/
					var sDivHtml = '';
					let MPByPassRole = [];
					var mpViewRole = genTodoRecordRole(MPByPassRole);
					if(CntWSData === undefined || !refreshTodoOnly)
						CntWSData = {};	//暫存物件，用來保留WebService取得的件數用
					//1110913	Leslie[1110652]	配合客製化圓餅圖功能，修改待辦件數統計可支援客製化統計設定，並整併角色取得方式	==END==
						
					let sProxyRole = MPByPassRole.map(function(role){
						return '['+role.name+'-'+role.proxyUserName+']';
					})
					if(typeof sProxyRole != 'undefined' && sProxyRole.length > 0){
						//1110817	Leslie	從公文夾取得之待辦會含代理件數，修正文字
						//let sProxy = '代理：'+sProxyRole.join('、')+' 以下待辦事項不含代理公文件數，如欲辦理請切換角色至代理公文夾作業。';
						let sProxy = '代理：'+sProxyRole.join('、')+' 以下待辦件數含主辦與代理公文；若公文夾查無公文，請展開選單切換即可。';
						if($('#ProxyList')[0])
							$('#ProxyList').text(sProxy);
						else
							$('#StartTodoCnt').before('<div id="ProxyList" style="color:black;font-weight: bold; margin:10px 12px 0px 12px;font-size: 120%;">'+sProxy+'</div>');
						//1110729	Leslie	於啟用代理時，需調整高度
						$('#StartTodoCnt').css('max-height','calc(85vh - '+$('#ProxyList').height()+'px)');
					}
					else
						$('#ProxyList').remove();
					
					//1110913	Leslie[1110652]	角色資訊不會在沒重登就變更
					if(typeof _mpRoleRecord == 'undefined')
						_mpRoleRecord = mpViewRole;
					
					//1110401	Leslie	顯示個人專區的未閱讀件數
					var showPersonal = false,cntUnReadPersonal = 0;
					if('USE_PERSONAL' in theSSO.User.SystemSets && theSSO.User.SystemSets['USE_PERSONAL'] == 'Y'){
						showPersonal = true;
						theWebServices.PAWS.SearchPersonalData(localStorage.Artifact)
						.done(function (rslt){
							if(rslt.length)
								cntUnReadPersonal = rslt.filter(function(o){return o.State == '0'}).length;
							$('#PersonalUnread').text(cntUnReadPersonal);
						})
					}
					
					for(var title in SSO_CONFIG.MPSetting){
						if(title != undefined){
							//1110314	Leslie[1110167]	[考試院]UI調整	
							//sDivHtml += (mpViewRole.viewList.indexOf(title) != -1)?genTitle(title):"";
							sDivHtml += (mpViewRole.viewList.indexOf(title) != -1)?genTitle(title,true):"";
						}
					}
					//1110314	Leslie[1110167]	[考試院]UI調整
					/*$("#StartTodoCnt").html('<div style="border: thick double;">'+sDivHtml+'</div>');
					$('.ST-Title').eq(0).css('border-top','none');	//拿掉第一個Title的top線段
					if($('#TodoCntTitle')[0])
						$('#TodoCntTitle').text('未閱讀.....................................('+light.unread+')')
					else
						$('#StartTodoCnt').before('<div id="TodoCntTitle" style="color:blue; margin:10px 12px 0px 12px;font-size: 120%;">未閱讀.....................................('+light.unread+')</div>')*/
					
					//1110913	Leslie[1110652]	新增保留WebService統計件數，以提供僅更新待辦部分件數的功能
					CntWSData.allDone = true;	//設定所有WebService件數已完成
					
					//1110624	Leslie[1110629]	新增by機關的客製化設定
					var showUnRead = true;
					if('CustomSet' in theCustom && 'DisableTodoCntUnRead' in theCustom.CustomSet && theCustom.CustomSet['DisableTodoCntUnRead'] != '')
						showUnRead = theCustom.CustomSet['DisableTodoCntUnRead'] != 'Y';
					
					//1130223	Leslie[1120883]	新增依設定顯示是否有待補簽公文，並提供點擊後開啟IFT940
					var ShowUnReSignCnt = theCustom.getCustomSet('ShowUnReSignCnt');
					ShowUnReSignCnt = (typeof ShowUnReSignCnt == 'boolean')?ShowUnReSignCnt:SSOUtil.isValueTrue(ShowUnReSignCnt);
					var cntUnReSignCnt = 0;
					if(ShowUnReSignCnt){
						var params = new SOAPClientParameters();
						params.add('argArtifact', localStorage.Artifact);
						var wsFuncName = 'GetResignCnt';
						//1141009 Kevin 1141352 調整網址串接方式避免後方站台被掃出
						//var wsUrl = window.SSO_CONFIG.ServerHost + '/IF/IF1/IFT920WS.asmx';
						var wsUrl = window.SSO_CONFIG.ServerHost + '/';
						wsUrl += 'IF/IF1/IFT920WS.asmx';
						
						SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
							function(rslt){
								theLogger.log('-I- odlibws.' + wsFuncName + ' returns:');
								theLogger.log(rslt);
								if (typeof rslt === 'object') {
									if(typeof rslt.value == 'object' && 'RtnInt' in rslt.value && rslt.value.RtnInt > 0)
										cntUnReSignCnt = rslt.value.RtnInt;
								}
								else {
									throw new Error('叫用 odlibws.' + wsFuncName + ' 時發生錯誤!');
								}
							}
						);
					}
										
					//1110401	Leslie	顯示個人專區的未閱讀件數
					//$("#StartTodoCnt").html('<div"><div id="StartTodoTitle">待辦件數</div>'+'<div id="TodoCntTitle" class="ST-TodoTitle">未閱讀<div class="ST-NUM">'+light.unread+'</div></div>'+sDivHtml+'</div>');
					$("#StartTodoCnt").html('<div"><div id="StartTodoTitle" title="前往「文件夾」">待辦件數</div>'
						//1110624	Leslie[1110629]	新增by機關的客製化設定
						//+'<div id="TodoCntTitle" class="ST-TodoTitle">未閱讀<div class="ST-NUM">'+light.unread+'</div></div>'	//待辦未閱讀
						+(showUnRead?'<div id="TodoCntTitle" class="ST-TodoTitle">未閱讀<div class="ST-NUM">'+light.unread+'</div></div>':"")	//待辦未閱讀
						+(showPersonal?'<div id="TodoCntTitle" class="ST-TodoTitle">個人專區未閱讀<div class="ST-NUM" id="PersonalUnread">'+cntUnReadPersonal+'</div></div>':"")
						//1130223	Leslie[1120883]	新增依設定顯示是否有待補簽公文，並提供點擊後開啟IFT940
						+(ShowUnReSignCnt && cntUnReSignCnt>0?'<div id="TodoCntTitle" class="ST-TodoTitle">待補簽<div class="ST-NUM" id="unReSignCnt">'+cntUnReSignCnt+'</div></div>':"")
						+sDivHtml+'</div>');
					
					$('#StartTodoTitle').css('cursor','pointer').on('click',function(){
						//1110330	Leslie	修正面版切換，改為先關掉所有面板(以避免殘留，例如：創稿面版)，再切換到待辦面版
						$('.drag_to_close').trigger('click');
						$('#tab_todo').triggerHandler('click');
						$('#btn_mp').triggerHandler("click")
					});
					
					//1130223	Leslie[1120883]	新增依設定顯示是否有待補簽公文，並提供點擊後開啟IFT940
					if(ShowUnReSignCnt && cntUnReSignCnt>0){
						$('#unReSignCnt').parent().css('cursor','pointer').on('click',function(){
							theStart.ChildWin.push(window.open('\\IF\\IF1\\IFT940.aspx'));
						})
					}
				},
				//1110315	Leslie[1101451]	[考試院]客製化個人專區
				InitPA: function(){	//個人專區
					//https://docvip.fdat.com.tw/PA/PALIB/PAWS.asmx
					//https://docvip.fdat.com.tw/PA/PA1/PAI001.aspx
					//https://docvip.fdat.com.tw/PA/PA1/PAI002.aspx?PersonalSeq=83
					
					var paWSUrl = 'PAWS_URL' in theSSO.User.SystemSets?theSSO.User.SystemSets["PAWS_URL"]:"";
					$('#ListPA').empty().append('<li class="LoadBulletin">載入中</li>');
					theWebServices.PAWS.SearchPersonalData(localStorage.Artifact)
                    .done(function (rslt){

						//1140916 Zen 1140873 (中興大學)修正未開啟個人專區客製化PAI001之問題
						//var strUrlTotal = paWSUrl.replace('PALIB/PAWS.asmx','PA1/PAI001.aspx');
						var strUrlTotal;
						if (SSO_CONFIG.OrgNickName == 'NCHU')
							strUrlTotal = paWSUrl.replace('PALIB/PAWS.asmx', 'PA1/PAI001_NCHU.aspx');
						else
							strUrlTotal = paWSUrl.replace('PALIB/PAWS.asmx', 'PA1/PAI001.aspx');

						var strUrlSeq = paWSUrl.replace('PALIB/PAWS.asmx','PA1/PAI002.aspx?PersonalSeq=');
						
						$('#ListPA').empty();
						var sTitleHTML = '<li>';
						//1110402	Leslie[1110167]	[考試院]UI調整，第二階段
						//sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c ';      
						sTitleHTML += '<a class="ui-btn ui-btn-c ui-btn-up-c alert-indigo';
						//1110422	Leslie[1110164]	弱掃停用html宣告的Event
						// sTitleHTML += '"data-role="list-divider" data-theme="c" onclick="';
						// sTitleHTML += 'theStart.ChildWin.push(window.open(\'' + strUrlTotal + '\'));';
						// sTitleHTML += '">';
						sTitleHTML += '"data-role="list-divider" data-theme="c" >';
						
						//1110402	Leslie[1110167]	[考試院]UI調整，第二階段
						//sTitleHTML += '個人電子公文接收專區 <span class="ui-li-count" style="font-size: 0.7em;">' + rslt.length + '</span>';
						sTitleHTML += '個人電子公文接收專區 <span class="ui-li-count bg-num bg-indigo" style="font-size: 0.7em;">' + rslt.length + '</span>';
						sTitleHTML += '</a>';
						sTitleHTML += '</li>';
						//1110422	Leslie[1110164]	弱掃停用html宣告的Event
						//$('#ListPA').append(sTitleHTML);
						$('#ListPA').append(sTitleHTML).find('a').on('click',function(){
							theStart.ChildWin.push(window.open(strUrlTotal));
						});
						
						//1110624	Leslie[1110629]	個人專區件數為0時，修正顯示內容為無資料
						if(rslt.length == 0){
							var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c bg-fr" data-theme="c" >無資料</a></li>';
							$(sHTML).appendTo('#ListPA');

							//1140814	Leslie[1140873]	可完全隱藏無件數的個人專區
							if(theCustom.getCustomSet('HidePAWhenCountZero') == 'Y')
								$('#ListPA').attr("style", "display:none");
						}
						else
						for (var iLen = 0,iMax = rslt.length; iLen < iMax && iLen < 5; iLen++) {

                            //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
                            //var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c ';
                            var sHTML = '<li><a class="ui-btn ui-btn-c ui-btn-up-c bg-fr ';

                            if (rslt[iLen].State == '0')
							{
								//1140814	Leslie[1140873]	是否啟用客製化個人專區Icon，需搭配指定圖檔「IMAGE\SSO\NEW.PNG」
								if(theCustom.getCustomSet('HidePAWhenCountZero') == 'Y')
									sHTML += 'ui-btn-icon-right ui-icon-custom-new';
								else
                                sHTML += 'ui-btn-icon-right ui-icon-mail';
							}

							//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                            // sHTML += '" data-theme="c" onclick="';
                            // sHTML += 'theStart.ChildWin.push(window.open(\'' + strUrlSeq + rslt[iLen].PersonalSeq + '\'))';
                            // sHTML += '">';
							sHTML += '" data-theme="c" >';

                            sHTML += rslt[iLen].PasteDate.substring(0, 3) + '/';
                            sHTML += rslt[iLen].PasteDate.substring(3, 5) + '/';
                            sHTML += rslt[iLen].PasteDate.substring(5, 7) + ' ';

                            sHTML += rslt[iLen].Subject;
                            sHTML += '</a></li>';

							//1110422	Leslie[1110164]	弱掃停用html宣告的Event
                            //$('#ListPA').append(sHTML);
							$(sHTML).appendTo('#ListPA').on('click',{url:strUrlSeq + rslt[iLen].PersonalSeq},function(e){
								theStart.ChildWin.push(window.open(e.data.url));
							})
                        }
                        //1110402	Leslie[1110167]	[考試院]UI調整，第二階段
						//$('#ListPA').listview('refresh');
					})
					.fail(function (errObj)
                    {
                        theLogger.error('-E- PAWS.SearchPersonalData return:' + errObj);
                        alert(errObj.errCode + ' ' + errObj.errMsg);
                    });
				},
				//1110913	Leslie[1110652]	提供僅更新待辦部分件數的功能
				UpdateTodoCnt: function(){
					if(SSO_CONFIG.MP_ENABLE_COUNT_LIST != "Y")
						this.InitFlotTodo('','',true);
					else
						this.InitTodoCountList(true);
				},
        }
    }
	
	//1100810	Leslie[1100580]	Merge MP客製化待辦件數區域
	//1110314	Leslie[1110167]	[考試院]UI調整	
	/*$(document).on('click','.ST-Title',function(){
		$('.StartTodo').find('div:not(".ST-Title")').remove();
		var title = $(this).parent().attr('data-title');
		//1100922 David 1100991 弱掃修正Client Potential XSS
		//$(this).parent().html(genTitle(theSSO.Util.htmlEncode(title),true));
		$(this).parent().html(genTitle(htmlencode(title),true));
		$('.ST-Title').eq(0).css('border-top','none');	//拿掉第一個Title的top線段
		if($('.StartTodo[data-Title="'+title+'"]').find('.ST-Folder,.ST-Delay,.ST-Prog').length == 0)
			alert("找不到可顯示之待辦訊息。");
	});*/
	
	//1110902	Leslie[1110652]	新增客製化圓餅圖功能，調整觸發行為
	function triggerTodo(folder){
		$('.drag_to_close').trigger('click');
		$('#tab_todo').triggerHandler('click');
		$('#btn_mp').triggerHandler("click");
		$('#selectedFolder').val(folder).trigger('change')
		$('#selectedFolder_search').val(folder).trigger('change')
		//1111216	Leslie	若是已開啟紙本調閱，則需先關掉以免無法開公文
		if (typeof theUniView=='object' && theUniView.getDocId()!=='')
			theUniView.close();
	}
	
	function triggerProg(PgType){
		var url = "";
		var urlInfo = _mpRoleRecord[PgType];
		//1140423	Leslie[1131290]	新增「調案逾期未還案件」統計件數，配合調整分類邏輯
		// if('Delay' in urlInfo.mpSet){
		if('CountByOU' in urlInfo.mpSet){
			url = theSSO.User.EnvSettings["OD_FLOW_PAGE"];
			url = url.substring(0,url.lastIndexOf('/')+1)+urlInfo.mpSet.Prog+".aspx?";
			//1141217 Zen 1141314 點擊待辦時件數時支援依當前角色開啟查詢視窗，並依角色所屬單位預設承辦單位選單查詢條件
			//let paraOuId = urlInfo.mpSet.CountByOU?"&OuId="+urlInfo.role.unitNo:"";
			let paraOuId = urlInfo.mpSet.CountByOU ? "&OuId=" + theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].unitNo : "";
			if(urlInfo.mpSet.Prog == "ODR241"){
				url += "DueDate="+urlInfo.DueDate+paraOuId+"&WDay="+urlInfo.mpSet.WDay;
			}
			else if(urlInfo.mpSet.Prog == "ODR242"){
				url += paraOuId;
			}
			//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求
			else if(urlInfo.mpSet.Prog == "EDI244"){
				url = theSSO.User.EnvSettings["WS_ED_SITE"].substring(0,url.lastIndexOf('/')+1);
				url += '/ED2/'+urlInfo.mpSet.Prog+".aspx?";
				url += 'Delay='+urlInfo.mpSet.Delay;
				//1150109	Leslie[1131122]	點擊開啟EDI244時，亦需支援依當前角色開啟
				// url += '&OuId='+urlInfo.role.unitNo;
				url += paraOuId;
				if('WDay' in urlInfo.mpSet)
					url += '&WDay='+urlInfo.mpSet.WDay
			}
			else{	//Leslie	增加可於未設定Prog時，由URL屬性決定開啟的程式
				url = urlInfo.mpSet.URL+"?";
			}
			url += ((urlInfo.mpSet.CountByUser)?"&isUser=1":"");
		}
		else{
			let strPara = "";
			if(urlInfo.mpSet.Prog == "AKS502" || urlInfo.mpSet.Prog == "EDR482"){
				strPara = "&nMode=MP";
				//1140423	Leslie[1131290]	新增「調案逾期未還案件」統計件數
				if('Delay' in urlInfo.mpSet && urlInfo.mpSet.Delay)
					strPara+="&nDealy=true"
			}
			else if(urlInfo.mpSet.Prog == "EDI247"){
				strPara = "&nMode=MP&ROLE_ID="+urlInfo.mpSet.ROLE_ID;
			}
			url = urlInfo.mpSet.URL + "?"+ strPara;
		}
		theStart.ChildWin.push(window.open(url));
	}
	//1110902	Leslie[1110652]	新增客製化圓餅圖功能，調整觸發行為	==END==
	
	$(document).on('click','.ST-Folder',function(){
		//1110330	Leslie	修正面版切換，改為先關掉所有面板(以避免殘留，例如：創稿面版)，再切換到待辦面版
		//1110902	Leslie[1110652]	新增客製化圓餅圖功能，調整觸發行為
		// $('.drag_to_close').trigger('click');
		// $('#tab_todo').triggerHandler('click');
		// $('#btn_mp').triggerHandler("click");
		// var folder = $(this).attr('data-Todo');
		// $('#selectedFolder').val(folder).trigger('change')
		// //1110330	Leslie	增加觸發半開的Folder切換
		// $('#selectedFolder_search').val(folder).trigger('change')
		triggerTodo($(this).attr('data-Todo'));
	});
	$(document).on('click','.ST-Delay, .ST-Prog',function(){
		//1110902	Leslie[1110652]	新增客製化圓餅圖功能，調整觸發行為
		/*
		var n = $(this).attr('data-PgType');
		var url = "";
		var urlInfo = _mpRoleRecord[n];
		if('Delay' in urlInfo.mpSet){
			url = theSSO.User.EnvSettings["OD_FLOW_PAGE"];
			url = url.substring(0,url.lastIndexOf('/')+1)+urlInfo.mpSet.Prog+".aspx?";
			let paraOuId = urlInfo.mpSet.CountByOU?"&OuId="+urlInfo.role.unitNo:"";
			if(urlInfo.mpSet.Prog == "ODR241"){
				url += "DueDate="+urlInfo.DueDate+paraOuId+"&WDay="+urlInfo.mpSet.WDay;
			}
			else if(urlInfo.mpSet.Prog == "ODR242"){
				url += paraOuId;
			}
			//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求
			else if(urlInfo.mpSet.Prog == "EDI244"){
				url = theSSO.User.EnvSettings["WS_ED_SITE"].substring(0,url.lastIndexOf('/')+1);
				url += '/ED2/'+urlInfo.mpSet.Prog+".aspx?";
				url += 'Delay='+urlInfo.mpSet.Delay;
				url += '&OuId='+urlInfo.role.unitNo;
				if('WDay' in urlInfo.mpSet)
					url += '&WDay='+urlInfo.mpSet.WDay
			}
			else{	//Leslie	增加可於未設定Prog時，由URL屬性決定開啟的程式
				url = urlInfo.mpSet.URL+"?";
			}
			url += ((urlInfo.mpSet.CountByUser)?"&isUser=1":"");
		}
		else{
			let strPara = "";
			if(urlInfo.mpSet.Prog == "AKS502" || urlInfo.mpSet.Prog == "EDR482"){
				strPara = "&nMode=MP";
			}
			else if(urlInfo.mpSet.Prog == "EDI247"){
				strPara = "&nMode=MP&ROLE_ID="+urlInfo.mpSet.ROLE_ID;
			}
			url = urlInfo.mpSet.URL + "?"+ strPara;
		}
		theStart.ChildWin.push(window.open(url));
		*/
		triggerProg($(this).attr('data-PgType'));
	})
	
	//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加參數可僅取得件數
	// function genTodo(argTitle, argName, argObj, isSubFolder){
	function genTodo(argTitle, argName, argObj, isSubFolder = false, bGetHtml = false){
		var rtn = {
			html:"",
			num:0
		};
		
		//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
		var pgType = argTitle + '|'+ argName;
		
		if(typeof argObj == 'string')
		{
			//Folder
			var folder = argObj.split('-');
			if(folder.length < 1)
				return rtn;
			var Num = theSSO.MP.todolist.builder.getFolderItemCount(folder[0],folder[1]);	//1110402	Leslie[1110167]	[考試院]UI調整，第二階段，移除錯誤參數",1"
			if(Num == 0)
				return rtn;
			rtn.num = Num;
			
			//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加參數可僅取得件數
			if(bGetHtml){
				rtn.KeyObj = {type:'Todo',key:argObj};
				return rtn;
			}
			
			if(isSubFolder){
				rtn.html = '<div class="ST-Folder" data-Todo="'+argObj+'" title="'+argObj+'">';
				rtn.html += '<div class="ST-SubFolder">'+argName+'</div>';
				rtn.html += '<div class="ST-NUM">'+Num+'</div>';
			}
			else{
				rtn.html = '<div class="ST-Folder ST-TopBorder" data-Todo="'+argObj+'" title="'+argObj+'">';
				rtn.html += argName;
				//1110314	Leslie[1110167]	[考試院]UI調整	
				//rtn.html += '<div class="ST-NUM" style="right: 10px;">('+Num+')</div>';
				rtn.html += '<div class="ST-NUM" style="right: 10px;">'+Num+'</div>';
			}
		}
		//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加可傳入陣列以取得總合
		else if(typeof argObj == 'object' && Array.isArray(argObj)){
			let Num = 0;
			let key = "";
			for(var i=0,folder;folder=argObj[i]?.split('-');i++){
				if(folder.length == 2){
					Num += theSSO.MP.todolist.builder.getFolderItemCount(folder[0],folder[1]);
					if(key == "" && Num != 0)
						key = argObj[i];
				}
			}
			if(Num == 0)
				return rtn;
			rtn.num = Num;
			if(bGetHtml){
				rtn.KeyObj = {type:'Todo',key:key};	//只能轉去第一個
				return rtn;
			}
			
			if(isSubFolder){
				rtn.html = '<div class="ST-Folder" data-Todo="'+key+'" title="'+argName+'">';
				rtn.html += '<div class="ST-SubFolder">'+argName+'</div>';
				rtn.html += '<div class="ST-NUM">'+Num+'</div>';
			}
			else{
				rtn.html = '<div class="ST-Folder ST-TopBorder" data-Todo="'+key+'" title="'+argName+'">';
				rtn.html += argName;
				rtn.html += '<div class="ST-NUM" style="right: 10px;">'+Num+'</div>';
			}
		}
		//1110402	Leslie[1110167]	增加可指定條件
		else if(typeof argObj == 'object' && 'Type' in argObj && argObj.Type == "TODO"){
			//Folder with filter
			var folder = argObj.Folder.split('-');
			var Num = theSSO.MP.todolist.builder.getFolderItemCount(folder[0],folder[1],argObj);
			if(Num == 0)
				return rtn;
			rtn.num = Num;
			
			//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加參數可僅取得件數
			if(bGetHtml){
				rtn.KeyObj = {type:'Todo',key:argObj.Folder};
				return rtn;
			}
			
			if(isSubFolder){
				rtn.html = '<div class="ST-Folder" data-Todo="'+argObj.Folder+'" title="'+argObj.Folder+'">';
				rtn.html += '<div class="ST-SubFolder">'+argName+'</div>';
				rtn.html += '<div class="ST-NUM ">'+Num+'</div>';
			}
			else{
				rtn.html = '<div class="ST-Folder ST-TopBorder" data-Todo="'+argObj.Folder+'" title="'+argObj.Folder+'">';
				rtn.html += argName;
				rtn.html += '<div class="ST-NUM" style="right: 10px;">'+Num+'</div>';
			}
		}
		else if(typeof argObj == 'object' && 'CountBy' in argObj){
			//保留查詢條件
			//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
			// _mpRoleRecord[argName] = {};
			// _mpRoleRecord[argName]["role"] = _mpRoleRecord.roleList[argTitle];
			// _mpRoleRecord[argName]["mpSet"] = argObj;
			_mpRoleRecord[pgType] = {};
			_mpRoleRecord[pgType]["role"] = _mpRoleRecord.roleList[argTitle];
			_mpRoleRecord[pgType]["mpSet"] = argObj;
			
			let folderList = theSSO.MP.todolist.builder.getFolderInfoList(true);
			let Num = 0;
			for(let i=0;i<folderList.length;i++){
				if(folderList[i].folder == argObj.CountBy.folder && argObj.CountBy.Filter.test(folderList[i].name))
					Num+=folderList[i].cnt;
			}
			if(Num == 0)
				return rtn;
			
			//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加參數可僅取得件數
			if(bGetHtml){
				rtn.num = Num
				rtn.KeyObj = {type:'Prog',key:pgType};
				return rtn;
			}
			
			//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
			// rtn.html = '<div class="ST-Prog ST-TopBorder" data-PgType="'+argName+'">'+argName;
			rtn.html = '<div class="ST-Prog ST-TopBorder" data-PgType="'+pgType+'">'+argName;
			//1110314	Leslie[1110167]	[考試院]UI調整
			//rtn.html += '<div class="ST-NUM" style="right: 10px;">('+Num+')</div>';
			rtn.html += '<div class="ST-NUM" style="right: 10px;">'+Num+'</div>';
		}
		else if(typeof argObj == 'object' && 'Prog' in argObj){
			//關聯應用程式項目
			var Num = 0;
			//1140423	Leslie[1131290]	新增「調案逾期未還案件」統計件數，配合調整分類邏輯
			// var clsName = ('Delay' in argObj)?"Delay":"Prog";
			var clsName = ('CountByOU' in argObj)?"Delay":"Prog";
			var urlInfo = {};
			
			//1110913	Leslie[1110652]	新增保留WebService統計件數，以提供僅更新待辦部分件數的功能
			if('allDone' in CntWSData){	//有這屬性，表示直接回傳現有資料
				return (pgType in CntWSData)?CntWSData[pgType]:rtn;
			}

			if(clsName == 'Delay'){
				//1120911	Leslie	修改無承辦人角色，但又有需統計全機關逾期件數時，統計會出現異常，應一律以該項次對應角色執行統計即可
				//var countBy = (argObj.CountByOU)?_mpRoleRecord.roleList[argTitle]:_mpRoleRecord.roleList["承辦人"];
				var countBy = _mpRoleRecord.roleList[argTitle];
				
				var WDay = ('WDay' in argObj)? argObj.WDay:0;
				var DtTime = new Date();
				var dYear = SSOUtil.jf_PADL2( (DtTime.getFullYear()-1911).toString(),3,"0");
				var dMon  = SSOUtil.jf_PADL2( (DtTime.getMonth()+1).toString(),2,"0");
				var dDay  = SSOUtil.jf_PADL2( DtTime.getDate().toString() , 2,"0");
				var cTime = dYear + dMon + dDay;
				
				//保留逾期查詢條件
				//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
				// _mpRoleRecord[argName] = {};
				// _mpRoleRecord[argName]["role"] = countBy;
				// _mpRoleRecord[argName]["mpSet"] = argObj;
				// _mpRoleRecord[argName]["DueDate"] = cTime;
				_mpRoleRecord[pgType] = {};
				_mpRoleRecord[pgType]["role"] = countBy;
				_mpRoleRecord[pgType]["mpSet"] = argObj;
				_mpRoleRecord[pgType]["DueDate"] = cTime;
				
				var async = false;
				var params = new SOAPClientParameters();
				params.add('argArtifact', localStorage.Artifact);
				params.add('argOrgNo'	, countBy.orgNo);
				params.add('argOuId'	, ((argObj.CountByOU)?countBy.unitNo:""));
				params.add('argUserName', ((argObj.CountByUser)?theSSO.User.account:""));
				params.add('argDueDate'	, cTime);
				params.add('argWDay'	, WDay);
				params.add('argDelay'	, argObj.Delay);
				var wsFuncName = 'mpGetDelayDocCnt';
				var wsUrl = SSO_CONFIG.getWSUrl('odlibws');
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
									function(rslt){
										theLogger.log('-I- odlibws.' + wsFuncName + ' returns:');
										theLogger.log(rslt);
										if (typeof rslt === 'object') {
											res = rslt.value;
										}
										else {
											throw new Error('叫用 odlibws.' + wsFuncName + ' 時發生錯誤!');
										}
									});
				if(typeof res == 'object' && 'RtnInt' in res)
					Num = res.RtnInt;
			}
			else{
				var countBy;
				if("OU_ID" in argObj && "ROLE_ID" in argObj){
					var checkRole = false;
					for(var i=0,role;role = theSSO.User.PlayRoles[i++];){
						if(role.id == argObj.ROLE_ID && (role.unitNo == argObj.OU_ID || argObj.OU_ID == "")){	//加上可能只判斷角色
							checkRole = true;
							countBy = role;
						}
					}
					if(!checkRole)
						return rtn;
				}
				if(countBy == undefined){
					countBy = _mpRoleRecord.roleList[argTitle];
				}
				
				//保留查詢條件
				//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
				// _mpRoleRecord[argName] = {};
				// _mpRoleRecord[argName]["role"] = countBy;
				// _mpRoleRecord[argName]["mpSet"] = argObj;
				_mpRoleRecord[pgType] = {};
				_mpRoleRecord[pgType]["role"] = countBy;
				_mpRoleRecord[pgType]["mpSet"] = argObj;
				
				if('ProgOnly' in argObj && argObj.ProgOnly){
					//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
					// rtn.html = '<div class="ST-'+clsName+' ST-TopBorder" data-PgType="'+argName+'">'+argName;
					rtn.html = '<div class="ST-'+clsName+' ST-TopBorder" data-PgType="'+pgType+'">'+argName;
					rtn.html += '<div class="ST-NUM" style="right: 10px;"></div></div>';
					return rtn;
				}
				
				let async = false;
				let params = new SOAPClientParameters();
				let wsFuncName,wsUrl,wsServiceName = 'odlibws';
				
				if(argObj.Prog == "AKT116"){
					params.add('argArtifact', localStorage.Artifact);
					
					wsFuncName = 'mpGetTobesignCnt';
					wsUrl = SSO_CONFIG.getWSUrl(wsServiceName);
				}
				else if(argObj.Prog == "EDT131"){
					params.add('argArtifact', localStorage.Artifact);
					
					wsFuncName = 'mpGetAssignDocCnt';
					wsUrl = SSO_CONFIG.getWSUrl(wsServiceName);
				}
				else if(argObj.Prog == "AKS502"){
					params.add('argArtifact', localStorage.Artifact);
					
					wsFuncName = 'mpGetBorCnt';
					//1140423	Leslie[1131290]	新增「調案逾期未還案件」統計件數
					if('Delay' in argObj && argObj.Delay)
						wsFuncName = 'mpGetBorCntDelay';
					
					wsUrl = SSO_CONFIG.getWSUrl(wsServiceName);
				}
				//1110913	Leslie[1110652]	新增客製化統計WS
				else if(argObj.Prog == "ODT130"){
					params.add('argArtifact', localStorage.Artifact);
					
					wsFuncName = 'mpGetERCVDocCnt';
					wsUrl = SSO_CONFIG.getWSUrl(wsServiceName);
				}
				else if(argObj.Prog == "AKM330"){
					params.add('argArtifact', localStorage.Artifact);
					
					wsFuncName = 'mpGetInpFileCnt';
					wsUrl = SSO_CONFIG.getWSUrl(wsServiceName);
				}
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
									function(rslt){
										theLogger.log('-I- '+wsServiceName+'.' + wsFuncName + ' returns:');
										theLogger.log(rslt);
										if (typeof rslt === 'object') {
											res = rslt.value;
										}
										else {
											throw new Error('叫用 '+wsServiceName+'.' + wsFuncName + ' 時發生錯誤!');
										}
									});
				if(typeof res == 'object' && 'RtnInt' in res)
					Num = res.RtnInt;
			}
			if(Num == 0)
				return rtn;
			
			//1110902	Leslie[1110652]	新增客製化圓餅圖功能，增加參數可僅取得件數
			if(bGetHtml){
				rtn.num = Num;
				rtn.KeyObj = {type:'Prog',key:pgType};
				CntWSData[pgType] = rtn
				return rtn;
			}
			
			//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
			// rtn.html = '<div class="ST-'+clsName+' ST-TopBorder" data-PgType="'+argName+'">'+argName;
			rtn.html = '<div class="ST-'+clsName+' ST-TopBorder" data-PgType="'+pgType+'">'+argName;
			//1110314	Leslie[1110167]	[考試院]UI調整
			//rtn.html += '<div class="ST-NUM" style="right: 10px;">('+Num+')</div>';
			//1110402	Leslie[1110167]	[考試院]UI調整，第二階段
			//rtn.html += '<div class="ST-NUM" style="right: 10px;">'+Num+'</div>';
			rtn.html += '<div class="ST-NUM'+(clsName == 'Delay'?" bg-danger":"")+'" style="right: 10px;">'+Num+'</div>';
			
			if(isSubFolder){
				rtn.num = Num;
				//1110624	Leslie	修正同時有多角色時，會出現保留條件錯亂
				// rtn.html = '<div class="ST-'+clsName+' ST-SubFolder" data-PgType="'+argName+'">'+argName;
				rtn.html = '<div class="ST-'+clsName+' ST-SubFolder" data-PgType="'+pgType+'">'+argName;
				rtn.html += '<div class="ST-NUM">'+Num+'</div>';
			}
		}
		
		rtn.html += '</div>';
		//1110913	Leslie[1110652]	新增保留WebService統計件數，以提供僅更新待辦部分件數的功能
		CntWSData[pgType] = rtn
		return rtn;
	}

	function genDetail(argTitle, tLv1, argMpSet){
		var tmpHtml = "";
		if(typeof argMpSet == 'string'){
			tmpHtml += genTodo(argTitle, tLv1, argMpSet).html;
		}
		else{
			//1110402	Leslie[1110167]	[考試院]UI調整，第二階段，增加可指定條件
			//if('Prog' in argMpSet || 'CountBy' in argMpSet){
			if('Prog' in argMpSet || 'CountBy' in argMpSet || 'Type' in argMpSet){
				tmpHtml += genTodo(argTitle, tLv1, argMpSet).html;
			}
			else{
				var totleLv1 = 0;
				var htmlLv2 = '';
				for(var tLv2 in argMpSet){
					if(tLv2 != undefined){
						var result = genTodo(argTitle, tLv2, argMpSet[tLv2],true);
						totleLv1 += result.num;
						htmlLv2 += result.html;
					}
				}
				if(totleLv1 > 0){
					tmpHtml += '<div class="ST-FolderSum">'+tLv1;
					//1110314	Leslie[1110167]	[考試院]UI調整
					//tmpHtml += '<div class="ST-NUM" style="right: 10px;">('+totleLv1+')</div></div>';
					tmpHtml += '<div class="ST-NUM" style="right: 10px;">'+totleLv1+'</div></div>';
					tmpHtml += htmlLv2;
				}
			}
		}
		return tmpHtml;
	}

	function genTitle(argTitle, initDetail){
		var sRtnHtml = "";
		if(argTitle in SSO_CONFIG.MPSetting){
			var title = '<div class="StartTodo" data-Title="'+argTitle+'">';
			var CountTitle = '<div class="ST-Title">'+argTitle+'</div>';
			var tmpHtml = "";
			if(initDetail){
				//1110913	Leslie[1110652]	配合客製化圓餅圖功能，修改待辦件數統計可支援客製化統計設定
				let objCountSet = SSO_CONFIG.MPSetting[argTitle];
				if('CountSet' in SSO_CONFIG.MPSetting[argTitle])
					objCountSet = SSO_CONFIG.MPSetting[argTitle].CountSet;
					
				// for(var tLv1 in SSO_CONFIG.MPSetting[argTitle]){
					// tmpHtml += genDetail(argTitle, tLv1, SSO_CONFIG.MPSetting[argTitle][tLv1]);
				// }
				for(var tLv1 in objCountSet)
					tmpHtml += genDetail(argTitle, tLv1, objCountSet[tLv1]);
				//1110913	Leslie[1110652]	配合客製化圓餅圖功能，修改待辦件數統計可支援客製化統計設定
			}
			sRtnHtml += CountTitle + tmpHtml;
			if(!initDetail)
				sRtnHtml = title + sRtnHtml + '</div>';
        }
		return sRtnHtml;
    }
	//1100810	Leslie[1100580]	Merge MP客製化待辦件數區域	===END===

    function initTree(rslt, treeId)
    {
        var zNodes = null;

        if (treeId == 'treeProgram')
			//1081008	Joe		1080339		jQuery升級3.4.1
            // zNodes = jQuery.parseJSON(rslt).AppStart.Progrm;
            zNodes = JSON.parse(rslt).AppStart.Progrm;
		//1110302	Leslie[1101537]	[考試院]新增機關切換選單
		else if (treeId == 'UpUserLink')
			zNodes = jQuery.parseJSON(rslt).AppStart.UserLink
        else //treeShort.Uptree
			//1081008	Joe		1080339		jQuery升級3.4.1
            // zNodes = jQuery.parseJSON(rslt).AppStart.Short;
            zNodes = JSON.parse(rslt).AppStart.Short;
		
		//1110314	Leslie[1110167]	[考試院]UI調整
		if (treeId == 'treeProgram')
			zNodes.Name = "功能選單";
		else if(treeId == 'Uptree')
			zNodes.Name = "常用功能";

        var treeObj = $('#' + treeId);
        $.fn.zTree.init(treeObj, zTreeSetting, zNodes);
        var zTree_Menu = $.fn.zTree.getZTreeObj(treeId);

		theLogger.log('initTree' + treeId);

        if (treeId == 'Uptree') {
            //ex: http://sysap01/SC/SCM950.aspx
            var strCertMgmtUrl = SSO_CONFIG.iOSPage_URLs['certMgmt'];
            //ex: http://sysap01/SC/SCT950.aspx
            var strCertRequestUrl = SSO_CONFIG.iOSPage_URLs['certRequest'];

			theLogger.log('navigator.userAgent' + navigator.userAgent);
			theLogger.log('iOS_device' + iOS_device);
			theLogger.log('strCertMgmtUrl' + strCertMgmtUrl);
			theLogger.log('strCertRequestUrl' + strCertRequestUrl);
			
			//1110315	Leslie[1110167]	[考試院]UI調整
			
			//1141009 Kevin 1141352 調整網址串接方式避免後方站台被掃出
			//var strUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_II_SERVER");
            //strUrl += '/IF/IF1/IFM610.aspx';
			var strUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_II_SERVER") + '/';
            strUrl += 'IF/IF1/IFM610.aspx';
			$('#Uptree>li>a').css('cursor','pointer').attr('title','編輯個人常用捷徑').on('click',function(){window.open(strUrl);})

            if (iOS_device && strCertMgmtUrl != '' && strCertRequestUrl != '') // 1060109 - 
            {
                if (SSO_CONFIG.enableMobileClientSign) {
                    strCertMgmtUrl = encodeURIComponent(strCertMgmtUrl.replace("https://", "http://"));
                    strCertRequestUrl = encodeURIComponent(strCertRequestUrl.replace("https://", "http://"));

					// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
                    // var strUrl = 'T2100PKI://#action=certMgmt&SAMLart=' + localStorage.Artifact + '&account=' + theSSO.User.account + '&userName=' + theSSO.User.name + '&orgNo=' + theSSO.User.orgid + '&certMgmtUrl=' + strCertMgmtUrl + '&certReqUrl=' + strCertRequestUrl;
                    var strUrl = 'T2100PKI://#action=certMgmt&SAMLart=' + htmlencode(localStorage.Artifact) + '&account=' + theSSO.User.account + '&userName=' + theSSO.User.name + '&orgNo=' + theSSO.User.orgid + '&certMgmtUrl=' + strCertMgmtUrl + '&certReqUrl=' + strCertRequestUrl;

                    var NodeApp = { Name: "憑證管理設定", Sub: [{ Name: "軟體憑證維護作業", AppUrl: strUrl }] };
                    zTree_Menu.addNodes(null, NodeApp);
                }
                else {
					// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
                    // strCertMgmtUrl += "?SAMLart=" + localStorage.Artifact;
                    // strCertRequestUrl += "?SAMLart=" + localStorage.Artifact;
					//1140505	Leslie[1140556]	取消網址參數權杖
                    //strCertMgmtUrl += "?SAMLart=" + htmlencode(localStorage.Artifact);
					//1130815 Kevin 1130466 支援電腦版使用軟體憑證
					strCertMgmtUrl += "?Type=Pad&Sign=Server";
					//1140505	Leslie[1140556]	取消網址參數權杖
                    //strCertRequestUrl += "?SAMLart=" + htmlencode(localStorage.Artifact);
                    var NodeApp = { Name: "憑證管理設定", Sub: [{ Name: "軟體憑證維護作業", Url: strCertMgmtUrl }, { Name: "軟體憑證申請作業", Url: strCertRequestUrl }] };
                    zTree_Menu.addNodes(null, NodeApp);
                }
            }
			//1130815 Kevin 1130466 支援電腦版使用軟體憑證
			else if (SSO_CONFIG.enableNotPadServerSign) {
				
				strCertMgmtUrl += "?Type=Pc&Sign=Server";
                var NodeApp = { Name: "憑證管理設定", Sub: [{ Name: "軟體憑證維護作業", Url: strCertMgmtUrl }, { Name: "軟體憑證申請作業", Url: strCertRequestUrl }] };
                zTree_Menu.addNodes(null, NodeApp);
			}
        }

        if (treeId == 'treeProgram')
            txFilterKeyup();
        else
            zTree_Menu.expandAll(true);

		//1081008	Joe		1080339		jQuery升級3.4.1
        // treeObj.hover(function ()
        treeObj.on("mouseenter", function ()
        {
            if (!treeObj.hasClass("showIcon")) {
                treeObj.addClass("showIcon");
            }
        }).on("mouseleave", function ()
        {
            treeObj.removeClass("showIcon");
        });
		
		//1060713	Leslie[1060383]	配合中興單號[1060612]，共通版一併提供"創稿"的快速選單
		if (treeId == 'treeProgram' && SSO_CONFIG['BuildNewDraftLink'] == 'Y'){
			//1110314	Leslie[1110167]	[考試院]UI調整
			var NodeQueryDoc = { Name:'公文檢索區', eventId:'QueryDoc'};
			//1110624	Leslie[1110629]	新增by機關的客製化設定
			if('CustomSet' in theCustom && 'QueryDocMenu' in theCustom.CustomSet && theCustom.CustomSet['QueryDocMenu'] != '')
				NodeQueryDoc.Name = theCustom.CustomSet['QueryDocMenu'];
			
			var QueryDoc = zTree_Menu.addNodes(null,NodeQueryDoc);
			
			//1110624	Leslie[1110629]	新增by機關的客製化設定
			if('CustomSet' in theCustom && 'QueryDocMenuIcon' in theCustom.CustomSet && theCustom.CustomSet['QueryDocMenuIcon'] != '')
				$('#'+QueryDoc[0].tId).addClass(theCustom.CustomSet['QueryDocMenuIcon'])
			else
				$('#'+QueryDoc[0].tId).addClass('IconSearch')
			
			var NodeNewDraft = { Name:'創稿', eventId:'NewDraft'};
			var newDraft = zTree_Menu.addNodes(null,NodeNewDraft);
			var nodes = zTree_Menu.getNodes();
			
			//1110314	Leslie[1110167]	[考試院]UI調整
			zTree_Menu.moveNode(nodes[0].Sub[0],QueryDoc[0],'prev')
			zTree_Menu.moveNode(nodes[0].Sub[0],newDraft[0],'prev');
		}
    }

	//1110823	Leslie[1110652]	新增客製化待辦統計設定，並修改圓餅圖可支援客製化設定
	function genTodoRecordRole(MPByPassRole){
		var mpSet = SSO_CONFIG.MPSetting;
		var roleByMpSet = ('CountRoleBySet' in SSO_CONFIG)?SSO_CONFIG.CountRoleBySet:false;
		var MPViewRoleSet = ["OD91","OD94","OD95","OD96","OD99"];	//定義確定的角色
		var MPViewRoleName = ["總收文","總發文","檔管人員","研考人員","承辦人"];
		var sDivHtml = '';
		var mpViewRole = {
			viewList:[],
			roleList:{}
		};
		for(var i=0,role;role = theSSO.User.PlayRoles[i++];){
			if(role.proxyAccount != ""){
				MPByPassRole.push(role);
				continue;
			}
			if(roleByMpSet){
				for(var setKey in mpSet){
					if('RoleSet' in mpSet[setKey] && mpSet[setKey].RoleSet.RoleList.indexOf(role.id) > -1){
						if(('OuList' in mpSet[setKey].RoleSet && mpSet[setKey].RoleSet.OuList.indexOf(role.unitNo) > -1) || !('OuList' in mpSet[setKey].RoleSet)){
							if(mpViewRole.viewList.indexOf(setKey) == -1){
								//直接放入當前角色
								mpViewRole.viewList.push(setKey);
								mpViewRole.roleList[setKey] = role;	//相關角色仍需要加到紀錄中
							}	
							//1111107	Leslie[1110334]	修正取最大角色邏輯
							//else if(mpSet[setKey].RoleSet.RoleList.Length > 1){	//角色清單不只一個時，取最大角色(代碼最小)
							else if(mpSet[setKey].RoleSet.RoleList.length > 1){	//角色清單不只一個時，取最大角色(代碼最小)
								var r = mpViewRole.roleList[setKey];
								if(r.id > role.id)
									mpViewRole.roleList[setKey] = role;
									
								/*if('maxRole' in mpViewRole.roleList){
									//第二角色開始，比對較大角色後替換
									var r = mpViewRole.roleList['maxRole'];
									if(r.id > role.id){
										mpViewRole.roleList['maxRole'] = role;
									}
								}
								else
									mpViewRole.roleList['maxRole'] = role;*/
								//1111107	Leslie[1110334]	修正取最大角色邏輯	==END==
							}						
						}
					}
				}
			}
			else{				
				if(role.id < 'OD30' && role.id != 'OD16'){	//角色代碼小於OD30的，除OD16外，都需要找最大角色
					var currSet = '單位登記桌';
					if(role.id != 'OD17')
						currSet = '主管';
					if(mpViewRole.viewList.indexOf(currSet) == -1){
						//直接放入當前角色
						mpViewRole.viewList.push(currSet);
						mpViewRole.roleList[currSet] = role;	//相關角色仍需要加到紀錄中
					}
					if('maxRole' in mpViewRole.roleList){
						//第二角色開始，比對較大角色後替換
						var r = mpViewRole.roleList['maxRole'];
						if(r.id > role.id){
							mpViewRole.roleList['maxRole'] = role;
						}
					}
					else
						mpViewRole.roleList['maxRole'] = role;
				}
				else if(MPViewRoleSet.indexOf(role.id) != -1){
					//其他角色
					if(mpViewRole.viewList.indexOf(MPViewRoleName[MPViewRoleSet.indexOf(role.id)]) == -1){
						//直接放入當前角色
						mpViewRole.viewList.push(MPViewRoleName[MPViewRoleSet.indexOf(role.id)]);
						mpViewRole.roleList[MPViewRoleName[MPViewRoleSet.indexOf(role.id)]] = role;
					}
				}
			}
		}
		
		return mpViewRole;
	}

	var searchTimeout;

	//1060413 Kevin 調整搜尋方式(比照待辦事項)
    function txFilterKeyup(event)
    {
		//中文輸入未完成時，不做查詢
		if($(this).prop('comStart'))
		{
			console.log('程式選單中文輸入，未完成');
			return;
		}
			
		//加上TimeOut行為，以避免連續輸入時Lag
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(function()
		{
			if ($('#txFilter').val().length >= 1) {
				ProgShowAll();

				var zTree = $.fn.zTree.getZTreeObj("treeProgram");

				var nodes = zTree.getNodes();

				ProgFilter(nodes[0]);

				zTree.expandAll(true);
			}
			else if ($('#txFilter').val().length == 0) {
				ProgShowAll();

				var zTree = $.fn.zTree.getZTreeObj("treeProgram");

				//1110314	Leslie[1110167]	[考試院]UI調整
				//var node = zTree.getNodeByParam("Name", "應用程式選單", null);
				var node = zTree.getNodeByParam("Name", "功能選單", null);

				zTree.expandNode(node, false, true, false);
				zTree.expandNode(node, true, false, false);
			}
		},500);
    }

    function ProgShowAll()
    {
        var zTree = $.fn.zTree.getZTreeObj("treeProgram");

        nodes = zTree.getNodesByParam("isHidden", true);
        zTree.showNodes(nodes);
    }

    function ProgFilter(node)
    {
        var result = false;

        if (node.Name.toUpperCase().indexOf($('#txFilter').val().toUpperCase()) > -1) {
            result = true;
        }

        if (!result && node.Sub) {
            for (var i = 0; i < node.Sub.length; i++) {
                var isTrue = ProgFilter(node.Sub[i]);

                if (isTrue)
                    result = true;
            }
        }

		//1110315	Leslie[1110167]	配合UI調整行為
        if (!result && node.Name != '功能選單')
            $.fn.zTree.getZTreeObj("treeProgram").hideNode(node);

        return result;
    }

    var FlotTodoData = null;
	//1110913	Leslie[1110652]	新增待辦件數的暫存物件
	var CntWSData = undefined;

    var zTreeSetting = {
        view: {
            selectedMulti: false,//是否可多點選擇
            //1110314	Leslie[1110167]	[考試院]UI調整
			dblClickExpand: false,
			showLine: false,
			showIcon: false,
			addDiyDom: addDiyDom
        },
        data: {
            key: {
                children: "Sub",
                name: "Name",
            }
        },
        callback: {
            beforeClick: ProgBeforeClick,
            onClick: ProgOnClick
        }
    }
	
	//1110314	Leslie[1110167]	[考試院]UI調整
	function addDiyDom(treeId, treeNode) {
		var spaceWidth = 5;
		var switchObj = $("#" + treeNode.tId + "_switch"),
		icoObj = $("#" + treeNode.tId + "_ico");
		switchObj.remove();
		icoObj.before(switchObj);

		if (treeNode.level > 1) {
			var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
			switchObj.before(spaceStr);
		}
	}

    function ProgOnClick(event, treeId, treeNode)
    {
        var sServer = SSO_CONFIG.ServerHost;
        var sArtifact = localStorage.Artifact;
        var sGuid = treeNode.Guid;

        if (treeNode.Guid != undefined)
            //1050823   Leslie  增加視窗管理，當首頁關閉時，一併關閉所有程式
            //window.open(sServer + '/iiws/redirect.aspx?nTarget=' + sGuid + '&SAMLart=' + sArtifact);
			//1091119	Leslie[1090885]	停用網址列權杖避免滲透弱點
            //theStart.ChildWin.push(window.open(sServer + '/iiws/redirect.aspx?nTarget=' + sGuid + '&SAMLart=' + sArtifact));
			theStart.ChildWin.push(window.open(sServer + '/iiws/redirect.aspx?nTarget=' + sGuid));

		//1110302	Leslie[1101537]	[考試院]新增機關切換選單
		if (treeNode.Value != undefined)
		{
			window.localStorage.NewUser = treeNode.Value;
			$('#btn_logout').trigger('click');
			return;
		}


        if (treeNode.AppUrl != undefined) {
            window.open(treeNode.AppUrl);

            // 2019.11.4 - 1080927 Eric, 開啟憑證管理程式後立即清除localStorage儲存的原有憑證設定
            if (treeNode.AppUrl.indexOf('T2100PKI')==0 && treeNode.AppUrl.indexOf('certMgmt')!==-1) {
                lsKeyName = 'certData-' + theSSO.User.account;
                if (lsKeyName in localStorage)
                    localStorage[lsKeyName] = '';
            }
        }

        if (treeNode.Url != undefined) {
            theStart.ChildWin.push(window.open(treeNode.Url));
        }
		
		//1060713	Leslie[1060383/1060612]	新增快速打開創稿頁籤功能
		if (treeNode.eventId != undefined){
			switch(treeNode.eventId){
				case "NewDraft":
						if('theAOL' in window){
							var currFolio = theAOL.getCurrFolio();
							if( currFolio != false){
								if(currFolio.readOnly())
									alert('已開啟並瀏覽公文影像，如需創稿請先關閉公文。');
								else
									alert('已開啟其他公文，如需創稿請先關閉公文。');
								break;
							}
						}
						$('#btn_mp').trigger('click');	//切換至"公文夾"
						//1100309	Leslie	修正UI行為
						//if($('#newDocWorkspace').hasClass('doc_desktop_hiddenpage'))	//收合時，才點開
							//window.setTimeout(function(){$('.drawer_title').trigger('click');},100);	//點開"創稿"，配合慢動作IE，延遲0.1秒
						window.setTimeout(function(){
							$('.drag_to_close').trigger('click');	//開閉所有面板
							$('.drawer_title').eq(1).trigger('click');	//開啟創稿面板
						},100)
					break;
				//1110315	Leslie[1110167]	新增檢索側屜快速選單
				case "QueryDoc":
						//1110330	Leslie	修正面版切換，改為先關掉所有面板(以避免殘留，例如：創稿面版)
						//if($('#aki800ListWorkspace').hasClass('doc_desktop_hiddenpage'))
						$('.drag_to_close').trigger('click');
							$('#tab_aki800').triggerHandler('click');
						$('#btn_mp').triggerHandler("click");
					break;
			}
		}

		//20170413 新增觸發關閉
		if(treeId=='Uptree'){
			$('#popupPanel-screen').trigger('click');
		}
        return false;
    }

    function ProgBeforeClick(treeId, treeNode)
    {
        var zTree = $.fn.zTree.getZTreeObj(treeId);		
        //1110314	Leslie[1110167]	[考試院]UI調整
		if(treeNode.level > 0){
			zTree.expandNode(treeNode);
			return true;
		}
		return false;	//1110314	Leslie[1110167]	[考試院]UI調整
    }

	//1100922 David 1100991 弱掃修正
	function htmlencode(s){
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}

})(jQuery);

