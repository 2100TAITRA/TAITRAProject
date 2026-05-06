/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1111020  Cloud   1110899 新增銓敘部專用AKM330
 * 1111207  Cloud   1110859 KODA系統僅檢核部分欄位不為空
 * 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題
 * 2022.12.22	Cloud	1110899	歷史資料可能沒有四角號碼、身分證、姓名，避免誤撈增加判斷皆為空白則不進行撈取
 * 2022.03.14   Cloud   --      修改輸入完整身分證可帶回正確姓名邏輯
 * 2023.04.11   Cloud   需求序7  現場分類號、個人檔有屬於無任何人管理的資料，不希望編目後變成當前人員管理，故一律不檢核是否有管理人員及自動設定管理人員
 * 2023.04.19   Cloud   需求序7  不檢核是否有管理人員
 * 2023.06.29   Cloud   序287、281    現場實務面有人員改名情況，同一身分證不同姓名，僅使用身分證為鍵值會有問題需增加姓名
 * 2023.09.06	Cloud	序287、281    現場實務面有人員改名情況，同一身分證不同姓名，修改更名後，跳出立案應清除鍵值，避免被server端誤判
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

var alertTitle = "您輸入之資料有誤，明細如下，請更正後重試";
var strRcvYear = "";//年度號+保存年限
var strYear = ""; //系統年(3碼)
var flagtemp=true;
var ModifyCls = false; //[0970248]Add by Cola記錄使用者是否有要修改分類號
var NotModifyCls = false; //[0970248]Add by Cola記錄使用者是否有要修改分類號
var OriginVer_Cls = ""; //[0970248]Add by Cola記錄原板別/分類號
var OriginVer_ClsKey = ""; //[0970248]Add by Cola記錄原分類號鍵值
var LayoutModeNew=0;
var LayoutModeModify=1;
var pSecSeqDuplicate=false;
var DeptNo="";
var uDeptName="";
var strStoreNo = "";
var IsOpenAKM330C1=false;
var alertComNo ;
var EAC005 = "";
//1020408	Jagle	[1011178]	記錄該卷目前總頁數用(不包含目前開啟公文及隔頁紙)、紀錄隔頁紙數目用
var VolPage = "0";
var SepPage = "0";
//1060930	Kevin_C	1060860	紀錄母文的分類號鍵值
var strComClsKey = "";
//2016.03.20   CLOUD   1050087 升級二代
/*document.all.tbTool.onbuttonclick=jf_ToolBarHandle;*/
window.onunload = jf_WindowOnUnLoad;

//96.02.26 000189 David
//var OD_FLOW_TYPE = document.all["OD_FLOW_TYPE"].value;
	
//95.11.27 950489 David
if(jf_Trim(document.all["dlSect_Text"].value) == "")
	document.all["dlSect_Container"].disabled = true;
else
	document.all["dlSect_Container"].disabled = false;

//1070830 Zen 1070678 弱掃Ajax修正
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*if(OD_FLOW_TYPE == "1")
	document.all["dlSect_Container"].className = "Hide";*/
//[0970248]Add by Cola 針對分類號檢核, AKM330因有特殊需求, 因此新設計一Function用以判斷呼叫WebService之狀況
//(因為在呼叫WebService判斷有錯時，不應直接alert，必需再透過公文之編目日期判斷顯示之訊息
function jf_IsWebServiceSuccess_AKM330(argResult)
{
	if(argResult.error)
	{
	    //alert(argResult.errorDetail.string);
	    return false;
	}
	else
	{
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
			   jf_RedirectToCustomErrPage();
			}
			//else
				//alert( obj.ErrorClass.ErrMessage[0].text);
			
			return false;
		}
	}
	
	return true;
	
}

function ShowMsg()
{
     //1060321 Cloud    1050087 升級二代
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

//2006.08.07 JEFF 單號950333 CHECK檔案併件流水號是否有重複
function CheckFileComboSeqDuplicate()
{	
	var param = new Array(2);
	param[0] = document.all.tbDOC_NO.value;
	param[1] = document.all.tbCOM_NO.value;
	param[2] = document.all.txFileComboSeq.value;
	
	RtnObj = jf_CallWS("\lib/AK_LIB.asmx","CheckDocMainFileComboSeq",false,param);

	if (!RtnObj.error)
	{
		if (RtnObj.value.RtnBool)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}

//var bGetKeyBeforeSave = false;
var bGetKeyBeforeSave = true;
var bDubCheck = false;
//1060321 Cloud 1050087 升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
    //1060321 Cloud 1050087 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName) {
	    case "btOpen":
	        //Page_BlockSubmit = !jf_CheckKeyObject();
	        Page_BlockSubmit = !FormOpenValid();
	        //[0960193]Add by Cola
	        document.all["btOpenChecker"].value = "1";
	        //1060321 Cloud 1050087 升級二代
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btSave":
	        Page_BlockSubmit = false;
	        // 2021.07.07   Cloud   1100638 新增主旨檢核是否含有身分證格式文字
	        if (!CheckSub()) {
	            Page_BlockSubmit = true;
	            return;
	        }
	        //2022.08.31   Cloud 1110875 考試院增加判斷儲存須有完整檔號
	        if (document.all["OrgNickName"].value == "EXAM" && document.all["TemplateMode"].value=="1")
	        {
	            if (document.all["tbYEAR"].value == "" || document.all["tbCLS"].value == "" || document.all["tbCASE"].value == ""
                    || document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "") {
	                alert('尚未完成檔號編目，不可儲存。');
	                Page_BlockSubmit = true;
	                return;
	            }
	        }
	        //1111120 Cloud 個人檔增加檢核需有姓名 身分證 四角號碼
	        if (document.all.tbCLS.value == "11")
	        {
	            if (document.all["txFullName"].value == "" || document.all["txPerID"].value == "" || document.all["txFourNum"].value == "") {
	                alert('當前公文為個人案，姓名、身分證、四角號碼不可為空。');
	                Page_BlockSubmit = true;
	                return;
	            }
	            else {
	                if (document.all["txPerID"].value.length != 5 && document.all["txPerID"].value.length != 10)
	                { alert('輸入身分證號不完整，請重新輸入。'); $("#txPerID")[0].focus(); Page_BlockSubmit = true; return; }
	            }
	        }
	        bGetKeyBeforeSave = true;
	        
	        if (document.all.OtxFullFileNo.value != "" && document.all.OtxFullFileNo.value != document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|"
				+ document.all.tbCASE.value) {
	            var arrFileNo = document.all.OtxFullFileNo.value.split('|');
	            if (arrFileNo[0] != document.all.tbVerNo.value)
	            { TbOnBlur("tbVerNo"); }
	            if (arrFileNo[1] != document.all.tbYEAR.value)
	            { TbOnBlur("tbYEAR"); }
	            if (arrFileNo[2] != document.all.tbCLS.value)
	            { TbOnBlur("tbCLS"); }
	            if (arrFileNo[3] != document.all.tbCASE.value)
	            { TbOnBlur("tbCASE"); }
	            //document.all.OtxFullFileNo.focus();	//修改後直接觸發儲存畫面檔號會與隱藏欄位不同，透過FOCUS隱藏欄位觸發ONBLUR，不直接叫用函式-避免重複觸發ONBLUR
	        }
	        if (!bGetKeyBeforeSave) {
	            Page_BlockSubmit = true;
	            bGetKeyBeforeSave = true;
	            break;
	        }
	        //* 2021.08.17	Cloud	1100873	修正儲存後密件公文應解密日期一直被重設問題-E

	        //1030117	Kenny	[1030005]	調整卷次號及目次號onblur補0的位置，避免輸入完不完整目次號後直接按儲存，造成檔號重複
	        TbOnBlur("tbSEQ");
	        TbOnBlur("tbVOL");
	        //1051103   Kenny   [1051138]   移除檔號補0後的檢核邏輯；因檢核條件不完全，且與後方檢核邏輯重複
	        //if ( !CheckFileValueProcess(1) )
	        //{
	        //	Page_BlockSubmit = true;				
	        //	break;
	        //}

	        //* 2013.11.07	Cloud	1020885	配合台科大強制點收功能，增加公文狀態為非可歸檔時，不可編目
	        //2013.11.26 Cloud 修正未考量歷史資建檔情況問題-不會有document.all.DocState欄位
	        if (document.all.DocState) {
	            if (parseInt(document.all.DocState.value) <= 08 && document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "") {
	                alert('本公文未點收，不可進行編目!!');
	                Page_BlockSubmit = true;
	                break;
	            }
	        }
	        if (document.all.txFileComboSeq) //多增加判斷流水號必須存在且顯示才取值 #2006.09.01 Andy
	        {
	            if (document.all.txFileComboSeq.value != "")
	                document.all.txFileComboSeq.value = jf_PADL(document.all.txFileComboSeq.value, 2, "0");
	        }
	        //[001054]Add by Cola 儲存前，若該筆公文已有編目日期，則不允許部份檔號為空的情況下，進行儲存 -- start --
	        if (jf_Trim(document.all["txInpFileDate"].value) != "") {
	            if (document.all["tbYEAR"].value == "" || document.all["tbCLS"].value == "" || document.all["tbCASE"].value == "" || document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "") {
	                alert('本公文已有完整編目日期，因此不允許部份檔號(年度號/分類號/案次號/卷次號/目次號)為空，請輸入完整檔號後再進行儲存。');
	                Page_BlockSubmit = true;
	                break;
	            }
	        }
	        //Cola -- end --
	        //2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG，儲存增加對辦畢日期的檢核
	        if (!TbOnBlur("tbCDATE")) {
	            Page_BlockSubmit = true;
	            break;
	        }

	        //[---]Add by Cola 保存年限調整 -- start --
	        /*if (GetYearValid() != "")
			{
				alert(GetYearValid());
				Page_BlockSubmit = true;
				break;				
			
			}*/
	        //Cola -- end --



	        //2006.08.04 JEFF 併件檔案流水號新增功能
	        if (document.all.txShowComSeq.value == "Y") {
	            //CheckFileComboSeqDuplicate();
	            if (CheckFileComboSeqDuplicate()) {
	                alert("併案流水號有重複值，請使用其他流水號");
	                //1060321 Cloud 1050087 升級二代
	                //document.all.txFileComboSeq.focus();
	                $("#txFileComboSeq")[0].focus();
	                Page_BlockSubmit = true;
	                break;
	            }
	        }


	        //Page_BlockSubmit = !jf_CheckKeyObject();
	        //問題單：940654:儲存時若發文字號為空白，則不自動帶入發文字+發文號
	        //if(jf_Trim(document.all["tbINO"].value) !="" && jf_Trim(document.all["dllIssueNoWord_Text"].value) !="")
	        //	document.all["tbIssueNo"].value = jf_Trim(document.all["dllIssueNoWord_Text"].value)+"字第"+jf_Trim(document.all["tbINO"].value)+"號";

	        //0950119 CAESAR 940988
	        //修正開啟公文號,僅修改案次號,點選儲存後出現MFIL_IDX1重複問題
	        //原因:修改之案次號若不存在點選儲存時將避掉案次號不存在之檢核
	        //         故於此修正之
			//1111120 個人檔新案 儲存才立案所以可能會有案次號沒有鍵值情況
			if (document.all["tbCLS"].value != "11")
			{
				if (document.all.htxCaseKey.value == "0")
					document.all.htxCaseKey.value = "";
				if (document.all.htxCaseKey.value == "" && jf_Trim(document.all["tbCASE"].value) != "") {
					/*
					if (document.all["tbCASE"].value != document.all["INITS_FILENO"].value && 
						document.all["tbCASE"].value != document.all["INIT_FILENO"].value  &&
						document.all["tbCASE"].value != document.all["DEPT_CASE"].value )	
					{
						TbOnBlur("tbCASE");
						Page_BlockSubmit = true;
						break;			
					}
					*/
					//改成所有案次號一律去call ws帶案名 #2006.03.19 Andy
					
					TbOnBlur("tbCASE");
					Page_BlockSubmit = true;
					break;
				}
				if (document.all.htxCaseKey.value != "" && jf_Trim(document.all["tbCASE"].value) != "") {
	            
					var CaseCheckRes = AK.AKM330_MOCS.CaseCheck(document.all["tbOrgNo"].value, document.all.htxCaseKey.value, document.all["tbCASE"].value).value;
					if (!CaseCheckRes) {
						TbOnBlur("tbCASE");
						TbOnChange("tbCASE");
						Page_BlockSubmit = true;
						alert("更動案次號欄位後，請先重新輸入卷次號及目次號或點選編卷按鈕再進行儲存。");
						//1060321 Cloud 1050087 升級二代
						//document.all["tbVOL"].focus();
						$("#tbVOL")[0].focus();
						break;
					}
				}
			}
	        
	        
	        //Zoey [96/08/30, 001477]
	        var strLmtClsLen = document.all.h_lbClsLen.innerText;
	        if (strLmtClsLen != null && jf_Trim(strLmtClsLen) != "" && strLmtClsLen != "0") {
	            var iLmtClsLen = parseInt(strLmtClsLen);
	            if (iLmtClsLen != 0) {
	                var inpClsNo = jf_Trim(document.all["tbCLS"].value);
	                if (inpClsNo != "" && inpClsNo.length < iLmtClsLen) {
	                    alert("分類號至少需輸入" + strLmtClsLen + "碼!!");
	                    Page_BlockSubmit = true;
	                    break;
	                }
	            }
	        }
	        
	        var param1 = new Array(3);
	        
	        param1[0] = encodeURI(document.all["tbVerNo"].value);
	        param1[1] = encodeURI(document.all["tbCLS"].value);
	        param1[2] = encodeURI(document.all["tbYEAR"].value);
	        
	        var checkkey = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);
	        if (!jf_IsWebServiceSuccess_AKM330(checkkey)) {
	            
	            if (!(jf_Trim(document.all["txInpFileDate"].value) != "" && obj.ErrorClass.ErrMessage[0].indexOf("細分類") >= 0 && NotModifyCls && OriginVer_Cls == document.all["tbVerNo"].value + document.all["tbCLS"].value)) {
	                
	                if (jf_Trim(document.all["txInpFileDate"].value) != "" && checkkey.value.ErrorClass.ErrMessage[0].indexOf("細分類") >= 0 && !ModifyCls && OriginVer_Cls == document.all["tbVerNo"].value + document.all["tbCLS"].value) {
	                
	                    if (window.confirm("此份公文先前已使用非最下層分類號編目，是否要修正分類號？\n (確認代表是，取消代表否)")) {
	                        ModifyCls = true;
	                        $("#tbCLS")[0].focus();
	                        Page_BlockSubmit = true;
	                    }
	                    else
	                        NotModifyCls = true;
	                }
	                    //其餘情形照舊				
	                else {
	                    alert(checkkey.value.ErrorClass.ErrMessage[0]);
	                    Page_BlockSubmit = true;
	                    break;
	                }
	            }
	            else
	                document.all.htxClsKey.value = OriginVer_ClsKey;
	        }
	        //Cola -- end --


	        if (Check_NOT_Allow_Empty_Field()) {
	            if (before_save()) {
	                if (!CheckDateCompare("tbFDATE", "來文日期", "tbRDATE", "收創文日期")) {
	                    Page_BlockSubmit = true;
	                    
	                    $("#tbFDATE")[0].focus();
	                    break;
	                }

	                if (!CheckDateCompare("tbRDATE", "收創文日期", "tbIDATE", "發文日期")) {
	                    Page_BlockSubmit = true;
	                    //1060321 Cloud 1050087 升級二代
	                    //document.all["tbRDATE"].focus();
	                    $("#tbRDATE")[0].focus();
	                    break;
	                }

	                if (!CheckDateCompare("tbRDATE", "收創文日期", "tbCDATE", "結案日期")) {
	                    Page_BlockSubmit = true;
	                    //1060321 Cloud 1050087 升級二代
	                    //document.all["tbRDATE"].focus();
	                    $("#tbRDATE")[0].focus();
	                    break;
	                }

	                //檢查另存密件流水號是否重覆
	                pSecSeqDuplicate = false

	                if (parseInt(document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value, 10) > 1) //密件
	                    TbOnBlur("txSecSeq");

	                if (pSecSeqDuplicate) break;

	                if (!ChkEFileVolNo()) {
	                    if (document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value == "2") //電子檔案
	                        alert("電子檔案的卷次號必須以 " + document.all.INIT_EVOLNO.value + " 開頭，請確認卷次號後再存檔");
	                    else
	                        alert("紙本檔案的卷次號不可以 " + document.all.INIT_EVOLNO.value + " 開頭，請確認卷次號後再存檔");
	                    //1060321 Cloud 1050087 升級二代
	                    //document.all["tbVOL"].focus();
	                    $("#tbVOL")[0].focus();
	                    break;
	                }
	                    //* 2022.06.09   Cloud   1110520 補強紙本公文編卷僅能用純數字-S
	                else {
	                    if (document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value == "1") //紙本檔案
	                    {
	                        var regex = /^[0-9\s]*$/;
	                        if (!regex.test(document.all.tbVOL.value)) {
	                            alert('紙本檔案的卷次號僅能使用數字。');
	                            break;
	                        }
	                    }
	                }
	                //* 2022.06.09   Cloud   1110520 補強紙本公文編卷僅能用純數字-E
	                //95.11.01 950869 David
	                //[0970657]Add by Cola 若STOCK_NO為Y，表示有櫥位號觀念，若使用櫥位號管理時，不應檢核檔號部份
	                if (document.all["USE_STOCK"].value == "Y") {
	                    //1070830 Zen 1070678 弱掃Ajax修正
	                    //if (AKM330.CheckManageMethod(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value != "0")
	                    if (AK.AKM330_MOCS.CheckManageMethod(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value != "0") {
	                        if (!CheckFileValueProcess(1))
	                            break;
	                    }
	                }
	                else {
	                    if (!CheckFileValueProcess(1))
	                        break;
	                }
	                //Cola -- end --

	                //[2007/11/29]Cola 新增儲存前相關判斷 -- start --
	                if (document.all["tbCOM_NO"].value != "" && document.all["tbDOC_NO"].value != document.all["tbCOM_NO"].value && document.all["cbComNo"].checked == true) {
	                    //1070830 Zen 1070678 弱掃Ajax修正
	                    //var strInpDateData = AKM330.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
	                    var strInpDateData = AK.AKM330_MOCS.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;

	                    var strArrData = new Array();
	                    //1070830 Zen 1070678 弱掃Ajax修正
	                    //strArrData = AKM330.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');
	                    strArrData = AK.AKM330_MOCS.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');

	                    if (jf_Trim(strInpDateData) == "" && document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "") {
	                        alert("參照文號尚未編目，因此不允許先對併件子文進行編目，請先將併件母文(參照文號)編目後才可將併件子文編目，或者將併件關係解除。");
	                        Page_BlockSubmit = true;
	                        break;
	                    }
	                    else if (jf_Trim(strInpDateData) != "" && document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "") {
	                        //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
	                        //if(document.all.tbYEAR.value != strArrData[0] || document.all.tbCLS.value != strArrData[1] || document.all.tbCASE.value != strArrData[2] || document.all.tbVOL.value != strArrData[3] || document.all.tbSEQ.value != strArrData[4])
	                        if (document.all.tbYEAR.value != strArrData[0] || document.all.tbCLS.value != strArrData[1] || document.all.tbCASE.value != strArrData[2] || document.all.tbVOL.value != strArrData[3] || document.all.tbSEQ.value != strArrData[4] || document.all.tbVerNo.value != strArrData[13]) {
	                            alert("併件子文檔號必須與併件母文檔號相同，請先執行『編卷』，再進行儲存動作。");
	                            Page_BlockSubmit = true;
	                            break;
	                        }
	                    }
	                }
	                //Cola -- end --

	                var strMsg = "";
	                var IsOk = true;
	                /*
					if (document.all["tbDEPT"].value!="" && document.all["tbDEPT"].value!=document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value)
					{
						if (document.all["tbDATA_TYPE"].value!="RE")
						{
							strMsg+="無此承辦單位\n";
							if (IsOk)
								document.all["tbDEPT"].focus();
							
							IsOk=false;
						}
					}
					
					if (document.all["tbEMP"].value!="")
					{
						if (document.all["dlEmp"].length==0)
						{
							if (document.all["tbDATA_TYPE"].value!="RE")
							{
								strMsg+="無此承辦人";
								if (IsOk)
									document.all["tbEMP"].focus();
								
								IsOk=false
							}
						}
						else
						{
							if (document.all["tbEMP"].value!=document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value)
							{
								if (document.all["tbDATA_TYPE"].value!="RE")
								{
									strMsg+="無此承辦人";
									if (IsOk)
										document.all["tbEMP"].focus();
									
									IsOk=false
								}
							}
						}
					}
					*/

	                if (strMsg != "") {
	                    alert(strMsg);
	                    Page_BlockSubmit = true;
	                    break;
	                }
	                //Cola檢核應解日期格式 - 應解密日期不為空且可寫入才檢核
	                if (!document.all["tbExtRmvSec_Date"].disabled && jf_Trim(document.all["tbExtRmvSec_Date"].value) != "") {
	                    if (!jf_CheckCDATE(jf_Trim(document.all["tbExtRmvSec_Date"].value))) {
	                        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["應解密日期"])), "");
	                        //1060321 Cloud 1050087 升級二代
	                        //document.all["tbExtRmvSec_Date"].focus();
	                        $("#tbExtRmvSec_Date")[0].focus();
	                        document.all["tbExtRmvSec_Date"].value = "";
	                        break;
	                    }
	                }

	                if (document.all.TemplateMode.value == "0") {
	                    if (jf_CheckDataExist(document.all["tbOrgNo"].value)) {
	                        if (window.confirm(jf_GetErrMsg(KeyExist)))
	                            Page_BlockSubmit = false;
	                        else
	                            Page_BlockSubmit = true;
	                    }
	                    else
	                        Page_BlockSubmit = false;
	                }
	            }
	            else { Page_BlockSubmit = true; }
	        }
	        else { Page_BlockSubmit = true; }
	        /*//文件產生日
			if (document.all["tbCrtDate"].value=="")
			{
				if (document.all["tbIDATE"].value!="")
					document.all["tbCrtDate"].value=document.all["tbIDATE"].value;
				else if (document.all["tbFDATE"].value!="")
					document.all["tbCrtDate"].value=document.all["tbFDATE"].value;
				else
				{
					alert("來文日期或發文日期不可空白");
					Page_BlockSubmit = true;
				}
			}*/
	        //0960084 Add by Cola 儲存前取得對應資訊 (承辦資訊代碼)，且設定SelectIndex -- start --
	        var bDept = false;
	        var bSect = false;
	        var bEmp = false;

	        for (var i = 0 ; i < document.all["dlDept1"].length ; i++) {
	            if (document.all["dlDept1"].options[i].text == document.all["dlDept1_Text"].value && document.all["dlDept1_Text"].value != "") {
	                document.all["dlDept1"].selectedIndex = i;
	                document.all["txDeptNo_h"].value = document.all["dlDept1"].options[i].value.split(':')[0];
	                bDept = true;
	                break;
	            }
	        }
	        for (var i = 0 ; i < document.all["dlSect"].length ; i++) {
	            if (document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value && document.all["dlSect_Text"].value != "") {
	                document.all["dlSect"].selectedIndex = i;
	                document.all["txSectNo_h"].value = document.all["dlSect"].options[i].value.split(':')[2];
	                bSect = true;
	                break;
	            }
	        }
	        //[0970909]Modify by Cola -- start --
	        for (var i = 0 ; i < document.all["dlEmp"].length ; i++) {
	            if (document.all["dlEmp"].options[i].text == document.all["dlEmp_Text"].value && document.all["dlEmp_Text"].value != "") {
	                //document.all["dlEmp"].selectedIndex = i;
	                //document.all["htxEmp"].value = document.all["dlEmp"].options[i].value;
	                bEmp = true;
	                break;
	            }
	        }
	        //Cola -- end --

	        if (!bDept) {
	            document.all["dlDept1"].selectedIndex = -1;
	            document.all["txDeptNo_h"].value = "";
	        }
	        if (!bSect) {
	            document.all["dlSect"].selectedIndex = -1;
	            document.all["txSectNo_h"].value = "";
	        }
	        if (!bEmp) {
	            document.all["dlEmp"].selectedIndex = -1;
	            document.all["htxEmp"].value = "";
	        }
	        else {
	            if (document.all["dlEmp"].selectedIndex != -1)
	                document.all["htxEmp"].value = document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
	            else
	                document.all["htxEmp"].value = "";
	        }
	        //Cola -- end --

	        //1100204 Cloud 1091010 中榮開放維護原始單位及提供檢核，現行承辦單位不可為不存在之單位避免調案、年度作業無法正常執行
			//1110811 Cloud 1110414 改以系統參數判斷
	        //if (document.all["tbOrgNickName"].value == "TVGH") {
				if (document.all["USE_ODETP_INFO"].value == "Y"){
	            if ((!bDept && document.all["dlDept1_Text"].value != "") || (!bSect && document.all["dlSect_Text"].value != "") || (!bEmp && document.all["dlEmp_Text"].value != "")) {
	                Page_BlockSubmit = true;
	                alert('現行承辦單位/科別不存在系統，將造成調案、年度(清理、銷毀..等)相關作業無法正確進行，不可存入，請再次確認。');

	            }
	        }
	        var bODept = false;
	        var bOSect = false;
	        var bOEmp = false;

	        for (var i = 0 ; i < document.all["OdlDept1"].length ; i++) {
	            if (document.all["OdlDept1"].options[i].text == document.all["OdlDept1_Text"].value && document.all["OdlDept1_Text"].value != "") {
	                document.all["OdlDept1"].selectedIndex = i;
	                document.all["OtxDeptNo_h"].value = document.all["OdlDept1"].options[i].value.split(':')[0];
	                bODept = true;
	                break;
	            }
	        }
	        for (var i = 0 ; i < document.all["OdlSect1"].length ; i++) {
	            if (document.all["OdlSect1"].options[i].text == document.all["OdlSect1_Text"].value && document.all["OdlSect1_Text"].value != "") {
	                document.all["OdlSect1"].selectedIndex = i;
	                document.all["OtxSectNo_h"].value = document.all["OdlSect1"].options[i].value.split(':')[2];
	                bOSect = true;
	                break;
	            }
	        }
	        for (var i = 0 ; i < document.all["OdlEmp1"].length ; i++) {
	            if (document.all["OdlEmp1"].options[i].text == document.all["OdlEmp1_Text"].value && document.all["OdlEmp1_Text"].value != "") {
	                bOEmp = true;
	                break;
	            }
	        }
	        if (!bODept) {
	            document.all["OdlDept1"].selectedIndex = -1;
	            document.all["OtxDeptNo_h"].value = "";
	        }
	        if (!bOSect) {
	            document.all["OdlSect1"].selectedIndex = -1;
	            document.all["OtxSectNo_h"].value = "";
	        }
	        if (!bOEmp) {
	            document.all["OdlEmp1"].selectedIndex = -1;
				//* 2022.09.02   Cloud   1110414 避免歷史資料沒有代碼可以比對，或代碼已不存在選單調整僅比對名稱-改直接抓畫面名稱
	            //document.all["OhtxEmp"].value = "";
				document.all["OhtxEmp"].value = document.all["OdlEmp1_Text"].value;
	        }
	        else {
	            if (document.all["OdlEmp1"].selectedIndex != -1)
	                document.all["OhtxEmp"].value = document.all["OdlEmp1"].options[document.all["OdlEmp1"].selectedIndex].value;
	            else
	                document.all["OhtxEmp"].value = "";
	        }
	        //1110811 Cloud 1110414 增加判斷910101之後公文異動承辦單位(原始)時跳出提醒-S
	        if (document.all.USE_ODETP_INFO.value == "Y" && document.all["tbOrgNickName"].value == 'MOTC') {
	            if (document.all.tbCrtDate.value > "0910101") {
	                //* 2022.09.02   Cloud   1110414 避免歷史資料沒有代碼可以比對，或代碼已不存在選單調整僅比對名稱
	                /*var NODeptUserInfo = document.all["OtxDeptNo_h"].value + "|" + document.all.OdlDept1_Text.value + "|" + document.all.OtxSectNo_h.value
                    + "|" + document.all.OdlSect1_Text.value + "|" + document.all.OhtxEmp.value;*/
	                //單位代碼|名稱|科別代碼|名稱|承辦人帳號|名稱
	                //
	                var NODeptUserInfo = document.all.OdlDept1_Text.value + "|" + document.all.OdlSect1_Text.value;
	                if (document.all.OhtxEmp.value.indexOf(":") != -1)
	                    NODeptUserInfo += "|" + document.all.OhtxEmp.value.split(':')[3];
	                else
	                    NODeptUserInfo += "|" + document.all.OhtxEmp.value;
	                if (document.all.ODeptUserInfo.value != "" && document.all.ODeptUserInfo.value != NODeptUserInfo) {
	                    if (!window.confirm("您現在要修改91年(不含)以後公文的原始「承辦單位」、「承辦人」資料，確定要修改嗎？")) {
	                        Page_BlockSubmit = true;
	                        return;
	                    }
	                }
	            }
	        }

	        //0960801 Leo 001209 combobox在回server時，無法將client所改變的值帶回server，所以用隱藏欄位來存承辦人的資訊
	        //0960084 Marked by Cola 以統一由上述語法取得對應資料
	        /*if (document.all["dlEmp"].selectedIndex != -1)
				document.all.htxEmp.value = document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
			else
				document.all.htxEmp.value = "";	*/

	        //1020218	Jagle	[1011178]	已使用頁數配合清空
	        document.all["txVolTotalPage"].value = "";

	        GetText("All");//1031204 Gabby [1030888] 儲存前將承辦資訊欄位值放入隱藏欄位

	        //1070305	Kevin_C	1060353	北榮客製化功能，增加檢核檔號完整性
	        if (document.all["tbOrgNickName"].value == "TPVGH")
	            if (document.all["tbVerNo"].value == "" || document.all["tbYEAR"].value == ""
				|| document.all["tbCLS"].value == "" || document.all["tbCASE"].value == ""
				|| document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "")
	                Page_BlockSubmit = !window.confirm("檔號不完全，是否繼續儲存");

	        //1060321 Cloud 1050087 升級二代
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btDelete":
	        Page_BlockSubmit = !jf_ConfirmDelete();
	        //1060321 Cloud 1050087 升級二代
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btCancel":
	        Page_BlockSubmit = !jf_ConfirmCancel();
	        if (document.all.txFileComboSeq)//Matte 0961022 001504
	        {
	            document.all["txFileComboSeq"].value = "";
	        }
	        //1060321 Cloud 1050087 升級二代
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btClean":
	        Page_BlockSubmit = true;
	        var value1 = document.all["TRANYEAR"].value;
	        var value2 = document.all["RCVDAY"].value;
	        var value3 = document.all["tbOrgNo"].value;
	        var value4 = document.all["INIT_FILENO"].value;
	        var value5 = document.all["INITS_FILENO"].value;
	        var value6 = document.all["ATTACH_LENGTH"].value;
	        var value7 = document.all["tbDATA_TYPE"].value;
	        var value8 = document.all["INIT_FILENAME"].value;
	        var value9 = document.all["INITS_FILENAME"].value;
	        var value10 = document.all["txUser"].value;
	        //var value11=document.all["txDump"].value;
	        var value12 = document.all["txSysDate"].value;
	        var value13 = document.all["INIT_EVOLNO"].value;
	        var value14 = document.all["DEPT_CASE"].value;
	        var value15 = document.all["TxIndexIssueWord"].value;
	        var value16 = document.all["TxIndexSecIssueWord"].value;
	        jf_ConfirmClean();
	        document.all["TRANYEAR"].value = value1;
	        document.all["RCVDAY"].value = value2;
	        document.all["tbOrgNo"].value = value3;
	        document.all["INIT_FILENO"].value = value4;
	        document.all["INITS_FILENO"].value = value5;
	        document.all["ATTACH_LENGTH"].value = value6;
	        document.all["tbDATA_TYPE"].value = value7;
	        document.all["INIT_FILENAME"].value = value8;
	        document.all["INITS_FILENAME"].value = value9;
	        document.all["txUser"].value = value10;
	        //document.all["tbDump"].value=value11;
	        document.all["txSysDate"].value = value12;
	        document.all["INIT_EVOLNO"].value = value13;
	        document.all["DEPT_CASE"].value = value14;
	        document.all["TxIndexIssueWord"].value = value15;
	        document.all["TxIndexSecIssueWord"].value = value16;
	        document.all["txClsName"].value = "";
	        document.all["txCaseName"].value = "";
	        document.all["tbCrtDate"].value = "";
	        document.all["txFromNoWord"].value = "";
	        document.all["tbIssueNo"].value = "";
	        //2011.07.13   Jeff	1000573   新增承辦人職稱欄位
	        document.all["txTitle"].value = "";
	        //1020218	Jagle	[1011178]	清空已使用頁數
	        document.all["txVolTotalPage"].value = "";
	        // 2015.11.13	Cloud	1040921	(merge)1020425點選編卷按鈕時增加回傳清理處置資料
	        document.all["txClearProc"].value = "";
	        document.all["txOClearProc"].value = "";
	        break;
	    case "btViewDoc":
	        //* 2019.07.11	Cloud	1080559	修正線上瀏覽發生POST_BACK問題
	        //Page_BlockSubmit = false;
	        Page_BlockSubmit = true;
	        //1060321 Cloud 1050087 升級二代
	        //jf_ToolBarSubmit();
	        //jf_ToolBarSubmit(xObjectName);
	        //1110628 Cloud 序15一併調整線上瀏覽機制，同AKI801、AKS116
	        if (document.all.USE_T2100_OD.value == "0") {
	            var RtnValue = AK.AKM330_MOCS.ViewDoc(document.all["h_sourceorgno"].value, document.all.txhUser.value, document.all["tbDOC_NO"].value).value;
	            if (RtnValue.indexOf("ERR-") != -1)
	            { alert(RtnValue); }
	            else
	            { jf_ShowModal('AKI800View.ashx'); }
	        }
	            //* 2022.06.27   Cloud   1110371 升級純檔管環境線上瀏覽-E
	        else {
	            try {
	                //* 2022.06.02   Cloud   1110371 配合純檔管系統修改線上瀏覽webfilio url取得方式
	                //var wsUrl = opener.theWebServices.url('fileiows');

	                var wsUrl = document.all.WebFileIO.value;
	                if (wsUrl != "") {
	                    var param = [];
	                    param[0] = GetParam("SAMLart");
	                    param[1] = document.all["tbDOC_NO"].value;
	                    param[2] = document.all["h_sourceorgno"].value;
	                    //1110215 Cloud 1101485 修改支援紙本公文線上瀏覽
	                    //var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
	                    var rtnObj = jf_CallW(wsUrl, 'GetDocInfo', false, param);
	                    var params = new SOAPClientParameters();
	                    params.add('argArtifact', encodeURI(GetParam("SAMLart")));
	                    params.add('argDocNo', encodeURI(document.all["tbDOC_NO"].value));
	                    params.add('argOrgNo', encodeURI(document.all["h_sourceorgno"].value));
	                    var rtnObj = SOAPClient.invokeJSON(rtnObj.value.RtnStr, "GetOnLineApplyDocUnvByJSON", params, false, null);
	                    if (!rtnObj.error) {
	                        if (rtnObj.value.m_bSuccess) {
	                            var sUnvObj = rtnObj.value.RtnStr;

	                            if (sUnvObj !== "") {
	                                var UnvObj = JSON.parse(sUnvObj);
	                                //1110215      Cloud   1101485 修改支援紙本公文線上瀏覽-S
	                                var OpenType = document.all["h_signType"].value == "E" ? "AOL" : "UniView";
	                                let _unvDoc = UnvObj.UnvRoot.Doc;
	                                let _firstAtt = null;

	                                if (typeof _unvDoc == 'object' && _unvDoc != null) {
	                                    if ($.isArray(_unvDoc.Att)) {
	                                        _firstAtt = _unvDoc.Att[0];
	                                    }
	                                    else {
	                                        _firstAtt = _unvDoc.Att;
	                                    }
	                                }

	                                if (_firstAtt.Type != '7')
	                                    OpenType = 'UniView';
	                                //1110215      Cloud   1101485 修改支援紙本公文線上瀏覽--E
	                                var objViewDoc = {
	                                    UNVObj: UnvObj,
	                                    //* 2019.07.11	Cloud	1080559	修正線上瀏覽發生POST_BACK問題-一併修正成正確程式代碼
	                                    //docInfoPage: "AKI802",
	                                    docInfoPage: "AKM330",
	                                    //1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為
	                                    //openDocModule: 'AOL',
	                                    //signType: 'E',
	                                    openDocModule: OpenType,
	                                    signType: document.all["h_signType"].value,
	                                    readOnlyMode: true
	                                };
	                                var $docId = jf_GetSessionID() + "_" + (+new Date());
	                                localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
	                                var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + GetParam("SAMLart") + "&DocId=" + $docId;
	                                //1110215      Cloud   1101485 修改支援紙本公文線上瀏覽
	                                //jf_OpenChildWin(unvUrl, "AKT116ViewDoc");
	                                jf_OpenChildWin(unvUrl, "AKM330ViewDoc");
	                            }
	                        }
	                        else {
	                            alert(rtnObj.value.m_strErrMsg);
	                        }
	                    }
	                    else {
	                        alert(rtnObj.error.errorDetail.string)
	                    }
	                }
	                else
	                    alert('未設定公文系統伺服器WebFileIO的Url，無法瀏覽。');
	            } catch (e) {
	                alert('開啟失敗');
	            }
	        }
	        break;
	    case "btChkErrDetail":
	        var xUrl = "AKT116C2.aspx?k1=" + document.all.tbDOC_NO.value;
	        jf_OpenChildWin(xUrl, "AKT116C2", 500, 300);
	        Page_BlockSubmit = true;
	        break;
	    case "btFILESEARCH":
	        //0980916 開啟AKM330C2時多傳入權杖[0980454]-Jane
	        //var xUrl = "AKM330C2.aspx";
	        var xUrl = "AKM330C2.aspx?SAMLart=" + GetParam("SAMLart");
	        jf_OpenChildWin(xUrl, "AKM330C2", screen.width - 180, 530);
	        Page_BlockSubmit = true;
	        break;
	        //95.12.11 955218 David
	    case "btGetStockNo":
	        Page_BlockSubmit = true;
	        if (jf_Trim(document.all["txStockNo"].value) == "") {
	            if (CheckBeforeGetStock())
	                GetStockNo();
	        }
	        else {
	            alert("已有儲位號，不可再要號");
	        }
	        //1060321 Cloud 1050087 升級二代
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	        // 2016.02.20   Cloud   1051245 新增取消編卷功能
	    case "btCancelSave":
	        if (document.all["tbYEAR"].value == "" || document.all["tbCLS"].value == "" || document.all["tbCASE"].value == "" || document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "") {
	            alert('公文無完整檔號，不可使用取消編卷功能。');
	            Page_BlockSubmit = true;
	            break;
	        }
	        else {
	            Page_BlockSubmit = false;
	            //1060321 Cloud 1050087 升級二代
	            //jf_ToolBarSubmit();
	            jf_ToolBarSubmit(xObjectName);
	        }
	        break;
	        //* 2022.08.26   Cloud   1110875、1110876 開啟並列案由時，增加串入供子視窗判斷是否顯示來文主旨，增加流程查詢鈕
	    case "btOpenODI260":
	        var strSource = "&SOURCE_ORGNO=" + document.all["h_sourceorgno"].value;
	        Page_BlockSubmit = true;
	        var strURL = "../../../ODDEP/ODI260.aspx?pDocNo=" + document.all["tbDOC_NO"].value + strSource;
	        jf_OpenChildWin(strURL, "ODI260", "1024", "768");
	        break;
	}
}

