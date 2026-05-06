/*
DATE	SA		PRG		MGR_NO	DESC
1050729	David	David	1050087	新增MS-ODC011
1060109	David	David	-------	調整FDA承辦人自行決行續辦問題
1060118	David	David	-------	修正線上簽核公文無法儲存續辦選項問題
1060821	David	David	1060783	線上簽核不需呼叫fnResetDlTxNameForAppAndComNo()，(一代就無此功能)
1070110	David	David	-------	ODWDCM無STORE_TYPE欄位，不需處理，避免後續公文傳送處理來源錯亂
1080102	David	David	1071058	若公文核決者資訊不在核決清單內，新增至清單中並選取；同時調整核決設定邏輯
1080110	David	David	1071073	承辦單位符合系統參數ONLY_USE_UNITFILE設定時，強制歸單位庫房
1081104	David	David	1080963	來文預設庫房設定擴充
1081121	Kevin	David	1080339	jQuery升級3.0，呼叫WS後.then()改成一律為非同步處理，如後續有其他處理邏輯會造成異常，調整呼叫方式改為.pipe()
1090903	David	David	1090660	新增依系統參數判斷核決者選單是否需依照目前流程過濾內容
1100506	Kevin	David	1100473	弱掃修正Client Potential XSS
1100716	David	David	1100433	啟用紙本流程至人時，不需透過擬辦頁面設定核決者
1101025	Kevin	David	1100322	109年法規修改，調整「存查」顯示名稱邏輯
1101108	David	David	1101249	移除依照CLOSE_F欄位限制調整發文方式邏輯
1101126	David	David	1101275	核決時間擴充時間欄位
1101228	David	David	1101249	修正移除依CLOSE_F邏輯後，未限制單位發文選項問題
1110627	David	David	1110416	Merge1020279功能至二代共通版
1110805	David	David	1110416	修正1020279判斷邏輯
1111123	David	David	1110881	新增銓敘部客製化續辦處理
1120901 Kevin	Leslie  1120709 弱掃修正Client DOM Stored XSS
1120925	David	David	1111200	1.OrgInfo.xml不組出代理人資料，調整核決者需新增依參數設定額外取得代理人功能。2.調整核決者資訊保存在cache中，不需重複取得。
1130624	David	David	-------	(屏東序792)修正有設定強制庫房時，對應紀錄欄位需更新
1140208	David	David	1131322	新增檢核核決日期有值時，核決時間欄位不可為空
1140908	David	David	序210	(退輔會序152)庫房可否異動預設處理時機調整，避免經判定不可異動後，又設定回預設值
1141002	David	David	序265	(退輔會序186)移除紙本強制判斷資料夾可異動發文設定判斷，回歸ODRPUI設定
*/

var gSignSetObj = {
arrApply : [],
arrApplyList : [],
gOdApproveType : "",
gCloseType : "",
gUnitIssue : "",
gNewTime : "",
gSourceApprovedDate : "",
grbSaveShow : "" //1101025 David 1100322 紀錄「存查」顯示名稱
//1120925 David 1111200 紀錄核決者代理人資訊
,arrAppOuRole : []
,arrProxyUser : []
};

//全域物件初始化
function gSignSetObjInit()
{
	for(nm in gSignSetObj)
	{
		if (true)
		{
			if (typeof gSignSetObj[nm] == "boolean")
			{
				gSignSetObj[nm] = false;
			}
			else if (typeof gSignSetObj[nm] == "object")
			{
				gSignSetObj[nm] = [];
			}
			else
			{
				gSignSetObj[nm] = '';
			}
		}
	}
}

function fnODC011Init()
{
	if(gObj.gODC011Load)
		return;

	gSignSetObjInit();

	fnODC011StyleCtrl();

	setEvent();

	//1101025 David 1100322 紀錄「存查」顯示名稱
	gSignSetObj.grbSaveShow = "存查";
	if(theAOL.docObj.ODWDCM.NEW_BY_OU == "Y")
	{
		gSignSetObj.grbSaveShow = "簽結";
		$("label[for='rbSave']").text(gSignSetObj.grbSaveShow);
	}

	try
	{
		gSignSetObj.gUnitIssue  = theSSO.User.EnvSettings.get("UNIT_ISSUE").toUpperCase();
		
		//依單位設定決定是否開放單位發文選項
		var paramsUnitCanIssue = {
				"argArtifact": localStorage.Artifact,
				"argOrgNo": gObj.uOrgNo,
				"argInchargeOu":_rsltODWMSG['INCHARGE_OU']
			};

		var dfdUnitCanIssue = $.Deferred();
		g_QueryDeferred = dfdUnitCanIssue;
		WsUnitCanIssue(paramsUnitCanIssue, dfdUnitCanIssue)
		//1081121 David 1080339 .then()改為.pipe()
		//.then(function (rtn)
		.pipe(function (rtn)
		{
			gSignSetObj.gUnitIssue = rtn.m_strRetStr;
		})
		.fail(function () 
		{});

		//1100716 David 1100433 啟用紙本流程至人時，不需透過擬辦頁面設定核決者
		//if(gObj.uSignType == "P")
		if(gObj.uSignType == "P" && theSSO.User.SystemSets.PFLOW_TO_USER != "Y")
		{
			//設定核決者選項
			BuildApplyUser();
			$(".AreaApplyInfo").show();

			if(jf_Trim($("#txRejectUserName").val())=="")
			{
				//1080102 David 1071058 調整設定ddlAppType邏輯，fnSetApplyDDLValue獨立給核決者選單使用
				//fnSetApplyDDLValue("ddlAppType","核決者","");
				UiSetDlItemByText("ddlAppType","核決者");
				//1080102 David 1071058 新增傳入核決者名稱
				//fnSetApplyDDLValue("ddlApply", $("#txAppUserId").val(), $("#txAppRoleId").val());
				fnSetApplyDDLValue("ddlApply", $("#txAppUserId").val(), $("#txAppRoleId").val(), $('#txAppUserName').val());
			}
			else
			{
				//1080102 David 1071058 調整設定ddlAppType邏輯，fnSetApplyDDLValue獨立給核決者選單使用
				//fnSetApplyDDLValue("ddlAppType","剔退者","");
				UiSetDlItemByText("ddlAppType","剔退者");
				UiSetDlItemByText("ddlApply", $("#txRejectUserName").val());
			}

			var ArrOD99CanApp = gObj.gOD99CanAPP.split("|");
			if (ArrOD99CanApp.length == 3 && ArrOD99CanApp[0] == "Y" && gObj.uFolder + gObj.uSubFolder == ArrOD99CanApp[2])
			{
				if (theAOL.nextTarget.TxName == "承辦人自行決行") 
				{
					//1080102 David 1071058 調整設定ddlAppType邏輯，fnSetApplyDDLValue獨立給核決者選單使用
					//fnSetApplyDDLValue("ddlAppType","核決者","");
					UiSetDlItemByText("ddlAppType","核決者");
					fnSetApplyDDLValue("ddlApply", "", "OD99");
					fnApplyDDLChange();

					$('#rbSave').prop("checked", true).checkboxradio("refresh");
					UiSetObjMotifyMode('#rbU,#rbO', 'R', '');
					//1101126 David 1101275 核決時間擴充時間欄位
					//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'W', '');
					UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'W', '');
				}
				else
				{
					fnSetApplyDDLValue("ddlApply", " ", " ");
					fnApplyDDLChange();
					UiSetObjMotifyMode('#rbU,#rbSave,#rbO', 'W', '');
					//1101126 David 1101275 核決時間擴充時間欄位
					//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'R', '');
					UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'R', '');
				}
			}
		}
		else
		{
			fnSetClassHide("AreaApplyInfo,AreaTranRemark,AreaMCase", true);
		}

		//欄位初始化
		InitODC011Display();

		//1110627 David 1110416 判斷是否有先簽後稿時要disabled核決者欄位
		if(gObj.uSignType == "P" && theSSO.User.SystemSets.PFLOW_TO_USER != "Y"&& $('#txCancelAppEnable').val() == "Y" && theSSO.User.EnvSettings.get("WE_SIGN_DOCNAME_LIST") != "")
		{
			let ModelObj = theAOL.getCurrFolio();
			let iDraftCount = ModelObj.getDraftCounts();
			let bGetDmSuccess = false;
			let strPlan = "";
			//1110805 David 1110416 簽跟非簽的文稿數量
			let nSignCount = 0;
			let nIssueCount =0;
			if(iDraftCount != 0)//有文稿再處理
			{
				let arrWeSignDocNameList = theSSO.User.EnvSettings.get("WE_SIGN_DOCNAME_LIST").split(';');
				function doNext(iDraft)
				{
					if(iDraft < iDraftCount)
					{
						ModelObj.accquireDraftModel(iDraft)
						.done(function(dm){

							if(!dm)
							{
								doNext(iDraft + 1);
								return;
							}
							else
								bGetDmSuccess = true;
							
							let strDraftDocType = dm.getDocType();
							if(arrWeSignDocNameList.includes(strDraftDocType))
							{
								//1110805 David 1110416 調整判斷邏輯
								/*strPlan = GetDraftInfo(dm, "//公文擬辦方式");
								if(strPlan == "先簽後稿")
									SetApplyDisabled();
								return;*/
								nSignCount++;
								if(strPlan == "")
									strPlan = GetDraftInfo(dm, "//公文擬辦方式")
							}
							else
							{
								//1110805 David 1110416 紀錄非簽的稿件數量
								nIssueCount++;
							}

							doNext(iDraft + 1);//處理下一筆文稿
							return;
						})
					}
					else
					{
						//1110805 David 1110416 有簽，擬辦方式為先簽後稿，無非簽的文別，不可設定核決者
						if(strPlan == "先簽後稿" && nSignCount > 0 && nIssueCount <= 0)
							SetApplyDisabled();
					}
				}
				doNext(0);
				
				function SetApplyDisabled()
				{
					UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'R', '');
				}
			}
		}

		gObj.gODC011Load = true;
	}
	catch(e)
	{
		alert(e.Message+", e.id:"+e.id);
	}
}

