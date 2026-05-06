// 客製化功能 for 台南護專
/*
  Date		SA		PG			NO			Desc
  1090508   david	cloud		--          台南護專
  1091015	Leslie	Leslie		1090719		新增客製化登出函式
*/
(function() {	
	
	let strLogoutUrl = "https://edap2-1.doc.ntin.edu.tw/Shibboleth.sso/Logout"; //登出後導向此頁面
	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[台南護專] 載入文稿完成...");
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
	//1050829 Cloud	增加支援案次號
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
			//1061220 	Cloud 	1061230		紀錄異動前的分類號/案次號/保存年限-custom.js查詢前紀錄
			//var clsNo = dm.text("//分類號");
			//var caseNo = dm.text("//案次號");
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
		//1090101 David 分類案次查詢，一律傳入年度號
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
	
	//1091015	Leslie[1090719]	新增客製化登出函式
	window.CustomLogout = function(){
		location.assign(strLogoutUrl);
	}
	
	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_NTIN.js").finish();
})();