function ClientOnLoad()
{

	//1000573	Jeff	當承辦人職稱欄位值為空時才做讀取動作
	if(jf_Trim(document.all.txTitle.value)=="")
		getTitle();
	
    //95.12.14 955218 David
    //2016.03.20   CLOUD   1050087 升級二代
	//jf_CallWS("AKM399.asmx","btGetStockNo",false,null);
	
	//SetComBoBoxTabIndex();
	if (document.all["tbCOM_NO"].value=="")
	{
		//1060930	Kevin_C	1060860	修正CHROME點擊Disabled CheckBox無法觸發onblur的問題
		//document.all["cbComNo"].disabled=true;
		document.getElementById("cbComNo").style.pointerEvents = "none";
		document.getElementById('cbComNo').style.opacity = "0.4";
		document.all["cbComNo"].checked = false;
		if (document.all.txFileComboSeq)//Matte 0961022 001504
		{
			document.all["txFileComboSeq"].readOnly = true;
			document.all["txFileComboSeq"].className = "DisplayOnly";
		}
	}
	else
	{
		//1060930	Kevin_C	1060860	修正CHROME點擊Disabled CheckBox無法觸發onblur的問題
		//document.all["cbComNo"].disabled=false;
		document.getElementById("cbComNo").style.pointerEvents = "";
		document.getElementById('cbComNo').style.opacity = "1";
		
		//[0970153]Modify by Cola 僅第一次ClientOnload時才設定母文相關隱藏欄位		
		//0971126	Leslie[0971045]	修正判斷邏輯，以避免第二次設定併件時，只會帶出前次處理過的併件母文
		//if (document.all["H_FirstCheck"].value != "1")
		if(!document.all["AKI811_COM"])
		{		
			//document.all["H_FirstCheck"].value = "1";
			//Add by Cola clientonload存入母文文號	
			var  strArrData =  new Array();
		    //1070830 Zen 1070678 弱掃Ajax修正
			//strArrData = AKM330.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');
			strArrData = AK.AKM330_MOCS.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');
			document.all.htxFileYear.value = strArrData[0];
			document.all.htxFileCls.value = strArrData[1];
			document.all.htxFileCase.value = strArrData[2];
			document.all.htxFileVol.value = strArrData[3];
			document.all.htxFileSeq.value = strArrData[4];	
			//1030327 Eileen [1030162] 新增判斷有勾選併件時，才將母文的分類號鍵值放至隱藏欄位 -- start
			/*document.all.htxClsKey.value  = strArrData[5];*/
			if (document.all.cbComNo.checked)
				document.all.htxClsKey.value  = strArrData[5];
			//Eileen -- end			
			document.all.htxCaseKey.value = strArrData[6];
			DeptNo						  = strArrData[7];
			document.all.htxDocFileType.value	= strArrData[8];
			if (document.all.htxDocFileType.value == "")//justin 0941111 預設紙本檔案
				document.all.htxDocFileType.value = "1";
			uDeptName							= strArrData[9];
			document.all.htxKeepYaer.value		= strArrData[10];
			document.all.hdlSECRET.innerText		= strArrData[11];
			document.all.hdlRmvSec_Cond.innerText = strArrData[12];
		    //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
			document.all.htxVerNo.value = strArrData[13];
		    //1110811 Cloud 1110418 增加取得母文另存密件流水號
			document.all.hMSecSeq.value = strArrData[14];
		    //1110831 Cloud 1110875 增加紀錄併件母文入庫保管日期
			document.all.hMStoreDate.value = strArrData[15];
		}				
	}
	
	//2008.11.07 Marked by Cola 不應在Clientonload每次均觸發onblur，此舉會造成畫面值與資料庫值可能不同之情形
	//DlOnBlur("dlSECRET");
	
	//0950109 justin fix:若由AKT710變更解密日期，則解密日期就不是由收文日+保密年限算出
	//if (document.all["tbExtRmvSec_Date"].value == "")
	//	TbOnChange("txKeepSecYear");

	document.all.dlFILE_DOC.Enabled = false;				 
	document.all.dlFILE_DOC.CssClass = "DisplayOnly";
	ShowMsg();
	
	//0960806	Leo	[國合會]開啟子文時要提示訊息
	//[0960193]Modify By Cola 新增判斷一隱藏欄位 - 此欄位於open後被設定為1 ，以此來判斷此次clientonload是否於剛剛執行完btopen -- start --
	if(document.all["btOpenChecker"].value == "1" && document.all["AKM330_SHOW_CHILD_ALERT"].value == "Y" && document.all.tbCOM_NO.value !="" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)
	{
		alert("本文為子文!");
	}
	
	document.all["btOpenChecker"].value = "0";	
	//Cola -- end --
	
	//TbOnBlur("tbCLS");
	//TbOnBlur("tbCASE");
	//* 2019.03.06	Cloud	1081109	akm330開啟非當前啟用版本的公文時，版本別會空白，增加行為，開啟時判斷版本別空白時，透過年度取得
	if (document.all["tbVerNo"].value == "" && document.all["tbYEAR"].value != "")
	{
		CurrentObjId = "tbYEAR";
		jf_GetClassVer("Year");
	}
	
	//[0970248]Add by Cola 新增記錄原板別+分類號+鍵值
	OriginVer_Cls = document.all["tbVerNo"].value+document.all["tbCLS"].value;
	OriginVer_ClsKey = document.all["htxClsKey"].value;
	// 2012.05.25	Cloud	1010369	當併案提示功能開啟、且沒有勾選併件功能時，才跳出警示訊息
	if(document.all.AK_AKM330_FILESET_MSG.value == "Y")
	{
		if(document.all.AKM330_DefaultComStatus.value == "Y")
		{
		    document.all.cbComNo.checked = true;
		    //1110811 Cloud 1110418 增加同步密件流水號-S
		    if (document.all.dlSECRET.selectedIndex >= 2) {
		        document.all["btSecSeq"].disabled = true;
		        document.all["txSecSeq"].disabled = true;
		        document.all.txSecSeq.style.backgroundColor = "LightGrey";
		        document.all["txSecSeq"].value = document.all.hMSecSeq.value;
		    }
		    //1110811 Cloud 1110418 增加同步密件流水號-E
			
		}
		if(document.all.cbComNo.checked && document.all.tbDOC_NO.value!="" && document.all.tbCOM_NO.value!="")//併件選項勾起時直接判斷是否更新子文檔號
		{
			CbOnClick("cbComNo");
		}
		else//當沒有啟用自動勾選功能時判斷案次號
		{
			if(document.all.AK_AKM330_FILESET_MSG.value == "Y" && document.all.tbDOC_NO.value!="" && document.all.tbCOM_NO.value!="")
			{	
				CheckComFileSeq();
			}
		}
	}
    //* 2021.01.27	Cloud	1091010	[中榮]提供原始承辦單位欄位供維護
    //1110811 Cloud 1110414 改以系統參數判斷
    //if (document.all["tbOrgNickName"].value == "TVGH")
	if (document.all["USE_ODETP_INFO"].value == "Y")
    	document.all["OdeptInfo"].className = "";
    else
	    document.all["OdeptInfo"].className = "hide";
    //1110826 Cloud 1110875、1110876 控制顯示編目日期、入庫保管日期-S
	if (document.all["OrgNickName"].value == "EXAM")
	    document.all["InpStoreDate"].className = "";
	else
	    document.all["InpStoreDate"].className = "hide";
    //1110826 Cloud 1110875、1110876 控制顯示編目日期、入庫保管日期-E
    //1111113 Cloud 為初次個人檔開啟且為PERSONCASEMAIN無資料時，跳出是否立案詢問
	if (document.all["PerNoInp"] && document.all["PerNoInp"].value == "Y")
	{
	    //檢核該姓名是否已立案
		//2022.12.22	Cloud	1110899	歷史資料可能沒有四角號碼、身分證、姓名，避免誤撈增加判斷皆為空白則不進行撈取
		if(document.all["txPerFullID"].value!="")
			//1120807	Cloud	因更名問題修正僅用身分證撈取不夠-增加姓名
			//ClientGetPerSonInfo(document.all["txPerFullID"].value, "");
			ClientGetPerSonInfo(document.all["txPerFullID"].value, document.all["txFullName"].value);
		else
		{
			if(document.all["txPerID"].value!="" && document.all["txFullName"].value!="")
				ClientGetPerSonInfo(document.all["txPerID"].value, document.all["txFullName"].value);
		}
	}
    //個人檔不提供編卷鈕
	if (document.all["tbCLS"].value == "11")
	    document.all["btAutoVol"].disabled = true;

}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}

function ClientButtonControl(e)
{
	if(!IsServerHandling)
	{ 
		var xObjectName = e.target.id;
		
		if ((xObjectName != "btExit") && (xObjectName != "btExitImg"))
		{
			if(jf_IsTimeOut())
			{
				Page_BlockSubmit=true;
				return;
			}
		}

		var ret;

		switch (xObjectName)
		{
			//95.11.15 955195 David
			case "btComSearch":
				Page_BlockSubmit = false;
				//95.12.08 955218 David 藥檢局驗收
			    //jf_ToolBarSubmit();
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
				IsServerHandling = true;
				__doPostBack("btComSearch","");
				break;
			case "btMode":
				Page_BlockSubmit = true;
				jf_SwitchModeButton();
				break;
			case "btSecSeq"://取得密件流水號
				Page_BlockSubmit = true;
				if (jf_Trim(document.all["txSecSeq"].value)!="")
					return;//問題單：094789 密件流水號已有值就不再要號
				if (document.all["tbCrtDate"].value=="") 
				{
					alert("文件產生日期空白，無法編密件另存流水號");
					return;
				}
				
				if (document.all["tbFDATE"].value=="" && document.all["tbIDATE"].value=="" && document.all["tbCDATE"].value=="") 
				{
				    alert("來文日期、發文日期、辦畢日期請至少輸入一項");
                    //1060321 Cloud 1050087 升級二代
					//document.all["tbFDATE"].focus();
					return;
				}
				if(document.all.AKM330_AutoSeqMode.value != "1")
				{
				    //1060321 Cloud 1050087 升級二代
					/*var UseType = new Array(1);
					UseType[0] = "20";
					var UseYear = new Array(1);
					UseYear[0] = document.all.txSysDate.value.substring(0,3);
					strYear = UseYear[0];//年度號+保存年限
					var NoLen = new Array(1);
					NoLen[0] = 5;
					var AddZero = new Array(1);
					AddZero[0] = 1;	*/
				
					var param = new Array(5);
					param[0] = document.all["tbOrgNo"].value;
				    //1060321 Cloud 1050087 升級二代
					/*param[1] = UseType;
					param[2] = UseYear;
					param[3] = NoLen;
					param[4] = AddZero;		*/
					param[1] = "20";
					param[2] = strYear = document.all.txSysDate.value.substring(0, 3);
					param[3] = 5;
					param[4] = 1;		
					
                    //1050901   Kenny   [1050801]   調整取密件另存流水號叫用的webService
					//RtnObj =Self_CallWS("template/lib/sys.asmx","Get_AutoNo1",false,param);
					//1061128	Cloud	[1061179] 修正呼叫方式
                    //RtnObj =Self_CallWS("lib/AK_LIB.asmx","Get_AutoNo1",false,param);
					RtnObj =jf_CallW("lib/AK_LIB.asmx","Get_AutoNo1",false,param);
					
					iCallID_Num_SecSeq = RtnObj.id;
					OnWSResult(RtnObj);
				}
				else
				{
				    //1060321 Cloud 1050087 升級二代
					/*var UseYear = new Array(1);
					UseYear[0] = document.all.tbCrtDate.value.substring(0,3);
					strYear = UseYear[0];//年度號+保存年限
					var NoLen = new Array(1);
					NoLen[0] = 5;
					var AddZero = new Array(1);
					AddZero[0] = 1;	*/
				
					var param = new Array(4);
					//1060724 Cloud  修正使用錯誤參數
					/*param[0] = document.all.SessionID.value;
					param[1] = document.all["tbOrgNo"].value;*/
					param[0] = document.all["tbOrgNo"].value;
					param[1] = strYear = document.all.tbCrtDate.value.substring(0,3);
				    //1060321 Cloud 1050087 升級二代
					/*param[2] = UseYear;
					param[3] = NoLen;*/
					//1060724 Cloud  修正使用錯誤參數
				    //param[2] = 5;
					//1060724 Cloud  修正使用錯誤參數
					//param[2] = strYear = document.all.tbCrtDate.value.substring(0,3);
					//param[3] = 5;
					param[2] = 5;
				
					RtnObj =Self_CallWS("lib/AK_LIB.asmx","GetSecSeq",false,param);
					iCallID_Num_SecSeq = RtnObj.id;
					OnWSResult(RtnObj);				
				}	
				break;
			case "btAutoNum"://取得附件編號
							
				if (document.all["tbATT_SEQ"].value=="")
				{
					if (document.all["tbYEAR"].value=="")
					{
						if (document.all["tbCrtDate"].value!="")
							document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
						else
						{
						    alert("年度號欄位不可為空白");
                            //1060321 CLOUD 1050087 升級二代
						    //document.all["tbYEAR"].focus();
						    $("#tbYEAR")[0].focus()
							Page_BlockSubmit = true;
							break;
						}
					}
					if (document.all["ATTACH_LENGTH"].value!="")
					{
					    //1060321 Cloud 1050087 升級二代
						/*var UseType = new Array(1);
						UseType[0] = "12";
						var UseYear = new Array(1);
						//UseYear[0] = document.all["tbYEAR"].value;
						if (!isNaN(document.all["tbKeep_Year"].value))//先檢查保存年限是否為數字(有可能為"?")
						{
							if (document.all["tbYEAR"].value.substr(0,1) == "0")//年度第一位為0因paserInt會直接轉成0來計算故需排除
								UseYear[0] = jf_PADL((parseInt(document.all["tbYEAR"].value.substr(1,2))+
														parseInt(document.all["tbKeep_Year"].value)).toString(),3,"0");
							else
								UseYear[0] = parseInt(document.all["tbYEAR"].value)+
									parseInt(document.all["tbKeep_Year"].value);
						}
						else
							UseYear[0] = document.all["tbYEAR"].value;
						strRcvYear = UseYear[0];//年度號+保存年限
						UseYear[0] = document.all["tbYEAR"].value+UseYear[0];//用年度號+(年度號+保存年限)來從No_Ctrl要號
						var NoLen = new Array(1);
						NoLen[0] = parseInt(document.all["ATTACH_LENGTH"].value,10);
						var AddZero = new Array(1);
						AddZero[0] = 1;	*/
						
						var param = new Array(5);
						param[0] = document.all["tbOrgNo"].value;
					    //1060321 Cloud 1050087 升級二代
						/*param[1] = UseType;
						param[2] = UseYear;
						param[3] = NoLen;
						param[4] = AddZero;		*/
						param[1] = "12";
						var UseYear = "";
						if (!isNaN(document.all["tbKeep_Year"].value))//先檢查保存年限是否為數字(有可能為"?")
						{
						    if (document.all["tbYEAR"].value.substr(0,1) == "0")//年度第一位為0因paserInt會直接轉成0來計算故需排除
						        UseYear = jf_PADL((parseInt(document.all["tbYEAR"].value.substr(1,2))+
														parseInt(document.all["tbKeep_Year"].value)).toString(),3,"0");
						    else
						        UseYear = parseInt(document.all["tbYEAR"].value)+
									parseInt(document.all["tbKeep_Year"].value);
						}
						else
						    UseYear = document.all["tbYEAR"].value;
						strRcvYear = UseYear;//年度號+保存年限
						param[2] = document.all["tbYEAR"].value+UseYear;
						param[3] = parseInt(document.all["ATTACH_LENGTH"].value, 10);;
						param[4] = 1;		
						
						RtnObj =Self_CallWS("template/lib/sys.asmx","Get_AutoNo",false,param);
						iCallID_Num = RtnObj.id;
						OnWSResult(RtnObj);
					}
				}
				Page_BlockSubmit = true;
				break;
			case "btAutoVol":
				Page_BlockSubmit = true;

                //1090902 Zen 1090580 修正異動檔號後未onblur直接點擊儲存時，可略過檢核寫錯誤資料至[FILE_MAIN]問題
            	//* 2021.05.06   Cloud   1090580 AKM330有開放檔管人員可維護保存年限，但1090580增加儲存前的ONBLUR後，造成每次儲存就恢復預設值問題
            	//* 2021.08.17	Cloud	1100873	修正儲存後密件公文應解密日期一直被重設問題-觸發編卷會觸發ONBLUR-此段不需要
                /*bGetKeyBeforeSave = true;
                TbOnBlur("tbVerNo");
                TbOnBlur("tbYEAR");
                TbOnBlur("tbCLS");
                TbOnBlur("tbCASE");*/
            	//* 2021.05.06   Cloud   1090580 AKM330有開放檔管人員可維護保存年限，但1090580增加儲存前的ONBLUR後，造成每次儲存就恢復預設值問題
            	//* 2021.08.17	Cloud	1100873	修正儲存後密件公文應解密日期一直被重設問題-觸發編卷會觸發ONBLUR-此段不需要
            	//bGetKeyBeforeSave = false;

				if(document.all.cbComNo.checked && document.all.tbCOM_NO.value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)
				{
						//[---]Add by Cola 判斷參照之文號有無編目日期，若無，則跳出警告訊息 -- start --
				    //1070830 Zen 1070678 弱掃Ajax修正
				    //var tmp = AKM330.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
				    var tmp = AK.AKM330_MOCS.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
						if (jf_Trim(tmp) == "")
						{
							alert('輸入之參照文號尚未完成編目，請先開啟欲參照之公文文號進行編目，才可繼續處理。');
							return;
						}
	
					//Cola -- end --				
					//將隱藏的檔號帶至畫面上
					document.all.tbYEAR.value = document.all.htxFileYear.value;
					document.all.tbCLS.value = document.all.htxFileCls.value;
					document.all.tbCASE.value = document.all.htxFileCase.value;
					document.all.tbVOL.value = document.all.htxFileVol.value;
					document.all.tbSEQ.value = document.all.htxFileSeq.value;
				    //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
					document.all.tbVerNo.value = document.all.htxVerNo.value;
				    //1060321 CLOUD 1050087 升級二代
				    //document.all.tbSEQ.focus();
					$("#tbSEQ")[0].focus();
					return;
				}
				
				if(!ChkEFileVolNo())
				{
					if(document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value =="2") //電子檔案
						alert("電子檔案的卷次號必須以 " + document.all.INIT_EVOLNO.value + " 開頭，請確認卷次號後再重新編卷");
					else	
					    alert("紙本檔案的卷次號不可以 " + document.all.INIT_EVOLNO.value + " 開頭，請確認卷次號後再重新編卷");
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["tbVOL"].focus();
					$("#tbVOL")[0].focus();
					Page_BlockSubmit = true;
					return;
				}
				    //* 2022.06.09   Cloud   1110520 補強紙本公文編卷僅能用純數字-S
				else {
				    if (document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value == "1") //紙本檔案
				    {
				        var regex = /^[0-9\s]*$/;
				        if (!regex.test(document.all.tbVOL.value)) {
				            alert('紙本檔案的卷次號僅能使用數字。');
				            $("#tbVOL")[0].focus();
				            Page_BlockSubmit = true;
				            return;
				        }
				    }
				}
			    //* 2022.06.09   Cloud   1110520 補強紙本公文編卷僅能用純數字-E
				
				if (document.all["tbVOL"].value!="" && document.all["tbSEQ"].value!="")
				{
				    alert("已編卷，不能自動編卷");
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["tbSEQ"].focus();
				    $("#tbSEQ")[0].focus();
					Page_BlockSubmit = true;
					return;
				}

				if (document.all["tbVOL"].value=="" && document.all["tbSEQ"].value!="")
				{
				    alert("目次號有值且卷次號為空白，系統無法自動編卷");
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["tbSEQ"].focus();
				    $("#tbSEQ")[0].focus();
					Page_BlockSubmit = true;
					return;
				}

				if (document.all["tbCLS"].value=="")
				{
				    alert("分類號欄位不可空白");
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["tbCLS"].focus();
				    $("#tbCLS")[0].focus();
					Page_BlockSubmit = true;
					return;
				}
				
				if (document.all["tbYEAR"].value=="")
				{
					if (document.all["tbCrtDate"].value!="")
						document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
					else
					{
					    alert("年度號欄位不可為空白");
					    //1060321 CLOUD 1050087 升級二代
					    //document.all["tbYEAR"].focus();
					    $("#tbYEAR")[0].focus();
						Page_BlockSubmit = true;
						break;
					}
				}
				
				if (document.all["tbCASE"].value=="")
				{
					var param1 = new Array(3);
					//950426 Charles 修正呼叫WS參數順序錯誤，應是VerNo、CLS、YEAR
					//1051205   Kenny   [1051150]   修改Client Potential Code Injection--Start--
                    //param1[0] = document.all["tbVerNo"].value;
                    //param1[1] = document.all["tbCLS"].value;
                    //param1[2] = document.all["tbYEAR"].value;
                    param1[0] = encodeURI(document.all["tbVerNo"].value);
                    param1[1] = encodeURI(document.all["tbCLS"].value);
                    param1[2] = encodeURI(document.all["tbYEAR"].value);
                    //1051205   Kenny   [1051150]   修改Client Potential Code Injection--End--
					RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCLS",false,param1);
					iCallID_CLS1 = RtnObj.id;
					OnWSResult(RtnObj);
				}
				else
					IsGetCase=true;
					
				if (IsGenCase)
				{
					//可使用通案
					IsGenCase=false;
					//0940913 justin 若有單位預設案次號則以單位預設案次號為主
					if (document.all["DEPT_CASE"].value == "")
					{
						if (document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value=="")
						{
							alert("密等欄位不可空白，");
							//document.all["tbSecret"].focus();
						    //1010307 1010201 Cloud tbSecret欄位已不使用，修正成dlSECRET
						    //1060321 CLOUD 1050087 升級二代
						    //document.all["dlSECRET"].focus();
						    $("#dlSECRET")[0].focus();
							Page_BlockSubmit = true;
							break;
						}
						else
						{
							IsGetCase=true;
							////document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value
							if (parseInt(document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value,10)>1)
								document.all["tbCASE"].value = document.all["INITS_FILENO"].value;
							else
								document.all["tbCASE"].value = document.all["INIT_FILENO"].value;
						}
					}
					else
					{
						IsGetCase=true;
						document.all["tbCASE"].value = document.all["DEPT_CASE"].value;
					}
				}
				if(IsGetCase)
				{
					//通案檢查case_main是否有資料
					//GetCaseYear();
				}
				else
				{
					//非通案檢查case_main 是否有資料
				}									
				if (IsGetCase)
				{
					//自動編卷
					IsGetCase=false;
					//* 2015.11.20	Cloud	1040629	補上會有機關沒案次號需進行一下ONLBUR取得KEY值
					if(document.all["tbCASE"].value!="")
						document.all["tbCASE"].onblur();
					if (document.all["tbYEAR"].value=="" || document.all["tbCASE"].value=="")
					{
						alert("請提供完整的檔號(年度號、分類號、案次號)");
						if (document.all["tbYEAR"].value=="")
						    //1060321 CLOUD 1050087 升級二代
						    //document.all["tbYEAR"].focus();
						    $("#tbYEAR")[0].focus();
						else
						    //1060321 CLOUD 1050087 升級二代
						    //document.all["tbCASE"].focus();
						    $("#tbCASE")[0].focus();
					}
					else
					{
						/*if (document.all["tbVOL"].value!="" || document.all["tbSEQ"].value!="")
						{
							if (window.confirm("編卷作業將覆蓋目前檔號"))
								wsGetVolSeq();
						}
						else*/
						if (document.all["tbCNT"].value == "")
						{
						    //1060321 CLOUD 1050087 升級二代
						    //document.all["tbCNT"].focus();
						    $("#tbCNT")[0].focus();
							jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["檔案數量"])),"");
						}
						else
						{
							//if(document.all["tbVOL"].value)
							wsGetVolSeq();
						}
					}
				}
				Page_BlockSubmit = true;
				break;
			case "btOTHER_OBJECT"://其他案由 AKM332
				var pUrl = "";
				//0950504 Charles 傳案由最大字元數到AKM322以供儲存檢查
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM332.aspx?k1="+document.all["tbDOC_NO"].value + "&MaxSubLen=" + document.all["txMaxSubLen"].value;
				//2014.12.12 Gabby 修正串入權杖時符號使用錯誤
				//pUrl = "AKM332.aspx?k1="+document.all["tbDOC_NO"].value + "&MaxSubLen=" + document.all["txMaxSubLen"].value+"?SAMLart="+GetParam("SAMLart");
				//* 2022.08.26   Cloud   1110875、1110876 開啟並列案由時，增加串入供子視窗判斷是否顯示來文主旨
				//pUrl = "AKM332.aspx?k1="+document.all["tbDOC_NO"].value + "&MaxSubLen=" + document.all["txMaxSubLen"].value+"&SAMLart="+GetParam("SAMLart");
				pUrl = "AKM332.aspx?k1=" + document.all["tbDOC_NO"].value + "&MaxSubLen=" + document.all["txMaxSubLen"].value + "&SAMLart=" + GetParam("SAMLart") + "&ShowFrom=" + document.all["H_SHOWFROM"].value;
				jf_OpenChildWin(pUrl,"AKM332",750,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btISS_NO"://來發受文者明細 AKM333
				var pUrl = "",pk2="",pk3="";
				pk2=document.all["tbFNAME"].value;
				pk3=document.all["tbINAME"].value;			
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM333.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+encodeURI(pk2)+"&k3="+encodeURI(pk3);
				//2014.12.12 Gabby 修正串入權杖時符號使用錯誤
				//pUrl = "AKM333.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+encodeURI(pk2)+"&k3="+encodeURI(pk3)+"?SAMLart="+GetParam("SAMLart");
				pUrl = "AKM333.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+encodeURI(pk2)+"&k3="+encodeURI(pk3)+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM333",750,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btATT_INFO"://附件資訊 AKM336
				var pUrl = "";
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM336.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+document.all["tbCrtDate"].value+"&k3="+document.all["h_signType"].value;
				//2014.12.12 Gabby 修正串入權杖時符號使用錯誤
				//pUrl = "AKM336.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+document.all["tbCrtDate"].value+"&k3="+document.all["h_signType"].value+"?SAMLart="+GetParam("SAMLart");
				pUrl = "AKM336.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+document.all["tbCrtDate"].value+"&k3="+document.all["h_signType"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM336",900,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btSUBJECT"://主題項 AKM338
				var pUrl = "";
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM338.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value;
				//2014.12.12 Gabby 修正串入權杖時符號使用錯誤
				//pUrl = "AKM338.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"?SAMLart="+GetParam("SAMLart");
				pUrl = "AKM338.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM338",750,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btREM"://附註項 AKM339
				var pUrl = "";
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM339.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value;
				// 2014.12.12 Gabby 修正串入權杖時少"&SAMLart="字串問題
				//pUrl = "AKM339.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+GetParam("SAMLart");
				pUrl = "AKM339.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM339",750,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			// 分類案次查詢子視窗

			case "ibtCLS":
				var pUrl = "";
				//pUrl = "AKC320.aspx?k1="+document.all["tbCLS"].value+"&argYear="+document.all["tbYEAR"].value;
				EAC005 = "CLS";
				//[0970679]Add by Cola 因為是由AK開啟EA，因此必需額外傳入SamLart，EA才可正確取得userInfo資訊
				pUrl = "../../EA/EA01/EAC005.aspx?FILE_CLS="+document.all["tbCLS"].value+"&FILE_YEAR="+document.all["tbYEAR"].value+"&MODE=1&nFrom=AKM330&VER_NO="+document.all["tbVerNo"].value+"&SAMLart="+GetParam("SAMLart");
				//open(pUrl);
				jf_OpenChildWin(pUrl,"EAC005",750,500);
				Page_BlockSubmit = true;
				break;			
			case "ibtCASE":
				var pUrl = "";
				//pUrl = "AKC320.aspx?k1="+document.all["tbCLS"].value+"&argYear="+document.all["tbYEAR"].value;
				EAC005 = "CASE";
				//[0970679]Add by Cola 因為是由AK開啟EA，因此必需額外傳入SamLart，EA才可正確取得userInfo資訊
				pUrl = "../../EA/EA01/EAC005.aspx?FILE_CLS="+document.all["tbCLS"].value+"&FILE_YEAR="+document.all["tbYEAR"].value+"&MODE=2&nFrom=AKM330&VER_NO="+document.all["tbVerNo"].value+"&SAMLart="+GetParam("SAMLart");
				//open(pUrl);
				jf_OpenChildWin(pUrl,"EAC005",750,500);
				Page_BlockSubmit = true;
				break;
			//0960910 Caesar 增加櫥位號查詢子視窗
			case "ibtSTOCKNO":
				var pUrl = "";
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM330C4.aspx?k1="+document.all["tbYEAR"].value+"&k2="+document.all["tbCLS"].value;
				//2014.12.12 Gabby 修正串入權杖時少"&SAMLart="字串問題
				//pUrl = "AKM330C4.aspx?k1="+document.all["tbYEAR"].value+"&k2="+document.all["tbCLS"].value+GetParam("SAMLart");
				pUrl = "AKM330C4.aspx?k1="+document.all["tbYEAR"].value+"&k2="+document.all["tbCLS"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM330C4",450,400);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btFileInfo"://電子檔案資訊 AKM334
				var pUrl = "";
				// 2014.09.01	Cloud	配合NLB架構，修改開啟子視窗時皆串入權杖
				//pUrl = "AKM334.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value;
				//2014.12.12 Gabby 修正串入權杖時少"&SAMLart="字串問題
				//pUrl = "AKM334.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+GetParam("SAMLart");
				pUrl = "AKM334.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM334",750,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "GetIssueNo"://將發文字及發文號存至發文字號欄位
				jf_GetIssueNo();
				Page_BlockSubmit = true;
				break;
			//[0960446]Add by Cola 新增來文字+來文號之Button功能
			case "GetFromNo":
				jf_GetFromNo();
				Page_BlockSubmit = true;
				break;
			default:
			//if(CompareFlag==false)
				Page_BlockSubmit = true;
		}
	}
	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
		Page_BlockSubmit = true;
}
function CheckNumDuplicate(argNum){
	//* 2017.11.28	Cloud	1061179	配合弱掃，調整原部分使用CheckDataKeyDuplicate函式檢核唯一值邏輯
	/*var arKeyName = new Array(3);
	arKeyName[0] = "SOURCE_ORGNO";
	arKeyName[1] = "ATT_SEQ";
	arKeyName[2] = "DOC_NO!";
	var arKeyValue = new Array(3);
	arKeyValue[0] = document.all["tbOrgNo"].value;
	arKeyValue[1] = argNum;
	arKeyValue[2] = document.all["tbDOC_NO"].value;
	
	var arWSParam = new Array(3);
	arWSParam[0] = "DOC_MAIN";
	arWSParam[1] = arKeyName;
	arWSParam[2] = arKeyValue;
	
	RtnObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	if(jf_IsWebServiceSuccess(RtnObj))
	{
		WSResult = RtnObj.value;
		return WSResult.RtnBool;
	}*/
	var KeyName = new Array(2);
	KeyName[0] = "SOURCE_ORGNO";
	KeyName[1] = "ATT_SEQ";
	var KeyValue = new Array(2);
	KeyValue[0] = document.all["tbOrgNo"].value;
	KeyValue[1] = argNum;
	var RtnFldName = new Array(1);
	RtnFldName[0] = "DOC_NO";
	var OrdFldName = new Array(1);
	OrdFldName[0] = "DOC_NO";

	var param = new Array(5);
	param[0] = "DOC_MAIN";
	param[1] = KeyName;
	param[2] = KeyValue;
	param[3] = RtnFldName;
	param[4] = OrdFldName;

	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);
	if (RtnObj.value == null || RtnObj.value.RtnField0[0] == "true")
		return true;
	else
	{
		for(iDoc=0;iDoc<RtnObj.value.RtnField0.length;iDoc++)
		{
			if(RtnObj.value.RtnField0[iDoc]==document.all["tbDOC_NO"].value)
				return true;
		}
	}
	return false;	
}

