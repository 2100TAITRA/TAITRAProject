/* DATE		MGRNO		SA		PG		Desc
   1050808	1050087		Cloud	Cloud	配合IE無evaluate物件調整XML讀取方式
   1050822	1050087		Cloud	Cloud	新增取得發文字號及支號功能
   1050831	1050087		Cloud	Cloud	修改案次號增加空白不進行查詢
   1050901	1050087		Cloud	Cloud	分類號案次號轉大寫
   1050905	1050087		Cloud	Cloud	修正密等切換時，寫入稿件，取得發文字時，由稿件取得密等
   1050907	1050087		Cloud	Cloud	調整解密日期異動時，寫入文稿tag
   1050912	1050087		Cloud	Cloud	調整取得發文字時，使用一級單位取得
   1050921	1050087		Cloud	Cloud	新增函式for客製化顯示承辦單位資訊機關。
   1050922	1050087		Cloud	Cloud	調整決行層級判斷，可自行調整決行層級，不可上調可下調
   1051006	1050087		Cloud	Cloud	修正，取得發文字時，應使用承辦單位代碼，非當前使用者所屬單位代碼
   1051006	1050087		Cloud	Cloud	補上紀錄原分層代碼核決層級，修正向下調整一次後，就不能調回原層級了
   1051006	1050087		Cloud	Cloud	取得發文字號增加回傳發文日期功能-
										(1.增加特定角色開啟自動更新發文日期、(2開公文時自動取得發文字號及日期
   1051007	1050088		Cloud	--		修正取得發文機關機關代碼方式
   1051011				Raymond	Raymond	署名1,2新增'取代章戳'設定
   1051012	1050087		Cloud	Cloud	修正取得發文機關選項，選單未依照目前文稿的發文機關設定問題
   1051014	1050087		Cloud	Cloud	修正，因發文機關觸發的REFLASH，導致署名連動被設回前次選擇的值
   1051014	1050087		Cloud	Cloud	修正分類號檢核跳出的提示訊息
   1051019	1050087		Cloud	Cloud	修正，分類號檢核、分層決行檢核，使用的單位代碼應該要用承辦單位
   1051123				Raymond	Raymond	異動分類號時呼叫fnWebEditSave()同步公文基資
   1051208	--			Cloud	Cloud	調整分層決行檢核訊息
   1051209	--			Cloud	Cloud	發文機關切換不會連動儲存機關代碼問題
   1051212	1051176		Cloud	Cloud	修改，發文機關、署名、署名2，可經由設定過濾不須見資訊
   1051219 	--			Cloud	Cloud	配合調整 自動取得發文字發文日期功能，不自動取發文日期就回傳空白
   1051229	--			Cloud	Cloud	分層負責代碼輸入時增加trim空白
   1060104	--			Cloud	Cloud	修改發文機關連動署名增加寫入取代章戳
   1060105	1051346		Cloud	Cloud	增加署名可依不同文別設定對應署名
   1060110	1051346		Cloud	Cloud	調整增加先讀取稿件儲存的署名，有值時就不使用預設署名
   1060111	1051346		Cloud	Cloud	調整發文人員開啟時不使用預設署名
   1060111	1060017 	Cloud 	--		增加案次號異動回寫基資功能
   1060102  1051346 	Cloud 	--		調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值
   1060124	序2224(fda)	Cloud	Cloud	修正，發文機關連動發文字未先判斷是否已取過導致看起來異常的問題
   1060125	序315(航港局)Cloud	Cloud	修正，航港局一級單位承辦人員創稿無承辦單位資訊，且無法使用抄本預設承辦單位功能問題
   1060203 	1051346		Cloud  	Cloud	調整 簽稿會核單新稿件屬性預設給N-避免自動產生簽稿會核單時，使用者未開啟頁面導致屬性不會改為Y，在會畢退回時才開啟改成完造成簽核物件被清空
   1060206	--			Cloud	Cloud	增加判斷會辦單也不異動新稿件屬性
   1060216	序451(航港局)Cloud	Cloud	修正，第二個稿件以後，承辦單位未依照發文層級顯示一級/二級問題
   1060309 	序3052		Cloud	Cloud	補強預設署名功能，新稿件預設署名於選單內無法對應時，調整為一率設為第一個，並寫出log提供現場異常時追查方向
   1060314	--			Cloud	Cloud	修正，預設署名邏輯，預設值使用優先序應該是default=>template=>sign
   1060516	1060235		Cloud	Kevin_C	FDA需求，政風室取得發文字號時可區分機關發文、單位發文取得對應發文字號
   1060602	--			Cloud	Cloud	修正判斷自動取得日期判斷環境變數異常的bug
   1060602	1060235		Cloud	Cloud	FDA需求，政風室取得發文字號時可區分機關發文、單位發文取得對應發文字號-補強漏改部分
   1060609	--			Cloud	Cloud	調整呼叫ws為同步
   1060712	1060521		Cloud	Cloud	提供參數設定，控制公文核決前是否可設定發文日期、字號
   1060825	1060567		Leslie	Leslie	配合高港警需求，於公文開啟階段可自動取得發文字號，無發文機關選單時，由稿件取得機關代碼
   1061211	1061180		David	Cloud	修改除原有法規規定年限外，再增加透過ws檢核內規設定的年限
   1061220	1061230		Cloud	Cloud	修改案次號onlbur時，比照分類號，檢核保存年限是否符合線上簽核類型。
   1061222	1061170		David	David	呼叫fnWebEditSave()，新增傳入觸發類型
   1070628	--			Cloud	Cloud	修正密等普通、密來回切換會造成密等判斷異常問題
   1070917	1070984		Cloud	Cloud	修正，如先創有設定預設章戳屬性稿件再創無預設章戳屬性稿件則章戳會帶錯問題
   1071114	1071130		David	David	修正自動取支號邏輯，應從第2份開始依支號順序設定
   1080114	1080024		David	David	同步各稿件案次號時，一併同步年度、分類號及保存年限
   1080215	1080180		David	David	分類、案次號檢核時，需要同時檢核分類案次號
   1080305	1080216		David	David	調整同步分類/案次號邏輯，避免跳出多次錯誤訊息，及僅檢核第一份稿件是否成功問題
   1080322	1080216		David	David	修正相同錯誤訊息不重複顯示
   1080610	1080433		David	David	新增發文機關異動時，設定文稿清單已異動旗標，供文稿基資連動判斷使用
   1080903	1080339		Kevin	Joe		jQuery升級2.2.4
   1081008	1080339		Kevin	Joe		jQuery升級3.4.1，修正前次問題
   1090102	1090001		David	David	分類案次號檢核新增傳入年度號
   1090220	1080755		David	Joe		修改增加判斷，密件公文不可使用紙本發文
   1090316	1090113		David	David	自動設定發文日期時，新增判斷觸發來源，避免會銜函呼叫時異常
   1090326	1080755		David	Joe		補上trycatch，避免使用者直接創無密等的稿件會無法開啟
   1090519	1090218		David	David	(鐵道局)內部行文公文，新增稿件為簽、書函、存查案件批次單時新增客製邏輯
   1090526	1090391		David	Joe		修改支號排序邏輯，僅一份稿件時不取支號
   1090619	1090218		David	David	(鐵道局)調整存查案件批示單名稱判斷
   1090721	1090218		David	David	(鐵道局)內部行文公文，新增稿件為簽時，需帶出一+二級單位名稱
   1091028	1090800		David	David	(鐵道局)內部行文公文，書函、存查案件批次單新增稿件時才需預設單位銜
   1091111	1090756		David	David	調整簽稿會核單、會辦單稿件的NewDraft屬性更改時機，避免機關全銜無法更新
   1091118	1090823		David	David	1.修正密等異動時不需更新基資，由MS-WebEditSave統一處理。2.取發文字時依稿件密等取得
   1100324	1090836		David	David	新增核判區分連動處理
   1100407	1100276		David	David	調整分類號保存年限檢核未過時更新回舊分類號資料來源
   1100408	1100192		David	David	調整分類號帶出保存年限邏輯，同公文基資處理
   1100419	1090823		David	David	修正部分客製樣板無密等TAG處理
   1100503	1100276		David	David	修正更新回舊分類號後，保存年限未帶回問題
   1100506	1100473		Kevin	David	弱掃修正Client Potential XSS
   1100510	1100221		Kevin	David	支援jQuery3.5.1，調整jQuery.trim用法
   1100716	1100433		David	David	新增決行層級連動排出初版預排流程處理
   1100729	1100860		David	David	分類案次號檢核時，先進行全形轉半形判斷，避免使用者誤輸入全形文字
   1100922	1100991		Kevin	David	弱掃修正Client Potential XSS
   1100927	-------		David	David	新增回傳WS取得的發文號資料，支援代擬公文發文號區間與公文號不同功能
   1110715	1110727		David	David	當稿件的發文機關代碼符合設定值時，取得機關發文代字使用機關代碼取得，供取得總發代字使用
   1110721	1110796		David	Cloud	TEMPLATE發文機關預設值不存在選單內時以第一筆資訊設定
   1110831	1110794		Raymond	Raymond	「解密條件或保密期限」選單的來源改為DataXML的data清單, 預帶「解密條件或保密期限」的內容亦改為data清單第一筆
   1110906	1110794		David	David	支援解密條件可透過Data設定，調整解密條件連動解密日期功能
   1110924	1110882		David	David	支援銓敘部預排流程修改
   1111014	1111065		Leslie	Zen		修正保存年限檢核後未還原原始年限之問題
   1120602	1120517		David	David	調整臺北大學取發文字改由WebEdit02處理
   1120626	序63		David	Joe		調整標檢局支援自動取號，且不論稿件數皆須取號
   1120901	1120407		David	David	取得Data檔時，依公文對應的機關代碼取得
   1120918	1120750		David	David	支援組改不切換DB機關代碼，調整航港局客製化稿件單位名稱顯示判斷功能
   1121107	-------		David	David	(各機關問題彙整表序305)調整連動預排流程單位內外判斷邏輯
   1121218	1120821		David	David	ws_ComNoClsNo()新增傳入目前公文文號
   1130109	-------		David	David	(各機關問題彙整表序16)修正發文字自動帶出發文日期BUG
   1130112	1121021		David	David	修改航港局客製化稿面承辦單位連動判斷邏輯，支援組改不切換DB機關代碼邏輯
   1130112	1121043		David	David	異動密等、速別時，新增公文背景顏色處理邏輯
   1130117	1121045		David	David	新增銓敘部決行層級、決行層次、決行方式同步功能
   1130117	1121059		Leslie	Leslie	修正稿件<署名>未正確設置"取代章戳"時，會衍生無法列印出取代章戳的問題
   1130119	1120995		David	David	啟用顯示案次號、CheckCls有回傳案次號時，設定至畫面案次號欄位
   1130207	1120589		David	David	新增中榮客製化決行層級處理
   1130306	1120589		David	David	支援中榮客製化決行層級設定，調整參數改傳入決行層級中文文字
   1130322	1120976		David	David	新增信保分層負責相關欄位功能
   1130328	序62		Joe		Joe		增加Trycatch避免樣板檔無取代章戳屬性時getmodel.text直接壞掉
   1130503	1120976		David	David	信保分層負責代碼連動處理改為使用公文的承辦單位代碼
   1130516	1130222		Joe		Joe		增加批次取得批號功能
   1130718	序148		Joe		Joe		修正機關代碼onblur後，發文字號異常的問題
   1130806	1130313		Leslie	Leslie	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
   1130828	1130690		David	David	新增「公文擬辦方式」、「陳核日期」、「承辦單位」欄位連動功能
   1140708	1140159		David	Raymond	合併1111142, 署名選項新增「data-fn」、「data-size」屬性分別對應DataXML的「檔名」、「size」屬性, 新增文稿或切換發文機關連動時預設的取代章戳一併寫回文稿對應的「檔名路徑」(從Other子目錄開始的相對路徑)、「size」屬性
   1141020	陸委會序293	David	Raymond	修正署名2選項有設定'取代章戳', 未設定'檔名'及'size'屬性時, 會發生Error而帶不出以下選項的問題
   1141027	1140830		Raymond	Raymond	署名1、署名2初始化選單時, 新增過濾選單項目的"類型"屬性與文稿的"DefaultSign"屬性不相符的署名項目
   1141030	Leslie		David	1140855	新增北榮稿件決行層次處理
*/
var Common = {};
var nsEditor = nsEditor||{};

Common.arr = new Array();
Common.No_no = new Array();	
Common.Number = new Array("1","2","3","4","5","6","7","8","9");
Common.Upper = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
Common.Lower = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
Common.snapshot;
Common.activeRole;// = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);	Raymond - 改到AOL再呼叫
//增加記錄發文字號
Common.ndIssueWord;
//1050921 增加紀錄 承辦單位 承辦科別 for 航港局切換發文機關時，承辦單位顯示方式
Common.DeptName="";
Common.SectName="";
//1051006	1050087	Cloud	補上紀錄原分層代碼核決層級，修正向下調整一次後，就不能調回原層級了
Common.O_ProxyLv="";
//1051014	1050087	Cloud	修正，因發文機關觸發的REFLASH，導致署名連動被設回前次選擇的值-紀錄連動後得值
Common.NewSign="";
Common.NewSign2="";
//1051212 Cloud	1051176 [鐵改局]修改，發文機關、署名、署名2，可經由設定過濾不須見資訊-記錄稿件Use_type
Common.DocUseType="";
Common.IsIssueRole=false;
Common.INCHARGE_OU="";
//1060105	Cloud	增加署名可依不同文別設定對應署名
Common.DefaultSign="";//紀錄稿件預設署名TagName
//1060102  1051346 	Cloud 	調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值
Common.NewDraft=false;//紀錄是否為新稿件
//1090220	Joe		1080755	修改增加判斷，密件公文不可使用紙本發文
Common.NowSecNo="";//紀錄密等

