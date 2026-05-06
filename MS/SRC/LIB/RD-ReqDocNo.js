// 要號功能模組
//	掛在nsEditor命名空間下
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1060512	Raymond		Raymond		-------		新增GetNo回傳值是否為錯誤訊息的條件判斷
// 1080923  Kevin       Eric        1080339     jQuery 3.0 upgrade
// 1100709	Raymond		Raymond		1100581		新增判斷環境參數WE_AUTO_FILL_ISSUE_NO若啟用, 要號後自動批次取得發文字號
// 1120508	Leslie		Leslie		1110513		修正要號後的自動儲存，應正確執行錯誤處理
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式允許手動輸入文號, 不顯示線上要號按鈕
// 1131118	Raymond		Raymond		聯合序381	修正紙本公文手動輸入文號按確定後, 文號頁籤不會變成所輸入文號的問題

var nsEditor = nsEditor||{};

nsEditor.onReqDocNoVisible = function() {
	return true;
}

nsEditor.onReqDocNo = function(event){
	
	var $viewPort = event.data;
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	
	var docNoManual = theSSO.User.EnvSettings.get("OD_DOCNO_MANUAL") == "Y",
		docNoLen = theSSO.User.SystemSets.get("DOCNO_LEN"),
		docNoLimit = ("docNoLimit" in SSO_CONFIG)?SSO_CONFIG.docNoLimit:0;
		if(docNoLen.length > 0 && Number(docNoLen) > 0)
			docNoLen = Number(docNoLen);
		else
			docNoLen = 10;	// 預設10碼
	var reqDocNoUrl = theUserInfo.WSDL4GetDocNo;
	var docNoRequested = false;	// 2016.8.26 目前文號是否是線上取得, 是則不允許再修改
	
	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式允許手動輸入文號
	if(!!theSSO && theSSO.offlineMode == true)
		docNoManual = true;
	
	
	Util.getDlg("RD-ReqDocNo.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		$dlg.find("footer > div").unwrap();
		if(docNoManual) {
			if(theAOL.docObj.docNo.length > 0 && theAOL.getCurrFolio().isDocNoRequested()) {	// 2016.8.26 新增判斷文號是否為線上取得
				theLogger.log("目前的公文文號是線上取得, 不允許手動修改");
				$dlg.find("#docNo").prop("readonly", true);
			}
			else if(theAOL.docObj.isDraft && theAOL.docObj.signType == "P") {
				$dlg.find("#docNo").attr("maxlength", docNoLen)
				.on("input", function() {
					var $ok = $dlg.find("#ok");
					if($ok.hasClass("ui-disabled") && $(this).val().length > 0)
						$ok.removeClass("ui-disabled");
					else if(!$ok.hasClass("ui-disabled") && $(this).val().length == 0)
						$ok.addClass("ui-disabled");
					
					var $gdn = $dlg.find("#getDocNo");
					if($gdn.hasClass("ui-disabled") && $(this).val().length == 0)
						$gdn.removeClass("ui-disabled");
					else if(!$gdn.hasClass("ui-disabled") && $(this).val().length > 0)
						$gdn.addClass("ui-disabled");
				});
			}
			else {
				theLogger.warn("紙本草稿公文才允許手動修改文號");
				$dlg.find("#docNo").prop("readonly", true);
			}
		}
		else {
			$dlg.find("#docNo").prop("readonly", true);
		}
		// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不顯示線上要號按鈕
		if(!!theSSO && theSSO.offlineMode == true) {
			$dlg.find("#getDocNo").hide();
		}
		else {
			$dlg.find("#getDocNo").on('click', function() {
				var thisBtn = this;
				// 呼叫WS取號 theWebServices.
				theLogger.log("呼叫要號WS...");
				// 2016.8.11 取號參數從theUserInfo改成基資來的
				theWebServices.invokeWS(reqDocNoUrl, "GetNo", "T2100", {OrgNo: theAOL.docObj.sourceOrgNo, Deptment: theAOL.docObj.ICOUId}, true, function(r) {
					// 1060512 Raymond 新增回傳值是錯誤訊息的判斷
					theLogger.log("要號WS回傳:'" + r + "'");
					if(r.match(/錯誤：/g))
						alert(r.substr(3));
					else {
						$dlg.find("#docNo").val(r).prop("readonly", true); // 2019.11.18 - 1080339 Eric, attr()->prop
						$(thisBtn).addClass("ui-disabled");
						if(!$dlg.find("#cancel").hasClass("ui-disabled"))	// 系統要號後不能取消
							$dlg.find("#cancel").addClass("ui-disabled");
						if($dlg.find("#ok").hasClass("ui-disabled"))
							$dlg.find("#ok").removeClass("ui-disabled");
						$(".simplemodal-close").hide();		// 2016.8.26 要號後不可點右上角關閉圖示, 會直接關閉子視窗
						docNoRequested = true;	// 2016.8.26 註記此文號是線上取得的, 不允許再次修改
						
						$("#aol #tabbar a").filter(function() {
							var res = this.id == "folio_" + theAOL.docObj.msgId;
							return res;
						}).text(r);	// 設定頁籤文號
					}
				});
			});
		}
		$dlg.find("#ok").on('click', function() {
			// 1131118 Raymond 聯合序381 修正紙本公文手動輸入文號按確定後, 文號頁籤不會變成所輸入文號的問題
			var oldMsgId = theAOL.docObj.msgId;	// 設定文號前先取得舊的msgId, 因為紙本草稿改成要號後草稿msgId就會變成正式msgId
			// 儲存文號
			// 1100709 Raymond 1100581 autoSaveForDraftDocNoChange會搬子目錄, 移至設定完各文稿的發文字號後再進行, 否則若有尚未下載的DraftModel在搬到文號-00-99子目錄時可能會找不到
			theAOL.getCurrFolio().setDocNo($dlg.find("#docNo").val(), docNoRequested)	// 2016.8.26 新增第2參數標示是否是線上取得的文號
			.done(function() {
				//1120509	Leslie[1110513]	補上錯誤處理
				function _finish(){
					$("#aol #tabbar a").filter(function() {		// 2016.11.28 fix for 手動取號不會更新頁籤文字的問題
						// 1131118 Raymond 聯合序381 修正紙本公文手動輸入文號按確定後, 文號頁籤不會變成所輸入文號的問題
						//var res = this.id == "folio_" + theAOL.docObj.msgId;
						var res = this.id == "folio_" + oldMsgId;
						return res;
					}).text($dlg.find("#docNo").val());	// 設定頁籤文號
					$viewPort.find(".pages").flip("refresh");	// 2016.7.21 要號後刷新文面
					$.modal.close();
				}
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要取號後自動儲存
				if(!theSSO || theSSO.offlineMode != true) {
					// theAOL.autoSaveForDraftDocNoChange();	//2017.2.8	Leslie	要號後自動儲存公文基資
					theAOL.autoSaveForDraftDocNoChange()
					.done(function(){	//2017.2.8	Leslie	要號後自動儲存公文基資
						_finish();
					})
					.fail(function(err) {
						theLogger.error("要號後，自動儲存至公文目錄發生異常! " + err.errCode + ":" + err.errMsg);
						alert("要號後，自動儲存至公文目錄發生異常!\n\n" + err.errCode + ":" + err.errMsg + "\n\n 請檢查相關附件檔案是否需重新加入。");	// 2016.10.11 FIX
						_finish();
					});
				}
				else
					_finish();
			});
		});
		$dlg.find("#cancel").on('click', function() {
			$.modal.close();
		});
		$.modal($dlg, {
			appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
			overlayCss: {width: w, height: h},
			containerCss: {width: "370px", height: "190px"},
			onShow: function() {
				$dlg.trigger("create");
				
				if(theAOL.docObj.docNo.length > 0) {
					$dlg.find("#docNo").val(theAOL.docObj.docNo);
					$dlg.find("#getDocNo").addClass("ui-disabled");
				}
				$dlg.find("#ok").addClass("ui-disabled");
			}
		});
	});   
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ReqDocNo.js").finish();
})();