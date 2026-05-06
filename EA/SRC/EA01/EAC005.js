/***************************************************************************************************************
* Date		SA		PRG		MGR_NO  DESC 
* 0961212	Stella	Stella	001671  修改案次號需支援ODC010查詢
* 0980206	--		Leslie	0971172 暫存資訊改以隱藏欄位存放
* 0990654	Zola	Howard	0990654 修改取得案次號時,多回傳分類號給ODC010
* 1020401	David	David	0990654	(MERGE)修改取得案次號時,多回傳年度號及保存年限供公文製作使用
* 1041120   Cloud   Kenny   1040921 (Merge 1010877)最底層分類號增加子視窗顯示內容描述以及清理處置
* 1050712	Cloud	Kevin_C	1050087	升二代
* 1050725	David	David	1050087	ODC010回傳值處理
* 1050815	Cloud	Cloud	1050087	修改支援EAC005回傳
* 1050829	Cloud	Cloud	1050087	修改支援案次號回傳
 //	1051019	Leslie	Joe		1050087	二代修改配合行動平台
* 1060504	CLOUD	Cloud	1050784	修改分類號支援多筆使用單位設定
* 1060908   CLOUD	Cloud	--		成大增加案次號，必須點擊案次號才做回傳
* 1060920	Cloud	Cloud	1060888	效能調教
* 1071122	Cloud	Cloud	--		修改承辦人僅能點選最底層回傳
* 1080122   Cloud   Cloud   1080049 弱掃修改
* 1081022   Cloud     Zen   1080887 (中興大學)滑鼠移至分類號時懸浮視窗顯示該分類號之內容描述 
* 1090303	Cloud	Cloud	1081109 非公文製作一律使用案次號查詢模式-回傳行為改由另一欄位紀錄
* 1100305   Zen     Zen		1100243 以500筆資料切分Json字串，避免Chrome瀏覽器崩潰
* 1100507   Zen     Zen		1100243 修正衍生之預覽、案名表功能鍵產生報表錯誤之問題
* 1131108   Cloud   Cloud	北榮序364 修正無清理處置按鈕問題
* 1131114	Cloud   Cloud	-- 		  修正傳錯鍵值問題
* 1140604	Cloud	Andy	1140150	退輔會新增匯出EXCEL、ODS功能
***************************************************************************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;


var SPLIT=":";
var bShowTreeView=true;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050712	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050815	Cloud 1050087	升級二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1060504	CLOUD	Cloud	1050784	修改分類號支援多筆使用單位設定
	if (document.all.H_txDeptNo.value != "")//承辦人開啟
	{
		document.all.tbver.className = 'hide';
		if (document.all.sethight)
			document.all.userclasstr.style.height = "100px";
	}
	else
	{
		document.all.userclasstr.style.display = "none";
	}

    //1081022 Zen 1080887 (中興大學)滑鼠移至分類號時懸浮視窗顯示該分類號之內容描述
	var strTitleAttribute = '';
	if (document.all['H_txOrgNickname'].value == 'NCHU')
	    strTitleAttribute = 'description';

	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		    //1081022 Zen 1080887 (中興大學)滑鼠移至分類號時懸浮視窗顯示該分類號之內容描述
            , key: {
                title: strTitleAttribute
			}
		},
		view: {
			/*addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,*/
			//addDiyDom: addDiyDom
			// 1131108    Cloud	北榮序364 修正無清理處置按鈕問題
			addDiyDom: addDiyDom
		},
		callback: {

			//beforeClick: ProgBeforeClick,
			onClick: RtnValue
		}
	};

    //1100305 Zen 1100243 以500筆資料切分Json字串，避免Chrome瀏覽器崩潰
	if (document.all['H_JsonData000'])
	    document.all['H_JsonData'].value = document.all['H_JsonData000'].value;

	//1100507 Zen 1100243 修正衍生之預覽、案名表功能鍵產生報表錯誤之問題
	//if (document.all.H_JsonData.value != "")
	if (document.all.H_JsonData.value != "" && document.all['H_JsonData000'])
	{
	    //1080122   Cloud    1080049 弱掃修改

	    document.all.H_JsonData.value = document.all.H_JsonData.value.replace(/&quot;/g, "\"");
	    var zNodes = JSON.parse('[' + document.all.H_JsonData.value + ']');

	    //1100305 Zen 1100243 以500筆資料切分Json字串，避免Chrome瀏覽器崩潰
	    var nJsonDataCnt = document.all['H_JsonDataCnt'].value;
	    for (let i = 1; i <= nJsonDataCnt; i++)
	    {
	        let idx = jf_PADL(i + '', 3, '0');

	        document.all['H_JsonData' + idx].value = document.all['H_JsonData' + idx].value.replace(/&quot;/g, "\"");
	        zNodes = zNodes.concat(JSON.parse('[' + document.all['H_JsonData' + idx].value + ']'));
	    }

		$.fn.zTree.init($("#Classtree"), setting, zNodes);
		//1060920 Cloud 校能調教-s
		/*$('#txSearchData').bind('change keyup', txFilterKeyup)
							.on('compositionstart', function ()
							{
								$(this).prop('comStart', true);								
							})
							.on('compositionend', function ()
							{
								$(this).prop('comStart', false);
								$(this).trigger("change");
							});*/
		$('#txSearchData').bind('change keyup', txFilterKeyup)
							.on('compositionstart', function(){
								$(this).prop('comStart', true);
								
							})
							.on('compositionend', function(){
								$(this).prop('comStart', false);
								$(this).trigger("change");
							});
		//1060920 Cloud 校能調教-e					
		$('#txSearchData').val(document.all.H_txFileCls.value).trigger('change');
		//* 1071122	Cloud	修改承辦人僅能點選最底層回傳
		//document.all.H_txDeptNo.value = "";
	}
	SetHideValue();
	SAMLartStr=fnGetArtifact();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050712	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050712	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
	/*
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit();	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;
			
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			break;
			
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["txCls_No"].focus();
			break;
			*/
		case "btSearch":
			//按下查詢鍵->清空點選紀錄(點選20之紀錄再按下30查詢時不應該出現)
			//document.EAC005.action="EAC005.aspx";
			document.all.EAC005.action="EAC005.aspx";
			//點選查詢鍵：清空上一次點選的節點資料
			document.all["H_Selected"].value = "";

			IsServerHandling = true;
			Page_BlockSubmit = false;
			//1050712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);

			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;		
		case "btPreview2":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1140604	Andy	1140150	退輔會新增匯出EXCEL、ODS功能
		case "btExcel":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btODS":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