function GetNum()
{
    //1060321 Cloud 1050087 升級二代
	/*var UseType1 = new Array(1);
	UseType1[0] = "12";
	var UseYear1 = new Array(1);
	//UseYear1[0] = document.all["tbYEAR"].value;
	UseYear1[0] = document.all["tbYEAR"].value+strRcvYear
	var NoLen1 = new Array(1);
	NoLen1[0] = parseInt(document.all["ATTACH_LENGTH"].value,10);;
	var AddZero1 = new Array(1);
	AddZero1[0] = 1;	*/
	
	var param1 = new Array(5);
	param1[0] = document.all["tbOrgNo"].value;
    //1060321 Cloud 1050087 升級二代
	/*param1[1] = UseType1;
	param1[2] = UseYear1;
	param1[3] = NoLen1;
	param1[4] = AddZero1;		*/
	param1[1] = "12";
	param1[2] = document.all["tbYEAR"].value + strRcvYear;
	param1[3] = parseInt(document.all["ATTACH_LENGTH"].value, 10);
	param1[4] = 1;		
	
	RtnObj =Self_CallWS("template/lib/sys.asmx","Get_AutoNo",false,param1);
	iCallID_Num1 = RtnObj.id;
	OnWSResult(RtnObj);
}

function CheckDateCompare(obj_id,obj_name,Compare_obj_id,Compare_obj_name)
{
	if(document.all[obj_id].value!="" && document.all[Compare_obj_id].value!="")
	{
		if(document.all[obj_id].value>document.all[Compare_obj_id].value)
		{
			var errorMsg = obj_name + "不可大於" + Compare_obj_name;
			Page_BlockSubmit = true;
			alert(alertTitle+"\n"+errorMsg);
			return false;
		}
		else
			return true;
	}
	else
		return true;
	
}

function before_save()
{
	var pNOT_ALLOW_EMPTY = false;
	var pHeadLine ="";
	var pIsValid = true;
	var pMsg="";
	var IsYear=false;
	var CheckSeqVol = "";//MATTE 0960507 000291
	
	
	if (document.all["tbSEQ"].value != "") 
	{
		pHeadLine ="目次號有值,則以下欄位不可空白:\n";
		pNOT_ALLOW_EMPTY = true;
		IsYear=true;
	}

	
	if (document.all["tbVOL"].value == "") 
	{
		if (pNOT_ALLOW_EMPTY)
		{
			pMsg = pMsg + "檔號 － 卷號\n";
			if(pIsValid) 
			{
			    //1060321 CLOUD 1050087 升級二代
			    //document.all("tbVOL").focus();
			    $("#tbVOL")[0].focus();
				pIsValid = false;
			}
		}
	}
	else
	{
		if(!pNOT_ALLOW_EMPTY) pHeadLine ="卷號有值,則以下欄位不可空白:\n";
		pNOT_ALLOW_EMPTY = true;
		IsYear=true;
	}
	
	if (document.all["tbCASE"].value == "") 
	{
		if (pNOT_ALLOW_EMPTY)
		{
			pMsg = pMsg + "檔號 － 案號\n";
			if(pIsValid) 
			{
			    //1060321 CLOUD 1050087 升級二代
			    //document.all("tbCASE").focus();
			    $("#tbCASE")[0].focus();
				pIsValid = false;
			}
		}
	}
	else
	{
		if(!pNOT_ALLOW_EMPTY) pHeadLine ="案號有值,則以下欄位不可空白:\n";
		pNOT_ALLOW_EMPTY = true;
	}


	if  (document.all["tbCLS"].value == "") 
	{
		if (pNOT_ALLOW_EMPTY)
		{
			pMsg = pMsg + "檔號 － 分類號\n";
			if(pIsValid) 
			{
			    //1060321 CLOUD 1050087 升級二代
			    //document.all("tbCLS").focus();
			    $("#tbCLS")[0].focus();
				pIsValid = false;
			}
		}
	}
	if  (document.all["tbYEAR"].value == "") 
	{
		if (pNOT_ALLOW_EMPTY && IsYear)
		{
			pMsg = pMsg + "檔號 － 年度號\n";
			if(pIsValid) 
			{
			    //1060321 CLOUD 1050087 升級二代
			    //document.all("tbYEAR").focus();
			    $("#tbYEAR")[0].focus();
				pIsValid = false;
			}
		}
	}
 
	//MATTE 0960507 000291
	if(document.all["tbSEQ"].value == "000")
	{	
	    CheckSeqVol = CheckSeqVol + "目次號 值為000 " + "編卷 請從001起\n";
	    //1060321 CLOUD 1050087 升級二代
	    //document.all["tbSEQ"].focus();
	    $("#tbSEQ")[0].focus();
		pIsValid = false;
	}
	if(document.all["tbVOL"].value == "0000")
	{	
	    CheckSeqVol = CheckSeqVol + "卷次號 值為0000 " + "編卷 請從0001起\n";
	    //1060321 CLOUD 1050087 升級二代
	    //document.all["tbVOL"].focus();
	    $("#tbVOL")[0].focus();
		pIsValid = false;
	}//
 
	if (pNOT_ALLOW_EMPTY) {
	    if (pMsg != "")
	        alert(alertTitle + "\n" + pHeadLine + CheckSeqVol + pMsg);
	    //MATTE 0960507 000291
	    if (pMsg == "" && CheckSeqVol != "")
	        //1060321 CLOUD 1050087 升級二代
	        //document.all["tbCASE"].focus();
	        $("#tbCASE")[0].focus();
	    //
	}
	
	//0950504 Charles 檢查案由是否超過最大字元數
	var iMaxSubLen = parseInt(document.all["txMaxSubLen"].value);
	//0970727	Howard	0980402	修正案由檢核以字數計算
	//var iCurrSubLen = 0;
	var strSubject = document.all["tbSUB"].value;
	var iCurrSubLen = strSubject.length;
	if(iMaxSubLen > 0)
	{
		//0970727	Howard	0980402	修正案由檢核以字數計算
		//for(var i=0; i<strSubject.length; i++)
		//	strSubject.charCodeAt(i)<256?iCurrSubLen++:iCurrSubLen+=2;
		if(iCurrSubLen > iMaxSubLen)
		{
			////0970727	Howard	0980402	修正案由檢核以字數計算
			//alert("案由可輸入最大長度為" + iMaxSubLen + "字元，目前輸入長度為" + iCurrSubLen + "字元，請修正後再重新儲存。");
		    alert("案由可輸入最大字數為" + iMaxSubLen + "字，目前輸入字數為" + iCurrSubLen + "字，請修正後再重新儲存。");
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbSUB"].focus();
		    $("#tbSUB")[0].focus();
			pIsValid = false;
		}
	}
	
	return pIsValid;
}

//不可空白欄位檢查
function Check_NOT_Allow_Empty_Field()
{
	var fr = document.all;
	var pIsValid = true;
	var pStr ="";
	if (fr.tbDOC_NO.value == "")
	{	
		pStr = pStr + "公文文號\n";
		if (pIsValid)
		    //1060321 CLOUD 1050087 升級二代
		    //fr.tbDOC_NO.focus();
		    $("#tbDOC_NO")[0].focus();
		pIsValid = false;
	}
	
	if (fr.tbKeep_Year.value == "")
	{
		pStr = pStr + "保存年限\n";
		if (pIsValid)
		    //1060321 CLOUD 1050087 升級二代
		    //fr.tbKeep_Year.focus();
		    $("#tbKeep_Year")[0].focus();
		pIsValid = false;

	}
	
	if (fr.tbSUB.value == "")
	{	
		pStr = pStr + "案由\n";
		    //1060321 CLOUD 1050087 升級二代
		if (pIsValid) //fr.tbSUB.focus();
		$("#tbSUB")[0].focus();
		pIsValid = false;
	}
	// 2017.04.19	Cloud	1060210 增加取得公文點收流程再判斷儲存時是否需要結案日期
	//if (fr.tbCDATE.value == "")
	if (fr.CheckCloase != null && fr.tbCDATE.value == "")
	{	
		pStr = pStr + "辦畢日期\n";
		    //1060321 CLOUD 1050087 升級二代
		//if (pIsValid) fr.tbCDATE.focus();
		if (pIsValid) 
		$("#tbCDATE")[0].focus();
		pIsValid = false;
	}
	
	// 附件序,附件名稱,儲位有值時,附件名稱,附件媒體型式,附件數量,附件單位不可為空白
	/* t
	if(document.all["tbAtt_SL"].value!="" || document.all["tbAtt_SName"].value!="" || document.all["tbATT_SEQ"].value!="")
	{
		if(document.all["tbAtt_SName"].value=="" || document.all["dlAttMedia"].options[document.all["dlAttMedia"].selectedIndex]=="" || 
		document.all["tbAttCNT"].value=="" || document.all["dlAttUNIT"].options[document.all["dlAttUNIT"].selectedIndex]=="")
		{
			pStr += "附件序,附件名稱,儲位有值時, 下列欄位不可為空白:\n"
			if(document.all["tbAtt_SName"].value=="")
			{
				pStr += "附件名稱\n";
				if (pIsValid) document.all["tbAtt_SName"].focus();
				pIsValid=false;
			}
			if(document.all["dlAttMedia"].options[document.all["dlAttMedia"].selectedIndex].text=="")
			{
				pStr += "附件媒體型式\n";
				if (pIsValid) document.all["dlAttMedia"].focus();
				pIsValid=false;
			}
			if(document.all["tbAttCNT"].value=="")
			{
				pStr += "附件數量\n";
				if (pIsValid) document.all["tbAttCNT"].focus();
				pIsValid=false;
			}
			if(document.all["dlAttUNIT"].options[document.all["dlAttUNIT"].selectedIndex].text=="")
			{
				pStr += "附件單位\n";
				if (pIsValid) document.all["dlAttUNIT"].focus();
				pIsValid=false;
			}
		}
	}
	*/

	//if ((fr.tbFNAME.value == "" || fr.tbFDATE.value == "" || fr.tbFNO.value == "") && (fr.tbFNAME.value != "" || fr.tbFDATE.value != "" || fr.tbFNO.value != ""))
	if ((fr.tbFNAME.value == "" || fr.tbFDATE.value == "") && (fr.tbFNAME.value != "" || fr.tbFDATE.value != ""))
	{
		var HasMsg=true;
		pStr = pStr + "來文資訊：";
		if (document.all["tbFNAME"].value=="")
		{
			pStr+="來文者欄位";
			
			HasMsg=false;
			
			if (pIsValid)
			{//1060321 CLOUD 1050087 升級二代
			    //document.all["tbFNAME"].focus();
			    $("#tbFNAME")[0].focus();
			}
			
			pIsValid=false;
		}
		if (document.all["tbFDATE"].value=="")
		{
			if (HasMsg)
				pStr+="來文日期欄位";
			else
				pStr+="，來文日期欄位";
			
			HasMsg=false;
			
			if (pIsValid)
			{
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbFDATE"].focus();
			    $("#tbFDATE")[0].focus();
			}
			
			pIsValid=false;
		}
		/*
		// caesar 0940513
		// 工單單號:0940225[MTAC940019]
		// 有來文者來文日期不一定會有來文字號,取消來文字號檢核程式碼
		if (document.all["tbFNO"].value=="")
		{
			if (HasMsg)
				pStr+="來文字號欄位";
			else
				pStr+="，來文字號欄位";
			
			HasMsg=false;
			
			if (pIsValid)
			{document.all["tbFNO"].focus();}
			
			pIsValid=false;
		}
		*/
		pStr+="不可空白\n";
	}
	
	if ((fr.tbINAME.value == "" || fr.tbIDATE.value == "" || fr.tbINO.value == "") && (fr.tbINAME.value != "" || fr.tbIDATE.value != "" || fr.tbINO.value != ""))
	{
		var HasMsg=true;
		var pIEStr="";

		if (document.all["tbINAME"].value=="")
		{
			pIEStr+="發文者欄位";
			
			HasMsg=false;
			
			if (pIsValid)
			{
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbINAME"].focus();
			    $("#tbINAME")[0].focus();
			}
			
			pIsValid=false;
		}

		//文別為簽、便簽時，可不輸入發文日期、發文字號
		//if(fr.dlDOC_CATEGORY_Text.value != "簽" && fr.dlDOC_CATEGORY_Text.value != "便簽")

		/*if(document.all["dlDOC_CATEGORY"].options[document.all["dlDOC_CATEGORY"].selectedIndex].value != "5" && 
	       document.all["dlDOC_CATEGORY"].options[document.all["dlDOC_CATEGORY"].selectedIndex].value != "Z4" &&)*/

		//David	95.06.19
		var szDocCategoryNoList = fr.AKM330_NonCheckDocCategoryNo.value;
		var szDocCategoryNoArr = szDocCategoryNoList.split(';');
		var i=0;
		var checkFlag = false;
		
		//David	95.06.19
		//如果使用者所選的文別為簽,便簽或非屬以上各種時,則checkFlag設為true
		for(i;i<szDocCategoryNoArr.length;i++)
		{
            //1070731   Kevin_C 1070716 修正檢核邏輯
		    //if(document.all["dlDOC_CATEGORY"].options[document.all["dlDOC_CATEGORY"].selectedIndex].value != szDocCategoryNoArr[i])
		    if (document.all["dlDOC_CATEGORY"].options[document.all["dlDOC_CATEGORY"].selectedIndex].value == szDocCategoryNoArr[i])
			{
				checkFlag = true;
				break;
			}
		}

	    	//David	95.06.19
	    	//checkFlag為false,表示使用者沒有選擇簽,便簽,或非屬以上各種
	    	//所以必須檢核發文相關資訊
	    	if(checkFlag == false)   
		{
			if (document.all["tbIDATE"].value=="")
			{
				if (HasMsg)
					pIEStr+="發文日期欄位";
				else
					pIEStr+="，發文日期欄位";
				
				HasMsg=false;
				
				if (pIsValid)
				{
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["tbIDATE"].focus();
				    $("#tbIDATE")[0].focus();
				}
				
				pIsValid=false;
			}
			if (document.all["tbIssueNo"].value=="")
			{
				if (HasMsg)
					pIEStr+="發文字號欄位";
				else
					pIEStr+="，發文字號欄位";
				
				HasMsg=false;
				
				if (pIsValid)
				{
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["tbINO"].focus();
				    $("#tbINO")[0].focus();
				}
				
				pIsValid=false;
			}
		}

		if (!HasMsg)
		{
			pIEStr = "發文資訊："+pIEStr;
			pStr = pStr + pIEStr+ "不可空白\n";
		}
				
	}
	
	if (fr.tbFNAME.value == "" && fr.tbFDATE.value == "" && fr.tbFNO.value == "" && fr.tbINAME.value == "" && fr.tbIDATE.value == "" && fr.tbINO.value == "")
	{
		//950212 David 95.06.19
		//修正AKM330儲存時不檢核來文資訊或發文資訊不可皆為空白之文號清單
		//修正目前採用文字及代碼兩部份->改為採用代碼
		var bCheck =true;
		var nIndex = fr.dlDOC_CATEGORY.selectedIndex;
		var nSelectedDocCategoryNo ="";
		if(nIndex!=-1)
		    nSelectedDocCategoryNo = fr.dlDOC_CATEGORY.options[nIndex].value;
	    //1111207 Cloud 1110859 koda系統公文可能沒有文別，會造成誤判
		if (document.all["rbKoda"].checked == true && nSelectedDocCategoryNo == "")
		{ bCheck = true; }
		else
		{
		    if (fr.AKM330_NonCheckDocCategoryNo.value != "") {
		        var szDocCategoryList = fr.AKM330_NonCheckDocCategoryNo.value;
		        var szDocCategoryArr = szDocCategoryList.split(';');
		        for (i = 0; i < szDocCategoryArr.length; i++) {
		            if (nSelectedDocCategoryNo == szDocCategoryArr[i]) {
		                bCheck = false;
		                break;
		            }
		        }
		    }
		    if (bCheck) {
		        pStr = pStr + "來文資訊或發文資訊不可皆為空白\n";
		        if (pIsValid) {
		            //1060321 CLOUD 1050087 升級二代
		            //fr.tbFNAME.focus();		
		            $("#tbFNAME")[0].focus();
		        }
		        pIsValid = false;
		    }
		}
	}

	//* 2013.11.07	Cloud	1020885	配合台科大強制點收功能，AKM330用途為修改基資非編目時不檢核文件產生日期
	//2013.11.26 Cloud 修正未考量歷史資建檔情況問題-不會有document.all.DocState欄位
	
	if(document.all.DocState)
	{
		if(parseInt(document.all.DocState.value)>08)
		{
			if (fr.tbCrtDate.value == "")
			{
				pStr = pStr + "文件產生日期\n";
				if (pIsValid)
				    //1060321 CLOUD 1050087 升級二代
				    //fr.tbCrtDate.focus();
				    $("#tbCrtDate")[0].focus();
				pIsValid = false;
			}
		}
	}
	//* 2021.09.01	Cloud	1100871	修正文件產生日檢核邏輯不同及未依法規帶出文件產生日問題
	else//新增模式不會有DocState-依法規，文件產生日為必要，故一律檢核
	{

			if (fr.tbCrtDate.value == "")
			{
				pStr = pStr + "文件產生日期\n";
				if (pIsValid)
				    //1060321 CLOUD 1050087 升級二代
				    //fr.tbCrtDate.focus();
				    $("#tbCrtDate")[0].focus();
				pIsValid = false;
			}		
	}
	
	if (fr.dlSECRET.value == "")
	{
		pStr = pStr + "密等\n";
		if (pIsValid)
		    //1060321 CLOUD 1050087 升級二代
		    //fr.dlSECRET.focus();
		    $("#dlSECRET")[0].focus();
		pIsValid = false;

	}
	

	if(document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value > "1" )
	{
		//[001600]Cola取消dlRmvSecCode / txKeepSecYear欄位
		//95.11.01 David 漁業屬解密條件不合理，修改
		//17.1→解密條件、解密期限、解密日期皆為空白才檢核
		//17.3→解密條件、解密期限、解密日期其中唯一空白就檢核
		//目前修改→(解密條件(下拉)、(Combo))與解密期限皆為空白才檢核
		if (  jf_Trim(document.all["dlRmvSec_Cond"].options[document.all["dlRmvSec_Cond"].selectedIndex].value) == ""&&
			  jf_Trim(document.all["dlRmvSec_Cond_Text"].value) == "") 
		{
		   
		   
	     
			if(jf_Trim(document.all["dlRmvSec_Cond"].options[document.all["dlRmvSec_Cond"].selectedIndex].value) =="" &&
			   jf_Trim(document.all["dlRmvSec_Cond_Text"].value) == "")
			{
				pStr = pStr + "解密條件\n";
				if (pIsValid)
				    //1060321 CLOUD 1050087 升級二代
				    //fr.dlRmvSec_Cond_Text.focus();
				    $("#dlRmvSec_Cond_Text")[0].focus();
				pIsValid = false;
			}
								
			/*if(jf_Trim(document.all.txKeepSecYear.value)=="")
			{
				pStr = pStr + "保密期限\n";
				if (pIsValid) fr.txKeepSecYear.focus();
				pIsValid = false;
			}*/			
		}
		/*
		if ( (document.all["dlRmvSecCode"].options[document.all["dlRmvSecCode"].selectedIndex].value=="") &&
		     ( jf_Trim(document.all.txKeepSecYear.value)=="") &&
		     (document.all.tbRmvSec_Date.value=="")
		   )
		*/
/*		if ( (document.all["dlRmvSecCode"].options[document.all["dlRmvSecCode"].selectedIndex].value=="") ||
		     ( jf_Trim(document.all.txKeepSecYear.value)=="")
		   )
	     {
			if(document.all["dlRmvSecCode"].options[document.all["dlRmvSecCode"].selectedIndex].value=="")
			{
				pStr = pStr + "解密條件\n";
				if (pIsValid) fr.dlRmvSecCode.focus();
				pIsValid = false;
			}
		
			if(jf_Trim(document.all.txKeepSecYear.value)=="")
			{
				pStr = pStr + "保密期限\n";
				if (pIsValid) fr.txKeepSecYear.focus();
				pIsValid = false;
			}*/

			/*2004-07-29 取消
			if(jf_Trim(document.all.tbRmvSec_Date.value)=="")
			{
				pStr = pStr + "解密日期\n";
				if (pIsValid) fr.txKeepSecYear.focus();
				pIsValid = false;
			}
			*/
		//}
	}

	if (fr.tbDATA_TYPE.value!="RE")
	{
	    //* 1111207  Cloud   1110859 KODA系統以下不檢核
	    if (document.all["rbEDoc"].checked == true) {
	        if (fr.dlDOC_CATEGORY.options[fr.dlDOC_CATEGORY.selectedIndex].value == "") {
	            pStr = pStr + "文別\n";
	            if (pIsValid)
	                //1060321 CLOUD 1050087 升級二代
	                //fr.dlDOC_CATEGORY.focus();
	                $("#dlDOC_CATEGORY")[0].focus();
	            pIsValid = false;
	        }

	        //if(fr.dlTYPE_Text.value == "")
	        if (fr.dlTYPE.options[fr.dlTYPE.selectedIndex].value == "") {
	            pStr = pStr + "本別\n";
	            if (pIsValid)
	                //1060321 CLOUD 1050087 升級二代
	                //fr.dlTYPE.focus();
	                $("#dlTYPE")[0].focus();
	            pIsValid = false;
	        }


	        /*
            if(fr.dlMedia_Text.value == "")
            {
                pStr = pStr + "媒體型式\n";
                if (pIsValid) fr.dlMedia_Text.focus();
                pIsValid = false;
            }
            
            if(fr.tbCNT.value == "")
            {
                pStr = pStr + "數量\n";
                if (pIsValid) fr.tbCNT.focus();
                pIsValid = false;
            }
            
            if((fr.dlUNIT.selectedIndex == 0) ||(fr.dlUNIT.selectedIndex == -1))
            {
                pStr = pStr + "計量單位\n";
                if (pIsValid) fr.dlUNIT.focus();
                pIsValid = false;
            }
            */

	        //if(fr.dlKEEPSTATE_Text.value == "")
	        if (fr.dlKEEPSTATE.options[fr.dlKEEPSTATE.selectedIndex].value == "") {
	            pStr = pStr + "保存狀況\n";
	            if (pIsValid)
	                //1060321 CLOUD 1050087 升級二代
	                //fr.dlKEEPSTATE.focus();
	                $("#dlKEEPSTATE")[0].focus();
	            pIsValid = false;
	        }
	    }
	}
	
	//1000713 Davy [1000129] 檢核紙本來文併同歸檔數量
	if(fr.dlIsRcvfile.selectedIndex == 1)
	{
		if(fr.txRcvfileCnt.value == "")
		{
			pStr = pStr + "紙本來文併同歸檔為「是」時，數量不可為空白。\n";
			if (pIsValid)
			    //1060321 CLOUD 1050087 升級二代
			    //fr.txRcvfileCnt.focus();
			    $("#txRcvfileCnt")[0].focus();
			pIsValid = false;
		}
		else if(fr.txRcvfileCnt.value == "0")
		{
			pStr = pStr + "紙本來文併同歸檔為「是」時，數量不可為0。\n";
			if (pIsValid)
                //1060321 CLOUD 1050087 升級二代
			    //fr.txRcvfileCnt.focus();
			    $("#txRcvfileCnt")[0].focus();
			pIsValid = false;
		}
	}
    //* 2022.12.07   Cloud   1110859     增加檢核收創文日不可為空
	if (fr.tbRDATE.value == "") {
	    pStr = pStr + "收創文日期\n";
	    if (pIsValid)
	        $("#tbRDATE")[0].focus();
	    pIsValid = false;
	}
	
	if (pStr != "")
	{
		pStr = "以下欄位不可為空白:\n" + pStr;
		alert(alertTitle+"\n"+pStr);
		pIsValid = false;
	}


	/*if (pIsValid) 
	{
		if (fr.tbCDATE.value > fr.tbFRDATE.value)
		{
			jf_ShowMeg("結案日期不可大於實歸檔日期",alertTitle);
			fr.tbCDATE.focus();
			pIsValid = false;
		}
	}*/


	return  pIsValid;
}

