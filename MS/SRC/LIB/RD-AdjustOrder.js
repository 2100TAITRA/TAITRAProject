// 調整稿序功能模組
//	掛在nsEditor命名空間下
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1060825	Raymond		Raymond		1060789		依系統部分單新增判斷結案狀態公文不允許異動稿序
// 1070608	Raymond		Raymond		1070197		依主辦或會辦單位過濾可調整稿序的文稿清單
// 1080917 1080339     Kevin   Eric    [jQuery 3.0 upgrade]將全部 .click/.change(fn) sortcut 改成 .on('click'|'change' , fn)
//									.bind() => .on()
// 1090916	Raymond		Raymond		1090546		信保基金特殊模式公文不提供自訂稿序功能

var nsEditor = nsEditor||{};

nsEditor.onAdjustOrderVisible = function(fm) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	// 2016.10.20 判斷不允許編輯
	if(fm && fm.enableEdit())
		return true;
	return false;
}

nsEditor.onAdjustOrder = function(event, fm){
	
	var $viewPort = event.data;
	var that = this;
	
	// 1060825 Raymond 1060789 依系統部分單新增判斷結案狀態公文不允許異動稿序
	var docObj = fm.getDocObj();
	if("CLOSE_TYPE" in docObj.ODWMSG && (docObj.ODWMSG.CLOSE_TYPE == "1" || docObj.ODWMSG.CLOSE_TYPE == "2") &&
		"DOC_STATE" in docObj.ODWMSG && parseInt(docObj.ODWMSG.DOC_STATE) >= 9) {
		theLogger.warn("已結案公文禁止異動稿序");	// 1100419 fix typo "己"->"已"
		alert("已結案公文禁止異動稿序");			// 1100419 fix typo "己"->"已"
		return;
	}
	
	function populate($dlg) {
		var $dl = $dlg.find("#draftList");
		var n = fm.getDraftCounts();
		if(fm.getSignType() == "E" && fm.getSignFolder().hasFromDoc())	// 2016.11.23 線上簽核且有來文則排除來文
			n--;
		// 1070608 Raymond 1070197 依主辦或會辦單位過濾可調整稿序的文稿清單
		var isConUnit = fm.isConUnit();
		//for(var i=0; i<n; i++) {
		for(var i=0, j=0; i<n; i++) {
			var draftOU = fm.getConDraftUnitNo(i);
			if ((isConUnit && draftOU == fm.getDocObj().ownOUId.substr(0, 2)) ||	// 會辦公文, 同單位的文稿才可以調整稿序
				(!isConUnit && draftOU == "00")) {					// 主辦, 00子目錄的文稿才可以調整稿序
				var dn = {
					origIdx: i,			// 封裝檔的索引
					origMgmtIdx: j++,	// 各別主會辦子目錄中DraftMgmt的索引
					name: fm.getDraftName(i)
				};
				$("<li data-icon='false'><a>" + dn.name + "</a></li>").appendTo($dl)
				.find("a")
				.data("dn", dn)
				.on('click', function(event) {
					event.preventDefault();
					if(event.target.tagName == "INPUT")	// 2016.11.18 避免點更名欄位還會出現按鈕問題
						return false;
					else {	// 點更名欄位外或其它LI則恢復名稱並移除INPUT
						var $inp = $dl.find("input");
						if($inp.length)
							$inp.parent().text($inp.parent().data("dn").rename || $inp.parent().data("dn").name);	// 若已更名過則顯示新名稱
					}
					$dl.find("button").remove();
					$dl.find("li a").removeClass("ui-btn-active");
					$(this).addClass("ui-btn-active");
					
					var $prev = $(this).closest("li").prev("li");
					$("<button style='position:absolute; margin:0px; top:0px; right:100px;'" + (($prev.length == 1)?"":" class='ui-disabled'") + ">上移</button>").appendTo(this)
					.buttonMarkup({corners: true, shadow: true, theme: 'b', icon: 'arrow-u', iconpos: 'right', inline: true})
					.on('click', function() {
						var $prev = $(this).closest("li").prev("li");
						if($prev.length == 1) {
							var dis = $prev.prev("li").length == 0;
							$prev.before($(this).closest("li"));
							if(dis)
								$(this).addClass("ui-disabled");
							$(this).next("button").removeClass("ui-disabled");
							
							$dlg.find("#ok").removeClass("ui-disabled");
						}
						return false;
					});
					var $next = $(this).closest("li").next("li");
					$("<button style='position:absolute; margin:0px; top:0px; right:0px;'" + (($next.length == 1)?"":" class='ui-disabled'") + ">下移</button>").appendTo(this)
					.buttonMarkup({corners: true, shadow: true, theme: 'b', icon: 'arrow-d', iconpos: 'right', inline: true})
					.on('click', function() {
						var $next = $(this).closest("li").next("li");
						if($next.length == 1) {
							var dis = $next.next("li").length == 0;
							$next.after($(this).closest("li"));
							if(dis)
								$(this).addClass("ui-disabled");
							$(this).prev("button").removeClass("ui-disabled");
							
							$dlg.find("#ok").removeClass("ui-disabled");
						}
						return false;
					});
					// 2016.11.18 新增更名功能
					var that = this;
					$("<button style='position:absolute; margin:0px; top:0px; right:200px;'>更名</button>").appendTo(this)
					.buttonMarkup({corners: true, shadow: true, theme: 'b', icon: 'edit', iconpos: 'right', inline: true})
					.on('click', function() {
						$dl.find("button").remove();
						$(that).empty();
						var nm = $(that).data("dn").rename || $(that).data("dn").name;	// 若有更名過則顯示新名稱
						$("<input value='" + nm + "'>").appendTo(that)
						// 2019.9.18 - 1080339 Eric, .change() => .trigger( 'change')
						.on('change', function() {
							$(that).data("dn").rename = this.value;	// 更名後的新名稱記錄在rename
							$(that).text(this.value);
							$(this).remove();
							
							$dlg.find("#ok").removeClass("ui-disabled");	// 有更名則允許儲存
						});
						return false;
					}).trigger('focus'); // 2019.9.18 - 1080339 Eric, .focus() => .trigger( 'focus')
				});
			}
		}
		$dl.listview("refresh");
	}
	
	Util.getDlg("RD-AdjustOrder.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		//$dlg.find("footer > div").unwrap();        
		$dlg.find("#ok").on('click', function() {
			// 儲存
			var currIdx = $viewPort.data("view").currDraftIndex(), newIdx = 0;
			var param = [];
			$dlg.find("#draftList a").each(function(i, elm) {
				var dn = $(elm).data("dn");
				if(dn.origIdx == currIdx)
					newIdx = i;
				param.push(dn);
			});
			fm.adjustOrder(param);
			$viewPort.data("view").updateDraftTags(newIdx, param);	// 2016.12.11 更新頁籤時多傳入調整稿序的參數給FolioView
			$.modal.close();
		});
		// 取消
		$dlg.find("#cancel").on('click', function() {
			$.modal.close();
		});
		// 回復
		$dlg.find("#btnRestore").on('click', function() {
			$dlg.find("#draftList").find("li").remove();
			populate($dlg);
			
			$dlg.find("#ok").addClass("ui-disabled");
		});
		
		var w = $viewPort.closest("#aol").width(),
			h = $viewPort.closest("#aol").height();
		$.modal($dlg, {
			appendTo: $viewPort.closest("#aol"),
			overlayCss: {width: w, height: h},
			containerCss: {width: "400px", height: "440px"},
			onShow: function() {
				$dlg.trigger("create");
				
				populate($dlg);
			}
		});
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-AdjustOrder.js").finish();
})();