function setEvent()
{
	//註冊發文設定Radio事件
	$('#rbSave, #rbO, #rbU').on('change', function(event)
	{
		fnCloseTypeClick();
	});

	//註冊歸檔類型Radio事件
	$('#rbOrgStore, #rbUnitStore').on('change', function(event)
	{
		fnStoreSelect(event);
	});

	//數字欄位
	SetNumOnly("txShowApprovedDate");
	SetNumOnly("txShowApprovedTime");//1101126 David 1101275 核決時間擴充時間欄位
}

function InitODC011Display()
{
	//案件相關欄位
	InitODC011CaseInfo();
	
	//1140908 David 序210(退輔會序152) 庫房可否異動預設處理時機調整，避免經判定不可異動後，又設定回預設值
	fnEnableColumn();

	//歸檔類型
	var strRcvDefStoreType = theSSO.User.EnvSettings.get("RCV_DEFAULT_STORETYPE");
	//1081104 David 1080963 來文預設庫房設定擴充總收文強制歸機關庫房，調整判斷
	//if($('#cbNewByOu')[0].checked == "N" && strRcvDefStoreType == "1")//來文一律歸機關庫房
	if($('#cbNewByOu')[0].checked == false && (strRcvDefStoreType == "1" || (strRcvDefStoreType == "4" && theAOL.docObj.ODWMSG.IS_OURCV == "0")))//來文一律歸機關庫房，或總收文一律歸機關庫房
	{
		$('#rbOrgStore').prop("checked", true).checkboxradio("refresh");
		$('#rbUnitStore').prop("checked", false).checkboxradio("refresh");
		UiSetObjMotifyMode('#rbOrgStore,#rbUnitStore', 'R', '');
		//1130624 David 序792 修正有設定強制庫房時，對應紀錄欄位需更新
		$('#txStoreType').val("1");
	}
	else//創稿或來文其他設定
	{
		if($('#txStoreType').val() == "1" || $('#txStoreType').val() == "")
		{
			$('#rbOrgStore').prop("checked", true).checkboxradio("refresh");
			$('#rbUnitStore').prop("checked", false).checkboxradio("refresh");
		}
		else
		{
			$('#rbOrgStore').prop("checked", false).checkboxradio("refresh");
			$('#rbUnitStore').prop("checked", true).checkboxradio("refresh");
		}

		//設定可否異動
		//1140908 David 序210(退輔會序152) 調整判斷OD_ENABLE_UNITFILE邏輯，避免預設值設定不可異動後，經此判斷又可異動
		/*if(theSSO.User.EnvSettings.get("OD_ENABLE_UNITFILE").toUpperCase()=="Y")
		{
			UiSetObjMotifyMode('#rbOrgStore,#rbUnitStore', 'W', '');
		}
		else
		{
			$('#rbOrgStore').prop("checked", true).checkboxradio("refresh");
			$('#rbUnitStore').prop("checked", false).checkboxradio("refresh");
			UiSetObjMotifyMode('#rbOrgStore,#rbUnitStore', 'R', '');
			//1130624 David 序792 修正有設定強制庫房時，對應紀錄欄位需更新
			$('#txStoreType').val("1");
		}*/
		if(theSSO.User.EnvSettings.get("OD_ENABLE_UNITFILE").toUpperCase()=="N")
		{
			$('#rbOrgStore').prop("checked", true).checkboxradio("refresh");
			$('#rbUnitStore').prop("checked", false).checkboxradio("refresh");
			UiSetObjMotifyMode('#rbOrgStore,#rbUnitStore', 'R', '');
			//1130624 David 序792 修正有設定強制庫房時，對應紀錄欄位需更新
			$('#txStoreType').val("1");
		}
	}

	//1080110 David 1071073 承辦單位符合系統參數ONLY_USE_UNITFILE設定時，強制歸單位庫房
	var strOnlyUseUnitFile = theSSO.User.SystemSets.get("ONLY_USE_UNITFILE");
	var CheckOnlyUnitFileInChargeOu = _rsltODWMSG['INCHARGE_OU'];
	if (strOnlyUseUnitFile != "" && CheckOnlyUnitFileInChargeOu != "" && strOnlyUseUnitFile.indexOf(CheckOnlyUnitFileInChargeOu.substr(0,2)) != -1)
	{
		$('#rbOrgStore').prop("checked", false).checkboxradio("refresh");
		$('#rbUnitStore').prop("checked", true).checkboxradio("refresh");
		UiSetObjMotifyMode('#rbOrgStore,#rbUnitStore', 'R', '');
		//1130624 David 序792 修正有設定強制庫房時，對應紀錄欄位需更新
		$('#txStoreType').val("2");
	}

	//設定原因註記選項
	fnODC011SetOptionsForRemark();
	$('#txReason').val(_rsltODWMSG['TX_REASON']);

	//辦畢方式
	if($('#txCloseType').val() == "1")
		$('#rbO').prop("checked", true).checkboxradio("refresh");
	else if($('#txCloseType').val() == "2")
		$('#rbU').prop("checked", true).checkboxradio("refresh");
	else if($('#txCloseType').val() == "3")
		$('#rbSave').prop("checked", true).checkboxradio("refresh");
	//紀錄目前的擬辦方式
	gSignSetObj.gCloseType = $('#txCloseType').val();

	//DVD 1代沒在用?
	//送電子郵件 
	//if(pIsNotify == "Y")
	//	document.all.cbxIsNotify.checked = true;

	fnCloseTypeClick();

	//2004-03-11 新增 "待繕印","待校對","待發文"
	//2004-05-10 新增加 待核示 時 Enable 擬辦設定區
	//1141002 David 序265 移除紙本強制判斷資料夾可異動發文設定判斷，回歸ODRPUI設定
	/*if(gObj.uSignType == "P" && gObj.uSubFolder != "主辦待送文" && gObj.uSubFolder != "待繕印" && gObj.uSubFolder != "待校對" 
	&& gObj.uSubFolder != "待發文" && gObj.uSubFolder != "待核示" )
	{
		//disable 承辦人擬辦設定區
		//document.all.cbFinish.disabled = true;
		UiSetObjMotifyMode('#cbContinue,#rbU,#rbO,#rbSave', 'R', '');
	}
	else  //SUBFOLDER=主辦待送文 -> 可以「退回承辦人」
	{
		//document.all.cbFinish.disabled = false;
		//document.all.cbFinish.disabled = true;
	}*/

	//辦畢相關欄位設定
	//1101108 David 1101249 移除依照CLOSE_F欄位限制調整發文方式邏輯
	//cbFinishClick();

	//1101228 David 1101249 修正移除依CLOSE_F邏輯後，未限制單位發文選項問題
	if(gSignSetObj.gUnitIssue =="Y")
		UiSetObjMotifyMode('#rbU', 'W', '');
	else
		UiSetObjMotifyMode('#rbU', 'R', '');

	//增加依據ODPRUI.xml檔案判斷各欄位預設值
	//1140908 David 序210(退輔會序152) 庫房可否異動預設處理時機調整，避免經判定不可異動後，又設定回預設值
	//fnEnableColumn();

	//0970731 Stella 判斷公文結案否決定發文設定選項可否修改
	if($("#txCloseDate").val() != "" && ($('#txCloseType').val() == "1" || $('#txCloseType').val() == "2"))
	{
		var strNote = "公文已結案發文，無法修改發文設定。";
		UiSetObjMotifyMode('#rbO,#rbU,#rbSave', 'R', strNote);
	}

	if(gObj.uSignType == "P")
	{
		//判斷OD_OD99_CAN_APP，避免設定選項設定成唯讀
		var ArrOD99CanApp = theSSO.User.EnvSettings.get("OD_OD99_CAN_APP").split("|");
		if (ArrOD99CanApp[0].toUpperCase() == 'Y')
		{
			//document.all.txResentDueDate.disabled  = false;
			//document.all.txResentWarnDate.disabled = false;
			//document.all.cbFinish.disabled = false;
			//1101126 David 1101275 核決時間擴充時間欄位
			//UiSetObjMotifyMode('#rbU,#rbO,#rbSave,#cbContinue,#ddlApply,#ddlAppType,#txShowApprovedDate', 'W', '');
			UiSetObjMotifyMode('#rbU,#rbO,#rbSave,#cbContinue,#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'W', '');
		}

		var bChecked = parent.parent.document.all.cbNewByOu.checked;
		if (ArrOD99CanApp[0].toUpperCase() == "Y" && $("#txComNo").val() != "" && $("#txComNo").val() != $("#txDocNo").val() && !$("#cbNewByOu")[0].checked
			&& ArrOD99CanApp[2] == gObj.uFolder + gObj.uSubFolder)
		{
			$('#cbContinue').prop("checked", true).checkboxradio("refresh");
		}

		//附件註記
		if(jf_Trim($('#txTranMark').val()) == "")
			$('#cbAttach').prop("checked", false).checkboxradio("refresh");
		else
			$('#cbAttach').prop("checked", true).checkboxradio("refresh");

		if(theSSO.User.EnvSettings.get("MP_ATTACH_REMARK") == "")
		{
			fnSetClassHide("AreaTranRemark", true);
		}
		else
		{
			fnSetClassHide("AreaTranRemark", false);
			$('#lbAttach').text(theSSO.User.EnvSettings.get("MP_ATTACH_REMARK"));
		}

		//取消核決控制
		if($('#txCancelAppEnable').val() == "Y")
		{
			//document.all.btClearApp.disabled = false;
			//1101126 David 1101275 核決時間擴充時間欄位
			//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'W', '');
			UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'W', '');
		}
		else
		{
			//document.all.btClearApp.disabled = true;
			//1101126 David 1101275 核決時間擴充時間欄位
			//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'R', '');
			UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'R', '');
		}

		//取得NewTime紀錄的日期
		if($("#hNewTime").val() != "")
		{
			//1101126 David 1101275 配合紀錄至時間，調整資料檢邏輯
			//gSignSetObj.gNewTime = $("#hNewTime").val().substr(0,7);
			gSignSetObj.gNewTime = $("#hNewTime").val().substr(0,11);
		}

		//如有核決日期則顯示該日期，反之顯示為今天日期
		if($('#txApprovedDate').val() != "")
		{
			var strApprovedDate = $('#txApprovedDate').val();
			//1101126 David 1101275 紀錄核決時間
			var strApprovedTime = "";
			if(strApprovedDate.length >= 11)
				strApprovedTime = strApprovedDate.substr(7,4);
			else
			{
				let Today = new Date();
				let NowHour = Today.getHours() + '';
				let NowMin = Today.getMinutes() + '';

				strApprovedTime = jf_PADL(NowHour,2,"0") + jf_PADL(NowMin,2,"0");
			}

			if(strApprovedDate.length >= 7)
				strApprovedDate = strApprovedDate.substr(0,7);
			
			//1101126 David 1101275 配合紀錄至時間，調整資料檢邏輯
			//gSignSetObj.gSourceApprovedDate = strApprovedDate;
			$('#txShowApprovedDate').val(strApprovedDate);
			//1101126 David 1101275 紀錄核決時間
			$('#txShowApprovedTime').val(strApprovedTime);
			gSignSetObj.gSourceApprovedDate = strApprovedDate + strApprovedTime;
		}
		else
		{
			var Today = new Date();
			var NowYear = (Today.getFullYear() - 1911) + '';
			var NowMonth = (Today.getMonth()+1) + '';
			var NowDate = (Today.getDate()) + '';
			$('#txShowApprovedDate').val(NowYear + jf_PADL(NowMonth,2,"0") + jf_PADL(NowDate,2,"0"));

			//1101126 David 1101275 紀錄核決時間
			let NowHour = Today.getHours() + '';
			let NowMin = Today.getMinutes() + '';
			$('#txShowApprovedTime').val(jf_PADL(NowHour,2,"0") + jf_PADL(NowMin,2,"0"));
		}

		//有簽且擬辦方式為先簽後稿，在沒有非簽的文稿時，要鎖定核決者
		var sWE_SIGN_DOCNAME_LIST = theSSO.User.EnvSettings.get("WE_SIGN_DOCNAME_LIST");
		if (sWE_SIGN_DOCNAME_LIST!="")
		{
			var strPlan = "";
			var nSignCount = 0;
			var nIssueCount = 0;
			var ModelObj = theAOL.getCurrFolio();
			for(var iDraft = 0 ; iDraft < ModelObj.getDraftCounts() ; iDraft++)
			{
				ModelObj.accquireDraftModel(iDraft)
				.done(function(dm){

					//文別名稱
					var rootWebTagName = dm.getDocType();
					if(sWE_SIGN_DOCNAME_LIST.indexOf(rootWebTagName+";") != -1)
					{
						nSignCount++;
						if(strPlan =="")
							strPlan = GetDraftInfo(dm, "//"+rootWebTagName+"/公文擬辦方式");
					}
					else
						nIssueCount++;
				})
			}

			if (strPlan == "先簽後稿" && nSignCount >0 && nIssueCount <=0)
			{
				//1101126 David 1101275 核決時間擴充時間欄位
				//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'R', '');
				UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedTime', 'R', '');
			}
		}

		//如不可異動核決者，核決時間也不可異動
		document.all.txShowApprovedDate.disabled = document.all.ddlApply.disabled;
		//1101126 David 1101275 核決時間擴充時間欄位
		document.all.txShowApprovedTime.disabled = document.all.ddlApply.disabled;
	}

	if($('#txCaseCon').val() == "Y")
		$('#cbContinue').prop("checked", true).checkboxradio("refresh");

	//1111123 David 1110881 新增銓敘部客製化續辦處理
	if(SSO_CONFIG.OrgNickName == "MOCS")
	{
		if($('#txFurtherState').val() != "0" && $('#txFurtherState').val() != "")
		{
			$('#cbFurtherState').prop("checked", true).checkboxradio("refresh");
			if($('#txFurtherState').val() == "2")
				UiSetObjMotifyMode('#cbFurtherState', 'R', '');
		}
	}
}