function Self_CallWS(argService, argFunName, argAsync, argParam)
{
    //2016.03.20   CLOUD   1050087 升級二代
	/*var callObj = new Object();
    callObj.funcName = argFunName;      // Name of the remote function.
    callObj.async = argAsync;         // A Boolean that specifies the type of call
    callObj.timeout = 5;         // Timeout for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";  
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	//in order to avoid the service unavailable problem
	//conver the service to uppercase cause the uppercase service is invoked
	//when this page is onloaded, the 2nd invocation of this web service will success
	argService = argService.toUpperCase();
	if( document.all.service == null)
		return;
	if( document.all.SessionID == null )
		return;
    service.useService(argService+"?WSDL","Serv");
 
  
	if (argParam == null)
       callID = service.Serv.callService(callObj );
       else if (argParam[0] == null)
       callID = service.Serv.callService(callObj ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9]);
	if(!argAsync)
	{
		if( FirstInvokeWS )
			return callID;
	}
	
	return callID;*/
    return jf_CallWS(argService, argFunName, argAsync, argParam);
}

function wsGetVolSeq()
{
    //2016.03.20   CLOUD   1050087 升級二代
	/*var KeyValue2 = new Array(1);
	KeyValue2[0] = document.all["tbYEAR"].value;
	var KeyValue3 = new Array(1);
	KeyValue3[0] = document.all["htxClsKey"].value;//justin 0941114 改為CLS_KEY
	var KeyValue4 = new Array(1);
	//2015.07.29	Cloud	1040629	調整編目時取得編卷效能-改為CASE_KEY
	//KeyValue4[0] = document.all["tbCASE"].value;
	KeyValue4[0] = document.all["htxCaseKey"].value;
	var KeyValue5 = new Array(1);
	if(jf_Trim(document.all["tbVOL"].value) !="")
		document.all["tbVOL"].value = jf_PADL(document.all["tbVOL"].value, 4, "0");
	KeyValue5[0] = document.all["tbVOL"].value;
	var KeyValue6 = new Array(1);
	KeyValue6[0] = document.all["dlDocFileType"].options[document.all.dlDocFileType.selectedIndex].value;
	var KeyValue7 = new Array(1);
	KeyValue7[0] = document.all["tbCNT"].value;
	//95.12.04 950941 David
	var KeyValue8 = new Array(1);
	KeyValue8[0] = document.all["tbDOC_NO"].value;
	//var param2 = new Array(6);
	var param2 = new Array(7);
	param2[0] = KeyValue2;
	param2[1] = KeyValue3;
	param2[2] = KeyValue4;
	param2[3] = KeyValue5;
	param2[4] = KeyValue6;
	param2[5] = KeyValue7;
	//95.12.04 950941 David
	param2[6] = KeyValue8;*/
    var param2 = new Array(7);
    param2[0] = document.all["tbYEAR"].value;
    param2[1] = document.all["htxClsKey"].value;
    param2[2] = document.all["htxCaseKey"].value;
    if(jf_Trim(document.all["tbVOL"].value) !="")
        document.all["tbVOL"].value = jf_PADL(document.all["tbVOL"].value, 4, "0");
    param2[3] =document.all["tbVOL"].value;
    param2[4] = document.all["dlDocFileType"].options[document.all.dlDocFileType.selectedIndex].value;
    param2[5] = document.all["tbCNT"].value;
    param2[6] = document.all["tbDOC_NO"].value;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetMaxVolSeq",false,param2);
	iCallID_Vol = RtnObj.id;
	OnWSResult(RtnObj);
}

function OpenWindow(argUrl)
{
	var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,toolbar=no,resizeable=yes";//,fullscreen=no";
	uChildWinHandle=open(argUrl,null,gChidkWinStyle);
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKM330C1")
	{
		if(document.all["lbReturnValue"].length==3)
		{	
			if (document.all["lbReturnValue"].options[1].value != "")
				document.all["txCaseName"].value=document.all["lbReturnValue"].options[1].value;
			if (document.all["lbReturnValue"].options[2].value != "")
				document.all["htxCaseKey"].value=document.all["lbReturnValue"].options[2].value;
		}
		IsOpenAKM330C1 = false;
	}
	/*
	if (argCallerId=="AKM332")
	{
	}
	if (argCallerId=="AKM333")
	{
	}*/
	if (argCallerId=="AKM336")
	{
		//附件媒體型式
		/*for(var i=0;i<document.all["dlAttMedia"].length;i++)
		{
			if (document.all["dlAttMedia"].options[i].text==document.all["lbReturnValue"].options[0].value)
			{
				document.all["dlAttMedia"].selectedIndex=i;
				break;
			}
		}
		//附件數量單位
		for(var i=0;i<document.all["dlAttUNIT"].length;i++)
		{
			if (document.all["dlAttUNIT"].options[i].value==document.all["lbReturnValue"].options[0].text)
			{
				document.all["dlAttUNIT"].selectedIndex=i;
				break;
			}
		}*/
	}
	else if(argCallerId=="EAC005")
	{
		if (EAC005 == "CLS")
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["tbCLS"].value = document.all["lbReturnValue"].options[1].value;
				//* 2019.03.06	Cloud	1081109	修改支援版本/年度互轉，修正子視窗回傳值設定不正確問題，調整取得分類號ws皆為getcls
				document.all["tbVerNo"].value = document.all["lbReturnValue"].options[0].value;
				document.all["htxClsKey"].value = document.all["lbReturnValue"].options[4].value;
				TbOnBlur("tbCLS");
			}
		}
		else
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["tbCASE"].value=document.all["lbReturnValue"].options[2].value;
				if(document.all["lbReturnValue"].options[0].value!="")
					document.all["tbYEAR"].value=document.all["lbReturnValue"].options[0].value;
				document.all["htxCaseKey"].value = document.all["lbReturnValue"].options[3].value;
				//* 2019.03.06	Cloud	1081109	修改支援版本/年度互轉，修正子視窗回傳值設定不正確問題，調整取得分類號ws皆為getcls
				document.all["tbVerNo"].value = document.all["lbReturnValue"].options[5].value;
				document.all["tbCLS"].value = document.all["lbReturnValue"].options[1].value;
				document.all["htxClsKey"].value = document.all["lbReturnValue"].options[4].value;
				TbOnBlur("tbCASE");
			}		
		}
	}	
	else if(argCallerId=="AKM330C2")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			var strWAITFILEDOC = "";

			document.all.dlFILE_DOC.Enabled = true;				 
			document.all.dlFILE_DOC.CssClass = "";
			
			document.all["dlFILE_DOC"].length = document.all["lbReturnValue"].length;
			for(var intI = 0; intI < document.all["lbReturnValue"].length; intI++)
			{
				document.all.dlFILE_DOC.options[intI].text = document.all.lbReturnValue.options[intI].text;
				document.all.dlFILE_DOC.options[intI].value = document.all.lbReturnValue.options[intI].value;
				strWAITFILEDOC = strWAITFILEDOC + "|" + document.all.lbReturnValue.options[intI].text;
			}
			document.all.dlFILE_DOC.selectedIndex=0;			
			document.all.txWAITFILEDOC.value = strWAITFILEDOC;
			document.all.tbDOC_NO.value = document.all.lbReturnValue.options[0].text;
			document.all.txDocNoChange.value = document.all.tbDOC_NO.value;
			
			DlOnBlur('dlFILE_DOC');
			//__doPostBack("dlFILE_DOC","");
			//Page_BlockSubmit=false;
			//jf_OpenButtonSubmit();
		}
	}
	else if(argCallerId=="AKM330C3")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all.tbDOC_NO.value = document.all.lbReturnValue.options[0].text;
			document.all.txDocNoChange.value = document.all.tbDOC_NO.value;
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			__doPostBack("","");
		}
	}
	else if(argCallerId=="AKM330C4")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all.txStockNo.value = document.all.lbReturnValue.options[0].text;
		}
	}

	
	if(document.all["lbReturnValue"].options!=null)
		document.all["lbReturnValue"].options.length = 0;
	
	/*if (argCallerId=="AKM338")
	{
	}
	if (argCallerId=="AKM339")
	{
	}*/
}

var IsRight=false;
var IsGenCase=false;
var IsGetCase=false;
var IsDuplicate=true;
var IsCls=false;
var strSeq = "";
var iCallID_ChkUserDocPriv = null;

function OnWSResult(argResult)
{
    var WSResult;
	var ErrMsg = "";
	if(argResult.id == iCallID_ChkUserDocPriv)
	{
		if(argResult.error)
			return;
		
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				strStoreNo = WSResult.RtnStr;
			}
		}
	}
	
	if(argResult.id == iCallID_DEPT_ISU) //發文者
    {
		if(argResult.error)
		{
			alert(argResult.errorDetail.string);
			return;
		}

		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
			    document.all["tbINO"].value = WSResult.RtnField0[0];
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbIDATE"].focus();
			    $("#tbIDATE")[0].focus();
			}
			else
                //1060321 CLOUD 1050087 升級二代
			    //document.all["tbIDATE"].focus();
			    $("#tbIDATE")[0].focus();
		}
    }
    if(argResult.id == iCallID_CLS)  //分類號 onblur
    {
		IsCls=false;
		if (jf_IsWebServiceSuccess_AKM330(argResult)) {
		    WSResult = argResult.value;
		    WSResult = argResult.value;
		    document.all["txClsName"].value = WSResult.ClsName;
		    document.all["htxClsKey"].value = WSResult.CLS_KEY;
		    document.all["tbVerNo"].value = WSResult.VerNo;
		    
		    var arrFileNo = document.all.OtxFullFileNo.value.split('|');
		    //1100817 Cloud 1100873 判斷當前畫面跟隱藏欄位版本+分類變動，帶入預設值後，跳出訊息
		    var strAltMsg = "分類號已異動，以下欄位將依新分類號資訊更新，請確認後再進行儲存：";
		    var strColumn = "";
		    //* 2022.06.28   Cloud   1110371 交通部序3 修改分類號未異動onblur時協助帶出年度號、如異動後onblur不跳提示訊息，配合修改純檔管線上瀏覽行為
		    if (document.all["tbVerNo"].value + "|" + document.all["tbCLS"].value != arrFileNo[0] + "|" + arrFileNo[2]) {
		        //2021.08.18 CLOUD 1100873-有變動分類號，皆提醒並視為停止儲存
		        bGetKeyBeforeSave = false;
		        if (WSResult.GenCase == "1") {
		            if (document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value != "") {
		                if (document.all["tbCASE"].value == "") {
		                    IsCls = true;
		                    //0940913 justin 若有單位預設案次號則以單位預設案次號為主
		                    if (document.all["DEPT_CASE"].value == "") {
		                        if (parseInt(document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value, 10) > 1)
		                            document.all["tbCASE"].value = document.all["INITS_FILENO"].value;
		                        else
		                            document.all["tbCASE"].value = document.all["INIT_FILENO"].value;
		                    }
		                    else
		                        document.all["tbCASE"].value = document.all["DEPT_CASE"].value;
		                    //1100817 Cloud 1100873 判斷當前畫面跟隱藏欄位版本+分類變動，帶入預設值後，跳出訊息
		                    strColumn += "案次號";
		                }
		            }
		        }
		        
		            document.all["tbKeep_Year"].value = WSResult.KeepYear;
		        
		            if (strColumn != "")
		                strColumn += "、保存年限";
		            else
		                strColumn += "保存年限";
		        

		        if (document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value == "") {
		            //document.all["tbApply_Limit"].value = WSResult.ApplyLimit;
		            for (var i = 0; i < document.all["dlAPPLYLIMIT"].length; i++) {
		                if (document.all["dlAPPLYLIMIT"].options[i].value == WSResult.ApplyLimit) {
		                    document.all["dlAPPLYLIMIT"].selectedIndex = i;
		                    break;
		                }
		            }
		            //1100817 Cloud 1100873 判斷當前畫面跟隱藏欄位版本+分類變動，帶入預設值後，跳出訊息
		            if (strColumn != "")
		                strColumn += "、應用限制";
		            else
		                strColumn += "應用限制";
		        }

		        if (document.all["tbCrtDate"].value != "") {
		            if (document.all["tbYEAR"].value == "")
		                document.all["tbYEAR"].value = document.all["tbCrtDate"].value.substring(0, 3);
		            if (!document.all["tbExtRmvSec_Date"].disabled) {
		                if (document.all["tbKeep_Year"].value == "" || document.all["tbKeep_Year"].value == "?")
		                { document.all["tbExtRmvSec_Date"].value = ""; }
		                else
		                {
		                    var str = document.all["tbKeep_Year"].value + "0000";
		                    var str1 = parseInt(document.all["tbCrtDate"].value, 10) + parseInt(str, 10);
		                    //[001600]Cola 若tbExtRmvSec_Date 原本已有值，則不更改
		                    if (document.all["tbExtRmvSec_Date"].value == "") {
		                        document.all["tbExtRmvSec_Date"].value = jf_PADL(str1.toString(), 7, "0");//[001600]Modify by Cola 需先將str1轉為string才可正常運作
		                        //1100817 Cloud 1100873 判斷當前畫面跟隱藏欄位版本+分類變動，帶入預設值後，跳出訊息
		                        if (strColumn != "")
		                            strColumn += "、應解密日期";
		                        else
		                            strColumn += "應解密日期";
		                    }
		                }
		            }
		        }
		    }
		    //1100817 Cloud 1100873 紀錄當前檔號
		    document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;

		    if (strColumn != "" && document.all["OrgNickName"].value != "MOTC")
		        alert(strAltMsg + strColumn);
		}
		else {
		    bGetKeyBeforeSave = false;
		    if (!(jf_Trim(document.all["txInpFileDate"].value) != "" && obj.ErrorClass.ErrMessage[0].indexOf("細分類") >= 0 && NotModifyCls && OriginVer_Cls == document.all["tbVerNo"].value + document.all["tbCLS"].value)) {
		        if (jf_Trim(document.all["txInpFileDate"].value) != "" && obj.ErrorClass.ErrMessage[0].indexOf("細分類") >= 0 && !ModifyCls && OriginVer_Cls == document.all["tbVerNo"].value + document.all["tbCLS"].value) {
		            //ModifyCls = true;
		            if (window.confirm("此份公文先前已使用非最下層分類號編目，是否要修正分類號？\n (確認代表是，取消代表否)")) {
		                ModifyCls = true;
		                $("#tbCLS")[0].focus();
		            }
		            else
		                NotModifyCls = true;
		        }
		            //其餘情形照舊	
		        else {
		            alert(obj.ErrorClass.ErrMessage[0]);
		            if (obj.ErrorClass.ErrMessage[0].indexOf("、") < 0) //除了不同版本有同分類號情況外一律清除資料 #2006.02.07 Andy
		            {
		                document.all["txClsName"].innerText = "";
		                document.all["txCaseName"].innerText = "";
		                document.all["tbCASE"].value = "";
		                document.all["tbVOL"].value = "";
		                document.all["tbSEQ"].value = "";
		                document.all["htxClsKey"].value = "";
		                document.all["htxCaseKey"].value = "";
		            }
		            flagtemp = false;
		            if (obj.ErrorClass.ErrMessage[0].substring(0, 3) == "年度號")

		                $("#tbYEAR")[0].focus();//年度號不正確

		            else if (obj.ErrorClass.ErrMessage[0].indexOf("、") >= 0)

		                $("#tbVerNo")[0].focus();
		            else

		                $("#tbCLS")[0].focus();
		            document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
		        }
		    }
		    else
		        document.all.htxClsKey.value = OriginVer_ClsKey;
		}
		if(document.all["tbVOL"].value == "")
			document.all["txVolTotalPage"].value = "";
    }
    if(argResult.id == iCallID_CLS1) //自動編卷
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			if (WSResult.GenCase=="1")
			{
				IsGenCase=true;
				IsGetCase=true;
			}
			else
			{
			    alert("不能使用通案");
			    $("#tbCASE")[0].focus();
			}
		}
		else
		    $("#tbCLS")[0].focus();
    }
    
    if(argResult.id == iCallID_CASE) //案次號 onblur
    {
		if(argResult.error)
		{
		    alert(argResult.errorDetail.string);
		    $("#tbCASE")[0].focus();
			return;
		}
		WSResult = argResult.value;
		if (WSResult.ErrorClass.ErrMessage.length != 0)  //有err
		{
		    document.all["txCaseName"].value = "";
		    document.all["htxCaseKey"].value = "";
		    document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
		    bGetKeyBeforeSave = false;
		    if (WSResult.ErrorClass.ErrMessage[0] == "無符合條件資料。") {
		        if (document.all["tbCASE"].value != document.all["INITS_FILENO"].value &&
                document.all["tbCASE"].value != document.all["INIT_FILENO"].value &&
                document.all["tbCASE"].value != document.all["DEPT_CASE"].value) {
		            if (document.all["tbDATA_TYPE"].value != "RE") {
		                if (!IsOpenAKM330C1) {
		                    if (window.confirm("輸入的案次號不存在，是否要線上立案?")) {
		                        var pUrl = "";
		                        pUrl = "AKM330C1.aspx?argCYR=" + document.all("tbYEAR").value + "&argCNO=" + document.all("tbCLS").value + "&argFNM=" + document.all("tbCASE").value;
		                        pUrl += "&argVER=" + document.all("tbVerNo").value; //增加傳入版本 #2006.11.24 Andy
		                        OpenWindow(pUrl);
		                        IsOpenAKM330C1 = true;
		                    }
		                }
		            }
		        }
		        else {

		            alert(WSResult.ErrorClass.ErrMessage[0]);
		            $("#tbCASE")[0].focus();
		        }
		    }
		    else {
		        alert(WSResult.ErrorClass.ErrMessage[0]);
		        $("#tbYEAR")[0].focus();
		    }
		}
		else {
		    //帶出案名
		    document.all.txCaseName.value = WSResult.CaseName;
		    document.all.htxCaseKey.value = WSResult.Key;

		    document.all.txCaseSecNo.value = WSResult.SecNo;
		    if (WSResult.CaseYear != "")
		        document.all.tbYEAR.value = WSResult.CaseYear;
		    document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
		}
    }
    if(argResult.id == iCallID_ComNo)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			var str = WSResult.ComType;
			if (str=="2")
			{
			    alert("輸入的併案文號為子文\n其母文為" + WSResult.Com_No + "，請重新輸入");
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbCOM_NO"].focus();
			    $("#tbCOM_NO")[0].focus();
			}
			else
			{
				//document.all["btCom"].disabled=false;
				IsRight=true;
			}
		}
		else
            //1060321 CLOUD 1050087 升級二代
		    //document.all["tbCOM_NO"].focus();
		    $("#tbCOM_NO")[0].focus();
    }
    if(argResult.id == iCallID_ComNo1)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			/* m 不立即帶至畫面
			if (document.all["tbCLS"].value=="")
			{
				document.all["tbCLS"].value = WSResult.RtnField1[0];
				document.all["tbCLS"].onblur();
			}
			*/
			document.all.htxFileYear.value		= WSResult.RtnField0[0];
			document.all.htxFileCls.value		= WSResult.RtnField1[0];
			document.all.htxFileCase.value		= WSResult.RtnField2[0];
			document.all.htxFileVol.value		= WSResult.RtnField3[0];
			document.all.htxFileSeq.value		= WSResult.RtnField4[0];
			//1030327 Eileen [1030162] 新增判斷有勾選併件時，才將母文的分類號鍵值放至隱藏欄位 -- start
			/*document.all.htxClsKey.value		= WSResult.RtnField5[0];*/
			//1060930	Kevin_C	1060860	紀錄母文的分類號鍵值
			strComClsKey 						= WSResult.RtnField5[0];
			if (document.all.cbComNo.checked)
				document.all.htxClsKey.value		= WSResult.RtnField5[0];
			//Eileen -- end
			document.all.htxCaseKey.value		= WSResult.RtnField6[0];
			DeptNo								= WSResult.RtnField7[0];
			document.all.htxDocFileType.value	= WSResult.RtnField8[0];
			if (document.all.htxDocFileType.value == "")//justin 0941111 預設紙本檔案
				document.all.htxDocFileType.value = "1";
			uDeptName							= WSResult.RtnField9[0];
			document.all.htxKeepYaer.value		= WSResult.RtnField10[0];  //Leo 0960530 001007 增加回傳KeepYear
			document.all.hdlSECRET.innerText		= WSResult.RtnField11[0];  //Leo 0960725 001007 增加回傳密等
			//document.all.hdlRmvSecCode.innerText	= WSResult.RtnField12[0];  //Leo 0960725 001007 增加回傳解密條件
			document.all.hdlRmvSec_Cond.innerText = WSResult.RtnField13[0];  //Leo 0960725 001007 增加回傳解密條件
		    //1110811 Cloud 1110418 增加回傳密件另存流水號
			document.all.hMSecSeq.value = WSResult.RtnField14[0];  //Leo 0960725 001007 增加回傳解密條件
		    //1110831 Cloud 1110875 增加取得入庫保管日期-S
			if (document.all["OrgNickName"].value == "EXAM") {
			    var strArrData = AK.AKM330_MOCS.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');
			    document.all.hMStoreDate.value = strArrData[15];
			}
		    //1110831 Cloud 1110875 增加取得入庫保管日期-E

		}
		else
		{
		    $("#tbCOM_NO")[0].focus();
			flagtemp=false;
		}
    }
    
   
    /*if(argResult.id == iCallID_Sys)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["tbCASE"].value = WSResult.RtnField0[0];
		}
		else
			document.all["tbCASE"].value = "";
    }*/
    if(argResult.id == iCallID_Vol)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["tbVOL"].value = WSResult.VolNo;
			document.all["tbSEQ"].value = jf_PADL(WSResult.SeqNo,3,"0");			
			//1020218	Jagle	[1011178]	增加目前使用總頁數欄位
			//1020408	Jagle	[1011178]	先判斷是否為空白再進行頁數計算、若為領務局則增加取得隔頁紙數目
			/*var strTotalPage = parseInt(document.all["tbCNT"].value) + parseInt(WSResult.VolPage);
			document.all["txVolTotalPage"].value = strTotalPage;
			if(document.all["txVolTotalPage"].value == "")
				document.all["txVolTotalPage"].value = "0";*/
			var strTotalPage;
			document.all.H_SepPage.value = "0";
			if(WSResult.VolPage != "")
			{
				VolPage = WSResult.VolPage;
				document.all.H_VolPage.value = VolPage;
				strTotalPage = parseInt(document.all["tbCNT"].value) + parseInt(WSResult.VolPage) + parseInt(SepPage);
			}
			else
			{
				VolPage = "0";
				document.all.H_VolPage.value = VolPage;
				strTotalPage = parseInt(document.all["tbCNT"].value)
			}
			document.all["txVolTotalPage"].value = strTotalPage;
			
			var strCP =  GetClearProcWord(WSResult.CLEAR_PROC)
			var strOCP =  GetClearProcWord(WSResult.OCLEAR_PROC)
			if(strCP != "")
			{
				document.all["txClearProc"].value = strCP;
				document.all["txClearProc"].title = strCP;
			}
			document.all["txOClearProc"].value = strOCP;
			document.all["txOClearProc"].title = strOCP;

			
			if(WSResult.ErrorClass.ErrMessage.length > 0 && WSResult.ErrorClass.ErrMessage[0] != "")
			{
				
				alert(WSResult.ErrorClass.ErrMessage[0]);
			}
			
			//95.11.27 950920 David 直接點選編卷，不會將案名帶至畫面上
			if(jf_Trim(document.all["tbVerNo"].value) != ""  && jf_Trim(document.all["tbCLS"].value) != "")
			{
                //1111120 Cloud 銓敘部個人檔另外處理
			    if (document.all["tbCLS"].value != "11") {
			        var param = new Array(5);
			        param[0] = document.all["tbYEAR"].value;
			        param[1] = document.all["tbCLS"].value;
			        param[2] = document.all["tbCASE"].value;
			        param[3] = "";
			        param[4] = document.all["tbVerNo"].value;

			        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
			        iCallID_CASE = RtnObj.id;
			        OnWSResult(RtnObj);
			    }
			    
			}
		}
    }
    if(argResult.id == iCallID_Num)
    {
		strSeq = strRcvYear+jf_PADL(argResult.value,6,"0");
		//檢查要到的附件序號是否有重複，若重複則繼續要號
		while (IsDuplicate) {
			if (CheckNumDuplicate(strSeq))
				GetNum();
			else
			{
				IsDuplicate=false;
				document.all["tbATT_SEQ"].value = strSeq;
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbATT_SEQ"].focus();
			    $("#tbATT_SEQ")[0].focus();
				//document.all["tbAtt_SName"].focus();
			}
		}
		IsDuplicate=true;
    }
    
    if(argResult.id == iCallID_Num1)
    {
		strSeq = strRcvYear+jf_PADL(argResult.value,6,"0");
    }

	//密件另存流水號    
    if(argResult.id == iCallID_Num_SecSeq)
    {
        document.all.txSecSeq.value = strYear + jf_PADL(argResult.value, 5, "0");
        //1060321 CLOUD 1050087 升級二代
        //document.all.txSecSeq.focus(); //for checking duplicate
        $("#txSecSeq")[0].focus(); //for checking duplicate
    }

	/*    
    if(argResult.id == iCallID_Emp)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//t document.all["tbDEPT"].value = WSResult.EmpDeptNo;
				//t document.all["tbDEPT"].onblur(); 
			}
			else
			{
				if (document.all["tbDATA_TYPE"].value!="RE")
				{
					alert("無此承辦人代號");
					//t document.all["tbEMP"].focus();
				}
			}
		}
    }

    if(argResult.id == iCallID_Dept)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsErr)
		{
			if (WSResult.ErrorClass.IsRedirect)
			{
			   document.location = "customErr.aspx";
			}
			else
			{
				if (WSResult.ErrorClass.ErrMessage[0].text!=jf_GetErrMsg(NoData))
				{
					alert(WSResult.ErrorClass.ErrMessage[0].text);
					document.all["tbDEPT"].focus();
				}
			}
			
		}
		else
		{
			document.all.dlEmp.options.length = 0;
			var pItem = new Option("","",false,false);
			document.all.dlEmp.options[document.all.dlEmp.options.length] = pItem;
			if (document.all["tbEMP"].value=="")
			{
				for(var i=0;i<WSResult.UserName.length;i++)
				{
					var pItem1 = new Option(WSResult.EmpName[i],WSResult.UserName[i],false,false);
					document.all.dlEmp.options[document.all.dlEmp.options.length] = pItem1;
				}
			}
			else
			{
				var ret=0;
				for(var i=0;i<WSResult.UserName.length;i++)
				{
					if (document.all["tbEMP"].value==WSResult.UserName[i])
						ret=i+1;
					var pItem1 = new Option(WSResult.EmpName[i],WSResult.UserName[i],false,false);
					document.all.dlEmp.options[document.all.dlEmp.options.length] = pItem1;
				}
				if (ret!=0)
					document.all["dlEmp"].selectedIndex=ret;
				else
				{
					for(var i=0;i<WSResult.UserName.length;i++)
					{
						if (document.all["tbEMP"].value==WSResult.EmpName[i])
						{
							document.all["tbEMP"].value=WSResult.UserName[i];
							ret=i+1;
							break;
						}
					}
					if (ret!=0)
						document.all["dlEmp"].selectedIndex=ret;
				}
			}
		}
    }
    */
    
    if(argResult.id == iCallID_Seq)
    {
    	// 2017.11.28	Cloud	1061179	配合弱掃，調整原部分使用CheckDataKeyDuplicate函式檢核唯一值邏輯
		/*if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			if (WSResult.RtnBool)
			{
			    alert("附件序號重複");
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbATT_SEQ"].focus();
			    $("#tbATT_SEQ")[0].focus();
			}
		}
		else*/
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbATT_SEQ"].focus();
		    //$("#tbATT_SEQ")[0].focus();
		if (argResult.value == null || argResult.value.RtnField0[0] == "true" || argResult.value.RtnField0[0] == document.all["tbDOC_NO"].value)
    	{
    		$("#tbATT_SEQ")[0].focus();
    	}
    	else
    	{
    		for (iDoc = 0; iDoc < RtnObj.value.RtnField0.length; iDoc++)
    		{
    			if (RtnObj.value.RtnField0[iDoc] != document.all["tbDOC_NO"].value)
    			{
    				alert("附件序號重複");
    				$("#tbATT_SEQ")[0].focus();
					document.all.tbATT_SEQ.value="";
    				break;
    			}
    		}
    	}
    }
    if(argResult.id == iCallID_SecSeq)
    {
    	// 2017.11.28	Cloud	1061179	修改密件流水編號檢核邏輯
		/*if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			if (WSResult.RtnBool)
			{
				alert("密件另存流水號重複");
				if (!document.all.txSecSeq.disabled)
				    //1060321 CLOUD 1050087 升級二代
				    //document.all["txSecSeq"].focus();
				    $("#txSecSeq")[0].focus();
				pSecSeqDuplicate = true;
			}
		}
		else
		{
		    if (!document.all.txSecSeq.disabled)
		        //1060321 CLOUD 1050087 升級二代
		        //document.all["txSecSeq"].focus();
		        $("#txSecSeq")[0].focus();
		}*/
		if (argResult.value.RtnField0==null || (argResult.value.RtnField0!=null &&  argResult.value.RtnField0[0] == "true"))
    	{
    	}
    	else
    	{
		    //1110907 Cloud 1110418 併件密件子文不檢核-S
		    if (document.all["tbCOM_NO"].value != "" && document.all["tbCOM_NO"].value != document.all["tbDOC_NO"].value && document.all["cbComNo"].checked)
		    {
		        return;
		    }
		    
		    //1110907 Cloud 1110418 併件密件母文，需取得子文出來比對
		    var SunDocList = "";
		    if (document.all["tbCOM_NO"].value != "" && document.all["tbCOM_NO"].value == document.all["tbDOC_NO"].value && document.all["cbComNo"].checked)
		    {
		        SunDocList = AK.AKM330_MOCS.GetSunDoc(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value;
		    }
    		for (iDoc = 0; iDoc < RtnObj.value.RtnField0.length; iDoc++)
    		{
    			if (RtnObj.value.RtnField0[iDoc] != document.all["tbDOC_NO"].value)
    			{
    			    //1110907 Cloud 1110418 併件密件母文，需取得子文出來比對-子文則跳過-S
    			    if (SunDocList != "")
    			    {
    			        if (SunDocList.indexOf(RtnObj.value.RtnField0[iDoc]) != -1)
    			            continue;
    			    }
    			    //1110907 Cloud 1110418 併件密件母文，需取得子文出來比對-子文則跳過-E
    				alert("密件另存流水號重複");
    				if (!document.all.txSecSeq.disabled)
					{
						document.all.txSecSeq.value="";
    					$("#txSecSeq")[0].focus();
					}	
    				pSecSeqDuplicate = true;
    				break;
    			}
    		}
    	}

    }
    
    
     if(argResult.id == iCallID_ComSeq)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			alert(WSResult);
		}
		else
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbCOM_NO"].focus();
		    $("#tbCOM_NO")[0].focus();
    }
        
     
    //95.10.12 950489 David
    //同步化二級科室
    if(argResult.id == CallWS_ID_SECT)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
		    //95.11.27 950489 David
            //1060321 Cloud 1050087 升級二代
		    //document.all["dlSect_Container"].className = "";
			//document.all["dlSect"].className = "";
			//document.all["dlSect_Text"].className = "";
			document.all["dlSect_Container"].className = "custom-combobox";
			document.all["dlSect"].className = "custom-combobox";
			document.all["dlSect_Text"].className = "custom-combobox";
			
			
			//95.11.27 950489 David
			document.all["dlSect_Text"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			
			var DropListChild = document.createElement("OPTION");
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dlSect.options.add(DropListChild);
			
			if(WSResult.SecNo.length != 0)
			{

				//[001209]Add by Cola -- start --
				ClearDL(document.all["dlSect"]);			
				
				var Blank_Data = document.createElement("OPTION");
				Blank_Data.text = "";
				Blank_Data.value = ":";				
				document.all.dlSect.options.add(Blank_Data);
				//Cola -- end --
											
				for(var i=0;i<WSResult.SecNo.length;i++)
				{
					var SectDropListChild = document.createElement("OPTION");
					SectDropListChild.text = WSResult.SecName[i];
					//0960084 Modify by Cola 為了與AK_LIB.CS中Function組出元素相同，額外新增兩欄位
					//SectDropListChild.value = WSResult.SecNo[i]+":"+WSResult.SecName[i];
					SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
					document.all.dlSect.options.add(SectDropListChild);
				}
				
				if(document.all["dlSect"].options.length > 10)
				{
					document.all["dlSect"].size = 10;
				}
				//1021217	Cloud	[1020985]	增加以撈回資料長度設定選單
				else
				{
					document.all["dlSect"].size = document.all["dlSect"].options.length;
				}
				SyncDL("NoSect2");
				document.all["dlSect_Container"].disabled = false;
				//SyncDL("dlSect");
			}
			else
			{				
				while(document.all.dlSect.options[0] != null)
				{
					document.all.dlSect.options[0]=null;				
				}	
				
				//95.11.27 950489 David
				document.all["dlSect_Container"].disabled = true;	
				SyncDL("NoSect1");
			}
		}				
    }
    
    //95.10.12 950489 David
    //同步化承辦人
    if(argResult.id == CallWS_ID_Emp1)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
			//95.11.27 950489 David
			document.all["dlEmp_Text"].value = "";
			
			while(document.all.dlEmp.options[0] != null)
			{
				document.all.dlEmp.options[0]=null;				
			}
			
			var DropListChild = document.createElement("OPTION");
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dlSect.options.add(DropListChild);
			
			if(WSResult.UserName.length != 0)
			{
				if(WSResult.UserName[0] != "false" && WSResult.UserName[WSResult.UserName.length-1] != "false")
				{

					//[001209]Add by Cola -- start --
					ClearDL(document.all.dlEmp);			
				
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "";
					Blank_Data.value = ":::";
					document.all.dlEmp.options.add(Blank_Data);
					//Cola -- end --
									
					for(var i=0;i<WSResult.UserName.length;i++)
					{
						var EmpDropListChild = document.createElement("OPTION");
						EmpDropListChild.text = WSResult.EmpName[i];
						EmpDropListChild.value = 
							document.all["txDeptNo_h"].value+":"+
							document.all["txSectNo_h"].value+":"+
							WSResult.UserName[i]+":"+
							WSResult.EmpName[i];
						document.all.dlEmp.options.add(EmpDropListChild);				
					}
					if(document.all["dlEmp"].options.length > 10)
					{
						document.all["dlEmp"].size = 10;
					}
					//1021217	Cloud	[1020985]	增加以撈回資料長度設定選單
					else
					{
						document.all["dlEmp"].size = document.all["dlEmp"].options.length;
					}
				}
			}
			else//0960084 Add by Cola若無此科別，則清空dlEmp資訊
			{
				if (document.all["dlSect_Text"].value !="")
					ClearDL(document.all.dlEmp);//add by cola
			}			
		}	
    }
    
      if(argResult.id == CallWS_ID_Emp2)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
			//95.11.27 950489 David
			document.all["dlEmp_Text"].value = "";
			
			while(document.all.dlEmp.options[0] != null)
			{
				document.all.dlEmp.options[0]=null;				
			}
			
			var DropListChild = document.createElement("OPTION");
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dlSect.options.add(DropListChild);
			
			if(WSResult.UserName.length != 0)
			{
				if(WSResult.UserName[0] != "false" && WSResult.UserName[WSResult.UserName.length-1] != "false")
				{
				

					//[001209]Add by Cola -- start --
					ClearDL(document.all.dlEmp);			
				
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "";
					Blank_Data.value = ":";				
					document.all.dlEmp.options.add(Blank_Data);
					//Cola -- end --				
					
					for(var i=0;i<WSResult.UserName.length;i++)
					{
						if(jf_Trim(WSResult.SectNo[i]) == "")
						{
							var EmpDropListChild = document.createElement("OPTION");
							EmpDropListChild.text = WSResult.EmpName[i];
							EmpDropListChild.value = 
								document.all["txDeptNo_h"].value+":"+
								document.all["txSectNo_h"].value+":"+
								WSResult.UserName[i]+":"+
								WSResult.EmpName[i];
							document.all.dlEmp.options.add(EmpDropListChild);				
						}
					}
					if(document.all["dlEmp"].options.length > 10)
					{
						document.all["dlEmp"].size = 10;
					}
					//1021217	Cloud	 [1020985]	增加資料數設定選單長度
					else
					{	
						document.all["dlEmp"].size = document.all["dlEmp"].options.length;
					}
				}
			}
		}	
    }
    
	//95.12.14 955218 David
	//1090309 Cloud	1081109 增加輸入版本與年度互轉功能-bug 一併修
	//if(argResult.id = ws_CallStockID)
	if(argResult.id == ws_CallStockID)
    {
		if(argResult.value.Succes)
		{
			var STOCK_NO_1 = argResult.value.STOCK_NO_1;
			var STOCK_NO_2 = argResult.value.STOCK_NO_2;
			var USED_STOCK_NO = argResult.value.USED_STOCK_NO;
			
			document.all["txStockNo"].value = STOCK_NO_1+"-"+STOCK_NO_2+"-"+USED_STOCK_NO;
		}
    }
	//1090309 Cloud	1081109 增加輸入版本與年度互轉功能-s
    else if (argResult.id == iCallID_YearVerNo)
    {
    	WSResult = argResult.value;
    	if (WSResult.ErrorClass.IsErr)
    	{
			//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
    		//alert(WSResult.ErrorClass.ErrMessage[0]);
			var bAlert = true;
    		if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-s
				if(document.all["tbVerNo"].value!="")
				{
					var checkmsg = WSResult.ErrorClass.ErrMessage[0].split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["tbVerNo"].value)
							{
								bAlert = false;
								break;
							}
						}
					}

				}
				if(bAlert)
				{
					alert(WSResult.ErrorClass.ErrMessage[0]);
					$('#tbVerNo').focus();
					document.all["tbVerNo"].value="";
				}
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-e
    		}
			else
				alert(WSResult.ErrorClass.ErrMessage[0]);
    	}
    	else
    	{
    		if (CurrentObjId == "tbYEAR")//年度號ONLBUR-帶回版本別一律設定
    			document.all["tbVerNo"].value = WSResult.strVerNo;
    		else//版本別onblur
    		{ 
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["tbYEAR"].value == "" || document.all["tbYEAR"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["tbYEAR"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					document.all["tbYEAR"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["tbYEAR"].value == "" || document.all["tbYEAR"].value < WSResult.strSdate || document.all["tbYEAR"].value > WSResult.strEdate)
    				{
    					if (document.all["tbYEAR"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    						document.all["txCaseYear"].value = WSResult.strEdate;
    					}
    				}
    			}
    		}
    	}
    	CurrentObjId = "";
    }
	//1090309 Cloud	1081109 增加輸入版本與年度互轉功能-e
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位功能-s
    if (argResult.id == CallWS_ID_OSECT)
    {
    	if (jf_IsWebServiceSuccess(argResult))
    	{
    		WSResult = argResult.value;

    		document.all["OdlSect1_Container"].className = "custom-combobox";
    		document.all["OdlSect1"].className = "custom-combobox";
    		document.all["OdlSect1_Text"].className = "custom-combobox";

    		document.all["OdlSect1_Text"].value = "";

    		while (document.all.OdlSect1.options[0] != null)
    		{
    			document.all.OdlSect1.options[0] = null;
    		}

    		var DropListChild = document.createElement("OPTION");
    		DropListChild.text = "";
    		DropListChild.value = "";
    		document.all.OdlSect1.options.add(DropListChild);

    		if (WSResult.SecNo.length != 0)
    		{

    			//[001209]Add by Cola -- start --
    			ClearDL(document.all["OdlSect1"]);

    			var Blank_Data = document.createElement("OPTION");
    			Blank_Data.text = "";
    			Blank_Data.value = ":";
    			document.all.OdlSect1.options.add(Blank_Data);
    			//Cola -- end --

    			for (var i = 0; i < WSResult.SecNo.length; i++)
    			{
    				var SectDropListChild = document.createElement("OPTION");
    				SectDropListChild.text = WSResult.SecName[i];
    				SectDropListChild.value = WSResult.DeptNo[i] + ":" + WSResult.DeptName[i] + ":" + WSResult.SecNo[i] + ":" + WSResult.SecName[i];
    				document.all.OdlSect1.options.add(SectDropListChild);
    			}

    			if (document.all["OdlSect1"].options.length > 10)
    			{
    				document.all["OdlSect1"].size = 10;
    			}
    			else
    			{
    				document.all["OdlSect1"].size = document.all["OdlSect1"].options.length;
    			}
    			SyncDL("ONoSect2");
    			document.all["OdlSect1_Container"].disabled = false;
    		}
    		else
    		{
    			while (document.all.OdlSect1.options[0] != null)
    			{
    				document.all.OdlSect1.options[0] = null;
    			}

    			document.all["OdlSect1_Container"].disabled = true;
    			SyncDL("ONoSect1");
    		}
    	}
    }
	//同步化承辦人
    if (argResult.id == CallWS_ID_OEmp1)
    {
    	if (jf_IsWebServiceSuccess(argResult))
    	{
    		WSResult = argResult.value;

    		document.all["OdlEmp1_Text"].value = "";

    		while (document.all.OdlEmp1.options[0] != null)
    		{
    			document.all.OdlEmp1.options[0] = null;
    		}

    		var DropListChild = document.createElement("OPTION");
    		DropListChild.text = "";
    		DropListChild.value = "";
    		document.all.OdlSect1.options.add(DropListChild);
    		//1110812 Cloud 1110414 一併補強 單位不存在時不須連動
    	    //if (WSResult.UserName.length != 0)
    		if (WSResult != undefined && WSResult.UserName.length != 0)
    		{
    			if (WSResult.UserName[0] != "false" && WSResult.UserName[WSResult.UserName.length - 1] != "false")
    			{

    				
    				ClearDL(document.all.OdlEmp1);

    				var Blank_Data = document.createElement("OPTION");
    				Blank_Data.text = "";
    				Blank_Data.value = ":::";
    				document.all.OdlEmp1.options.add(Blank_Data);
    				//Cola -- end --

    				for (var i = 0; i < WSResult.UserName.length; i++)
    				{
    					var EmpDropListChild = document.createElement("OPTION");
    					EmpDropListChild.text = WSResult.EmpName[i];
    					EmpDropListChild.value =
							document.all["OtxDeptNo_h"].value + ":" +
							document.all["OtxSectNo_h"].value + ":" +
							WSResult.UserName[i] + ":" +
							WSResult.EmpName[i];
    					document.all.OdlEmp1.options.add(EmpDropListChild);
    				}
    				if (document.all["OdlEmp1"].options.length > 10)
    				{
    					document.all["OdlEmp1"].size = 10;
    				}
    				else
    				{
    					document.all["OdlEmp1"].size = document.all["OdlEmp1"].options.length;
    				}
    			}
    		}
    		else
    		{
    			if (document.all["OdlSect1_Text"].value != "")
    				ClearDL(document.all.OdlEmp1);
    		}
    	}
    }
    if (argResult.id == CallWS_ID_OEmp2)
    {
    	if (jf_IsWebServiceSuccess(argResult))
    	{
    		WSResult = argResult.value;

    		document.all["OdlEmp1_Text"].value = "";

    		while (document.all.OdlEmp1.options[0] != null)
    		{
    			document.all.OdlEmp1.options[0] = null;
    		}

    		var DropListChild = document.createElement("OPTION");
    		DropListChild.text = "";
    		DropListChild.value = "";
    		document.all.OdlSect1.options.add(DropListChild);

    	    //1110812 Cloud 1110414 一併補強 單位不存在時不須連動
    	    //if (WSResult.UserName.length != 0)
    		if (WSResult != undefined && WSResult.UserName.length != 0)
    		{
    			if (WSResult.UserName[0] != "false" && WSResult.UserName[WSResult.UserName.length - 1] != "false")
    			{
    				ClearDL(document.all.OdlEmp1);

    				var Blank_Data = document.createElement("OPTION");
    				Blank_Data.text = "";
    				Blank_Data.value = ":";
    				document.all.OdlEmp1.options.add(Blank_Data);
    				//Cola -- end --				

    				for (var i = 0; i < WSResult.UserName.length; i++)
    				{
    					if (jf_Trim(WSResult.SectNo[i]) == "")
    					{
    						var EmpDropListChild = document.createElement("OPTION");
    						EmpDropListChild.text = WSResult.EmpName[i];
    						EmpDropListChild.value =
								document.all["OtxDeptNo_h"].value + ":" +
								document.all["OtxSectNo_h"].value + ":" +
								WSResult.UserName[i] + ":" +
								WSResult.EmpName[i];
    						document.all.OdlEmp1.options.add(EmpDropListChild);
    					}
    				}
    				if (document.all["OdlEmp1"].options.length > 10)
    				{
    					document.all["OdlEmp1"].size = 10;
    				}
    				else
    				{
    					document.all["OdlEmp1"].size = document.all["OdlEmp1"].options.length;
    				}
    			}
    		}
    	}
    }
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位功能-e
    argResult = null;
	
}

