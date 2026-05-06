/* Service Worker Test */

var version = 'v0::';

var clrLog = 'background: pink; color: darkblue',
	clrInstall = clrLog,
	clrActivate = clrLog,
	clrFetch = 'background: #222; color: #bada55';

var transparentCache = false;	// 背景Cache新的Request & Response

var debugMsg = false;			// log debug message 

var t = new Date();
console.log('%c' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + ' - WORKER: initial', clrInstall, self.logonUser, self.offlineMode);

// 目前登入的使用者物件logonUser
var logonUser = self.logonUser || {};	// 1100816 Raymond SW.js似乎會不定時重載, 導致logonUser被初始化

// 離線模式啟用, 啟用時一律從cache尋找request, 有相符的直接回應, 無則回應NA
var offlineMode = self.offlineMode || false;	// 1100816 Raymond SW.js似乎會不定時重載, 導致offlineMode被初始化(變回連線模式)

var recoverLogonUser = true;	// 復原logonUser旗標
// for debug 通知前端SW崩潰又重置了
clients.matchAll()
.then(clnts => {
	for(const clnt of clnts) {
		clnt.postMessage("sw reinit");
		clnt.postMessage("offlineMode set to " + offlineMode);	// for debug 通知前端offlineMode被改變了
	}
});

// 若離線版運作途中SW重置(不明原因), 則從最後登入時Cache的使用者資訊及連離線模式復原
var recoverPromise = caches.match("/WEDEP/runtimeOfflineMode")
.then(cache => {
	if(cache) {
		console.warn('%cWORKER: 在Cache中找到前次記錄的登入連/離線模式', clrInstall);
		return readCacheContent(cache)
		.then(str => {
			console.warn('%cWORKER: Cache中記錄前次offlineMode=', clrInstall, str);
			return str == "true";
		});
	}
	else
		recoverLogonUser = false;
})
.then(restoredOfflineMode => {
	console.warn('%cWORKER: restoredOfflineMode=', clrInstall, restoredOfflineMode, '(' + typeof restoredOfflineMode + ')');
	if(typeof restoredOfflineMode === "boolean"/* && restoredOfflineMode == true*/) {
		return caches.match("/WEDEP/runtimeLogonUser")
		.then(cache2 => {
			if(cache2) {
				console.warn('%cWORKER: 在Cache中找到前次記錄的登入使用者資訊', clrInstall);
				return readCacheContent(cache2)
				.then(str2 => {
					let rlu = JSON.parse(str2);
					// 檢查是否為目前client
					return clients.matchAll()
					.then(clnts => {
						let restoreProps = [
						'userInfo',
						'activeRoleIdx',
						'id',
						'orgNo',
						'SAMLart',
						'SAMLartIsReal',
						'controlPage',
						'clientId',		// 1100908 Raymond 重置復原也要包括clientId, 若是clientId變掉了, controlPage相符, 則會重設為目前的client.id
						'CLASS_DATA',	// 1100907 Raymond 修正復原時未復原分類號、案次號、使用者資料, 導致分類號、受文者無法查詢的問題
						'CASE_DATA',
						'ORGMAIN'
						];
						let clntUrl, clntId;	// 1100907 Raymond 補充判斷offlineMode是否正確對應目前控制頁
						for(const clnt of clnts) {
							//if(debugMsg) {
								console.log('%cWORKER: 目前控制頁', clrInstall, clnt.id, '(' + clnt.url + ')');
								clntUrl = clnt.url;
								clntId = clnt.id;
							//}
							if(clnt.id == rlu.clientId) {
								console.log('%cWORKER: 在Cache中找到的前次登入使用者資訊的clientId符合目前控制頁', clrInstall, '(' + clnt.url + ')');
								for(p in rlu) {
									if(restoreProps.indexOf(p) >= 0) {
										console.log('%cWORKER: 復原[' + p + ']', clrInstall, rlu[p]);
										logonUser[p] = rlu[p];
									}
									else
										console.log('%cWORKER: 忽略[' + p + '], 保留原值', clrInstall, logonUser[p]);
								}
								offlineMode = restoredOfflineMode;
								clnt.postMessage("offlineMode set to " + offlineMode);	// for debug 通知前端offlineMode被改變了
								recoverLogonUser = false;
								return;
							}
						}
						console.warn('%cWORKER: 在Cache中找到的前次登入使用者資訊的clientId不符合目前控制頁, 改以網址比對', clrInstall, clntId, rlu.clientId, '(' + rlu.controlPage + ')');
						if(rlu.controlPage) {
							for(const clnt of clnts) {
								if(clnt.url == rlu.controlPage) {
									console.log('%cWORKER: 在Cache中找到的前次登入使用者資訊的網址符合目前控制頁', clrInstall, '(' + clnt.url + ')');
									for(p in rlu) {
										if(restoreProps.indexOf(p) >= 0) {
											console.log('%cWORKER: 復原[' + p + ']', clrInstall, rlu[p]);
											logonUser[p] = rlu[p];
										}
										else
											console.log('%cWORKER: 忽略[' + p + '], 保留原值', clrInstall, logonUser[p]);
									}
									console.log('%cWORKER: 重設[clientId]', clrInstall, clnt.id);
									logonUser.clientId = clnt.id;	// 重設正確的clientId, SW重置時似乎clients的id都會變掉
									offlineMode = restoredOfflineMode;
									clnt.postMessage("offlineMode set to " + offlineMode);	// for debug 通知前端offlineMode被改變了
									recoverLogonUser = false;
									return;
								}
							}
						}
						// 1100907 Raymond 若目前為離線模式, 也要復原
						if(offlineMode == true) {
							console.warn('%cWORKER: 在Cache中找到的前次登入使用者資訊的網址亦不符合目前控制頁, 但目前為離線模式', clrInstall, '(' + clntUrl + ')', '(' + rlu.controlPage + ')');
							/*for(p in rlu) {
								if(restoreProps.indexOf(p) >= 0) {
									console.log('%cWORKER: 復原[' + p + ']', clrInstall, rlu[p]);
									logonUser[p] = rlu[p];
								}
								else
									console.log('%cWORKER: 忽略[' + p + '], 保留原值', clrInstall, logonUser[p]);
							}
							console.log('%cWORKER: 重設[clientId]', clrInstall, clntId);
							logonUser.clientId = clntId;	// 重設正確的clientId, SW重置時似乎clients的id都會變掉*/
						}
						else {	// 補充對應目前控制頁為SSO_Offline.html時, offlineMode重置為false的問題
							if(!!clntUrl && clntUrl.length > 0 && clntUrl.match(/SSO_Offline.html/)) {
								console.warn('%cWORKER: 因目前控制頁', clrInstall, '(' + clntUrl + ')', '為離線版登入頁, 故復原offlineMode=true');
								offlineMode = true;
							}
							else
								console.warn('%cWORKER: 在Cache中找到的前次登入使用者資訊的網址亦不符合目前控制頁', clrInstall, '(' + clntUrl + ')', '(' + rlu.controlPage + ')');
						}
						recoverLogonUser = false;
					});
				});
			}
			else {
				console.warn('%cWORKER: 在Cache中找不到前次登入使用者資訊', clrInstall);
				recoverLogonUser = false;
			}
		});
	}
	else
		recoverLogonUser = false;
});

