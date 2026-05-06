/* DATE		MGRNO		SA		PG		Desc
   1070515	1070298		David	Eric	新增參考公文設定子視窗功能框架
   1070525	1070298		David	David	實作參考公文設定子視窗功能
   1070730	-------		Raymond	Raymond	修正開啟草稿時點擊參考公文設定, 都會出現錯誤的問題
   1100626	1080761		David	David	Merge至共通版
   1110708	1110728		Raymond	Raymond	修正開啟參考公文設定後, 「齒輪」選單未關閉問題
*/
if(!("nsEditor" in window))
	window.nsEditor = {};
	
window.nsEditor.onRefDocMgmt = function(event, callback, newDocs) {
	var $viewPort = event.data;
	var total = 0;// 計數
	var dirty = false;
	var g_QueryDeferred = null;
	var refDocList = [];
	
	Util.getDlg("RD-RefDocMgmt.html").done(function($dlg) {
		
		var $ul = $dlg.find("#divUl");
		var currItem = undefined;
		let dirty = false;
		
		$dlg.find("#btnY").on('click', function(event) {
			// 使用者按下確認鍵:
			// 1. 關閉子視窗, 儲存異動(?)
			// 2. (?)開啟ViewDoc模組檢視指定參考公文內容!

			// 開啟參考公文範例
			//SSOUtil.viewRefDoc(localStorage.Artifact, '1051402454', '301000000A', 'P'); // @RD-SysUtil.js

			var arrRefDoc = [];

			$ul.find("li > a").not("[data-role='button']").each(function(idx, a) {
				var Robj = $(a).data("RefDocObj");
				
				var SaveRefDocComObj = {
					DOC_NO: Robj.DOC_NO
					,SUBJECT: Robj.SUBJCT
					,REF_DESC: Robj.REF_DESC
					,SIGN_TYPE: Robj.SIGN_TYPE
					,ADD_DATE: Robj.ADD_DATE
					,ADD_TIME: Robj.ADD_TIME
				};

				arrRefDoc.push(SaveRefDocComObj);
			});
			
			var arrODWMSG = [];
			arrODWMSG.push({fieldname: 'REF_DOC', value: arrRefDoc});
			theAOL.docObj.set('ODC010', 'ODWDCM', arrODWMSG);
			
			if(typeof callback !== "undefined" && $.isFunction(callback))
				callback();
			if(confirm("參考公文已儲存完畢,是否要關閉視窗？"))
			{
				$.modal.close();
			}
		});

		$dlg.find("#btnN").on('click', function(event) {
			if(dirty) {	//異動提示警告
				if(!confirm("參考公文清單內容已異動, 請問是否不儲存異動, 關閉設定子視窗?"))
					return false;
			}
			$.modal.close();
		});
		
		//加入
		$dlg.find("#btRefDocAdd").on('click', function(event) {
			var NewAddRefDocNo = $dlg.find("#refDocTxt").val();
			if(NewAddRefDocNo != "")
			{
				$dlg.find("#refDocTxt").val("").trigger('click');//新增前清空input.value

				if(NewAddRefDocNo == theAOL.docObj.ODWMSG.DOC_NO)
				{
					alert("不可加入目前公文文號");
					return;
				}

				if(refDocList.indexOf(NewAddRefDocNo) != -1)
				{
					alert("文號已存在於參考公文清單中");
					return;
				}

				var _dfd = $.Deferred();
				g_QueryDeferred = _dfd;
				var paraws_GetRefDocInfo = {
					"argArtifact": localStorage.Artifact
					,"argOrgNo": theAOL.docObj.ODWMSG.SOURCE_ORGNO
					,"argDocNo": NewAddRefDocNo
					,"argOuId": theAOL.docObj.ODWMSG.INCHARGE_OU
					,"argUserName": theAOL.docObj.ODWMSG.IC_USER_ID
				};
				WsRdfDocInfo(paraws_GetRefDocInfo, _dfd)
				.then(function (rslt)
				{
					var nowDateTime = getNowDate();
					addItem(total+1, rslt.RefDocNo, rslt.RefSubject, "", nowDateTime.substr(0,7), nowDateTime.substr(7,4), rslt.RefSignType);
					$ul.listview("refresh");
					dirty = true;
				})
				.fail(function (rtn)
				{
					alert(rtn.ErrMsg);
				});
			}
		});

		// 加入清單, argRefDocNo:參考公文文號, argSubject:主旨, argDesc:備註, argAddDate:加入日期, argAddTime:加入時間, argAddSignType:簽核類型
		function addItem(i, argRefDocNo, argSubject, argDesc, argAddDate, argAddTime, argAddSignType) {
			var choose;

			//UI呈現
			var liHtml = "<span class='refDoc-DocNo'>" + argRefDocNo + "</span>";
			liHtml += "<span class='refDoc-Subject' title='" + argSubject + "'>" + argSubject + "</span>";
			liHtml += "<input data-role='none' class='refDoc-Desc' value='" + argDesc + "' placeholder='請輸入備註'>";
			liHtml += "<span style='position:absolute;right: 10px;'>" + getDateStr(argAddDate+argAddTime) + " </span>";

			if(refDocList.indexOf(argRefDocNo) == -1)
				refDocList.push(argRefDocNo);
			
			$("<li data-theme='c' class='list' data-icon='false'><a></a></li>").appendTo($ul)
				.find("a")
				.data("RefDocObj", {DOC_NO: argRefDocNo, SUBJCT:argSubject, REF_DESC: argDesc, ADD_DATE: argAddDate, ADD_TIME: argAddTime, SIGN_TYPE: argAddSignType})
				.html(liHtml)
				.on('click', function(event) {
					event.preventDefault();
					if(event.target.nodeName == "INPUT") {// 打備註時不要出現功能按鈕
						return false;
					}

					$ul.find("a[data-role='button'],a[data-role='none']").remove();
					$ul.find("a").removeClass("ui-btn-active");
					$(this).addClass("ui-btn-active");
					var $li = $(this).closest("li");

					// 上移
					$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:145px; z-index:2'>上移</a>").appendTo($li)
						.on('click', function() {
							var $prev = $(this).closest("li").prev("li");
							var $prevObj = $($prev).find('a').data('RefDocObj');
							if($prev.length == 1)
							{
								var dis = $prev.prev("li").length == 0;
								$prev.before($(this).closest("li"));
								if(dis)
									$(this).addClass("ui-disabled");
								$(this).next("a.ui-btn").removeClass("ui-disabled");
								dirty = true;
							}
							return false;
						}).buttonMarkup({corners: true, shadow: true, theme: 'b', icon: 'arrow-u', iconpos: 'right', mini:true});
					// 下移
					$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:75px; z-index:2'>下移</a>").appendTo($li)
						.on('click', function() {
							var $next = $(this).closest("li").next("li");
							var $nextObj = $($next).find('a').data('RefDocObj');
								
							if($next.length == 1) {
								var dis = $next.next("li").length == 0;
								$next.after($(this).closest("li"));
								if(dis)
									$(this).addClass("ui-disabled");
								$(this).prev("a.ui-btn").removeClass("ui-disabled");
								dirty = true;
							}
							return false;
						}).buttonMarkup({corners: true, shadow: true, theme: 'b', icon: 'arrow-d', iconpos: 'right', mini:true});
					// 刪除
					$("<a data-role='button' style='position:absolute; margin:0px; top:5px; right:5px; z-index:2'>刪除</a>").appendTo($li)
						.on('click', function() {
							var delRefDocNo = $(this).closest("li").find('a').data('RefDocObj').DOC_NO;
							if(refDocList.indexOf(delRefDocNo) != -1)
								refDocList.splice(refDocList.indexOf(delRefDocNo), 1);

							$(this).closest("li").remove();
							dirty = true;
							return false;
						}).buttonMarkup({corners: true, shadow: true, theme: 'b', icon:'delete', iconpos:'right', mini:true});

					choose = $(this).data("RefDocObj");
					return false;
				})
				.find(".refDoc-Desc").on('change', function() {
					var Robj = $(this).closest("a").data("RefDocObj");
					Robj.REF_DESC = $(this).val();
				});
		}

		function getDateStr(argDateTimeStr) {
			if(argDateTimeStr.length == 11)
				return argDateTimeStr.substr(0,3) + "/" + argDateTimeStr.substr(3,2) + "/" + argDateTimeStr.substr(5,2) + " " + argDateTimeStr.substr(7,2) + ":" + argDateTimeStr.substr(9,2);
			else
				return argDateTimeStr;
			
		}

		function getNowDate() {
			var objDate = new Date();
			var yy = objDate.getUTCFullYear()-1911;
			var mm = (objDate.getMonth() + 1);
			var dd =  objDate.getDate()+"";
			var hh =  objDate.getHours()+"";
			var m = objDate.getMinutes()+"";

			return [yy , (mm>9?"":"0")+ mm, (dd>9?"":'0')+ dd, (hh>9?"":'0')+hh, (m>9?"":"0")+m].join('');
		}

		//取得新加入的參考公文資訊WS叫用函式
		function WsRdfDocInfo(params, dfd) {
			window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "wsGetRefDocInfo", null, params, false, function (rtn, xml)
			{
				console.log(rtn, xml);

				if (rtn.bSuccess == "true")
				{
					if (g_QueryDeferred)
					{
						g_QueryDeferred.resolve(rtn);
						g_QueryDeferred = null;
					}
				}
				else
				{
					if (g_QueryDeferred)
					{
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
		
		$.modal($dlg, {
			//子視窗外觀
			containerCss: {width: "870px", height: "572px"},
			close: false,//不要顯示右上角關閉按鈕
			onShow: function() {
				// 取出已儲存的參考公文清單
				try {
					// 1070730 Raymond 修正開啟草稿時點擊參考公文設定, 都會出現錯誤的問題
					if("ODWDCM" in theAOL.docObj && "REF_DOC" in theAOL.docObj.ODWDCM && SSOUtil.typeOf(theAOL.docObj.ODWDCM.REF_DOC) == "array") {
					total = theAOL.docObj.ODWDCM.REF_DOC.length;
					for(var i=0; i<total; i++)
					{
						var RefObj = theAOL.docObj.ODWDCM.REF_DOC[i];
						var strRefDocNo = RefObj.DOC_NO;
						var strRefAddDate = RefObj.ADD_DATE;
						var strRefAddTime = RefObj.ADD_TIME;
						var strRefDesc = RefObj.REF_DESC;
						var strRefSignType = RefObj.SIGN_TYPE;
						var strRefSubject = RefObj.SUBJECT;
						addItem(i, strRefDocNo, strRefSubject, strRefDesc, strRefAddDate, strRefAddTime, strRefSignType);
					}
					}
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					alert(e.message);
				}
				
				$dlg.on('click', function() {
					$ul.find("a[data-role='button'],a[data-role='none']").remove();
					$ul.find("a").removeClass("ui-btn-active");
				});

				$dlg.enhanceWithin();
				$dlg.css("padding", "0px");
				$dlg.find("#refDocMgmtContent").css("height", "400px");
				$dlg.find(".ui-btn-inline").removeClass("ui-btn-left ui-btn-right");
			}
		});
   });
	// 1110708 Raymond 1110728 修正開啟參考公文設定後, 「齒輪」選單未關閉問題
	$("#popupAdvance").popup("close");
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-AttachMgmt.js").finish();
})();