function InitODC011CaseInfo()
{
	UiSetObjMotifyMode("#txM_CaseNo,#txM_ComCaseNo,#txRcvTask,#txIssueTask", "R", "");

	$("#txRcvTask").val(_rsltODWDCM["RCV_TASK"]);
	$("#txIssueTask").val(_rsltODWDCM["ISSUE_TASK"]);
	$("#txM_CaseNo").val($("#txCaseNo").val());
	$("#txM_ComCaseNo").val(_rsltODWDCM["M_COM_CASE_NO"]);
}

//1101108 David 1101249 已無使用，移除
/*function cbFinishClick()
{
	if($('#txCloseF').val() == "Y")
	{
		UiSetObjMotifyMode('#cbContinue,#rbO,#rbSave', 'W', '');

		if(gSignSetObj.gUnitIssue =="Y")
			UiSetObjMotifyMode('#rbU', 'W', '');
		else
			UiSetObjMotifyMode('#rbU', 'R', '');
	}
	else
	{
		UiSetObjMotifyMode('#cbContinue,#rbO,#rbU,#rbSave', 'R', '');
	}
}*/

//將控制畫面上各欄位是否Enable處理統一於此函式處理
function fnEnableColumn()
{
	var strMode = gObj.gPDocWebPageMode;
	if(strMode.length != 3 || strMode == "")
		return;
	
	//第一區：辦理設定、發文設定、附件註記與歸檔類型欄位
	switch(strMode.substr(0,1))
	{
		case "L":
			//1101126 David 1101275 核決時間擴充時間欄位
			//UiSetObjMotifyMode('#ddlAppType,#ddlApply,#txShowApprovedDate', 'R', '');
			UiSetObjMotifyMode('#ddlAppType,#ddlApply,#txShowApprovedDate,#txShowApprovedTime', 'R', '');
			break;
		case "A":
			//1101126 David 1101275 核決時間擴充時間欄位
			//UiSetObjMotifyMode('#ddlAppType,#ddlApply,#txShowApprovedDate', 'W', '');
			UiSetObjMotifyMode('#ddlAppType,#ddlApply,#txShowApprovedDate,#txShowApprovedTime', 'W', '');
			break;
	}
	
	//第二區：辦理設定、發文設定、附件註記與歸檔類型欄位
	switch(strMode.substr(1,1))
	{
		case "L":
			//document.all.cbFinish.disabled		= true;
			//document.all.cbxIsNotify.disabled	= true;
			UiSetObjMotifyMode('#cbContinue,#rbO,#rbU,#rbSave,#cbAttach,#rbOrgStore,#rbUnitStore', 'R', '');
			break;
		case "A":
			//document.all.cbFinish.disabled		= false;
			//document.all.cbxIsNotify.disabled	= false;
			UiSetObjMotifyMode('#cbContinue,#rbO,#rbU,#rbSave,#cbAttach,#rbOrgStore,#rbUnitStore', 'W', '');
			break;
	}
	
	//第三區：發文性質、補件到期日與補件警示日
	/*switch(strMode.substr(2,1))
	{
		case "L":
			//0990922	[0990118]	Davy	刪除收文/發文性質欄位
			//document.all.ddlIssueProperty.disabled	= true;
			document.all.txResentDueDate.disabled	= true;
			document.all.txResentWarnDate.disabled	= true;
			document.all.txResentDueDate.style.backgroundColor = "LightGrey";
			document.all.txResentWarnDate.style.backgroundColor = "LightGrey";
			break;
		case "A":
			//0990922	[0990118]	Davy	刪除收文/發文性質欄位
			//document.all.ddlIssueProperty.disabled	= false;
			document.all.txResentDueDate.disabled	= false;
			document.all.txResentWarnDate.disabled	= false;
			document.all.txResentDueDate.style.backgroundColor = "FFFFFF";
			document.all.txResentWarnDate.style.backgroundColor = "FFFFFF";
			break;
	}*/
}

