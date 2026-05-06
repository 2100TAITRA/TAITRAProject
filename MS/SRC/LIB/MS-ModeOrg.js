// 受文者修改子視窗功能模組(桌機版)
//	
/*DATE 		SA		PG		MGR_NO		DESC	
  1051109	CLOUD	Cloud	1050087		修正因受文者編輯子視窗含附件按鈕ID更換此處配合修改-一併修正未依系統參數顯示電子郵件欄位問題
  1051208 	Cloud	Cloud	--			修正受文者群組切換本別時，不會異動底下受文者本別問題
  1051215	Cloud	--		--			補上人員選擇子視窗功能
  1060327 	Cloud 	Cloud	1050802 	增加寫入內部單位代碼
  1060906 	Cloud	Cloud	1060763		增加有異動時，異動主視窗異動變數
  1070529	Cloud	Cloud	1070183		新增附件分繕功能
  1071008	Cloud	Cloud	--			修正沒有字典檔問題	
  1071011	Cloud	Cloud	--			修正當受文者不存在資料庫時，一代僅清空機關代碼、單位代碼，比照處理
										，一併增加清空sysid，以免從有=>無時因有sysid造成異常，基本資料調整為僅保留地址、郵遞區號、Email
  1080312	David	David	1080089		分繕表新增紀錄受文者全銜、姓名、編號資訊，調整程式邏輯
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1090219	David	Joe		1080764 	(Merge1070362)新增受文者時，如受文者不存在，跳出提醒視窗
  1090316	David	Joe		1090170		修正受文者資料不存在於DB時，應清空畫面上舊受文者資料
  1090424	David	Joe		1090170		問題定義修正，當受文者不存在於DB時，不清空畫面欄位
  1100506	Kevin	David	1100473		弱掃修正Client Potential XSS
  1100510	Kevin	David	1100221		支援jQuery3.5.1，調整jQuery.trim用法
  1110225	David	David	1101481		新增個人專區發文方式、考試院客製化人工傳遞處理
  1110816	David	Joe		--			修正單筆受文者選單順序
  1110901	David	Joe		1110615		受文者編輯相關UI調整
  1111020	David	Joe		--			判斷當查無機關資料時，將發文方式由公佈欄及電子交換換成郵寄
  1120524	David	Joe		1120213		修正單筆受文者也要合併受文者+姓名
  1130813	Ratmond	David	1130313		支援離線版調整程式邏輯
  1140728	David	David	1140381		新增附件分繕異動旗標判斷處理
*/
var gModIfyDeptNode;//現在修改的節點
var gModiWebServices;//此視窗用的WS物件
var indexOfModify;//異動的受文者的序
var indexOfGrpModify;//群組內受文者的序
var gModiDoctype;
var gModiMode;//判斷是哪個是窗開啟0:受文者編輯子視窗 1:群組編輯子視窗
var gModiOOrgName;//原名稱，無更動不觸發取得新受文者取得
var gModiSOrg;//使用者機關
var gModiDept;//使用者單位
var gModiUserID;//使用者ID
var gModiArtifact;//權杖
var gModiiBeSave;//判斷是否做過儲存
var gModiiSso;//SsoConfig
var gModiiactiveDept;//此頁面異動得node
var gModiGrpModeSeq;//單筆群組模式傳入的受文者列表的序
var gModidlg;
var gModiCount;
//1070529 Cloud 1070183 新增附件分繕-紀錄要清除分繕表的受文者
var bCheckAtt= false;
//1080312 David 1080089 紀錄是否有異動過正式名稱、全銜或姓名
var bModifyName = false;
var gSourceName = "";
var gSourceFullName = "";
var gSourceEmpName = "";
var gMoiSeq="";

