// 客製化功能 for 領務局
/*
Date	SA		PG		NO			Desc
1120602	David	David	-------		領務局二代升級
1121027	David	David	-------		新增領務局客製化發文機關連動發文字功能
1121130	David	David	-------		(問題彙整表序334)修正分類號檢核WS錯誤問題
1121222	Leslie	Leslie	-------		驗收項目序32-新增客製化可設定功能鍵(限三個)
1121222	Leslie	Leslie	-------		驗收項目序31-新增客製化可設定預設的創稿簽核類型
1121222	Leslie	Leslie	-------		驗收項目序43-新增客製化可設定留存自訂範本時，是否保留受文者資訊
*/
var bHasCase = true;
(function() {
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[BOCA客製化] 載入文稿完成...");
		var dec;
		
		this
		.register(CUSTOM.CHANGE, "密等", Common.fnSecModify )//密等連動解密條件
		//1121130 David 修正分類號檢核WS錯誤問題
		//.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCase)
		.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCls)
		.register(CUSTOM.CHANGE, "保存年限",Common.fnCheckKeepYear)//檢核保存年限
		.register(CUSTOM.CHANGE, "解密條件或保密期限",Common.fnExtransecCondModify)//切換解密條件
		.register(CUSTOM.INIT, "發文機關",Common.fnInitIssueSoureOrg)//發文機關選單建立
		.register
		(CUSTOM.REFRESH, "發文機關", 
			[	// 發文機關異動時連動以下欄位
				{fldName: "地址", callback: Common.fnChangeOrgAddress}
				,{fldName: "署名1", callback: Common.fnChangeOrgSign }
				,{fldName: "發文字", callback: Common.fnChangeOrgIssueWord}//1121027 David 新增領務局客製化發文機關連動發文字功能
			]
		)
		.register(CUSTOM.POPUP, "署名1",Common.fnInitSign)//建立署名初始選單
		.register(CUSTOM.POPUP, "署名2", Common.fnInitSign2)//建立署名2初始選單
		.register(CUSTOM.POPUP, "速別", Common.fnInitSpd)//建立速別初始選單	
		.register(CUSTOM.CHANGE, "案次號",Common.fnCheckCase)//檢核案次號
	});

	theCustom.register(CUSTOM.SHOWDLG, "分類號", "查詢", function(dm){
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
		bHasCase = true;
		try {
			var caseNo = oldCaseVal = "";
			
			try 
			{caseNo = oldCaseVal = dm.text("//案次號");}
			catch(e)
			{
				bHasCase = false;
			}
		}
		catch(e) {
			alert(e.message);
		}
		var strQry = "?SAMLart="+theUserInfo.Artifact;
		strQry +="&DEPT_NO="+theUserInfo.DepartID;
		strQry +="&nFrom=Custom";
		if(bHasCase)
			strQry +="&MODE=2";
		else
			strQry +="&MODE=1";
		strQry +="&FILE_CLS="+clsNo;
		if(bHasCase)
			strQry +="&FILE_CASE="+caseNo;
		strQry +="&FILE_YEAR="+year;//分類案次查詢，一律傳入年度號
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
		para.$para.closest('.pg').find("[aid='分類號']").trigger("focus");
		if(bHasCase)
		{
			theCustom.setValue("年度號",rtnvalue.argFileYear,true);
			theCustom.setValue("案次號",rtnvalue.argCaseNo,true);
			para.$para.closest('.pg').find("[aid='案次號']").trigger("focus");
		}
	})
	theCustom.register(CUSTOM.SHOWDLG, "案次號", "查詢", function(dm) {
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
	
	//1121222	Leslie[卡驗收序32]	新增客製化可設定功能鍵(限三個)
	theCustom.CustomSet = {
		CustomBtnSet : [
			{id:"reqDocNo",		name:"取號",	vis:"onReqDocNoVisible",	fn:"onReqDocNo"},
			{id:"printFolio",	name:"列印",	vis:"onPrintFolioVisible",	fn:"onPrintFolio"},
			{id:"changePpr",	name:"轉紙本",	vis:"onChangePprVisible",	fn:"onChangePpr"},
		],
		//1121222	Leslie[卡驗收序31]	驗收項目序31-新增客製化可設定預設的創稿簽核類型
		draftDefaultSignType : 'P',
		//1121222	Leslie[驗收項目序43]	新增客製化可設定留存自訂範本時，是否保留受文者資訊
		keepCustomSampleIssuerList : true,
		CheckSCardModuleInfoAfterPinCode : true,	//1130905	Leslie[中榮序215]	新增背景傳送模式可依設定，於PinCode後再檢核「SCardModuleInfo」
	};

	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_BOCA.js").finish();
})();