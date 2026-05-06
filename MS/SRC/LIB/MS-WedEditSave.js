/*
DATE	SA		PRG		MGR_NO	DESC
1050809	David	David	1050087	新增文稿異動儲存處理
1050905	David	David	-------	新增處理研發部線上公文計算頁數功能
1051111	David	David	-------	新增文稿資料取得黑名單處理
1051206	David	David	1051175	新增鐵工局已案管制傳送前檢核
1051228	David	David	1051345	調整鐵工局會議型式檢核邏輯
1060110	David	David	1060016	調整鐵工局已案管制傳送前檢核，檢核未過仍可傳送
1060113	David	David	-------	修正設定歸檔庫房時，如機關未啟用單位庫房則不設定歸單位庫房
1060117	David	David	-------	修正FDA帶回稿件資料時，如異動別為承辦人自行決行，擬辦方式預設為存查
1060307	David	David	-------	如歸檔類型已由稿件判斷完成，不需再依RCV_DEFAULT_STORETYPE=2或3的狀況設定
1060323	David	David	1060153	由稿件帶資料回基資時，需Trim處理，避免因二代"//段落/文字"需設定全形空白，帶回全形空白至基資中
1060330	David	David	-------	如無法由稿件判斷歸檔庫房預設值時，若基資STORE_TYPE無值才帶預設值
1060427	David	David	1060289	速別異動時，需連動辦理天數相關資訊
1061025	David	David	1060946	若稿件ODLTMT未設定需帶回密等資訊時，密等資料不帶入預設值
1061108	David	David	1061074	新增鐵工局稿件連動文別功能，文別連動業務類別功能
1061222	David	David	1061170	新增因分類號或密等異動連動應用限制，與原本的應用限制不符時，顯示提示訊息
1070110	David	David	-------	ODWDCM無STORE_TYPE欄位，不需處理，避免後續公文傳送處理來源錯亂
1070309	David	David	1070294	密以上公文，解密條件或解密日期資料不為空才帶入基資
1080110	David	David	1071073	承辦單位符合系統參數ONLY_USE_UNITFILE設定時，強制歸單位庫房
1080227	David	David	1071270	鐵道儲存/傳送觸發時，新增錄案追蹤檢核及登錄處理
1080425	David	David	1080046	新增稿件刪除時效基資初始處理
1080610	David	David	1080433	發文方式預設值處理依文稿異動旗標判斷
1080628	David	David	1080491	(鐵道)開會/會勘通知單預設開會形式處理
1080910	David	David	1080799	修正鐵道開會/會勘通知單連動處理，於觸發文稿同步基資就執行
1081104	David	David	1080963	來文預設庫房設定擴充
1081217	David	David	1080433	修正航港局客製強制歸單位庫房功能，不依文稿異動旗標判斷
1081231	David	David	1080194	因ModelObj.accquireDraftModel()為非同步處理，調整邏輯架構改為非同步處理，呼叫端如需接回傳值也需改為非同步
1090303	David	David	1090074	鐵道開會/會勘通知單連動處理時，檢核開會/會勘日期不可為空
1090714	David	David	1090418	鐵道開會/會勘通知單稿件刪除時，如為草稿且無起算日期，限辦日期需清空
1090723	David	David	-------	預設發文的文別，無法判斷發文類型時，預設機關發文
1091012	David	David	1090569	信保核決層級儲存處理
1091118	David	David	1090823	創稿公文所有稿件不為密，或來文公文所有稿件、來文密等不為密，才清空解密條件及解密日期
1100325	David	David	1100209	修正鐵道客製化創稿開會/會勘通知單連動邏輯
1101029	David	David	1101210	來文公文密等判斷改依新紀錄的來文密等判斷
1110106	David	David	1101378	新增依系統參數判斷是否一律依第一份稿件主旨帶回基資
1110114	David	David	1101594	調整鐵道客製化創稿開會/會勘通知單連動邏輯，如已為列管公文時，不需異動公文的業務類別，避免影響既有的需回覆列管解除作業判斷邏輯
1110518	David	David	1110497	如稿件<核判區分>有資料時，依稿件資料更新DRAFT_APP_ROLE欄位
1110722	David	David	1110727	當稿件的發文機關代碼符合設定值時，依機關邏輯設定發文、歸檔類型
1111021	David	David	-------	速別連動辦理期限調整為同步處理，避免基資畫面資料與實際資料不符(前次修改.then()改為.pipe()未修改到)
1120407	David	David	1120222	如為唯讀模式時，不需觸發基資同步
1120821	David	David	1120621	鐵道開會/會勘通知單連動處理時，會連動業務類別時再檢核開會/會勘日期是否為空
1121106	David	David	-------	(各機關問題彙整表序303)補上創稿公文文別連動公文性質功能
1121107	David	David	1111200	配合移除實體資源檔，修正資源檔取用邏輯
1130806	Leslie	Leslie	1130509	中榮-客製化取消結案類型異動時的提示訊息
1131023	David	David	-------	(問題彙整表序310(北榮序178))便簽主旨同步基資，依ODLTMT是否設定判斷
1140515	David	David	1140198	新增退輔會改支改辦系統資訊欄位處理
1140825	David	Joe		1140918	修改航港局預帶庫房邏輯(航港局+單位收+非航港局來文，預設為機關庫房)
1140825	David	Joe		1141039	調整一級單位長官也可異動主旨
1140922	Joe		Joe		序243	修改來文機關判斷支援組改後機關代碼
1140925	David	David	1140759	新增紀錄公文稿件類型
1141009	David	David	1140759	新增簽稿會核單創稿主旨同步處理
*/
var gWebEditSaveObj = {
uOrgNo : "",
DocNo : "",
SignType : "",
NewByOu : "",
IcOuId : "",
OwnOuId : "",
IsOuRcv : "",
Folder : "",
SubFolder : "",
FileYear : "",
SecNo : "",
DefApply : "",
DefApplyBySec : "",
gFirstAddDoc : false,
SSO_CLOSE_TYPE_SEND_DRAFTTYPE : "",
SSO_AUTO_CLOSETYPE_FOLDER_LIST : "",
SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE : "",
AOL_DEFAULT_CLOSE_TYPE : "",
RCV_DEFAULT_STORETYPE : "",
arrDocCategory : [],
//1051111 David 紀錄文稿黑名單
GET_DRAFT_BLACKLIST : ""
,arrDocProperty : []//1121106 David 紀錄公文性質清單
}

var gWebEditPath = {
SubjectXPath : ""
,SecretXPath : ""
,SpdXPath : ""
,FileClsXPath : ""
,FileYearXPath : ""
,KeepYearXPath : ""
,DocCategoryXPath : ""
,RmvSecXPath : ""
,FileCaseNoPath : ""
,IssueOrgPath : ""
,UseDelaminateLvlPath : ""
,DelaminateLvlPath : ""
,ProxyTypePath : ""
,DecryptDatePath : ""
,MeetingDate : ""//1061108 David 1061074 新增開會/會勘日期資料處理
,SmegAppLvl : ""//1091012 David 1090569 新增信保核決層級處理
}

//1060427 David 1060289 宣告WS物件
var g_WebEditQueryDeferred = null;

//1061222 David 1061170 新增原始基資物件，於公文開啟後取得基資後，紀錄資訊
var SorcerObj = {
	FileCls : ""
	, ApplyLimit : ""
	, Secrete : ""
}

//物件初始化
function gWebEditSaveObjInit()
{
	for(nm in gWebEditSaveObj)
	{
		if (true)
		{
			if (typeof gWebEditSaveObj[nm] == 'boolean')
			{
				gWebEditSaveObj[nm] = false;
			}
			else if (typeof gWebEditSaveObj[nm] == "object")
			{
				gWebEditSaveObj[nm] = [];
			}
			else
			{
				gWebEditSaveObj[nm] = '';
			}
		}
	}
}

//路徑物件初始化
function gWebEditPathObjInit()
{
	for(nm in gWebEditPath)
	{
		if (true)
		{
			if (typeof gWebEditPath[nm] == 'boolean')
			{
				gWebEditPath[nm] = false;
			}
			else
			{
				gWebEditPath[nm] = '';
			}
		}
	}
}