/*
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txKeyFld"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		document.all["txKeyFld"].focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
*/

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{

}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	/*
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
		*/
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function ClsRtnValue(argVerNo,argClsNo,argClsName,argClsKey,argKeepYear)
{
	//if(document.all.nFROM.value=="ODC010")
	//0980206	Leslie[0971172]	暫存資訊改以隱藏欄位存放
	if(document.all["H_txNFROM"].value=="ODC010")
	{
		//1050725 David 1050087 ODC010回傳值處理
	    /*fnSetMsg("CLS_NO", argClsNo);
	    fnSetMsg("KEEP_YEAR", argKeepYear);
	    close();*/
		var $rtnClsNo = parent.$("#txRtnClsNo");
		var $rtnKeepYear = parent.$("#txRtnKeepYear");
		$rtnClsNo.val(argClsNo);
		$rtnKeepYear.val(argKeepYear);
		var $dlg = parent.$("#ODC010_CLSNO_DIV");
		var $btn = $dlg.find("a#Dlg_close_btn");
		$btn.click();
	}
	//1050815 Cloud 1050087	升級二代-公文製作頁面呼叫
	else if(document.all["H_txNFROM"].value=="Custom")
	{
		var rtnobj = 
		{
			"argClsNo":argClsNo,
			"argKeepYear":argKeepYear,
		};
		parent.$("#extdlg_close_btn").trigger("click",rtnobj);
	}
	else
	{   
		opener.document.all.lbReturnValue.length = 7;
		opener.document.all.lbReturnValue.options[0].value = "";
		opener.document.all.lbReturnValue.options[1].value  = argClsNo;
		opener.document.all.lbReturnValue.options[2].value  = "";
		opener.document.all.lbReturnValue.options[3].value = "";
		opener.document.all.lbReturnValue.options[4].value  = argClsKey;
		opener.document.all.lbReturnValue.options[5].value  = argVerNo;
		opener.document.all.lbReturnValue.options[6].value  = argClsName;
		opener.window.CallBack("EAC005");
		close();    
	}
}

