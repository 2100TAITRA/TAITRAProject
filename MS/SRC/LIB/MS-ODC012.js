/*
DATE	SA		PRG		MGR_NO	DESC
1050729	David	David	1050087	新增MS-ODC012
1080927	Kevin	David	1080339	jQuery升級3.4.1改寫語法
1120714	David	David	-------	(各機關問題彙整表 序125)核決者選單處理，新增新增傳入APP_USER_NAME
*/

function fnODC012Init()
{
	if(gObj.gODC012Load)
		return;

	//初始會簽機關選單
	InitCoOrg("ODC012");

	fnODC012BuildApplyUser();

	//小日曆設定
	fnSetDataPicker("tx_ODC012_UpIssueDate");
	fnSetDataPicker("tx_ODC012_ApprovedDate");

	if(_rsltODWDCM["COSIGN_TYPE"] == "2")//外會
		$("#rb_ODC012_CoSignType2").prop("checked", true).checkboxradio("refresh");
	else//外陳
		$("#rb_ODC012_CoSignType1").prop("checked", true).checkboxradio("refresh");

	$("#combo_ODC012_CoOrgNo1").val(_rsltODWDCM["COORG_NO"]);
	$("#tx_ODC012_CoOrgName1").val(_rsltODWDCM["COORG_NAME"]);
	$("#combo_ODC012_CoOrgNo2").val(_rsltODWDCM["COORG_NO2"]);
	$("#tx_ODC012_CoOrgName2").val(_rsltODWDCM["COORG_NAME2"]);
	$("#combo_ODC012_CoOrgNo3").val(_rsltODWDCM["COORG_NO3"]);
	$("#tx_ODC012_CoOrgName3").val(_rsltODWDCM["COORG_NAME3"]);
	$("#combo_ODC012_CoOrgNo4").val(_rsltODWDCM["COORG_NO4"]);
	$("#tx_ODC012_CoOrgName4").val(_rsltODWDCM["COORG_NAME4"]);
	$("#combo_ODC012_CoOrgNo5").val(_rsltODWDCM["COORG_NO5"]);
	$("#tx_ODC012_CoOrgName5").val(_rsltODWDCM["COORG_NAME5"]);

	$("#tx_ODC012_UpIssueWord").val(_rsltODWDCM["UPISSUE_WORD"]);
	$("#tx_ODC012_UpIssueNo").val(_rsltODWDCM["UPISSUE_NO"]);
	$("#tx_ODC012_UpIssueDate").val(_rsltODWDCM["UPISSUE_DATE"]);
	$("#tx_ODC012_CloseDate").val(_rsltODWDCM["CLOSE_DATE"]);
	$("#tx_ODC012_CloseType").val(_rsltODWDCM["CLOSE_TYPE"]);

	$("#tx_ODC012_ApprovedDate").val(_rsltODWDCM["APPROVED_DATE"]);
	fnODC012CloseDateChange();

	$("#tx_ODC012_AppUserName").val(_rsltODWMSG["APP_USER_NAME"]);
	$("#tx_ODC012_AppUserId").val(_rsltODWMSG["APP_USER_ID"]);
	$("#tx_ODC012_AppRoleId").val(_rsltODWMSG["APP_ROLE_ID"]);
	//1120714 David 新增傳入APP_USER_NAME
	//fnSetApplyDDLValue("dl_ODC012_Apply", $("#tx_ODC012_AppUserId").val(), $("#tx_ODC012_AppRoleId").val());
	fnSetApplyDDLValue("dl_ODC012_Apply", $("#tx_ODC012_AppUserId").val(), $("#tx_ODC012_AppRoleId").val(), $("#tx_ODC012_AppUserName").val());

	UiSetObjMotifyMode("#tx_ODC012_CloseDate_D", "R" , "");

	gObj.gODC012Load = true;
}

