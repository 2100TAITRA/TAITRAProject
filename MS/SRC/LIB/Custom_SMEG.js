// 客製化功能 for 信保基金
/*
Date	SA		PG		NO			Desc
1130322	David	David	1120976		新增信保分層負責欄位相關功能
1130503	David	David	1120976		信保分層負責代碼連動處理改為使用公文的承辦單位代碼
*/

(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[信保基金] 載入文稿完成...");
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
		.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCls)//檢核分類號
		.register(CUSTOM.POPUP, "分層負責核決層級",Common.fnInitAppLvlList)//1130322 David 1120976 新增分層負責核決層級點選處理
		.register(CUSTOM.CHANGE, "分層負責代碼",Common.fnCheckAppLvl)//1130322 David 1120976 新增分層負責代碼連動處理
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
	//分類號查詢
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
		//1100408 David 1100192 需由分類號帶出保存年限，且有對應的保存年限時才帶入
		if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && rtnvalue.argKeepYear != "")
			theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
	})
	//案次號查詢
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
			//紀錄異動前的分類號/案次號/保存年限-custom.js查詢前紀錄
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
	//1130322 David 1120976 新增分層負責代碼查詢
	theCustom.register(CUSTOM.SHOWDLG, "分層負責代碼", "查詢", function(dm) {
		let strAppLvlResp = "";
		try {
			strAppLvlResp = dm.text("//分層負責代碼");
		}
		catch(e) {
			alert(e.message);
		}

		//1130503 David 1120976 改為使用公文的承辦單位代碼
		//var strQry = "?nFrom=Custom&Mode=3&DeptNo="+theUserInfo.DepartID;
		let strQry = "?nFrom=Custom&Mode=3&DeptNo="+theAOL.docObj.ODWMSG.INCHARGE_OU;
		return "../../ED/ED0/EDC024.aspx"+strQry;
	}, "1024px", "768px", function(param,para,r) 
	{
		//para.$para.closest('.pg').find("[aid='分層負責代碼']").trigger("focus");
		theCustom.setValue("分層負責代碼",r.argRespNo,true);
		para.$para.closest('.pg').find("[aid='分層負責代碼']").blur();
	})

	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_SMEG.js").finish();
})();