var iCallID_DEPT_ISU = null;
var iCallID_CLS = null;
var iCallID_CLS1 = null;
var iCallID_CASE = null;
var iCallID_ComNo = null;
var iCallID_ComNo1 = null;
var iCallID_ComNo2 = null;

var iCallID_Vol = null;
var iCallID_Num = null;
var iCallID_Num1 = null;
var iCallID_Num_SecSeq = null;
var iCallID_Emp = null;
var iCallID_Dept = null;
var iCallID_Seq = null;
var iCallID_SecSeq = null;
var iCallID_ComSeq = null;	//2006.08.04 JEFF 呼叫檢查檔案併件流水號是否有存在的ID

function TbOnChange(argTextBox)
{
	var xObjectName = "";
	if(document.activeElement!=null)
		xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
		return;
	
	switch(argTextBox)
	{
		case "tbYEAR":
		case "tbCLS":
		case "tbCASE":
			document.all["tbVOL"].value = "";
			document.all["tbSEQ"].value = "";
			//1020218	Jagle	[1011178]	清空已使用總頁數
			document.all["txVolTotalPage"].value = "";
		    //變為非11增加清空個人檔相關資運
			if (document.all["tbCLS"].value != "11")
			{
			    document.all["txFullName"].value = "";
			    document.all["txPerID"].value = "";
			    document.all["txPerFullID"].value = "";
			    document.all["txFourNum"].value = "";
			}
			break;
		case "tbVOL":
			document.all["tbSEQ"].value = "";
			//1020218	Jagle	[1011178]	清空已使用總頁數
			document.all["txVolTotalPage"].value = "";
			break;
		case "txKeepSecYear":
			if(document.all["txKeepSecYear"].value == "" || document.all.tbCrtDate.value =="")
			{
				document.all.tbExtRmvSec_Date.value == "";
				return;
			}
			
			var nYear = parseInt(document.all["txKeepSecYear"].value,10);
			var strCrtDate = document.all.tbCrtDate.value;
			var nRmvSecYear = parseInt(strCrtDate.substring(0,3),10) + nYear ;
			nRmvSecYear = nRmvSecYear + "";
			document.all.tbExtRmvSec_Date.value = jf_PADL(nRmvSecYear,3,"0") + strCrtDate.substring(3,7);	
			break;
		//1020408	Jagle	[1011178]	紙本公文，數量變動時總頁數要同步更新
		case "tbCNT":
			if(document.all["dlDocFileType"].options[document.all.dlDocFileType.selectedIndex].value == "1")
			{
				//var strTotalPage = parseInt(document.all["tbCNT"].value) + parseInt(VolPage) + + parseInt(SepPage);
				var strTotalPage = parseInt(document.all["tbCNT"].value) + parseInt(document.all["H_VolPage"].value) + parseInt(document.all["H_SepPage"].value);
				document.all["txVolTotalPage"].value = strTotalPage;
			}
			break;
	}
}

//* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題
var arEvent = [];
var bIsDoubleMsg=false;
// 2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG,增加一變數判斷是否已檢核過
var bHasCheck = false;
function TbOnBlur(argTextBox)
{
	//[0970153]Marked by Cola 取消判斷, 因已修正bug (先Alert再Focus)
	//submit觸發onblur會導致submit失效
	/*if (document.activeElement.type == "submit")
		return;*/
	/*
	var xObjectName = "";
	if(document.activeElement!=null)
		xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
		return;
	*/
	var xObjectName = argTextBox;
    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題-S
    if (argTextBox != "tbCLS" && argTextBox != "tbVerNo")
    {
        //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題
        arEvent.pop();
	}
    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題-E
	
	
	
	//MATTE 0960507 000291 新增判斷目次號卷次號是否為000及0000
	//START
	if (argTextBox == "tbSEQ")
	{
		if(document.all["tbSEQ"].value == "000")
		{	
			alert(alertTitle + "\n目次號 值為000 "+"編卷 請從001起\n");
			document.all["tbSEQ"].value = "";
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbSEQ"].focus();
		    $("#tbSEQ")[0].focus();
		}
	}
	if (argTextBox == "tbVOL")
	{
		if(document.all["tbVOL"].value == "0000")
		{
			alert(alertTitle + "\n卷次號 值為0000 "+"編卷 請從0001起\n");
			document.all["tbVOL"].value = "";
		    $("#tbVOL")[0].focus();
			document.all["txVolTotalPage"].value = "";
		}	
		else if(document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "")
		{
		    
		    var ClearProc = AK.AKM330_MOCS.GetClearProc(document.all["h_sourceorgno"].value, document.all["tbYEAR"].value, document.all["tbCLS"].value, document.all["tbCASE"].value, document.all["tbVOL"].value);
			if(ClearProc.value[0] != "")
			{
				document.all["txClearProc"].value = GetClearProcWord(ClearProc.value[0]);
				document.all["txClearProc"].title = GetClearProcWord(ClearProc.value[0]);
			}
			document.all["txOClearProc"].value = GetClearProcWord(ClearProc.value[1]);
			document.all["txOClearProc"].title = GetClearProcWord(ClearProc.value[1]);
			
		}	
	}
	//END

	
	//密件另存流水號
	if (argTextBox=="txSecSeq")
	{
		if (document.all["txSecSeq"].value=="" || document.all["txSecSeq"].value ==0 )
			return;
		var KeyName = new Array(2);
		KeyName[0] = "SOURCE_ORGNO";
		KeyName[1] = "SEC_SEQ";
		var KeyValue = new Array(2);
		KeyValue[0] = document.all["tbOrgNo"].value;
		KeyValue[1] = document.all["txSecSeq"].value;
		var RtnFldName = new Array(1);
		RtnFldName[0] = "DOC_NO";
		var OrdFldName = new Array(1);
		OrdFldName[0] = "DOC_NO";

		var param = new Array(5);
		param[0] = "DOC_MAIN";
		param[1] = KeyName;
		param[2] = KeyValue;
		param[3] = RtnFldName;
		param[4] = OrdFldName;

		RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);
		iCallID_SecSeq = RtnObj.id;
		OnWSResult(RtnObj);
	}

	//年度號
	if (argTextBox=="tbYEAR")
	{
		if (document.all["tbYEAR"].value == "")
			return;
		else
		{
			document.all["tbYEAR"].value = jf_PADL(document.all["tbYEAR"].value, 3, "0");
			
			//1090309 Cloud 1081109 增加叫用ws取得版本行為
			CurrentObjId = argTextBox;
			jf_GetClassVer("Year");
			if (jf_Trim(document.all["tbVerNo"].value) != "" && jf_Trim(document.all["tbCLS"].value) != "" && jf_Trim(document.all["tbCASE"].value) != "")
			{
			    //銓敘部分類號為11時自行透過ajax取得，不透過ws-個人檔無年度分別
			    if (document.all["tbCLS"].value != "11") {
			        var param = new Array(5);
			        param[0] = document.all["tbYEAR"].value;
			        param[1] = document.all["tbCLS"].value;
			        param[2] = document.all["tbCASE"].value;
			        param[3] = "";//ONLBLUR時，更換案次號，鍵值還未取回不可使用-故傳入空白
			        param[4] = document.all["tbVerNo"].value;

			        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
			        iCallID_CASE = RtnObj.id;
			        OnWSResult(RtnObj);
			    }
			    
			}
		}
	}

	//分類號 & 版本別
	if (argTextBox=="tbCLS" || argTextBox=="tbVerNo")
	{
	    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題-記錄初次進來的欄位
		if(arEvent.length==0)
			arEvent.push(argTextBox);
		else{
			if(argTextBox!=arEvent[0])
			{
				console.log ('argTextBox阻擋');
				return;
			}
		}
	    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題-S
		/*if (bIsDoubleMsg == true)
		{
			bIsDoubleMsg = false;
			return;
		}
		if ((document.activeElement.id == "tbCLS" && event.srcElement.id == "tbVerNo") || (document.activeElement.id == "tbVerNo" && event.srcElement.id == "tbCLS"))
		{
			bIsDoubleMsg = true;
		}*/
	    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題-E
		//1090309 Cloud 1081109 分類/案次無值時叫用ws取得年度
		if (argTextBox == "tbVerNo")
		{
			CurrentObjId = argTextBox;
			if (document.all["tbVerNo"].value != "")
				jf_GetClassVer("VerNo");
		}
		if (document.all["tbCLS"].value=="")
		{
			document.all["txClsName"].innerText	= "";
			document.all["htxClsKey"].value 	= "";
		    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題
			arEvent.pop();
			return;
		}
		//Zoey [96/08/30, 001477]
		if(argTextBox=="tbCLS")
		{
            //個人檔只會是11，不做下面檢核
		    if (document.all["tbCLS"].value != "11") {
		        document.all["btAutoVol"].disabled = false;
		        var strLmtClsLen = document.all.h_lbClsLen.innerText;
		        if (strLmtClsLen != null && jf_Trim(strLmtClsLen) != "" && strLmtClsLen != "0") {
		            var iLmtClsLen = parseInt(strLmtClsLen);
		            if (iLmtClsLen != 0) {
		                var inpClsNo = jf_Trim(document.all["tbCLS"].value);
		                if (inpClsNo != "" && inpClsNo.length < iLmtClsLen) {

		                    alert("分類號至少需輸入" + strLmtClsLen + "碼!!");
		                    //1060321 CLOUD 1050087 升級二代
		                    //document.all["tbCLS"].focus();
		                    $("#tbCLS")[0].focus();
					    //* 2022.12.19   Cloud   1111167 修正版本別與分類號無窮迴圈檢核問題
					    arEvent.pop();
		                    return;
		                }
		            }
		        }
		    }
		    else {
		        //個人檔不使用自動編卷
		        document.all["btAutoVol"].disabled = true;
		    }
		}
		var param1 = new Array(3);
		param1[0] = document.all["tbVerNo"].value;
		param1[1] = document.all["tbCLS"].value;
		param1[2] = document.all["tbYEAR"].value;
        param1[0] = encodeURI(document.all["tbVerNo"].value);
        param1[1] = encodeURI(document.all["tbCLS"].value);
        param1[2] = encodeURI(document.all["tbYEAR"].value);
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCLS",false,param1);

		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);

		/*
		if (document.all["tbCASE"].value != document.all["INITS_FILENO"].value && 
			document.all["tbCASE"].value != document.all["INIT_FILENO"].value  && 
			document.all["tbCASE"].value != document.all["DEPT_CASE"].value && 
			jf_Trim(document.all["tbVerNo"].value) != ""  && jf_Trim(document.all["tbCLS"].value) != "" ) //若版本及分類號完整才往下再檢核 #2006.03.06 Andy
		//941206 rita	if (!IsCls && document.all["tbCASE"].value!="")
		*/
		//改成所有案次號一律去call ws帶案名 #2006.03.19 Andy
		if(jf_Trim(document.all["tbVerNo"].value) != "" && jf_Trim(document.all["tbCLS"].value) != "" && jf_Trim(document.all["tbCASE"].value) != "")
		{
            //1111120 銓敘部個人檔另外處理
		    if (document.all["tbCLS"].value != "11") {
		        var param = new Array(5);
		        param[0] = document.all["tbYEAR"].value;
		        param[1] = document.all["tbCLS"].value;
		        param[2] = document.all["tbCASE"].value;
		        param[3] = "";
		        param[4] = document.all["tbVerNo"].value;
		        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
		        iCallID_CASE = RtnObj.id;
		        OnWSResult(RtnObj);
		    }
		}
	}
	
	//案次號
	if (argTextBox=="tbCASE")
	{
		if (document.all["tbCASE"].value=="")
		{
			document.all["txCaseName"].innerText = "";
			document.all["htxCaseKey"].innerText = "";
			return;
		}

		
		if(jf_Trim(document.all["tbVerNo"].value) != ""  && jf_Trim(document.all["tbCLS"].value) != "")
		{
		    //1111120 銓敘部個人檔另外處理
		    if (document.all["tbCLS"].value != "11") {
		        var param = new Array(5);
		        param[0] = document.all["tbYEAR"].value;
		        param[1] = document.all["tbCLS"].value;
		        param[2] = document.all["tbCASE"].value;
		        param[3] = "";//ONLBLUR時，更換案次號，鍵值還未取回不可使用-故傳入空白
		        param[4] = document.all["tbVerNo"].value;

		        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);

		        iCallID_CASE = RtnObj.id;
		        OnWSResult(RtnObj);
		    }
		}
	}

	//卷次號
	if (argTextBox=="tbVOL")
	{
		if (document.all["tbVOL"].value=="")
			return;
		else
			document.all["tbVOL"].value=jf_PADL(document.all["tbVOL"].value,4,'0');
	}

	//目次號
	if (argTextBox=="tbSEQ")
	{
	    if (document.all["tbSEQ"].value == "")
	        return;
	    else {
	        //銓敘部個人檔到4碼
	        if (document.all["tbCLS"].value == "11")
	            document.all["tbSEQ"].value = jf_PADL(document.all["tbSEQ"].value, 4, '0');
	        else
	            document.all["tbSEQ"].value = jf_PADL(document.all["tbSEQ"].value, 3, '0');
	    }
	}

	//媒體型式
	if (argTextBox=="tbMedia")
	{
		if (document.all["tbMedia"].value=="")
		{
			document.all["dlMedia"].selectedIndex=0;
			return;
		}
		var IsExist=false;
		for(var i=0;i<document.all["dlMedia"].length;i++)
		{
			if (document.all["dlMedia"].options[i].value==document.all["tbMedia"].value)
			{
				document.all["dlMedia"].selectedIndex=i;
				IsExist=true;
				break;
			}
		}
		if (!IsExist)
		{
		    alert("無此媒體型式");
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbMedia"].focus();
		    $("#tbMedia")[0].focus();
		}
	}
	
	//文別
	if (argTextBox=="tbDOC_CATEGORY")
	{
		if (document.all["tbDOC_CATEGORY"].value=="")
		{
			document.all["dlDOC_CATEGORY"].selectedIndex=0;
			return;
		}
		var IsExist=false;
		for(var i=0;i<document.all["dlDOC_CATEGORY"].length;i++)
		{
			if (document.all["dlDOC_CATEGORY"].options[i].value==document.all["tbDOC_CATEGORY"].value)
			{
				document.all["dlDOC_CATEGORY"].selectedIndex=i;
				IsExist=true;
				break;
			}
		}
		if (!IsExist)
		{
		    alert("無此文別代碼");
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbDOC_CATEGORY"].focus();
		    $("#tbDOC_CATEGORY")[0].focus();
		}
	}

	//本別
	if (argTextBox=="tbType")
	{
		if (document.all["tbType"].value=="")
		{
			document.all["dlTYPE"].selectedIndex=0;
			return;
		}
		var IsExist=false;
		for(var i=0;i<document.all["dlTYPE"].length;i++)
		{
			if (document.all["dlTYPE"].options[i].value==document.all["tbType"].value)
			{
				document.all["dlTYPE"].selectedIndex=i;
				IsExist=true;
				break;
			}
		}
		if (!IsExist)
		{
		    alert("無此本別代碼");
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbType"].focus();
		    $("#tbType")[0].focus();
		}
	}

	//來文日期
	if (argTextBox=="tbFDATE")
	{
		//1040707	Kevin_C	1040476	設定文件產生日期
		SetCrtDate();
		if (document.all["tbFDATE"].value=="")
		{
			if (document.all["tbCDATE"].value=="")
			{
				//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
				//document.all["tbCrtDate"].value="";
				document.all["tbExtRmvSec_Date"].value="";
			}
			else
			{
				if (document.all["tbIDATE"].value=="")
				{
					//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
					//document.all["tbCrtDate"].value=document.all["tbCDATE"].value;
					if (document.all["tbYEAR"].value=="")
						document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
					if (!document.all["tbExtRmvSec_Date"].disabled)
					{
						if (document.all["tbKeep_Year"].value=="" || document.all["tbKeep_Year"].value=="?")
							document.all["tbExtRmvSec_Date"].value="";
						else
						{
							var str=document.all["tbKeep_Year"].value+"0000";
							var str1=parseInt(document.all["tbCrtDate"].value,10)+parseInt(str,10)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						}
					}
					//else
					//	document.all["tbExtRmvSec_Date"].value="";
				}
			}
		}
		else
		{
			//補滿7碼
			document.all["tbFDATE"].value=jf_PADL(document.all["tbFDATE"].value,7,"0");
			if (!jf_CheckCDATE(document.all["tbFDATE"].value))
			{
			    alert("日期格式錯誤");
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbFDATE"].focus();
			    $("#tbFDATE")[0].focus();
			}
			else
			{
				if (document.all["tbIDATE"].value=="")
				{
					//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
					//document.all["tbCrtDate"].value=document.all["tbFDATE"].value;
					if (document.all["tbYEAR"].value=="")
						document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
					if (!document.all["tbExtRmvSec_Date"].disabled)
					{
						if (document.all["tbKeep_Year"].value=="" || document.all["tbKeep_Year"].value=="?")
							document.all["tbExtRmvSec_Date"].value="";
						else
						{
							var str=document.all["tbKeep_Year"].value+"0000";
							var str1=parseInt(document.all["tbCrtDate"].value,10)+parseInt(str,10)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						}
					}
					//else
					//	document.all["tbExtRmvSec_Date"].value="";
				}
			}
		}
	}

	//發文日期
	if (argTextBox=="tbIDATE")
	{
		//1040707	Kevin_C	1040476	設定文件產生日期
		SetCrtDate();
		if (document.all["tbIDATE"].value=="")
		{
			if (document.all["tbFDATE"].value=="")
			{
				if (document.all["tbCDATE"].value=="")
				{
					//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
					//document.all["tbCrtDate"].value="";
					document.all["tbExtRmvSec_Date"].value="";
				}
				else
				{
					//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
					//document.all["tbCrtDate"].value=document.all["tbCDATE"].value;
					if (document.all["tbYEAR"].value=="")
						document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
					if (!document.all["tbExtRmvSec_Date"].disabled)
					{
						if (document.all["tbKeep_Year"].value=="" || document.all["tbKeep_Year"].value=="?")
							document.all["tbExtRmvSec_Date"].value="";
						else
						{
							var str=document.all["tbKeep_Year"].value+"0000";
							var str1=parseInt(document.all["tbCrtDate"].value,10)+parseInt(str,10)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						}
					}
					//else
					//	document.all["tbExtRmvSec_Date"].value="";
				}
			}
			else
			{
				//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
				//document.all["tbCrtDate"].value=document.all["tbFDATE"].value;
				if (document.all["tbYEAR"].value=="")
					document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
				if (!document.all["tbRmvSec_Date"].disabled)
				{
					if (document.all["tbKeep_Year"].value=="" || document.all["tbKeep_Year"].value=="?")
						document.all["tbExtRmvSec_Date"].value="";
					else
					{
						var str=document.all["tbKeep_Year"].value+"0000";
						var str1=parseInt(document.all["tbCrtDate"].value,10)+parseInt(str,10)
						document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						
					}
				}
				//else
				//	document.all["tbExtRmvSec_Date"].value="";
			}
		}
		else
		{
			//補滿7碼
			document.all["tbIDATE"].value=jf_PADL(document.all["tbIDATE"].value,7,"0");
			
			if (!jf_CheckCDATE(document.all["tbIDATE"].value))
			{
			    alert("日期格式錯誤");
			    //1060321 CLOUD 1050087 升級二代
			    //document.all["tbIDATE"].focus();
			    $("#tbIDATE")[0].focus();
			}
			else
			{
				//if (document.all["tbCrtDate"].value=="")
				//{
					//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
					//document.all["tbCrtDate"].value=document.all["tbIDATE"].value;
					if (document.all["tbYEAR"].value=="")
						document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
					if (!document.all["tbExtRmvSec_Date"].disabled)
					{
						if (document.all["tbKeep_Year"].value=="" || document.all["tbKeep_Year"].value=="?")
						{document.all["tbExtRmvSec_Date"].value="";}
						else
						{
							var str=document.all["tbKeep_Year"].value+"0000";
							var str1=parseInt(document.all["tbCrtDate"].value,10)+parseInt(str,10)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作

						}
					}
					//else
					//	document.all["tbExtRmvSec_Date"].value="";
				//}
				
				//檢查通過後，將來文者帶入受文者
				if (document.all["tbFNAME"].value!="" && document.all["tbRCVNAME"].value=="")
					document.all["tbRCVNAME"].value=document.all["tbFNAME"].value;
			}
		}
	}

	//來文者
	if (argTextBox=="tbFNAME")
	{
		if (document.all["tbFNAME"].value=="")
			return;
		else
		{
			//檢查通過後，將來文者帶入受文者
			if (document.all["tbIDATE"].value!="" && document.all["tbRCVNAME"].value=="")
				document.all["tbRCVNAME"].value=document.all["tbFNAME"].value;
		}
	}
	
	//受文者
	if (argTextBox=="tbRCVNAME")
	{
		if (document.all["tbRCVNAME"].value=="")
		{
			//檢查通過後，將來文者帶入受文者
			if (document.all["tbFNAME"].value!="" && document.all["tbIDATE"].value!="")
				document.all["tbRCVNAME"].value=document.all["tbFNAME"].value;
		}
		else
			return;
	}
	
	//併案母文 **********************************************************
	if (argTextBox=="tbCOM_NO")
	{
		if (document.all["tbCOM_NO"].value=="")
		{
			//1060930	Kevin_C	1060860	修正CHROME點擊Disabled CheckBox無法觸發onblur的問題
			//document.all["cbComNo"].disabled=true;
			document.getElementById("cbComNo").style.pointerEvents = "none";
			document.getElementById('cbComNo').style.opacity = "0.4";
			document.all["cbComNo"].checked = false;
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["tbYEAR"].focus();
			$("#tbYEAR")[0].focus();
		    //1110811 Cloud 1110418 增加提醒同步密件流水號
			if (document.all.dlSECRET.selectedIndex >= 2) {
			    document.all["btSecSeq"].disabled = false;
			    document.all["txSecSeq"].disabled = false;
			    document.all.txSecSeq.style.backgroundColor = "#FFFFFF";
			    document.all["txSecSeq"].value = "";
			}
			return;
		}
		else
		{
			//1060930	Kevin_C	1060860	修正CHROME點擊Disabled CheckBox無法觸發onblur的問題
		    //document.all["cbComNo"].disabled = false;
			document.getElementById("cbComNo").style.pointerEvents = "";
			document.getElementById('cbComNo').style.opacity = "1";
		    //1060321 CLOUD 1050087 升級二代
		    //document.all["cbComNo"].focus();
		    $("#cbComNo")[0].focus();
		}
				
		if (document.all["tbDATA_TYPE"].value!="RE")
		{
		    //2016.03.20   CLOUD   1050087 升級二代
			/*var KeyValue1 = new Array(1);
			KeyValue1[0] = document.all["tbCOM_NO"].value;*/
		    var param1 = new Array(1);
		    //2016.03.20   CLOUD   1050087 升級二代
		    //param1[0] = KeyValue1;
		    param1[0] = document.all["tbCOM_NO"].value;;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckMonDoc",false,param1);
			iCallID_ComNo = RtnObj.id;
			OnWSResult(RtnObj);
			
			if (IsRight)
			{	//新增
				IsRight=false;
				var KeyName = new Array(2)
				KeyName[0] = "SOURCE_ORGNO";
				KeyName[1] = "DOC_NO";
				var KeyValue = new Array(2);
				KeyValue[0] = document.all["tbOrgNo"].value;
				KeyValue[1] = document.all["tbCOM_NO"].value;
                //1110811 Cloud 1110418 增加回傳密件另存流水號
			    //var RtnFldName = new Array(14);
			    var RtnFldName = new Array(15);
				RtnFldName[0] = "FILE_YEAR";
				RtnFldName[1] = "FILE_CLS";
				RtnFldName[2] = "FILE_CASE";
				RtnFldName[3] = "FILE_VOL";
				RtnFldName[4] = "FILE_SEQ";
				RtnFldName[5] = "CLS_KEY";
				RtnFldName[6] = "CASE_KEY";
				RtnFldName[7] = "RPSDEPT_NO";
				RtnFldName[8] = "DOCFILE_TYPE";
				RtnFldName[9] = "RPSDEPT_NAME";
				RtnFldName[10] = "KEEP_YEAR";  //Leo 0960530 001007 增加回傳母文的KEEP_YEAR
				RtnFldName[11] = "SEC_NO";  //Leo 0960725 001007 增加回傳密等
				RtnFldName[12] = "RMVSEC_CODE";  //Leo 0960725 001007 增加回傳解密條件
				RtnFldName[13] = "RMVSEC_COND";  //Leo 0960725 001007 增加回傳解密條件
			    //1110811 Cloud 1110418 增加回傳密件另存流水號
				RtnFldName[14] = "SEC_SEQ";
				var OrdFldName = new Array(1);
				OrdFldName[0] = "";	

				var param = new Array(5);
				param[0] = "DOC_MAIN";
				param[1] = KeyName;
				param[2] = KeyValue;
				param[3] = RtnFldName;
				param[4] = OrdFldName;		
				
				RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
				iCallID_ComNo1 = RtnObj.id;
				OnWSResult(RtnObj);
                //銓敘部不做以下檢核-銓敘部用分類號鑑值跟姓氏
				if (DeptNo != "")
				{
					//檢查此帳號是否可點收、維護此份公文
					//0981111	Howard	0980587	ChkUserDocPriv()新增傳入公文文號之參數
					//var param = new Array(2);
					/*var param = new Array(3);
					param[0] = DeptNo;
					param[1] = document.all.txUser.value;
					param[2] = document.all["tbCOM_NO"].value;
										
					RtnObj = jf_CallWS("lib/AK_LIB.asmx","ChkUserDocPriv",false,param);
					iCallID_ChkUserDocPriv = RtnObj.id;
					strStoreNo = "";
					OnWSResult(RtnObj);

					if(strStoreNo=="")  //無庫房代碼=無權限
					{	
						
						if(document.all.h_StoreMode && document.all.h_StoreMode.value == "1") 
						{		
								//依據公文歸檔庫房
						    
						    var StoreName = AK.AKM330_MOCS.GetStoreName(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
								Msg="抱歉!!參照文號:"+document.all["tbCOM_NO"].value+" 歸檔庫房為"+StoreName+ 
									    " 非您所管理的歸檔庫房公文，系統不允許您處理本份公文。";
						}
						else
						{	//依據公文承辦單位
							Msg="抱歉!!參照文號:"+document.all["tbCOM_NO"].value+" 承辦單位為"+uDeptName+ 
								    " 非您所管理的承辦單位公文，系統不允許您處理本份公文。";
						}
						
						strErrMsg = FormatStr(jf_GetErrMsg(CustErr), new Array([Msg]))+"\n";
						jf_ShowMeg(strErrMsg, "");
					    //1060321 CLOUD 1050087 升級二代
					    //document.all.tbCOM_NO.focus();
					    $("#tbCOM_NO")[0].focus();
						return;
					}*/
					
					//檢核通過，自動將併件設為checked
					if(document.all.tbCOM_NO.value != "")
					{
						//↓Leo 0960530 001007 [職訓局]修改輸入併案母文號時子文的版本別要和母文一樣
						//1020531	Cloud	[1000751]修改以機關別稱判斷使用機關
						//if(document.all["tbOrgNo"].value == '354010000J')
						if(document.all["tbOrgNickName"].value == 'EVTA')
						{
							document.all.tbKeep_Year.value  = document.all.htxKeepYaer.value ; //子文的保存年限要和母文一樣
							for(var i= 0 ; i < document.all.dlSECRET.length ; i++)
							{
								if(document.all.dlSECRET.options[i].value == document.all.hdlSECRET.innerText)
								{
									document.all.dlSECRET.selectedIndex = i ;//0960725 子文的密等要和母文一樣
									break;
								}
							}
							DlOnBlur("dlSECRET")
							//[001600]Cola 取消 dlRmvSec_Cond 欄位
							/*for(var j= 0 ; j < document.all.dlRmvSecCode.length ; j++)
							{
								if(document.all.dlRmvSecCode.options[j].value == document.all.hdlRmvSecCode.innerText)
								{
									document.all.dlRmvSecCode.selectedIndex = j ;//0960725 子文的解密條件要和母文一樣
									break;
								}
							}*/
							document.all["dlRmvSec_Cond:Text"].value = document.all.hdlRmvSec_Cond.innerText ;//0960725 子文的解密條件要和母文一樣
						}
							
							//取得母文的VER_NO
							var ComVerNo = "";
							var KeyName = new Array(2)
							KeyName[0] = "SOURCE_ORGNO";
							KeyName[1] = "PRIMARY_KEY";
							var KeyValue = new Array(2);
							KeyValue[0] = document.all["tbOrgNo"].value;
							//1060930	Kevin_C	1060860	修正取母文版本別時，使用的分類號鍵值錯誤的問題
							//KeyValue[1] = document.all.htxClsKey.value;
							KeyValue[1] = strComClsKey;
							var RtnFldName = new Array(1);
							RtnFldName[0] = "VER_NO";
							var OrdFldName = new Array(1);
							OrdFldName[0] = "";	

							var param = new Array(5);
							param[0] = "CLASS_MAIN";
							param[1] = KeyName;
							param[2] = KeyValue;
							param[3] = RtnFldName;
							param[4] = OrdFldName;		

							RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
							// 2012.05.30	Cloud	------	修正ONBLUR母文異常的錯誤避免因自動勾選併件時CbOnClick()會在CALLWS導致VERNO被洗掉先儲存起來
							if(jf_IsWebServiceSuccess(RtnObj))
							{
								WSResult = RtnObj.value;
								var tempVerNo=WSResult.RtnField0[0];
								document.all["htxVerNo"].value=tempVerNo;
							}
							
							//1001013	Jeff	1000795	移至下方判斷
							/*if(jf_IsWebServiceSuccess(RtnObj))
							{
								WSResult = RtnObj.value;
								document.all.tbVerNo.value = WSResult.RtnField0[0];
								document.all.tbCLS.value = document.all.htxFileCls.value;
								TbOnBlur('tbCLS')
							}*/
												
						
							//↑Leo 0960530 
							//0950622 Charles 根據隱藏欄位值，設定是否勾選併件
							document.all.AKM330_DefaultComStatus.TEXT
							if(document.all.AKM330_DefaultComStatus.value == "Y")
							{
								document.all.cbComNo.checked = true;
								CbOnClick("cbComNo");
							}
							// 2012.05.30	Cloud	------	增加母文文號ONBLUR時，跳出提醒更新案次號警示
							if(document.all.AKM330_DefaultComStatus.value != "Y" && document.all.AK_AKM330_FILESET_MSG.value=="Y")
							{
								if(jf_GetActionMode()==LayoutModeNew)
								{
									if(document.all.tbDOC_NO.value!="" && document.all.tbCOM_NO.value!="")
									{
										if(!jf_CheckDataExist(document.all["tbOrgNo"].value))
											CheckComFileSeq();
									}
								}
								else 
								{
									CheckComFileSeq();
								}
							}
							//單號950938,950948,950962 jeff 0951004, 開啟時onblur把併件選項不勾選的問題,將以下兩行mark掉即可
							//else
							//	document.all.cbComNo.checked = false;
							//1001013	Jeff  1000795  移至此處避免並建沒打勾卻自動帶入母文檔號
							if(jf_IsWebServiceSuccess(RtnObj) && document.all.cbComNo.checked)
							{
								//WSResult = RtnObj.value;
								//document.all.tbVerNo.value = WSResult.RtnField0[0];
								// 2012.05.30	Cloud	------	修正ONBLUR母文異常的錯誤
								document.all.tbVerNo.value=tempVerNo;
								document.all.tbCLS.value = document.all.htxFileCls.value;
								TbOnBlur('tbCLS')
							}

					}
				} // end if (DeptNo != "")
				else
				{
					/*問題單 940831取消併件母文之承辦單位檢查
					Msg="抱歉!!參照文號:"+document.all["tbCOM_NO"].value+" 未設定承辦單位資訊。"+"\n"+
						"請先確定參照文號該份公文的承辦資訊再設定本份公文的參照文號。";
					strErrMsg = FormatStr(jf_GetErrMsg(CustErr), new Array([Msg]))+"\n";
					jf_ShowMeg(strErrMsg,"");
					document.all.tbCOM_NO.focus();
					return;
					*/
				}
			}
		}
		else
		{
			//document.all["btCom"].disabled=false;
		}
	}
	
	//附件編號
	if (argTextBox=="tbATT_SEQ")
	{
		if (xObjectName == "btAutoNum")
		{return;}
		if (document.all["tbATT_SEQ"].value=="")
		{return;}
		var arKeyName = new Array(3);
		arKeyName[0] = "SOURCE_ORGNO";
		arKeyName[1] = "ATT_SEQ";
		arKeyName[2] = "DOC_NO!";
		var arKeyValue = new Array(3);
		arKeyValue[0] = document.all["tbOrgNo"].value;
		arKeyValue[1] = document.all["tbATT_SEQ"].value;
		arKeyValue[2] = document.all["tbDOC_NO"].value;
		
		var arWSParam = new Array(3);
		arWSParam[0] = "DOC_MAIN";
		arWSParam[1] = arKeyName;
		arWSParam[2] = arKeyValue;
		
		RtnObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
		iCallID_Seq = RtnObj.id;
		OnWSResult(RtnObj);
		
		//if (!RtnObj.value.RtnBool)
		//{
		//	if (document.all["tbAtt_SL"].value=="" || document.all["tbAtt_SName"].value=="")
		//	{alert("附件名稱或儲位不可空白");}
		//}
	}
	
	
	//附件名稱
	/*if (argTextBox=="tbAtt_SName")
	{
		if ()
		{return;}
		else
		{
			if (document.all["tbAtt_SL"].value=="" || )
			{alert("附件編號或儲位不可空白");}
		}
	}
	
	//儲位
	if (argTextBox=="tbAtt_SL")
	{
		if (document.all["tbAtt_SL"].value=="")
		{return;}
		else
		{
			if (document.all["tbAtt_SName"].value=="" || document.all["tbATT_SEQ"].value=="")
			{alert("附件編號或附件名稱不可空白");}
		}
	}*/
	
    //收創文日期
    //1110826 Cloud 1110875 增加檢核入庫日期合理性
    //if (argTextBox=="tbRDATE")
	if (argTextBox == "tbRDATE" || argTextBox == "txStoreDate")
	{
	    //1110826 Cloud 1110875 增加檢核入庫日期合理性
		/*if (document.all["tbRDATE"].value=="")
		{
			return;
		}
		else
		{
			//補滿7碼
			document.all["tbRDATE"].value=jf_PADL(document.all["tbRDATE"].value,7,"0");
			if (!jf_CheckCDATE(document.all["tbRDATE"].value))
			{
			    alert("日期格式錯誤");
                //1060321 Cloud 1050087 升級二代
			    //document.all["tbRDATE"].focus();
			    $("#tbRDATE")[0].focus();
			}
		}*/
	    if (document.all[argTextBox].value == "")
		{
			return;
		}
		else
		{
			//補滿7碼
	        document.all[argTextBox].value = jf_PADL(document.all[argTextBox].value, 7, "0");
	        if (!jf_CheckCDATE(document.all[argTextBox].value)) {
	            alert("日期格式錯誤");
	            $("#" + argTextBox)[0].focus();
	        }
	        else {
	            if (argTextBox == "txStoreDate")//檢核是否超過系統日期
	            {
	                if (document.all[argTextBox].value > document.all["txSysDate"].value)
	                {
	                    alert("入庫日期不可超過系統時間。");
	                    document.all[argTextBox].value = "";
	                    $("#" + argTextBox)[0].focus();
	                }

	            }
	        }
		}
	}
	
	//結案日期
	if (argTextBox=="tbCDATE")
	{
		// 2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG,增加一變數判斷是否已檢核過
		if (bHasCheck)
		{
			bHasCheck = false;
			return true;
		}
		bHasCheck = true;
		//1040707	Kevin_C	1040476	設定文件產生日期
		SetCrtDate();
		if (document.all["tbCDATE"].value=="")
		{
			//2010.07.06	Davy	0990366	未輸入辦畢日期時，一併清除辦畢時間。
			document.all["tbCTIME"].value="";
			//return ;
		// 2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG,增加一變數判斷是否已檢核過
			return true;
		}
		else
		{
			//補滿7碼
			document.all["tbCDATE"].value=jf_PADL(document.all["tbCDATE"].value,7,"0");
			if (!jf_CheckCDATE(document.all["tbCDATE"].value))
			{
				//alert("日期格式錯誤");
			// 2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG，增加回傳FALSE，儲存時擋下POSTBACK	
			    alert("辦畢日期格式錯誤");
			    //1060321 Cloud 1050087 升級二代
			    //document.all["tbCDATE"].focus();
			    $("#tbCDATE")[0].focus();
			// 2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG，增加回傳FALSE，儲存時擋下POSTBACK
				bHasCheck = false;
				return false;
			}
			else
			{
				if (document.all["tbIDATE"].value=="" && document.all["tbFDATE"].value=="")
				{
					//1040707	Kevin_C	1040476	修改文件產生日期取得邏輯
					//document.all["tbCrtDate"].value=document.all["tbCDATE"].value;
					if (document.all["tbYEAR"].value=="")
						document.all["tbYEAR"].value=document.all["tbCrtDate"].value.substring(0,3);
					if (!document.all["tbExtRmvSec_Date"].disabled)
					{
						if (document.all["tbKeep_Year"].value=="" || document.all["tbKeep_Year"].value=="?")
						{document.all["tbExtRmvSec_Date"].value="";}
						else
						{
							var str=document.all["tbKeep_Year"].value+"0000";
							var str1=parseInt(document.all["tbCrtDate"].value,10)+parseInt(str,10)
							// 2013.07.24	Cloud	1020126	修正輸入應解密日期，儲存後不會修改的bug
							if(document.all["tbExtRmvSec_Date"].value=="")
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
					    }
					
				    }
					//else
					//	document.all["tbExtRmvSec_Date"].value="";
			     }
			 // 2012.03.07   Cloud   1010201 修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG，增加回傳FALSE，儲存時擋下POSTBACK
			 return true;
			 }
		}
	}

	//2010.07.06	Davy	0990366	增加檢查結案時間格式
	//結案時間
	if (argTextBox=="tbCTIME")
	{
		if (document.all["tbCTIME"].value=="")
		{
			return;
		}
		else
		{
			if (document.all["tbCDATE"].value=="")
			{
				alert("請先輸入辦畢日期再輸入辦畢時間");
				document.all["tbCTIME"].value = "";
			    //1060321 Cloud 1050087 升級二代
			    //document.all["tbCDATE"].focus();
			    $("#tbCDATE")[0].focus();
				return;
			}
			//補滿4碼
			document.all["tbCTIME"].value=jf_PADL(document.all["tbCTIME"].value,4,"0");
			
			if (!CheckTIME("tbCTIME"))
			{
			    alert("時間格式錯誤");
			    //1060321 Cloud 1050087 升級二代
			    //document.all["tbCTIME"].focus();
			    $("#tbCTIME")[0].focus();
			}
		}
	}

	//解密日期
	if (argTextBox=="tbRmvSec_Date")
	{
		if (document.all["tbRmvSec_Date"].value=="")
		{
			return;
		}
		else
		{
			document.all["tbRmvSec_Date"].value = jf_PADL(document.all["tbRmvSec_Date"].value,7,"0");
			if (!jf_CheckCDATE(document.all["tbRmvSec_Date"].value))
			{
			    alert("日期格式錯誤");
			    //1060321 Cloud 1050087 升級二代
			    //document.all["tbRmvSec_Date"].focus();
			    $("#tbRmvSec_Date")[0].focus();
			}
		}
	}
	
	//JEFF 950609 應解密日期
	if (argTextBox=="tbExtRmvSec_Date")
	{
		if (document.all["tbExtRmvSec_Date"].value=="")
		{
			return;
		}
		else
		{
			document.all["tbExtRmvSec_Date"].value = jf_PADL(document.all["tbExtRmvSec_Date"].value,7,"0");
			if (!jf_CheckCDATE(document.all["tbExtRmvSec_Date"].value))
			{
			    alert("日期格式錯誤");
			    //1060321 Cloud 1050087 升級二代
			    //document.all["tbExtRmvSec_Date"].focus();
			    $("#tbExtRmvSec_Date")[0].focus();
			}
		}
	}	

	//公文文號
	if (argTextBox=="tbDOC_NO")
	{
		Page_BlockSubmit = false;
		//1110117 Cloud 1110039 修正文號欄位未trim空白問題
		document.all["tbDOC_NO"].value=jf_Trim(document.all["tbDOC_NO"].value);
		if(OriginalKeyCode==13) //輸入enter時
		{
			if (document.all["tbDOC_NO"].value=="")
			{
				return;
			}
			else
			{
				// 檢查是否為新增模式
				if (document.all.TemplateMode.value=="0")
					jf_OpenButtonSubmit();
			}
		}
	}
    //姓名
	if (argTextBox == "txFullName") {
	    Page_BlockSubmit = false;
	    activeText = argTextBox;
	    if (document.all["txFullName"].value != "")
	    {
	        //檢核姓氏是否已建立
	        if (AK.AKM330_MOCS.CheckFirstName(document.all["h_sourceorgno"].value, document.all["txFullName"].value.substring(0, 1)).value != "Y")
	        { alert('該姓氏尚未建立所屬類別，請使用EAM006建立。'); $("#txFullName")[0].focus(); }
	        else
	        {
	            //取得個人案資訊-身分證完整則僅使用身分證
	            //* 2023.06.29   Cloud   序287、281    現場實務面有人員改名情況，同一身分證不同姓名，僅使用身分證為鍵值會有問題需增加姓名
	            //if (document.all["txPerID"].value.length == 10)
	                //ClientGetPerSonInfo(document.all["txPerID"].value, "");
	            //else
	            {ClientGetPerSonInfo(document.all["txPerID"].value, document.all["txFullName"].value);}
	        }
	    }
	}
    //身分證號
	if (argTextBox == "txPerID") {
	    Page_BlockSubmit = false;
	    activeText = argTextBox;
	    if (document.all["txPerID"].value != "") {
            //轉大寫
	        document.all["txPerID"].value = document.all["txPerID"].value.toUpperCase();
	        if(document.all["txPerID"].value.length!=5 && document.all["txPerID"].value.length!=10)
	        {alert('輸入身分證號不完整，請重新輸入。'); $("#txPerID")[0].focus();}
	        else
	        {
                //身分證5碼處理
	            if (document.all["txPerID"].value.length == 5) {
	                var idCount = document.all["txPerID"].value.toUpperCase().match(/[A-Z]\d{4}/ig);
	                if (idCount == undefined) {
	                    alert('請輸入正確格式身分證。');
	                    return;
	                }
	                else {
	                    if (document.all["txPerFullID"].value != "" && document.all["txPerFullID"].value.length == 10) {
	                        if (document.all["txPerID"].value != document.all["txPerFullID"].value.substring(0, 1) + document.all["txPerFullID"].value.substring(6))
	                        { alert('您已更改身分證號，請輸入完整身分證號(10碼)，以取得正確資訊。'); $("#txPerID")[0].focus(); }
	                    }
	                    else { alert('身份證號資訊錯誤，請輸入完整身分證號(10碼)，以取得正確資訊。'); $("#txPerID")[0].focus(); }
	                }
	            }
	            else {
	                //身分證10碼處理
	                //取得個人案資訊-身分證完整則僅使用身分證
	                //先檢核格式是否合法
	                if (AK.AKM330_MOCS.CheckID(document.all["txPerID"].value).value) {
	                    //ClientGetPerSonInfo(document.all["txPerID"].value, "");
	                    //* 2023.06.29   Cloud   序287、281    現場實務面有人員改名情況，同一身分證不同姓名，僅使用身分證為鍵值會有問題需增加姓名
	                    ClientGetPerSonInfo(document.all["txPerID"].value, document.all["txFullName"].value);
	                }
	                else { alert('您輸入非有效性身分證號，請重新輸入。'); $("#txPerID")[0].focus(); }
	            }
	        }
	    }
	    else {
	        document.all["txPerFullID"].value = "";
	    }
	}
    //四角號碼
	if (argTextBox == "txFourNum") {
        //先不檢核，姓名相同四角號碼一定同，
	}
}

