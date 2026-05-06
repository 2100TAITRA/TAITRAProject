/*
*0970226	Leslie	0970181	展期理由之「其他」勾選並儲存後，再開啟時出現錯誤
*0970319	--		Leslie	不使用線上申請之機關，在設定OD_ODT220_P為N時發生錯誤
*0970324	Leslie	0970278	中企處新增「核可通知單」
*0970708	Leslie	0970512	額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
*0970909	Leslie	0970861	中企處修改展期理由
*0971215    Jane    0971112 中企處自行輸入的展期原因無法正常顯示在畫面以及報表上
*0980403    Jane    0980129 依業務類別計算限辦日期是否包含假日
*0990302	Howard	0990140	[中央]利用系統參數[OD_ODT220_CAN_APPLYDAYS]判斷展期申請天數累計超過特定天數之公文，使用ODT250申請為專案管制
*0990525	Howard	0990235	於PageOnload時將視窗設定為最大化
*0990826	Howard	0990569	修改展期天數更改時未重新取得傳送對像之問題
*1000926	Jeff	1000770	增加展期日期超過一定天數時不可走線上申請的警示訊息。
*1010614    Chris   1010420 修改調整視窗為全螢幕大小時，會出現錯誤
*1020522	Jagle   1000751	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
*1020906	Erin	1020691	新增功能：依新增系統參數「IS_ODT410_BEFORE_ODT220」決定是否檢核展期前需先登打ODT410個案分析登錄
*1030627	Eric	1030365	新增取得BUSINESS_TYPE.DUE_RULE欄位以及是否使用GetUnHoliday函式
*1031112 	Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
*1040123	Gabby	1030975	增加判斷系統參數FLOW_APPROVE_MODE，決定申請者是否可以核可
*1041011	Cloud	1040908	增加判斷是否經過專案申請
*1050331    Cloud   1050087 升級二代
*1050505	Kevin	1030623	限辦日期增加支援單位放假
*1051030	CLOUD	1050087	修正被誤改的程式碼
*1051129    Cloud   1051181 [鐵改局]專案性質公文增加顯示資訊，並提供擬訂作業時程設定及新報表
*1060307 	Cloud	序-2854	修改增加IsServerHandling時，設定Page_BlockSubmit = true;
*1060413    Cloud   1060240 [鐵改局]提供由細項日期最大日期寫回申辦日期並重新計算天數功能。
*1060516 	Cloud 	1060240 修正鐵改局，除專案展期申請自行計算天數外，一般申請為原邏輯
*1060802	Justin	-------	修正無法檢核字數問題
*1060919	Cloud	1060821	修正專案展期檢核邏輯異常問題
*1061019	Cloud	1060821	修正此單BUG
*1061222	Justin	1061237	變更首欄標題寬度
*1070717 	Joe		1070678	弱掃修正Client Potential XSS
*1070912 	Joe		1070172	新增功能線上瀏覽、撤回、參考附件、預排流程，紙本公文不提供線上申請，展期最大天數檢核
*1071022 	Joe		1070172	所有功能卡高榮機關暱稱
*1080123	Joe		1070172	修正DIV標籤未使用附件時需一併隱藏
*1080422	Cloud	1080347	新增單次申請天數檢核
*1080423	Kevin_C	1080047	增加字數檢核
*1080514	Kevin_C	1080047	修正使用物件錯誤的問題
*1080916 	Kevin_C	1080774	新增撤回功能
*1100201	Joe		1090927	取消使用document.activeElement
*1100303	Joe		1100019	擴充系統參數OD_ODT220_CAN_APPLYDAYS可設定提示訊息
*1100319	Cloud	--		國教院升級二代發現，展期理由文字長度排的順序，會造成畫面顯示異常
*1110224    Cloud   1101504 增加依業務類別設定核定依據
*1110820    Cloud   1110629 修正無附件不應顯示title問題
*1130328    Jason   1130165 修改申請天數、申請後日期錯誤計算
*1130521  	Jason	1130387	修改說明欄位顯示資訊
*1130918	Cloud	1130941 XSS弱掃修改
*1140630    Andy    1140550 修正錯誤視窗顯示的限制字數與資料庫設定不一致的狀況
*1140811	Cloud	1130941 XSS弱掃修改-因應欄位因參數設定是否啟用，增加判斷欄位存在才做DECODE
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//InitReasonTable();
//1050331    Cloud   1050087 升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1070912	Joe	1070172	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-S
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}
//1070912	Joe	1070172	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-E

function ShowMsg() {
	//1050331    Cloud   1050087 升級二代
	/*if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e) {
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName) {
		//1070912	Joe	1070172	新增加入附件--S
		case "btAddFile":
			document.getElementById('fileInput').click();
			break;
		//1070912	Joe	1070172	新增加入附件--E
	}
}
//1050331    Cloud   1050087 升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
	var xObjectName;
	var evBtn;

	if (IsServerHandling) {
		//1060307 	Cloud	序-2854	修改增加IsServerHandling時，設定Page_BlockSubmit = true;
		//Page_BlockSubmit=true;
		return;
	}

	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}
	//1050331    Cloud   1050087 升級二代
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	switch (xObjectName) {
		case "btCheck":
			Page_BlockSubmit = false;
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btOpen":
			if (ConfirmOpen())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			//1000926	Jeff	1000770		增加判斷展期申請天數是否符合線上申請
			//if(ConfirmSave())//是否通過儲存前必要檢查
			if (ConfirmSave() && fnCurrExDaysCheck()) {
				//1071022	Joe		1070172		所有附件功能卡高榮
				if (document.all.nOrgNickName.value == "KVGH") {
					//1070912	Joe		1070172		新增上傳功能
					if (UploadFile())
						SetCanSubmit();
					//1070912	Joe		1070172		新增上傳功能--S
					else
						SetCanNotSubmit();
					//1070912	Joe		1070172		新增上傳功能--E
				}
				//1071022	Joe		1070172		所有附件功能卡高榮--S
				else
					SetCanSubmit();
				//1071022	Joe		1070172		所有附件功能卡高榮--E
				//0990825	Howard0990569	修改傳送前應再檢核使用者之核可權
				//1060413 Cloud 1060240 判斷如果是鐵改專案公文申請展期 則略過
				if (document.all.nOrgNickName.value == "RRB" && document.all.DocProtity && document.all.DocProtity.value != "3")
					CheckCurrdayExchanged();
			}
			else
				SetCanNotSubmit();
			GetExtReason();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			//if(ConfirmSave())//是否通過儲存前必要檢查
			if (jf_CheckKeyObject())//儲存只檢核公文文號欄位，其餘不檢核	0961128	Leslie
			{
				SetCanSubmit();
				//1071022	Joe		1070172		所有附件功能卡高榮
				if (document.all.nOrgNickName.value == "KVGH")
					//1070912	Joe		1070172		新增上傳功能
					UploadFile();
			}
			else
				SetCanNotSubmit();
			GetExtReason();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if (CheckBeforDelete()) {
				if (jf_ConfirmDelete())
					SetCanSubmit();
				else
					SetCanNotSubmit();
			}
			else {
				SetCanNotSubmit();
			}
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			document.all["txReasonNo"].value = "";
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["txDocNo"].focus();
			break;
		case "btPrint":
			if (CheckBeforSave()) {
				if (jf_ConfirmPrint())
					SetCanSubmit();
				else
					SetCanNotSubmit();
			}
			else
				SetCanNotSubmit();
			GetExtReason();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckBeforSave()) {
				if (jf_ConfirmPrint())
					SetCanSubmit();
				else
					SetCanNotSubmit();
			}
			else
				SetCanNotSubmit();
			GetExtReason();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCommitRpt":		//0970278	核示通知單
			Page_BlockSubmit = false;
			GetExtReason();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//950721 新增資訊流程  by whay 
		case "btSearchFlow":
			Page_BlockSubmit = true;
			if (ConfirmOpen()) {
				var strArtifact = document.all.nArtifact.value;
				var strDocNo = document.all["txDocNo"].value;
				var strSourceOrgno = document.all.nSourceOrgno.value;
				//var strUrl ="ODI260.aspx?nFrom=ODT250&pDocNo="+strDocNo+"&SAMLart=" + strArtifact;
				//0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
				var strUrl = "../../ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=ODT220&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
				jf_OpenChildWin(strUrl, "EDI200", 700, 500);
			}
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1040123 Gabby[1030975] 增加核可功能
		case "btCommit":
			if (jf_CheckKeyObject())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			GetExtReason();
			//1050331    Cloud   1050087 升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1040123 Gabby[1030975]--END
		//1080916	Kevin_C		1080774		新增撤回
		case "btBack":
			Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//###############################################################################
//							Button Click Function
//###############################################################################
//開啟前檢查
function ConfirmOpen() {
	var bRtnbool = false;
	if (jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforOpen())
			bRtnbool = true;
		else
			bRtnbool = false;
	}
	return bRtnbool;
}

function CheckBeforOpen() {
	//檢查公文文號txDocNo
	if (!CheckNotEmptyAndAlert("txDocNo", "公文文號"))
		return false;
	//檢查申請日期txTxDate
	//	if(!CheckNotEmptyAndAlert("txTxDate","申請日期"))
	//		return false;

	return true;
}

//儲存前檢查
function ConfirmSave() {
	var bRtnbool = false;
	if (jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
		else
			bRtnbool = false;
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave() {
	//1080423	Kevin_C	1080047	增加字數檢核
	//1080514	Kevin_C	1080047	修正使用物件錯誤的問題
	//if (!isMaxLength(document.all.txApplyReason,'擬定作業時程','300'))
	//1140630   Andy	1140550 修正錯誤視窗顯示的限制字數與資料庫設定不一致的狀況
	//if (!isMaxLength(document.all.txSchedule, '擬定作業時程', '300'))
	if (!isMaxLength(document.all.txSchedule, '擬定作業時程', '400'))
		return false;
		//1140630   Andy	1140550 修正錯誤視窗顯示的限制字數與資料庫設定不一致的狀況
	//	if (!isMaxLength(document.all.txExReason, '展期理由', '300'))
	if (!isMaxLength(document.all.txExReason, '展期理由', '100'))
		return false;

	//1080422	Cloud	1080347	新增單次申請天數檢核
	if (document.all.nOrgNickName.value == "RRB" && document.all.DocProtity.value == "1" && parseInt(document.all["txCurrExDays"].value) > 14) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["一般公文展期單次申請天數以14天為上限!!，請修正。"])), "");
		return false;
	}
	//檢查申請日期txTxDate
	//	if(!CheckNotEmptyAndAlert("txTxDate","申請日期"))
	//		return false;
	//檢查本次申請展期天數不能為空白
	//1060413 Cloud [1060240] 因調整天數取得方式，此處不檢核
	//1060516 Cloud 1060240     修正鐵改局，除專案展期申請自行計算天數外，一般申請為原邏輯
	//if (document.all.nOrgNickName.value != "RRB")
	//1061019	Cloud	[1060821]	修正此單BUG
	//if (document.all.nOrgNickName.value != "RRB" && document.all.DocProtity.value!="3")
	if (document.all.nOrgNickName.value != "RRB" || (document.all.nOrgNickName.value == "RRB" && document.all.DocProtity.value != "3")) {
		if (!CheckNotEmptyAndAlert("txCurrExDays", "本次申請展期天數"))
			return false;
	}
	//1060919	Cloud	[1060821]	修正專案展期檢核邏輯異常問題-鐵改且為專案展期時先做取得日期-再提早此檢核
	else {
		if (!CheckDetial())
			return false;
	}


	//0980406-檢核展期天數是否為數字格式-Jane
	if (isNaN(jf_Trim(document.all.txCurrExDays.value)) && document.all.txCurrExDays.value != "?") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期天數欄位請輸入半形數字!!"])), "");
		return false;
	}

	//0950620 Charles 如果本次申請展期天數填的是0，則顯示錯誤訊息
	//1060919	Cloud	[1060821]	修正專案展期檢核邏輯異常問題-鐵改且為專案展期時先做取得日期
	if (parseInt(document.all["txCurrExDays"].value) <= 0) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本次申請展期天數需大於 0 !!"])), "");
		return false;
	}

	//0950421 Charles 如果展期預設最大天數不為0，表示需要檢查申請展期天數是否超過預設最大天數
	//1060413 Cloud [1060240] 專案展期申請不做預設值檢核
	if (document.all.nOrgNickName.value != "RRB" && document.all.DocProtity.value != "3") {
		if (document.all["txDefaultExDays"].value != "0") {
			if (parseInt(document.all["txCurrExDays"].value) > parseInt(document.all["txDefaultExDays"].value)) {
				//1110224 Cloud 1101504 增加判斷預設時間單位調整訊息
				if (document.all["H_EXT_DEFUNIT"].value != "" && document.all["H_EXT_DEFUNIT"].value == "M")
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本次申請展期月數超過預設最大月數，預設最大月數為：" + document.all["txDefaultExDays"].value + "月"])), "");
				else
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本次申請展期天數超過預設最大天數，預設最大天數為：" + document.all["txDefaultExDays"].value + "天"])), "");
				document.all["txCurrExDays"].focus();
				document.all["txCurrExDays"].select();
				return false;
			}
		}
	}
	//1060413 Cloud [1060240] 因調整天數取得方式，將此核提早
	//1060919	Cloud	[1060821]	修正專案展期檢核邏輯異常問題-鐵改且為專案展期時先做取得日期-再提早此檢核
	/*if (document.all.nOrgNickName.value == "RRB")
	{
		if (document.all.DocProtity) {
			if (document.all.DocProtity.value == "3")//專案性質公文-檢核擬訂作業細項
			{
				if(!CheckDetial())
					return false;
			}
		}
	}*/
	//0990302	Howard	0990140	判斷展期天數累計申請是否超過特定天數
	//1051202 Cloud	[1051181] 鐵改局增加檢核專案性質公文不可超過180天辦理天數
	if (document.all.nOrgNickName.value == "RRB" && document.all.DocProtity && document.all.DocProtity.value == "3") {
		var HaveExD = parseInt(jf_Trim(document.all["txHaveExDays"].value)) + parseInt(jf_Trim(document.all["txCurrExDays"].value));
		if (HaveExD > 180) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期申請天數累計已超過180天，不可再進行展期申請"])), "");
			return false;
		}
	}
	else {
		if (fnCheckApplyDays()) {
			//1100303	Joe		1100019		擴充系統參數OD_ODT220_CAN_APPLYDAYS可設定提示訊息--S
			if (document.all["CANAPPLY_PT_MSG"].value != "") {
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([document.all["CANAPPLY_PT_MSG"].value])), "");
			}
			else {
				//1100303	Joe		1100019		擴充系統參數OD_ODT220_CAN_APPLYDAYS可設定提示訊息--E
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期申請天數累計已超過" + document.all["CANAPPLY_PT_DAYS"].value + "天，請使用ODT250專案申請作業申請為專案管制案件。"])), "");
			}
			return false;
		}
	}
	//1041011	Cloud	[1040908]	增加判斷是否經過專案申請-此欄位只有航港局時才會註冊-有經過專案申請 不檢核天數
	if (document.all["h_txBeOdt250"]) {
		if (document.all["h_txBeOdt250"].value == "Y")//有經過專案申請的要檢核擬定作業時程時間須輸入
		{
			if (!CheckNotEmptyAndAlert("txSchedule", "擬定作業時程"))
				return false;
		}
	}
	//檢查是否有設定傳送對象
	/*
	if(document.all.hData_RoleCode.value == "" || document.all.hData_OrgCode.value == "" )
	{
		AlertCustMsg("傳送對象未設定，無法進行傳送");
		return false;
	}*/
	//檢查是否至少勾選一樣理由	David	95.05.18
	var nCount = document.all["dlPhraseDesp"].length;
	var rCount = 0;
	for (i = 0; i < nCount; i++) {
		if (document.all["rReason_" + i].checked != true)
			rCount++;
	}
	if (document.all.cbreason_else.checked != true)
		rCount++;
	//951209 增加對中企處承辦費時選項，以免檢查錯誤 by whay
	if (document.all.cbreason.checked != true)
		rCount++;
	//David 95.05.18
	if (rCount == nCount + 2) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要勾選一樣申請理由"])), "");
		return false;
	}

	/*if((!document.all.rReason_1.checked)&&(!document.all.rReason_2.checked)&&(!document.all.rReason_3.checked)&&(!document.all.rReason_4.checked)&&
	(!document.all.rReason_5.checked)&&(!document.all.rReason_6.checked)&&(!document.all.rReason_7.checked)&&(!document.all.rReason_0.checked))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要勾選一樣申請理由"])),"");	
		return false;
	}*/
	//檢查勾選其他時是否有輸入理由	//David 95.05.18
	if (document.all.cbreason_else.checked)
	//if(document.all.cbReason8.checked)
	{
		if (!CheckNotEmptyAndAlert("txExReason", "申請理由"))
			return false;
	}
	//951209 檢查勾選承辦費時選項時是否有輸入理由 by whay
	if (document.all.cbreason.checked) {
		if (!CheckNotEmptyAndAlert("txReason", "申請理由"))
			return false;
	}
	//1050331 Cloud	[1050087] 升級二代
	/*var ddlIdx=5;
	var nextOpt = GetToolbarCtrl(ddlIdx);
	if(nextOpt==null)
		alert('null');
	var aOptions = nextOpt.getOptions();
	//LESLIE	純紙本時，下拉式選單是空值
	/*if(aOptions.length != 0)
	{
		document.all.SelectedUser.value = aOptions.value;
		document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
	}*/
	if (document.all.ddlNextUser.options.length != 0) {
		document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
		document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
	}
	//1051201 Cloud [1051181] 增加檢核細項作業時程
	//1060413 Cloud [1060240] 因調整天數取得方式，將此處檢核提早
	/*if (document.all.nOrgNickName.value == "RRB")
	{
		if (document.all.DocProtity) {
			if (document.all.DocProtity.value == "3")//專案性質公文-檢核擬訂作業細項
			{
				return CheckDetial();
			}
		}
	}*/
	return true;
}