//1061222 David 1061170 新增傳入觸發類型，1:稿面設定分類號觸發或翻頁觸發。2:儲存/傳送觸發
//function fnWebEditSave(argModelObj)
function fnWebEditSave(argModelObj, argType)
{
	//1081231 David 1080194 因accquireDraftModel()為非同步處理，調整程式邏輯
	var GetDraftdfd = $.Deferred();

	gWebEditSaveObjInit();

	if(!argModelObj) {//物件不存在，不處理
		//1081231 David 1080194 前期判斷不繼續往下檢核時, 直接resolve, 並回傳promise, 才能讓外面以非同步等待的程式接到結果
		//return;
		GetDraftdfd.resolve(true);
		return GetDraftdfd.promise();
	}
	//1120407 David 1120222 如為唯讀模式時，不需觸發基資同步
	else if(!argModelObj.enableEdit())
	{
		GetDraftdfd.resolve(true);
		return GetDraftdfd.promise();
	}

	WebEditSaveInit();

	//1050905 David 線上簽核需自動計算頁數
	if(gWebEditSaveObj.SignType == "E")
	{
		var iFileCounts = theAOL.getCurrFolio().calcQuantity();
		theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_CNT', value: iFileCounts}]);
		theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_CNT', value: iFileCounts}]);
		theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_UNIT', value: "頁"}]);
	}

	if(argModelObj.getDraftCounts() == 0)//沒有文稿不處理
	{
		//1081231 David 1080194 配合非同步處理，調整回傳邏輯
		//return;
		GetDraftdfd.resolve(true);
		return GetDraftdfd.promise();
	}

	//取得ODLTMT檔
	var $ODLTMT;
	var filename = "ODLTMT.xml";

	var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', localStorage.Artifact);
	var serverPath = SSO_CONFIG.getRsrcServerPath("AOL\\OD", "");
	wfio.download(serverPath, filename, {
		async: false,
		success: function (rslt, res) { //
			if (rslt !== undefined) {
				$ODLTMT = $(rslt);
			}
			else {
				console.log("WebFileIO呼叫成功但文稿資訊設定檔未下載");
			}
		},
		error: function (status) {//
			console.log("下載文稿資訊設定檔錯誤：" + status);
		}
	});

	if(!$ODLTMT)
	{
		//1081231 David 1080194 配合非同步處理，調整回傳邏輯
		//return;
		GetDraftdfd.resolve(true);
		return GetDraftdfd.promise();
	}

	var rootWebTagName = "";

	var strSubject, strSecret, strSpd, strFileCls, strKeepYear, strDocCategory, strDocCategoryNo, strRmvSec, strSignRmvSecCond, strFileCaseNo, strFileYear;
	var strDecryptDate = "";
	var sDraftTypeList = "";
	//1121106 David 調整文別判斷邏輯
	//var sCategoryTypeList = "";
	let arrCategoryType = [];
	var sIssueOrgList = "";
	var sDelaminateLvl = "";
	var sProxyType = "";
	var sUseDelaminateLvl = "";
	var sSecretList = "";
	var sExtrmvSecCond = "";
	var sMeetingDate = "";//1061108 David 1061074 紀錄開會/會勘日期
	var sSmegAppLvl = "";//1091012 David 1090569 紀錄信保核決層級
	var sDraftAppRole = "";//1110518 David 1110497 紀錄<核判區分>資料

	strSubject = "";
	strSecret = "";
	strFileCls = "";
	strKeepYear = "";
	strDocCategory = "";
	strDocCategoryNo = "";
	strRmvSec = "";
	strSpd="";
	strSignRmvSecCond = "";
	strFileCaseNo = "";
	strFileYear ="";

	//1061108 David 1061074 新增鐵工局紀錄稿件是否包含開會通知單或會勘通知單
	var bHasMeeting = false;
	var bDefaultNoPaper = false;//1080628 David 1080491 新增紀錄預帶的會議形式
	let sRccFromNo = "";//1140515 David 1140198 新增退輔會改支改辦系統資訊欄位處理

	var dmGetSuccess = false;

	//1110106 David 1101378 取得系統參數ALWAYS_GET_SUBJECT_FROM_DRAFT設定，預設N
	var bAlwaysGetSubjectFromDraft = theSSO.User.SystemSets.get("ALWAYS_GET_SUBJECT_FROM_DRAFT");
	if(bAlwaysGetSubjectFromDraft != "Y")
		bAlwaysGetSubjectFromDraft = "N";
	var bGetFirstDraft = false;//1110106 David 1101378 紀錄是否取得第一份稿件資料

	let arrDraftName = [];//1140925 David 1140759 紀錄稿件文別名稱

	//1081231 David 1080194 因accquireDraftModel()為非同步處理，調整程式邏輯
	var iDraftCount = argModelObj.getDraftCounts();//取得所有稿件數量
	function doNext(iDraft)
	{
		if(iDraft < iDraftCount)
		{
			gWebEditPathObjInit();

			argModelObj.accquireDraftModel(iDraft)
			.done(function(dm){

				if(!dm)
				{
					//1081231 David 1080194 配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}
				else
					dmGetSuccess = true;

				//文別名稱
				rootWebTagName = dm.getDocType();

				//1140925 David 1140759 紀錄稿件文別名稱
				let strDraftType = rootWebTagName;
				if(dm.getSubDocType() != "")
					strDraftType = dm.getSubDocType();
				arrDraftName.push(strDraftType);

				//1051111 David 新增文稿資料取得黑名單處理
				if(gWebEditSaveObj.GET_DRAFT_BLACKLIST.indexOf("|" + rootWebTagName + "|") != -1)
				{
					//1081231 David 1080194 配合非同步處理，稿件不處理時執行下個稿件
					doNext(iDraft + 1);
					return;
				}

				//1110518 David 1110497 紀錄<核判區分>資料(有可能稿件不會設定ODLTMT，故於此處判斷)
				if(sDraftAppRole == "")
					sDraftAppRole = GetDraftInfo(dm, "//核判區分");

				var $DraftSet = $ODLTMT.find(rootWebTagName);
				if($DraftSet[0])
				{
					//dm.text(XML路徑);
					if(rootWebTagName == "函")
						gWebEditPath.DocCategoryXPath = "//函類別/@代碼";
					else
						gWebEditPath.DocCategoryXPath = "";

					//取得稿件內資料XML路徑
					gWebEditPath.SubjectXPath = $DraftSet.find("SUBJECT").text();
					gWebEditPath.SecretXPath = $DraftSet.find("SECRECTE").text();
					gWebEditPath.SpdXPath = $DraftSet.find("SPEED").text();
					gWebEditPath.FileClsXPath = $DraftSet.find("FILE_CLS").text();
					gWebEditPath.FileYearXPath = $DraftSet.find("FILE_YEAR").text();
					gWebEditPath.KeepYearXPath = $DraftSet.find("KEEP_YEAR").text();
					gWebEditPath.FileCaseNoPath = $DraftSet.find("FILE_CASE").text();
					gWebEditPath.IssueOrgPath = $DraftSet.find("ISSUE_ORG").text();
					gWebEditPath.DelaminateLvlPath = $DraftSet.find("DELAMINATE_LVL").text();
					gWebEditPath.ProxyTypePath = $DraftSet.find("PROXY_TYPE").text();
					gWebEditPath.UseDelaminateLvlPath = $DraftSet.find("CAN_USE_DELAMINATE").text();
					gWebEditPath.DecryptDatePath = $DraftSet.find("DECRYPT_DATE").text();
					gWebEditPath.RmvSecXPath = $DraftSet.find("RMVSEC_COND").text();
					//1061108 David 1061074 新增取得開會/會勘日期
					gWebEditPath.MeetingDate = $DraftSet.find("MEETING_DATE").text();
					//1091012 David 1090569 新增信保核決層級處理
					if(SSO_CONFIG.OrgNickName == "SMEG")
						gWebEditPath.SmegAppLvl = $DraftSet.find("SMEG_APPLVL").text();

					//取得文稿資料
					//主旨
					//1110106 David 1101378 新增依系統參數判斷是否一律依第一份稿件主旨帶回基資，調整邏輯
					if(!bGetFirstDraft)
					{
						if(strSubject == "" && gWebEditPath.SubjectXPath != "")
							strSubject = GetDraftSubject(dm, gWebEditPath.SubjectXPath);

						//1131023 David 便簽主旨同步基資，依ODLTMT是否設定判斷
						//if(rootWebTagName=="便簽")
						if(rootWebTagName=="便簽" && gWebEditPath.SubjectXPath != "")
						{
							//1090928 David 順手修正取得主旨內容BUG
							/*if(strSubject =="")
								strSubject = GetDraftInfo(dm, "//便簽/段落/條列/文字");
							if(strSubject =="")
								strSubject = GetDraftInfo(dm, "//便簽/段落/文字");*/
							if(strSubject =="")
								strSubject = GetDraftSubject(dm, "//便簽/段落/條列/文字");
							if(strSubject =="")
								strSubject = GetDraftSubject(dm, "//便簽/段落/文字");
						}

						//1141009 David 1140759	新增簽稿會核單創稿主旨同步處理
						if(rootWebTagName=="簽稿會核單" && gWebEditPath.SubjectXPath != "")
						{
							if(strSubject =="")
								strSubject = GetDraftSubject(dm, "//便簽/段落/條列/文字");
							if(strSubject =="")
								strSubject = GetDraftSubject(dm, "//便簽/段落/文字");
						}
					}
					//密等
					//1061025 David 1060946 若稿件ODLTMT未設定需帶回密等資訊時，密等資料不帶入預設值
					//sSecretList += GetDraftInfo(dm, gWebEditPath.SecretXPath) + ";";
					if(gWebEditPath.SecretXPath != "")
						sSecretList += GetDraftInfo(dm, gWebEditPath.SecretXPath) + ";";

					//速別
					if(strSpd == "" && gWebEditPath.SpdXPath != "")
						strSpd = GetDraftInfo(dm, gWebEditPath.SpdXPath);
					//年度號
					if(strFileYear == "" && gWebEditPath.FileYearXPath != "")
						strFileYear = GetDraftInfo(dm, gWebEditPath.FileYearXPath);
					//分類號
					if(strFileCls == "" && gWebEditPath.FileClsXPath != "")
						strFileCls = GetDraftInfo(dm, gWebEditPath.FileClsXPath);
					//保存年限
					if(strKeepYear == "" && gWebEditPath.KeepYearXPath != "")
						strKeepYear = GetDraftInfo(dm, gWebEditPath.KeepYearXPath);
					//案次號
					if(gWebEditPath.FileCaseNoPath != "" && strFileCaseNo == "")
						strFileCaseNo = GetDraftInfo(dm, gWebEditPath.FileCaseNoPath);

					//取得文別-->函類別
					if(gWebEditPath.DocCategoryXPath != "")
						rootWebTagName = GetDraftInfo(dm, gWebEditPath.DocCategoryXPath);
					if(strDocCategory == "" && strDocCategoryNo == "")
					{
						// 便簽文文依環境變數設定
						var val = theSSO.User.EnvSettings.get("OD_CATEGORY_FOR_"+rootWebTagName);
						if(val!="")
							rootWebTagName = val;
						strDocCategory = rootWebTagName;
						strDocCategoryNo = GetNoFromArrDocCategory(strDocCategory)
						if(strDocCategoryNo == "")
							strDocCategory = "";
					}

					//1061108 David 1061074 新增鐵工局判斷稿件是否包含開會通知單或會勘通知單
					if(SSO_CONFIG.OrgNickName == "RRB" && !bHasMeeting && (rootWebTagName == "開會通知單" || rootWebTagName == "會勘通知單"))
					{
						bHasMeeting = true;
						//1080628 David 1080491 當稿件包含開會通知單，就預設為無紙化會議
						if(rootWebTagName == "開會通知單")
							bDefaultNoPaper = true;
						//如包含時帶入對應文別
						strDocCategory = rootWebTagName;
						strDocCategoryNo = GetNoFromArrDocCategory(strDocCategory);
						if(strDocCategoryNo == "")
							strDocCategory = "";
					}

					//紀錄所有稿件的"函類別"內容，用於判斷是否需設定其公文性質
					//1121106 David 調整文別判斷邏輯
					//sCategoryTypeList += GetDraftInfo(dm, "//函類別/@代碼");
					let strCategoryType = rootWebTagName;
					if(rootWebTagName == "函")
						strCategoryType = GetDraftInfo(dm, "//函類別/@代碼");
					else if(rootWebTagName == "令")
						strCategoryType = GetDraftInfo(dm, "//令類別/@代碼");
					arrCategoryType.push(strCategoryType);

					//紀錄稿件類型以供判斷是否要自動判定CLOSE_TYPE
					sDraftTypeList += rootWebTagName + ";";

					//發文機關資訊
					if(gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.indexOf(rootWebTagName + ";") != -1)
					{
						if(gWebEditPath.IssueOrgPath != "")
							sIssueOrgList += GetDraftInfo(dm, gWebEditPath.IssueOrgPath) + ";";
						else
							sIssueOrgList += ";";

						if(gWebEditPath.DelaminateLvlPath != "")
							sDelaminateLvl += GetDraftInfo(dm, gWebEditPath.DelaminateLvlPath) + ";";
						else
							sDelaminateLvl += ";";

						if(gWebEditPath.ProxyTypePath != "")
							sProxyType += GetDraftInfo(dm, gWebEditPath.ProxyTypePath) + ";";
						else
							sProxyType += ";";

						if(gWebEditPath.UseDelaminateLvlPath != "")
							sUseDelaminateLvl += GetDraftInfo(dm, gWebEditPath.UseDelaminateLvlPath) + ";";
						else
							sUseDelaminateLvl += ";";
					}

					//解密日期
					if(strDecryptDate == "" && gWebEditPath.DecryptDatePath != "")
						strDecryptDate = GetDraftInfo(dm, gWebEditPath.DecryptDatePath);

					//解密條件
					if(sExtrmvSecCond == "")
						sExtrmvSecCond = GetDraftInfo(dm, "//密等及解密條件或保密期限/解密條件或保密期限");

					//1061108 David 1061074 紀錄開會/會勘日期
					if(sMeetingDate == "" && gWebEditPath.MeetingDate != "")
					{
						var sDraftMeetingDate = GetDraftInfo(dm, gWebEditPath.MeetingDate);
						if(sDraftMeetingDate != "")
						{
							sDraftMeetingDate = sDraftMeetingDate.replace("中華民國", "");
							var sMeetYear = sDraftMeetingDate.substring(0, sDraftMeetingDate.indexOf("年"));
							var sMeetMonth = sDraftMeetingDate.substring(sDraftMeetingDate.indexOf("年")+1, sDraftMeetingDate.indexOf("月"));
							var sMeetDay = sDraftMeetingDate.substring(sDraftMeetingDate.indexOf("月")+1, sDraftMeetingDate.indexOf("日"));
							if(sMeetYear == "" || sMeetMonth == "" || sMeetDay == "")
							{
								alert("稿件內開會/會勘日期資料格式錯誤：" + sDraftMeetingDate);
								doNext(iDraft + 1);
								return;
							}
							sMeetingDate = jf_PADL(sMeetYear , 3, "0") + jf_PADL(sMeetMonth , 2, "0") + jf_PADL(sMeetDay , 2, "0");
						}
					}

					//1091012 David 1090569 新增信保核決層級處理
					if(SSO_CONFIG.OrgNickName == "SMEG")
					{
						if(sSmegAppLvl == "" && gWebEditPath.SmegAppLvl != "")
							sSmegAppLvl = GetDraftInfo(dm, gWebEditPath.SmegAppLvl);
					}

					//1140515 David 1140198 新增退輔會改支改辦系統資訊欄位處理
					if(SSO_CONFIG.OrgNickName == "VAC")
					{
						if(sRccFromNo == "")
						{
							try
							{
								sRccFromNo = dm.attr("/*/@FormNo");
							}
							catch
							{
								sRccFromNo = "";
							}
						}
					}

					//1110106 David 1101378 紀錄是否取得第一份稿件資料
					if(bAlwaysGetSubjectFromDraft == "N")
						bGetFirstDraft = true;
				}
				//1081231 David 1080194 配合非同步處理，完成時執行下個稿件
				doNext(iDraft + 1);//處理下一筆文稿
				return;
			})
			.fail(function(errorText) {
				//alert(errorText);
				//1081231 David 1080194 配合非同步處理，完成時執行下個稿件
				doNext(iDraft + 1);//處理下一筆文稿
				return;
			});
		}
		else
		{
			//所有稿件資料處理完成，繼續後續處理
			if(!dmGetSuccess)
			{
				//1081231 David 1080194 配合非同步處理，調整回傳邏輯
				GetDraftdfd.resolve(true);
				return;
			}

			//創稿定義：NEW_BY_OU=Y且START_DATE=空

			//文別、速別只有創稿時更新至基資
			if(strDocCategoryNo != "" && gWebEditSaveObj.gFirstAddDoc)
			{
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DOC_CATEGORY', value: strDocCategoryNo}]);
			}

			if(strSpd != "" && gWebEditSaveObj.gFirstAddDoc)
			{
				var SpdNo = "1";
				switch(strSpd)
				{
					case "普通件":
						SpdNo = "1";
						break;
					case "速件":
						SpdNo = "2";
						break;
					case "最速件":
						SpdNo = "3";
						break;
					case "":
						SpdNo = "4";
						break;
				}
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'SPEED', value: SpdNo}]);

				//1060427 David 1060289 速別異動時，需連動辦理天數相關資訊
				var params_GetDueDateInfo = {
				"argArtifact": localStorage.Artifact
				, "argOrgNo": gWebEditSaveObj.uOrgNo
				, "argBTypeNo": theAOL.docObj.get("ODWDCM", "B_TYPE_NO")
				, "argSpdNo": SpdNo
				, "argLeadTime": theAOL.docObj.get("ODWDCM", "LEAD_TIME")
				, "argLtOum": theAOL.docObj.get("ODWDCM", "LT_UOM")
				};

				var _dfd = $.Deferred();
				g_WebEditQueryDeferred = _dfd;

				WsGetDueDateInfo(params_GetDueDateInfo, _dfd)
				//1111021 David 調整為同步處理，避免基資畫面資料與實際資料不符(前次修改.then()改為.pipe()未修改到)
				//.then(function (rtn) {
				.pipe(function (rtn) {

					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'LEAD_TIME', value: rtn.LEAD_TIME}]);
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'LT_UOM', value: rtn.LT_UOM}]);
				})
				.fail(function (errMsg) {

					if (errMsg != "")
						alert(errMsg);
					else
						alert("取得速別對應辦理天數異常");
				});
			}

			//1121106 David 補上文別連動公文性質功能
			//創稿時，函類別為領務局特有之"電報"且為創稿時，設定公文性質為"電報"
			if(gWebEditSaveObj.gFirstAddDoc && arrCategoryType.length >0)
			{
				let strCategoryDefDocProperty = "";
				for(let iCateType = 0; iCateType < arrCategoryType.length; iCateType++)
				{
					let val = theSSO.User.EnvSettings.get("OD_PROPERTY_FOR_" + arrCategoryType[iCateType]);
					if(val != "" && strCategoryDefDocProperty == "")
					{
						strCategoryDefDocProperty = GetNoFromArrDocProperty(val);
						if(strCategoryDefDocProperty != "")
						{
							theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DOC_PROPERTY', value: strCategoryDefDocProperty}]);
							
							//取得預設業務類別
							let strDefBTypeNo = theSSO.User.EnvSettings.get("OD_DEFAULT_BTYPENO_" + strCategoryDefDocProperty);
							if(strDefBTypeNo != "")
							{
								theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'B_TYPE_NO', value: strDefBTypeNo}]);
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'B_TYPE_NO', value: strDefBTypeNo}]);
							}
						}
						else
						{
							console.log("環境變數[OD_PROPERTY_FOR_"+arrCategoryType[iCateType]+"]之設定值["+val+"]，找不到對應之公文性質。");
						}
					}
				}
			}

			//密等：
			//來文時依來文密等+稿件的密等內最高密等儲存
			//創稿依稿件的密等內最高密等儲存

			//取得所有稿件最高密等
			//1061025 David 1060946 若稿件ODLTMT未設定需帶回密等資訊時，密等資料不帶入預設值
			//var WebEditSecNo = "1";
			var WebEditSecNo = "";
			if(sSecretList != "")
			{
				WebEditSecNo = "1";
				var arrSec = sSecretList.split(";");
				for(var iSec = 0 ; iSec < arrSec.length ; iSec++)
				{
					var DraftSecNo = "";
					if(arrSec[iSec] != "")
					{
						DraftSecNo = fnWebEditSaveGetSecNo(arrSec[iSec]);
						if(DraftSecNo > WebEditSecNo)
							WebEditSecNo = DraftSecNo;
					}
				}

				//1101029 David 1101210 來文改依來文密等判斷
				//if(gWebEditSaveObj.NewByOu == "Y" || (gWebEditSaveObj.NewByOu == "N" && WebEditSecNo > gWebEditSaveObj.SecNo))
				if(gWebEditSaveObj.NewByOu == "Y" || (gWebEditSaveObj.NewByOu == "N" && WebEditSecNo >= theAOL.docObj.ODWDCM.RCV_SECRET))
				{
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'SECRETE', value: WebEditSecNo}]);

					if(WebEditSecNo == "1")
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: ""}]);
				}
			}

			//密等為密以上才紀錄解密條件、解密日期
			//1061025 David 1060946 調整判斷邏輯
			//if(WebEditSecNo != "1")
			if(WebEditSecNo != "" && WebEditSecNo != "1")
			{
				//1070309 David 1070294 解密條件或解密日期資料不為空才帶入基資
				//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: sExtrmvSecCond}]);
				//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_DATE', value: strDecryptDate}]);
				if(sExtrmvSecCond != "")
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: sExtrmvSecCond}]);
				if(strDecryptDate != "")
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_DATE', value: strDecryptDate}]);

				//1061222 David 1061170 如密等與原本基資的不同、才需帶入預設的應用限制
				if( SorcerObj.Secrete != theAOL.docObj.ODWMSG.SECRETE)
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'APPLY_LIMT', value: gWebEditSaveObj.DefApplyBySec.substring(1,2)}]);
			}

			//1061025 David 1060946 若不需由稿件帶回密等，則依基資密等作為後續判斷使用
			if(WebEditSecNo == "")
				WebEditSecNo = theAOL.docObj.ODWMSG.SECRETE;
			
			//1070309 David 1070294 不為密以上，清空解密條件及解密日期
			//1091118 David 1090823 創稿公文所有稿件不為密，或來文公文所有稿件、來文密等不為密，才清空解密條件及解密日期
			//if(WebEditSecNo == "1")
			if((gWebEditSaveObj.NewByOu == "Y" && WebEditSecNo == "1") || 
				//1101029 David 1101210 來文改依來文密等判斷
				//(gWebEditSaveObj.NewByOu == "N" && WebEditSecNo == "1" && gWebEditSaveObj.SecNo == "1"))
				(gWebEditSaveObj.NewByOu == "N" && WebEditSecNo == "1" && theAOL.docObj.ODWDCM.RCV_SECRET == "1"))
			{
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_COND', value: ""}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'EXTRMVSEC_DATE', value: ""}]);
			}

			//創稿才回傳公文主旨，如密等不為普通，依環境變數SEC_USE_SUBJECT判斷是否紀錄密不錄由。
			//1140825	Joe		1141039		調整一級單位長官也可異動主旨
			// if(strSubject != "" && strSubject != "undefined" && strSubject != null && gWebEditSaveObj.NewByOu == "Y" && gWebEditSaveObj.IcOuId == gWebEditSaveObj.OwnOuId)
			if(strSubject != "" && strSubject != "undefined" && strSubject != null && gWebEditSaveObj.NewByOu == "Y" && (gWebEditSaveObj.IcOuId == gWebEditSaveObj.OwnOuId || gWebEditSaveObj.IcOuId.substring(0,2) == gWebEditSaveObj.OwnOuId))
			{
				//主旨長度不可超過300
				if(strSubject.length>300)
				{
					strSubject = strSubject.substring(0,300);
					alert("公文文號["+gWebEditSaveObj.DocNo+"]主旨不可超過300字，請修正公文基資後再行傳送，未修正下傳送，系統將自取截取前300字為公文主旨");
				}
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'SUBJECT', value: strSubject}]);

				//依環境變數設定密件公文FROM_SUBJECT是否紀錄密不錄由
				if(WebEditSecNo != "1" && theSSO.User.EnvSettings.get("SEC_USE_SUBJECT").toUpperCase() != "Y")
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FROM_SUBJECT', value: "密不錄由"}]);
				else
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FROM_SUBJECT', value: strSubject}]);
			}
			
			//年度號、分類號、保存年限、案次號一律儲存
			if(strKeepYear != "" && strKeepYear != "undefined" && strKeepYear != null)
			{
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'KEEP_YEAR', value: strKeepYear}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'KEEP_YEAR', value: strKeepYear}]);
			}

			if(strFileCls != "" && strFileCls != "undefined" && strFileCls != null)
			{
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_CLS', value: strFileCls}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_CLS', value: strFileCls}]);

				//1061222 David 1061170 如分類號或密等與原本基資的不同、才需帶入預設的應用限制
				if( SorcerObj.FileCls != theAOL.docObj.ODWMSG.FILE_CLS || SorcerObj.Secrete != theAOL.docObj.ODWMSG.SECRETE)
				{
					//分類號之應用限制
					var strClsApplyLimit = fnWedEditSaveGetClsApplyLimit(strFileCls);
					if(WebEditSecNo != "1")
					{
						//密以上：以OD_APPLY_LIMIT_BY_SEC第二碼設定應用限制。
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'APPLY_LIMT', value: gWebEditSaveObj.DefApplyBySec.substring(1,2)}]);
					}
					else
					{
						//普通：如OD_DEFAULT_APPLY_LIMIT有設定時，以此設定為主，未設定再依OD_APPLY_LIMIT_BY_SEC第1碼設定
						if(gWebEditSaveObj.DefApply == "N" || gWebEditSaveObj.DefApply == "Y" || gWebEditSaveObj.DefApply == "R")
							theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'APPLY_LIMT', value: gWebEditSaveObj.DefApply}]);
						else if(gWebEditSaveObj.DefApply == "C" && strClsApplyLimit != "")//依分類號的應用限制設定
						{
							if(strClsApplyLimit == "N" || strClsApplyLimit == "Y" || strClsApplyLimit == "R")
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'APPLY_LIMT', value: strClsApplyLimit}]);
						}
						else
							theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'APPLY_LIMT', value: gWebEditSaveObj.DefApplyBySec.substring(0,1)}]);
					}
				}
			}

			if(strFileYear != "" && strFileYear != "undefined" && strFileYear != null)
			{
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_YEAR', value: strFileYear}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_YEAR', value: strFileYear}]);
			}
			else if(gWebEditSaveObj.DocNo != "")
			{
				strFileYear = gWebEditSaveObj.DocNo.substr(0,3);
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_YEAR', value: strFileYear}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_YEAR', value: strFileYear}]);
			}
			else if(gWebEditSaveObj.FileYear == "")
			{
				var dttoday = new Date();
				var newYear = dttoday.getFullYear() - 1911;
				newYear = newYear + '';
				newYear = jf_PADL(newYear, 3, '0');

				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_YEAR', value: newYear}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_YEAR', value: newYear}]);
			}

			if(strFileCaseNo != "" && strFileCaseNo != "undefined" && strFileCaseNo != null)
			{
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'FILE_CASE', value: strFileCaseNo}]);
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'FILE_CASE', value: strFileCaseNo}]);
			}

			//取得第一份可發文稿件中的分層負責代碼及代擬代判別
			var arrIssueOrg = sIssueOrgList.split(";");
			var arrUseDelaminateLvl = sUseDelaminateLvl.split(";");
			var arrDelaminateLvl = sDelaminateLvl.split(";");
			var arrProxyType = sProxyType.split(";");	
			for(var iDelaminateLvl = 0 ; iDelaminateLvl < arrIssueOrg.length ; iDelaminateLvl++)
			{
				if(arrIssueOrg[iDelaminateLvl] == "")
					continue;
				try
				{
					if(arrUseDelaminateLvl[iDelaminateLvl].toUpperCase() == "Y")
					{
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DELAMINATE_LVL', value: arrDelaminateLvl[iDelaminateLvl]}]);
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'PROXY_TYPE', value: arrProxyType[iDelaminateLvl]}]);
						break;
					}
					else
					{
						//於未啟用客製化分層負責代碼邏輯時，新增紀錄分層負責代碼
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DELAMINATE_LVL', value: arrDelaminateLvl[iDelaminateLvl]}]);
						break;
					}
				}
				catch(e)
				{
					alert("取得分層負責代碼及代擬代判別時發生異常："+e);
				}
			}

			//1080610 David 1080433 調整依文稿清單已異動旗標判斷是否進行預設發文方式處理
			//if(gWebEditSaveObj.IcOuId.substring(0,2) == gWebEditSaveObj.OwnOuId.substring(0,2))
			if(theAOL.getCurrFolio().isDraftListChanged())
			{
				var strCloseType = "";
				var strStoreType = "";
				var bCloseTypeSet = false;	//是否已指定
				//依環境變數SSO_AUTO_CLOSETYPE_FOLDER_LIST(判斷資料夾)、SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE(指定函稿)
				if(sDraftTypeList != "" && 
					gWebEditSaveObj.SSO_AUTO_CLOSETYPE_FOLDER_LIST.indexOf(gWebEditSaveObj.Folder + "+" + gWebEditSaveObj.SubFolder + ";")!=-1 && 
					gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE != "")
				{
					//1110722 David 1110727 取得須視為總發邏輯的發文機關代碼
					let arrUseOrgIssueWordOrgNo = theSSO.User.SystemSets.get("USE_ORG_ISSUEWORD_ORGNO").toUpperCase().split(';');

					//有稿件、位於要判斷的資料夾、有指定的函稿，此三點具備才判斷
					sDraftTypeList = sDraftTypeList.substr(0,sDraftTypeList.length-1);
					var arrDraftTypeList = sDraftTypeList.split(";");
					//增加判斷允許單位發文時才預設選為單位發文，否則選為機關發文
					var bNeedCheckUnitIssue = false;
					for(var iList = 0; iList < arrDraftTypeList.length; iList++)
					{
						//1081231 David 1080194 調整判斷邏改為完整判斷，避免例「簽;」與「便簽;」的判斷結果相同
						//if(gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.indexOf(arrDraftTypeList[iList]+";") != -1)
						if(gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.indexOf(";"+arrDraftTypeList[iList]+";") != -1)
						{
							//取得發文機關代碼，判斷為機關發文或是單位發文
							var arrIssueOrgList = sIssueOrgList.split(";");
							for(var iCnt = 0 ; iCnt < arrIssueOrgList.length ; iCnt++)
							{
								if(arrIssueOrgList[iCnt] == "")
									continue;
								//1110722 David 1110727 新增判斷須視為總發邏輯的發文機關代碼
								//if(arrIssueOrgList[iCnt] != "" && arrIssueOrgList[iCnt].length == 10)
								if(arrIssueOrgList[iCnt] != "" && (arrIssueOrgList[iCnt].length == 10 || arrUseOrgIssueWordOrgNo.includes(arrIssueOrgList[iCnt])))
								{
									bCloseTypeSet = true;
									bNeedCheckUnitIssue = false;
									strCloseType = "1";
									strStoreType = "1";
									break;
								}
								else if(arrIssueOrgList[iCnt] != "" && arrIssueOrgList[iCnt].length == 17)
								{
									bCloseTypeSet = true;
									bNeedCheckUnitIssue = true;
									strCloseType = "2";
									strStoreType = "2";

									//1060113 David 修正設定歸檔庫房時，如機關未啟用單位庫房則不設定歸單位庫房
									if(theSSO.User.EnvSettings.get("OD_ENABLE_UNITFILE").toUpperCase()=="N")
										strStoreType = "1";
								}
							}
							if(!bCloseTypeSet)
							{
								strCloseType = "1";
								//1090723 David 預設發文的文別，無法判斷發文類型時，預設機關發文
								bCloseTypeSet = true;
								bNeedCheckUnitIssue = false;
								strStoreType = "1";
							}
							//DVD WAIT 增加呼叫jf_SetWWKFbyCloseType根據文稿類別判斷是否要新增一筆總發文流程for中央
							/*var bReload = jf_SetWWKFbyCloseType(document.all.txWorkDir.value, document.all.txSourceOrgNo.value, document.all.txUsername.value,sInchargeOu);
							if(bReload)
								document.frames("pfr2").fnAfterPageLoad();
							break;*/
						}
						//1081231 David 1080194 調整判斷邏改為完整判斷，避免例「簽;」與「便簽;」的判斷結果相同
						//else if(gWebEditSaveObj.SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE.indexOf(arrDraftTypeList[iList]+";") != -1)
						else if(gWebEditSaveObj.SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE.indexOf(";" + arrDraftTypeList[iList] + ";") != -1)
						{
							bCloseTypeSet = true;
							strCloseType = "3";
							strStoreType = "2";

							//1060113 David 修正設定歸檔庫房時，如機關未啟用單位庫房則不設定歸單位庫房
							if(theSSO.User.EnvSettings.get("OD_ENABLE_UNITFILE").toUpperCase()=="N")
								strStoreType = "1";
						}
					}

					//判斷允許單位發文時才預設選為單位發文，否則選為機關發文
					if (bNeedCheckUnitIssue)
					{			
						var UnitCanIssue = theSSO.User.EnvSettings.get("UNIT_ISSUE");
						var paramsUnitCanIssue = {
							"argArtifact": localStorage.Artifact,
							"argOrgNo": gWebEditSaveObj.uOrgNo,
							"argInchargeOu": gWebEditSaveObj.IcOuId
						};
						
						window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "UnitCanIssue", null, paramsUnitCanIssue, false, function (rtn, xml) {
							console.log(rtn, xml);
							
							if(rtn.m_bSuccess == "true" && rtn.m_strRetStr != "" && rtn.m_strRetStr != null)
								UnitCanIssue = rtn.m_strRetStr;
						});
						
						if(UnitCanIssue != "Y")
						{
							bCloseTypeSet = true;
							strCloseType = "1";
							strStoreType = "1";
						}
					}

					//上述判斷不到時，再依AOL_DEFAULT_CLOSE_TYPE設定預設結案類型，未設定則設定為存查。
					if(!bCloseTypeSet)
					{
						if(gWebEditSaveObj.AOL_DEFAULT_CLOSE_TYPE=="")
							strCloseType = "3";
						else
							strCloseType = gWebEditSaveObj.AOL_DEFAULT_CLOSE_TYPE;
						//1060330 David 無STORE_TYPE才帶預設值
						if(theAOL.docObj.ODWMSG.STORE_TYPE && theAOL.docObj.ODWMSG.STORE_TYPE == "")
							strStoreType = "1";
						bCloseTypeSet = true;
					}
					
					if(bCloseTypeSet)
					{
						//1080610 David 1080433 紀錄原本發文設定
						var strOldCloseType = theAOL.docObj.ODWDCM.CLOSE_TYPE;

						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'CLOSE_TYPE', value: strCloseType}]);
						//1060330 David strStoreType有值才更新至基資
						if(strStoreType != "")
						{
							//1070110 David ODWDCM無STORE_TYPE欄位，不需處理，避免後續公文傳送處理來源錯亂
							//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'STORE_TYPE', value: strStoreType}]);
							theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'STORE_TYPE', value: strStoreType}]);
						}
						//1080610 David 1080433 預設值與原資料不同時，跳出提示訊息
						if(strOldCloseType != strCloseType)
						{
							var strShowCloseType = "存查";
							if(strCloseType == "1")
								strShowCloseType = "總發文"
							else if(strCloseType == "2")
								strShowCloseType = "單位發文"
							//1080610 David 1080433 開啟公文時已有稿件，儲存/翻頁時更新CloseType才需警示
							//1130806	Leslie[1130509]	中榮-客製化取消結案類型異動時的提示訊息	
							// if(theAOL.getCurrFolio().getOrigDraftCounts() != 0)
							if(theAOL.getCurrFolio().getOrigDraftCounts() != 0 && SSO_CONFIG.OrgNickName != "TVGH")
								alert("因稿件或稿件內發文機關有異動，系統依照最新稿件資料，將發文設定調整為" + strShowCloseType);
						}
					}
				}
				else
				{
					//1060307 David 如不需依資料夾及稿件帶預設值時，視為不需設定
					bCloseTypeSet = true;
				}

				//依環境變數RCV_DEFAULT_STORETYPE設定來文公文歸檔庫房
				//1060307 David 調整來文公文預設歸檔庫房邏輯，預設值為空
				//var strRcvStoreType = "1";
				var strRcvStoreType = "";
				if(gWebEditSaveObj.RCV_DEFAULT_STORETYPE != "" && gWebEditSaveObj.NewByOu == "N")
				{
					if(gWebEditSaveObj.RCV_DEFAULT_STORETYPE == "1")//來文公文一律歸機關庫房
						strRcvStoreType = "1";
					else if(gWebEditSaveObj.RCV_DEFAULT_STORETYPE == "2")
					{
						//1060307 David 如歸檔類型已由稿件判斷完成，此處不需再設定
						if(!bCloseTypeSet)
						{
							if(gWebEditSaveObj.IsOuRcv == "0")//總收文預設歸機關庫房，單位收文預設歸單位庫房
								strRcvStoreType = "1";
							else
							{
								strRcvStoreType = "2";
								//1060113 David 修正設定歸檔庫房時，如機關未啟用單位庫房則不設定歸單位庫房
								if(theSSO.User.EnvSettings.get("OD_ENABLE_UNITFILE").toUpperCase()=="N")
									strRcvStoreType = "1";
							}
						}
					}
					else if(gWebEditSaveObj.RCV_DEFAULT_STORETYPE == "3")//總收文預設歸機關庫房，單位收文不處理
					{
						//1060307 David 如歸檔類型已由稿件判斷完成，此處不需再設定
						if(!bCloseTypeSet)
						{
							if(gWebEditSaveObj.IsOuRcv == "0")
								strRcvStoreType = "1";
						}
					}
					//1081104 David 1080963 來文預設庫房設定擴充
					else if(gWebEditSaveObj.RCV_DEFAULT_STORETYPE == "4")//總收文強制歸機關庫房，單位收文不處理
					{
						if(gWebEditSaveObj.IsOuRcv == "0")
							strRcvStoreType = "1";
					}
					//1060307 David 有需要依來文狀態帶預設歸檔庫房時，再進行設定
					if(strRcvStoreType != "")
					{
						//1070110 David ODWDCM無STORE_TYPE欄位，不需處理，避免後續公文傳送處理來源錯亂
						//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'STORE_TYPE', value: strRcvStoreType}]);
						theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'STORE_TYPE', value: strRcvStoreType}]);
					}
				}

				//1080110 David 1071073 承辦單位符合系統參數ONLY_USE_UNITFILE設定時，強制歸單位庫房
				//1081217 David 1080433	修正航港局客製強制歸單位庫房功能，不依文稿異動旗標判斷
				/*var strOnlyUseUnitFile = theSSO.User.SystemSets.get("ONLY_USE_UNITFILE");
				if (strOnlyUseUnitFile != "" && gWebEditSaveObj.IcOuId != "" && strOnlyUseUnitFile.indexOf(gWebEditSaveObj.IcOuId.substr(0,2)) != -1)
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'STORE_TYPE', value: "2"}]);*/

				//1080910 David 1080799 調整時機點
				/*//1061108 David 1061074 鐵工局若稿件包含開會通知單或會勘通知單，不論來文或創稿，一律帶入文別，並連動公文性質、業務類別
				if(SSO_CONFIG.OrgNickName == "RRB" && bHasMeeting)
				{
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DOC_CATEGORY', value: strDocCategoryNo}]);

					//公文性質帶入一般公文
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DOC_PROPERTY', value: "1"}]);

					//業務類別帶入12開會通知
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'B_TYPE_NO', value: "12"}]);
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'B_TYPE_NO', value: "12"}]);

					//帶入開會日期
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'MEET_DATE', value: sMeetingDate}]);

					//1080628 David 1080491 未設定會議形式時，依開會/會勘通知單預設開會形式
					if(theAOL.docObj.get("ODWDCM", "MEETING_TYPE") == "" || theAOL.docObj.get("ODWDCM", "MEETING_TYPE") == "0")
					{
						if(bDefaultNoPaper)
							theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'MEETING_TYPE', value: "2"}]);
						else
							theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'MEETING_TYPE', value: "1"}]);
					}

					//計算相關時效
					var paramsGetSumType = {
						"argSessionID": localStorage.Artifact
						,"argSourceOrgNo": gWebEditSaveObj.uOrgNo
						,"argDocProperty": "1"
						,"argSpdNo": theAOL.docObj.get("ODWMSG", "SEPPD")
						,"argBTypeNo": "12"
						,"argRcvDate": theAOL.docObj.get("ODWDCM", "RCV_DATE")
					};
					
					window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetSumType", null, paramsGetSumType, false, function (rtn, xml) {
						console.log(rtn, xml);
						
						if (rtn.ErrorClass.IsErr == "false")
						{
							var sSumType = rtn.SumType;
							var sLtIncHd = rtn.LtIncHd;
							var sLtBy = rtn.LtBy;
							var sLtUom = rtn.LtUom;
							var sLeadTimeDB = rtn.LeadTimeDB;
							var sDueRule = rtn.DueRule;
							var sDueDate = "";

							if(sMeetingDate != "")
							{
								var param = new Array(5);
								param[0] = sMeetingDate;//開會日期
								param[1] = sLeadTimeDB;

								if (sLtIncHd == "Y") //含假日
									param[3] = "1";
								else if (sLtIncHd == "H")//扣抵連修
									param[3] = "3";
								else //不含假日
									param[3] = "2";

								var paramsGetWorkDate = {
									"argSessionID": localStorage.Artifact
									,"argSDATE": param[0]
									,"argKey": param[1]
									,"argLtBy": sLtBy
									,"argLtIncHd": param[3]
									,"argLtUom": sLtUom
								};

								window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetWorkDate", null, paramsGetWorkDate, false, function (rtn2, xml) {
									console.log(rtn2, xml);
									
									if(rtn2.ErrorClass.IsErr == 'false'){
										sDueDate = rtn2.WorkDate;
									}
									else{
										alert("依稿件內開會/會勘日期資料取得限辦日期錯誤：" + rtn2.ErrorClass.ErrMessage.anyType.text);
										return false;
									}
								});
								
								if(sDueRule == "Y")
								{
									//如業務類別限辦日期計算邏輯需順延至工作日，呼叫GetUnHoliday()取得限辦日期
									var paramGetLastDueDate = {
										"argSessionID": localStorage.Artifact
										,"argSDATE": sDueDate
										,"argDAY": 0
										,"argType": "1"
										,"argDueRule": sDueRule
										,"argDeptNo": gWebEditSaveObj.IcOuId
										,"argStartDate": param[0]
										,"argDocNo": ""
									};
										
									window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetLastDueDate", null, paramsGetWorkDate, false, function (rtn3, xml) {
										console.log(rtn3, xml);
										
										if(rtn3.ErrorClass.IsErr == 'false'){
											sDueDate = rtn3.WorkDate;
										}
										else{
											alert("依稿件內開會/會勘日期資料取得限辦日期錯誤：" + rtn3.ErrorClass.ErrMessage.anyType.text);
											return false;
										}
									});
								}

								//更新相關資料
								//時效類別
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'SUM_TYPE', value: sSumType}]);
								//辦理天數
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'LEAD_TIME', value: sLeadTimeDB}]);
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'LT_UOM', value: sLtUom}]);
								//限辦日期
								theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'DUE_DATE', value: sDueDate}]);
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DUE_DATE', value: sDueDate}]);
							}
						}
						else
						{
							alert("取得開會通知業務類別時效相關資訊錯誤：" + rtn.ErrorClass.ErrMessage.anyType.text);
							return false;
						}
					});
				}*/

				//1080610 David 1080433 完成預設處理後，將異動旗標更新回未異動
				theAOL.getCurrFolio().setDraftListChanged(false);
			}

			//1140825	Joe		1140918		修改航港局預帶庫房邏輯(航港局+單位收+非航港局來文，預設為機關庫房)
			//1140922	Joe		序243		修改來文機關判斷支援組改後機關代碼
			var FromOrgNo = theAOL.docObj.get("ODWDCM", "FROMORGNO");
			if(FromOrgNo.length > 10)
				FromOrgNo = FromOrgNo.substring(0, 10);
			// if(SSO_CONFIG.OrgNickName == "MPB" && theAOL.docObj.get("ODWMSG", "IS_OURCV") == "1" && theAOL.docObj.get("ODWDCM", "FROMORGNO") != theAOL.docObj.get("ODWMSG", "SOURCE_ORGNO"))
			if(SSO_CONFIG.OrgNickName == "MPB" && theAOL.docObj.get("ODWMSG", "IS_OURCV") == "1" && FromOrgNo != theSSO.OrgMap[theUserInfo.OrgID])
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'STORE_TYPE', value: "1"}]);	

			//1081217 David 1080433	修正航港局客製強制歸單位庫房功能，不依文稿異動旗標判斷
			var strOnlyUseUnitFile = theSSO.User.SystemSets.get("ONLY_USE_UNITFILE");
			if (strOnlyUseUnitFile != "" && gWebEditSaveObj.IcOuId != "" && strOnlyUseUnitFile.indexOf(gWebEditSaveObj.IcOuId.substr(0,2)) != -1)
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'STORE_TYPE', value: "2"}]);	

			//1110518 David 1110497 如稿件<核判區分>有資料時，依稿件資料更新DRAFT_APP_ROLE欄位
			if(sDraftAppRole != "")
				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DRAFT_APP_ROLE', value: sDraftAppRole}]);

			//1080910 David 1080799 調整時機點
			//鐵工局若稿件包含開會通知單或會勘通知單，不論來文或創稿，一律帶入文別，並連動公文性質、業務類別
			if(SSO_CONFIG.OrgNickName == "RRB" && bHasMeeting)
			{
				//1090303 David 1090074 鐵道開會/會勘通知單連動處理時，檢核開會/會勘日期不可為空
				//1120821 David 1120621 會連動業務類別時再檢核開會/會勘日期是否為空，調整檢核時機
				/*if(sMeetingDate == "")
				{
					alert("稿件內開會/會勘日期不可為空");
					GetDraftdfd.resolve(false);
					return;
				}*/

				theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DOC_CATEGORY', value: strDocCategoryNo}]);
				//帶入開會日期
				theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'MEET_DATE', value: sMeetingDate}]);
				//未設定會議形式時，依開會/會勘通知單預設開會形式
				if(theAOL.docObj.get("ODWDCM", "MEETING_TYPE") == "" || theAOL.docObj.get("ODWDCM", "MEETING_TYPE") == "0")
				{
					if(bDefaultNoPaper)
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'MEETING_TYPE', value: "2"}]);
					else
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'MEETING_TYPE', value: "1"}]);
				}
				
				//1100325 David 1100209 修正鐵道客製化創稿開會/會勘通知單連動邏輯，創稿公文不連動業務類別
				//1110114 David 1101594 調整鐵道客製化創稿開會/會勘通知單連動邏輯，如已為列管公文時，不連動業務類別
				//if(gWebEditSaveObj.NewByOu == "N")
				if(gWebEditSaveObj.NewByOu == "N" && theAOL.docObj.ODWMSG.IS_AUDIT == "N")
				{
					//1120821 David 1120621 會連動業務類別時再檢核開會/會勘日期是否為空，調整檢核時機
					if(sMeetingDate == "")
					{
						alert("稿件內開會/會勘日期不可為空");
						GetDraftdfd.resolve(false);
						return;
					}

					//公文性質帶入一般公文
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DOC_PROPERTY', value: "1"}]);

					//業務類別帶入12開會通知
					theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'B_TYPE_NO', value: "12"}]);
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'B_TYPE_NO', value: "12"}]);

					//計算相關時效
					var paramsGetSumType = {
						"argSessionID": localStorage.Artifact
						,"argSourceOrgNo": gWebEditSaveObj.uOrgNo
						,"argDocProperty": "1"
						,"argSpdNo": theAOL.docObj.get("ODWMSG", "SPEED")
						,"argBTypeNo": "12"
						,"argRcvDate": theAOL.docObj.get("ODWDCM", "RCV_DATE")
					};
					
					window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetSumType", null, paramsGetSumType, false, function (rtn, xml) {
						console.log(rtn, xml);
						
						if (rtn.ErrorClass.IsErr == "false")
						{
							var sSumType = rtn.SumType;
							var sLtIncHd = rtn.LtIncHd;
							var sLtBy = rtn.LtBy;
							var sLtUom = rtn.LtUom;
							var sLeadTimeDB = rtn.LeadTimeDB;
							var sDueRule = rtn.DueRule;
							var sDueDate = "";

							if(sMeetingDate != "")
							{
								var param = new Array(5);
								param[0] = sMeetingDate;//開會日期
								param[1] = sLeadTimeDB;

								if (sLtIncHd == "Y") //含假日
									param[3] = "1";
								else if (sLtIncHd == "H")//扣抵連修
									param[3] = "3";
								else //不含假日
									param[3] = "2";

								var paramsGetWorkDate = {
									"argSessionID": localStorage.Artifact
									,"argSDATE": param[0]
									,"argKey": param[1]
									,"argLtBy": sLtBy
									,"argLtIncHd": param[3]
									,"argLtUom": sLtUom
								};

								window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetWorkDate", null, paramsGetWorkDate, false, function (rtn2, xml) {
									console.log(rtn2, xml);
									
									if(rtn2.ErrorClass.IsErr == 'false'){
										sDueDate = rtn2.WorkDate;
									}
									else{
										alert("依稿件內開會/會勘日期資料取得限辦日期錯誤：" + rtn2.ErrorClass.ErrMessage.anyType.text);
										//1090303 David 1090074 修正回傳處理
										//return false;
										GetDraftdfd.resolve(false);
										return;
									}
								});
								
								if(sDueRule == "Y")
								{
									//如業務類別限辦日期計算邏輯需順延至工作日，呼叫GetUnHoliday()取得限辦日期
									var paramGetLastDueDate = {
										"argSessionID": localStorage.Artifact
										,"argSDATE": sDueDate
										,"argDAY": 0
										,"argType": "1"
										,"argDueRule": sDueRule
										,"argDeptNo": gWebEditSaveObj.IcOuId
										,"argStartDate": param[0]
										,"argDocNo": ""
									};
										
									window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetLastDueDate", null, paramsGetWorkDate, false, function (rtn3, xml) {
										console.log(rtn3, xml);
										
										if(rtn3.ErrorClass.IsErr == 'false'){
											sDueDate = rtn3.WorkDate;
										}
										else{
											alert("依稿件內開會/會勘日期資料取得限辦日期錯誤：" + rtn3.ErrorClass.ErrMessage.anyType.text);
											//1090303 David 1090074 修正回傳處理
											//return false;
											GetDraftdfd.resolve(false);
											return;
										}
									});
								}

								//更新相關資料
								//時效類別
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'SUM_TYPE', value: sSumType}]);
								//辦理天數
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'LEAD_TIME', value: sLeadTimeDB}]);
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'LT_UOM', value: sLtUom}]);
								//限辦日期
								theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'DUE_DATE', value: sDueDate}]);
								theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DUE_DATE', value: sDueDate}]);
							}
						}
						else
						{
							alert("取得開會通知業務類別時效相關資訊錯誤：" + rtn.ErrorClass.ErrMessage.anyType.text);
							//1090303 David 1090074 修正回傳處理
							//return false;
							GetDraftdfd.resolve(false);
							return;
						}
					});
				}
			}

			if(SSO_CONFIG.OrgNickName == "FDA")
			{
				//1060117 David 修正FDA傳送前，如異動別為承辦人自行決行，調整擬辦方式為存查
				var ArrOD99CanApp = theSSO.User.EnvSettings.get("OD_OD99_CAN_APP").toUpperCase().split("|");
				if (ArrOD99CanApp.length == 3 && ArrOD99CanApp[0] == "Y" && gWebEditSaveObj.Folder + gWebEditSaveObj.SubFolder == ArrOD99CanApp[2]
					&& theAOL.nextTarget.TxName == "承辦人自行決行") 
				{
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'CLOSE_TYPE', value: "3"}]);
				}
			}
			
			//1091012 David 1090569 新增信保核決層級處理
			if(SSO_CONFIG.OrgNickName == "SMEG")
			{
				if(sSmegAppLvl != "")
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'SMEG_APPLVL', value: sSmegAppLvl}]);
			}

			//1061222 David 1061170 新增因分類號或密等異動連動應用限制，與原本的應用限制不符時，顯示提示訊息
			if(((SorcerObj.FileCls != "" && SorcerObj.FileCls != theAOL.docObj.ODWMSG.FILE_CLS)
				|| SorcerObj.Secrete != theAOL.docObj.ODWMSG.SECRETE) 
				&& SorcerObj.ApplyLimit != theAOL.docObj.ODWDCM.APPLY_LIMT)
			{
				var ShowSaveMsg = "公文因變更分類號或密等設定，系統自動將應用限制依其預設值設定";
				if(argType != null && argType == "2")
				{
					ShowSaveMsg += "，請問是否繼續儲存/傳送行為？";

					if(!confirm(ShowSaveMsg))
					{
						SetSourceODWObj();
						//1081231 David 1080194 配合非同步處理，調整回傳邏輯
						//return false;
						GetDraftdfd.resolve(false);
						return;
					}
				}
				else 
				{
					alert(ShowSaveMsg);
				}
			}
			
			//1140515 David 1140198 新增退輔會改支改辦系統資訊欄位處理
			if(SSO_CONFIG.OrgNickName == "VAC")
			{
				let sDCMRccFromNo = theAOL.docObj.get("ODWDCM", "RCC_FROM_NO");
				if(!!sDCMRccFromNo && sRccFromNo == "")
				{
					let sRccFromNoSaveMsg = "本份公文已紀錄改支改辦表單編號，但目前稿件來源皆非改支改辦系統，請問是否改為一般公文辦理？";

					if(confirm(sRccFromNoSaveMsg))
					{
						//改一般公文辦理時，清空改支改辦系統表單編號
						theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'RCC_FROM_NO', value: ""}]);
					}
					else
					{
						GetDraftdfd.resolve(false);
						return;
					}
				}
				else
					theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'RCC_FROM_NO', value: sRccFromNo}]);
			}

			//1140925 David 1140759 紀判斷稿件類型，紀錄至DRAFT_TYPE欄位
			let strDraftType = "9";//預設為9:其他
			if (arrDraftName.length === 0) {
				//無稿件
				strDraftType = "";
			} 
			else if (arrDraftName.every(item => item === "簽稿會核單")) {
				//僅有簽稿會核單
				strDraftType = "1";
			}
			theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'DRAFT_TYPE', value: strDraftType}]);
			theAOL.docObj.set('0', 'ODWMSG', [{ fieldname: 'DRAFT_TYPE', value: strDraftType}]);

			//1061222 David 1061170 完成儲存時，將資訊設定回初始物件中
			SetSourceODWObj();

			//1081231 David 1080194 配合非同步處理，調整回傳邏輯
			//return true;
			GetDraftdfd.resolve(true);	// 最後resolve();
		}
	}
	doNext(0);	// 開始處理第1筆文稿
	return GetDraftdfd.promise();
}

