// 驗簽功能模組
//	掛在nsEditor命名空間下
//	2016.5.4 新增onVerifyEnveVisible
// 1080117 Raymond	-------	刪除測試用argEnvePath全徑名, for 弱掃
// 1080815 Raymond	-------	修正VerifyEnve回傳值的arrNotPaseList只有1個string時, 型別不是array, 導致被切成1個字1個字的問題
// 1080927 Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1131025 Leslie	屏東序1128	修正顏色太相近問題

var nsEditor = nsEditor||{};

nsEditor.onVerifyEnveVisible = function(fm) {
	return fm.getSignType() == "E";	// 2016.11.23 fix 線上簽核才有驗簽
}

nsEditor.onVerifyEnve = function(event, fm){
	
	var $viewPort = event.data;
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	
	Util.getDlg("RD-VerifyEnve.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		$dlg.find("footer > div").unwrap();        
		$dlg.find("#close").on('click', function(event) {
			$.modal.close();
		});
		$.modal($dlg, {
			appendTo:$viewPort.closest(".ui-pane-a, .ui-pane-b"),
			overlayCss:{height:h, width:w},
			minHeight:440,
			autoResize: true,
			onShow: function() {
				SSOUtil.loading( "show", { theme: "c", text: "簽章驗證檢核中...", textVisible: true});
				
				if ("theWebServices" in window) {
					
					if (!("getVerifyEnve" in window.theWebServices)) {
						//1060120 Kevin 調整為呼叫公文實體檔案所在位置伺服器
						//var _envelopeWS = SSO_CONFIG.getWSUrl('envelopews'); //theWebServices.host + "/EnvelopeWS/xmldsig.asmx";
					    var _envelopeWS = theAOL.docObj.fileIOWS.replace('http://', '').replace('https://', '');
						_envelopeWS = theAOL.docObj.fileIOWS.substring(0, theAOL.docObj.fileIOWS.indexOf('/')) + "//" + _envelopeWS.substring(0, _envelopeWS.indexOf('/')) + "/EnvelopeWS/xmldsig.asmx";
						
						window.theWebServices.getVerifyEnve = function($dlg){
							var params = {
								"argArtifact": window.theUserInfo.Artifact,
								"argStatus": "ENVE_WAITSIGN"};
							params.argEnvePath = theAOL.docObj.fileStoragePath + "\\" + theAOL.docObj.fileSubDir + "\\" + theAOL.docObj.docNo + ".si";
							window.theWebServices.invokeWS(_envelopeWS, "VerifyEnve", null, params, true, function(r,xml) {
								//console.log(xml);
								if (r.bPassVerify=="true") { 
									// 1131025 Leslie	屏東序1128	修正顏色太相近問題
									// $dlg.find("#ul").append("<li data-theme='b'><h3 style='color: #fff; font-size: 20px;'>簽章驗證檢核通過!</h3></li>");
									$dlg.find("#ul").append("<li data-theme='b'><h3 style='font-size: 20px;'>簽章驗證檢核通過!</h3></li>");
								}
								else{
									if("arrNotPassList" in r) {
										$dlg.find("#ul").append("<li data-role='list-divider' data-theme='b'>簽章驗證檢核失敗!</li>");
										
										// 1080815 Raymond 修正只有1個string時, 不是array, 導致被切成1個字1個字
										if(SSOUtil.typeOf(r.arrNotPassList.string) == "array") {
											for (var i=0;i<r.arrNotPassList.string.length;i++) {
												$dlg.find("#ul").append("<li data-theme='c'><h3>"+r.arrNotPassList.string[i]+"</h3><p>"+r.arrNotPassListMsg.string[i]+"</p></li>");
											}
										}
										else if(typeof r.arrNotPassList.string === "string")
											$dlg.find("#ul").append("<li data-theme='c'><h3>"+r.arrNotPassList.string+"</h3><p>"+r.arrNotPassListMsg.string+"</p></li>");
										else
											theLogger.error("VerifyEnve回傳值arrNotPassList.string既不是陣列也不是字串, 無法呈現錯誤內容");
									}
									else if("ErrorClass" in r) {	// 2016.5.4 新增顯示WS回傳的ErrorClass錯誤訊息
									
										$dlg.find("#ul").append("<li data-role='list-divider' data-theme='b'>簽章驗證檢核時發生錯誤!</li>");
										
										var code, msg;
										if ("ErrCode" in r.ErrorClass &&
											"anyType" in r.ErrorClass.ErrCode)
											code = r.ErrorClass.ErrCode.anyType.text;
										if ("ErrMessage" in r.ErrorClass &&
											"anyType" in r.ErrorClass.ErrMessage)
											msg = r.ErrorClass.ErrMessage.anyType.text;
											
										$dlg.find("#ul").append("<li data-theme='c'><h3>" + code + "</h3><p>" + msg + "</p></li>");
									}
								}
								$dlg.find("#ul").listview("refresh");
								$.mobile.loading( "hide" );
							});                                                      
						}
					}
				}
				
				$dlg.trigger("create");
				window.theWebServices.getVerifyEnve($dlg);
			}
		})
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-VerifyEnve.js").finish();
})();