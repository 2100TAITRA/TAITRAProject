// 客製化功能 for 北榮
/*
Date	SA		PG		NO			Desc
1130719	David	David	1130454		北榮二代升級
1130223	Leslie	Leslie	1120883		[中榮]新增依設定顯示是否有待補簽公文，並提供點擊後開啟IFT940
1130502	Leslie	Leslie	中榮序91	登入時預設Folder
1130614	Leslie	Leslie	中榮序128	[上線需求序11] 新增客製化設定以強制公文開啟狀態下，點擊「公文檢索」時開啟為半開模式
1141023	Leslie	Leslie	1140849		MP列表的選取底色
1141030	Leslie	David	1140855		新增北榮稿件決行層次處理
*/

(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[TPVGH客製化] 載入文稿完成...");
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
		//1141030 David 1140855 新增北榮稿件決行層次處理
		.register(CUSTOM.CHANGE, "決行層次",Common.fnTPVGHAppLvlModify)
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

	//1120502	Leslie	彙整表序194-改為客製化設定，才能新增"待處理"項目
	var _WSServerHost = window.location.protocol + '//' + window.location.hostname;
	var _CustomMPSetting = {
		"公文夾" : {
			RoleSet : {
				RoleList : ['OD01','OD02','OD03','OD04','OD05','OD06','OD07','OD08','OD09','OD10','OD11','OD12','OD13','OD14','OD15','OD18','OD19','OD20','OD21','OD22','OD23','OD24','OD25','OD26','OD27','OD28','OD29'],
			},
			CountSet : {
				"待處理公文":"待處理",
			}
		},
		"主管" : {
			RoleSet : {
				RoleList : ['OD01','OD02','OD03','OD04','OD05','OD06','OD07','OD08','OD09','OD10','OD11','OD12','OD13','OD14','OD15','OD18','OD19','OD20','OD21','OD22','OD23','OD24','OD25','OD26','OD27','OD28','OD29'],
			},
			CountSet : {
				"急件待核示" : "待處理-急件待核示",
				"待處理待核示" : "待處理-待核示",
				"會辦待核示" : "待處理-會辦待核示",
				"分會待核示" : "待處理-分會待核示",
				"後會待核示" : "待處理-後會待核示",
				"內會待核示" : "待處理-內會待核示",
				"待核稿" : "待處理-待核稿",
				"待核稿" : "待處理-待核稿1",
				"待核稿" : "待處理-待核稿2",
				"補陳中" : "待處理-補陳中",
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
					CountByOU : true ,	//1110719	Leslie	補上設定，以避免有長官角色但未扮演承辦人角色時出現異常
					Prog : "EDI244",
					Delay: false,
					WDay : -1
				}
			}
		},
		"單位登記桌" : {
			RoleSet : {
				RoleList : ['OD16','OD17'],
			},
			CountSet : {
				"主辦待分辦" : "待處理-主辦待分辦",
				"內會待分辦" : "待處理-內會待分辦",
				"會辦待分辦" : "待處理-會辦待分辦",
				"分會待分辦" : "待處理-分會待分辦",
				"後會待分辦" : "待處理-後會待分辦",
				"主辦待送文" : "待處理-主辦待送文",
				"會辦待送文" : "待處理-會辦待送文",
				"後會待送文" : "待處理-後會待送文",
				"展期單" : "待處理-展期申請待核示",
				"改分單(改分及銷號單)" : "待處理-改分銷號申請待核示",
				"調整速別" : "待處理-速別變更申請待核示",
				"調案單" : "待處理-調案申請待核示",
				"專案管制" : "待處理-專案申請待核示",
				"延後歸檔" : "待處理-延後歸檔申請待核示",
				"待分辦" : "待處理-待分辦",
				"待銷號" : "待處理-待銷號",
				"外會中" : "待處理-會簽中",
				"單位發文" : "待處理-單位發文",
				"待核示" : {
					Type: "TODO",
					Folder: "待處理-待核示",
					filter: "signType",
					value: "P",
					equal: true,
				},
				
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
				}
			}
		},
		"總收文" : {
			RoleSet : {
				RoleList : ['OD91'],
			},
			CountSet : {
				"待分文公文" : {
					Prog : "ODT130",
					OU_ID: "91",
					ROLE_ID: "OD91",
					URL: _WSServerHost + "/ODDEP/ODT130.aspx"
				},
				"待改分/銷號(各單位)" : "待處理-待改分銷號",
				"待銷號" : "待處理-待銷號"
			}
		},
		"總發文" : {
			RoleSet : {
				RoleList : ['OD94'],
			},
			CountSet : {
				"待繕印公文" : "待處理-待繕印",
				"待監印公文" : "待處理-待監印",
				"待發文公文" : "待處理-待發文"
			}
		},
		"檔管人員" : {
			RoleSet : {
				RoleList : ['OD95'],
			},
			CountSet : {
				"調案待登錄" : "待處理-調案申請核可待登錄",
				"待點收公文" : {
					Prog : "AKT116",
					URL: _WSServerHost + "/AK/AKT116.aspx"
				}
			}
		},
		"承辦人" : {
			RoleSet : {
				RoleList : ['OD99'],
			},
			CountSet : {
				"主辦" : "待處理-主辦",
				"內會" : "待處理-內會",
				"受會" : "待處理-受會",
				"分會" : "待處理-分會",
				"後會" : "待處理-後會",
				"待發文" : "已辦畢-已核定待發文",
				"待歸檔" : "已辦畢-結案未歸檔",
				"待發文" : "已辦畢-結案待發文",
				"草稿線上簽核" : "草稿-線上簽核",
				"草稿紙本簽核" : "草稿-紙本簽核",
				"會核中主辦" : "會核中-主辦",
				"會核中分會" : "會核中-分會",
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
			}
		},
		"研考人員" : {
			RoleSet : {
				RoleList : ['OD96'],
			},
			CountSet : {
				"全院已逾期" : {
					CountByOU : false ,
					CountByUser : false,
					Prog : "ODR242",
					Delay: true
				},
				"全院即將逾期" : {
					CountByOU : false ,
					CountByUser : false,
					Prog : "ODR241",
					Delay: false,
					WDay : 2
				}
			}
		},
		"回閱" : {
			RoleSet : {
				RoleList : ['OD01','OD02','OD03','OD04','OD05','OD06','OD07','OD08','OD09','OD10','OD11','OD12','OD13','OD14','OD15','OD18','OD19','OD20','OD21','OD22','OD23','OD24','OD25','OD26','OD27','OD28','OD29','OD99'],
			},
			CountSet : {
				"待回閱" : {
					Type: "TODO",
					Folder: "通知-回閱"
					}
			}
		}
	};

	if(_CustomMPSetting != null){
		SSO_CONFIG.MPSetting = _CustomMPSetting;
		SSO_CONFIG.CountRoleBySet = true;
	}
	
	theCustom.CustomSet = {
		ShowUnReSignCnt : false,		//1130223	Leslie[1120883]	新增依設定顯示是否有待補簽公文，並提供點擊後開啟IFT940
		Enable2LayerFolder : 'Y',	//1120502	Leslie	彙整表序194-改為啟用二層式公文夾，並新增待辦件數的"待處理"
		DefaultFolderByLogin : '待處理',	//1130502	Leslie	中榮，登入時預設Folder
		MpEnableFullTrClick : 'Y',	//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
		TabAKI800WithSideMode : true,	//1130614	Leslie[中榮序128]	[上線需求序11] 新增客製化設定以強制公文開啟狀態下，點擊「公文檢索」時開啟為半開模式
		CheckSCardModuleInfoAfterPinCode : true,	//1130923	Leslie[中榮序215]	新增背景傳送模式可依設定，於PinCode後再檢核「SCardModuleInfo」
                DisableTodoCntUnRead  : 'Y', //Leslie 1110629 引用考試院不顯示未閱讀
				DefaultAttPageByColor : true,   //預設轉彩色
				CustomBtnSet : [
			
			{id:"printFolio",	name:"列印",	vis:"onPrintFolioVisible",	fn:"onPrintFolio"},
			
		],
		MPListSelectedColor: '#FFFF00',		//1141023	Leslie[1140849]	MP列表的選取底色
	}
	
	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_TPVGH.js").finish();
})();