function WebEditSaveInit()
{
	gWebEditSaveObj.uOrgNo = theAOL.docObj.get("ODWMSG", "SOURCE_ORGNO");
	gWebEditSaveObj.DocNo = theAOL.docObj.get("ODWMSG", "DOC_NO");
	gWebEditSaveObj.NewByOu = theAOL.docObj.get("ODWMSG", "NEW_BY_OU");
	gWebEditSaveObj.IcOuId = theAOL.docObj.get("ODWMSG", "INCHARGE_OU");
	gWebEditSaveObj.OwnOuId = theAOL.docObj.get("ODWMSG", "OWN_OU_ID");
	gWebEditSaveObj.SecNo =  theAOL.docObj.get("ODWMSG", "SECRETE");
	gWebEditSaveObj.IsOuRcv = theAOL.docObj.get("ODWMSG", "IS_OURCV");
	gWebEditSaveObj.Folder = theAOL.docObj.get("ODWMSG", "FOLDER");
	gWebEditSaveObj.SubFolder = theAOL.docObj.get("ODWMSG", "SUBFOLDER");
	gWebEditSaveObj.FileYear = theAOL.docObj.get("ODWDCM", "FILE_YEAR");
	//1050905 David 紀錄SIGN_TYPE
	gWebEditSaveObj.SignType = theAOL.docObj.get("ODWMSG", "SIGN_TYPE");

	if (gWebEditSaveObj.NewByOu == "Y" && theAOL.docObj.get("ODWDCM", "START_DATE") == "")
		gWebEditSaveObj.gFirstAddDoc = true;

	gWebEditSaveObj.DefApply = theSSO.User.EnvSettings.get("OD_DEFAULT_APPLY_LIMIT");

	gWebEditSaveObj.DefApplyBySec = "YN";
	if (theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC") != null && theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC") != "")
		gWebEditSaveObj.DefApplyBySec = theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC").toUpperCase();
	if (gWebEditSaveObj.DefApplyBySec.length < 2)
		gWebEditSaveObj.DefApplyBySec = "YN";

	gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE");
	//1081231 David 1080194 調整判斷邏改為完整判斷，避免例「簽;」與「便簽;」的判斷結果相同
	/*if(gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.lastIndexOf(";") != (gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.length-1))
		gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE += ";";*/
	if(gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE != "")
	{
		if(gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.lastIndexOf(";") != (gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE.length-1))
			gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE += ";";

		gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE = ";" + gWebEditSaveObj.SSO_CLOSE_TYPE_SEND_DRAFTTYPE;
	}

	gWebEditSaveObj.SSO_AUTO_CLOSETYPE_FOLDER_LIST = theSSO.User.EnvSettings.get("SSO_AUTO_CLOSETYPE_FOLDER_LIST");
	gWebEditSaveObj.SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE");
	//1081231 David 1080194 調整判斷邏改為完整判斷，避免例「簽;」與「便簽;」的判斷結果相同
	if(gWebEditSaveObj.SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE != "")
		gWebEditSaveObj.SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE = ";"+ gWebEditSaveObj.SSO_CLOSE_TYPE_UNITSTORE_DRAFTTYPE +";";
	gWebEditSaveObj.AOL_DEFAULT_CLOSE_TYPE = theSSO.User.EnvSettings.get("AOL_DEFAULT_CLOSE_TYPE");
	gWebEditSaveObj.RCV_DEFAULT_STORETYPE = theSSO.User.EnvSettings.get("RCV_DEFAULT_STORETYPE");
	
	//1051111 David 紀錄文稿黑名單
	gWebEditSaveObj.GET_DRAFT_BLACKLIST = "|" + theSSO.User.SystemSets.get("GET_DRAFT_BLACKLIST") + "|";
	
	WebEditGetDocCategory();
	
	//1121106 David 取得公文性質資料
	WebEditGetDocProperty();
}

