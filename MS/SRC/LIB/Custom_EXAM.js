// 客製化功能 for 高雄大學
/*
Date	SA		PG		NO			Desc
1110221	David	David	1101455		考試院建置
1110624	Leslie	Leslie	1110629		新增by機關的客製化設定
1111122 Kevin	Kevin	1111287		考試院新增顯示流程欄位
1120320	Leslie	Leslie	1111127		[Merge]新增可支援MP的文字圖示設定
1131024	Leslie	Leslie	1130784		考試院新增「待處理-待銷號」件數設定
1140505	Kevin	Leslie	1140556		取消網址參數權杖
*/

(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[EXAM客製化] 載入文稿完成...");
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
				{fldName: "地址", callback: Common.fnChangeOrgAddress}
				,{fldName: "署名1", callback: Common.fnChangeOrgSign }
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
		//有年度號優先使用，其次依公文號前三碼使用，皆無時依目前年度使用
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

		//1140505	Leslie[1140556]	取消網址參數權杖
		// var strQry = "?SAMLart="+theUserInfo.Artifact;
		var strQry = "?DEPT_NO="+theUserInfo.DepartID;
		strQry +="&nFrom=Custom";
		strQry +="&MODE=1";
		strQry +="&FILE_CLS="+clsNo;
		strQry +="&FILE_YEAR="+year;//分類案次查詢，一律傳入年度號
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		para.$para.closest('.pg').find("[aid='分類號']").trigger("focus");
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		//需由分類號帶出保存年限，且有對應的保存年限時才帶入
		if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && rtnvalue.argKeepYear != "")
			theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
	})
	//支援案次號
	theCustom.register(CUSTOM.SHOWDLG, "案次號", "查詢", function(dm) {
		var today = new Date();
		//有年度號優先使用，其次依公文號前三碼使用，皆無時依目前年度使用
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
			//錄異動前的分類號/案次號/保存年限-custom.js查詢前紀錄
			var clsNo = oldClsVal = dm.text("//分類號");
			var caseNo = oldCaseVal = dm.text("//案次號");
			oldKeepYearVal = dm.text("//保存年限");
		}
		catch(e) {
			alert(e.message);
		}
		//1140505	Leslie[1140556]	取消網址參數權杖
		// var strQry = "?SAMLart="+theUserInfo.Artifact;
		var strQry = "?DEPT_NO="+theUserInfo.DepartID;
		strQry +="&nFrom=Custom";
		strQry +="&MODE=2";
		strQry +="&FILE_CLS="+clsNo;
		strQry +="&FILE_CASE="+caseNo;
		//分類案次查詢，一律傳入年度號
		strQry +="&FILE_YEAR="+year;
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		theCustom.setValue("案次號",rtnvalue.argCaseNo,true);
		//需由分類號帶出保存年限，且有對應的保存年限時才帶入
		if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && rtnvalue.argKeepYear != "")
			theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
		theCustom.setValue("年度號",rtnvalue.argFileYear,true);
		para.$para.closest('.pg').find("[aid='案次號']").trigger("focus");
	})

	//1110624	Leslie[1110629]	新增by機關的客製化設定
	theCustom.CustomSet = {
		QueryDocMenu : '我的收藏',
		QueryDocMenuIcon : 'IconFolder',
		DisableTodoCntUnRead : 'Y',
		CustomPincodeWord : '請輸入憑證密碼',
		//1111122 Kevin	1111287 考試院新增顯示流程欄位
		//顯示欄位：速別、燈號、密等、類型、公文性質、辦理期限、文號、承辦單位、承辦人、送文單位、主旨、目前位置、流程、送方傳送時間
		CustomTodoSet : ['speed','light','secret','signType','docPtyName','dueDate','docNo','ICOUName','ICUserName','fromOUName','fromSubject','currLocate','docProc','newTime'],
		TodoListWordIcon : 'Y',	//1111124	Leslie[1111127]	MP待辦清單改為文字圖示顯示
	}
	
	//1110914	Leslie[1110652]	移植客製化設定至此
	var _WSServerHost = window.location.protocol + '//' + window.location.hostname;
	var _CustomMPSetting = {
		"主管" : {
			"單位待處理公文" : "待處理-待核示",
			"會辦待處理公文" : "待處理-會辦待核示",
			"分會待處理公文" : "待處理-分會待核示",
			"後會待處理公文" : "待處理-後會待核示",
			"內會待處理公文" : "待處理-內會待核示",
			"待補閱公文" : "待處理-待補閱",
			"待補陳公文" : "待處理-待補陳",
			"主辦待分辦公文" : "待處理-主辦待分辦",
			"會辦待分辦公文" : "待處理-會辦待分辦",
			"分會待分辦公文" : "待處理-分會待分辦",
			"內會待分辦公文" : "待處理-內會待分辦",
			"後會待分辦公文" : "待處理-後會待分辦",
			"待簽核展期單" : "待處理-展期申請待核示",
			"待簽核改分或銷號單" : "待處理-改分銷號申請待核示",
			"待簽核分文請示單" : "待處理-分文請示待核示",
			"待簽核調整速別" : "待處理-速別變更申請待核示",
			"待簽核調案單" : "待處理-調案申請待核示",
			"待簽核專案管制" : "待處理-專案申請待核示",
			"待簽核延後歸檔" : "待處理-延後歸檔申請待核示",
			"待覆閱公文(含代理)" : "通知-覆閱",
			"單位已逾期" : {
				CountByOU : true ,
				CountByUser : false,
				//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求																						  
				//Prog : "ODR242",
				Prog : "EDI244",
				Delay: true					
			},
			"單位2天內即將逾期" : {
				CountByOU : true ,
				CountByUser : false,
				//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求																						  
				//Prog : "ODR241",
				Prog : "EDI244",					
				Delay: false,
				WDay : 2
			},
			//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求
			"單位承辦公文" : {
				CountByOU : true ,
				Prog : "EDI244",
				Delay: false,
				WDay : -1
			},
		},
		"單位登記桌" : {
			"主辦待分辦公文" : "待處理-主辦待分辦",
			"會辦待分辦公文" : "待處理-會辦待分辦",
			"分會待分辦公文" : "待處理-分會待分辦",
			"後會待分辦公文" : "待處理-後會待分辦",
			"主辦待送文公文" : "待處理-主辦待送文",
			"單位受會公文" : "待處理-單位受會",
			"後會待送文公文" : "待處理-後會待送文",
			"外會中公文" : "待處理-會簽中",
			"單位發文公文" : "待處理-單位發文",
			"待核示紙本公文" : "待處理-待核示",
			"待覆閱紙本公文" : "待處理-待覆閱",
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
			"待分文公文" : {
				Prog : "EDT131",
				OU_ID: "91",
				ROLE_ID: "OD91",
				URL: _WSServerHost + "/ODDEP/ODT130.aspx"
			},
			"待改分/銷號(各單位)公文" : "待處理-待改分銷號"
		},
		"總發文" : {
			"待繕校公文" : "待處理-待繕校",
			"待監印公文" : "待處理-待監印",
			"待發文公文" : "待處理-待發文",
			"發文完成待歸檔公文" : "待處理-發文完成待歸檔"
		},
		"檔管人員" : {
			"調案待登錄" : "待處理-調案申請核可待登錄",
			"待點收公文" : {
				Prog : "AKT116",
				URL: _WSServerHost + "/AK/AKT116.aspx"
			}
		},
		"承辦人" : {
			"主辦待處理公文" : "待處理-主辦",
			"同科內會待處理公文" : "待處理-同科內會",
			"同單位內會待處理公文" : "待處理-內會",
			"受會待處理公文" : "待處理-受會",
			"分會待處理公文" : "待處理-分會",
			"後會待處理公文" : "待處理-後會",
			"已核定待發文公文" : "已辦畢-已核定待發文",
			"已結案待歸檔公文" : "已辦畢-結案未歸檔",
			"線上簽核草稿公文" : "草稿-線上簽核",
			"紙本簽核草稿公文" : "草稿-紙本簽核",
			"會簽或陳核中公文" : "會核中-主辦",
			"分會中公文" : "會核中-分會",
			"逾期未歸檔公文" : "通知-逾期未歸檔",	//考試院需求新增
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
			//1131024	Leslie	Leslie	1130784		考試院新增「待處理-待銷號」件數設定
			"待銷號" : "待處理-待銷號",
			"已逾期" : {
				CountByOU : false ,
				CountByUser : false,
				Prog : "ODR242",
				Delay: true
			},
			"即將逾期" : {
				CountByOU : false ,
				CountByUser : false,
				Prog : "ODR241",
				Delay: false,
				WDay : 2
			}
		}
	};
	
	if(_CustomMPSetting != null)
		SSO_CONFIG.MPSetting = _CustomMPSetting;	


	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_EXAM.js").finish();
})();