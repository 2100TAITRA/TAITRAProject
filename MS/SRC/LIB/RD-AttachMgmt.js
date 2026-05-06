/* DATE		MGRNO		SA		PG		Desc
   1060901	1060683		Leslie	Leslie	增修原一代功能，附件匯出時可設定黑白/彩色
   1060905	1060811		Leslie	Leslie	取消勾選上傳附件下載區時，清除附件下載區的設定文字
   1070131	1061174		Leslie	Leslie	增加檢核保留字元不可使用以避免程式異常，保留字元[^]["][']
   1070222	1070120		Leslie	Leslie	配合側屜檢視開啟公文模式，增加檢核是不為不可儲存狀態
   1070606	1070319		Leslie	Leslie	[Merge 1070179]新增多選、拖曳、來文電子檔及附件文字選單等便利性功能
   1070606	1070319		Leslie	Leslie	[Merge 1070183]新增附件分繕功能
   1071004	--			Leslie	Leslie	[Merge 內政部]大附件讀入功能
   1071024	1070999		Leslie	Leslie	針對可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定對應的MIME-Type以觸發正確的行為
   1071224	1071232		Leslie	Leslie	[Merge 1070191]新增警示使用者減少使用商用格式附件之黑名單設定「WE_WARNING_ATTACH_FMT」
   1071224	1071232		Leslie	Leslie	[中興]新增提醒訊息，以及紙本專用的附件白名單
   1080122	1080043		Leslie	Leslie	新增SHA256演算法
   1080226	1080065		Leslie	Leslie	Merge[1080089]附件分繕，應使用「全銜」(對應正副本稱謂)作為判斷鍵值
   1080618	1080424		Leslie	Leslie	[中興]增修調整附件格式檢核與警示邏輯
   1080923  1080339     Kevin   Eric    jQuery 3.0 upgrade
   1081209	1081026		Leslie	Leslie	[中興][Merge 1080735]來文電子檔檢核
   1081217	1081026		Leslie	Leslie	[版更後修正]共通版附件共分為"系統無法處理，不允許附加"、"可處理，但警示後不允許附加"以及"警示後仍允許附加"等三種判定
   1090312	1090159		Leslie	Leslie	修正置換功能，補上格式檢核邏輯
   1090415	1090179		David	Joe		新增系統參數WE_ATTACH_CHECK_MSG當附件檢核格式未過時，顯示自訂的錯誤訊息
   1090506	1090243		Raymond	Raymond	修改若機關暱稱為RRB(鐵道局), 則附件文字預設值從"如文"改為"如主旨"
   1090903  1090524     Leslie  Zen     (信保基金)附件明細新增上傳人員、時間欄位
   1100329	1090927		Raymond	Raymond	修正小螢幕寬度小於指定附件子視窗寬度時, 附件摘要欄過長及額外的2個信保客製化欄位uploadUser、uploadTime位置從左起算會出界問題, 以及iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
   1100513	1100268		Leslie	Leslie	修正上傳附件下載區的文字處理邏輯，於無附件時應自動註消
   1100520	1100464		Leslie	Leslie	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
   1100910	1100781		Leslie	Leslie	併[1100809]，修正附件子視窗儲存流程，以避免使用者儲存後，系統於背景執行匯出頁面，使用者於前端仍持續異動附件內容
   1100910	1100842		Leslie	Leslie	修正附件子視窗初始化檢核分繕表邏輯，於已用受文者但未設分繕表時，未正確設定分繕預設值的異常
   1110105	1101492		Leslie	Leslie	公文於設定附件分繕後，再進行附件異動時，未更新附件分繕資訊
   1110105	1101506		Leslie	Leslie	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
   1110302	1110106		Raymond	Raymond	合併1080815, 新增允許新增不匯出附件頁面的格式附件
   1110304	1101459		Leslie	Leslie	新增依設定，提供承辦人可修改「附件標籤」名稱
   1110406	1101578		Eric	Leslie	新增"附件編輯模式"相關功能及UI
   1110411	1101578		Eric	Raymond	判斷是否啟用附件編輯功能從環境變數改為全域變數
   1110418	1110034		Leslie	Leslie	信保客製化需求，附件匯出頁面預設改為彩色
   1110607	1110563		Raymond	Raymond	修正公文於設定附件分繕後, 再執行清除時, 未更新分繕表的問題
   1110816	1110942		Leslie	Leslie	考試院新增小於上限時，出現提示以確定不上傳至附件下載區
   1110831	1110774		Leslie	Leslie	修正附件分繕文字的判斷基準
   1111221	1111238		Leslie	Leslie	新增檔案拖拉加入附件功能
   1120320	1120062		Eric	Leslie	增修附件異動後需確實觸發匯出頁面
   1120606	1120294		Leslie	Leslie	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
   1120901  1120709		Kevin	Leslie	弱掃修正Client DOM Stored XSS
   1130304	1120664		Leslie	Leslie	[信保]附件置換時依客製化需求匯出彩色頁面
   1130808	1130313		Raymond	Raymond	合併1111007(1100394), 配合離線版，調整UI顯示
   1130909	1130691		Leslie	Leslie	[航港局]新增可限制「整份公文附件總大小限制」、「附件單檔大小限制」及「是否限制儲存」的系統參數設定
   1131111	序349		Leslie	Leslie	於啟用[1130691]功能時，需預先載入所有文稿
   1131224	北榮序282	Leslie	Leslie	比照一代，顯示合計大小
   1140208	1131215		Leslie	Leslie	新增可依設定預設匯出彩色
   1140714	1131215		Leslie	Leslie	補修正置換的顏色設定
   1140722	1140381		David	Leslie	新增匯出附件分繕表功能
   1141127	1141255		Raymond	Raymond	不要先判斷黑白, 才讀取預設值, 以避免預設彩色時加入附件時會轉彩色, 調換順序後變轉黑白的問題, 及修正備份後, 文稿檔中的data-blob-name會消失, 執行開啟附件檔時會變成改從未儲存上傳的FileServer下載, 導致下載錯檔案或發生錯誤的問題
*/
if (!("nsEditor" in window))
    window.nsEditor = {};