//取得文別資料
function WebEditGetDocCategory()
{
	gWebEditSaveObj.arrDocCategory = [];

	//1121107 David 1111200 配合移除實體資源檔，修正資源檔取用邏輯
	/*var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', localStorage.Artifact);
	var serverPath = SSO_CONFIG.getRsrcServerPath("AOL\\OD\\SYS", gWebEditSaveObj.uOrgNo);
	wfio.download(serverPath, "DOC_CATEGORY_" + gWebEditSaveObj.uOrgNo + ".xml", {
		async: false,
		success: function (rslt, res) {
			if (rslt !== undefined) {

				$items = $(rslt).find('item');
				var len = $items.length;
				for (i = 0; i < len; i++) {
					// method1
					var $item = $($items[i]);
					var value = $item.children('value').text();
					var text = $item.children('text').text();
					
					gWebEditSaveObj.arrDocCategory.push({TYPE_NAME:text ,TYPE_NO:value})
				}
			}
			else {
				console.log("WebFileIO呼叫成功但夾檔資料未下載");
			}
		},
		error: function (errorText) { //
			console.log(errorText);
		}
	});*/
	let strRtnXml = "";

	let sCacheName = "DOC_CATEGORY_" + gWebEditSaveObj.uOrgNo;
	if (typeof window.localStorage[sCacheName] === 'undefined')
	{
		let params = new SOAPClientParameters();
		params.add('argArtifact', localStorage.Artifact);
		params.add('argTypeMain', "GenDocCategory");
		params.add('argTypeDetail', "");
		params.add('argSourceOrgNo', gWebEditSaveObj.uOrgNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('timelibws'), 'GetRsrcData', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (!r.ErrorClass.IsErr)
			{
				if (r.RtnStr !== undefined ) {
					strRtnXml = r.RtnStr;
					window.localStorage[sCacheName] = strRtnXml;
				}
				else
					console.log("取得資源檔異常");
			}
			else
				console.log(r.ErrorClass.ErrMessage[0]);
		});
	}
	else
		strRtnXml = window.localStorage[sCacheName];

	if(strRtnXml != "")
	{
		let $items = $(strRtnXml).find('item');
		let len = $items.length;
		for (i = 0; i < len; i++)
		{
			let $item = $($items[i]);
			let value = HtmlEncode($item.children('value').text());
			let text = HtmlEncode($item.children('text').text());

			gWebEditSaveObj.arrDocCategory.push({TYPE_NAME:text ,TYPE_NO:value})
		}
	}
}