function  fnCloseTypeClick()
{
	//DVD 1代沒在用?
	/*if(document.all.rbSave.checked)
	{
		document.all.cbxIsNotify.disabled = false;
		if(cbxIsNotifyChecked != "")
			document.all.cbxIsNotify.checked = cbxIsNotifyChecked;	
	}
	else
	{
		document.all.cbxIsNotify.disabled = true;
		cbxIsNotifyChecked = document.all.cbxIsNotify.checked ;
		document.all.cbxIsNotify.checked  = false;
	}*/
	
	//公文已存查結案則當修改發文設定時跳出警示訊息
	if($("#txCloseDate").val() != "" && $("#txCloseType").val() == "3")
	{
		var bConfirm = false;
		if($('#rbO')[0].checked || $('#rbU')[0].checked)
			bConfirm = window.confirm("此份公文目前已結案，是否確認要修改發文設定？\n點選確定並儲存後，系統將會清空公文現有結案資訊，請確認是否要修改？");
		if(bConfirm)
		{
			$("#txCloseDate").val("");
			$("#txDocState").val("01");
			$("#txStatus").val(fnShowDocStateDesc("01"));
			//1060821 David 1060783 線上簽核不需呼叫fnResetDlTxNameForAppAndComNo()
			if(gObj.uSignType == "P")
				fnResetDlTxNameForAppAndComNo("");
			/*parent.parent.SetDlItemByValue(parent.parent.document.all.dlDocState,"01");
			parent.parent.ClearDL(parent.parent.parent.document.all.dlTxNameEx);
			parent.parent.parent.fnSetDllTxNameEx(false);	
			parent.parent.fnProcDlTxNameForApp(document.all.txAppUserId.value,"01");*/
		}
		else
			$('#rbSave').prop("checked", true).checkboxradio("refresh");
	}
	//核決公文如異動擬辦方式為存查時，需跳出提示訊息
	if(gSignSetObj.gCloseType != "3" && $('#rbSave')[0].checked && $('#txAppUserName').val() != "")
	{
		var CloseTypeName = "總發文";
		if(gSignSetObj.gCloseType == "2")
			CloseTypeName = "單位發文";
			
		var bConfirm = false;
		//1101025 David 1100322 配合調整「存查」顯示名稱，調整訊息內容
		//bConfirm = window.confirm("擬辦方式由「"+CloseTypeName+"」改為「存查」後系統將無法進行發文流程，是否確定更改？");
		bConfirm = window.confirm("擬辦方式由「"+CloseTypeName+"」改為「" + gSignSetObj.grbSaveShow + "」後系統將無法進行發文流程，是否確定更改？");
		if(!bConfirm)
		{
			if(gSignSetObj.gCloseType == "1")
				$('#rbO').prop("checked", true).checkboxradio("refresh");
			else if(gSignSetObj.gCloseType == "2")
				$('#rbU').prop("checked", true).checkboxradio("refresh");
		}
	}

	//1011107 David 異動後記錄目前擬辦方式
	if($('#rbO')[0].checked)
		gSignSetObj.gCloseType = "1";
	else if($('#rbU')[0].checked)
		gSignSetObj.gCloseType = "2";
	else
		gSignSetObj.gCloseType = "3";
}

function fnStoreSelect(event)
{
	if(event.target.id == "rbOrgStore")
	{
		$('#txStoreType').val("1");
		//$('#rbOrgStore').prop("checked", true).checkboxradio("refresh");
		//$('#rbUnitStore').prop("checked", false).checkboxradio("refresh");
	}
	else
	{
		$('#txStoreType').val("2");
		//$('#rbUnitStore').prop("checked", true).checkboxradio("refresh");
	}
}

function dlCancelChange()
{
	if($("#dlRemark option:selected").text() != "")
	{
		$("#txReason").val($("#dlRemark option:selected").text());
		/*document.all.txToOuId.value = "";
		document.all.txToOuName.value = "";*/
	}
	/*else if(document.all.txToOuId.value =="" && document.all.txToOuName.value =="")
	{
		$("#ODC011_txReason").val($("#dlRemark option:selected").text());
	}*/
	else
	{
		$("#txReason").val("");
	}
}

function fnODC011SetOptionsForRemark()
{
	try
	{
		var paramsGetCodeTypeDesc = {
			"argSessionID": localStorage.Artifact,
			"argTxName": theAOL.nextTarget.TxName
		};

		var dfdGetCodeTypeDesc = $.Deferred();
		g_QueryDeferred = dfdGetCodeTypeDesc;
		WsGetCodeTypeDesc(paramsGetCodeTypeDesc, dfdGetCodeTypeDesc)
		.then(function (rtn)
		{
			$('#dlRemark').empty();
			$('#dlRemark').append(new Option(" ", " "));

			if(rtn.RtnCodeTypeDesc.CodeMain.CodeMainData)
			{
				var resultDesc = rtn.RtnCodeTypeDesc.CodeMain.CodeMainData;
				for(var i=0; i<resultDesc.length; i++)
				{
					// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
					// $('#dlRemark').append(new Option(resultDesc[i].CodeDesc, resultDesc[i].CodeDesc));
					$('#dlRemark').append(new Option(htmlencode(resultDesc[i].CodeDesc), htmlencode(resultDesc[i].CodeDesc)));
				}
			}
			$('#dlRemark').selectmenu('refresh');
		})
		.fail(function (rtn) 
		{
			var errMsg = "取得原因註記失敗";
			if(rtn.m_strErrMsg)
				errMsg += ":" + rtn.m_strErrMsg;
			alert(errMsg);
			return;
		});
	}
	catch(e)
	{
		var errMsg = "取得原因註記選項失敗:"+e.message;
		alert(errMsg);
	}
}

function fnAppTypeChange()
{
	//處理剔退者
	var strAppType = jf_Trim($("#ddlAppType option:selected").text());
	if(strAppType == "剔退者")
		UiSetDlItemByText("ddlApply", $("#txRejectUserName").val());
	else
	{
		//1080102 David 1071058 新增傳入核決者名稱
		//fnSetApplyDDLValue("ddlApply", $("#txAppUserId").val(), $("#txAppRoleId").val());
		fnSetApplyDDLValue("ddlApply", $("#txAppUserId").val(), $("#txAppRoleId").val(), $('#txAppUserName').val());
	}

	fnApplyDDLChange();
}

function fnApplyDDLChange()
{
	//處理剔退者
	var strAppType = jf_Trim($("#ddlAppType option:selected").text());
	var appName = jf_Trim($("#ddlApply option:selected").text());
	var appMakeup = jf_Trim($("#ddlApply option:selected").val());

	var appAcc 	= GetSplitStr(appMakeup,"|",0);
	var appRole	= GetSplitStr(appMakeup,"|",1);

	if(gSignSetObj.gOdApproveType.toUpperCase()=="ALL")
		appName = GetSplitStr(appName,"--",1);

	if(strAppType=="剔退者")
	{
		$("#txRejectUserName").val(appName);
		$("#txAppUserName, #txAppUserId, #txAppRoleId").val("");
		fnResetDlTxNameForAppAndComNo("");
	}
	else
	{
		$("#txRejectUserName").val("");
		$("#txAppUserName").val(appName);
		$("#txAppUserId").val(appAcc);
		$("#txAppRoleId").val(appRole);
		fnResetDlTxNameForAppAndComNo("");
	}
}