//1020401 David 0990654 修改取得案次號時,多回傳年度號及保存年限供公文製作使用
//function CaseRtnValue(argVerNo,argClsKey,argClsName,argClsNo,argCaseNo,argCaseYear,argCaseKey)
function CaseRtnValue(argVerNo,argClsKey,argClsName,argClsNo,argCaseNo,argCaseYear,argCaseKey,argKeepYear)
{
	//0961211 Stella 修改案次號需支援ODC010查詢
	//if(document.all.nFROM.value=="ODC010")
	//0980206	Leslie[0971172]	暫存資訊改以隱藏欄位存放
	if(document.all["H_txNFROM"].value=="ODC010")
	{
		//1050725 David 1050087 ODC010回傳值處理
		/*//0990920	Howard 0990654	修改取得案次號時,多回傳分類號給ODC010
		fnSetMsg("CLS_NO", argClsNo);
	    fnSetMsg("FILE_CASE", argCaseNo);
	    //1020401 David 0990654 修改取得案次號時,多回傳年度號及保存年限供公文製作使用
	    fnSetMsg("FILE_YEAR", argCaseYear);
	    fnSetMsg("KEEP_YEAR", argKeepYear);
	    close();*/
		var $rtnClsNo = parent.$("#txRtnClsNo");
		var $rtnFileCase = parent.$("#txRtnFileCase");
		var $rtnKeepYear = parent.$("#txRtnKeepYear");
		$rtnClsNo.val(argClsNo);
		$rtnFileCase.val(argCaseNo);
		$rtnKeepYear.val(argKeepYear);
		var $dlg = parent.$("#ODC010_FILECASE_DIV");
		var $btn = $dlg.find("a#Dlg_close_btn");
		$btn.click();
	}
	//* 1050829	Cloud 1050087	修改支援案次號回傳
	else if(document.all["H_txNFROM"].value=="Custom")
	{
		var rtnobj = 
		{
			"argClsNo":argClsNo,
			"argKeepYear":argKeepYear,
			"argCaseNo":argCaseNo,
			"argFileYear":argCaseYear,
		};
		parent.$("#extdlg_close_btn").trigger("click",rtnobj);
	}
	else
	{ 
	opener.document.all.lbReturnValue.length = 7;
	opener.document.all.lbReturnValue.options[0].value = argCaseYear;
	opener.document.all.lbReturnValue.options[1].value  = argClsNo;
	opener.document.all.lbReturnValue.options[2].value  = argCaseNo;
	opener.document.all.lbReturnValue.options[3].value = argCaseKey;
	opener.document.all.lbReturnValue.options[4].value  = argClsKey;
	opener.document.all.lbReturnValue.options[5].value  = argVerNo;
	opener.document.all.lbReturnValue.options[6].value  = argClsName;
	opener.window.CallBack("EAC005");
	close();    
	}
}



function TbOnBlur(argTb)
{
	//1060505 Cloud [1050784] 承辦人換條件不隱藏
	if (document.all.H_txDeptNo.value != "")
		return;
	//分類代碼
	if (argTb=="txClsNo")
	{		
		IsHideTreeView();
	}
	else if (argTb == "txVerNo")//版本別
	{	
		IsHideTreeView();
	}
	else if (argTb == "txYear")//年度號
	{	
		IsHideTreeView();
	}
	else if (argTb == "txCaseNo")//案次號
	{
		IsHideTreeView();
	}
	else if (argTb == "txClsCaseName")//類目名稱(案名)
	{
		IsHideTreeView();
	}

}


function IsHideTreeView()
{
	if (document.all["H_SelectedValue"].value != GetValue())//若查詢條件有變動-->TreeView隱藏起來,待按下postback才打開(ClientOnLoad)
	{
		bShowTreeView = false;//查詢條件變更
		document.all.Data.style.display = "none";
//		alert("IsHideTreeView()");
	}
}

function GetValue()
{
	
	return document.all["txVerNo"].value + SPLIT 
		+ document.all["txYear"].value + SPLIT 
		+ document.all["txClsNo"].value + SPLIT 
		+ document.all["txCaseNo"].value + SPLIT 
		+ document.all["txClsCaseName"].value;
}

function SetHideValue()
{
	document.all["H_SelectedValue"].value = GetValue();
}

/*
function GetClaName(argTb)
{
	var strYear  = document.all["txYear"].value;
	var strVerNo = document.all["txVerNo"].value;
	var strClsNo = document.all["txClsNo"].value;
	CurrentObjId = argTb;

	if (strClsNo=="")
	{
		document.all["txClsName"].value="";
		document.all["H_LastYear"].value = strYear;
		document.all["H_LastVerNo"].value = strVerNo;
		document.all["H_LastClsNo"].value = strClsNo;
		return false;
	}

	//是否右補0
	if (document.all["H_IsPAD"].value == "Y")
		document.all["txClsNo"].value = jf_PADR(document.all["txClsNo"].value,8,'0');

	//是否呼叫ws
	if (!IsFireOnblur(strYear, strVerNo, strClsNo))
		return;

	var param1 = new Array(3);
	param1[0] = strClsNo;
	param1[1] = strVerNo;
	param1[2] = strYear;
	//alert(strClsNo+'--'+strVerNo+'--'+strYear);
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);	
	iCallID_Cls = RtnObj.id;
	OnWSResult(RtnObj);
	alert("GetClaName");
	return true;
}
*/