//1121106 David 取得公文性質資料
function WebEditGetDocProperty()
{
	let strRtnXml = "";
	gWebEditSaveObj.arrDocProperty = [];

	let sCacheName = "DOC_PROPERTY_" + gWebEditSaveObj.uOrgNo;
	if (typeof window.localStorage[sCacheName] === 'undefined')
	{
		let params = new SOAPClientParameters();
		params.add('argArtifact', localStorage.Artifact);
		params.add('argTypeMain', "GenDocProperty");
		params.add('argTypeDetail', "");
		params.add('argSourceOrgNo', gWebEditSaveObj.uOrgNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('timelibws'), 'GetRsrcData', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (!r.ErrorClass.IsErr)
			{
				if (r.RtnStr !== undefined ) {
					strRtnXml = r.RtnStr;
					window.localStorage[sCacheName] = strRtnXml;
				}
				else
					console.log("取得資源檔異常");
			}
			else
				console.log(r.ErrorClass.ErrMessage[0]);
		});
	}
	else
		strRtnXml = window.localStorage[sCacheName];

	if(strRtnXml != "")
	{
		let $items = $(strRtnXml).find('item');
		let len = $items.length;
		for (i = 0; i < len; i++)
		{
			let $item = $($items[i]);
			let value = HtmlEncode($item.children('value').text());
			let text = HtmlEncode($item.children('text').text());

			gWebEditSaveObj.arrDocProperty.push({NAME:text ,NO:value})
		}
	}
}