function fnODC012Save()
{
	if(!fnODC012CheckBeforeSave())
		return false;

	SaveCoOrg("ODC012");

	//無結案日期，則結案時間也不儲存
	if($("#tx_ODC012_UpIssueDate").val() != "")
		$("#tx_ODC012_CloseDate").val($("#tx_ODC012_UpIssueDate").val() + $("#tx_ODC012_UpCloseTime").val())
	else
		$("#tx_ODC012_CloseDate").val("");

	//若有發文日期、發文字號、核決者及核決日期，則結案方式為發文
	//[變更單000560] Charles 目前因為ODTSP只限定存查公文，所以先全部設定為存查 0960403
	if(jf_Trim($("#tx_ODC012_AppUserId").val()) != "" && jf_Trim($("#tx_ODC012_ApprovedDate").val())  != "" &&
		(jf_Trim($("#tx_ODC012_UpIssueWord").val()) != "" || jf_Trim($("#tx_ODC012_UpIssueNo").val()) != "") &&
		jf_Trim($("#tx_ODC012_UpIssueDate").val()) != "")
		$("#tx_ODC012_CloseType").val("3");
	else if(jf_Trim($("#tx_ODC012_AppUserId").val()) != "" && jf_Trim($("#tx_ODC012_ApprovedDate").val()) != "" &&
		jf_Trim($("#tx_ODC012_UpIssueWord").val()) == "" && jf_Trim($("#tx_ODC012_UpIssueNo").val()) == "" &&
		jf_Trim($("#tx_ODC012_UpIssueDate").val()) == "")
		$("#tx_ODC012_CloseType").val("3");

	try
	{
		//ODWDCM
		var arrODWDCM = new Array();
		var iDCM = 0;

		var strCoSignType = "1"
		if($("#rb_ODC012_CoSignType2")[0].checked==true)
			strCoSignType = "2"
		arrODWDCM[iDCM++] = { fieldname: 'COSIGN_TYPE', value: strCoSignType};

		arrODWDCM[iDCM++] = { fieldname: 'COORG_NO', value: $("#combo_ODC012_CoOrgNo1").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NAME', value: $("#tx_ODC012_CoOrgName1").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NO2', value: $("#combo_ODC012_CoOrgNo2").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NAME2', value: $("#tx_ODC012_CoOrgName2").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NO3', value: $("#combo_ODC012_CoOrgNo3").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NAME3', value: $("#tx_ODC012_CoOrgName3").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NO4', value: $("#combo_ODC012_CoOrgNo4").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NAME4', value: $("#tx_ODC012_CoOrgName4").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NO5', value: $("#combo_ODC012_CoOrgNo5").val()};
		arrODWDCM[iDCM++] = { fieldname: 'COORG_NAME5', value: $("#tx_ODC012_CoOrgName5").val()};
		var strApprovedDate = $("#tx_ODC012_ApprovedDate").val();
		if(strApprovedDate != "" && strApprovedDate.length > 7)
			strApprovedDate = strApprovedDate.substr(0,7);
		arrODWDCM[iDCM++] = { fieldname: 'APPROVED_DATE', value: strApprovedDate};

		arrODWDCM[iDCM++] = { fieldname: 'UPISSUE_WORD', value: $("#tx_ODC012_UpIssueWord").val()};
		arrODWDCM[iDCM++] = { fieldname: 'UPISSUE_NO', value: $("#tx_ODC012_UpIssueNo").val()};
		arrODWDCM[iDCM++] = { fieldname: 'UPISSUE_DATE', value: $("#tx_ODC012_UpIssueDate").val()};
		
		arrODWDCM[iDCM++] = { fieldname: 'CLOSE_DATE', value: $("#tx_ODC012_CloseDate").val()};
		arrODWDCM[iDCM++] = { fieldname: 'CLOSE_TYPE', value: $("#tx_ODC012_CloseType").val()};

		theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCM);

		//ODWMSG
		var arrODWMSG = new Array();
		var iMSG = 0;

		arrODWMSG[iMSG++] = { fieldname: 'APP_USER_NAME', value: $("#tx_ODC012_AppUserName").val()};
		arrODWMSG[iMSG++] = { fieldname: 'APP_USER_ID', value: $("#tx_ODC012_AppUserId").val()};
		arrODWMSG[iMSG++] = { fieldname: 'APP_ROLE_ID', value: $("#tx_ODC012_AppRoleId").val()};

		theAOL.docObj.set('ODC010', 'ODWMSG', arrODWMSG);
	}
	catch(e)
	{
		alert("ODC012儲存失敗：" + e.message);
		return false;
	}
	
	return true;
}