function BuildApplyUser()
{
	$('#ddlAppType').empty();
	$('#ddlAppType').append(new Option("核決者", "核決者"));

	if(theSSO.User.EnvSettings.get("MP_ENABLE_REJECTUSER").toUpperCase()=="Y")
		$('#ddlAppType').append(new Option("剔退者", "剔退者"));

	$('#ddlAppType').selectmenu('refresh');

	
	$('#ddlApply').empty();
	$('#ddlApply').append(new Option(" ", " "));
	
	gSignSetObj.gOdApproveType = theSSO.User.EnvSettings.get("OD_APPROVE_TYPE").toUpperCase();
	
	//承辦人自行決行判斷處理
	var ArrOD99CanApp = gObj.gOD99CanAPP.split("|");
	var strDocNo = $("#txDocNo").val();
	var strComNo = $("#txComNo").val(); 
	var bChecked = $("#cbNewByOu")[0].checked;
	if (ArrOD99CanApp[0].toUpperCase() == "Y" && strComNo != "" && strComNo != strDocNo && !bChecked 
		&& ArrOD99CanApp[2] == gObj.uFolder + gObj.uSubFolder)
	{
		if(gSignSetObj.gOdApproveType == "ROLE")
			$('#ddlApply').append(new Option("承辦人", "|OD99"));
		else
		{
			//1080102 David 1071058 紀錄完整核決資料至value
			//$('#ddlApply').append(new Option(theSSO.User.name, theSSO.User.account + "|OD99"));
			$('#ddlApply').append(new Option(theSSO.User.name, theSSO.User.account + "|OD99" + "|" + theSSO.User.name + "|承辦人"));
		}
	}
	else
	{
		var strOrgValue = gObj.uOrgNo;
		var nApplyRoleList = "OD01|OD02|OD03|OD06|OD11|OD12|OD13|OD21";
		//0960426 Stella 修改核決者角色改為讀取環境變數MP_CAN_APPROVE_ROLE之設定值
		if(theSSO.User.EnvSettings.get("MP_CAN_APPROVE_ROLE") != null && 
			theSSO.User.EnvSettings.get("MP_CAN_APPROVE_ROLE") != "")
			nApplyRoleList = theSSO.User.EnvSettings.get("MP_CAN_APPROVE_ROLE");

		GetApplyUserListOfUnit(nApplyRoleList,_rsltODWMSG['INCHARGE_OU']);

		if(gSignSetObj.gOdApproveType =="ROLE")
		{
			var arrRole = [];
			for(var i = 0 ; i < gSignSetObj.arrApplyList.length ; i++)
			{
				//格式=帳號|姓名|角色代碼|角色名稱
				var appMakeup	= gSignSetObj.arrApplyList[i];
				var appRole	= GetSplitStr(appMakeup,"|",2);
				var appRoleName	= GetSplitStr(appMakeup,"|",3);
				arrRole.push(appRole + "|" + appRoleName);
			}
			arrRole.sort();
			for(var i=0; i<arrRole.length; i++)
			{
				var appRole	= GetSplitStr(arrRole[i], "|", 0);
				var appRoleName	= GetSplitStr(arrRole[i], "|", 1);
				if(appRoleName == "")
					appRoleName = GetRoleName(appRole);
				//1080102 David 1071058 紀錄完整核決資料至value
				//$('#ddlApply').append(new Option(appRoleName, "|" + arrRole[i]));
				$('#ddlApply').append(new Option(appRoleName, "|" + appRole + "||" + appRoleName));
			}
		}
		else if(gSignSetObj.gOdApproveType=="ALL")//1020220 David 將[核決者可依參數設定顯示為角色-帳號]功能Merge--start--
		{	
			for(var i = 0 ; i < gSignSetObj.arrApplyList.length ; i++)
			{
				//格式=帳號|姓名|角色代碼|角色名稱(appMakeup)
				var appMakeup	= gSignSetObj.arrApplyList[i];
				var appAcc	= GetSplitStr(appMakeup,"|",0);
				var appName	= GetSplitStr(appMakeup,"|",1);
				var appRole	= GetSplitStr(appMakeup,"|",2);
				var appRoleName	= GetSplitStr(appMakeup,"|",3);
				if(appRoleName == "")
					appRoleName = GetRoleName(appRole);
				//1080102 David 1071058 紀錄完整核決資料至value
				//$('#ddlApply').append(new Option(appRoleName+"--"+appName, appAcc+"|"+appRole));
				$('#ddlApply').append(new Option(appRoleName+"--"+appName, appAcc+"|"+appRole+"|"+appName+"|"+appRoleName));
			}
		}//--end--
		else
		{
			for(var i = 0 ; i < gSignSetObj.arrApplyList.length ; i++)
			{
				//格式=帳號|姓名|角色
				var appMakeup	= gSignSetObj.arrApplyList[i];
				var appAcc	= GetSplitStr(appMakeup,"|",0);
				var appName	= GetSplitStr(appMakeup,"|",1);
				var appRole	= GetSplitStr(appMakeup,"|",2);
				//1080102 David 1071058 紀錄完整核決資料至value
				//$('#ddlApply').append(new Option(appName, appAcc+"|"+appRole));
				$('#ddlApply').append(new Option(appName, appAcc+"|"+appRole+"|"+appName+"|"+appRoleName));
			}
		}
	}
	$('#ddlApply').selectmenu('refresh');
}

function GetApplyUserListOfUnit(argAppRoles, argUnitNo)
{
	//1120925 David 1111200 如Cache有資料，不需重複取得
	let sApplyCache = "Apply_" + gObj.uOrgNo + "_" + argUnitNo;
	let sApplyListCache = "ApplyList_" + gObj.uOrgNo + "_" + argUnitNo;
	if (typeof window.localStorage[sApplyCache] === 'string' && window.localStorage[sApplyCache].length)
	{
		gSignSetObj.arrApply = window.localStorage[sApplyCache].split(',');
		gSignSetObj.arrApplyList = window.localStorage[sApplyListCache].split(',');
		return;
	}

	//取環境變數[OD_UPORG_APP_LIST]
	//ex: moea01|部長|OD04|部長|;moea02|次長|OD05|次長;moea03|秘書|OD07|秘書
	var UpOrgAppList = theSSO.User.EnvSettings.get("OD_UPORG_APP_LIST");
	if(UpOrgAppList != "")
	{
		var arrUpOrgAppList = UpOrgAppList.split(';');
		for(var iUp = 0 ; iUp < arrUpOrgAppList.length ; iUp++)
		{
			var arrUpOrgAppInfo = arrUpOrgAppList[iUp].split('|');
			
			gSignSetObj.arrApply.push(arrUpOrgAppInfo[0]);
			gSignSetObj.arrApplyList.push(arrUpOrgAppList[iUp]);
		}
	}

	//取環境變數[OD_SUPERIOR_UNIT_RANK], 格式: 
	var strSuperiorUnitList = theSSO.User.EnvSettings.get("OD_SUPERIOR_UNIT_RANK");

	//1120925 David 1111200 取得核決者代理人資訊
	if(theSSO.User.SystemSets.get("II_UPDATE_ORGINFO_GEN_PROXY") == "Y" && gSignSetObj.gOdApproveType != "ROLE")
	{
		let params = new SOAPClientParameters();
		params.add('argArtifact', localStorage.Artifact);
		params.add('argOrgNo',  gObj.uOrgNo);
		params.add('argAppRoleList', argAppRoles);
		params.add('argSuperiorUnitList', strSuperiorUnitList);
		params.add('argOuId', argUnitNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('odlibws'), 'GetApplyProxyList', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (r.m_bSuccess)
			{
				gSignSetObj.arrAppOuRole = r.arrAppOuRole;
				gSignSetObj.arrProxyUser = r.arrProxyUser;
			}
			else
				console.log("取得核決者代理人資訊異常:" + r.m_strErrMsg);
		});
	}

	//1090903 David 1090660 依系統參數ODC010_APPLIST_BY_LVL判斷是否需依流程過濾選單
	var strODC010AppListByLvl = theSSO.User.SystemSets.get("ODC010_APPLIST_BY_LVL");
	var bSetAppListByLvl = false;
	if(strODC010AppListByLvl == "Y")
	{
		var strOwnOuId = _rsltODWMSG['OWN_OU_ID'];
		var SuperiorUnit = strSuperiorUnitList;
		if(SuperiorUnit == "")
			SuperiorUnit = "99;98;97;96;95";

		var arrAppRoles = argAppRoles.split('|');
		if(SuperiorUnit.indexOf(strOwnOuId) != -1)
		{
			//目前流程為一層決行
			//取得OD0開頭的角色代碼
			var strSuperiorAppRole = "";
			var AppRoleStep = "";
			for(var iRole = 0 ; iRole < arrAppRoles.length ; iRole++)
			{
				if(arrAppRoles[iRole].indexOf("OD0") != -1)
				{
					strSuperiorAppRole += AppRoleStep + arrAppRoles[iRole];
					AppRoleStep = "|";
				}
			}
			var arrSuperiorUnit = SuperiorUnit.split(';');
			for(var iSUnit = 0 ; iSUnit < arrSuperiorUnit.length ; iSUnit++)
			{
				GetApplyFromUnit(strSuperiorAppRole, arrSuperiorUnit[iSUnit]);
			}
			bSetAppListByLvl = true;
		}
		else if(strOwnOuId.substr(0,2) == argUnitNo.substr(0,2))
		{
			if(strOwnOuId.length == 3 && strOwnOuId == argUnitNo)
			{
				//流程位於二級承辦單位
				//取得OD2開頭的角色代碼
				var strSubUnitAppRole = "";
				var AppRoleStep = "";
				for(var iRole = 0 ; iRole < arrAppRoles.length ; iRole++)
				{
					if(arrAppRoles[iRole].indexOf("OD2") != -1)
					{
						strSubUnitAppRole += AppRoleStep + arrAppRoles[iRole];
						AppRoleStep = "|";
					}
				}
				GetApplyFromUnit(strSubUnitAppRole, strOwnOuId);
				bSetAppListByLvl = true;
			}
			else if(strOwnOuId.length == 2)
			{
				//流程位於一級承辦單位
				//取得OD1、OD2開頭的角色代碼
				var strUnitAppRole = "";
				var AppRoleStep = "";
				for(var iRole = 0 ; iRole < arrAppRoles.length ; iRole++)
				{
					if(arrAppRoles[iRole].indexOf("OD2") != -1 || arrAppRoles[iRole].indexOf("OD1") != -1)
					{
						strUnitAppRole += AppRoleStep + arrAppRoles[iRole];
						AppRoleStep = "|";
					}
				}
				GetApplyFromUnit(strUnitAppRole, strOwnOuId);
				bSetAppListByLvl = true;
			}
		}
	}

	if(!bSetAppListByLvl)
	{
		if(strSuperiorUnitList == "")
		{
			// 環境變數[OD_SUPERIOR_UNIT_RANK]沒有設定值, 取固定的決行單位95~99
			GetApplyFromUnit(argAppRoles, "99");
			GetApplyFromUnit(argAppRoles, "98");
			GetApplyFromUnit(argAppRoles, "97");
			GetApplyFromUnit(argAppRoles, "96");
			GetApplyFromUnit(argAppRoles, "95");
		}
		else
		{
			var arrSuperiorUnit = strSuperiorUnitList.split('|');
			for(var iSUnit = 0 ; iSUnit < arrSuperiorUnit.length ; iSUnit++)
			{
				GetApplyFromUnit(argAppRoles, arrSuperiorUnit[iSUnit]);
			}
		}
		GetApplyFromUnit(argAppRoles, argUnitNo.substr(0,2));
	}

	//1120925 David 1111200 取得核決者資料完成後，紀錄至Cache
	window.localStorage[sApplyCache] = gSignSetObj.arrApply.join(',');
	window.localStorage[sApplyListCache] = gSignSetObj.arrApplyList.join(',');
}

