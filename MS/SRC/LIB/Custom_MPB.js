// 客製化功能 for 航港局
//
/*	Date	SA 		PG 		MGR_NO		DESC
	1071102 Cloud	Cloud	1071076		新增案次號查詢按鈕
	1080215	David	David	1080180		分類、案次號的檢核，皆透過案次號檢核處理
	1081008	Kevin	Joe		1080339		jQuery升級3.4.1
	1090102	David	David	1090001		分類案次查詢，一律傳入年度號
	1130828	David	David	1130690		新增「公文擬辦方式」、「陳核日期」、「承辦單位」欄位連動功能
*/
var gCustomdm;
var bHasCase = true;
(function()
 {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[航港局客製化] 載入文稿完成...");
		var dec;
		
		this
		.register(CUSTOM.CHANGE, "密等", Common.fnSecModify )//密等連動解密條件
		//1080215 David 1080180 分類、案次號的檢核，皆透過案次號檢核處理
		//.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCls)//檢核分類號
		.register(CUSTOM.CHANGE, "分類號",Common.fnCheckCase)
		.register(CUSTOM.CHANGE, "保存年限",Common.fnCheckKeepYear)//檢核保存年限
		.register(CUSTOM.CHANGE, "解密條件或保密期限",Common.fnExtransecCondModify)//切換解密條件
		.register(CUSTOM.INIT, "發文機關",Common.fnInitIssueSoureOrg)//發文機關選單建立
		.register
		(CUSTOM.REFRESH, "發文機關", 
			[	// 發文機關異動時連動以下欄位
				
				{fldName: "地址", callback: Common.fnChangeOrgAddress},
				{fldName: "署名1", callback: Common.fnChangeOrgSign },
				{fldName: "發文字", callback: Common.fnChangeOrgIssueWord},
				{fldName: "承辦單位", callback: Common.fnChangeDeptname}
			]
		)
		.register(CUSTOM.POPUP, "署名1",Common.fnInitSign)//建立署名初始選單
		.register(CUSTOM.POPUP, "署名2", Common.fnInitSign2)//建立署名2初始選單
		.register(CUSTOM.POPUP, "速別", Common.fnInitSpd)//建立速別初始選單	
		//1071102 Cloud	1071076	保留案次號檢核功能
		.register(CUSTOM.CHANGE, "案次號",Common.fnCheckCase)//檢核案次號
		//1130828 David 1130690 新增「公文擬辦方式」、「陳核日期」、「承辦單位」欄位連動功能
		.register(CUSTOM.CHANGE, "公文擬辦方式",Common.fnChangeProcessType)
		.register(CUSTOM.CHANGE, "陳核日期",Common.fnChangeSubmissionDate)
		.register(CUSTOM.CHANGE, "承辦單位",Common.fnChangeDraftOuName)
	});
	//gCustomdm = theAol
	
	
	//1050815 Cloud	增加開啟EAC005功能
	//1071102 Cloud	1071076	航港局，分類號/案次號查詢皆改為查詢案次號-s
	/*theCustom.register(CUSTOM.SHOWDLG, "分類號", "查詢", function(dm) {
		try {
			var clsNo = dm.text("//分類號");
		}
		catch(e) {
			alert(e.message);
		}
		var strQry = "?SAMLart="+theUserInfo.Artifact;
		strQry +="&DEPT_NO="+theUserInfo.DepartID;
		strQry +="&nFrom=Custom";
		strQry +="&MODE=1";
		strQry +="&FILE_CLS="+clsNo;
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		para.$para.closest('.pg').find("[aid='分類號']").focus();
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
	})*/
	theCustom.register(CUSTOM.SHOWDLG, "分類號", "查詢", function(dm) {
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

	bHasCase = true;
	try {
		
		var clsNo = oldClsVal = dm.text("//分類號");
		var caseNo = oldCaseVal = "";
		oldKeepYearVal = dm.text("//保存年限");
		
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
		//1090102 David 1090001 分類案次查詢，一律傳入年度號
		//strQry +="&FILE_YEAR="+(year-1911);
		strQry +="&FILE_YEAR="+year;
		return "../../EA/EA01/EAC005.aspx"+strQry;
	}, "1024px", "768px", function(param,para,rtnvalue) 
	{
		theCustom.setValue("分類號",rtnvalue.argClsNo,true);
		theCustom.setValue("保存年限",rtnvalue.argKeepYear,true);
		//1081008	Joe		1080339		jQuery升級3.4.1
		// para.$para.closest('.pg').find("[aid='分類號']").focus();
		para.$para.closest('.pg').find("[aid='分類號']").trigger("focus");
		if(bHasCase)
		{
			theCustom.setValue("年度號",rtnvalue.argFileYear,true);
			theCustom.setValue("案次號",rtnvalue.argCaseNo,true);
			//1081008	Joe		1080339		jQuery升級3.4.1
			// para.$para.closest('.pg').find("[aid='案次號']").focus();
			para.$para.closest('.pg').find("[aid='案次號']").trigger("focus");
		}
	})
	//1071102 Cloud	1071076	航港局，分類號/案次號查詢皆改為查詢案次號-e
	
	//1071102 Cloud	1071076		新增案次號查詢按鈕-S
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
		//1060111	Cloud	1060017 	增加案次號異動回寫基資功能
		//1081008	Joe		1080339		jQuery升級3.4.1
		// para.$para.closest('.pg').find("[aid='案次號']").focus();
		para.$para.closest('.pg').find("[aid='案次號']").trigger("focus");
	})
	//1071102 Cloud	1071076		新增案次號查詢按鈕-E
	
	//1120509	Leslie	webForm預設成藍底模式
	localStorage.webform_color = 'LB';
	
	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_MPB.js").finish();
})();