// 客製化功能 for HAC
/*
Date	SA		PG		NO			Desc
1081008	Kevin	Joe		1080339		jQuery升級3.4.1
1090102	David	David	1090001		分類案次查詢，一律傳入年度號
1100324	David	David	1090836		新增核判區分連動處理
1110823	Leslie	Leslie	1110652		新增客製化待辦統計設定
1120927	Leslie	Leslie	1111383		客委會增加客製化功能：燈號統計排除重覆公文
*/

(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[HAC客製化] 載入文稿完成...");
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
				//1060105 Cloud	調整不異動
				//{fldName: "聯絡電話", callback: Common.fnChangeOrgTel},
				//{fldName: "分機", callback: Common.fnChangeOrgExt},
				//{fldName: "傳真", callback: Common.fnChangeOrgFax},
				//{fldName: "Email", callback: Common.fnChangeOrgEmail},
				{fldName: "發文字", callback: Common.fnChangeOrgIssueWord}
			]
		)
		.register(CUSTOM.POPUP, "署名1",Common.fnInitSign)//建立署名初始選單
		.register(CUSTOM.POPUP, "署名2", Common.fnInitSign2)//建立署名2初始選單
		.register(CUSTOM.POPUP, "速別", Common.fnInitSpd)//建立速別初始選單
		.register(CUSTOM.CHANGE, "核判區分", Common.fnAppRoleCheck)//1100324 David 1090836 新增核判區分連動處理
	});
	//1050815 Cloud	增加開啟EAC005功能
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
	
	//1110823	Leslie[1110652]	新增客製化統計設定
	var _WSServerHost = window.location.protocol + '//' + window.location.hostname;
	var _CustomMPSetting = {
		'參事以上長官':{
			RoleSet : {
				RoleList : ['OD01','OD02','OD03','OD04','OD05','OD06'],
				//OuList : ['']
			},
			CountSet : {
				'待辦公文' : '待處理-主辦',
				'待批核公文' : '待處理-待核示',
				'機關已逾期公文' : {
					CountByOU : false ,
					CountByUser : false,
					Prog : 'ODR242',
					Delay: true
				},
				'待複閱公文' : '通知-回閱',
			}
		},
		'參事以上長官登記桌' : {
			RoleSet : {
				RoleList : ['OD17'],
				OuList : ['95','96','97','98','99']
			},
			CountSet : {
				'待辦公文' : '待處理-待送文',
			}
		},
		'單位主管' : {
			RoleSet : {
				RoleList : ['OD11','OD12','OD13','OD21','OD22','OD23']	
			},
			CountSet : {
				'待辦公文' : '待處理-主辦',
				'待批核公文' : '待處理-待核示',
				'單位已逾期公文' : {
					CountByOU : true ,
					CountByUser : false,
					Prog : 'ODR242',
					Delay: true
				},
				'單位3日內將逾期公文' : {
					CountByOU : true ,
					CountByUser : false,
					Prog : 'ODR241',
					Delay: false,
					WDay : 3
				},
				'待複閱公文' : '通知-回閱',				
			}
		},
		'單位登記桌' : {
			RoleSet : {
				RoleList : ['OD16','OD17']
			},
			CountSet : {
				'登記桌待辦公文' : ['待處理-主辦待分辦','待處理-會辦待分辦','待處理-分會待分辦','待處理-後會待分辦','待處理-主辦待送文','待處理-會辦待送文','待處理-後會待送文'],
				'單位已逾期公文' : {
					CountByOU : true ,
					CountByUser : false,
					Prog : 'ODR242',
					Delay: true
				},
				'單位3日內將逾期公文' : {
					CountByOU : true ,
					CountByUser : false,
					Prog : 'ODR241',
					Delay: false,
					WDay : 3
				},
			}
		},
		'總收' : {
			RoleSet : {
				RoleList : ['OD91']
			},
			CountSet : {
				'總收文待辦公文' : {
					Prog : 'ODT130',
					URL: _WSServerHost + '/ODDEP/ODT130.aspx'
				},
			}
		},
		'總發' : {
			RoleSet : {
				RoleList : ['OD94']
			},
			CountSet : {
				'總發文待辦公文' : ['待處理-待發文','待處理-待發文（電）']
			}
		},
		'檔管人員' : {
			RoleSet : {
				RoleList : ['OD95']
			},
			CountSet : {
				'待點收公文' : {
					Prog : 'AKT116',
					URL: _WSServerHost + '/AK/AKT116.aspx'
				},
				'待編目公文' : {
					Prog : 'AKM330',
					URL: _WSServerHost + '/AK/AKM330.aspx'
				}
			}
		},
		'承辦人' : {
			RoleSet : {
				RoleList : ['OD99']
			},
			CountSet : {
				'待辦公文' : '待處理-主辦',
				'已逾期公文' : {
					CountByOU : false ,
					CountByUser : true,
					Prog : 'ODR242',
					Delay: true
				},
				'3日內將逾期公文' : {
					CountByOU : false ,
					CountByUser : true,
					Prog : 'ODR241',
					Delay: false,
					WDay : 3
				},
			}
		},
	};
	if(_CustomMPSetting != null){
		SSO_CONFIG.MPSetting = _CustomMPSetting;
		SSO_CONFIG.CountRoleBySet = true;
	}
	//1120927	Leslie[1111383]	客委會增加客製化功能：燈號統計排除重覆公文
	theCustom.CustomSet = {
		DistinctMPLight : true,
	};
	
	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_HAC.js").finish();
})();