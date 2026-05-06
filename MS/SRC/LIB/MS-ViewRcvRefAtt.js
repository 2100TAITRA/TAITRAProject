/*	DATE		SA		PG		MGRNO		Desc
	1110816		Kevin	Kevin	1110633		新增來文參考附件檢視
	1140723		Kevin	Leslie	1141011		弱掃修正[Client DOM XSS]
	1140801		Kevin	Leslie	1141011		弱掃修正[Client Dynamic File Inclusion]
*/
// 參考附件功能模組
//	掛在nsEditor命名空間下
//	
var nsEditor = nsEditor||{};

nsEditor.onViewRcvRefAttVisible = function() {
	return true;
}

nsEditor.onDlRcvRefAttVisible = function(view, model, draftIdx) {

	var res = false;
	var params = {
		"argArtifact": localStorage.Artifact,
		"argDocNo": theAOL.docObj.docNo
	};
	console.log("查詢來文參考檔案");
	
	if(!model.RcvRefAtt)
	{
		window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetRcvRefAttInfo", null, params, false, function (rtn, xml) {

			console.log(rtn, xml);

			if (rtn.bSuccess == "true") {
				
				model.RcvRefAtt = rtn;
				res = rtn.bHaveAtt;
			}
			else {
				alert(rtn.strErrMsg);
			}
		});
	}
	
	if(model.RcvRefAtt.bHaveAtt)
		res = (model.RcvRefAtt.bHaveAtt === 'true');
	
	return res;
};

nsEditor.onDlRcvRefAtt = function(view, model, draftIdx) {
	
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
		
	var sn = 0;
	
	Util.getDlg("MS-ViewRcvRefAtt.html").done(function($dlg) 
	{
		var $ul = $dlg.find('#RcvRefAttList');
		var choose;
		var currItem = undefined;
		
		//增加防止名稱被清空
		$dlg.find('#RcvRefAttList').on('blur','#refFileName',function(){if(this.innerHTML == ""){this.innerHTML=this.title;this.focus();}})
		
		$dlg.find("header > h1").unwrap();
	
		var $list = $dlg.find("#RcvRefAttList");
	
		var colWidths = [];
		$dlg.find(".ui-table-header .ui-table-column-header").each(function(i, elem) {
			colWidths.push($(elem).css("width"));
		});
		
		$.modal($dlg, {
			appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
			overlayCss: {width: w, height: h},
			containerCss: {width: "700px", height: "443px"},
			close: false,
			onShow: function() {
				
				$dlg.trigger("create");

				var total =  model.RcvRefAtt.cRcvAtt.RcvAtt.length;
				if(total)
				{
					for(var i=0;i<total;i++)
					{
						let nd = model.RcvRefAtt.cRcvAtt.RcvAtt[i];
						
						var sn = nd.strSeqNo,
							nm = nd.strName,
							desc = nd.strDesc,
							user = nd.strUser,
							newTime = nd.strTime;
						
						addItem(sn, nm, desc,  user,  newTime, nd);
					}
				}
				else
				{
					let nd = model.RcvRefAtt.cRcvAtt.RcvAtt;
						
						var sn = nd.strSeqNo,
							nm = nd.strName,
							desc = nd.strDesc,
							user = nd.strUser,
							newTime = nd.strTime;
						
						addItem(sn, nm, desc,  user,  newTime, nd);
					
				}
				$ul.listview("refresh");
			}
		});
		
		// 加入清單, nm:附件名, desc:摘要
		function addItem(sn, nm, desc,   user,  newTime, refAtt) {
			
			var $li = $("<li class='ui-table-item'></li>");

			//$("<div class='ui-table-column-item'>" + sn + "</div>").appendTo($li).css("width", colWidths[0]);
			$("<div class='ui-table-column-item' id='addName' title='"+nm+"'>"+nm+"</div>").appendTo($li).css("width", colWidths[1]);
			$("<div class='ui-table-column-item' id='addDesc' title='"+desc+"'>"+desc+"</div>").appendTo($li).css("width", colWidths[2]);
			$("<div class='ui-table-column-item' id='addDesc' title='"+user+"'>"+user+"</div>").appendTo($li).css("width", colWidths[3]);
			$("<div class='ui-table-column-item' id='addTime'>"+newTime +"</div>").appendTo($li).css("width", colWidths[4]);
			
			$li.appendTo($list)
			.data("fileObj", { refAtt:refAtt})
			.on('click', function() {
				$dlg.find(".ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				currItem = $(this);
				choose = $(this).data("fileObj");
				
			});
		}
		
		/* COPY END */

		//關閉
		$dlg.find("#btnClose").on('click', function() {
			$.modal.close();
		});
		
		//下載
		$dlg.find("#dl").on('click', function() {
			
			if(!choose){
				alert("請選擇欲下載之參考附件!");
				return ;
			}
			//choose.refAtt
			
			var that = this;

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
			var wfio = new WebFileIO(model.RcvRefAtt.strIoWs);
			var rcvAttPath = model.RcvRefAtt.strPath ;
			var rcvAttFileName =  choose.refAtt.strName;

			wfio.download(rcvAttPath, rcvAttFileName, {
				
				keepRawData: true,	// 保持原始資料格式(Typed Array)
				//async: false,	
				success: function (fil, all) {
					
					var blb = new Blob([fil], { type: getMimeType(rcvAttFileName) });
					if(navigator.userAgent.indexOf("Trident") >= 0) {
						if("msSaveBlob" in navigator)	// IE10/11專屬下載function
							navigator.msSaveBlob(blb, rcvAttFileName);
						else
							theLogger.error("無msSaveBlob函式");
					}
					else {
						var a = window.document.createElement("a");
						//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// a.href = window.URL.createObjectURL(blb);
						//1140801	Leslie[1141011]	弱掃修正[Client Dynamic File Inclusion]
						// a.href = encodeURI(window.URL.createObjectURL(blb));
						var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
						var reUrl = re.exec(window.URL.createObjectURL(blb))[0];
						a.href = encodeURI(reUrl);
						a.download = rcvAttFileName;
						document.body.appendChild(a);
						a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
						document.body.removeChild(a);
					}
				},
				error: function (errorText) {
					alert(errorText);
				}
			});
		});
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ViewRefAtt.js").finish();
})();