function GetToolbarCtrl(argId) {
	return document.all.tbTool.getItem(argId);
	for (var i = 0; i < 20; i++) {
		var o = document.all.tbTool.getItem(i);
		if (o != null) {
			alert(o.getAttribute("ID"));
			if (o.getAttribute("ID") == argId)
				return o;
		}
	}
	return null;
}

//刪除前欄位檢查
function CheckBeforDelete() {
	//如果目前狀態是已核准,則不允許刪除
	if (document.all.lbCurrStatus.innerText == "已核准") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已核准之申請不能直接刪除"])), "");
		return false;
	}
	return true;
}

function CheckBeforPrint() {
	var bRtn = true;
	return bRtn;
}

//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################
function CallBack(argCallerId) {
}

function ClientOnLoad() {
	//1080123	Joe		1070172	修正DIV標籤未使用附件時需一併隱藏--S
	if (document.all.nOrgNickName.value == "KVGH") {
		if (document.all.dgAttach.className != "GridDiv hide")
			document.all.divAttach.className = "GridDiv";
	}
	//1080123	Joe		1070172	修正DIV標籤未使用附件時需一併隱藏--E
	//1010614 Chris[1010420] 修改調整視窗為全螢幕大小時，會出現錯誤，用try{}catch{}包起來，避免錯誤。
	try {
		//09905252 Howard[0990235] 由右鍵點選開啟時，將視窗調整為全螢幕大小
		window.resizeTo(screen.availWidth, screen.availHeight);
		window.moveTo(0, 0);
	}
	catch (e) {
	}

	ShowMsg();
	//1050503 Cloud	升級二代
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("lib/OD_LIB.asmx","GetWorkDate",false,null);
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	/*if(!document.all.cbReason8.checked)
	{
		document.all.txExReason.readOnly = "readonly";
		document.all.txExReason.className = "DisplayOnly";
		document.all.txExReason.style.backgroundColor = "LightGrey";
	}*/
	InitReasonTable();
	//1051129 Cloud [1051181] 鐵改局且為專案性質公文時顯示特定欄位及細項
	document.all["TrDgSche"].style.display = "none";//隱藏資訊
	document.all["divDescList"].style.display = "none";//顯示資訊/此時應該要顯示說明段落
	document.all["divforCaseAppDate"].style.display = "none";//隱藏資訊
	if (document.all.nOrgNickName.value == "RRB") {
		document.all["divDesc"].style.display = "none";//隱藏資訊
		if (document.all.DocProtity) {
			if (document.all.DocProtity.value == "3")//專案性質公文DgNoData-不存在表示有細項資料，否則顯示原TEXTBOX
			{
				document.all["divforCaseApp"].style.display = "block";//顯示資訊
				document.all["divforCaseAppDate"].style.display = "block";//顯示資訊
				if (!document.all.DetailNoData) {
					document.all["TrDgSche"].style.display = "block";//顯示資訊
					document.all["TrTxSche"].style.display = "none";//顯示資訊
					document.all["DivDgSche"].style.height = "150px";
				}
				else {
					document.all["TrTxSche"].style.display = "block";//顯示資訊
					document.all["DivDgSche"].style.height = "0px"
				}
			}
			else {
				if (document.all.DocProtity.value == "2")
					document.all["divforCaseApp"].style.display = "block";//顯示資訊
				else
					document.all["divforCaseApp"].style.display = "none";//隱藏資訊
				document.all["TrTxSche"].style.display = "block";//顯示資訊
				document.all["DivDgSche"].style.height = "0px"
			}
			document.all["divDescList"].style.display = "block";//顯示資訊/此時應該要顯示說明段落
		}
	}
	//1130521  	Jason	1130387		修改說明欄位顯示資訊
	if (document.all["H_ShowDecList2"].value == "N")
		document.all["divDescList2"].style.display = "none";//隱藏資訊
	//* 1130918	Cloud	1130941 XSS弱掃修改
	SetDescDecode();
}