self.addEventListener("install", function(event) {
	console.log('%cWORKER: install事件被觸發', clrInstall, event);
	var t0 = new Date();
	event.waitUntil(
		/* The caches built-in is a promise-based API that helps you cache responses,
		   as well as finding and deleting them.
		*/
		caches
		/* You can open a cache by name, and this method returns a promise. We use
		   a versioned cache name here so that we can remove old cache entries in
		   one fell swoop later, when phasing out an older service worker.
		*/
		.open(version + 'fundamentals')
		.then(function(cache) {
			/* After the cache is opened, we can fill it with the offline fundamentals.
			   The method below will add all resources we've indicated to the cache,
			   after making HTTP requests for each of them.
			*/
			/* 注意：這裡的安裝程序目前測到的限制有：
			   1.瀏覽器不認識的副檔名不能加入cache, 例如:pnd, scss, tpl
			   2.加入cache的檔名或含有相對路徑名的檔名, 大小寫須與HTML的include宣告或IMG的src一致, 否則Cache會找不到(match fail)
			*/
			//return cache.addAll([	// 安裝所有用GET就可以取得的靜態檔案, 包括HTML、CSS、JS、圖檔
			let urlsToPrefetch = [
			//'SSO.html',			// 不要cache連線版登入頁
			//'SSO_Fake.html',		// 這是測試用的連線版登入頁
			'SSO_Offline.html',		// 這是離線版登入頁
			//'eDoc.html',			// 不要cache連線版首頁
			'eDoc_Offline.html',	// 這是離線版首頁
			'MS-Board.html',
			'MS-Cowork_A21020000I.htm',
			'MS-Cowork_A21020001I.htm',
			//'MS-Cowork_A21020895Y.htm',	// 1130809 Raymond 1130313 共通版沒這檔案
			'MS-Dept.html',
			'MS-DeptTree_A21020000I.htm',
			'MS-DeptTree_A21020001I.htm',
			//'MS-DeptTree_A21020895Y.htm',	// 1130809 Raymond 1130313 共通版沒這檔案
			'MS-EmployeeChange.html',
			'MS-ODC010.html',
			//'MS-PersonDict.html',		// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'MS-SetDept.html',
			'MS-SetIssueWordList.html',
			'MS-Start.html',
			'MS-State.html',
			'MS-ToMeetTime.html',
			'MS-Transfer.html',
			'MS-ViewRcvRefAtt.html',	// 1130809 Raymond 1130313 共通版多這檔案
			//'MS-WWKF.html',			// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'RD-AdjustOrder.html',
			'RD-AOL.html',
			'RD-AOLPrint.html',
			'RD-AttachMgmt.html',
			'RD-AutoBackupSetting.html',
			'RD-ConUnitSetting.html',
			//'RD-Coworker.html',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'RD-DlgChangePassword.html',
			'RD-DlgPincode.html',
			'RD-DlgProcessSetting.html',
			'RD-DlgResetPassword.html',
			'RD-DocSubmit.html',		// 1120328 Raymond 1111007 屏東縣版多這檔案
			'RD-ExportAtt.html',		// 1130809 Raymond 1130313 共通版多這檔案
			'RD-ExportDI.html',
			//'RD-FreqUsedPhrase.html',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'RD-GenMailMerges.html',
			'RD-Login.html',
			'RD-LogViewer.html',
			'RD-NewDraft.html',
			'RD-OrgStampBox.html',
			'RD-ParaProperty.html',
			'RD-PenSetting.html',
			'RD-PrintFolio.html',
			//'RD-PrintQuick.html',		// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'RD-PrintRefDoc.html',
			'RD-queryCertRslt.html',
			'RD-ReceiverBatchSetting.html',
			'RD-ReceiverDetail.html',
			'RD-ReceiverGrpDetail.html',
			'RD-ReceiverList.html',
			'RD-RefDocMgmt.html',
			'RD-ReqDocNo.html',
			//'RD-ReqMoiDocNo.html',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'RD-signDocRslt.html',
			'RD-SketchComment.html',
			'RD-TCModeSetting.html',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			'RD-TextComment.html',
			'RD-TextCommentR.html',
			'RD-Together.html',
			'RD-TransformDocType.html',
			'RD-UniView.html',
			'RD-UserInfoSetting.html',
			'RD-UserStampBox.html',
			'RD-UVPrint.html',
			'RD-VerifyEnve.html',
			'RD-ViewDoc.html',
			//'RD-ViewGuide.html',		// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'RD-ViewHistory.html',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'RD-ViewRefAtt.html',
			'RD-ViewTmpAtt.html',		// 1130809 Raymond 1130313 共通版多這檔案
			'2100Rsrc/CSS_CONFIG.css',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			'2100Rsrc/SSO_CONFIG.js',
			'2100Rsrc/SSO_CONFIG_EDOC.js',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/animation.css',
			//'CSS/edukai-3.ttf',
			//'CSS/JQM-CSS-Trim.css',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'CSS/JQM-CSS.css',		// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'CSS/JQM_Compress.css',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'CSS/jquery-simplemodal.basic.css',
			'CSS/jquery-ui-autocomplete.css',
			'CSS/jquery-ui-resize.css',
			'CSS/jquery.mobile.datepicker.css',
			'CSS/jquery.mobile.scrollview.css',
			'CSS/mobiscroll-1.5.1.css',
			'CSS/mobiscroll-1.5.1.min.css',
			'CSS/MS-Board.css',
			'CSS/MS-Start.css',
			'CSS/PrintChrome.css',
			'CSS/RD-acinput.css',
			'CSS/RD-AOL.css',
			'CSS/RD-DlgProcessSetting.css',
			'CSS/RD-Drawer.css',
			'CSS/RD-HistoryDoc.css',
			'CSS/RD-jqm-docs.css',
			'CSS/RD-Login.css',
			'CSS/RD-NewDraft.css',
			'CSS/RD-PreviewPane.css',
			'CSS/RD-QueryDoc.css',
			//'CSS/RD-SSO-END.css',			// 1100901 Raymond 這檔案現在不見了
			//'CSS/RD-SSO-END_wfh.css',
			'CSS/RD-SSO.css',
			'CSS/RD-SuperTables.css',		// KEY有分大小寫, HTML的include宣告跟實際檔名不一致就GG了
			'CSS/RD-ToDoList_Icon.css',
			'CSS/RD-ToDoList_List.css',
			'CSS/RD-token-input-facebook.css',
			'CSS/RD-token-input.css',
			'CSS/RD-UniView.css',
			'CSS/SYS.css',
			//'CSS/WFH_G1_wfh.css',
			//'CSS/zTreeStyle.css',			// 1130809 Raymond 1130313 共通版沒這檔案
			//'CSS/images/ExPage0001-550x388.png',	// 1130812 Raymond 1130313 共通版沒這檔案
			'CSS/images/left_menuForOutLook.gif',
			'CSS/images/left_menuForOutLook.png',
			'CSS/images/ui-bg_diagonals-thick_18_b81900_40x40.png',
			'CSS/images/ui-bg_diagonals-thick_20_666666_40x40.png',
			'CSS/images/ui-bg_flat_10_000000_40x100.png',
			'CSS/images/ui-bg_glass_100_f6f6f6_1x400.png',
			'CSS/images/ui-bg_glass_100_fdf5ce_1x400.png',
			'CSS/images/ui-bg_glass_65_ffffff_1x400.png',
			'CSS/images/ui-bg_gloss-wave_35_f6a828_500x100.png',
			'CSS/images/ui-bg_highlight-soft_100_eeeeee_1x100.png',
			'CSS/images/ui-bg_highlight-soft_75_ffe45c_1x100.png',
			'CSS/images/ui-icons_222222_256x240.png',
			'CSS/images/ui-icons_228ef1_256x240.png',
			'CSS/images/ui-icons_align_center_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_align_left_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_align_right_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_delete_column_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_delete_row_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_delete_table_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_divide_cells_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_ef8c08_256x240.png',
			'CSS/images/ui-icons_ffd27a_256x240.png',
			'CSS/images/ui-icons_ffffff_256x240.png',
			'CSS/images/ui-icons_insert_column_left_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_insert_column_right_32.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_insert_row_above_32.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_insert_row_below_32.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_merge_cells_32.png',			// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_new_table_32.png',				// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/ui-icons_set_line_height_32.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'CSS/images/zTreeline_conn.gif',
			'CSS/images/zTreeloading.gif',
			'CSS/images/zTreeStandard.gif',
			'CSS/images/zTreeStandard.png',
			'IMAGE/HELPFILE_E.png',
			'IMAGE/touch-icon-ipad-retina.png',
			'IMAGE/touch-icon-ipadpro-retina.png',
			'IMAGE/waiting.gif',
			'image/aol/arrow-down-24.png',		// KEY有分大小寫, HTML的宣告跟實際檔名不一致就GG了
			'IMAGE/AOL/calendar-24.png',
			'IMAGE/AOL/edit_group.png',
			'IMAGE/AOL/Info.png',
			'IMAGE/AOL/line1.png',
			'IMAGE/AOL/line10.png',
			'IMAGE/AOL/line2.png',
			'IMAGE/AOL/line20.png',
			'IMAGE/AOL/line5.png',
			'IMAGE/AOL/next128.png',
			'IMAGE/AOL/next64.png',
			'IMAGE/AOL/pen.png',
			'IMAGE/AOL/point_indicator.png',
			'IMAGE/AOL/point_line.png',
			'IMAGE/AOL/prev128.png',
			'IMAGE/AOL/prev64.png',
			//'IMAGE/AOL/Print.png',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'IMAGE/AOL/Save.png',
			'IMAGE/AOL/Search.png',
			'IMAGE/AOL/send_user.png',
			'IMAGE/AOL/sketch_comment.bmp',
			'IMAGE/AOL/transfer.png',
			'IMAGE/AOL/transp25.png',
			'IMAGE/AOL/transp50.png',
			'IMAGE/AOL/transp75.png',
			'IMAGE/AOL/txt_comment.bmp',
			'IMAGE/AOL/x.png',
			'IMAGE/ART/Doc-AttInfo.png',
			'IMAGE/ART/Doc-DocInfo.png',
			'IMAGE/ART/Doc-NewDraft.png',
			'IMAGE/ART/Doc-RefAtt.png',
			'IMAGE/ART/Doc-RefView.png',
			'IMAGE/ART/Drawer-NewDraft.png',
			'IMAGE/ART/Drawer-Open.png',
			'IMAGE/ART/Drawer-Search.png',
			'IMAGE/ART/Drawer-Todo.png',
			'IMAGE/ART/Drawer-TodoToClose.png',
			'IMAGE/ART/Drawer-TodoToFull.png',
			'IMAGE/ART/Drawer-TodoToHalf.png',
			//'IMAGE/ART/Login-Base-Far.png',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'IMAGE/ART/Login-Base.png',
			'IMAGE/ART/Login-Logo.png',
			//'IMAGE/ART/MOI_CISlogo_橫式1.png',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'IMAGE/ART/Login-Logo-BSMI.svg',	// 1130812 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Login-Logo-SMEG.svg', 	// 1120328 Raymond 1111007 屏東縣版多這檔案
			//'IMAGE/ART/Login-Logo-PTHG.svg',	// 1130812 Raymond 1130313 共通版沒這檔案
			'IMAGE/ART/log-pic-top-SITCA.gif',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			'IMAGE/ART/SSO-Base.png',
			'IMAGE/ART/SSO-Base-BSMI.jpg',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/SSO-DrawerDown.png',
			'IMAGE/ART/SSO-DrawerUp.png',
			'IMAGE/ART/SSO-Logo.png',
			'IMAGE/ART/SSO-Logo.svg',		// 1120328 Raymond 1111007 屏東縣版多這檔案
			'IMAGE/ART/SSO-Logo-BSMI.svg',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/SSO-Logo-EXAM.svg',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			'IMAGE/ART/SSO-Logo-ICDF.svg',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/SSO-Logo-OLD.svg',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/SSO-Logo-SMEG.svg',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			//'IMAGE/ART/SSO-Logo-PTHG.svg',	// 1130809 Raymond 1130313 共通版沒這檔案
			'IMAGE/ART/Start-Program.png',
			'IMAGE/ART/Start-Short.png',
			'IMAGE/ART/Start-Todo.png',
			'IMAGE/ART/Todo-IconFolderBlue.png',
			'IMAGE/ART/Todo-IconFolderRed.png',
			'IMAGE/ART/Todo-IconFolderWhite.png',
			'IMAGE/ART/Todo-IconFolderYellow.png',
			'IMAGE/ART/Todo-IconFolderYellowbk.png',
			'IMAGE/ART/Todo-IconFolderYellowbk2.png',
			'IMAGE/ART/Todo-IconUser.png',
			'IMAGE/ART/Todo-LightBlank.png',
			'IMAGE/ART/Todo-LightBlue.png',
			'IMAGE/ART/Todo-LightGreen.png',
			'IMAGE/ART/Todo-LightOrange.png',
			'IMAGE/ART/Todo-LightPurple.png',
			'IMAGE/ART/Todo-LightRed.png',
			'IMAGE/ART/Todo-LightWhite.png',
			'IMAGE/ART/Todo-LightYellow.png',
			'IMAGE/ART/Todo-MP-E.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-ER.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-LT0.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-LT1.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-LT2.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-LT3.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-LT4.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-P.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SEC1.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SEC2.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SPD1.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SPD2.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SPD3.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SPD4.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-SPD5.png',	// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-MP-W.png',		// 1130809 Raymond 1130313 共通版多這檔案
			'IMAGE/ART/Todo-Readed.png',
			'IMAGE/ART/Todo-ReadedBK.png',
			'IMAGE/ART/Todo-ReadNon.png',
			'IMAGE/ART/Todo-ReadNonBK.png',
			'IMAGE/ART/Todo-Secret1.png',
			'IMAGE/ART/Todo-Secret2.png',
			'IMAGE/ART/Todo-SignTypeNotify.png',
			'IMAGE/ART/Todo-SignTypeOnline.png',
			'IMAGE/ART/Todo-SignTypePepper.png',
			'IMAGE/ART/Todo-Speed1.png',
			'IMAGE/ART/Todo-Speed2.png',
			'IMAGE/ART/Todo-Speed3.png',
			'IMAGE/ART/CS-LG/Login-Base.png',
			'IMAGE/ART/CS-LG/SSO-Base.png',
			'IMAGE/ART/CS-LG/SSO-DrawerDown.png',
			'IMAGE/ART/CS-LG/SSO-DrawerUp.png',
			'IMAGE/ART/CS-LG/Start-Program.png',
			'IMAGE/ART/CS-LG/Start-Short.png',
			'IMAGE/ART/CS-LG/Start-Todo.png',
			'IMAGE/ART/CS-LP/Login-Base.png',
			'IMAGE/ART/CS-LP/SSO-Base.png',
			'IMAGE/ART/CS-LP/SSO-DrawerDown.png',
			'IMAGE/ART/CS-LP/SSO-DrawerUp.png',
			'IMAGE/ART/CS-LP/Start-Program.png',
			'IMAGE/ART/CS-LP/Start-Short.png',
			'IMAGE/ART/CS-LP/Start-Todo.png',
			'IMAGE/ART/CS-LY/Login-Base.png',
			'IMAGE/ART/CS-LY/SSO-Base.png',
			'IMAGE/ART/CS-LY/SSO-DrawerDown.png',
			'IMAGE/ART/CS-LY/SSO-DrawerUp.png',
			'IMAGE/ART/CS-LY/Start-Program.png',
			'IMAGE/ART/CS-LY/Start-Short.png',
			'IMAGE/ART/CS-LY/Start-Todo.png',
			'IMAGE/SSO/0_alert_yellow.gif',
			'IMAGE/SSO/110.png',
			'IMAGE/SSO/111.png',
			'IMAGE/SSO/1_alert_red.gif',
			'IMAGE/SSO/1_alert_white.gif',
			'IMAGE/SSO/210.png',
			'IMAGE/SSO/211.png',
			'IMAGE/SSO/2_alert_green.gif',
			'IMAGE/SSO/310.png',
			'IMAGE/SSO/3_alert_purple.gif',
			'IMAGE/SSO/410.png',
			'IMAGE/SSO/4_alert_red.gif',
			'IMAGE/SSO/510.png',
			'IMAGE/SSO/5_alert_blue.gif',
			'IMAGE/SSO/5_alert_null.png',
			'IMAGE/SSO/5_alert_orange.gif',
			'IMAGE/SSO/611.png',
			'IMAGE/SSO/action_subscribe.png',
			'IMAGE/SSO/banner_logo.png',
			'IMAGE/SSO/bg2.png',
			'IMAGE/SSO/blue_Corner.png',
			'IMAGE/SSO/bx_chat.png',
			'image/sso/clip.png',		// KEY有分大小寫, HTML的宣告跟實際檔名不一致就GG了
			'IMAGE/SSO/default.png',
			'IMAGE/SSO/EditDoc.png',
			'IMAGE/SSO/E_SIGN.GIF',
			'IMAGE/SSO/E_SIGN.png',
			'IMAGE/SSO/Folder_001.jpg',
			'IMAGE/SSO/Folder_002.jpg',
			'IMAGE/SSO/Folder_002.png',
			'IMAGE/SSO/Folder_bkg.png',
			'IMAGE/SSO/Folder_bkg2.png',
			//'IMAGE/SSO/Folder_bkg_opened.pdn',		// 這什麼東西? 會導致安裝失敗
			'IMAGE/SSO/Folder_bkg_opened.png',
			'IMAGE/SSO/Folder_bkg_red.png',
			'IMAGE/SSO/Folder_bkg_yellow.png',
			'IMAGE/SSO/folio_nav_icons.png',
			'IMAGE/SSO/Green_Corner.png',
			'IMAGE/SSO/GUEST_E - 複製.png',
			'IMAGE/SSO/GUEST_E.gif',
			'IMAGE/SSO/GUEST_T.png',
			'IMAGE/SSO/icon-search-black.png',
			'IMAGE/SSO/icons-18-black.png',
			'IMAGE/SSO/icons-18-white.png',
			'IMAGE/SSO/icons-36-black.png',
			'IMAGE/SSO/icons-36-white.png',
			'IMAGE/SSO/icon_read.gif',
			'IMAGE/SSO/icon_read.png',
			'IMAGE/SSO/icon_unread.gif',
			'IMAGE/SSO/icon_unread.png',
			'IMAGE/SSO/image-for-tabs-lightgray.png',
			'IMAGE/SSO/Loading.gif',		// KEY有分大小寫, HTML的宣告跟實際檔名不一致就GG了
			'IMAGE/SSO/notify.png',
			'IMAGE/SSO/NoTmplPic.png',
			'IMAGE/SSO/N_SIGN.GIF',
			'IMAGE/SSO/paneh.gif',
			'IMAGE/SSO/panehc.gif',
			'IMAGE/SSO/panev.gif',
			'IMAGE/SSO/panev.png',
			'IMAGE/SSO/panevc.gif',
			'IMAGE/SSO/panevc_2x.png',
			'IMAGE/SSO/preview.png',
			'IMAGE/SSO/px-ccc.gif',
			'IMAGE/SSO/P_SIGN.GIF',
			'IMAGE/SSO/Red_Corner.png',
			'IMAGE/SSO/SamplePage.png',
			'IMAGE/SSO/SEARCH2.PNG',
			'IMAGE/SSO/SEARCH_H.gif',
			'IMAGE/SSO/SEARCH_H.PNG',
			'IMAGE/SSO/Secret_white.gif',
			'IMAGE/SSO/Secret_yellow.gif',
			'IMAGE/SSO/speed_blue.gif',
			'IMAGE/SSO/speed_red.gif',
			'IMAGE/SSO/speed_white.gif',
			'IMAGE/SSO/tdl_iconmode.png',
			'IMAGE/SSO/tdl_listmode.png',
			'IMAGE/SSO/top_menu_icon.png',
			'IMAGE/SSO/ui-icons_256x240.png',
			'IMAGE/SSO/Untitled.png',
			'IMAGE/SSO/White_Corner.png',
			'IMAGE/SSO/yellow_Corner.png',
			'IMAGE/WorkFlow/arrow.jpg',
			'IMAGE/WorkFlow/arrow.png',
			'IMAGE/WorkFlow/arrow_02.jpg',
			'IMAGE/WorkFlow/arrow_d_unfinished.png',
			//'IMAGE/WorkFlow/arrow_lt_unfinished-2.pdn',		// 這什麼東西? 會導致安裝失敗
			'IMAGE/WorkFlow/arrow_lt_unfinished-2.png',
			'IMAGE/WorkFlow/arrow_lt_unfinished.png',
			'IMAGE/WorkFlow/arrow_unfinished.png',
			'IMAGE/WorkFlow/Boss.ico',
			'IMAGE/WorkFlow/clerk.png',
			'IMAGE/WorkFlow/clock.png',
			'IMAGE/WorkFlow/comment.png',
			'IMAGE/WorkFlow/comment_frame.png',
			'IMAGE/WorkFlow/cross_icon.png',
			'IMAGE/WorkFlow/edit_icon.png',
			'IMAGE/WorkFlow/fullscreen_minimize.png',
			'IMAGE/WorkFlow/insert_flow.png',
			'IMAGE/WorkFlow/insert_flowset.png',
			'IMAGE/WorkFlow/lv2_unit_boss.png',
			'IMAGE/WorkFlow/lv2_unit_subboss.png',
			'IMAGE/WorkFlow/minimize_fullscreen.png',
			'IMAGE/WorkFlow/opinion_dlg-old.png',
			'IMAGE/WorkFlow/opinion_dlg.png',
			'IMAGE/WorkFlow/plus-icon.png',
			'IMAGE/WorkFlow/portrait_1.jpg',
			'IMAGE/WorkFlow/portrait_1_normal.png',
			'IMAGE/WorkFlow/portrait_1_small.png',
			'IMAGE/WorkFlow/portrait_2.jpg',
			'IMAGE/WorkFlow/portrait_2_small.png',
			'IMAGE/WorkFlow/portrait_3.jpg',
			'IMAGE/WorkFlow/portrait_boss.png',
			'IMAGE/WorkFlow/portrait_empty.png',
			'IMAGE/WorkFlow/portrait_empty_normal.png',
			'IMAGE/WorkFlow/portrait_empty_normal_nobk.png',
			'IMAGE/WorkFlow/subboss.png',
			'IMAGE/WorkFlow/swap.png',
			'IMAGE/WorkFlow/unit_boss.png',
			'IMAGE/WorkFlow/unit_subboss.png',
			'IMAGE/WorkFlow/Up-Gray-Arrow.png',
			'IMAGE/WorkFlow/up_triangle.png',
			'IMAGE/WorkFlow/up_triangle2.png',
			'IMAGE/WorkFlow/warning.jpg',
			'IMAGE/WorkFlow/arrow-old/arrow.jpg',
			'IMAGE/WorkFlow/arrow-old/arrow_02.jpg',
			'IMAGE/WorkFlow/arrow-old/arrow_d_unfinished.png',
			'IMAGE/WorkFlow/arrow-old/arrow_lt_unfinished.png',
			'IMAGE/WorkFlow/arrow-old/arrow_unfinished.png',
			'Template/Lib/err_utf8.js',
			'Template/Lib/II_LIB.js',
			'Template/Lib/SYS_utf8.js',
			'Template/Lib/template_utf8_v2.js',
			'Template/TreeviewImages/ICON_ADDRESS.gif',
			'Template/TreeviewImages/icon_aspfile.gif',
			'Template/TreeviewImages/icon_cache.gif',
			'Template/TreeviewImages/icon_clsdfold.gif',
			'Template/TreeviewImages/icon_col-task.gif',
			'Template/TreeviewImages/icon_col-taskbox.gif',
			'Template/TreeviewImages/icon_cssfile.gif',
			'Template/TreeViewImages/ICON_DEP.gif',
			'Template/TreeviewImages/icon_document.gif',
			'Template/TreeviewImages/icon_exefile.gif',
			'Template/TreeviewImages/icon_fav.gif',
			'Template/TreeviewImages/icon_find.gif',
			'Template/TreeviewImages/icon_giffile.gif',
			'Template/TreeviewImages/icon_help.gif',
			'Template/TreeviewImages/icon_htmfile.gif',
			'Template/TreeviewImages/icon_key.gif',
			'Template/TreeviewImages/icon_offline.gif',
			'Template/TreeviewImages/icon_openfold.gif',
			'Template/TreeViewImages/ICON_ORG.gif',
			'Template/TreeviewImages/ICON_PPL.gif',
			'Template/TreeviewImages/ICON_ROL.gif',
			'Template/TreeviewImages/icon_settings.gif',
			'Template/TreeviewImages/icon_shutdown.gif',
			'Template/TreeViewImages/ICON_SUP.gif',
			'Template/TreeviewImages/icon_task.gif',
			'Template/TreeviewImages/icon_txtfile.gif',
			'Template/TreeviewImages/ICON_VIR.gif',
			'Template/TreeviewImages/icon_zipfile.gif',
			'Template/TreeviewImages/logo.gif',
			'Template/TreeViewImages/tv_dots.gif',
			'Template/TreeViewImages/tv_dotsb.gif',
			'Template/TreeviewImages/tv_dotsbt.gif',
			'Template/TreeViewImages/tv_dotsl.gif',
			'Template/TreeviewImages/tv_dotst.gif',
			'Template/TreeviewImages/tv_minus.gif',
			'Template/TreeViewImages/tv_minusdots.gif',
			'Template/TreeviewImages/tv_minusdotsb.gif',
			'Template/TreeViewImages/tv_minusdotsbt.gif',
			'Template/TreeviewImages/tv_minusdotst.gif',
			'Template/TreeviewImages/tv_plus.gif',
			'Template/TreeviewImages/tv_plusdots.gif',
			'Template/TreeviewImages/tv_plusdotsb.gif',
			'Template/TreeviewImages/tv_plusdotsbt.gif',
			'Template/TreeviewImages/tv_plusdotst.gif',
			'Template/TreeViewImages/tv_space.gif',
			'Template/TreeviewImages/visualasp.css',
			'Lib/base64.js',
			'Lib/Custom_RRB.js',		// 1130809 Raymond 1130313 共通版改為這檔案for鐵道局
			'Lib/Custom_BSMI.js',		// 1140815 Raymond 1141232 共通版包入這檔案for標檢局
			//'Lib/Dev-NewSSO.js',		// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/DEV-RD-Login.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/Dev-RD-SSO.js',		// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/dev-RD-SSOContent.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/dom-to-image.js',		// 1130809 Raymond 1130313 共通版多這檔案
			'Lib/escapeXml.js',
			'Lib/iScroll-lite.js',		// KEY有分大小寫, HTML的include宣告跟實際檔名不一致就GG了
			'Lib/iscroll-wrapper.js',
			'Lib/jquery-Draggable-1.0.js',
			//'Lib/jquery-migrate-1.4.0.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/jquery-migrate-3.1.0.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/jquery-migrate-3.3.2.js',
			'Lib/jquery-migrate-3.5.0.js',		// 1140815 Raymond 1141232 更新至3.5.0版
			//'Lib/jquery-ui-autocomplete.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/jquery-ui-resize.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/jquery-ui.js',
			//'Lib/jquery-ui.min.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/jquery.animate-enhanced.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/jquery.animate-enhanced.min.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/jQuery.DocSlider.js',
			//'Lib/jquery.easing.1.3.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/jquery.js',
			'Lib/jquery.mobile.datepicker.js',
			'Lib/jquery.mobile.scrollview.js',
			'Lib/jquery.mobile.tabs.js',
			'Lib/jquery.resizableColumns.js',	// 1130809 Raymond 1130313 共通版多這檔案
			//'Lib/jquery.simplemodal-1.4.1.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/jquery.simplemodal-1.4.4.js',
			//'Lib/jquery.simplemodal.1.4.1.min.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/jquery_pack_wfh.js',
			//'Lib/jquery.ui.touch-punch.js',	// 1130809 Raymond 1130313 共通版沒這檔案
			'Lib/jszip.js',
			'Lib/md5.js',
			//'Lib/mobiscroll-1.5.1.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/MS-Board.js',
			'Lib/MS-Choose.js',
			'Lib/MS-Common.js',
			'Lib/MS-Cowork.js',
			'Lib/MS-Dept.js',
			'Lib/MS-DeptTree.js',
			'Lib/MS-EmployeeChange.js',
			'Lib/MS-GRP.js',
			'Lib/MS-ModeOrg.js',
			'Lib/MS-ODC010.js',
			'Lib/MS-ODC010UI.js',
			'Lib/MS-ODC010WS.js',
			'Lib/MS-ODC011.js',
			'Lib/MS-ODC012.js',
			'Lib/MS-ODC013.js',
			'Lib/MS-SetDept.js',
			'Lib/MS-SetIssueWordList.js',
			'Lib/MS-Start.js',
			//'Lib/MS-Start_WFH.js',
			'Lib/MS-ToMeetTime.js',
			'Lib/MS-ToState.js',
			'Lib/MS-Transfer.js',
			'Lib/MS-ViewRcvRefAtt.js',	// 1130809 Raymond 1130313 共通版多這檔案
			'Lib/MS-WedEditSave.js',
			'Lib/RD-AdjustOrder.js',
			'Lib/RD-AlternativeLogger.js',
			'Lib/RD-AOL.js',
			'Lib/RD-AOLPrint.js',
			'Lib/RD-AttachMgmt.js',
			'Lib/RD-CacheMgr.js',
			'Lib/RD-CanvasUtil.js',
			'Lib/RD-ChangePpr.js',
			'Lib/RD-CompoundFolio.js',
			//'Lib/RD-Coworker.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-CustomMgr.js',
			'Lib/RD-DlgProcessSetting.js',
			'Lib/RD-DocPreview.js',
			'Lib/RD-DocSubmitPage.js',	// 1130809 Raymond 1130313 共通版多這檔案
			'Lib/RD-DraftCmds.js',
			'Lib/RD-DraftMgmt.js',
			'Lib/RD-DraftModel.js',
			'Lib/RD-Draggable.js',
			'Lib/RD-Edit.js',
			'Lib/RD-EditSO.js',
			//'Lib/RD-eDoc.js',		// 不要cache連線版首頁的JS
			'Lib/RD-eDoc_Offline.js',	// 這是離線版首頁的JS
			//'Lib/RD-EDoc_WFH-V2.js',
			//'Lib/RD-EDoc_WFH.js',
			'Lib/RD-ExportAtt.js',	// 1130809 Raymond 1130313 共通版多這檔案
			'Lib/RD-ExportFile.js',
			'Lib/RD-FolioCmds.js',
			'Lib/RD-FolioModel.js',
			'Lib/RD-FolioView.js',
			//'Lib/RD-FromDocCmds.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-HiCosSCard.js',
			'Lib/RD-HistoryDoc.js',
			'Lib/RD-ImportFile.js',
			//'Lib/RD-jdataview.js',		// 1140815 Raymond 1141232 Merge[1131229]升級第三方套件，用這個負責以Module方式載入jdataview(2.5.0)
			'Lib/helpers.js',				// 1140815 Raymond 1141232 Merge[1131229]升級第三方套件，用這個負責以Module方式載入jdataview(2.5.0)
			'Lib/jdataview.min.js',			// 1140815 Raymond 1141232 Merge[1131229]升級第三方套件，用這個負責以Module方式載入jdataview(2.5.0)
			'Lib/BoundsJDataView.js',		// 1140815 Raymond 1141232 Merge[1131229]升級第三方套件，用這個負責以Module方式載入jdataview(2.5.0)
			'Lib/RD-JQMInitForViewDoc.js',	// 1130809 Raymond 1130313 共通版多這檔案
			'Lib/RD-jquery.acInput.js',
			'Lib/RD-jquery.confirm.js',
			'Lib/RD-jquery.tokenEdit.js',
			'Lib/RD-Layout.js',
			//'Lib/RD-LoginForEDoc.js',		// 不要cache連線版登入頁的JS
			'Lib/RD-LoginForEDoc_Offline.js',	// 這是離線版登入頁的JS
			'Lib/RD-mcombobox.js',
			'Lib/RD-ModuleMgr.js',
			//'Lib/RD-MSUtil_wfh-1.js',
			//'Lib/RD-MSUtil_wfh.js',
			'Lib/RD-NewAttach.js',
			'Lib/RD-NewDoc.js',
			'Lib/RD-NewDraft.js',
			'Lib/RD-NewDraftExt.js',
			'Lib/RD-ObserverPattern.js',
			//'Lib/RD-OldSSO.js',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-ParseStampMgmt.js',
			'Lib/RD-PrintFolio.js',
			'Lib/RD-PrintRefDoc.js',
			'Lib/RD-QueryDoc.js',
			//'Lib/RD-QueryDoc_OLD.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-RefAttachMgmt.js',
			'Lib/RD-RefDocMgmt.js',
			'Lib/RD-RefView.js',
			'Lib/RD-ReqDocNo.js',
			//'Lib/RD-ReqMoiDocNo.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-RndrAtt.js',
			'Lib/RD-RsrcMgr.js',
			'Lib/RD-RTCProcess.js',
			//'Lib/RD-SignalR.js',		// 離線版不要SignalR
			//'Lib/RD-SignalRhubs.js',
			'Lib/RD-SignFolder.js',
			'Lib/RD-SignWork.js',
			'Lib/RD-soapclient.js',
			//'Lib/RD-splitter.js',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-SSO.js',
			//'Lib/RD-Login.js',		// 不要cache連線版登入頁的JS
			'Lib/RD-Login_Offline.js',	// 這是離線版登入頁的JS
			'Lib/RD-StampAct.js',
			'Lib/RD-Submit.js',
			'Lib/RD-SubmitOption.js',
			'Lib/RD-SuperTables.js',
			'Lib/RD-SysUtil.js',
			'Lib/RD-TCControl.js',
			'Lib/RD-TmpAttachMgmt.js',	// 1130809 Raymond 1130313 共通版多這檔案
			//'Lib/RD-Todolist.js',		// 不要cache連線版首頁的JS
			'Lib/RD-Todolist_Offline.js',	// 這是離線版首頁的JS
			'Lib/RD-UniView.js',
			'Lib/RD-UserInfo.js',
			'Lib/RD-Utility.js',
			'Lib/RD-UVPrint.js',
			'Lib/RD-verifyEnve.js',		// KEY有分大小寫, HTML的include宣告跟實際檔名不一致就GG了
			'Lib/RD-VerifyMac.js',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			'Lib/RD-ViewDoc.js',
			//'Lib/RD-ViewGuide.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/RD-ViewHistory.js',	// 1120328 Raymond 1111007 屏東縣版沒這檔案
			'Lib/RD-ViewRefAtt.js',
			'Lib/RD-ViewTmpAtt.js',		// 1130809 Raymond 1130313 共通版多這檔案
			'Lib/RD-watermark.jquery.js',
			'Lib/RD-WebServices.js',
			'Lib/RD-Zoom.js',
			'Lib/utf7.js',
			'Lib/context-menu/jquery.contextMenu.css',
			'Lib/context-menu/jquery.contextMenu.js',
			'Lib/context-menu/jquery.ui.position.js',
			//'Lib/context-menu/_temp/.csscomb.json',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/.csslintrc',		// 這什麼東西? 會導致安裝失敗
			//'Lib/context-menu/_temp/.jshintrc',		// 這什麼東西? 會導致安裝失敗
			//'Lib/context-menu/_temp/jquery.contextMenu.js',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/jquery.ui.position.js',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/jquery.ui.position.min.js',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/add.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/copy.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/cut.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/delete.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/edit.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/paste.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			//'Lib/context-menu/_temp/icons/quit.svg',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
/*			'Lib/context-menu/_temp/sass/jquery.contextMenu.scss',		// 這些是什麼東西? 會導致安裝失敗
			'Lib/context-menu/_temp/sass/_icons.scss',
			'Lib/context-menu/_temp/sass/_variables.scss',
			'Lib/context-menu/_temp/sass/icons/_icon_classes.scss.tpl',
			'Lib/context-menu/_temp/sass/icons/_mixins.scss',
			'Lib/context-menu/_temp/sass/icons/_variables.scss',
			'Lib/context-menu/_temp/sass/icons/_variables.scss.tpl',
*/			'Lib/CryptoJS/crypto-js.js',
			'Lib/DOMPurify/purify.js',	// 1120328 Raymond 1111007 屏東縣版多這檔案
			'Lib/jquery.flot/jquery.flot.js',
			'Lib/jquery.flot/jquery.flot.pie.js',
			'Lib/JQM/classic-theme.css',	// 1130809 Raymond 1130313 共通版「jquery.mobile-1.4.5」子目錄更名成「JQM」
			//'Lib/jquery.mobile-1.4.5/jQM_wfh.css',
			'Lib/JQM/jquery.csv-0.71.min.js',
			'Lib/JQM/jquery.mobile-1.4.5.css',
			'Lib/jQM/jQM.js',				// 1130809 Raymond 1130313 共通版「jquery.mobile-1.4.5.js」檔名更名成「jQM.js」(子目錄也小寫是因為HTML中宣告的大小寫)
			'Lib/JQM/jquery.mobile.external-png-1.4.5.css',
			'Lib/JQM/jquery.mobile.icons-1.4.5.css',
			'Lib/JQM/jquery.mobile.inline-png-1.4.5.css',
			'Lib/JQM/jquery.mobile.inline-svg-1.4.5.css',
			'Lib/JQM/jquery.mobile.structure-1.4.5.css',
			'Lib/JQM/jquery.mobile.theme-1.4.5.css',
			'Lib/JQM/images/ajax-loader.gif',
			'Lib/JQM/images/icons-png/action-black.png',
			'Lib/JQM/images/icons-png/action-white.png',
			'Lib/JQM/images/icons-png/alert-black.png',
			'Lib/JQM/images/icons-png/alert-white.png',
			'Lib/JQM/images/icons-png/arrow-d-black.png',
			'Lib/JQM/images/icons-png/arrow-d-l-black.png',
			'Lib/JQM/images/icons-png/arrow-d-l-white.png',
			'Lib/JQM/images/icons-png/arrow-d-r-black.png',
			'Lib/JQM/images/icons-png/arrow-d-r-white.png',
			'Lib/JQM/images/icons-png/arrow-d-white.png',
			'Lib/JQM/images/icons-png/arrow-l-black.png',
			'Lib/JQM/images/icons-png/arrow-l-white.png',
			'Lib/JQM/images/icons-png/arrow-r-black.png',
			'Lib/JQM/images/icons-png/arrow-r-white.png',
			'Lib/JQM/images/icons-png/arrow-u-black.png',
			'Lib/JQM/images/icons-png/arrow-u-l-black.png',
			'Lib/JQM/images/icons-png/arrow-u-l-white.png',
			'Lib/JQM/images/icons-png/arrow-u-r-black.png',
			'Lib/JQM/images/icons-png/arrow-u-r-white.png',
			'Lib/JQM/images/icons-png/arrow-u-white.png',
			'Lib/JQM/images/icons-png/audio-black.png',
			'Lib/JQM/images/icons-png/audio-white.png',
			'Lib/JQM/images/icons-png/back-black.png',
			'Lib/JQM/images/icons-png/back-white.png',
			'Lib/JQM/images/icons-png/bars-black.png',
			'Lib/JQM/images/icons-png/bars-white.png',
			'Lib/JQM/images/icons-png/bullets-black.png',
			'Lib/JQM/images/icons-png/bullets-white.png',
			'Lib/JQM/images/icons-png/calendar-black.png',
			'Lib/JQM/images/icons-png/calendar-white.png',
			'Lib/JQM/images/icons-png/camera-black.png',
			'Lib/JQM/images/icons-png/camera-white.png',
			'Lib/JQM/images/icons-png/carat-d-black.png',
			'Lib/JQM/images/icons-png/carat-d-white.png',
			'Lib/JQM/images/icons-png/carat-l-black.png',
			'Lib/JQM/images/icons-png/carat-l-white.png',
			'Lib/JQM/images/icons-png/carat-r-black.png',
			'Lib/JQM/images/icons-png/carat-r-white.png',
			'Lib/JQM/images/icons-png/carat-u-black.png',
			'Lib/JQM/images/icons-png/carat-u-white.png',
			'Lib/JQM/images/icons-png/check-black.png',
			'Lib/JQM/images/icons-png/check-white.png',
			'Lib/JQM/images/icons-png/clock-black.png',
			'Lib/JQM/images/icons-png/clock-white.png',
			'Lib/JQM/images/icons-png/cloud-black.png',
			'Lib/JQM/images/icons-png/cloud-white.png',
			'Lib/JQM/images/icons-png/comment-black.png',
			'Lib/JQM/images/icons-png/comment-white.png',
			'Lib/JQM/images/icons-png/delete-black.png',
			'Lib/JQM/images/icons-png/delete-white.png',
			'Lib/JQM/images/icons-png/edit-black.png',
			'Lib/JQM/images/icons-png/edit-white.png',
			'Lib/JQM/images/icons-png/eye-black.png',
			'Lib/JQM/images/icons-png/eye-white.png',
			'Lib/JQM/images/icons-png/forbidden-black.png',
			'Lib/JQM/images/icons-png/forbidden-white.png',
			'Lib/JQM/images/icons-png/forward-black.png',
			'Lib/JQM/images/icons-png/forward-white.png',
			'Lib/JQM/images/icons-png/gear-black.png',
			'Lib/JQM/images/icons-png/gear-white.png',
			'Lib/JQM/images/icons-png/grid-black.png',
			'Lib/JQM/images/icons-png/grid-white.png',
			'Lib/JQM/images/icons-png/heart-black.png',
			'Lib/JQM/images/icons-png/heart-white.png',
			'Lib/JQM/images/icons-png/home-black.png',
			'Lib/JQM/images/icons-png/home-white.png',
			'Lib/JQM/images/icons-png/info-black.png',
			'Lib/JQM/images/icons-png/info-white.png',
			'Lib/JQM/images/icons-png/location-black.png',
			'Lib/JQM/images/icons-png/location-white.png',
			'Lib/JQM/images/icons-png/lock-black.png',
			'Lib/JQM/images/icons-png/lock-white.png',
			'Lib/JQM/images/icons-png/mail-black.png',
			'Lib/JQM/images/icons-png/mail-white.png',
			'Lib/JQM/images/icons-png/minus-black.png',
			'Lib/JQM/images/icons-png/minus-white.png',
			'Lib/JQM/images/icons-png/navigation-black.png',
			'Lib/JQM/images/icons-png/navigation-white.png',
			'Lib/JQM/images/icons-png/phone-black.png',
			'Lib/JQM/images/icons-png/phone-white.png',
			'Lib/JQM/images/icons-png/plus-black.png',
			'Lib/JQM/images/icons-png/plus-white.png',
			'Lib/JQM/images/icons-png/power-black.png',
			'Lib/JQM/images/icons-png/power-white.png',
			'Lib/JQM/images/icons-png/recycle-black.png',
			'Lib/JQM/images/icons-png/recycle-white.png',
			'Lib/JQM/images/icons-png/refresh-black.png',
			'Lib/JQM/images/icons-png/refresh-white.png',
			'Lib/JQM/images/icons-png/search-black.png',
			'Lib/JQM/images/icons-png/search-white.png',
			'Lib/JQM/images/icons-png/shop-black.png',
			'Lib/JQM/images/icons-png/shop-white.png',
			'Lib/JQM/images/icons-png/star-black.png',
			'Lib/JQM/images/icons-png/star-white.png',
			'Lib/JQM/images/icons-png/tag-black.png',
			'Lib/JQM/images/icons-png/tag-white.png',
			'Lib/JQM/images/icons-png/user-black.png',
			'Lib/JQM/images/icons-png/user-white.png',
			'Lib/JQM/images/icons-png/video-black.png',
			'Lib/JQM/images/icons-png/video-white.png',
			'Lib/JQM/images/icons-svg/action-black.svg',
			'Lib/JQM/images/icons-svg/action-white.svg',
			'Lib/JQM/images/icons-svg/alert-black.svg',
			'Lib/JQM/images/icons-svg/alert-white.svg',
			'Lib/JQM/images/icons-svg/arrow-d-black.svg',
			'Lib/JQM/images/icons-svg/arrow-d-l-black.svg',
			'Lib/JQM/images/icons-svg/arrow-d-l-white.svg',
			'Lib/JQM/images/icons-svg/arrow-d-r-black.svg',
			'Lib/JQM/images/icons-svg/arrow-d-r-white.svg',
			'Lib/JQM/images/icons-svg/arrow-d-white.svg',
			'Lib/JQM/images/icons-svg/arrow-l-black.svg',
			'Lib/JQM/images/icons-svg/arrow-l-white.svg',
			'Lib/JQM/images/icons-svg/arrow-r-black.svg',
			'Lib/JQM/images/icons-svg/arrow-r-white.svg',
			'Lib/JQM/images/icons-svg/arrow-u-black.svg',
			'Lib/JQM/images/icons-svg/arrow-u-l-black.svg',
			'Lib/JQM/images/icons-svg/arrow-u-l-white.svg',
			'Lib/JQM/images/icons-svg/arrow-u-r-black.svg',
			'Lib/JQM/images/icons-svg/arrow-u-r-white.svg',
			'Lib/JQM/images/icons-svg/arrow-u-white.svg',
			'Lib/JQM/images/icons-svg/audio-black.svg',
			'Lib/JQM/images/icons-svg/audio-white.svg',
			'Lib/JQM/images/icons-svg/back-black.svg',
			'Lib/JQM/images/icons-svg/back-white.svg',
			'Lib/JQM/images/icons-svg/bars-black.svg',
			'Lib/JQM/images/icons-svg/bars-white.svg',
			'Lib/JQM/images/icons-svg/bullets-black.svg',
			'Lib/JQM/images/icons-svg/bullets-white.svg',
			'Lib/JQM/images/icons-svg/calendar-black.svg',
			'Lib/JQM/images/icons-svg/calendar-white.svg',
			'Lib/JQM/images/icons-svg/camera-black.svg',
			'Lib/JQM/images/icons-svg/camera-white.svg',
			'Lib/JQM/images/icons-svg/carat-d-black.svg',
			'Lib/JQM/images/icons-svg/carat-d-white.svg',
			'Lib/JQM/images/icons-svg/carat-l-black.svg',
			'Lib/JQM/images/icons-svg/carat-l-white.svg',
			'Lib/JQM/images/icons-svg/carat-r-black.svg',
			'Lib/JQM/images/icons-svg/carat-r-white.svg',
			'Lib/JQM/images/icons-svg/carat-u-black.svg',
			'Lib/JQM/images/icons-svg/carat-u-white.svg',
			'Lib/JQM/images/icons-svg/check-black.svg',
			'Lib/JQM/images/icons-svg/check-white.svg',
			'Lib/JQM/images/icons-svg/clock-black.svg',
			'Lib/JQM/images/icons-svg/clock-white.svg',
			'Lib/JQM/images/icons-svg/cloud-black.svg',
			'Lib/JQM/images/icons-svg/cloud-white.svg',
			'Lib/JQM/images/icons-svg/comment-black.svg',
			'Lib/JQM/images/icons-svg/comment-white.svg',
			'Lib/JQM/images/icons-svg/delete-black.svg',
			'Lib/JQM/images/icons-svg/delete-white.svg',
			'Lib/JQM/images/icons-svg/edit-black.svg',
			'Lib/JQM/images/icons-svg/edit-white.svg',
			'Lib/JQM/images/icons-svg/eye-black.svg',
			'Lib/JQM/images/icons-svg/eye-white.svg',
			'Lib/JQM/images/icons-svg/forbidden-black.svg',
			'Lib/JQM/images/icons-svg/forbidden-white.svg',
			'Lib/JQM/images/icons-svg/forward-black.svg',
			'Lib/JQM/images/icons-svg/forward-white.svg',
			'Lib/JQM/images/icons-svg/gear-black.svg',
			'Lib/JQM/images/icons-svg/gear-white.svg',
			'Lib/JQM/images/icons-svg/grid-black.svg',
			'Lib/JQM/images/icons-svg/grid-white.svg',
			'Lib/JQM/images/icons-svg/heart-black.svg',
			'Lib/JQM/images/icons-svg/heart-white.svg',
			'Lib/JQM/images/icons-svg/home-black.svg',
			'Lib/JQM/images/icons-svg/home-white.svg',
			'Lib/JQM/images/icons-svg/info-black.svg',
			'Lib/JQM/images/icons-svg/info-white.svg',
			'Lib/JQM/images/icons-svg/location-black.svg',
			'Lib/JQM/images/icons-svg/location-white.svg',
			'Lib/JQM/images/icons-svg/lock-black.svg',
			'Lib/JQM/images/icons-svg/lock-white.svg',
			'Lib/JQM/images/icons-svg/mail-black.svg',
			'Lib/JQM/images/icons-svg/mail-white.svg',
			'Lib/JQM/images/icons-svg/minus-black.svg',
			'Lib/JQM/images/icons-svg/minus-white.svg',
			'Lib/JQM/images/icons-svg/navigation-black.svg',
			'Lib/JQM/images/icons-svg/navigation-white.svg',
			'Lib/JQM/images/icons-svg/phone-black.svg',
			'Lib/JQM/images/icons-svg/phone-white.svg',
			'Lib/JQM/images/icons-svg/plus-black.svg',
			'Lib/JQM/images/icons-svg/plus-white.svg',
			'Lib/JQM/images/icons-svg/power-black.svg',
			'Lib/JQM/images/icons-svg/power-white.svg',
			'Lib/JQM/images/icons-svg/recycle-black.svg',
			'Lib/JQM/images/icons-svg/recycle-white.svg',
			'Lib/JQM/images/icons-svg/refresh-black.svg',
			'Lib/JQM/images/icons-svg/refresh-white.svg',
			'Lib/JQM/images/icons-svg/search-black.svg',
			'Lib/JQM/images/icons-svg/search-white.svg',
			'Lib/JQM/images/icons-svg/shop-black.svg',
			'Lib/JQM/images/icons-svg/shop-white.svg',
			'Lib/JQM/images/icons-svg/star-black.svg',
			'Lib/JQM/images/icons-svg/star-white.svg',
			'Lib/JQM/images/icons-svg/tag-black.svg',
			'Lib/JQM/images/icons-svg/tag-white.svg',
			'Lib/JQM/images/icons-svg/user-black.svg',
			'Lib/JQM/images/icons-svg/user-white.svg',
			'Lib/JQM/images/icons-svg/video-black.svg',
			'Lib/JQM/images/icons-svg/video-white.svg',
			//'Lib/jquery.SignalR/jquery.signalR-2.4.1.js',	// 離線版不要SignalR
			//'Lib/jquery.SignalR/json2.js',
			//'Lib/jquery.SignalR/SignalR_wfh.js',
			'Lib/jquery.tablesorter/jquery.tablesorter.js',
			'Lib/jquery.ztree/jquery.ztree.core.js',
			'Lib/jquery.ztree/jquery.ztree.exedit.js',
			'Lib/jquery.ztree/jquery.ztree.exhide.js',
			//'Lib/jquery.ztree/jquery.ztree_wfh.js',
			'Lib/jquery.ztree/css/zTreeStyle/zTreeStyle.css',
			'Lib/jquery.ztree/css/zTreeStyle/img/left_menuForOutLook.gif',	// 1120428 Raymond 1111007 屏東縣版多這檔案
			'Lib/jquery.ztree/css/zTreeStyle/img/left_menuForOutLook.png',	// 1120428 Raymond 1111007 屏東縣版多這檔案
			'Lib/jquery.ztree/css/zTreeStyle/img/line_conn.gif',
			'Lib/jquery.ztree/css/zTreeStyle/img/loading.gif',
			'Lib/jquery.ztree/css/zTreeStyle/img/zTreeStandard.gif',
			'Lib/jquery.ztree/css/zTreeStyle/img/zTreeStandard.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/1_close.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/1_open.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/2.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/3.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/4.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/5.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/6.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/7.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/8.png',
			'Lib/jquery.ztree/css/zTreeStyle/img/diy/9.png',
			//'Lib/JsBarcode/JsBarcode.code39.min.js',	// 1140815 Raymond 1141232 Merge[1130733]配合升級第三方套件
			'Lib/Barcode39/Barcode39.min.js',			// 1140815 Raymond 1141232 Merge[1130733]配合升級第三方套件
			//'Lib/mobiscroll/css/jquery-scroll.css',	// 1120329 Raymond 1111007 屏東縣版沒這檔案
			'Lib/mobiscroll/css/mobiscroll.animation.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.android-ics.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.android.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.ios.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.ios7.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.jqm.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.sense-ui.css',
			'Lib/mobiscroll/css/mobiscroll.scroller.wp.css',
			//'Lib/mobiscroll/css/mobiscroll_wfh.css',
			'Lib/mobiscroll/css/wp_icons.png',
			'Lib/mobiscroll/css/wp_icons_light.png',
			'Lib/mobiscroll/js/mobiscroll.appframework.js',
			'Lib/mobiscroll/js/mobiscroll.core.js',
			'Lib/mobiscroll/js/mobiscroll.datetime.js',
			'Lib/mobiscroll/js/mobiscroll.jqmwidget.js',
			'Lib/mobiscroll/js/mobiscroll.list.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.android-ics.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.android.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.ios.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.ios7.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.jqm.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.js',
			'Lib/mobiscroll/js/mobiscroll.scroller.wp.js',
			'Lib/mobiscroll/js/mobiscroll.select.js',
			'Lib/mobiscroll/js/mobiscroll.zepto.js',
			//'Lib/mobiscroll/js/mobiscroll_wfh.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.cs.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.de.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.en-UK.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.es.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.fr.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.hu.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.it.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.ja.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.nl.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.no.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.pl.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.pt-BR.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.pt-PT.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.ro.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.ru-UA.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.sk.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.sv.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.tr.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.zh.js',
			'Lib/mobiscroll/js/i18n/mobiscroll.i18n.zht.js',
			//'/IIWS/AuthWS.asmx?wsdl',			// 1120509 Raymond 1111007 wsdl已禁用
			//'/WEDEP/webeditws02.asmx?wsdl',	// 1120419 Raymond 1111007 wsdl已禁用
			//'/odmssp/odmssp.asmx?wsdl',		// 1120419 Raymond 1111007 wsdl已禁用
			//Leslie	加入離線版分類號查詢子視窗
			'EAH005.html',
			'Lib/EAH005.js',
			'/STDN/Lib/SYS.css',
			'/STDN/Lib/css/zTreeStyle/zTreeStyle.css',			// 1120502 Raymond 1111007 新增
			'/STDN/Lib/css/zTreeStyle/img/zTreeline_conn.gif',	// 1120502 Raymond 1111007 新增
			'/STDN/Lib/css/zTreeStyle/img/zTreeStandard.png',	// 1120502 Raymond 1111007 新增
			'/STDN/Lib/css/zTreeStyle/img/zTreeStandard.gif',	// 1120502 Raymond 1111007 新增
			'/STDN/Lib/css/zTreeStyle/img/zTreeloading.gif',	// 1120502 Raymond 1111007 新增
			'/WEDEP/webeditws02.asmx/GetWebMethodInfo?MethodName=getPublicRsrc',	// 1120508 Raymond 1111007 改用WebMethodInfo取代
			'/odmssp/odmssp.asmx/GetWebMethodInfo?MethodName=NewDraft',	// 1120508 Raymond 1111007 改用WebMethodInfo取代
			'/IIWS/AuthWS.asmx/GetWebMethodInfo?MethodName=GetActiveRole',	// 1120509 Raymond 1111007 改用WebMethodInfo取代
			'/IIWS/AuthWS.asmx/GetWebMethodInfo?MethodName=ChangeActiveRole',	// 1120509 Raymond 1111007 改用WebMethodInfo取代
			];
			//]);
			let nTotal = urlsToPrefetch.length, nDownloaded = 0;
			const prefetchPromise = new Promise((resolve, reject) => {
				let i=0;
				function doPrefetch() {
					function doFetch() {
						var t0 = new Date();	// 1100902 Raymond for註記完成下載時間
						// 1120508 Raymond 1111007 GetWebMethodInfo要強制使用JSON回傳格式
						//fetch(urlsToPrefetch[i])
						var pm;
						if(urlsToPrefetch[i].match(/GetWebMethodInfo/)) {
							var urlO = urlsToPrefetch[i];
							var hdrs = {"Content-Type": "application/json", "Accept": "application/json"};
							var urlPre = urlO.substr(0, urlO.indexOf("?"));
							var nm = urlO.substr(urlO.indexOf("=") + 1);
							pm = fetch(urlPre, {method: "POST", headers: hdrs, body: JSON.stringify({"MethodName": nm})});
						}
						else
							pm = fetch(urlsToPrefetch[i]);
						pm
						.then(response => {
							if(!response.ok)	// fetch下載失敗不會觸發reject, 而是用response.ok=false來反應
								console.error("fetch&put[" + i + "] " + urlsToPrefetch[i] + " failed! " + response.statusText + "(" + response.status + ")", response);
							else {
								// 1100902 Raymond 註記完成下載時間及檔案大小
								console.log('%cWORKER: 下載[' + i + ']', clrInstall, urlsToPrefetch[i], '完成, Content-Type:' + response.headers.get("Content-Type") + '(' + response.headers.get("Content-Length") + 'Bytes), 耗時' + (new Date() - t0) + 'ms');
								t0 = new Date();
								return cache.put(urlsToPrefetch[i], response);
							}
						})
						.then(function() {
							nDownloaded++;
							// 1100902 Raymond 註記完成時間及Cache已使用容量
							console.log('%cWORKER: caches.put', clrInstall, urlsToPrefetch[i], '完成(' + nDownloaded + '/' + nTotal + '), 耗時' + (new Date() - t0) + 'ms');
							if ('storage' in navigator && 'estimate' in navigator.storage) {
								navigator.storage.estimate().then(({usage, quota}) => {
									console.log('%cWORKER: Using', clrInstall, usage, 'out of', quota, 'bytes');
								}).catch(error => {
									console.error('Loading storage estimate failed:');
									console.log(error.stack);
								});
							}
							++i;
							if(!!logonUser.clientId) {	// 通知安裝進度
								return self.clients.get(logonUser.clientId)
										.then(client => {
											client.postMessage(JSON.stringify({action: "progress", downloadedFiles: nDownloaded, fileName: urlsToPrefetch[i-1], totalFiles: nTotal, title: "安裝離線版公文製作"}));
										});
							}
						})
						.then(doPrefetch);
					}
					if(i == nTotal) {	// complete
						resolve();
					}
					else {
						caches.match(urlsToPrefetch[i])
						.then(cached => {
							if(!!cached) {	// 比對之前下載到Cache的Last-Modified時間是否相同
								let lastModified = cached.headers.get("Last-Modified");
								fetch(urlsToPrefetch[i], {method: "HEAD"})
								.then(response => {
									if(!response.ok) {	// fetch下載失敗不會觸發reject, 而是用response.ok=false來反應
										console.error("fetch&put[" + i + "] " + urlsToPrefetch[i] + " failed! " + response.statusText + "(" + response.status + ")", response);
										//if(response.status == 405)	// ?wsdl的url可能不允許HEAD, 既然無法比對日期就無條件下載
										if(response.status == 405 || response.status == 500)	// 1120508 Raymond 1111007 GetWebMethodInfo可能不允許HEAD, 既然無法比對日期就無條件下載
											doFetch();
										else {	// 發生其它錯誤目前不下載
											nDownloaded++;
											++i;
											if(!!logonUser.clientId) {	// 通知安裝進度
												self.clients.get(logonUser.clientId)
												.then(client => {
													client.postMessage(JSON.stringify({action: "progress", downloadedFiles: nDownloaded, fileName: urlsToPrefetch[i-1], totalFiles: nTotal, title: "安裝離線版公文製作"}));
												});
											}
											doPrefetch();	// next
										}
									}
									else {
										let lastModifiedRemote = response.headers.get("Last-Modified");
										if(lastModifiedRemote != lastModified) {
											console.log("[" + urlsToPrefetch[i] + "]Last-Modified(" + lastModifiedRemote + ")與前次Cache的(" + lastModified + ")不一致, 應下載");
											doFetch();
										}
										else {
											nDownloaded++;
											console.log("[" + urlsToPrefetch[i] + "]Last-Modified(" + lastModifiedRemote + ")與前次Cache的(" + lastModified + ")一致, 不下載");
											++i;
											if(!!logonUser.clientId) {	// 通知安裝進度
												self.clients.get(logonUser.clientId)
												.then(client => {
													client.postMessage(JSON.stringify({action: "progress", downloadedFiles: nDownloaded, fileName: urlsToPrefetch[i-1], totalFiles: nTotal, title: "安裝離線版公文製作"}));
												});
											}
											doPrefetch();	// next
										}
									}
								});
							}
							else {	// 前次未下載此檔
								doFetch();
							}
						});
					}
				}
				if(!!logonUser.clientId) {	// 通知安裝進度
					self.clients.get(logonUser.clientId)
							.then(client => {
								console.log("通知開始安裝離線版公文製作", logonUser.clientId);
								client.postMessage(JSON.stringify({action: "install", totalFiles: nTotal, title: "安裝離線版公文製作"}));
							})
							.then(doPrefetch);
				}
				else
					doPrefetch();
			});
			return prefetchPromise;
		})
		.then(function() {
			console.log('%cWORKER: install完成', clrInstall, '耗時' + (new Date() - t0) + 'ms');

			self.skipWaiting();	// 立即啟用
		})
	);
});

// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
function concatTypedArrays(a, b) { // a, b TypedArray of same type
	var c = new (a.constructor)(a.length + b.length);
	c.set(a, 0);
	c.set(b, a.length);
	return c;
}

self.addEventListener('message', event => {
	// event is an ExtendableMessageEvent object
	console.log('%cWORKER: The client sent me a message:', clrInstall, event.data);
	if(event.data.match(/offlineMode=(\w+)/)) {
		offlineMode = RegExp.$1 == 'true';
		console.log('%cWORKER: 切換離線模式為:', clrInstall, offlineMode);
		console.log('%cWORKER: ClientID為:', clrInstall, event.source.id);
		// for debug 通知前端offlineMode被改變了
		clients.matchAll()
		.then(clnts => {
			for(const clnt of clnts) {
				clnt.postMessage("offlineMode set to " + offlineMode);
			}
		});
		logonUser.clientId = event.source.id;	// 記下連線模式時的clientId, 安裝時通知用
		if(offlineMode == true) {	// 若目前是離線模式的話, 通知目前最後更新的機關代碼
			caches.match("/WEDEP/lastUpdatedOrgRsrc")
			.then(cached => {
				if(cached) {
					readCacheContent(cached)
					.then(str => {
						self.clients.get(logonUser.clientId)
						.then(client => {
							client.postMessage("lastUpdatedOrgRsrc=" + str);
						});
					});
				}
			});
		}
	}
	else if(event.data.match(/^{/)) {	// 從MS-Start.js的「安裝離線版公文製作」傳入UserInfo
		let usrnfo = JSON.parse(event.data);
		if("AD_Account" in usrnfo) {
			logonUser.userInfo = usrnfo;
			logonUser.activeRoleIdx = 0;
			logonUser.id = logonUser.userInfo.AD_Account.m_Account;
			logonUser.orgNo = logonUser.userInfo.AD_Account.m_SourceOrgNo;
			// Cache傳入的UserInfo
			let cachedKey = '/IIWS/SAML.asmx/GetUserInfoForPadbyJSON?User=' + logonUser.orgNo + '_' + logonUser.id;
			let bodystr = JSON.stringify({d: event.data});
			var cacheCopy = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
			caches.open(version + 'posts')
				.then(function add(cache) {
					cache.put(cachedKey, cacheCopy);
				})
				.then(function() {
					if(debugMsg) {
						console.log('%cWORKER-test: fetch到的response保留在cache storage.', clrFetch, cachedKey);
					}
				});
		}
		else{
			logonUser.currUserInfo = usrnfo;
			/*Leslie	加入新增之受文者、分類號等資源檔 1100820 Raymond 移到循序下載非資源檔那裡
			caches.open(version + 'posts')
				.then(function add(cache){
					return cache.addAll([
					'/WEDEP/GetOrgCacheData.ashx?OrgNo='+logonUser.orgNo,
					'/WEDEP/GetTreeClsCacheData.ashx?OrgNo='+logonUser.orgNo,
					'/WEDEP/GetTreeCaseCacheData.ashx?OrgNo='+logonUser.orgNo,
					'/WEDEP/GetClsCacheData.ashx?OrgNo='+logonUser.orgNo,
					'/WEDEP/GetCaseCacheData.ashx?OrgNo='+logonUser.orgNo,
					])
				})
				.then(function() {
					if(debugMsg) {
						console.log('%cWORKER-test: fetch到的response保留在cache storage.', clrFetch, cachedKey);
					}
				});*/
			// 1100903 Raymond 1100394 記下連線模式時取得的Profile.xml路徑
			var ProfileInfo = {
				Path4Profile: usrnfo.Path4Profile,
				Filename4Profile: usrnfo.Filename4Profile,
				WSDL4Profile: usrnfo.WSDL4Profile,
				WSDL4ClassNo: usrnfo.WSDL4ClassNo,
				WSDL4GGetDocContent: usrnfo.WSDL4GetDocContent,
				WSDL4GetDocNo: usrnfo.WSDL4GetDocNo,
				WSDL4GetIssueNo: usrnfo.WSDL4GetIssueNo,
				WSDL4OnLineView: usrnfo.WSDL4OnLineView
			};
			caches.open(version + "posts")
			.then(function add(cache) {
				let bodystr = JSON.stringify(ProfileInfo);
				console.log('%cWORKER: GetUserInfo取得的Profile及其他網址資訊存入快取', clrInstall);
				return cache.put("/ProfileInfo", new Response(bodystr, {headers: {'content-type': 'text/plain', 'content-length': bodystr.length}}));
			});
		}
	}
	else if(event.data.match(/^activeRoleIndex=/)) {	// 從RD-EDoc_Offline.js的「維護使用者資訊」傳入目前前端的activeRoleIndex, 因維護使用者資訊傳送修改後的RawUser時會使activeRoleIdx重設為0, 故需再次傳入
		let ari = event.data.substr(16);
		if(ari.length > 0 && ari.match(/\d+/)) {
			logonUser.activeRoleIdx = parseInt(ari);
			// 將目前使用者及連離線狀態暫存在cache, 若SW發生重置, 則從cache中恢復
			//logonUser.controlPage = referrerPage;	// 記錄控制前端頁面網址, 復原時比對用
			caches.open(version + "posts")
			.then(function add(cache) {
				//cache.put("/WEDEP/runtimeOfflineMode", new Response("" + offlineMode, {headers: {'content-type': 'text/plain', 'content-length': offlineMode ? '4' : '5'}}));
				let bodystr = JSON.stringify(logonUser);
				return cache.put("/WEDEP/runtimeLogonUser", new Response(bodystr, {headers: {'content-type': 'text/plain', 'content-length': bodystr.length}}));
			});
		}
	}
	else if(event.data.match(/SAMLart=([\d\w-]+)/)) {	// 從MS-Start.js的「安裝離線版公文製作」傳入SAMLart
		logonUser.SAMLart = RegExp.$1;;
		logonUser.SAMLartIsReal = true;
		// 下載非資源檔
		let dlFiles = [];
		// 1100903 Raymond 1100394 修正回傳UserInfo的網域不正確, 導致無法登入的問題
		let wsdl;
		// 1100907 Raymond 1100394 cache.put ProfileInfo可能因非同步有時間差的關係, 在這個時間點還未完成, 所以cache找不到, 改用記錄在logonUser中的currUserInfo
		if(!!logonUser.currUserInfo) {
			let pfnfo = logonUser.currUserInfo;
			console.log('%cWORKER: 目前連線模式下的GetUserInfo的Profile資訊, PROJECT目錄位於', clrInstall, pfnfo.Path4Profile[0]);
			let drv = pfnfo.Path4Profile[0];
			wsdl = pfnfo.WSDL4Profile;
			//dlFiles.push({ph: 'C:\\PROJECT\\2100Rsrc\\DEFAULT\\sso', fn: 'MPUiSetting.xml'});
			dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\' + logonUser.orgNo + '\\sso', fn: 'OrgInfo_' + logonUser.orgNo + '.xml'});
			dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\' + logonUser.orgNo + '\\sso', fn: 'MPRule_' + logonUser.orgNo + '.xml'});
			dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\DEFAULT\\AOL\\OD', fn: 'ODRPUI.xml'});
			dlFiles.push({ph: drv + ':\\Project\\WebEdit\\Rsrc', fn: 'Profile.xml'});
			// 1120508 Raymond 1111007 共通版無forIssue的浮水印功能
			//dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\' + logonUser.orgNo, fn: 'ForceWaterMarkForIssue.JSON'});
			//dlFiles.push({ph: drv + ':\\PROJECT\\2100Rsrc\\' + logonUser.orgNo, fn: 'ForceWatermark.png'});
			// 1100820 Raymond 下載新增之受文者、分類號等資源檔
			dlFiles.push({fn: '/WEDEP/GetOrgCacheData.ashx?OrgNo='+logonUser.orgNo});
			dlFiles.push({fn: '/WEDEP/GetTreeClsCacheData.ashx?OrgNo='+logonUser.orgNo});
			dlFiles.push({fn: '/WEDEP/GetTreeCaseCacheData.ashx?OrgNo='+logonUser.orgNo});
			dlFiles.push({fn: '/WEDEP/GetClsCacheData.ashx?OrgNo='+logonUser.orgNo});
			dlFiles.push({fn: '/WEDEP/GetCaseCacheData.ashx?OrgNo='+logonUser.orgNo});
			doStartDL();
		}
		else {
			caches.match("/ProfileInfo")
			.then(cached => {
				if(!!cached) {
					readCacheContent(cached)
					.then(str => {
						let pfnfo = JSON.parse(str);
						console.log('%cWORKER: 前一次連線模式下的GetUserInfo的Profile資訊, PROJECT目錄位於', clrInstall, pfnfo.Path4Profile[0]);
						let drv = pfnfo.Path4Profile[0];
						wsdl = pfnfo.WSDL4Profile;
						//dlFiles.push({ph: 'C:\\PROJECT\\2100Rsrc\\DEFAULT\\sso', fn: 'MPUiSetting.xml'});
						dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\' + logonUser.orgNo + '\\sso', fn: 'OrgInfo_' + logonUser.orgNo + '.xml'});
						dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\' + logonUser.orgNo + '\\sso', fn: 'MPRule_' + logonUser.orgNo + '.xml'});
						dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\DEFAULT\\AOL\\OD', fn: 'ODRPUI.xml'});
						dlFiles.push({ph: drv + ':\\Project\\WebEdit\\Rsrc', fn: 'Profile.xml'});
						dlFiles.push({ph: drv + ':\\\\PROJECT\\\\2100Rsrc\\' + logonUser.orgNo, fn: 'ForceWaterMarkForIssue.JSON'});
						dlFiles.push({ph: drv + ':\\PROJECT\\2100Rsrc\\' + logonUser.orgNo, fn: 'ForceWatermark.png'});
						// 1100820 Raymond 下載新增之受文者、分類號等資源檔
						dlFiles.push({fn: '/WEDEP/GetOrgCacheData.ashx?OrgNo='+logonUser.orgNo});
						dlFiles.push({fn: '/WEDEP/GetTreeClsCacheData.ashx?OrgNo='+logonUser.orgNo});
						dlFiles.push({fn: '/WEDEP/GetTreeCaseCacheData.ashx?OrgNo='+logonUser.orgNo});
						dlFiles.push({fn: '/WEDEP/GetClsCacheData.ashx?OrgNo='+logonUser.orgNo});
						dlFiles.push({fn: '/WEDEP/GetCaseCacheData.ashx?OrgNo='+logonUser.orgNo});
					})
					.then(doStartDL);
				}
				else {
					console.error("未cache前一次連線模式下的GetUserInfo的Profile資訊");
				}
			});
		}
		function doStartDL() {
			// 1100907 Raymond 1100394 caches.open搬到fetchRsrcFile外, cache做為參數傳入fetchRsrcFile
			var t0 = new Date();
			 caches.open(version + 'posts')
			.then(function add(cache) {
				console.log('%cWORKER: caches.open', clrInstall, version + 'posts', '完成, 耗時' + (new Date() - t0) + 'ms');
				let nTotal = dlFiles.length, nDownloaded = 0, i = 0;
				function doDownload() {
					if(i == nTotal) {	// complete
						proceedNextDownload();
					}
					else if(!!dlFiles[i].ph) {
						let cachedKey = wsdl.substr(wsdl.indexOf('/WebFileIO')) + '?method=WebFileIO&path=' + dlFiles[i].ph + '&file=' + dlFiles[i].fn;
						fetchRsrcFile(wsdl, {path: dlFiles[i].ph, file: dlFiles[i].fn}, cachedKey, cache)	// 1100907 Raymond caches.open得到的cache做為參數傳入fetchRsrcFile
						.then(data => {
							//console.log(data);
							nDownloaded++;
							if(offlineMode == false && !!logonUser.clientId) {	// 通知安裝進度
								return self.clients.get(logonUser.clientId)
										.then(client => {
											client.postMessage(JSON.stringify({action: "progress", downloadedFiles: nDownloaded, fileName: dlFiles[i++].fn, totalFiles: nTotal, title: "安裝離線版公文製作(2)"}));
										});
							}
							else
								++i;
						})
						.then(doDownload)
						.catch(err => {
							console.error(err, err.name);
						});
					}
					else {	// 沒有ph是直接用GET的資源檔
						let cachedKey = dlFiles[i].fn;
						t0 = new Date();	// 1100902 Raymond for註記完成下載時間
						fetch(cachedKey)
						.then(response => {
							if(!response.ok)	// fetch下載失敗不會觸發reject, 而是用response.ok=false來反應
								console.error("下載" + cachedKey + "失敗! " + response.statusText + "(" + response.status + ")", response);
							else {
								// 1100902 Raymond 註記完成下載時間及檔案大小
								console.log('%cWORKER: 下載', clrInstall, cachedKey, '完成, Content-Type:' + response.headers.get("Content-Type") + '(' + response.headers.get("Content-Length") + 'Bytes), 耗時' + (new Date() - t0) + 'ms');
								t0 = new Date();
								return cache.put(cachedKey, response);
							}
						})
						.then(function() {
							// 1100902 Raymond 註記完成時間及Cache已使用容量
							console.log('%cWORKER: cache.put', clrInstall, cachedKey, '完成, 耗時' + (new Date() - t0) + 'ms');
							if ('storage' in navigator && 'estimate' in navigator.storage) {
								navigator.storage.estimate().then(({usage, quota}) => {
									console.log('%cWORKER: Using', clrInstall, usage, 'out of', quota, 'bytes');
								}).catch(error => {
									console.error('Loading storage estimate failed:');
									console.log(error.stack);
								});
							}
							nDownloaded++;
							if(offlineMode == false && !!logonUser.clientId) {	// 通知安裝進度
								return self.clients.get(logonUser.clientId)
										.then(client => {
											client.postMessage(JSON.stringify({action: "progress", downloadedFiles: nDownloaded, fileName: dlFiles[i++].fn, totalFiles: nTotal, title: "安裝離線版公文製作(2)"}));
										});
							}
							else
								++i;
						})
						.then(doDownload)
						.catch(err => {
							console.error(err, err.name);
							nDownloaded++;
							i++;
							doDownload();	// 下載非資源檔錯誤也繼續下載下個
						});
					}
				}
				if(offlineMode == false && !!logonUser.clientId) {	// 通知安裝進度
					self.clients.get(logonUser.clientId)
							.then(client => {
								client.postMessage(JSON.stringify({action: "install", totalFiles: nTotal, title: "安裝離線版公文製作(2)"}));
							})
							.then(doDownload);
				}
				else
					doDownload();
			});
			
			function proceedNextDownload() {
				// 呼叫getPublicRsrc
				let cachedKey = '/WEDEP/webeditws02.asmx?method=getPublicRsrc&OrgNo=' + logonUser.currUserInfo.OrgID;
				let bodystr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getPublicRsrc xmlns="T2100">\
	<Artifact>' + logonUser.SAMLart + '</Artifact><UserID>' + logonUser.id + '</UserID><OrgID>' + logonUser.orgNo + '</OrgID><DeptID>' + logonUser.currUserInfo.DepartID + '</DeptID>\
	<Path4Profile>' + logonUser.currUserInfo.Path4Profile + '</Path4Profile><WSDL4Profile>' + logonUser.currUserInfo.WSDL4Profile + '</WSDL4Profile></getPublicRsrc></soap:Body></soap:Envelope>';
				fetch('/WEDEP/webeditws02.asmx', {
					body: bodystr, // must match 'Content-Type' header
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, same-origin, *omit
					headers: {
						'user-agent': 'Mozilla/4.0 MDN Example',
						'content-type': 'text/xml; charset=UTF-8'
					},
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, cors, *same-origin
					redirect: 'follow', // manual, *follow, error
					referrer: 'no-referrer', // *client, no-referrer
				})
				.then(response => {
					if(debugMsg) {
						console.log('%cWORKER-test: 從線上fetch到response.[POST]' + url, clrFetch, response);
					}
					var cacheCopy = response.clone();
					// 側錄POST Response的body
					const rdr = cacheCopy.clone().body.getReader();
					var txt = "";
					// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
					var tmp = undefined;
					function push() {
						rdr.read().then(({done, value}) => {
							if(done) {
								// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
								if(!!tmp)
									txt = (new TextDecoder()).decode(tmp);
								else
									console.error('%cWORKER-test: getPublicRsrc未讀取到任何資料', clrFetch);
								//console.log("%cWORKER-test: response body:", clrFetch, txt);
								if(txt.match(/<soap:Body><(\w+) /)) {	// SOAP form
									var resObj = parseSOAPResponse(txt, RegExp.$1);
									console.debug('%cWORKER-test: result:', clrFetch, resObj);
									dispatchResponse(resObj, cacheCopy);
								}
								else if(txt.match(/^\{/)) {	// JSON form
									var resObj = parseJSONResponse(txt, wsfn);
									console.debug('%cWORKER-test: result:', clrFetch, resObj);
									dispatchResponse(resObj);
								}
								return;
							}
							if(value instanceof Uint8Array) {
								// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
								//txt += (new TextDecoder()).decode(value);
								if(!tmp)
									tmp = value;
								else
									tmp = concatTypedArrays(tmp, value);
							}
							//else
							//	console.log("%cWORKER-test: response body:", clrFetch, value);
							push();
						});
					}
					push();
					return response;
				});
			}	// end of proceedNextDownload()
		}	// end of doStartDL()
	}
	//event.source.postMessage("Hi client");
});
// Utilities
// copy from jQuery.fn.extend@jquery.js
function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

// copy from utf7.js
(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Utf7 = factory();
    }
}(this, function() {
    'use strict';

    function encode(str) {
        var b = new Uint8Array(str.length * 2),
            octets = '',
            i, bi, len, c, encoded;

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
        if (/*typeof window !== 'undefined' &&*/ btoa) {	// 1100722 Raymond ServiceWorker沒有window但有btoa
            encoded = btoa(octets);
        } else {
            encoded = (new Buffer(octets, "binary")).toString("base64");
        }
        return encoded.replace(/=+$/, '');
    }

    function decode(str) {
        var octets = '',
            r = [];

        if (/*typeof window !== 'undefined' &&*/ atob) {	// 1100722 Raymond ServiceWorker沒有window但有atob
            octets = atob(str);
        } else {
            octets = (new Buffer(str || "", "base64")).toString("binary");
        }

        for (var i = 0, len = octets.length; i < len;) {
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
        encode: function(str, mask) {
            // Generate a RegExp object from the string of mask characters.
            if (!mask) {
                mask = '';
            }
            if (!regexes[mask]) {
                regexes[mask] = new RegExp('[^' + setD + escape(mask) + ']+', 'g');
            }

            // We replace subsequent disallowed chars with their escape sequence.
            return str.replace(regexes[mask], function(chunk) {
                // + is represented by an empty sequence +-, otherwise call encode().
                return '+' + (chunk === '+' ? '' : encode(chunk)) + '-';
            });
        },

        // RFC 2152 UTF-7 encoding with all optionals.
        encodeAll: function(str) {
            // We replace subsequent disallowed chars with their escape sequence.
            return str.replace(regexAll, function(chunk) {
                // + is represented by an empty sequence +-, otherwise call encode().
                return '+' + (chunk === '+' ? '' : encode(chunk)) + '-';
            });
        },

        // RFC 2152 UTF-7 decoding.
        decode: function(str) {
			// 2015-1-15 - Raymond fixed, 有些中文encode後會有+號, 所以原過濾函式只挑A-Za-z0-9/這63字元, 少了+, 會導致被編碼成有+字元的中文字被截斷而無法還原成原來的中文字
            //return str.replace(/\+([A-Za-z0-9\/]*)-?/gi, function(_, chunk) {
            return str.replace(/\+([A-Za-z0-9\+\/]*)-?/gi, function(_, chunk) {
                // &- represents &.
                if (chunk === '') {
                    return '+';
                }
                return decode(chunk);
            });
        },

        imap: {
            // RFC 3501, section 5.1.3 UTF-7 encoding.
            encode: function(str) {
                // All printable ASCII chars except for & must be represented by themselves.
                // We replace subsequent non-representable chars with their escape sequence.
                return str.replace(/&/g, '&-').replace(/[^\x20-\x7e]+/g, function(chunk) {
                    // & is represented by an empty sequence &-, otherwise call encode().
                    chunk = (chunk === '&' ? '' : encode(chunk)).replace(/\//g, ',');
                    return '&' + chunk + '-';
                });
            },

            // RFC 3501, section 5.1.3 UTF-7 decoding.
            decode: function(str) {
                return str.replace(/&([^-]*)-/g, function(_, chunk) {
                    // &- represents &.
                    if (chunk === '') {
                        return '&';
                    }
                    return decode(chunk.replace(/,/g, '/'));
                });
            }
        }
    };
}));

function parseAttr(str, fncb) {
	let nS = 0;
	let m = str.match(/=(['"])/);
	while(m) {
		let qE = str.substr(nS + m.index + 2).indexOf(m[1]);
		fncb(str.substr(nS, m.index).trim(), str.substr(nS + m.index + 2).substring(0, qE));
		
		nS += m.index + 2 + qE + 1;
		m = str.substr(nS).match(/=(['"])/);
	}
}

// 解讀SOAP message
function parseSOAPParam(str) {
	if(debugMsg) {
		if(str.length > 300)
			console.debug('%cWORKER-test: parsing...', clrFetch, str.substr(0, 100) + '...' + str.substr(str.length - 100) + '(' + str.length + ')');
		else
			console.debug('%cWORKER-test: parsing...', clrFetch, str);
	}
	let ol = str.length;
	if(ol) {
		let p0 = str.indexOf('<');
		if(p0 >= 0) {
			let res = {},
				parname, parnamestr,
				strp = str.substr(p0 + 1),
				p1 = strp.indexOf('<'), p2,
				pE = strp.indexOf('/>');
			if(pE >= 0 && (p1 < 0 || pE < p1)) {	// matchs <parname/>
				parnamestr = strp.substring(p0, pE).trim();
				p2 = parnamestr.indexOf(' ');
				if(p2 > 0) {
					parname = parnamestr.substr(0, p2);
					// TODO: 尚未解讀屬性
					if(parname == '檔案') {
						parseAttr(parnamestr.substring(p2 + 1), function(attnm, val) {
							if(debugMsg) {
								console.log('%cWORKER-test: SOAP message 資源' + attnm, clrFetch, val);
							}
							if(!res[parname])		// 子節點及文字內容應該比屬性晚解析
								res[parname] = {};	// 改成物件
							res[parname]['@' + attnm] = val;
						});
					}
				}
				else
					parname = parnamestr;
				if(typeof res[parname] === 'object')
					res[parname].textContent = "";
				else
					res[parname] = "";
				str = strp.substr(pE + 2);
				if(debugMsg) {
					console.debug('%cWORKER-test: orig:' + ol + ' - parsed:' + (p0 + pE + 3) + ' = ' + (ol - p0 - pE - 3) + ', substr:' + str.length + ', correct:', clrFetch, ((ol - p0 - pE - 3) == str.length));
				}
			}
			else {	// matchs <parname></parname>
				p1 = strp.indexOf('>');
				parnamestr = strp.substring(0, p1).trim();
				p2 = parnamestr.indexOf(' ');
				if(p2 > 0) {
					parname = parnamestr.substr(0, p2);
					// TODO: 尚未解讀屬性
				}
				else
					parname = parnamestr;
				// 排除remark掉的
				if(parname.match(/^\!\-\-/)) {
					pE = strp.indexOf('-->');
					if(pE < 0) {
						console.error('%cWORKER-test: SOAP message 找不到remark[' + parname + ']的結束標籤!', clrFetch);
						return res;
					}
					else {
						str = strp.substr(pE + 3);
						if(debugMsg) {
							console.debug('%cWORKER-test: orig:' + ol + ' - parsed:' + (p0 + pE + 4) + ' = ' + (ol - p0 - pE - 4) + ', substr:' + str.length + ', correct:', clrFetch, ((ol - p0 - pE - 4) == str.length));
						}
					}
				}
				else {
					pE = strp.indexOf('</' + parname + '>');
					if(pE < 0) {
						console.error('%cWORKER-test: SOAP message 找不到參數[' + parname + ']的結束標籤!', clrFetch);
						return res;
					}
					else {
						if(parname == '資源') {
							parseAttr(parnamestr.substring(p2 + 1), function(attnm, val) {
								if(debugMsg) {
									console.log('%cWORKER-test: SOAP message 資源' + attnm, clrFetch, val);
								}
								if(!res[parname])		// 子節點及文字內容應該比屬性晚解析
									res[parname] = {};	// 改成物件
								res[parname]['@' + attnm] = val;
							});
						}
						else if(parname == '子目錄') {
							parseAttr(parnamestr.substring(p2 + 1), function(attnm, val) {
								if(debugMsg) {
									console.log('%cWORKER-test: SOAP message 資源' + attnm, clrFetch, val);
								}
								if(!res[parname])		// 子節點及文字內容應該比屬性晚解析
									res[parname] = {};	// 改成物件
								res[parname]['@' + attnm] = val;
							});
						}
						else if(parname == '檔案') {
							parseAttr(parnamestr.substring(p2 + 1), function(attnm, val) {
								if(debugMsg) {
									console.log('%cWORKER-test: SOAP message 資源' + attnm, clrFetch, val);
								}
								if(!res[parname])		// 子節點及文字內容應該比屬性晚解析
									res[parname] = {};	// 改成物件
								res[parname]['@' + attnm] = val;
							});
						}
						// 把相同名稱的子節點抵消掉才是真的本節點結束位置
						let r = new RegExp('<' + parname + '[ >]', 'g');
						let pDup = strp.search(r);
						while(pDup > 0 && pDup < pE) {
							let pNxtE = strp.substr(pE + parname.length + 3).indexOf('</' + parname + '>');
							if(pNxtE < 0) {
								console.error('%cWORKER-test: SOAP message 找不到參數[' + parname + ']的結束標籤!', clrFetch);
								return res;
							}
							pE = pNxtE + pE + parname.length + 3;
							let pNxtDup = strp.substr(pDup + parname.length + 2).search(r);
							if(pNxtDup < 0)
								break;
							pDup = pNxtDup + pDup + parname.length + 2;
						}
						let ctx = strp.substring(p1 + 1, pE);
						if(debugMsg) {
							console.debug('%cWORKER-test: parsing child:', clrFetch, ctx.length);
						}
						if(typeof res[parname] === 'object') {
							parsedChild = arguments.callee.call(this, ctx);
							extend(res[parname], parsedChild);
						}
						else
							res[parname] = arguments.callee.call(this, ctx);
						str = strp.substr(pE + parname.length + 3);
						if(debugMsg) {
							console.debug('%cWORKER-test: orig:' + ol + ' - parsed:' + (p0 + pE + parname.length + 4) + ' = ' + (ol - p0 - pE - parname.length - 4) + ', substr:' + str.length + ', correct:', clrFetch, ((ol - p0 - pE - parname.length - 4) == str.length));
						}
					}
				}
			}
			// next elem
			if(str.length) {
				let nxtPar = arguments.callee.call(this, str);
				if(typeof nxtPar === "object") {
					if(parname in nxtPar) {	// 下個物件是相同名稱
						if(Array.isArray(res[parname])) {	// 本物件已是陣列, 則直接加入下個物件
							res[parname].push(nxtPar[parname]);
							delete nxtPar[parname];
						}
						else if(typeof res[parname] === 'object' || typeof res[parname] === 'string') {	// 本物件仍是物件或字串, 則改為陣列
							res[parname] = [ res[parname] ];
							if(Array.isArray(nxtPar[parname]))	// 下個物件是陣列的話, 合併
								res[parname] = res[parname].concat(nxtPar[parname]);
							else
								res[parname].push(nxtPar[parname]);	// 再加入下個物件
							delete nxtPar[parname];
						}
						else
							console.warn('%cWORKER-test: 本物件type:' + typeof res[parname] + ' 尚未處理', clrFetch);
					}
					extend(res, nxtPar);
				}
				else
					console.error('%cWORKER-test: SOAP message 下個參數不是物件(' + (typeof nxtPar) + ')!', clrFetch);
			}
			return res;
		}
		else {
			//console.error('%cWORKER-test: SOAP message 找不到任何開始標籤!', clrFetch);
			return str;
		}
	}
	return "";
}

function parseSOAPRequest(txt, mthd) {
	if(txt.length) {
		let p0 = txt.indexOf('<' + mthd);
		if(p0 >= 0) {
			let txtp = txt.substr(p0 + mthd.length + 1);
			let p1 = txtp.indexOf('<');
			let pE = txtp.indexOf('/>');
			if(pE >= 0 && pE < p1)	// matchs <mthd/>
				return {method: mthd, param: ""};
			else {
				p1 = txtp.indexOf('>');
				pE = txtp.indexOf('</' + mthd + '>');
				if(pE < 0)
					console.error('%cWORKER-test: SOAP message 找不到method[' + mthd + ']的結束標籤!', clrFetch);
				else
					return {method: mthd, param: parseSOAPParam(txtp.substring(p1 + 1, pE))};
			}
		}
		else
			console.error('%cWORKER-test: SOAP message 找不到method[' + mthd + ']的開始標籤!', clrFetch);
	}
	return {method: mthd, param: ""};
}

// 解讀JSON request parameter
function parseJSONRequest(txt, mthd) {
	if(txt.length)
		return {method: mthd, param: JSON.parse(txt)};
	return {method: mthd, param: ""};
}

// 解讀SOAP message
function parseSOAPResponse(txt, mthd) {
	if(txt.length) {
		if(debugMsg) {
			console.debug('%cWORKER-test: SOAP message 搜尋method[' + mthd + ']', clrFetch);
		}
		let mthdResult = mthd.replace('Response', 'Result');
		if(mthdResult != mthd && txt.indexOf('<' + mthdResult) >= 0) {
			if(debugMsg) {
				console.debug('%cWORKER-test: SOAP message 變更搜尋method[' + mthdResult + ']', clrFetch);
			}
			mthd = mthdResult;
		}
		let p0 = txt.indexOf('<' + mthd);
		if(p0 >= 0) {
			let txtp = txt.substr(p0 + mthd.length + 1);
			let p1 = txtp.indexOf('<');
			let pE = txtp.indexOf('/>');
			if(pE >= 0 && pE < p1)	// matchs <mthd/>
				return {method: mthd, param: ""};
			else {
				p1 = txtp.indexOf('>');
				pE = txtp.indexOf('</' + mthd + '>');
				if(pE < 0)
					console.error('%cWORKER-test: SOAP message 找不到method[' + mthd + ']的結束標籤!', clrFetch);
				else {
					return {method: mthd, param: parseSOAPParam(txtp.substring(p1 + 1, pE))};
				}
			}
		}
		else
			console.error('%cWORKER-test: SOAP message 找不到method[' + mthd + ']的開始標籤!', clrFetch);
	}
	return {method: mthd, param: ""};
}

// 解讀JSON response parameter
function parseJSONResponse(txt, mthd) {
	if(txt.length) {
		var res = JSON.parse(txt);
		if("d" in res && typeof res.d == "string" && res.d.match(/^\{/))
			res = JSON.parse(res.d);
		return {method: mthd, param: res};
	}
	return {method: mthd, param: ""};
}

// 下載經由WebFileIO下載的資源檔
function fetchRsrcFile(url, data, cachedKey, cache) {	// 1100907 Raymond caches.open得到的cache改以參數傳入, 避免反覆caches.open
	// Default options are marked with *
	var t0 = new Date();	// 1100902 Raymond for註記完成下載時間
	return fetch(url, {
		body: composeSOAPMessage(data), // must match 'Content-Type' header
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, same-origin, *omit
		headers: {
			'user-agent': 'Mozilla/4.0 MDN Example',
			'content-type': 'text/xml; charset=UTF-8'
		},
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // *client, no-referrer
	})
	.then(response => {
		// 1100902 Raymond 註記完成下載時間及檔案大小
		console.log('%cWORKER: 下載', clrInstall, cachedKey, '完成, Content-Type:' + response.headers.get("Content-Type") + '(' + response.headers.get("Content-Length") + 'Bytes), 耗時' + (new Date() - t0) + 'ms');
		t0 = new Date();
		var cacheCopy = response.clone();
		// 1100907 Raymond 1100394 加上等待cache.put, 可能非同步同時多筆要put會導致cache未正常加入資料
		return cache.put(cachedKey, cacheCopy)
			.then(function() {
				// 1100902 Raymond 註記完成時間及Cache已使用容量
				console.log('%cWORKER: caches.put', clrInstall, cachedKey, '完成, 耗時' + (new Date() - t0) + 'ms');
				if ('storage' in navigator && 'estimate' in navigator.storage) {
					navigator.storage.estimate().then(({usage, quota}) => {
						console.log('%cWORKER: Using', clrInstall, usage, 'out of', quota, 'bytes');
					}).catch(error => {
						console.error('Loading storage estimate failed:');
						console.log(error.stack);
					});
				}
				
				if(debugMsg) {
					// 側錄POST Response的body
					const rdr = cacheCopy.clone().body.getReader();
					var txt = "";
					function push() {
						rdr.read().then(({done, value}) => {
							if(done) {
								//console.log("%cWORKER-test: response body:", clrFetch, txt);
								if(txt.match(/<soap:Body><(\w+) /)) {	// SOAP form
									var resObj = parseSOAPResponse(txt, RegExp.$1);
									console.debug('%cWORKER-test: result:', clrFetch, resObj);
								}
								else if(txt.match(/^\{/)) {	// JSON form
									var resObj = parseJSONResponse(txt, wsfn);
									console.debug('%cWORKER-test: result:', clrFetch, resObj);
								}
								return;
							}
							if(value instanceof Uint8Array) {
								txt += (new TextDecoder()).decode(value);
							}
							//else
							//	console.log("%cWORKER-test: response body:", clrFetch, value);
							push();
						});
					}
					push();
				}
			})
			.catch(err => {
				console.error(err, err.name);
			});
	});
}

function composeSOAPMessage(data) {
	return '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
<soap:Body><WebFileIO xmlns="http://2100T.com.tw"><argArtifact>' + logonUser.SAMLart + '</argArtifact><argType>2</argType><argFileCollection><argFile>\
<FilePath>' + Utf7.encode(data.path) + '</FilePath><FileName>' + Utf7.encode(data.file) + '</FileName></argFile></argFileCollection><argDeleteSource>0</argDeleteSource></WebFileIO></soap:Body></soap:Envelope>';
}

function getCreateTime() {
	return (new Date()).toISOString();
}

function getExpireTime() {
	return (new Date((new Date()).getTime() + 5 * 60000)).toISOString();
}

// 讀取一個Cache檔案的內容, 以字串非同步回傳
function readCacheContent(cachedItem) {
	return new Promise((resolve, reject) => {
		const rdr = cachedItem.clone().body.getReader();
		var txt = "";
		function push() {
			rdr.read().then(({done, value}) => {
				if(done) {
					resolve(txt);
					return;
				}
				if(value instanceof Uint8Array) {
					txt += (new TextDecoder()).decode(value);
				}
				push();
			});
		}
		push();
	});
}

// end of Utilities

function dispatchDownloadFile(ph, fn) {
	if(fn == "ODWDCM.XML") {	// 目前ODWDCM不是用下載的, 因為在SW組DIME格式有困難, 所以是改在前端
		let bodystr = '<?xml version="1.0" encoding="UTF-8"?>\
<root>\
  <item>\
    <RCV_DATE>' + '1100729' + '</RCV_DATE>\
    <NEW_BY_OU>Y</NEW_BY_OU>\
    <RCV_TYPE />\
    <H_SUBMIT>Y</H_SUBMIT>\
    <MAIL_ADDR />\
    <FROMDOC_TYPE>C</FROMDOC_TYPE>\
    <DOC_CATEGORY>5</DOC_CATEGORY>\
    <FROMORG_DATE />\
    <OU_NAME>檔案科</OU_NAME>\
    <EMP_NAME>系○廠商</EMP_NAME>\
    <DOC_PROPERTY>1</DOC_PROPERTY>\
    <CASE_NO />\
    <B_TYPE_NO>11</B_TYPE_NO>\
    <STEP_NAME />\
    <COMBINE_TYPE />\
    <KEY_WORD />\
    <FILE_YEAR />\
    <FILE_CLS />\
    <KEEP_YEAR />\
    <APPLY_LIMT />\
    <EXTRMVSEC_COND />\
    <EXTRMVSEC_DATE />\
    <RMVSEC_ID />\
    <MERGE />\
    <CLOSE_F>Y</CLOSE_F>\
    <CASE_CON>N</CASE_CON>\
    <CLOSE_TYPE />\
    <FILE_CNT>0</FILE_CNT>\
    <FILE_UNIT>頁</FILE_UNIT>\
    <LEAD_TIME>6</LEAD_TIME>\
    <LT_UOM>天</LT_UOM>\
    <SUM_TYPE>1</SUM_TYPE>\
    <START_DATE />\
    <DOC_SOURCE />\
    <DOC_STATE>01</DOC_STATE>\
    <COORG_NO />\
    <COORG_NAME />\
    <COSIGN_TYPE />\
    <OUT_REMARK />\
    <UPISSUE_WORD />\
    <UPISSUE_NO />\
    <UPISSUE_DATE />\
    <IS_NOTIFY />\
    <FILE_CASE />\
    <APP_SUBJECT />\
    <OTHER_SUBJECT />\
    <DUE_DATE />\
    <ODUE_DATE />\
    <FROM_NO_WORD />\
    <FROM_NO_NO />\
    <APPROVED_DATE />\
    <COWORK_M_USER_NAME />\
    <LOCKRCV_MONTH />\
    <LOCKCLOSE_MONTH />\
    <LOCKTODO_MONTH />\
    <CLOSE_DATE />\
    <COM_STATUS />\
    <DELAMINATE_LVL />\
    <PROXY_TYPE />\
    <MEETING_TYPE>0</MEETING_TYPE>\
    <COORG_NO2 />\
    <COORG_NAME2 />\
    <COORG_NO3 />\
    <COORG_NAME3 />\
    <COORG_NO4 />\
    <COORG_NAME4 />\
    <COORG_NO5 />\
    <COORG_NAME5 />\
    <LAST_UPDATE_PROG />\
    <LAST_UPDATE_TIME />\
    <SET_REAPPLY_OUID />\
    <CAM_EXT_DAY />\
    <CAM_DOC_PROPERTY />\
    <CAM_B_TYPE_NO />\
    <DC_CASE_NO />\
    <IS_THREAD />\
    <COMBINE_TYPE_2 />\
    <COM_NO />\
    <M_COM_CASE_NO />\
    <M_CASE_NO />\
    <LOCK_SETTING />\
    <LOCK_MSG />\
    <CANCEL_APP_ENABLE>N</CANCEL_APP_ENABLE>\
    <FROMORGNO />\
    <POSTCODE />\
    <ADDRESS />\
    <SENDTYPE />\
    <ATTACH />\
    <RCV_TASK />\
    <ISSUE_TASK />\
    <SRC_RCV_NO />\
    <PETITION_CASE_TYPE />\
    <PETITION_HANDLE_TYPE />\
    <EXT_ATTFILE_TYPE />\
    <EXT_ATTFILE_DESC />\
    <DELAY_ATTFILE_DATE />\
    <APP_STATUS>0</APP_STATUS>\
    <F_SIGN_APP_ROLE_ID />\
    <F_SIGN_APP_USER_ID />\
    <F_SIGN_APP_USER_NAME />\
    <T_APP_STATUS />\
    <T_SIGN_APP_ROLE_ID />\
    <T_SIGN_APP_USER_ID />\
    <T_SIGN_APP_USER_NAME />\
  </item>\
</root>';
		return new Response(bodystr, {headers: {'content-type': 'text/xml; charset=UTF-8'}});
	}
}

function dispatchUploadFile(ph, fn) {
	// 目前在離線模式下不允許上傳任何檔案
	return new Response('<h1>Service Unavailable</h1>', {
						status: 503,
						statusText: 'Service Unavailable',
						headers: new Headers({
							'Content-Type': 'text/html'
						})
					});
}

// 當POST fetch事件觸發時, 先解讀Request內容(有SOAP及JSON兩種形式), 再呼叫此函式分別對應不同WS Function的處理
// 回傳結果為附加在URL後做為cachedKey的字串, 若不要cache則回傳false, 回傳true則表示這個接收Response要dispatch處理
// 目前登入及安裝流程:
// 第一次安裝後要以連線模式登入:
// 1a.LogonByPasswordWithLimitsAndOrgNoAndMachineType 取得真實SAMLart, 用/IIWS/AuthWS.asmx?method=LogonByPasswordWithLimitsAndOrgNoAndMachineType&User=%logonUser.orgNo%_%logonUser.id%為Cache Key
// 2a.GetUserInfoForPadbyJSON 使用真實SAMLart取得UserInfo(theSSO.User, 包含環境變數), 用/IIWS/SAML.asmx/GetUserInfoForPadbyJSON?User=%logonUser.orgNo%_%logonUser.id%為Cache Key
// 3a.GetDocInfoListByJSON 不知道這是什麼, 若有呼叫的話, 用/WebFileIO/T2100FileIoService.asmx/GetDocInfoListByJSON為Cache Key
// 4a.ChangeActiveRole/GetActiveRole 不Cache
// 5a.NewDraft 不Cache
// 6a.GetUserInfo 取得UserInfo(theUserInfo, 公文製作用)不Cache
// 7a.GetPublicRsrc 取得Rsrc.xml資訊 用/WEDEP/webeditws02.asmx?method=getPublicRsrc&OrgNo=%logonUser.orgNo%為Cache Key
// 8a.其它檔案的WebFileIO下載及上傳 不Cache
// 第二次即可用同一帳號離線登入:
// 1b.LogonByPasswordWithLimitsAndOrgNoAndMachineType 回傳假SAMLart, 不用前次Cache的資料
// 2b.GetUserInfoForPadbyJSON 回傳前次Cache的真實資料UserInfo(theSSO.User, 包含環境變數)
// 3b.GetDocInfoListByJSON 回傳前次Cache的真實資料
// 4b.ChangeActiveRole/GetActiveRole 多角色切換時會呼叫ChangeActiveRole, 創稿前會用到GetActiveRole
// 5b.NewDraft 創稿
// 6b.GetUserInfo 取得UserInfo(theUserInfo, 公文製作用), 從2a 前次Cache的使用者資訊組成
// 7b.GetPublicRsrc 回傳前次Cache的Rsrc.xml資訊
// 8b.其它檔案的WebFileIO下載及上傳, 上傳一律回應Service Unavailable, 下載僅限有Cache到的檔案, 未Cache到的檔案一律回應Service Unavailable
function dispatchRequest(reqObj, url, referrerPage) {
	if(reqObj.method == 'LogonByPasswordWithLimitsAndOrgNoAndMachineType') {
		console.log('%cWORKER: LogonByPasswordWithLimitsAndOrgNoAndMachineType argAccount:', clrFetch, reqObj.param.argAccount);
		logonUser.orgNo = reqObj.param.argOrgNo;
		logonUser.id = reqObj.param.argAccount;
		console.log('%cWORKER: offlineMode:', clrFetch, offlineMode, 'user:', reqObj.param.argOrgNo + '_' + reqObj.param.argAccount);
		if(!!logonUser.id) {
			if(offlineMode == true) {
				logonUser.SAMLart = '00000000-0000-0000-0000-000000000000';
				logonUser.SAMLartIsReal = false;
				console.log('%cWORKER: 離線模式給假的Artifact:', clrFetch, logonUser.SAMLart);
				// 1120327 Raymond 1111007 配合修改LogonByPasswordWithLimitsAndOrgNoAndMachineType改為JSON格式呼叫
				//return new Response('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Header><wsu:Timestamp xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/07/utility">\
//<wsu:Created>' + getCreateTime() + '</wsu:Created><wsu:Expires>' + getExpireTime() + '</wsu:Expires></wsu:Timestamp></soap:Header><soap:Body><LogonByPasswordWithLimitsAndOrgNoAndMachineTypeResponse xmlns="http://www.2100t.com.tw/webservices/">\
//<LogonByPasswordWithLimitsAndOrgNoAndMachineTypeResult>' + logonUser.SAMLart + '</LogonByPasswordWithLimitsAndOrgNoAndMachineTypeResult></LogonByPasswordWithLimitsAndOrgNoAndMachineTypeResponse></soap:Body></soap:Envelope>', {headers: {'content-type': 'text/xml; charset=UTF-8'}});
				return new Response('{"d":"' + logonUser.SAMLart + '"}', {headers: {'content-type': 'application/json; charset=UTF-8'}});
			}
			else
				return 'User=' + logonUser.orgNo + '_' + logonUser.id;
		}
		return true;	// 回傳true表示這個Request的Response要接收處理, 但不要cache
	}
	else if(reqObj.method == 'GetUserInfoForPadbyJSON') {
		console.log('%cWORKER: 目前登入的使用者:', clrFetch, logonUser);
		console.log('%cWORKER: offlineMode:', clrFetch, offlineMode);
		if(offlineMode && !logonUser.SAMLartIsReal) {
			var cachedKey = '/IIWS/SAML.asmx/GetUserInfoForPadbyJSON?User=' + logonUser.orgNo + '_' + logonUser.id;
			return new Promise((resolve, reject) => {
				caches.match(cachedKey)
				.then(cached => {
					if(cached) {
						// 側錄POST Response的body
						const rdr = cached.clone().body.getReader();
						var txt = "";
						function push() {
							rdr.read().then(({done, value}) => {
								if(done) {
									if(debugMsg) {
										console.log("%cWORKER-test: response body:", clrFetch, txt);
									}
									if(txt.match(/<soap:Body><(\w+) /)) {	// SOAP form
										var resObj = parseSOAPResponse(txt, RegExp.$1);
										if(debugMsg) {
											console.debug('%cWORKER-test: result:', clrFetch, resObj);
										}
										dispatchResponse(resObj, undefined, referrerPage);	// 傳入referrerPage給復原logonUser用
									}
									else if(txt.match(/^\{/)) {	// JSON form
										var resObj = parseJSONResponse(txt, 'GetUserInfoForPadbyJSON');
										if(debugMsg) {
											console.debug('%cWORKER-test: result:', clrFetch, resObj);
										}
										dispatchResponse(resObj, undefined, referrerPage);	// 傳入referrerPage給復原logonUser用
									}
									return;
								}
								if(value instanceof Uint8Array) {
									txt += (new TextDecoder()).decode(value);
								}
								else
									console.error("%cWORKER-test: 尚未處理的response body:", clrFetch, value);
								push();	// 讀下一block
							});
						}
						push();	// 開始讀第一個block
						
						resolve(cached);	// 有前次cache的使用者資訊就回傳
					}
					else {	// 找不到前次連線登入時cached的使用者資訊
						console.warn("%cWORKER: 找不到前次連線登入時cached的使用者資訊(" + logonUser.orgNo + "_" + logonUser.id + "), 從最近連線登入的帳號複製一筆UserInfo", clrFetch);
						caches.match("/WEDEP/lastUpdatedUser")
						.then(cachedLastUser => {
							if(cachedLastUser) {
								readCacheContent(cachedLastUser)
								.then(lastUpdatedUserKey => {
									console.log("%cWORKER: 最近一次連線登入的使用者", clrFetch, lastUpdatedUserKey);
									caches.match("/IIWS/SAML.asmx/GetUserInfoForPadbyJSON?User=" + lastUpdatedUserKey)
									.then(lastUpdatedUserInfo => {
										if(lastUpdatedUserInfo) {
											console.log("%cWORKER: 複製最近一次連線登入的使用者資訊並初始化", clrFetch, lastUpdatedUserInfo);
											duplicateAndResetUserInfo(lastUpdatedUserInfo)
											.then(newUserInfo => resolve(newUserInfo));
										}
										else {
											console.error("%cWORKER: 找不到最近一次連線登入的使用者資訊", clrFetch);
											resolve('User=' + logonUser.orgNo + '_' + logonUser.id);
										}
									});
								});
							}
							else {	// 沒有Cache到最後一個連線登入的使用者帳號
								console.error("%cWORKER: 找不到最近一次連線登入的使用者資訊", clrFetch);
								resolve('User=' + logonUser.orgNo + '_' + logonUser.id);
							}
						});
					}
				});
			});
		}
		else
			return 'User=' + logonUser.orgNo + '_' + logonUser.id;
	}
	else if(reqObj.method == 'GetDocInfoListByJSON') {
		console.log('%cWORKER: 目前登入的使用者:', clrFetch, logonUser);
	}
	else if(reqObj.method == "ChangeActiveRole") {
		console.log('%cWORKER: 變更使用者單位角色:', clrFetch, reqObj);
		if(offlineMode && !!logonUser.userInfo && !!logonUser.userInfo.AD_Account && !!logonUser.userInfo.AD_Account.m_PlayRoles && !!logonUser.userInfo.AD_Account.m_PlayRoles.Role) {
			if(Array.isArray(logonUser.userInfo.AD_Account.m_PlayRoles.Role)) {
				for(var i=0, n=logonUser.userInfo.AD_Account.m_PlayRoles.Role.length; i<n; i++) {
					let r = logonUser.userInfo.AD_Account.m_PlayRoles.Role[i];
					if(r.m_SuperiorUnit == reqObj.param.argSuperiorOU && r.m_RoleNo == reqObj.param.argRoleNo) {
						console.log('%cWORKER: 角色索引:', clrFetch, i);
						logonUser.activeRoleIdx = i;
						// 將目前使用者及連離線狀態暫存在cache, 若SW發生重置, 則從cache中恢復
						//logonUser.controlPage = referrerPage;	// 記錄控制前端頁面網址, 復原時比對用
						caches.open(version + "posts")
						.then(function add(cache) {
							cache.put("/WEDEP/runtimeOfflineMode", new Response("" + offlineMode, {headers: {'content-type': 'text/plain', 'content-length': offlineMode ? '4' : '5'}}));
							let bodystr = JSON.stringify(logonUser);
							return cache.put("/WEDEP/runtimeLogonUser", new Response(bodystr, {headers: {'content-type': 'text/plain', 'content-length': bodystr.length}}));
						});
						break;
					}
				}
			}
			// 1120509 Raymond 1111007 共通版要改用JSON格式回傳
			/*return new Response('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Header><wsu:Timestamp xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/07/utility">\
<wsu:Created>' + getCreateTime() + '</wsu:Created><wsu:Expires>' + getExpireTime() + '</wsu:Expires></wsu:Timestamp></soap:Header><soap:Body><ChangeActiveRoleResponse xmlns="http://www.2100t.com.tw/webservices/">\
<ChangeActiveRoleResult>true</ChangeActiveRoleResult></ChangeActiveRoleResponse></soap:Body></soap:Envelope>', {headers: {'content-type': 'text/xml; charset=UTF-8'}});*/
			return new Response(JSON.stringify({d: true}), {headers: {'content-type': 'application/json; charset=UTF-8'}});
		}
		return false;	// 不要cache這個request的response
	}
	else if(reqObj.method == "GetActiveRole") {
		console.log('%cWORKER: 取得使用者單位角色:', clrFetch, reqObj);
		if(offlineMode && !!logonUser.userInfo && !!logonUser.userInfo.AD_Account && !!logonUser.userInfo.AD_Account.m_PlayRoles && !!logonUser.userInfo.AD_Account.m_PlayRoles.Role) {
			if(Array.isArray(logonUser.userInfo.AD_Account.m_PlayRoles.Role) && logonUser.activeRoleIdx < logonUser.userInfo.AD_Account.m_PlayRoles.Role.length) {
				console.log('%cWORKER: 目前角色索引:', clrFetch, logonUser.activeRoleIdx);
				let r = logonUser.userInfo.AD_Account.m_PlayRoles.Role[logonUser.activeRoleIdx];
				// 1120509 Raymond 1111007 共通版要改用JSON格式回傳
				/*return new Response('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Header><wsu:Timestamp xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/07/utility">\
<wsu:Created>' + getCreateTime() + '</wsu:Created><wsu:Expires>' + getExpireTime() + '</wsu:Expires></wsu:Timestamp></soap:Header><soap:Body><GetActiveRoleResponse xmlns="http://www.2100t.com.tw/webservices/">\
<GetActiveRoleResult><string>' + r.m_RoleNo + '</string><string>' + r.m_SuperiorUnit + '</string><string>' + logonUser.userInfo.AD_Account.m_SourceOrgNo + '</string></GetActiveRoleResult></GetActiveRoleResponse></soap:Body></soap:Envelope>', {headers: {'content-type': 'text/xml; charset=UTF-8'}});*/
				return new Response(JSON.stringify({d: [r.m_RoleNo, r.m_SuperiorUnit, logonUser.userInfo.AD_Account.m_SourceOrgNo]}), {headers: {'content-type': 'application/json; charset=UTF-8'}});
			}
			else if(typeof logonUser.userInfo.AD_Account.m_PlayRoles.Role === 'object') {	// 只有一個角色
				console.log('%cWORKER: 目前僅一角色:', clrFetch);
				let r = logonUser.userInfo.AD_Account.m_PlayRoles.Role;
				// 1120509 Raymond 1111007 共通版要改用JSON格式回傳
				/*return new Response('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Header><wsu:Timestamp xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/07/utility">\
<wsu:Created>' + getCreateTime() + '</wsu:Created><wsu:Expires>' + getExpireTime() + '</wsu:Expires></wsu:Timestamp></soap:Header><soap:Body><GetActiveRoleResponse xmlns="http://www.2100t.com.tw/webservices/">\
<GetActiveRoleResult><string>' + r.m_RoleNo + '</string><string>' + r.m_SuperiorUnit + '</string><string>' + logonUser.userInfo.AD_Account.m_SourceOrgNo + '</string></GetActiveRoleResult></GetActiveRoleResponse></soap:Body></soap:Envelope>', {headers: {'content-type': 'text/xml; charset=UTF-8'}});*/
				return new Response(JSON.stringify({d: [r.m_RoleNo, r.m_SuperiorUnit, logonUser.userInfo.AD_Account.m_SourceOrgNo]}), {headers: {'content-type': 'application/json; charset=UTF-8'}});
			}
			else
				console.error('%cWORKER: 目前角色索引:', clrFetch, logonUser.activeRoleIdx, '超出角色清單數目(' + logonUser.userInfo.AD_Account.m_PlayRoles.Role.length + ')');
		}
		return false;	// 不要cache這個request的response
	}
	else if(reqObj.method == "NewDraft") {
		console.log('%cWORKER: 新增公文:', clrFetch, reqObj.param, logonUser);
		if(offlineMode && !!logonUser.userInfo && !!logonUser.userInfo.AD_Account && !!logonUser.userInfo.AD_Account.m_PlayRoles && !!logonUser.userInfo.AD_Account.m_PlayRoles.Role &&
			((Array.isArray(logonUser.userInfo.AD_Account.m_PlayRoles.Role) && logonUser.activeRoleIdx < logonUser.userInfo.AD_Account.m_PlayRoles.Role.length) || typeof logonUser.userInfo.AD_Account.m_PlayRoles.Role === 'object')) {
			let r = Array.isArray(logonUser.userInfo.AD_Account.m_PlayRoles.Role) ? logonUser.userInfo.AD_Account.m_PlayRoles.Role[logonUser.activeRoleIdx] : logonUser.userInfo.AD_Account.m_PlayRoles.Role;
			let ouName = '';
			if(!!logonUser.userInfo.AD_Account.m_MemberOf && logonUser.userInfo.AD_Account.m_MemberOf.Unit && Array.isArray(logonUser.userInfo.AD_Account.m_MemberOf.Unit)) {
				for(var i=0, n=logonUser.userInfo.AD_Account.m_MemberOf.Unit.length; i<n; i++) {
					let u = logonUser.userInfo.AD_Account.m_MemberOf.Unit[i];
					if(u.m_UnitCode == r.m_SuperiorUnit) {
						ouName = u.m_UnitName;
						break;
					}
				}
			}
			let storagePath = 'C:\\OFFLINEDATA',
				subDir = '100',
				webService = self.origin + '/WebFileIO/T2100FileIoService.asmx';
			// 1120509 Raymond 1111007 共通版要改用JSON格式回傳
			/*let bodystr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Header><wsu:Timestamp xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/07/utility">\
<wsu:Created>' + getCreateTime() + '</wsu:Created><wsu:Expires>' + getExpireTime() + '</wsu:Expires></wsu:Timestamp></soap:Header><soap:Body>\
<NewDraftResponse xmlns="http://www.2100t.com.tw/webservices/"><NewDraftResult><m_bSuccess>true</m_bSuccess><m_strErrMsg />\
<m_strRetStr>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;ODWMSG&gt;&lt;MSG_ID&gt;100&lt;/MSG_ID&gt;\
&lt;DOC_NO /&gt;&lt;THREAD /&gt;&lt;SPEED&gt;1&lt;/SPEED&gt;&lt;SECRETE&gt;1&lt;/SECRETE&gt;&lt;SIGN_TYPE&gt;P&lt;/SIGN_TYPE&gt;\
&lt;MSG_OUT_LMT /&gt;&lt;MSG_ALM_LMT /&gt;&lt;DUE_DATE /&gt;&lt;ALARM_TIME /&gt;&lt;NEW_TIME /&gt;&lt;FROM_OU /&gt;&lt;FROM_OU_ID /&gt;&lt;FROM_USER /&gt;&lt;FROM_ORG /&gt;&lt;FROM_SUBJECT /&gt;\
&lt;SUBJECT /&gt;&lt;OWN_USER_ID&gt;' + logonUser.id + '&lt;/OWN_USER_ID&gt;&lt;OWN_OU_ID&gt;' + r.m_SuperiorUnit + '&lt;/OWN_OU_ID&gt;&lt;OWN_ROLE_ID&gt;' + r.m_RoleNo + '&lt;/OWN_ROLE_ID&gt;\
&lt;OWN_OU_LVL /&gt;&lt;OWN_ROLE_LVL /&gt;&lt;TO_USER_ID&gt;&lt;/TO_USER_ID&gt;&lt;TO_USER_NAME&gt;&lt;/TO_USER_NAME&gt;&lt;TO_OU_ID&gt;&lt;/TO_OU_ID&gt;&lt;TO_OU_NAME&gt;&lt;/TO_OU_NAME&gt;&lt;TO_ROLE_ID&gt;&lt;/TO_ROLE_ID&gt;&lt;TO_ROLE_NAME&gt;&lt;/TO_ROLE_NAME&gt;\
&lt;INCHARGE_OU&gt;' + r.m_SuperiorUnit + '&lt;/INCHARGE_OU&gt;&lt;FOLDER&gt;草稿&lt;/FOLDER&gt;&lt;SUBFOLDER&gt;紙本簽核&lt;/SUBFOLDER&gt;&lt;TX_NAME&gt;&lt;/TX_NAME&gt;&lt;TX_REASON /&gt;&lt;STATUS_FLAG /&gt;&lt;COPY_REQ /&gt;&lt;RE_SIGN /&gt;\
&lt;IC_OU_NAME&gt;' + ouName + '&lt;/IC_OU_NAME&gt;&lt;IC_USER_ID&gt;' + logonUser.id + '&lt;/IC_USER_ID&gt;&lt;IC_USER_NAME&gt;' + logonUser.userInfo.AD_Account.m_Name + '&lt;/IC_USER_NAME&gt;\
&lt;APP_USER_ID /&gt;&lt;APP_USER_NAME /&gt;&lt;APP_ROLE_ID /&gt;&lt;STORAGE_PATH&gt;' + storagePath +  '&lt;/STORAGE_PATH&gt;&lt;SUB_DIR&gt;' + subDir + '&lt;/SUB_DIR&gt;&lt;WEB_SERVICE&gt;' + webService + '&lt;/WEB_SERVICE&gt;&lt;SRV_NO /&gt;&lt;TMP_CER /&gt;&lt;FROM_MSG_ID /&gt;&lt;FROM_THREAD /&gt;&lt;URL /&gt;&lt;SYSID /&gt;&lt;CLOSE_F /&gt;\
&lt;CASE_CON /&gt;&lt;CLOSE_TYPE /&gt;&lt;SOURCE_ORGNO&gt;' + logonUser.userInfo.AD_Account.m_SourceOrgNo + '&lt;/SOURCE_ORGNO&gt;&lt;ORGNAME /&gt;&lt;DOC_STATE&gt;' + '01' + '&lt;/DOC_STATE&gt;&lt;ODUE_DATE /&gt;&lt;TRAN_MARK /&gt;&lt;STORE_TYPE /&gt;&lt;REJECT_USER_NAME /&gt;&lt;RESENT_DUEDATE /&gt;&lt;RESENT_WARNDATE /&gt;&lt;FILE_CNT /&gt;\
&lt;NEW_BY_OU&gt;' + 'Y' + '&lt;/NEW_BY_OU&gt;&lt;FILE_YEAR /&gt;&lt;FILE_CLS /&gt;&lt;KEEP_YEAR /&gt;&lt;KEY_WORD /&gt;&lt;SERVER_DRAFT&gt;' + 'Y' + '&lt;/SERVER_DRAFT&gt;&lt;SIGN_TIME&gt;' + '&lt;/SIGN_TIME&gt;&lt;DRAFT_MSG_ID /&gt;&lt;B_TYPE_NO /&gt;&lt;MEET_DATE /&gt;&lt;IS_OURCV /&gt;&lt;COM_TYPE /&gt;\
&lt;FROM_USER_ID /&gt;&lt;RCV_TYPE /&gt;&lt;MPRULE_EQUAL_CHECK /&gt;&lt;IS_PROXY_DOC /&gt;&lt;CURR_LOCATION /&gt;&lt;FROM_THREAD_MSG_ID /&gt;&lt;OU_RCV_MSG_ID /&gt;&lt;FILE_CASE /&gt;&lt;RCV_DATE /&gt;&lt;WWKF_MARK /&gt;&lt;IS_RCVFILE /&gt;&lt;RCVFILE_CNT /&gt;&lt;BLOCK_NAME /&gt;&lt;SIGN_DUEDATE /&gt;&lt;RCV_NO /&gt;\
&lt;COME_OTHERS /&gt;&lt;ORGNO_OTHERS /&gt;&lt;OTHERS_DOC_NO /&gt;&lt;RESUPPLY_ALM /&gt;&lt;IS_AUDIT /&gt;&lt;/ODWMSG&gt;</m_strRetStr>\
<m_ErrCode>0</m_ErrCode></NewDraftResult></NewDraftResponse></soap:Body></soap:Envelope>';
			return new Response(bodystr, {headers: {'content-type': 'text/xml; charset=UTF-8'}});*/
			let bdy = {d:{
				__type: "OD.RtnObject",
				m_bSuccess: true,
				m_strErrMsg: "",
				m_strRetStr: '<?xml version="1.0" encoding="UTF-8"?><ODWMSG><MSG_ID>100</MSG_ID>\
<DOC_NO /><THREAD /><SPEED>1</SPEED><SECRETE>1</SECRETE><SIGN_TYPE>P</SIGN_TYPE>\
<MSG_OUT_LMT /><MSG_ALM_LMT /><DUE_DATE /><ALARM_TIME /><NEW_TIME /><FROM_OU /><FROM_OU_ID /><FROM_USER /><FROM_ORG /><FROM_SUBJECT />\
<SUBJECT /><OWN_USER_ID>' + logonUser.id + '</OWN_USER_ID><OWN_OU_ID>' + r.m_SuperiorUnit + '</OWN_OU_ID><OWN_ROLE_ID>' + r.m_RoleNo + '</OWN_ROLE_ID>\
<OWN_OU_LVL /><OWN_ROLE_LVL /><TO_USER_ID></TO_USER_ID><TO_USER_NAME></TO_USER_NAME><TO_OU_ID></TO_OU_ID><TO_OU_NAME></TO_OU_NAME><TO_ROLE_ID></TO_ROLE_ID><TO_ROLE_NAME></TO_ROLE_NAME>\
<INCHARGE_OU>' + r.m_SuperiorUnit + '</INCHARGE_OU><FOLDER>草稿</FOLDER><SUBFOLDER>紙本簽核</SUBFOLDER><TX_NAME></TX_NAME><TX_REASON /><STATUS_FLAG /><COPY_REQ /><RE_SIGN />\
<IC_OU_NAME>' + ouName + '</IC_OU_NAME><IC_USER_ID>' + logonUser.id + '</IC_USER_ID><IC_USER_NAME>' + logonUser.userInfo.AD_Account.m_Name + '</IC_USER_NAME>\
<APP_USER_ID /><APP_USER_NAME /><APP_ROLE_ID /><STORAGE_PATH>' + storagePath +  '</STORAGE_PATH><SUB_DIR>' + subDir + '</SUB_DIR><WEB_SERVICE>' + webService + '</WEB_SERVICE><SRV_NO /><TMP_CER /><FROM_MSG_ID /><FROM_THREAD /><URL /><SYSID /><CLOSE_F />\
<CASE_CON /><CLOSE_TYPE /><SOURCE_ORGNO>' + logonUser.userInfo.AD_Account.m_SourceOrgNo + '</SOURCE_ORGNO><ORGNAME /><DOC_STATE>' + '01' + '</DOC_STATE><ODUE_DATE /><TRAN_MARK /><STORE_TYPE /><REJECT_USER_NAME /><RESENT_DUEDATE /><RESENT_WARNDATE /><FILE_CNT />\
<NEW_BY_OU>' + 'Y' + '</NEW_BY_OU><FILE_YEAR /><FILE_CLS /><KEEP_YEAR /><KEY_WORD /><SERVER_DRAFT>' + 'Y' + '</SERVER_DRAFT><SIGN_TIME>' + '</SIGN_TIME><DRAFT_MSG_ID /><B_TYPE_NO /><MEET_DATE /><IS_OURCV /><COM_TYPE />\
<FROM_USER_ID /><RCV_TYPE /><MPRULE_EQUAL_CHECK /><IS_PROXY_DOC /><CURR_LOCATION /><FROM_THREAD_MSG_ID /><OU_RCV_MSG_ID /><FILE_CASE /><RCV_DATE /><WWKF_MARK /><IS_RCVFILE /><RCVFILE_CNT /><BLOCK_NAME /><SIGN_DUEDATE /><RCV_NO />\
<COME_OTHERS /><ORGNO_OTHERS /><OTHERS_DOC_NO /><RESUPPLY_ALM /><IS_AUDIT /></ODWMSG>',
				m_ErrCode: 0}};
			return new Response(JSON.stringify(bdy), {headers: {'content-type': 'application/json; charset=UTF-8'}});
		}
		return false;	// 不要cache這個request的response
	}
	else if(reqObj.method == "GetUserInfo") {
		console.log('%cWORKER: 目前登入的使用者:', clrFetch, logonUser);
		if(offlineMode && !!logonUser.userInfo && !!logonUser.userInfo.AD_Account && !!logonUser.userInfo.AD_Account.m_PlayRoles && !!logonUser.userInfo.AD_Account.m_PlayRoles.Role &&
			((Array.isArray(logonUser.userInfo.AD_Account.m_PlayRoles.Role) && logonUser.activeRoleIdx < logonUser.userInfo.AD_Account.m_PlayRoles.Role.length) || typeof logonUser.userInfo.AD_Account.m_PlayRoles.Role === 'object')) {
			let r = Array.isArray(logonUser.userInfo.AD_Account.m_PlayRoles.Role) ? logonUser.userInfo.AD_Account.m_PlayRoles.Role[logonUser.activeRoleIdx] : logonUser.userInfo.AD_Account.m_PlayRoles.Role;
			let ouName = '', orgName = '';
			if(!!logonUser.userInfo.AD_Account.m_MemberOf && logonUser.userInfo.AD_Account.m_MemberOf.Unit && Array.isArray(logonUser.userInfo.AD_Account.m_MemberOf.Unit)) {
				for(var i=0, n=logonUser.userInfo.AD_Account.m_MemberOf.Unit.length; i<n; i++) {
					let u = logonUser.userInfo.AD_Account.m_MemberOf.Unit[i];
					if(u.m_UnitCode == r.m_SuperiorUnit) {
						ouName = u.m_UnitName;
					}
					else if(u.m_UnitCode == logonUser.userInfo.AD_Account.m_SourceOrgNo) {
						orgName = u.m_UnitName;
					}
				}
			}
			//Leslie	由儲存的使用者資訊取得，或載入登入的使用者資訊
			orgName = logonUser.userInfo.AD_Account.n_OrgName || orgName;	
			ouName = logonUser.userInfo.AD_Account.n_DepartName || ouName;	
			
			let orgAddr = logonUser.userInfo.AD_Account.n_OrgAddr || '',
				tel = logonUser.userInfo.AD_Account.m_OfficePhone,
				telExt = logonUser.userInfo.AD_Account.n_TelExt || '',
				fax = logonUser.userInfo.AD_Account.m_Fax,
				email = logonUser.userInfo.AD_Account.m_Email,
				title = logonUser.userInfo.AD_Account.m_Title;
			let role = '2';	// 2是什麼?
			// 1100903 Raymond 1100394 修正回傳UserInfo的網域不正確, 導致無法登入的問題
			return caches.match("/ProfileInfo")
				.then(cached => {
					if(!!cached) {
						return readCacheContent(cached)
							.then(str => {
								let pfnfo = JSON.parse(str);
								let bodystr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Header><wsu:Timestamp xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/07/utility">\
<wsu:Created>' + getCreateTime() + '</wsu:Created><wsu:Expires>' + getExpireTime() + '</wsu:Expires></wsu:Timestamp></soap:Header><soap:Body>\
<GetUserInfoResponse xmlns="http://tempuri.org/"><GetUserInfoResult><UserID>' + logonUser.id + '</UserID><UserName>' + logonUser.userInfo.AD_Account.m_Name + '</UserName>\
<OrgID>' + logonUser.userInfo.AD_Account.m_SourceOrgNo + '</OrgID><OrgName>' + orgName + '</OrgName><DepartID>' + r.m_SuperiorUnit + '</DepartID><DepartName>' + ouName + '</DepartName>\
<Role>' + role + '</Role><OrgAddr>' + orgAddr + '</OrgAddr><Tel>' + tel + '</Tel><TelExt>' + telExt + '</TelExt><Fax>' + fax + '</Fax><Email>' + email + '</Email>\
<WSDL4Profile>' + pfnfo.WSDL4Profile + '</WSDL4Profile><NS4Profile /><Path4Profile>' + pfnfo.Path4Profile + '</Path4Profile><Filename4Profile>' + pfnfo.Filename4Profile + '</Filename4Profile>\
<WSDL4GetDocContent>' + pfnfo.WSDL4GGetDocContent + '</WSDL4GetDocContent><WSDL4GetDocNo>' + pfnfo.WSDL4GetDocNo + '</WSDL4GetDocNo>\
<WSDL4OnLineView>' + pfnfo.WSDL4OnLineView + '</WSDL4OnLineView><WSDL4ClassNo>' + pfnfo.WSDL4ClassNo + '</WSDL4ClassNo>\
<WSDL4GetIssueNo>' + pfnfo.WSDL4GetIssueNo + '</WSDL4GetIssueNo><Artifact>' + logonUser.SAMLart + '</Artifact>\
<Title>' + title + '</Title><RoleID>' + r.m_RoleNo + '</RoleID><RsrcMgntLastModifiedTime /><OrgNickName>' + logonUser.userInfo.AD_Account.OrgNickName + '</OrgNickName></GetUserInfoResult></GetUserInfoResponse></soap:Body></soap:Envelope>';
								return new Response(bodystr, {headers: {'content-type': 'text/xml; charset=UTF-8'}});
							});
					}
					else {
						console.error("未cache前一次連線模式下的GetUserInfo的Profile及其他網址資訊");
						return new Response('<h1>未cache前一次連線模式下的GetUserInfo的Profile及其他網址資訊</h1>', {
												status: 503,
												statusText: 'Service Unavailable',
												headers: new Headers({
													'Content-Type': 'text/html'
												})
											});
					}
				});
		}
		return false;	// 不要cache這個request的response
	}
	else if(offlineMode == false) {	// 若離線模式未被啟用, 則一律不處理接下來的所有Request
		return false;
	}
	else if(reqObj.method == "getPublicRsrc") {
		console.log('%cWORKER: 目前登入的使用者機關代碼:', clrFetch, logonUser.orgNo);
		return 'OrgNo=' + logonUser.orgNo;
	}
	else if(reqObj.method == "WebFileIO") {
		let fn = Utf7.decode(reqObj.param.argFileCollection.argFile.FileName);
		let ph = Utf7.decode(reqObj.param.argFileCollection.argFile.FilePath);
		if(reqObj.param.argType == '2')
			console.log('%cWORKER: ' + '客戶端要求下載:', clrFetch, ph, fn);
		else if(reqObj.param.argType == '1')
			console.log('%cWORKER: ' + '客戶端要求上傳:', clrFetch, ph, fn);
		else
			console.log('%cWORKER: ' + '客戶端要求(argType=' + reqObj.param.argType + '):', clrFetch, ph, fn);
		// 再分發下去
		let proced = undefined;
		if(reqObj.param.argType == '2') {	// 下載檔案
			proced = dispatchDownloadFile(ph, fn);
		}
		else if(reqObj.param.argType == '1') {	// 上傳檔案
			proced = dispatchUploadFile(ph, fn);
		}
		if(typeof proced !== 'undefined')
			return proced;
		return 'path=' + ph + '&file=' + fn;
	}
	//Leslie	加入分類號及案次號查詢
	else if(reqObj.method == "CheckCls"){
		//Leslie	暫無法解決非同步問題，先用全域物件暫存資源來解決
		return swCheckCls(logonUser.CLASS_DATA, reqObj.param);
		// caches.match('/WEDEP/GetClsCacheData.ashx?OrgNo='+logonUser.orgNo).then(function(r){
			// r.json().then(function(cacheData){
				// return swCheckCls(cacheData.CLASS_DATA, reqObj.param);
			// })
		// })
	}
	else if(reqObj.method == "CheckCase"){
		//Leslie	暫無法解決非同步問題，先用全域物件暫存資源來解決
		return swCheckCls(logonUser.CASE_DATA, reqObj.param);
		// caches.match('/WEDEP/GetCaseCacheData.ashx?OrgNo='+logonUser.orgNo).then(function(r){
			// r.json().then(function(cacheData){
				// return swCheckCase(cacheData.CASE_DATA, reqObj.param);
			// })
		// })
		// return false;
	}
	//David 受文者相關WS
	else if(reqObj.method == "GetDictInfo"){
		return swGetDictInfo(logonUser.ORGMAIN, reqObj.param);
	}
	else if(reqObj.method == "GetOrgbySYSID"){
		reqObj.param.argSeq = "-1";
		reqObj.param.argDocNo = "";
		return swGetOrgbySYSIDWithDLkey(logonUser.ORGMAIN, reqObj.param);
	}
	else if(reqObj.method == "GetOrgbySYSIDWithDLkey"){
		return swGetOrgbySYSIDWithDLkey(logonUser.ORGMAIN, reqObj.param);
	}
	else if(reqObj.method == "GetOrgInfo4AD"){
		reqObj.param.argSeq = "-1";
		reqObj.param.argDocNo = "";
		return swGetOrgInfo4ADWithDLKey(logonUser.ORGMAIN, reqObj.param);
	}
	else if(reqObj.method == "GetOrgInfo4ADWithDLKey"){
		return swGetOrgInfo4ADWithDLKey(logonUser.ORGMAIN, reqObj.param);
	}
	else if(reqObj.method == "ChkGrpNameExt"){
		return swChkGrpNameExt(logonUser.ORGMAIN, reqObj.param);
	}
	else if(reqObj.method == "GetOrgInfoBatch"){
		return swGetOrgInfoBatch(logonUser.ORGMAIN, reqObj.param);
	}
	// 1120508 Raymond 1111007 共通版禁用WSDL改用WebMethodInfo
	else if(reqObj.method == "GetWebMethodInfo") {
		return "MethodName=" + reqObj.param.MethodName;
	}
	//return false;	// 暫時所有aync POST都cache
}

// 當POST fetch事件線上呼叫後, 先解讀Request內容(有SOAP及JSON兩種形式), 再呼叫此函式分別對應不同WS Function的處理
function dispatchResponse(resObj, responseCopy, referrerPage) {
	if(resObj.method == 'LogonByPasswordWithLimitsAndOrgNoAndMachineTypeResult') {
		console.log('%cWORKER: 登入成功取得SAMLart:', clrFetch, resObj.param);
		logonUser.SAMLart = resObj.param;
		logonUser.SAMLartIsReal = true;
	
		/* 1100903 Raymond 1100394 安裝離線版時從postMessage(theUserInfo)@MS-Start.js再下載這6個檔案及GetXXXCacheData.ashx的5個檔案
		// 下載非資源檔
		let dlFiles = [];
		let wsdl = self.origin + '/WebFileIO/T2100FileIoService.asmx';
		//dlFiles.push({ph: 'C:\\PROJECT\\2100Rsrc\\DEFAULT\\sso', fn: 'MPUiSetting.xml'});
		dlFiles.push({ph: 'C:\\\\PROJECT\\\\2100Rsrc\\301000000A\\sso', fn: 'OrgInfo_301000000A.xml'});
		dlFiles.push({ph: 'C:\\\\PROJECT\\\\2100Rsrc\\301000000A\\sso', fn: 'MPRule_301000000A.xml'});
		dlFiles.push({ph: 'C:\\\\PROJECT\\\\2100Rsrc\\DEFAULT\\AOL\\OD', fn: 'ODRPUI.xml'});
		dlFiles.push({ph: 'C:\\Project\\WebEdit\\Rsrc', fn: 'Profile.xml'});
		dlFiles.push({ph: 'C:\\\\PROJECT\\\\2100Rsrc\\301000000A', fn: 'ForceWaterMarkForIssue.JSON'});
		dlFiles.push({ph: 'C:\\PROJECT\\2100Rsrc\\301000000A', fn: 'ForceWatermark.png'});
		for(var i=0; i<dlFiles.length; i++) {
			let cachedKey = '/WebFileIO/T2100FileIoService.asmx' + '?method=WebFileIO&path=' + dlFiles[i].ph + '&file=' + dlFiles[i].fn;
			fetchRsrcFile(wsdl, {path: dlFiles[i].ph, file: dlFiles[i].fn}, cachedKey)
			//.then(data => console.log(data)) // JSON from `response.json()` call
			.catch(error => console.error(error));
		}*/
	}
	else if(resObj.method == 'GetUserInfoForPadbyJSON') {
		console.log('%cWORKER: 線上取得使用者資訊:', clrFetch, resObj.param);
		logonUser.userInfo = resObj.param;
		logonUser.activeRoleIdx = 0;
		// 將目前使用者及連離線狀態暫存在cache, 若SW發生重置, 則從cache中恢復
		logonUser.controlPage = referrerPage;	// 記錄控制前端頁面網址, 復原時比對用
		var t0 = new Date();
		caches.open(version + "posts")
		.then(function add(cache) {
			console.log('%cWORKER: caches.open', clrFetch, version + 'posts', '完成, 耗時' + (new Date() - t0) + 'ms');
			t0 = new Date();
			cache.put("/WEDEP/runtimeOfflineMode", new Response("" + offlineMode, {headers: {'content-type': 'text/plain', 'content-length': offlineMode ? '4' : '5'}}));
			// 1100904 Raymond 1100394 保留runtimeLogonUser的時間點, 可能CLASS_DATA, CASE_DATA, ORGMAIN還沒有加進去, 所以移到最後
			//let bodystr = JSON.stringify(logonUser);
			//return cache.put("/WEDEP/runtimeLogonUser", new Response(bodystr, {headers: {'content-type': 'text/plain', 'content-length': bodystr.length}}));
		})
		.then(function() {
			console.log('%cWORKER: cache.put', clrFetch, "/WEDEP/runtimeOfflineMode", '完成, 耗時' + (new Date() - t0) + 'ms');
		});
		
		//Leslie	事先取得Cache資料
		console.log('%cWORKER: 取得暫存資源[分類、受文者]:', clrFetch, resObj.param);
		var t1 = new Date();
		caches.match('/WEDEP/GetClsCacheData.ashx?OrgNo='+logonUser.orgNo).then(function(r){
			console.log('%cWORKER: caches.match', clrFetch, '/WEDEP/GetClsCacheData.ashx?OrgNo='+logonUser.orgNo, '完成, 耗時' + (new Date() - t1) + 'ms');
			t1 = new Date();
			r.json().then(function(cacheData){
				console.log('%cWORKER: 取得', clrFetch, 'CLASS_DATA 完成, 耗時' + (new Date() - t1) + 'ms');
				t1 = new Date();
				logonUser.CLASS_DATA = cacheData.CLASS_DATA
			})
		})
		.then(function() {
			return caches.match('/WEDEP/GetCaseCacheData.ashx?OrgNo='+logonUser.orgNo).then(function(r){
				console.log('%cWORKER: caches.match', clrFetch, '/WEDEP/GetCaseCacheData.ashx?OrgNo='+logonUser.orgNo, '完成, 耗時' + (new Date() - t1) + 'ms');
				t1 = new Date();
				return r.json().then(function(cacheData){
					console.log('%cWORKER: 取得', clrFetch, 'CASE_DATA 完成, 耗時' + (new Date() - t1) + 'ms');
					t1 = new Date();
					logonUser.CASE_DATA = cacheData.CASE_DATA
				})
			})
		})
		.then(function() {
			return caches.match('/WEDEP/GetOrgCacheData.ashx?OrgNo='+logonUser.orgNo).then(function(r){
				console.log('%cWORKER: caches.match', clrFetch, '/WEDEP/GetOrgCacheData.ashx?OrgNo='+logonUser.orgNo, '完成, 耗時' + (new Date() - t1) + 'ms');
				t1 = new Date();
				return r.json().then(function(cacheData){
					console.log('%cWORKER: 取得', clrFetch, 'ORGMAIN 完成, 耗時' + (new Date() - t1) + 'ms');
					t1 = new Date();
					logonUser.ORGMAIN = cacheData.ORGMAIN
				})
			})
		})
		// 1100904 Raymond 1100394 保留runtimeLogonUser的時間點, 可能CLASS_DATA, CASE_DATA, ORGMAIN還沒有加進去, 所以移到最後
		.finally(function() {
			caches.open(version + "posts")
			.then(function add(cache) {
				console.log('%cWORKER: caches.open', clrFetch, version + 'posts', '完成, 耗時' + (new Date() - t1) + 'ms');
				t1 = new Date();
				let bodystr = JSON.stringify(logonUser);
				return cache.put("/WEDEP/runtimeLogonUser", new Response(bodystr, {headers: {'content-type': 'text/plain', 'content-length': bodystr.length}}));
			})
			.then(function() {
				console.log('%cWORKER: cache.put', clrFetch, "/WEDEP/runtimeLogonUser", '完成, 耗時' + (new Date() - t1) + 'ms');
			});
		});
	}
	else if(resObj.method == 'GetDocInfoListByJSON') {
		console.log('%cWORKER: 線上取得DocInfoList:', clrFetch, resObj.param);
	}
	else if(resObj.method == "GetUserInfoResult") {
		console.log('%cWORKER: 線上取得(公文製作)使用者資訊:', clrFetch, resObj.param);
	}
	else if(resObj.method == 'getPublicRsrcResult') {
		console.log('%cWORKER: 下載所有資源檔', clrFetch);
		if(logonUser.SAMLartIsReal) {
			console.log(resObj.param['資源']);	// 1120418 Raymond for trace file(Symbol.txt) missing
			downloadAllRsrcFiles(resObj.param['資源'], responseCopy);
		}
	}
	else if(resObj.method == 'NewDraftResult') {
		console.log('%cWORKER: 新增公文成功', clrFetch, resObj);
	}
}

function downloadAllRsrcFiles(resMap, responseCopy) {
	let cachedKey = '/WEDEP/webeditws02.asmx?method=getPublicRsrc&OrgNo=' + logonUser.orgNo;
	caches.match(cachedKey)
	.then(function(cached) {
		if(!!cached) {
			const rdr = cached.clone().body.getReader();
			var txt = "";
			// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
			var tmp = undefined;
			function push() {
				rdr.read().then(({done, value}) => {
					if(done) {
						// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
						if(!!tmp)
							txt = (new TextDecoder()).decode(tmp);
						else
							console.error('%cWORKER-test: getPublicRsrc未讀取到任何資料', clrFetch);
						//console.log("%cWORKER-test: response body:", clrFetch, txt);
						if(txt.match(/<soap:Body><(\w+) /)) {	// SOAP form
							var resObj = parseSOAPResponse(txt, RegExp.$1);
							console.debug('%cWORKER-test: result:', clrFetch, resObj);
							compareDiffAddDownloadList(resObj.param['資源']);
						}
						/*else if(txt.match(/^\{/)) {	// JSON form
							var resObj = parseJSONResponse(txt, wsfn);
							console.debug('%cWORKER-test: result:', clrFetch, resObj);
							dispatchResponse(resObj);
						}*/
						return;
					}
					if(value instanceof Uint8Array) {
						// 1120418 Raymond 1111007 讀取getPublicRsrc的回傳內容時, 會因回傳資料太大而分段讀取的情形, 若讀一段decode一段, 會造成multibyte的字元被切開的問題, 應改為全部讀取完並合併成一整段Uint8Array, 再decode
						//txt += (new TextDecoder()).decode(value);
						if(!tmp)
							tmp = value;
						else
							tmp = concatTypedArrays(tmp, value);
					}
					//else
					//	console.log("%cWORKER-test: response body:", clrFetch, value);
					push();
				});
			}
			push();
		}
		else {	// 無前次getPublicRsrc的cache
			compareDiffAddDownloadList();
		}
	});
	function compareDiffAddDownloadList(prevRsrcMgmt) {
		function compareUpdateDate(d1, d2, fn) {
			/*function toDate(str) {
				if(str.indexOf('上午') >= 0) {
					return new Date(str.replace('上午', '') + ' AM');
				}
				else if(str.indexOf('下午') >= 0) {
					return new Date(str.replace('下午', '') + ' PM');
				}
				return new Date(str);
			}
			let dt1 = toDate(d1), dt2 = toDate(d2);
			let res = dt1 == dt2;
			console.log("比對更新日期:[" + d1 + "](" + dt1 + ")" + "[" + d2 + "](" + dt2 + ")", res, res?"不需更新":"須更新");
			return !res;
			//return toDate(d1) != toDate(d2);*/
			console.log("compareUpdateDate:[" + fn + "](" + d1 + ", " + d2 + ")", d1 == d2, (d1 == d2)?"不需更新":"須更新");
			return {diff: d1 != d2};
		}
		function compareDiff(ph, fn, ud) {
			let dps = ph.split('\\');
			console.log('compareDiff(' + ph + ')', dps, '(' + dps.length + ')');
			let dp = dps.shift();
			if(Array.isArray(prevRsrcMgmt['子目錄'])) {
				let nds = prevRsrcMgmt['子目錄'], found = false, res;
				for(let i=0; i<nds.length; i++) {
					if(nds[i]['@路徑'] == dp) {
						found = true;
						res = compareSubDir(nds[i], dps.join('\\'), fn, ud);
						if(!!res)
							return res.diff;
					}
				}
				if(!found) {
					console.log("找不到對應的子目錄[" + ph.replace(dp, "%c" + dp + "%c") + "], 視為新增", "color:red", "color:black");
				}
				return false;
			}
			function compareSubDir(cursorNd, sph, fn, ud) {
				if(!!sph && sph.length > 0) {
					let subdirs = sph.split('\\');
					let subdir = subdirs.shift();
					if(Array.isArray(cursorNd['子目錄'])) {
						let nds = cursorNd['子目錄'], found = false, res;
						for(let i=0; i<nds.length; i++) {
							if(nds[i]['@路徑'] == subdir) {
								found = true;
								res = compareSubDir(nds[i], subdirs.join('\\'), fn, ud);
								if(!!res)
									return res.diff;
							}
						}
						if(!found)
							console.log("找不到對應的子目錄[" + sph.replace(subdir, "%c" + subdir + "%c") + "], 視為新增", "color:red", "color:black");
					}
					else if(typeof cursorNd['子目錄'] === 'object') {
						if(cursorNd['子目錄']['@路徑'] == subdir) {
							return compareSubDir(cursorNd['子目錄'], subdirs.join('\\'), fn, ud);
						}
						else {
							console.log("找不到對應的子目錄[" + sph.replace(subdir, "%c" + subdir + "%c") + "], 視為新增", "color:red", "color:black");
						}
					}
					else {
						console.log("找不到對應的子目錄[" + sph.replace(subdir, "%c" + subdir + "%c") + "], 視為新增", "color:red", "color:black");
					}
					return false;
				}
				else {
					return compareFile(cursorNd, fn, ud);
				}
				return false;
			}
			function compareFile(cursorNd, fn, ud) {
				if(Array.isArray(cursorNd['檔案'])) {
					let nds = cursorNd['檔案'];
					for(let i=0; i<nds.length; i++) {
						if(nds[i]['@路徑'] == fn) {
							let prevUpdateDate = nds[i]['@更新日期'];
							return compareUpdateDate(prevUpdateDate, ud, fn);
						}
					}
					console.log("找不到對應的檔案[%c" + fn + "%c], 視為新增", "color:red", "color:black");
				}
				else if(typeof cursorNd['檔案'] === 'object') {
					if(cursorNd['檔案']['@路徑'] == fn) {
						let prevUpdateDate = cursorNd['檔案']['@更新日期'];
						return compareUpdateDate(prevUpdateDate, ud, fn);
					}
					else {
						console.log("找不到對應的檔案[%c" + fn + "%c], 視為新增", "color:red", "color:black");
					}
				}
				else {
					console.log("找不到對應檔案[%c" + fn + "%c], 視為新增", "color:red", "color:black");
				}
				return false;
			}
		}
		let dlFiles = [],
			wsdl = resMap['@WSDL'],
			rootPh = resMap['@路徑'];
		function collDlFiles(resNd, parPh) {
			if('檔案' in resNd) {
				if(Array.isArray(resNd['檔案'])) {
					resNd['檔案'].forEach(filNd => {
						// 1130812 Raymond 1130313 新增判斷MapXSL子目錄下的檔案只要下載Data.xml, 其它不需下載
						//if(!!filNd['@路徑']) {
						if(!!filNd['@路徑'] && (resNd['@路徑'] != "MapXSL" || filNd['@路徑'].match(/Data.xml$/i))) {
							if(!prevRsrcMgmt || compareDiff(parPh.replace(rootPh + '\\', ''), filNd['@路徑'], filNd['@更新日期']))	// 找不到子目錄或檔案或更新日期不一致回傳true
								dlFiles.push({ph: parPh, fn: filNd['@路徑']});
						}
					});
				}
				else if(typeof resNd['檔案'] === 'object') {
					// 1130812 Raymond 1130313 新增判斷MapXSL子目錄下的檔案只要下載Data.xml, 其它不需下載
					//if(!!resNd['檔案']['@路徑']) {
					if(!!resNd['檔案']['@路徑'] && (resNd['@路徑'] != "MapXSL" || resNd['檔案']['@路徑'].match(/Data.xml$/i))) {
						if(!prevRsrcMgmt || compareDiff(parPh.replace(rootPh + '\\', ''), resNd['檔案']['@路徑'], resNd['檔案']['@更新日期']))	// 找不到子目錄或檔案或更新日期不一致回傳true
							dlFiles.push({ph: parPh, fn: resNd['檔案']['@路徑']});
					}
				}
				else {
					console.error("hold");
				}
			}
			if('子目錄' in resNd) {
				if(Array.isArray(resNd['子目錄'])) {
					resNd['子目錄'].forEach(dirNd => {
						let cate = "";
						if(!!dirNd['@分類'])
							cate = dirNd['@分類'];
						// 1140815 Raymond 1141232 因1140159共通版_Data.xml搬家了
						// 1130812 Raymond 1130313 共通版_Data.xml沒搬家, 恢復下載"欄位對映"子目錄
						// 1120329 Raymond 1111007 由於機關_Data.xml搬到"欄位選項"(Other)下, "欄位對映"(MapXSL)改為不下載, 故"欄位對映"改為"欄位選項"
						//if(!!dirNd['@路徑'] && cate.match(/樣版|排版設定|匯出設定|其他|署名章戳|騎縫章|欄位對映/) && dirNd['@路徑'] != "StockXSL") {
						if(!!dirNd['@路徑'] && cate.match(/樣版|排版設定|匯出設定|其他|署名章戳|騎縫章|欄位選項/) && dirNd['@路徑'] != "StockXSL") {
							collDlFiles(dirNd, parPh + '\\' + dirNd['@路徑']);
						}
					});
				}
				else if(typeof resNd['子目錄'] === 'object') {
					if(!!resNd['子目錄']['@路徑']) {
						collDlFiles(resNd['子目錄'], parPh + '\\' + resNd['子目錄']['@路徑']);
					}
				}
				else {
					console.error("hold");
				}
			}
		}
		collDlFiles(resMap, rootPh);
		
		console.log('%cWORKER: 所有資源檔:', clrFetch, dlFiles);
		
		// 1100907 Raymond 1100394 caches.open搬到fetchRsrcFile外, cache做為參數傳入fetchRsrcFile
		var t0 = new Date();
		 caches.open(version + 'posts')
		.then(function add(cache) {
			console.log('%cWORKER: caches.open', clrInstall, version + 'posts', '完成, 耗時' + (new Date() - t0) + 'ms');
			let nTotal = dlFiles.length, nDownloaded = 0, i = 0;
			function doDownload() {
				if(i == nTotal) {	// complete
					if(offlineMode == false && !!logonUser.clientId) {	// 通知安裝進度
						self.clients.get(logonUser.clientId)
								.then(client => {
									client.postMessage(JSON.stringify({action: "complete", message: "安裝完成"}));
									// 記憶最後更新完的資源管理檔及機關代碼及使用者帳號
									if(!!responseCopy)
										cache.put(cachedKey, responseCopy);
									cache.put("/WEDEP/lastUpdatedOrgRsrc", new Response(logonUser.orgNo, {headers: {'content-type': 'text/plain'}}));
									cache.put("/WEDEP/lastUpdatedUser", new Response(logonUser.orgNo + '_' + logonUser.id, {headers: {'content-type': 'text/plain'}}));
								});
					}
				}
				else {
					let cachedKey = wsdl.substr(wsdl.indexOf('/WebFileIO')) + '?method=WebFileIO&path=' + dlFiles[i].ph + '&file=' + dlFiles[i].fn;
					fetchRsrcFile(wsdl, {path: dlFiles[i].ph, file: dlFiles[i].fn}, cachedKey, cache)	// 1100907 Raymond caches.open得到的cache做為參數傳入fetchRsrcFile
					.then(data => {
						//console.log(data);
						nDownloaded++;
						if(offlineMode == false && !!logonUser.clientId) {	// 通知安裝進度
							return self.clients.get(logonUser.clientId)
									.then(client => {
										client.postMessage(JSON.stringify({action: "progress", downloadedFiles: nDownloaded, fileName: dlFiles[i++].fn, totalFiles: nTotal, title: "安裝離線版公文製作資源檔"}));
									});
						}
						else
							++i;
					})
					.then(doDownload)
					.catch(error => console.error(error));
				}
			}
			if(offlineMode == false && !!logonUser.clientId) {	// 通知安裝進度
				self.clients.get(logonUser.clientId)
						.then(client => {
							client.postMessage(JSON.stringify({action: "install", totalFiles: nTotal, title: "安裝離線版公文製作資源檔"}));
						})
						.then(doDownload);
			}
			else
				doDownload();
		});
	}
}

function duplicateAndResetUserInfo(refUserInfo) {
	return new Promise((resolve, reject) => {
		readCacheContent(refUserInfo)
		.then(txt => {
			let dat = JSON.parse(txt);
			let d = JSON.parse(dat.d); 
			// 清除
			d.AD_Account.m_Email = "";
			d.AD_Account.m_Fax = "";
			d.AD_Account.m_Name = "";
			d.AD_Account.m_OfficePhone = "";
			d.AD_Account.m_Title = "";
			// 重設/預設
			d.AD_Account.m_Account = logonUser.id;
			d.AD_Account.m_PlayRoles = {Role: [{
				m_Name: "承辦人",
				m_ProxyAccount: "",
				m_ProxyUserName: "",
				m_RoleNo: "OD99",
				m_RoleOccupant: {RoleOccupant: []},
				m_RoleOccupantCount: "0",
				m_SourceOrgNo: logonUser.orgNo,
				m_SuperiorUnit: "00"
			}]};
			let lastUnit = d.AD_Account.m_MemberOf.Unit[d.AD_Account.m_MemberOf.Unit.length - 1];	// 最後一個單位是機關
			d.AD_Account.m_MemberOf = {Unit: [{
				m_Adress: "",
				m_BusinessCategory: "",
				m_Description: "",
				m_Email: "",
				m_EnglishAddr: "",
				m_EnglishName: "",
				m_Fax: "",
				m_InferiorRoles: {InferiorRole: ["OD99"]},
				m_PostalAddress: "",
				m_PostalCode: "",
				m_RecvSendRole: null,
				m_SourceOrgName: lastUnit.m_SourceOrgName,
				m_SourceOrgNo: logonUser.orgNo,
				m_SuperiorUnit: "",
				m_Tel: "",
				m_UnitCode: "00",
				m_UnitMode: "Enable",
				m_UnitName: "離線單位"
			},
			lastUnit]};
			logonUser.userInfo = d;
			logonUser.activeRoleIdx = 0;
			let bodystr = JSON.stringify({d: JSON.stringify(d), isTemp: true});	// 新增isTemp標記這是假的UserInfo
			resolve(new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}}));
		});
	});
}

self.addEventListener("fetch", function(event) {
	console.log('%cWORKER: fetch事件被觸發', clrFetch, event.request.method, event.request.url, event.request.referrer);
	
	/* We should only cache GET requests, and deal with the rest of method in the
	   client-side, by handling failed POST,PUT,PATCH,etc. requests.
	*/
	if (event.request.method !== 'GET') {
		/* If we don't block the event as shown below, then the request will go to
		   the network as usual.
		*/
		var wsfn = event.request.url.substr(event.request.url.lastIndexOf('/') + 1);
		var wsm = event.request.url.substr(0, event.request.url.lastIndexOf('/'));
		if(wsm.match(/.asmx$/))
			wsm = wsm.substr(wsm.lastIndexOf('/') + 1);
		else if(wsfn.match(/.asmx$/)) {
			wsm = wsm.substr(wsm.lastIndexOf('/') + 1) + '/' + wsfn;
			wsfn = "";
		}
		if(debugMsg) {
			console.debug('%cWORKER-test: request url:', clrFetch, wsm);
			console.debug('%cWORKER-test: request func:', clrFetch, wsfn);
		}
		event.respondWith(async function() {
			if(recoverLogonUser) {
				console.error('%cWORKER: SW.js被重置, 正在復原logonUser', clrFetch);
				return recoverPromise.then(doFetchPost);
			}
			else
				return doFetchPost();
			function doFetchPost() {
				return event.request.clone().arrayBuffer().then(ab => {
					// 側錄POST Request的payload
					var u8a = new Uint8Array(ab);
					var txt = (new TextDecoder()).decode(u8a);
					if(debugMsg) {
						console.log("%cWORKER-test: request body:", clrFetch, txt);
					}
					if(txt == "")
						return "";
					else if(txt.match(/<soap:Body><(\w+) /)) {	// SOAP form
						var mthd = "" + RegExp.$1;
						if(debugMsg) {
							console.log("%cWORKER-test: SOAP method'" + mthd + "'", clrFetch);
						}
						if(mthd == "")
							return "";
						var reqObj = parseSOAPRequest(txt, RegExp.$1);
						if(debugMsg) {
							console.debug('%cWORKER-test: request:', clrFetch, reqObj);
						}
						var exurl = dispatchRequest(reqObj, event.request.url, event.request.referrer);	// 傳入referrerPage給復原logonUser用
						if(exurl === false)
							return "";
						else if(exurl === true)
							return "no-cache";
						else if(typeof exurl === "object" && "body" in exurl)	// dispatchRequest()直接回傳一個Response
							return exurl;
						else if(typeof exurl === "object" && exurl instanceof Promise)	// dispatchRequest()回傳了一個Promise物件
							return exurl;
						return event.request.url + "?method=" + mthd + (!!exurl ? '&' + exurl : '');
					}
					else if(txt.match(/^\{/)) {	// JSON form
						if(debugMsg) {
							console.log("%cWORKER-test: JSON param:", clrFetch, txt);
						}
						var reqObj = parseJSONRequest(txt, wsfn);
						if(debugMsg) {
							console.debug('%cWORKER-test: request:', clrFetch, reqObj);
						}
						var exurl = dispatchRequest(reqObj, event.request.url, event.request.referrer);	// 傳入referrerPage給復原logonUser用
						if(exurl === false)
							return "";
						else if(exurl === true)
							return "no-cache";
						else if(typeof exurl === "object" && "body" in exurl)	// dispatchRequest()直接回傳一個Response
							return exurl;
						else if(typeof exurl === "object" && exurl instanceof Promise)	// dispatchRequest()回傳了一個Promise物件
							return exurl;
						return event.request.url + (!!exurl ? '?' + exurl : '');
					}
					return "";
				})
				.then(url => {
					if(url == "") {
						if(debugMsg) {
							console.warn("%cWORKER-test: 無url可Cache, 直接回傳Fetch", clrFetch);
						}
						return fetch(event.request);
					}
					else if(typeof url === "object" && "body" in url) {
						if(debugMsg) {
							console.warn("%cWORKER-test: url是dispatchRequest產生的Response物件, 直接回傳這個Response", clrFetch);
						}
						return url;
					}
					if(debugMsg) {
						console.log("%cWORKER-test: url:", clrFetch, url);
					}
					return caches.match(url)
					.then(function(cached) {
						// 離線模式下且找得到Cache資料則由Cache的response回應, 否刪一律回應Service Unavailable
						if(offlineMode && !logonUser.SAMLartIsReal) {
							console.log('%cWORKER-test: fetch event', clrFetch, '(cached)', '[' + event.request.method + ']' + event.request.url, '(cachedKey:"' + url + '")');
							return cached || new Response('<h1>Service Unavailable</h1>', {
														status: (url.indexOf('method=WebFileIO') >= 0)?404:503,	// 1120418 Raymond 1111007 若是找不到的資源檔, 則回應404及File Not Found(Cache)的錯誤資訊
														statusText: (url.indexOf('method=WebFileIO') >= 0)?'File Not Found(Cache)':'Service Unavailable',	// 1120418 Raymond 1111007 若是找不到的資源檔, 則回應404及File Not Found(Cache)的錯誤資訊
														headers: new Headers({
															'Content-Type': 'text/html'
														})
											});
						}
						// 線上模式則真實呼叫遠端, 需要Cache的資料, 則以url為KEY儲存真實遠端呼叫的Response在CacheStorage中
						var networked = fetch(event.request)
						.then(response => {
							console.log('%cWORKER-test: 從線上fetch到response.[' + event.request.method + ']' + event.request.url, clrFetch, response);
							var cacheCopy = response.clone();
							if(url != "no-cache") {
								caches.open(version + 'posts')
								.then(function add(cache) {
									cache.put(url, cacheCopy);
								})
								.then(function() {
									console.log('%cWORKER-test: fetch到的response保留在cache storage.', clrFetch, url);
								});
							}
							// 側錄POST Response的body
							const rdr = cacheCopy.clone().body.getReader();
							var txt = "";
							function push() {
								rdr.read().then(({done, value}) => {
									if(done) {
										if(debugMsg) {
											console.log("%cWORKER-test: response body:", clrFetch, txt);
										}
										if(txt.match(/<soap:Body><(\w+) /)) {	// SOAP form
											var resObj = parseSOAPResponse(txt, RegExp.$1);
											if(debugMsg) {
												console.debug('%cWORKER-test: result:', clrFetch, resObj);
											}
											dispatchResponse(resObj);
										}
										else if(txt.match(/^\{/)) {	// JSON form
											var resObj = parseJSONResponse(txt, wsfn);
											if(debugMsg) {
												console.debug('%cWORKER-test: result:', clrFetch, resObj);
											}
											dispatchResponse(resObj);
										}
										return;
									}
									if(value instanceof Uint8Array) {
										txt += (new TextDecoder()).decode(value);
									}
									else
										console.error("%cWORKER-test: 尚未處理的response body:", clrFetch, value);
									push();	// 讀下一block
								});
							}
							push();	// 開始讀第一個block
							return response;
						})
						.catch(function(err) {console.error(err);});
						// 一律回傳線上抓到的response, 避免回應上次的response是不同artifact的結果, 造成登入失敗問題
						console.log('%cWORKER-test: fetch event', clrFetch, '(network)', '[' + event.request.method + ']' + event.request.url, '(cachedKey:"' + url + '")');
						return networked;
					});
				});
			}
			//return res;
		}());
		//return;
	}
	else {	// GET
		if(event.request.url.match(/SSO.html|SSO-Ori.html/i)) {	// 開啟連線版登入頁, 強制設為連線模式, 1100908 SSO.html可能存入書籤是小寫的, 從書籤開就會無網頁可顯示的問題, 1130814 共通版的壓縮JS版登入頁是SSO.html, 非壓縮版登入頁是SSO-Ori.html
			console.log('%cWORKER: 瀏覽連線版登入頁, 強制設為連線模式', clrFetch, event.request.url);
			offlineMode = false;
		}
		else if(event.request.url.match(/SSO_Offline.html/)) {	// 開啟離線版登入頁, 強制設為離線模式
			console.log('%cWORKER: 瀏覽離線線版登入頁, 強制設為離線模式', clrFetch, event.request.url);
			offlineMode = true;
		}
		// 1100904 Raymond 1100394 新增從連離線首頁判斷offlineMode是否錯誤並修正
		else if(event.request.url.match(/eDoc.html/) && offlineMode != false) {	// 開啟連線版首頁但offlineMode不是false, 強制設為連線模式
			console.log('%cWORKER: 瀏覽連線版首頁但offlineMode不是false, 強制設為連線模式', clrFetch, event.request.url);
			offlineMode = false;
		}
		else if(event.request.url.match(/eDoc_Offline.html/) && offlineMode != true) {	// 開啟離線版首頁但offlineMode不是true, 強制設為離線模式
			console.log('%cWORKER: 瀏覽離線版首頁但offlineMode不是true, 強制設為離線模式', clrFetch, event.request.url);
			offlineMode = true;
		}
		else if(!!event.request.referrer && event.request.referrer.match(/eDoc_Offline.html/) && offlineMode != true) {	// 由離線版首頁發出的request但offlineMode不是true, 強制設為離線模式
			console.log('%cWORKER: 由離線版首頁發出Request但offlineMode不是true, 強制設為離線模式', clrFetch, event.request.url);
			offlineMode = true;
		}
		if(offlineMode == false) {
			console.log('%cWORKER: 連線模式中不做任何處理', clrFetch);
			return;
		}
		// 所有帶?ver=的GET, 都要改成無網址參數, 因為install的url都是不帶版號的
		var cachedRequest;
		if(event.request.url.indexOf('?ver=') > 0) {
			var cachedurl = event.request.url.substr(0, event.request.url.indexOf('?ver='));
			cachedRequest = new Request(cachedurl);
			//if(debugMsg)
				console.log('%cWORKER-test: 改成無網址參數的', clrFetch, cachedurl, cachedRequest);
		}
		else if(event.request.url.indexOf('?_t=') > 0) {
			var cachedurl = event.request.url.substr(0, event.request.url.indexOf('?_t='));
			cachedRequest = new Request(cachedurl);
			//if(debugMsg)
				console.log('%cWORKER-test: 改成無網址參數的', clrFetch, cachedurl, cachedRequest);
		}
		else if(event.request.url.indexOf('?JobId=') > 0) {	// 1100904 Raymond 1100394 修正RD-AOLPrint.html列印分頁在離線版無法顯示的問題
			var cachedurl = event.request.url.substr(0, event.request.url.indexOf('?JobId='));
			cachedRequest = new Request(cachedurl);
			//if(debugMsg)
				console.log('%cWORKER-test: 改成無網址參數的', clrFetch, cachedurl, cachedRequest);
		}
		else if(event.request.url.match(/\?(SAMLart=)?[\w\d]{8}\-[\w\d]{4}\-/)) {
			var cachedurl = event.request.url.substr(0, event.request.url.indexOf('?'));
			cachedRequest = new Request(cachedurl);
			//if(debugMsg)
				console.log('%cWORKER-test: 改成無網址參數的', clrFetch, cachedurl, cachedRequest);
		}
		// 1140815 Raymond 1141232 因1140556原本RD-AOL.html?後面串權杖格式字串變成了一串數字, 所以增加此判定
		else if(event.request.url.match(/RD-AOL.html\?/)) {
			var cachedurl = event.request.url.substr(0, event.request.url.indexOf('?'));
			cachedRequest = new Request(cachedurl);
			//if(debugMsg)
				console.log('%cWORKER-test: 改成無網址參數的', clrFetch, cachedurl, cachedRequest);
		}
		else
			cachedRequest = event.request;
		/* Similar to event.waitUntil in that it blocks the fetch event on a promise.
		   Fulfillment result will be used as the response, and rejection will end in a
		   HTTP response indicating failure.
		*/
		event.respondWith(
		caches
			/* This method returns a promise that resolves to a cache entry matching
			   the request. Once the promise is settled, we can then provide a response
			   to the fetch request.
			*/
			.match(cachedRequest)
			.then(function(cached) {
				/* Even if the response is in our cache, we go to the network as well.
				   This pattern is known for producing "eventually fresh" responses,
				   where we return cached responses immediately, and meanwhile pull
				   a network response and store that in the cache.
				   Read more:
				   https://ponyfoo.com/articles/progressive-networking-serviceworker
				*/
				if(transparentCache) {	// 啟用背景cache才從線上fetch respone
					var networked = fetch(event.request)
						// We handle the network request with success and failure scenarios.
						.then(fetchedFromNetwork, unableToResolve)
						// We should catch errors on the fetchedFromNetwork handler as well.
						.catch(unableToResolve);

					/* We return the cached response immediately if there is one, and fall
					   back to waiting on the network as usual.
					*/
					console.log('%cWORKER: fetch event', clrFetch, cached ? '(cached)' : '(network)', '[' + event.request.method + ']' + event.request.url);
					return cached || networked;
				}
				else {
					console.log('%cWORKER: fetch event', clrFetch, cached ? '(cached)' : '(NA)', '[' + event.request.method + ']' + event.request.url);
					return cached;
				}

				function fetchedFromNetwork(response) {
					/* We copy the response before replying to the network request.
					   This is the response that will be stored on the ServiceWorker cache.
					*/
					var cacheCopy = response.clone();

					console.log('%cWORKER: 從線上fetch到response.', clrFetch, '[' + event.request.method + ']' + event.request.url);

					caches
					// We open a cache to store the response for this request.
					.open(version + 'posts')
					.then(function add(cache) {
						/* We store the response for this request. It'll later become
						   available to caches.match(event.request) calls, when looking
						   for cached responses.
						*/
						cache.put(event.request, cacheCopy);
					})
					.then(function() {
						console.log('%cWORKER: fetch到的response保留在cache storage.', clrFetch, event.request.url);
					});

					// Return the response so that the promise is settled in fulfillment.
					return response;
				}

				/* When this method is called, it means we were unable to produce a response
				   from either the cache or the network. This is our opportunity to produce
				   a meaningful response even when all else fails. It's the last chance, so
				   you probably want to display a "Service Unavailable" view or a generic
				   error response.
				*/
				function unableToResolve () {
					/* There's a couple of things we can do here.
					 - Test the Accept header and then return one of the `offlineFundamentals`
					   e.g: `return caches.match('/some/cached/image.png')`
					 - You should also consider the origin. It's easier to decide what
					   "unavailable" means for requests against your origins than for requests
					   against a third party, such as an ad provider
					 - Generate a Response programmaticaly, as shown below, and return that
					*/

					console.log('%cWORKER: fetch request failed in both cache and network.', clrFetch);

					/* Here we're creating a response programmatically. The first parameter is the
					   response body, and the second one defines the options for the response.
					*/
					return new Response('<h1>Service Unavailable</h1>', {
						status: 503,
						statusText: 'Service Unavailable',
						headers: new Headers({
							'Content-Type': 'text/html'
						})
					});
				}
			})
		);
	}
});

self.addEventListener("activate", function(event) {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
  console.log('%cWORKER: activate事件被觸發', clrActivate, event);

  event.waitUntil(
    caches
      /* This method returns a promise which will resolve to an array of available
         cache keys.
      */
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log('%cWORKER: activate完成', clrActivate);
      })
  );
});

/**************************************以下為WebMethod處理區**********************************************/
//分類查詢
function swCheckCls(CLASS_DATA, param){
	var rtnObj = {
		KeepYear:"",
		CaseNo:"",
		ClsName:"",
		IsLowest:"",
		ErrorClass:{
			IsErr:false,
			ErrLevel:"",
			Source:"",
			ErrMessage:[]
		}
	}
	
	var sObj = CLASS_DATA.filter(function(cls){
		return cls.CLS_NO==param.ClassNo
	})
	
	if(sObj.length){
		rtnObj.KeepYear = sObj[0].KEEP_YEAR;
		rtnObj.ClsName = sObj[0].CLS_NAME;
		//rtnObj.CaseNo = sObj[0].CLS_NO;
		rtnObj.IsLowest = sObj[0].IS_LOWEST;
		
		if(rtnObj.IsLowest == "0"){
			rtnObj.ErrorClass.IsErr = true;
			rtnObj.ErrorClass.ErrMessage.push('分類號：'+param.ClassNo+'，其下還有其他細分類，請填入細分類號。');
		}
	}
	else{
		rtnObj.ErrorClass.IsErr = true;
		rtnObj.ErrorClass.ErrMessage = '無此分類號：'+param.ClassNo;
	}
	
	let bodystr = JSON.stringify({d: rtnObj});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
}

//案次號查詢
function swCheckCase(CASE_DATA, param){
	var rtnObj = {
		ClsNo:"",
		CaseNo:"",
		ErrorClass:{
			IsErr:false,
			ErrLevel:"",
			Source:"",
			ErrMessage:[]
		}
	}
	
	var sObj = CLASS_DATA.filter(function(cls){
		return cls.CLS_NO==param.ClassNo && cls.CASE_NO == param.CaseNo
	})
	
	if(sObj.length){
		rtnObj.ClsNo = sObj[0].CLS_NO;
		rtnObj.CaseNo = sObj[0].CASE_NO;
	}
	else{
		rtnObj.ErrorClass.IsErr = "true";
		rtnObj.ErrorClass.ErrMessage.push('無此案次號：'+param.CaseNo);
	}
	
	let bodystr = JSON.stringify({d: rtnObj});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
}

//受文者資料
function swGetDictInfo(ORGMAIN, param){
	var rtnObj = {
		//OrgName:[]//機關全銜Dict
		//,OrgNo:[]//機關代碼Dict
		//,SysId:[]//系統代碼Dict
		//,Alias:[]//別名Dict
		OrgInfo:[]	// 1120508 Raymond 1111007 共通版將4個類型的查詢結果整併成一個節點
        ,m_strErrMsg:""//錯誤訊息
		,m_bSuccess:false
		,m_bAll:false//是否為全部資料
	}

	function p() {
		this.k = "";//鍵值
		this.v = "";//機關全銜
		this.orgno = "";//機關代碼
		this.sys = "";//系統代碼
		this.owner = "";//使用者帳號
		this.alias = "";//別名
		this.Type = "";	// 1120508 Raymond 1111007 共通版新增Type欄位, 為原來的4個Dict名稱:OrgName,OrgNo,SysId,Alias
	}
	
	var iCountLimit = 100;
	if(!isNaN(logonUser.userInfo.AD_Account.m_SystemSets.GETDICTINFO_DATALIMIT))
		iCountLimit = parseInt(logonUser.userInfo.AD_Account.m_SystemSets.GETDICTINFO_DATALIMIT);
	var strOrgNo = param.argOrgNo;
	var strQueryString = param.argQueryString;

	if (strOrgNo == "" || strQueryString == "")
	{
		if (strOrgNo == "")
			rtnObj.m_strErrMsg = "傳入機關代碼為空值";
		else
			rtnObj.m_strErrMsg = "傳入關鍵字為空值";

		let bodystr = JSON.stringify({d: rtnObj});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}
	//判斷兩個自己以下不搜尋
	if (strQueryString.length < 2)
	{
		rtnObj.m_strErrMsg = "字數過少不搜尋";
		let bodystr = JSON.stringify({d: rtnObj});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}
	
	if(ORGMAIN === undefined)
	{
		rtnObj.m_strErrMsg = "機關檔資料尚未載入，請稍後再試";
		let bodystr = JSON.stringify({d: rtnObj});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}

	try
	{
		//搜尋機關全銜資料筆數
		var OrgNameObj = [];
		ORGMAIN.filter(function(org){
			if(org.ORGNAME !== undefined && org.ORGNAME == strQueryString)
			{
				if(OrgNameObj.indexOf(org) == -1)
					OrgNameObj.push(org);
			}
		})
		//開頭符合
		ORGMAIN.filter(function(org){
			if(org.ORGNAME !== undefined && org.ORGNAME.indexOf(strQueryString) == 0)
			{
				if(OrgNameObj.indexOf(org) == -1)
					OrgNameObj.push(org);
			}
		})
		//中間符合
		ORGMAIN.filter(function(org){
			if(org.ORGNAME !== undefined && org.ORGNAME.indexOf(strQueryString) > 0)
			{
				if(OrgNameObj.indexOf(org) == -1)
					OrgNameObj.push(org);
			}
		})

		//搜尋機關代碼資料筆數
		var OrgNoObj = [];
		//完全符合
		ORGMAIN.filter(function(org){
			if(org.STDID !== undefined && org.STDID == strQueryString)
			{
				if(OrgNoObj.indexOf(org) == -1)
					OrgNoObj.push(org);
			}
		})
		//開頭符合
		ORGMAIN.filter(function(org){
			if(org.STDID !== undefined && org.STDID.indexOf(strQueryString) == 0)
			{
				if(OrgNoObj.indexOf(org) == -1)
					OrgNoObj.push(org);
			}
		});
		//中間符合
		ORGMAIN.filter(function(org){
			if(org.STDID !== undefined && org.STDID.indexOf(strQueryString) > 0)
			{
				if(OrgNoObj.indexOf(org) == -1)
					OrgNoObj.push(org);
			}
		})

		//搜尋系統代碼資料筆數
		var OrgIDObj = [];
		//完全符合
		ORGMAIN.filter(function(org){
			if(org.ORGID !== undefined && org.ORGID == strQueryString)
			{
				if(OrgIDObj.indexOf(org) == -1)
					OrgIDObj.push(org);
			}
		})
		//開頭符合
		ORGMAIN.filter(function(org){
			if(org.ORGID !== undefined && org.ORGID.indexOf(strQueryString) == 0)
			{
				if(OrgIDObj.indexOf(org) == -1)
					OrgIDObj.push(org);
			}
		})
		//中間符合
		ORGMAIN.filter(function(org){
			if(org.ORGID !== undefined && org.ORGID.indexOf(strQueryString) > 0)
			{
				if(OrgIDObj.indexOf(org) == -1)
					OrgIDObj.push(org);
			}
		})

		//搜尋別名資料筆數
		var OrgNickNameObj = [];
		//完全符合
		ORGMAIN.filter(function(org){
			if(org.NICK_LIST !== undefined && org.NICK_LIST.indexOf(strQueryString) != -1)
			{
				var arrNickNameList = org.NICK_LIST.split('|');
				var iNick = arrNickNameList.indexOf(strQueryString);
				if(iNick != -1)
				{
					if(OrgNickNameObj.indexOf(org) == -1)
					{
						org.NICK_LIST = arrNickNameList[iNick];
						OrgNickNameObj.push(org);
					}
				}
			}
		})
		//開頭符合
		ORGMAIN.filter(function(org){
			if(org.NICK_LIST !== undefined && org.NICK_LIST.indexOf(strQueryString) != -1)
			{
				var arrNickNameList = org.NICK_LIST.split('|');
				for(var iNick = 0 ; iNick < arrNickNameList.length ; iNick++)
				{
					if(arrNickNameList[iNick].indexOf(strQueryString) == 0)
					{
						if(OrgNickNameObj.indexOf(org) == -1)
						{
							org.NICK_LIST = arrNickNameList[iNick];
							OrgNickNameObj.push(org);
						}
					}
				}
			}
		})
		//中間符合
		ORGMAIN.filter(function(org){
			if(org.NICK_LIST !== undefined && org.NICK_LIST.indexOf(strQueryString) != -1)
			{
				var arrNickNameList = org.NICK_LIST.split('|');
				for(var iNick = 0 ; iNick < arrNickNameList.length ; iNick++)
				{
					if(arrNickNameList[iNick].indexOf(strQueryString) > 0)
					{
						if(OrgNickNameObj.indexOf(org) == -1)
						{
							org.NICK_LIST = arrNickNameList[iNick];
							OrgNickNameObj.push(org);
						}
					}
				}
			}
		})

		var iDataAllCount = OrgNameObj.length + OrgNoObj.length + OrgIDObj.length + OrgNickNameObj.length;

		//搜尋出的資料超過資料上限
		if (iDataAllCount > iCountLimit)
		{
			var iCountShare = parseInt(iCountLimit/4);
			var iCountShare2 = iCountShare;
			
			//機關全銜
			if(OrgNameObj.length > 0 )
			{
				if(OrgNameObj.length >= iCountShare2)
				{
					for(var iName = 0 ; iName < iCountShare2 ; iName++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.OrgName, OrgNameObj[iName]);
						AddRtnObj("1", "OrgName", OrgNameObj[iName]);
					}
				}
				else
				{
					for(var iName = 0 ; iName < OrgNameObj.length ; iName++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.OrgName, OrgNameObj[iName]);
						AddRtnObj("1", "OrgName", OrgNameObj[iName]);
					}
					//剩餘的數量留給後面的資料
					iCountShare2 = iCountShare + (iCountShare2 - OrgNameObj.length);
				}
			}

			//機關代碼
			if(OrgNoObj.length > 0 )
			{
				if(OrgNoObj.length >= iCountShare2)
				{
					for(var iNo = 0 ; iNo < iCountShare2 ; iNo++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.OrgNo, OrgNoObj[iNo]);
						AddRtnObj("1", "OrgNo", OrgNoObj[iNo]);
					}
				}
				else
				{
					for(var iNo = 0 ; iNo < OrgNoObj.length ; iNo++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.OrgNo, OrgNoObj[iNo]);
						AddRtnObj("1", "OrgNo", OrgNoObj[iNo]);
					}
					iCountShare2 = iCountShare + (iCountShare2 - OrgNoObj.length);
				}
			}

			//系統代碼
			if(OrgIDObj.length > 0 )
			{
				if(OrgIDObj.length >= iCountShare2)
				{
					for(var iID = 0 ; iID < iCountShare2 ; iID++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.SysId, OrgIDObj[iID]);
						AddRtnObj("1", "SysId", OrgIDObj[iID]);
					}
				}
				else
				{
					for(var iID = 0 ; iID < OrgIDObj.length ; iID++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.SysId, OrgIDObj[iID]);
						AddRtnObj("1", "SysId", OrgIDObj[iID]);
					}
					iCountShare2 = iCountShare + (iCountShare2 - OrgIDObj.length);
				}
			}

			//別名
			if(OrgNickNameObj.length > 0 )
			{
				if(OrgNickNameObj.length >= iCountShare2)
				{
					for(var iNick = 0 ; iNick < iCountShare2 ; iNick++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.Alias, OrgNickNameObj[iNick]);
						AddRtnObj("1", "Alias", OrgNickNameObj[iNick]);
					}
				}
				else
				{
					for(var iNick = 0 ; iNick < OrgNickNameObj.length ; iNick++)
					{
						// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
						//AddRtnObj("1", rtnObj.Alias, OrgNickNameObj[iNick]);
						AddRtnObj("1", "Alias", OrgNickNameObj[iNick]);
					}
					iCountShare2 = iCountShare + (iCountShare2 - OrgNickNameObj.length);
				}
			}
		}
		else
		{
			rtnObj.m_bAll = true;
			//機關全銜
			for(var iName = 0 ; iName < OrgNameObj.length ; iName++)
			{
				// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
				//AddRtnObj("1", rtnObj.OrgName, OrgNameObj[iName]);
				AddRtnObj("1", "OrgName", OrgNameObj[iName]);
			}
			
			//機關代碼
			for(var iNo = 0 ; iNo < OrgNoObj.length ; iNo++)
			{
				// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
				//AddRtnObj("1", rtnObj.OrgNo, OrgNoObj[iNo]);
				AddRtnObj("1", "OrgNo", OrgNoObj[iNo]);
			}
			
			//系統代碼
			for(var iID = 0 ; iID < OrgIDObj.length ; iID++)
			{
				// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
				//AddRtnObj("1", rtnObj.SysId, OrgIDObj[iID]);
				AddRtnObj("1", "SysId", OrgIDObj[iID]);
			}
			
			//別名
			for(var iNick = 0 ; iNick < OrgNickNameObj.length ; iNick++)
			{
				// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
				//AddRtnObj("2", rtnObj.Alias, OrgNickNameObj[iNick]);
				AddRtnObj("2", "Alias", OrgNickNameObj[iNick]);
			}
		}
		rtnObj.m_bSuccess = true;
	}
	catch(e){
		rtnObj.m_strErrMsg = "GetDictInfo發生錯誤：[" + e.name + "]" + e.message;
	}

	let bodystr = JSON.stringify({d: rtnObj});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
	
	function AddRtnObj(argType, argObj, argSelect)
	{
		if(argType == "1")//機關代碼、機關全銜、系統代碼
		{
			var pDetail = new p();
			if(argSelect.SYSID !== undefined)
				pDetail.k = argSelect.SYSID;
			if(argSelect.ORGNAME !== undefined)
				pDetail.v = argSelect.ORGNAME;
			if(argSelect.STDID !== undefined)
				pDetail.orgno = argSelect.STDID;
			if(argSelect.ORGID !== undefined)
				pDetail.sys = argSelect.ORGID;
			pDetail.owner = strOrgNo;
			// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
			//argObj.push(pDetail);
			pDetail.Type = argObj;
			rtnObj.OrgInfo.push(pDetail);
		}
		else if(argType == "3")
		{
			var pDetail = new p();
			if(argSelect.SYSID !== undefined)
				pDetail.k = argSelect.SYSID;
			if(argSelect.ORGNAME !== undefined)
				pDetail.v = argSelect.ORGNAME;
			if(argSelect.STDID !== undefined)
				pDetail.orgno = argSelect.STDID;
			if(argSelect.NICK_LIST_ !== undefined)
				pDetail.alias = argSelect.NICK_LIST;
			pDetail.owner = strOrgNo;
			// 1120508 Raymond 1111007 共通版回傳結構有改, 回傳陣列改為rtnObj.OrgInfo, 且p多出Type欄位
			//argObj.push(pDetail);
			pDetail.Type = argObj;
			rtnObj.OrgInfo.push(pDetail);
		}
	}
}

function swGetOrgInfo4ADWithDLKey(ORGMAIN, param){

	var _Rtn = new rtnOrgInfo();
	var strFullName = param.argFullName;
	var iSeqNo = -1;
	if (param.argSeq != "-1")
		iSeqNo = parseInt(param.argSeq);

	if(ORGMAIN === undefined)
	{
		_Rtn.ErrorClass.IsErr = true;
		_Rtn.ErrorClass.ErrMessage.push("機關檔資料尚未載入，請稍後再試");
		let bodystr = JSON.stringify({d: _Rtn});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}

	try{
		var OrgObj = [];
		if(strFullName.match(/^[\d|a-zA-Z]+$/))
		{
			//純英數
			//ORGID、STDID完全符合
			ORGMAIN.filter(function(org){
				if((org.ORGID !== undefined && org.ORGID == strFullName) || (org.STDID !== undefined && org.STDID == strFullName))
				{
					if(OrgObj.indexOf(org) == -1)
						OrgObj.push(org);
				}
			});
		}
		else
		{
			//中文
			ORGMAIN.filter(function(org){
				if(org.ORGNAME !== undefined && org.ORGNAME == strFullName)
				{
					//名稱完全符合
					if(OrgObj.indexOf(org) == -1)
						OrgObj.push(org);
				}
				else if(org.NICK_LIST !== undefined && org.NICK_LIST.indexOf(strFullName) != -1)
				{
					//別名完全符合
					var arrNickNameList = org.NICK_LIST.split('|');
					if(arrNickNameList.indexOf(strFullName) != -1)
					{
						if(OrgObj.indexOf(org) == -1)
							OrgObj.push(org);
					}
				}
			});
		}

		//群組
		if(OrgObj.length == 1 && OrgObj[0].ORGTYPE !== undefined && OrgObj[0].ORGTYPE == "4")
		{
			_Rtn.IsGrp = true;
			var arrGrpList = OrgObj[0].GRP_LIST.split('|');
			OrgObj = [];
			ORGMAIN.filter(function(org){
				if(org.SYSID !== undefined && arrGrpList.indexOf(org.SYSID) != -1)
				{
					if(OrgObj.indexOf(org) == -1)
						OrgObj.push(org);
				}
			});
		}
		else
		{
			_Rtn.IsGrp = false;
		}

		_Rtn.Count = OrgObj.length;
		for(var i = 0 ; i < OrgObj.length ; i++)
		{
			var Org = OrgObj[i];

			//機關名稱
			_Rtn.OrgName.push(GetValue(Org.ORGNAME))

			//機關代碼
			var StdID = GetValue(Org.STDID);
			var OrgNo = "";
			var DeptNo = "";
			if(StdID == 17)//含單位代碼
			{
				OrgNo = StdID.substr(0, 10);
				DeptNo = StdID.substr(10);
			}
			else
				OrgNo = StdID;

			_Rtn.OrgID.push(OrgNo)
			_Rtn.DeptNo.push(DeptNo)

			_Rtn.ContactPsn.push("");
			_Rtn.PostNo.push(GetValue(Org.POSTNO));
			_Rtn.Address.push(GetValue(Org.ADDRESS));
			_Rtn.Email.push(GetValue(Org.EMAIL));

			//預設發文方式非電子交換
			var IssueType = GetValue(Org.ISSUE_TYPE);
			var FepStatus = GetValue(Org.FEPSTATUS);
			if (IssueType != "3")
			{
				_Rtn.defaultIssueType.push(IssueType);
			}
			else
			{
				if (FepStatus == "T")
					_Rtn.defaultIssueType.push("3");
				else
					_Rtn.defaultIssueType.push("");
			}
			
			_Rtn.FepStatus.push(FepStatus);
			_Rtn.FepID.push(GetValue(Org.FEPID));
			_Rtn.CabinetNo.push(GetValue(Org.CABINET_NO));
			_Rtn.GateWay.push(GetValue(Org.GATE_WAY));
			_Rtn.SysId.push(GetValue(Org.SYSID));
			_Rtn.Owner.push("全機關共用");
			_Rtn.OwnerID.push(GetValue(Org.OWNER));

			//群組時，將OrgID設為群組代碼
			/*var OrgType = GetValue(Org.ORGTYPE);
			if (OrgType == "4")
				_Rtn.OrgID.push(GetValue(Org.ORGID));*/
			//判斷是否為內部單位
			if (GetValue(Org.INTERNAL_ID) != "")
				_Rtn.IsInside.push("Y");
			else
				_Rtn.IsInside.push("N");
			//紀錄海外單位、國別、郵寄地區
			_Rtn.OverSea.push(GetValue(Org.ISOVERSEA));
			_Rtn.CountryType.push(GetValue(Org.COUNTRY_TYPE));
			_Rtn.RegionNo.push(GetValue(Org.REGION_NO));

			//本別
			_Rtn.DocType.push("");
			//姓名
			_Rtn.EmpName.push("");
			//內部單位代碼
			_Rtn.Internal.push(GetValue(Org.INTERNAL_ID));
			//識別碼
			var pHash = "";
			if (iSeqNo != -1)
			{
				pHash = GetReveicerHash(8);
				iSeqNo++;
			}
			_Rtn.DLID.push(pHash);
			
			// 1120508 Raymond 1111007 共通版多出這些欄位
			_Rtn.Bank.push("");
			_Rtn.BankSub.push("");
			_Rtn.UserAlias.push("");
			_Rtn.AspNo.push(GetValue(Org.ASP_NO));
		}
	}
	catch(e){
		_Rtn.ErrorClass.IsErr = true;
		_Rtn.ErrorClass.ErrMessage.push("搜尋機關資料發生錯誤：[" + e.name + "]" + e.message);
	}

	let bodystr = JSON.stringify({d: _Rtn});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
}

function swGetOrgbySYSIDWithDLkey(ORGMAIN, param){

	var _Rtn = new rtnOrgInfo();
	var strSysID = param.argSYSID;
	var iSeqNo = -1;
	if (param.argSeq != "-1")
		iSeqNo = parseInt(param.argSeq);

	if(ORGMAIN === undefined)
	{
		_Rtn.ErrorClass.IsErr = true;
		_Rtn.ErrorClass.ErrMessage.push("機關檔資料尚未載入，請稍後再試");
		let bodystr = JSON.stringify({d: _Rtn});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}

	try{
		var OrgObj = [];
		ORGMAIN.filter(function(org){
			if(org.SYSID !== undefined && org.SYSID == strSysID)
			{
				if(OrgObj.indexOf(org) == -1)
					OrgObj.push(org);
			}
		});

		//最多回傳1筆
		if(OrgObj.length >= 1)
			OrgObj.length = 1;

		//群組
		if(OrgObj.length == 1 && OrgObj[0].ORGTYPE !== undefined && OrgObj[0].ORGTYPE == "4")
		{
			_Rtn.IsGrp = true;
			var arrGrpList = OrgObj[0].GRP_LIST.split('|');
			OrgObj = [];

			ORGMAIN.filter(function(org){
				if(org.SYSID !== undefined && arrGrpList.indexOf(org.SYSID) != -1)
				{
					if(OrgObj.indexOf(org) == -1)
						OrgObj.push(org);
				}
			});
		}
		else
		{
			_Rtn.IsGrp = false;
		}

		_Rtn.Count = OrgObj.length;
		for(var i = 0 ; i < OrgObj.length ; i++)
		{
			var Org = OrgObj[i];

			//機關名稱
			_Rtn.OrgName.push(GetValue(Org.ORGNAME))

			//機關代碼
			var StdID = GetValue(Org.STDID);
			var OrgNo = "";
			var DeptNo = "";
			if(StdID == 17)//含單位代碼
			{
				OrgNo = StdID.substr(0, 10);
				DeptNo = StdID.substr(10);
			}
			else
				OrgNo = StdID;

			_Rtn.OrgID.push(OrgNo)
			_Rtn.DeptNo.push(DeptNo)

			_Rtn.ContactPsn.push("");
			_Rtn.PostNo.push(GetValue(Org.POSTNO));
			_Rtn.Address.push(GetValue(Org.ADDRESS));
			_Rtn.Email.push(GetValue(Org.EMAIL));

			//預設發文方式非電子交換
			var IssueType = GetValue(Org.ISSUE_TYPE);
			var FepStatus = GetValue(Org.FEPSTATUS);
			if (IssueType != "3")
			{
				_Rtn.defaultIssueType.push(IssueType);
			}
			else
			{
				if (FepStatus == "T")
					_Rtn.defaultIssueType.push("3");
				else
					_Rtn.defaultIssueType.push("");
			}
			
			_Rtn.FepStatus.push(FepStatus);
			_Rtn.FepID.push(GetValue(Org.FEPID));
			_Rtn.CabinetNo.push(GetValue(Org.CABINET_NO));
			_Rtn.GateWay.push(GetValue(Org.GATE_WAY));
			_Rtn.SysId.push(GetValue(Org.SYSID));
			_Rtn.Owner.push("全機關共用");
			_Rtn.OwnerID.push(GetValue(Org.OWNER));

			//群組時，將OrgID設為群組代碼
			/*var OrgType = GetValue(Org.ORGTYPE);
			if (OrgType == "4")
				_Rtn.OrgID.push(GetValue(Org.ORGID));*/
			//判斷是否為內部單位
			if (GetValue(Org.INTERNAL_ID) != "")
				_Rtn.IsInside.push("Y");
			else
				_Rtn.IsInside.push("N");
			//紀錄海外單位、國別、郵寄地區
			_Rtn.OverSea.push(GetValue(Org.ISOVERSEA));
			_Rtn.CountryType.push(GetValue(Org.COUNTRY_TYPE));
			_Rtn.RegionNo.push(GetValue(Org.REGION_NO));

			//本別
			_Rtn.DocType.push("");
			//姓名
			_Rtn.EmpName.push("");
			//內部單位代碼
			_Rtn.Internal.push(GetValue(Org.INTERNAL_ID));
			//識別碼
			var pHash = "";
			if (iSeqNo != -1)
			{
				pHash = GetReveicerHash(8);
				iSeqNo++;
			}
			_Rtn.DLID.push(pHash);
			
			// 1120508 Raymond 1111007 共通版多出這些欄位
			_Rtn.Bank.push("");
			_Rtn.BankSub.push("");
			_Rtn.UserAlias.push("");
			_Rtn.AspNo.push(GetValue(Org.ASP_NO));
		}
	}
	catch(e){
		_Rtn.ErrorClass.IsErr = true;
		_Rtn.ErrorClass.ErrMessage.push("搜尋機關資料發生錯誤：[" + e.name + "]" + e.message);
	}

	let bodystr = JSON.stringify({d: _Rtn});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
}

function swChkGrpNameExt(ORGMAIN, param){

	var strRtn = "OK";
	var strGrpName = param.argGrpName;

	if(ORGMAIN === undefined)
	{
		strRtn = "機關檔資料尚未載入，請稍後再試";
		let bodystr = JSON.stringify({d: strRtn});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}

	try{
		var OrgObj = [];
		ORGMAIN.filter(function(org){
			if(org.ORGTYPE !== undefined && org.ORGTYPE == "4" && org.ORGNAME !== undefined && org.ORGNAME == strGrpName)
			{
				if(OrgObj.indexOf(org) == -1)
					OrgObj.push(org);
			}
		});

		if(OrgObj.length > 0)
			strRtn = "該群組名稱已存在於資料庫，無法匯入至一群組。";
	}
	catch(e){
		strRtn = "檢核群組名稱時發生錯誤：[" + e.name + "]" + e.message;
	}

	let bodystr = JSON.stringify({d: strRtn});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
}

function swGetOrgInfoBatch(ORGMAIN, param){

	var _SortOutRtn = new RtnClassBatch();

	var iSeqNo = -1;
	if (param.argSeq != "-1")
		iSeqNo = parseInt(param.argSeq);

	if(ORGMAIN === undefined)
	{
		_SortOutRtn.ErrorClass.IsErr = true;
		_SortOutRtn.ErrorClass.ErrMessage.push("機關檔資料尚未載入，請稍後再試");
		let bodystr = JSON.stringify({d: _Rtn});
		var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
		return rtn;
	}

	try{
		//將@全形轉成半形
		for (var i = 0; i < param.argEmail.length; i++)
		{
			var strEmail = param.argEmail[i];
			param.argEmail[i] = strEmail.replace("＠", "@");
		}
		
		var strNoDataList = "";//紀錄不存在的受文者
		var strIncludeRule = GetValue(logonUser.userInfo.AD_Account.m_SystemSets.WE_INCLUDE_RULE);
		var strType3 = "0";
		var strType3IssueRule = "0";
		if(strIncludeRule.length == 2)
		{
			strType3 = strIncludeRule.substr(0,1);
			strType3IssueRule = strIncludeRule.substr(1,1);
		}
		
		var _NewRtnAr = [];
		var arrRepeatOrg = [];
		for (var idxOrg = 0; idxOrg < param.argFullNameArr.length; idxOrg++)
		{
			var strFullName = param.argFullNameArr[idxOrg];

			var OrgObj = [];
			if(strFullName.match(/^[\d|a-zA-Z]+$/))
			{
				//純英數
				//ORGID、STDID完全符合
				ORGMAIN.filter(function(org){
					if((org.ORGID !== undefined && org.ORGID == strFullName) || (org.STDID !== undefined && org.STDID == strFullName))
					{
						if(OrgObj.indexOf(org) == -1)
							OrgObj.push(org);
					}
				});
			}
			else
			{
				//中文
				//名稱完全符合
				ORGMAIN.filter(function(org){
					if(org.ORGNAME !== undefined && org.ORGNAME == strFullName)
					{
						//名稱完全符合
						if(OrgObj.indexOf(org) == -1)
							OrgObj.push(org);
					}
					else if(org.NICK_LIST !== undefined && org.NICK_LIST.indexOf(strFullName) != -1)
					{
						//別名完全符合
						var arrNickNameList = org.NICK_LIST.split('|');
						if(arrNickNameList.indexOf(strFullName) != -1)
						{
							if(OrgObj.indexOf(org) == -1)
								OrgObj.push(org);
						}
					}
				});
			}

			var RtnOrg = new rtnOrgInfo();
			if(OrgObj.length > 0)
			{
				//最多回傳1筆
				if(OrgObj.length >= 1)
					OrgObj.length = 1;

				//群組
				if(OrgObj.length == 1 && OrgObj[0].ORGTYPE !== undefined && OrgObj[0].ORGTYPE == "4")
				{
					RtnOrg.IsGrp = true;
					var arrGrpList = OrgObj[0].GRP_LIST.split('|');
					OrgObj = [];

					ORGMAIN.filter(function(org){
						if(org.SYSID !== undefined && arrGrpList.indexOf(org.SYSID) != -1)
						{
							if(OrgObj.indexOf(org) == -1)
								OrgObj.push(org);
						}
					});
				}
				else
				{
					RtnOrg.IsGrp = false;
				}

				RtnOrg.Count = OrgObj.length;
				for(var i = 0 ; i < OrgObj.length ; i++)
				{
					var Org = OrgObj[i];

					//機關名稱
					RtnOrg.OrgName.push(GetValue(Org.ORGNAME))

					//機關代碼
					var StdID = GetValue(Org.STDID);
					var OrgNo = "";
					var DeptNo = "";
					if(StdID == 17)//含單位代碼
					{
						OrgNo = StdID.substr(0, 10);
						DeptNo = StdID.substr(10);
					}
					else
						OrgNo = StdID;

					RtnOrg.OrgID.push(OrgNo);
					RtnOrg.DeptNo.push(DeptNo);
					RtnOrg.StdID.push("");

					RtnOrg.ContactPsn.push("");

					var OrgType = GetValue(Org.ORGTYPE);
					if(RtnOrg.IsGrp)
					{
						RtnOrg.PostNo.push(GetValue(Org.POSTNO));
						RtnOrg.Address.push(GetValue(Org.ADDRESS));
						RtnOrg.Email.push(GetValue(Org.EMAIL));
					}
					else if ((OrgType == "3" && strType3 == "1") || OrgType == "5")
					{
						//依設定判斷公司及個人類型資料帶入依據
						RtnOrg.PostNo.push(GetValue(Org.POSTNO));
						RtnOrg.Address.push(GetValue(Org.ADDRESS));
						RtnOrg.Email.push(GetValue(Org.EMAIL));
					}
					else
					{
						//當資料庫資料為空時，改用CSV的資料
						var strDBPostNo = GetValue(Org.POSTNO);
						if(strDBPostNo == "")
							RtnOrg.PostNo.push(param.argPostNo[idxOrg]);
						else
							RtnOrg.PostNo.push(strDBPostNo);

						var strDBAddress = GetValue(Org.ADDRESS);
						if(strDBAddress == "")
							RtnOrg.PostNo.push(param.argAddress[idxOrg]);
						else
							RtnOrg.PostNo.push(strDBAddress);

						var strDBEmail = GetValue(Org.EMAIL);
						if(strDBEmail == "")
							RtnOrg.PostNo.push(param.argEmail[idxOrg]);
						else
							RtnOrg.PostNo.push(strDBEmail);
					}

					//預設發文方式非電子交換
					var IssueType = GetValue(Org.ISSUE_TYPE);
					var FepStatus = GetValue(Org.FEPSTATUS);
					if (IssueType != "3")
					{
						RtnOrg.defaultIssueType.push(IssueType);
					}
					else
					{
						if (FepStatus == "T")
							RtnOrg.defaultIssueType.push("3");
						else
							RtnOrg.defaultIssueType.push("");
					}
					//依設定判斷公司或個人類型受文者預設發文方式
					if ((OrgType == "3" && strType3 == "1") || OrgType == "5")
						RtnOrg.defaultIssueType.push("2");

					RtnOrg.FepStatus.push(FepStatus);
					RtnOrg.FepID.push(GetValue(Org.FEPID));
					RtnOrg.CabinetNo.push(GetValue(Org.CABINET_NO));
					RtnOrg.GateWay.push(GetValue(Org.GATE_WAY));
					RtnOrg.SysId.push(GetValue(Org.SYSID));
					RtnOrg.Owner.push("全機關共用");
					RtnOrg.OwnerID.push(GetValue(Org.OWNER));

					//群組時，將OrgID設為群組代碼
					/*var OrgType = GetValue(Org.ORGTYPE);
					if (OrgType == "4")
						RtnOrg.OrgID.push(GetValue(Org.ORGID));*/
					//判斷是否為內部單位
					if (GetValue(Org.INTERNAL_ID) != "")
						RtnOrg.IsInside.push("Y");
					else
						RtnOrg.IsInside.push("N");
					//紀錄海外單位、國別、郵寄地區
					RtnOrg.OverSea.push(GetValue(Org.ISOVERSEA));
					RtnOrg.CountryType.push(GetValue(Org.COUNTRY_TYPE));
					RtnOrg.RegionNo.push(GetValue(Org.REGION_NO));

					//本別
					RtnOrg.DocType.push(param.argDocType[idxOrg]);
					//姓名
					RtnOrg.EmpName.push(param.argEmpName[idxOrg]);
					//內部單位代碼
					RtnOrg.Internal.push(GetValue(Org.INTERNAL_ID));
					//識別碼
					var pHash = "";
					if (iSeqNo != -1)
					{
						pHash = GetReveicerHash(8);
						iSeqNo++;
					}
					RtnOrg.DLID.push(pHash);
					
					// 1120508 Raymond 1111007 共通版多出這些欄位
					RtnOrg.Bank.push("");
					RtnOrg.BankSub.push("");
					RtnOrg.UserAlias.push("");
					RtnOrg.AspNo.push(GetValue(Org.ASP_NO));
				}

				if(!RtnOrg.IsGrp)
				{
					//ORGID+姓名不重覆時，才紀錄至回傳物件中
					if (arrRepeatOrg.indexOf(RtnOrg.OrgID[0] + RtnOrg.DeptNo[0] + RtnOrg.EmpName[0]) == -1)
					{
						arrRepeatOrg.push(RtnOrg.OrgID[0] + RtnOrg.DeptNo[0] + RtnOrg.EmpName[0]);
						_NewRtnAr.push(RtnOrg);
					}
				}
			}
			else
			{
				//紀錄不存在受文者
				if (strNoDataList != "")
					strNoDataList += "、";
				strNoDataList += strFullName;
				RtnOrg.Count = 1;
				RtnOrg.OrgName.push(strFullName);
				RtnOrg.OrgID.push("");
				RtnOrg.DeptNo.push("");
				RtnOrg.StdID.push("");
				RtnOrg.ContactPsn.push("");
				RtnOrg.Email.push(param.argEmail[idxOrg]);
				RtnOrg.PostNo.push(param.argPostNo[idxOrg]);
				RtnOrg.Address.push(param.argAddress[idxOrg]);
				RtnOrg.defaultIssueType.push("2");
				RtnOrg.FepID.push("");
				RtnOrg.CabinetNo.push("");
				RtnOrg.FepStatus.push("");
				RtnOrg.GateWay.push("");
				RtnOrg.SysId.push("");
				RtnOrg.Owner.push("");
				RtnOrg.OwnerID.push("");
				RtnOrg.IsInside.push("N");
				RtnOrg.OverSea.push("0");
				RtnOrg.CountryType.push("0");
				RtnOrg.RegionNo.push("");
				RtnOrg.DocType.push(param.argDocType[idxOrg]);
				RtnOrg.EmpName.push(param.argEmpName[idxOrg]);
				RtnOrg.Internal.push("");
				var pHash = "";
				if (iSeqNo != -1)
				{
					pHash = GetReveicerHash(8);
					iSeqNo++;
				}
				RtnOrg.DLID.push(pHash);
				
				// 1120508 Raymond 1111007 共通版多出這些欄位
				RtnOrg.Bank.push("");
				RtnOrg.BankSub.push("");
				RtnOrg.UserAlias.push("");
				RtnOrg.AspNo.push("");
				
				_NewRtnAr.push(RtnOrg);
			}
		}

		if (param.bAutoGroup)
		{
			_SortOutRtn.Count = 1;
			var NewRtnOrg = new rtnOrgInfo();
			NewRtnOrg.IsGrp = true;
			
			//匯入至一群組時，第一筆為空的群組頭資料
			NewRtnOrg.OrgName.push("");
			NewRtnOrg.OrgID.push("");
			NewRtnOrg.DeptNo.push("");
			NewRtnOrg.StdID.push("");
			NewRtnOrg.ContactPsn.push("");
			NewRtnOrg.Email.push("");
			NewRtnOrg.PostNo.push("");
			NewRtnOrg.Address.push("");
			NewRtnOrg.defaultIssueType.push("");
			NewRtnOrg.FepID.push("");
			NewRtnOrg.CabinetNo.push("");
			NewRtnOrg.FepStatus.push("");
			NewRtnOrg.GateWay.push("");
			NewRtnOrg.SysId.push("");
			NewRtnOrg.Owner.push("");
			NewRtnOrg.OwnerID.push("");
			NewRtnOrg.IsInside.push("");
			NewRtnOrg.OverSea.push("");
			NewRtnOrg.CountryType.push("");
			NewRtnOrg.RegionNo.push("");
			NewRtnOrg.DocType.push("");
			NewRtnOrg.EmpName.push("");
			NewRtnOrg.Internal.push("");
			NewRtnOrg.DLID.push("");
			// 1120508 Raymond 1111007 共通版多出這些欄位
			NewRtnOrg.Bank.push("");
			NewRtnOrg.BankSub.push("");
			NewRtnOrg.UserAlias.push("");
			NewRtnOrg.AspNo.push("");
			
			for(var i = 0 ; i < _NewRtnAr.length; i++)
			{
				if(_NewRtnAr[i].IsGrp)
				{
					NewRtnOrg.OrgName.push(..._NewRtnAr[i].OrgName);
					NewRtnOrg.OrgID.push(..._NewRtnAr[i].OrgID);
					NewRtnOrg.DeptNo.push(..._NewRtnAr[i].DeptNo);
					NewRtnOrg.StdID.push(..._NewRtnAr[i].StdID);
					NewRtnOrg.ContactPsn.push(..._NewRtnAr[i].ContactPsn);
					NewRtnOrg.Email.push(..._NewRtnAr[i].Email);
					NewRtnOrg.PostNo.push(..._NewRtnAr[i].PostNo);
					NewRtnOrg.Address.push(..._NewRtnAr[i].Address);
					NewRtnOrg.defaultIssueType.push(..._NewRtnAr[i].defaultIssueType);
					NewRtnOrg.FepID.push(..._NewRtnAr[i].FepID);
					NewRtnOrg.CabinetNo.push(..._NewRtnAr[i].CabinetNo);
					NewRtnOrg.FepStatus.push(..._NewRtnAr[i].FepStatus);
					NewRtnOrg.GateWay.push(..._NewRtnAr[i].GateWay);
					NewRtnOrg.SysId.push(..._NewRtnAr[i].SysId);
					NewRtnOrg.Owner.push(..._NewRtnAr[i].Owner);
					NewRtnOrg.OwnerID.push(..._NewRtnAr[i].OwnerID);
					NewRtnOrg.IsInside.push(..._NewRtnAr[i].IsInside);
					NewRtnOrg.OverSea.push(..._NewRtnAr[i].OverSea);
					NewRtnOrg.CountryType.push(..._NewRtnAr[i].CountryType);
					NewRtnOrg.RegionNo.push(..._NewRtnAr[i].RegionNo);
					NewRtnOrg.DocType.push(..._NewRtnAr[i].DocType);
					NewRtnOrg.EmpName.push(..._NewRtnAr[i].EmpName);
					NewRtnOrg.Internal.push(..._NewRtnAr[i].Internal);
					NewRtnOrg.DLID.push(..._NewRtnAr[i].DLID);
					// 1120508 Raymond 1111007 共通版多出這些欄位
					NewRtnOrg.Bank.push(..._NewRtnAr[i].Bank);
					NewRtnOrg.BankSub.push(..._NewRtnAr[i].BankSub);
					NewRtnOrg.UserAlias.push(..._NewRtnAr[i].UserAlias);
					NewRtnOrg.AspNo.push(..._NewRtnAr[i].AspNo);
				}
				else
				{
					NewRtnOrg.OrgName.push(_NewRtnAr[i].OrgName[0]);
					NewRtnOrg.OrgID.push(_NewRtnAr[i].OrgID[0]);
					NewRtnOrg.DeptNo.push(_NewRtnAr[i].DeptNo[0]);
					NewRtnOrg.StdID.push(_NewRtnAr[i].StdID[0]);
					NewRtnOrg.ContactPsn.push(_NewRtnAr[i].ContactPsn[0]);
					NewRtnOrg.Email.push(_NewRtnAr[i].Email[0]);
					NewRtnOrg.PostNo.push(_NewRtnAr[i].PostNo[0]);
					NewRtnOrg.Address.push(_NewRtnAr[i].Address[0]);
					NewRtnOrg.defaultIssueType.push(_NewRtnAr[i].defaultIssueType[0]);
					NewRtnOrg.FepID.push(_NewRtnAr[i].FepID[0]);
					NewRtnOrg.CabinetNo.push(_NewRtnAr[i].CabinetNo[0]);
					NewRtnOrg.FepStatus.push(_NewRtnAr[i].FepStatus[0]);
					NewRtnOrg.GateWay.push(_NewRtnAr[i].GateWay[0]);
					NewRtnOrg.SysId.push(_NewRtnAr[i].SysId[0]);
					NewRtnOrg.Owner.push(_NewRtnAr[i].Owner[0]);
					NewRtnOrg.OwnerID.push(_NewRtnAr[i].OwnerID[0]);
					NewRtnOrg.IsInside.push(_NewRtnAr[i].IsInside[0]);
					NewRtnOrg.OverSea.push(_NewRtnAr[i].OverSea[0]);
					NewRtnOrg.CountryType.push(_NewRtnAr[i].CountryType[0]);
					NewRtnOrg.RegionNo.push(_NewRtnAr[i].RegionNo[0]);
					NewRtnOrg.DocType.push(_NewRtnAr[i].DocType[0]);
					NewRtnOrg.EmpName.push(_NewRtnAr[i].EmpName[0]);
					NewRtnOrg.Internal.push(_NewRtnAr[i].Internal[0]);
					NewRtnOrg.DLID.push(_NewRtnAr[i].DLID[0]);
					// 1120508 Raymond 1111007 共通版多出這些欄位
					NewRtnOrg.Bank.push(..._NewRtnAr[i].Bank[0]);
					NewRtnOrg.BankSub.push(..._NewRtnAr[i].BankSub[0]);
					NewRtnOrg.UserAlias.push(..._NewRtnAr[i].UserAlias[0]);
					NewRtnOrg.AspNo.push(..._NewRtnAr[i].AspNo[0]);
				}
			}
			NewRtnOrg.Count = NewRtnOrg.OrgName.length;
			_SortOutRtn.RtnBatch.push(NewRtnOrg);
		}
		else
		{
			_SortOutRtn.RtnBatch = _NewRtnAr;
			_SortOutRtn.Count = _NewRtnAr.length;
		}
		
		if (strNoDataList != "")
			_SortOutRtn.strNoDbDataList = strNoDataList;
	}
	catch(e){
		_SortOutRtn.ErrorClass.IsErr = true;
		_SortOutRtn.ErrorClass.ErrMessage.push("匯入資料處理發生錯誤：[" + e.name + "]" + e.message);
	}

	let bodystr = JSON.stringify({d: _SortOutRtn});
	var rtn = new Response(bodystr, {headers: {"Content-Type": "application/json; charset=UTF-8"}});
	return rtn;
}

function GetValue(argObj)
{
	var rtn = "";
	if(argObj !== undefined)
		rtn = argObj;
	return rtn;
}

//亂數英文字+數字
function GetReveicerHash(max) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	for (var i = 0; i < max; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

function rtnOrgInfo()
{
	this.Count = 0;
	this.IsGrp = false;
	this.OrgName = [];
	this.OrgID = [];
	this.DeptNo = [];
	this.StdID = [];
	this.ContactPsn = [];
	this.Email = [];
	this.PostNo = [];
	this.Address = [];
	this.defaultIssueType = [];
	this.FepID = [];
	this.CabinetNo = [];
	this.FepStatus = [];
	this.GateWay = [];
	this.SysId = [];
	this.Owner = [];
	this.OwnerID = [];
	this.IsInside = [];
	this.OverSea = [];
	this.CountryType = [];
	this.RegionNo = [];
	this.DocType = [];
	this.EmpName = [];
	this.Internal = [];
	this.DLID = [];
	this.Bank = [];	// 1120508 Raymond 1111007 共通版多了這個欄位
	this.BankSub = [];	// 1120508 Raymond 1111007 共通版多了這個欄位
	this.UserAlias = [];	// 1120508 Raymond 1111007 共通版多了這個欄位
	this.AspNo = [];	// 1120508 Raymond 1111007 共通版多了這個欄位
	this.ErrorClass = new ErrorClass();
}

function RtnClassBatch()
{
	this.Count = 0;
	this.RtnBatch = [];
	this.ErrorClass = new ErrorClass();
	this.strNoDbDataList ="";
}

function ErrorClass()
{
	this.IsErr = false;
	this.ErrLevel = "";
	this.Source = "";
	this.ErrMessage = [];
}