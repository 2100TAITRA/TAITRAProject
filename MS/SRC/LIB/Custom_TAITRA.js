// 客製化功能 for 退輔會
/*
Date	SA		PG		NO			Desc
1141009	David	David	1141012		外貿建置案
*/

(function() {	
	theCustom.register(CUSTOM.LOAD, function(dm) 
	{
		console.log("[TAITRA客製化] 載入文稿完成...");
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

	// 支援動態載入
    if(window.theModMgr != undefined)
        window.theModMgr.install("Custom_TAITRA.js").finish();
})();