function OnWSResult(argResult) {
	if (argResult.id == wsGetWorkDateID) {
		if (jf_IsWebServiceSuccess(argResult)) {
			//document.all.lbNDueDate.innerText = DateFormat(argResult.value.RtnWorkDate);
			//document.all["H_txNDueDate"].value = DateFormat(argResult.value.RtnWorkDate);
			//1050331 Cloud	[1050087] 升級二代系統
			//document.all.lbNDueDate.innerText =argResult.value.RtnWorkDate;
			document.all["lbNDueDate"].textContent = DateFormat(argResult.value.RtnWorkDate);
			document.all["H_txNDueDate"].value = argResult.value.RtnWorkDate;
		}
		else {
			//1050331 Cloud	[1050087] 升級二代系統
			//document.all["lbNDueDate"].innerText = "";
			document.all["lbNDueDate"].textContent = "";
			document.all["H_txNDueDate"].value = "";
			document.all["txCurrExDays"].focus();
		}
	}
	//1060412 Cloud 1060240 新增函式調整天數由細項日期回推天數
	else if (argResult.id == iCallID_GetWorkDays) //帶出辦理天數
	{
		if (jf_IsWebServiceSuccess(argResult)) {
			if (argResult.value.RtnStr == "0") {

				return false;
			}
			return true;
		}
	}
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
	var index = document.all[argDDLId].selectedIndex;
	var obj = document.all[argDDLId].options[index];

	document.all[argTextBoxId].value = obj.text;
	//1050331 Cloud	[1050087] 升級二代系統
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################

/*
//檢查日期格式並Alert訊息
function txTxDate_onblur()
{
	if(!CheckDate(document.all.txTxDate,"申請日期"))
		FocusAt(document.all.txTxDate);
}
*/

function dlReason_Onchange() {
	var index = document.all["dlReason"].selectedIndex;
	if (index != 0) {
		document.all["txExReason"].value = document.all["dlReason"].options[index].text;
	}
}

//取消TextBox中enter的功能
//1080424	Kevin_C	1080047		二代Enter會轉TAB，故不需另外註冊函式處理
// function fnHandleTextarea()
// {
// if(event.keyCode==13)
// event.cancelBubble = true;

////zoey [95/10/30]
////var xObjectName = document.activeElement.id;
////1060802 Justin 修正無法檢核字數問題
////var xObjectName = e.target.id;
// var xObjectName = document.activeElement.id;

// if(xObjectName =="txExReason" && document.all["txExReason"].value.length >=100)
// {
// if(event.keyCode!=8)
// {     alert("最多僅能輸入100字");
// event.returnValue = false;
// }
// }
// else if(xObjectName =="txSchedule" && document.all["txSchedule"].value.length >=400)
// {
// if(event.keyCode!=8)
// {     alert("最多僅能輸入400字");
// event.returnValue = false;
// }
// }

// }
//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName) {
	document.all[argControlName].disabled = true;
	if (document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName) {
	document.all[argControlName].disabled = false;
	if (document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName) {
	document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName) {
	document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName) {
	SetControlDisable(argControlName + "_Text");
	SetControlDisable(argControlName);
}

function SetCombBoxEnable(argControlName) {
	SetControlEnable(argControlName + "_Text");
	SetControlEnable(argControlName);
}



function FocusAt(argObj) {
	if (!argObj.disabled)
		argObj.focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj, argObjName) {
	var Obj = document.all[argObj];
	if (Obj.value != "") {
		jf_PADCHAR(Obj, 7, '0');
		if (!jf_CheckCDATE(Obj.value)) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1, argNum2) {
	if (argNum1 == Math.min(argNum1, argNum2))
		return false;
	else
		return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr) {
	var num = argNumStr;

	if (num.length > 0) {
		if (argNumStr.charAt(0) == "0")
			num = argNumStr.substr(1, argNumStr.length - 1);
		if (num.charAt(0) == "0")
			num = StringGetInt(num)
	}
	return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId, argSelectValue) {
	if (argSelectValue == "")
		return;
	for (var i = 0; i < document.all[argSelectId].length; i++) {
		//有可能Value的形式為 v1,v2,v3
		if (GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue) {
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray, argIndex) {
	var RtnValueArray = argValueArray.split(",");
	return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId, argSelectText) {
	if (argSelectValue == "")
		return;
	for (var i = 0; i < document.all[argSelectId].length; i++) {
		if (document.all[argSelectId].options[i].Text == argSelectText) {
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName, argFieldName) {
	if (document.all[argObjName].value == "") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
		FocusAt(document.all[argObjName]);
		return false;
	}
	return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex() {
	//return intRowIndex = event.srcElement.parentElement.rowIndex;   
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8, xObjectName.indexOf("_", 8));
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
function getToolBarItemObjById(argId) {
	for (var i = 0; i < document.all.tbTool.numItems; i++) {
		if (document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);
	}
}

//合乎Template的Alert
function AlertCustMsg(argMsg) {
	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argMsg])), "");
}

function SetCanSubmit() {
	IsServerHandling = true;
	jf_ShowWaitState();
	Page_BlockSubmit = false;
}

function SetCanNotSubmit() {
	Page_BlockSubmit = true;
}
/*
//IIC100回呼之Function
function fnHandleData()
{
	var LbMsgObj = getToolBarItemObjById("lbMsg");
	if(LbMsgObj != null)
	{		
		var Msg = "";
		if(document.all.hData_OrgCode.value != "")
			Msg += " 單位："+document.all.hData_OrgName.value;
		if(document.all.hData_RoleCode.value != "")
			Msg += " 角色："+document.all.hData_RoleName.value;
		if(document.all.hData_UserCode.value != "")
			Msg += " 人員："+document.all.hData_UserName.value;
		
		LbMsgObj.setAttribute("Text",Msg);
	}
}
*/
function fnOpenChildWin(argUrl, argWinName, argWidth, argHeight) {
	var strWinStyle, strTop, strLeft;
	strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";
	if ((argWidth != "") || (argWidth != "0")) {
		strWinStyle = strWinStyle + ",width=" + argWidth;
		strLeft = (screen.width - argWidth) / 2;
		strWinStyle = strWinStyle + ", left=" + strLeft;
	}
	if ((argHeight != "") || (argHeight != "0")) {
		strWinStyle = strWinStyle + ",height=" + argHeight;
		strTop = (screen.height - argHeight) / 2 - 10;
		strWinStyle = strWinStyle + ", top=" + strTop;
	}
	gWindowID = window.open(argUrl, argWinName, strWinStyle);
	gWindowID.focus();

	return gWindowID;
}
//1000926	Jeff	1000770		申請展期天數是否符合線上申請範圍判斷
function fnCurrExDaysCheck() {
	var strCurrExDays = document.all.txCurrExDays.value;
	var strHaveExDays = document.all.txHaveExDays.value;
	var strLimitDay = document.all.H_txNewSet.value.split(',')[1];
	var strOD_ODT220_TIMES = document.all["TIMES_MODE"].value;
	var strOD_ODT220_BusEXT_FLOWTYPE = "";

	if (strLimitDay != "" && strOD_ODT220_TIMES == "N") {
		if (parseInt(strCurrExDays) + parseInt(strHaveExDays) > parseInt(strLimitDay)) {
			alert("展期天數超過" + strLimitDay + "天，需由上級機關核可，請改走紙本申請");
			return false;
		}
	}
	return true;
}
var wsGetWorkDateID = null;
function GetNDueDate() {
	var strExDays = document.all["txCurrExDays"].value;
	if (strExDays == "") {
		//1050331 Cloud	[1050087] 升級二代系統
		//document.all.lbNDueDate.innerText = "";
		document.all.lbNDueDate.textContent = "";
		return;
	}
	//0980406-檢核展期天數是否為數字格式-Jane
	if (isNaN(jf_Trim(document.all.txCurrExDays.value)) && document.all.txCurrExDays.value != "?") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期天數欄位請輸入半形數字!!"])), "");
		return false;
	}
	if (document.all.nOrgNickName.value == "RRB" && document.all.DocProtity && document.all.DocProtity.value == "3") {
		var HaveExD = parseInt(jf_Trim(document.all["txHaveExDays"].value)) + parseInt(jf_Trim(document.all["txCurrExDays"].value));
		if (HaveExD > 180) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期申請天數累計已超過180天，不可再進行展期申請"])), "");
			return false;
		}
	}

	var wsParam = new Array();
	wsParam[0] = document.all["txLimitDate"].value;
	wsParam[1] = strExDays;
	wsParam[2] = "2";//不含假日
	//0980129 依業務類別計算限辦日期是否包含假日 START
	if (document.all.H_txLtIncHd != null) {
		if (document.all.H_txLtIncHd.value == "Y")
			wsParam[2] = "1";
		//0991124	Howard	0990695	修正配合人民申請案件，修改展期天數判斷條件，加入連休假日
		else if (document.all.H_txIncHd.value == "H")
			wsParam[2] = "3";
	}
	//1000926	Jeff	1000770		檢查展期申請天數是否在線上申請核可範圍
	if (!fnCurrExDaysCheck())
		return;
	//0980129 END
	//1110224 Cloud 1101504 月份另外計算
	if (document.all["H_EXT_DEFUNIT"].value != "" && document.all["H_EXT_DEFUNIT"].value == "M") {
		var RtnDate = OD.ODT220.GetDueDateByM(strExDays, document.all["txLimitDate"].value).value;
		document.all["lbNDueDate"].textContent = DateFormat(RtnDate);
		document.all["H_txNDueDate"].value = RtnDate;
	}
	else {

		//1050505 Kevin 1030623 限辦日期增加支援單位放假 Start
		wsParam[3] = document.all.H_txDueRule.value;
		wsParam[4] = "";
		wsParam[5] = "";
		wsParam[6] = document.all["txDocNo"].value;
		CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetLastDueDate", false, wsParam);
		////1030627 Eric 1030365	判斷DUE_RULE是否使用GetUnHoliday函式
		////var CallWsObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate",false,wsParam);
		//if (document.all.H_txDueRule.value == "Y")
		//	CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnHoliday", false, wsParam);
		//else
		//	CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetWorkDate", false, wsParam);
		//1050505 Kevin 1030623 End

		wsGetWorkDateID = CallWsObj.id;
		OnWSResult(CallWsObj);
		//zoey [950836, 95/10/26]
	}
	if (((document.all["H_txOnlineMode"].value == "2") || (document.all["H_txOnlineMode"].value == "3")) && document.all["TIMES_MODE"].value != "Y") {
		//zoey [95/10/30]
		GetExtReason();
		//1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
		__doPostBack("txCurrExDays", 0);
	}

}

//日期格式轉換
function DateFormat(argDate) {
	if (argDate.length == 7)
		return argDate.substring(0, 3) + "/" + argDate.substring(3, 5) + "/" + argDate.substring(5, 7);
	if (argDate.length == 11)
		return argDate.substring(0, 3) + "/" + argDate.substring(3, 5) + "/" + argDate.substring(5, 7) + " " + argDate.substring(9, 2) + ":" + argDate.substring(11, 2);
	return argDate;
}

function cbReasonOnClick() {
	//if(document.all.cbReason8.checked)
	if (document.all.cbreason_else.checked) {
		document.all.txExReason.readOnly = "";
		document.all.txExReason.className = "InputFieldText";
		document.all.txExReason.style.backgroundColor = "white";
	}
	else {
		document.all.txExReason.readOnly = "readonly";
		document.all.txExReason.className = "DisplayOnly";
		document.all.txExReason.style.backgroundColor = "LightGrey";
	}
}

/************************************
*		InitReasonTable
*		初始化展期理由checkBox
*		David 95.05.11
*************************************/
var signValue;	//紀錄innertext為'其他'的變數

function InitReasonTable() {
	var strOrg = document.all.nOrg.value;
	//1020522	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
	var strOrgNickName = document.all.nOrgNickName.value;
	var nCount = document.all["dlPhraseDesp"].length;
	var LayoutModeReadOnly = 2;
	var DATA = new Array(nCount);
	for (i = 0; i < nCount; i++) {
		DATA[i] = document.all["dlPhraseDesp"].options[i].value;
	}
	var InsertContentBegin = "";
	var InsertContentEnd = "";
	var InsertContent = "";
	//1050401 Cloud	[1050087] 升級二代-長度以最長字元長度放入
	var dtLeftLenght = 0;
	var dtRightLenght = 0;
	var drS = ""
	var drE = ""

	for (i = 0; i < nCount; i++) {
		var j = i;
		//1050401 Cloud	[1050087] 升級二代-S
		if (i == 0)
			dtLeftLenght = DATA[i].length;
		else {
			//*1100319	Cloud	--		國教院升級二代發現，展期理由文字長度排的順序，會造成畫面顯示異常
			//if (DATA[i].length > DATA[i - 1].length)
			if (DATA[i].length > dtLeftLenght)
				dtLeftLenght = DATA[i].length;
		}
		//if((jf_GetActionMode() == LayoutModeNew) || (jf_GetActionMode() == LayoutModeReadOnly) )
		if ((jf_GetActionMode() == LayoutModeNew) || (document.all["ReadOnly"] && document.all["ReadOnly"].value == "Y")) {
			//1050331 Cloud	[1050087] 升級二代
			/*InsertContent += "<TR><TD style='WIDTH: 157px' align='right'></TD>"+
						  "<TD style='WIDTH: 250px'>"+
							  "<input id='rReason_"+ i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick='event.returnValue=false' /><FONT color='gray' >" + DATA[i] +"</FONT>"+
						  "</TD>"+
						  "<TD style='WIDTH: 40x' align='right'></TD>";*/
			//1061222 Justin [1061237] 變更首欄標題寬度
			//InsertContent += "<div class='dTR'><div class='dTDTitle' style='width: 9.5em'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
			InsertContent += "<div class='dTR'><div class='dTDTitle' style='width: 10.5em'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
				"<div class='dTD' style='width: @LeftLenght'>" +
				//1070717	Joe		1070678		弱掃修正Client Potential XSS
				// "<input id='rReason_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick='event.returnValue=false' disabled /><Label color='gray'>" + DATA[i] + "</Label>" +
				"<input id='rReason_" + i + "' type='checkbox' name='rReason_" + htmlencode(i) + "' GroupName='Reason' onclick='event.returnValue=false' disabled /><Label color='gray'>" + htmlencode(DATA[i]) + "</Label>" +
				"</div>" +
				"<div class='dTDTitle' style='width: 10em'></div>";
		}
		else {
			//1050331 Cloud	[1050087] 升級二代
			/*InsertContent += "<TR><TD style='WIDTH: 157px' align='right'></TD>"+
						  "<TD style='WIDTH: 250px'>"+
							  "<input id='rReason_"+ i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=GetExtReason() /><FONT color='darkblue' >" + DATA[i] +"</FONT>"+
						  "</TD>"+
						  "<TD style='WIDTH: 40px' align='right'></TD>";*/
			//1050331 Cloud	[1050087] 升級二代
			//1061222 Justin [1061237] 變更首欄標題寬度
			//InsertContent += "<div class='dTR'><div class='dTDTitle' style='width: 9.5em'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
			InsertContent += "<div class='dTR'><div class='dTDTitle' style='width: 10.5em'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
				"<div class='dTD' style='width: @LeftLenght'>" +
				//1070717	Joe		1070678		弱掃修正Client Potential XSS
				// "<input id='rReason_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=GetExtReason() /><Label color='gray'>" + DATA[i] + "</Label>" +
				"<input id='rReason_" + i + "' type='checkbox' name='rReason_" + htmlencode(i) + "' GroupName='Reason' onclick=GetExtReason() /><Label color='gray'>" + htmlencode(DATA[i]) + "</Label>" +
				"</div>" +
				"<div class='dTDTitle' style='width: 10em'></div>";

		}
		i++;
		//if (DATA[i]=="其他")
		/*if (i%2 == 0)
		{
			InsertContent += "<TD></TD></TR>"+
						 "<TR><TD style='WIDTH: 157px' align='right'></TD>";
			signValue = i;
		}*/
		if (i < nCount) {
			//1050401 Cloud	[1050087] 升級二代-S
			if (i == 0)
				dtRightLenght = DATA[i].length;
			else {
				//*1100319	Cloud	--		國教院升級二代發現，展期理由文字長度排的順序，會造成畫面顯示異常
				//if (DATA[i].length > DATA[i - 1].length)
				if (DATA[i].length > dtRightLenght)
					dtRightLenght = DATA[i].length;
			}
			//1050401 Cloud	[1050087] 升級二代-E
			//zoey 950925 [問題單 950776], 加入判別是現在模式	
			if ((jf_GetActionMode() == LayoutModeNew) || (document.all["ReadOnly"] && document.all["ReadOnly"].value == "Y"))
			//if(jf_GetActionMode() == LayoutModeNew || jf_GetActionMode() == LayoutModeReadOnly )
			{
				//1050331 Cloud	[1050087] 升級二代
				/*InsertContent +=	 "<TD>"+
												"<input id='rReason_"+ i + "' type='checkbox' name='rReason_" + i + "'  GroupName='Reason' onclick='event.returnValue=false'  /><FONT color='gray' >" + DATA[i] +"</FONT>"+
									 "</TD></TR>";*/
				InsertContent += "<div class='dTD' style='width: @RightLenght'>" +
					//1070717	Joe		1070678		弱掃修正Client Potential XSS
					// "<input id='rReason_" + i + "' type='checkbox' name='rReason_" + i + "'  GroupName='Reason' onclick='event.returnValue=false' disabled  /><Label color='gray'>" + DATA[i] + "</Label>" +
					"<input id='rReason_" + i + "' type='checkbox' name='rReason_" + htmlencode(i) + "'  GroupName='Reason' onclick='event.returnValue=false' disabled  /><Label color='gray'>" + htmlencode(DATA[i]) + "</Label>" +
					"</div></div>";
			}
			else {
				//1050331 Cloud	[1050087] 升級二代
				/*InsertContent +=	 "<TD>"+
											"<input id='rReason_"+ i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=GetExtReason()  /><FONT color='darkblue' >" + DATA[i] +"</FONT>"+
								 "</TD></TR>";*/
				InsertContent += "<div class='dTD' style='width: @RightLenght'>" +
					//1070717	Joe		1070678		弱掃修正Client Potential XSS
					// "<input id='rReason_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=GetExtReason()  /><Label color='darkblue'>" + DATA[i] + "</Label>" +
					"<input id='rReason_" + i + "' type='checkbox' name='rReason_" + htmlencode(i) + "' GroupName='Reason' onclick=GetExtReason()  /><Label color='darkblue'>" + htmlencode(DATA[i]) + "</Label>" +
					"</div></div>";
			}


		}
	}
	//1050331 Cloud	[1050087] 升級二代
	//var oldHTML = "<TABLE id='TEST' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width=714px border='0'><TBODY>";//width原本是91%
	//var oldHTML = "<div class='dTR'>";
	//1100319	Cloud	--		國教院升級二代發現，展期理由文字長度排的順序，會造成畫面顯示異常-配合可能有全形空給到1em
	dtLeftLenght = dtLeftLenght + 0.5 + "em";
	dtRightLenght = dtRightLenght + 0.5 + "em";
	/*LeftLenght = dtLeftLenght + 1 + "em";
	dtRightLenght = dtRightLenght + 1 + "em";*/
	InsertContent = InsertContent.replace(/@LeftLenght/g, dtLeftLenght);//所有變數轉換以//g包裹被替換字串
	InsertContent = InsertContent.replace(/@RightLenght/g, dtRightLenght);
	var newHTML = "";
	//1050331 Cloud	[1050087] 升級二代
	//newHTML = oldHTML + InsertContent + "</TBODY></TABLE>";
	newHTML = InsertContent;
	//1050331 Cloud	[1050087] 升級二代
	//document.all["TEST"].outerHTML = newHTML;
	document.all["ReasonTable"].outerHTML = newHTML;

	var signReasonValue;
	//95.07.03 David
	//var InitReasonArray = new Array(8);
	var InitReasonArray = new Array(nCount);
	InitReasonArray = document.all["txReasonNo"].value.split(",");


	/*if (document.all.txReasonNo.value != "")
	{
		signReasonValue = document.all.txReasonNo.value;
		document.all["rReason_"+signReasonValue].checked = true;	//判斷初始化應該使哪個radiobutton為checked
	}*/

	for (i = 0; i < nCount; i++) {
		if (InitReasonArray[i] == "1") {
			document.all["rReason_" + i].checked = true;
		}
		//95.07.03 David
		if (InitReasonArray[nCount] == "1") {
			document.all["cbreason_else"].checked = true;
			document.all.txExReason.readOnly = "";
			/*950587 判斷是否從訊息單入口進入 by whay*/
			//0961123	Leslie	改用nMsg判斷是否是由訊息單一入口或是由Email點選進入
			//if(document.all.nMsg.value == ""){	//Leslie	0970181	改為判斷nMsg是否為null
			if (document.all.nMsg == null) {
				document.all.txExReason.className = "InputFieldText";
				document.all.txExReason.style.backgroundColor = "white";
			}

		}
		else {
			document.all.txExReason.value = "";
			document.all.txExReason.readOnly = "readonly";
			document.all.txExReason.className = "DisplayOnly";
			document.all.txExReason.style.backgroundColor = "LightGrey";
			//document.all.txExReason.disabled = true;

			//1020522	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關			
			//if(strOrg == "313050000G"){
			if (strOrgNickName == "SMEA") {

				if (jf_Trim(document.all.txReason.value) == "")//0971112  Jane 中企處自行輸入的展期原因無法正常顯示在畫面以及報表上
				{
					//1050331 Cloud	[1050087] 升級二代系統
					//document.all.txReason.innerText = "(請自行填註複雜的原因)案情較複雜，承辦費時";//0970861	Leslie	中企處修改展期理由
					document.all.txReason.textContent = "(請自行填註複雜的原因)案情較複雜，承辦費時";//0970861	Leslie	中企處修改展期理由
				}
				if (document.all.cbreason.checked != true)//Jane 若有勾選則不readOnly,讓其可於儲存狀況下可修改
				{
					document.all.txReason.readOnly = "readonly";
					document.all.txReason.className = "DisplayOnly";
					document.all.txReason.style.backgroundColor = "LightGrey";
				}
				//Jane 如果不是新增或修改cbreason不可點選提供修改
				if (document.all.nMsg != null)//判斷是否由訊息單一入口進入
				{
					//不從訊息單一入口
					document.all.cbreason.disabled = true;
				}
				if (jf_Trim(document.all.txReason.value) != "(請自行填註複雜的原因)案情較複雜，承辦費時" && document.all.cbreason.checked && document.all.nMsg != null)//JANE
				{
					document.all.txReason.readOnly = "readonly";
					document.all.txReason.className = "DisplayOnly";
					document.all.txReason.style.backgroundColor = "LightGrey";
					document.all.cbreason.disabled = true;
				}

			} else {
				//1050401 Cloud	[1050087] 升級二代
				//document.all.txReason.className = "Hide";
				document.all.txReason.className = "hide";
			}

		}


	}

}
/***********************************************
*		GetExtReason
*		取得checkBox innerText 中的展期理由
*		David	95.05.11
************************************************/
var addReason;
//var reasonNoArray = new Array(8);		//用來暫存被選擇展期理由的編號
var reasonNoArray = new Array(document.all["dlPhraseDesp"].length);		//用來暫存被選擇展期理由的編號
//var reasonNo;
function GetExtReason() {
	var nCount = document.all["dlPhraseDesp"].length;
	//var xObjectName = document.activeElement.id;
	//*1051030	CLOUD	1050087	修正被誤改的程式碼
	//var xObjectName = e.target.id;		//作用的物件名稱
	//1100201	Joe		1090927		取消使用document.activeElement
	// var xObjectName = document.activeElement.id;
	var xObjectName = event.target.id;
	var rowNO = xObjectName.substring(8, xObjectName.length);	//作用物件名稱去除前兩個字
	var activeReason = "";

	//使radio button 有Group的功能
	/*for(i=0;i<nCount;i++)
	{
		if (i != rowNO)
			document.all["rReason_"+i].checked = false;
	}*/

	//檢查cb中哪些被選取
	for (i = 0; i < nCount; i++) {
		if (document.all["rReason_" + i].checked == true)
			reasonNoArray[i] = "1";
		else
			reasonNoArray[i] = "0";
	}

	if (document.all["cbreason_else"].checked == true)
		//reasonNoArray[7] = "1";
		reasonNoArray[nCount] = "1";
	else {
		//reasonNoArray[7] = "0";
		reasonNoArray[nCount] = "0";
		document.all["txExReason"].value = "";
	}

	//如果展期原因不足八個,則對其他強制補零
	//95.07.03 David
	/*if(nCount < 8)
	{
		for(i=nCount;i<8;i++)
		{
			if(reasonNoArray[i] == null)
			{
				reasonNoArray[i] = "0";
			}
		}
	}*/

	//activeReason = document.all.dlPhraseDesp.options[rowNO].value;
	document.all.txTempPhraseDesp.value = reasonNoArray;
	//控制其他欄位的唯讀與否
	//if (document.all["rReason_"+signValue].checked)

	if (document.all["cbreason_else"].checked) {
		document.all.txExReason.readOnly = "";
		document.all.txExReason.className = "InputFieldText";
		document.all.txExReason.style.backgroundColor = "white";
	}
	else {
		document.all.txExReason.readOnly = "readonly";
		document.all.txExReason.className = "DisplayOnly";
		document.all.txExReason.style.backgroundColor = "LightGrey";
	}
	//951209 增加對[承辦費時]欄位唯讀控制，中企處特殊需求  by whay
	var strOrg = document.all.nOrg.value;
	//1020522	Jagle	[1000751]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關			
	//if(strOrg == "313050000G")
	var strOrgNickName = document.all.nOrgNickName.value;
	if (strOrgNickName == "SMEA") {

		if (document.all["cbreason"].checked) {
			document.all.txReason.readOnly = "";
			document.all.txReason.className = "InputFieldText";
			document.all.txReason.style.backgroundColor = "white";
			document.all["cbreason"].disabled = false;//0971112  Jane 中企處自行輸入的展期原因無法正常顯示在畫面以及報表上
		}
		else {
			document.all.txReason.readOnly = "readonly";
			document.all.txReason.className = "DisplayOnly";
			document.all.txReason.style.backgroundColor = "LightGrey";
		}

	}
	var ReasonText = new Array(nCount);

	for (i = 0; i < nCount; i++) {
		if (document.all["rReason_" + i].checked)
			ReasonText[i] = 1;
		else
			ReasonText[i] = 0;
	}

}

//0990203	Howard	0990140	判斷展期天數累計申請是否超過特定天數[CANAPPLY_PT_DAYS]
function fnCheckApplyDays() {
	var obj = document.all["CANAPPLY_PT"];
	if (obj == null)
		return false;

	if (document.all["CANAPPLY_PT"].value == "Y") {
		//1041011	Cloud	[1040908]	增加判斷是否經過專案申請-此欄位只有航港局時才會註冊-有經過專案申請 不檢核天數
		if (document.all["h_txBeOdt250"]) {
			if (document.all["h_txBeOdt250"].value == "Y")
				return false;
		}
		//判斷目前展期申請的累計天數是否超過系統參數設定天數
		var CanDays = document.all["CANAPPLY_PT_DAYS"].value;
		var HaveExD = parseInt(jf_Trim(document.all["txHaveExDays"].value)) + parseInt(jf_Trim(document.all["txCurrExDays"].value));

		if (HaveExD > parseInt(CanDays))
			return true;
		else
			return false;
	}
	else
		return false;
}

//0990825	Howard0990569	修改傳送前應再檢核使用者之核可權
function CheckCurrdayExchanged() {
	var NowCurrDay = jf_Trim(document.all["txCurrExDays"].value);
	var OldCurrDay = jf_Trim(document.all["H_OldCurrDay"].value);

	//若不相等時，則重新計新展期天數，再執行送出動作
	if (NowCurrDay != OldCurrDay) {
		var strExDays = document.all["txCurrExDays"].value;

		//檢核展期天數是否為數字格式
		if (isNaN(jf_Trim(document.all.txCurrExDays.value)) && document.all.txCurrExDays.value != "?") {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期天數欄位請輸入半形數字!!"])), "");
			return false;
		}
		//重新取得新限辦日期
		//1110224 Cloud 1101504 依預設天數單位進行計算
		if (document.all["H_EXT_DEFUNIT"].value != "" && document.all["H_EXT_DEFUNIT"].value == "M") {
			var RtnDate = OD.ODT220.GetDueDateByM(strExDays, document.all["txLimitDate"].value).value;
			document.all["lbNDueDate"].textContent = DateFormat(RtnDate);
			document.all["H_txNDueDate"].value = RtnDate;
		}
		else {
			var wsParam = new Array();
			wsParam[0] = document.all["txLimitDate"].value;
			wsParam[1] = strExDays;
			wsParam[2] = "2";//不含假日
			//依業務類別計算限辦日期是否包含假日 
			if (document.all.H_txLtIncHd != null) {
				if (document.all.H_txLtIncHd.value == "Y")
					wsParam[2] = "1";
				//0991124	Howard	0990695	修正配合人民申請案件，修改展期天數判斷條件，加入連休假日
				else if (document.all.H_txIncHd.value == "H")
					wsParam[2] = "3";
			}
			//1030627 Eric 1030365	判斷DUE_RULE是否使用GetUnHoliday函式
			//var CallWsObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate",false,wsParam);
			if (document.all.H_txDueRule.value == "Y")
				CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnHoliday", false, wsParam);
			else
				CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetWorkDate", false, wsParam);
			wsGetWorkDateID = CallWsObj.id;
			OnWSResult(CallWsObj);
		}
		//設定CurrDays是否有改變
		document.all.hTxCurrdayChanged.value = "Y";
	}

}
//1020906 Erin [1020691] 開啟ODT410
function OpenODT411(argSmart, argDocNo, argUserId, argOrgNo) {
	var strLocation = document.all.H_WSLocation.value;
	var strUrl = "";

	if (strLocation != "" && strLocation.indexOf("http") < 0) {
		strUrl = "http://" + strLocation;
	}
	else {
		strUrl = strLocation;
	}
	strUrl += "ODT410Main.aspx?rtnObj=lbReturnValue";
	strUrl += "&argDocNo=" + argDocNo;
	strUrl += "&SAMLart=" + argSmart;
	strUrl += "&ACC=" + argUserId;
	strUrl += "&SOURCE_ORGNO=" + argOrgNo;


	jf_OpenChildWin(strUrl, "ODT410", 760, 520);
}
//1051201 Cloud	1051181 增加檢核擬定作業事項-s
function CheckDetial() {
	var blEmptyRow = false;  // 紀錄空白列；只要資料列輸入完整，輸入時穿插空白列仍須能儲存
	var strTargetId = "";
	var strEmptyText = "";
	var strTmp = "";
	var bcheck = false;
	//1060413 Cloud   Cloud   1060240     [鐵改局]提供由細項日期最大日期寫回申辦日期並重新計算天數功能。
	var maxScheduledate = "";
	//1130328    Jason   1130165 修改申請天數、申請後日期錯誤計算--加入判斷最後一個進度迄欄位	
	//for (var iRow = 2; iRow < document.all["dgSchedule"].rows.length; iRow++) {
	for (var iRow = 2; iRow <= document.all["dgSchedule"].rows.length; iRow++) {
		strEmptyText = "";
		if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value != "" && document.all["dgSchedule__ctl" + iRow + "_txDateS"].value != "" && document.all["dgSchedule__ctl" + iRow + "_txDateE"].value != "") {
			bcheck = true;
			document.all["dgSchedule__ctl" + iRow + "_txDateS"].value = jf_PADL(document.all["dgSchedule__ctl" + iRow + "_txDateS"].value, 7, "0");
			document.all["dgSchedule__ctl" + iRow + "_txDateE"].value = jf_PADL(document.all["dgSchedule__ctl" + iRow + "_txDateE"].value, 7, "0");
			if (document.all["dgSchedule__ctl" + iRow + "_txDateS"].value > document.all["dgSchedule__ctl" + iRow + "_txDateE"].value) {
				strTmp = document.all["dgSchedule__ctl" + iRow + "_txDateS"].value;
				document.all["dgSchedule__ctl" + iRow + "_txDateS"].value = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
				document.all["dgSchedule__ctl" + iRow + "_txDateE"].value = strTmp;
			}
		}
		else if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value == "" && document.all["dgSchedule__ctl" + iRow + "_txDateS"].value == "" && document.all["dgSchedule__ctl" + iRow + "_txDateE"].value == "") {
			blEmptyRow = true;
			if (iRow == (document.all["dgSchedule"].rows.length - 1)) {
				if (blEmptyRow && !bcheck)
					bcheck = CheckNotEmptyAndAlert("dgSchedule__ctl2_txPlan", "預定作業事項");
			}
		}
		else {
			if (document.all["dgSchedule__ctl" + iRow + "_txDateE"].value == "") {
				strTargetId = "dgSchedule__ctl" + iRow + "_txDateE";
				strEmptyText = "進度訖";
			}
			if (document.all["dgSchedule__ctl" + iRow + "_txDateS"].value == "") {
				strTargetId = "dgSchedule__ctl" + iRow + "_txDateS";
				if (strEmptyText != "")
					strEmptyText = "、" + strEmptyText;
				strEmptyText = "進度起" + strEmptyText;
			}
			if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value == "") {
				strTargetId = "dgSchedule__ctl" + iRow + "_txPlan";
				if (strEmptyText != "")
					strEmptyText = "、" + strEmptyText;
				strEmptyText = "預定作業事項" + strEmptyText;
			}
			bcheck = CheckNotEmptyAndAlert(strTargetId, strEmptyText);
			break;
		}
		if (document.all.nOrgNickName.value == "RRB") {

			if (maxScheduledate == "")
				maxScheduledate = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
			else {
				if (maxScheduledate < document.all["dgSchedule__ctl" + iRow + "_txDateE"].value)
					maxScheduledate = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
			}
		}

	}
	//1060413 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算
	if (document.all.nOrgNickName.value == "RRB") {

		if (!fnGetWorkDays(maxScheduledate))
			return false;
		else {
			//1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算-取得業務類別判斷計算日期時是否要計算假日
			if (document.all.nOrgNickName.value == "RRB") {
				if (!window.confirm("本次申請天數:" + document.all.txCurrExDays.value + "天  申請後日期：" + document.all.H_txNDueDate.value + "\n是否確認儲存/傳送?")) { return false; }
				else {
					if (((document.all["H_txOnlineMode"].value == "2") || (document.all["H_txOnlineMode"].value == "3")) && document.all["TIMES_MODE"].value != "Y") {
						GetExtReason();
						//IsServerHandling = true;
						//__doPostBack("txCurrExDays", 0);
						document.all.hTxCurrdayChanged.value = "Y";
						return true;
					}
				}
			}
		}

	}
	return bcheck;
}
function CheckNotEmptyAndAlert(argObjName, argFieldName) {
	if (document.all[argObjName].value == "") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
		$('#' + argObjName).focus();
		return false;
	}
	return true;
}
//1051201 Cloud	1051181 增加檢核擬定作業事項-e
//1060413 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算-取得業務類別判斷計算日期時是否要計算假日-S
var iCallID_GetWorkDays = null;
function fnGetWorkDays(argCloseDate) {

	var param = new Array(3);
	param[0] = document.all["txLimitDate"].value;
	param[1] = argCloseDate; //擬定迄日
	if (document.all.H_txIncHd.value == "Y") //含假日
		param[2] = "1";
	else if (document.all.H_txIncHd.value == "H") //連續假日(連休3日Mode)
		param[2] = "3";
	else
		param[2] = "2";

	callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetWorkDays", false, param);
	iCallID_GetWorkDays = callObj.id;
	if (!OnWSResult(callObj)) {
		document.all.txCurrExDays.value = "";
		document.all.H_txNDueDate.value = "";
		document.all.lbNDueDate.textContent = "";
		alert("申請後限辦日期不可小於起算日期，請重新輸入");
		return false;
	}
	else {
		document.all.txCurrExDays.value = callObj.value.RtnStr;
		document.all.H_txNDueDate.value = argCloseDate;
		document.all.lbNDueDate.textContent = argCloseDate.substr(0, 3) + "/" + argCloseDate.substr(3, 2) + "/" + argCloseDate.substr(5, 2);
		return true;
	}

}
//1060413 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算-取得業務類別判斷計算日期時是否要計算假日-S

