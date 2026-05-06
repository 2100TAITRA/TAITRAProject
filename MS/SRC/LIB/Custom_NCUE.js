// 客製化功能 for 彰師大
/*
Date	SA		PG		NO			Desc
1110620	David	David	1110547		彰師大二代升級
1110816	Leslie	Leslie	1110787		彰師大整合登入修改
*/

(function() {	
	
	//1110816	Leslie[1110787]	經SSO重新導向的整合登入時，要叫用此網址做登出
	let strLogoutUrl = "https ://apss.ncue.edu.tw/sso/AGLogout.php?target=";

	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[NCUE客製化] 載入文稿完成...");
		var dec;

		this
		.register(CUSTOM.CHANGE, "密等", Common.fnSecModify )//密等連動解密條件
		.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCls)//檢核分類號
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

		var strQry = "?SAMLart="+theUserInfo.Artifact;
		strQry +="&DEPT_NO="+theUserInfo.DepartID;
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
	
	//1110816	Leslie[1110787]	客製化登出邏輯
	window.CustomLogout = function(){
		let loginPage = SSO_CONFIG.LoginPage;
		let url_path = location.pathname.substr(0, location.pathname.lastIndexOf('/'));
		let loginPagePathName = url_path + '/' + loginPage;
		var newLocation = location.origin + loginPagePathName;
		
		if('fromSSO' in window.localStorage){
			window.localStorage.removeItem('fromSSO');
			$.ajax({
				type:"POST",
				url:strLogoutUrl + newLocation,
				contentType:"application/json; charset=utf-8",
				dataType:"text"
			});
			location.assign(newLocation);
		}else{
			//window.opener =null; window.open('','_top','');window.close ();
			open('', '_self', '').close();
		}
	}
	
	//1110914	Leslie[1110652]	移植客製化設定至此
	var _WSServerHost = window.location.protocol + '//' + window.location.hostname;
	var _CustomMPSetting = {
		"主管" : {
				"主辦待核示" : "待處理-待核示",
				"會辦待核示" : "待處理-會辦待核示",
				"分會待核示" : "待處理-分會待核示",
				"後會待核示" : "待處理-後會待核示",
				"內會待核示" : "待處理-內會待核示",
				"校長待核示" : "待處理-校長待核示",
				"林副座待核示" : "待處理-林副座待核示",
				"曾副座待核示" : "待處理-曾副座待核示",
				"專委待核示" : "待處理-專委待核示",
				"一層決行待核示" : "待處理-一層決行待核示",
				"重要緊急待核示" : "待處理-重要緊急待核示",
				"人事待核示" : "待處理-人事待核示",
				"經費待核示" : "待處理-經費待核示",
				"空間待核示" : "待處理-空間待核示",
				"其他待核示" : "待處理-其他待核示",
				"經費待核示" : "待處理-經費待核示",
				"採購修繕待核示" : "待處理-採購修繕待核示",
				"開會通知待核示" : "待處理-開會通知待核示",
				"國際合作待核示" : "待處理-國際合作待核示",
				"會議記錄待核示" : "待處理-會議記錄待核示",
				"法規修訂待核示" : "待處理-法規修訂待核示",
				"待補閱" : "待處理-待補閱",
				"待補陳" : "待處理-待補陳",			
				"主辦待分辦" : "待處理-主辦待分辦",
				"會辦待分辦" : "待處理-會辦待分辦",
				"分會待分辦" : "待處理-分會待分辦",
				"內會待分辦" : "待處理-內會待分辦",
				"後會待分辦" : "待處理-後會待分辦",			
				"展期單" : "待處理-展期申請待核示",
				"改分單(改分及銷號單)" : "待處理-改分銷號申請待核示",
				"調整速別" : "待處理-速別變更申請待核示",
				"調案單" : "待處理-調案申請待核示",
				"專案管制" : "待處理-專案申請待核示",
				"延後歸檔" : "待處理-延後歸檔申請待核示",
				"回閱" : {
					Type: "TODO",
					Folder: "通知-回閱",
					filter: "signTime",
					value: "",
					equal: true,
				},
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
			//1110624	Leslie[1110630]	系統首頁「待辦件數」主管群組下的增修需求
			"單位承辦公文" : {
				CountByOU : true ,	//1110719	Leslie	補上設定，以避免有長官角色但未扮演承辦人角色時出現異常
				Prog : "EDI244",
				Delay: false,
				WDay : -1
			},
		},
		"單位登記桌" : {
			"待分辦公文件數" : {
				"主辦待分辦" : "待處理-主辦待分辦",
				"會辦待分辦" : "待處理-會辦待分辦",
				"分會待分辦" : "待處理-分會待分辦",
				"內會待分辦" : "待處理-內會待分辦",
				"後會待分辦" : "待處理-後會待分辦"
			},
			"待送文公文件數" : {
				"主辦待送文" : "待處理-主辦待送文",
				"會辦待送文" : "待處理-會辦待送文",
				"內會待送文" : "待處理-內會待送文",
				"分會待送文" : "待處理-分會待送文",
				"後會待送文" : "待處理-後會待送文",
				"外會中" : "待處理-會簽中"
			},
			"單位發文" : "待處理-單位發文",
			"陳北辦" : {
				"陳核北辦" : "待處理-陳核北辦",
				"會辦陳核北辦" : "待處理-會辦陳核北辦"
			},
			"(本校各單位)待核示" : "待處理-待核示",
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
				"待發文" : "已辦畢-辦畢待發文",
				"待歸檔" : "已辦畢-續辦未歸檔",
				"待歸檔" : "已辦畢-結案未歸檔"
			},
			"草稿" : {
				"紙本簽核" : "草稿-紙本簽核",
				"線上簽核" : "草稿-線上簽核"
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
	
	if(_CustomMPSetting != null)
		SSO_CONFIG.MPSetting = _CustomMPSetting;	

	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_NCUE.js").finish();
})();