function fnSetMsg(argName,argValue)
{
	var artifact = fnGetArtifact();
	if(!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return false;	
	}
	document.all.IEControl.SetMsg(argName,argValue)
	return true;
}

var SAMLartStr;
function fnGetArtifact()
{
	return document.all.SsoArtifact.value;
	return;
}
//1041120	Kenny	[1040921]	(Merge 1010877)最底層分類號增加按鈕顯示清理處置以及內容描述
function ShowClsInfo(argClsKey)
{
	Page_BlockSubmit=true;						
	strUrl = "EAC005C1.aspx?SAMLart="+document.all["H_SAMLart"].value+"&PRIMARY_KEY="+argClsKey
	jf_OpenChildWin(strUrl, "EAC005C1", 700, 500 );	
}
//1060504	CLOUD	Cloud	1050784	修改分類號支援多筆使用單位設定-s
//1061002 Cloud 1060888 效能調教
var searchTimeout;
var slastKey="";
var bFirstSearch = true;
function txFilterKeyup(event)
{
	//中文輸入未完成時，不做查詢
	if ($(this).prop('comStart'))
	{
		return;
	}

		//1061002 Cloud 1060888 效能調教-加上TimeOut行為，以避免連續輸入時Lag
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(function()
	{
			//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
			//if ($('#txSearchData').val().length >= 1) 
			if (document.all.txSearchData.value.length >= 1){
				//1060928 Cloud 效能調教
				//ProgShowAll();
				//var zTree = $.fn.zTree.getZTreeObj("Classtree");
				//var nodes = zTree.getNodes();
				//var slastKey = $('#txSearchData').jqmData('last_key');//				
				if (!!slastKey && slastKey.length) {
					slastKey = slastKey.toLowerCase();
				}
				else {
					slastKey = '';
				}
				//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
				//var sFilter = $('#txSearchData')[0].value;
				var sFilter = document.all.txSearchData.value;

				if (!sFilter || (typeof sFilter != 'string')) {
					sFilter = '';
				}
				else {
					sFilter = sFilter.toLowerCase();
				}
				if(bFirstSearch)
				{
					//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
					//slastKey = $('#txSearchData')[0].value;//
					slastKey = document.all.txSearchData.value;//
				}

				if (sFilter==slastKey && !bFirstSearch) {
					return;
				}
				else {
					if(bFirstSearch)
					{
						var zTree = $.fn.zTree.getZTreeObj("Classtree");
						var nodes = zTree.getNodes();
						ProgShowAll();
		ProgFilter(nodes[0]);
						bFirstSearch = false;
		zTree.expandAll(true);
	}
					else
					{
						var $tbObj;
						//if(sFilter == sFilter.substring(0,slastKey.length-1))//以前次紀錄字串長度，切割完全相同時則以已展開的樹狀進行搜尋
						//if(sFilter.indexOf(slastKey) != -1)
						if(sFilter.indexOf(slastKey) != -1 && sFilter.length>slastKey.length)
						{
							//$tbObj = $('#Classtree');
							$tbObj = $('#Classtree li:visible')
							//var allText = $tbObj.text().toLowerCase();
							//var arTbText = allText.split('§');
							$tbObj.css('display', 'none');
							//for(var idxTB = 0,idxMax = arTbText.length-1;idxTB < idxMax;idxTB++)
							for(var idxTB = 0,idxMax = $tbObj.length;idxTB < idxMax;idxTB++){
							
								//if(arTbText[idxTB].indexOf(sFilter) != -1)
								if($tbObj.eq(idxTB)[0].innerText.toLowerCase().indexOf(sFilter)!=-1)
									$tbObj.eq(idxTB).css('display', '');
							}
						}
						else
	{
							//有輸入但完全不同時，從根節點往下找
							var zTree = $.fn.zTree.getZTreeObj("Classtree");
							var nodes = zTree.getNodes();
							slastKey = $('#txSearchData')[0].value;
							ProgShowAll();
							ProgFilter(nodes[0]);			
							zTree.expandAll(true);
						}						
					}
				}
				//ProgFilter(nodes[0]);
				//zTree.expandAll(true);
			}
			else if ($('#txSearchData').val().length == 0) {
		ProgShowAll();

		var zTree = $.fn.zTree.getZTreeObj("Classtree");

		var node = zTree.getNodeByParam("id", "-1", null);

		zTree.expandNode(node, false, true, false);
		zTree.expandNode(node, true, false, false);
	}
		},500);
}
function ProgFilter(node)
{
	var result = false;
		//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
        //if (node.name.toUpperCase().indexOf($('#txSearchData').val().toUpperCase()) > -1) {
		if (node.name.toUpperCase().indexOf(document.all.txSearchData.value.toUpperCase()) > -1) {
		result = true;
	}

        if (!result && node.children) {
            for (var i = 0; i < node.children.length; i++) {
			var isTrue = ProgFilter(node.children[i]);

			if (isTrue)
				result = true;
		}
	}

	if (!result)
		$.fn.zTree.getZTreeObj("Classtree").hideNode(node);

	return result;
}
function ProgShowAll()
{
	var zTree = $.fn.zTree.getZTreeObj("Classtree");

	nodes = zTree.getNodesByParam("isHidden", true);
	zTree.showNodes(nodes);
}
function RtnValue(event, treeId, treeNode)
{
	var Ingo = treeNode.INFO.split('|');	
	//1060908 Cloud 修正可回傳非最下層分類號問題
	//if ((document.all.H_txDeptNo.value != "" && treeNode.IS_LOWEST != "0") || document.all.H_txDeptNo.value == "")//承辦人僅能回傳底層 //檔管人員都可回傳
	//1060908 Cloud 案次號查詢時，點選案次號才做回傳
	//1090303	Cloud	1081109 改用另一欄位紀錄開啟模式-判斷由公文製作開啟時，依原行為判斷
	if (document.all["H_txDeptNo"].value != "")
	{
		if (document.all["H_txMode"].value == "2" && treeNode.TYPE == "CLS")
		{
			alert('非點選案次號，請點選案次號資料。');
			return;
		}
	}
	else//檔管相關作業改由另一欄位判斷
	{
		if (document.all["H_ActiveWorkMode"].value == "2" && treeNode.TYPE == "CLS")
		{
			alert('非點選案次號，請點選案次號資料。');
			return;
		}
		if (document.all["H_ActiveWorkMode"].value == "1" && treeNode.TYPE != "CLS")
		{
			alert('非點選分類號，請點選分類號資料。');
			return;
		}
	}
	//* 1071122	Cloud	修改承辦人僅能點選最底層回傳
	if ((document.all.H_txDeptNo.value != "" && (treeNode.IS_LOWEST == "1"  || treeNode.IS_LOWEST =="" )) || document.all.H_txDeptNo.value == "")//承辦人僅能回傳底層 //檔管人員都可回傳
	{
	
		if (treeNode.TYPE == "CLS")//從CASE_YEAR判斷是否為案次號
			ClsRtnValue(Ingo[0], Ingo[1], Ingo[2], Ingo[3], Ingo[5]);
		else		
			CaseRtnValue(Ingo[0], Ingo[8], Ingo[4], Ingo[7], Ingo[1], Ingo[6], Ingo[3], Ingo[5])
	}
	
}
//1060504	CLOUD	Cloud	1050784	修改分類號支援多筆使用單位設定-e
// 1131108    Cloud	北榮序364 修正無清理處置按鈕問題
function addDiyDom(treeId, treeNode) {
	if (treeNode.IS_LOWEST == "1")
	{
		var aObj = $("#" + treeNode.tId);
		var Ingo = treeNode.INFO.split('|');
		if(treeNode.TYPE == "CLS")
			//* 1131114	Cloud  北榮序376  修正傳錯鍵值問題
			//aObj.append("</A><A href='javascript:ShowClsInfo("+Ingo[8]+")'><IMG ALIGN=ABSMIDDLE SRC='../../../STDN/IMAGE/HELPFILE_E.gif' title='內容描述及清理處置' WIDTH=16 HEIGHT=16 BORDER=0>");
			aObj.append("</A><A href='javascript:ShowClsInfo("+Ingo[3]+")'><IMG ALIGN=ABSMIDDLE SRC='../../../STDN/IMAGE/HELPFILE_E.gif' title='內容描述及清理處置' WIDTH=16 HEIGHT=16 BORDER=0>");
	}
}