//1070912	Joe	1070172	新增加入附件--S
//存放檔案物件及暫存(格式檢核未放入)
var AllFiles = [];
function fnAddFile() {
	if (!document.all.dgAttach)
		return;
	var strFileFullPath = "";
	var strSrcFileName = "";
	//取得檔案資訊方式
	for (var iFile = 0; iFile < $('#fileInput')[0].files.length; iFile++) {
		var bFileNameCheck = true;
		var bFileSizeCheck = true;
		var currentFile = $('#fileInput')[0].files[iFile];
		var nFileSize = Math.ceil(currentFile.size / 1024);

		var strFileName = currentFile.name;
		for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
			//原先已有之附件
			if (document.all["dgAttach__ctl" + (i + 1) + "_lbFileName"])
				strSrcFileName = document.all["dgAttach__ctl" + (i + 1) + "_lbFileName"].textContent;
			else
				strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].textContent;
			if (strFileName == strSrcFileName) {
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
				$('btAddFile').focus();
				return;
			}
		}

		fnAddAttach(strFileName, strFileFullPath, "", "", "", "");
		AllFiles.push($('#fileInput')[0].files[iFile]);
		//*1110820    Cloud   1110629 修正無附件不應顯示title問題
		if (AllFiles.length != 0) {
			document.all.dgAttach.className = "";
			document.all.dgAttachhead.className = "dghead";
		}

	}

	//將focus設到加入附件的按鈕以便使用者繼續加入
	$('btAddFile').focus();
}

