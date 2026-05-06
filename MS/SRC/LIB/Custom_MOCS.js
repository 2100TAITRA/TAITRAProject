// 客製化功能 for MOCS
/*
Date	SA		PG		NO			Desc
1110923	David	David	-------		新增銓敘部CustomJS
1110924	David	David	1110882		新增決行層級連動預排流程功能
1110927	Leslie	Leslie	1110889		新增客製化MP欄位設定
1111012	Leslie	Leslie	1110865		新增「參考附件」的客製化設定
1111124	Leslie	Leslie	1111127		新增可支援MP的文字圖示設定
1111124	Leslie	Leslie	1110920		新增可設定顯示併案的來文機關
1120502	Leslie	Leslie	1120007		彙整表序194-改為啟用二層式公文夾，並新增待辦件數的"待處理"
1130117	David	David	1121045		新增決行方式連動處理
*/

(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[MOCS客製化] 載入文稿完成...");
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
		.register(CUSTOM.CHANGE, "決行層次",Common.fnAppLvlModify)//1110924 David 1110882 新增決行層次連動處理
		.register(CUSTOM.CHANGE, "決行方式",Common.fnAppModeModify)//1130117 David 1121045 新增決行方式連動處理
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
	//開啟EAC005功能
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
		//分類案次查詢，一律傳入年度號
		strQry +="&FILE_YEAR="+year;
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
		"待處理" : {
			RoleSet : {
				RoleList : ['OD01','OD02','OD03','OD04','OD05','OD06','OD07','OD08','OD09','OD10','OD11','OD12'],
			},
			CountSet : {
				"待處理":"待處理",
			}
		},
		"主管" : {
			RoleSet : {
				RoleList : ['OD01','OD02','OD03','OD04','OD05','OD06','OD07','OD08','OD09','OD10','OD11','OD12','OD13','OD14','OD15','OD18','OD19','OD20','OD21','OD22','OD23','OD24','OD25','OD26','OD27','OD28','OD29'],
			},
			CountSet : {
				"主辦待核示公文" : "待處理-待核示",
				"會辦待核示公文" : "待處理-會辦待核示",
				"分會待核示公文" : "待處理-分會待核示",
				"後會待核示公文" : "待處理-後會待核示",
				"內會待核示公文" : "待處理-內會待核示",
				"待補閱公文" : "待處理-待補閱",
				"待補陳公文" : "待處理-待補陳",
				"主辦待分辦公文" : "待處理-主辦待分辦",
				"會辦待分辦公文" : "待處理-會辦待分辦",
				"分會待分辦公文" : "待處理-分會待分辦",
				"內會待分辦公文" : "待處理-內會待分辦",
				"後會待分辦公文" : "待處理-後會待分辦",
				"展期單待簽核" : "待處理-展期申請待核示",
				"改分單(改分及銷號單)待簽核" : "待處理-改分銷號申請待核示",
				"調整速別待簽核" : "待處理-速別變更申請待核示",
				"調案單待簽核" : "待處理-調案申請待核示",
				"專案管制待簽核" : "待處理-專案申請待核示",
				"延後歸檔待簽核" : "待處理-延後歸檔申請待核示",
				"覆閱公文通知" : "通知-覆閱",		//考試院需求新增		
				
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
				}
			}
		},
		"單位登記桌" : {
			RoleSet : {
				RoleList : ['OD17'],
			},
			CountSet : {
				"主辦待分辦公文" : "待處理-主辦待分辦",
				"會辦待分辦公文" : "待處理-會辦待分辦",
				"分會待分辦公文" : "待處理-分會待分辦",
				"後會待分辦公文" : "待處理-後會待分辦",
				"主辦待送文公文" : "待處理-主辦待送文",
				"會辦待送文公文" : "待處理-會辦待送文",
				"後會待送文公文" : "待處理-後會待送文",
				"外會中公文" : "待處理-會簽中",
				"單位發文公文" : "待處理-單位發文",
				"待核示紙本公文" : "待處理-待核示",
				
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
			}
		},
		"總收文" : {
			RoleSet : {
				RoleList : ['OD91'],
			},
			CountSet : {
				"待分文公文" : {
					Prog : "EDT131",
					OU_ID: "91",
					ROLE_ID: "OD91",
					URL: _WSServerHost + "/ODDEP/ODT130.aspx"
				},
				"待改分/銷號(各單位)公文" : "待處理-待改分銷號"
			}
		},
		"總發文" : {
			RoleSet : {
				RoleList : ['OD94'],
			},
			CountSet : {
				"待繕印公文" : "待處理-待繕印",
				"待監印公文" : "待處理-待監印",
				"待發文公文" : "待處理-待發文",
				"發文完成待歸檔公文" : "待處理-發文完成待歸檔"
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
				"主辦待處理公文" : "待處理-主辦",
				"同科內會待處理公文" : "待處理-同科內會",
				"同單位內會待處理公文" : "待處理-內會",
				"受會待處理公文" : "待處理-受會",
				"分會待處理公文" : "待處理-分會",
				"後會待處理公文" : "待處理-後會",
				"已核定待發文公文" : "已辦畢-已核定待發文",
				"已核定待歸檔公文" : "已辦畢-結案未歸檔",
				"線上簽核草稿公文" : "草稿-線上簽核",
				"紙本簽核草稿公文" : "草稿-紙本簽核",
				"會核中主辦公文" : "會核中-主辦",
				"會核中分會公文" : "會核中-分會",
				"逾期未歸檔公文" : "通知-逾期未歸檔",	//考試院需求新增
				"覆閱公文通知" : "通知-覆閱",			//考試院需求新增	
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
		}
	};
	
	if(_CustomMPSetting != null){
		SSO_CONFIG.MPSetting = _CustomMPSetting;
		SSO_CONFIG.CountRoleBySet = true;
	}
	
	//1110922	Leslie[1110889]	新增by機關的客製化設定
	//顯示欄位：速別、燈號、密等、類型、閱讀、辦理期限、文號、來文機關(新增)、主旨、報送案別(新增)、承辦單位、承辦人、現在位置(新增)、關鍵字(新增)、列管類別(新增，顯示代碼)。
	theCustom.CustomSet = {
		CustomTodoSet : ['speed','light','secret','signType','signTime','dueDate','docNo','fromOrg','fromSubject','taType','ICUserName','currLocate','keyWord','MOCSdocPty','newTime'],
		ExtentRefAttTag : 'Y',	//1111011	Leslie[1110865]	新增「參考附件」是否展開附件頁簽的客製化設定
		DisplayDeletedRefAtt : 'Y',	//1111011	Leslie[1110865]	新增「參考附件」是否顯示已刪除附件的客製化設定
		TodoListWordIcon : 'Y',	//1111124	Leslie[1111127]	MP待辦清單改為文字圖示顯示
		DocTagWithFromOrgName : 'Y',	//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
		Enable2LayerFolder : 'Y',	//1120502	Leslie	彙整表序194-改為啟用二層式公文夾，並新增待辦件數的"待處理"
	}
	
	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_MOCS.js").finish();
})();