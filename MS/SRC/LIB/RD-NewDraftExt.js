// 新增文稿後擴充功能
// 1.代入預設值
// 2.自動設定發文日期、文號
// 3.同步分類號
// DATE		SA			PRG			MGR_NO		DESC
// 1060102	Cloud		Cloud		1051346		調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值
// 1060203	Cloud		Cloud		1051346		調整 簽稿會核單新稿件屬性預設給N
// 1060206	Cloud		Cloud		1051346		調整 會辦單新稿件屬性預設給N
// 1060515	Cloud		Cloud		1060139		修改，增加環境變數設定 特定文稿不將來文機關設定為正本受文者
// 1060623	Raymond		Raymond		1060147		若是開啟舊檔，清空發文日期及發文字號並查詢機關代碼_Data.xml，修正發文機關的機關地址
// 1060623	Raymond		Raymond		-------		修正自動帶入抄本受文者及來文機關為正本受文者時，會一併新增到既有的群組受文者中的問題
// 1060808	Raymond		Raymond		1060697		修正解密日期預設值應套用到獨立欄位「解密日期/年月日」
// 1070202	Raymond		Raymond		1061142		新增文稿時比對樣版的密等與基資, 基資的密等高於樣版的才取代, 否則保持原樣版的密等
// 1070806	David		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記
// 1070817  Kevin       Zen         1070678     弱掃XSS修正
// 1070907	Raymond		Raymond		1070926		補判斷"WE_AUTO_FILL_ISSUE_DATE"設定值為"1"的情況
// 1071207	Raymond		Raymond		1071108		修改密件控管公文若新增文稿密等(基資)已為'密'以上時, 不需要再改回'密'
// 1071219	Raymond		Raymond		1071175		帶入來文受文者時, 新增電子交換現況
// 1080214	Raymond		Raymond		1080052		新增判斷須保留分類號時(WE_PRESERVE_CLSNO_WHILE_IMPORT), 開啟舊檔要保留分類號、保存年限、案次號
// 1080220	David		David		1080089		受文者新增編號屬性
// 1080311	Raymond		Raymond		1080115		使用者角色符合WE_KEEP_DUTY_ROLES設定時在貼上稿件時要保留承辦人資訊(一代內政部客製化功能)
// 1080927  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1081210	Raymond		Raymond		1080786		合併內政部單號1070657, 新增判斷文稿有設定了會稿單位, 提示是否保留會稿單位訊息
// 1090807	Raymond		Raymond		1090449		加入來文機關為受文者時, 新增判斷文別若是開會通知單/會勘通知單, 將其本別設為"出席者"
// 1091111	David		David		1090756		新增稿件時，不需額外判斷簽稿會核單異動NewDraft屬性
// 1100621	Raymond		Raymond		1100482		開啟舊檔或貼上稿件(新增)在啟用保留簽稿會核單簽核物件功能時, 比照一代手動輸入會辦單位時, 從10000流水號自動編會辦單位代碼(1100688的修正後邏輯), 以避免兩個以上無代碼(手動輸入)的會辦單位簽核區域無法區分的問題
// 1100702	Raymond		Raymond		1100572		合併內政部單號1070493、1080639, 當環境變數「WE_ENABLE_DEFAULT_DESC_STRING」設為"Y"啟用時, 非開啟舊檔(從樣版加入文稿)時, 若有來文機關則預帶說明段落一、條列文字為「依據%來文機關%%來文日期%%來文字號%%來文文別%辦理。」, 若為草稿則預帶SSO_CONFIG.js的_defaultDescString設定值, 若樣版的說明段落一、已有內容則不取代
// 1100709	Raymond		Raymond		1100581		修正未取文號或無發文字號欄位時不要呼叫fnGetIssueNo
// 1100927	Raymond		Raymond		-------		修正呼叫fnGetIssueNo取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
// 1101026	Raymond		Raymond		1100991		修正弱掃Client Potential XSS
// 1110225	David		David		1101481		考試院客製化人工傳遞處理
// 1110510	Raymond		Raymond		1110470		新增開啟舊檔或貼上稿件要重新整理受文者的編號
// 1111229	Raymond		Raymond		1111418		新增文稿(包括開啟舊檔)時預帶公文基資的DRAFT_APP_ROLE欄位至<核判區分>(客委會客製化功能)
// 1120109	Raymond		Raymond	國防部彙整表序22	修正預帶檔號的"年度號"節點是根節點下的"年度號", 以避免像是"來文字號"下有"年度號"時, 會誤設到"來文字號"的"年度號"節點的問題
// 1120215	Raymond		Raymond		1120150		修正來文字號只顯示9碼問題
// 1120407	David		Raymond		銓敘部序209	1110885衍生需求, 新增preventFromOrg參數, 傳入true表示不要預帶來文機關為正本受文者也不要預帶承辦單位為抄本受文者, 目前是只有「匯入銓敘系統文稿」所新增的文稿一律不要預帶發文機關及承辦人受文者
// 1120901  Kevin		Leslie		1120709		弱掃修正Client DOM Stored XSS
// 1121207  David		Joe			序337		修正來文者為17碼時，切分機關、單位代碼
// 1121213	David		Joe			1120877		新增取得內部單位代碼
// 1130116	David		David		1121086		保留會稿單位時，檢查既有的代碼是否正確
// 1130612	Leslie		Leslie		1130161		新增針對特定文別，自動設定陳核日期
// 1130805	David		David	問題彙整表序175	修正會稿單位名稱前包含全形空白問題
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式不要呼叫fnGetIssueNo
// 1131122	Raymond		Raymond		北榮序399	合併屏東序899, 新增稿件時檢核若是線上簽核公文, 則清空密等及解密條件或保密期限欄位內容
// 1141031	Leslie		Leslie		1140855		新增北榮稿件載入時同步決行層級
// 1141117	Raymond		Raymond		北榮序382	檢核若匯入文稿有"會辦意見列表"節點, 當使用者選擇不保留會稿單位時, 也要一併清空"會辦意見列表"下的"會辦意見"
// 1150203	David		David	問題彙整表序55	預帶來文者為受文者功能，支援紀錄內部單位資訊、海外發文功能

if(!("nsEditor" in window))
	window.nsEditor = {};

// 1110510 Raymond 1110470 新增重新整理受文者列表的受文者的編號方法
window.nsEditor.refreshDeptSeqNo = function(rcvrListNode) {
	theLogger.log("執行重新整理受文者的編號...");
	gDept_SeqNo = 1;	// 重新整理一律從1開始, 不要延續
	var $rcvrs = $(rcvrListNode).find("受文者");
	for(var i=0, n=$rcvrs.length; i<n; i++) {
		$rcvrs.eq(i).attr("編號", gDept_SeqNo.toString());
		gDept_SeqNo++;
	}
	$(rcvrListNode).attr("編號", gDept_SeqNo.toString());
	theLogger.log("共重新整理了 " + (gDept_SeqNo - 1) + " 個受文者編號");
}