//新增加入附件共用函式
function fnAddAttach(argFileName, argFileFullPath, argFileSize, argFileDesc, argFileType, argFileDraftSeq) {
	var rowCnt = document.all.dgAttach.rows.length;
	//設定row的背景色
	var rowBgColor = (rowCnt % 2) ? "White" : "#C9F3F5";
	//create row
	var row = document.createElement("TR");
	row.style.backgroundColor = rowBgColor;
	//create column
	var colSeq = document.createElement("TD");
	colSeq.setAttribute("align", "middle");
	colSeq.setAttribute("nowrap", "nowrap");
	colSeq.className = "InputFieldLabel";
	colSeq.innerText = rowCnt;
	var colFile = document.createElement("TD");
	colFile.setAttribute("align", "Left");
	var spanFileName = document.createElement("SPAN");
	var spanFilePath = document.createElement("SPAN");
	var spanFileSize = document.createElement("SPAN");
	var spanFileDesc = document.createElement("SPAN");
	var spanFileComeFrom = document.createElement("SPAN");
	var spanFileDraftSeq = document.createElement("SPAN");
	spanFileName.name = "FileName";
	spanFileName.textContent = argFileName;
	spanFilePath.name = "FilePath";
	spanFilePath.textContent = argFileFullPath;
	spanFileSize.name = "FileSize";
	spanFileSize.textContent = argFileSize;
	spanFileDesc.name = "FileDesc";
	spanFileDesc.textContent = argFileDesc;
	spanFileComeFrom.name = "FileComeFrom";
	spanFileComeFrom.textContent = argFileType;
	spanFileDraftSeq.name = "FileDraftSeq";
	spanFileDraftSeq.textContent = argFileDraftSeq;
	spanFileName.className = "InputFieldLabel";
	spanFilePath.style.display = "none";
	spanFileSize.style.display = "none";
	spanFileDesc.style.display = "none";
	spanFileComeFrom.style.display = "none";
	spanFileDraftSeq.style.display = "none";
	colFile.appendChild(spanFileName);
	colFile.appendChild(spanFilePath);
	colFile.appendChild(spanFileSize);
	colFile.appendChild(spanFileDesc);
	colFile.appendChild(spanFileComeFrom);
	colFile.appendChild(spanFileDraftSeq);
	//附件描述
	var coldes = document.createElement("TD");

	coldes.setAttribute("align", "middle");
	coldes.setAttribute("nowrap", "nowrap");
	//1110821 Cloud 1110629 修正歪掉
	//coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\"  value=\"" + argFileDesc + "\"/>";
	coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" style=\"width: 10.5em;\" value=\"" + argFileDesc + "\"/>";


	var colDel = document.createElement("TD");
	colDel.setAttribute("align", "middle");
	colDel.setAttribute("nowrap", "nowrap");
	//刪除按鈕
	colDel.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_btDelete\" type=\"submit\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
	colDel.setAttribute("visible", "true");

	var strOpenPath = argFileFullPath.replace(/\\/g, "\\\\");
	//Add to dgAttach
	row.appendChild(colSeq);
	row.appendChild(colFile);
	row.appendChild(coldes);
	row.appendChild(colDel);
	document.all.dgAttach.children[0].appendChild(row);

}