function fnODC012CheckBeforeSave()
{
	var sMsg = "";
	
	if(jf_Trim($("#tx_ODC012_UpIssueWord").val()) == "" && jf_Trim($("#tx_ODC012_UpIssueNo").val()) == "" && jf_Trim($("#tx_ODC012_UpIssueDate").val()) != "")
	{
		if(sMsg == "")
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$("#tx_ODC012_UpIssueWord").focus();
			$("#tx_ODC012_UpIssueWord").trigger("focus");
		}
		sMsg += "上級發文字號、";
	}

	if((jf_Trim($("#tx_ODC012_UpIssueWord").val()) != "" || jf_Trim($("#tx_ODC012_UpIssueNo").val()) != "") && jf_Trim($("#tx_ODC012_UpIssueDate").val()) == "")
	{
		if(sMsg == "")
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$("#tx_ODC012_UpIssueDate").focus();
			$("#tx_ODC012_UpIssueDate").trigger("focus");
		}
		sMsg += "上級發文日、";
	}

	if(jf_Trim($("#tx_ODC012_AppUserName").val()) == "" && jf_Trim($("#tx_ODC012_AppUserId").val()) == "" && jf_Trim($("#tx_ODC012_AppRoleId").val()) == "" && jf_Trim($("#tx_ODC012_ApprovedDate").val()) != "")
	{
		if(sMsg == "")
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$("#dl_ODC012_Apply").focus();
			$("#dl_ODC012_Apply").trigger("focus");
		}
		sMsg += "核決者、";
	}

	if((jf_Trim($("#tx_ODC012_AppUserName").val()) != "" || jf_Trim($("#tx_ODC012_AppUserId").val()) != "" || jf_Trim($("#tx_ODC012_AppRoleId").val()) != "") && jf_Trim($("#tx_ODC012_ApprovedDate").val()) == "")
	{
		if(sMsg == "")
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$("#tx_ODC012_ApprovedDate").focus();
			$("#tx_ODC012_ApprovedDate").trigger("focus");
		}
		sMsg += "核決日期、";
	}

	if((jf_Trim($("#tx_ODC012_UpIssueWord").val()) != "" || jf_Trim($("#tx_ODC012_UpIssueNo").val()) != "") && jf_Trim($("#tx_ODC012_UpIssueDate").val()) != "")
	{
		if(jf_Trim($("#tx_ODC012_AppUserName").val()) == "" && jf_Trim($("#tx_ODC012_AppUserId").val()) == "" && jf_Trim($("#tx_ODC012_AppRoleId").val()) == "" && jf_Trim($("#tx_ODC012_ApprovedDate").val()) == "")
		{
			if(sMsg == "")
			{
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$("#dl_ODC012_Apply").focus();
				$("#dl_ODC012_Apply").trigger("focus");
			}
			sMsg += "核決者、核決日期、";
		}
	}

	//選擇外會時，則會簽機關至少需輸入一組
	if($("#rb_ODC012_CoSignType2")[0].checked && (jf_Trim($("#combo_ODC012_CoOrgNo1").val()) 
		+ jf_Trim($("#combo_ODC012_CoOrgNo2").val()) + jf_Trim($("#combo_ODC012_CoOrgNo3").val())
		+ jf_Trim($("#combo_ODC012_CoOrgNo4").val()) + jf_Trim($("#combo_ODC012_CoOrgNo5").val()) ==""))
	{
		if(sMsg == "")
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$("#combo_ODC012_CoOrgNo1").focus();
			$("#combo_ODC012_CoOrgNo1").trigger("focus");
		}
		sMsg += "本份公文之外會機關(至少一組)、";
	}

	if(sMsg != "")
	{
		sMsg = sMsg.substr(0,sMsg.length-1);
		alert(sMsg+"須有值!!");
		return false;
	}

	return true;
}