function GetDraftSubject(argDmObj, argXPath)
{
	var rtnValue = "";
	try
	{
		rtnValue = argDmObj.pureText(argXPath);
		if(!rtnValue)
			rtnValue = "";
	}
	catch(e)
	{
		rtnValue = "";
	}

	//1060323 David 1060153 由稿件帶資料回基資時，需Trim處理
	//return rtnValue;
	return rtnValue.trim();
}

function GetDraftInfo(argDmObj, argXPath)
{
	var rtnValue = "";
	try
	{
		rtnValue = argDmObj.text(argXPath);
		if(!rtnValue)
			rtnValue = "";
	}
	catch(e)
	{
		rtnValue = "";
	}

	//1060323 David 1060153 由稿件帶資料回基資時，需Trim處理
	//return rtnValue;
	return rtnValue.trim();
}

function GetNoFromArrDocCategory(argDocCategoryName)
{
	for(var idx = 0 ; idx < gWebEditSaveObj.arrDocCategory.length ; idx++)
	{
		if(gWebEditSaveObj.arrDocCategory[idx].TYPE_NAME == argDocCategoryName)
		{
			return gWebEditSaveObj.arrDocCategory[idx].TYPE_NO;
		}
	}
	
	return "";
}

function fnWedEditSaveGetClsApplyLimit(argClsNo)
{
	var paramsGetCKA = {
		"argSessionID": localStorage.Artifact,
		"argSourceOrgNo": gWebEditSaveObj.uOrgNo,
		"argClsNo": argClsNo
	};

	var rtnApplyLimit = "";
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetCKA", null, paramsGetCKA, false, function (rtn, xml) {
		console.log(rtn, xml);

		//return fnWedEditSaveClsRtn(rtn, xml);
		rtnApplyLimit = fnWedEditSaveClsRtn(rtn, xml);
	});

	return rtnApplyLimit;
}