//刪除附件
function fnDeleteAttachItem() {
	Page_BlockSubmit = true;
	//先刪除資料

	var deleteRow = event.srcElement.parentNode.parentNode;
	var strDelFileName = "";
	if (deleteRow.cells[1].childNodes[0].textContent.trim() != "")
		strDelFileName = deleteRow.cells[1].childNodes[0].textContent.trim();
	else
		strDelFileName = deleteRow.cells[1].textContent.trim();

	if (document.all.H_AttachDel.value != "")
		document.all.H_AttachDel.value += "|" + strDelFileName;
	else
		document.all.H_AttachDel.value += strDelFileName;
	document.all.dgAttach.children[0].removeChild(deleteRow);
	//再重設序號及style
	for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
		var row = document.all.dgAttach.rows[i];
		var rowBgColor = (i % 2) ? "White" : "rgb(201, 243, 245)";
		row.style.backgroundColor = rowBgColor;
		row.childNodes[0].innerText = i;
	}
	//*1110820    Cloud   1110629 修正無附件不應顯示title問題
	if (document.all.dgAttach.rows.length == 1) {
		document.all.dgAttach.className = "hide";
		document.all.dgAttachhead.className = "hide dghead";
	}
}

function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "ODT220\\" + document.all.txExtNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\ODT220\\" + document.all.txExtNo.value + "\\";
	var rtnVal = OD.ODT220.AttDownLoad(DownFromPath, DownToPath, document.all.nArtifact.value, document.all.H_WS.value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
		openDlg(rtnVal[0] + "&OpenType=download", document.all.nArtifact.value, "");

}
//上傳檔案
var strUpload = "";
function UploadFile() {
	var bRtnbool = true;
	var strSrcFileName = "";
	var strSrcFileDesc = "";
	var strPath = "";
	var strBuffer = "";
	var iDgLength = document.all.dgAttach.rows.length;
	//先將不存在的附件移掉
	for (var i = 1; i < iDgLength; i++) {
		var bIsFileExist = false;
		//取得附件檔名&描述
		strSrcFileName = document.all.dgAttach.rows[i].cells[1].textContent.trim();
		if (document.all.dgAttach.rows[i].cells[2].childNodes[1])
			strSrcFileDesc = document.all.dgAttach.rows[i].cells[2].childNodes[1].value.trim();
		else
			strSrcFileDesc = document.all.dgAttach.rows[i].cells[2].childNodes[0].value.trim();
		for (var iArrfile = 0; iArrfile < AllFiles.length; iArrfile++) {
			if (AllFiles[iArrfile].name == strSrcFileName) {
				bIsFileExist = true;
				break;
			}
		}
		if (!bIsFileExist)
			AllFiles.splice(iArrfile, 1);
		document.all.H_AttachInf.value += strBuffer + strSrcFileName + ":" + strSrcFileDesc;
		strBuffer = "|";
	}
	if (AllFiles.length > 0) {
		try {
			var ioWS = new WebFileIO(document.all.H_WS.value, document.all.nArtifact.value);
			strPath = document.all["H_StartPath"].value + "\\ODT220\\" + document.all.txExtNo.value + "\\";
			ioWS.upload(strPath, AllFiles, UploadCallBack);
		}
		catch (e) {

		}
	}
	else if (document.all.DocProperty.value == "2") {
		alert("限辦公文須夾帶附件才可進行傳送");
		return false;
	}
	return true;
}
function UploadCallBack(result) {
	if (result.hasError) {
		alert("上傳附件至SERVER端失敗：" + result.ErrorMessage)
		Page_BlockSubmit = true;
	}
	else {
		IsServerHandling = true;
	}
}
//1070912	Joe	1070172	新增加入附件--E