function GetApplyFromUnit(argAppRoles, argUnitNo)
{
	if(argUnitNo == "")
		return;

	var OrgInfoObj = SSOUtil.getOrgNode(gObj.uOrgNo);
	var $orgNode = $(OrgInfoObj);
	
	//取得單位Node
	var xpath = 'Unit[UnitCode="' + argUnitNo + '"]';
	var unitNode = ($orgNode.find(xpath))[0];
	if(!unitNode)
		return;

	//取得角色Node
	var arrRoleList = argAppRoles.split('|');
	for(var iRoles = 0 ; iRoles < arrRoleList.length ; iRoles++)
	{
		var RoleId = arrRoleList[iRoles];
		var rolePath = 'Role[RoleNo="' + RoleId + '"]';
		var roleNode = ($(unitNode).find(rolePath));
		if (roleNode)
		{
			for(var iroleNode = 0 ; iroleNode < roleNode.length ; iroleNode++)
			{
				var roleNodeChild = roleNode[iroleNode];
				var RoleName = $(roleNodeChild).find("RoleName").text();

				if(gSignSetObj.gOdApproveType == "ROLE")
				{
					var bExist = false;
					for(var k = 0 ; k < gSignSetObj.arrApply.length ; k++)
					{
						if(RoleId == gSignSetObj.arrApply[k])
						{
							bExist = true;
							break;
						}
					}

					if(!bExist)
					{
						var strRtnInfo = "||" + RoleId + "|" + RoleName;
						gSignSetObj.arrApply.push(RoleId); // 以角色篩選時, m_vecUnitAppUser 存 RoleId
						gSignSetObj.arrApplyList.push(strRtnInfo);
					}
				}
				else
				{
					var iPlayRole = $(roleNodeChild).find("RoleOccupant").length;
					for(var iPlay = 0 ; iPlay < iPlayRole ; iPlay++)
					{
						var $RoleOccupant = $($(roleNodeChild).find("RoleOccupant")[iPlay]);
						var PlayAccount = $RoleOccupant.find("Account").text().toUpperCase();
						var PlayEmpName = $RoleOccupant.find("Name").text();

						var bExist = false;
						for(var iUser = 0 ; iUser < gSignSetObj.arrApplyList.length ; iUser++)
						{
							var CheckRtnInfo = gSignSetObj.arrApplyList[iUser].split('|');
							if(PlayAccount == CheckRtnInfo[0] && PlayEmpName == CheckRtnInfo[1])
							{
								if(gSignSetObj.gOdApproveType == "ALL")
								{
									//OD_APPROVE_TYPE = "ALL" 時
									//帳號/名稱/角色 皆相同視為重複項目
									if(RoleId == CheckRtnInfo[2])
									{
										bExist = true;
										break;
									}
								}
								else
								{
									//OD_APPROVE_TYPE = "USER" 時
									//帳號/名稱 相同視為重複項目
									bExist = true;
									break;
								}
							}
						}

						if(!bExist)
						{
							var strRtnInfo = PlayAccount + "|" + PlayEmpName + "|" + RoleId + "|" + RoleName;
							gSignSetObj.arrApply.push(PlayAccount);
							gSignSetObj.arrApplyList.push(strRtnInfo);
						}
					}

					//1110925 David 1111200 加入代理人資訊
					let strRoleOuId = $(roleNodeChild).find("UnitNo").text();
					if(gSignSetObj.arrAppOuRole.length > 0 && gSignSetObj.arrAppOuRole.includes(strRoleOuId +"|" + RoleId))
					{
						for(let iProxy = 0 ; iProxy < gSignSetObj.arrAppOuRole.length ; iProxy++)
						{
							if(gSignSetObj.arrAppOuRole[iProxy] == strRoleOuId +"|" + RoleId)
							{
								let arrProxyInfo = gSignSetObj.arrProxyUser[iProxy].split('|');
								gSignSetObj.arrApply.push(arrProxyInfo[0]);
								gSignSetObj.arrApplyList.push(arrProxyInfo[0] + "|" + arrProxyInfo[1] + "[代理]|" + RoleId + "|" + RoleName);
							}
						}
					}
				}
			}
		}
	}
}

