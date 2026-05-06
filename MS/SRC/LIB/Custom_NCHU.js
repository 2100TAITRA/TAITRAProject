// 客製化功能 for RRB
//Date		SA		PG			NO			Desc
/*
  1081008	Kevin	Joe			1080339		jQuery升級3.4.1
  1090102	David	David		1090001		分類案次查詢，一律傳入年度號
  1110817	Leslie	Zen			彙整表序247	修正MP開啟EAC005後畫面未置中之問題，視窗調整成1024*768大小
*/


(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[中興客製化] 載入文稿完成...");
		var dec;
		
		this
		.register(CUSTOM.CHANGE, "密等", Common.fnSecModify )//密等連動解密條件
		.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCls)//檢核分類號
		.register(CUSTOM.CHANGE, "案次號",Common.fnCheckCase)//檢核案次號
		.register(CUSTOM.CHANGE, "保存年限",Common.fnCheckKeepYear)//檢核保存年限
		.register(CUSTOM.CHANGE, "解密條件或保密期限",Common.fnExtransecCondModify)//切換解密條件
		.register(CUSTOM.CHANGE, "主旨",Common.fnSubjetModify)//更改主旨
		.register(CUSTOM.CHANGE, "速別",Common.fnSpeedModify)//更改速別
		.register(CUSTOM.INIT, "發文機關",Common.fnInitIssueSoureOrg)//發文機關選單建立
		.register
		(CUSTOM.REFRESH, "發文機關", 
			[	// 發文機關異動時連動以下欄位
				
				{fldName: "地址", callback: Common.fnChangeOrgAddress},
				{fldName: "署名1", callback: Common.fnChangeOrgSign },
				{fldName: "發文字", callback: Common.fnChangeOrgIssueWord}
			]
		)
		.register(CUSTOM.POPUP, "署名1",Common.fnInitSign)//建立署名初始選單
		.register(CUSTOM.POPUP, "署名2", Common.fnInitSign2)//建立署名2初始選單
		.register(CUSTOM.POPUP, "速別", Common.fnInitSpd)//建立速別初始選單	
	});
	theCustom.register(CUSTOM.SHOWDLG, "分類號", "查詢", function(dm) {
		try {
			var clsNo = oldClsVal = dm.text("//分類號");
			oldKeepYearVal = dm.text("//保存年限");
		}
		catch(e) {
			alert(e.message);
		}
		//1090102 David 1090001 有年度號優先使用，其次依公文號前三碼使用，皆無時依目前年度使用
		var year = "";
		try {
			year = dm.text("//年度號");
		}
		catch(e) {
			year = "";
		}
		if(year == "")
		{
			if(theAOL.docObj.docNo != "")
				year = theAOL.docObj.docNo.substr(0,3);
			else
			{
				var today = new Date();
				year = parseInt(today.getFullYear()) - 1911;
			}
		}
		
		var strQry = "?SAMLart="+theUserInfo.Artifact;
		strQry +="&DEPT_NO="+theUserInfo.DepartID;
		strQry +="&nFrom=Custom";
		strQry +="&MODE=1";
		strQry +="&FILE_CLS="+clsNo;
		//1090101 David 分類案次查詢，一律傳入年度號
		strQry +="&FILE_YEAR="+year;
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		//1081008	Joe		1080339		jQuery升級3.4.1
		// para.$para.closest('.pg').find("[aid='分類號']").focus();
		para.$para.closest('.pg').find("[aid='分類號']").trigger("focus");
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		//1100408 David 1100192 需由分類號帶出保存年限，且有對應的保存年限時才帶入
		if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && rtnvalue.argKeepYear != "")
			theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
	})
	theCustom.register(CUSTOM.SHOWDLG, "案次號", "查詢", function(dm) {
		var today = new Date();
		//1090102 David 1090001 有年度號優先使用，其次依公文號前三碼使用，皆無時依目前年度使用
		//var year =  parseInt(today.getFullYear());
		var year = "";
		try {
			year = dm.text("//年度號");
		}
		catch(e) {
			year = "";
		}
		if(year == "")
		{
			if(theAOL.docObj.docNo != "")
				year = theAOL.docObj.docNo.substr(0,3);
			else
				year = parseInt(today.getFullYear()) - 1911;
		}

		try {
			var clsNo = oldClsVal = dm.text("//分類號");
			var caseNo = oldCaseVal = dm.text("//案次號");
			oldKeepYearVal = dm.text("//保存年限");
		}
		catch(e) {
			alert(e.message);
		}
		var strQry = "?SAMLart="+theUserInfo.Artifact;
		strQry +="&DEPT_NO="+theUserInfo.DepartID;
		strQry +="&nFrom=Custom";
		strQry +="&MODE=2";
		strQry +="&FILE_CLS="+clsNo;
		strQry +="&FILE_CASE="+caseNo;
		//1090102 David 1090001 分類案次查詢，一律傳入年度號
		//strQry +="&FILE_YEAR="+(year-1911);
		strQry +="&FILE_YEAR="+year;
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		theCustom.setValue("案次號",rtnvalue.argCaseNo,true);
		//1100408 David 1100192 需由分類號帶出保存年限，且有對應的保存年限時才帶入
		if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && rtnvalue.argKeepYear != "")
			theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
		theCustom.setValue("年度號",rtnvalue.argFileYear,true);
		//1081008	Joe		1080339		jQuery升級3.4.1
		// para.$para.closest('.pg').find("[aid='案次號']").focus();
		para.$para.closest('.pg').find("[aid='案次號']").trigger("focus");
	})
	
	//1120518	Leslie	新增客製化統計設定
	var _WSServerHost = window.location.protocol + '//' + window.location.hostname;
	var _CustomMPSetting = {
		"主管" : {
			"待核示" : {
				"主辦待核示" : "待處理-待核示",
				"會辦待核示" : "待處理-會辦待核示",
				"分會待核示" : "待處理-分會待核示",
				"後會待核示" : "待處理-後會待核示",
				"內會待核示" : "待處理-內會待核示",
				"待補閱" : "待處理-待補閱",
				"待補陳" : "待處理-待補陳"
			},
			"待分辦" : {
				"主辦待分辦" : "待處理-主辦待分辦",
				"會辦待分辦" : "待處理-會辦待分辦",
				"分會待分辦" : "待處理-分會待分辦",
				"內會待分辦" : "待處理-內會待分辦",
				"後會待分辦" : "待處理-後會待分辦"
			},
			"待批核" : {
				"展期單" : "待處理-展期申請待核示",
				"改分單(改分及銷號單)" : "待處理-改分銷號申請待核示",
				"調整速別" : "待處理-速別變更申請待核示",
				"調案單" : "待處理-調案申請待核示",
				"專案管制" : "待處理-專案申請待核示",
				"延後歸檔" : "待處理-延後歸檔申請待核示"
				   
				  
							 
						
			   
				 
			},
			"單位已逾期" : {
				CountByOU : true ,
				CountByUser : false,
				//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求
				//Prog : "ODR242",
				Prog : "ODR242",
				Delay: true
			},
			"單位2天內即將逾期" : {
				CountByOU : true ,
				CountByUser : false,
				//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求
				//Prog : "ODR241",
				Prog : "ODR241",
				Delay: false,
				WDay : 2
			}
		
		},
		"單位登記桌" : {
			"待分辦" : {
				"主辦待分辦" : "待處理-主辦待分辦",
				"會辦待分辦" : "待處理-會辦待分辦",
				"分會待分辦" : "待處理-分會待分辦",
				"後會待分辦" : "待處理-後會待分辦"
			},
			"待送文" : {
				"主辦待送文" : "待處理-主辦待送文",
				"會辦待送文" : "待處理-會辦待送文",
				"後會待送文" : "待處理-後會待送文",
				"外會中" : "待處理-會簽中"
			},
			"單位發文" : "待處理-單位發文",
			"陳北辦" : {
				"陳核北辦" : "待處理-陳核北辦",
				"會辦陳核北辦" : "待處理-會辦陳核北辦"
			},
			"(本部各單位)待核示" : "待處理-待核示",
			"單位已逾期" : {
				CountByOU : true ,
				CountByUser : false,
				Prog : "ODR242",
				Delay: true
			},
			"單位2天內即將逾期" : {
				CountByOU : true ,
				CountByUser : false,
				Prog : "ODR241",
				Delay: false,
				WDay : 2
			},
		},
		"總收文" : {
			"待分文" : {
				Prog : "EDT131",
				OU_ID: "91",
				ROLE_ID: "OD91",
				URL: _WSServerHost + "/ODDEP/ODT130.aspx"
			},
			"待改分/銷號(各單位)" : "待處理-待改分銷號"
		},
		"總發文" : {
			"待派繕" : "待處理-待派繕",
			"待繕印" : "待處理-待繕印",
			"待發文" : "待處理-待發文",
			"發文完成待歸檔" : "待處理-發文完成待歸檔"
		},
		"檔管人員" : {
			"調案待登錄" : "待處理-調案待登錄",
			"待點收" : {
				Prog : "AKT116",
				URL: _WSServerHost + "/AK/AKT116.aspx"
			}
		},
		"承辦人" : {
			"主辦待處理" : "待處理-主辦",
			"受會待處理" : {
				"同科內會" : "待處理-同科內會",
				"同單位內會" : "待處理-內會",
				"受會" : "待處理-受會",
				"分會" : "待處理-分會",
				"後會" : "待處理-後會"
			},
			"已核定" : {
				"待發文" : "已辦畢-已核定待發文",
				"待歸檔" : "已辦畢-結案未歸檔"
			},
			"會核中" : {
				"主辦" : "會核中-主辦",
				"分會" : "會核中-分會"
			},
			"已逾期" : {
				CountByOU : false ,
				CountByUser : true,
				Prog : "ODR242",
				Delay: true
			},
			"2天內即將逾期" : {
				CountByOU : false ,
				CountByUser : true,
				Prog : "ODR241",
				Delay: false,
				WDay : 2
			},
			"申請中表單" : {
				CountBy : {
					folder : "通知",
					Filter : /^通知\S+申請$/
				},
				Prog : "EDR482",
				URL: _WSServerHost + "/ED/ED4/EDR482.aspx"
			},
			"原卷調案未歸還" : {
				Prog : "AKS502",
				URL: _WSServerHost + "/AK/AKS502.aspx"
			}
		},
		"研考人員" : {
			"全校已逾期" : {
				CountByOU : false ,
				CountByUser : false,
				Prog : "ODR242",
				Delay: true
			},
			"全校即將逾期" : {
				CountByOU : false ,
				CountByUser : false,
				Prog : "ODR241",
				Delay: false,
				WDay : 2
			}
		}
	};
	
	if(_CustomMPSetting != null){
		SSO_CONFIG.MPSetting = _CustomMPSetting;
		SSO_CONFIG.CountRoleBySet = false;
	}

	//1140814	Leslie[1140873]	新增客製化設定
	theCustom.CustomSet = {
		HidePAWhenCountZero : 'Y',	//1140814	Leslie[1140873]	可完全隱藏無件數的個人專區
	}
	
	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_NCHU.js").finish();
})();