window.nsEditor.onAttachMgmt = function (event, callback, newFiles) {
    var $viewPort = event.data;
    var mdl = this;	// DraftModel object
    var total = 0;	// 計數
    var dirty = false;	// 2016.8.24 新增
    var allowAttFmt = ("WE_ALLOW_GENPAGE_ATTACH_FMT" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_ALLOW_GENPAGE_ATTACH_FMT"] : "";
    //1071224	Leslie[1071232]	新增提醒訊息，以及紙本專用的附件白名單
    var allowAttFmtP = ("WE_ALLOW_ATTACH_FMT_P" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_ALLOW_ATTACH_FMT_P"] : allowAttFmt;	//紙本未設定白名單時，等同線上簽核的設定值
    var warningAttMsg = ("WE_WARNING_ATTACH_MSG" in theSSO.User.SystemSets) ? "，" + theSSO.User.SystemSets["WE_WARNING_ATTACH_MSG"] : "";
    var attFmtErr = "";
    var addCnt = 0;
    var rndrAttDirty = false;	//2016.12.20	Leslie	新增已匯出頁面附件，異動後增加提示"必需儲存"
    var hasRndrAtt = false;		//2016.12.20	Leslie	用於判斷是否開啟時已有完成匯入之附件(非本次新增)
    var bEnableConvertAttPage = SSO_CONFIG.enableConvertAttPage;	//改用全域變數
    //1071224	Leslie[1070191]	新增警示使用者減少使用商用格式附件之黑名單設定「WE_WARNING_ATTACH_FMT」
    var warningAttFmt = ("WE_WARNING_ATTACH_FMT" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_WARNING_ATTACH_FMT"] : "";
    var attFmtWarning = "";
    //1070504	Leslie[1070179]	新增紀錄目前哪些仍在轉出
    var arNotFinish = [];
    var g_QueryDeferred = null;	//1070506	Leslie[1070179]	用於呼叫WS用的Deferred控制物件
    var g_MultiMode = false;	//1070506	Leslie[1070179]	全域控制是否為多選模式
    var g_hasEditPriv = true;			//1070507	Leslie[1070179]	全域控制是否可異動附件
    //1070525	Leslie[1070183]	新增附件分繕功能所需變數
    var rawXml = mdl.accquireXml();	// rawXml原始XML文件從dm取得
    var g_initDeptList = false, g_AllDept;	//受文者清單是否已初始化，全域受文者"正式名稱"清單
    var g_DeptHasAtt;	//初始所有"含附件"的受文者
    var g_mailMerge = mdl.accquireMailMergeTable();	//取得目前已設定的分繕表
    var gcolWidthsDept;//受文者子視窗TITLE
    var g_MailMergeDirty = false;	//是否有異動分繕表
	var g_TotleSize = 0;	//1131224	Leslie[北榮序282]	比照一代，顯示合計大小
    var g_StopInterval = false;	//1071130	Leslie	強制停止無用的Interval
    var g_maxSN = 1;	//1080226	Leslie[1080089]	當前受文者編號的最大號
    //1090415	Joe		1090179		新增系統參數WE_ATTACH_CHECK_MSG當附件檢核格式未過時，顯示自訂的錯誤訊息
    var allowAttMsg = ("WE_ATTACH_CHECK_MSG" in theSSO.User.SystemSets) ? theSSO.User.SystemSets["WE_ATTACH_CHECK_MSG"] : "";
	// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	// 1110105	Leslie[1101506]	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
	var g_txMergeAndUPLoad = "(已設定附件分繕)";
	// 1110301 Raymond 1110106 合併1080815, 新增允許新增不匯出附件頁面的附件格式
	var allowRawAttFmt = ("WE_ALLOW_RAW_ATTACH_FMT" in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ALLOW_RAW_ATTACH_FMT"]:"";
	var attRawFmtWarn = "";
	// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
	var showCustomName = ("WE_ATT_SHOW_CUSTOM_NAME" in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ATT_SHOW_CUSTOM_NAME"] == "Y":false;
	// 1110411 Raymond 1101578 判斷環境變數改為全域變數
	// 1110406	Leslie[1101578] 新增附件編輯相關功能
	//var attachDirectEdit = ('AOL_ENABLE_ATTACH_DIRECT_EDIT' in theSSO.User.EnvSettings)?theSSO.User.EnvSettings.get("AOL_ENABLE_ATTACH_DIRECT_EDIT") == "Y":false;
	var attachDirectEdit = window.enableAttachDirectEdit == true;
	var g_enableEditAtt = true;	//1111221	Leslie[1111238]	新增檔案拖拉加入附件功能
	//1130909	Leslie[1130691]	[航港局]新增可限制「整份公文附件總大小限制」、「附件單檔大小限制」及「是否限制儲存」的系統參數設定
	var arAttLimitSetting = (('WE_ATTACH_SIZE_LIMIT_SETTING' in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ATTACH_SIZE_LIMIT_SETTING"]:';;').split(';');
	var g_AttLimitForDoc = (parseInt(arAttLimitSetting[0])||0)*1048576;
	var g_singleFileLimit = (parseInt(arAttLimitSetting[1])||0)*1048576;
	var g_blockSaveOverSize = arAttLimitSetting[2] == 'Y';
	var attRawSizeWarn = '';
	
	//1101101 Raymond 1100991 弱掃XSS修正
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	
	//1131111	Leslie[序349]	於啟用[1130691]功能時，需預先載入所有文稿
	if(g_AttLimitForDoc > 0){
		var fm = theAOL.getCurrFolio();
		var dfCnt = fm.getDraftCounts();
		
		var dfds = [];
		for(var i=0; i<dfCnt; i++) {
			dfds.push(fm.accquireDraftModel(i));
		}
		$.when.apply(this, dfds)
		.always(function() {
			
		});
	}

    Util.getDlg("RD-AttachMgmt.html").done(function ($dlg) {

        var $ul = $dlg.find("#divUl");
        var currItem = undefined;
        var currFliObj;	//1070528	Leslie[1070183]	當前待異動附件fliObj

        $dlg.find("#btnY").on('click', function (event) {
			
			// 1110408	Leslie[1101578]	配合附件編輯功能，增加檢查使用者是否有任何有效異動
			if(!dirty && !rndrAttDirty && !g_MailMergeDirty){
				//1140729	Leslie[1140381]	判斷是否已有分繕異動旗標，若有，但使用者未異動附件分繕設定
				if(mdl.accquireMailMergeTable().hasDispatchAtt() && mdl.needSaveDispatchAtt()){
					 if (!confirm("本份公文有設定附件分繕，且已異動受文者，但尚未重新設定附件分繕，請問是否維持當前附件內容?")) {
						 return false;
					 }
					 mdl.needSaveDispatchAtt(false);
				}
				
				//完全沒有任何異動，直接視為按下取消，以避免又產生新的版本頁面
				g_StopInterval = true;	
				$.modal.close();
				if(isMobile)
					window.history.back();
				return ;
			}				
			
            // 2016.9.9 舊版一些檢核邏輯
            if (check($ul)) {
                // 2016.12.20	Leslie	增加儲存前再確認
                if (bEnableConvertAttPage && rndrAttDirty) {
                    if (!confirm("部分附件已完成匯出頁面並上傳，若經異動則需重新匯出，且本公文必須強制儲存，是否確認變更附件內容?")) {
                        return false;
                    }
                }
				
				//1140729	Leslie[1140381]	判斷是否已有分繕異動旗標，若有，但使用者未異動附件分繕設定
				if(mdl.accquireMailMergeTable().hasDispatchAtt() && mdl.needSaveDispatchAtt() && !g_MailMergeDirty){
					 if (!confirm("本份公文有設定附件分繕，且已異動受文者，但尚未重新設定附件分繕，請問是否確認僅儲存當前附件內容?")) {
						 return false;
					 }
				}
								
                //1070528	Leslie[1070183]	有異動時，重整分繕表，並清空附件紀錄
                if (g_MailMergeDirty) {
					//1110105	Leslie[1101492]	沒開過分繕表子視窗，需先初始化(但不顯示)
					if(!g_initDeptList){
						g_AllDept = [];
						gcolWidthsDept = [];
						$dlg.find(".ui-table-header-PC .ui-table-column-header").each(function(i, elem) 
						{
							gcolWidthsDept.push($(elem).css("width"));
						});
						$(rawXml.documentElement).find("受文者").each(fnInit);
						g_initDeptList = true;
					}
					
                    if (g_mailMerge.count() == 0) {	//還沒有分繕表
                        for (var ri = 0; ri < g_AllDept.length; ri++) {
                            //1080226	Leslie[1080089]	分繕表改為新版分繕表格式，改用add2(object)
                            //g_mailMerge.add(g_AllDept[ri]);
                            g_mailMerge.add2(g_AllDept[ri].name, g_AllDept[ri].fullName, g_AllDept[ri].userName, g_AllDept[ri].sn);
                        }
                    }
                    else {
                        for (var i = 0, len = g_AllDept.length; i < len; i++) {
                            //1080226	Leslie[1080089]	分繕表改為新版分繕表格式，改用add2(object)或find2("受文者",object)
                            //var ri = g_mailMerge.find('受文者',g_AllDept[i]);
                            let ri = g_mailMerge.find2('受文者', g_AllDept[i]);
                            if (ri != -1) {
                                g_mailMerge.clearAtt(ri);	//清空分繕表所有附件
                            }
                            else
                                //1080226	Leslie[1080089]	分繕表改為新版分繕表格式，改用add2(object)或find2("受文者",object)
                                //g_mailMerge.add(g_AllDept[i]);	//補上沒有分繕紀錄的受文者
                                g_mailMerge.add2(g_AllDept[i].name, g_AllDept[i].fullName, g_AllDept[i].userName, g_AllDept[i].sn);
                        }
                    }
                }

                // 寫回附件文字
                //1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字
				//1110831	Leslie[1110774]	修正附件分繕文字的判斷基準
                // var ndTxt = $(rawXml.documentElement).find("附件列表>文字");
                // if ($('#DlgStr').length > 0) {
                    // var strDL = $('#DlgStr').text();
                    // ndTxt.attr('DlgStr', strDL);	//先回寫到屬性裡
					// // 1110105	Leslie[1101506]	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
					// if(g_mailMerge.count() > 0 && $("#attTxt").val().indexOf('識別碼') != -1)
						// mdl.text("/*/附件列表/文字", $("#attTxt").val() + g_txMergeAndUPLoad + '　' + strDL);
					// else
                    // mdl.text("/*/附件列表/文字", $("#attTxt").val() + '　' + strDL);
                // }
                // else {
					// // 1110105	Leslie[1101506]	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
					// if(g_mailMerge.count() > 0 && $("#attTxt").val().indexOf('識別碼') != -1)
						// mdl.text("/*/附件列表/文字", $("#attTxt").val() + g_txMergeAndUPLoad);
					// else
					// mdl.text("/*/附件列表/文字", $("#attTxt").val());
                    // ndTxt.removeAttr('DlgStr')
                // }
				var hasMailMerge = false;
                //1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字	--END--

                mdl.emptyAttachFiles();	// 先清除舊的記錄及順序
                $ul.find("li > a").not("[data-role='button']").each(function (idx, a) {
                    var fobj = $(a).data("fileObj");
                    theLogger.log("addFile(" + fobj.name + "," + fobj.blbName + ")");
                    mdl.addAttachFile(fobj);// 再新增
                    //1070528	Leslie[1070183]	新增附件後，一併寫入分繕表
                    if (g_MailMergeDirty) {
                        //1080226	Leslie[1080089]	配合分繕表格式調整，改用deptInfo新增至分繕表
                        //var dept=fobj.Dept;
                        let deptList = fobj.Dept;
                        let dept = g_AllDept.filter(function (org) {
                            //1080514	Leslie	修正當受文者都沒附件時，回寫文稿為不含附件
                            //return deptList.indexOf(org.name) >= 0;
                            let iAtt = deptList.indexOf(org.name);
                            if (iAtt >= 0)
                                org.hasAtt = true;
                            return iAtt >= 0;
                        })
                        for (var i in dept) {
                            //1080226	Leslie[1080089]	配合分繕表格式調整，改用find2('受文者',object)
                            //var ri = g_mailMerge.find('受文者',dept[i]);
                            let ri = g_mailMerge.find2('受文者', dept[i]);
                            if (ri != -1) {
								//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
                                // g_mailMerge.addAtt(ri, { fileName: fobj.fileName, name: fobj.name, desc: fobj.desc, guid: mdl.getAttachGUID(idx) });
								var _attObj = mdl.getAttachInfo(idx);
                                g_mailMerge.addAtt(ri, { fileName: _attObj.fileName, name: _attObj.name, desc: _attObj.desc, guid: _attObj.guid });
                            }
                        }
                    }
					
					//1110831	Leslie[1110774]	修正附件分繕文字的判斷基準
					if(g_AllDept !== undefined && fobj.Dept.length != g_AllDept.length && fobj.Dept.length != 0 && g_AllDept.length != 0)
						hasMailMerge = true;
                });
                mdl.commitAttachFiles();	// 2016.9.12 結束附件清單增刪作業
				
				//1110831	Leslie[1110774]	修正附件分繕文字的判斷基準
                var ndTxt = $(rawXml.documentElement).find("附件列表>文字");
                if ($('#DlgStr').length > 0) {
                    var strDL = $('#DlgStr').text();
                    ndTxt.attr('DlgStr', strDL);	//先回寫到屬性裡
					// 1110105	Leslie[1101506]	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
					if(hasMailMerge && $("#attTxt").val().indexOf('識別碼') != -1)
						mdl.text("/*/附件列表/文字", $("#attTxt").val() + g_txMergeAndUPLoad + '　' + strDL);
					else
                    mdl.text("/*/附件列表/文字", $("#attTxt").val() + '　' + strDL);
                }
                else {
					// 1110105	Leslie[1101506]	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
					if(hasMailMerge && $("#attTxt").val().indexOf('識別碼') != -1)
						mdl.text("/*/附件列表/文字", $("#attTxt").val() + g_txMergeAndUPLoad);
					else
					mdl.text("/*/附件列表/文字", $("#attTxt").val());
                    ndTxt.removeAttr('DlgStr')
                }

                //依分繕表更新受文者<含附件>
                if (g_MailMergeDirty) {
                    var rCnt = g_mailMerge.count();
                    var bChangHasAtt = false, aupdUser = new Array();
                    //1080514	Leslie	修正當受文者都沒附件時，回寫文稿為不含附件
                    var bChangeNoAtt = false, adisUser = new Array();
                    for (var idx in g_AllDept) {
                        var $dept = $(rawXml.documentElement).find('受文者[編號=' + g_AllDept[idx].sn + ']')
                        var $hasAtt = $dept.find('含附件');
                        if ('hasAtt' in g_AllDept[idx]) {
                            //目前受文者有附件
                            var ri = g_mailMerge.find2('受文者', g_AllDept[idx]);
                            if (ri != -1) {
                                var aCnt = g_mailMerge.countAtt(ri);
                                if (aCnt && aCnt > 0) {
                                    if ($dept.length && $hasAtt.text() == '否') {
                                        var u = $hasAtt.get(0);
                                        if ("text" in u)
                                            u.text = '是';
                                        else
                                            u.textContent = '是';
                                        aupdUser.push(g_AllDept[idx].name);
                                        bChangHasAtt = true;
                                    }
                                }
                            }
                        }
                        else {
                            //目前受文者完全沒附件
                            if ($dept.length && $hasAtt.text() == '是') {
                                var u = $hasAtt.get(0);
                                if ("text" in u)
                                    u.text = '否';
                                else
                                    u.textContent = '否';
                                adisUser.push(g_AllDept[idx].name);
                                bChangeNoAtt = true;
                            }
                        }
                    }
                    var changeMsg = "";
                    if (bChangHasAtt)
                        changeMsg = "受文者[" + aupdUser.join(',') + "]因設定附件分繕，將調整為「含附件」。";
                    if (bChangeNoAtt)
                        changeMsg += ((bChangHasAtt) ? "\n" : "") + "受文者[" + adisUser.join(',') + "]因附件分繕中均未勾選附件，將調整為「不含附件」。";
                    if (changeMsg != "")
                        alert(changeMsg);
                    /*
					for(var ri=0;ri<rCnt;ri++){
						var aCnt = g_mailMerge.countAtt(ri);
						if(aCnt && aCnt > 0){
							//檢查受文者是否有"含附件"
							var deptName = g_mailMerge.get(ri,0);
							//1080226	Leslie[1080089]	配合分繕表格式調整，修改受文者更新邏輯，移至前面宣告
							//var $dept = $(rawXml.documentElement).find("正式名稱:contains('"+deptName+"')");
							var $dept = $(rawXml.documentElement).find("全銜:contains('"+deptName+"')");
							var $hasAtt = $dept.parent().find('含附件');
							if($dept.length && $hasAtt.text() == '否'){
								var u=$hasAtt.get(0);
								if("text" in u)
									u.text = '是';
								else
									u.textContent = '是';
								aupdUser.push(deptName);
								bChangHasAtt = true;
							}
						}
					}
					if(bChangHasAtt)
						alert("受文者["+aupdUser.join(',')+"]因設定附件分繕，將調整為「含附件」。");
					*/
                    //1080514	Leslie	修正當受文者都沒附件時，回寫文稿為不含附件	==END==
                }

				//1140729	Leslie[1140381]	清附分繕異動旗標
				mdl.needSaveDispatchAtt(false);
				
				//1100910	Leslie[1100781、1100809]	修正附件子視窗儲存流程，以避免使用者儲存後，系統於背景執行匯出頁面，使用者於前端仍持續異動附件內容
                //if (typeof callback !== "undefined" && $.isFunction(callback))
                    //callback();
                if (confirm("附件已儲存完畢,是否要關閉視窗？")) {
					//1100910	Leslie[1100781、1100809]	修正附件子視窗儲存流程，以避免使用者儲存後，系統於背景執行匯出頁面，使用者於前端仍持續異動附件內容
	                if (typeof callback !== "undefined" && $.isFunction(callback))
	                    callback();
                    //1060710 Cloud [1050087] 增加國合會客製化功能(功能原單號1030248
                    if (theUserInfo.OrgNickName == "ICDF") {
                        fnCheckUpLoad();
                    }
                    else {
                        g_StopInterval = true;	//1071130	Leslie	強制停止無用的Interval
                        $.modal.close();
                        // 1060810 Raymond 儲存附件異動後一律重新整理頁面
                        mdl.needRetransFO(true);
                        $viewPort.find(".pages").flip("refresh");
						// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
						if(isMobile)
							window.history.back();
                    }
                }
            }
        });
        $dlg.find("#btnN").on('click', function (event) {
            if (dirty) {	// 2016.8.24 新增異動提示警告
                if (!confirm("附件清單內容已異動, 請問是否不儲存異動, 關閉設定子視窗?"))
                    return false;
            }
			
			//1140729	Leslie[1140381]	判斷是否已有分繕異動旗標，若有，但使用者未異動附件分繕設定
			if(mdl.accquireMailMergeTable().hasDispatchAtt() && mdl.needSaveDispatchAtt()){
				 if (!confirm("本份公文有設定附件分繕，且已異動受文者，但尚未重新設定附件分繕，請問是否不儲存附件內容?")) {
					 return false;
				 }
				mdl.needSaveDispatchAtt(false);
			}
			
            g_StopInterval = true;	//1071130	Leslie	強制停止無用的Interval
            $.modal.close();
			// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
			if(isMobile)
				window.history.back();
        });

        // 新增
        $dlg.find("#newAtt").on('change', function (evt) {
            //1080624	Leslie	針對IE讀取檔案後，會自動清空Html.File物件，致使引發第二次onChange
            if (this.files.length == 0)
                return;
			
			//1111221	Leslie[1111238]	合併到同一個函式處理
			HandleAddFile(this.files);
            /*for (var i = 0; i < this.files.length; i++) {
				// 1110301 Raymond 1110106 合併1080815, 新增檢核可不匯出頁面的附件格式
                //2016.11.09	Leslie	加上格式檢核
                //if (checkAttFormat(this.files[i])) {	//2016.11.14	Leslie	Bug fix newFiles[i] --> this.files[i]
				if(checkRawAttFormat(this.files[i]) || checkAttFormat(this.files[i])){	//2016.11.14	Leslie	Bug fix newFiles[i] --> this.files[i]
                    readFromFile(i + total, this.files[i]);
                    //2016.11.09	Leslie	newFiles無法依一般陣列移除項目，故改用實際新增量數計算新增檔案數
                    addCnt++;
                }
            }
			// 1110301 Raymond 1110106 合併1080815, 加入的附件符合不匯出頁面的格式設定要提示訊息
			if(attRawFmtWarn != ""){
				alert("此類檔案\n"+attRawFmtWarn+"無法匯出影像，僅以原始檔夾帶。");
				attRawFmtWarn = "";
			}
            //2016.11.09	Leslie	加上格式檢核
            if (attFmtErr != "") {
                //2016.11.23	Leslie	依科長要求，修改訊息內容
                //alert("附件\n"+attFmtErr+"不符合可供轉出頁面之附件格式。")
                //1090415	Joe		1090179		新增系統參數WE_ATTACH_CHECK_MSG當附件檢核格式未過時，顯示自訂的錯誤訊息
                // alert("附件\n"+attFmtErr+"不是符合現行規定之附件格式，請選擇符合規定之檔案格式。")
                if (allowAttMsg == "")
                    allowAttMsg = "不是符合現行規定之附件格式，請選擇符合規定之檔案格式。";
                alert("附件\n" + attFmtErr + allowAttMsg);
                attFmtErr = "";
            }
            //1071224	Leslie[1070191]	增加檢核商用格式附件(黑名單)，並跳出警示訊息
            if (attFmtWarning != "") {
                //1071224	Leslie[1071232]	Merge後，修正可支援自訂格式訊息
                //alert("您所夾帶的附件["+attFmtWarning+"]，為非ODF或PDF格式之檔案。");
                alert("您所夾帶的附件[" + attFmtWarning + "]，為非ODF或PDF格式之檔案" + warningAttMsg + "。");
                attFmtWarning = "";
            }
            total += i;
            //2016.11.09	Leslie	newFiles無法依一般陣列移除項目，故改用實際新增量數計算新增檔案數
            //if(this.files.length > 0)
            if (addCnt > 0)
                dirty = true;	// 2016.8.24 新增
			*/
        })
        $dlg.find("#btnAddNew").on('click', function (event) {
            $dlg.find("#newAtt").val("").trigger('click');	// 2016.8.24 新增前清空input.value
        });

        // 清除
        $dlg.find("#btnRemoveAll").on('click', function (event) {
            if (total > 0) {
                $ul.empty();
                total = 0;
				g_TotleSize = 0;	//1131224	Leslie[北榮序282]	比照一代，顯示合計大小
				$dlg.find('#TotleSize').text('合計：0 KB');
                dirty = true;	// 2016.8.24 新增
				// 1110607 Raymond 1110563 修正公文於設定附件分繕後, 再執行清除時, 未更新分繕表的問題
				if(g_mailMerge.count() > 0)
					g_MailMergeDirty = true;
            }
        });

        // 復原
        $dlg.find("#btnRecover").on('click', function (event) {
            $ul.empty();
            total = 0;
			g_TotleSize = 0;	//1131224	Leslie[北榮序282]	比照一代，顯示合計大小
            try {
                total = mdl.getAttachFileCounts();
                for (var i = 0; i < total; i++) {
                    var nd = mdl.getAttachFile(i);
                    if (nd) {
                        var $nd = $(nd);
                        var nm = $nd.attr("附件名"),
							desc = $nd.attr("摘要"),
							size = $nd.attr("大小"),
							guid = mdl.getAttachGUID(i),
							hash = mdl.getAttachHash(i),
							fname = $nd.text(),
							blbNm = $nd.attr("data-blob-name");
                        var hasDocNo = mdl.getAttachHashDocNo(i);	// 2016.12.2	Leslie	加入附件時是否已有文號
                        //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                        var uploadUser = $nd.attr("上傳人員");
                        var uploadTime = $nd.attr("上傳時間");
                        uploadUser = (uploadUser == undefined) ? '' : uploadUser;
                        uploadTime = (uploadTime == undefined) ? '' : uploadTime;
						// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
						var attInfo = mdl.getAttachInfo(i);
						var cusName = (attInfo != null)?attInfo.cusName:"";
						
						// 1110406	Leslie[1101578] 新增附件編輯相關功能
						if(attachDirectEdit){
							uploadUser = (attInfo != null && 'lastModifiedUser' in attInfo && 'lastModifiedRole' in attInfo)? attInfo.lastModifiedRole + '-' + attInfo.lastModifiedUser:'';
							uploadTime = (attInfo != null && 'lastModifiedTime' in attInfo)?attInfo.lastModifiedTime:'';
							if(uploadTime.length == 11){
								uploadTime = uploadTime.substr(0,3)+'/'+uploadTime.substr(3,2)+'/'+uploadTime.substr(5,2)+' '+uploadTime.substr(7,2)+':'+uploadTime.substr(9,2);
							}
						}

                        if (blbNm)
                            //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                            //addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo);	// 2016.12.2	Leslie	加入附件時是否已有文號
							// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                            //addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, uploadUser, uploadTime);
							// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                            // addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, uploadUser, uploadTime);
							// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊
                            // addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, uploadUser, uploadTime, cusName);
							//1110418	Leslie[1110034]	順手修正現有bug，補上isNew的undefined
                            // addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, uploadUser, uploadTime, cusName, attInfo);
                            addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, undefined, uploadUser, uploadTime, cusName, attInfo);
                        else	// 存檔後data-blob-name會清除
                            //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                            //addItem(i, nm, desc, size, guid, hash, fname, nm, hasDocNo);	// 2016.12.2	Leslie	加入附件時是否已有文號
							// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                            // addItem(i, nm, desc, size, guid, hash, fname, nm, hasDocNo, uploadUser, uploadTime);
							// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊
                            // addItem(i, nm, desc, size, guid, hash, fname, nm, hasDocNo, uploadUser, uploadTime, cusName);
							//1110418	Leslie[1110034]	順手修正現有bug，補上isNew的undefined
                            // addItem(i, nm, desc, size, guid, hash, fname, nm, hasDocNo, uploadUser, uploadTime, cusName, attInfo);
                            addItem(i, nm, desc, size, guid, hash, fname, nm, hasDocNo, undefined, uploadUser, uploadTime, cusName, attInfo);
                    }
                    else {
                        alert("無法取得第" + i + "個附件資訊");
                    }
                }
                $ul.listview("refresh");	// 2016.8.25 fix
                dirty = false;	// 2016.8.24 新增
            }
            catch (e) {
                theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
                alert(e.message);
            }
        });

        // 置換
        $dlg.find("#repAtt").on('change', function () {
            if (currItem.length == 1) {
                //var fobj = currItem.data("filObj");	//2016.12.20	Leslie	不但寫錯，還一點用也沒有，拿掉
                if (this.files.length > 0) {
                    var fil = this.files[0];
					// 1110301 Raymond 1110106 合併1080815, 新增判斷副檔名是否符合不匯出頁面或匯出頁面格式
                    //1090312	Leslie[1090159]	修正置換功能，補上格式檢核邏輯
                    //if (checkAttFormat(fil)) {
					if(checkRawAttFormat(fil) || checkAttFormat(fil)) {
						if(attRawFmtWarn != ""){	// 允許加入的附件符合不匯出頁面的格式設定要提示訊息
							alert("此類檔案\n"+attRawFmtWarn+"無法匯出影像，僅以原始檔夾帶。");
							attRawFmtWarn = "";
						}
                        try {
                            //1071002	Leslie	改用可讀取大附件的方式，讀入附件檔
                            /*var rdr = new FileReader();
							rdr.onload = function() {
								var hash = hex_md5(new Uint8Array(this.result));		// 2016.7.19 新增計算hash功能
								var blb = new Blob([this.result], {type: fil.type});	// 第1個參數要[]啊
								var blbNm = URL.createObjectURL(blb);
								
								var fobj = currItem.data("fileObj");	//2016.12.20	移到前面去
								// 2016.12.20	Leslie	匯出頁面的附件，被異動後，應提示"必需儲存"
								if(bEnableConvertAttPage){
									if(!fobj.blbName.match(/^blob:/)){	//不是新增附件
										rndrAttDirty = true;
									}
								}
								
								// 更新項目內容
								currItem.find(".attach-desc").val(fil.name);
								currItem.find(".attach-size").val(fil.size + " Bytes");
								//var fobj = currItem.data("fileObj");	//2016.12.20	移到前面去
								fobj.blbName = blbNm;
								fobj.desc = fil.name;
								fobj.size = fil.size;
								fobj.name = fil.name;
								fobj.fileName = fil.name;
								fobj.hash = hash;
								fobj.guid = undefined;	// 2016.12.7	Leslie	配合修正置換後，不同檔名且GUID未更新造成封裝檔檢核異
								//1060901	Leslie[1060683]	加入彩色/黑白選項的相關條件
								fobj.isNew = true;
								fobj.isBW = true;
								
								dirty = true;	// 2016.8.24 新增
								
								// 2017.1.5 fix for IE會LOCK input file, 但實測IE11@WIN7仍會LOCK長達9分鐘之久
								$dlg.find("#repAtt").replaceWith($dlg.find("#repAtt").val("").clone(true));
							}
							rdr.readAsArrayBuffer(fil);*/
                            //1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
                            //fnSliceArrayBuffer(fil,function(resultBuffer){
                            fnSliceArrayBuffer(fil, function (resultBuffer, hash) {
                                //1071022	Leslie	修正Hash都相同的問題
                                //var hash = hex_md5(resultBuffer);		// 2016.7.19 新增計算hash功能
                                //1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
                                //var hash = hex_md5(new Uint8Array(resultBuffer));
                                var blb = new Blob([resultBuffer], { type: fil.type });	// 第1個參數要[]啊
                                var blbNm = URL.createObjectURL(blb);

                                var fobj = currItem.data("fileObj");	//2016.12.20	移到前面去
                                // 2016.12.20	Leslie	匯出頁面的附件，被異動後，應提示"必需儲存"
                                if (bEnableConvertAttPage) {
                                    if (!fobj.blbName.match(/^blob:/)) {	//不是新增附件
                                        rndrAttDirty = true;
                                    }
                                }

                                // 更新項目內容
                                currItem.find(".attach-desc").val(fil.name);
                                currItem.find(".attach-size").val(fil.size + " Bytes");
                                
                                //1131224	Leslie[北榮序282]	比照一代，顯示合計大小
								g_TotleSize -= fobj.size;
								g_TotleSize += fil.size;
								$dlg.find('#TotleSize').text('合計：'+GetKbSize(g_TotleSize)+' KB');
                                //var fobj = currItem.data("fileObj");	//2016.12.20	移到前面去
                                fobj.blbName = blbNm;
                                fobj.desc = fil.name;
                                fobj.size = fil.size;
                                fobj.name = fil.name;
                                fobj.fileName = fil.name;
                                fobj.hash = hash;
                                fobj.guid = undefined;	// 2016.12.7	Leslie	配合修正置換後，不同檔名且GUID未更新造成封裝檔檢核異
                                //1060901	Leslie[1060683]	加入彩色/黑白選項的相關條件
                                fobj.isNew = true;
								//1130304	Leslie[1120664]	[信保]附件置換時依客製化需求匯出彩色頁面
                                // fobj.isBW = true;
								//1140714	Leslie[1131215]	補修正置換的顏色設定
                                // fobj.isBW = SSO_CONFIG.OrgNickName != "SMEG";	//非信保：預設為true，信保：預設為false
								//1140729	Leslie	修正邏輯判斷錯誤
                                // fobj.isBW = (SSO_CONFIG.OrgNickName != "SMEG" || !theCustom.getCustomSet('DefaultAttPageByColor'));	//非信保：預設為true，信保：預設為false
                                fobj.isBW = !(SSO_CONFIG.OrgNickName == "SMEG" || theCustom.getCustomSet('DefaultAttPageByColor'));	//信保或設定預設為彩色的機關，isBW設為false
								
								//1110408	Leslie[1101578]	配合附件編輯，置換也視為附件異動
								if('lastModifiedSN' in fobj){
									fobj.lastModifiedSN   = undefined;
									fobj.lastModifiedTime = undefined;
									fobj.lastModifiedUser = undefined;
									fobj.lastModifiedRole = undefined;
								}

                                dirty = true;	// 2016.8.24 新增
								
								//1110105	Leslie[1101492]	公文於設定附件分繕後，再進行附件異動時，應一律更新分繕表
								if(g_mailMerge.count() > 0)
									g_MailMergeDirty = true;

                                // 2017.1.5 fix for IE會LOCK input file, 但實測IE11@WIN7仍會LOCK長達9分鐘之久
                                $dlg.find("#repAtt").replaceWith($dlg.find("#repAtt").val("").clone(true));
                            })
                            //1071002	Leslie	改用可讀取大附件的方式，讀入附件檔	==END==
                        }
                        catch (e) {
                            theLogger.error("讀取置換的附件電子檔錯誤!" + e.message + " - " + e.sourceURL + ":" + e.line);
                            alert(e.message);
                        }
                    }
                    if (attFmtErr != "") {
                        //1090415	Joe		1090179		新增系統參數WE_ATTACH_CHECK_MSG當附件檢核格式未過時，顯示自訂的錯誤訊息
                        // alert("附件\n"+attFmtErr+"不是符合現行規定之附件格式，請選擇符合規定之檔案格式。")
                        if (allowAttMsg == "")
                            allowAttMsg = "不是符合現行規定之附件格式，請選擇符合規定之檔案格式。";
                        alert("附件\n" + attFmtErr + allowAttMsg);
                        attFmtErr = "";
                    }
                    if (attFmtWarning != "") {
                        alert("您所夾帶的附件[" + attFmtWarning + "]，為非ODF或PDF格式之檔案" + warningAttMsg + "。");
                        attFmtWarning = "";
                    }
                    //1090312	Leslie[1090159]	修正置換功能，補上格式檢核邏輯	==END==
                }
            }
        });

        //1070506	Leslie[1070179]	新增加入來文電子檔功能
        $dlg.find("#btAddRcvAtt").on('click', function (event) {
            //1071024	Leslie[1070999]	針對可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定對應的MIME-Type以觸發正確的行為
            let getMimeType = function (fileName) {
                let sType = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase();
                let MimeType = {
                    'PDF': 'application/pdf',
                    'JPG': 'image/jpeg',
                    'GIF': 'image/gif',
                    'PNG': 'image/png',
                };
                return (MimeType[sType]) ? MimeType[sType] : 'application/octet-binary';
            }
            var wfio = new WebFileIO(theAOL.docObj.fileIOWS);
            var rcvAttPath = theAOL.docObj.fileStoragePath + theAOL.docObj.fileSubDir + "\\Receive\\";
            var rcvAttFileName = $dlg.find('#dlRcvAtt').val();

			// 1110302 Raymond 1110106 合併1080815, 新增檢核可不匯出頁面的附件格式
            //1081209	Leslie[1081026]	[Merge]來文電子檔檢核
            //1081217	Leslie	退單修正，附件共分為"系統無法處理，不允許附加"、"可處理，但警示後不允許附加"以及"警示後仍允許附加"等三種判定
            //if(!checkAttFormat({name:rcvAttFileName})){
            //let canAdd = checkAttFormat({ name: rcvAttFileName });
			let canAdd = checkRawAttFormat({name:rcvAttFileName}) || checkAttFormat({ name: rcvAttFileName });
			// 1110302 Raymond 1110106 合併1080815, 加入的附件符合不匯出頁面的格式設定要提示訊息
			if(attRawFmtWarn != ""){
				alert("此類檔案\n"+attRawFmtWarn+"無法匯出影像，僅以原始檔夾帶。");
				attRawFmtWarn = "";
			}
            if (attFmtErr != "") {
                //1090415	Joe		1090179		新增系統參數WE_ATTACH_CHECK_MSG當附件檢核格式未過時，顯示自訂的錯誤訊息
                // alert("附件\n"+attFmtErr+"不是符合現行規定之附件格式，請選擇符合規定之檔案格式。")
                if (allowAttMsg == "")
                    allowAttMsg = "不是符合現行規定之附件格式，請選擇符合規定之檔案格式。";
                alert("附件\n" + attFmtErr + allowAttMsg);
                attFmtErr = "";
            }
            //	return;
            //}
            if (attFmtWarning != "") {
                alert("您所夾帶的附件[" + attFmtWarning + "]，為非ODF或PDF格式之檔案" + warningAttMsg + "。");
                attFmtWarning = "";
            }
            if (!canAdd)
                return;
            //1081217	Leslie	退單修正，附件共分為"系統無法處理，不允許附加"、"可處理，但警示後不允許附加"以及"警示後仍允許附加"等三種判定	==END==
            //1081209	Leslie[1081026]	[Merge]來文電子檔檢核	--END--

            wfio.download(rcvAttPath, rcvAttFileName, {
                keepRawData: true,	// 保持原始資料格式(Typed Array)
                async: false,	// 1061117 Raymond 1061118 調換附件順序時, 須先下載"完"所有附件原始檔, 才進行轉檔, 因此下載其它附件檔途中萬一第1個附件檔已經完成轉檔, 可能會覆蓋掉其它還沒開始轉的附件檔, 若副檔名一樣會變成有2個相同內容的附件檔, 改成sync應該可以避免此情況發生, 但附件檔案太大可能會有衍生問題
                success: function (fil, all) {
                    //1080122	Leslie[1080043]	新增SHA256演算法
                    //var hash = hex_md5(new Uint8Array(fil));
                    var wordArray = CryptoJS.lib.WordArray.create(fil)
                    var hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
                    //1071024	Leslie[1070999]	針對可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定對應的MIME-Type以觸發正確的行為
                    //var blb = new Blob([fil],{type: "application/octet-binary"});
                    var blb = new Blob([fil], { type: getMimeType(rcvAttFileName) });
                    var blbNm = URL.createObjectURL(blb);
                    //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                    //addItem(total + 1, rcvAttFileName, rcvAttFileName, blb.size, undefined, hash, rcvAttFileName, blbNm, true, true, undefined, "", "");
					// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                    // addItem(total + 1, rcvAttFileName, rcvAttFileName, blb.size, undefined, hash, rcvAttFileName, blbNm, true, true, undefined, undefined);
                    addItem(total + 1, rcvAttFileName, rcvAttFileName, blb.size, undefined, hash, rcvAttFileName, blbNm, true, true, undefined, undefined, '');
                    $ul.listview("refresh");
					//1110428	Leslie	修正加入來文附件時應觸發儲存
					dirty = true;
					
					//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
					if(g_mailMerge.count() > 0)
						g_MailMergeDirty = true;
                },
                error: function (errorText) {
                    alert(errorText);
                }
            });
        })

        //1070506	Leslie[1070179]	新增多選批次異動功能
        $dlg.find("#btnMultiMode").on('click', function (event) {
            g_MultiMode = !g_MultiMode;
            var $header = $(this).closest("header");
            $ul.find("a[data-role='button'],a[data-role='none']").remove();	//清掉清單中所有浮動功能鍵
            //header區所有功能Disable
            $header.find("#btnAddNew,#btnRemoveAll,#btnRecover,#btAddRcvAtt,#btnMultiMode").addClass("ui-disabled");
            $header.find('#attTxt').textinput('disable');
            $header.find('#chkUploadToDL').checkboxradio('disable');
            $header.find('#dlAttTextDefault,#dlRcvAtt').selectmenu('disable');
            $header.parent().find('#btnY,#btnN').addClass("ui-disabled");
            $ul.find("a").removeClass("ui-btn-active");
            $ul.sortable('disable');

            // 上移
            $("<a data-role='button' class='multiBtn' style='position:absolute; margin:0px; bottom: 10px; right:490px; z-index:2'>上移</a>").appendTo($header)
				.on('click', function () {
				    var $header = $(this).closest("header");
				    var $ul = $header.parent().find('#divUl');
				    var $liList = $ul.find('li');
				    for (var idx = 1; idx < $liList.length; idx++) {	//從1開始(第0個不會上移)
				        if ($liList.eq(idx).find('a').hasClass('ui-btn-active') && !$liList.eq(idx - 1).find('a').hasClass('ui-btn-active')) {
				            $liList.eq(idx - 1).before($liList.eq(idx));
				            $liList = $ul.find('li');	//有移動則重新取得li清單
							//1120320	Leslie[1120062]	增修附件異動後需確實觸發匯出頁面
							dirty = true;
							
							//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
							if(g_mailMerge.count() > 0)
								g_MailMergeDirty = true;
				        }
				    }

				    return false;
				}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'arrow-u', iconpos: 'right', mini: true });
            $("<a data-role='button' class='multiBtn' style='position:absolute; margin:0px; bottom: 10px; right:420px; z-index:2'>下移</a>").appendTo($header)
				.on('click', function () {
				    var $header = $(this).closest("header");
				    var $ul = $header.parent().find('#divUl');
				    var $liList = $ul.find('li');
				    for (var idx = $liList.length - 2; idx >= 0; idx--) {	//從倒數第二個開始(最後一個不會下移)
				        if ($liList.eq(idx).find('a').hasClass('ui-btn-active') && !$liList.eq(idx + 1).find('a').hasClass('ui-btn-active')) {
				            $liList.eq(idx + 1).after($liList.eq(idx));
				            $liList = $ul.find('li');	//有移動則重新取得li清單
							//1120320	Leslie[1120062]	增修附件異動後需確實觸發匯出頁面
							dirty = true;
							
							//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
							if(g_mailMerge.count() > 0)
								g_MailMergeDirty = true;
				        }
				    }
				    return false;
				}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'arrow-d', iconpos: 'right', mini: true });
            // 刪除
            $("<a data-role='button' class='multiBtn' style='position:absolute; margin:0px; bottom: 10px; right:350px; z-index:2'>刪除</a>").appendTo($header)
				.on('click', function () {
				    var $header = $(this).closest("header");
				    var $ul = $header.parent().find('#divUl');
				    $ul.find('li').each(function () {
				        if ($(this).find('a').hasClass("ui-btn-active"))
				            $(this).remove();
				    })
				    dirty = true;	// 2016.8.25 新增					
					//1110105	Leslie[1101492]	公文於設定附件分繕後，再進行附件異動時，應一律更新分繕表
					if(g_mailMerge.count() > 0)
						g_MailMergeDirty = true;					
				    return false;
				}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'delete', iconpos: 'right', mini: true });
            $("<a data-role='button' class='multiBtn' style='position:absolute; margin:0px; bottom: 10px; right:280px; z-index:2'>結束</a>").appendTo($header)
				.on('click', function () {
				    g_MultiMode = !g_MultiMode;
				    var $objDlg = $(this).parent().parent();
				    $objDlg.find("a.multiBtn").remove();		//清空按鈕
				    $objDlg.find("#btnAddNew,#btnRemoveAll,#btnRecover,#btAddRcvAtt,#btnMultiMode").removeClass("ui-disabled");
				    $objDlg.find('#attTxt').textinput('enable');
				    $objDlg.find('#chkUploadToDL').checkboxradio('enable');
				    $objDlg.find('#dlAttTextDefault,#dlRcvAtt').selectmenu('enable');
				    $objDlg.find('#btnY,#btnN').removeClass("ui-disabled");

				    var $ulist = $objDlg.find("#divUl");
				    $ulist.sortable('enable');
				    
				    //1131224	Leslie[北榮序282]	比照一代，顯示合計大小
				    g_TotleSize = 0;	//先歸0，再重加

				    $ulist.find('a').each(function (idx) {
				        var $currObj = $(this).data('fileObj');
				        $(this).removeClass('ui-btn-active');
				        $currObj.currIdx = idx
				        
				        //1131224	Leslie[北榮序282]	比照一代，顯示合計大小
				        g_TotleSize += $currObj.size;
				        
				        if (bEnableConvertAttPage) {
				            if (!$currObj.blbName.match(/^blob:/)) {	//其中任一個不是新增附件
				                rndrAttDirty = true;	//設定要提示使用者，可能會重新匯出
				            }
				        }
				    })
					//1131224	Leslie[北榮序282]	比照一代，顯示合計大小
					$dlg.find('#TotleSize').text('合計：'+GetKbSize(g_TotleSize)+' KB');
					
				    return false;
				}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'check', iconpos: 'right', mini: true });
        })

		//1140722	Leslie[1140381]	判斷是否已有分繕表，若無，則隱藏「匯出分繕表」功能鍵
		$dlg.find('#btnExportMailMerge').on('click', function (event){
			var bNeedSave = true, bExportMailMerge = false;
			if(!dirty && !rndrAttDirty && !g_MailMergeDirty){
				bNeedSave = false;	//完全沒有任何異動，無需觸發儲存
				bExportMailMerge = true;
			}
			
			if(bNeedSave && confirm("部分內容已異動，若需匯出分繕表內容則本公文必須強制儲存，是否確認變更附件內容?")){
				if (g_MailMergeDirty) {
					if(!g_initDeptList){
						g_AllDept = [];
						gcolWidthsDept = [];
						$dlg.find(".ui-table-header-PC .ui-table-column-header").each(function(i, elem) 
						{
							gcolWidthsDept.push($(elem).css("width"));
						});
						$(rawXml.documentElement).find("受文者").each(fnInit);
						g_initDeptList = true;
					}
					
                    if (g_mailMerge.count() == 0) {	//還沒有分繕表
                        for (var ri = 0; ri < g_AllDept.length; ri++) {
                            g_mailMerge.add2(g_AllDept[ri].name, g_AllDept[ri].fullName, g_AllDept[ri].userName, g_AllDept[ri].sn);
                        }
                    }
                    else {
                        for (var i = 0, len = g_AllDept.length; i < len; i++) {
                            let ri = g_mailMerge.find2('受文者', g_AllDept[i]);
                            if (ri != -1) {
                                g_mailMerge.clearAtt(ri);	//清空分繕表所有附件
                            }
                            else
                                g_mailMerge.add2(g_AllDept[i].name, g_AllDept[i].fullName, g_AllDept[i].userName, g_AllDept[i].sn);
                        }
                    }
                }
				
				mdl.emptyAttachFiles();	// 先清除舊的記錄及順序
                $ul.find("li > a").not("[data-role='button']").each(function (idx, a) {
                    var fobj = $(a).data("fileObj");
                    theLogger.log("addFile(" + fobj.name + "," + fobj.blbName + ")");
                    mdl.addAttachFile(fobj);// 再新增
                    //1070528	Leslie[1070183]	新增附件後，一併寫入分繕表
                    if (g_MailMergeDirty) {
                        //1080226	Leslie[1080089]	配合分繕表格式調整，改用deptInfo新增至分繕表
                        let deptList = fobj.Dept;
                        let dept = g_AllDept.filter(function (org) {
                            //1080514	Leslie	修正當受文者都沒附件時，回寫文稿為不含附件
                            let iAtt = deptList.indexOf(org.name);
                            if (iAtt >= 0)
                                org.hasAtt = true;
                            return iAtt >= 0;
                        })
                        for (var i in dept) {
                            //1080226	Leslie[1080089]	配合分繕表格式調整，改用find2('受文者',object)
                            let ri = g_mailMerge.find2('受文者', dept[i]);
                            if (ri != -1) {
								//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
								var _attObj = mdl.getAttachInfo(idx);
                                g_mailMerge.addAtt(ri, { fileName: _attObj.fileName, name: _attObj.name, desc: _attObj.desc, guid: _attObj.guid });
                            }
                        }
                    }
					
					//1110831	Leslie[1110774]	修正附件分繕文字的判斷基準
					if(g_AllDept !== undefined && fobj.Dept.length != g_AllDept.length && fobj.Dept.length != 0 && g_AllDept.length != 0)
						hasMailMerge = true;
                });
                mdl.commitAttachFiles();	// 2016.9.12 結束附件清單增刪作業
				
				if (g_MailMergeDirty) {
                    var rCnt = g_mailMerge.count();
                    var bChangHasAtt = false, aupdUser = new Array();
                    //1080514	Leslie	修正當受文者都沒附件時，回寫文稿為不含附件
                    var bChangeNoAtt = false, adisUser = new Array();
                    for (var idx in g_AllDept) {
                        var $dept = $(rawXml.documentElement).find('受文者[編號=' + g_AllDept[idx].sn + ']')
                        var $hasAtt = $dept.find('含附件');
                        if ('hasAtt' in g_AllDept[idx]) {
                            //目前受文者有附件
                            var ri = g_mailMerge.find2('受文者', g_AllDept[idx]);
                            if (ri != -1) {
                                var aCnt = g_mailMerge.countAtt(ri);
                                if (aCnt && aCnt > 0) {
                                    if ($dept.length && $hasAtt.text() == '否') {
                                        var u = $hasAtt.get(0);
                                        if ("text" in u)
                                            u.text = '是';
                                        else
                                            u.textContent = '是';
                                        aupdUser.push(g_AllDept[idx].name);
                                        bChangHasAtt = true;
                                    }
                                }
                            }
                        }
                        else {
                            //目前受文者完全沒附件
                            if ($dept.length && $hasAtt.text() == '是') {
                                var u = $hasAtt.get(0);
                                if ("text" in u)
                                    u.text = '否';
                                else
                                    u.textContent = '否';
                                adisUser.push(g_AllDept[idx].name);
                                bChangeNoAtt = true;
                            }
                        }
                    }
                    var changeMsg = "";
                    if (bChangHasAtt)
                        changeMsg = "受文者[" + aupdUser.join(',') + "]因設定附件分繕，將調整為「含附件」。";
                    if (bChangeNoAtt)
                        changeMsg += ((bChangHasAtt) ? "\n" : "") + "受文者[" + adisUser.join(',') + "]因附件分繕中均未勾選附件，將調整為「不含附件」。";
                    if (changeMsg != "")
                        alert(changeMsg);
                }
				
				bExportMailMerge = true;	//儲存完成，可匯出分繕表
			}
			
			if(bExportMailMerge){
				var csvMerge = ['受文者,附件'];	//初始化附帶標題列
				var rCnt = g_mailMerge.count();	//分繕表受文者數
				if(rCnt > 0){					
					for(let ri = 0;ri < rCnt; ri++){
						let aCnt = g_mailMerge.countAtt(ri);
						let row = [g_mailMerge.get(ri,0)];	//先寫入受文者全銜
						if(!!aCnt){
							let attRow = []
							for(let ai = 0;ai<aCnt;ai++)
								attRow.push(g_mailMerge.getAtt(ri,ai).desc||g_mailMerge.getAtt(ri,ai).fileName);
							row.push(attRow.join('、'));
							
							csvMerge.push(row.join(','));	//有附件的受文者，才列出到匯出內容
						}
					}				
					var docNo = theAOL.docObj.docNo;
					let fileName = docNo + '-' + mdl.getDraftFileName().replace('-tc','').replace('.xml','.csv');
					let csvTxt = csvMerge.join('\r\n');
					var blob = new Blob([String.fromCharCode(0xFEFF), csvTxt], {type: "text/plain;charset=utf-8"});
					if("msSaveBlob" in navigator)	// IE10/11專屬下載function
						navigator.msSaveBlob(blob, fileName);
					else {	// Chrome用A的click事件
						let url = URL.createObjectURL(blob);
						let link = document.createElement("a");
						link.href = url;
						link.download = fileName;
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					}
				}
				else
					alert('未設定分繕表')
			}			
		});

        //1070525	Leslie[1070183]	附件分繕受文者視窗按鈕功能	==START==
        $dlg.find("#btAttMailMergeCancel").on('click', function (event) {
            $dlg.find("#receiverSetting").find(".ui-slide-pane-ModeOrg").removeClass("ui-slide-pane-active");
            $dlg.find("#receiverSetting").hide();
        });

        $dlg.find("#btAttMailMergeSave").on('click', function (event) {
            var newDeptList = [];//[id*="Dept_lbOrgname_"]

            $dlg.find("#receiverSetting").find('input[type=checkbox]').each(function (i, o) {
                if ($(o).prop("checked")) {
                    //1080226	Leslie[1080089]	分繕表應使用「全銜」為鍵值
                    //newDeptList.push($(o).parent().find('input[id*="Dept_lbOrgname_"]').val());
                    newDeptList.push($(o).parent().find('input[id*="Dept_txOrgFullName_"]').val());
                }
            })
            currFliObj.Dept = newDeptList;
            g_MailMergeDirty = true;
			
			//1140722	Leslie[1140381]	異動分繕表後顯示「匯出分繕表」
			$dlg.find('#btnExportMailMerge').show();

            //隱藏子視窗
            $dlg.find("#receiverSetting").find(".ui-slide-pane-ModeOrg").removeClass("ui-slide-pane-active");
            $dlg.find("#receiverSetting").hide();
        })

        $dlg.find("#btAttSelectAll").on('click', function (event) {
            $dlg.find("#receiverSetting").find('input[type=checkbox]').each(function (i, o) {
                $(o).prop("checked", true);
            })
        })

        $dlg.find("#btAttSelectNone").on('click', function (event) {
            $dlg.find("#receiverSetting").find('input[type=checkbox]').each(function (i, o) {
                $(o).prop("checked", false);
            })
        })
        //1070525	Leslie[1070183]	附件分繕受文者視窗按鈕功能	==END==
		
		//1110629	Leslie	配合附件編輯功能的相關判定，補上僅異動附件文字時，應視為有異動，需儲存
		$dlg.find("#attTxt").on('change',function(event){
			dirty = true;
		})

        //1111221	Leslie[1111238]	新增檔案拖拉加入附件功能
		$dlg.get(0).addEventListener("dragover",HandleDragOver,false);
		$dlg.find('div.FileDrop').get(0).addEventListener("dragleave",HandleDragOver,false);
		
		function HandleDragOver(event){
			if(!g_enableEditAtt)
				return;
			
			event.stopPropagation();
			event.preventDefault();
			if (event.type == "dragover")
				$dlg.find('.FileDrop').addClass('DragOver');
			else
				$dlg.find('.FileDrop').removeClass('DragOver');
		}
		
		$dlg.find('div.FileDrop').get(0).addEventListener("drop",function(event){
			if(!g_enableEditAtt)
				return;
			HandleDragOver(event);
			var files = event.dataTransfer.files;
			HandleAddFile(files);
		});
		
		function HandleAddFile(files){
			for (var i = 0; i < files.length; i++) {
				if(checkRawAttFormat(files[i]) || checkAttFormat(files[i])){
					//1130909	Leslie[1130691]	[航港局]新增可限制「整份公文附件總大小限制」、「附件單檔大小限制」及「是否限制儲存」的系統參數設定
					if(g_singleFileLimit > 0 && files[i].size > g_singleFileLimit){
						attRawSizeWarn += `[${files[i].name}]\n`;
						continue;
					}
                    readFromFile(i + total, files[i]);
                    addCnt++;
                }
            }
			//加入的附件符合不匯出頁面的格式設定要提示訊息
			if(attRawFmtWarn != ""){
				alert("此類檔案\n"+attRawFmtWarn+"無法匯出影像，僅以原始檔夾帶。");
				attRawFmtWarn = "";
			}
            //格式檢核
            if (attFmtErr != "") {
                if (allowAttMsg == "")
                    allowAttMsg = "不是符合現行規定之附件格式，請選擇符合規定之檔案格式。";
                alert("附件\n" + attFmtErr + allowAttMsg);
                attFmtErr = "";
            }
            //檢核商用格式附件(黑名單)，並跳出警示訊息
            if (attFmtWarning != "") {
                alert("您所夾帶的附件[" + attFmtWarning + "]，為非ODF或PDF格式之檔案" + warningAttMsg + "。");
                attFmtWarning = "";
            }
			
			//1130909	Leslie[1130691]	[航港局]新增可限制「整份公文附件總大小限制」、「附件單檔大小限制」及「是否限制儲存」的系統參數設定
			if(attRawSizeWarn != ""){
				alert(`以下檔案\n${attRawSizeWarn}已超過單一檔案容量上限${g_singleFileLimit/1048576}MB，請調整附件格式或對其壓縮後再上傳。`);
				attRawSizeWarn = "";
			}
			
            total += i;
            if (addCnt > 0)
                dirty = true;
		}
		//1111221	Leslie[1111238]	新增檔案拖拉加入附件功能	==END==
		
		// 加入清單, nm:附件名, desc:摘要, size:大小, guid:GUID, hash:雜湊值, fname:附件檔名, blbName:若是已上傳儲存的附件表示附件檔名, 若是新增的尚未儲存附件則表示BLOB超鏈結
        //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
        //function addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, isNew) {	// 2016.12.2	Leslie	加入附件時是否已有文號	//2016.12.19	Leslie	增加傳入以判斷是本次新增
		// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
        //function addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, isNew, uploadUser, uploadTime) {
		// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊
        function addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, isNew, uploadUser, uploadTime, cusName, oriAttInfo) {
            var choose;
            //1070503	Leslie[1070274、1070179、1070170]	UI調整
            //liHtml += "<span class='attach-lastUpd' style='position:absolute;top: 28px;right: 450px;'>" + getDateStrToSave(lastUpd) + " </span>";
            //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
            //var liHtml = "<span class='attach-nm'>" + nm + "</span><input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:250px; width:460px;' value='" + desc + "'><span class='attach-size' style='position:absolute;top: 12px;right: 2px;'>" + GetKbSize(size) + " KB</span>";
			var classEdit = (attachDirectEdit)?"editMode":"";
			var classCustom = (showCustomName)?" showCustom":"";
			
			//1110418	Leslie[1110034]	信保客製化需求，附件匯出頁面預設改為彩色
			var isBW = isNew;
			
			//1140208	Leslie[1131215]	新增可依設定預設匯出彩色
			//if(isNew)	// 1141127 Raymond 1141255 不要先判斷黑白, 才讀取預設值, 以避免預設彩色時加入附件時會轉彩色, 調換順序後變轉黑白的問題
				isBW = !theCustom.getCustomSet('DefaultAttPageByColor');
			
			//1131224	Leslie[北榮序282]	比照一代，顯示合計大小
			g_TotleSize += size;
			if($dlg.find('#TotleSize').length == 0)
				$dlg.find('h1.ui-title').after('<label class="ui-title" id="TotleSize" aria-level="1" style="position: absolute;top: 0px;right: -240px;">合計：'+GetKbSize(g_TotleSize)+' KB</label>')
			else
				$dlg.find('#TotleSize').text('合計：'+GetKbSize(g_TotleSize)+' KB');
			
            var liHtml = '';
            if (SSO_CONFIG.OrgNickName == "SMEG") {
				//1110418	Leslie[1110034]	信保客製化需求，附件匯出頁面預設改為彩色
				if(isNew)
					isBW = false;
				
                if (uploadUser == undefined)
                    uploadUser = SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId) + "-" + theSSO.User.name;

				// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				// 1100326 Raymond 1090927 修正小螢幕寬度小於指定附件子視窗寬度時, 附件摘要欄過長及額外的2個信保客製化欄位uploadUser、uploadTime位置從左起算會出界問題
                //liHtml = "<span class='attach-nm'>" + nm + "</span>\
                //  <input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:200px; width:250px;' value='" + desc + "'>\
                //  <span class='attach-uploadUser' style='top: 12px;left: 470px; width: 160px' title='" + uploadUser + "'>" + uploadUser + "</span>\
		        //  <span class='attach-uploadTime' style='top: 12px;left: 640px;width: 8em;'>" + getDateStrToSave(uploadTime) + "</span>\
                //  <span class='attach-size' style='position:absolute;top: 12px;right: 2px;'>" + GetKbSize(size) + " KB</span>";
				liHtml = "<span class='attach-nm'>" + HtmlEncode(nm) + "</span>\
					<input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:200px; width:calc(100% - 606px);' value='" + HtmlEncode(desc) + "'>\
					<span class='attach-uploadUser' style='top: 12px;right: 226px; width: 160px' title='" + HtmlEncode(uploadUser) + "'>" + HtmlEncode(uploadUser) + "</span>\
					<span class='attach-uploadTime' style='top: 12px;right: 88px;width: 8em;'>" + getDateStrToSave(uploadTime) + "</span>\
					<span class='attach-size' style='position:absolute;top: 12px;right: 2px;'>" + GetKbSize(size) + " KB</span>";
            }
			// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
			else if(showCustomName){
				//1110406	Leslie[1101578]	啟用附件編輯時，調整顯示UI
				/*liHtml = "<span class='attach-nm'>" + HtmlEncode(nm) + "</span>\
					<input class='attach-cusName' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:8em; width:calc(100% - 545px);' value='" + HtmlEncode(cusName) + "'>\
					<input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:calc(9em + 100% - 545px); width:calc(100% - 545px);' value='" + HtmlEncode(desc) + "'>\
					<span class='attach-size' style='position:absolute;top: 12px;right: 2px;'>" + GetKbSize(size) + " KB</span>";*/
				liHtml = "<span class='attach-nm'>" + HtmlEncode(nm) + "</span>\
					<input class='attach-cusName "+classEdit+"' data-role='none' value='" + HtmlEncode(cusName) + "'>\
					<input class='attach-desc showCustom "+classEdit+"' data-role='none' value='" + HtmlEncode(desc) + "'>\
					<span class='attach-size "+classEdit+"' >" + GetKbSize(size) + " KB</span>";
			}
            else
				// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				// 1100326 Raymond 1090927 修正小螢幕寬度小於指定附件子視窗寬度時, 附件摘要欄過長問題
                //liHtml = "<span class='attach-nm'>" + nm + "</span>\
                //  <input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:250px; width:460px;' value='" + desc + "'>\
                //  <span class='attach-size' style='position:absolute;top: 12px;right: 2px;'>" + GetKbSize(size) + " KB</span>";
				//1110406	Leslie[1101578]	啟用附件編輯時，調整顯示UI
				/*liHtml = "<span class='attach-nm'>" + HtmlEncode(nm) + "</span>\
					<input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:250px; width:calc(100% - 365px);' value='" + HtmlEncode(desc) + "'>\
					<span class='attach-size' style='position:absolute;top: 12px;right: 2px;'>" + GetKbSize(size) + " KB</span>";*/
				liHtml = "<span class='attach-nm'>" + HtmlEncode(nm) + "</span>\
					<input class='attach-desc "+classEdit+"' data-role='none' value='" + HtmlEncode(desc) + "'>\
					<span class='attach-size "+classEdit+"' >" + GetKbSize(size) + " KB</span>";
			//1110406	Leslie[1101578]	啟用附件編輯時，調整顯示UI
			if(attachDirectEdit){
				if (uploadUser == undefined)
					uploadUser = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].name + '-' +theSSO.User.name
				var _dirPath = mdl.getDraftDirPath();
				var m = _dirPath.match(/(\d{2})-99$/);				
				var alertClass = (theAOL.docObj.ICUserName == uploadUser.split('-')[1])?"":" modifyed";
				if(RegExp.$1 != "00")	//會辦單位新增文稿時，不變色
					alertClass = "";
				liHtml +="<span class='attach-edit "+classCustom+alertClass+"' >"+ getDateStrToSave(uploadTime) + '-' + uploadUser +"</span>";
			}
			
			//1110509	Leslie	移到這裡
            var DeptList = fnGetAllDeptbyAtt(guid);
			
			// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊
			//1110418	Leslie[1110034]	信保客製化需求，附件匯出頁面預設改為彩色
			// var _fileObj = { blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo: hasDocNo, isNew: isNew, isBW: isNew, currIdx: i, Dept: DeptList, uploadUser: uploadUser, uploadTime: getDateStrToSave(uploadTime) ,cusName: cusName};
			var _fileObj = { blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo: hasDocNo, isNew: isNew, isBW: isBW, currIdx: i, Dept: DeptList, uploadUser: uploadUser, uploadTime: getDateStrToSave(uploadTime) ,cusName: cusName};
			if(oriAttInfo != undefined && typeof oriAttInfo == 'object'){
				_fileObj.lastModifiedSN = oriAttInfo.lastModifiedSN;
				_fileObj.lastModifiedTime = oriAttInfo.lastModifiedTime;
				_fileObj.lastModifiedUser = oriAttInfo.lastModifiedUser;
				_fileObj.lastModifiedRole = oriAttInfo.lastModifiedRole;
			}

            //1070528	Leslie[1070183]	增加紀錄附件的分繕單位
			//1110509	Leslie	移到前面去
            //var DeptList = fnGetAllDeptbyAtt(guid);

			//1110406	Leslie[1101578]	啟用附件編輯時，調整顯示UI
            //$("<li data-theme='c' class='list' data-icon='false'><a></a></li>").appendTo($ul)
			$("<li data-theme='c' class='list' data-icon='false'><a class='"+classEdit+"'></a></li>").appendTo($ul)
				.find("a")
				//1060901	Leslie[1060683]	新增加入彩色/黑白選項(新增附件時)，若isBW無值，表示是舊附件，先不提供可切換顏色的功能，一併加上"currIdx"用於判斷附件位置有無變動
				//.data("fileObj", {blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo:hasDocNo, isNew:isNew})	//2016.12.2	Leslie	加入附件時是否已有文號	//2016.12.19	Leslie	增加傳入以判斷是本次新增
				//1070528	Leslie[1070183]	加入附件時，同時建立對應分繕表的紀錄
				//.data("fileObj", {blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo:hasDocNo, isNew:isNew, isBW:isNew, currIdx:i})	//2016.12.2	Leslie	加入附件時是否已有文號	//2016.12.19	Leslie	增加傳入以判斷是本次新增
				//1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                //.data("fileObj", { blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo: hasDocNo, isNew: isNew, isBW: isNew, currIdx: i, Dept: DeptList })
				// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                // .data("fileObj", { blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo: hasDocNo, isNew: isNew, isBW: isNew, currIdx: i, Dept: DeptList, uploadUser: uploadUser, uploadTime: getDateStrToSave(uploadTime) })
				// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊，改為前面先處理
                // .data("fileObj", { blbName: blbNm, idx: i, desc: desc, size: size, name: nm, fileName: fname, guid: guid, hash: hash, hasDocNo: hasDocNo, isNew: isNew, isBW: isNew, currIdx: i, Dept: DeptList, uploadUser: uploadUser, uploadTime: getDateStrToSave(uploadTime) ,cusName: cusName})
				.data("fileObj", _fileObj)
				//.attr("href", "pic/" + nd.children[i].path)
				.attr("title", fname)
				//1070503	Leslie[1070179]	UI調整
				//.html("<span class='attach-nm'>" + nm + "</span><input class='attach-desc' data-role='none' style='position:absolute; margin:.5em 0px; top:1px; left:250px; width:300px;' value='" + desc + "'><span class='attach-size' style='position:absolute; top:12px; right:2px;'>" + GetKbSize(size) + " KB</span>")
				.html(liHtml)
				.on('click', function (event) {
				    event.preventDefault();
				    if (event.target.nodeName == "INPUT") {	// 打描述文字時不要出現功能按鈕
				        return false;
				    }

				    //1070506	Leslie[1070179]	針對多選功能，做出不同UI回應
				    if (g_MultiMode) {
				        if ($(this).hasClass("ui-btn-active")) {
				            $(this).removeClass("ui-btn-active");
				        }
				        else {
				            $(this).addClass("ui-btn-active");
				        }
				        return false;
				    }

				    $ul.find("a[data-role='button'],a[data-role='none']").remove();
				    $ul.find("a").removeClass("ui-btn-active");
				    $(this).addClass("ui-btn-active");
				    var $li = $(this).closest("li");

				    //2016.12.19	Leslie	增加判斷附件是否仍在匯出頁面
				    var fliObj = $(this).data("fileObj");
				    var enableEditAtt = true;
				    if (!('isNew' in fliObj && fliObj.isNew == true))	//本次新增的附件，一律可執行異動
				        if (bEnableConvertAttPage && mdl.isAttRndrFinish(fliObj.idx) === false)	//2016.12.21	Leslie	因部分狀況回傳null，改為嚴格判斷false	//2017.1.8	bug fix 
				            enableEditAtt = false;

				    //1070222	Leslie[1070120]	增加檢核公文開啟狀態是否不可異動附件(避免觸發匯出頁面)
				    var fm = theAOL.getCurrFolio();
				    if (fm.readOnly() || fm.disableSave())
				        enableEditAtt = false;

				    if (enableEditAtt) {	//2016.12.19	增加判斷附件是否可供異動(會影響到原本已匯出的結果)

				        //1060901	Leslie[1060683]	新增加入彩色/黑白選項
				        function initColorBtn() {
				            // 彩色/黑白
				            if (typeof fliObj.isBW == "boolean" && bEnableConvertAttPage && (fliObj.idx != fliObj.currIdx || fliObj.isNew)) {
				                //1070525	Leslie[1070183]	新增附件分繕功能，調整功能鍵位置
				                //$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:350px; z-index:2'>"+((fliObj.isBW)?"黑白":"彩色")+"</a>").appendTo($li)
				                $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:433px; z-index:2'>" + ((fliObj.isBW) ? "黑白" : "彩色") + "</a>").appendTo($li)
									.on('click', function () {
									    if (typeof fliObj.isBW == "boolean") {
									        fliObj.isBW = !fliObj.isBW;
									    }

									    $(this).text(((fliObj.isBW) ? "黑白" : "彩色"));
									    return false;
									}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'refresh', iconpos: 'right', mini: true });
				            }
				            else
				                $('a.ui-icon-refresh[data-role="button"]').remove();
				        }

				        initColorBtn();
				        //1060901	Leslie[1060683]	新增加入彩色/黑白選項	--END--
				        // 上移
				        //1070525	Leslie[1070183]	新增附件分繕功能，調整功能鍵位置
				        //$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:280px; z-index:2'>上移</a>").appendTo($li)
				        $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:363px; z-index:2'>上移</a>").appendTo($li)
                            .on('click', function () {
                                var $prev = $(this).closest("li").prev("li");
                                //2016.12.19	增加判斷會移動到的附件是否可供異動(會影響到原本已匯出的結果)
                                var $prevObj = $($prev).find('a').data('fileObj');
                                if (!$prevObj.isNew) {
                                    if (bEnableConvertAttPage && mdl.isAttRndrFinish($prevObj.idx) === false) {	//2016.12.21	Leslie	因部分狀況回傳null，改為嚴格判斷false		//2017.1.8	bug fix 
                                        alert("即將移動之附件[" + $prevObj.name + "]，尚未完成匯出頁面，不可變更附件序。");
                                        return false;
                                    }
                                }
                                if ($prev.length == 1) {
                                    var dis = $prev.prev("li").length == 0;
                                    $prev.before($(this).closest("li"));
                                    if (dis)
                                        $(this).addClass("ui-disabled");
                                    $(this).next("a.ui-btn").removeClass("ui-disabled");
                                    dirty = true;	// 2016.8.25 新增

                                    //1060901	Leslie[1060683]	新增加入彩色/黑白選項
                                    fliObj.currIdx--;
                                    $prevObj.currIdx++;
                                    if (fliObj.idx != fliObj.currIdx) {
                                        fliObj.isBW = (typeof fliObj.isBW == "boolean") ? fliObj.isBW : true;
                                        $prevObj.isBW = (typeof $prevObj.isBW == "boolean") ? $prevObj.isBW : true;
                                    }
                                    initColorBtn();

                                    // 2016.12.20	Leslie	匯出頁面的附件，被異動後，應提示"必需儲存"
                                    if (bEnableConvertAttPage) {
                                        if (!$prevObj.blbName.match(/^blob:/) || !choose.blbName.match(/^blob:/)) {	//其中任一個不是新增附件
                                            rndrAttDirty = true;
                                        }
                                    }
									
									//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
									if(g_mailMerge.count() > 0)
										g_MailMergeDirty = true;
                                }
                                return false;
                            }).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'arrow-u', iconpos: 'right', mini: true });
				        // 下移
				        //1070525	Leslie[1070183]	新增附件分繕功能，調整功能鍵位置
				        //$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:210px; z-index:2'>下移</a>").appendTo($li)
				        $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:293px; z-index:2'>下移</a>").appendTo($li)
                            .on('click', function () {
                                var $next = $(this).closest("li").next("li");
                                //2016.12.19	增加判斷會移動到的附件是否可供異動(會影響到原本已匯出的結果)
                                var $nextObj = $($next).find('a').data('fileObj');
                                if (!$nextObj.isNew) {
                                    if (bEnableConvertAttPage && mdl.isAttRndrFinish($nextObj.idx) === false) {	//2016.12.21	Leslie	因部分狀況回傳null，改為嚴格判斷false
                                        alert("即將移動之附件[" + $nextObj.name + "]，尚未完成匯出頁面，不可變更附件序。");
                                        return false;
                                    }
                                }

                                if ($next.length == 1) {
                                    var dis = $next.next("li").length == 0;
                                    $next.after($(this).closest("li"));
                                    if (dis)
                                        $(this).addClass("ui-disabled");
                                    $(this).prev("a.ui-btn").removeClass("ui-disabled");
                                    dirty = true;	// 2016.8.25 新增

                                    //1060901	Leslie[1060683]	新增加入彩色/黑白選項
                                    fliObj.currIdx++;
                                    $nextObj.currIdx--;
                                    if (fliObj.idx != fliObj.currIdx) {
                                        fliObj.isBW = (typeof fliObj.isBW == "boolean") ? fliObj.isBW : true;
                                        $nextObj.isBW = (typeof $nextObj.isBW == "boolean") ? $nextObj.isBW : true;
                                    }
                                    initColorBtn();

                                    // 2016.12.20	Leslie	匯出頁面的附件，被異動後，應提示"必需儲存"
                                    if (bEnableConvertAttPage) {
                                        if (!$nextObj.blbName.match(/^blob:/) || !choose.blbName.match(/^blob:/)) {	//其中任一個不是新增附件
                                            rndrAttDirty = true;
                                        }
                                    }
									
									//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
									if(g_mailMerge.count() > 0)
										g_MailMergeDirty = true;
                                }
                                return false;
                            }).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'arrow-d', iconpos: 'right', mini: true });
				        // 刪除
				        //1070525	Leslie[1070183]	新增附件分繕功能，調整功能鍵位置
				        //$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:140px; z-index:2'>刪除</a>").appendTo($li)
				        $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:223px; z-index:2'>刪除</a>").appendTo($li)
                            .on('click', function () {
                                //2016.12.20	Leslie	增加判斷刪除時，下面是否有"已匯出"的附件會受到影響
                                if (bEnableConvertAttPage && hasRndrAtt) {
                                    var $next = $(this).closest("li").next("li");
                                    var dis = $next.length == 0;
                                    while (!dis) {
                                        var $nextObj = $($next).find('a').data('fileObj');
                                        //1060901	Leslie[1060683]	加入彩色/黑白選項的相關條件
                                        $nextObj.currIdx--;
                                        $nextObj.isBW = (typeof $nextObj.isBW == "boolean") ? $nextObj.isBW : true;

                                        if (!$nextObj.blbName.match(/^blob:/)) {
                                            rndrAttDirty = true;	//目前刪除的附件，下面有任一筆是已完成匯出的附件
                                            //break;//1060901	Leslie[1060683]	需判斷所有附件的位置，所以拿掉break
                                        }
                                        $next = $next.next("li");
                                        dis = $next.length == 0;
                                    }
                                }
                                
                                //1131224	Leslie[北榮序282]	比照一代，顯示合計大小
								g_TotleSize -= fliObj.size;
								$dlg.find('#TotleSize').text('合計：'+GetKbSize(g_TotleSize)+' KB');
                                //that.delAttachFile(choose);
                                $(this).closest("li").remove();
                                dirty = true;	// 2016.8.25 新增
								//1110105	Leslie[1101492]	公文於設定附件分繕後，再進行附件異動時，應一律更新分繕表
								if(g_mailMerge.count() > 0)
									g_MailMergeDirty = true;
                                return false;
                            }).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'delete', iconpos: 'right', mini: true });
				        // 置換
				        //1070525	Leslie[1070183]	新增附件分繕功能，調整功能鍵位置
				        //$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:70px; z-index:2'>置換</a>").appendTo($li)
				        $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:153px; z-index:2'>置換</a>").appendTo($li)
                            .on('click', function () {
                                //that.replaceAttachFile(choose);
                                currItem = $li.find("a:not([data-role='button'])");	// 設定目前要置換的項目
                                $dlg.find("#repAtt").val("").trigger('click');	// 2016.8.24 置換前清空input.value
                                return false;
                            }).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'check', iconpos: 'right', mini: true });
				    }
				    // 開啟
				    //1070525	Leslie[1070183]	新增附件分繕功能，調整功能鍵位置
				    //$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:0px; z-index:2'>開啟</a>").appendTo($li)
				    $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:83px; z-index:2'>開啟</a>").appendTo($li)
						.on('click', function () {
						    //that.openAttachFile(choose);

						    if (choose.blbName.match(/^blob:/)) {
						        if ("msSaveBlob" in navigator) {	// 2016.11.7 for IE-compatible
						            var xhr = new XMLHttpRequest();
						            xhr.open('GET', choose.blbName, true);
						            xhr.responseType = 'blob';
						            xhr.onload = function (e) {
						                if (this.status == 200) {
						                    //var myBlob = this.response;
						                    navigator.msSaveBlob(this.response, choose.name);
						                }
						            };
						            xhr.send();
						        }
						        else {
						            $(this).attr({
						                "data-role": "none",
						                "href": choose.blbName,
						                "rel": "external",
						                "data-ajax": "false",
						                "target": "_blank",
						                "download": choose.name
						            })
											.off("click", arguments.callee);	// 設好超鏈結的A就可以unbind click事件

						        }
						    }
						    else {	// 2016.9.2 FIX
						        theLogger.log("開啟非BLOB附件(" + choose.blbName + ")");
						        var fn = mdl.getDraftDirPath() + "\\" + choose.blbName;
						        theLogger.log(fn);
						        var url = "/odtools/docatt.ashx?FileName=" + Base64.encode(fn) + "&SAMLart=" + localStorage['Artifact'];
						        // 2016.12.1	Leslie	增加文號與草稿階段的下載處理(比照FolioView)
						        var docNo = (theAOL.docObj.isDraft) ? "DRAFTDOC" : theAOL.docObj.docNo;
						        url += "&DocNo=" + docNo;

						        $(this).attr({
						            "data-role": "none",
						            "href": url,
						            "rel": "external",
						            "data-ajax": "false",
						            "target": "_blank",
						            "download": choose.name
						        })
										.off("click", arguments.callee);	// 設好超鏈結的A就可以unbind click事件
						    }
						}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'grid', iconpos: 'right', mini: true });

				    //1070525	Leslie[1070183]	新增附件分繕功能
				    //「受文者」功能鍵
				    $("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:0px; z-index:2'>受文者</a>").appendTo($li)
						.on('click', function () {
						    currFliObj = choose;	//待更新
						    var dPList = choose.Dept;
						    $dlg.find("#receiverSetting").show();
						    if (!g_initDeptList) {
						        g_AllDept = [];
						        gcolWidthsDept = [];
						        $dlg.find(".ui-table-header-PC .ui-table-column-header").each(function (i, elem) {
						            gcolWidthsDept.push($(elem).css("width"));
						        });
						        //1080226	Leslie[1080089]	先取得受文者列表的編號屬性，同時可用於判斷是否需覆寫編號值
						        let $issList = $(rawXml.documentElement).find("受文者列表"), tmpMaxSN = 1;
						        if ($issList.length) {
						            let sn = $issList.eq(0).attr("編號");
						            if (sn != undefined && sn != "") {
						                g_maxSN = parseInt(sn);
						                tmpMaxSN = g_maxSN;
						            }
						        }
						        $(rawXml.documentElement).find("受文者").each(fnInit);
						        //1080226	Leslie[1080089]	舊版稿件受文者沒編號時，直接回寫
						        if (tmpMaxSN != g_maxSN)
						            $issList.get(0).setAttribute("編號", g_maxSN);	//直接把新編號寫回去
						        g_initDeptList = true;	//只初始化基本畫面一次
						    }
						    //1080128	Leslie[1080089]	分繕表應使用「全銜」為鍵值
						    //$dlg.find("#receiverSetting").find('input[id*="Dept_lbOrgname_"]').each(function(i,o){
						    $dlg.find("#receiverSetting").find('input[id*="Dept_txOrgFullName_"]').each(function (i, o) {
						        if (dPList.indexOf($(o).val()) != -1)
						            $(o).parent().find('input[type=checkbox]').prop("checked", true);
						        else
						            $(o).parent().find('input[type=checkbox]').prop("checked", false);
						    })
						    $dlg.find("#receiverSetting").find(".ui-slide-pane-ModeOrg").addClass("ui-slide-pane-active");
						    return false;
						}).buttonMarkup({ corners: true, shadow: true, theme: 'b', icon: 'user', iconpos: 'right', mini: true });


				    choose = $(this).data("fileObj");
				    return false;
				})
				// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱，配合修正註冊方式
				//.find(".attach-desc").on('change', function () {
				.on('change',".attach-desc", function () {
				    var fobj = $(this).closest("a").data("fileObj");
				    fobj.desc = $(this).val();
					//1110408	Leslie[1101578]	異動文字資訊，需儲存
					dirty = true;
				})
				// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
				.on('change',".attach-cusName", function () {
				    var fobj = $(this).closest("a").data("fileObj");
				    fobj.cusName = $(this).val();
					//1110408	Leslie[1101578]	異動文字資訊，需儲存
					dirty = true;
				});


        }

        //1071002	Leslie	增加可讀取大附件，回傳ArrayBuffer
        function blobToArrayBuffer(blob, cb) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                if (evt.target.readyState == FileReader.DONE)
                    cb(evt.target.result);
            };
            reader.readAsArrayBuffer(blob);
        };

        function fnSliceArrayBuffer(argFile, ballBack) {
            var file = argFile;
            var maxLength = file.size;
            var currLength = 0;
            var buffer = 4194304;   //4MB 為一個單位
            //var currBuffer;	//1080125	Leslie	修正切割讀入的暫存寫法
            //1080122	Leslie[1080043]	新增SHA256演算法
            var SHA256 = CryptoJS.algo.SHA256.create();
            //1080125	Leslie	修正切割讀入的暫存寫法
            var tmpUnit8Array = new Uint8Array(maxLength);

            function sliceRead() {
                SSOUtil.loading('show', { text: '檔案載入中...(進度：' + ((currLength / maxLength) * 100).toFixed(2) + '%)', textVisible: true, theme: 'c' });
                let nextRng = ((currLength + buffer) > maxLength) ? maxLength : currLength + buffer;
                //var blob = file.slice(currLength, currLength + buffer);
                var blob = file.slice(currLength, nextRng);
                //1080125	Leslie	修正切割讀入的暫存寫法
                //currLength += buffer;
                blobToArrayBuffer(blob, function (resultBuffer) {
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
                    tmpUnit8Array.set(new Uint8Array(resultBuffer), currLength);
                    currLength += resultBuffer.byteLength;
                    //1080125	Leslie	修正切割讀入的暫存寫法	--END--

                    if (currLength < maxLength) //還沒完，繼續切
                        sliceRead();
                    else {
                        //1080122	Leslie[1080043]	新增SHA256演算法，並於讀取完成後一起回傳
                        var hash = SHA256.finalize();
                        var hashHex = hash.toString(CryptoJS.enc.Hex);
                        SSOUtil.loading('hide');
                        //1080122	Leslie[1080043]	新增SHA256演算法，並於讀取完成後一起回傳，同時修正切割讀入的暫存寫法
                        //ballBack(currBuffer);
                        ballBack(tmpUnit8Array.buffer, hashHex);
                    }
                })
            }
            sliceRead();
        }
        //1071002	Leslie	增加可讀取大附件，回傳ArrayBuffer	==END==

        function readFromFile(idx, fil) {
            try {
                //1071002	Leslie	改用可讀取大附件的方式，讀入附件檔
                /*var rdr = new FileReader();
				rdr.onload = function() {
					var hash = hex_md5(new Uint8Array(this.result));		// 2016.7.19 新增計算hash功能
					var blb = new Blob([this.result], {type: fil.type});	// 第1個參數要[]啊
					var blbNm = URL.createObjectURL(blb);
					var hasDocNo = (theAOL.docObj.docNo != "");	// 2016.12.2	Leslie	加入附件時是否已有文號
					
					addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, hasDocNo, true);	// 2016.12.2	Leslie	加入附件時是否已有文號	//2016.12.19	Leslie	增加傳入以判斷是本次新增
					$ul.listview("refresh");
					
					// 2017.1.5 fix for IE會LOCK input file, 但實測IE11@WIN7仍會LOCK長達9分鐘之久
					$dlg.find("#newAtt").replaceWith($dlg.find("#newAtt").val("").clone(true));
				}
				rdr.readAsArrayBuffer(fil);*/
                //1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
                //fnSliceArrayBuffer(fil,function(resultBuffer){
                fnSliceArrayBuffer(fil, function (resultBuffer, hash) {
                    //1071022	Leslie	修正Hash都相同的問題
                    //var hash = hex_md5(resultBuffer);		// 2016.7.19 新增計算hash功能
                    //1080122	Leslie[1080043]	新增SHA256演算法，於讀取檔案時一併計算，完成後一起回傳
                    //var hash = hex_md5(new Uint8Array(resultBuffer));
                    var blb = new Blob([resultBuffer], { type: fil.type });	// 第1個參數要[]啊
                    var blbNm = URL.createObjectURL(blb);
                    var hasDocNo = (theAOL.docObj.docNo != "");	// 2016.12.2	Leslie	加入附件時是否已有文號

                    //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                    //addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, hasDocNo, true);	// 2016.12.2	Leslie	加入附件時是否已有文號	//2016.12.19	Leslie	增加傳入以判斷是本次新增
					// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                    // addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, hasDocNo, true, undefined, undefined);
                    addItem(idx, fil.name, fil.name, fil.size, undefined, hash, fil.name, blbNm, hasDocNo, true, undefined, undefined, '');
                    $ul.listview("refresh");

                    // 2017.1.5 fix for IE會LOCK input file, 但實測IE11@WIN7仍會LOCK長達9分鐘之久
                    $dlg.find("#newAtt").replaceWith($dlg.find("#newAtt").val("").clone(true));
                })
                //1071002	Leslie	改用可讀取大附件的方式，讀入附件檔	==END==
            }
            catch (e) {
                theLogger.error("讀取新增的附件電子檔錯誤!" + e.message + " - " + e.sourceURL + ":" + e.line);
                alert(e.message);
            }
        }


        // 2016.9.8 呼叫WEDEP/webeditws02.asmx的GetDocHash
        var firstAdd = true;
        function addDefaultStr() {
            if ((firstAdd || $dlg.find("#attTxt").val() == "") && $dlg.find("#chkUploadToDL").prop("checked")) {

                if (theSSO.User.EnvSettings.get("DL_HAS_DOCHASH") == "Y") {
                    var strDocNo = theAOL.docObj.docNo;
                    var strOrgNo = theUserInfo.OrgID;
                    if (typeof strDocNo !== "string" || strDocNo == "") {
                        alert("無公文文號，無法取得識別碼，請先行要號後再勾選上傳至附件下載區。");
                        $dlg.find("#chkUploadToDL").prop("checked", false).checkboxradio('refresh');	//1070730	Leslie	無文號應一併取消勾選
                        return;
                    }
                    else {
                        theWebServices.getDocHash(strOrgNo, strDocNo)
							.done(function (rtnValue) {
							    var strHashString = " 識別碼：" + rtnValue;

							    var attTxt = $dlg.find("#attTxt").val();
							    //1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字
							    if (theSSO.User.EnvSettings.get("WE_DLG_ATTACH_STR_READONLY") == "Y") {
							        var lb = $dlg.find('#attTxt').closest('label');
							        setDlgStrReadOnly(lb, theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR") + strHashString + "。");
							    }
							    else	//1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字	--END--
							        attTxt += theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR") + strHashString + "。";	//1050914	Leslie	加個句號。
							    $dlg.find("#attTxt").val(attTxt).prop("title", attTxt);

							    firstAdd = false;
							})
							.fail(function (errorText) {
							    alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
							});
                    }

                }
            }
                //1060904	Leslie[1060811]	取消勾選時，清除附件下載區的設定文字
            else if ($dlg.find("#chkUploadToDL").prop("checked") == false) {
                var attTxt = theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR");
                var currTxt = $dlg.find("#attTxt").val();
                var strDocNo = theAOL.docObj.docNo;
                var strOrgNo = theUserInfo.OrgID;
                if (theSSO.User.EnvSettings.get("DL_HAS_DOCHASH") == "Y") {
                    //1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字
					//1100513	Leslie[1100268]	修改刪除方式，改為可取得所有同ID的div，並修正高度計算方式
                    //if ($('#DlgStr').length > 0) {
                    //    $('#DlgStr').remove();
                    //    var h = $('#simplemodal-container').height();
                    //    $('#simplemodal-container').height(h - 40);
					if ($('div[id="DlgStr"]').length > 0){
						$('div[id="DlgStr"]').remove();
						let total = 0;	//重算高度
						$('.simplemodal-data').children().each(function(idx,o){total += $(o).height()});
						$('#simplemodal-container').height(total+8);
                    }
                    else	//1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字	--END--
                        theWebServices.getDocHash(strOrgNo, strDocNo)
                                .done(function (rtnValue) {
                                    var strHashString = " 識別碼：" + rtnValue + "。";
                                    currTxt = currTxt.replace(attTxt, "");
                                    currTxt = currTxt.replace(strHashString, "");
                                    $dlg.find("#attTxt").val(currTxt);
                                })
                                .fail(function (errorText) {
                                    alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
                                });
                } else {
                    currTxt = currTxt.replace(attTxt + "。", "");
                    $dlg.find("#attTxt").val(currTxt);
                }
                firstAdd = true;
            }
			//1110802	Leslie	視為異動文字，應儲存
			dirty = true;
        }
        $dlg.find("#chkUploadToDL").on('click', addDefaultStr);

        // 2016.9.9 新增從舊版複製過來的一些儲存時檢核邏輯
        function check($ul) {
            SetDLSetting();

            //1070131	Leslie[1061174]	增加檢核保留字元不可使用以避免程式異常，保留字元[^]["][']
            var msgErr = [];
            var i, j;
            //var tbl = document.all['Table_Attachment'].firstChild;
            //var len = tbl.rows.length;
            var AttachStr = "";
            var strSplit = "";
            //950847 by whay
            var nAllFileSize = 0;
            //0980220 Leo 0971022 取得是否有附件下載區(1/0)
            var bHasDL = theSSO.User.EnvSettings.get("HAS_DL");
            var arrayOfNum = new Array("", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
                        "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二一", "二二", "二三", "二四", "二五");
            $ul.find("li > a").not("[data-role='button']").each(function (idx, a) {
                var fobj = $(a).data("fileObj");
                var fileobj = fobj.name;
                var summaryobj = fobj.desc;
                //var fullfileobj = eval("FullFileName_" + i);
                var filesize = fobj.size;
                if (fileobj == "") return true;

                fobj.name = "附件" + (idx + 1);//arrayOfNum[idx+1];	//2017.3.1	Leslie	配合文書管理手冊規定，改回半形數字
                $(a).find(".attach-nm").text(fobj.name);
                //newrow.cells[1].innerText = summaryobj.value;
                //newrow.cells[2].innerText = fullfileobj.value;
                //newrow.cells[3].innerText = filesize.innerText;
                //組附件檔名
                var str = summaryobj;
                if (str == "")
                    str = fileobj;
                AttachStr += strSplit + str;
                strSplit = "、";
                if (typeof filesize === "string") {
                    if (filesize.length > 0) {
                        if (/\d*/.test(filesize))
                            nAllFileSize += parseInt(filesize);
                        else
                            theLogger.warn("filesize(" + filesize + ")不是數字!");
                    }
                }
                else if (typeof filesize === "number")
                    nAllFileSize += filesize;
                else
                    theLogger.warn("filesize(" + filesize + ")不是數字!");

                //1070131	Leslie[1061174]	增加檢核保留字元不可使用以避免程式異常，保留字元[^]["][']
                if (summaryobj.search(/[\^\"\']/g) > 0)
                    msgErr.push(summaryobj);
            });

            //1070131	Leslie[1061174]	增加檢核保留字元不可使用以避免程式異常，保留字元[^]["][']
            if (msgErr.length > 0) {
                msgErr.push("附件檔名不可使用特殊符號[\"][\'][^]，請修正上列附件摘要。");
                alert(msgErr.join("\r\n"));
                return false;
            }

			// 1110302 Raymond 1110106 合併1080815, 新增檢核是否超過單一文稿允許的附件總容量上限
			if(theSSO.User.EnvSettings.get("WE_ATTACH_TOTAL_SIZE_LIMIT") != "" && theSSO.User.EnvSettings.get("WE_ATTACH_TOTAL_SIZE_LIMIT") != "0") {
				var nLimitTotalSize = parseInt(theSSO.User.EnvSettings.get("WE_ATTACH_TOTAL_SIZE_LIMIT"))*1048576;	// 設定值單位是MB	//1130910	Leslie[1130691]	改回正確1048576
				if(nAllFileSize > nLimitTotalSize) {
					theLogger.warn("夾帶附件總容量(" + nAllFileSize + " Bytes)大小超過環境變數(WE_ATTACH_TOTAL_SIZE_LIMIT)設定的上限" + nLimitTotalSize + " MB");
					alert("附件電子檔總容量超過限制，請修正後再儲存!");
					return false;
				}
			}

            //0980220 Leo 0971022 如果上傳的附件大小為零，就把勾勾取消。
            if (nAllFileSize == 0 && bHasDL == "1" && $dlg.find("#chkUploadToDL").prop("checked") == true) {
				//1100513	Leslie[1100268]	改為用Trigger事件的方式，以期一併去掉文字
                //$dlg.find("#chkUploadToDL").prop("checked", false).checkboxradio('refresh');	//1050914	Leslie	加上.checkboxradio('refresh')以更新JQM外觀
				$dlg.find("#chkUploadToDL").trigger('click');
                //1040128 Gabby[1030885]修改取消勾選後未回寫XML檔問題
                $dlg.find("#attTxt").val("");		//1050913	Leslie	.value("")，改為.val("")
                SetDLSetting();
                //1040128 Gabby[1030885]--END
                alert("附件大小為零，不需上傳至附件下載區。");
            }
            if (nAllFileSize > 30 * 1024 * 1024) {
                alert("所上傳的檔案超過30 MB，在儲存時可能會有停滯現象，煩請稍候。");
            }



            //alert("WE_DLG_ATTACH_FILE_SIZE = " + document.all.IEControl.GetEnvSet("WE_DLG_ATTACH_FILE_SIZE"));
            //alert("nAllFileSize = "+nAllFileSize);
            //950847 檢查附加檔案容量，大於環境變數WE_DLG_ATTACH_FILE_SIZE不允許儲存  by whay  0951025
            //若沒有設環境變數WE_DLG_ATTACH_FILE_SIZE或變數值為0，不檢核直接儲存
            if (theSSO.User.EnvSettings.get("WE_DLG_ATTACH_FILE_SIZE") != "" && theSSO.User.EnvSettings.get("WE_DLG_ATTACH_FILE_SIZE") != "0") {
                var nDefulSize = parseInt(theSSO.User.EnvSettings.get("WE_DLG_ATTACH_FILE_SIZE")) * 1024;
                //alert("nDefulSize = "+nDefulSize);
                if (nAllFileSize > nDefulSize) {
                    //0980220 Leo 0971022 如果設定為有附件下載區時，當附件大小超過[WE_DLG_ATTACH_FILE_SIZE]的設定時，自動將[是否上傳到附件下載區]勾選
                    if (bHasDL == "1") {
                        if ($dlg.find("#chkUploadToDL").prop("checked") == false) {
                            $dlg.find("#chkUploadToDL").prop("checked", true).checkboxradio('refresh');	//1050914	Leslie	加上.checkboxradio('refresh')以更新JQM外觀
                            //1070716	Leslie	修正一代的舊有問題邏輯，附件文字在附件附件下載區註記文字前，仍應保留
                            //$dlg.find("#attTxt").val("");
                            addDefaultStr();
                            SetDLSetting();
                        }
                    }
                    else {
                        alert("夾帶附件超過限制大小");
                        return false;
                    }
                }
				//1110816	Leslie[1110942]	考試院新增小於上限時，出現提示以確定不上傳至附件下載區
				else if(bHasDL == '1' && $dlg.find("#chkUploadToDL").prop("checked") == true && nAllFileSize < nDefulSize){
					var bCancle = window.confirm("附件總大小小於"+(nDefulSize/1024/1024)+"MB，取消上傳附件下載區？");
					if(bCancle){
						$dlg.find("#chkUploadToDL").prop("checked", false).checkboxradio('refresh');
						addDefaultStr();
						SetDLSetting();
					}
				}
            }
            if (($dlg.find("#attTxt").val() == "") && (AttachStr != "")) {
                // 1090506 Raymond 1090243 修改若機關暱稱為RRB(鐵道局), 則附件文字預設值從"如文"改為"如主旨"
                if (theUserInfo.OrgNickName == "RRB")
                    $dlg.find("#attTxt").val("如主旨");
                else
                    $dlg.find("#attTxt").val("如文");
            }
            //else
            //	$dlg.find("#attTxt").val(AttachText.value);
		
			//1130909	Leslie[1130691]	[航港局]新增可限制「整份公文附件總大小限制」、「附件單檔大小限制」及「是否限制儲存」的系統參數設定
			if(g_AttLimitForDoc > 0){
				var fm = theAOL.getCurrFolio();
				var docTotalAtt = nAllFileSize + fm.getDocAttachTotalSize(mdl.getDraftGUID());
				if(docTotalAtt > g_AttLimitForDoc){
					if(g_blockSaveOverSize){
						alert(`附件合計容量 ${(docTotalAtt/1024/1024).toFixed(3)} MB，已超過總量上限${g_AttLimitForDoc/1024/1024} MB，請調整附件內容後再儲存`);
						return false;
					}
					else{
						alert(`附件合計容量 ${(docTotalAtt/1024/1024).toFixed(3)} MB，已超過總量上限${g_AttLimitForDoc/1024/1024} MB`);
					}
				}
			}

            //回傳附件檔名
            //openerObj.document.all['AttachFile'].value = AttachStr;
            //查驗附件大小
            if ($dlg.find("#chkUploadToDL").prop("checked") == false)//0980220 Leo 0971022 當有要上傳至附件下載區的時候就不需要再檢核附件大小了。
                jf_CheckAttachSize(nAllFileSize);
            return true;
        }
        /*
            查驗第一類公文附件檔大小是否超出上限
        */
        function jf_CheckAttachSize(nAllFileSize) {
            var pSendType = mdl.text("//電子交換處理機制類別");
            if (pSendType == "第一類公文") {
                if (nAllFileSize > 500 * 1024) {
                    alert("本份文件發文方式設定為：第一類公文電子交換。附件超過電子公文交換附件大小上限(500KB)\n請將附件置於共用附件下載區供收文方下載使用。")
                }
            }
        }

        function ShowDLSetting() {
            try {
                $dlg.find("#chkUploadToDL").closest(".ui-checkbox").hide();
                /*if(!document.all.IEControl.SetTargetUser(openerObj.external.Artifact))
                {
                    alert("使用者尚未登入系統");
                    return;
                }*/
                var bHasDL = theSSO.User.EnvSettings.get("HAS_DL");
				//1130808 Raymond 1130313 合併1111007(1100394), 配合離線版，調整UI顯示
				if(theSSO.offlineMode)
					bHasDL = "0";
                if (bHasDL == "1") {
                    $dlg.find("#chkUploadToDL").closest(".ui-checkbox").show();
                    var SettingNode = GetDLSettingNode();

                    try {
                        var IsUpload = mdl.text("//是否上傳至附件下載區");
                        if (IsUpload == "Y")
                            $dlg.find("#chkUploadToDL").prop("checked", true).checkboxradio('refresh');	//1050914	Leslie	加上.checkboxradio('refresh')以更新JQM外觀
                    }
                    catch (e) {
                        theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
                        alert(e.message);
                    }
                }
            }
            catch (ex) {
                alert("系統發生錯誤或因離線狀態而無法設定附件下載區的相關功能。" + ex.message);
                return;
            }
        }

        //取得附件下載區設定
        function GetDLSettingNode() {
            try {
                var c = mdl.getNodeCounts("//附件下載區設定");
                if (c == 0) {
                    mdl.appendChild("<附件下載區設定><是否上傳至附件下載區>N</是否上傳至附件下載區></附件下載區設定>", "/*");
                    /*var docNode = openerObj.external.SelectSingleNode("/");
                    var rootNode = docNode.documentElement;
                    SettingNode = docNode.createElement("附件下載區設定");
                    rootNode.appendChild(SettingNode);
                    var n = SettingNode.appendChild(docNode.createElement("是否上傳至附件下載區"));
                    n.text = "N";*/
                }
                var SettingNode = mdl.nodes("//附件下載區設定")[0];
            }
            catch (e) {
                theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
                alert(e.message);
            }
            return SettingNode;
        }

        //儲存附件下載區設定到xml
        function SetDLSetting() {
            var sIsUpload = "N";
            if ($dlg.find("#chkUploadToDL").css("display") != "none") {
                if ($dlg.find("#chkUploadToDL").prop("checked"))
                    sIsUpload = "Y";
            }
            var SettingNode = GetDLSettingNode();

            /*var IsUploadNode = SettingNode.selectSingleNode("//是否上傳至附件下載區");
            if(IsUploadNode)
                IsUploadNode.text = sIsUpload;*/
            mdl.text("//是否上傳至附件下載區", sIsUpload);
        }
        //0990719 David 0990470 新增計算附件大小以KB顯示
        function GetKbSize(ByteSize) {
            var rtn = 0;
            var KbSize = 0;
            var Point;
            KbSize = ByteSize / 1024 + " ";//轉成字串
            Point = KbSize.split('.');
            if (Point.length == 2) {
                if (Point[1].length > 2) {
                    Point[1] = Point[1].substr(0, 2)
                }
                KbSize = Point[0] + "." + Point[1]
            }
            return KbSize;
        }

		// 1110302 Raymond 1110106 合併1080815, 新增檢核允許不匯出頁面的附件格式
		function checkRawAttFormat(fli){
			if(theAOL.docObj.signType == "E") {	// 1110302 新增僅線上簽核才檢核是否為允許不匯出頁面的附件格式
				var arfname = fli.name.toUpperCase().split('.');
				var extName = (arfname.length>1)?arfname[arfname.length-1]:"";
				
				var aAllowFmts = allowRawAttFmt.split(';');		// 1110302 新增改用Array做比對，以避免僅比對到部分副檔名
				if(aAllowFmts.indexOf(extName) > -1){
					attRawFmtWarn += "[" + fli.name + "]\n";	// 符合不匯出頁面的附件格式, 要提示訊息
					return true;
				}
			}
			return false;
		}

        //2016.11.09	Leslie	新增檢核附件格式
        function checkAttFormat(fli) {
            var arfname = fli.name.toUpperCase().split('.');
            var extName = (arfname.length > 1) ? arfname[arfname.length - 1] : "";

            //1071224	Leslie[1071232]	修改白名單檢核，區分線上及紙本公文
            let strAllowAttFmt = allowAttFmt;
            if (theAOL.docObj.signType == "P")
                strAllowAttFmt = allowAttFmtP;

            //1080618	Leslie[1080424]	修正附件格式檢核邏輯
            let arAllowFmt = strAllowAttFmt.split(';');		//改用Array做比對，以避免僅比對到部分副檔名
            let arWarnFmt = warningAttFmt.split(';');
            let bAllow = false, bWarn = false;
            if (arAllowFmt.indexOf(extName) != -1)
                bAllow = true;
            if (arWarnFmt.indexOf(extName) != -1)
                bWarn = true;
            if (bWarn)
                attFmtWarning += ((attFmtWarning == "") ? "" : "、") + fli.name;
            if (!bAllow && !bWarn)
                attFmtErr += "[" + fli.name + "]\n";
            return bAllow;
            /*
            //1071224	Leslie[1071232]	修改白名單檢核，區分線上及紙本公文
            //if(allowAttFmt.indexOf(extName) == -1){
            if(strAllowAttFmt.indexOf(extName) == -1){
                attFmtErr += "["+fli.name +"]\n";
                return false;
            }
            
            //1071224	Leslie[1070191]	檢核是否列於黑名單
            if(warningAttFmt.indexOf(extName) != -1){
                attFmtWarning += ((attFmtWarning=="")?"":"、")+fli.name;
            }
            return true;*/
            //1080618	Leslie[1080424]	修正附件格式檢核邏輯	--END--
        }

        //1070506	Leslie[1070179]	新增取得來文附件清單的WS叫用函式
        function WsGetDocAttach(params, dfd) {
            window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetDocAttach", null, params, false, function (rtn, xml) {
                console.log(rtn, xml);

                if (rtn.ErrorClass.IsErr == "false") {
                    if (g_QueryDeferred) {
                        g_QueryDeferred.resolve(rtn);
                        g_QueryDeferred = null;
                    }
                }
                else {
                    if (g_QueryDeferred) {
                        g_QueryDeferred.reject(rtn);
                        g_QueryDeferred = null;
                    }
                }
            });

            if (dfd) {
                return dfd.promise();
            }
            return null;
        }
        //1060710 Cloud [1050087] 增加國合會客製化功能(功能原單號1030248-s
        function fnCheckUpLoad() {
            var nSendE = 0;			//電子交換數量
            var nSendEmail = 0;		//電郵數量
            var bEmailMatch = true;	//是否為內部信箱
            var nAllFileSize = 0;	//總共附件大小
            var bComfirm = false;		//是否跳出提示視窗
            var bIsAttach = false;	//是否有其中一個受文者含附件
            var rtn = true;
            var dmObj = $(mdl.accquireXml().documentElement);
            var ndOrgList = dmObj.find("受文者");
            if (ndOrgList && ndOrgList.length > 0) {
                for (var i = 0 ; i < ndOrgList.length ; i++) {

                    var pIssueType = ndOrgList.eq(i).find("發文方式").text();
                    var strEmail = "";
                    if (ndOrgList.eq(i).find("Email").length != 0)
                        strEmail = ndOrgList.eq(i).find("Email").text();

                    if (pIssueType == "電子郵件") {
                        var bIsMatch = strEmail.match(/.*?@icdf.org.tw/);
                        if (!bIsMatch)
                            bEmailMatch = false;
                        nSendEmail++;
                    }
                    else if (pIssueType == "電子交換") {
                        nSendE++;
                    }
                    if (ndOrgList.eq(i).find("含附件").text() == "是")
                        bIsAttach = true;
                }
            }
            var SettingNode = dmObj.find("附件下載區設定");
            if (SettingNode.length != 0) {
                var strIsUpLoad = dmObj.find("是否上傳至附件下載區").text();
                if (strIsUpLoad.text != "Y" || bIsAttach)//如果沒勾選上傳至附件下載區且其中一個受文者含附件，即進行檢核
                {
                    var root = dmObj.find("附件列表");
                    var ndAttachList = root.find("附件檔名");
                    if (ndAttachList.length != 0) {
                        for (var iAtt = 0; iAtt < ndAttachList.length; iAtt++) {
                            nAllFileSize += parseInt(ndAttachList.eq(iAtt).attr("大小"));
                        }
                        var nAttachSizeSendE = 0;
                        var nAttachSizeInternal = 0;
                        var nAttachSizeExternal = 0;
                        if (theSSO.User.SystemSets.get("DLG_ATTACH_SIZE_SET") != "") {
                            var strTempSize = theSSO.User.SystemSets.get("DLG_ATTACH_SIZE_SET").split("|");
                            if (strTempSize.length == 3) {
                                nAttachSizeInternal = parseInt(strTempSize[0], 10);//會內電郵
                                nAttachSizeExternal = parseInt(strTempSize[1], 10);//會外電郵
                                nAttachSizeSendE = parseInt(strTempSize[2], 10);//電子交換
                            }
                        }
                        if (nSendE != 0 && nAllFileSize > nAttachSizeSendE) {
                            bComfirm = true;//有電子交換受文者且附件大小大於設定
                        }
                        else if (nSendEmail != 0) {
                            if (nAllFileSize > nAttachSizeInternal && bEmailMatch) {
                                bComfirm = true;//有電子郵件受文者且附件大小大於設定無外部信箱
                            }
                            else if (nAllFileSize > nAttachSizeExternal && !bEmailMatch) {
                                bComfirm = true;//有電子郵件受文者且附件大小大於設定且有外部信箱
                            }

                        }
                        //如選擇"是"，將上傳至附件下載區選項勾起，並將所有受文者的是否含附件改為"否"
                        if (bComfirm) {
                            //var StrAttach = oDoc['tbOrgAttch'];
                            var bUpLoad = window.confirm("附件大小超過限制!\n\n您是否要將附件上傳至附件下載區?");
                            if (bUpLoad) {
                                //strIsUpLoad.text="Y";
                                //dmObj.find("是否上傳至附件下載區").text("Y");
                                mdl.text("//是否上傳至附件下載區", "Y");
                                if (dmObj.find("附件列表").find("文字").text().indexOf("識別碼") == -1) {
                                    try {
                                        //得識別碼功能
                                        var strHashString = "";
                                        if (theSSO.User.EnvSettings.get("DL_HAS_DOCHASH") == "Y") {

                                            var strDocNo = theAOL.docObj.docNo;
                                            var strOrgNo = theUserInfo.OrgID;
                                            if (strDocNo.length == 0 || strDocNo == "") {
												//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
												mdl.needRetransFO(true);
												$viewPort.find(".pages").flip("refresh");
                                                alert("無公文文號，無法取得識別碼，請先行要號後再勾選上傳至附件下載區。");
                                                $.modal.close();
												// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
												if(isMobile)
													window.history.back();
                                            }
                                            else {
                                                theWebServices.getDocHash(strOrgNo, strDocNo)
														.done(function (rtnValue) {
														    var strHashString = " 識別碼：" + rtnValue;
														    var attTxt = theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR") + strHashString + "。";
														    if ("text" in dmObj.find("附件列表").find("文字").get(0))
														        dmObj.find("附件列表").find("文字").get(0).text = attTxt;
														    else
														        dmObj.find("附件列表").find("文字").get(0).textContent = attTxt;
														    if (ndOrgList.length == 1)//如受文者只有一人
														    {
														        if ("text" in dmObj.find("附件列表").find("文字").get(0))
														            ndOrgList.eq(0).find("含附件").get(0).text = "否";
														        else
														            ndOrgList.eq(0).find("含附件").get(0).textContent = "否";
														    }
														    else {
														        for (var iorg = 0 ; iorg < ndOrgList.length ; iorg++) {
														            if ("text" in dmObj.find("附件列表").find("文字").get(0))
														                ndOrgList.eq(iorg).find("含附件").get(0).text = "否";
														            else
														                ndOrgList.eq(iorg).find("含附件").get(0).textContent = "否";
														        }
														    }
														    // 1060810 Raymond 儲存附件異動後一律重新整理頁面
														    mdl.needRetransFO(true);
														    $viewPort.find(".pages").flip("refresh");
														    $.modal.close();
															// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
															if(isMobile)
																window.history.back();


														})
														.fail(function (errorText) {
															//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
															mdl.needRetransFO(true);
															$viewPort.find(".pages").flip("refresh");
														    alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
														    $.modal.close();
															// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
															if(isMobile)
																window.history.back();
														});
                                            }
                                        }
                                    }
                                    catch (e)
                                    { }
                                    finally
                                    { }
                                }
                                else {
									//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
									mdl.needRetransFO(true);
									$viewPort.find(".pages").flip("refresh");
                                    $.modal.close();
									// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
									if(isMobile)
										window.history.back();
								}
                            }
                            else {
								//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
								mdl.needRetransFO(true);
								$viewPort.find(".pages").flip("refresh");
                                $.modal.close();
								// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
								if(isMobile)
									window.history.back();
							}
                        }
                        else {
							//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
							mdl.needRetransFO(true);
							$viewPort.find(".pages").flip("refresh");
                            $.modal.close();
							// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
							if(isMobile)
								window.history.back();
						}

                    }
                    else {
						//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
						mdl.needRetransFO(true);
						$viewPort.find(".pages").flip("refresh");
                        $.modal.close();
						// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
						if(isMobile)
							window.history.back();
					}
                }
                else {
					//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
					mdl.needRetransFO(true);
					$viewPort.find(".pages").flip("refresh");
                    $.modal.close();
					// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
					if(isMobile)
						window.history.back();
				}
            }
            else {
				//1100520	Leslie[1100464]	修正國合會客製化檢核邏輯後，未自動刷新文稿頁面的問題
				mdl.needRetransFO(true);
				$viewPort.find(".pages").flip("refresh");
                $.modal.close();
				// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
				if(isMobile)
					window.history.back();
			}
        }
        //1060710 Cloud [1050087] 增加國合會客製化功能(功能原單號1030248-e

        //1070528	Leslie[1070183]	新增附件分繕讀取受文者函式
        //初始化時建立畫面TABLE
        function fnInit(i, node) {
            var DeptInfo;
            //1080226	Leslie[1080089]	分繕表應使用「全銜」為鍵值，一併修正為新版分繕表格式，直接修改物件定義
            /*DeptInfo = 
			{
				"Seq": i+1,
				"Orgname": $(node).find("正式名稱").text(),
				"EmpName": $(node).find("姓名").text(),
				"OrgFullName": $(node).find("全銜").text(),
				"attach":  $(node).find("含附件").text()
			};*/
            let sn = $(node).attr("編號");
            if (sn == undefined || sn == "") {
                sn = g_maxSN++;
                node.setAttribute("編號", sn);	//直接把新編號寫回去
            }
            DeptInfo = {
                "Seq": i + 1,
                "name": $(node).find("全銜").text(),
                "userName": $(node).find("姓名").text(),
                "fullName": $(node).find("正式名稱").text(),
                "sn": sn,
                "attach": $(node).find("含附件").text(),
            }
            //g_AllDept[i] = DeptInfo.Orgname;
            g_AllDept[i] = DeptInfo;
            //1080226	Leslie[1080089]	分繕表應使用「全銜」為鍵值，一併修正為新版分繕表格式，直接修改物件定義	==END==
            fnCreatDeptTable(DeptInfo, node.tagName, i, node);
        }

        function fnCreatDeptTable(DeptInfo, NodeType, argSeq, node) {
            var $li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' ></div></li>").find('div');//取得第一個位置
            var $list = $dlg.find("#receiverList");//取得TABLE 畫面要放入區塊

            var colWidths = gcolWidthsDept;

            fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;'>").appendTo($li), colWidths[0], DeptInfo.Seq, "Dept_Seq_" + argSeq, "序");
            fnsetTablaColumn($("<input style='margin-top: 10px;' type='checkbox'>").appendTo($li), colWidths[1], "", "Dept_cel_" + argSeq, "選");
            //1080226	Leslie[1080089]	分繕表應使用「全銜」為鍵值，一併修正為新版分繕表格式，直接修改物件定義
            /*fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;'>").appendTo($li),colWidths[2],DeptInfo.Orgname,"Dept_lbOrgname_"+argSeq,"正式名稱","Org");
			fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;'>").appendTo($li),colWidths[3],DeptInfo.EmpName,"Dept_txEmpName_"+argSeq,"姓名","Org");
			fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;'>").appendTo($li),colWidths[4],DeptInfo.OrgFullName,"Dept_txOrgFullName_"+argSeq,"全銜","Org");*/
            fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;'>").appendTo($li), colWidths[2], DeptInfo.fullName, "Dept_lbOrgname_" + argSeq, "正式名稱", "Org");
            fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;'>").appendTo($li), colWidths[3], DeptInfo.userName, "Dept_txEmpName_" + argSeq, "姓名", "Org");
            fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;'>").appendTo($li), colWidths[4], DeptInfo.name, "Dept_txOrgFullName_" + argSeq, "全銜", "Org");
            fnsetTablaColumn($("<input style='margin-left:.2em;border-style:none;background-color:Transparent;font-weight:400;text-align: center;'>").appendTo($li), colWidths[5], DeptInfo.attach, "Dept_dlattach_" + argSeq, "含附件", "Org");

            $li.parent().appendTo($list);
        }

        //建立畫面欄位設定各屬性-及欄位連動註冊
        function fnsetTablaColumn(argobj, argWith, argval, argId, argTagName, argDeptType) {
            argobj.css("width", argWith).val(argval).attr("id", argId);
            if (!(argTagName == "選" || argTagName == "序")) {
                argobj.attr('title', argval)
            }
            //1080128	Leslie[1080089]	文字欄位設為readonly
            if (argTagName != "選")
                argobj.prop('readonly', true);
        }
        //1070528	Leslie[1070183]	新增附件分繕讀取受文者函式	--END--

        //1070528	Leslie[1070183]	附件分繕功能相關函式

        //取得指定附件的所有分繕受文者
        function fnGetAllDeptbyAtt(guid) {
            var rtn = [];
            var rCnt = g_mailMerge.count();
			//1100910	Leslie[1100842]	無分繕表時，rCnt回傳值為"0"，修正判斷條件
            //if (rCnt != null && guid != undefined) {
			if (rCnt != null && guid != undefined && rCnt > 0) {
                for (var ri = 0; ri < rCnt; ri++) {
                    var aCnt = g_mailMerge.countAtt(ri);
                    if (aCnt != null) {	//有<attach>，看有沒該附件
                        for (var ai = 0; ai < aCnt; ai++) {
                            if (g_mailMerge.getAtt(ri, ai).guid == guid)
                                rtn.push(g_mailMerge.get(ri, 0));	//分繕表紀錄中，陣列第一個值是受文者的全銜
                        }
                    }
                    else {	//沒有<Attach>，認定有指定附件，加入目前受文者
                        var name = g_mailMerge.get(ri, 0);
                        //1080128	Leslie[1080089]	分繕表使用「全銜」為鍵值
                        //var $dept = $(rawXml.documentElement).find("正式名稱:contains('"+name+"')");
                        var $dept = $(rawXml.documentElement).find("全銜:contains('" + name + "')");
                        if ($dept.length && $dept.parent().find('含附件').text() == '是')
                            rtn.push(name);
                    }
                }
            }
            else {
                //傳入guid為undefined時，為新增附件，預設為所有"含附件"的受文者，都有該附件
                //無分繕表時，亦同
                if (g_DeptHasAtt) {
                    $.each(g_DeptHasAtt, function (i, nm) {
                        rtn[i] = nm;
                    })
                }
                else {
                    g_DeptHasAtt = [];
                    $(rawXml.documentElement).find("受文者").each(function (i, n) {
                        if ($(n).find("含附件").text() == "是")
                            //1080128	Leslie[1080089]	分繕表使用「全銜」為鍵值
                            //g_DeptHasAtt[g_DeptHasAtt.length] = rtn[rtn.length] = $(n).find("正式名稱").text();
                            g_DeptHasAtt[g_DeptHasAtt.length] = rtn[rtn.length] = $(n).find("全銜").text();
                    });
                }
            }
			//1110105	Leslie[1101492]	公文於設定附件分繕後，再進行附件異動時，應一律更新分繕表
			if(rCnt > 0 && guid == undefined)
				g_MailMergeDirty = true;
            return rtn;
        }
        //1070528	Leslie[1070183]	附件分繕功能相關函式	--END--

        //1070929	Leslie[1070620]	新增附件下載區說明文字相關函式
        function setDlgStrReadOnly(argLabel, argDlgStr) {
			//1100513	Leslie[1100268]	補上先刪除後新增
			if ($('div[id="DlgStr"]').length > 0)
                $('div[id="DlgStr"]').remove();
			let total = 0;	//重算高度
			$('.simplemodal-data').children().each(function(idx,o){total += $(o).height()});
			$('#simplemodal-container').height(total+8);
			
            argLabel.append('<div id="DlgStr" style="margin-left: 110px;width: 65%;"><testarea readonly>' + HtmlEncode(argDlgStr) + '</testarea></div>');	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
            var h = $('#simplemodal-container').height();
            $('#simplemodal-container').height(h + 40);
        }
        //1070929	Leslie[1070620]	新增附件下載區說明文字相關函式	--END--

        //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
        function getDateStrToSave(argDateTimeStr) {
            var objDate = new Date();
            if (argDateTimeStr != undefined && typeof argDateTimeStr == "string")	//字串直接回傳不處理
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
                // return argDateTimeStr;
                return HtmlEncode(argDateTimeStr);
            var yy = objDate.getUTCFullYear() - 1911;
            var mm = (objDate.getMonth() + 1);
            var dd = objDate.getDate() + "";
            var hh = objDate.getHours() + "";
            var m = objDate.getMinutes() + "";
            return [yy, '/', mm >= 10 ? "" : "0", mm, '/', dd >= 10 ? "" : '0', dd, ' ', hh >= 10 ? "" : '0', hh, ':', m >= 10 ? "" : "0", m].join('');
        }

        $.modal($dlg, {
            //appendTo: $viewPort.closest("#iso"),
            //overlayCss: {width: $viewPort.closest("#iso").width(), height: $viewPort.closest("#iso").height()},
            //1070503	Leslie[1070179]	調整附件子視窗外觀
            //containerCss: {width: "700px", height: "480px"},
            //containerCss: {width: "870px", height: "572px"},
            containerCss: { width: "873px", height: "577px" },	//1070929	Leslie	一併配合不同瀏覽器，調整畫面大小
            close: false,		// 2016.8.24 不要顯示右上角關閉按鈕
            onShow: function () {
				// 1100329 Raymond 1090927 修正iOS Safari下若選取剛加入附件, 點擊「開啟」, 並選用「View」會直接用瀏覽器同一分頁檢視附件(DOC、PDF、影像檔), 按上一頁按鈕回到公文系統時會變成首頁而非附件子視窗的問題
				if(isMobile)
					window.history.pushState({foo: "bar"}, "附件子視窗", "#");

                // 取出已儲存的附件清單
                try {
                    total = mdl.getAttachFileCounts();
                    for (var i = 0; i < total; i++) {
                        var nd = mdl.getAttachFile(i);
                        if (nd) {
                            var $nd = $(nd);
                            var nm = $nd.attr("附件名"),
								desc = $nd.attr("摘要"),
								size = parseInt($nd.attr("大小")),
								guid = mdl.getAttachGUID(i),
								hash = mdl.getAttachHash(i),
								fname = $nd.text(),
								blbNm = $nd.attr("data-blob-name");
                            var hasDocNo = mdl.getAttachHashDocNo(i);	// 2016.12.2	Leslie	加入附件時是否已有文號
                            //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                            var uploadUser = $nd.attr("上傳人員");
                            var uploadTime = $nd.attr("上傳時間");
                            uploadUser = (uploadUser == undefined) ? '' : uploadUser;
                            uploadTime = (uploadTime == undefined) ? '' : uploadTime;
							// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
							var attInfo = mdl.getAttachInfo(i);
							var cusName = (attInfo != null)?attInfo.cusName:"";
							
							// 1141128 Raymond 1141255 修正備份後, 文稿檔中的data-blob-name會消失, 執行開啟附件檔時會變成改從未儲存上傳的FileServer下載, 導致下載錯檔案或發生錯誤的問題
							if(!blbNm && attInfo.origFileName?.match(/^blob:/)) {
								theLogger.log("文稿檔附件檔名節點無'data-blob-name'屬性, 但附件的origFileName是'blob:'開頭網址, 設定為blbNm");
								blbNm = attInfo.origFileName;
							}
							
							// 1110406	Leslie[1101578] 新增附件編輯相關功能
							if(attachDirectEdit){
								uploadUser = (attInfo != null && 'lastModifiedUser' in attInfo && 'lastModifiedRole' in attInfo)? attInfo.lastModifiedRole + '-' + attInfo.lastModifiedUser:'';
								uploadTime = (attInfo != null && 'lastModifiedTime' in attInfo)?attInfo.lastModifiedTime:'';
								if(uploadTime.length == 11){
									uploadTime = uploadTime.substr(0,3)+'/'+uploadTime.substr(3,2)+'/'+uploadTime.substr(5,2)+' '+uploadTime.substr(7,2)+':'+uploadTime.substr(9,2);
								}
							}

                            //2016.12.20	Leslie	載入時判斷目前附件是否有已匯出的(用於判斷刪除附件時,是否影響排序)
                            if (bEnableConvertAttPage && blbNm == undefined) {
                                hasRndrAtt = true;
                            }

							// 1110301 Raymond 1110106 合併1080815, 新增檢核可不匯出頁面的附件格式	1110302 沒有checkAllAtt參數, 因為沒有合併1080735內政部客製需求
							//if(checkAllAtt && !checkRawAttFormat({name:fname}) && !checkAttFormat({name:fname})){
							//	continue;
							//}

                            if (blbNm)
                                //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                                //addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo);	// 2016.12.2	Leslie	加入附件時是否已有文號
								// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                                //addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, undefined, uploadUser, uploadTime);
								// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊
								// addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, undefined, uploadUser, uploadTime, cusName);
								addItem(i, nm, desc, size, guid, hash, fname, blbNm, hasDocNo, undefined, uploadUser, uploadTime, cusName, attInfo);
                            else	// 存檔後data-blob-name會清除
                                //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
                                //addItem(i, nm, desc, size, guid, hash, fname, fname, hasDocNo);	// 2016.12.2	Leslie	加入附件時是否已有文號
								// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
                                //addItem(i, nm, desc, size, guid, hash, fname, fname, hasDocNo, undefined, uploadUser, uploadTime);
								// 1110408	Leslie[1101578]	配合附件編輯功能，增加紀錄原異動資訊
                                // addItem(i, nm, desc, size, guid, hash, fname, fname, hasDocNo, undefined, uploadUser, uploadTime, cusName);
                                addItem(i, nm, desc, size, guid, hash, fname, fname, hasDocNo, undefined, uploadUser, uploadTime, cusName, attInfo);
                        }
                        else {
                            alert("無法取得第" + i + "個附件資訊");
                        }
                    }
                }
                catch (e) {
                    theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
                    alert(e.message);
                }

                // 若有files則讀取新增
                if (typeof newFiles !== "undefined") {
                    for (var j = 0; j < newFiles.length; j++, i++) {
						// 1110301 Raymond 1110106 合併1080815, 新增檢核可不匯出頁面的附件格式
                        //2016.11.09	Leslie	加上格式檢核
                        //if (!checkAttFormat(newFiles[j]))
						if(!checkRawAttFormat(newFiles[j]) && !checkAttFormat(newFiles[j]))
                            i--;
                        else {
                            readFromFile(i, newFiles[j]);
                            addCnt++;//2016.11.09	Leslie	newFiles無法依一般陣列移除項目，故改用實際新增量數計算新增檔案數
                        }
                    }
					// 1110301 Raymond 1110106 合併1080815, 加入的附件符合不匯出頁面的格式設定要提示訊息
					if(attRawFmtWarn != ""){
						alert("此類檔案\n"+attRawFmtWarn+"無法匯出影像，僅以原始檔夾帶。");
						attRawFmtWarn = "";
					}
                    //2016.11.09	Leslie	加上格式檢核
                    if (attFmtErr != "") {
                        //2016.11.23	Leslie	依科長要求，修改訊息內容
                        //alert("附件\n"+attFmtErr+"不符合可供轉出頁面之附件格式。")
                        //1090415	Joe		1090179		新增系統參數WE_ATTACH_CHECK_MSG當附件檢核格式未過時，顯示自訂的錯誤訊息
                        // alert("附件\n"+attFmtErr+"不是符合現行規定之附件格式，請選擇符合規定之檔案格式。")
                        if (allowAttMsg == "")
                            allowAttMsg = "不是符合現行規定之附件格式，請選擇符合規定之檔案格式。";
                        alert("附件\n" + attFmtErr + allowAttMsg);
                        attFmtErr = "";
                    }
                    //1071224	Leslie[1070191]	增加檢核商用格式附件(黑名單)，並跳出警示訊息
                    if (attFmtWarning != "") {
                        //1071224	Leslie[1071232]	Merge後，修正可支援自訂格式訊息
                        //alert("您所夾帶的附件["+attFmtWarning+"]，為非ODF或PDF格式之檔案。");
                        alert("您所夾帶的附件[" + attFmtWarning + "]，為非ODF或PDF格式之檔案" + warningAttMsg + "。");
                        attFmtWarning = "";
                    }
                    //2016.11.09	Leslie	newFiles無法依一般陣列移除項目，故改用實際新增量數計算新增檔案數
                    //if(newFiles.length > 0)
                    if (addCnt > 0)
                        dirty = true;	// 2016.8.24 新增
                    total += j;
                }

                $dlg.on('click', function () {
                    $ul.find("a[data-role='button'],a[data-role='none']").remove();
                    $ul.find("a").removeClass("ui-btn-active");
                });

                //1070504	Leslie[1070179]	調整UI，取得Data檔設定值，設至附件文字選單
                thePublicRsrc.getDataXML(theUserInfo.OrgID).done(function (datDoc) {
                    var $src = $(datDoc.documentElement);
                    var ndAttText = $src.find("data[type='附件文字']");
                    if (ndAttText.length != 0) {
                        $dlg.find('#dlAttTextDefault').children().remove();
                        //$dlg.find('#dlAttTextDefault').append("<OPTION value=''></OPTION>");
                        var valAttText = ndAttText.find('代碼')
                        if (valAttText.length > 0) {
                            for (var ind = 0; ind < valAttText.length; ind++)
                                $dlg.find('#dlAttTextDefault').append("<OPTION value='" + HtmlEncode(valAttText.eq(ind).text()) + "'>" + HtmlEncode(valAttText.eq(ind).text()) + "</OPTION>");	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
                        }
                    }
                });
                $dlg.find('#dlAttTextDefault').on('change', function () { 
					$dlg.find('#attTxt').val($(this).val()) 
					//1110408	Leslie[1101578]	異動文字資訊，需儲存
					dirty = true;
				});
                //1070504	Leslie[1070179]	調整UI，取得Data檔設定值，設至附件文字選單	--END--
				
				// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
				if(showCustomName)
					$dlg.find("#attachMgmtHeader").show();

                $dlg.enhanceWithin();
                $dlg.css("padding", "0px");
                //1070503	Leslie[1070179]	調整UI
                //$dlg.find("#attachMgmtContent").css("height", "318px");
                $dlg.find("#attachMgmtContent").css("height", "348px");
                $dlg.find(".ui-btn-inline").removeClass("ui-btn-left ui-btn-right");

                //1070222	Leslie[1070120]	增加檢核公文開啟狀態是否不可異動附件(避免觸發匯出頁面)
                var fm = theAOL.getCurrFolio();
                if (fm.readOnly() || fm.disableSave()) {
                    $dlg.find('#btnY').addClass("ui-disabled");
                    $dlg.find('#btnAddNew,#btnRemoveAll,#btnRecover').addClass("ui-disabled");
					//1111221	Leslie[1111238]	新增檔案拖拉加入附件功能
					g_enableEditAtt = false;
                }

                //1070506	Leslie[1070179]	非創稿公文，才需要取得來文電子檔清單
                var _dfd = $.Deferred();
                if (!theAOL.docObj.isDraft) {
                    g_QueryDeferred = _dfd;
                    var paraws_GetDocAttach = {
                        "argArtifact": localStorage.Artifact
						, "argDocNo": theAOL.docObj.docNo
                    };
                    WsGetDocAttach(paraws_GetDocAttach, _dfd)
					.then(function (rslt) {
					    if (rslt.RtnField0.string && rslt.RtnField0.string.length > 0) {
					        $dlg.find('#dlRcvAtt').children().remove();
					        var arListName = rslt.RtnField0.string, arFileName = rslt.RtnField1.string;
					        for (var ind = 0; ind < arListName.length; ind++)
					            if (arListName[ind] != "本文中文轉碼前XML檔")
					                $dlg.find('#dlRcvAtt').append("<OPTION value='" + arFileName[ind] + "'>" + arListName[ind] + " - " + arFileName[ind] + "</OPTION>");
					        $dlg.find('#dlRcvAtt').selectmenu('refresh');
					    }
					    else {
					        //隱藏來文電子清單區塊
					        $dlg.find('#lbRcvAttArea').hide();
					        $dlg.find("#attachMgmtContent").css("height", "408px");
					    }
					})
					.fail(function (rtn) {
					    //隱藏來文電子清單區塊
					    $dlg.find('#lbRcvAttArea').hide();
					    $dlg.find("#attachMgmtContent").css("height", "408px");
					    alert(rtn.ErrorClass.ErrMessage);
					});
                }
                else {
                    //隱藏來文電子清單區塊
                    $dlg.find('#lbRcvAttArea').hide();
                    $dlg.find("#attachMgmtContent").css("height", "408px");
                }

                //1070504	Leslie[1070179]	增加拖曳功能
                $dlg.find('#divUl').sortable({
                    stop: function (event, ui) {
                        $(this).find('a').each(function (idx) {
                            var $currObj = $(this).data('fileObj');
                            $currObj.currIdx = idx
                            if (bEnableConvertAttPage) {
                                if (!$currObj.blbName.match(/^blob:/)) {	//其中任一個不是新增附件
                                    rndrAttDirty = true;	//設定要提示使用者，可能會重新匯出
                                }
                            }
							
							//1120606	Leslie[1120294]	修正分繕於附件順序異動後，應更新分繕表，並以異動後的檔名寫入
							if(g_mailMerge.count() > 0)
								g_MailMergeDirty = true;
							
							//1120320	Leslie[1120062]	增修附件異動後需確實觸發匯出頁面
							dirty = true;
                        })
                    }
                });
                //$dlg.find('#divUl').disableSelection();		//1070921	Leslie	實測，不影響拖曳功能，但會造成IE無法選取附件檔名文字，Marked

                if (bEnableConvertAttPage) {
                    $dlg.find('#divUl').find('a').each(function (idx) {
                        var $currObj = $(this).data('fileObj');
                        if (!$currObj.isNew && mdl.isAttRndrFinish($currObj.idx) === false) {		//有任何一個仍在匯出作業時
                            $dlg.find('#divUl').sortable("disable");							//關掉拖曳功能
                            arNotFinish.push($currObj.idx);										//紀錄仍在匯出的附件idx
                            g_allDone = false;
                            $dlg.find('#btnMultiMode').addClass('ui-disabled');
                        }
                    });

                    if ($dlg.find('#divUl').sortable("option", "disabled")) {					//拖曳功能關閉時，定期檢查是否均完成，若是，則重新開放
                        alert("仍有附件匯出未完成，拖曳及多選功能關閉，待附件滙出完成，相關功能自動開啟。");
                        var stopInt = setInterval(function () {
                            //1071130	Leslie	強制停止無用的Interval
                            if (g_StopInterval == true)
                                clearInterval(stopInt);

                            var allDone = true;
                            arNotFinish.forEach(function (idx) {
                                if (mdl.isAttRndrFinish(idx) === false) {
                                    allDone = false
                                }
                            });
                            if (allDone) {
                                $dlg.find('#divUl').sortable("enable");
                                $dlg.find('#btnMultiMode').removeClass('ui-disabled');
                                g_allDone = true;
                                clearInterval(stopInt);
                            }
                        }, 1000);
                    }
                }
                //1070504	Leslie[1070179]	增加拖曳功能	--END--

                //1070907	Leslie	多Merge的內政部功能，拿掉
                //1070507	Leslie[1070274]	增加檢核當前使用者是否有異動權限
                /*if(theAOL.docObj.ICUserId != theUserInfo.UserID && theUserInfo.RoleID != 'OD94'){
					g_hasEditPriv = false;
					$dlg.find("#btnAddNew,#btnRemoveAll,#btnRecover,#btAddRcvAtt,#btnMultiMode").addClass("ui-disabled");
					$dlg.find('#chkUploadToDL').attr('disabled', true);
					$dlg.find('#dlRcvAtt').attr('disabled', true);
					$dlg.find('#divUl').sortable("disable");
				}*/

                // 預設附件文字
                var attTxt = mdl.text("/*/附件列表/文字");
				// 1110105	Leslie[1101506]	公文同時設定上傳附件下載區及附件分繕後，修正附件說明文字的內容
				attTxt = attTxt.replace(g_txMergeAndUPLoad,'');
				
                //1070929	Leslie[1070620]	當啟用唯讀的附件下載區顯示時，增加處理附件文字
                if (theSSO.User.EnvSettings.get("WE_DLG_ATTACH_STR_READONLY") == "Y") {
                    var xml = mdl.accquireXml();
                    var ndTxt = $(xml.documentElement).find("附件列表>文字");
                    if (ndTxt.attr("DlgStr") && ndTxt.attr("DlgStr") != "") {
                        var sDlgStr = ndTxt.attr("DlgStr");
                        attTxt = attTxt.replace("　" + sDlgStr, "");
                        var lb = $dlg.find('#attTxt').closest('label');
                        setDlgStrReadOnly(lb, sDlgStr);
                    }
                }
                $dlg.find("#attTxt").val(attTxt);
                
                //1131224	Leslie[北榮序282]	比照一代，顯示合計大小
				if($dlg.find('#TotleSize').length == 0)
					$dlg.find('h1.ui-title').after('<label class="ui-title" id="TotleSize" aria-level="1" style="position: absolute;top: 0px;right: -240px;">合計：'+GetKbSize(g_TotleSize)+' KB</label>')
                //顯示附件下載區的CheckBox
                ShowDLSetting();
				
				//1140722	Leslie[1140381]	判斷是否已有分繕表，若無，則隱藏「匯出分繕表」功能鍵
				if(g_mailMerge.count() == 0)
					$dlg.find('#btnExportMailMerge').hide();
            }
        });
    });

};

(function () {
    if (window.theModMgr != undefined)
        window.theModMgr.install("RD-AttachMgmt.js").finish();
})();