function fnODC011Save()
{
	//續辦
	if($("#cbContinue")[0].checked)
		$("#txCaseCon").val("Y");
	else
		$("#txCaseCon").val("N");

	//發文設定
	if($("#rbO")[0].checked)
		$("#txCloseType").val("1");
	else if($("#rbU")[0].checked)
		$("#txCloseType").val("2");
	else if($("#rbSave")[0].checked == true)
		$("#txCloseType").val("3");

	if(gObj.uSignType == "P")
	{
		if(theSSO.User.EnvSettings.get("MP_ATTACH_REMARK") != "")
		{
			if($("#cbAttach")[0].checked)
				$('#txTranMark').val(theSSO.User.EnvSettings.get("MP_ATTACH_REMARK"));
			else
				$('#txTranMark').val("");
		}

		//有核決者才紀錄核決時間
		if($("#txAppUserName").val() != "" && $("#txShowApprovedDate").val() !="")
		{
			//1140208 David 1131322 新增檢核核決日期有值時，核決時間欄位不可為空
			if($("#txShowApprovedTime").val() == "")
			{
				alert("請輸入核決時間");
				return false;
			}

			//1101126 David 1101275 配合紀錄至時間，調整資料檢邏輯
			let strFullApprovedTime = $("#txShowApprovedDate").val() + $("#txShowApprovedTime").val();

			//檢核核決時間合理性
			//1101126 David 1101275 配合紀錄至時間，調整資料檢邏輯
			/*if(gSignSetObj.gSourceApprovedDate != $("#txShowApprovedDate").val())
			{
				//不可比目前流程的NEW_TIME小
				if(gSignSetObj.gNewTime > $("#txShowApprovedDate").val())
				{
					var StrNewTimeFormat = gSignSetObj.gNewTime.substr(0,3) + "/" + gSignSetObj.gNewTime.substr(3,2) + "/" + gSignSetObj.gNewTime.substr(5,2);
					alert("核決時間不可小於目前流程之產生時間：" + StrNewTimeFormat);
					return false;
				}

				if(gSignSetObj.gSourceApprovedDate != "")//已有核決日期，顯示提示訊息
				{
					var strAppDateFormat = gSignSetObj.gSourceApprovedDate.substr(0,3) + "/" + gSignSetObj.gSourceApprovedDate.substr(3,2) + "/" + gSignSetObj.gSourceApprovedDate.substr(5,2);
					if(!window.confirm("目前已儲存之核決時間為" + strAppDateFormat + "，與目前畫面核決時間欄位資料不同，請問是否繼續？"))
						return false;
				}

				//儲存時補足13碼
				var StrNowTime = "";
				var Nowdt = new Date();
				StrNowTime = jf_PADL((Nowdt.getHours() + ''),2,"0") + jf_PADL((Nowdt.getMinutes() + ''),2,"0") + jf_PADL((Nowdt.getSeconds() + ''),2,"0");

				$('#txApprovedDate').val($("#txShowApprovedDate").val() + StrNowTime);
				gSignSetObj.gSourceApprovedDate = $("#txShowApprovedDate").val();
			}*/
			if(gSignSetObj.gSourceApprovedDate != strFullApprovedTime)
			{
				//不可比目前流程的NEW_TIME小
				if(gSignSetObj.gNewTime > strFullApprovedTime)
				{
					var StrNewTimeFormat = gSignSetObj.gNewTime.substr(0,3) + "/" + gSignSetObj.gNewTime.substr(3,2) + "/" + gSignSetObj.gNewTime.substr(5,2) + " " + gSignSetObj.gNewTime.substr(7,2) + ":" + gSignSetObj.gNewTime.substr(9,2);
					alert("核決時間不可小於目前流程之產生時間：" + StrNewTimeFormat);
					return false;
				}

				if(gSignSetObj.gSourceApprovedDate != "")//已有核決日期，顯示提示訊息
				{
					var strAppDateFormat = gSignSetObj.gSourceApprovedDate.substr(0,3) + "/" + gSignSetObj.gSourceApprovedDate.substr(3,2) + "/" + gSignSetObj.gSourceApprovedDate.substr(5,2)+ " " + gSignSetObj.gSourceApprovedDate.substr(7,2) + ":" + gSignSetObj.gSourceApprovedDate.substr(9,2);
					if(!window.confirm("目前已儲存之核決時間為" + strAppDateFormat + "，與目前畫面核決時間欄位資料不同，請問是否繼續？"))
						return false;
				}

				//儲存時補足13碼
				$('#txApprovedDate').val(strFullApprovedTime + "59");
				gSignSetObj.gSourceApprovedDate = strFullApprovedTime;
			}
		}

		//清空核決者時一併清空核決日期
		if($("#txAppUserName").val() == "")
		{
			$("#txApprovedDate").val("");
			$("#txShowApprovedDate").val("");
			//1101126 David 1101275 核決時間擴充時間欄位
			$("#txShowApprovedTime").val("");
			gSignSetObj.gSourceApprovedDate = ""
		}
	}

	try
	{
		//ODWDCM
		var arrODWDCM = new Array();
		var i = 0;

		if(gObj.uSignType == "P")
		{
			arrODWDCM[i++] = { fieldname: 'M_COM_CASE_NO', value: $("#txM_ComCaseNo").val()};
			arrODWDCM[i++] = { fieldname: 'RCV_TASK', value: $("#txRcvTask").val()};
			arrODWDCM[i++] = { fieldname: 'ISSUE_TASK', value: $("#txIssueTask").val()};
			//1070110 David ODWDCM無STORE_TYPE欄位，不需處理，避免後續公文傳送處理來源錯亂
			//arrODWDCM[i++] = { fieldname: 'STORE_TYPE', value: $("#txStoreType").val()};
			//1060118 David 修正線上簽核公文無法儲存續辦選項問題
			//arrODWDCM[i++] = { fieldname: 'CASE_CON', value: $("#txCaseCon").val()};
			arrODWDCM[i++] = { fieldname: 'APPROVED_DATE', value: $("#txApprovedDate").val()};
		}

		arrODWDCM[i++] = { fieldname: 'CLOSE_TYPE', value: $("#txCloseType").val()};
		arrODWDCM[i++] = { fieldname: 'CLOSE_DATE', value: $("#txCloseDate").val()};
		//1060118 David 修正線上簽核公文無法儲存續辦選項問題
		arrODWDCM[i++] = { fieldname: 'CASE_CON', value: $("#txCaseCon").val()};

		//1111123 David 1110881 新增銓敘部客製化續辦處理
		if(SSO_CONFIG.OrgNickName == "MOCS")
		{
			if($('#txFurtherState').val() != "2")
			{
				if($("#cbFurtherState")[0].checked)
					arrODWDCM[i++] = { fieldname: 'FURTHER_STATE', value: "1"};
				else
					arrODWDCM[i++] = { fieldname: 'FURTHER_STATE', value: "0"};
			}
		}

		theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCM);

		//ODWMSG
		var arrODWMSG = new Array();
		var i = 0;

		if(gObj.uSignType == "P")
		{
			arrODWMSG[i++] = { fieldname: 'APP_USER_NAME', value: $("#txAppUserName").val()};
			arrODWMSG[i++] = { fieldname: 'APP_USER_ID', value: $("#txAppUserId").val()};
			arrODWMSG[i++] = { fieldname: 'APP_ROLE_ID', value: $("#txAppRoleId").val()};
			arrODWMSG[i++] = { fieldname: 'REJECT_USER_NAME', value: $("#txRejectUserName").val()};
			arrODWMSG[i++] = { fieldname: 'TRAN_MARK', value: $("#txTranMark").val()};
		}

		arrODWMSG[i++] = { fieldname: 'STORE_TYPE', value: $("#txStoreType").val()};
		arrODWMSG[i++] = { fieldname: 'TX_REASON', value: $("#txReason").val()};
		arrODWMSG[i++] = { fieldname: 'CASE_CON', value: $("#txCaseCon").val()};

		theAOL.docObj.set('ODC010', 'ODWMSG', arrODWMSG);
	}
	catch(e)
	{
		alert("ODC011儲存失敗：" + e.message);
		return false;
	}

	return true;
}

function GetRoleName(argRoleCode)
{
	var arrRoleCorr = new Array();
	arrRoleCorr[arrRoleCorr.length] = new Array("OD01", "局長");
	arrRoleCorr[arrRoleCorr.length] = new Array("OD06", "主任秘書");
	arrRoleCorr[arrRoleCorr.length] = new Array("OD11", "組長");
	arrRoleCorr[arrRoleCorr.length] = new Array("OD21", "科長");
	for(var i=0; i<arrRoleCorr.length; i++)
		if(arrRoleCorr[i][0] == argRoleCode)
			return arrRoleCorr[i][1];
	return argRoleCode;
}

function GetSplitStr(argStr,argSep,argIdx)
{
	var rg_szItems = argStr.split(argSep);
	if(argIdx < rg_szItems.length)
		return rg_szItems[argIdx];
	return ""; 
}

//1080102 David 1071058 新增傳入核決者名稱
//function fnSetApplyDDLValue(objName, argAcc, argRoleCode)
function fnSetApplyDDLValue(objName, argAcc, argRoleCode, argAppUserName)
{
	if (!$("#" + objName + "")[0])
	{
		console.log('設定物件 Null:', objName);
		return;
	}

	var selectObj = $("select#" + objName + "");
	selectObj[0].selectedIndex = -1;
	selectObj.selectmenu("refresh");

	var SetApply = false;//1080102 David 1071058 紀錄核決者是否正確設定
	var FirstMeetRoleName = "";//1080102 David 1071058 紀錄第一個符合角色代碼的角色名稱

	for(var i = 0 ; i < selectObj[0].length ; i++)
	{
		var SelectOption =  $("#" + objName + " option")[i];

		//1080102 David 1071058 調整核決者比對邏輯，依OD_APPROVE_TYPE判斷處理
		/*var account = jf_Trim(GetSplitStr(SelectOption.value, "|", 0));
		var roleCode = jf_Trim(GetSplitStr(SelectOption.value, "|", 1));
		//皆須轉大寫比對以避免大小不一致造成比對錯誤
		if(roleCode.toUpperCase() == argRoleCode.toUpperCase())
		{
			//1080102 David 1071058 新增比對名稱
			//if(account == "" || (account != "" && account.toUpperCase() == argAcc.toUpperCase()))
			if(account == "" || (account != "" && account.toUpperCase() == argAcc.toUpperCase()))
			{
				selectObj[0].selectedIndex = i;
				selectObj.selectmenu("refresh");
				break;
			}
		}*/
		var account = jf_Trim(GetSplitStr(SelectOption.value, "|", 0));
		var roleCode = jf_Trim(GetSplitStr(SelectOption.value, "|", 1));
		var EmpName = jf_Trim(GetSplitStr(SelectOption.value, "|", 2));
		var roleName = jf_Trim(GetSplitStr(SelectOption.value, "|", 3));

		if(FirstMeetRoleName == "" && roleCode.toUpperCase() == argRoleCode.toUpperCase())
			FirstMeetRoleName = roleName;

		if(gSignSetObj.gOdApproveType =="ROLE")
		{
			//角色類型新增比對名稱(argAppUserName不為undefined才比對)
			if(roleCode.toUpperCase() == argRoleCode.toUpperCase() && (argAppUserName != undefined && roleName == argAppUserName))
			{
				selectObj[0].selectedIndex = i;
				selectObj.selectmenu("refresh");
				SetApply = true;
				break;
			}
		}
		else
		{
			if(roleCode.toUpperCase() == argRoleCode.toUpperCase() && account.toUpperCase() == argAcc.toUpperCase())
			{
				selectObj[0].selectedIndex = i;
				selectObj.selectmenu("refresh");
				SetApply = true;
				break;
			}
		}
	}

	//1080102 David 1071058 若未比對到，新增至核決者選單中
	if(!SetApply && argRoleCode.trim() != "")
	{
		if(gSignSetObj.gOdApproveType =="ROLE")
		{
			//角色類型時，傳入的argAppUserName=核決角色名稱
			//1100506 David 1100473 弱掃修正Client Potential XSS
			//selectObj.append(new Option(argAppUserName, "|"+argRoleCode+"||"+argAppUserName));
			selectObj.append(new Option(htmlencode(argAppUserName), htmlencode("|"+argRoleCode+"||"+argAppUserName)));
			selectObj[0].selectedIndex = selectObj[0].length-1;
			selectObj.selectmenu('refresh');
		}
		else
		{
			if(FirstMeetRoleName == "")
				FirstMeetRoleName = argRoleCode;

			if(gSignSetObj.gOdApproveType =="ALL")
			{
				//1100506 David 1100473 弱掃修正Client Potential XSS
				//selectObj.append(new Option(FirstMeetRoleName + "--" + argAppUserName, argAcc+"|"+argRoleCode+"|"+argAppUserName+"|"+FirstMeetRoleName));
				selectObj.append(new Option(htmlencode(FirstMeetRoleName + "--" + argAppUserName), htmlencode(argAcc+"|"+argRoleCode+"|"+argAppUserName+"|"+FirstMeetRoleName)));
				selectObj[0].selectedIndex = selectObj[0].length-1;
				selectObj.selectmenu('refresh');
			}
			else
			{
				//1100506 David 1100473 弱掃修正Client Potential XSS
				//selectObj.append(new Option(argAppUserName, argAcc+"|"+argRoleCode+"|"+argAppUserName+"|"+FirstMeetRoleName));
				selectObj.append(new Option(htmlencode(argAppUserName), htmlencode(argAcc+"|"+argRoleCode+"|"+argAppUserName+"|"+FirstMeetRoleName)));
				selectObj[0].selectedIndex = selectObj[0].length-1;
				selectObj.selectmenu('refresh');
			}
		}
	}
}