// 1120407 Raymond 銓敘部序209(1110885衍生需求) 新增preventFromOrg參數, 傳入true表示不要預帶來文機關為正本受文者
// 1060509 Raymond 1060147新增isImport參數, true表示是開啟舊檔所匯入的文稿, false表示是從樣版新增的文稿
//window.nsEditor.onNewDraftExt = function(xmlDoc){
//window.nsEditor.onNewDraftExt = function(xmlDoc, isImport){
window.nsEditor.onNewDraftExt = function(xmlDoc, isImport, preventFromOrg){
	
	var that = this;	// 2016.11.15 this是FolioModel物件, 以下用theAOL.docObj的地方都改成that.getDocObj()
	
	function setText(nd, txt) {
		if("text" in nd)	// for IE-compatible
			// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
			// nd.text = txt;
			nd.text = HtmlEncode(txt);
		else
			// nd.textContent = txt;
			nd.textContent = HtmlEncode(txt);
		return nd;
	}
	
	function setFieldValue($parent, targetNode, value, flag) {
		if(SSOUtil.typeOf(targetNode) == "string") {
			var $res = $parent.find(targetNode);
			if($res.length == 0) {
				if(flag == "1") {	// createElement if not exists
					theLogger.log("新增'" + targetNode + "'於'" + $parent.get(0).nodeName + "'下");
					var el = xmlDoc.createElement(targetNode);
					theLogger.log("設定'" + targetNode + "'為'" + value + "'");
					$parent.append(setText(el, value));
				}
				else {
					theLogger.error("節點'" + targetNode + "'不存在");
					return false;	// 1120109 Raymond 國防部彙整表序22 指定節點不存在時回傳false
				}
			}
			else {
				theLogger.log("設定'" + targetNode + "'為'" + value + "'");
				setText($res.get(0), value);
			}
		}
		else {
			theLogger.log("設定'" + targetNode.nodeName + "'為'" + value + "'");
			setText(targetNode, value);
		}
		return true;	// 1120109 Raymond 國防部彙整表序22 設定指定節點為指定值成功時回傳true
	}

    //1070817 Zen 1070678 弱掃XSS修正
	function HtmlEncode(s)
	{
	    var div = document.createElement('div');
	    div.appendChild(document.createTextNode(s));
	    return div.innerHTML;
	}

	theLogger.log("代入預設值 -");
	var $docElm = $(xmlDoc.documentElement);
	//1060102 Cloud 1051346 調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值
	//1060203 Cloud 1051346 調整 簽稿會核單新稿件屬性預設給N-避免自動產生簽稿會核單時，使用者未開啟頁面導致屬性不會改為Y，在會畢退回時才開啟改成完造成簽核物件被清空
	//1060206 Cloud 1051346 調整 會辦單新稿件屬性預設給N
	//if(xmlDoc.documentElement.nodeName!="簽稿會核單")
	//1091111 David 1090756 新增稿件時，不需額外判斷簽稿會核單異動NewDraft屬性，於自動新增，或稿件初始處理時處理
	/*if(xmlDoc.documentElement.nodeName!="簽稿會核單" && xmlDoc.documentElement.nodeName!="會辦單")
		$docElm.attr("NewDraft","Y");
	else
		$docElm.attr("NewDraft","N");*/
	$docElm.attr("NewDraft","Y");
	// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記
	$docElm.attr("DLWork","Y");
	
	// 1060622 Raymond 1060147 若是開啟舊檔, 清空發文日期及發文字號
	if(isImport) {
		var $fld = $docElm.find("發文日期");
		if($fld.length > 0) {
			theLogger.log("開啟舊檔時, 清空發文日期...");
			setFieldValue($fld, "年月日", "", "0");
		}
		$fld = $docElm.find("發文字號");
		if($fld.length > 0) {
			theLogger.log("開啟舊檔時, 清空發文字號...");
			setFieldValue($fld, "字", "", "0");
			var $fld2 = $fld.find("文號");
			if($fld2.length > 0) {
				setFieldValue($fld2, "年度", "", "0");
				setFieldValue($fld2, "流水號", "", "0");
				setFieldValue($fld2, "支號", "", "0");
			}
		}
	}
	
	// 1081210 Raymond 1080786 合併內政部單號1070657, 新增判斷若有設定了會稿單位, 提示是否保留匯入訊息
	var $conList = $docElm.find("> 會稿單位列表");
	if($conList.length > 0) {	// 有會稿單位列表欄位才檢查
		var cus = $conList.find("單位").length;
		if(cus > 0) {
			if(confirm("此文稿含有" + cus + "個會稿單位，是否保留匯入？")) {
				theLogger.warn("使用者選擇保留匯入文稿的" + cus + "個會稿單位");

				//1130116 David 1121086 保留會稿單位時，檢查既有的代碼是否正確
				let OrgInfoId = 'orgInfo_' + theUserInfo.OrgID;
				if (typeof localStorage[theUserInfo.OrgID] !== 'string')
					SSOUtil.getOrgInfo(theUserInfo.Artifact, theAOL.docObj.sourceOrgNo);

				let orgNode = SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo);
				if (orgNode===null) {
					theLogger.error('ERROR!() 找不到機關代碼:' + theAOL.docObj.sourceOrgNo + '的組織架構');
				}
				else{
					let sErrOuName = [];
					for(let iCowork = cus ; iCowork > 0 ; iCowork--){
						let iSeq = iCowork-1;
						let sCoworkOuId = $conList.find("單位").eq(iSeq).attr("代碼");
						let sCoworkOuName = $conList.find("單位")[iSeq].textContent;
						//1130805 David 修正會稿單位名稱前包含全形空白問題
						sCoworkOuName = sCoworkOuName.trim().replace('　','');
						if(typeof sCoworkOuId !== 'undefined' && sCoworkOuId != "" && sCoworkOuId.length <= 3){
							let sOrgInfoOuId = SSOUtil.getOrgUnitNoByName(orgNode, sCoworkOuName);
							if(sOrgInfoOuId == ''){
								sErrOuName.unshift(sCoworkOuName);
								$conList.find("單位").eq(iSeq).remove();
							}
							else if(sOrgInfoOuId != sCoworkOuId)
								$conList.find("單位").eq(iSeq).attr("代碼", sOrgInfoOuId);
						}
					}
					if(sErrOuName.length > 0){
						alert("無法取得保留匯入的會稿單位[" + sErrOuName.join('、') + "]對應單位資訊，請匯入完成後至會稿單位設定視窗修正資料");
					}
				}

				// 1100621 Raymond 1100482 啟用保留簽稿會核單簽核物件功能時, 比照一代手動輸入會辦單位時, 從10000流水號自動編會辦單位代碼(1100688的修正後邏輯), 以避免兩個以上無代碼(手動輸入)的會辦單位簽核區域無法區分的問題
				if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y") {
					var baseSN = 10000;
					$conList.find("單位").each(function(idx, cu) {
						var id = cu.getAttribute("代碼");
						if(!!id) {
							if(parseInt(id) >= baseSN)
								baseSN = parseInt(id) + 1;
							else if(parseInt(id) >= 10000)	// 代碼大於等於10000是手動輸入, 但比前一個手動輸入單位代碼小, 為避免重複, 重新取大一號的代碼
								cu.setAttribute("代碼", baseSN++);
						}
						else
							cu.setAttribute("代碼", baseSN++);
					});
				}
			}
			else {
				theLogger.warn("使用者選擇不保留匯入文稿的會稿單位, 清空所有會稿單位");
				$conList.children().remove();	// 按'否'則刪除會稿單位列表下的所有單位
				
				// 1141117 Raymond 北榮序382 檢核若匯入文稿有"會辦意見列表"節點, 當使用者選擇不保留會稿單位時, 也要一併清空"會辦意見列表"下的"會辦意見"
				var $conCmt = $docElm.find("> 會辦意見列表");
				if($conCmt.length > 0) {
					theLogger.warn("文稿存在'會辦意見列表'節點, 一併清空其下的'會辦意見'");
					$conCmt.children("會辦意見").remove();
				}
			}
		}
	}
	
	// 1.公文文號
	theLogger.log("設定「公文文號」=" + that.getDocObj().docNo);
	setFieldValue($docElm, "公文文號", that.getDocObj().docNo, "1");	// 不存在要新增
	
	// 2.主旨
	var $res = $docElm.find("主旨 文字");
	if($res.length > 0 && $res.text().length == 0) {	// 有主旨文字才設定, 2016.12.22	Leslie	改為，載入的稿件，主旨沒文字時，才由基資的主旨取代, 2016.12.26 fix 無內文時才取代, 非無文字
		if(that.getDocObj().subject.length) {	// 基資有主旨內容才蓋
			theLogger.log("設定「主旨/文字」=" + that.getDocObj().subject);
			setText($res.get(0), that.getDocObj().subject);
		}
	}
	
	// 3.承辦人資訊
	$res = $docElm.find("發文機關");
	// 1080311 Raymond 1080115 一代內政部客製化特定角色在貼上稿件時要保留承辦人資訊功能
	//if($res.length > 0) {	// 有發文機關才設定
	var keepDutyInfo = false, roles = theSSO.User.EnvSettings.get("WE_KEEP_DUTY_INFO_ROLES");
	if(typeof roles === "string" && roles.length > 0 && roles.indexOf(theUserInfo.RoleID) >= 0 && isImport) {
		// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下符合角色要先詢問才保留
		if(!!theSSO && theSSO.offlineMode == true) {
			if(!confirm("是否以目前使用者資訊取代文稿中的承辦單位資訊？")) {
				theLogger.log("目前角色(" + theUserInfo.RoleID + ")需保留承辦人資訊");
				keepDutyInfo = true;
			}
		}
		else {
		theLogger.log("目前角色(" + theUserInfo.RoleID + ")需保留承辦人資訊");
		keepDutyInfo = true;
		}
	}
	if($res.length > 0 && !keepDutyInfo) {	// 有發文機關且不保留承辦人資訊才以目前使用者資訊設定
		//theLogger.log("設定「發文機關/全銜」=" + theUserInfo.OrgName);
		//setFieldValue($res, "全銜", theUserInfo.OrgName, "0");
		
		/*if(theUserInfo.OrgAddr.length > 0) {
			theLogger.log("設定「發文機關/機關地址」=" + theUserInfo.OrgAddr);
			//setFieldValue($res, "機關地址", theUserInfo.OrgAddr, "0");
		}*/
		
		//theLogger.log("設定「發文機關/機關代碼」=" + theUserInfo.OrgID);
		//setFieldValue($res, "機關代碼", theUserInfo.OrgID, "0");
		
		if("SetDeptName" in Common) {	// 2016.9.21 新增呼叫Common.SetDeptName
			var deptName = Common.SetDeptName(theUserInfo.DepartName,$res);
			theLogger.log("Common.SetDeptName()回傳'" + deptName + "'");
			theLogger.log("設定「發文機關/承辦單位」=" + deptName);
			setFieldValue($res, "承辦單位", deptName, "0");
		}
		else {
			theLogger.log("設定「發文機關/承辦單位」=" + theUserInfo.DepartName);
			setFieldValue($res, "承辦單位", theUserInfo.DepartName, "0");
		}
		
		theLogger.log("設定「發文機關/承辦人」=" + ((theUserInfo.Title)?(theUserInfo.Title + theUserInfo.UserName):theUserInfo.UserName));
		setFieldValue($res, "承辦人", ((theUserInfo.Title)?(theUserInfo.Title + theUserInfo.UserName):theUserInfo.UserName), "0");
		
		theLogger.log("設定「發文機關/聯絡電話」=" + theUserInfo.Tel);
		setFieldValue($res, "聯絡電話", theUserInfo.Tel, "0");
		
		theLogger.log("設定「發文機關/分機」=" + theUserInfo.TelExt);
		setFieldValue($res, "分機", theUserInfo.TelExt, "0");
		
		theLogger.log("設定「發文機關/傳真」=" + theUserInfo.Fax);
		setFieldValue($res, "傳真", theUserInfo.Fax, "0");
		
		theLogger.log("設定「發文機關/Email」=" + theUserInfo.Email);
		setFieldValue($res, "Email", theUserInfo.Email, "0");
		
		// 1060623 Raymond 1060147 若是開啟舊檔, 查詢發文機關正確的地址帶入
		if(isImport) {
			var orgNm = $res.find("全銜").text();
			var orgAddr = $res.find("機關地址").text();
			thePublicRsrc.getDataXML(theUserInfo.OrgID)
				.done(function(datDoc) {
					var $src = $(datDoc.documentElement).find("data[type='機關']");
					if($src.length > 0) {
						var found = false;
						$src.find("發文機關").each(function(idx, nd) {
							if(orgNm == $(nd).find("全銜").text()) {
								var correctAddr = HtmlEncode($(nd).find("機關地址").text());	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
								if(orgAddr != correctAddr) {
									theLogger.warn("開啟舊檔的發文機關地址('" + orgAddr + "')與" + theUserInfo.OrgID + "_Data.xml中記錄的不一致, 修正為'" + correctAddr + "'");
									setFieldValue($res, "機關地址", correctAddr, "0");
								}
								else
									theLogger.warn("開啟舊檔的發文機關地址('" + orgAddr + "')與" + theUserInfo.OrgID + "_Data.xml中記錄的一致, 不需修正");
								found = true;
								return false;	// break each-loop
							}
						});
						if(!found)
							theLogger.error(theUserInfo.OrgID + "_Data.xml中找不到相符的發文機關(全銜:" + orgNm + "), 無法確認機關地址是否正確");
					}
					else {
						theLogger.error(theUserInfo.OrgID + "_Data.xml中找不到'type'為'機關'的data清單!?");
					}
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
				});
		}
	}
	
	// 4.依環境變數WE_DISABLE_IMPORT_FROM_ORG決定是否仍匯入來文機關為正本受文者
	$res = $docElm.find("> 受文者列表");	// 1060623 Raymond 修正開啟舊檔若有群組受文者時, 群組受文者也會被加入來文機關受文者
	// 1120407 Raymond 銓敘部序209(1110885衍生需求) 新增preventFromOrg參數, 傳入true表示不要預帶來文機關為正本受文者, 目前是只有「匯入銓敘系統文稿」所新增的文稿一律不要預帶來文機關為正本受文者
	//if($res.length > 0) {
	if($res.length > 0 && preventFromOrg !== true) {
		// 1110510 Raymond 1110470 新增開啟舊檔或貼上稿件要重新整理受文者的編號
		nsEditor.refreshDeptSeqNo($res.get(0));
		
		if(theSSO.User.EnvSettings.get("WE_DISABLE_IMPORT_FROM_ORG") == "Y")
			theLogger.warn("公文系統設定取消代入來文機關成為第一個正本受文者!");
		else {
			var fromOrg = that.getDocObj().get("ODWMSG", "FROM_ORG");
			if(fromOrg.length > 0) {
			//1060515 Cloud [1060139]修改，增加環境變數設定 特定文稿不將來文機關設定為正本受文者
				var ArrDisDraftList = theSSO.User.EnvSettings.get("WE_DISABLE_IMPORT_FROM_ORG_DRAFT").split('|');
				var bPassDraft = false;
				for(var iDr = 0 ;iDr<ArrDisDraftList.length;iDr++)
				{
					if(ArrDisDraftList[iDr]==xmlDoc.documentElement.nodeName)
					{
						bPassDraft = true;
						break;
					}
				}
				if(!bPassDraft){
					// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記-S
					if(theSSO.User.EnvSettings.get("HAS_DL")=="1")
					{
						gDept_SeqNo = $res.attr("編號");
						if(gDept_SeqNo==undefined)//無編號屬性
						{
							gDept_SeqNo = 1;
							$res.attr("編號","1");
						}
						else
							gDept_SeqNo = parseInt($res.attr("編號"));
						// 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要呼叫GetDocHash
						if(!theSSO || theSSO.offlineMode != true)
						//1070806	Cloud 1070685 增加取得識別碼
						theWebServices.getDocHash(theUserInfo.OrgID, that.getDocObj().docNo+gDept_SeqNo.toString())
						.done(function(rtnValue) {
							// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--S
							var fromOrgNo = that.getDocObj().get("ODWDCM", "FROMORGNO");
							var fromOrgNoSub = "";
							if(fromOrgNo.length > 10)
							{
								fromOrgNoSub = fromOrgNo.substring(10);
								fromOrgNo = fromOrgNo.substring(0, 10);
							}
							// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--E
							
							var r = xmlDoc.createElement("受文者");
							// 1090807 Raymond 1090449 新增判斷文別是開會通知單/會勘通知單時, 本別設為"出席者"
							if(xmlDoc.documentElement.nodeName == "開會通知單" || xmlDoc.documentElement.nodeName == "會勘通知單")
								r.setAttribute("本別", "出席者");
							else
							r.setAttribute("本別", "正本");
							r.setAttribute("識別碼",rtnValue);
							r.setAttribute("CreateSN", that.getEditSN());
							//1080220 David 1080089 新增編號
							r.setAttribute("編號", gDept_SeqNo.toString());
							gDept_SeqNo++;
							r.appendChild(setText(xmlDoc.createElement("全銜"), fromOrg));
							r.appendChild(setText(xmlDoc.createElement("正式名稱"), fromOrg));
							// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--S
							// r.appendChild(setText(xmlDoc.createElement("機關代碼"), that.getDocObj().get("ODWDCM", "FROMORGNO")));
							// r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
							r.appendChild(setText(xmlDoc.createElement("機關代碼"), fromOrgNo));
							r.appendChild(setText(xmlDoc.createElement("單位代碼"), fromOrgNoSub));
							// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--E
							r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
							r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
							r.appendChild(setText(xmlDoc.createElement("郵遞區號"), that.getDocObj().get("ODWDCM", "POSTCODE")));
							r.appendChild(setText(xmlDoc.createElement("地址"), that.getDocObj().get("ODWDCM", "ADDRESS")));
							r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
							var sendType = that.getDocObj().get("ODWDCM", "SENDTYPE");
							if(sendType.length == 0) {	// 來文擬辦時發文方式為空值時, 以預設值取代
								if(that.getDocObj().get("ODWDCM", "FROMORGNO").length)
									sendType = "電子交換";
								else if(that.getDocObj().get("ODWDCM", "ADDRESS").length)
									sendType = "郵寄";
								else
								{
									sendType = "人工傳遞";
									//1110225 David 1101481 考試院客製化人工傳遞處理
									if(SSO_CONFIG.OrgNickName == "EXAM")
										sendType = "機關內函件傳遞";
								}
							}
							r.appendChild(setText(xmlDoc.createElement("發文方式"), sendType));
							r.appendChild(setText(xmlDoc.createElement("含附件"), "是"));
							// 2016.12.7 補缺少的受文者欄位
							r.appendChild(setText(xmlDoc.createElement("櫃號"), ""));
							r.appendChild(setText(xmlDoc.createElement("匣道"), ""));
							r.appendChild(setText(xmlDoc.createElement("SYSID"), ""));
							r.appendChild(setText(xmlDoc.createElement("Email"), ""));
							//1150203 David 序55 支援紀錄內部單位、海外單位資訊
							//r.appendChild(setText(xmlDoc.createElement("內部"), ""));
							//r.appendChild(setText(xmlDoc.createElement("海外單位"), ""));
							let sInternalOuId = that.getDocObj().get("ODWDCM", "INTERNAL_OU_ID");
							if(sInternalOuId != ""){
								r.appendChild(setText(xmlDoc.createElement("內部"), "Y"));
								r.appendChild(setText(xmlDoc.createElement("內部單位代碼"), sInternalOuId));
							}
							else{
								r.appendChild(setText(xmlDoc.createElement("內部"), ""));
								r.appendChild(setText(xmlDoc.createElement("內部單位代碼"), ""));
							}
							let sIsOverSea = that.getDocObj().get("ODWDCM", "OVERSEA");
							r.appendChild(setText(xmlDoc.createElement("海外單位"), sIsOverSea));

							r.appendChild(setText(xmlDoc.createElement("國別"), ""));
							r.appendChild(setText(xmlDoc.createElement("郵寄地區"), ""));
							// 1071219 Raymond 1071175 新增電子交換現況
							var fep = that.getDocObj().get("ODWDCM", "FEPSTATUS");
							r.appendChild(setText(xmlDoc.createElement("電子交換現況"), fep));
							$res.append(r);
							//1080220 David 1080089 回寫編號屬性
							$res.attr("編號",gDept_SeqNo.toString());
						})
						.fail(function(errorText) {
							alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
						});
						
					}
					// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記-E
					else
					{
						theLogger.log("代入來文機關(" + fromOrg + ")為第一個正本受文者...");
						// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--S
						var fromOrgNo = that.getDocObj().get("ODWDCM", "FROMORGNO");
						var fromOrgNoSub = "";
						if(fromOrgNo.length > 10)
						{
							fromOrgNoSub = fromOrgNo.substring(10);
							fromOrgNo = fromOrgNo.substring(0, 10);
						}
						// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--E
						var r = xmlDoc.createElement("受文者");
						// 1090807 Raymond 1090449 新增判斷文別是開會通知單/會勘通知單時, 本別設為"出席者"
						if(xmlDoc.documentElement.nodeName == "開會通知單" || xmlDoc.documentElement.nodeName == "會勘通知單")
							r.setAttribute("本別", "出席者");
						else
						r.setAttribute("本別", "正本");
						r.setAttribute("CreateSN", that.getEditSN());	// 2016.11.15 bugfix, 代入來文機關時以目前編輯階段序號為新增階段序號
						//1080220 David 1080089 編號屬性
						gDept_SeqNo = $res.attr("編號");
						if(gDept_SeqNo==undefined)//無編號屬性
						{
							gDept_SeqNo = 1;
							$res.attr("編號","1");
						}
						else
							gDept_SeqNo = parseInt($res.attr("編號"));
						r.setAttribute("編號", gDept_SeqNo.toString());
						gDept_SeqNo++;
						r.appendChild(setText(xmlDoc.createElement("全銜"), fromOrg));
						r.appendChild(setText(xmlDoc.createElement("正式名稱"), fromOrg));
						// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--S
						// r.appendChild(setText(xmlDoc.createElement("機關代碼"), that.getDocObj().get("ODWDCM", "FROMORGNO")));
						// r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
						r.appendChild(setText(xmlDoc.createElement("機關代碼"), fromOrgNo));
						r.appendChild(setText(xmlDoc.createElement("單位代碼"), fromOrgNoSub));
						// 1121207  Joe		序337	修正來文者為17碼時，切分機關、單位代碼--E
						r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
						r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
						r.appendChild(setText(xmlDoc.createElement("郵遞區號"), that.getDocObj().get("ODWDCM", "POSTCODE")));
						r.appendChild(setText(xmlDoc.createElement("地址"), that.getDocObj().get("ODWDCM", "ADDRESS")));
						r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
						var sendType = that.getDocObj().get("ODWDCM", "SENDTYPE");
						if(sendType.length == 0) {	// 來文擬辦時發文方式為空值時, 以預設值取代
							if(that.getDocObj().get("ODWDCM", "FROMORGNO").length)
								sendType = "電子交換";
							else if(that.getDocObj().get("ODWDCM", "ADDRESS").length)
								sendType = "郵寄";
							else
							{
								sendType = "人工傳遞";
								//1110225 David 1101481 考試院客製化人工傳遞處理
								if(SSO_CONFIG.OrgNickName == "EXAM")
									sendType = "機關內函件傳遞";
							}
						}
						r.appendChild(setText(xmlDoc.createElement("發文方式"), sendType));
						r.appendChild(setText(xmlDoc.createElement("含附件"), "是"));
						// 2016.12.7 補缺少的受文者欄位
						r.appendChild(setText(xmlDoc.createElement("櫃號"), ""));
						r.appendChild(setText(xmlDoc.createElement("匣道"), ""));
						r.appendChild(setText(xmlDoc.createElement("SYSID"), ""));
						r.appendChild(setText(xmlDoc.createElement("Email"), ""));
						//1150203 David 序55 支援紀錄內部單位、海外單位資訊
						//r.appendChild(setText(xmlDoc.createElement("內部"), ""));
						//r.appendChild(setText(xmlDoc.createElement("海外單位"), ""));
						let sInternalOuId = that.getDocObj().get("ODWDCM", "INTERNAL_OU_ID");
						if(sInternalOuId != ""){
							r.appendChild(setText(xmlDoc.createElement("內部"), "Y"));
							r.appendChild(setText(xmlDoc.createElement("內部單位代碼"), sInternalOuId));
						}
						else{
							r.appendChild(setText(xmlDoc.createElement("內部"), ""));
							r.appendChild(setText(xmlDoc.createElement("內部單位代碼"), ""));
						}
						let sIsOverSea = that.getDocObj().get("ODWDCM", "OVERSEA");
						r.appendChild(setText(xmlDoc.createElement("海外單位"), sIsOverSea));

						r.appendChild(setText(xmlDoc.createElement("國別"), ""));
						r.appendChild(setText(xmlDoc.createElement("郵寄地區"), ""));
						// 1071219 Raymond 1071175 新增電子交換現況
						var fep = that.getDocObj().get("ODWDCM", "FEPSTATUS");
						r.appendChild(setText(xmlDoc.createElement("電子交換現況"), fep));
						$res.append(r);
						//1080220 David 1080089 回寫稿件編號屬性
						$res.attr("編號",gDept_SeqNo.toString());
					}
				}
			}
		}
	}
	
	/* 5.決行層次
	$res = $docElm.find("決行層次");
	if($res.length > 0) {
		theLogger.log("設定「決行層次」=" + that.getDocObj().approaveLvl);
		setText($res.get(0), theUserInfo.approaveLvl);
	}*/
	
	// 1080214 Raymond 1080052 新增判斷開啟舊檔須保留分類號時, 要保留分類號、保存年限、案次號
	var preserveClsNoWhileImport = theSSO.User.EnvSettings.get("WE_PRESERVE_CLSNO_WHILE_IMPORT");
	var keepClsNo = ((preserveClsNoWhileImport == "Y" || preserveClsNoWhileImport == "1") && isImport);
	
	// 6.分類號
	$res = $docElm.find("分類號");
	// 1080214 Raymond 1080052 設定不保留或開啟舊檔的分類號為空時, 以基資的分類號帶入
	//if($res.length > 0) {
	if($res.length > 0 && (!keepClsNo || $res.text().length == 0)) {
		theLogger.log("設定「分類號」=" + that.getDocObj().get("ODWDCM", "FILE_CLS"));
		setText($res.get(0), that.getDocObj().get("ODWDCM", "FILE_CLS"));
	}
	
	// 7.保存年限
	$res = $docElm.find("保存年限");
	// 1080214 Raymond 1080052 設定不保留或開啟舊檔的保存年限為空時, 以基資的保存年限帶入
	//if($res.length > 0) {
	if($res.length > 0 && (!keepClsNo || $res.text().length == 0)) {
		theLogger.log("設定「保存年限」=" + that.getDocObj().get("ODWDCM", "KEEP_YEAR"));
		setText($res.get(0), that.getDocObj().get("ODWDCM", "KEEP_YEAR"));
	}
	
	// 8.密等
	$res = $docElm.find("密等及解密條件或保密期限");
	if($res.length > 0) {
		var $res2 = $res.find("密等");
		if($res2.length == 0) {	// 沒有密等要新增
			$res.append(xmlDoc.createElement("密等"));
			$res2 = $res.find("密等");
		}
		// 1070202 Raymond 1061142 比對樣版的密等與基資, 基資的密等高於樣版的才取代, 否則保持原樣版的密等
		var resetSecByDocObj = false;
		if($res2.length > 0) {
			var sec = $res2.attr("代碼");
			if ((sec == "" && that.getDocObj().secret > 1) ||
				(sec == "密" && that.getDocObj().secret > 2) ||
				(sec == "機密" && that.getDocObj().secret > 3) ||
				(sec == "極機密" && that.getDocObj().secret > 4)) {
				theLogger.log("依公文基資設定「密等及解密條件或保密期限/密等/@代碼」=" + that.getDocObj().secret);
				if(that.getDocObj().secret == 2)
					$res2.attr("代碼", "密");
				else if(that.getDocObj().secret == 3)
					$res2.attr("代碼", "機密");
				else if(that.getDocObj().secret == 4)
					$res2.attr("代碼", "極機密");
				else if(that.getDocObj().secret == 5)
					$res2.attr("代碼", "絕對機密");
				resetSecByDocObj = true;
			}
			//theLogger.log("設定「密等及解密條件或保密期限/密等/@代碼」=" + that.getDocObj().secret);
			//if(that.getDocObj().secret == 1)
			//	$res2.attr("代碼", "");
			//else if(that.getDocObj().secret == 2)
			//	$res2.attr("代碼", "密");
			//else if(that.getDocObj().secret == 3)
			//	$res2.attr("代碼", "機密");
			//else if(that.getDocObj().secret == 4)
			//	$res2.attr("代碼", "極機密");
			//else if(that.getDocObj().secret == 5)
			//	$res2.attr("代碼", "絕對機密");
			// 1131122 Raymond 北榮序399 合併屏東序899, 檢核若是線上簽核公文則清空密等欄位內容
			if(sec != "" && that.getSignType() == "E") {
				theLogger.log("線上簽核公文的文稿一律清空密等");
				$res2.attr("代碼", "");
			}
		}
		
		// 9.解密條件或保密期限
		$res2 = $res.find("解密條件或保密期限");
		// 1070202 Raymond 1061142 新增若新增文稿的密等是由基資取代, 則解密條件或保密期限才一併由基資取代, 否則保持原樣版的
		//if($res2.length > 0) {
		if($res2.length > 0 && resetSecByDocObj) {
			var str = that.getDocObj().get("ODWDCM", "EXTRMVSEC_COND");
			// 1060808 Raymond 1060697 修正解密條件或保密期限欄位預設值不應含解密日期
			//str += that.getDocObj().get("ODWDCM", "EXTRMVSEC_DATE")
			theLogger.log("設定「密等及解密條件或保密期限/解密條件或保密期限」=" + str);
			setText($res2.get(0), str);
		}
		// 1131122 Raymond 北榮序399 合併屏東序899, 檢核若是線上簽核公文則清空解密條件或保密期限欄位內容
		else if($res2.length > 0 && that.getSignType() == "E") {
			theLogger.log("線上簽核公文的文稿一律清空解密條件或保密期限");
			setText($res2.get(0), "");
		}
		
		// 1060808 Raymond 1060697 修正解密日期預設值應套用到獨立欄位「解密日期/年月日」
		$res2 = $docElm.find("解密日期 > 年月日");
		if($res2.length > 0) {
			var str = that.getDocObj().get("ODWDCM", "EXTRMVSEC_DATE")
			theLogger.log("設定「解密日期/年月日」=" + str);
			setText($res2.get(0), str);
		}
	}
	
	// 10.來文字號
	$res = $docElm.find("來文字號");
	if($res.length > 0) {	// 有來文字號才設定
		theLogger.log("設定「來文字號/字」=" + that.getDocObj().get("ODWDCM", "FROM_NO_WORD"));
		setFieldValue($res, "字", that.getDocObj().get("ODWDCM", "FROM_NO_WORD"), "0");
		
		var $res2 = $res.find("文號");
		if($res2.length > 0) {
			var str = that.getDocObj().get("ODWDCM", "FROM_NO_NO");
			var p = str.indexOf("-");
			if(p > 0) {	// 有支號
				var str2 = str.substr(p+1);
				str = str.substr(0, p);
				setFieldValue($res2, "支號", str2, "0");
			}
			if(str.length == 10) {	// 標準10碼
				// 1120109 Raymond 國防部彙整表序22 "年度號"不存在時設定至"年度"
				if(!setFieldValue($res2, "年度號", str.substr(0, 3), "0"))
					setFieldValue($res2, "年度", str.substr(0, 3), "0");
				// 1120215 Raymond 1120150 修正來文字號只顯示9碼問題
				//setFieldValue($res2, "流水號", str.substr(4), "0");
				setFieldValue($res2, "流水號", str.substr(3), "0");
			}
			else	// 非標準?
				setFieldValue($res2, "流水號", str, "0");
		}
	}
	
	// 11.來文日期
	$res = $docElm.find("來文日期");
	if($res.length > 0) {	// 有來文日期才設定
		theLogger.log("設定「來文日期/年月日」=" + that.getDocObj().get("ODWDCM", "FROMORG_DATE"));
		setFieldValue($res, "年月日", that.getDocObj().get("ODWDCM", "FROMORG_DATE"), "0");
	}
	
	// 12.速別
	$res = $docElm.find("速別");
	if($res.length > 0) {	// 有速別才設定
		theLogger.log("設定「速別/@代碼」=" + that.getDocObj().speed);
		if(that.getDocObj().speed == 1)
			$res.attr("代碼", "普通件");
		else if(that.getDocObj().speed == 2)
			$res.attr("代碼", "速件");
		else if(that.getDocObj().speed == 3)
			$res.attr("代碼", "最速件");
		else if(that.getDocObj().speed == 4)
			$res.attr("代碼", "");
	}
	
	// 13.收文日期
	$res = $docElm.find("收文日期");
	if($res.length > 0) {	// 有收文日期才設定
		theLogger.log("設定「收文日期/年月日」=" + that.getDocObj().get("ODWDCM", "RCV_DATE"));
		setFieldValue($res, "年月日", that.getDocObj().get("ODWDCM", "RCV_DATE"), "0");
	}
	
	// 14.限辦日期
	$res = $docElm.find("限辦日期");
	if($res.length > 0) {	// 有限辦日期才設定
		theLogger.log("設定「限辦日期/年月日」=" + that.getDocObj().get("ODWMSG", "DUE_DATE"));
		setFieldValue($res, "年月日", that.getDocObj().get("ODWMSG", "DUE_DATE"), "0");
	}
	
	// 15.案次號
	$res = $docElm.find("案次號");
	// 1080214 Raymond 1080052 設定不保留或開啟舊檔的案次號為空時, 以基資的案次號帶入
	//if($res.length > 0) {	// 有案次號才設定
	if($res.length > 0 && (!keepClsNo || $res.text().length == 0)) {
		theLogger.log("設定「案次號」=" + that.getDocObj().get("ODWDCM", "FILE_CASE"));
		setText($res.get(0), that.getDocObj().get("ODWDCM", "FILE_CASE"));
	}
	
	/* 16.文別是'衛生署改分請示單'或'衛生署退號請示單'的話, 要設定'上級收文日期'、'上級收文號'、'公文文別/@代碼'
	if(xmlDoc.documentElement.nodeName == "衛生署改分請示單" || xmlDoc.documentElement.nodeName == "衛生署退號請示單") {
		var str = that.getDocObj().srcRcvDate;
		if(str.length == 7)
			str = str.substr(0, 3) + "年" + str.substr(4, 2) + "月" + str.substr(6) + "日";
		$res = $docElm.find("上級收文日期");
		if($res.length > 0) {
			theLogger.log("設定「上級收文日期/年月日」=" + str);
			setFieldValue($res, "年月日", str, "0");
		}
		
		$res = $docElm.find("上級收文號");
		if($res.length > 0) {
			theLogger.log("設定「上級收文號」=" + that.getDocObj().srcRcvNo);
			setText($res.get(0), that.getDocObj().srcRcvNo);
		}
		
		$res = $docElm.find("公文文別");
		if($res.length > 0) {
			theLogger.log("設定「公文文別/@代碼」=" + that.getDocObj().srcDocType);
			$res.attr("代碼", that.getDocObj().srcDocType);
		}
	}*/
	
	// 17.年度號
	// 1120109 Raymond 國防部彙整表序22 加">"限制指定的節點是根節點下的"年度號", 以修正像是"來文字號"下有"年度號"時, 會誤設到"來文字號"的"年度號"節點的問題
	//$res = $docElm.find("年度號");
	$res = $docElm.find("> 年度號");
	if($res.length > 0) {	// 有年度號才設定
		theLogger.log("設定「年度號」=" + that.getDocObj().get("ODWDCM", "FILE_YEAR"));
		setText($res.get(0), that.getDocObj().get("ODWDCM", "FILE_YEAR"));
	}
	
	// 18.來文機關
	$res = $docElm.find("來文機關");
	if($res.length > 0) {	// 有來文機關才設定
		theLogger.log("設定「來文機關」=" + that.getDocObj().get("ODWMSG", "FROM_ORG"));
		setText($res.get(0), that.getDocObj().get("ODWMSG", "FROM_ORG"));
	}
	
	// 19.發文日期
	// 1070907 Raymond 1070926 補判斷設定值"1"
	//if(theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_DATE") == "Y") {
	if(theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_DATE") == "Y" || theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_DATE") == "1") {
		theLogger.log("系統設定新增文稿時自動設定發文日期為新增文稿當日");
		$res = $docElm.find("發文日期");
		if($res.length > 0) {
			var td = new Date();
			// 2016.8.4 簽沿用發文日期當陳核日期, 但不要中華民國, 所以要額外判斷
			if(xmlDoc.documentElement.nodeName == "簽")
				var str = (td.getYear() - 11) + "年" + (td.getMonth() + 1) + "月" + td.getDate() + "日";
			else
				var str = "中華民國" + (td.getYear() - 11) + "年" + (td.getMonth() + 1) + "月" + td.getDate() + "日";
			setFieldValue($res, "年月日", str, "1");
		}
		else
			theLogger.log("無「發文日期」欄位, 忽略!");
	}
	
	// 20.發文字號
	if(theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") == "Y" || theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") == "1") {
		// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要呼叫fnGetIssueNo
		if(!!theSSO && theSSO.offlineMode == true) {
			theLogger.warn("環境變數WE_AUTO_FILL_ISSUE_NO雖為'" + theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") + "', 但離線模式預設為不自動帶入發文字號");
		}
		else
		// 1100709 Raymond 1100581 修正未取文號或無發文字號欄位時不要呼叫fnGetIssueNo
		if($docElm.find("發文字號").length == 0) {
			theLogger.log("新增文稿無'發文字號'欄位, 不需自動設定發文字號");
		}
		else if(that.getDocObj().docNo.length == 0) {
			theLogger.log("尚未取號, 不需自動設定發文字號");
		}
		else
		if("fnGetIssueNo" in nsEditor) {
			function fakeDM(_rawXml) {
				function toHtml(xmlNode) {
					if("nodeType" in xmlNode && xmlNode.nodeType == 2)	// 屬性
						return xmlNode.nodeValue;
					else if("text" in xmlNode)	// for IE-compatible
						return xmlNode.text;
					return xmlNode.textContent;
				}
				function applyChange(xmlNode, sentence) {
					if(typeof sentence == "string") {
						if("nodeType" in xmlNode && xmlNode.nodeType == 2)	// attr node
							xmlNode.nodeValue = sentence;
						else {	// elem node, text node
							if("text" in xmlNode)	// for IE-compatible
								xmlNode.text = sentence;
							else
								xmlNode.textContent = sentence;
						}
					}
					else {
						theLogger.error("不支援寫回非字串的內容到XML文件");
					}
				}
				return {
					text: function() {
						if("evaluate" in _rawXml) {	// IE以外
							if(arguments.length == 1) {	// 第1個參數是XPath
								var nodeList = [];
								try {
									var snapshot = _rawXml.evaluate(arguments[0], _rawXml, null, 7, null);
									if(snapshot.snapshotLength == 0)	// 2014.11.14 - Raymond, 新增找不到錯誤
										throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
									for(var i=0; i<snapshot.snapshotLength; i++)
										nodeList.push(snapshot.snapshotItem(i));
									if(nodeList.length == 1)
										return toHtml(nodeList[0]);
									throw new Error("指定XPath:\"" + arguments[0] + "\"非唯一?");
								}
								catch(e) {
									theLogger.error(e.message + "(" + arguments[0] + ")");
									throw e;	// 2016.8.15 丟出錯誤
								}
							}
							else if(arguments.length > 1) {	// 第2個參數是新值
								var nodeList = [];
								try {
									var snapshot = _rawXml.evaluate(arguments[0], _rawXml, null, 7, null);
									if(snapshot.snapshotLength == 0)	// 2014.11.14 - Raymond, 新增找不到錯誤
										throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
									for(var i=0; i<snapshot.snapshotLength; i++)
										nodeList.push(snapshot.snapshotItem(i));
									if(nodeList.length == 1) {
										applyChange(nodeList[0], arguments[1]);
										return true;	// 與原值不同, 套用新值
									}
									throw new Error("指定XPath:\"" + arguments[0] + "\"非唯一?");
								}
								catch(e) {
									theLogger.error(e.message + "(" + arguments[0] + ")");
									throw e;	// 2016.8.15 丟出錯誤
								}
							}
						}
						else if("selectSingleNode" in _rawXml) {	// IE
							if(arguments.length == 1) {
								var nd = _rawXml.selectSingleNode(arguments[0]);
								if(nd)
									return toHtml(nd);
								throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
							}
							else if(arguments.length > 1) {
								var nd = _rawXml.selectSingleNode(arguments[0]);
								if(nd) {
									applyChange(nd, arguments[1]);
									return true;	// 與原值不同, 套用新值
								}
								else
									throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
							}
						}
						else
							throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
					}
				}
			}
			var dm = new fakeDM(xmlDoc);
			var res = nsEditor.fnGetIssueNo(0, dm, 1);
			if(res) {
				try {
					dm.text("//發文字號/字", res.IssueWord);
					// 1100927 Raymond 修正取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
					//dm.text("//發文字號/文號/年度", that.getDocObj().docNo.substr(0, 3));
					//dm.text("//發文字號/文號/流水號", that.getDocObj().docNo.substr(3, 7));
					dm.text("//發文字號/文號/年度", res.IssueYear);
					dm.text("//發文字號/文號/流水號", res.IssueNo);
				}
				catch(e) {
					theLogger.warn(e.message);
				}
				if("ISSUE_DATE" in res && res.ISSUE_DATE.length > 0) {
					var d = res.ISSUE_DATE.split("/");	// fnGetIssueNo()回傳的日期格式是: 日/月/西元年
					try {
						dm.text("//發文日期/年月日", "中華民國" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
					}
					catch(e) {
						theLogger.warn(e.message);
					}
					try {
						dm.text("//陳核日期/年月日", "" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
					}
					catch(e) {
						theLogger.warn(e.message);
					}
				}
			}
		}
	}
	
	// 21.密件控管, 2016.9.19 新增
	if(that.needSecControl()) {
		theLogger.log("啟用密件控管功能, 新增文稿預設密等為'密', 解密條件或保密期限為'', 行文單位保密為True, 副本行文單位保密為True, 主持人行文單位保密為True");
		$res = $docElm.find("密等及解密條件或保密期限");
		if($res.length > 0) {
			var $res2 = $res.find("密等");
			if($res2.length > 0) {
				// 1071207 Raymond 1071108 修改密件控管公文若密等(基資)已為'密'以上時, 不需要再改回'密'
				if($res2.attr("代碼").match(/密/g))
					theLogger.log("預帶密等已為'" + $res2.attr("代碼") + "', 不需異動!");
				else
				$res2.attr("代碼", "密");
			}
			else
				theLogger.warn("此文別無'密等及解密條件或保密期限/密等'欄位可設定");
			
			$res2 = $res.find("解密條件或保密期限");
			if($res2.length > 0)
				setText($res2.get(0), "");
			else
				theLogger.warn("此文別無'密等及解密條件或保密期限/解密條件或保密期限'欄位可設定");
		}
		else
			theLogger.warn("此文別無'密等及解密條件或保密期限'欄位可設定");
		
		$docElm.attr("行文單位保密", "True");
		$docElm.attr("副本行文單位保密", "True");
		$docElm.attr("主持人行文單位保密", "True");
	}
	
	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不預帶抄本單位
	if(!theSSO || theSSO.offlineMode != true) {
	// 22.預設抄本單位
	theWebServices.getCopy(that.getDocObj().docNo, function(res) {
		
		if("COPY_INFO" in res) {
			if("IC_OU_COPY" in res.COPY_INFO) {
				var icOuCopy = res.COPY_INFO.IC_OU_COPY;
			
				var cnt = ("text" in icOuCopy)?Number(icOuCopy.text):0;
				theLogger.log("預設代入承辦單位為抄本受文者數量:" + cnt);
				if(cnt > 0) {
					if(theUserInfo.DepartName.length > 0) {
						var icOuName = theUserInfo.DepartName;
						//1121213	Joe		1120877		新增取得內部單位代碼
						var icOuId = theUserInfo.DepartID;
						// theLogger.log("預設代入承辦單位受文者的正式名稱為'" + icOuName + "'");
						theLogger.log("預設代入承辦單位受文者的正式名稱為'" + icOuName + "'，單位代碼為'" + icOuId + "'");
						
						var copyType = "抄本";		// 預設抄本
						if("@DOC_TYPE" in icOuCopy) {
							var dt = icOuCopy["@DOC_TYPE"];
							if(typeof dt === "string" && dt.length > 0) {
								if(dt != "1" && dt != "2" && dt != "3")
									theLogger.warn("無法識別的本別代碼(" + dt + "), 以抄本(3)為預設值");
								else {
									copyType = ["正本","副本","抄本"][Number(dt) - 1];
								}
								theLogger.log("預設代入承辦單位受文者的本別改為'" + copyType + "'(" + dt + ")");
							}
						}
						
						var email = "";				// 預設EMAIL
						if("@EMAIL" in icOuCopy) {
							var em = icOuCopy["@EMAIL"];
							if(typeof em === "string") {
								theLogger.log("預設代入承辦單位受文者的EMAIL改為'" + em + "'");
								email = em;
							}
						}
						
						var issueType = "人工傳遞";	// 預設發文方式
						//1110225 David 1101481 考試院客製化人工傳遞處理
						if(SSO_CONFIG.OrgNickName == "EXAM")
							issueType = "機關內函件傳遞";
						if("@ISSUE_TYPE" in icOuCopy) {
							var it = icOuCopy["@ISSUE_TYPE"];
							if(typeof it === "string" && it.length > 0) {
								theLogger.log("預設代入承辦單位受文者的發文方式改為'" + it + "'");
								issueType = it;
							}
						}
						
						var title = icOuName;		// 預設全銜
						if("SetCopyName" in Common) {	// 2016.9.21 新增呼叫Common.SetCopyName
							title = Common.SetCopyName(icOuName);
							theLogger.log("SetCopyName()回傳'" + title + "'");
						}
						if("@TITLE" in icOuCopy) {
							var tl = icOuCopy["@TITLE"];
							if(typeof tl === "string" && tl.length > 0) {
								theLogger.log("預設代入承辦單位受文者的全銜改為'" + tl + title + "'");
								title = tl + title;
							}
						}
						
						var hasAtt = "是";			// 預設含附件
						if("@HAS_ATT" in icOuCopy) {
							var ha = icOuCopy["@HAS_ATT"];
							if(typeof ha === "string" && ha.length > 0) {
								if(ha == "0")
									hasAtt = "否";
								else
									hasAtt = "是";
								theLogger.log("預設代入承辦單位受文者的含附件改為'" + ha + "'(" + hasAtt + ")");
							}
						}
						
						$res = $docElm.find("> 受文者列表");	// 1060623 Raymond 修正開啟舊檔若有群組受文者時, 群組受文者也會被加入來文機關受文者
						if($res.length > 0) {
							try {
								if(theSSO.User.EnvSettings.get("HAS_DL")=="1")
								{
									gDept_SeqNo = $res.attr("編號");
									if(gDept_SeqNo==undefined)//無編號屬性
									{
										gDept_SeqNo = 1;
										$res.attr("編號","1");
									}
									else
										gDept_SeqNo = parseInt($res.attr("編號"));
									// 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要呼叫GetDocHash
									if(!theSSO || theSSO.offlineMode != true)
									theWebServices.getDocHash(theUserInfo.OrgID, that.getDocObj().docNo+gDept_SeqNo.toString())
											.done(function(rtnValue) {
												
											var r = xmlDoc.createElement("受文者");
											r.setAttribute("本別", copyType);
											r.setAttribute("識別碼", rtnValue);
											//1080220 David 1080089 新增編號
											r.setAttribute("編號", gDept_SeqNo.toString());
											gDept_SeqNo++;
											r.appendChild(setText(xmlDoc.createElement("全銜"), title));
											r.appendChild(setText(xmlDoc.createElement("正式名稱"), icOuName));
											r.appendChild(setText(xmlDoc.createElement("機關代碼"), ""));
											r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
											r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
											r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
											r.appendChild(setText(xmlDoc.createElement("郵遞區號"), ""));
											r.appendChild(setText(xmlDoc.createElement("地址"), ""));
											r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
											r.appendChild(setText(xmlDoc.createElement("發文方式"), issueType));
											r.appendChild(setText(xmlDoc.createElement("含附件"), hasAtt));
											r.appendChild(setText(xmlDoc.createElement("Email"), email));
											// 2016.12.7 補缺少的受文者欄位
											r.appendChild(setText(xmlDoc.createElement("櫃號"), ""));
											r.appendChild(setText(xmlDoc.createElement("匣道"), ""));
											r.appendChild(setText(xmlDoc.createElement("SYSID"), ""));
											//1121213	Joe		1120877		預帶承辦人為內部單位、新增內部單位代碼--S
											// r.appendChild(setText(xmlDoc.createElement("內部"), ""));
											r.appendChild(setText(xmlDoc.createElement("內部"), "Y"));
											r.appendChild(setText(xmlDoc.createElement("內部單位代碼"), icOuId));
											//1121213	Joe		1120877		預帶承辦人為內部單位、新增內部單位代碼--E
											r.appendChild(setText(xmlDoc.createElement("海外單位"), ""));
											r.appendChild(setText(xmlDoc.createElement("國別"), ""));
											r.appendChild(setText(xmlDoc.createElement("郵寄地區"), ""));
											// 1071219 Raymond 1071175 新增電子交換現況
											r.appendChild(setText(xmlDoc.createElement("電子交換現況"), ""));
											$res.append(r);
											//1080220 David 1080089 回寫稿件編號屬性
											$res.attr("編號",gDept_SeqNo.toString());

									})
									.fail(function(errorText) {
										alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
									});
								}
								else
								{
									var r = xmlDoc.createElement("受文者");
									r.setAttribute("本別", copyType);
									//1080220 David 1080089 編號屬性
									gDept_SeqNo = $res.attr("編號");
									if(gDept_SeqNo==undefined)//無編號屬性
									{
										gDept_SeqNo = 1;
										$res.attr("編號","1");
									}
									else
										gDept_SeqNo = parseInt($res.attr("編號"));
									r.setAttribute("編號", gDept_SeqNo.toString());
									gDept_SeqNo++;
									r.appendChild(setText(xmlDoc.createElement("全銜"), title));
									r.appendChild(setText(xmlDoc.createElement("正式名稱"), icOuName));
									r.appendChild(setText(xmlDoc.createElement("機關代碼"), ""));
									r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
									r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
									r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
									r.appendChild(setText(xmlDoc.createElement("郵遞區號"), ""));
									r.appendChild(setText(xmlDoc.createElement("地址"), ""));
									r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
									r.appendChild(setText(xmlDoc.createElement("發文方式"), issueType));
									r.appendChild(setText(xmlDoc.createElement("含附件"), hasAtt));
									r.appendChild(setText(xmlDoc.createElement("Email"), email));
									// 2016.12.7 補缺少的受文者欄位
									r.appendChild(setText(xmlDoc.createElement("櫃號"), ""));
									r.appendChild(setText(xmlDoc.createElement("匣道"), ""));
									r.appendChild(setText(xmlDoc.createElement("SYSID"), ""));
									//1121213	Joe		1120877		預帶承辦人為內部單位、新增內部單位代碼--S
									// r.appendChild(setText(xmlDoc.createElement("內部"), ""));
									r.appendChild(setText(xmlDoc.createElement("內部"), "Y"));
									r.appendChild(setText(xmlDoc.createElement("內部單位代碼"), icOuId));
									//1121213	Joe		1120877		預帶承辦人為內部單位、新增內部單位代碼--E
									r.appendChild(setText(xmlDoc.createElement("海外單位"), ""));
									r.appendChild(setText(xmlDoc.createElement("國別"), ""));
									r.appendChild(setText(xmlDoc.createElement("郵寄地區"), ""));
									// 1071219 Raymond 1071175 新增電子交換現況
									r.appendChild(setText(xmlDoc.createElement("電子交換現況"), ""));
									$res.append(r);
									//1080220 David 1080089 回寫稿件編號屬性
									$res.attr("編號",gDept_SeqNo.toString());
								}
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
						}
						else
							theLogger.warn("無「受文者列表」欄位可加入預設抄本單位");
					}
					else
						theLogger.warn("無承辦單位名稱(theUserInfo.DepartName)可代入預設抄本單位");
				}
			}
			
			if("FILE_OU_COPY" in res.COPY_INFO && "FILE_OU_NAME" in res.COPY_INFO.FILE_OU_COPY) {
				if(SSOUtil.typeOf(res.COPY_INFO.FILE_OU_COPY.FILE_OU_NAME) == "array") {	// 多組指定受文者單位要代入
					for(var i=0; i<res.COPY_INFO.FILE_OU_COPY.FILE_OU_NAME.length; i++) {
						var fileOuName = res.COPY_INFO.FILE_OU_NAME[i];
						if("text" in fileOuName && fileOuName.text.length > 0) {
						    //1070817 Zen 1070678 弱掃XSS修正
						    //var ouName = fileOuName.text;
						    var ouName = HtmlEncode(fileOuName.text);
							theLogger.log("預設代入指定單位[" + (i+1) + "]受文者的正式名稱為'" + ouName + "'");
							
							var copyType = "抄本";		// 預設抄本
							if("@DOC_TYPE" in fileOuName) {
								var dt = fileOuName["@DOC_TYPE"];
								if(typeof dt === "string" && dt.length > 0) {
									if(dt != "1" && dt != "2" && dt != "3")
										theLogger.warn("無法識別的本別代碼(" + dt + "), 以抄本(3)為預設值");
									else {
										copyType = ["正本","副本","抄本"][Number(dt) - 1];
									}
									theLogger.log("預設代入指定單位[" + (i+1) + "]受文者的本別改為'" + copyType + "'(" + dt + ")");
								}
							}
							
							var email = "";				// 預設EMAIL
							if("@EMAIL" in fileOuName) {
								var em = fileOuName["@EMAIL"];
								if(typeof em === "string") {
									theLogger.log("預設代入指定單位[" + (i+1) + "]受文者的EMAIL改為'" + em + "'");
									email = em;
								}
							}
							
							var issueType = "人工傳遞";	// 預設發文方式
							//1110225 David 1101481 考試院客製化人工傳遞處理
							if(SSO_CONFIG.OrgNickName == "EXAM")
								issueType = "機關內函件傳遞";
							if("@ISSUE_TYPE" in fileOuName) {
								var it = fileOuName["@ISSUE_TYPE"];
								if(typeof it === "string" && it.length > 0) {
									theLogger.log("預設代入指定單位[" + (i+1) + "]受文者的發文方式改為'" + it + "'");
									issueType = it;
								}
							}
							
							var title = ouName;		// 預設全銜
							if("@TITLE" in fileOuName) {
								var tl = fileOuName["@TITLE"];
								if(typeof tl === "string" && tl.length > 0) {
									theLogger.log("預設代入指定單位[" + (i+1) + "]受文者的全銜改為'" + tl + ouName + "'");
									title = tl + ouName;
								}
							}
							
							var hasAtt = "是";			// 預設含附件
							if("@HAS_ATT" in fileOuName) {
								var ha = fileOuName["@HAS_ATT"];
								if(typeof ha === "string" && ha.length > 0) {
									if(ha == "0")
										hasAtt = "否";
									else
										hasAtt = "是";
									theLogger.log("預設代入指定單位[" + (i+1) + "]受文者的含附件改為'" + ha + "'(" + hasAtt + ")");
								}
							}
							
							$res = $docElm.find("> 受文者列表");	// 1060623 Raymond 修正開啟舊檔若有群組受文者時, 群組受文者也會被加入來文機關受文者
							if($res.length > 0) {
								try {
									
									// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記-S
									if(theSSO.User.EnvSettings.get("HAS_DL")=="1")
									{
										gDept_SeqNo = $res.attr("編號");
										if(gDept_SeqNo==undefined)//無編號屬性
										{
											gDept_SeqNo = 1;
											$res.attr("編號","1");
										}
										else
											gDept_SeqNo = parseInt($res.attr("編號"));
										// 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要呼叫GetDocHash
										if(!theSSO || theSSO.offlineMode != true)
										theWebServices.getDocHash(theUserInfo.OrgID, that.getDocObj().docNo+gDept_SeqNo.toString())
										.done(function(rtnValue) {
												
											var r = xmlDoc.createElement("受文者");
											r.setAttribute("本別", copyType);
											r.setAttribute("識別碼", rtnValue);
											//1080220 David 1080089 新增編號
											r.setAttribute("編號", gDept_SeqNo.toString());
											gDept_SeqNo++;
											r.appendChild(setText(xmlDoc.createElement("全銜"), title));
											r.appendChild(setText(xmlDoc.createElement("正式名稱"), ouName));
											r.appendChild(setText(xmlDoc.createElement("機關代碼"), ""));
											r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
											r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
											r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
											r.appendChild(setText(xmlDoc.createElement("郵遞區號"), ""));
											r.appendChild(setText(xmlDoc.createElement("地址"), ""));
											r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
											r.appendChild(setText(xmlDoc.createElement("發文方式"), issueType));
											r.appendChild(setText(xmlDoc.createElement("含附件"), hasAtt));
											r.appendChild(setText(xmlDoc.createElement("Email"), email));
											// 2016.12.7 補缺少的受文者欄位
											r.appendChild(setText(xmlDoc.createElement("櫃號"), ""));
											r.appendChild(setText(xmlDoc.createElement("匣道"), ""));
											r.appendChild(setText(xmlDoc.createElement("SYSID"), ""));
											r.appendChild(setText(xmlDoc.createElement("內部"), ""));
											r.appendChild(setText(xmlDoc.createElement("海外單位"), ""));
											r.appendChild(setText(xmlDoc.createElement("國別"), ""));
											r.appendChild(setText(xmlDoc.createElement("郵寄地區"), ""));
											// 1071219 Raymond 1071175 新增電子交換現況
											r.appendChild(setText(xmlDoc.createElement("電子交換現況"), ""));
											$res.append(r);
											//1080220 David 1080089 回寫稿件編號屬性
											$res.attr("編號",gDept_SeqNo.toString());
										})
										.fail(function(errorText) {
											alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
										});
									}
									// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記-E
									else
									{
										var r = xmlDoc.createElement("受文者");
										r.setAttribute("本別", copyType);
										//1080220 David 1080089 編號屬性
										gDept_SeqNo = $res.attr("編號");
										if(gDept_SeqNo==undefined)//無編號屬性
										{
											gDept_SeqNo = 1;
											$res.attr("編號","1");
										}
										else
											gDept_SeqNo = parseInt($res.attr("編號"));
										r.setAttribute("編號", gDept_SeqNo.toString());
										gDept_SeqNo++;
										r.appendChild(setText(xmlDoc.createElement("全銜"), title));
										r.appendChild(setText(xmlDoc.createElement("正式名稱"), ouName));
										r.appendChild(setText(xmlDoc.createElement("機關代碼"), ""));
										r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
										r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
										r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
										r.appendChild(setText(xmlDoc.createElement("郵遞區號"), ""));
										r.appendChild(setText(xmlDoc.createElement("地址"), ""));
										r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
										r.appendChild(setText(xmlDoc.createElement("發文方式"), issueType));
										r.appendChild(setText(xmlDoc.createElement("含附件"), hasAtt));
										r.appendChild(setText(xmlDoc.createElement("Email"), email));
										// 2016.12.7 補缺少的受文者欄位
										r.appendChild(setText(xmlDoc.createElement("櫃號"), ""));
										r.appendChild(setText(xmlDoc.createElement("匣道"), ""));
										r.appendChild(setText(xmlDoc.createElement("SYSID"), ""));
										r.appendChild(setText(xmlDoc.createElement("內部"), ""));
										r.appendChild(setText(xmlDoc.createElement("海外單位"), ""));
										r.appendChild(setText(xmlDoc.createElement("國別"), ""));
										r.appendChild(setText(xmlDoc.createElement("郵寄地區"), ""));
										// 1071219 Raymond 1071175 新增電子交換現況
										r.appendChild(setText(xmlDoc.createElement("電子交換現況"), ""));
										$res.append(r);
										//1080220 David 1080089 回寫稿件編號屬性
										$res.attr("編號",gDept_SeqNo.toString());
									}
								}
								catch(e) {
									theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
								}
							}
							else
								theLogger.warn("無「受文者列表」欄位可加入預設抄本單位");
						}
					}
				}
				else {	// 只有一組指定受文者單位要代入
					var fileOuName = res.COPY_INFO.FILE_OU_COPY.FILE_OU_NAME;
					if("text" in fileOuName && fileOuName.text.length > 0) {
					    //1070817 Zen 1070678 弱掃XSS修正
					    //var ouName = fileOuName.text;
					    var ouName = HtmlEncode(fileOuName.text);
						theLogger.log("預設代入指定單位受文者的正式名稱為'" + ouName + "'");
						
						var copyType = "抄本";		// 預設抄本
						if("@DOC_TYPE" in fileOuName) {
							var dt = fileOuName["@DOC_TYPE"];
							if(typeof dt === "string" && dt.length > 0) {
								if(dt != "1" && dt != "2" && dt != "3")
									theLogger.warn("無法識別的本別代碼(" + dt + "), 以抄本(3)為預設值");
								else {
									copyType = ["正本","副本","抄本"][Number(dt) - 1];
								}
								theLogger.log("預設代入指定單位受文者的本別改為'" + copyType + "'(" + dt + ")");
							}
						}
						
						var email = "";				// 預設EMAIL
						if("@EMAIL" in fileOuName) {
							var em = fileOuName["@EMAIL"];
							if(typeof em === "string") {
								theLogger.log("預設代入指定單位受文者的EMAIL改為'" + em + "'");
								email = em;
							}
						}
						
						var issueType = "人工傳遞";	// 預設發文方式
						//1110225 David 1101481 考試院客製化人工傳遞處理
						if(SSO_CONFIG.OrgNickName == "EXAM")
							issueType = "機關內函件傳遞";
						if("@ISSUE_TYPE" in fileOuName) {
							var it = fileOuName["@ISSUE_TYPE"];
							if(typeof it === "string" && it.length > 0) {
								theLogger.log("預設代入指定單位受文者的發文方式改為'" + it + "'");
								issueType = it;
							}
						}
						
						var title = ouName;		// 預設全銜
						if("@TITLE" in fileOuName) {
							var tl = fileOuName["@TITLE"];
							if(typeof tl === "string" && tl.length > 0) {
								theLogger.log("預設代入指定單位受文者的全銜改為'" + tl + ouName + "'");
								title = tl + ouName;
							}
						}
						
						var hasAtt = "是";			// 預設含附件
						if("@HAS_ATT" in fileOuName) {
							var ha = fileOuName["@HAS_ATT"];
							if(typeof ha === "string" && ha.length > 0) {
								if(ha == "0")
									hasAtt = "否";
								else
									hasAtt = "是";
								theLogger.log("預設代入指定單位受文者的含附件改為'" + ha + "'(" + hasAtt + ")");
							}
						}
						
						$res = $docElm.find("> 受文者列表");	// 1060623 Raymond 修正開啟舊檔若有群組受文者時, 群組受文者也會被加入來文機關受文者
						if($res.length > 0) {
							try {
								// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記-S
								if(theSSO.User.EnvSettings.get("HAS_DL")=="1")
								{
									gDept_SeqNo = $res.attr("編號");
									if(gDept_SeqNo==undefined)//無編號屬性
									{
										gDept_SeqNo = 1;
										$res.attr("編號","1");
									}
									else
										gDept_SeqNo = parseInt($res.attr("編號"));
									// 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要呼叫GetDocHash
									if(!theSSO || theSSO.offlineMode != true)
									//1070806	Cloud 1070685 增加取得識別碼
									theWebServices.getDocHash(theUserInfo.OrgID, that.getDocObj().docNo+gDept_SeqNo.toString())
									.done(function(rtnValue) {
										
										var r = xmlDoc.createElement("受文者");
										r.setAttribute("本別", copyType);
										r.setAttribute("識別碼", rtnValue);
										//1080220 David 1080089 編號屬性
										r.setAttribute("編號", gDept_SeqNo.toString());
										gDept_SeqNo++;
										r.appendChild(setText(xmlDoc.createElement("全銜"), title));
										r.appendChild(setText(xmlDoc.createElement("正式名稱"), ouName));
										r.appendChild(setText(xmlDoc.createElement("機關代碼"), ""));
										r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
										r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
										r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
										r.appendChild(setText(xmlDoc.createElement("郵遞區號"), ""));
										r.appendChild(setText(xmlDoc.createElement("地址"), ""));
										r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
										r.appendChild(setText(xmlDoc.createElement("發文方式"), issueType));
										r.appendChild(setText(xmlDoc.createElement("含附件"), hasAtt));
										r.appendChild(setText(xmlDoc.createElement("Email"), email));
										// 1071219 Raymond 1071175 新增電子交換現況
										r.appendChild(setText(xmlDoc.createElement("電子交換現況"), ""));
										$res.append(r);
										//1080220 David 1080089 回寫稿件編號屬性
										$res.attr("編號",gDept_SeqNo.toString());
									})
									.fail(function(errorText) {
										alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
									});
								}
								// 1070806		Cloud		1070685		新增取得識別碼且寫入啟用附件下載區分繕功能註記-E
								else
								{
									var r = xmlDoc.createElement("受文者");
									r.setAttribute("本別", copyType);
									//1080220 David 1080089 編號屬性
									gDept_SeqNo = $res.attr("編號");
									if(gDept_SeqNo==undefined)//無編號屬性
									{
										gDept_SeqNo = 1;
										$res.attr("編號","1");
									}
									else
										gDept_SeqNo = parseInt($res.attr("編號"));
									r.setAttribute("編號", gDept_SeqNo.toString());
									gDept_SeqNo++;
									r.appendChild(setText(xmlDoc.createElement("全銜"), title));
									r.appendChild(setText(xmlDoc.createElement("正式名稱"), ouName));
									r.appendChild(setText(xmlDoc.createElement("機關代碼"), ""));
									r.appendChild(setText(xmlDoc.createElement("單位代碼"), ""));
									r.appendChild(setText(xmlDoc.createElement("姓名"), ""));
									r.appendChild(setText(xmlDoc.createElement("職稱"), ""));
									r.appendChild(setText(xmlDoc.createElement("郵遞區號"), ""));
									r.appendChild(setText(xmlDoc.createElement("地址"), ""));
									r.appendChild(setText(xmlDoc.createElement("FEP交換代碼"), ""));
									r.appendChild(setText(xmlDoc.createElement("發文方式"), issueType));
									r.appendChild(setText(xmlDoc.createElement("含附件"), hasAtt));
									r.appendChild(setText(xmlDoc.createElement("Email"), email));
									// 1071219 Raymond 1071175 新增電子交換現況
									r.appendChild(setText(xmlDoc.createElement("電子交換現況"), ""));
									$res.append(r);
									//1080220 David 1080089 回寫稿件編號屬性
									$res.attr("編號",gDept_SeqNo.toString());
								}
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
						}
						else
							theLogger.warn("無「受文者列表」欄位可加入預設抄本單位");
					}
				}
			}
		}
	});
	}	// end of 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不預帶抄本單位
	
	// 23.清除開啟舊檔的正本受文者資訊, 以免預覽列印時出現
	$res = $docElm.find("正本受文者資訊");
	if($res.length > 0) {
		theLogger.log("設定「正本受文者資訊」=''");
		setText($res.get(0), "");
	}
	
	// 24.清除開啟舊檔的副本受文者資訊, 以免預覽列印時出現
	$res = $docElm.find("副本受文者資訊");
	if($res.length > 0) {
		theLogger.log("設定「副本受文者資訊」=''");
		setText($res.get(0), "");
	}
	
	// 25.清除開啟舊檔的抄本受文者資訊, 以免預覽列印時出現
	$res = $docElm.find("抄本受文者資訊");
	if($res.length > 0) {
		theLogger.log("設定「抄本受文者資訊」=''");
		setText($res.get(0), "");
	}
	
	// 26.清除開啟舊檔的主持人受文者資訊, 以免預覽列印時出現
	$res = $docElm.find("主持人受文者資訊");
	if($res.length > 0) {
		theLogger.log("設定「主持人受文者資訊」=''");
		setText($res.get(0), "");
	}
	
	// 27.清除開啟舊檔的出席者受文者資訊, 以免預覽列印時出現
	$res = $docElm.find("出席者受文者資訊");
	if($res.length > 0) {
		theLogger.log("設定「出席者受文者資訊」=''");
		setText($res.get(0), "");
	}
	
	// 28.清除開啟舊檔的列席者受文者資訊, 以免預覽列印時出現
	$res = $docElm.find("列席者受文者資訊");
	if($res.length > 0) {
		theLogger.log("設定「列席者受文者資訊」=''");
		setText($res.get(0), "");
	}
	
	// 29.創稿日期, 鐵工1060096
	$res = $docElm.find("創稿日期");
	if($res.length > 0) {
		var now = new Date();
		var str = Util.padLeft(now.getFullYear() - 1911, 3) + Util.padLeft(now.getMonth() + 1, 2) + Util.padLeft(now.getDate(), 2);	// YYYMMDD
		theLogger.log("設定「創稿日期」='" + str + "'");
		setText($res.get(0), str);
	}
	
	// 30.說明預帶文字, 1100702 Raymond 1100572 合併內政部1070493、1080639之新增文稿時預帶說明「一、」文字內容功能
	if(!isImport && theSSO.User.EnvSettings.get("WE_ENABLE_DEFAULT_DESC_STRING") == "Y") {	// 排除開啟舊檔及環境變數有啟用情況下才預帶說明文字
		$res = $docElm.find("段落[段名='說明：']");
		
		//1080822	Leslie[1080639]	依文別設定預帶文字，把設定文字部分獨立成內部函式
		function setDefaultContent(tx){
			if(!!tx && tx.length > 0) {
				theLogger.log("預帶說明段落文字'" + tx + "'");
				if($res.find("條列").length > 0) {
					if($res.find("條列").eq(0).find("文字").length > 0)
						setText($res.find("條列 > 文字").get(0), tx);
					else
						$res.find("條列").eq(0).append(setText(xmlDoc.createElement("文字"), tx));
				}
				else {
					var e = xmlDoc.createElement("條列");
					e.setAttribute("序號", "一、");
					e.appendChild(setText(xmlDoc.createElement("文字"), tx));
					$res.append(e);
				}
			}
		}
		
		if($res.length > 0) {
			if($res.find("條列").length > 0 && $res.find("條列 > 文字").text().length > 0)
				theLogger.log("樣版或範本之說明段落已有文字, 不進行取代");
			else {
				var fromOrg = that.getDocObj().get("ODWMSG", "FROM_ORG");
				if(fromOrg.length > 0) {	// 有來文機關
					var fromDate = that.getDocObj().get("ODWDCM", "FROMORG_DATE");
					var fromDateC = parseInt(fromDate.substr(0, 3)) + "年" + parseInt(fromDate.substr(3, 2)) + "月" + parseInt(fromDate.substr(5, 2)) + "日";
					var tx = "依據" + fromOrg + fromDateC + that.getDocObj().get("ODWDCM", "FROM_NO_WORD") + "字第" + that.getDocObj().get("ODWDCM", "FROM_NO_NO") + "號";
					//1080822	Leslie[1080639]	依文別設定預帶文字	
					var rsrcObj = {
							wfioUrl:SSO_CONFIG.getWSUrl('fileiows'),
							filePath: SSO_CONFIG.getRsrcServerPath('AOL\\OD\\SYS', theUserInfo.OrgID)+'\\DOC_CATEGORY_'+theUserInfo.OrgID+'.xml'
						}
					theCacheMgr.get({type:'rsrc',rsrc:rsrcObj,async:false})	//1081112	Leslie	避免第一次加入稿件時，非同步讀入資源檔會造成第一個稿件設定不到，加上async:false
					.done(function(rsrcXml){
						theLogger.log(Util.getXml(rsrcXml));
						var currCate = that.getDocObj().get("ODWDCM", "DOC_CATEGORY");
						var $category = $(rsrcXml.documentElement);
						var $match = $category.find('value:contains("'+currCate+'")');
						if($match){
							for(let i=0;i<$match.length;i++){
								if($match.eq(i).text() == currCate){
									tx += $match.eq(i).next().text() + "辦理。";
									setDefaultContent(tx);
									break;
								}
							}
						}
					})
					//1080822	Leslie[1080639]	依文別設定預帶文字	==END==
				}
				else if("defaultDescString" in SSO_CONFIG && SSO_CONFIG.defaultDescString.length > 0) {	// 無來文機關
					var tx = SSO_CONFIG.defaultDescString;
					setDefaultContent(tx);
				}
			}
		}
	}
	
	// 31.核判區分, 1111229 Raymond 1111418 新增文稿(包括開啟舊檔)時預帶公文基資的DRAFT_APP_ROLE欄位至<核判區分>(客委會客製化功能)
	if(SSO_CONFIG.OrgNickName == "HAC") {
		$res = $docElm.find("核判區分");
		if($res.length > 0) {
			var str = that.getDocObj().get("ODWDCM", "DRAFT_APP_ROLE");
			theLogger.log("設定「核判區分」='" + str + "'");
			setText($res.get(0), str);
		}
	}
	
	// 32.陳核日期， 1130612	Leslie[1130161]	新增針對特定文別，自動設定陳核日期
	var arAddSubmitDateType = theSSO.User.EnvSettings.get("WE_SUBMIT_DATE_DRAFT_TYPE").split(';')
	if(arAddSubmitDateType.includes(xmlDoc.documentElement.nodeName)) {
		theLogger.log("新增文稿之文別為'" + xmlDoc.documentElement.nodeName + "', 預帶「陳核日期」為當日");
		$res = $docElm.find("陳核日期");
		if($res.length > 0) {
			var td = new Date();
			var str = (td.getYear() - 11) + "年" + (td.getMonth() + 1) + "月" + td.getDate() + "日";
			setFieldValue($res, "年月日", str, "1");
		}
		else
			theLogger.log("無「陳核日期」欄位, 忽略!");
	}

	// 33.決行層級， 1141031	Leslie[1140855]	新增北榮稿件載入時同步決行層級
	if(SSO_CONFIG.OrgNickName == "TPVGH") {
		$res = $docElm.find("決行層次");
		if($res.length > 0){
			that.getAllDraftText('/*/決行層次/@決行層級').done(function(arr){
				console.log(arr)
				for(var txObj of arr){
					if(txObj.text != ''){
						$res[0].setAttribute('決行層級', txObj.text);
						break;
					}
				}
			})
		}
	}
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-NewDraftExt.js").finish();
})();