function DlOnBlur(argDl)
{
	/*
	//媒體型式
	if (argDl=="dlMedia")
	{
		document.all["tbMedia"].value=document.all["dlMedia"].options[document.all["dlMedia"].selectedIndex].value;
		
	}
	
	//文別
	if (argDl=="dlDOC_CATEGORY")
	{
		document.all["tbDOC_CATEGORY"].value=document.all["dlDOC_CATEGORY"].options[document.all["dlDOC_CATEGORY"].selectedIndex].value;
		
	}
	
	//本別
	if (argDl=="dlTYPE")
	{
		document.all["tbType"].value=document.all["dlTYPE"].options[document.all["dlTYPE"].selectedIndex].value;
	}
	*/
	
	//密等
	if (argDl=="dlSECRET")
	{
		var dlSECRET_Index = document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value;
		//mickey 2005/10/12 密等變更時 自動變更發文字
		Change_dllIssueNoWord(dlSECRET_Index);		
		//20060608 JEFF 適當將密等相關欄位DISABLED
		if(dlSECRET_Index > "1")
		{
			//2008.11.07 Modify by Cola 改為依照環境變數判斷如何設定
			ddlSelect("dlAPPLYLIMIT",document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(1,2));
			//ddlSelectByText("dlAPPLYLIMIT","不開放");//matte 0960723 001206
			document.all.txSecSeq.disabled = false;
            //1110812 Cloud 1110418 修正萬年雷-根本不會改回白色
		    //document.all.txSecSeq.style.backgroundColor = "FFFFFF";
		    document.all.txSecSeq.style.backgroundColor = "#FFFFFF";
			
			document.all.dlRmvSec_Cond.disabled = false;
			document.all.dlRmvSec_Cond_Text.disabled = false;
			document.all.dlRmvSec_Cond_Text.style.backgroundColor = "FFFFFF";
			
			document.all.tbExtRmvSec_Date.disabled = false;
			document.all.tbExtRmvSec_Date.style.backgroundColor = "FFFFFF";
			
			document.all.btSecSeq.disabled = false;
			
			//document.all.dlRmvSecCode.disabled = false;
			//document.all.dlRmvSecCode.style.backgroundColor = "FFFFFF";
			
			//document.all.txKeepSecYear.disabled = false;
			//document.all.txKeepSecYear.style.backgroundColor = "FFFFFF";
			
			document.all.tbRmvSec_Date.disabled = true;
			document.all.tbRmvSec_Date.style.backgroundColor = "LightGrey";
		    //1110811 Cloud 1110418 增加提醒同步密件流水號-S
			if (document.all["tbDOC_NO"].value != document.all["tbCOM_NO"].value && document.all["cbComNo"].checked) {
			    document.all["btSecSeq"].disabled = true;
			    document.all["txSecSeq"].disabled = true;
			    document.all.txSecSeq.style.backgroundColor = "LightGrey";
			    document.all["txSecSeq"].value = document.all.hMSecSeq.value;
			}
		    //1110811 Cloud 1110418 增加提醒同步密件流水號-E

		}
		else
		{
			document.all.txSecSeq.disabled = true;
			document.all.txSecSeq.style.backgroundColor = "LightGrey";
			
			document.all.dlRmvSec_Cond.disabled = true;
			document.all.dlRmvSec_Cond_Text.disabled = true;
			document.all.dlRmvSec_Cond_Text.style.backgroundColor = "LightGrey";
			
			document.all.tbExtRmvSec_Date.disabled = true;
			document.all.tbExtRmvSec_Date.style.backgroundColor = "LightGrey";
			
			document.all.btSecSeq.disabled = true;
			
			//document.all.dlRmvSecCode.disabled = true;
			//document.all.dlRmvSecCode.style.backgroundColor = "LightGrey";
			
			//document.all.txKeepSecYear.disabled = true;
			//document.all.txKeepSecYear.style.backgroundColor = "LightGrey";
			
			if (document.all.txNormalType.value == "2")
			{
				document.all.tbRmvSec_Date.disabled = false;
				document.all.tbRmvSec_Date.style.backgroundColor = "FFFFFF";			
			}
			else
			{
				document.all.tbRmvSec_Date.disabled = true;
				document.all.tbRmvSec_Date.style.backgroundColor = "LightGrey";				
			
			}
			//2008.11.07 Marked & Modify by Cola 改為依照環境變數判斷如何設定
			ddlSelect("dlAPPLYLIMIT",document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(0,1));
			
			/*if(document.all["dlAPPLYLIMIT"].selectedIndex == 2)//0960801 Leo 當密等為普通而應用限制為不開放時提示user
				alert("修改密等為["+document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].innerText+"]，應用限制為[不開放]");*/
		    //1110811 Cloud 1110418 增加提醒同步密件流水號-S
			if (document.all["tbDOC_NO"].value != document.all["tbCOM_NO"].value) {
			    document.all["txSecSeq"].value = "";
			}
		    //1110811 Cloud 1110418 增加提醒同步密件流水號-E
			
		}
		
		//document.all["tbSecret"].value=document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value;
		//document.all["tbSecret"].onblur();
	}
	
	/*
	//應用限制
	if (argDl=="dlAPPLYLIMIT")
	{
		document.all["tbApply_Limit"].value=document.all["dlAPPLYLIMIT"].options[document.all["dlAPPLYLIMIT"].selectedIndex].value;
	}
	*/	
	//主要發文者
	if (argDl=="dlDept")
	{
		if (document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value=="" || document.all["tbINAME"].value==document.all["dlDept"].options[document.all["dlDept"].selectedIndex].text)
			return;
		
		document.all["tbINAME"].value=document.all["dlDept"].options[document.all["dlDept"].selectedIndex].text
		var KeyName = new Array(2)
		KeyName[0] = "SOURCE_ORGNO";
		KeyName[1] = "DEPT_NO";
		var KeyValue = new Array(2);
		KeyValue[0] = document.all["tbOrgNo"].value;
		KeyValue[1] = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;
		var RtnFldName = new Array(1);
		RtnFldName[0] = "DEPT_WORD";
		var OrdFldName = new Array(1);
		OrdFldName[0] = "WORD_TYPE";	
		
		var param = new Array(5);
		param[0] = "DEPT_SWORD";
		param[1] = KeyName;
		param[2] = KeyValue;
		param[3] = RtnFldName;
		param[4] = OrdFldName;		
		
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
		iCallID_DEPT_ISU = RtnObj.id;
		OnWSResult(RtnObj);
	}
	
	/*
	//承辦單位
	if (argDl=="dlDept1")
	{
		document.all["tbDEPT"].value=document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value;
		//if (document.all["tbDEPT"].value!="")
		document.all["tbDEPT"].onblur();
	}
	
	//承辦人
	if (argDl=="dlEmp")
	{
		document.all["tbEMP"].value=document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
		if (document.all["tbEMP"].value!="")
			document.all["tbEMP"].onblur();
	}
	
	//保存狀況
	if (argDl=="dlKEEPSTATE")
	{
		document.all["tbKeep_State"].value=document.all["dlKEEPSTATE"].options[document.all["dlKEEPSTATE"].selectedIndex].value;
	}
	
	//保存狀況
	if (argDl=="tbYEAR")
	{
		document.all["tbVOL"].value="";
		document.all["tbSEQ"].value="";
	}
	
	//保存狀況
	if (argDl=="tbCLS")
	{
		document.all["tbVOL"].value="";
		document.all["tbSEQ"].value="";
	}
	
	//保存狀況
	if (argDl=="tbCASE")
	{
		document.all["tbVOL"].value="";
		document.all["tbSEQ"].value="";
	}
	*/
	
	//待編目案件
	if (argDl == "dlFILE_DOC")
	{
		Page_BlockSubmit=false;
		document.all["tbDOC_NO"].value		=document.all["dlFILE_DOC"].options[document.all["dlFILE_DOC"].selectedIndex].text;
		document.all["txDocNoChange"].value = document.all["dlFILE_DOC"].options[document.all["dlFILE_DOC"].selectedIndex].text;
		if (CheckMgr()) {
		    //[0960193]Add by Cola 新增判斷一隱藏欄位 - 此欄位於dlFILE_DOC_onchange後被設定為1 ，以此來判斷此次clientonload是否於剛剛執行完dlFILE_DOC_onchange
		    document.all["btOpenChecker"].value = "1";
		    if (document.all.txDocNoChange.value != "") {
		        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		        IsServerHandling = true;
		        __doPostBack("txDocNoChange", "");
		    }
		}
		else
		    Page_BlockSubmit = true;
	}
	
	//1000713 Davy [1000129] 新增紙本來文併同歸檔相關欄位
	//檔案類別
	if (argDl == "dlDocFileType")
	{
		var dlDocFileType_Index = document.all["dlDocFileType"].options[document.all["dlDocFileType"].selectedIndex].value;
		if (dlDocFileType_Index == 1)
		{
			document.all.dlIsRcvfile.disabled = true;
			document.all.dlIsRcvfile.style.backgroundColor = "LightGrey";
			document.all.txRcvfileCnt.disabled = true;
			document.all.txRcvfileCnt.style.backgroundColor = "LightGrey";
		}
		else
		{
			document.all.dlIsRcvfile.disabled = false;
			document.all.dlIsRcvfile.style.backgroundColor = "FFFFFF";
			DlOnBlur("dlIsRcvfile");
		}
	}
	//紙本來文併同歸檔
	if (argDl == "dlIsRcvfile")
	{
		var dlDocFileType_Index = document.all["dlIsRcvfile"].options[document.all["dlIsRcvfile"].selectedIndex].value;
		if (dlDocFileType_Index != 1)
		{
			document.all.txRcvfileCnt.disabled = true;
			document.all.txRcvfileCnt.style.backgroundColor = "LightGrey";
		}
		else
		{
			document.all.txRcvfileCnt.disabled = false;
			document.all.txRcvfileCnt.style.backgroundColor = "FFFFFF";
		}
	}
	//1091116	Cloud	1090792 配合法規調整保存狀況代碼，修改程式
	//保存狀況
	if (argDl == "dlKEEPSTATE")
	{
		if (document.all.dlKEEPSTATE.options[document.all.dlKEEPSTATE.selectedIndex].value.toUpperCase() == "Z")
		{
			document.all["cbIsmiss"].disabled = false;
			document.all["cbIsDestroy"].disabled = false;
		}
		else
		{
			document.all["cbIsmiss"].disabled = true;
			document.all["cbIsDestroy"].disabled = true;
			document.all["cbIsmiss"].checked = false;
			document.all["cbIsDestroy"].checked = false;
		}
	}
}
function CheckMgr()
{
    //2023.04.11   Cloud   需求序7  現場分類號、個人檔有屬於無任何人管理的資料，不希望編目後變成當前人員管理，故一律不檢核是否有管理人員及自動設定管理人員
    //var resultE = AK.AKM330_MOCS.CheckMgrUSER(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value;
    //if (resultE != "NoData") {
    //    if (resultE != "Y") {
    //        if (resultE.indexOf("ERR") != -1) {
                
    //            alert("歸檔人員檢核異常-" + resultE);
    //            return false;
    //        }
    //        else {
    //            console.warn(resultE + '-AAA');
    //            if (!window.confirm("當前分類號/姓氏尚無所屬歸檔人員，是否確定編目?[確定]則將於編目完成後設定當前人員為歸檔人員，[取消]則不進行開啟"))
    //                return false;
    //            else
    //                return true;
    //        }
    //    }
    //    else
    //        return true;
    //}
    return true;
}
//2011.07.13   Jeff	1000573   新增承辦人職稱欄位，取得承辦人職稱
function getTitle()
{

	//如果所選擇的承辦人選項值不為空時才透過WebService取得職稱
	if(jf_Trim(document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].text)!="")
	{
		var strTitle=(document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value).split(":");
		var param =new Array(2);
		//承辦人帳號ID
		param[0]=strTitle[2];
		//機關代碼
		param[1]=document.all.tbOrgNo.value;
		var TitleCallWs =jf_CallWS("lib/AK_LIB.asmx","GetTitle",false,param);
		document.all.txTitle.value=TitleCallWs.value;
	}
	else
	{
		document.all.txTitle.value="";
    }
}

//2008.11.07 Add by Cola 密等與應用限制之連動 (應用限制下拉選單依照argSelectValue設定至對應值)
function ddlSelect(argSelectId,argSelectValue)
{
	var a = 0;
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].value == argSelectValue)
		{
			a = i;
		}
	}
	document.all[argSelectId].selectedIndex = a;
}
function CbOnClick(argCheckBox)
{
	//alert(event.srcElement.id)
	var xObjectName = "";
	//20120525 Cloud 1010369判斷當啟用領務局要求功能時，不檢核公文是否已有完整檔號，直接詢問使用者是否要更改檔號
	var checkMode = "";

    //1100204 Zen 1090927 取消使用document.activeElement--begin
	//if (document.activeElement != null)
    //	xObjectName = document.activeElement.id;
	if (event.target != null)
	    xObjectName = event.target.id;
	//1100204 Zen 1090927 取消使用document.activeElement--end
	//20120525 Cloud 1010369判斷當啟用領務局要求功能時，不檢核公文是否已有完整檔號，直接詢問使用者是否要更改檔號
	else
	{
		xObjectName = "cbComNo";
		checkMode="clientOnLoad";
	}
	//併件
	if (argCheckBox=="cbComNo")
	{
		if(document.all[xObjectName].checked)
		{
			//帶出併案母文所隱藏的檔號
			if(jf_Trim(document.all.tbCOM_NO.value) == "")
			{
			    alert('請先輸入參照文號');
                //1060321 Cloud 1050087 升級二代
			    //document.all.tbCOM_NO.focus();
			    $("#tbCOM_NO")[0].focus();
				return;
			}
		
			//[---]Add by Cola 判斷參照之文號有無編目日期，若無，且子文有完整檔號-則不可併件 -- start --
			else if(jf_Trim(document.all.tbCOM_NO.value) != "" && (document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value ) )
			{
			    //1070830 Zen 1070678 弱掃Ajax修正
			    //var tmp = AKM330.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
			    var tmp = AK.AKM330_MOCS.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
				if (jf_Trim(tmp) == "")
				{
					alert('輸入之參照文號尚未完成編目，不允許併件，請先將該筆公文完成編目。');
					document.all["tbCOM_NO"].value = "";
				    //1060321 Cloud 1050087 升級二代
				    //document.all["tbCOM_NO"].focus();
				    $("#tbCOM_NO")[0].focus();
					document.all[xObjectName].checked = false;
					return;
				}
			}
			//Cola -- end --
			
			//母文為電子文、子文為紙本文 或 母文為紙本文、子文為電子文時 show msg
			//1.檔號均空白 -> 帶出年、分類、案
			//2.檔號任一有值 -> 不帶
			if(document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value != document.all.htxDocFileType.value) 
			{
				//[---]Add by Cola 若母文尚未編目, 則不顯示訊息
			    //1070830 Zen 1070678 弱掃Ajax修正
			    //if (jf_Trim(AKM330.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value) != "")
			    if (jf_Trim(AK.AKM330_MOCS.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value) != "")
			    {
					if(document.all.tbYEAR.value == "" && document.all.tbCLS.value == "" && document.all.tbCASE.value == "" && document.all.tbVOL.value == "" && document.all.tbSEQ.value == "")
					{
						document.all.tbYEAR.value = document.all.htxFileYear.value;
						document.all.tbCLS.value = document.all.htxFileCls.value;
						document.all.tbCASE.value = document.all.htxFileCase.value;
					    //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
						document.all.tbVerNo.value = document.all.htxVerNo.value;
						if(document.all.htxDocFileType.value == "2")
							alert("併件母文為電子檔案，而此公文為紙本檔案，所以檔號只帶出母文的年度號、分類號、案次號\n母文的檔號為："+document.all.htxFileYear.value+"-"+document.all.htxFileCls.value+"-"+document.all.htxFileCase.value+"-"+document.all.htxFileVol.value+"-"+document.all.htxFileSeq.value);
						else
							alert("併件母文為紙本檔案，而此公文為電子檔案，所以檔號只帶出母文的年度號、分類號、案次號\n母文的檔號為："+document.all.htxFileYear.value+"-"+document.all.htxFileCls.value+"-"+document.all.htxFileCase.value+"-"+document.all.htxFileVol.value+"-"+document.all.htxFileSeq.value);
					}
					else
					{
						if(document.all.htxDocFileType.value == "2")
							alert("併件母文為電子檔案，而此公文為紙本檔案，所以不自動帶出母文檔號\n母文的檔號為："+document.all.htxFileYear.value+"-"+document.all.htxFileCls.value+"-"+document.all.htxFileCase.value+"-"+document.all.htxFileVol.value+"-"+document.all.htxFileSeq.value);
						else
							alert("併件母文為紙本檔案，而此公文為電子檔案，所以不自動帶出母文檔號\n母文的檔號為："+document.all.htxFileYear.value+"-"+document.all.htxFileCls.value+"-"+document.all.htxFileCase.value+"-"+document.all.htxFileVol.value+"-"+document.all.htxFileSeq.value);
					}
				}
			}
			else  //母子文一致，帶出母文檔號
			{
				//add by cola 若子文有完整之檔號, 則需先尋問使用者是否要覆蓋
				//20120525 Cloud 1010369判斷當啟用領務局要求功能時，不檢核公文是否已有完整檔號，直接詢問使用者是否要更改檔號
				//if (document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)
				if (document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value || document.all.AK_AKM330_FILESET_MSG.value == "Y")
				{	
					if(document.all.tbYEAR.value != document.all.htxFileYear.value || document.all.tbCLS.value != document.all.htxFileCls.value || document.all.tbCASE.value != document.all.htxFileCase.value || document.all.tbVOL.value != document.all.htxFileVol.value || document.all.tbSEQ.value != document.all.htxFileSeq.value)
					{//20120525 Cloud 1010369判斷當啟用領務局要求功能時，不檢核公文是否已有完整檔號，直接詢問使用者是否要更改檔號
						if(document.all.AK_AKM330_FILESET_MSG.value != "Y")
						{
						    var tmp_child_fileno = document.all.tbYEAR.value+"-"+document.all.tbCLS.value+"-"+document.all.tbCASE.value+"-"+document.all.tbVOL.value+"-"+document.all.tbSEQ.value;
						    //1110811 Cloud 1110418 增加提醒同步密件流水號
						    var strAlter = "母子文檔號不同，母文檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value + ",子文檔號為：" + tmp_child_fileno + ", 檔號將被取代成與母文同，請確認是否執行併件。";
						    if (document.all.dlSECRET.selectedIndex >= 2)
						        strAlter = "母子文檔號不同，母文檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value + ",子文檔號為：" + tmp_child_fileno + ", 檔號與密件另存流水號將被取代成與母文同，請確認是否執行併件。"
						    //if ( window.confirm("母子文檔號不同，母文檔號為："+document.all.htxFileYear.value+"-"+document.all.htxFileCls.value+"-"+document.all.htxFileCase.value+"-"+document.all.htxFileVol.value+"-"+document.all.htxFileSeq.value+",子文檔號為："+tmp_child_fileno+", 檔號將被取代成與母文同，請確認是否執行併件。"))
						    if (window.confirm(strAlter))
							{
								document.all.tbYEAR.value = document.all.htxFileYear.value;
								document.all.tbCLS.value = document.all.htxFileCls.value;
								document.all.tbCASE.value = document.all.htxFileCase.value;
								document.all.tbVOL.value = document.all.htxFileVol.value;
								document.all.tbSEQ.value = document.all.htxFileSeq.value;
							    //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
								document.all.tbVerNo.value = document.all.htxVerNo.value;
							    //1110811 Cloud 1110418 增加同步密件流水號-S
								if (document.all.dlSECRET.selectedIndex >= 2) {
								    document.all["btSecSeq"].disabled = true;
								    document.all["txSecSeq"].disabled = true;
								    document.all.txSecSeq.style.backgroundColor = "LightGrey";
								    document.all["txSecSeq"].value = document.all.hMSecSeq.value;
								}
						        //1110811 Cloud 1110418 增加同步密件流水號-E
						        //1110831 Cloud 1110875 增加同步入庫保管日期
								if (document.all["txStoreDate"].value == "")
								    document.all["txStoreDate"].value = document.all.hMStoreDate.value;
							}
							else
							{
								document.all[xObjectName].checked = false;
							}
						}
						//20120525 Cloud 1010369判斷當啟用領務局要求功能時，不檢核公文是否已有完整檔號，直接詢問使用者是否要更改檔號
						else
						{
						    //1110811 Cloud 1110418 增加提醒同步密件流水號
						    var strAlter = "併件時子文檔號將被取代成與母文一致，是否確定併件。"
						    //if ( window.confirm("併件時子文檔號檔號將被取代成與母文一致，是否確定併件。"))
						    if (document.all.dlSECRET.selectedIndex >= 2)
						        strAlter = "併件時子文檔號與密件另存流水號將被取代成與母文一致，是否確定併件。"
						    if (window.confirm(strAlter))
							{
								document.all.tbYEAR.value = document.all.htxFileYear.value;
								document.all.tbCLS.value = document.all.htxFileCls.value;
								document.all.tbCASE.value = document.all.htxFileCase.value;
								document.all.tbVOL.value = document.all.htxFileVol.value;
								document.all.tbSEQ.value = document.all.htxFileSeq.value;
							    //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
								document.all.tbVerNo.value = document.all.htxVerNo.value;
						        //1110811 Cloud 1110418 增加提醒同步密件流水號-S
								if (document.all.dlSECRET.selectedIndex >= 2) {
								    document.all["btSecSeq"].disabled = true;
								    document.all["txSecSeq"].disabled = true;
								    document.all.txSecSeq.style.backgroundColor = "LightGrey";
								    document.all["txSecSeq"].value = document.all.hMSecSeq.value;
								}
						        //1110811 Cloud 1110418 增加提醒同步密件流水號-E
						        //1110831 Cloud 1110875 增加同步入庫保管日期
								if (document.all["txStoreDate"].value == "")
								    document.all["txStoreDate"].value = document.all.hMStoreDate.value;
							}
							else
							{
								document.all[xObjectName].checked = false;
							}
							if(checkMode=="clientOnLoad")
								return;						
						}
					}	
				}
				else if (document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)
				{
					document.all.tbYEAR.value = document.all.htxFileYear.value;
					document.all.tbCLS.value = document.all.htxFileCls.value;
					document.all.tbCASE.value = document.all.htxFileCase.value;
					document.all.tbVOL.value = document.all.htxFileVol.value;
					document.all.tbSEQ.value = document.all.htxFileSeq.value;
				    //* 2021.07.21   Cloud   1100730 併件時增加處理版本別欄位
					document.all.tbVerNo.value = document.all.htxVerNo.value;
				    //1110811 Cloud 1110418 增加同步密件流水號-S
					if (document.all.dlSECRET.selectedIndex >= 2) {
					    document.all["btSecSeq"].disabled = true;
					    document.all["txSecSeq"].disabled = true;
					    document.all.txSecSeq.style.backgroundColor = "LightGrey";
					    document.all["txSecSeq"].value = document.all.hMSecSeq.value;
					}
				    //1110811 Cloud 1110418 增加同步密件流水號-E
				    //1110831 Cloud 1110875 增加同步入庫保管日期
					if (document.all["txStoreDate"].value == "")
					    document.all["txStoreDate"].value = document.all.hMStoreDate.value;
		 		}
		 	}
			//cola -- end --			
		    //帶出分類名
			//2014.12.26   Cloud    修正有開啟領務局檢核併案件功能時，開啟併案公文會出現錯誤的bug
		    //document.all.tbCLS.onblur();
		    //帶出案名
			//document.all.tbCASE.onblur();
			GetClsName();
			GetCASEName();

			
						
			if (document.all.txFileComboSeq)//Matte 0961022 001504
			{
				document.all["txFileComboSeq"].readOnly = false;
				document.all["txFileComboSeq"].className = "";
				GetFileComBoSeq();
			}			
		}
		//95.11.01 950869 David
		else
		{
			if(jf_Trim(document.all["tbCOM_NO"].value) != "")
			{
				/*if(CheckFileValueProcess(2) == jf_Trim(document.all["tbCOM_NO"].value))
				{
					alert("此份文為併件母文,欲取消併件,請取消子文併件。");
					document.all[xObjectName].checked = true;					
				}
				else
				{*/
			        //1110811 Cloud 1110418 增加提醒同步密件流水號
			    //if(window.confirm("取消併件須重新編卷,確定嗎?"))
			    var strAlter = "取消併件須重新編卷,確定嗎?"
			    if (document.all.dlSECRET.selectedIndex >= 2)
			        strAlter = "取消併件須重新編卷及取得密件另存流水號,確定嗎?"
			        if (window.confirm(strAlter))
					{
						//document.all["tbCOM_NO"].value = "";
						//document.all[xObjectName].disabled = true;
						
						document.all["tbVOL"].value = "";
						document.all["tbSEQ"].value = "";
						//1020218	Jagle	[1011178]	卷次號清空時，已使用總頁數需同時清空
						document.all["txVolTotalPage"].value = "";
						
						if (document.all.txFileComboSeq)//Matte 0961022 001504
						{
							document.all["txFileComboSeq"].readOnly = true;
							document.all["txFileComboSeq"].className = "DisplayOnly";
							document.all["txFileComboSeq"].value = "";
						}
			            //1110811 Cloud 1110418 增加提醒同步密件流水號
						if (document.all.dlSECRET.selectedIndex >= 2)
						{
						    document.all["btSecSeq"].disabled = false;
						    document.all["txSecSeq"].disabled = false;
						    document.all.txSecSeq.style.backgroundColor = "#FFFFFF";
						    document.all["txSecSeq"].value = "";
						}
					}					
					else
					{
						document.all[xObjectName].checked = true;
					}
				//}
			}
		}
	}
}

function SetComBoBoxTabIndex()
{
	document.all.dlRmvSecCode_Text.tabIndex = document.all.dlRmvSecCode.tabIndex;
	SetComboBoxTextValue("dlRmvSecCode", document.all.txRmvSecCode.value);
	document.all.dlStore_Text.tabIndex = document.all.dlStore.tabIndex;
	SetComboBoxTextValue("dlStore", document.all.txStoreNo.value);
	//alert(document.all.dlSECRET.tabIndex)
	document.all.dlSECRET_Text.tabIndex = document.all.dlSECRET.tabIndex;
	SetComboBoxTextValue("dlSECRET", document.all.txSecNo.value);
	document.all.dlAPPLYLIMIT_Text.tabIndex = document.all.dlAPPLYLIMIT.tabIndex;
	SetComboBoxTextValue("dlAPPLYLIMIT", document.all.txApplyLimit.value);
	document.all.dlTYPE_Text.tabIndex = document.all.dlTYPE.tabIndex;
	SetComboBoxTextValue("dlTYPE", document.all.txFromDocType.value);
	document.all.dlDOC_CATEGORY_Text.tabIndex = document.all.dlDOC_CATEGORY.tabIndex;
	SetComboBoxTextValue("dlDOC_CATEGORY", document.all.txDocCateGory.value);
	document.all.dlDept1_Text.tabIndex = document.all.dlDept1.tabIndex; //承辦人
	SetComboBoxTextValue("dlDept1", document.all.txDeptNo.value);
	//document.all.dlDept_Text.tabIndex = document.all.dlDept.tabIndex;   //發文者提示
	//SetComboBoxTextValue("dlDept", document.all.txDeptNo.value);
	document.all.dllIssueNoWord_Text.tabIndex = document.all.dllIssueNoWord.tabIndex; //發文字號
	SetComboBoxTextValue("dllIssueNoWord", document.all.txIssueNoWord.value);
	document.all.dlEmp_Text.tabIndex = document.all.dlEmp.tabIndex;
	SetComboBoxTextValue("dlEmp", document.all.txUsername.value);
    if (document.all["dlEmp"].selectedIndex != -1)
		document.all.htxEmp.value = document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
	else
		document.all.htxEmp.value = "";
	document.all.htxEmp.value = document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
	document.all.dlMedia_Text.tabIndex = document.all.dlMedia.tabIndex;
	SetComboBoxTextValue("dlMedia", document.all.txMedia.value);
	document.all.dlKEEPSTATE_Text.tabIndex = document.all.dlKEEPSTATE.tabIndex;
	SetComboBoxTextValue("dlKEEPSTATE", document.all.txKeepState.value);
}

function ChkEFileVolNo()
{
	if (document.all["tbVOL"].value!="")
	{
		if(document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value =="2") //電子檔案
		{
			if(document.all.tbVOL.value.substring(0,2) != document.all.INIT_EVOLNO.value)
				return false;
		}
		else
		{
			if(document.all.tbVOL.value.substring(0,2) == document.all.INIT_EVOLNO.value)
				return false;
		}
	}
	return true;
}

function SetComboBoxTextValue(argDlObjName, argVal)
{
	document.all[argDlObjName+"_Text"].value = document.all[argDlObjName].options[document.all[argDlObjName].selectedIndex].text;
}

function FormOpenValid()
{
	var IsValid = true;
	var HasDoc = false;
	var HasFileNo = false;
	if(document.all["tbDOC_NO"].value!="")
		HasDoc = true;
	if(document.all["tbYEAR"].value!="" && document.all["tbCLS"].value!="" && document.all["tbCASE"].value!=""
		&& document.all["tbVOL"].value!="" && document.all["tbSEQ"].value!="")
		HasFileNo = true;
	if(!HasDoc &&  !HasFileNo)
	{
		IsValid = false;
		alert("請輸入公文文號或是完整檔號，再執行開啟");
	    
	    $("#tbDOC_NO")[0].focus();
	}
    //銓敘部增加檢核提醒是否以現在人員設定為管理人員
    //* 2023.04.19   Cloud   需求序7  不檢核是否有管理人員
	/*if (IsValid) {
	    var resultE = AK.AKM330_MOCS.CheckMgrUSER(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value;
	    if (resultE != "NoData") {
	        if (resultE != "Y") {
	            if (resultE.indexOf("ERR") != -1) {
	                IsValid = false;
	                alert("歸檔人員檢核異常-" + resultE);
	            }
	            else {
	                if (!window.confirm("當前分類號/姓氏尚無所屬歸檔人員，是否確定編目?[確定]則將於編目完成後設定當前人員為歸檔人員，[取消]則不進行開啟"))
	                    IsValid = false;
	            }
	        }
	    }
	}*/
	return IsValid;
}

function ReturnValue()
{
	//如為AKT116呼叫則僅將公文文號、分類號、案次號、案名及併案狀態回傳AKT116. ∵AKT116會依前述資料修改公文基資
	//2004-03-30 增加回傳 txErrDocDetail 的內容是否有值 -> 即此公文是否有錯誤記錄
	if (document.all["txMode"].value == "m")  
	{
		opener.document.all.lbReturnValue.length = 7;
		opener.document.all.lbReturnValue.options[0].text	= document.all["tbDOC_NO"].value;
		opener.document.all.lbReturnValue.options[0].value	= document.all["tbDOC_NO"].value;
		opener.document.all.lbReturnValue.options[1].text	= document.all["tbCLS"].value;
		opener.document.all.lbReturnValue.options[1].value	= document.all["tbCLS"].value;
		opener.document.all.lbReturnValue.options[2].text	= document.all["tbCASE"].value;
		opener.document.all.lbReturnValue.options[2].value	= document.all["tbCASE"].value;
		opener.document.all.lbReturnValue.options[3].text	= document.all["txCaseName"].value;
		opener.document.all.lbReturnValue.options[3].value	= document.all["txCaseName"].value;
		if (document.all.cbComNo.checked)
		{
			opener.document.all.lbReturnValue.options[4].text	= "1";
			opener.document.all.lbReturnValue.options[4].value	= "1";
		}
		else
		{
			opener.document.all.lbReturnValue.options[4].text	= "0";
			opener.document.all.lbReturnValue.options[4].value	= "0";
		}
		//[001273]Cola 當 htxClsKey為空時，給予其值為0，避免爾後執行AKT116WS-ModifyTable時出錯
		if(document.all["htxClsKey"].value == "")
			document.all["htxClsKey"].value = "0";
			
		opener.document.all.lbReturnValue.options[5].text	= document.all["htxClsKey"].value;
		opener.document.all.lbReturnValue.options[5].value	= document.all["htxClsKey"].value;
		
		if(document.all.txErrDocDetail.value != "")
		{
			opener.document.all.lbReturnValue.options[6].text	= "Y";
		}
		else
		{
			opener.document.all.lbReturnValue.options[6].text	= "";
		}

		opener.window.CallBack("AKM330_MOCS");


		//96.03.13 960061 David
		if(document.all["EAT220_CALLER_ID"] != null)
		{
			var CallerID = document.all["EAT220_CALLER_ID"].value;
			if(CallerID == "EAT220")
				window.close();
		}

		//[MAC610003]Add by Cola - save完後close -
		if(document.all["AKT116_CALLER"] != null)
		{
			var Caller = document.all["AKT116_CALLER"].value;
			if(Caller == "AKT116")
				window.close();		
		}


	}
    //close();
}


function UserOnBlur(Userobj)
{
	try
	{
		document.all["htxEmp"].value =  document.all["dlEmp_Text"].value;
	}catch(e){}
	
	if(Userobj.options == null)
		return;
	if(Userobj.options.length == 0)
		return;
	var index = Userobj.selectedIndex;
	if(index == -1)
		return;
	document.all["htxEmp"].value =  Userobj.options[index].value;
}


function COM_NO_onChange(argObjName)
{
    document.all.cbComNo.checked = false;
    //1110811 Cloud 1110418 增加同步密件流水號-S
    if (document.all.dlSECRET.selectedIndex >= 2) {
        document.all["btSecSeq"].disabled = false;
        document.all["txSecSeq"].disabled = false;
        document.all.txSecSeq.style.backgroundColor = "#FFFFFF";
        document.all["txSecSeq"].value = "";
    }
    //1110811 Cloud 1110418 增加同步密件流水號-E

}

function jf_WindowOnUnLoad()
{
	ReturnValue();
	
}
//95.11.01 950869 David
//function CheckFileValueProcess()
function CheckFileValueProcess(argType)
{
	var KeyName = new Array(7);
	KeyName[0] = "SOURCE_ORGNO";
	KeyName[1] = "FILE_YEAR";
	KeyName[2] = "FILE_CLS";
	KeyName[3] = "FILE_CASE";
	KeyName[4] = "FILE_VOL";
	KeyName[5] = "FILE_SEQ";
	KeyName[6] = "DOC_NO!";
	var KeyValue = new Array(7);
	KeyValue[0] = document.all["tbOrgNo"].value;
	KeyValue[1] = document.all["tbYEAR"].value;
	KeyValue[2] = document.all["tbCLS"].value;
	KeyValue[3] = document.all["tbCASE"].value;
	KeyValue[4] = document.all["tbVOL"].value;
	KeyValue[5] = document.all["tbSEQ"].value;
	KeyValue[6] = document.all["tbDOC_NO"].value;
	var RtnFld = new Array(2);
	RtnFld[0] = "DOC_NO";
	RtnFld[1] = "COM_NO";
	RtnFld[2] = "COM_TYPE";
	var OrdFldName = new Array(1);
	OrdFldName[0] = "DOC_NO";

	var param = new Array(5);
	param[0] = "DOC_MAIN";
	param[1] = KeyName;
	param[2] = KeyValue;
	param[3] = RtnFld;
	param[4] = OrdFldName;
	if(document.all["tbYEAR"].value == "" || document.all["tbCLS"].value == "" || document.all["tbCASE"].value == "" || document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "")
		return true;
	else
	{
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
		//1060601 Cloud 1050087 升級二代
		//if(RtnObj.value==null || RtnObj.value.RtnField0[0]=="true")
		if((RtnObj.value==null || RtnObj.value.RtnField0 == null ) ||  RtnObj.value.RtnField0[0]=="true")
			return true;
		else
		{
			//表併件
			if (document.all["cbComNo"].checked == true)
			{
				if (document.all["tbCOM_NO"].value == RtnObj.value.RtnField0[0])
					return true;
				if (document.all["tbCOM_NO"].value == RtnObj.value.RtnField1[0])
					return true;
			}
			//非併件
			if(RtnObj.value.RtnField1[0] != "")				
			{
				//95.10.25 950869 David
				//因WS已取得值，但此次取得的COM_NO"不為空白"
				//表示此文已是併件，此次動作應為使用者欲取消併件
				//所以其檔號會與先前併件的文號重複
				//應提示使用者重新編卷
				if(document.all["tbDOC_NO"].value != RtnObj.value.RtnField1[0])
				{
					if(argType == 1)
						alert("檔號與公文文號："+RtnObj.value.RtnField0[0]+"相同，請重新編卷");					
				}
				else
					return RtnObj.value.RtnField1[0];
			}
				//alert("檔號與公文文號："+RtnObj.value.RtnField1[0]+"相同");
			else
				//95.10.25 950869 David 
				//因WS已取得值，此次動作COM_NO為"空白"
				//表示此文的檔號與非併件某一個文號的檔號重複
				//所以應提示使用者目前此份文的檔號與WS取得的檔號重複
				//提示使用者重新編卷
				alert("檔號與公文文號："+RtnObj.value.RtnField0[0]+"相同，請重新編卷");
		    //1060321 Cloud 1050087 升級二代
		    //document.all["tbSEQ"].focus();
		    $("#tbSEQ")[0].focus();
			return false;
		}
		if (RtnObj.value.ErrorClass.IsErr)
			return false;
		else
			return true;
	}
}
//mickey 將發文字及發文號 update到發文字號欄位
function jf_GetIssueNo()
{
	var strINo = jf_Trim(document.all["tbINO"].value);
	var strINoWord = jf_Trim(document.all["dllIssueNoWord_Text"].value);
	if(strINo =="")
	{
		alert("請輸入發文號");
	}
	else if(strINoWord =="")
	{
		alert("請輸入發文字");
	}
	else
	{
		document.all["tbIssueNo"].value=strINoWord+"字第"+strINo+"號";
	}
}
//[0960446]Add by Cola 將來文字及來文號 update到發文字號欄位
function jf_GetFromNo()
{
	var strINo = jf_Trim(document.all["tbFNO"].value);
	var strINoWord = jf_Trim(document.all["txFromNoWord"].value);
	var ErrMsg = "";
	var num = 0 ;
	if(strINoWord =="")
	{
		ErrMsg +="來文字";
		num ++;
	}
	if(strINo =="")
	{
		if (num == 1)
			ErrMsg +="、來文號";
		else if (num == 0)
			ErrMsg ="來文號";
	}
	if (ErrMsg != "")
	{
		alert("下列欄位不可空白："+ErrMsg);
	}
	else
	{
		document.all["tbFromNo"].value=strINoWord+"字第"+strINo+"號";
	}
}