Common.fnInitIssueSoureOrg = function($para, para, $sp, inline, defInit, notifyChange) 
{
	console.log("[共用建立發文機關選單] 初始化'發文機關'...");

	//1120901 David 1120407 取得Data檔時，依公文對應的機關代碼取得
	//thePublicRsrc.getDataXML(Common.activeRole.orgNo).done
	thePublicRsrc.getDataXML(theAOL.docObj.sourceOrgNo).done
	(
		function(xmlDoc) 
		{
			console.log(xmlDoc);
			//1090220	Joe		1080755	修改增加判斷，密件公文不可使用紙本發文
			//1090326	Joe		1080755	補上trycatch，避免使用者直接創無密等的稿件會無法開啟--S
			try
			{
				Common.NowSecNo = para.getModel().text("/*/密等及解密條件或保密期限/密等/@代碼");
			}
			catch(e)
			{
				Common.NowSecNo = "";
			}
			//1090326	Joe		1080755	補上trycatch，避免使用者直接創無密等的稿件會無法開啟--E
			//1051212 Cloud	1051176 [鐵改局]修改發文人員需另外可見署名
			//1060102  1051346 	Cloud 	調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值-S
			if(theSSO.User.EnvSettings.get("WE_RESET_ISSUE_ROLES").indexOf(Common.activeRole.roleId)!=-1)
				Common.IsIssueRole = true;
			try
			{
				Common.NewDraft = para.parent.getModel().attr("/*/@NewDraft")=="Y"? true:false;
				//1060203	Cloud	新稿件屬性預設給N-避免自動產生簽稿會核單時，使用者未開啟頁面導致屬性不會改為Y，在會畢退回時才開啟改成完造成簽核物件被清空
				//if(Common.NewDraft)
				//1060206	Cloud	增加判斷會辦單也不異動新稿件屬性
				//if(Common.NewDraft && para.parent.getModel().getDocType()!="簽稿會核單")
				//1091111 David 1090756 調整邏輯，此處不需要
				//if(Common.NewDraft && (para.parent.getModel().getDocType()!="簽稿會核單" && para.parent.getModel().getDocType()!="會辦單") )
					//para.parent.getModel().attr("/*/@NewDraft","N");
				//1060206	Cloud	增加判斷會辦單也不異動新稿件屬性
				//if(para.parent.getModel().getDocType()=="簽稿會核單")
				//1091111 David 1090756 調整邏輯，此處不需要
				//if(para.parent.getModel().getDocType()=="簽稿會核單" && para.parent.getModel().getDocType()=="會辦單")
					//Common.NewDraft =false;

				/*1091111 David 1090756 
				簽稿會核單、會辦單稿件的NewDraft屬性更改時機：
				1.第一次開啟稿件時(人工新增)依正常稿件行為更改為N。
				2.自動新增時(依會辦單位數量判斷)，由RD-FolioModel自動新增行為更改。
				因上述時機稿件上都尚未有簽核物件，故調整屬性觸發清稿不會有衍伸問題，後續在開啟也因為NewDraft=N不會再觸發清稿
				故原本的額外判斷邏輯不需要，讓所有稿件邏輯相同。
				*/
				if(Common.NewDraft)
					para.parent.getModel().attr("/*/@NewDraft","N");
			}
			catch(e)
			{
				Common.NewDraft =false;
			}
			//1060102  1051346 	Cloud 	調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值-E
			//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式
			//Common.snapshot = xmlDoc.evaluate("/*/data[@type='機關']/發文機關", xmlDoc, null, 7, null);
			var $res = $(xmlDoc.documentElement).find("data[type='機關'] 發文機關");
			Common.snapshot  = $res;
			//1051212 Cloud	1051176 [鐵改局]修改，發文機關、署名、署名2，可經由設定過濾不須見資訊-記錄稿件Use_type
			//1060314 Cloud	修正，預設署名邏輯，預設值使用優先序應該是default=>template=>sign
			var NowSignValue = "　";
			try
			{
				Common.DocUseType = para.parent.getModel().attr("/*/@UseType");
			}
			catch(e)
			{
				Common.DocUseType ="";
			}
			//1060105	Cloud	增加署名可依不同文別設定對應署名-s
			try
			{
				Common.DefaultSign = para.parent.getModel().attr("/*/@DefaultSign");
			}
			catch(e)
			{
				//1060314 Cloud	修正，預設署名邏輯，預設值使用優先序應該是default=>template=>sign
				//沒有設定DefaultSign 使用TEMPLATE的值
				//1070917	1070984		Cloud	修正，如先創有設定預設章戳屬性稿件再創無預設章戳屬性稿件則章戳會帶錯問題-無設定屬性時變數清空
				Common.DefaultSign = "";
				try
				{
					NowSignValue = para.getModel().text("/"+para.parent.getModel().getDocType()+"/署名[1]");
				}
				catch(e)
				{
					NowSignValue = "　";
				}
				//沒有設定TEMPLATE 使用sign tag
				if(NowSignValue == "　" && NowSignValue == "")
				{
					if(para.parent.getModel().getDocType().indexOf("簽")!=-1)
						Common.DefaultSign ="sign2";
					else
						Common.DefaultSign ="sign";
				}
			}
			//1060105	Cloud	增加署名可依不同文別設定對應署名-e
			//增加記錄發文字號
			Common.ndIssueWord = $(xmlDoc.documentElement).find("data[type='發文字']");
			if($res.length == 0)
				throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
						
			var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
			// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
			// 2019.10.30 - 1080927 Eric, iPad OS 13 support!
			if (!isMobile && !window.realMac) {
				isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
			}
			if(isMobile) {
				var $list = $("<select data-role='none' style='position:absolute; clip:rect(0px,0px,0px,0px)'></select>").insertBefore($sp);
			}
			else 
			{
				var $list = $("<select data-role='none' style='display:none; font-size:" + $sp.css("font-size") + "; font-family:" + $sp.css("font-family") + "'></select>").insertBefore($sp);
				$list.click(function(event) 
				{
					event.stopPropagation();
					return false;
				});
			}
			//1051012	1050087	Cloud	修正取得發文機關選項，選單未依照目前文稿的發文機關設定問題
			var seleted = "";	
			//1051212 Cloud	1051176 支援發文機關、署名、署名2可由設定過濾
			Common.INCHARGE_OU = theAOL.docObj.get('ODWMSG', ['DOC_NO','SECRETE','INCHARGE_OU'])['INCHARGE_OU'];
			//1051209	Cloud	修正發文機關切換不會連動儲存機關代碼問題
			var OrgNo= "";
			//1060110	1051346		Cloud	調整增加先讀取稿件儲存的署名，有值時就不使用預設署名
			//1060314 Cloud	修正，預設署名邏輯，預設值使用優先序應該是default=>template=>sign
			//移至與Default一起判斷
			/*var NowSignValue = "　";
			try
			{
				NowSignValue = para.getModel().text("/"+para.parent.getModel().getDocType()+"/署名[1]");
			}
			catch(e)
			{
				NowSignValue = "　";
			}
			*/
			//1090519 David 1090218 (鐵道)判斷需內部行文稿件發文機關預設處理
			var iRRBSetDefaultOrg = 0;//紀錄需預設的發文機關INDEX
			//1091028 David 1090800 (鐵道局)內部行文公文，書函、存查案件批次單新增稿件時才需預設單位銜
			//if(SSO_CONFIG.OrgNickName.toUpperCase()=="RRB" && theAOL.docObj.ODWMSG.B_TYPE_NO == "17")
			if(SSO_CONFIG.OrgNickName.toUpperCase()=="RRB" && theAOL.docObj.ODWMSG.B_TYPE_NO == "17" && Common.NewDraft)
			{
				var DocType = para.parent.getModel().getDocType();
				var SubDocType = para.parent.getModel().getSubDocType();
				var DefaultDeptID = theAOL.docObj.ICOUId;
				if(DefaultDeptID.length > 2)
					DefaultDeptID = DefaultDeptID.substr(0,2);
				//1090619 David 1090218 (鐵道局)調整存查案件批示單名稱判斷
				//if(DocType == "存查案件批示單" || ( DocType == "函" && SubDocType == "書函" ))
				if(DocType == "新存查案件批示單" || ( DocType == "函" && SubDocType == "書函" ))
				{
					for(var i=0; i<$res.length; i++) 
					{
						var $org = $res.eq(i);
						//紀錄設定的DeptID
						var DeptID = "";
						if($res.get(i).hasAttribute("DeptID"))
							DeptID = $org.attr("DeptID");

						if(DeptID != "" && DeptID == DefaultDeptID)
						{
							iRRBSetDefaultOrg = i;
							break;
						}
					}
				}
			}
			//1110721 1110796	CloudTEMPLATE發文機關預設值不存在選單內時以第一筆資訊設定
			var Combfound = false;
			var ComFirstOrgInfo = "";
			for(var i=0; i<$res.length; i++) 
			{
				var $org = $res.eq(i);
				var val = $org.find("全銜").text();
				var nm = $org.find("全銜").attr("name");
				//1051209	Cloud	修正發文機關切換不會連動儲存機關代碼問題
				OrgNo = $org.find("機關代碼").text();
				//1090519 David 1090218 紀錄機關地址
				var OrgAddress = $org.find("機關地址").text();

				if(nm == undefined)
					nm = val;

				//1090519 David 1090218 調整執行時機，發文機關資料未被排除才進行後續判斷
				if(!fnCheckDataXml($res.get(i),$org,Common.INCHARGE_OU,"發文機關"))
					continue;

				//1110721 1110796	CloudTEMPLATE發文機關預設值不存在選單內時以第一筆資訊設定
				if(ComFirstOrgInfo=="")
				{
					//全銜|代碼｜地址｜署名
					ComFirstOrgInfo = val+"|"+OrgNo+"|"+$org.find("機關地址").text()+"|"+$org.find(Common.DefaultSign).text();
				}

				//1090519 David 1090218 如需鐵道內部行文稿件發文機關預設處理，就不需依原有邏輯帶預設值
				if(iRRBSetDefaultOrg != 0)
				{
					if(i == iRRBSetDefaultOrg)
					{
						seleted = "selected='selected'";
						if(OrgNo!=para.getModel().text(inline.syncPath.replace('全銜','機關代碼')))//修正錯誤資料
						{
							para.getModel().text(inline.syncPath.replace('全銜','機關代碼'),OrgNo);
						}
						if(Common.NewDraft)
						{
							if($org.find(Common.DefaultSign)!=undefined)
							{
								Common.NewSign = $org.find(Common.DefaultSign).text();
							}
							else if(NowSignValue!= "　")
							{
								Common.NewSign = NowSignValue;//如果DATA.XML 沒有預設章戳，則調整成使用TEMPLATE裡面的
							}
							//調整創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值-恢復預設
							Common.NewDraft = false;
						}

						//鐵道內部行文稿件發文機關預設處理時，需更新預設發文機關資料回稿件
						para.getModel().text(inline.syncPath.replace('全銜','機關地址'),$org.find("機關地址").text());//更新稿件內機關地址
						para.getModel().text(inline.syncPath,nm);//更新稿件內全銜
						$sp.text(nm);//更新畫面全銜
					}
				}
				else
				{
					//1051012	1050087	Cloud	修正取得發文機關選項，選單未依照目前文稿的發文機關設定問題
					if(nm == $sp.text())
					{
						//1110721 1110796	CloudTEMPLATE發文機關預設值不存在選單內時以第一筆資訊設定
						Combfound = true;
						
						seleted = "selected='selected'";
						if(OrgNo!=para.getModel().text(inline.syncPath.replace('全銜','機關代碼')))//修正錯誤資料
						{
							para.getModel().text(inline.syncPath.replace('全銜','機關代碼'),OrgNo);
						}
						//1050105 Cloud	[1051346]取得目前發文機關的預設署名
						//1060110	1051346		Cloud	調整增加先讀取稿件儲存的署名，有值時就不使用預設署名
						//if($org.find(Common.DefaultSign)!=undefined)
						//1060111	1051346		Cloud	調整發文人員開啟時不使用預設署名
						//1060102  1051346 	Cloud 	調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值
						//if(!Common.IsIssueRole)
						if(Common.NewDraft)
						{
							if($org.find(Common.DefaultSign)!=undefined)
							{
								Common.NewSign = $org.find(Common.DefaultSign).text();
							}
							else if(NowSignValue!= "　")
							{
								Common.NewSign = NowSignValue;//如果DATA.XML 沒有預設章戳，則調整成使用TEMPLATE裡面的
							}
							//1060102  1051346 	Cloud 	調整 創稿時，增加代表新稿件屬性，僅創稿時，署名會帶預設值-恢復預設
							Common.NewDraft = false;
						}
					}
				}
				//1051212 Cloud	1051176 支援發文機關、署名、署名2可由設定過濾-E
				//1090519 David 1090218 調整執行時機
				//if(!fnCheckDataXml($res.get(i),$org,Common.INCHARGE_OU,"發文機關"))
				//	continue;

				//1051209	Cloud	修正發文機關切換不會連動儲存機關代碼問題
				//$list.append("<option value='" + val + "' "+seleted+">" + nm + "</option>");
				//1100506 David 1100473 弱掃修正Client DOM Stored XSS
				//$list.append("<option OrgValue='"+OrgNo+"' value='" + val + "' "+seleted+">" + nm + "</option>");
				//1100922 David 1100991 弱掃修正Client Potential XSS
				//$list.append("<option OrgValue='"+htmlencode(OrgNo)+"' value='" + htmlencode(val) + "' "+seleted+">" + nm + "</option>");
				$list.append("<option OrgValue='"+htmlencode(OrgNo)+"' value='" + htmlencode(val) + "' "+seleted+">" + htmlencode(nm) + "</option>");
				seleted = "";
			}
			//1110721 1110796	CloudTEMPLATE發文機關預設值不存在選單內時以第一筆資訊設定-S
			if(!Combfound && Common.NewDraft)//
			{
				//全銜|代碼｜地址｜署名
				//ComFirstOrgInfo = val+"|"+OrgNo+"|"+$org.find("機關地址").text()+"|"+$org.find(Common.DefaultSign).text();
				var arrComFirstOrgInfo = ComFirstOrgInfo.split('|');
				para.getModel().text(inline.syncPath,arrComFirstOrgInfo[0]);
				para.getModel().text(inline.syncPath.replace('全銜','機關代碼'),arrComFirstOrgInfo[1]);
				para.getModel().text(inline.syncPath.replace('全銜','機關地址'),arrComFirstOrgInfo[2]);
				Common.NewSign = arrComFirstOrgInfo[3];
				Common.NewDraft = false;
				$sp.text(arrComFirstOrgInfo[0]);	// 1070928 Raymond 1071019 頁面上的全銜欄位直接設為新的全銜
				theCustom.setValue("地址", arrComFirstOrgInfo[2], true);	// 1070928 Raymond 1071019 連動的地址欄位用setValue, 若當前頁面尚未畫出地址欄位, RD-CustomMgr.js會延遲設定
			}
			//1110721 1110796	CloudTEMPLATE發文機關預設值不存在選單內時以第一筆資訊設定-E
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $sp.bind
			$sp.on("click tap", function(event) 
			{
				//$(this).closest(".viewPort").data("editCursor").hide();
				if(isMobile)
					//1081008	Joe		1080339		jQuery升級3.4.1
					// $list.focus();
					$list.trigger("focus");
				else {
					$sp.hide();
					//1081008	Joe		1080339		jQuery升級3.4.1
					// $list.show().focus();
					$list.show().trigger("focus");
				}
				return false;   // 回傳false, 可禁止後續event被觸發
			});

			//1081008	Joe		1080339		jQuery升級3.4.1
			// $list.bind
			$list.on("change", function(event) 
			{
				var val = $(this).val();
				//1051209	Cloud	修正發文機關切換不會連動儲存機關代碼問題
				var OrgNo = $($(this).get(0).options[$(this).get(0).selectedIndex]).attr('OrgValue');
				if(para.getModel().text(inline.syncPath, val)) 
				{
					//1051209	Cloud	修正發文機關切換不會連動儲存機關代碼問題
					para.getModel().text(inline.syncPath.replace('全銜','機關代碼'),OrgNo);
					$sp.text(val);
					notifyChange(val, para, "發文機關");

					//para.getModel().needRetransFO(true);		// 2016.10.12 更新文面-增加更新文面功能
					$para.closest(".pages").flip("refresh");
				}
				//1080610 David 1080433 新增發文機關異動時，設定文稿清單已異動旗標，供文稿基資連動判斷使用
				para.getModel().setDraftListChanged(true);
			}
			//1081008	Joe		1080339		jQuery升級3.4.1
			// ).bind("blur", function(event) 
			).on("blur", function(event) 
				{
					if(!isMobile) 
					{
						$sp.show();
						$(this).hide();
					}
				}
			);
		}
	);
	//增加呼叫WS取得支號設定順序
	//1130806	Leslie[1130313]	[Merge-1100394]系統參數直接使用theSSO.User.SystemSets紀錄，不需CALL WS
	/*var params = 
	{
		"argParaType": "WE_ISSUENONO_RULE",
		"argParaVal": "",
		"argSourceOrgno": theUserInfo.OrgID,
	};
	try
	{
		theWebServices.invokeWS//此處呼叫ws需使用全域theWebServices
		(SSO_CONFIG.getWSUrl("weorginfows"), "GetSysTemSetWithOrgNo", null, params, true, function(r) {
			console.log("GetSysTemSetWithOrgNo returns: ");
			console.log(r);
			var NoNoRule = "";

			if(r!="")
				NoNoRule = r;
					
			var Rule1 = "";
			var Rule2 = "";
			var Rule3 = "";
			if(typeof(NoNoRule) != 'string' || NoNoRule.length != 3)
			{
				Rule1 = "1";
				Rule2 = "A";
				Rule3 = "a";
			}
			else
			{
				Rule1 = NoNoRule.substr(0,1);
				Rule2 = NoNoRule.substr(1,1);
				Rule3 = NoNoRule.substr(2,1);
			}
			//第一組

			Common.AddNonoRule(Rule1);
			Common.AddNonoRule(Rule2);
			Common.AddNonoRule(Rule3);	
		})
	}
	catch(e)
	{
	}*/
	
	var NoNoRule = theSSO.User.SystemSets.get("WE_ISSUENONO_RULE");
	var Rule1 = "";
	var Rule2 = "";
	var Rule3 = "";
	if(typeof(NoNoRule) != 'string' || NoNoRule.length != 3)
	{
		Rule1 = "1";
		Rule2 = "A";
		Rule3 = "a";
	}
	else
	{
		Rule1 = NoNoRule.substr(0,1);
		Rule2 = NoNoRule.substr(1,1);
		Rule3 = NoNoRule.substr(2,1);
	}
	//第一組
	Common.AddNonoRule(Rule1);
	Common.AddNonoRule(Rule2);
	Common.AddNonoRule(Rule3);
	
	try
	{
		//1051109	Cloud	取得已設定的決行層級-可能有稿件沒有這個TAG取不到就預設為空
		Common.O_ProxyLv = para.getModel().text("/*/決行層次");
	}
	catch(e)
	{
		Common.O_ProxyLv ="";
	}
	return false;	// 略過預設的初始化動作
}
Common.fnInitSpd = function($list, inline, defProc) 
{
	console.log("共用初始化'速別'選單");
	var spd = "";
	try 
	{
		spd = inline.para.getModel().text(inline.syncPath);	
	}
	catch(e) 
	{
		console.error(e.message);
	}
	$list.append("<option" + ((spd == "")?" selected":"") + "></option>");	// 2015.9.11 - Raymond新增空白速別
	$list.append("<option" + ((spd == "普通件")?" selected":"") + ">普通件</option>");
	$list.append("<option" + ((spd == "速件")?" selected":"") + ">速件</option>");
	$list.append("<option" + ((spd == "最速件")?" selected":"") + ">最速件</option>");
}
Common.fnInitSign = function($list, inline, defProc) 
{
	console.log("共用初始化'署名1'選單");
	var spd = "";
	try 
	{
		//1120901 David 1120407 取得Data檔時，依公文對應的機關代碼取得
		//thePublicRsrc.getDataXML(Common.activeRole.orgNo).done(function(xmlDoc) 
		thePublicRsrc.getDataXML(theAOL.docObj.sourceOrgNo).done(function(xmlDoc) 
		{
			console.log(xmlDoc);
			var docType = inline.getModel().getDocType();//POPUP取得文別方式
			var signList;
			if(docType.indexOf("簽")!=-1)
			{
				//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式
				//signList = xmlDoc.evaluate("/*/data[@type='簽的署名']/代碼", xmlDoc, null, 7, null);
				signList = $(xmlDoc.documentElement).find("data[type='簽的署名'] 代碼");
			}
			else
			{
				//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式
				//signList = xmlDoc.evaluate("/*/data[@type='署名1']/代碼", xmlDoc, null, 7, null);
				signList = $(xmlDoc.documentElement).find("data[type='署名1'] 代碼");
			}

			//if(signList.snapshotLength == 0)
			if(signList.length==0)
			{
				if(docType.indexOf("簽")!=-1)
				{
					throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到簽的署名");
				}
				else
				{
					throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到署名1");
				}
			}
			//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式
			//for(var i=0; i<signList.snapshotLength; i++) 
			//1051012 Cloud	修正署名設定
			var strselected = "";
			//1060309 	序3052	Cloud	補強預設署名功能，新稿件預設署名於選單內無法對應時，調整為一率設為第一個
			var StrfirstSign = "";
			var bNoDefaultData = true;
			// 1141027 Raymond 1140830 新增取得文稿的DefaultSign
			var defSign = undefined;
			try {
				defSign = inline.getModel().attr("/*/@DefaultSign");
			}
			catch(e) {}
			for(var i=0; i<signList.length; i++) 
			{
				// 1141027 Raymond 1140830 新增過濾"類型"與文稿的DefaultSign不相符的署名項目
				if(!!defSign && !fnCheckSignCatelog(signList.get(i), defSign))
					continue;
				//1051212 Cloud	1051176 支援發文機關、署名、署名2可由設定過濾-E
				if(!fnCheckDataXml(signList.get(i),signList.eq(i),Common.INCHARGE_OU,"署名"))
					continue;

				//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式
				/*var org = signList.snapshotItem(i);
				var nm = $(org).attr("value");//取得屬性方式*/
				//1080903	Joe		1080339		jQuery升級2.2.4
				// var nm = signList.eq(i).attr("value");
				//1081008	Joe		1080339		jQuery升級3.4.1，xml物件無法使用prop取值
				// var nm = signList.eq(i).prop('disabled', true);
				var nm = signList.eq(i).attr("value");
				//1060309 Cloud 紀錄第一個署名
				if(StrfirstSign=="")
				{
					StrfirstSign = nm;
				}
				//1051011					Raymond	取得客製化的"取代章戳"設定到option
				//1051012	Cloud 設定署名選項
				//1051014	1050087	Cloud	修正，因發文機關觸發的REFLASH，導致署名連動被設回前次選擇的值
				//-判斷有連動後得值以連動後的值設定，避免被設回前次選擇的值
				if(Common.NewSign!="")
				{
					if(nm==Common.NewSign)
					{
						//1060309 Cloud 增加判斷選單內是否有找到預設值
						bNoDefaultData = false;
						strselected = "selected='selected'";
						//1060105 Cloud	1051346 增加開啟文稿時有預設章戳時將結點內容換掉(開啟時Raymond會設定)-S
						inline.para.getModel().text(inline.syncPath,Common.NewSign);
						inline.para.$para.find("span.a").text(Common.NewSign);
						if(signList.eq(i).attr("取代章戳")!=undefined)
						{
							try
							{
								inline.para.getModel().text(inline.syncPath+"/@取代章戳",signList.eq(i).attr("取代章戳"));
								// 1140708 Raymond 1140159 合併1111142, 新增判斷DataXML中的署名1若有「檔名」、「size」屬性時, 一併設定到預設署名1中
								if(!!signList.eq(i).attr("檔名") && !!signList.eq(i).attr("size")) {
									var fn = "Other\\" + theUserInfo.OrgID + "\\" + signList.eq(i).attr("檔名");
									inline.para.getModel().attr(inline.syncPath+"/@檔名路徑",fn);
									inline.para.getModel().attr(inline.syncPath+"/@size",signList.eq(i).attr("size"));
								}
								// 1140708 Raymond 1140159 合併1140410, 修正若DataXML中的署名1沒有「檔名」、「size」屬性時, 清空署名1的「檔名路徑」、「size」屬性
								else {
									inline.para.getModel().attr(inline.syncPath+"/@檔名路徑","");
									inline.para.getModel().attr(inline.syncPath+"/@size","");
								}
							}
							catch(e)
							{}
						}
						else
						{
							try
							{
								inline.para.getModel().text(inline.syncPath+"/@取代章戳","");
								// 1140708 Raymond 1140159 合併1111142, 新增一併清空「檔名路徑」、「size」屬性
								inline.para.getModel().text(inline.syncPath+"/@檔名路徑","");
								inline.para.getModel().text(inline.syncPath+"/@size","");
							}
							catch(e)
							{}
						}
						//1060105 Cloud	1051346 增加開啟文稿時有預設章戳時將結點內容換掉(開啟時Raymond會設定)-E
					}
				}
				else
				{
					if(nm==inline.text)
					{
						//1060309 Cloud 增加判斷選單內是否有找到預設值
						bNoDefaultData = false;
						strselected = "selected='selected'";
						
						//1130117	Leslie[1121059]	修正稿件<署名>未正確設置"取代章戳"屬性值時，以Data檔的內容回寫至稿件
						//1130328	Joe		序62		增加Trycatch避免樣板檔無取代章戳屬性時getmodel.text直接壞掉
						try
						{	
							let targetSign = signList.eq(i).attr("取代章戳");
							if(targetSign != undefined && inline.para.getModel().text(inline.syncPath+"/@取代章戳") != targetSign)
								inline.para.getModel().text(inline.syncPath+"/@取代章戳", targetSign);
						}
						catch(e)
						{}
					}
				}
				if(signList.get(i).hasAttribute("取代章戳")) {
					// 1140708 Raymond 1140159 合併1111142, 新增判斷DataXML中的署名1若有「檔名」、「size」屬性時, 一併設定到選單option中
					//1051012	Cloud 設定署名選項
					//$list.append("<option data-subst='" + signList.eq(i).attr("取代章戳") + "'>" + nm + "</option>");
					//1100506 David 1100473 弱掃修正Client Potential XSS
					//$list.append("<option "+strselected+" data-subst='" + signList.eq(i).attr("取代章戳") + "'>" + nm + "</option>");
					//$list.append("<option "+strselected+" data-subst='" + htmlencode(signList.eq(i).attr("取代章戳")) + "'>" + htmlencode(nm) + "</option>");
					if(signList.get(i).hasAttribute("檔名") && signList.get(i).hasAttribute("size")) {
						var fn = "Other\\" + theUserInfo.OrgID + "\\" + signList.eq(i).attr("檔名");
						$list.append("<option "+strselected+" data-subst='" + htmlencode(signList.eq(i).attr("取代章戳")) + "' data-fn='" + htmlencode(fn) + "' data-size='" + htmlencode(signList.eq(i).attr("size")) + "'>" + htmlencode(nm) + "</option>");
					}
					else {
						theLogger.warn("機關代碼_Data.xml的署名1選單未設定'檔名'及'size'屬性");
						$list.append("<option "+strselected+" data-subst='" + htmlencode(signList.eq(i).attr("取代章戳")) + "'>" + htmlencode(nm) + "</option>");
					}
				}
				else
					//1051012	Cloud 設定署名選項
					//$list.append("<option >"+nm+"</option>");
					//1100506 David 1100473 弱掃修正Client Potential XSS
					//$list.append("<option "+strselected+">"+nm+"</option>");
					$list.append("<option "+strselected+">"+htmlencode(nm)+"</option>");
					strselected = "";
			}
			//1060309 	序3052	Cloud	補強預設署名功能，新稿件預設署名於選單內無法對應時，調整為一率設為第一個，並寫出log提供現場異常時追查方向
			if(bNoDefaultData && (Common.NewSign!="" || Common.NewSign!="　"))
			{		
				console.log("預設署名："+Common.NewSign+"於署名選單內不存在，請檢查DATA.XML。");
				console.log("將署名設定為選單第一個");
				inline.para.getModel().text(inline.syncPath,StrfirstSign);
				inline.para.$para.find("span.a").text(StrfirstSign);
			}
			//1051014 Cloud	1050087	恢復連動值預設
			Common.NewSign = "";
		});
	}
	catch(e) 
	{
		// 1141020 Raymond 陸委會序293 發生Error時, 改用theLogger記錄
		//console.error(e.message);
		theLogger.error(e.stack || e.message);
	}
}
Common.fnInitSign2 = function($list, inline, defProc) 
{
	console.log("共用初始化'署名2'選單");
	
	try 
	{
		//1120901 David 1120407 取得Data檔時，依公文對應的機關代碼取得
		//thePublicRsrc.getDataXML(Common.activeRole.orgNo).done(function(xmlDoc) 
		thePublicRsrc.getDataXML(theAOL.docObj.sourceOrgNo).done(function(xmlDoc) 
		{
			console.log(xmlDoc);
			//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式
			//var sign2List = xmlDoc.evaluate("/*/data[@type='署名2']/代碼", xmlDoc, null, 7, null);
			//if(sign2List.snapshotLength == 0)
			var sign2List = $(xmlDoc.documentElement).find("data[type='署名2'] 代碼");
			if(sign2List.length == 0)			
				throw new Error(Common.activeRole.orgNo + "_Data.xml中找不到署名2");
			//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式	
			//for(var i=0; i<sign2List.snapshotLength; i++) 
			var strselected = "";
			// 1141027 Raymond 1140830 新增取得文稿的DefaultSign
			var defSign = undefined;
			try {
				defSign = inline.getModel().attr("/*/@DefaultSign");
			}
			catch(e) {}
			for(var i=0; i<sign2List.length; i++) 
			{
				// 1141027 Raymond 1140830 新增過濾"類型"與文稿的DefaultSign不相符的署名項目
				if(!!defSign && !fnCheckSignCatelog(sign2List.get(i), defSign))
					continue;
				//1051212 Cloud	1051176 支援發文機關、署名、署名2可由設定過濾-E
				if(!fnCheckDataXml(sign2List.get(i),sign2List.eq(i),Common.INCHARGE_OU,"署名2"))
					continue;
				//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML讀取方式	
				/*var org = sign2List.snapshotItem(i);
				var nm = $(org).attr("value");*/
				//1080903	Joe		1080339		jQuery升級2.2.4
				// var nm = sign2List.eq(i).attr("value");
				//1081008	Joe		1080339		jQuery升級3.4.1
				// var nm = sign2List.eq(i).prop('disabled', true);
				//1081031	Joe		1080339		錯誤修正
				// var nm = sign2List.eq(i).prop("value");
				var nm = sign2List.eq(i).attr("value");
				//1051011					Raymond	取得客製化的"取代章戳"設定到option
				//1051014	1050087	Cloud	修正，因發文機關觸發的REFLASH，導致署名連動被設回前次選擇的值
				//-判斷有連動後得值以連動後的值設定，避免被設回前次選擇的值
				if(Common.NewSign2!="")
				{
					if(nm==Common.NewSign2)
						strselected = "selected='selected'";
				}
				else
				{//1051012	Cloud 設定署名選項
					if(nm==inline.text)
						strselected = "selected='selected'";
				}
				if(sign2List.get(i).hasAttribute("取代章戳")) {
					// 1140708 Raymond 1140159 合併1111142, 新增判斷DataXML中的署名2若有「檔名」、「size」屬性時, 一併設定到選單option中
					//$list.append("<option data-subst='" + sign2List.eq(i).attr("取代章戳") + "'>" + nm + "</option>");
					//1100506 David 1100473 弱掃修正Client Potential XSS
					//$list.append("<option "+strselected+" data-subst='" + sign2List.eq(i).attr("取代章戳") + "'>" + nm + "</option>");
					//$list.append("<option "+strselected+" data-subst='" + htmlencode(sign2List.eq(i).attr("取代章戳")) + "'>" + htmlencode(nm) + "</option>");
					if(sign2List.get(i).hasAttribute("檔名") && sign2List.get(i).hasAttribute("size")) {
						var fn = "Other\\" + theUserInfo.OrgID + "\\" + sign2List.eq(i).attr("檔名");
						$list.append("<option "+strselected+" data-subst='" + htmlencode(sign2List.eq(i).attr("取代章戳")) + "' data-fn='" + htmlencode(fn) + "' data-size='" + htmlencode(sign2List.eq(i).attr("size")) + "'>" + htmlencode(nm) + "</option>");
					}
					else {
						theLogger.warn("機關代碼_Data.xml的署名2選單未設定'檔名'及'size'屬性");
						// 1141020 Raymond 陸委會序293 修正署名2選項有設定'取代章戳', 未設定'檔名'及'size'屬性時, 會發生Error而帶不出以下選項的問題
						//$list.append("<option "+strselected+" data-subst='" + htmlencode(signList.eq(i).attr("取代章戳")) + "'>" + htmlencode(nm) + "</option>");
						$list.append("<option "+strselected+" data-subst='" + htmlencode(sign2List.eq(i).attr("取代章戳")) + "'>" + htmlencode(nm) + "</option>");
					}
				}
				else
					//$list.append("<option>"+nm+"</option>");
					//1100506 David 1100473 弱掃修正Client Potential XSS
					//$list.append("<option "+strselected+">"+nm+"</option>");
					$list.append("<option "+strselected+">"+htmlencode(nm)+"</option>");
					strselected="";
			}
			//1051014	Cloud	1050087	恢復連動值預設
			Common.NewSign2="";
		});
	}
	catch(e) 
	{
		// 1141020 Raymond 陸委會序293 發生Error時, 改用theLogger記錄
		//console.error(e.message);
		theLogger.error(e.stack || e.message);
	}
}
//1061211	1061180	Cloud	修改除原有法規規定年限外，再增加透過ws檢核內規設定的年限
var gKeepYear="";
Common.fnCheckKeepYear = function(val, para, fldName) 
{
	console.log("共用檢核保存年限'" + fldName + "'='" + val + "'(保存年限)");
	try 
	{
		if(val== "")
		return;
		var bChkOK = true;
		//1061211	1061180	Cloud	修改除原有法規規定年限外，再增加透過ws檢核內規設定的年限
		gKeepYear = val;
		var nKeepYear = parseInt(val);
		if(!isNaN(nKeepYear))
		{
			if(nKeepYear == 99 || nKeepYear == 30 || nKeepYear == 25 || 
			   nKeepYear == 20 || nKeepYear == 15 || nKeepYear == 10 ||
			   nKeepYear == 5 || nKeepYear == 3 || nKeepYear == 1)
			{
				theCustom.setValue("保存年限",nKeepYear,true);
				//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'KEEP_YEAR', value: nKeepYear}]);	
				//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'KEEP_YEAR', value: nKeepYear}]);
			}
			else
				bChkOK = false;
		}
		else
			bChkOK = false;

		if(!bChkOK)
		{
			//1061211	1061180	Cloud	修改除原有法規規定年限外，再增加透過ws檢核內規設定的年限
			var strCheckClo = para.getModel().text("/*/分類號");
			if(strCheckClo=="")
			{
				alert("請先輸入分類號。");
				theCustom.setValue("保存年限","",true);
				return;
			}
			var paramsws_checkKeepYear = {
				"argSessionId": localStorage.Artifact,
				"argSourceOrgNo": theAOL.docObj.sourceOrgNo,
				"argClsNo": strCheckClo,
				"argKeepYear": gKeepYear
			};
			window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckKeepYear", null, paramsws_checkKeepYear, false, function (rtn){
				if(rtn!="")
				{
					var oldkeepyear = para.getModel().text("/*/保存年限");
					var strA = "您所輸入的保存年限不符法規之規定，保存年限應為下列數值：\n\n";
					var strB = "99(永久)、30、25、20、15、10、5、3、1。\n\n";
					var strC = "請按【確定】由程式帶出該分類號預設保存年限；或按【取消】更回前次保存年限："+oldkeepyear+"。";
					var bConfirm = window.confirm(strA+strB+strC);
					if(bConfirm)
					{
						var clsno = para.getModel().text("/*/分類號");		
						if(clsno=="")
						{
							alert("請先輸入分類號。");
							theCustom.setValue("保存年限","",true);
							return;
						}
						//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
						//var params = {
						//	"ClassNo": clsno,
						//	"UserID": theUserInfo.UserID,
						//	"OrgNo": theUserInfo.OrgID,
						//	"SecNo": para.getModel().text("/*/密等及解密條件或保密期限/密等/@代碼"),
						//};
						var params = new SOAPClientParameters();
						params.add('ClassNo', clsno);
						params.add('UserID', theUserInfo.UserID);
						params.add('OrgNo', theUserInfo.OrgID);
						params.add('SecNo', para.getModel().text("/*/密等及解密條件或保密期限/密等/@代碼"));
						
						
						//此處呼叫ws需使用全域theWebServices
						//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
						//theWebServices.invokeWS(SSO_CONFIG.getWSUrl("webeditws"), "CheckCls", "T2100", params, true, function(r) 
						SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "CheckCls", params, true, function(result) 
						{
							//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
							var r = result.value;	//invokeJSON的回傳值，由value取得
							console.log("CheckCls returns: ");
							console.log(r);
							if("ErrorClass" in r && r.ErrorClass.IsErr == "true") 
							{
								var FileCls = para.getModel().text("/*/分類號");//新分類號不可使用時放回舊分類號
								theCustom.setValue("分類號",FileCls,true);//不可使用時使用舊分類號
								//1051014	1050087		Cloud	修正分類號檢核跳出的提示訊息
								//alert(r.ErrorClass.ErrMessage.anyType+"已更回原分類號："+FileCls);				
								alert(r.ErrorClass.ErrMessage.anyType.text+"已更回原分類號："+FileCls);				
							}
							else
							{
								var bPassCheck = true;
								//1061220	[1061230]	Cloud	修改案次號onlbur時，比照分類號，檢核保存年限是否符合線上簽核類型-修改為共用函式
								/*if(theAOL.docObj.get('ODWMSG', 'SIGN_TYPE')=="E")
								{
									var EkeepYear = theSSO.User.EnvSettings.get("OD_ESIGN_KEEPYEAR");
									if(EkeepYear!="" && EkeepYear!="0")
									{
										if(EkeepYear<r.KeepYear)*/
										//1111014 Zen 1111065 修正保存年限檢核後未還原原始年限之問題
										//if(fnCheckKeepYear(r.KeepYear))
										if(!fncheckKeepyear(r.KeepYear))
										{
											bPassCheck = false;
											var FileCls = theAOL.docObj.get('ODWMSG', 'FILE_CLS');//新分類號不可使用時放回舊分類號
											theCustom.setValue("分類號",FileCls,true);//不可使用時使用舊分類號
											//1061220 Cloud [1061230] 線上簽核公文保存年限是否合乎設定檢和改為共用函式
											//alert("分類號："+clsno+"保存年限大於線上簽核公文規定之保存年限("+EkeepYear+"年)，不宜以線上簽核處理。已更回原分類號");
											alert("分類號："+clsno+"保存年限大於線上簽核公文規定之保存年限("+ComgEkeepYear+"年)，不宜以線上簽核處理。已更回原分類號");
										}
									//}
								//}	
								if(bPassCheck)
								{
									var bAllClsSame = true;
									if(r.CaseNo!="")
										theCustom.setValue("案次號",r.CaseNo,true);//可使用一併異動案次號
									theCustom.setValue("保存年限",r.KeepYear,true);//可使用時異動保存年限
									theAOL.getCurrFolio().getAllDraftText("/*/分類號").done(function(arr) 
									{
										//1050805 Cloud	修正取得錯誤方式
										//if(arr[0].errorText!="")//錯誤時會有錯誤訊息
										//1051014 Cloud	調整分類號檢核方式-逐稿件檢核，有錯誤最後再一次跳
										//if(arr[0].errorText==undefined)//錯誤時會有錯誤訊息
										//{
											var strErr="";
											for(var i=0;i<arr.length;i++)
											{
												//1051014	Cloud	多稿時應該每個稿件判斷錯誤訊息
												if(arr[i].errorText!=undefined)
												{
													if(arr[i].errorText.indexOf("找不到")!=-1)//有找不到時，表示當份稿件沒有分類號，不比對
														continue;
													else
														strErr+="取得第"+i+"份文稿分類號時發生異常："+arr[i].errorText;
														
												}
												if(clsno!=arr[i].text)//分類號與其他稿件不同時跳出是否一併修改訊息
												{
													bAllClsSame = false;
													break;
												}
																	
											}
											if(!bAllClsSame)
											{
												if(window.confirm('輸入之分類號與其他稿件不同，是否確定要修改？點選確定後將一併修改所有稿件之分類號及保存年限'))
												{
													theAOL.getCurrFolio().setAllDraftText("/*/分類號",clsno).done
													(
															function(arr) 
															{
																//if(!arr[0].success)
																if(arr[0].success!=undefined && arr[0].success==false)
																	alert("設定各稿分類號時發生異常："+arr[0].errorText);
															}
													);
													theAOL.getCurrFolio().setAllDraftText("/*/保存年限",r.KeepYear).done
													(
															function(arr) 
															{
																//if(!arr[0].success)
																if(arr[0].success!=undefined && arr[0].success==false)
																	alert("設定各稿分類號時發生異常："+arr[0].errorText);
															}
													);
												}
											}
											if(strErr!="")
												alert(strErr);
										//}
										//else
										//{
												//alert("取得所有稿件分類號時發生異常："+arr[0].errorText);
										//}
									});
								}
							}
						})
					}
					else
					{
						theCustom.setValue("保存年限",oldkeepyear,true);
						//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'KEEP_YEAR', value: oldkeepyear}]);	
						//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'KEEP_YEAR', value: oldkeepyear}]);	
					}
				}
			});
		}
	}
	catch(e) 
	{
		alert("呼叫WS檢核保存年限時發生異常："+e.message);
	}	
}
Common.fnCheckCls = function(val, para, fldName,preVal)//現值，畫面物件，畫面欄位，前次輸入的值 
{
	//1100729 David 1100860 檢核前先進行全形轉半形判斷，避免使用者誤輸入全形文字
	val = fnFullToHalf(val);

	//1100510 David 1100221 移除jQuery.trim()
	//if(jQuery.trim(val)=="")
	if(jf_Trim(val)=="")
		return;
	//1050901	1050087	Cloud	分類號案次號轉大寫
	val = val.toUpperCase();
	console.log("共用檢核分類號'" + fldName + "'='" + val + "'(分類號)");
	try 
	{
		var DocSec = "1";
		try
		{
			DocSec = para.getModel().text("/*/密等及解密條件或保密期限/密等/@代碼");
		}
		catch(e)
		{}
		//1090102 David 1090001 新增取得年度號
		var strYear = "";
		try
		{
			strYear = para.getModel().text("/*/年度號");
		}
		catch(e)
		{
			strYear = "";
		}
		if(strYear == "")
		{
			if(theAOL.docObj.docNo != "")
				strYear = theAOL.docObj.docNo.substr(0,3);
			else
			{
				var today = new Date();
				strYear = parseInt(today.getFullYear()) - 1911;
			}
		}

		//1100407 David 1100276 如oldClsVal有值(透過EAC005查詢時會有值)，依oldClsVal為舊分類號來源，如舊分類號與輸入分類號相同時，將舊分類號清空。
		if(oldClsVal != "")
		{
			preVal = oldClsVal;
			oldClsVal = "";
		}
		if(preVal == val)
		{
			preVal = "";
			oldKeepYearVal = "";
		}

		//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
		//var params = 
		//{
		//	"ClassNo": val
		//	,"UserID": theUserInfo.UserID
		//	,"OrgNo": theUserInfo.OrgID
		//	,"SecNo": DocSec
		//	//1090102 David 1090001 新增傳入年度號
		//	,"argYear": strYear
		//};
		var params = new SOAPClientParameters();
		params.add('ClassNo', val);
		params.add('UserID', theUserInfo.UserID);
		params.add('OrgNo', theUserInfo.OrgID);
		params.add('SecNo', DocSec);
		params.add('argYear', strYear);
		
		//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
		//theWebServices.invokeWS//此處呼叫ws需使用全域theWebServices
		//(SSO_CONFIG.getWSUrl("webeditws"), "CheckCls", "T2100", params, true, function(r) 
		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "CheckCls", params, true, function(result) 
		{
			//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
			var r = result.value;	//invokeJSON的回傳值，由value取得
			
			console.log("CheckCls returns: ");
			console.log(r);
			if("ErrorClass" in r && r.ErrorClass.IsErr == "true") 
			{
				theCustom.setValue("分類號",preVal,true);
				//1100503 David 1100276 帶回舊分類號時，一併帶回舊保存年限
				if(oldKeepYearVal != "")
				{
					theCustom.setValue("保存年限",oldKeepYearVal,true);
					oldKeepYearVal = "";
				}
				//1051014	1050087		Cloud	修正分類號檢核跳出的提示訊息
				//alert(r.ErrorClass.ErrMessage.anyType+"，已更回原分類號"+preVal);
				alert(r.ErrorClass.ErrMessage.anyType.text+"，已更回原分類號"+preVal);
			}
			else
			{
				var bPassCheck = true;
				//1061220	[1061230]	Cloud	修改案次號onlbur時，比照分類號，檢核保存年限是否符合線上簽核類型-修改為共用函式
				/*if(theAOL.docObj.get('ODWMSG', 'SIGN_TYPE')=="E")//判斷公文類別
				{
					/*var EkeepYear = theSSO.User.EnvSettings.get("OD_ESIGN_KEEPYEAR");
					if(EkeepYear!="" && EkeepYear!="0")
					{
						if(EkeepYear<r.KeepYear)
						{
							bPassCheck = false;		
							theCustom.setValue("分類號",preVal,true);//不可使用時使用前次分類號
							alert("分類號"+val+"保存年限大於線上簽核公文規定之保存年限("+EkeepYear+"年)，不宜以線上簽核處理。已更回原分類號"+preVal);
						}
					}
				}*/
				//1100408 David 1100192 修改帶回保存年限邏輯同公文基資判斷
				/*if(!fncheckKeepyear(r.KeepYear))
				{
					bPassCheck = false;
					theCustom.setValue("分類號",preVal,true);//不可使用時使用前次分類號
					alert("分類號"+val+"保存年限大於線上簽核公文規定之保存年限("+ComgEkeepYear+"年)，不宜以線上簽核處理。已更回原分類號"+preVal);
				}*/
				var setRtnKeepYear = false;
				if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y')
				{
					if (r.KeepYear == '') {
						if (theSSO.User.EnvSettings.get("OD_CLS_RULE") == '1') {
							bPassCheck = false;
							theCustom.setValue("分類號",preVal,true);//不可使用時使用前次分類號
							//1100503 David 1100276 帶回舊分類號時，一併帶回舊保存年限
							if(oldKeepYearVal != "")
							{
								theCustom.setValue("保存年限",oldKeepYearVal,true);
								oldKeepYearVal = "";
							}
							alert('您輸入之分類號,無對應之保存年限,請重新輸入分類號');
						}
					}
					else
					{
						if(!fncheckKeepyear(r.KeepYear))
						{
							bPassCheck = false;		
							theCustom.setValue("分類號",preVal,true);//不可使用時使用前次分類號
							//1100503 David 1100276 帶回舊分類號時，一併帶回舊保存年限
							if(oldKeepYearVal != "")
							{
								theCustom.setValue("保存年限",oldKeepYearVal,true);
								oldKeepYearVal = "";
							}
							alert("分類號"+val+"保存年限大於線上簽核公文規定之保存年限("+ComgEkeepYear+"年)，不宜以線上簽核處理。已更回原分類號"+preVal);
						}
						else
							setRtnKeepYear = true;
					}
				}

				//1130119 David 1120995 啟用顯示案次號、CheckCls有回傳案次號時，設定至畫面案次號欄位
				if(theSSO.User.EnvSettings.get("OD_CHECK_FILE_CASE") == "Y" && r.CaseNo != '')
					theCustom.setValue("案次號",r.CaseNo,true);

				if(bPassCheck)
				{
					var bAllClsSame = true;	
					theAOL.getCurrFolio().getAllDraftText("/*/分類號").done
					(
						function(arr) 
						{
							//1051014 Cloud	調整分類號檢核方式-逐稿件檢核，有錯誤最後再一次跳
							//if(arr[0].errorText==undefined)//錯誤時會有錯誤訊息
							//{
								var strErr=""
								if(arr.length!=1)
								{
									for(var i=0;i<arr.length;i++)
									{
										//1051014	Cloud	多稿時應該每個稿件判斷錯誤訊息
										if(arr[i].errorText!=undefined)
										{
											//有找不到時，表示當份稿件沒有分類號，不比對
											if(arr[i].errorText.indexOf("找不到")!=-1)
												continue;
											else
												strErr +="取得第"+i+"份文稿分類號時發生異常："+arr[i].errorText;
										}
										if(val!=arr[i].text)//分類號與其他稿件不同時跳出是否一併修改訊息
										{
											bAllClsSame = false;
											break;
										}
									}					
								}
								if(!bAllClsSame)
								{
									if(window.confirm('輸入之分類號與其他稿件不同，是否確定要修改？點選確定後將一併修改所有稿件之分類號及保存年限'))
									{
										//1080305 David 1070216 紀錄檢核錯誤訊息
										var arrErr = [];

										theAOL.getCurrFolio().setAllDraftText("/*/分類號",val).done
										(
											function(arr)
											{
												//1080305 David 1070216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
												//if(!arr[0].success)
													//alert("設定各稿分類號時發生異常："+arr[0].errorText);
												for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
												{
													if(!arr[iDraft].success)
														arrErr.push(arr[iDraft].errorText);
													else
														arrErr.push("");
												}
											}
										);
										//1100408 David 1100192 需帶入保存年限才執行
										if (setRtnKeepYear)
										{
											theAOL.getCurrFolio().setAllDraftText("/*/保存年限",r.KeepYear).done
											(
												function(arr) 
												{
													//1080305 David 1080216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
													//if(!arr[0].success)
														//alert("設定各稿分類號時發生異常："+arr[0].errorText);
													for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
													{
														//上面分類號同步已依稿數增加arrErr數量，此處有錯誤直接於對應陣列加上錯誤訊息
														if(!arr[iDraft].success)
														{
															//1080322 David 1080216 修正相同錯誤訊息不重複顯示
															if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
																continue;

															if(arrErr[iDraft] != "")
																arrErr[iDraft] += "\n"
															arrErr[iDraft] += arr[iDraft].errorText;
														}
													}
												}
											);
										}
										bAllClsSame = true;

										//1130119 David 1120995 啟用顯示案次號、CheckCls有回傳案次號時，設定至畫面案次號欄位
										if(theSSO.User.EnvSettings.get("OD_CHECK_FILE_CASE") == "Y" && r.CaseNo != '')
											theAOL.getCurrFolio().setAllDraftText("/*/案次號",r.CaseNo);

										//1080305 David 1080216 處理紀錄的錯誤訊息
										var strSetDraftTextErr = "";
										for(var iErr = 0 ;iErr < arrErr.length ; iErr++)
										{
											if(arrErr[iErr] != "")
											{
												strSetDraftTextErr += "第" + (iErr+1).toString() + "稿件：\n" + arrErr[iErr] + "\n";
											}
										}
										if(strSetDraftTextErr != "")
											alert("設定各稿分類號時發生異常：\n" + strSetDraftTextErr);
									}
									else//不更動時應更回原值
									{
										theCustom.setValue("分類號",preVal,true);
										bAllClsSame = false;
									}
								}
								if(bAllClsSame)
								{
									//2017.2.7	Leslie	增加判斷環境變數設定決定是否檢核併案文號之分類號for藥檢局
									var strCheckComNoClsSetting = theSSO.User.EnvSettings.get("OD_ODC010_CHECK_COM_NO_CLS");
									var ComNo = theAOL.docObj.getODWDCM().COM_NO;
									if(ComNo.length > 0 && ComNo[0].COM_DOC_NO != "" && strCheckComNoClsSetting.toUpperCase() == "Y")
									{
										var paramsws_ComNoClsNo = {
											"argArtifact": localStorage.Artifact,
											"argSourceOrgNo": theAOL.docObj.sourceOrgNo,
											"argComNo": ComNo[0].COM_DOC_NO,
											"argClsNo": val
											//1121218 David 1120821 新增傳入目前公文文號
											,"argDocNo": theAOL.docObj.docNo
										};
										
										window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "ws_ComNoClsNo", null, paramsws_ComNoClsNo, false, function (rtn, xml)
										{
											if(rtn == ""){	//2017.2.7	Leslie	檢核通過時，依原行為處理
												theCustom.setValue("分類號",val,true);
												//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_CLS', value: val }]);
												//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_CLS', value: val }]);
												if(r.CaseNo!="")
												{
													theCustom.setValue("案次號",r.CaseNo,true);//可使用一併異動案次號
													//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'CASE_NO', value: r.CaseNo}]);	
												}
												//1100408 David 1100192 需帶入保存年限才執行
												if (setRtnKeepYear)
													theCustom.setValue("保存年限",r.KeepYear,true);//可使用時異動保存年限
												//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'KEEP_YEAR', value: r.KeepYear}]);	
												//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'KEEP_YEAR', value: r.KeepYear}]);
												if(typeof fnWebEditSave !== "undefined")	// 2016.11.23 異動分類號時須同步公文基資
												{
													//1061222 David 1061170 呼叫fnWebEditSave()，新增傳入觸發類型
													//fnWebEditSave(theAOL.getCurrFolio());
													fnWebEditSave(theAOL.getCurrFolio(), "1");
												}
											}
											else{
												theCustom.setValue("分類號",preVal,true);	//檢核失敗，設回原值
												strErr = rtn;
											}
										});
									}
									else{	//2017.2.7	Leslie	無需檢核時，依原行為處理
										theCustom.setValue("分類號",val,true);
										//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_CLS', value: val }]);
										//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_CLS', value: val }]);
										if(r.CaseNo!="")
										{
											theCustom.setValue("案次號",r.CaseNo,true);//可使用一併異動案次號
											//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'CASE_NO', value: r.CaseNo}]);	
										}
										//1100408 David 1100192 需帶入保存年限才執行
										if (setRtnKeepYear)
											theCustom.setValue("保存年限",r.KeepYear,true);//可使用時異動保存年限
										//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'KEEP_YEAR', value: r.KeepYear}]);	
										//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'KEEP_YEAR', value: r.KeepYear}]);
										if(typeof fnWebEditSave !== "undefined")	// 2016.11.23 異動分類號時須同步公文基資
										{
											//1061222 David 1061170 呼叫fnWebEditSave()，新增傳入觸發類型
											//fnWebEditSave(theAOL.getCurrFolio());
											fnWebEditSave(theAOL.getCurrFolio() , "1");
										}
									}
								}
								if(strErr!="")
									alert(strErr);
							//}	
							//else
							//{
								//alert("取得所有稿件分類號時發生異常："+arr[0].errorText);
							//}
						}
					);
				}
			}
		});
	}
	catch(e) 
	{
		alert("呼叫WS檢核分類號發生異常："+e.message);
	}	
}
//1061220 	[1061230] Cloud 紀錄異動前的分類號/案次號/保存年限-custom.js查詢前紀錄-ONBLUR異動前不取得前次資訊
var oldClsVal="";
var oldCaseVal="";
var oldKeepYearVal="";
Common.fnCheckCase = function(val, para, fldName,preVal)
{
	//1080215 David 1080180 可能由分類號欄位觸發案次號檢核，調整時機
	//1050831	1050087		Cloud	修改案次號增加空白不進行查詢
	/*if(jQuery.trim(val)=="")
		return;
	console.log("共用檢核案次號'" + fldName + "'='" + val + "'(案次號)");
	//1050901	1050087	Cloud	分類號案次號轉大寫
	val = val.toUpperCase();*/

	try 
	{
		//1080305 David 1080214 依觸發欄位判斷資料來源
		//var classValue = para.getModel().text("/*/分類號");//取得畫面分類號
		var gKeepYear = para.getModel().text("/*/保存年限");//取得保存年限
		var gYearVal = para.getModel().text("/*/年度號");//取得畫面年度號
		//1080215 David 1080180 可能由分類號欄位觸發案次號檢核，調整案次號來源
		//1080305 David 1080214 依觸發欄位判斷資料來源
		//因航港局分類案次欄位不可輸入僅由查詢視窗帶回，且帶回時一律帶回分類案次號，需觸發案次號檢核邏輯，故調整資料來源
		//var FileCase = para.getModel().text("/*/案次號").toUpperCase();
		var classValue = "";
		var FileCase = "";
		if(fldName == "分類號")
		{
			//1100729 David 1100860 檢核前先進行全形轉半形判斷，避免使用者誤輸入全形文字
			val = fnFullToHalf(val);
			classValue = val.toUpperCase();
			FileCase = para.getModel().text("/*/案次號").toUpperCase();

			console.log("共用檢核分類號'" + fldName + "'='" + classValue + "'(分類號)");
			//1100510 David 1100221 移除jQuery.trim()
			//if(jQuery.trim(classValue) == "")
			if(jf_Trim(classValue) == "")
				return;
		}
		else if(fldName == "案次號")
		{
			classValue = para.getModel().text("/*/分類號");
			//1100729 David 1100860 檢核前先進行全形轉半形判斷，避免使用者誤輸入全形文字
			val = fnFullToHalf(val);
			FileCase = val.toUpperCase();

			console.log("共用檢核案次號'" + fldName + "'='" + FileCase + "'(案次號)");
			//1100510 David 1100221 移除jQuery.trim()
			//if(jQuery.trim(FileCase) == "")
			if(jf_Trim(FileCase) == "")
				return;
		}

		//1090102 David 1090001 新增取得年度號
		if(gYearVal == "")
		{
			if(theAOL.docObj.docNo != "")
				gYearVal = theAOL.docObj.docNo.substr(0,3);
			else
			{
				var today = new Date();
				gYearVal = parseInt(today.getFullYear()) - 1911;
			}
		}

		//1061220	[1061230]	Cloud	修改案次號onlbur時，比照分類號，檢核保存年限是否符合線上簽核類型。-S
		//1.異動案次號不會造成保存年限被更改 2.異動分類號更改保存年限已有檢核 3.直接異動保存年限也有檢核-所以須檢核時僅有由查詢視窗帶回時-判斷有OLD值時才檢核
		//OLD由CUSTOM異動時設定-稿件可設定案次號的機關才有
		if(oldClsVal!=classValue)
		{
			if(!fncheckKeepyear(gKeepYear))
			{
				bPassCheck = false;
				theCustom.setValue("分類號",oldClsVal,true);//不可使用時使用前次分類號
				theCustom.setValue("案次號",oldCaseVal,true);//不可使用時使用前次案次號
				theCustom.setValue("保存年限",oldKeepYearVal,true);//不可使用時使用前次保存年限
				alert("分類號"+classValue+"保存年限大於線上簽核公文規定之保存年限("+ComgEkeepYear+"年)，不宜以線上簽核處理。已更回原分類號："+oldClsVal+" 案次號："+oldCaseVal+" 保存年限："+oldKeepYearVal);
				return;
			}
		}
		//1061220	[1061230]	Cloud	修改案次號onlbur時，比照分類號，檢核保存年限是否符合線上簽核類型。-E
		//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
		//var params = 
		//{
		//	"ClassNo": classValue
		//	//1080215 David 1080180 可能由分類號欄位觸發案次號檢核，調整案次號來源
		//	//,"CaseNo": val
		//	,"CaseNo": FileCase
		//	,"UserID": theUserInfo.UserID
		//	,"OrgNo": theUserInfo.OrgID
		//	//1090102 David 1090001 新增傳入年度號
		//	,"argYear": gYearVal
		//};
		var params = new SOAPClientParameters();
		params.add('ClassNo', classValue);
		params.add('CaseNo', FileCase);
		params.add('UserID', theUserInfo.UserID);
		params.add('OrgNo', theUserInfo.OrgID);
		params.add('argYear', gYearVal);
		
		//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
		//theWebServices.invokeWS//此處呼叫ws需使用全域theWebServices
		//(
		//	SSO_CONFIG.getWSUrl("webeditws"), "CheckCase", "T2100", params, true, function(r) 
		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "CheckCase", params, true, function(result) 
			{
				//1130806	Leslie[1130313]	[Merge-1100394]配合離線版功能，修改叫用CheckCls、CheckCase為SOAPClient.invokeJSON，一併調整參數
				var r = result.value;	//invokeJSON的回傳值，由value取得
				console.log("CheckCase returns: ");
				console.log(r);
				if("ErrorClass" in r && r.ErrorClass.IsErr == "true") 
				{
					theCustom.setValue("案次號",preVal,true);//不可使用時更回原案次號
					//1060111	1060017 Cloud 修正使用錯誤物件bug
					//alert(r.ErrorClass.ErrMessage.anyType+"已更回原案次號："+preVal);
					alert(r.ErrorClass.ErrMessage.anyType.text+"已更回原案次號："+preVal);
				}
				else
				{
					//1080215 David 1080180 新增先檢核分類號
					var bCheckAndUpDated = false;
					var bAllClsSame = true;
					theAOL.getCurrFolio().getAllDraftText("/*/分類號").done
					(
						function(arr) 
						{
							var strErr=""
							if(arr.length!=1)
							{
								for(var i=0;i<arr.length;i++)
								{
									//多稿時應該每個稿件判斷錯誤訊息
									if(arr[i].errorText!=undefined)
									{
										//有找不到時，表示當份稿件沒有分類號，不比對
										if(arr[i].errorText.indexOf("找不到")!=-1)
											continue;
										else
											strErr +="取得第"+i+"份文稿分類號時發生異常："+arr[i].errorText;
									}
									if(classValue != arr[i].text)//分類號與其他稿件不同時跳出是否一併修改訊息
									{
										bAllClsSame = false;
										break;
									}
								}
							}
							if(!bAllClsSame)
							{
								bCheckAndUpDated = true;
								if(window.confirm('輸入之案次號所屬分類號與其他稿件不同，是否確定要修改？點選確定後將一併修改所有稿件之分類、案次號及保存年限'))
								{
									//1080305 David 1070216 紀錄檢核錯誤訊息
									var arrErr = [];

									theAOL.getCurrFolio().setAllDraftText("/*/年度號",gYearVal).done
									(
										function(arr)
										{
											//1080305 David 1070216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
											//if(!arr[0].success)
												//alert("設定各稿年度號時發生異常："+arr[0].errorText);
											for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
											{
												if(!arr[iDraft].success)
													arrErr.push(arr[iDraft].errorText);
												else
													arrErr.push("");
											}
										}
									);
									theAOL.getCurrFolio().setAllDraftText("/*/分類號",classValue).done
									(
										function(arr)
										{
											//1080305 David 1080216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
											//if(!arr[0].success)
												//alert("設定各稿分類號時發生異常："+arr[0].errorText);
											for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
											{
												//上面同步已依稿數增加arrErr數量，此處有錯誤直接於對應陣列加上錯誤訊息
												if(!arr[iDraft].success)
												{
													//1080322 David 1080216 修正相同錯誤訊息不重複顯示
													if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
														continue;

													if(arrErr[iDraft] != "")
														arrErr[iDraft] += "\n"
													arrErr[iDraft] += arr[iDraft].errorText;
												}
											}
										}
									);
									theAOL.getCurrFolio().setAllDraftText("/*/保存年限",gKeepYear).done
									(
										function(arr) 
										{
											//1080305 David 1080216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
											//if(!arr[0].success)
												//alert("設定各稿保存年限時發生異常："+arr[0].errorText);
											for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
											{
												if(!arr[iDraft].success)
												{
													//1080322 David 1080216 修正相同錯誤訊息不重複顯示
													if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
														continue;

													if(arrErr[iDraft] != "")
														arrErr[iDraft] += "\n"
													arrErr[iDraft] += arr[iDraft].errorText;
												}
											}
										}
									);
									theAOL.getCurrFolio().setAllDraftText("/*/案次號",FileCase).done
									(
										function(arr) 
										{
											//1080305 David 1080216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
											//if(!arr[0].success)
												//alert("設定各稿案次號時發生異常："+arr[0].errorText);
											for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
											{
												if(!arr[iDraft].success)
												{
													//1080322 David 1080216 修正相同錯誤訊息不重複顯示
													if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
														continue;

													if(arrErr[iDraft] != "")
														arrErr[iDraft] += "\n"
													arrErr[iDraft] += arr[iDraft].errorText;
												}
											}
										}
									);

									//1080305 David 1080216 處理紀錄的錯誤訊息
									var strSetDraftTextErr = "";
									for(var iErr = 0 ;iErr < arrErr.length ; iErr++)
									{
										if(arrErr[iErr] != "")
										{
											strSetDraftTextErr += "第" + (iErr+1).toString() + "稿件：\n" + arrErr[iErr] + "\n";
										}
									}
									if(strSetDraftTextErr != "")
										alert("設定各稿案次號時發生異常：\n" + strSetDraftTextErr);

									bAllCaseSame = true;

									theCustom.setValue("年度號",gYearVal,true);
									theCustom.setValue("分類號",classValue,true);
									theCustom.setValue("保存年限",gKeepYear,true);
									theCustom.setValue("案次號",FileCase,true);//設定畫面資訊
									//案次號異動回寫基資功能
									if(typeof fnWebEditSave !== "undefined")//動分類號時須同步公文基資
									{
										fnWebEditSave(theAOL.getCurrFolio(), "1");
									}
									bAllClsSame = true;
								}
							}

							if(strErr!="")
							{
								alert(strErr);
								return;
							}

							//分類號不同經詢問後，不需往下執行
							if(bCheckAndUpDated)
								return;

							//1080215 David 1080180 畫面案次號為空時，不需進行案次號檢核
							//1100510 David 1100221 移除jQuery.trim()
							//if(jQuery.trim(FileCase) == "")
							if(jf_Trim(FileCase) == "")
								return;

							var bAllCaseSame = true;
							theAOL.getCurrFolio().getAllDraftText("/*/案次號").done//讀取多稿案次號
							(
								function(arr)
								{
									if(arr[0].errorText!="")//錯誤時會有錯誤訊息
									{
										if(arr.length==1)//僅有一稿時，直接將值存入
										{
											bAllCaseSame = true;
										}
										else
										{
											for(var i=0;i<arr.length;i++)
											{
												//1080215 David 1080180 可能由分類號欄位觸發案次號檢核，調整案次號來源
												//if(val!=arr[i].text)//案次號號與其他稿件不同時跳出是否一併修改訊息
												if(FileCase!=arr[i].text)//案次號號與其他稿件不同時跳出是否一併修改訊息
												{
													bAllCaseSame = false;
													break;
												}
											}
										}
										if(!bAllCaseSame)
										{
											if(window.confirm('輸入之案次號與其他稿件不同，是否確定要修改？點選確定後將一併修改所有稿件之案次號'))
											{
												//1080305 David 1070216 紀錄檢核錯誤訊息
												var arrErr = [];

												//1080114 David 1080024 同步各稿件案次號時，一併同步年度、分類號及保存年限
												theAOL.getCurrFolio().setAllDraftText("/*/年度號",gYearVal).done
												(
													function(arr)
													{
														//1080305 David 1070216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
														//if(!arr[0].success)
															//alert("設定各稿年度號時發生異常："+arr[0].errorText);
														for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
														{
															if(!arr[iDraft].success)
																arrErr.push(arr[iDraft].errorText);
															else
																arrErr.push("");
														}
													}
												);
												theAOL.getCurrFolio().setAllDraftText("/*/分類號",classValue).done
												(
													function(arr) 
													{
														//1080305 David 1070216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
														//if(!arr[0].success)
															//alert("設定各稿分類號時發生異常："+arr[0].errorText);
														for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
														{
															if(!arr[iDraft].success)
															{
																//1080322 David 1080216 修正相同錯誤訊息不重複顯示
																if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
																	continue;

																if(arrErr[iDraft] != "")
																	arrErr[iDraft] += "\n"
																arrErr[iDraft] += arr[iDraft].errorText;
															}
														}
													}
												);
												theAOL.getCurrFolio().setAllDraftText("/*/保存年限",gKeepYear).done
												(
													function(arr) 
													{
														//1080305 David 1070216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
														//if(!arr[0].success)
															//alert("設定各稿保存年限時發生異常："+arr[0].errorText);
														for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
														{
															if(!arr[iDraft].success)
															{
																//1080322 David 1080216 修正相同錯誤訊息不重複顯示
																if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
																	continue;

																if(arrErr[iDraft] != "")
																	arrErr[iDraft] += "\n"
																arrErr[iDraft] += arr[iDraft].errorText;
															}
														}
													}
												);
												//1080215 David 1080180 可能由分類號欄位觸發案次號檢核，調整案次號來源
												//theAOL.getCurrFolio().setAllDraftText("/*/案次號",val).done
												theAOL.getCurrFolio().setAllDraftText("/*/案次號",FileCase).done
												(
													function(arr) 
													{
														//1080305 David 1070216 調整錯誤訊息顯示方式，先統一紀錄再一次顯示
														//if(!arr[0].success)
															//alert("設定各稿案次號時發生異常："+arr[0].errorText);
														for(var iDraft = 0 ; iDraft < arr.length ; iDraft++)
														{
															if(!arr[iDraft].success)
															{
																//1080322 David 1080216 修正相同錯誤訊息不重複顯示
																if(arrErr[iDraft].indexOf(arr[iDraft].errorText) != -1)
																	continue;

																if(arrErr[iDraft] != "")
																	arrErr[iDraft] += "\n"
																arrErr[iDraft] += arr[iDraft].errorText;
															}
														}
													}
												);

												//1080305 David 1080216 處理紀錄的錯誤訊息
												var strSetDraftTextErr = "";
												for(var iErr = 0 ;iErr < arrErr.length ; iErr++)
												{
													if(arrErr[iErr] != "")
													{
														strSetDraftTextErr += "第" + (iErr+1).toString() + "稿件：\n" + arrErr[iErr] + "\n";
													}
												}
												if(strSetDraftTextErr != "")
													alert("設定各稿案次號時發生異常：\n" + strSetDraftTextErr);

												bAllCaseSame = true;
											}
											else
											{
												bAllCaseSame = false;
											}
										}
										if(bAllCaseSame)
										{
											//1080114 David 1080024 同步各稿件案次號時，一併同步年度、分類號及保存年限
											theCustom.setValue("年度號",gYearVal,true);
											theCustom.setValue("分類號",classValue,true);
											theCustom.setValue("保存年限",gKeepYear,true);
											//1080215 David 1080180 可能由分類號欄位觸發案次號檢核，調整案次號來源
											//theCustom.setValue("案次號",val,true);//設定畫面資訊
											theCustom.setValue("案次號",FileCase,true);
											//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'CASE_NO', value: val}]);//寫入ODWDCM
											//1060111	1060017 Cloud 增加案次號異動回寫基資功能
											if(typeof fnWebEditSave !== "undefined")	// 2016.11.23 異動分類號時須同步公文基資
											{
												//1061222 David 1061170 呼叫fnWebEditSave()，新增傳入觸發類型
												//fnWebEditSave(theAOL.getCurrFolio());
												fnWebEditSave(theAOL.getCurrFolio(), "1");
											}
										}
									}
									else
									{
										alert("取得所有稿件案次號時發生異常："+arr[0].errorText);
									}
								}
							)
						}
					);
				}
			}
		);
	}
	catch(e) 
	{
		alert("呼叫WS檢核案次號發生異常："+e.message);
	}	
}
Common.fnSecModify = function(val, para) 
{
	// 密等異動時
	console.log("密等共用='" + val + "'...");
	// 連動解密條件
	switch(val)
	{
		//1070628	Cloud	修正密等普通、密來回切換會造成密等判斷異常問題
		//case"普通":
		case"":
			val = "1";
			break;
		case"密":
			val = "2";
			break;
		case"機密":
			val = "3";
			break;
		case"極機密":
			val = "4";
			break;
		case"絕對機密":
			val = "5";
			break;
	}

	if(theSSO.User.EnvSettings.get("SEC_CAN_AOL")!="" && theSSO.User.EnvSettings.get("SEC_CAN_AOL")=="N" &&  theAOL.docObj.signType =="E" && val!="1")
	{
		alert('密件公文依規定不可採用線上簽核形式辦理，如需以密件辦理請轉為紙本簽核。')
		return;
	}
	//1050905	1050087		Cloud	修正密等切換時-增加回寫ODWMSG-
	//(此為暫時解，以往密等取得會由稿件取得，因可能有同一份文，不同稿件不同密等情況，此解最佳解還是得由密等切換時密等紀錄於稿件，取發文字時，秘等由稿件取得)
	//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'SECRETE', value: val}]);//設定密等
	//1091118 David 1090823 不需更新基資，由MS-WebEditSave統一處理
	//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'SECRETE', value: val}]);//設定密等
	//1070628	Cloud	修正密等普通、密來回切換會造成密等判斷異常問題
	//	if(val.length == 0 || val == "普通")
		if(val.length == 0 || val == "1")
	{
		//清空解密條件值
		theCustom.setValue("解密條件或保密期限", "",true);
		//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: ""}]);			
	}
	else 
	{
		// 1110831 Raymond 1110794 取解密條件或保密期限選單來源改為DataXML的data清單, 預帶解密條件或保密期限內容亦改為data清單第一筆
		//寫入預設解密條件
		//theCustom.setValue("解密條件或保密期限", "(本件於公布時解密)",true);
		//1120901 David 1120407 取得Data檔時，依公文對應的機關代碼取得
		//thePublicRsrc.getDataXML(Common.activeRole.orgNo)
		thePublicRsrc.getDataXML(theAOL.docObj.sourceOrgNo)
			.done(function(datDoc) {
				// 列舉解密條件或保密期限清單
				var $decOpts = $(datDoc.documentElement).find("data[type='解密條件或保密期限']");
				if($decOpts.length > 0 && $decOpts.find("代碼").length > 0) {
					var firstVal = $decOpts.find("代碼").eq(0).attr("value");
					theLogger.warn("DataXML已設定'解密條件或保密期限'資料代碼項目, 使用DataXML設定的選單項目第一筆為預設解密條件或保密期限'" + firstVal + "'");
					theCustom.setValue("解密條件或保密期限", firstVal, true);
				}
				else {
					theLogger.warn("DataXML未設定'解密條件或保密期限'資料代碼項目, 或其代碼項目數量為0, 使用'(本件於公布時解密)'為預設解密條件或保密期限");
					theCustom.setValue("解密條件或保密期限", "(本件於公布時解密)",true);
				}
			})
			.fail(function() {
				theLogger.warn("無法取得DataXML, 使用'(本件於公布時解密)'為預設解密條件或保密期限");
				theCustom.setValue("解密條件或保密期限", "(本件於公布時解密)",true);
			});
		//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: "(本件於公佈時解密)"}]);
	}
	//1090220	Joe		1080755	修改增加判斷，密件公文不可使用紙本發文
	if(Common.NowSecNo=="" && val !="1")//由普通切換成密件
	{
		$(para.getModel().accquireXml()).find("受文者").find("發文方式 ").text("郵寄");
		$(para.getModel().accquireXml()).find("本文發文方式").text("紙本");
	}
	Common.NowSecNo = val;

	//1130112 David 1121043 新增公文背景顏色處理邏輯
	fnChangeDocBackColor(null, val, para);
}
Common.fnExtransecCondModify = function(val, para) 
{
	//解密條件異動
	//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: val}]);//寫入解密條件
	//1110906 David 1110794 支援解密條件可透過Data設定，調整解密條件連動解密日期功能
	//if(val.indexOf('本件至')!=-1)//取得解密日期
	if(val.indexOf('至')!=-1 && val.indexOf('年')!=-1 && val.indexOf('月')!=-1 && val.indexOf('日')!=-1)
	{
		var dateY = val.substring(val.indexOf('至')+1,val.indexOf('年')).trim();
		var dateM = val.substring(val.indexOf('年')+1,val.indexOf('月')).trim();
		var dateD = val.substring(val.indexOf('月')+1,val.indexOf('日')).trim();
		if(dateY!="" && dateM!="" && dateD!="")//都有輸入值才做檢核
		{
			var Date = PADL(dateY,3,'0')+PADL(dateM,2,'0')+PADL(dateD,2,'0');
			if(Date.length==7)
			{
				if(Common.CheckDATE(Date))
				{
					//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_DATE', value: Date}]);//寫入解密日期
					//1050907	1050087		Cloud	調整解密日期異動時，寫入文稿tag
					//增加寫回稿件功能
					var dm = para.getModel().accquireXml();
					var xml = dm.documentElement;
					var dateTag = $(xml).find("解密日期");
					if(dateTag.length!=0)
					{
						var u = dateTag.find("年月日").get(0);
						if("text" in u)
							u.text = Date;
						else
							u.textContent = Date;
					}
					else
					{
						var DaTenode =  dm.createElement("解密日期");
						var YYmmdd = dm.createElement("年月日");
						if("text" in YYmmdd)
							YYmmdd.text = jf_Trim(Date);
						else
							YYmmdd.textContent = jf_Trim(Date);
						DaTenode.appendChild(YYmmdd);
						xml.appendChild(DaTenode);
					}
				}
				else
					alert('解密日期輸入格式不正確!');
			}
		}
	}
}
Common.fnSubjetModify = function(val, para) 
{
	//主旨異動
	//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FROM_SUBJECT', value: val}]);//寫入主旨
}
Common.fnSpeedModify = function(val, para) 
{
	switch(val)
	{
		case"普通件":
			val = "1";
			break;
		case"速件":
			val = "2";
			break;
		case"最速件":
			val = "3";
			break;
	}
	//速別異動
	//theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'SPEED', value: val}]);//寫入速別

	//1130112 David 1121043 新增公文背景顏色處理邏輯
	fnChangeDocBackColor(val, null, para);
}
Common.fnChangeOrgAddress = function(srcFldName, val, fldName, elems)
{	// 連動機關地址
	console.log("共用因'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML				
	//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML	
		//var org = Common.snapshot.snapshotItem(i);
		var org = Common.snapshot.eq(i);
		var nm = $(org).find("全銜").text();
		if(val == nm) 
		{
			var addr = $(org).find("機關地址").text();
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $(elems).text(addr).blur();//blur()即觸發儲存
			$(elems).text(addr).trigger("blur");//blur()即觸發儲存
			break;
		}
	}
}
Common.fnChangeOrgSign = function(srcFldName, val, fldName, elems,srcPara)
{
	console.log("共用發文機關連動署名'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML				
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
						
	var docType = srcPara.getModel().getDocType();//取得文別
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML				
	//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
	//1050105 Cloud	1051346 切換時，一律先清空取代章戳屬性
	try
	{
	srcPara.inlines[1].getModel().attr("/"+docType+"/署名/@取代章戳","");
	}
	catch(e)
	{}
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML				
		//var org = Common.snapshot.snapshotItem(i);
		//var nm = $(org).find("全銜").text();
		var org = Common.snapshot.eq(i);
		var nm = org.find("全銜").text();
		//1060104	Cloud	修改發文機關連動署名增加寫入取代章戳
		var substr = "";
		var allDataLength = elems[0].parentNode.childNodes[0].children.length;
		var signObj = elems[0].parentNode.childNodes[0];
		//1060105 Cloud	1051346 增加根據不同稿件取得不同預設章戳功能-移至前方宣告
		var sign = "";
		if(val == nm) 
		{
			if(docType.indexOf("簽")!=-1)
			{
				//簽時使用簽署名
				//1051014	Cloud	1050087	紀錄連動後的值
				//var sign = $(org).find("sign2").text();
				//1060105 Cloud	1051346 增加根據不同稿件取得不同預設章戳功能
				//var sign = Common.NewSign2 = $(org).find("sign2").text();
				if($(org).find(Common.DefaultSign).length!=0)
					sign = Common.NewSign2 = $(org).find(Common.DefaultSign).text();
				else
					sign = Common.NewSign2 = $(org).find("sign2").text();
					//1051014	Cloud	1050087 修正觸發儲存行為
					//$(elems).text(sign).blur();//blur()即觸發儲存
				//1060104	Cloud	修改發文機關連動署名增加寫入取代章戳
				for(var nowdata=0;nowdata<allDataLength;nowdata++)
				{
					if($(signObj.children[nowdata]).text()==sign)
					{
						substr = $(signObj.children[nowdata]).attr("data-subst");
						if(substr!="" && substr!=undefined)
						{
							try
							{
								srcPara.inlines[1].getModel().attr("/"+docType+"/署名/@取代章戳",substr);
							}
							catch(e)
							{}
						}
						break;
					}
				}
				//1060104	Cloud	修改發文機關連動署名增加寫入取代章戳
				$(elems).text(sign).trigger("apply");//blur()即觸發儲存
				break;
			}
			else
			{	//1051014	Cloud	1050087	紀錄連動後的值
				//var sign = $(org).find("sign").text();
				//1060105 Cloud	1051346 增加根據不同稿件取得不同預設章戳功能
				//var sign = Common.NewSign = $(org).find("sign").text();
				if($(org).find(Common.DefaultSign).length!=0)
					sign = Common.NewSign = $(org).find(Common.DefaultSign).text();
				else
					sign = Common.NewSign = $(org).find("sign").text();
				//1051014	Cloud	1050087 修正觸發儲存行為
				//$(elems).text(sign).blur();//blur()即觸發儲存
				//1060104	Cloud	修改發文機關連動署名增加寫入取代章戳
				for(var nowdata=0;nowdata<allDataLength;nowdata++)
				{
					if($(signObj.children[nowdata]).text()==sign)
					{
						substr = $(signObj.children[nowdata]).attr("data-subst");
						if(substr!="" && substr!=undefined)
						{
							try
							{
								srcPara.inlines[1].getModel().attr("/"+docType+"/署名/@取代章戳",substr);
							}
							catch(e)
							{}
						}
						break;
					}
				}
				//1060104	Cloud	修改發文機關連動署名增加寫入取代章戳
				$(elems).text(sign).trigger("apply");//blur()即觸發儲存
				break;
			}
		}
	}
}
Common.fnChangeOrgTel = function(srcFldName, val, fldName, elems)
{
	console.log("共用發文機關連動電話'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);		
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML						
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML						
	//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML						
		//var org = Common.snapshot.snapshotItem(i);
		//var nm = $(org).find("全銜").text();
		var org = Common.snapshot.eq(i);
		var nm = org.find("全銜").text();
							
		if(val == nm) 
		{
			var tel = $(org).find("聯絡電話").text();
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $(elems).text(tel).blur();//blur()即觸發儲存
			$(elems).text(tel).trigger("blur");//blur()即觸發儲存
			break;
		}
	}		
}
Common.fnChangeOrgExt = function(srcFldName, val, fldName, elems)
{
	console.log("共用發文機關連動分機'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);
						
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML										 
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML					
	//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML						
		//var org = Common.snapshot.snapshotItem(i);
		//var nm = $(org).find("全銜").text();
		var org = Common.snapshot.eq(i);
		var nm = org.find("全銜").text();
		if(val == nm) 
		{
			var ext = $(org).find("分機").text();
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $(elems).text(ext).blur();//blur()即觸發儲存
			$(elems).text(ext).trigger("blur");//blur()即觸發儲存
			break;
		}
	}
}
Common.fnChangeOrgFax = function(srcFldName, val, fldName, elems)
{
	console.log("共用發文機關連動傳真 因'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
	//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
		//var org = Common.snapshot.snapshotItem(i);
		//var nm = $(org).find("全銜").text();
		var org = Common.snapshot.eq(i);
		var nm = org.find("全銜").text();

		if(val == nm) 
		{
			var fax = $(org).find("傳真").text();
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $(elems).text(fax).blur();//blur()即觸發儲存
			$(elems).text(fax).trigger("blur");//blur()即觸發儲存
			break;
		}
	}
}
Common.fnChangeOrgEmail = function(srcFldName, val, fldName, elems)
{
	console.log("共用發文機關連動電子郵件 因'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML										
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
	//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
		//var org = Common.snapshot.snapshotItem(i);
		//var nm = $(org).find("全銜").text();
		var org = Common.snapshot.eq(i);
		var nm = org.find("全銜").text();
						
		if(val == nm) 
		{
			var Email = $(org).find("Email").text();
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $(elems).text(Email).blur();//blur()即觸發儲存
			$(elems).text(Email).trigger("blur");//blur()即觸發儲存
			break;
		}
	}
}
Common.fnChangeOrgIssueWord = function(srcFldName, val, fldName, elems, srcPara)
{
	console.log("共用連動發文字號'" + srcFldName + "'異動, 重新整理'" + fldName + "'...");
	console.log(elems);
	//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML				
	//if(Common.snapshot.snapshotLength == 0)
	if(Common.snapshot.length == 0)
		throw new Error(Common.activeRole.orgNo+"_Data.xml中找不到\"data[@type='機關']/發文機關\"");
	var SourceNo;
	var NowIssueOrgName;//取得現在的發文機關
	var ndOUWord;
	if(theAOL.docObj.docNo == "")//查驗創稿號是否空白
	{
		return;
	}
	//1060124	序2224(fda)	Cloud 修正，發文機關連動發文字未先判斷是否已取過導致看起來異常的問題
	var IsueWOrd = "";
	var IsueYear = "";
	var IsueDoc = "";

	try {IsueWOrd = srcPara.getModel().text("/*/發文字號/字");}
	catch(e){}
	try {IsueYear = srcPara.getModel().text("/*/發文字號/文號/年度");}
	catch(e){}
	try {IsueDoc = srcPara.getModel().text("/*/發文字號/文號/流水號");}
	catch(e){}
	//1060203 CLOUD 調整取發文字功能 航港局不先判斷是否取過
	var strOrgNickName = SSO_CONFIG.OrgNickName.toUpperCase();
	//if(IsueWOrd!="" || IsueYear!="" || IsueDoc!="")
	if(IsueWOrd!="" || IsueYear!="" || IsueDoc!="" || strOrgNickName=="MPB")
	{
		//1060203 CLOUD 調整取發文字功能 航港局不先判斷是否取過
		//var strOrgNickName = SSO_CONFIG.OrgNickName.toUpperCase();

		//取得發文機關代碼-S		
		//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
		//for(var i=0; i<Common.snapshot.snapshotLength; i++) 
		for(var i=0; i<Common.snapshot.length; i++) 
		{
			//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML
			//var org = Common.snapshot.snapshotItem(i);
			//var nm = $(org).find("全銜").text();
			var org = Common.snapshot.eq(i);
			var nm = NowIssueOrgName = org.find("全銜").text();
			if(val == nm) 
			{
				SourceNo = $(org).find("機關代碼").text();//取得發文機關代碼
				break;
			}
		}

		//1110715 David 1110727 當稿件的發文機關代碼符合設定值時，取得機關發文代字使用機關代碼取得，供取得總發代字使用
		if(theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO") != "")
		{
			let arrUseOrgIssueWordOrgNo = theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO").toUpperCase().split(';');
			if(arrUseOrgIssueWordOrgNo.includes(SourceNo.toUpperCase()))
				SourceNo = theUserInfo.OrgID;
		}

		//呼叫WS
		try 
		{
			//1060602	1060235		Cloud	fDA需求，政風室取得發文字號時可區分機關發文、單位發文取得對應發文字號-補強漏改部分
			//if ((strOrgNickName == "NTUST")||(strOrgNickName == "FDA")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "NTPU")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
			//1120602 David 1120517 調整臺北大學取發文字改由WebEdit02處理
			//if ((strOrgNickName == "NTUST")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "NTPU")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
			if ((strOrgNickName == "NTUST")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
			{
				var ndIssueWord = Common.ndIssueWord;
				var psIssueWord="";
				if (ndIssueWord.length != 0)
				{
					//1060602	1060235		Cloud	fDA需求，政風室取得發文字號時可區分機關發文、單位發文取得對應發文字號-補強漏改部分
					//if ((strOrgNickName == "YTIT")||(strOrgNickName == "NTPU")||(strOrgNickName == "FDA"))
					//1120602 David 1120517 調整臺北大學取發文字改由WebEdit02處理
					//if ((strOrgNickName == "YTIT")||(strOrgNickName == "NTPU"))
					if ((strOrgNickName == "YTIT"))
					{
						if(theUserInfo.OrgName!=NowIssueOrgName)//現行發文機關與使用者機關不同
						{
							ndOUWord = ndIssueWord.find("代碼[value='"+NowIssueOrgName+"']");
							if (ndOUWord.length!=0)//代擬代判 有設定發文字
								psIssueWord =  ndOUWord.text();
						}
					}
					if(psIssueWord=="")
					{
						//1050912 Cloud	調整由para.text("//發文機關/承辦單位")取得一級承辦單位，不能使用承辦人所屬處室，二級承辦人會取不到發文字
						//ndOUWord = ndIssueWord.find("代碼[value='"+theAOL.docObj.ICOUName+"']");
						ndOUWord = ndIssueWord.find("代碼[value='"+srcPara.getModel().text("//發文機關/承辦單位")+"']");
						
						if (ndOUWord.length!=0)
						{
							psIssueWord =  ndOUWord.text();
						}
						else
						{
							//1050912 Cloud	調整由para.text("//發文機關/承辦單位")取得一級承辦單位，不能使用承辦人所屬處室，二級承辦人會取不到發文字
							//alert('未設定「'+theAOL.docObj.ICOUName+'」之發文字');
							alert('未設定「'+srcPara.getModel().text("//發文機關/承辦單位")+'」之發文字');
						}
					}
					theCustom.setValue("發文號年度",Common.TranNumAndRtnStr(theAOL.docObj.docNo.substring(0,3),"1"));
					theCustom.setValue("發文號流水號",Common.TranNumAndRtnStr(theAOL.docObj.docNo.substring(3,10),"1"));
					//1130109 David 修正發文字自動帶出發文日期BUG
					//if(theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE")=="Y");
					if(theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE")=="Y")
						Common.GetIssueDate(srcPara);
					//1081008	Joe		1080339		jQuery升級3.4.1
					// $(elems).text(psIssueWord).blur();//blur()即觸發儲存
					$(elems).text(psIssueWord).trigger("blur");//blur()即觸發儲存
				}
			}
			else
			{
				//1051006	1050087		Cloud	修正，取得發文字時，應使用承辦單位代碼，非當前使用者所屬單位代碼
				//var DocInfo = theAOL.docObj.get('ODWMSG', ['DOC_NO','SECRETE']);
				var DocInfo = theAOL.docObj.get('ODWMSG', ['DOC_NO','SECRETE','INCHARGE_OU']);
				//1091118 David 1090823 取得稿件密等
				//1100419 David 1090823 修正部分客製樣板無密等TAG處理
				//var DraftSec = $(srcPara.getModel().accquireXml()).find("密等").attr("代碼");
				var DraftSec = "";
				if($(srcPara.getModel().accquireXml()).find("密等") != undefined)
					DraftSec = $(srcPara.getModel().accquireXml()).find("密等").attr("代碼");
				var DraftSecNo = "1";
				switch(DraftSec)
				{
					case"密":
						DraftSecNo = "2";
						break;
					case"機密":
						DraftSecNo = "3";
						break;
					case"極機密":
						DraftSecNo = "4";
						break;
					case"絕對機密":
						DraftSecNo = "5";
						break;
				}
				
				//1130718	Joe		序148		修正機關代碼onblur後，發文字號異常的問題--S
				/*
				var params = 
				{
					"OrgNo": theUserInfo.OrgID,
					"DocNo": DocInfo['DOC_NO'],
					"IssueOrgNo": SourceNo,
					//1091118 David 1090823 依稿件密等判斷
					//"SecNo": DocInfo['SECRETE'],
					"SecNo": DraftSecNo,
					//1051006	1050087		Cloud	修正，取得發文字時，應使用承辦單位代碼，非當前使用者所屬單位代碼
					//"DeptNo": theUserInfo.DepartID
					"DeptNo": DocInfo['INCHARGE_OU']
					
				};
				theWebServices.invokeWS//此處呼叫ws需使用全域theWebServices
				// 1060609	Cloud	調整呼叫ws為同步
				// (SSO_CONFIG.getWSUrl("webeditws"), "GetIssueNo", "T2100", params, true, function(r) 
				(SSO_CONFIG.getWSUrl("webeditws"), "GetIssueNo", "T2100", params, false, function(r) 
				*/
				var params = new SOAPClientParameters();
				params.add('OrgNo', theUserInfo.OrgID);
				params.add('DocNo', DocInfo['DOC_NO']);
				params.add('IssueOrgNo', SourceNo);
				params.add('SecNo', DraftSecNo);
				params.add('DeptNo', DocInfo['INCHARGE_OU']);
				SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "GetIssueNo", params, false,function(r) 
				//1130718	Joe		序148		修正機關代碼onblur後，發文字號異常的問題--E
					{
						console.log("GetIssueNo returns: ");
						console.log(r);

						if("ErrorClass" in r && r.ErrorClass.IsErr == "true") 
						{
							alert("發文字取得異常："+r.ErrorClass.ErrMessage.anyType);
						}
						else 
						{
							//1130718	Joe		序148		修正機關代碼onblur後，發文字號異常的問題
							// theCustom.setValue("發文號年度",Common.TranNumAndRtnStr(r.IssueYear,"1"));
							// theCustom.setValue("發文號流水號",Common.TranNumAndRtnStr(r.IssueNo,"1"));
							theCustom.setValue("發文字", r.value.IssueWord);
							theCustom.setValue("發文號年度",Common.TranNumAndRtnStrInbatch(r.value.IssueYear,"1"));
							theCustom.setValue("發文號流水號",Common.TranNumAndRtnStrInbatch(r.value.IssueNo,"1"));
							//1130109 David 修正發文字自動帶出發文日期BUG
							//if(theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE")=="Y");
							if(theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE")=="Y")
								Common.GetIssueDate(srcPara);
							//1081008	Joe		1080339		jQuery升級3.4.1
							// $(elems).text(r.IssueWord).blur();//blur()即觸發儲存
							$(elems).text(r.IssueWord).trigger("blur");//blur()即觸發儲存
						}
					}
				);
			}
		}
		catch(e) 
		{
			alert("呼叫WS取得發文字異常："+e.message);
		}
	}
}
//1130520	Joe		1130222		因應發文字號回傳直，調整轉換為批次轉換
Common.TranNumAndRtnStrInbatch = function (argStrArr, type)
{
	for(var i = 0; i < argStrArr.length; i++){
		argStrArr[i] = Common.TranNumAndRtnStr(argStrArr[i], type);
	}
	return argStrArr;
}

//全半型轉換行為
Common.TranNumAndRtnStr = function (argStr, type)
{
	var modifytest = "";
	var len = (argStr) ? argStr.length : 0;
	if (type == "１")
	{
		for (var i = 0 ; i < len ; i++)
		{
			argStr = argStr.replace("1","１");
			argStr = argStr.replace("2","２");
			argStr = argStr.replace("3","３");
			argStr = argStr.replace("4","４");
			argStr = argStr.replace("5","５");
			argStr = argStr.replace("6","６");
			argStr = argStr.replace("7","７");
			argStr = argStr.replace("8","８");
			argStr = argStr.replace("9","９");
			argStr = argStr.replace("0","０");
		}
	}
	if (type == "1")
	{
		for (var i = 0 ; i < len ; i++)
		{                                     
			argStr = argStr.replace("１","1");
			argStr = argStr.replace("２","2");
			argStr = argStr.replace("３","3");
			argStr = argStr.replace("４","4");
			argStr = argStr.replace("５","5");
			argStr = argStr.replace("６","6");
			argStr = argStr.replace("７","7");
			argStr = argStr.replace("８","8");
			argStr = argStr.replace("９","9");
			argStr = argStr.replace("０","0");
		}
	}
	return argStr;
}
//組成支號取得順序陣列
Common.AddNonoRule = function(Rule)
{
	var RuleArr = new Array();
	if(Rule == "1")
		RuleArr = Common.Number;
	else if(Rule == "A")
		RuleArr = Common.Upper;
	else if(Rule == "a")
		RuleArr = Common.Lower;

	for(var i = 0 ; i < RuleArr.length ; i++)
	{
		Common.No_no.push(RuleArr[i]);
	}
}
Common.GetIssueDate = function (srcPara)
{
	var st = "";
	var IssueDate = new Date();
	st = IssueDate.getDate()+"/"+(IssueDate.getMonth()+1)+"/"+IssueDate.getFullYear();	
	if(srcPara.getModel().text("*/發文日期/年月日")=="")//發文日期
		theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
}
//轉換西元日期為中華民國曆
Common.formatDate = function (sDate, type)
{	//轉換日期的格式
	if(sDate=="")	
		return "";
	var arrayDate = sDate.split("/");
	iDay = parseInt(arrayDate[0]);
	iMon = parseInt(arrayDate[1]);
	iYea = parseInt(arrayDate[2]) - 1911;
	if (type)
		return "中華民國" + iYea + "年" + iMon + "月" + iDay + "日";
	else
		return "中華民國" + Common.TranferNumType(iYea,true) + "年" + Common.TranferNumType(iMon,false) + "月" + Common.TranferNumType(iDay,false) + "日";
}
Common.TranferNumType =function(num, keepMode,argtype)
{
	if ( num > 99999)
		return "";
	if (argtype == null || argtype == 'undefined')
	{
		argtype = 0;
	}
	var arrayOfNum = Array(Array("零","一","二","三","四","五","六","七","八","九"),
				   Array("零","壹","貳","參","肆","伍","陸","柒","捌","玖"));
	var arrayOfLevel = Array(Array("","十","百","千","萬"),Array("","拾","佰","仟","萬"));

	var rtnStr = "";
	var levelStr = null;
	var numStr = null;
	var level = 0;
	var i;
	while ( num > 0 )
	{
		if ( rtnStr.lastIndexOf("零") == rtnStr.length-1 )
		rtnStr = rtnStr.replace("零", "");

		i = num % 10;
		levelStr = ( i > 0 ) ? arrayOfLevel[argtype][level] : "";

		if ( !keepMode && level == 1 && i == 1 )
			numStr = "";
		else
			numStr = arrayOfNum[argtype][i];

		rtnStr = numStr + levelStr + rtnStr;

		if ( rtnStr.indexOf( "零零" ) != -1 )
			rtnStr = rtnStr.replace( "零零", "零" );

		num = ( num - i ) / 10;
		if ( level < 4 )
			level ++;
	}
	return rtnStr;
}
Common.CheckDATE =function(argObj)//日期檢核
{
	if (argObj != "")
	{
		if (argObj.length < 7)
		{
			argObj = jf_PADL(argObj,7,'0');
		}
		if (!jf_CheckCDATE(argObj))
		{
			return false;
		}
	}
	return true;
}
//FDA-檢核分層負責代碼及設定資訊
Common.GetProxyLv =function(val, para, fldName,preVal)//現值，畫面物件，畫面欄位，前次輸入的值 
{
	//1100510 David 1100221 移除jQuery.trim()
	//if(jQuery.trim(val)=="")
	if(jf_Trim(val)=="")
		return;
	//1051229 Cloud 補上jf_trim
	//1100510 David 1100221 移除jQuery.trim()
	//val = jQuery.trim(val);
	val = jf_Trim(val);
	
	//1051012 Cloud	僅fda提供代碼轉換層級功能
	if(theUserInfo.OrgNickName=="FDA")
	{
		//1051012 Cloud	改為判斷是否輸入數字
		//if("一二三四".indexOf(val)!=-1)//表示直接輸入層級
		if(isNaN(val)==true)//true表示為非數字
		{
			var oldproxyNo = para.getModel().text("/*/分層負責代碼");
			//1051006	1050087	Cloud	補上紀錄原分層代碼核決層級，修正向下調整一次後，就不能調回原層級了
			//var oldproxyLv = para.getModel().text("/*/決行層次");
			var oldproxyLv = Common.O_ProxyLv;
			
			if(oldproxyNo=="")
			{
				alert('尚未取得分層負責代碼，請輸入代碼。');
			}
			else
			{
				//先比較輸入層級是否與原來相同
				/*if(val!=oldproxyLv)
				{
					alert('已更動層級，請以輸入代碼方式取得層級。');
					theCustom.setValue("決行層級",oldproxyLv,false);
				}*/
				//1050922	1050087		Cloud	調整決行層級判斷，可自行調整決行層級，不可上調可下調
				if(Common.O_ProxyLv=="")//無核決層級表示公文已非設定時流程開啟，需重新取得
				{
					//1051019	1050087	Cloud	修正，分類號檢核、分層決行檢核，使用的單位代碼應該要用承辦單位
					var DocInfo = theAOL.docObj.get('ODWMSG', ['INCHARGE_OU']);
					var params = new SOAPClientParameters();
					params.add('argOrgNo', theUserInfo.OrgID);
					//1051019	1050087	Cloud	修正，分類號檢核、分層決行檢核，使用的單位代碼應該要用承辦單位
					//params.add('argDeptNo', theUserInfo.DepartID);
					params.add('argDeptNo', DocInfo['INCHARGE_OU']);
					params.add('argProxyNo', oldproxyNo);
					SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetProxyLv", params ,false,function(r) 
					{
						var proxylv="";
						switch(r.value)
						{
							case "1" :
								proxylv = "一";
								break;
							case "2" :
								proxylv = "二";
								break;
							case "3" :
								proxylv = "三";
								break;
							case "4" :
								proxylv = "四";
								break;
										
						}
						Common.O_ProxyLv=proxylv;
					});
				}
				var newInt;
				var oldInt;
				switch(val)//轉換現值為數字
				{
					case "一" :
						newInt = 1;
						break;
					case "二" :
						newInt = 2;
						break;
					case "三" :
						newInt = 3;
						break;
					case "四" :
						newInt = 4;
						break;	
					default :
						newInt =0;
						break;	
				}
				if(newInt==0)
				{
					para.getModel().text("/*/決行層次",oldproxyLv);
					theCustom.setValue("決行層級",oldproxyLv,true);
					alert("Err-輸入層級異常，請輸入正確層級一~四");
					return;
				}
				switch(oldproxyLv)//轉換原值為數字
				{
					case "一" :
						oldInt = 1;
						break;
					case "二" :
						oldInt = 2;
						break;
					case "三" :
						oldInt = 3;
						break;
					case "四" :
						oldInt = 4;
						break;	
				}
				if(newInt>oldInt)
				{
					para.getModel().text("/*/決行層次",oldproxyLv);
					theCustom.setValue("決行層級",oldproxyLv,true);
					//1051208	Cloud	調整分層決行檢核訊息
					//alert("決行層級不可向上調整，請重新輸入。");
					alert("決行層級不可向下調整，請重新輸入。");
				}
				else if (newInt<oldInt)//新值小於舊值才可
				{
					theCustom.setValue("決行層級",val,true);
					// 2016.10.12 更新文面-增加更新文面功能-CLOUD
					para.$para.closest(".pages").flip("refresh");
				}
			}
			return;
		}
		//1051019	1050087	Cloud	修正，分類號檢核、分層決行檢核，使用的單位代碼應該要用承辦單位
		var DocInfo = theAOL.docObj.get('ODWMSG', ['INCHARGE_OU']);
		var params = new SOAPClientParameters();
		params.add('argOrgNo', theUserInfo.OrgID);
		//1051019	1050087	Cloud	修正，分類號檢核、分層決行檢核，使用的單位代碼應該要用承辦單位
		//params.add('argDeptNo', theUserInfo.DepartID);
		params.add('argDeptNo',DocInfo['INCHARGE_OU']);
		params.add('argProxyNo', val);
		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetProxyLv", params ,false,function(r) 
		{
			if(r.value.indexOf("ERR")!=-1)
			{
				alert(r.value);
			}
			else
			{
				var proxylv="";
				switch(r.value)
				{
					case "1" :
						proxylv = "一";
						break;
					case "2" :
						proxylv = "二";
						break;
					case "3" :
						proxylv = "三";
						break;
					case "4" :
						proxylv = "四";
						break;
				}
				theCustom.setValue("決行層級",proxylv,true);
				para.getModel().text("/*/分層負責代碼",val);
				para.getModel().text("/*/決行層次",proxylv);
				//1051006	1050087	Cloud	補上紀錄原分層代碼核決層級，修正向下調整一次後，就不能調回原層級了
				Common.O_ProxyLv=proxylv;
				// 2016.10.12 更新文面-增加更新文面功能-CLOUD
				para.$para.closest(".pages").flip("refresh");
			}
		});
	}
}
//1050822	1050087		Cloud	新增取得發文字號及支號功能
var strFDA_ORG_NO;
//1051006	1050087		Cloud	取得發文字號增加回傳發文日期功能-
//nsEditor.fnGetIssueNo = Common.fnGetIssueNo = function (argDocCount,para)
//1051021	1050087		Cloud	修改可支援fda 會銜函呼叫(直接傳入發文機關全銜、承辦單位)
//nsEditor.fnGetIssueNo = Common.fnGetIssueNo = function (argDocCount,para,argMode)
nsEditor.fnGetIssueNo = Common.fnGetIssueNo = function (argDocCount,para,argMode,argDocObj)
{
	//1060712	1060521		Cloud	提供參數設定，控制公文核決前是否可設定發文日期、字號	
	var strCanSetIssueWithNoApp = theSSO.User.SystemSets.get("CAN_SETISSUE_WITHNOAPP");
	if(strCanSetIssueWithNoApp=="N" && theAOL.docObj.getODWMSG().APP_ROLE_ID=="")
	{
		alert('公文尚未核決，不可設定發文字號');
		return null;
	}
	var strOrgNo = theUserInfo.OrgID;
	var IssueNO_no = new Array();//將支號以ARRAY回傳
	var Rtnobj;
	//1051006 Cloud	1050087	預設改為null-支援不同模式呼叫，null則研發部不會設定
	//var psIssueWord="";
	var psIssueWord=null;
	//1051021	1050087		Cloud	修改可支援fda 會銜函呼叫(直接傳入發文機關全銜)
	//var NowIssueOrgName=para.text("//發文機關/全銜");//取得現在的發文機關
	if((para==null || para==undefined) && (argDocObj==null || argDocObj==undefined))
		return null;

	//1060825	Leslie[1060567]	多取得發文機關代碼，用於公文開啟階段，還沒有準備好發文機關選單時
	var NowIssueOrgNo = "";
	var NowIssueOrgName="";//取得現在的發文機關
	//1091118 David 1090823 紀錄目前密等
	var NowSecNo = "1";
	var NowSec = "";
	if(para!=undefined && para!=null)
	{
		NowIssueOrgName=para.text("//發文機關/全銜");//取得現在的發文機關

		//1060825	Leslie[1060567]	多取得發文機關代碼，用於公文開啟階段，還沒有準備好發文機關選單時
		NowIssueOrgNo = para.text("//發文機關/機關代碼")
		//1091118 David 1090823 紀錄目前密等
		//1100419 David 1090823 修正部分客製樣板無密等TAG處理
		//NowSec = para.text("//密等/@代碼");
		try
		{
			NowSec = para.text("//密等/@代碼");
		}
		catch(e){}
	}
	else
	{
		NowIssueOrgName=argDocObj.IssueOrgName;
		//1091118 David 1090823 紀錄目前密等
		NowSec = argDocObj.Sec;
	}
	//1091118 David 1090823 紀錄目前密等
	switch(NowSec)
	{
		case"密":
			NowSecNo = "2";
		break;
		case"機密":
			NowSecNo = "3";
		break;
		case"極機密":
			NowSecNo = "4";
		break;
		case"絕對機密":
			NowSecNo = "5";
		break;
	}
	var ndOUWord;
	//1051006	1050087		Cloud	取得發文字號增加回傳發文日期功能-取得日期改為此處取得
	var IssueDate = new Date();
	var	st = IssueDate.getDate()+"/"+(IssueDate.getMonth()+1)+"/"+IssueDate.getFullYear();	
	if(argMode==null || argMode==undefined)//1051006 Raymond暫時無空修改此功能，無傳入mode預設皆為按鈕呼叫
		argMode="0";
	//1051219 	Cloud	配合調整 自動取得發文字發文日期功能，不自動取發文日期就回傳空白
	//var pIssueDate = null;
	var pIssueDate = "";
	var bSpRole = false;
	//1051007	Cloud	修正取得發文機關機關代碼方式			
	var strIssueNO ="";
	if(argMode=="2")//特定角色開啟公文時自動更新發文日期-取得設定角色並比對
	{
		if(theSSO.User.EnvSettings.get("WE_RESET_ISSUE_ROLES").indexOf(theUserInfo.RoleID)!=-1);
			bSpRole = true;
	}

	if(theAOL.docObj.docNo == "")//查驗創稿號是否空白
	{
		alert("請先取得公文文號後再要發文字號。")
		return;
	}

	var strOrgNickName = SSO_CONFIG.OrgNickName.toUpperCase();

	var AutoDate = theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE");
	//1051006 Cloud	1050087 由按鈕觸發時，如設定需取得發文日，則增加設定日期(僅FOR單筆
	if (AutoDate == "Y")
	{
		//Common.GetIssueDate(para);
		//1051006	1050087		Cloud	取得發文字號增加回傳發文日期功能-取得日期改為前方取得
		//var st = "";
		//var IssueDate = new Date();
			//st = IssueDate.getDate()+"/"+(IssueDate.getMonth()+1)+"/"+IssueDate.getFullYear();
		if(argMode=="0")//按鈕呼叫則設定當前文發聞日期
		{
			//1051021	1050087		Cloud	修改可支援fda 會銜函呼叫(直接傳入發文機關全銜)
			if(para!=undefined && para!=null)
			{
				if(para.text("*/發文日期/年月日")=="")//發文日期
					theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
			}
			else
			{
				if(argDocObj.IssueDate="")
					theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
			}
		}
		//else if(argMode=="1")//創稿呼叫增加回傳發文日期，由研發部設定-因此時COMMON無theCustom可設定
		else if(argMode=="1" || argMode=="2")//創稿呼叫增加回傳發文日期，由研發部設定-因此時COMMON無theCustom可設定
		{
			pIssueDate = st;
		}
	}
	//1060516	Kevin_C	1060235	FDA改用WebEdit02取發文字號
	//if ((strOrgNickName == "NTUST")||(strOrgNickName == "FDA")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "NTPU")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
	//1120602 David 1120517 調整臺北大學取發文字改由WebEdit02處理
	//if ((strOrgNickName == "NTUST")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "NTPU")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
	if ((strOrgNickName == "NTUST")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
	{
		//1051006 Cloud	1050087	判斷不為mode2-發文人員開啟文稿時呼叫(僅需更新發文日期，不回傳字號、支號)
		if(argMode!="2")
		{
			var ndIssueWord = Common.ndIssueWord;
			if (ndIssueWord.length != 0)
			{
				//1060516	Kevin_C	1060235	FDA改用WebEdit02取發文字號
				//if ((strOrgNickName == "YTIT")||(strOrgNickName == "NTPU")||(strOrgNickName == "FDA"))
				//1120602 David 1120517 調整臺北大學取發文字改由WebEdit02處理
				//if ((strOrgNickName == "YTIT")||(strOrgNickName == "NTPU"))
				if ((strOrgNickName == "YTIT"))
				{
					if(theUserInfo.OrgName!=NowIssueOrgName)//現行發文機關與使用者機關不同
					{
						ndOUWord = ndIssueWord.find("代碼[value='"+NowIssueOrgName+"']");
						if (ndOUWord.length!=0)//代擬代判 有設定發文字
							psIssueWord =  ndOUWord.text();
					}
				}
				//1051006 Cloud	1050087	配合調整判斷
				//if(psIssueWord=="")
				if(psIssueWord==null)
				{
					//1050912 Cloud	調整由para.text("//發文機關/承辦單位")取得一級承辦單位，不能使用承辦人所屬處室，二級承辦人會取不到發文字
					//ndOUWord = ndIssueWord.find("代碼[value='"+theAOL.docObj.ICOUName+"']");
					//1051021	1050087		Cloud	修改可支援fda 會銜函呼叫(直接傳入發文機關全銜)
					if(para!=undefined && para!=null)
						ndOUWord = ndIssueWord.find("代碼[value='"+para.text("//發文機關/承辦單位")+"']");
					else
						ndOUWord = ndIssueWord.find("代碼[value='"+argDocObj.RpsDeptName+"']");
					if (ndOUWord.length!=0)
					{
						psIssueWord = ndOUWord.text();
					}
					else
					{
						//1050912 Cloud	調整由para.text("//發文機關/承辦單位")取得一級承辦單位，不能使用承辦人所屬處室，二級承辦人會取不到發文字
						//alert('未設定「'+theAOL.docObj.ICOUName+'」之發文字');
						//1051021	1050087		Cloud	修改可支援fda 會銜函呼叫(直接傳入發文機關全銜)
						if(para!=undefined && para!=null)
							alert('未設定「'+para.text("//發文機關/承辦單位")+'」之發文字');
						else
							alert('未設定「'+argDocObj.RpsDeptName+'」之發文字');
						return null;
					}
				}
			}
			//1051006 Cloud	1050087	增加判斷模式不同時回傳值不同-按鈕呼叫時才傳支號		
			if(argMode=="0")
			{
				if(psIssueWord != "" && psIssueWord!=undefined)
					IssueNO_no = AutoGetNoNo(argDocCount);
			}
		}
		else//開啟文稿時呼叫，並且為特殊角色
		{
			if(bSpRole)
				pIssueDate = st;
		}

		Rtnobj = {
		"IssueWord":psIssueWord,
		"IssueNo_no":IssueNO_no,
		//1051006 Cloud	1050087	增加回傳發文日期
		"ISSUE_DATE":pIssueDate,
		};
		return Rtnobj;
	}
	else
	{
		//1051006 Cloud	1050087	修正，取得發文字時，應使用承辦單位代碼，非當前使用者所屬單位代碼
		//var DocInfo = theAOL.docObj.get('ODWMSG', ['DOC_NO','SECRETE']);
		if(argMode!="2")
		{
			var DocInfo = theAOL.docObj.get('ODWMSG', ['DOC_NO','SECRETE','INCHARGE_OU']);
			if(DocInfo['DOC_NO'] == "")//查驗創稿號是否空白
			{
				alert("請先取得公文文號後再要發文字號。")
				return;
			}
			//1051006	Cloud	1050087	為mode2時，不呼叫取得發文字行為
			//取得發文機關代碼-S		
			//1050808	[1050087]		Cloud	配合IE無evaluate物件調整XML		
			//1051007	Cloud	修正取得發文機關機關代碼方式			

			//1060825	Leslie[1060567]	還沒有準備好發文機關選單時，改用文稿紀錄的機關代碼
			if(Common.snapshot){
				for(var i=0; i<Common.snapshot.length; i++) 
				{
					var org = Common.snapshot.eq(i);
					var nm = org.find("全銜").text();
					if(NowIssueOrgName == nm) 
					{
						strIssueNO = $(org).find("機關代碼").text();//取得發文機關代碼
						break;
					}
				}
			}
			//1060825	Leslie[1060567]	多取得發文機關代碼，用於公文開啟階段，還沒有準備好發文機關選單時
			else if(NowIssueOrgNo != ""){
				strIssueNO = NowIssueOrgNo;
			}

			//1110715 David 1110727 當稿件的發文機關代碼符合設定值時，取得機關發文代字使用機關代碼取得，供取得總發代字使用
			if(theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO") != "")
			{
				let arrUseOrgIssueWordOrgNo = theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO").toUpperCase().split(';');
				if(arrUseOrgIssueWordOrgNo.includes(strIssueNO.toUpperCase()))
					strIssueNO = theUserInfo.OrgID;
			}

			var params = new SOAPClientParameters();
			params.add('OrgNo', theUserInfo.OrgID);
			params.add('DocNo', DocInfo['DOC_NO']);
			//1051007	Cloud	修正取得發文機關機關代碼方式
			//params.add('IssueOrgNo', para.text("//發文機關/機關代碼"));
			params.add('IssueOrgNo', strIssueNO);
			//1091118 David 1090823 依稿件密等判斷
			//params.add('SecNo', DocInfo['SECRETE']);
			params.add('SecNo', NowSecNo);
			//1051006 Cloud	1050087	修正，取得發文字時，應使用承辦單位代碼，非當前使用者所屬單位代碼
			//params.add('DeptNo', theUserInfo.DepartID);
			params.add('DeptNo', DocInfo['INCHARGE_OU']);
			//1060609	Cloud	調整呼叫ws為同步
			//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "GetIssueNo", params, true,function(r) 
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "GetIssueNo", params, false,function(r) 
			{	
				if(r.value.ErrorClass.IsErr== true) 
				{
					alert("發文字取得異常："+r.value.ErrorClass.ErrMessage);
					return;
				}
				else 
				{
					//1051006	Cloud	改為判斷變數
					//if(theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE")=="Y");
					//1060602	Cloud	修正判斷自動取得日期判斷環境變數異常的bug
					//if(AutoDate=="Y");
					if(AutoDate=="Y")
					{
						//1051006 Cloud	1050087	移至前方宣告
						//var st = "";
						//var IssueDate = new Date();
							//st = IssueDate.getDate()+"/"+(IssueDate.getMonth()+1)+"/"+IssueDate.getFullYear();	
						if(argMode=="0")//按鈕觸發直接設定
						{
							//1090316 David 1090113 新增判斷觸發來源，避免會銜函呼叫時異常
							//if(para.text("*/發文日期/年月日")=="")//發文日期
								//theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
							if(para!=undefined && para!=null)
							{
								if(para.text("*/發文日期/年月日")=="")//發文日期
									theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
							}
							else
							{
								if(argDocObj.IssueDate=="")
									theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
							}
						}
						else if(argMode=="1")
						{
							pIssueDate = st;
						}
					}
					if(r.value.IssueWord!="")
						IssueNO_no = AutoGetNoNo(argDocCount);

					Rtnobj = {
						//1130520	Joe		1130222		調整發文字號單筆取得邏輯
						// "IssueWord":r.value.IssueWord,
						"IssueWord":r.value.IssueWord[0],
						"IssueNo_no":IssueNO_no,
						//1051006 Cloud	1050087	增加回傳發文日期
						"ISSUE_DATE":pIssueDate
						//1100927 David 新增回傳WS取得的發文號資料，支援代擬公文發文號區間與公文號不同功能
						//1130520	Joe		1130222		調整發文字號單筆取得邏輯
						/*
						,"IssueYear":Common.TranNumAndRtnStr(r.value.IssueYear,"1")
						,"IssueNo":Common.TranNumAndRtnStr(r.value.IssueNo,"1")
						*/
						,"IssueYear":Common.TranNumAndRtnStr(r.value.IssueYear[0],"1")
						,"IssueNo":Common.TranNumAndRtnStr(r.value.IssueNo[0],"1")
					};
				}
			});
		}
		//發文人員開啟時，增加回傳發文日期
		else
		{
			//1060828	Leslie[1060567]	補上：開啟文稿時呼叫，並且為特殊角色(argMode=2)時，應回傳日期
			if(bSpRole)
				pIssueDate = st;
			Rtnobj = {
				"IssueWord":null,
				"IssueNo_no":null,
				"ISSUE_DATE":pIssueDate,
			};
		}
		return Rtnobj;
	}
}
//1130516	Joe		1130222		增加批次取得批號功能--S
nsEditor.fnGetIssueNoInBatch = Common.fnGetIssueNoInBatch = function (argDocObjList, argMode)
{
	//提供參數設定，控制公文核決前是否可設定發文日期、字號	
	var strCanSetIssueWithNoApp = theSSO.User.SystemSets.get("CAN_SETISSUE_WITHNOAPP");
	if(strCanSetIssueWithNoApp=="N" && theAOL.docObj.getODWMSG().APP_ROLE_ID=="")
	{
		alert('公文尚未核決，不可設定發文字號');
		return null;
	}
	if(theAOL.docObj.docNo == "")//查驗創稿號是否空白
	{
		alert("請先取得公文文號後再要發文字號。")
		return;
	}
	var SecList = new Array();
	var IssueOrgList = new Array();
	var strOrgNo = theUserInfo.OrgID;
	var IssueNO_no = new Array();//將支號以ARRAY回傳
	var Rtnobj;
	var IssueWordList = new Array();
	//預設改為null-支援不同模式呼叫，null則研發部不會設定
	var psIssueWord=null;
	var bGetIssueInBatch = true;
	for(var iDoc =0; iDoc < argDocObjList.length; iDoc++){
		//取得發文機關代碼，用於公文開啟階段，還沒有準備好發文機關選單時
		var NowIssueOrgNo = "";
		var NowIssueOrgName="";//取得現在的發文機關
		//紀錄目前密等
		var NowSecNo = "1";
		var NowSec = "";
		
		//紀錄稿件
		var para = argDocObjList[iDoc].dm;
		if((para==null || para==undefined))
			continue;
		
		if(para!=undefined && para!=null)
		{
			NowIssueOrgName=para.text("//發文機關/全銜");//取得現在的發文機關

			//多取得發文機關代碼，用於公文開啟階段，還沒有準備好發文機關選單時
			NowIssueOrgNo = para.text("//發文機關/機關代碼")
			//部分客製樣板無密等TAG處理
			try
			{
				NowSec = para.text("//密等/@代碼");
			}
			catch(e){}
		}
		else
		{
			NowIssueOrgName=argDocObj.IssueOrgName;
			NowSec = argDocObj.Sec;
		}
		switch(NowSec)
		{
			case"密":
				NowSecNo = "2";
			break;
			case"機密":
				NowSecNo = "3";
			break;
			case"極機密":
				NowSecNo = "4";
			break;
			case"絕對機密":
				NowSecNo = "5";
			break;
		}
		SecList.push(NowSecNo);
		var ndOUWord;
		var IssueDate = new Date();
		var	st = IssueDate.getDate()+"/"+(IssueDate.getMonth()+1)+"/"+IssueDate.getFullYear();	
		if(argMode==null || argMode==undefined)//1051006 Raymond暫時無空修改此功能，無傳入mode預設皆為按鈕呼叫
			argMode="0";
		var pIssueDate = "";
		var bSpRole = false;		
		var strIssueNO ="";
		if(argMode=="2")//特定角色開啟公文時自動更新發文日期-取得設定角色並比對
		{
			if(theSSO.User.EnvSettings.get("WE_RESET_ISSUE_ROLES").indexOf(theUserInfo.RoleID)!=-1);
				bSpRole = true;
		}


		var strOrgNickName = SSO_CONFIG.OrgNickName.toUpperCase();

		var AutoDate = theSSO.User.EnvSettings.get("WE_ISSUENO_ISSUEDATE");
		if (AutoDate == "Y")
		{
			if(argMode=="0")//按鈕呼叫則設定當前文發聞日期
			{
				if(para!=undefined && para!=null)
				{
					if(para.text("*/發文日期/年月日")=="")//發文日期
						theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
				}
				else
				{
					if(argDocObj.IssueDate="")
						theCustom.setValue("發文日期",Common.formatDate(st, true),true);//異動畫面	
				}
			}
			else if(argMode=="1" || argMode=="2")//創稿呼叫增加回傳發文日期，由研發部設定-因此時COMMON無theCustom可設定
			{
				pIssueDate = st;
			}
		}
		
		if ((strOrgNickName == "NTUST")||(strOrgNickName == "SMEA")||(strOrgNickName == "YTIT")||(strOrgNickName == "NFA")||(strOrgNickName == "YML")||(strOrgNickName == "MTAC")||(strOrgNickName == "TBROC")||(strOrgNickName == "PHNSA"))
		{
			bGetIssueInBatch = false;
			//判斷不為mode2-發文人員開啟文稿時呼叫(僅需更新發文日期，不回傳字號、支號)
			if(argMode!="2")
			{
				var ndIssueWord = Common.ndIssueWord;
				if (ndIssueWord.length != 0)
				{
					if ((strOrgNickName == "YTIT"))
					{
						if(theUserInfo.OrgName!=NowIssueOrgName)//現行發文機關與使用者機關不同
						{
							ndOUWord = ndIssueWord.find("代碼[value='"+NowIssueOrgName+"']");
							if (ndOUWord.length!=0)//代擬代判 有設定發文字
								psIssueWord =  ndOUWord.text();
						}
					}
					if(psIssueWord==null)
					{
						if(para!=undefined && para!=null)
							ndOUWord = ndIssueWord.find("代碼[value='"+para.text("//發文機關/承辦單位")+"']");
						else
							ndOUWord = ndIssueWord.find("代碼[value='"+argDocObj.RpsDeptName+"']");
						if (ndOUWord.length!=0)
						{
							psIssueWord = ndOUWord.text();
						}
						else
						{
							if(para!=undefined && para!=null)
								alert('未設定「'+para.text("//發文機關/承辦單位")+'」之發文字');
							else
								alert('未設定「'+argDocObj.RpsDeptName+'」之發文字');
							return null;
						}
					}
				}
				if(argMode=="0")
				{
					if(psIssueWord != "" && psIssueWord!=undefined)
						IssueNO_no = AutoGetNoNo(argDocObjList.length);
				}
			}
			else//開啟文稿時呼叫，並且為特殊角色
			{
				if(bSpRole)
					pIssueDate = st;
			}
			IssueWordList.push(psIssueWord);
		}
		else
		{
			if(argMode!="2")
			{
				var DocInfo = theAOL.docObj.get('ODWMSG', ['DOC_NO','SECRETE','INCHARGE_OU']);
				if(DocInfo['DOC_NO'] == "")//查驗創稿號是否空白
				{
					alert("請先取得公文文號後再要發文字號。")
					return;
				}
				//還沒有準備好發文機關選單時，改用文稿紀錄的機關代碼
				if(Common.snapshot){
					for(var i=0; i<Common.snapshot.length; i++) 
					{
						var org = Common.snapshot.eq(i);
						var nm = org.find("全銜").text();
						if(NowIssueOrgName == nm) 
						{
							strIssueNO = $(org).find("機關代碼").text();//取得發文機關代碼
							break;
						}
					}
				}
				//多取得發文機關代碼，用於公文開啟階段，還沒有準備好發文機關選單時
				else if(NowIssueOrgNo != ""){
					strIssueNO = NowIssueOrgNo;
				}

				//當稿件的發文機關代碼符合設定值時，取得機關發文代字使用機關代碼取得，供取得總發代字使用
				if(theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO") != "")
				{
					let arrUseOrgIssueWordOrgNo = theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO").toUpperCase().split(';');
					if(arrUseOrgIssueWordOrgNo.includes(strIssueNO.toUpperCase()))
						strIssueNO = theUserInfo.OrgID;
				}
				IssueOrgList.push(strIssueNO);
			}
			//發文人員開啟時，增加回傳發文日期
			//Joetest 再想想
			/*
			
			else
			{
				//1060828	Leslie[1060567]	補上：開啟文稿時呼叫，並且為特殊角色(argMode=2)時，應回傳日期
				if(bSpRole)
					pIssueDate = st;
				Rtnobj = {
					"IssueWord":null,
					"IssueNo_no":null,
					"ISSUE_DATE":pIssueDate,
				};
			}
			return Rtnobj;
			*/
		}
	}
	
	if(!bGetIssueInBatch)
	{
		Rtnobj = {
		"IssueWord":IssueWordList,
		"IssueNo_no":IssueNO_no,
		"ISSUE_DATE":pIssueDate,
		};
	}
	else{		
		var params = new SOAPClientParameters();
		params.add('OrgNo', theUserInfo.OrgID);
		params.add('DocNo', DocInfo['DOC_NO']);
		params.add('IssueOrgNo', IssueOrgList);
		params.add('SecNo', SecList);
		params.add('DeptNo', DocInfo['INCHARGE_OU']);
		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("webeditws"), "GetIssueNoInBatch", params, false,function(r) 
		{	
			if(r.value.ErrorClass.IsErr== true) 
			{
				alert("發文字取得異常："+r.value.ErrorClass.ErrMessage);
				return;
			}
			else 
			{
				if(r.value.IssueWord!="")
					IssueNO_no = AutoGetNoNo(argDocObjList.length);

				Rtnobj = {
					"IssueWord":r.value.IssueWord,
					"IssueNo_no":IssueNO_no,
					"ISSUE_DATE":pIssueDate
					,"IssueYear":Common.TranNumAndRtnStrInbatch(r.value.IssueYear,"1")
					,"IssueNo":Common.TranNumAndRtnStrInbatch(r.value.IssueNo,"1")
				};
			}
		});
	}
	return Rtnobj;
}
//1130516	Joe		1130222		增加批次取得批號功能--E
//1050921	1050087		Cloud	新增函式for客製化顯示承辦單位資訊機關。
Common.SetDeptName =function(Deptname,$res)//現行單位值 發文機關結點
{
	//1100510 David 1100221 移除jQuery.trim()
	//if(jQuery.trim(Deptname)=="")
	if(jf_Trim(Deptname)=="")
		return "";
	var rtnVal="";
	if(SSO_CONFIG.OrgNickName.toUpperCase()=="MPB")
	{
		//1060216	序451(航港局)Cloud	Cloud	修正，第二個稿件以後，承辦單位未依照發文層級顯示一級/二級問題
		//if(Deptname.indexOf('|')!=-1)
		if(Deptname.indexOf('|')!=-1 || (Common.DeptName!="" && Common.SectName!=""))
		{
			if(Common.DeptName=="" && Common.SectName=="")
			{
				Common.DeptName = Deptname.split('|')[0];
				Common.SectName = Deptname.split('|')[1];
			}
			//1120918 David 1120750 支援組改不切換DB機關代碼，調整航港局客製化稿件單位名稱顯示判斷功能
			//if(theUserInfo.OrgID == $res.find("機關代碼").text())//發文機關為所屬機關顯示一級
			if(theSSO.OrgMap[theUserInfo.OrgID] == $res.find("機關代碼").text())
				rtnVal = Common.DeptName;
			else
				rtnVal = Common.SectName;
			//1060125	序315(航港局)Cloud	修正，航港局一級單位承辦人員創稿無承辦單位資訊，且無法使用抄本預設承辦單位功能問題
			theUserInfo.DepartName = Common.DeptName+"("+Common.SectName+")";
			
		}
		//1060125	序315(航港局)Cloud	修正，航港局一級單位承辦人員創稿無承辦單位資訊，且無法使用抄本預設承辦單位功能問題
		else
		{
			Common.DeptName = Deptname;
			theUserInfo.DepartName = Deptname;
			rtnVal = Deptname;
		}
	}
	else if(SSO_CONFIG.OrgNickName.toUpperCase()=="RRB")//1090519 David 1090218 內部行文新增簽時，畫面上簽於需顯示二級單位名稱
	{
		rtnVal = Deptname;

		if(theAOL.docObj.ODWMSG.B_TYPE_NO == "17" && theUserInfo.SectName != "" && $res.get(0).ownerDocument.documentElement.nodeName == "簽")
		{
			//1090721 David 1090218 修改二級單位時加上二級單位名稱
			//rtnVal = theUserInfo.SectName;
			rtnVal += theUserInfo.SectName;
		}
	}
	else
		rtnVal = Deptname;
	return rtnVal;
}
//1050921	1050087		Cloud	新增函式for客製化顯示抄本單位資訊。
Common.SetCopyName =function(Copyname)//現行單位值
{
	//1100510 David 1100221 移除jQuery.trim()
	//if(jQuery.trim(Copyname)=="")
	if(jf_Trim(Copyname)=="")
		return "";
	var rtnVal=Copyname;
	if(Copyname.indexOf('|')!=-1)
	{
		rtnVal = Copyname.split('|')[0]+"("+Copyname.split('|')[1]+")";
	}
	return rtnVal;
}
//1050921 Cloud	航港局發文機關連動修改承辦單位
Common.fnChangeDeptname = function(srcFldName, val, fldName, elems, srcPara)
{
	for(var i=0; i<Common.snapshot.length; i++) 
	{
		var org = Common.snapshot.eq(i);
		var nm = NowIssueOrgName = org.find("全銜").text();
		if(val == nm) 
		{
			SourceNo = $(org).find("機關代碼").text();//取得發文機關代碼
			break;
		}
	}
	//同時有值時，為滿足以下條件航港局，且二級單位承辦人開啟
	//(1)航港局
	//(2)二級單位承辦人開啟
	//(3)環境設定為顯示一二級單位
	if(Common.DeptName!="" && Common.SectName!="")
	{
		//1130112 David 1121021 支援組改不切換DB機關代碼邏輯
		//if(SourceNo==theUserInfo.OrgID)
		if(SourceNo == theSSO.OrgMap[theUserInfo.OrgID])
		{
			theCustom.setValue("承辦單位",Common.DeptName);
		}
		else
		{
			theCustom.setValue("承辦單位",Common.SectName);
		}
	}
}
//1100324 David 1090836 新增核判區分連動處理
Common.fnAppRoleCheck = function(val, para, fldName,preVal)//現值，畫面物件，畫面欄位，前次輸入的值 
{
	var CheckedAppRole = jf_Trim(val).toUpperCase();

	if(CheckedAppRole == "OD21" && theAOL.docObj.ICOUId.length == 2)
	{
		alert("目前公文承辦單位為" + theAOL.docObj.ICOUName +"，核判區分不可設定為科長");
		para.$para.find("input[type=radio]").prop("checked", false);
		CheckedAppRole = "";
	}

	//更新至基資
	theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DRAFT_APP_ROLE', value: CheckedAppRole}]);
	//更新至所有稿件
	theAOL.getCurrFolio().getAllDraftText("/*/核判區分").done
	(
		function(arr) 
		{
			theAOL.getCurrFolio().setAllDraftText("/*/核判區分",CheckedAppRole);
		}
	);
}

//1100716 David 1100433 新增決行層級連動排出初版預排流程處理
Common.fnAppLvlModify = function(val, para) 
{
	//1130117 David 1121045 支援銓敘部同步決行層級、決行層次功能，調整傳入參數val邏輯
	let strAppLvl = "";
	let strAppLvlName = "";
	if(Array.isArray(val))
	{
		strAppLvl = val[0];
		strAppLvlName = val[1];
	}
	else
		strAppLvl = val;

	//1130117 David 1121045 新增銓敘部同步決行層級、決行層次功能
	if(SSO_CONFIG.OrgNickName.toUpperCase() == "MOCS")
	{
		let iAllDraftCount = theAOL.getCurrFolio().getDraftCounts()-(theAOL.getCurrFolio().hasFromDoc()?1:0);
		if(iAllDraftCount > 1 && strAppLvlName != '' && strAppLvlName != '　')
		{
			let bAllAppLvlSame = true;
			let strNowDraftGUID = para.getModel().getDraftGUID();
			let iDraftCount = theAOL.getCurrFolio().getDraftCounts();//取得所有稿件數量
			function doNext(iDraft)
			{
				if(iDraft < iDraftCount)
				{
					theAOL.getCurrFolio().accquireDraftModel(iDraft)
					.done(function(dm){

						if(!dm)
						{
							//配合非同步處理，稿件不處理時執行下個稿件
							doNext(iDraft + 1);
							return;
						}
						else
						{
							let strDraftGUID = dm.getDraftGUID();
							if(strNowDraftGUID != "" && strNowDraftGUID == strDraftGUID)//排除目前稿件
							{
								doNext(iDraft + 1);
								return;
							}
						}
						
						let strDraftAppLvlName = "";
						let bGetDraftAppLvlName = false;
						try
						{
							strDraftAppLvlName = dm.text("//決行層級");
							bGetDraftAppLvlName = true;
						}
						catch{}
						if(bGetDraftAppLvlName && strAppLvlName != strDraftAppLvlName)
							bAllAppLvlSame = false;

						doNext(iDraft + 1);//處理下一筆文稿
						return;
					})
					.fail(function(errorText) {

						doNext(iDraft + 1);//處理下一筆文稿
						return;
					});
				}
				else
				{
					if(!bAllAppLvlSame)
					{
						if(window.confirm('選擇之決行層級與其他稿件不同，是否要同步至其他稿件？'))
						{
							theAOL.getCurrFolio().setAllDraftText("/*/決行層級" , strAppLvlName);
							theAOL.getCurrFolio().setAllDraftText("/*/決行層次/@代碼" , strAppLvl);
							para.$para.closest(".pages").flip("refresh");
						}
					}
				}
			}
			doNext(0);//開始處理第1筆文稿
		}
	}

	//1110924 David 1110882 新增執行判斷，線上簽核、紙本至人、啟用紙本預排流程，才需連動
	if(theAOL.docObj.signType =="E" || theSSO.User.SystemSets.get("PFLOW_TO_USER") == "Y" 
		|| (theAOL.docObj.signType =="P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
	{
		var AppLvl = "";
		//1130117 David 1121045 支援銓敘部同步決行層級、決行層次功能，調整傳入參數val邏輯
		//switch(val)
		switch(strAppLvl)
		{
			case "一" :
				AppLvl = "1";
				break;
			case "二" :
				AppLvl = "2";
				break;
			case "三" :
				AppLvl = "3";
				break;
			case "四" :
				AppLvl = "4";
				break;
			//1110924 David 1110882 擴充決行層級
			case "五" :
				AppLvl = "5";
				break;
			case "六" :
				AppLvl = "6";
				break;
		}

		//1130306 David 1120589 調整判斷邏輯
		//if(AppLvl == "")
		if(AppLvl == "" && SSO_CONFIG.OrgNickName.toUpperCase() != "TVGH")
			return;

		var wwkf = theAOL.docObj.getODWWKF();
		if(!wwkf)
		{
			theAOL.docObj.initODWWKF();
			wwkf = theAOL.docObj.getODWWKF();
		}

		//流程在承辦人時才觸發
		if(theAOL.docObj.ODWMSG.INCHARGE_OU == theAOL.docObj.ODWMSG.OWN_OU_ID 
			&& theAOL.docObj.ODWMSG.IC_USER_ID.toUpperCase() == theUserInfo.UserID.toUpperCase())
		{
			//紀錄原有的會辦流程資訊
			var wwkfInternalOu = [];//內會
			var wwkfExternalOu = [];//順會、分會
			var wwkfAfterAPPOu = [];//後會
			for(let iwwkf = 0 ; iwwkf < wwkf.length ; iwwkf++)
			{
				let FlowType = wwkf[iwwkf].RADIO_SELECTED_1;
				if(FlowType == "2" || FlowType == "3")//順、分、內會
				{
					let wwkfOwnOuId = wwkf[iwwkf].OWN_OU_ID;
					if(FlowType == "2" && wwkfOwnOuId.substr(0,2) == theAOL.docObj.ODWMSG.INCHARGE_OU.substr(0,2))//內會
						wwkfInternalOu.push(wwkf[iwwkf])
					else//順分會
						wwkfExternalOu.push(wwkf[iwwkf])
				}
				else if(FlowType == "4")//後會
					wwkfAfterAPPOu.push(wwkf[iwwkf])
			}
			
			//1130207 David 1120589 新增中榮客製化決行層級處理，調整邏輯
			/*var params = new SOAPClientParameters();
			params.add('argArtifact', localStorage.Artifact);
			params.add('argAppLvl', AppLvl);
			params.add('argOrgNo', theAOL.docObj.get("ODWMSG", "SOURCE_ORGNO"));
			params.add('argOuId', theAOL.docObj.get("ODWMSG", "INCHARGE_OU"));
			params.add('argRoleNo', theAOL.docObj.get("ODWMSG", "OWN_ROLE_ID"));
			params.add('argUserId', theSSO.User.account);
			params.add('argUserName', theSSO.User.name);
			//1110924 David 1110882 擴充決行層級
			params.add('argSignType', theAOL.docObj.signType);*/
			var params = new SOAPClientParameters();
			let strFunctionName = "";
			if(SSO_CONFIG.OrgNickName.toUpperCase() == "TVGH")
			{
				strFunctionName = "ProcAppLvL_WWKF";
				params.add('argArtifact', localStorage.Artifact);
				params.add('argOrgNo', theAOL.docObj.get("ODWMSG", "SOURCE_ORGNO"));
				params.add('argOuId', theAOL.docObj.get("ODWMSG", "INCHARGE_OU"));
				params.add('argRoleNo', theAOL.docObj.get("ODWMSG", "OWN_ROLE_ID"));
				//1130306 David 1120589 調整參數改傳入決行層級中文文字
				//params.add('argAppLevelNo', AppLvl);
				params.add('argAppLevelNo', strAppLvl);
			}
			else
			{
				strFunctionName = "ProcAppLvlWWKF";
				params.add('argArtifact', localStorage.Artifact);
				params.add('argAppLvl', AppLvl);
				params.add('argOrgNo', theAOL.docObj.get("ODWMSG", "SOURCE_ORGNO"));
				params.add('argOuId', theAOL.docObj.get("ODWMSG", "INCHARGE_OU"));
				params.add('argRoleNo', theAOL.docObj.get("ODWMSG", "OWN_ROLE_ID"));
				params.add('argUserId', theSSO.User.account);
				params.add('argUserName', theSSO.User.name);
				params.add('argSignType', theAOL.docObj.signType);
			}

			//1130207 David 1120589 新增中榮客製化決行層級處理，調整邏輯
			//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("odmsspws"), "ProcAppLvlWWKF", params ,false,function(r)
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("odmsspws"), strFunctionName, params ,false,function(r)
			{
				var rtnObj = r.value;
				if(rtnObj.m_bSuccess)
				{
					var wwkfItem = {
						ADDBY : "",
						CREATE_BY : "",
						OWN_OU_ID : "",
						OWN_OU_NAME : "",
						OWN_ROLE_ID : "",
						OWN_ROLE_NAME : "",
						OWN_USER_ID : "",
						OWN_USER_NAME : "",
						RADIO_SELECTED_1 : "",
						SEND_BY : "",
						SEND_TIME : "",
						SIGN_F : "",
						TX_NAME : ""
					};
					var wwkfSaveObj = [];

					//紀錄預計傳送對象資訊
					var defTarget = { TxName: '', OUId: '', RoleId: '', UserId: '', OUName: '', RoleName: '', UserName: '' };
					//紀錄單位內(OD1X前)，單位外(OD11後)Index
					let iInternalIndex = -1;
					let iExternalIndex = -1;
					let strDeptId = theAOL.docObj.get("ODWMSG", "INCHARGE_OU");
					if(strDeptId.length > 2)
						strDeptId.substr(0,2);
					
					var xml = rtnObj.m_strRetStr;
					var xmlDoc = $.parseXML( xml );
					$xml = $( xmlDoc );
					var FlowCount = $xml.find("item").length;
					for(var iFlow = 0 ; iFlow < FlowCount ; iFlow++)
					{
						var SaveItem = $.extend({}, wwkfItem);
						var $Item = $xml.find("item").eq(iFlow);
						SaveItem.OWN_USER_ID = $Item.find("OWN_USER_ID").text();
						SaveItem.OWN_USER_NAME = $Item.find("OWN_USER_NAME").text();
						SaveItem.OWN_OU_ID = $Item.find("OWN_OU_ID").text();
						SaveItem.OWN_OU_NAME = $Item.find("OWN_OU_NAME").text();
						SaveItem.OWN_ROLE_ID = $Item.find("OWN_ROLE_ID").text();
						SaveItem.OWN_ROLE_NAME = $Item.find("OWN_ROLE_NAME").text();
						SaveItem.CREATE_BY = $Item.find("CREATE_BY").text();
						SaveItem.SEND_BY = $Item.find("SEND_BY").text();
						SaveItem.SEND_TIME = $Item.find("SEND_TIME").text();
						SaveItem.ADDBY = $Item.find("ADDBY").text();
						SaveItem.RADIO_SELECTED_1 = $Item.find("RADIO_SELECTED_1").text();
						SaveItem.SIGN_F = $Item.find("SIGN_F").text();
						SaveItem.TX_NAME = $Item.find("TX_NAME").text();
						wwkfSaveObj[wwkfSaveObj.length] = SaveItem;

						//將預計傳送對象資訊同步至畫面傳送選項
						if (defTarget.TxName == '')
						{
							defTarget.TxName = $Item.find("TX_NAME").text();
							defTarget.OUId = $Item.find("OWN_OU_ID").text();
							defTarget.RoleId = $Item.find("OWN_ROLE_ID").text();
							defTarget.UserId = $Item.find("OWN_USER_ID").text();
							defTarget.OUName = $Item.find("OWN_OU_NAME").text();
							defTarget.RoleName = $Item.find("OWN_ROLE_NAME").text();
							defTarget.UserName = $Item.find("OWN_USER_NAME").text();
							SSOUtil.updateTransTarget_WWKF(defTarget);
						}

						//紀錄單位內，單位外Index
						if(theAOL.docObj.signType =="E" || theSSO.User.SystemSets.get("PFLOW_TO_USER") == "Y" )
						{
							//1121107 David 排除登記桌，分辦人員
							//if(iInternalIndex == -1 && SaveItem.OWN_ROLE_ID.indexOf('OD1') == 0)
							if(iInternalIndex == -1 && SaveItem.OWN_ROLE_ID.indexOf('OD1') == 0 && SaveItem.OWN_ROLE_ID != "OD16" && SaveItem.OWN_ROLE_ID != "OD17")
								iInternalIndex = iFlow;
							//1121107 David 改依單位代碼判斷
							//if(iExternalIndex == -1 && SaveItem.OWN_ROLE_ID.indexOf('OD0') == 0)
							if(iExternalIndex == -1 && SaveItem.OWN_OU_ID > "94")
								iExternalIndex = iFlow;
						}
						else if(theAOL.docObj.signType =="P")
						{
							if(iInternalIndex == -1 && SaveItem.OWN_OU_ID == strDeptId)
								iInternalIndex = iFlow;
							if(iExternalIndex == -1 && SaveItem.OWN_OU_ID.indexOf(strDeptId) == -1)
								iExternalIndex = iFlow;
						}
					}

					//將原有的會辦流程加入
					if(wwkfExternalOu.length > 0)//先加入順分會(先加入內會會影響index)
					{
						if(iExternalIndex == -1)
							iExternalIndex = FlowCount;

						for(let i = wwkfExternalOu.length-1 ; i > -1 ; i--)
							wwkfSaveObj.splice(iExternalIndex,0,wwkfExternalOu[i]);
					}
					if(wwkfInternalOu.length > 0)//再加入內會
					{
						if(iInternalIndex == -1)
							iInternalIndex = FlowCount;

						for(let i = wwkfInternalOu.length-1 ; i > -1 ; i--)
							wwkfSaveObj.splice(iInternalIndex,0,wwkfInternalOu[i]);
					}
					if(wwkfAfterAPPOu.length > 0)//後會加在最後面
					{
						for(let i = 0 ; i < wwkfAfterAPPOu.length ; i++)
							wwkfSaveObj.push(wwkfAfterAPPOu[i]);
					}

					theAOL.docObj.updateODWWKF(wwkfSaveObj);
				}
				else
				{
					alert("初始化預排流程處理失敗，錯誤訊息:" + rtnObj.m_strErrMsg);
				}
			});
		}
	}
}

//1130117 David 1121045 新增決行方式連動處理
Common.fnAppModeModify = function(val, para)
{
	let iAllDraftCount = theAOL.getCurrFolio().getDraftCounts()-(theAOL.getCurrFolio().hasFromDoc()?1:0);
	if(iAllDraftCount == 1)
		return;

	let bAllAppModeSame = true;
	let strAppMode = val;

	let strNowDraftGUID = para.getModel().getDraftGUID();
	let iDraftCount = theAOL.getCurrFolio().getDraftCounts();//取得所有稿件數量
	function doNext(iDraft)
	{
		if(iDraft < iDraftCount)
		{
			theAOL.getCurrFolio().accquireDraftModel(iDraft)
			.done(function(dm){

				if(!dm)
				{
					//配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}
				else
				{
					let strDraftGUID = dm.getDraftGUID();
					if(strNowDraftGUID != "" && strNowDraftGUID == strDraftGUID)//排除目前稿件
					{
						doNext(iDraft + 1);
						return;
					}
				}
				
				let strDraftAppMode = "";
				let bGetDraftAppMode = false;
				try
				{
					strDraftAppMode = dm.text("//決行方式");
					bGetDraftAppMode = true;
				}
				catch{}
				if(bGetDraftAppMode && strAppMode != strDraftAppMode)
					bAllAppModeSame = false;

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			})
			.fail(function(errorText) {

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			});
		}
		else
		{
			if(!bAllAppModeSame)
			{
				if(window.confirm('選擇之決行方式與其他稿件不同，是否要同步至其他稿件？'))
				{
					theAOL.getCurrFolio().setAllDraftText("//決行方式" , strAppMode);
					theAOL.getCurrFolio().setAllDraftText("//決行方式/@代碼" , strAppMode);
					para.$para.closest(".pages").flip("refresh");
				}
			}
		}
	}
	doNext(0);//開始處理第1筆文稿
}

//下方為共用函式
function CheckCDATE(argStr) 
{
	if (argStr.length < 7)
		{argStr = PADL(argStr,7,'0');}
	var pYear,pMonth,pDay;
	pYear=parseInt(argStr.substring(0,3),10)+1911;
	pMonth=parseInt(argStr.substring(3,5),10);
	pDay=parseInt(argStr.substring(5,7),10);

	if (!COMMON_ValidDate(pYear, pMonth-1, pDay)) 
		{return false}
	else {return true}
}
function COMMON_ValidDate(y, m, d)
 { with (new Date(y, m, d)) return ((getDate()==d) && (getMonth()==m)) }
function PADL(argString, argLength, argFillStr)
{
	var pi_length;
	pi_length = argString.length; 
	if(pi_length < argLength )
	{
		return jf_PADL(argFillStr+argString, argLength, argFillStr);
	}
	return argString;
}

function AutoGetNoNo(argDocCount)
{
	var Rtnobj = new Array();
	var strAutoGetIssueNo_No = theSSO.User.EnvSettings.get("WE_AUTOGET_ISSUENO_NO");
		
	if (strAutoGetIssueNo_No !=null&&jf_Trim(strAutoGetIssueNo_No)!="")
	{
		if (strAutoGetIssueNo_No.toUpperCase() == "Y")
		{
			var strFirstIssueNo_No = "";
			var odjFirstIssueNo_No = theSSO.User.EnvSettings.get("WE_FIRST_ISSUENO_NO");//第一個流水支號
			
			if(odjFirstIssueNo_No !=null && jf_Trim(odjFirstIssueNo_No)!="")
				strFirstIssueNo_No = odjFirstIssueNo_No;

			//1071114 David 1071130 修正自動取支號邏輯，應從第2份開始依支號順序設定
			/*for(var i = 0 ; i < argDocCount ; i++)//依文稿數量回傳支號
			{
				Rtnobj.push(Common.No_no[i]);
			}*/
			//1090526	Joe		1090391		修改支號排序邏輯，僅一份稿件時不取支號
			//1120626	Joe		序63	調整標檢局支援自動取號，且不論稿件數皆須取號--S
			if(SSO_CONFIG.OrgNickName.toUpperCase() == "BSMI")
			{
				//1120630	Joe		序63	調整標檢局支援從0開始自動取支號--S
				// for(var i = 0 ; i < argDocCount ; i++)//依文稿數量回傳支號
				// {
					// Rtnobj.push(Common.No_no[i]);
				// }

				Rtnobj.push(strFirstIssueNo_No);
				for(var i = 0,j = 0 ; i < argDocCount-1 ; i++, j++)//依文稿數量回傳支號
				{
					if(Common.No_no[j] == strFirstIssueNo_No)
					{
						i--;
						continue;
					}
					Rtnobj.push(Common.No_no[j]);
				}
				//1120630	Joe		序63	調整標檢局支援從0開始自動取支號--E
			}
			else
			//1120626	Joe		序63	調整標檢局支援自動取號，且不論稿件數皆須取號--E
			{
				if(argDocCount > 1)
					Rtnobj.push(strFirstIssueNo_No);
				//1090526	Joe		1090391		修改支號排序邏輯，當第二份稿件支號與第一份一致時，往後延1號--S
				// for(var i = 0 ; i < argDocCount-1 ; i++)//依文稿數量回傳支號
				// {
					// Rtnobj.push(Common.No_no[i]);
				// }
				for(var i = 0,j = 0 ; i < argDocCount-1 ; i++, j++)//依文稿數量回傳支號
				{
					if(Common.No_no[j] == strFirstIssueNo_No)
					{
						i--;
						continue;
					}
					Rtnobj.push(Common.No_no[j]);
				}
				//1090526	Joe		1090391		修改支號排序邏輯，當第二份稿件支號與第一份一致時，往後延1號--E
			}
		}
	}
	return Rtnobj;
}
function jf_Trim(Object)
{
	//1100510 David 1100221 移除jQuery.trim()，改由自行撰寫方式供各MS、RD程式使用
	//return jQuery.trim(Object);
	return Object == null ? "" : ( Object + "" ).trim();
}
function jf_PADL(argString, argLength, argFillStr)
{
	var pi_length;
	pi_length = argString.length; 
	if(pi_length < argLength )
	{
		return jf_PADL(argFillStr+argString, argLength, argFillStr);
	}
	return argString;
}
//1051212 Cloud	1051176 增加函式判斷是否放入選單中
function fnCheckDataXml(argXmlObj,argXmlValObj,activeDeptid,argCheckType)
{
	if(argXmlValObj.attr("value")==" " || argXmlValObj.attr("value")=="　")//直接放入空白選項
		return true;
	var nowDataDeptid = "";
	var nowDataUseType = "";
	var nowDataDeptidlist;//做支援多筆
	var nowDataUseTypelist;
	var rtn = false;
	//1051212 Cloud	1051176 稿件有設定UseType時，需判斷發文機關的USETYPE
	if(Common.DocUseType!="")//特定單位或機關發文或是代擬代判
	{
		if(argXmlObj.hasAttribute("UseType"))//Data有設定UseType
		{
			if(Common.DocUseType==argXmlValObj.attr("UseType"))//稿件有Usetype Data有UseType兩者相同時才進行判斷
			{
				switch(argXmlValObj.attr("UseType"))
				{
					case "1" :
						if(argXmlObj.hasAttribute("DeptID"))//有DeptID-則比對
						{
							nowDataDeptid = argXmlValObj.attr("DeptID");
							nowDataDeptidlist = nowDataDeptid.split(';');
							for(var deptidrow=0;deptidrow<nowDataDeptidlist.length;deptidrow++)
							{	
								if(nowDataDeptidlist[deptidrow]=="")
									continue;
								if(activeDeptid.length>2 && (nowDataDeptidlist[deptidrow]==activeDeptid || nowDataDeptidlist[deptidrow]==activeDeptid.substr(0,2)))//目前單位為二級單位
								{
									rtn = true;
									break;
								}
								else if(nowDataDeptidlist[deptidrow]==activeDeptid)
								{
									rtn = true;
									break;
								}
							}	
						}
						else//沒設則直接加入
							rtn = true;
						break;
					case "2" :
						if(!argXmlObj.hasAttribute("DeptID"))//上層不該有DeptID-沒有就加入
							rtn = true;
						break;
				}
			}
			else
				rtn = false;
		}
		else//無設定UseType的Data-如有USETYPE為1 DeptID則須排除
		{
			if(Common.DocUseType=="2" && (argXmlObj.hasAttribute("DeptID") || !argXmlObj.hasAttribute("UseType")))//上層時，有設定單位跟沒有USE_TYPE的排除
				rtn = false;
			else if(Common.DocUseType=="1" && !argXmlObj.hasAttribute("DeptID"))
				rtn = true;
		}
	}
	else//稿件未設定UseType(一般稿件)時-稿件沒有設定UseType
	{
		if(argXmlObj.hasAttribute("UseType"))//有設定UseType的發文機關則需判斷僅能放入1
		{
			if(argXmlValObj.attr("UseType")=="2")//排除上層用
				rtn = false;
			else if (argXmlValObj.attr("UseType")=="1")
			{
				if(argXmlObj.hasAttribute("DeptID"))//有設定單位的發文機關則需判斷
				{
					nowDataDeptid = argXmlValObj.attr("DeptID");
					nowDataDeptidlist = nowDataDeptid.split(';');
					for(var deptidrow=0;deptidrow<nowDataDeptidlist.length;deptidrow++)
					{	
						if(nowDataDeptidlist[deptidrow]=="")
							continue;
						if(activeDeptid.length>2 && (nowDataDeptidlist[deptidrow]==activeDeptid || nowDataDeptidlist[deptidrow]==activeDeptid.substr(0,2)))//目前單位為二級單位
						{
							rtn = true;
							break;
						}
						else if(nowDataDeptidlist[deptidrow]==activeDeptid)
						{
							rtn = true;
							break;
						}
					}
				}
				else//未設定Deptid
					rtn = true;
			}
		}
		else//選項沒有設定UseType-判斷單位代碼
		{
			if(argXmlObj.hasAttribute("DeptID"))//有設定單位的發文機關則需判斷
			{
				nowDataDeptid = argXmlValObj.attr("DeptID");
				nowDataDeptidlist = nowDataDeptid.split(';');
				for(var deptidrow=0;deptidrow<nowDataDeptidlist.length;deptidrow++)
				{	
					if(nowDataDeptidlist[deptidrow]=="")
						continue;
					if(activeDeptid.length>2 && (nowDataDeptidlist[deptidrow]==activeDeptid || nowDataDeptidlist[deptidrow]==activeDeptid.substr(0,2)))//目前單位為二級單位
					{
						rtn = true;
						break;
					}
					else if(nowDataDeptidlist[deptidrow]==activeDeptid)
					{
						rtn = true;
						break;
					}
				}
			}
			else//未設定Deptid
				rtn = true;
		}
	}
	if(!rtn)//最後增加判斷如果是署名且是發文人員使用，DEPTID有設定92 就加入
	{
		if(Common.IsIssueRole && 
		 (argCheckType=="署名" || argCheckType=="署名2")&& 
		 (!argXmlObj.hasAttribute("DeptID") || argXmlObj.hasAttribute("DeptID") 
		 && argXmlValObj.attr("DeptID").indexOf("92")!=-1))
		 rtn = true;
	}
	return rtn;
}
//1061220 Cloud [1061230] 線上簽核公文保存年限是否合乎設定檢和改為共用函式-S
var ComgEkeepYear = "";
function fncheckKeepyear(argKeepYear)
{
	var pass = true;
	ComgEkeepYear = theSSO.User.EnvSettings.get("OD_ESIGN_KEEPYEAR");
	if(theAOL.docObj.get('ODWMSG', 'SIGN_TYPE')=="E")//判斷公文類別
	{
		var EKeepYear = parseInt(ComgEkeepYear);
		var rtnKeepYear = parseInt(argKeepYear);
		if((!isNaN(EKeepYear)) && (!isNaN(rtnKeepYear)) && EKeepYear !=0)
		{
			if(EKeepYear<rtnKeepYear)
				pass = false;
		}
	}
	return pass;
}
//1061220 Cloud [1061230] 線上簽核公文保存年限是否合乎設定檢和改為共用函式-E

//1100506 David 1100473 弱掃修正
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//1100729 David 1100860 全形轉半形
function fnFullToHalf(argStr) { 
    var tmp = ""; 
    for(var i = 0 ; i < argStr.length ; i++){ 
        if (argStr.charCodeAt(i) == 12288){
            tmp += String.fromCharCode(argStr.charCodeAt(i)-12256);
            continue;
        }
        if(argStr.charCodeAt(i) > 65280 && argStr.charCodeAt(i) < 65375){ 
            tmp += String.fromCharCode(argStr.charCodeAt(i)-65248); 
        } 
        else{ 
            tmp += String.fromCharCode(argStr.charCodeAt(i)); 
        } 
    } 
    return tmp 
}

//1130112 David 1121043 新增公文背景顏色處理邏輯
function fnChangeDocBackColor(argSpd, argSecret, argPara)
{
	//取得所有稿件密等速別資料
	let strNowDraftGUID = "";//稿件觸發時，紀錄目前稿件GUID
	if(argPara)
		strNowDraftGUID = argPara.getModel().getDraftGUID();
	let strSecret = theAOL.docObj.secret;//預設為公文密等，應為既有資料最高密等
	if(typeof argSecret === 'string')
		strSecret = argSecret;
	let strSpd = theAOL.docObj.speed;//預設為公文速別
	if(typeof argSpd === 'string')
		strSpd = argSpd;
	let strDraftSecretList = "";
	let bGet = false;
	let iDraftCount = theAOL.getCurrFolio().getDraftCounts();//取得所有稿件數量
	function doNext(iDraft)
	{
		if(iDraftCount == 0)
			bGet = true;

		if(iDraft < iDraftCount)
		{
			theAOL.getCurrFolio().accquireDraftModel(iDraft)
			.done(function(dm){

				//para.getModel().getDraftGUID()
				if(!dm)
				{
					//配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}
				else
				{
					bGet = true;
					let strDraftGUID = dm.getDraftGUID();
					if(strNowDraftGUID != "" && strNowDraftGUID == strDraftGUID)//排除目前稿件
					{
						doNext(iDraft + 1);
						return;
					}
				}

				strDraftSecretList += GetDraftInfo(dm, "//密等/@代碼") + ";";

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			})
			.fail(function(errorText) {

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			});
		}
		else
		{
			//所有稿件資料處理完成，繼續後續處理
			if(bGet)
			{
				//取得所有稿件最高密等
				if(strDraftSecretList != "")
				{
					let arrSec = strDraftSecretList.split(";");
					for(let iSec = 0 ; iSec < arrSec.length ; iSec++)
					{
						let DraftSecNo = "";
						if(arrSec[iSec] != "")
						{
							DraftSecNo = fnWebEditSaveGetSecNo(arrSec[iSec]);
							if(DraftSecNo > strSecret)
								strSecret = DraftSecNo;
						}
					}
				}

				// 控制公文夾顏色
				if(strSpd == "2")
					$("#leftPart .pages").removeClass("fastest").addClass("fast");
				else if(strSpd == "3")
					$("#leftPart .pages").removeClass("fast").addClass("fastest");
				else
					$("#leftPart .pages").removeClass("fast fastest");

				if(strSecret != "" && strSecret != "1")
					$("#leftPart .pages").addClass("secret");
				else
					$("#leftPart .pages").removeClass("secret");
			}
		}
	}
	doNext(0);//開始處理第1筆文稿
}

//1130322 David 1120976 新增分層負責核決層級點選處理
Common.fnInitAppLvlList = function($list, para)
{
	let strAppLvlName = "";
	let strAppLvlList = "";

	try{
		strAppLvlName = para.getModel().text("//分層負責核決層級");
		strAppLvlList = para.getModel().text("//分層負責層級清單");
		oldAppLvlRespNo = para.getModel().text("//分層負責代碼");
	}
	catch{
		strAppLvlList = "";
	}

	if(strAppLvlList != "")
	{
		let arrAppLvlList = strAppLvlList.split('|');
		for(iApp = 0 ; iApp < arrAppLvlList.length ; iApp ++)
		{
			let strAppName = arrAppLvlList[iApp];
			let strselected = "";
			
			if(strAppName == strAppLvlName)
				strselected = "selected='selected'";

			$list.append("<option " + strselected +">"+htmlencode(strAppName)+"</option>");
		}
	}
}

//1130322 David 1120976 新增分層負責代碼連動處理
var oldAppLvlRespNo = "";
Common.fnCheckAppLvl = function(val, para, fldName, preVal)
{
	if(val == oldAppLvlRespNo)
		return;

	if(val == "")
	{
		theCustom.setValue("分層負責說明","",true);
		theCustom.setValue("分層負責核決層級","",true);
		para.getModel().text("//分層負責層級清單","");
		return;
	}

	val = fnFullToHalf(val).padEnd(7, "0").toUpperCase();

	let GetAppLvlRespParams = 
	{
		"argOrgNo": theUserInfo.OrgID
		//1130503 David 1120976 改為使用公文的承辦單位代碼
		//,"argDeptNo": theUserInfo.DepartID
		,"argDeptNo": theAOL.docObj.ODWMSG.INCHARGE_OU
		,"argRespNo": val
	};
	theWebServices.invokeWS(SSO_CONFIG.getWSUrl("webeditws"), "GetAppLvlResp", "T2100", GetAppLvlRespParams, false, function(r) 
	{
		console.log("GetAppLvlResp returns: ");
		console.log(r);
		if(r.IsErr == "true") 
		{
			theCustom.setValue("分層負責代碼",oldAppLvlRespNo,true);
			alert(r.ErrMsg +"，已更回原分層負責代碼"+oldAppLvlRespNo);
		}
		else
		{
			let strShowContent = r.RespContent;
			if(r.RespDesc != "")
				strShowContent = r.RespDesc;
			if(strShowContent.length > 46)
				strShowContent = strShowContent.substr(0,45) + "...";

			let strAppLvlName = r.AppLvlName;
			let strApplvlList = r.ApplvlList;

			oldAppLvlRespNo = val;

			theCustom.setValue("分層負責代碼",val,true);	// 先觸發畫面上欄位內容的更新, setAllDraftText()只會更新XML節點的內容
			theAOL.getCurrFolio().setAllDraftText("//分層負責代碼" , val);
			theAOL.getCurrFolio().setAllDraftText("//分層負責說明" , strShowContent);
			theAOL.getCurrFolio().setAllDraftText("//分層負責核決層級" , strAppLvlName);
			theAOL.getCurrFolio().setAllDraftText("//分層負責層級清單" , strApplvlList);
			para.$para.closest(".pages").flip("refresh");	// 樣版設refresh=true時雖然可以觸發重新整理, 但因setValue及setAllDraftText的關係, 會使onblur判斷為未異動而不會重新整理, 所以在這裡呼叫重新整理
		}
	});
}

//1130828 David 1130690 新增「陳核日期」欄位連動功能
Common.fnChangeSubmissionDate = function(val, para, fldName, preVal)
{
	let strNowDraftGUID = para.getModel().getDraftGUID();
	let strNowDraftCreateSN = para.getModel().getCreateSN();
	let iDraftCount = theAOL.getCurrFolio().getDraftCounts();//取得所有稿件數量
	function doNext(iDraft)
	{
		if(iDraft < iDraftCount)
		{
			theAOL.getCurrFolio().accquireDraftModel(iDraft)
			.done(function(dm){

				if(!dm)
				{
					//配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}
				else
				{
					let strDraftCreateSN = dm.getCreateSN();
					let strDraftGUID = dm.getDraftGUID();
					if(strNowDraftGUID != "" && strNowDraftGUID == strDraftGUID)//排除目前稿件
					{
						doNext(iDraft + 1);
						return;
					}
					let bNeedUpdate = false;
					if(theAOL.docObj.isDraft)//流程為草稿時，直接同步有相同欄位的稿件
						bNeedUpdate = true;
					else if(dm.getEditable() && strNowDraftCreateSN == strDraftCreateSN)//流程非草稿時，檢核稿件可否異動及是否為同流程點新增的稿件
						bNeedUpdate = true;
					
					if(bNeedUpdate)
					{
						try
						{
							dm.text("//陳核日期/年月日", val);
						}
						catch{}
					}
				}

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			})
			.fail(function(errorText) {

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			});
		}
	}
	doNext(0);//開始處理第1筆文稿
}

//1130828 David 1130690 新增「公文擬辦方式」欄位連動功能
Common.fnChangeProcessType = function(val, para, fldName, preVal)
{
	let strNowDraftGUID = para.getModel().getDraftGUID();
	let strNowDraftCreateSN = para.getModel().getCreateSN();
	let iDraftCount = theAOL.getCurrFolio().getDraftCounts();//取得所有稿件數量
	function doNext(iDraft)
	{
		if(iDraft < iDraftCount)
		{
			theAOL.getCurrFolio().accquireDraftModel(iDraft)
			.done(function(dm){

				if(!dm)
				{
					//配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}
				else
				{
					let strDraftCreateSN = dm.getCreateSN();
					let strDraftGUID = dm.getDraftGUID();
					if(strNowDraftGUID != "" && strNowDraftGUID == strDraftGUID)//排除目前稿件
					{
						doNext(iDraft + 1);
						return;
					}
					let bNeedUpdate = false;
					if(theAOL.docObj.isDraft)//流程為草稿時，直接同步有相同欄位的稿件
						bNeedUpdate = true;
					else if(dm.getEditable() && strNowDraftCreateSN == strDraftCreateSN)//流程非草稿時，檢核稿件可否異動及是否為同流程點新增的稿件
						bNeedUpdate = true;
					
					if(bNeedUpdate)
					{
						try
						{
							dm.text("//公文擬辦方式", val);
						}
						catch{}
					}
				}

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			})
			.fail(function(errorText) {

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			});
		}
	}
	doNext(0);//開始處理第1筆文稿
}

//1130828 David 1130690 新增「承辦單位」欄位連動功能
Common.fnChangeDraftOuName = function(val, para, fldName, preVal)
{
	let strNowDraftGUID = para.getModel().getDraftGUID();
	let strNowDraftCreateSN = para.getModel().getCreateSN();
	let iDraftCount = theAOL.getCurrFolio().getDraftCounts();//取得所有稿件數量
	function doNext(iDraft)
	{
		if(iDraft < iDraftCount)
		{
			theAOL.getCurrFolio().accquireDraftModel(iDraft)
			.done(function(dm){

				if(!dm)
				{
					//配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}
				else
				{
					let strDraftCreateSN = dm.getCreateSN();
					let strDraftGUID = dm.getDraftGUID();
					if(strNowDraftGUID != "" && strNowDraftGUID == strDraftGUID)//排除目前稿件
					{
						doNext(iDraft + 1);
						return;
					}
					let bNeedUpdate = false;
					if(theAOL.docObj.isDraft)//流程為草稿時，直接同步有相同欄位的稿件
						bNeedUpdate = true;
					else if(dm.getEditable() && strNowDraftCreateSN == strDraftCreateSN)//流程非草稿時，檢核稿件可否異動及是否為同流程點新增的稿件
						bNeedUpdate = true;
					
					if(bNeedUpdate)
					{
						try
						{
							dm.text("//發文機關/承辦單位", val);
						}
						catch{}
					}
				}

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			})
			.fail(function(errorText) {

				doNext(iDraft + 1);//處理下一筆文稿
				return;
			});
		}
	}
	doNext(0);//開始處理第1筆文稿
}

//1141027 Raymond 1140830 新增函式過濾"類型"屬性與文稿的DefaultSign不相符的署名項目
function fnCheckSignCatelog(argXmlObj, argDefSign)
{
	if(argXmlObj.hasAttribute("類型")) {
		let cate = argXmlObj.getAttribute("類型"),
			listNm = argXmlObj.parentNode.getAttribute("type"),
			val = argXmlObj.getAttribute("value");
		if(cate == argDefSign) {
			theLogger.debug(`${listNm}項目'${val}'的類型(${cate})與文稿的'DefaultSign'屬性(${argDefSign})一致, 應顯示`);
			return true;
		}
		else if(argDefSign != "sign" && argDefSign != "條戳")
			theLogger.error(`文稿的'DefaultSign'屬性(${argDefSign})設定不正確! 應為'sign'或'條戳'`);
		else
			theLogger.debug(`${listNm}項目'${val}'的類型(${cate})與文稿的'DefaultSign'屬性(${argDefSign})不一致, 不顯示`);
		return false;
	}
	return true;
}

//1141030 David 1140855 新增北榮稿件決行層次處理
Common.fnTPVGHAppLvlModify = function(val, para) 
{
	var AppLvl = "";
	switch(val)
	{
		case "二級主管" :
			AppLvl = "3";
			break;
		case "一級主管" :
			AppLvl = "2";
			break;
		case "主任秘書" :
			AppLvl = "1";
			break;
		case "副院長" :
			AppLvl = "1";
			break;
		case "院長" :
			AppLvl = "1";
			break;
	}

	if(AppLvl != "")
	{
		//同步所有稿件
		theAOL.getCurrFolio().setAllDraftText("/*/決行層次/@決行層級" , val);

		//紀錄層級資料至相關欄位
		theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DRAFT_MAX_APPLVL', value: AppLvl}]);	
		theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'DRAFT_MAX_APPLVL', value: AppLvl}]);
	}
	para.$para.closest(".pages").flip("refresh");
}