function fnOpenModeOrg(argID,argModiMode,argDeptNode,argtheuserinfo,argWebServices,argSsoConfig,argMode,argDlg)
{
	if(argMode=="Org")//單筆時才需進行的邏輯
	{
		gModiCount = 1;
		gModiSOrg = theUserInfo.OrgID;
		gModiDept =	theUserInfo.DepartID
		gModiUserID	= theUserInfo.UserID;
		gModiArtifact = theUserInfo.Artifact;
		gModiWebServices = argWebServices;//WS物件，要靠這個才能呼叫WS
		gModiiBeSave = false;
		gModiMode = argModiMode;
		gModiiSso = argSsoConfig;
		gModiiactiveDept = argDeptNode;
		gModidlg = argDlg;
		//1070529 Cloud 1070183 新增附件分繕
		bCheckAtt= false;
		//1080312 David 1080089 初始處理
		bModifyName = false;
			
		indexOfModify = argID.split("_")[2];
		//argModiMode 用於分別是群組或是編輯子視窗開啟
		//1110225 David 1101481 考試院使用時調整發文方式顯示長度
		if(strOrgNickName == "EXAM")
			$('#Mode_dlDocIssueType').css("width","9em");

		if(argModiMode=="1")
		{
			indexOfGrpModify = argID.split("_")[3];
			indexOfGrpModify++;
			$("#receiverSetting").find(".ui-slide-pane-GRP").css("opacity","0.4");//隱藏原主子視窗
			gModIfyDeptNode = argDeptNode.find("受文者[序='"+argID.split("_")[2]+"_"+indexOfGrpModify+"']").clone();
		}
		else
		{
			indexOfModify++;//畫面id的INDEX是從0開始，所以需+1
			$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","0.4");//隱藏原主子視窗
			gModIfyDeptNode = argDeptNode.find("受文者[序='"+indexOfModify+"']").clone();
		}
		$("#receiverSetting").find(".ui-slide-pane-ModeOrg").addClass("ui-slide-pane-active");//顯示修改子視窗
		$("#receiverSetting").find(".ui-slide-pane-ModeOrg").css("width","65%");//顯示修改子視窗

		//開啟時設定資料至畫面
		gModiOOrgName = gModIfyDeptNode.find("正式名稱").text();//將原名稱存起來
		//1081008	Joe		1080339		jQuery升級3.4.1--S
		// $("#Mode_txOrgName").val(gModIfyDeptNode.find("正式名稱").text()).blur(fnTxModeOrgNameOnblur);
		// $("#Mode_txEmpName").val(gModIfyDeptNode.find("姓名").text()).blur(fnModeTxEmpNameOnblur);
		$("#Mode_txOrgName").val(gModIfyDeptNode.find("正式名稱").text()).on("blur", fnTxModeOrgNameOnblur);
		$("#Mode_txEmpName").val(gModIfyDeptNode.find("姓名").text()).on("blur", fnModeTxEmpNameOnblur);
		//1081008	Joe		1080339		jQuery升級3.4.1--E
		$("#Mode_txFullName").val(gModIfyDeptNode.find("全銜").text());
		//1080312 David 1080089 紀錄是否有異動過正式名稱、全銜或姓名
		//1081008	Joe		1080339		jQuery升級3.4.1--S
		// $("#Mode_txOrgName").bind("change",function(event) {bModifyName= true;});
		// $("#Mode_txEmpName").bind("change",function(event) {bModifyName= true;});
		// $("#Mode_txFullName").bind("change",function(event) {bModifyName= true;});
		$("#Mode_txOrgName").on("change",function(event) {bModifyName= true;});
		$("#Mode_txEmpName").on("change",function(event) {bModifyName= true;});
		$("#Mode_txFullName").on("change",function(event) {bModifyName= true;});
		//1081008	Joe		1080339		jQuery升級3.4.1--E

		//1080312 David 1080089 初始處理
		gSourceName = $("#Mode_txOrgName").val();
		gSourceFullName = $("#Mode_txFullName").val();
		gSourceEmpName = $("#Mode_txEmpName").val();

		$("#Mode_txOrgNo").val(gModIfyDeptNode.find("機關代碼").text());
		$("#Mode_txDeptNo").val(gModIfyDeptNode.find("單位代碼").text());
		ChangeDocTypeSelectList("Mode_dlDocType");//建立本別選單
		$("#Mode_dlDocType").val(gModIfyDeptNode.attr("本別"));
		//1080312 David 1080089 新增編號屬性
		gMoiSeq=gModIfyDeptNode.attr("編號");
		//1110225 David 1101481 調整發文方式選單處理邏輯
		/*$("#Mode_dlDocIssueType").children().remove();
		$("#Mode_dlDocIssueType").append(sendWays);*/
		fngolSetGrpdlDocIssueType("ModeOrg",gModIfyDeptNode.find("內部").text(),gModIfyDeptNode.find("機關代碼").text(),gModIfyDeptNode.find("海外單位").text(),gModIfyDeptNode.attr("本別"),"Mode_dlDocIssueType",gModIfyDeptNode.find("電子交換現況").text());
		
		if(gModIfyDeptNode.find("發文方式").text()!="")
			$("#Mode_dlDocIssueType").val(gModIfyDeptNode.find("發文方式").text());
		else
			$("#Mode_dlDocIssueType").val("郵寄");
		
		if(gModIfyDeptNode.find("含附件").text()=="是")
			$("#Mode_rbAttachYes").prop("checked",true);
		else
			$("#Mode_rbAttachNo").prop("checked",true);

		//1070529 Cloud 1070183 新增附件分繕-紀錄要清除分繕表的受文者
		//1081008	Joe		1080339		jQuery升級3.4.1--S
		// $("#Mode_rbAttachYes").bind("click",function(event) {bCheckAtt= true;});
		// $("#Mode_rbAttachNo").bind("click",function(event) {bCheckAtt= true;});
		$("#Mode_rbAttachYes").on("click",function(event) {bCheckAtt= true;});
		$("#Mode_rbAttachNo").on("click",function(event) {bCheckAtt= true;});
		//1081008	Joe		1080339		jQuery升級3.4.1--E
		
		$("#Mode_txZip").val(gModIfyDeptNode.find("郵遞區號").text());
		$("#Mode_txaddress").val(gModIfyDeptNode.find("地址").text());
		$("#Mode_txEmail").val(gModIfyDeptNode.find("Email").text());
		//1051109 Cloud	1050087 修正未依系統參數顯示電子郵件欄位問題
		if(strOdSupportEmail=="N" || strOdSupportEmail=="")
			$("#Mode_Email_info").css("display","none");
				
		$("#Mode_txOrgName").on("input",function() 
		{
			if($(this).prop('comStart')) return;	//中文輸入未完成時，不做查詢
			if( $(this).val()=="" || $(this).val().length < 2 )
				return;
			clearTimeout(searchTimeout);
			var that = this;
			searchTimeout = setTimeout(function(){
			var params = new SOAPClientParameters();
				params.add('argOrgNo', theUserInfo.OrgID);
				params.add('argQueryString', $("#Mode_txOrgName").val());
				theLogger.log("搜尋["+$(that).val()+"]");
				//1071008	Cloud	修正沒有字典檔問題
				params.add('argOwner', theUserInfo.UserID);
				SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetDictInfo", params ,true, 
				function(r)
					{
						//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序
						// theLogger.log("取得資料："+r.value.OrgName.length+","+r.value.OrgNo.length+","+r.value.SysId.length+"。");
						theLogger.log("取得資料："+r.value.OrgInfo.length + "。");
						theLogger.log(r.value);
						var availabelTags = new Array();
						var strTemp = $("#Mode_txOrgName").val();
						for(var vl in r.value){
							var vlObj = r.value[vl];
							//1081008	Joe		1080339		jQuery升級3.4.1
							// if($.type(vlObj) == "array"){
							if(Array.isArray(vlObj)){
								for(var i=0,o;o=vlObj[i];i++){
									//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序--S
									/*
									if(o.orgno != "")
										availabelTags.push(o.v+"（"+o.orgno+"）");
									else
										availabelTags.push(o.v);
									*/
									if(strOrgNickName == "SMEG" && o.Type == "SysId" && o.sys.Length == 7){
										availabelTags.push(o.v + "（"+o.sys+"）");
									}
									else{
										if(o.orgno && jf_DeptTrim(o.orgno)!= "")
											availabelTags.push(o.v+"（"+o.orgno+"）");
										else
											availabelTags.push(o.v);
									}
									//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序--E
								}
							}
						}
						$("#Mode_txOrgName").autocomplete({
							source:availabelTags,
							appendTo:"#ModeareaSearch",
							select: function(event,ui){
								if(ui.item.value.lastIndexOf("（")!=-1)
									ui.item.value = ui.item.value.substr(0,ui.item.value.lastIndexOf("（"));
								else
									ui.item.value = ui.item.value;
							}
						}).autocomplete( "search", strTemp );
					}
				)
			},300);	//TimeOut時間
		}).on('compositionstart', function(){
			$(this).prop('comStart', true);
			console.log('中文輸入，start');
		}).on('compositionend', function(){
			$(this).prop('comStart', false);
			console.log('中文輸入，end');
			$(this).trigger("input");
		});
		
		//1110901	Joe		1110615		處理各欄位高度
		if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y" )
			setTimeout(SetHeight,350);
	}
	else if(argMode=="Muit")//多筆時才需進行的邏輯
	{
		$("#receiverSetting").find(".ui-slide-pane-ModeOrg-Muit").addClass("ui-slide-pane-active");//顯示批次修改子視窗
		$("#receiverSetting").find(".ui-slide-pane-ModeOrg-Muit").css("width","35%");//顯示批次修改子視窗
		ChangeDocTypeSelectList("Muit_dlDocType");//建立本別選單
		//1110225 David 1101481 調整發文方式選單處理邏輯
		/*$("#Muit_dlDocIssueType").children().remove();
		$("#Muit_dlDocIssueType").append(sendWays);*/
		fngolSetGrpdlDocIssueType("Grp","","","","","Muit_dlDocIssueType","");//選單比照群組選單方式建立，僅判斷系統參數及環境變數

		//1110225 David 1101481 考試院使用時調整發文方式顯示長度
		if(strOrgNickName == "EXAM")
			$('#Muit_dlDocIssueType').css("width","9em");
	}
	else//單筆群組
	{
		gModiGrpModeSeq = argID;
		//群組開啟時，argID直接傳入XML內受文者列表所屬的序讀取對應資訊設定至畫面
		$("#receiverSetting").find(".ui-slide-pane-ModeOrg-GRP").addClass("ui-slide-pane-active");//顯示批次修改子視窗
		$("#receiverSetting").find(".ui-slide-pane-ModeOrg-GRP").css("width","35%");//顯示批次修改子視窗
		ChangeDocTypeSelectList("ModeGrp_dlDocType");//建立本別選單
		//1110225 David 1101481 調整發文方式選單處理邏輯
		/*$("#ModeGrp_dlDocIssueType").children().remove();
		$("#ModeGrp_dlDocIssueType").append("<OPTION value=''>不修正</OPTION>"+sendWays);*/
		fngolSetGrpdlDocIssueType("Grp","","","","","ModeGrp_dlDocIssueType","");//選單比照群組選單方式建立，僅判斷系統參數及環境變數
		//1110816	Joe		--		修正單筆受文者選單順序
		// $("#ModeGrp_dlDocIssueType").append("<OPTION value=''>不修正</OPTION>");
		$("#ModeGrp_dlDocIssueType").prepend("<OPTION value=''>不修正</OPTION>");
		$("#ModeGrp_dlDocIssueType")[0].selectedIndex = 0;
		$("#ModeGrp_OrgName").val(argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").attr("正式名稱"));
		$("#ModeGrp_FullName").val(argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").attr("全銜"));
		$("#ModeGrp_dlDocType").val(argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").attr("本別"));

		//1110225 David 1101481 考試院使用時調整發文方式顯示長度
		if(strOrgNickName == "EXAM")
			$('#ModeGrp_dlDocIssueType').css("width","9em");
	}

	//************************************************************註冊事件****************************************************//

	if(gModibInit==false)
	{
		//儲存按鈕
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Mode_btModeOrgSave").click(function() 
		$("#Mode_btModeOrgSave").on("click", function() 
		{
			fnModiSave();
			gModiiBeSave = true;
		});

		//放棄
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Mode_btModeOrgExit").click(function() 
		$("#Mode_btModeOrgExit").on("click", function() 
		{
			if(!gModiiBeSave)
			{
				if(confirm('"您是否要儲存已修改過的受文者資訊內容再離開？"'))
				{
					fnModiSave();
				}
				else
				{
					if(argModiMode=="1")//群組開啟回傳群組視窗
						fnRestGrpDept();
					else
						fnRestDept();
				}
			}
			else
			{
				if(argModiMode=="1")//群組開啟回傳群組視窗
					fnRestGrpDept();
				else
					fnRestDept();
			}
		});
		
		//保留姓名及正副本稱謂
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Mode_KeepName").click(function() {
		$("#Mode_KeepName").on("click", function() {
			if($("input#Mode_KeepName").prop("checked"))
				$("input#Mode_KeepName").prop("checked",false)
			else
				$("input#Mode_KeepName").prop("checked",true)
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Mode_cbKeepNamediv").click(function() {
		$("#Mode_cbKeepNamediv").on("click", function() {
			if($("input#Mode_KeepName").prop("checked"))
				$("input#Mode_KeepName").prop("checked",false)
			else
				$("input#Mode_KeepName").prop("checked",true)
		});
		
		//郵遞區號
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Mode_btQueryZip").click(function() {
		$("#Mode_btQueryZip").on("click", function() {
			window.open("http://www.post.gov.tw/post/internet/f_searchzone/index.jsp?ID=190102");
		});
		
		//多筆儲存按鈕
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Muit_btOrgSave").click(function() 
		$("#Muit_btOrgSave").on("click", function() 
		{
			var NewDocType = $("select#Muit_dlDocType").val();
			
			var NewAttach ="是";
			
			if($("input#Muit_rbAttachNo").prop("checked"))
				NewAttach ="否";
			
			var NewXmlDocIsstype = $("select#Muit_dlDocIssueType").val();
			var iGrp=false;
			//gMuitDeptSeq 為全域Arry在Dept.js
			for(var iDept=0;iDept<gMuitDeptSeq.length;iDept++)
			{
				iGrp=false;
				//修改是否含附件
				//1051109	Cloud	配合受文者編輯字視窗按鈕id更動，一併修改
				//1080312 David 1080089 修正序號錯誤問題
				//if($("#receiverList").find("INPUT#Dept_dlattach_"+iDept).length==0)
				if($("#receiverList").find("INPUT#Dept_dlattach_"+(parseInt(gMuitDeptSeq[iDept])-1).toString()).length==0)
					iGrp = true;
				if($("INPUT#Muit_editAttach").prop("checked"))
				{
					//利用附件按鈕判斷目前受文者是不是群組-無附件按鈕則表示為群組
					//1051109	Cloud	配合受文者編輯字視窗按鈕id更動，一併修改
					//if($("#receiverList").find("INPUT#dlattach_"+iDept).length==0)
					//if($("#receiverList").find("INPUT#Dept_dlattach_"+iDept).length==0)
						//iGrp = true;
					
					if(iGrp)
					{
						//1050818	Leslie	協助修改IE支援問題
						//activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").find("含附件").text(NewAttach);
						fnSetTextOfElement(activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").find("含附件"),NewAttach);
						if($("INPUT#Muit_editGrp").prop("checked"))//修改群組內整個機關
						{
							//1050818	Leslie	協助修改IE支援問題
							//activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").children("受文者").find("含附件").text(NewAttach);
							fnSetTextOfElement(activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").children("受文者").find("含附件"),NewAttach);
							//1070529 Cloud 1070183 新增附件分繕-s
							//1080312 David 1080089 調整紀錄異動的資料邏輯
							/*var arrDeptList = activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").children("受文者").find("正式名稱");
							for(var arrDpet=0;arrDpet<arrDeptList.length;arrDpet++)
							{
								var ModeDeptName = "";
								if("text" in arrDeptList[arrDpet])
									ModeDeptName = arrDeptList[arrDpet].text ;
									else
									ModeDeptName = arrDeptList[arrDpet].textContent;
								g_arrmailMergeClearDept.push(ModeDeptName);//紀錄要清除分繕表的受文者									
							}*/					
							//1070529 Cloud 1070183 新增附件分繕-e
							if(g_mailMergeCont!=0 )//有分繕表，才觸發分繕處理
							{
								var arrGrpDeptList = activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").find("受文者");
								for(var arrDpet = 0 ; arrDpet < arrGrpDeptList.length ; arrDpet++)
								{
									var pDeptSeqNo = arrGrpDeptList.eq(arrDpet).attr("編號");
									var pDeptDullName = arrGrpDeptList.eq(arrDpet).find("全銜").text();
									var pDeptName = arrGrpDeptList.eq(arrDpet).find("正式名稱").text();
									var pDeptEmpName = arrGrpDeptList.eq(arrDpet).find("姓名").text();

									setMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
								}
							}					
						}
					}
					else	
					//1050818	Leslie	協助修改IE支援問題
					//activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("含附件").text(NewAttach);
					{
						fnSetTextOfElement(activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("含附件"),NewAttach);
						//1070529 Cloud 1070183 新增附件分繕-紀錄要清除分繕表的受文者									
						//1080312 David 1080089 調整紀錄異動的資料邏輯
						//g_arrmailMergeClearDept.push(ModeDeptName);
						if(g_mailMergeCont!=0 )//有分繕表，才觸發分繕處理
						{
							var pDeptDullName = activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("全銜").text();
							var pDeptName = activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("正式名稱").text();
							var pDeptEmpName = activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("姓名").text();
							var pDeptSeqNo = activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").attr("編號");

							setMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
						}
					}
					//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
					gdmObj.needSaveDispatchAtt(true);
				}

				//修改本別
				if($("INPUT#Muit_editDocType").prop("checked"))
				{
					if(iGrp)
					{
						activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").attr("本別",NewDocType);
						//1051208 	Cloud	修正受文者群組切換本別時，不會異動底下受文者本別問題
						for(var GrpDept=0;GrpDept<activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").find("受文者").length;GrpDept++)
						{
							activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").find("受文者").eq(GrpDept).attr("本別",NewDocType);
						}
					}
					else
						activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").attr("本別",NewDocType);
				}
				//修改發文方式
				if($("INPUT#Muit_DocIssue").prop("checked"))
				{
					if(iGrp)
					//1050818	Leslie	協助修改IE支援問題
					//activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").children("受文者").find("發文方式").text(NewXmlDocIsstype);
						fnSetTextOfElement(activeDept.find("受文者列表[序='"+gMuitDeptSeq[iDept]+"']").children("受文者").find("發文方式"),NewXmlDocIsstype);
					else
						//1050818	Leslie	協助修改IE支援問題
						//activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("發文方式").text(NewXmlDocIsstype);				
						fnSetTextOfElement(activeDept.find("受文者[序='"+gMuitDeptSeq[iDept]+"']").find("發文方式"),NewXmlDocIsstype);
				}
			}
			//設定受文者編輯子視窗畫面
			fnMuitSetDept("Save",NewDocType,NewAttach,NewXmlDocIsstype);
		});

		//多筆放棄
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Muit_btOrgExit").click(function() 
		$("#Muit_btOrgExit").on("click", function() 
		{
			fnMuitSetDept("Close");
		});
		//群組儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#ModeGrp_btSave").click(function() 
		$("#ModeGrp_btSave").on("click", function() 
		{
			//設定受文者
			argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").attr("正式名稱",$("#ModeGrp_OrgName").val());

			//設定正副本稱謂
			argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").attr("全銜",$("#ModeGrp_FullName").val());

			//設定本別
			argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").attr("本別",$("#ModeGrp_dlDocType").val());
			//1051208 	Cloud	修正受文者群組切換本別時，不會異動底下受文者本別問題
			for(var GrpDept=0;GrpDept<activeDept.find("受文者列表[序='"+gModiGrpModeSeq+"']").find("受文者").length;GrpDept++)
			{
				activeDept.find("受文者列表[序='"+gModiGrpModeSeq+"']").find("受文者").eq(GrpDept).attr("本別",$("#ModeGrp_dlDocType").val());
			}
			//設定含附件
			var iHasAttach = "";
			if($("#ModeGrp_rbAttachSrc").prop("checked")==false)//非個別設定
			{
				iHasAttach = "是";
				if($("#ModeGrp_AttachNo").prop("checked"))
					iHasAttach = "否";
			}
			if(iHasAttach!="")
				//1050818	Leslie	協助修改IE支援問題
				//argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").children().find("含附件").text(iHasAttach);
			{
				fnSetTextOfElement(argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").children().find("含附件"),iHasAttach);
				//1080312 David 1080089 調整紀錄異動的資料邏輯
				/*//1070529	Cloud	1070183		新增附件分繕功能-異動過清除群組內受文者分繕表-S
				var arrGrpDeptList = argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").children().find("正式名稱");
				for(var arrDpet=0;arrDpet<arrGrpDeptList.length;arrDpet++)
				{
					var ModeDeptName = "";
					if("text" in arrDpet[0])
						ModeDeptName = arrDpet[0].text ;
						else
						ModeDeptName = arrDpet[0].textContent;						
					g_arrmailMergeClearDept.push(ModeDeptName);
				}
				//1070529	Cloud	1070183		新增附件分繕功能-異動過清除群組內受文者分繕表-E*/
				if(g_mailMergeCont!=0 )//有分繕表，才觸發分繕處理
				{
					var arrGrpDeptList = activeDept.find("受文者列表[序='"+gModiGrpModeSeq+"']").find("受文者");
					for(var arrDpet = 0 ; arrDpet < arrGrpDeptList.length ; arrDpet++)
					{
						var pDeptSeqNo = arrGrpDeptList.eq(arrDpet).attr("編號");
						var pDeptDullName = arrGrpDeptList.eq(arrDpet).find("全銜").text();
						var pDeptName = arrGrpDeptList.eq(arrDpet).find("正式名稱").text();
						var pDeptEmpName = arrGrpDeptList.eq(arrDpet).find("姓名").text();

						setMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
					}
					//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
					gdmObj.needSaveDispatchAtt(true);
				}
			}
			if($("#ModeGrp_dlDocIssueType").val()!="")
				//1050818	Leslie	協助修改IE支援問題
				//argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").children().find("發文方式").text($("#ModeGrp_dlDocIssueType").val());
				fnSetTextOfElement(argDeptNode.find("受文者列表[序='"+gModiGrpModeSeq+"']").children().find("發文方式"),$("#ModeGrp_dlDocIssueType").val());
			//回主視窗設定畫面
			gModiGrpModeSeq--;
			fnModeGrpSetDept("Save",gModiGrpModeSeq,$("#ModeGrp_dlDocType").val(),$("#ModeGrp_OrgName").val(),$("#ModeGrp_FullName").val(),iHasAttach);
		});
		//群組放棄
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#ModeGrp_btExit").click(function() 
		$("#ModeGrp_btExit").on("click", function() 
		{
			fnModeGrpSetDept("Close");
		});
		gModibInit = true;
	}
	//************************************************************註冊事件****************************************************//
}

//正式名稱ONBLUR
function fnTxModeOrgNameOnblur()
{
	if ($("#Mode_txOrgName").val() == gModiOOrgName) return;//無更換名稱不動作
	
	if (jf_DeptTrim($("#Mode_txOrgName").val()) == '') return;

	if( jf_DeptTrim($("#Mode_txOrgName").val())!= gModiOOrgName)
	{
		if($("input#Mode_KeepName").prop("checked"))
		{
			if($("#Mode_txOrgName").val()=='')
				$("#Mode_txFullName").val($("#Mode_txOrgName").val());
		}
		else
		{
			$("#Mode_txFullName").val($("#Mode_txOrgName").val());
			$("#Mode_txEmpName").val("");
		}
		fnGetOrgInfo();
	}
}
//姓名Onblur
function fnModeTxEmpNameOnblur()
{
	//1120524	Joe		1120213		修正單筆受文者也要合併受文者+姓名
	if(strOrgNickName == "BSMI"){
		if($("input#Mode_KeepName").prop("checked") == false)
		{
			$("#Mode_txFullName").val($("#Mode_txOrgName").val() + $("#Mode_txEmpName").val());
		}
	}
	else{
		if($("#Mode_txEmpName").val()!="" && $("#Mode_txFullName").val()=="")
			$("#Mode_txFullName").val($("#Mode_txEmpName").val());
	}
}
//儲存
function fnModiSave()
{
	var strErr = fnCheckBeforeSave();
	if(strErr=="")
	{
		//將畫面資訊回寫至XML
		//1050818	Leslie	協助修改IE支援問題
		// gModIfyDeptNode.find("正式名稱").text(jf_DeptTrim($("#Mode_txOrgName").val()));
		// gModIfyDeptNode.find("姓名").text(jf_DeptTrim($("#Mode_txEmpName").val()));
		// gModIfyDeptNode.find("全銜").text(jf_DeptTrim($("#Mode_txFullName").val()));
		// gModIfyDeptNode.attr("本別",$("#Mode_dlDocType").val());
		// gModIfyDeptNode.find("發文方式").text(jf_DeptTrim($("#Mode_dlDocIssueType").val()));
		// if($("#Mode_rbAttachYes").prop("checked"))
			// gModIfyDeptNode.find("含附件").text("是");
		// else
			// gModIfyDeptNode.find("含附件").text("否");
		// gModIfyDeptNode.find("郵遞區號").text(jf_DeptTrim($("#Mode_txZip").val()));
		// gModIfyDeptNode.find("地址").text(jf_DeptTrim($("#Mode_txaddress").val()));
		// gModIfyDeptNode.find("Email").text(jf_DeptTrim($("#Mode_txEmail").val()));
		fnSetTextOfElement(gModIfyDeptNode.find("正式名稱"),jf_DeptTrim($("#Mode_txOrgName").val()));
		fnSetTextOfElement(gModIfyDeptNode.find("姓名"),jf_DeptTrim($("#Mode_txEmpName").val()));
		fnSetTextOfElement(gModIfyDeptNode.find("全銜"),jf_DeptTrim($("#Mode_txFullName").val()));
		gModIfyDeptNode.attr("本別",$("#Mode_dlDocType").val());
		fnSetTextOfElement(gModIfyDeptNode.find("發文方式"),jf_DeptTrim($("#Mode_dlDocIssueType").val()));
		if($("#Mode_rbAttachYes").prop("checked"))
			fnSetTextOfElement(gModIfyDeptNode.find("含附件"),"是");
		else
			fnSetTextOfElement(gModIfyDeptNode.find("含附件"),"否");
		fnSetTextOfElement(gModIfyDeptNode.find("郵遞區號"),jf_DeptTrim($("#Mode_txZip").val()));
		fnSetTextOfElement(gModIfyDeptNode.find("地址"),jf_DeptTrim($("#Mode_txaddress").val()));
		fnSetTextOfElement(gModIfyDeptNode.find("Email"),jf_DeptTrim($("#Mode_txEmail").val()));
		//1050818	Leslie	協助修改IE支援問題	--END--
		if(gModiMode=="1")
		{
			gModiiactiveDept.find("受文者[序='"+indexOfModify+"_"+indexOfGrpModify+"']").replaceWith(gModIfyDeptNode);
			
			//1080312 David 1080089 新增群組內受文者分繕表處理
			if(g_mailMergeCont!=0 )
			{
				if(bModifyName)
					setGrpMailMergeModify("2",gMoiSeq, gSourceFullName, gSourceName, gSourceEmpName);

				if(bCheckAtt)
				{
					setGrpMailMergeModify("1",gMoiSeq, gSourceFullName, gSourceName, gSourceEmpName);
					//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
					gdmObj.needSaveDispatchAtt(true);
				}
			}

			//畫面資訊回主視窗再做修改
			//畫面的序比XML序少1
			--indexOfGrpModify;
			fnRestGrpDept(indexOfModify+"_"+indexOfGrpModify,gModIfyDeptNode);
		}
		else
		{
			//1070529 Cloud 1070183 紀錄異動受文者
			//1080312 David 1080089 新增編號屬性-將編號回寫
			gModIfyDeptNode.attr("編號",gMoiSeq);
			//1080312 David 1080089 調整受文者分繕表處理
			/*if(bCheckAtt)
				g_arrmailMergeClearDept.push($("#Mode_txOrgName").val());*/
			if(g_mailMergeCont!=0 )
			{
				if(bModifyName)
					setMailMergeModify("2",gMoiSeq, gSourceFullName, gSourceName, gSourceEmpName);

				if(bCheckAtt)
				{
					setMailMergeModify("1",gMoiSeq, gSourceFullName, gSourceName, gSourceEmpName);
					//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
					gdmObj.needSaveDispatchAtt(true);
				}
			}
			gModiiactiveDept.find("受文者[序='"+indexOfModify+"']").replaceWith(gModIfyDeptNode);
			//畫面資訊回主視窗再做修改
			//畫面的序比XML序少1
			fnRestDept(--indexOfModify,gModIfyDeptNode);
		}
	}
	else
	{
		alert("受文者資訊有下列錯誤 請修正\n"+strErr);
	}
}
//儲存前檢核
function fnCheckBeforeSave()
{
	var pErrList = "";
	if (jf_DeptTrim($("#Mode_txOrgName").val()) == '')
		pErrList += '受文者 不可為空白';
	
	var pIssueType = $("#Mode_dlDocIssueType").val();
	if (pIssueType == '')
		pErrList += '發文方式 不可為空白';
	if ((jf_DeptTrim($("#Mode_txOrgNo").val()).length) != 10 &&  $("#Mode_dlDocIssueType").val() == '電子交換')
		pErrList += $("#Mode_txOrgName").val() + ' 無交換代碼 發文方式不可為電子交換\n'; 
	
	var pPostNo = jf_DeptTrim($("#Mode_txZip").val());
	
	if (jf_DeptTrim(pPostNo) == '')	
	{
		if(pIssueType == '人工傳遞' && gCheckPostNo[0])
			pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 郵遞區號不可為空白';
		else if(pIssueType == '郵寄' && gCheckPostNo[1])
			pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 郵遞區號不可為空白';
		else if(pIssueType == '電子交換' && gCheckPostNo[2])
			pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 郵遞區號不可為空白';
	}
	
	var pAddress = $("#Mode_txaddress").val();
	if (jf_DeptTrim(pAddress) == '')
	{
		if(pIssueType == '人工傳遞' && gCheckAddress[0])
				pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 地址不可為空白';
		else if(pIssueType == '郵寄' && gCheckAddress[1])
				pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 地址不可為空白';
		else if(pIssueType == '電子交換' && gCheckAddress[2])
				pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 地址不可為空白';
	}
	
	var pEmail = $("#Mode_txEmail").val();
	if(jf_DeptTrim(pEmail) == "" && pIssueType == '電子郵件')
		pErrList += '\n\r '+$("#Mode_txOrgName").val() +' 發文方式為電子郵件時，電子郵件不可為空白';
		
	return pErrList;
}

function fnGetOrgInfo()
{
	var params = new SOAPClientParameters();
	params.add('argFullName', $("#Mode_txOrgName").val());
	params.add('OrgNo', theUserInfo.OrgID);
	params.add('DeptNo', theUserInfo.DepartID);
	params.add('UserID', theUserInfo.UserID);
	params.add('Artifact', theUserInfo.Artifact);
	//此處呼叫ws需使用全域theWebServices
	//1130813 David 1130313 支援離線版invokeJSON改為非同步行為
	//gModiWebServices.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, false, function(r) 
	gModiWebServices.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, true, function(r) 
	{
		if(r.value.IsGrp == false)//非群組
		{
			if(r.value.Count == 0)//
			{
				//1050819	Cloud	配合ie修改節點異動方式-此處不需要了，後面會將值替換
				//gModIfyDeptNode.children().text("");
				var Deptinfo =
				{
					"OrgName":$("#Mode_txOrgName").val(),
					"EmpName":$("#Mode_txEmpName").val(),
					"OrgID":"",
					"DeptNo":"",
					"defaultIssueType":defaultIssueType,
					"PostNo":"",
					"Address":"",
					"Email":"",
					"DocType":"",
					"CabinetNo":"",
					"GateWay":"",
					"SysId":"",
					"OverSea":"",
					"CountryType":"",
					"RegionNo":"",
					"IsInside":"N",
					"FepStatus":"N",
					//1060327 	Cloud 	Cloud	1050802 	增加寫入內部單位代碼
					"Internal":"",
				};
				fnsetShowTable(Deptinfo);
				//1090219	Joe	1080764 	新增受文者時，如受文者不存在，跳出提醒視窗
				if(theSSO.User.SystemSets.get("WE_ALERT_ORGNOTINDB") == "1")
					alert("當前受文者不存在資料庫，請確認是否修正。")
			}
			else
			{
				if(r.value.Count == 1)
				{
					//1051215	Cloud	補上人員選擇子視窗功能
					if(r.value.Email[0].indexOf('|')!=-1)
						fnModiOpenChoose(r,"Emp",gModidlg);
					else
					fnsetShowTable(r.value);
				}
				else//多筆開啟受文者選擇子視窗
					fnModiOpenChoose(r,"Org",gModidlg);
			}
		}	
		else
		{
			alert('您所輸入之受文者名稱為 群組 ，將重新載入資料');
			$("#Mode_txOrgName").val(gModiOOrgName);//將原名稱設回受文者
			$("#Mode_txFullName").val(gModiOOrgName);//將原名稱設回正副本稱謂
		}
		
		//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，改為CallBack邏輯
		fnGetOrgInfoEnd();
	});

	//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，改為CallBack邏輯
	function fnGetOrgInfoEnd()
	{
		gModiCount++;
		//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
		gChangeCnt++;
	}
}
//將資訊設定至畫面
function fnsetShowTable(objDept)
{
	//設定至畫面
	$("#Mode_txOrgName").val(objDept.OrgName);
	//1051124	Cloud	補上空白才寫入
	if($("#Mode_txEmpName").val()=="")
	$("#Mode_txEmpName").val(objDept.EmpName);
	if($("#Mode_txFullName").val()=="")
	$("#Mode_txFullName").val(objDept.OrgName);
	$("#Mode_txOrgNo").val(objDept.OrgID);
	$("#Mode_txDeptNo").val(objDept.DeptNo);
	//清空發文選單，以新資料重建
	//1110225 David 1101481 調整發文方式選單處理邏輯
	/*$("#Mode_dlDocIssueType").children().remove();
	$("#Mode_dlDocIssueType").append(sendWays);*/
	//1111020	Joe		判斷當查無機關資料時，將公佈欄及電子交換換成郵寄--S
	if(objDept.SysId == ""){
		if($("#Mode_dlDocIssueType").val() == "內部電子公布欄" || $("#Mode_dlDocIssueType").val() == "電子交換")
			$("#Mode_dlDocIssueType").val("郵寄");
	}
	else{
	//1111020	Joe		判斷當查無機關資料時，將公佈欄及電子交換換成郵寄--E
		fngolSetGrpdlDocIssueType("ModeOrg",objDept.IsInside,objDept.OrgID,objDept.OverSea,objDept.DocType,"Mode_dlDocIssueType",objDept.FepStatus);
		if(objDept.defaultIssueType!="")
			$("#Mode_dlDocIssueType").val(fungetIssueType(objDept.defaultIssueType));
		else
			$("#Mode_dlDocIssueType").val("郵寄");
		
	}
	/*1071011	Cloud	修正當受文者不存在資料庫時，一代僅清空機關代碼、單位代碼，比照處理
										，一併增加清空sysid，以免從有=>無時因有sysid造成異常，基本資料調整為僅保留地址、郵遞區號、Email*/
	//1090316	Joe		1090170		修正受文者資料不存在於DB時，應清空畫面上舊受文者資料
	// if(objDept.PostNo!="")
	//1090424	Joe		1090170		問題定義修正，當受文者不存在於DB時，不清空畫面欄位
	if(objDept.SysId != "")
		$("#Mode_txZip").val(objDept.PostNo);
	/*1071011	Cloud	修正當受文者不存在資料庫時，一代僅清空機關代碼、單位代碼，比照處理*/
	//1090316	Joe		1090170		修正受文者資料不存在於DB時，應清空畫面上舊受文者資料
	// if(objDept.Address!="")
	//1090424	Joe		1090170		問題定義修正，當受文者不存在於DB時，不清空畫面欄位
	if(objDept.SysId != "")
		$("#Mode_txaddress").val(objDept.Address);
	/*1071011	Cloud	修正當受文者不存在資料庫時，一代僅清空機關代碼、單位代碼，比照處理*/
	//1090316	Joe		1090170		修正受文者資料不存在於DB時，應清空畫面上舊受文者資料
	// if(objDept.Email!="")
	//1090424	Joe		1090170		問題定義修正，當受文者不存在於DB時，不清空畫面欄位
	if(objDept.SysId != "")
		$("#Mode_txEmail").val(objDept.Email);
	
	if(objDept.DocType!="")
		$("#Mode_dlDocType").val(objDept.DocType);
	
	//不可異動部分直接設定至XML
	//1050818	Leslie	協助修改IE支援問題，整段一次重改過
	// gModIfyDeptNode.find("機關代碼").text(objDept.OrgID);
	// gModIfyDeptNode.find("單位代碼").text(objDept.DeptNo);
	// gModIfyDeptNode.find("櫃號").text(objDept.CabinetNo);
	// gModIfyDeptNode.find("匣道").text(objDept.GateWay);
	// gModIfyDeptNode.find("SYSID").text(objDept.SysId);
	// if(gModIfyDeptNode.find("海外單位").length!=0)
		// gModIfyDeptNode.find("海外單位").text(objDept.OverSea);
	// else
		// gModIfyDeptNode.append("<海外單位>"+objDept.OverSea+"</海外單位>");
	
	// if(gModIfyDeptNode.find("國別").length!=0)
		// gModIfyDeptNode.find("國別").text(objDept.OverSea);
	// else
		// gModIfyDeptNode.append("<國別>"+objDept.CountryType+"</國別>");
	
	// if(gModIfyDeptNode.find("郵寄地區").length!=0)
		// gModIfyDeptNode.find("郵寄地區").text(objDept.OverSea);
	// else
		// gModIfyDeptNode.append("<郵寄地區>"+objDept.RegionNo+"</郵寄地區>");
	
	// if(gModIfyDeptNode.find("內部").length!=0)
		// gModIfyDeptNode.find("內部").text(objDept.OverSea);
	// else
		// gModIfyDeptNode.append("<內部>"+objDept.IsInside+"</內部>");
	//原受文者原函式fnChkIsAnyCanEIssue儲存時會逐受文者重新透過WS取得電子交換現況，改以新增時則加入此資訊減少呼叫WS
	// if(gModIfyDeptNode.find("電子交換現況").length==0)//無TAG就自己加
		// gModIfyDeptNode.append("<電子交換現況>"+objDept.FepStatus+"</電子交換現況>");
	// else
		// gModIfyDeptNode.find("電子交換現況").text(objDept.FepStatus);
	fnSetTextOfElement(gModIfyDeptNode.find("機關代碼"),objDept.OrgID);
	fnSetTextOfElement(gModIfyDeptNode.find("單位代碼"),objDept.DeptNo);
	fnSetTextOfElement(gModIfyDeptNode.find("櫃號"),objDept.CabinetNo);
	fnSetTextOfElement(gModIfyDeptNode.find("匣道"),objDept.GateWay);
	fnSetTextOfElement(gModIfyDeptNode.find("SYSID"),objDept.SysId);
	if(gModIfyDeptNode.find("海外單位").length!=0)
		fnSetTextOfElement(gModIfyDeptNode.find("海外單位"),objDept.OverSea);
	else{
		var newNode = gModIfyDeptNode.get(0).ownerDocument.createElement("海外單位");
		fnSetTextOfElement($(newNode),objDept.OverSea);
		gModIfyDeptNode.append(newNode);
	}
		
	if(gModIfyDeptNode.find("國別").length!=0)
		fnSetTextOfElement(gModIfyDeptNode.find("國別"),objDept.CountryType);
	else{
		var newNode = gModIfyDeptNode.get(0).ownerDocument.createElement("國別");
		fnSetTextOfElement($(newNode),objDept.CountryType);
		gModIfyDeptNode.append(newNode);
	}
	
	if(gModIfyDeptNode.find("郵寄地區").length!=0)
		fnSetTextOfElement(gModIfyDeptNode.find("郵寄地區"),objDept.RegionNo);
	else{
		var newNode = gModIfyDeptNode.get(0).ownerDocument.createElement("郵寄地區");
		fnSetTextOfElement($(newNode),objDept.RegionNo);
		gModIfyDeptNode.append(newNode);
	}
	
	if(gModIfyDeptNode.find("內部").length!=0)
		fnSetTextOfElement(gModIfyDeptNode.find("內部"),objDept.IsInside);
	else{
		var newNode = gModIfyDeptNode.get(0).ownerDocument.createElement("內部");
		fnSetTextOfElement($(newNode),objDept.IsInside);
		gModIfyDeptNode.append(newNode);
	}
	//原受文者原函式fnChkIsAnyCanEIssue儲存時會逐受文者重新透過WS取得電子交換現況，改以新增時則加入此資訊減少呼叫WS
	if(gModIfyDeptNode.find("電子交換現況").length!=0)//無TAG就自己加
		fnSetTextOfElement(gModIfyDeptNode.find("電子交換現況"),objDept.FepStatus);
	else{
		//1100506 David 1100473 弱掃修正Client Potential XSS
		//gModIfyDeptNode.append(fnSetTextOfElement($(gModIfyDeptNode.get(0).ownerDocument.createElement("電子交換現況")),objDept.FepStatus).get(0));
		gModIfyDeptNode.append(fnSetTextOfElement($(gModIfyDeptNode.get(0).ownerDocument.createElement("電子交換現況")),htmlencode(objDept.FepStatus)).get(0));
		// var newNode = gModIfyDeptNode.get(0).ownerDocument.createElement("電子交換現況");
		// fnSetTextOfElement($(newNode),objDept.FepStatus);
		// gModIfyDeptNode.append(newNode);
	}
	//1050818	Leslie	協助修改IE支援問題	--END--
	//1060327 Cloud 1050802 增加寫入內部單位代碼
	if(gModIfyDeptNode.find("內部單位代碼").length!=0)
		fnSetTextOfElement(gModIfyDeptNode.find("內部單位代碼"),objDept.Internal);
	else{
		var newNode = gModIfyDeptNode.get(0).ownerDocument.createElement("內部單位代碼");
		fnSetTextOfElement($(newNode),objDept.Internal);
		gModIfyDeptNode.append(newNode);
	}
	
	//設定gModiOOrgName原機關名稱
	gModiOOrgName = objDept.OrgName;
}

//開啟選擇子視窗
function fnModiOpenChoose(argData,argMode,$dlg)
{
	//1051215	Cloud	補上人員選擇子視窗功能
	//fnOpenWinChoose(argData,"Org",$dlg,"Modi");	
	fnOpenWinChoose(argData,argMode,$dlg,"Modi","0");	
}
//選擇子視窗回傳
function fnReturnValueFromChooseToModi(argID,argRtnObj,argMode)
{
	//1051215	Cloud	補上人員選擇子視窗功能
	
	var ChooseSep = argID.split('_')[3];
	var Dataseq = argID.split('_')[4];
	$("#ui-slide-pane-Choose-Org_"+Dataseq).remove();//改為移除因為畫面都用複製出來的
	if(argMode=="Emp")
	{
		argRtnObj.DeptNo[ChooseSep] = "";
		argRtnObj.Email[ChooseSep] = argRtnObj.Email[ChooseSep].split('|')[0].split(';')[ChooseSep];
	}
	var Deptinfo =
	{
		"OrgName":argRtnObj.OrgName[ChooseSep],
		"EmpName":argRtnObj.EmpName[ChooseSep],
		"OrgID":argRtnObj.OrgID[ChooseSep],
		"DeptNo":argRtnObj.DeptNo[ChooseSep],
		"defaultIssueType":argRtnObj.defaultIssueType[ChooseSep],
		"PostNo":argRtnObj.PostNo[ChooseSep],
		"Address":argRtnObj.Address[ChooseSep],
		"Email":argRtnObj.Email[ChooseSep],
		"DocType":argRtnObj.DocType[ChooseSep],
		"CabinetNo":argRtnObj.CabinetNo[ChooseSep],
		"GateWay":argRtnObj.GateWay[ChooseSep],
		"SysId":argRtnObj.SysId[ChooseSep],
		"OverSea":argRtnObj.OverSea[ChooseSep],
		"CountryType":argRtnObj.CountryType[ChooseSep],
		"RegionNo":argRtnObj.RegionNo[ChooseSep],
		"IsInside":argRtnObj.IsInside[ChooseSep],
		"FepStatus":argRtnObj.FepStatus[ChooseSep],
		//1060327 Cloud 1050802 增加寫入內部單位代碼
		"Internal":argRtnObj.Internal[ChooseSep],
		
	};
	fnsetShowTable(Deptinfo);
	gModiCount++;
	//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
	gChangeCnt++;
}
//去空白
function jf_DeptTrim(Object)
{
	//1100510 David 1100221 移除jQuery.trim()
	//return jQuery.trim(Object);
	return jf_Trim(Object);
}

//1100506 David 1100473 弱掃修正
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ModeOrg.js").finish();
})();

//1110901	Joe		1110615		處理各欄位高度--S
function SetHeight(){
	var Height=0;
	var ruler = document.getElementById("receiverTemp");
	//記錄外框高度 預設為250px
	var HeaderHeight = 250;
	ruler.rows = 1;
	ruler.style.display = '';
	ruler.style.width = $("#Mode_txOrgName")[0].clientWidth + 'px';
　  ruler.textContent = $("#Mode_txOrgName")[0].value;
	Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
	
	ruler.style.width = $("#Mode_txEmpName")[0].clientWidth + 'px';
　  ruler.textContent = $("#Mode_txEmpName")[0].value;
	Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
	
	ruler.style.width = $("#Mode_txFullName")[0].clientWidth + 'px';
　  ruler.textContent = $("#Mode_txFullName")[0].value;
	Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
	
	$("#Mode_txOrgName")[0].style.height = Height + 'px';
	$("#Mode_txEmpName")[0].style.height = Height + 'px';
	$("#Mode_txFullName")[0].style.height = Height + 'px';
	
	//把多長出來的高度加至外框
	if(Height > 25)
		HeaderHeight += Height-25;
	
	Height=0;
	ruler.rows = 1;
	ruler.style.width = $("#Mode_txaddress")[0].clientWidth + 'px';
　  ruler.textContent = $("#Mode_txaddress")[0].value;
	Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
	$("#Mode_txZip")[0].style.height = Height + 'px';
	$("#Mode_txaddress")[0].style.height = Height + 'px';	
	//把多長出來的高度加至外框
	if(Height > 25)
		HeaderHeight += Height-25;
	
	Height=0;
	ruler.rows = 1;
	ruler.style.width = $("#Mode_txEmail")[0].clientWidth + 'px';
　  ruler.textContent = $("#Mode_txEmail")[0].value;
	Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
	$("#Mode_txEmail")[0].style.height = Height + 'px';
	//把多長出來的高度加至外框
	if(Height > 25)
		HeaderHeight += Height-25;
	$("#ModeOrgHeader")[0].style.height = HeaderHeight + 'px';
	
	ruler.style.display = 'none';
}
//1110901	Joe		1110615		處理各欄位高度--E