//設定案件按鈕
function fnSetCom()
{
	var WebPage = theSSO.User.EnvSettings.get("WS_ED_SITE");

	if(WebPage == "")
	{
		alert("尚未設定案件查詢作業路徑");
		return;
	}

	var strDocNo = $("#txDocNo").val();
	var strComNo = $("#txComNo").val();
	if(strComNo=="")
		strComNo=strDocNo;
	
	WebPage = AddUrlSlash(WebPage) + "ED6/EDT690.aspx?nComNo=" + strComNo + "&nDocNo=" + strDocNo + "&SAMLart="+localStorage.Artifact;

	var $pane = $("div#ODC011_MCASE_DIV");
	$.modal($pane, {
		containerCss: {width: "95%", height: "95%"},
		onShow: function() 
		{
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$pane.css("width", "95%").css("height", "95%");
				$frame.css("width", "100%").css("height", "100%");//iframe有預設border-width
				$frame[0].src = WebPage;
			}
			$("div#ODC011_MCASE_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		},
		onClose: function()
		{
			var $pane = $("div#ODC011_MCASE_DIV");
			var $frame = $pane.find('iframe');
			$frame[0].src = "";
			$("div#ODC011_MCASE_DIV")[0].style="display: none";
			$("div#ODC011_MCASE_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$("div#ODC011_MCASE_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
			$.modal.close();
			fnUpdateCaseDate(strComNo,strDocNo);
		}
	});
}

//呼叫WS更新案件相關資訊
function fnUpdateCaseDate(argComNo,argDocNo)
{
	try
	{
		var paramsGetMsgStatus = {
				"argSessionID": localStorage.Artifact,
				"argComNo": argComNo,
				"argDocNo": argDocNo,
				"argOrgNo": gObj.uOrgNo
			};

		var dfdGetMsgStatus = $.Deferred();
		g_QueryDeferred = dfdGetMsgStatus;
		WsGetMsgStatus(paramsGetMsgStatus, dfdGetMsgStatus)
		.then(function (rtn)
		{
			var NewData = rtn.split("|");
			
			$("#txCaseNo").val(NewData[0]);
			$("#txM_ComCaseNo").val(NewData[1]);
			if(argDocNo == argComNo || argComNo=="")//母文才更新結案日期
				$("#txDueDate").val(NewData[2]);//母文結案日期
			$("#txRcvTask").val(NewData[3]);
			$("#txIssueTask").val(NewData[4]);
		})
		.fail(function (ErrMessage) 
		{
			alert("帶回收/發文辦理情形失敗："+ErrMessage);
		});
	}
	catch(e)
	{
		alert("呼叫fnGetMsgStatus取得收/發文辦理情形異常："+e.message);
	}
}

function fnODC011StyleCtrl()
{
	//核決者選單
	$("#ddlAppType-button")[0].style.height = "1.4em";
	$("#ddlApply-button")[0].style.height = "1.4em";

	//1111123 David 1110881 銓敘部客製化續辦功能，隱藏原有的續辦欄位，改顯示銓敘部續辦欄位
	if(SSO_CONFIG.OrgNickName == "MOCS")
	{
		$('#tdCoutinue').hide();
		$('#tdFurtherState').show();
	}
}

function fnDllTxNameExChange()
{
	fnODC011SetOptionsForRemark();

	//藥檢局需求，承辦人自行核決時，預設流程控管選項
	if(SSO_CONFIG.OrgNickName == 'FDA')
	{
		var ArrOD99CanApp = gObj.gOD99CanAPP.split("|");
		if (gObj.uFolder + gObj.uSubFolder == ArrOD99CanApp[2])
		{
			if(gObj.gPage == "ODC011")
			{
				if (theAOL.nextTarget.TxName == "承辦人自行決行") 
				{
					//1080102 David 1071058 調整設定ddlAppType邏輯，fnSetApplyDDLValue獨立給核決者選單使用
					//fnSetApplyDDLValue("ddlAppType","核決者","");
					UiSetDlItemByText("ddlAppType","核決者");
					fnSetApplyDDLValue("ddlApply", "", "OD99");
					fnApplyDDLChange();

					//1060109 David 調整FDA承辦人自行決行續辦問題
					$('#cbContinue').prop("checked", true).checkboxradio("refresh");

					$('#rbSave').prop("checked", true).checkboxradio("refresh");
					UiSetObjMotifyMode('#rbU,#rbO', 'R', '');
					//1101126 David 1101275 核決時間擴充時間欄位
					//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'W', '');
					UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedtTime', 'W', '');
				}
				else
				{
					//1060109 David 調整FDA承辦人自行決行續辦問題
					$('#cbContinue').prop("checked", false).checkboxradio("refresh");

					fnSetApplyDDLValue("ddlApply", " ", " ");
					fnApplyDDLChange();
					UiSetObjMotifyMode('#rbU,#rbSave,#rbO', 'W', '');
					//1101126 David 1101275 核決時間擴充時間欄位
					//UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate', 'R', '');
					UiSetObjMotifyMode('#ddlApply,#ddlAppType,#txShowApprovedDate,#txShowApprovedtTime', 'R', '');
				}
			}
			else
			{
				if (theAOL.nextTarget.TxName == "承辦人自行決行") 
				{
					//ODWDCM
					var arrODWDCM = new Array();
					var i = 0;
					arrODWDCM[i++] = { fieldname: 'CLOSE_TYPE', value: "3"};
					//1060109 David 調整FDA承辦人自行決行續辦問題
					arrODWDCM[i++] = { fieldname: 'CASE_CON', value: "Y"};
					theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCM);

					//ODWMSG
					var arrODWMSG = new Array();
					var i = 0;
					arrODWMSG[i++] = { fieldname: 'APP_USER_NAME', value: "承辦人"};
					arrODWMSG[i++] = { fieldname: 'APP_USER_ID', value: ""};
					arrODWMSG[i++] = { fieldname: 'APP_ROLE_ID', value: "OD99"};
					arrODWMSG[i++] = { fieldname: 'REJECT_USER_NAME', value: ""};
					//1060109 David 調整FDA承辦人自行決行續辦問題
					arrODWMSG[i++] = { fieldname: 'CASE_CON', value: "Y"};
					theAOL.docObj.set('ODC010', 'ODWMSG', arrODWMSG);
				}
				else
				{
					//ODWDCM
					var arrODWDCM = new Array();
					var i = 0;
					arrODWDCM[i++] = { fieldname: 'CLOSE_TYPE', value: "1"};
					//1060109 David 調整FDA承辦人自行決行續辦問題
					arrODWDCM[i++] = { fieldname: 'CASE_CON', value: "N"};
					theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCM);

					//ODWMSG
					var arrODWMSG = new Array();
					var i = 0;
					arrODWMSG[i++] = { fieldname: 'APP_USER_NAME', value: ""};
					arrODWMSG[i++] = { fieldname: 'APP_USER_ID', value: ""};
					arrODWMSG[i++] = { fieldname: 'APP_ROLE_ID', value: ""};
					arrODWMSG[i++] = { fieldname: 'REJECT_USER_NAME', value: ""};
					//1060109 David 調整FDA承辦人自行決行續辦問題
					arrODWMSG[i++] = { fieldname: 'CASE_CON', value: "N"};
					theAOL.docObj.set('ODC010', 'ODWMSG', arrODWMSG);
				}
			}
		}
	}
}

//1100506 David 1100473 弱掃修正
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ODC011.js").finish();
})();