function fnWedEditSaveClsRtn(rtn, xml)
{
	if (rtn.ErrorClass.IsErr == 'false')
	{
		return rtn.ApplyLimit;
	}
	else
	{
		return "";
		//alert(rtn.ErrorClass.ErrMessage.anyType);
	}
}

function fnWebEditSaveGetSecNo(argSec)
{
	switch(argSec)
	{
		case "":
		case "普通":
			return "1";
			break;
		case "密":
			return "2";
			break;
		case "機密":
			return "3";
			break;
		case "極機密":
			return "4";
			break;
		case "絕對機密":
			return "5";
			break;
	}
}

//1051206 David 1051175 新增鐵工局檢核邏輯
function RRBCheckIssue()
{
	if(SSO_CONFIG.OrgNickName == "RRB")
	{
		var IsAudit = theAOL.docObj.get("ODWMSG", "IS_AUDIT");
		var BTypeNo = theAOL.docObj.get("ODWMSG", "B_TYPE_NO");
		var FromOrgName = theAOL.docObj.get("ODWMSG", "FROM_ORG")
		var CaseNo = theAOL.docObj.get("ODWDCM", "CASE_NO");
		//1051228 David 1051345 取得會議形式
		var MeetingType = theAOL.docObj.get("ODWDCM", "MEETING_TYPE");
		//1080227 David 1071270 取得目前流程資料
		var NowRoleNo = theAOL.docObj.ownRoleId;
		var NowRoleName = SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo),theAOL.docObj.ownOUId,theAOL.docObj.ownRoleId);
		
		//1051228 David 1051345 因新增會議型式檢核邏輯，調整getDraftCounts()時機及邏輯
		/*if(IsAudit == "Y" && BTypeNo != "16" && FromOrgName != "" && CaseNo != "")
		{
			var ModelObj = theAOL.getCurrFolio();
			var CheckIssueSucces = false;
			var GetDmSuccess = false;
			
			if(ModelObj.getDraftCounts() == 0)//沒有文稿不處理
				return true;

			for(var iDraft = 0 ; iDraft < ModelObj.getDraftCounts() ; iDraft++)
			{
				ModelObj.accquireDraftModel(iDraft)
				.done(function(dm){

					if(!dm)
						return;
					else
						GetDmSuccess = true;

					//取得正副本受文者名稱
					var rawXml = dm.accquireXml();// rawXml原始XML文件從dm取得
					var activeDept = $(rawXml.documentElement).find("> 受文者列表").clone();
					var RcvList = activeDept.find("受文者[本別=正本]").find("正式名稱");
					for(var iRcv = 0 ; iRcv < RcvList.length ; iRcv)
					{
						var RcvName = $(RcvList[iRcv]).text();
						if(RcvName == FromOrgName)
						{
							CheckIssueSucces = true;
							return;
						}
					}
					var CopyList = activeDept.find("受文者[本別=副本]").find("正式名稱");
					for(var iCopy = 0 ; iCopy < CopyList.length ; iCopy)
					{
						var CopyName = $(RcvList[iCopy]).text();
						if(CopyName == FromOrgName)
						{
							CheckIssueSucces = true;
							return;
						}
					}
				})
			}
			
			if(GetDmSuccess && !CheckIssueSucces)
			{
				alert("以案管制母文應回覆來文機關，請於受文者加入，或解除列管");
				return false;
			}
		}*/
		var ModelObj = theAOL.getCurrFolio();
		var CheckIssueSucces = false;
		var GetDmSuccess = false;
		var bHasMeeting = false;

		//1080227 David 1071270 紀錄稿件錄案追蹤資料
		var bSetSignRecord = false;
		var bNeedSignRecord = false;
		var strRecordDueDate = "";
		var strSignComment = "";

		if(ModelObj.getDraftCounts() != 0)//有文稿再處理
		{
			for(var iDraft = 0 ; iDraft < ModelObj.getDraftCounts() ; iDraft++)
			{
				ModelObj.accquireDraftModel(iDraft)
				.done(function(dm){

					if(!dm)
						return;
					else
						GetDmSuccess = true;

					if(dm.getDocType() == "開會通知單")
						bHasMeeting = true;

					//取得正副本受文者名稱
					var rawXml = dm.accquireXml();// rawXml原始XML文件從dm取得
					var activeDept = $(rawXml.documentElement).find("> 受文者列表").clone();
					var RcvList = activeDept.find("受文者[本別=正本]").find("正式名稱");
					for(var iRcv = 0 ; iRcv < RcvList.length ; iRcv++)
					{
						var RcvName = $(RcvList[iRcv]).text();
						if(RcvName == FromOrgName)
						{
							CheckIssueSucces = true;
						}
					}
					var CopyList = activeDept.find("受文者[本別=副本]").find("正式名稱");
					for(var iCopy = 0 ; iCopy < CopyList.length ; iCopy++)
					{
						var CopyName = $(RcvList[iCopy]).text();
						if(CopyName == FromOrgName)
						{
							CheckIssueSucces = true;
						}
					}

					//1080227 David 1071270 取得稿件錄案追蹤資料，線上簽核、目前流程可核決且有設定核決資訊
					if(theAOL.docObj.signType == "E" && theAOL.docObj.ODWDCM.CANCEL_APP_ENABLE == "Y" && theAOL.docObj.ODWMSG.APP_ROLE_ID != "" 
						&& theAOL.docObj.ODWMSG.APP_ROLE_ID == NowRoleNo && !bSetSignRecord && GetDraftInfo(dm, "//批示錄案追蹤/標題") != "")
					{
						bSetSignRecord = true;
						bNeedSignRecord = true;
						var DraftRecordDueDate = GetDraftInfo(dm, "//批示錄案限辦日期/年月日");
						if(DraftRecordDueDate != "")
						{
							var arrRecordDutDate = DraftRecordDueDate.split(/年|月|日/);
							var RecordY = arrRecordDutDate[0];
							var RecordM = arrRecordDutDate[1];
							if(RecordM.length == 1)
								RecordM = "0" + RecordM;
							var RecordD = arrRecordDutDate[2];
							if(RecordD.length == 1)
								RecordD = "0" + RecordD;
							strRecordDueDate = RecordY + RecordM + RecordD;
						}
						strSignComment = theAOL.signComment();
					}
				})
			}

			if(GetDmSuccess)//取得文稿資料再檢核
			{
				var ErrMsg = "";
				var ErrMsgStamp = "";

				if(IsAudit == "Y" && BTypeNo != "16" && FromOrgName != "" && CaseNo != "" && !CheckIssueSucces)
				{
					//1060110 David 1060016 調整鐵工局已案管制傳送前檢核，檢核未過仍可傳送
					/*ErrMsg += ErrMsgStamp + "以案管制母文應回覆來文機關，請於受文者加入，或解除列管";
					ErrMsgStamp = "\n";*/
					alert("以案管制母文應回覆來文機關，請於受文者加入，或解除列管");
				}
				if(bHasMeeting)//稿件有開會通知單再檢核
				{
					if(MeetingType == "0")
					{
						ErrMsg += ErrMsgStamp + "開會通知單需選取會議型式";
						ErrMsgStamp = "\n";
					}
				}
				else
				{
					//1060119 David 先不要更新成0
					//theAOL.docObj.set('0', 'ODWDCM', [{ fieldname: 'MEETING_TYPE', value: "0"}]);
					//UiSetDlItemByValue("dlMeetingType", "0");
				}

				//1080227 David 1071270 檢核稿件錄案追蹤資料
				if(bSetSignRecord && (strRecordDueDate == "" || strSignComment == ""))
				{
					bNeedSignRecord = false;
					ErrMsg += ErrMsgStamp + "有設定錄案追蹤，限辦日期/簽核意見不可為空";
					ErrMsgStamp = "\n";
				}

				if(ErrMsg != "")
				{
					alert(ErrMsg);
					return false;
				}
			}

			//1080227 David 1071270 新增錄案追蹤登錄處理
			if(bNeedSignRecord)
			{
				var paramSetSignRecord = {
					"argArtifact": localStorage.Artifact
					,"argOrgNo": theAOL.docObj.sourceOrgNo
					,"argDocNo": theAOL.docObj.docNo
					,"argRecordRoleNo": NowRoleNo
					,"argRecordRoleName": NowRoleName
					,"argRecordUserName": theSSO.User.account
					,"argRecordEmpName": theSSO.User.name
					,"argRecordDueDate": strRecordDueDate
					,"argRecordDesc": strSignComment
				};
					
				window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "wsSetSignRecord", null, paramSetSignRecord, false, function (rtn, xml) {
					console.log(rtn, xml);
					
					if(rtn.m_bSuccess == 'false')
					{
						alert("新增錄案追蹤登錄處理發生錯誤：" + rtn.m_strErrMsg);
						return false;
					}
				});
			}
		}
	}

	return true;
}