function fnODC012BuildApplyUser()
{
	//格式=帳號|姓名|角色
	var nNum = theSSO.User.EnvSettings.get("OD_UPORG_APP_LIST").split(";");
	$("#dl_ODC012_Apply").empty();
	$("#dl_ODC012_Apply").append(new Option(" ", " "));

	var sOdApproveType = theSSO.User.EnvSettings.get("OD_APPROVE_TYPE");

	if(sOdApproveType && sOdApproveType.toUpperCase()=="ROLE")
	{
		for(var i=0;i<nNum.length;i++)
		{
			if(jf_Trim(nNum[i]) == "")
				continue;
			var appAcc	= GetSplitStr(nNum[i],"|",0);
			var appRole	= GetSplitStr(nNum[i], "|", 2);
			var appRoleName	= GetSplitStr(nNum[i], "|", 1);
			$('#dl_ODC012_Apply').append(new Option(appRoleName, appAcc + "|" + appRole));
		}
	}
	else
	{
		for(var i=0;i<nNum.length;i++)
		{
			if(jf_Trim(nNum[i]) == "")
				continue;
			var appAcc	= GetSplitStr(nNum[i],"|",0);
			var appName	= GetSplitStr(nNum[i],"|",1);
			var appRole	= GetSplitStr(nNum[i],"|",2);
			$('#dl_ODC012_Apply').append(new Option(appName, appAcc+"|"+appRole));
		}
	}
	$('#dl_ODC012_Apply').selectmenu('refresh');
}

function fnODC012ApplyDDLChange()
{
	var appName = jf_Trim($("#dl_ODC012_Apply option:selected").text());
	var appMakeup = jf_Trim($("#dl_ODC012_Apply option:selected").val());

	var appAcc 	= GetSplitStr(appMakeup,"|",0);
	var appRole	= GetSplitStr(appMakeup,"|",1);

	$("#tx_ODC012_AppUserName").val(appName);
	$("#tx_ODC012_AppUserId").val(appAcc);
	$("#tx_ODC012_AppRoleId").val(appRole);

	//紙本簽核連動異動別
	if(gObj.uSignType == "P")
	{
		var ODC012_ResetTxName_ODWMSG = theAOL.docObj.get('ODWMSG', alODWMSG);
		var ODC012_ResetTxName_ODWDCM = theAOL.docObj.get('ODWDCM', alODWDCM);

		ODC012_ResetTxName_ODWMSG["APP_USER_NAME"] = $("#tx_ODC012_AppUserName").val();
		ODC012_ResetTxName_ODWMSG["APP_USER_ID"] = $("#tx_ODC012_AppUserId").val();
		ODC012_ResetTxName_ODWMSG["APP_ROLE_ID"] = $("#tx_ODC012_AppRoleId").val();

		SSOUtil.updatePDocTransTargetFromDI(theAOL.docObj, null, ODC012_ResetTxName_ODWMSG, ODC012_ResetTxName_ODWDCM)
	}
}

//判斷結案日期函式。
function fnODC012CloseDateChange()
{
	if($("#tx_ODC012_UpIssueDate").val() != "")
		$("#tx_ODC012_CloseDate_D").val($("#tx_ODC012_UpIssueDate").val());
	else
		$("#tx_ODC012_CloseDate_D").val("");
}

//檢查時間格式
function fnODC012ChkTime(argObjName)
{
	var $CheckTime = $("#" +argObjName + "");

	if($CheckTime.val() == "")
		return true;

	if (isNaN($CheckTime.val()))
	{
		alert('請輸入數字');
		if (!$CheckTime[0].disabled)
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$CheckTime.focus();
			$CheckTime.trigger("focus");
		}
		return false;
	}

	var strTime = $CheckTime.val();
	if (strTime != "")
	{
		if (strTime.length < 4)
		{
			strTime = jf_PADL(strTime,4,'0');
			argObj.value = strTime;
		}
		var nH = parseInt(strTime.substr(0,2), 10);
		var nM = parseInt(strTime.substr(2,2), 10);
		if (nH > 23 || nM > 59)
		{
			alert("時間格式錯誤");
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$CheckTime.focus();
			$CheckTime.trigger("focus");
			return false;
		}
	}
	return true;
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ODC012.js").finish();
})();