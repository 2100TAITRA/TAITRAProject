if(!("nsEditor" in window))
	window.nsEditor = {};
	
window.nsEditor.onNewAtt = function(event, callback){
	var $viewPort = event.data;
	var mdl = this;	// DraftModel object
	
	var $inp = $("#aol").find("#addAttachments");
	if($inp.length == 0)
		$inp = $("<input type='file' multiple id='addAttachments' style='display:none;'>").appendTo("#aol");
	// 2016.8.25 改用one來綁定一次性change event, 因為每次change要對應不同mdl參數, 不unbind的話, 都只會吃到第1次傳入的mdl參數
	$inp.one("change", mdl, function(event) {
		var thisModel = event.data;
		var files = this.files;
		if(files.length) {
			if("onAttachMgmt" in nsEditor)
				nsEditor.onAttachMgmt.call(thisModel, event, callback, files);	// 多傳入files參數
			else
				alert("未掛載附件管理模組, 無法開啟附件子視窗");
		}
		else {	// 2016.9.1 IE在清空value時會觸發onchange, 須重bind一次
			theLogger.warn("未選檔案! 重新再bind一次");
			$(this).one("change", thisModel, arguments.callee);
		}
	});
	if(mdl == null)
		alert("來文及唯讀文稿不可新增附件");
	else
		$inp.val("").trigger('click');	// 2016.8.25 fix 先清空再click
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-NewAttach.js").finish();
})();