//1060427 David 1060289 新增速別異動WS處理
function WsGetDueDateInfo(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetDueDateInfo", null, params, false, function (rtn, xml)
	{
		console.log(rtn, xml);

		if (rtn.bSuccess == 'true')
		{
			if (g_WebEditQueryDeferred)
			{
				g_WebEditQueryDeferred.resolve(rtn);
				g_WebEditQueryDeferred = null;
			}
		}
		else
		{
			if (g_WebEditQueryDeferred)
			{
				g_WebEditQueryDeferred.reject(rtn.ErrMsg);
				g_WebEditQueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//1061222 David 1061170 新增紀錄初始基資資訊function
function SetSourceODWObj()
{
	if(theAOL.docObj.ODWDCM)
	{
		SorcerObj.FileCls = theAOL.docObj.ODWDCM.FILE_CLS;
		SorcerObj.ApplyLimit = theAOL.docObj.ODWDCM.APPLY_LIMT;
		SorcerObj.Secrete = theAOL.docObj.ODWMSG.SECRETE;
	}
}

//1080425 David 1080046 新增稿件刪除時效基資初始處理
function DraftRecoveryDefault(argModelObj)
{
	if(!argModelObj)//物件不存在，不處理
		return;

	if(SSO_CONFIG.OrgNickName == "RRB")
	{
		//原業務類別為開會通知
		if(theAOL.docObj.ODWDCM.B_TYPE_NO == "12")
		{
			var bHasMeet = false;
			var iDraftCounts = argModelObj.getDraftCounts();
			//1080513 David 1080046 修正參數錯誤問題
			//for(var iDrafts = 0 ; iDrafts < iDraftCounts ; iDraftCounts++)
			for(var iDrafts = 0 ; iDrafts < iDraftCounts ; iDrafts++)
			{
				var DraftDocType = argModelObj.getDraftDocType(iDrafts);
				if(DraftDocType == "開會通知單" || DraftDocType == "會勘通知單")
				{
					bHasMeet = true;
					break;
				}
			}

			//稿件皆無開會/會勘通知單時，進行基資初始處理
			if(!bHasMeet)
			{
				//紀錄原始資料
				//1090714 David 1090418 修正使用錯誤資料
				//var strDocCategory = theAOL.docObj.ODWDCM.DOC_CATEGROY;
				var strDocCategory = theAOL.docObj.ODWDCM.DOC_CATEGORY;
				var strDocProperty = theAOL.docObj.ODWDCM.DOC_PROPERTY;
				var strBTypeNo = theAOL.docObj.ODWDCM.B_TYPE_NO;
				var strMeetDate = theAOL.docObj.ODWMSG.MEET_DATE;

				//設定為函、一般公文不分類
				//1090714 David 1090418 修正使用錯誤資料
				//theAOL.docObj.ODWDCM.DOC_CATEGROY = "1";
				//1100225 David 修正自行發現文別錯誤問題
				//theAOL.docObj.ODWDCM.DOC_CATEGORY = "1";
				theAOL.docObj.ODWDCM.DOC_CATEGORY = "2";
				theAOL.docObj.ODWDCM.DOC_PROPERTY = "1";
				theAOL.docObj.ODWDCM.B_TYPE_NO = "11";
				theAOL.docObj.ODWMSG.B_TYPE_NO = "11";
				theAOL.docObj.ODWMSG.MEET_DATE = "";

				//1080628 David 1080491 稿件皆無開會/會勘通知單時，調整會議形式為非開會通知單
				theAOL.docObj.ODWDCM.MEETING_TYPE = "0";

				//1090714 David 1090418 不依照START_DATE判斷，一律重新取得時效相關欄位，調整邏輯
				/*if(theAOL.docObj.ODWDCM.START_DATE != "")
				{
					//起算日期不為空時，呼叫 WS 取得該一般公文不分類的時效統計類別及處理期限
					var params = {
						"argSessionID": localStorage.Artifact
						,"argSourceOrgNo": theAOL.docObj.ODWMSG.SOURCE_ORGNO
						,"argDocProperty": "1"
						,"argSpdNo": theAOL.docObj.ODWMSG.SPEED
						,"argBTypeNo": "11"
						,"argRcvDate": theAOL.docObj.ODWMSG.RCV_DATE
					};

					var dfdGetSumType = $.Deferred();
					g_QueryDeferred = dfdGetSumType;
					WsGetSumType(params, dfdGetSumType)
					.then(function (rtn)
					{
						//依回傳值設定時效相關欄位
						theAOL.docObj.ODWDCM.START_DATE = rtn.StartDateCalcBySys;
						theAOL.docObj.ODWDCM.SUN_TYPE = rtn.SumType;
						theAOL.docObj.ODWDCM.LEAD_TIME = rtn.LeadTimeDB;
						theAOL.docObj.ODWDCM.LT_UOM = rtn.LtBy;
						theAOL.docObj.ODWDCM.DUE_DATE = rtn.DueDate;
						theAOL.docObj.ODWMSG.DUE_DATE = rtn.DueDate;

						//RRB一般公文不分類，為工作日設定，且不會有補充天數，故不需後續GetUnHoliday()及加上補充天數處理
					})
					.fail(function (rtn) {
						//取得異常時，將資料設定回原本資料
						theAOL.docObj.ODWDCM.DOC_CATEGROY = strDocCategory;
						theAOL.docObj.ODWDCM.DOC_PROPERTY = strDocProperty;
						theAOL.docObj.ODWDCM.B_TYPE_NO = strBTypeNo;
						theAOL.docObj.ODWMSG.B_TYPE_NO = strBTypeNo;
						theAOL.docObj.ODWMSG.MEET_DATE = strMeetDate;

						alert("稿件無開會/會勘通知單，處理時效資訊初始發生異常：" + rtn.ErrorClass.ErrMessage.anyType);
						return false;
					});
				}*/
				var strRcvDate = theAOL.docObj.ODWMSG.RCV_DATE;
				if(strRcvDate == "")
				{
					var today = new Date();
					var NowYear = (today.getFullYear() - 1911) + '';
					var NowMonth = (today.getMonth()+1) + '';
					var NowDate = (today.getDate()) + '';
					strRcvDate = NowYear + jf_PADL(NowMonth,2,"0") + jf_PADL(NowDate,2,"0");
				}
				
				//呼叫 WS 取得該一般公文不分類的時效統計類別及處理期限
				var params = {
					"argSessionID": localStorage.Artifact
					,"argSourceOrgNo": theAOL.docObj.ODWMSG.SOURCE_ORGNO
					,"argDocProperty": "1"
					,"argSpdNo": theAOL.docObj.ODWMSG.SPEED
					,"argBTypeNo": "11"
					,"argRcvDate": strRcvDate
				};

				var dfdGetSumType = $.Deferred();
				g_QueryDeferred = dfdGetSumType;
				WsGetSumType(params, dfdGetSumType)
				.pipe(function (rtn)
				{
					//依回傳值設定時效相關欄位
					//系統計算、非創稿公文或起算日期有值時(時效已起算)，才重新設定起算日期
					if (rtn.StartRule != "3" && (theAOL.docObj.ODWDCM.NEW_BY_OU == "N" || theAOL.docObj.ODWDCM.START_DATE !="" ))
						theAOL.docObj.ODWDCM.START_DATE = rtn.StartDateCalcBySys;
					theAOL.docObj.ODWDCM.SUN_TYPE = rtn.SumType;
					theAOL.docObj.ODWDCM.LEAD_TIME = rtn.LeadTimeDB;
					theAOL.docObj.ODWDCM.LT_UOM = rtn.LtBy;
					if (theAOL.docObj.ODWDCM.NEW_BY_OU == "Y" && theAOL.docObj.ODWDCM.START_DATE == "")//創稿無起算日期時，清空DUEDATE
					{
						theAOL.docObj.ODWDCM.DUE_DATE = "";
						theAOL.docObj.ODWMSG.DUE_DATE = "";
					}
					else
					{
						theAOL.docObj.ODWDCM.DUE_DATE = rtn.DueDate;
						theAOL.docObj.ODWMSG.DUE_DATE = rtn.DueDate;
					}

					//RRB一般公文不分類，為工作日設定，且不會有補充天數，故不需後續GetUnHoliday()及加上補充天數處理
				})
				.fail(function (rtn) {
					//取得異常時，將資料設定回原本資料
					theAOL.docObj.ODWDCM.DOC_CATEGROY = strDocCategory;
					theAOL.docObj.ODWDCM.DOC_PROPERTY = strDocProperty;
					theAOL.docObj.ODWDCM.B_TYPE_NO = strBTypeNo;
					theAOL.docObj.ODWMSG.B_TYPE_NO = strBTypeNo;
					theAOL.docObj.ODWMSG.MEET_DATE = strMeetDate;

					alert("稿件無開會/會勘通知單，處理時效資訊初始發生異常：" + rtn.ErrorClass.ErrMessage.anyType);
					return false;
				});
			}
		}
	}
}

//1121106 David 新增依Text取得公文性質代碼
function GetNoFromArrDocProperty(argText)
{
	for(var idx = 0 ; idx < gWebEditSaveObj.arrDocProperty.length ; idx++)
	{
		if(gWebEditSaveObj.arrDocProperty[idx].NAME == argText)
		{
			return gWebEditSaveObj.arrDocProperty[idx].NO;
		}
	}
	
	return "";
}


//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-WebEditSave.js").finish();
})();