function Change_dllIssueNoWord(argtype)
{
	if(argtype >"1")
	{
		var argSecIssueWordList = document.all["TxIndexSecIssueWord"].value;
		var argSecIssueWordArr = argSecIssueWordList.split(';');
		//clear the ComboBox of User
		len = document.all["dllIssueNoWord"].length;
		for(var i=0 ; i<len ; i++)
			document.all["dllIssueNoWord"].remove(0);
		//加入密等發文字
		len_new = argSecIssueWordArr.length;
		document.all["dllIssueNoWord"].options.add(new Option("",""));
		for(var i=0 ; i<len_new ; i++)
		{
			var objOption = new Option(argSecIssueWordArr[i],argSecIssueWordArr[i]);
			document.all["dllIssueNoWord"].options.add(objOption);
		}
	}
	else 
	{
		var argSecIssueWordList = document.all["TxIndexIssueWord"].value;
		var argSecIssueWordArr = argSecIssueWordList.split(';');
		//clear the ComboBox of User
		len = document.all["dllIssueNoWord"].length;
		for(var i=0 ; i<len ; i++)
			document.all["dllIssueNoWord"].remove(0);
		//加入非密等發文字
		len_new = argSecIssueWordArr.length;
		document.all["dllIssueNoWord"].options.add(new Option("",""));
		for(var i=0 ; i<len_new ; i++)
		{
			var objOption = new Option(argSecIssueWordArr[i],argSecIssueWordArr[i]);
			document.all["dllIssueNoWord"].options.add(objOption);
		}
	}
}

//95.10.11 950489 David
var CallWS_ID_SECT
var CallWS_ID_Emp1
var CallWS_ID_Emp2
//1100127 Cloud 1091010 中榮提供維護原始承辦單位
var CallWS_ID_OSECT
var CallWS_ID_OEmp1
var CallWS_ID_OEmp2
function SyncDL(argDLObj)
{	
	//alert(document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value);
	var strArr1 = new Array();
	var strArr2 = new Array();	
	var bAction = true;
	
	//0960084 Add by Cola 取得/設定 相關資訊 -- start --
	var bDept = false;
	var bSect = false;
	
	//1000713	Jeff	1000573 只要有更動單位任何相關下拉選單 承辦人職稱欄位自動清空
//1100127 Cloud 1091010 中榮提供維護原始承辦單位
    if (argDLObj.toUpperCase().indexOf("O") != -1 && argDLObj != "NoSect1" && argDLObj != "NoSect2")
    {
    	for (var i = 0 ; i < document.all["OdlDept1"].length ; i++)
    	{
    		if (document.all["OdlDept1"].options[i].text == document.all["OdlDept1_Text"].value)
    		{
    			document.all["OdlDept1"].selectedIndex = i;
    			document.all["OtxDeptNo_h"].value = document.all["OdlDept1"].options[i].value.split(':')[0];
    			bDept = true;
    			break;
    		}
    	}
    	for (var i = 0 ; i < document.all["OdlSect1"].length ; i++)
    	{
    		if (document.all["OdlSect1"].options[i].text == document.all["OdlSect1_Text"].value)
    		{
    			document.all["OdlSect1"].selectedIndex = i;
    			document.all["OtxSectNo_h"].value = document.all["OdlSect1"].options[i].value.split(':')[2];
    			bSect = true;
    			break;
    		}
    	}

    	if (!bDept)
    	{
    		document.all["OdlDept1"].selectedIndex = -1;
    		document.all["OtxDeptNo_h"].value = "";
    	}
    	if (!bSect)
    	{
    		document.all["OdlSect1"].selectedIndex = -1;
    		document.all["OtxSectNo_h"].value = "";
    	}

    	if (argDLObj == "OdlDept1")
    	{
    		if (document.all["OdlDept1"].selectedIndex == -1)
    		{
    			if (document.all["OdlDept1_Text"].value != "")
    			{
    				ClearDL(document.all.OdlEmp1);
    				ClearDL(document.all.OdlSect1);
    				return;
    			}
    		}
    	}
    }
    else
    {
	
		document.all["txTitle"].value="";
		
		for ( var i = 0 ; i < document.all["dlDept1"].length ; i++)
		{
			if(document.all["dlDept1"].options[i].text == document.all["dlDept1_Text"].value )
			{
				document.all["dlDept1"].selectedIndex = i;
				document.all["txDeptNo_h"].value = document.all["dlDept1"].options[i].value.split(':')[0];
				bDept = true;
				break;
			}
		}
		for ( var i = 0 ; i < document.all["dlSect"].length ; i++)
		{
			if(document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value )
			{
				document.all["dlSect"].selectedIndex = i;
				document.all["txSectNo_h"].value = document.all["dlSect"].options[i].value.split(':')[2];
				bSect = true;
				break;
			}
		}
		
		if (!bDept)
		{
			document.all["dlDept1"].selectedIndex = -1;
			document.all["txDeptNo_h"].value = "";
		}
		if (!bSect)
		{
			document.all["dlSect"].selectedIndex = -1;
			document.all["txSectNo_h"].value = "";
		}
		
		if(argDLObj == "dlDept1")
		{	
			if(document.all["dlDept1"].selectedIndex == -1)
			{
				if (document.all["dlDept1_Text"].value !="")
				{
					ClearDL(document.all.dlEmp);//add by cola
					ClearDL(document.all.dlSect);
					return;
				}
			}
		}
	}
	//Cola -- end --
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位-S
    if (argDLObj.toUpperCase().indexOf("O") != -1 && argDLObj != "NoSect1" && argDLObj != "NoSect2")
    {
    	if (argDLObj == "OdlDept1" || argDLObj == "ONoSect1" || argDLObj == "ONoSect2")
    	{
    		if (document.all["OdlDept1"].selectedIndex != -1)
    		{
    			strArr1 = document.all["OdlDept1"].options[document.all["OdlDept1"].selectedIndex].value.split(':');
    			document.all["OtxDeptNo_h"].value = strArr1[0];
    		}
    		else
    			bAction = false;
    	}
    	if (argDLObj == "OdlSect1")
    	{
    		if (document.all["OdlSect1"].selectedIndex != -1 && jf_Trim(document.all["OdlSect1_Text"].value) != "")
    		{
    			strArr2 = document.all["OdlSect1"].options[document.all["OdlSect1"].selectedIndex].value.split(':');
    			document.all["OtxSectNo_h"].value = strArr2[2];
    			document.all["OtxSectName_h"].value = strArr2[3];
    		}
    		else if (jf_Trim(document.all["OdlSect1_Text"].value) == "")
    		{
    			strArr1 = document.all["OdlDept1"].options[document.all["OdlDept1"].selectedIndex].value.split(':');
    			document.all["OtxDeptNo_h"].value = strArr1[0];
    			document.all["OtxSectNo_h"].value = "";
    			document.all["OtxSectName_h"].value = strArr1[1];
    			argDLObj = "OdlDept1";
    			bAction = true;
    		}
    		else
    			bAction = true;
    	}
    	//1100127 Cloud 1091010 中榮提供維護原始承辦單位-E
    }
    else
    {
		if(argDLObj == "dlDept1" || argDLObj == "NoSect1" || argDLObj == "NoSect2")
		{
			if(document.all["dlDept1"].selectedIndex != -1)
			{
				strArr1 = document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value.split(':');	
				document.all["txDeptNo_h"].value = strArr1[0];
				//95.10.13 950489 David 			
				//document.all["txSectNo_h"].value = "";//Marked by Cola
				//document.all["txSectName_h"].value = strArr1[1];	//Marked by Cola
			}
			else
				bAction = false;
		}
		if(argDLObj == "dlSect")	
		{			
			if(document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "" )
			{
				strArr2 = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value.split(':');				
				//document.all["txSectNo_h"].value = strArr2[0];//Marked by Cola 因應修改組出方法, 因此取得方法跟著變動
				//document.all["txSectName_h"].value = strArr2[1];//Marked by Cola因應修改組出方法, 因此取得方法跟著變動
				document.all["txSectNo_h"].value = strArr2[2];
				document.all["txSectName_h"].value = strArr2[3];						
			}
			else if(jf_Trim(document.all["dlSect_Text"].value) == "")
			{
				strArr1 = document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value.split(':');	
				document.all["txDeptNo_h"].value = strArr1[0];
				//95.10.13 950489 David 
				document.all["txSectNo_h"].value = "";
				document.all["txSectName_h"].value = strArr1[1];	
				argDLObj = "dlDept1";
				bAction = true;		
			}
			else
				bAction = true;//Modify by Cola false => true , 為了能夠清空dlEmp (當輸入不存在之科時)
		}
	}
	//取二級單位用
	var param1 = new Array(3);
	param1[0] = false;
	param1[1] = true;
	param1[2] = strArr1[0];
	//取承辦人用
	var param2 = new Array(1);
	//param2[0] = strArr2[0];	//Marked by Cola 因應修改組出方法, 因此取得方法跟著變動
	param2[0] = strArr2[2];	
	//無二級單位時取承辦人用
	var param3 = new Array(1);
	param3[0] = strArr1[0];
	
	var RtnObjSect;	
	
	//96.02.26 000189 David
	//if(OD_FLOW_TYPE == "2")
	//{
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
	//if (argDLObj == "dlDept1" && bAction) {
    if ((argDLObj == "dlDept1" || argDLObj == "OdlDept1") && bAction)
		{	
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
    	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
    	if (argDLObj.toUpperCase().indexOf("O") != -1)
    		CallWS_ID_OSECT = RtnObjSect.id;
		else
			CallWS_ID_SECT = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
	//if (argDLObj == "dlSect" && bAction) {
    if ((argDLObj == "dlSect" || argDLObj == "OdlSect1") && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param2);
    	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
    	if (argDLObj.toUpperCase().indexOf("O") != -1)
    		CallWS_ID_OEmp1 = RtnObjSect.id;
    	else
			CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	
		//若無二級單位，則以一級單位為主，取得其下承辦人
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
	//if (argDLObj == "NoSect1" && bAction) {
    if ((argDLObj == "NoSect1" || argDLObj == "ONoSect1") && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
	    	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
	    	if (argDLObj.toUpperCase().indexOf("O") != -1 && argDLObj != "NoSect1" && argDLObj != "NoSect2")
	    		CallWS_ID_OEmp1 = RtnObjSect.id;
	    	else
				CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
	//if (argDLObj == "NoSect2" && bAction) {
    if ((argDLObj == "NoSect2" || argDLObj == "ONoSect2") && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
	    	//1100127 Cloud 1091010 中榮提供維護原始承辦單位
	    	if (argDLObj.toUpperCase().indexOf("O") != -1 &&  argDLObj != "NoSect1" && argDLObj != "NoSect2")
	    		CallWS_ID_OEmp2 = RtnObjSect.id;
	    	else
				CallWS_ID_Emp2 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	/*}
	else	//96.02.26 000189 David
	{
		argDLObj = "NoSect2";
		if(argDLObj == "NoSect2" && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
			CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	}*/
}

CheckComNoHiddenField();
//95.11.15 955195 David
//檢查隱藏欄位是否有值，有值才Load AKI811
function CheckComNoHiddenField()
{
	if(document.all["AKI811_COM"])
	{
		if(jf_Trim(document.all["AKI811_COM"].value) != "")
		{
		//	alert(2);
			jf_OpenSumComWin(jf_Trim(document.all["AKI811_COM"].value));
		}		
	}
}

//95.11.15 955195 David
//開啟AKI811用
function jf_OpenSumComWin(sUrl)
{
	//alert(1);
    SumComWin = open(sUrl, "SumComWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //1060321 Cloud 1050087 升級二代
	//SumComWin.focus();
}

//95.12.14 955218 David
function CheckBeforeGetStock()
{
	var Year = jf_Trim(document.all["tbYEAR"].value);
	var Cls = jf_Trim(document.all["tbCLS"].value);
	var Case = jf_Trim(document.all["tbCASE"].value);
	var Vol = jf_Trim(document.all["tbVOL"].value);
	var ErrMsg = "";
	
	if(Year == "" )
		ErrMsg = "年度號不可空白\n";
	if(Cls == "" )
		ErrMsg += "分類號不可空白\n";
	if(Case == "" )
		ErrMsg += "案次號不可空白\n";
	if(Vol == "" )
		ErrMsg += "卷次號不可空白\n";
		
	if(jf_Trim(ErrMsg) != "")
	{
		alert(ErrMsg);
		return false;
	}
	return true;
}

//95.12.14 955218 David
var ws_CallStockID = "";
function GetStockNo()
{
/*
	var CLS = jf_Trim(document.all["tbCLS"].value);
	var OrgNo = jf_Trim(document.all["txhOrg"].value);
	var User = jf_Trim(document.all["txhUser"].value);
	
	var Param1 = new Array(3);
	Param1[0] = CLS;
	Param1[1] = OrgNo;
	Param1[2] = User;
*/	
	var Year = jf_Trim(document.all["tbYEAR"].value);
	var CLS = jf_Trim(document.all["tbCLS"].value);
	var CASE = jf_Trim(document.all["tbCASE"].value);
	var VOL = jf_Trim(document.all["tbVOL"].value);
	var OrgNo = jf_Trim(document.all["txhOrg"].value);
	var User = jf_Trim(document.all["txhUser"].value);
	
	var Param1 = new Array(6);
	Param1[0] = Year;
	Param1[1] = CLS;
	Param1[2] = CASE;
	Param1[3] = VOL;
	Param1[4] = OrgNo;
	Param1[5] = User;

	//callObj = jf_CallWS("AKM399.asmx","btGetStockNo",false,Param1);
	callObj = jf_CallWS("AKM399.asmx","CheckStockInDocMain",false,Param1);
	ws_CallStockID = callObj.id;
	OnWSResult(callObj);
}


//MATTE 0960723 001206  密等為普通以上時，應用限制自動帶不開放
function ddlSelectByText(argSelectId,argSelectTextValue)
{
	if(argSelectTextValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].text == argSelectTextValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}
function ddlSelect(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].value == argSelectValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

function GetFileComBoSeq()
{
	if(jf_Trim(document.all["tbCOM_NO"].value) == "" || document.all["cbComNo"].checked == false)
	{
		document.all["txFileComboSeq"].value = "01";//[0970042]Modify by Cola 若無併件，預設跳01
		return;
	}
	else
	{
        //1070830 Zen 1070678 弱掃Ajax修正
        //var resultE = AKM330.GetFileComSeq(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value);
        var resultE = AK.AKM330_MOCS.GetFileComSeq(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value);
		if((jf_Trim(document.all["tbCOM_NO"].value) !="") ) 
		{
			if(jf_Trim(document.all["tbCOM_NO"].value) == jf_Trim(document.all["tbDOC_NO"].value)) 
				document.all["txFileComboSeq"].value = "01";
			else
			{
				document.all["txFileComboSeq"].value = resultE.value;
				if(document.all["txFileComboSeq"].value == "01")
					document.all["txFileComboSeq"].value = "02";
				else if(document.all["txFileComboSeq"].value == "")
					document.all["txFileComboSeq"].value = "02";
			}
		}
		//[001504]若為電子檔案, 則不給予流水號
		if (jf_Trim(document.all["txDocFileType"].value) == "2")
			document.all["txFileComboSeq"].value = "";		
	}	
}
/*function GetYearValid()
{
	var resultE = AKM330.CheckYearValid(document.all["h_sourceorgno"].value,document.all["tbDOC_NO"].value,document.all["tbKeep_Year"].value);
	return resultE.value;
}*/
function padLeft(str, pad, count) {
while(str.length<count)
str=pad+str;
return str;
}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}
function CheckDate(id)
{
	var strDateValue ;
	strDateValue = document.all[id].value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all[id].value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["應解密日期"])), "");
	    //1060321 Cloud 1050087 升級二代
	    //document.all[id].focus();
	    $('#'+id).focus();
		document.all[id].value = "";
	}
}
//[0970679]Add by Cola 為了取得SamLart
//與網址參數的處理有關函式*************start
function GetParam(p)
{
	//* 2020.12.28	Cloud	1090885	配合url移除權杖，調整線上瀏覽取得權杖行為
	/*var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if(rg_szItems.length==2)
	{
		var rg_szItems2 = rg_szItems[1].split("&");
		for(var i=0; i<rg_szItems2.length; i++)
		{
			var rg_items = rg_szItems2[i].split("=");
			if(rg_items[0] == "SAMLart")
				return rg_items[1];
		}
		
	}*/
	return jf_GetArtifact();
}
//與網址參數的處理有關函式************* end
//Cola -- end --

//[0990366]	Davy	增加檢查時間格式(HHMM)
function CheckTIME(argObj,strMsg)
{
	var strTime = document.all[argObj].value;
	if (strTime != "")
	{
		var strH = strTime.substr(0,2);
		var strM = strTime.substr(2,2);
		if (strH > 23 || strM > 59)
		{
		    //1060321 Cloud 1050087 升級二代
		    //document.all[argObj].focus();
		    $('#'+argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			return false;
		}
	}
	return true;
}
//20120605 Cloud 1010369 依領務局要求，新增針對併案、併件關係時提供更動檔號時相關提示功能
function CheckComFileSeq()
{
		var strDocYear=document.all["tbYEAR"].value;
		var strDocCls=document.all["tbCLS"].value;
		var strDocCase=document.all["tbCASE"].value;
		var strDocVerNo=document.all["tbVerNo"].value;
		var strComYear=document.all["htxFileYear"].value;
		var strComCls=document.all["htxFileCls"].value;
		var strComCase=document.all["htxFileCase"].value;
		var strComVerNo=document.all["htxVerNo"].value;
		if(strDocYear==strComYear && strDocCls==strComCls && strDocCase==strComCase && strDocVerNo==strComVerNo)
		return;
		if(window.confirm("母子文案次號不一致，是否自動將母文案次號更新至子文？"))
		{
			document.all["tbYEAR"].value=document.all["htxFileYear"].value;
			document.all["tbCLS"].value=document.all["htxFileCls"].value;
			document.all["tbCASE"].value=document.all["htxFileCase"].value;
			document.all["tbVerNo"].value=document.all["htxVerNo"].value;	
		}
		else
		return;
}
//1021217	Cloud	[1020985]	修改保存模式，下拉選單不會連動清除下層值的bug
function GetText(argObj)
{
	if (argObj=="dlDept1")
	{
		document.all.txDeptName.value = document.all["dlDept1_Text"].value;
	}
	if (argObj=="dlSect")
	{
		document.all.txSectName.value = document.all["dlSect_Text"].value;	
	}
	if (argObj=="dlEmp")
	{
		document.all.txEmpName.value = document.all["dlEmp_Text"].value;	
	}
	//1100127 Cloud 1091010 新增原始承辦單位供維護-s
    if (argObj == "OdlDept1")
    {
    	document.all.OtxDeptName.value = document.all["OdlDept1_Text"].value;
    }
    if (argObj == "OdlSect1")
    {
    	document.all.OtxSectName.value = document.all["OdlSect1_Text"].value;
    }
    if (argObj == "OdlEmp1")
    {
    	document.all.OtxEmpName.value = document.all["OdlEmp1_Text"].value;
    }
	//1100127 Cloud 1091010 新增原始承辦單位供維護-e
	//1031204 Gabby[1030888] 儲存前將承辦資訊欄位值放入隱藏欄位
	if(argObj=="All")
	{
		document.all.txDeptName.value = document.all["dlDept1_Text"].value;
		document.all.txSectName.value = document.all["dlSect_Text"].value;
		document.all.txEmpName.value = document.all["dlEmp_Text"].value;
		//1100127 Cloud 1091010 新增原始承辦單位供維護-S
        document.all.OtxDeptName.value = document.all["OdlDept1_Text"].value;
        document.all.OtxSectName.value = document.all["OdlSect1_Text"].value;
        document.all.OtxEmpName.value = document.all["OdlEmp1_Text"].value;
    	//1100127 Cloud 1091010 新增原始承辦單位供維護-E
	}
	//Gabby--END
}
//1031226   Cloud   增加函式，for取得分類名-不再以程式onblur方式取得避免document.activeElement 判斷異常
function GetClsName()
{
    var param1 = new Array(3);
    //1051205   Kenny   [1051150]   修改Client Potential Code Injection--Start--
    //param1[0] = document.all["tbVerNo"].value;
    //param1[1] = document.all["tbCLS"].value;
    //param1[2] = document.all["tbYEAR"].value;
    param1[0] = encodeURI(document.all["tbVerNo"].value);
    param1[1] = encodeURI(document.all["tbCLS"].value);
    param1[2] = encodeURI(document.all["tbYEAR"].value);
    //1051205   Kenny   [1051150]   修改Client Potential Code Injection--End--
    RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);
    iCallID_CLS = RtnObj.id;
    OnWSResult(RtnObj);
}
//1031226   Cloud   增加函式，for取得案次名
function GetCASEName()
{
    //1111120 銓敘部個人檔另外處理
    if (document.all["tbCLS"].value != "11") {

        var param = new Array(5);
        param[0] = document.all["tbYEAR"].value;
        param[1] = document.all["tbCLS"].value;
        param[2] = document.all["tbCASE"].value;
        param[3] = "";//ONLBLUR時，更換案次號，鍵值還未取回不可使用-故傳入空白
        param[4] = document.all["tbVerNo"].value;
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
        iCallID_CASE = RtnObj.id;
        OnWSResult(RtnObj);
    }
    
}
//1040707	Kevin_C	1040476	新增函式，以長官核判日期、發文日期、來文日期判斷文件產生日期
function SetCrtDate()
{
	var strTempCrtDate = document.all["tbCrtDate"].value;
	if(document.all["tbIDATE"].value != "")//發文日期
		strTempCrtDate = document.all["tbIDATE"].value;
	else if(document.all["tbFDATE"].value != "")//來文日期
		strTempCrtDate = document.all["tbFDATE"].value;
	else if(document.all["h_txApprovedDate"].value != "")//長官核判日期
		strTempCrtDate = document.all["h_txApprovedDate"].value;
	//* 2021.09.01	Cloud	1100871	修正文件產生日檢核邏輯不同及未依法規帶出文件產生日問題以上皆空白時-使用辦畢日
	if(strTempCrtDate=="")
		strTempCrtDate = document.all["tbCDATE"].value;
	//1040804	Kevin_C	判斷長度做切割
		if(strTempCrtDate.length>7)
			strTempCrtDate = strTempCrtDate.substring(0,7);
	document.all["tbCrtDate"].value = strTempCrtDate;
}
// 2015.11.13	Cloud	1040921	(merge)1020425點選編卷按鈕時增加回傳清理處置資料
function GetClearProcWord(strNo)
{
	var strRtn = "";
	switch(strNo)
	{
		case "1":
			strRtn = "列為國家檔案";
			break;
		case "2":
			strRtn = "機關永久保存";
			break;
		case "3":
			strRtn = "依規定程序銷毀";
			break;
		case "4":
			strRtn = "屆期後鑑定";
			break;
	}
	
	return strRtn;
}
//1080309 CLOUD	1081109 增加年度/版本互轉WS
var iCallID_YearVerNo;
var CurrentObjId;
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["tbYEAR"].value;
	var strVerNo = document.all["tbVerNo"].value;
	if ((strYear == "" && argCallFrom == "Year") || (strVerNo == "" && argCallFrom == "VerNo"))
		return;
	var param1 = new Array(3);
	param1[0] = strYear;
	param1[1] = strVerNo;
	param1[2] = argCallFrom;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetVerYear", false, param1);
	iCallID_YearVerNo = RtnObj.id;
	OnWSResult(RtnObj);
}
//* 2020.11.16	Cloud	1090792	配合法規調整保存狀況代碼，新增已遺失註記與連動-S
function CheckDosState(argCallFrom)
{
	if (document.all["cbIsmiss"].checked && document.all["cbIsDestroy"].checked)
	{
		alert('不可同時勾選[毀損無法修復]與[已遺失]。');
		document.all[argCallFrom].checked = false;

	}
}

//* 2020.11.16	Cloud	1090792	配合法規調整保存狀況代碼，新增已遺失註記-E
// 2021.07.07   Cloud   1100638 新增主旨檢核是否含有身分證格式文字-S
function CheckSub() {
    if (document.all["AKM330_CHECK_FROM_ID"].value == "Y") {
        var idCount = document.all["tbSUB"].value.toUpperCase().match(/[A-Z]\d{9}/ig);
        if (idCount != undefined) {
            if (window.confirm('主旨內有疑似身分證號資料，是否要繼續儲存。')) {
                return true;
            }
            else {
                return false;
            }
        }
        else
            return true;
    }
    else
        return true;
}
// 2021.07.07   Cloud   1100638 新增主旨檢核是否含有身分證格式文字-E
//2021.12.02	Cloud	1101383	參照AKI800，提供併案子視窗線上瀏覽功能-S
function CallBackByImgView()
{
	return opener.theSSO.MP.queryDocList.CallBackByImgView();
	opener.window.focus();
}
//2021.12.02	Cloud	1101383	參照AKI800，提供併案子視窗線上瀏覽功能-E
var PerSonInfo = new Object();
var activeText = "";
//已取過案次號則不再取
var bHasCheckNewCase = false;
//已詢問過的身分證+姓名就不再問
var bHasCheckNameID = "";

function ClientGetPerSonInfo(argID,argName) {
    

    var PerSonInfo = AK.AKM330_MOCS.GetPerSonInfo(document.all["h_sourceorgno"].value, argID, argName, document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value).value;
    if (PerSonInfo.strErrMsg != "")
    { alert("取得個人檔資訊異常：" + PerSonInfo.strErrMsg); }
    else
    {
        if (PerSonInfo.icount != 1) {
            if (PerSonInfo.icount == 0 && bHasCheckNameID != document.all["txFullName"].value + "|" + document.all["txPerID"].value) {
                var AlterMsg = document.all["txFullName"].value + "，於系統中不存在，請問是否立案?";
                if (activeText != "txFullName") {
                    if (document.all["txPerID"].value.length==10)
                        AlterMsg = document.all["txPerID"].value + "，於系統中不存在，請問是否立案?";
                }
                if (window.confirm(AlterMsg)) {
                    bHasCheckNameID = document.all["txFullName"].value + "|" + document.all["txPerID"].value;
                    if (activeText != "txFullName") {
                        if (document.all["txPerID"].value.length==10)
                            document.all["txPerFullID"].value = document.all["txPerID"].value;
                    }
					//* 2023.09.06	Cloud	序287、281    現場實務面有人員改名情況，同一身分證不同姓名，修改更名後，跳出立案應清除鍵值，避免被server端誤判
					document.all["htxCaseKey"].value = "";
                    //已取過新案次號則不再取
                    if (!bHasCheckNewCase) {
                        //立案
                        var NPerSonCaseNo = AK.AKM330_MOCS.GetPerSonCaseNo(document.all["h_sourceorgno"].value, document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value).value;
                        if (NPerSonCaseNo.split('|')[0] != "Y") {
                            alert("立案發生異常：" + NPerSonCaseNo.split('|')[1]);
                        }
                        else {
                            //寫入新案次號、卷次號、目次號、案名
                            document.all["tbCASE"].value = NPerSonCaseNo.split('|')[1];
                            document.all["tbVOL"].value = NPerSonCaseNo.split('|')[2];
                            document.all["tbSEQ"].value = NPerSonCaseNo.split('|')[3];
                            //1120314 Cloud 判斷如傳入完整身分證號，則透過TA取得正確姓名-立案後取得姓名
                            getNameByTa(document.all["txPerID"].value);
                            if (document.all["txPerFullID"].value.length >= 10)
                                document.all["txCaseName"].value = document.all["txFullName"].value + document.all["txPerFullID"].value.substring(0, 1) + document.all["txPerFullID"].value.substring(6);
                            else
                                document.all["txCaseName"].value = document.all["txFullName"].value + document.all["txPerID"].value;
                        }
                        bHasCheckNewCase = true;
                    }
                }
                else
                    $("#" + activeText)[0].focus();
            }
            //2筆以上不做任何事情
        }
        else {
            //如取過一個已存在的，避免又調整資訊，設為未取過
            bHasCheckNewCase = false;
            //姓名欄位onblur-姓名更換，確定是否以新姓名進行編案-是則清空相關欄位
            if (activeText == "txFullName" && PerSonInfo.strFullName != document.all["txFullName"].value) {
                if (window.confirm('身分證號[' + document.all["txPerFullID"].value + ']非[' + document.all["txFullName"].value + ']所屬，是否確定以新姓名進行編目?')) {
                    document.all["txPerFullID"].value = "";
                    document.all["txPerID"].value = "";
                    document.all["txFourNum"].value = "";
                    document.all["htxCaseKey"].value = "";
                    document.all["tbCASE"].value = "";
                    document.all["tbVOL"].value = "";
                    document.all["tbSEQ"].value = "";
                }
                else {
                    document.all["txFullName"].value = PerSonInfo.strFullName;
                }
            }
            else {
                //寫入案次號、卷次號、目次號、案名-身分證、姓名、四角號碼
                document.all["tbCASE"].value = PerSonInfo.CaseNo;
                document.all["tbVOL"].value = PerSonInfo.VolNo;
                document.all["tbSEQ"].value = PerSonInfo.SeqNo;
                document.all["txPerFullID"].value = PerSonInfo.strFullId;
                document.all["txPerID"].value = PerSonInfo.strSId;
                document.all["txFullName"].value = PerSonInfo.strFullName;
                if (document.all["txPerFullID"].value.length >= 10) {
                    //1120314 Cloud 判斷如傳入完整身分證號，則透過TA取得正確姓名
                    if (document.all.txFullName.value=="")
                        getNameByTa(document.all["txPerFullID"].value);
                    document.all["txCaseName"].value = document.all["txFullName"].value + document.all["txPerFullID"].value.substring(0, 1) + document.all["txPerFullID"].value.substring(6);
                }
                else
                    document.all["txCaseName"].value = document.all["txFullName"].value + document.all["txPerFullID"].value.substring(0, 1) + document.all["txPerFullID"].value.substring(6);
                //已立案帶出四角號碼
                document.all["txFourNum"].value = PerSonInfo.FourNo;
                document.all["htxCaseKey"].value = PerSonInfo.PerKey;
            }

        }
    }
    activeText = "";
}
//1120314 Cloud 判斷如傳入完整身分證號，則透過TA取得正確姓名
function getNameByTa(argID)
{
    if (argID.length == 10)
    {
        var wsParam = new Array();
        wsParam[0] = argID;
        var CallWsObj = jf_CallWS("../TA/TAWS.asmx", "GetTBCInfo", false, wsParam);
        if (CallWsObj.value.bSuccess) {
            if (CallWsObj.value.Exist == "1") {
                document.all.txFullName.value = jf_Trim(CallWsObj.value.Name);
                return true;
            }
            else {   
                $('#txPerID').focus();
                return false;
            }
        }
        else {
            $('#txPerID').focus();
            return false;
        }
    }
}