//1070717	Joe		1070678		弱掃修正Client Potential XSS--S
function htmlencode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
//1070717	Joe		1070678		弱掃修正Client Potential XSS--E
//1080423	Kevin_C	1080047	增加字數檢核 -S
var bHasCheck = false;
function isMaxLength(obj, argText, argMaxNum) {
	if (bHasCheck) {
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
	if (obj.value.length == nMaxNum) {
		var nCode = parseInt(event.keyCode);
		if (nCode != 8 && nCode != 9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40)) {
			event.returnValue = false;
			jf_ShowMsg("", argText + "長度不可超過" + argMaxNum + "字");
			bHasCheck = false;
			return false;
		}
	} else if (obj.value.length > nMaxNum) {
		event.returnValue = false;
		jf_ShowMsg("", argText + "長度不可超過" + argMaxNum + "字");
		obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
	}
	bHasCheck = false;
	return true;
}
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1130918   Cloud   1130941     弱掃XSS修正-S
var arrDesc = new Array("txAppOnlineMode", "DescList2_1", "DescList2_2", "DescList2_3", "DescList2_4", "DescList2_5", "DescList1", "DescList2","DescList3");
function SetDescDecode() {
	for (var iDsc = 0; iDsc < arrDesc.length; iDsc++) {
		htmlDecode(arrDesc[iDsc]);
	}
}
function htmlDecode(argId) {
	//*1140811	Cloud	1130941 XSS弱掃修改-因應欄位因參數設定是否啟用，增加判斷欄位存在才做DECODE
	if(document.all[argId])
	{
		var tempVal = document.all[argId].textContent;
		if (tempVal != "") {
			var div = document.createElement('div');
			div.innerHTML = tempVal;
			document.all[argId].textContent = div.textContent;
		}
	}
}
//1130918   Cloud   1130941     弱掃XSS修正-E