/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2025.09.03 Cloud	1141137	新增外貿客製化AKM330
 * 2025.11.06 Cloud	1141128	補強儲存前檢核是否跳號，跳出提醒
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

var alertTitle = "您輸入之資料有誤，明細如下，請更正後重試";
var strRcvYear = "";//年度號+保存年限
var strYear = ""; //系統年(3碼)
var flagtemp=true;
var ModifyCls = false; //記錄使用者是否有要修改分類號
var NotModifyCls = false; //記錄使用者是否有要修改分類號
var OriginVer_Cls = ""; //記錄原板別/分類號
var OriginVer_ClsKey = ""; //記錄原分類號鍵值
var LayoutModeNew=0;
var LayoutModeModify=1;
var pSecSeqDuplicate=false;
var DeptNo="";
var uDeptName="";
var strStoreNo = "";
var IsOpenAKM330C1=false;
var alertComNo ;
var EAC005 = "";
//記錄該卷目前總頁數用(不包含目前開啟公文及隔頁紙)、紀錄隔頁紙數目用
var VolPage = "0";
var SepPage = "0";
//紀錄母文的分類號鍵值
var strComClsKey = "";
//增加國教院使用時，不自動帶入應解密日期且儲存時密件需檢核必須輸入該日期
var bISNaer = false;

window.onunload = jf_WindowOnUnLoad;
	
if(jf_Trim(document.all["dlSect_Text"].value) == "")
	document.all["dlSect_Container"].disabled = true;
else
	document.all["dlSect_Container"].disabled = false;


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

function jf_IsWebServiceSuccess_AKM330(argResult)
{
	if(argResult.error)
	{
	    
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
			return false;
		}
	}
	
	return true;
	
}

function ShowMsg()
{
    jf_ShowValidator();
}

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

var bGetKeyBeforeSave = true;
var bDubCheck = false;
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

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
    
	xObjectName = event.target.id;
	
	switch (xObjectName) {
	    case "btOpen":	
	        Page_BlockSubmit = !FormOpenValid();	
	        document.all["btOpenChecker"].value = "1";	
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btSave":
	        Page_BlockSubmit = false;
	        if (!CheckSub()) {
	            Page_BlockSubmit = true;
	            return;
	        }
			bGetKeyBeforeSave = true;
	        //為了後續比對，此處先組合國別、處別、細目/產品別
			SetValueToFileCase();
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
	            
	        }
	        if (!bGetKeyBeforeSave) {
	            Page_BlockSubmit = true;
	            bGetKeyBeforeSave = true;
	            break;
	        }

	        TbOnBlur("tbSEQ");
	        TbOnBlur("tbVOL");
	        
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
	        
	        if (jf_Trim(document.all["txInpFileDate"].value) != "") {
	            if (document.all["tbYEAR"].value == "" || document.all["tbCLS"].value == "" || document.all["tbCASE"].value == "" || document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "") {
	                alert('本公文已有完整編目日期，因此不允許部份檔號(年度號/分類號/國別、處別、產品別/細目號/卷次號/件次號)為空，請輸入完整檔號後再進行儲存。');
	                Page_BlockSubmit = true;
	                break;
	            }
	        }
	        
	        if (!TbOnBlur("tbCDATE")) {
	            Page_BlockSubmit = true;
	            break;
	        }

	        if (document.all.txShowComSeq.value == "Y") {

	            if (CheckFileComboSeqDuplicate()) {
	                alert("併案流水號有重複值，請使用其他流水號");

	                $("#txFileComboSeq")[0].focus();
	                Page_BlockSubmit = true;
	                break;
	            }
	        }

	        if (document.all.htxCaseKey.value == "0")
	            document.all.htxCaseKey.value = "";
	        if (document.all.htxCaseKey.value == "" && jf_Trim(document.all["tbCASE"].value) != "") {
	            Page_BlockSubmit = true;
	            break;
	        }
	        //-不需做檢核-案次號鍵值於卷次號ONBLUR後做
	        //if (document.all.htxCaseKey.value != "" && jf_Trim(document.all["tbCASE"].value) != "") {
	        
	        //    var CaseCheckRes = AK.AKM330_TAITRA.CaseCheck(document.all["tbOrgNo"].value, document.all.htxCaseKey.value, document.all["tbCASE"].value).value;
	        //    if (!CaseCheckRes) {
	        //        TbOnBlur("tbCASE");
	        //        TbOnChange("tbCASE");
	        //        Page_BlockSubmit = true;
	        //        alert("更動案次號欄位後，請先重新輸入卷次號及目次號或點選編卷按鈕再進行儲存。");
	        //        $("#tbVOL")[0].focus();
	        //        break;
	        //    }
	        //}
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
	                    $("#tbRDATE")[0].focus();
	                    break;
	                }

	                if (!CheckDateCompare("tbRDATE", "收創文日期", "tbCDATE", "結案日期")) {
	                    Page_BlockSubmit = true;
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
	                    $("#tbVOL")[0].focus();
	                    break;
	                }
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
	                
	                if (document.all["USE_STOCK"].value == "Y") {
	                    if (AK.AKM330_TAITRA.CheckManageMethod(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value != "0") {
	                        if (!CheckFileValueProcess(1))
	                            break;
	                    }
	                }
	                else {
	                    if (!CheckFileValueProcess(1))
	                        break;
	                }
	                //Cola -- end --

	                if (document.all["tbCOM_NO"].value != "" && document.all["tbDOC_NO"].value != document.all["tbCOM_NO"].value && document.all["cbComNo"].checked == true) {
	                    
	                    var strInpDateData = AK.AKM330_TAITRA.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;

	                    var strArrData = new Array();
	                    strArrData = AK.AKM330_TAITRA.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');

	                    if (jf_Trim(strInpDateData) == "" && document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "") {
	                        alert("參照文號尚未編目，因此不允許先對併件子文進行編目，請先將併件母文(參照文號)編目後才可將併件子文編目，或者將併件關係解除。");
	                        Page_BlockSubmit = true;
	                        break;
	                    }
	                    else if (jf_Trim(strInpDateData) != "" && document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "") {
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
	                if (strMsg != "") {
	                    alert(strMsg);
	                    Page_BlockSubmit = true;
	                    break;
	                }
					if (!document.all["tbExtRmvSec_Date"].disabled)
					{
						if (jf_Trim(document.all["tbExtRmvSec_Date"].value) != "")
						{
							if (!jf_CheckCDATE(jf_Trim(document.all["tbExtRmvSec_Date"].value))) {
								jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["應解密日期"])), "");
								$("#tbExtRmvSec_Date")[0].focus();
								document.all["tbExtRmvSec_Date"].value = "";
								break;
							}
						}
						else {
							if (bISNaer) {
								alert('應解密日期不可為空白。');
								break;
							}

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
	        for (var i = 0 ; i < document.all["dlEmp"].length ; i++) {
	            if (document.all["dlEmp"].options[i].text == document.all["dlEmp_Text"].value && document.all["dlEmp_Text"].value != "") {
	                
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

				if (document.all["USE_ODETP_INFO"].value == "Y"){
			    if (document.all["CHECK_DETP_INFO"].value == "Y") {
	            if ((!bDept && document.all["dlDept1_Text"].value != "") || (!bSect && document.all["dlSect_Text"].value != "") || (!bEmp && document.all["dlEmp_Text"].value != "")) {
	                Page_BlockSubmit = true;
	                alert('現行承辦單位/科別不存在系統，將造成調案、年度(清理、銷毀..等)相關作業無法正確進行，不可存入，請再次確認。');
			        }
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
				document.all["OhtxEmp"].value = document.all["OdlEmp1_Text"].value;
	        }
	        else {
	            if (document.all["OdlEmp1"].selectedIndex != -1)
	                document.all["OhtxEmp"].value = document.all["OdlEmp1"].options[document.all["OdlEmp1"].selectedIndex].value;
	            else
	                document.all["OhtxEmp"].value = "";
	        }
	        
	        if (document.all.USE_ODETP_INFO.value == "Y" && document.all["tbOrgNickName"].value == 'MOTC') {
	            if (document.all.tbCrtDate.value > "0910101") {
	                
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

	       
	        document.all["txVolTotalPage"].value = "";

	        GetText("All");

	       
	        if (document.all["tbOrgNickName"].value == "TPVGH")
	            if (document.all["tbVerNo"].value == "" || document.all["tbYEAR"].value == ""
				|| document.all["tbCLS"].value == "" || document.all["tbCASE"].value == ""
				|| document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "")
	                Page_BlockSubmit = !window.confirm("檔號不完全，是否繼續儲存");

	        //1141106 Cloud 1141128 補強使用空號時跳出提醒
			if (!Page_BlockSubmit)//表示前面檢核都過了
			{
				//可以補強檔號有變動就要檢核--但未來再說
				var rtn = AK.AKM330_TAITRA.CheckUseEmpty(document.all["h_sourceorgno"].value, document.all["tbYEAR"].value, document.all.htxClsKey.value, document.all.htxCaseKey.value, document.all.tbVOL.value, document.all.tbSEQ.value, document.all.tbDOC_NO.value).value;
				if (rtn != "") {
					if (rtn.indexOf("ERR") != -1) {
						alert(rtn);
						Page_BlockSubmit = true;
					}
					else {
						if (!window.confirm("本次編目件次號使用空號填補。")) {
							Page_BlockSubmit = true;
						}
					}
				}
	        
			}
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btDelete":
	        Page_BlockSubmit = !jf_ConfirmDelete();
	        
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btCancel":
	        Page_BlockSubmit = !jf_ConfirmCancel();
	        if (document.all.txFileComboSeq)
	        {
	            document.all["txFileComboSeq"].value = "";
	        }
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
	        document.all["txTitle"].value = "";
	        document.all["txVolTotalPage"].value = "";
	        document.all["txClearProc"].value = "";
	        document.all["txOClearProc"].value = "";
	        break;
	    case "btViewDoc":
	        
	        Page_BlockSubmit = true;
	        if (document.all.USE_T2100_OD.value == "0") {
	            var RtnValue = AK.AKM330_TAITRA.ViewDoc(document.all["h_sourceorgno"].value, document.all.txhUser.value, document.all["tbDOC_NO"].value).value;
	            if (RtnValue.indexOf("ERR-") != -1)
	            { alert(RtnValue); }
	            else
	            { jf_ShowModal('AKI800View.ashx'); }
	        }
	        else {
	            try {
	                

	                var wsUrl = document.all.WebFileIO.value;
	                if (wsUrl != "") {
	                    var param = [];
	                    param[0] = GetParam("SAMLart");
	                    param[1] = document.all["tbDOC_NO"].value;
	                    param[2] = document.all["h_sourceorgno"].value;
	                
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
	                                var objViewDoc = {
	                                    UNVObj: UnvObj,
	                                    docInfoPage: "AKM330",
	                                    openDocModule: OpenType,
	                                    signType: document.all["h_signType"].value,
	                                    readOnlyMode: true
	                                };
	                                var $docId = jf_GetSessionID() + "_" + (+new Date());
	                                localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
	                                var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + GetParam("SAMLart") + "&DocId=" + $docId;
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
	        var xUrl = "AKM330C2.aspx?SAMLart=" + GetParam("SAMLart");
	        jf_OpenChildWin(xUrl, "AKM330C2", screen.width - 180, 530);
	        Page_BlockSubmit = true;
	        break;
	    case "btGetStockNo":
	        Page_BlockSubmit = true;
	        if (jf_Trim(document.all["txStockNo"].value) == "") {
	            if (CheckBeforeGetStock())
	                GetStockNo();
	        }
	        else {
	            alert("已有儲位號，不可再要號");
	        }
	        
	        jf_ToolBarSubmit(xObjectName);
	        break;
	        
	    case "btCancelSave":
	        if (document.all["tbYEAR"].value == "" || document.all["tbCLS"].value == "" || document.all["tbCASE"].value == "" || document.all["tbVOL"].value == "" || document.all["tbSEQ"].value == "") {
	            alert('公文無完整檔號，不可使用取消編卷功能。');
	            Page_BlockSubmit = true;
	            break;
	        }
	        else {
	            Page_BlockSubmit = false;
	            jf_ToolBarSubmit(xObjectName);
	        }
	        break;
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

	if(jf_Trim(document.all.txTitle.value)=="")
		getTitle();
	if (document.all["tbCOM_NO"].value=="")
	{
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
		
		document.getElementById("cbComNo").style.pointerEvents = "";
		document.getElementById('cbComNo').style.opacity = "1";
		
		
		if(!document.all["AKI811_COM"])
		{		
		
			var  strArrData =  new Array();
		
			strArrData = AK.AKM330_TAITRA.GetFileNo(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value.split(',');
			document.all.htxFileYear.value = strArrData[0];
			document.all.htxFileCls.value = strArrData[1];
			document.all.htxFileCase.value = strArrData[2];
			document.all.htxFileVol.value = strArrData[3];
			document.all.htxFileSeq.value = strArrData[4];	
			
			if (document.all.cbComNo.checked)
				document.all.htxClsKey.value  = strArrData[5];
			document.all.htxCaseKey.value = strArrData[6];
			DeptNo						  = strArrData[7];
			document.all.htxDocFileType.value	= strArrData[8];
			if (document.all.htxDocFileType.value == "")//justin 0941111 預設紙本檔案
				document.all.htxDocFileType.value = "1";
			uDeptName							= strArrData[9];
			document.all.htxKeepYaer.value		= strArrData[10];
			document.all.hdlSECRET.innerText		= strArrData[11];
			document.all.hdlRmvSec_Cond.innerText = strArrData[12];
		    
			document.all.htxVerNo.value = strArrData[13];
		    
			document.all.hMSecSeq.value = strArrData[14];
		    
			document.all.hMStoreDate.value = strArrData[15];
		}				
	}

	document.all.dlFILE_DOC.Enabled = false;				 
	document.all.dlFILE_DOC.CssClass = "DisplayOnly";
	ShowMsg();
	
	if(document.all["btOpenChecker"].value == "1" && document.all["AKM330_SHOW_CHILD_ALERT"].value == "Y" && document.all.tbCOM_NO.value !="" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)
	{
		alert("本文為子文!");
	}
	document.all["btOpenChecker"].value = "0";	
	if (document.all["tbVerNo"].value == "" && document.all["tbYEAR"].value != "")
	{
		CurrentObjId = "tbYEAR";
		jf_GetClassVer("Year");
	}
	
	//新增記錄原板別+分類號+鍵值
	OriginVer_Cls = document.all["tbVerNo"].value+document.all["tbCLS"].value;
	OriginVer_ClsKey = document.all["htxClsKey"].value;
	//當併案提示功能開啟、且沒有勾選併件功能時，才跳出警示訊息
	if(document.all.AK_AKM330_FILESET_MSG.value == "Y")
	{
		if(document.all.AKM330_DefaultComStatus.value == "Y")
		{
		    document.all.cbComNo.checked = true;
		    if (document.all.dlSECRET.selectedIndex >= 2) {
		        document.all["btSecSeq"].disabled = true;
		        document.all["txSecSeq"].disabled = true;
		        document.all.txSecSeq.style.backgroundColor = "LightGrey";
		        document.all["txSecSeq"].value = document.all.hMSecSeq.value;
		    }
		
			
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
    
	if (document.all["USE_ODETP_INFO"].value == "Y")
    	document.all["OdeptInfo"].className = "";
    else
	    document.all["OdeptInfo"].className = "hide";
    
	if (document.all["OrgNickName"].value == "EXAM")
	    document.all["InpStoreDate"].className = "";
	else
	    document.all["InpStoreDate"].className = "hide";
    
	document.all["tbFromNo"].title = document.all["tbFromNo"].value;
	document.all["tbIssueNo"].title = document.all["tbIssueNo"].value;
	
	if (document.all["OrgNickName"].value == "NAER")
		 bISNaer = true;
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
			
			case "btComSearch":
				Page_BlockSubmit = false;
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
					return;
				}
				if(document.all.AKM330_AutoSeqMode.value != "1")
				{

					var param = new Array(5);
					param[0] = document.all["tbOrgNo"].value;

					param[1] = "20";
					param[2] = strYear = document.all.txSysDate.value.substring(0, 3);
					param[3] = 5;
					param[4] = 1;		
				
					RtnObj =jf_CallW("lib/AK_LIB.asmx","Get_AutoNo1",false,param);
					
					iCallID_Num_SecSeq = RtnObj.id;
					OnWSResult(RtnObj);
				}
				else
				{
					var param = new Array(4);
				
					param[0] = document.all["tbOrgNo"].value;
					param[1] = strYear = document.all.tbCrtDate.value.substring(0,3);
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
                            
						    $("#tbYEAR")[0].focus()
							Page_BlockSubmit = true;
							break;
						}
					}
					if (document.all["ATTACH_LENGTH"].value!="")
					{

						var param = new Array(5);
						param[0] = document.all["tbOrgNo"].value;

						param[1] = "12";
						var UseYear = "";
						if (!isNaN(document.all["tbKeep_Year"].value))//先檢查保存年限是否為數字(有可能為"?")
						{
						    if (document.all["tbYEAR"].value.substr(0,1) == "0")//
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

				if(document.all.cbComNo.checked && document.all.tbCOM_NO.value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)
				{
				    var tmp = AK.AKM330_TAITRA.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
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
					//國別/處別/細目產品別
					//補國別--等資訊
					SetFileCaseToTaitraValue("htxFileCase");

					document.all.tbVOL.value = document.all.htxFileVol.value;
					document.all.tbSEQ.value = document.all.htxFileSeq.value;
					document.all.tbVerNo.value = document.all.htxVerNo.value;
					$("#tbSEQ")[0].focus();
					return;
				}
				
				if(!ChkEFileVolNo())
				{
					if(document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value =="2") //電子檔案
						alert("電子檔案的卷次號必須以 " + document.all.INIT_EVOLNO.value + " 開頭，請確認卷次號後再重新編卷");
					else	
					    alert("紙本檔案的卷次號不可以 " + document.all.INIT_EVOLNO.value + " 開頭，請確認卷次號後再重新編卷");
				    
					$("#tbVOL")[0].focus();
					Page_BlockSubmit = true;
					return;
				}
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
				
				if (document.all["tbVOL"].value!="" && document.all["tbSEQ"].value!="")
				{
				    alert("已編卷，不能自動編卷");
				    $("#tbSEQ")[0].focus();
					Page_BlockSubmit = true;
					return;
				}

				if (document.all["tbVOL"].value=="" && document.all["tbSEQ"].value!="")
				{
				    alert("件次號有值且卷次號為空白，系統無法自動編卷");
				    $("#tbSEQ")[0].focus();
					Page_BlockSubmit = true;
					return;
				}

				if (document.all["tbCLS"].value=="")
				{
				    alert("分類號欄位不可空白");
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
					    $("#tbYEAR")[0].focus();
						Page_BlockSubmit = true;
						break;
					}
				}
				//btAutoVol -編卷-先組成完整案次號
				SetValueToFileCase();
				
				//依外貿邏輯 不該會有通案，MARK相關行為
				//if (document.all["tbCASE"].value=="")
				//{
				//	var param1 = new Array(3);
				//param1[0] = encodeURI(document.all["tbVerNo"].value);
				//param1[1] = encodeURI(document.all["tbCLS"].value);
				//param1[2] = encodeURI(document.all["tbYEAR"].value);
				//	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCLS",false,param1);
				//	iCallID_CLS1 = RtnObj.id;
				//	OnWSResult(RtnObj);
				//}
				//else
				IsGetCase=true;	
				//if (IsGenCase)
				//{
				//	//可使用通案
				//	IsGenCase=false;
				//	if (document.all["DEPT_CASE"].value == "")
				//	{
				//		if (document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value=="")
				//		{
				//			alert("密等欄位不可空白，");
				//		    $("#dlSECRET")[0].focus();
				//			Page_BlockSubmit = true;
				//			break;
				//		}
				//		else
				//		{
				//			IsGetCase=true;
				//			if (parseInt(document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value,10)>1)
				//				document.all["tbCASE"].value = document.all["INITS_FILENO"].value;
				//			else
				//				document.all["tbCASE"].value = document.all["INIT_FILENO"].value;
				//		}
				//	}
				//	else
				//	{
				//		IsGetCase=true;
				//		document.all["tbCASE"].value = document.all["DEPT_CASE"].value;
				//	}
				//}						
				if (IsGetCase)
				{
					//自動編卷
					IsGetCase=false;
					if(document.all["tbCASE"].value!="")
						document.all["tbCASE"].onblur();
					if (document.all["tbYEAR"].value == "" || document.all["tbCASE"].value == "" || document.all["tbVOL"].value == "")
					{
						alert("請提供完整的檔號(年度號、分類號、國別、處別、細目號/產品別、卷次號)");
						if (document.all["tbYEAR"].value=="")
						    $("#tbYEAR")[0].focus();
						else
						    $("#tbCASE")[0].focus();
					}
					else
					{
						if (document.all["tbCNT"].value == "")
						{
						    $("#tbCNT")[0].focus();
							jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["檔案數量"])),"");
						}
						else
						{
							wsGetVolSeq();
						}
					}
				}
				Page_BlockSubmit = true;
				break;
			case "btOTHER_OBJECT"://其他案由 AKM332
				var pUrl = "";
				pUrl = "AKM332.aspx?k1=" + document.all["tbDOC_NO"].value + "&MaxSubLen=" + document.all["txMaxSubLen"].value + "&SAMLart=" + GetParam("SAMLart") + "&ShowFrom=" + document.all["H_SHOWFROM"].value;
				jf_OpenChildWin(pUrl,"AKM332",750,500);
				Page_BlockSubmit = true;
				break;
			case "btISS_NO"://來發受文者明細 AKM333
				var pUrl = "",pk2="",pk3="";
				pk2=document.all["tbFNAME"].value;
				pk3=document.all["tbINAME"].value;			
				pUrl = "AKM333.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+encodeURI(pk2)+"&k3="+encodeURI(pk3)+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM333",750,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btATT_INFO"://附件資訊 AKM336
				var pUrl = "";
				var strSingType = document.all["dlDocFileType"].options[document.all["dlDocFileType"].selectedIndex].value;
				if(strSingType=="1")strSingType="P";
				else if(strSingType=="2")strSingType="E";
				var str336StoreNo = document.all["dlStore"].options[document.all["dlStore"].selectedIndex].value;
				pUrl = "AKM336.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&k2="+document.all["tbCrtDate"].value+"&k3="+strSingType+"&SAMLart="+GetParam("SAMLart")+"&argStoreNo="+str336StoreNo+"&argSignType="+strSingType;
				jf_OpenChildWin(pUrl,"AKM336",900,500);
				//OpenWindow(pUrl);
				Page_BlockSubmit = true;
				break;
			case "btSUBJECT"://主題項 AKM338
				var pUrl = "";
				pUrl = "AKM338.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM338",750,500);
				Page_BlockSubmit = true;
				break;
			case "btREM"://附註項 AKM339
				var pUrl = "";
				pUrl = "AKM339.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM339",750,500);
				Page_BlockSubmit = true;
				break;
			// 分類案次查詢子視窗

			case "ibtCLS":
				var pUrl = "";
				EAC005 = "CLS";
				pUrl = "../../EA/EA01/EAC005.aspx?FILE_CLS="+document.all["tbCLS"].value+"&FILE_YEAR="+document.all["tbYEAR"].value+"&MODE=1&nFrom=AKM330&VER_NO="+document.all["tbVerNo"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"EAC005",750,500);
				Page_BlockSubmit = true;
				break;			
			case "ibtCASE":
				var pUrl = "";
				EAC005 = "CASE";
				pUrl = "../../EA/EA01/EAC005.aspx?FILE_CLS="+document.all["tbCLS"].value+"&FILE_YEAR="+document.all["tbYEAR"].value+"&MODE=2&nFrom=AKM330&VER_NO="+document.all["tbVerNo"].value+"&SAMLart="+GetParam("SAMLart");
				
				jf_OpenChildWin(pUrl,"EAC005",750,500);
				Page_BlockSubmit = true;
				break;
			//
			case "ibtSTOCKNO":
				var pUrl = "";
				pUrl = "AKM330C4.aspx?k1="+document.all["tbYEAR"].value+"&k2="+document.all["tbCLS"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM330C4",450,400);
				Page_BlockSubmit = true;
				break;
			case "btFileInfo"://電子檔案資訊 
				var pUrl = "";
				pUrl = "AKM334.aspx?rtnObj=SubWinRtn&m=p&k1="+document.all["tbDOC_NO"].value+"&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(pUrl,"AKM334",750,500);
				Page_BlockSubmit = true;
				break;
			case "GetIssueNo"://將發文字及發文號存至發文字號欄位
				jf_GetIssueNo();
				Page_BlockSubmit = true;
				break;
			//新增來文字+來文號之Button功能
			case "GetFromNo":
				jf_GetFromNo();
				Page_BlockSubmit = true;
				break;
			case "ibtCountryCode":
				var pUrl = "";
				pUrl = "../../EA/EA01/EAI014.aspx?&SAMLart=" + GetParam("SAMLart");
				jf_OpenChildWin(pUrl, "EAI014", 1024, 768);
				Page_BlockSubmit = true;
				break;
			case "ibtProductCode":
				var pUrl = "";
				pUrl = "../../EA/EA01/EAI015.aspx?&SAMLart=" + GetParam("SAMLart");
				jf_OpenChildWin(pUrl, "EAC015", 1024, 768);
				Page_BlockSubmit = true;
				break;
			default:
				Page_BlockSubmit = true;
		}
	}
	//修正多次點擊重複PostBack之問題
	if (IsServerHandling)
		Page_BlockSubmit = true;
}
function CheckNumDuplicate(argNum){
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
    
	var param1 = new Array(5);
	param1[0] = document.all["tbOrgNo"].value;
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
	var CheckSeqVol = "";//
	
	
	if (document.all["tbSEQ"].value != "") 
	{
		pHeadLine ="件次號有值,則以下欄位不可空白:\n";
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
			    $("#tbYEAR")[0].focus();
				pIsValid = false;
			}
		}
	}
 
	
	if(document.all["tbSEQ"].value == "0000")
	{	
	    CheckSeqVol = CheckSeqVol + "件次號 值為0000 " + "編卷 請從0001起\n";
	
	    $("#tbSEQ")[0].focus();
		pIsValid = false;
	}
	if(document.all["tbVOL"].value == "0000")
	{	
	    CheckSeqVol = CheckSeqVol + "卷次號 值為0000 " + "編卷 請從0001起\n";
	    $("#tbVOL")[0].focus();
		pIsValid = false;
	}//
 
	if (pNOT_ALLOW_EMPTY) {
	    if (pMsg != "")
	        alert(alertTitle + "\n" + pHeadLine + CheckSeqVol + pMsg);
	    
	    if (pMsg == "" && CheckSeqVol != "")
	        $("#tbCASE")[0].focus();
	    //
	}
	
	
	var iMaxSubLen = parseInt(document.all["txMaxSubLen"].value);
	
	var strSubject = document.all["tbSUB"].value;
	var iCurrSubLen = strSubject.length;
	if(iMaxSubLen > 0)
	{
	
		if(iCurrSubLen > iMaxSubLen)
		{
		    alert("案由可輸入最大字數為" + iMaxSubLen + "字，目前輸入字數為" + iCurrSubLen + "字，請修正後再重新儲存。");
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
		    $("#tbDOC_NO")[0].focus();
		pIsValid = false;
	}
	
	if (fr.tbKeep_Year.value == "")
	{
		pStr = pStr + "保存年限\n";
		if (pIsValid)
		    $("#tbKeep_Year")[0].focus();
		pIsValid = false;

	}
	
	if (fr.tbSUB.value == "")
	{	
		pStr = pStr + "案由\n";
		    
		if (pIsValid) //fr.tbSUB.focus();
		$("#tbSUB")[0].focus();
		pIsValid = false;
	}
	if (fr.CheckCloase != null && fr.tbCDATE.value == "")
	{	
		pStr = pStr + "辦畢日期\n";
		if (pIsValid) 
		$("#tbCDATE")[0].focus();
		pIsValid = false;
	}
	
	if ((fr.tbFNAME.value == "" || fr.tbFDATE.value == "") && (fr.tbFNAME.value != "" || fr.tbFDATE.value != ""))
	{
		var HasMsg=true;
		pStr = pStr + "來文資訊：";
		if (document.all["tbFNAME"].value=="")
		{
			pStr+="來文者欄位";
			
			HasMsg=false;
			
			if (pIsValid)
			{
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
			    $("#tbFDATE")[0].focus();
			}
			
			pIsValid=false;
		}
		pStr+="不可空白\n";
	}
	
	if ((fr.tbINAME.value == "" || fr.tbIDATE.value == "" || fr.tbINO.value == "") && (fr.tbINAME.value != "" || fr.tbIDATE.value != "" || fr.tbINO.value != "")) {
		var HasMsg = true;
		var pIEStr = "";

		if (document.all["tbINAME"].value == "") {
			pIEStr += "發文者欄位";

			HasMsg = false;

			if (pIsValid) {
				$("#tbINAME")[0].focus();
			}

			pIsValid = false;
		}

		var szDocCategoryNoList = fr.AKM330_NonCheckDocCategoryNo.value;
		var szDocCategoryNoArr = szDocCategoryNoList.split(';');
		var i = 0;
		var checkFlag = false;


		for (i; i < szDocCategoryNoArr.length; i++) {
			if (document.all["dlDOC_CATEGORY"].options[document.all["dlDOC_CATEGORY"].selectedIndex].value == szDocCategoryNoArr[i]) {
				checkFlag = true;
				break;
			}
		}

		//checkFlag為false,表示使用者沒有選擇簽,便簽,或非屬以上各種
		//所以必須檢核發文相關資訊
		if (checkFlag == false) {
			if (document.all["tbIDATE"].value == "") {
				if (HasMsg)
					pIEStr += "發文日期欄位";
				else
					pIEStr += "，發文日期欄位";

				HasMsg = false;

				if (pIsValid) {
					$("#tbIDATE")[0].focus();
				}

				pIsValid = false;
			}
			if (document.all["tbIssueNo"].value == "") {
				if (HasMsg)
					pIEStr += "發文字號欄位";
				else
					pIEStr += "，發文字號欄位";

				HasMsg = false;

				if (pIsValid) {
					$("#tbINO")[0].focus();
				}

				pIsValid = false;
			}
		}

		if (!HasMsg) {
			pIEStr = "發文資訊：" + pIEStr;
			pStr = pStr + pIEStr + "不可空白\n";
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
		if(fr.AKM330_NonCheckDocCategoryNo.value!="")
		{
			var szDocCategoryList = fr.AKM330_NonCheckDocCategoryNo.value;
			var szDocCategoryArr = szDocCategoryList.split(';');
			for(i=0;i<szDocCategoryArr.length;i++)
			{
				if(nSelectedDocCategoryNo==szDocCategoryArr[i])
				{
					bCheck=false;
					break;
				}
			}
		}
		if(bCheck)
		{
			pStr = pStr + "來文資訊或發文資訊不可皆為空白\n";
			if (pIsValid)
			{	
			    $("#tbFNAME")[0].focus();		
			}
			pIsValid = false;
		}
	}

	if(document.all.DocState)
	{
		if(parseInt(document.all.DocState.value)>08)
		{
			if (fr.tbCrtDate.value == "")
			{
				pStr = pStr + "文件產生日期\n";
				if (pIsValid)
				    $("#tbCrtDate")[0].focus();
				pIsValid = false;
			}
		}
	}
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
		    
		    $("#dlSECRET")[0].focus();
		pIsValid = false;

	}
	

	if(document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value > "1" )
	{

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
				    $("#dlRmvSec_Cond_Text")[0].focus();
				pIsValid = false;
			}

		}
		
	}

	if (fr.tbDATA_TYPE.value!="RE")
	{
		if(fr.dlDOC_CATEGORY.options[fr.dlDOC_CATEGORY.selectedIndex].value == "")
		{
			pStr = pStr + "文別\n";
			if (pIsValid)
			    $("#dlDOC_CATEGORY")[0].focus();
			pIsValid = false;
		}
		
		if(fr.dlTYPE.options[fr.dlTYPE.selectedIndex].value == "")
		{
			pStr = pStr + "本別\n";
			if (pIsValid)
			    $("#dlTYPE")[0].focus();
			pIsValid = false;
		}

		if(fr.dlKEEPSTATE.options[fr.dlKEEPSTATE.selectedIndex].value == "")
		{
			pStr = pStr + "保存狀況\n";
			if (pIsValid)
			    $("#dlKEEPSTATE")[0].focus();
			pIsValid = false;
		}
	}
	
	//檢核紙本來文併同歸檔數量
	if(fr.dlIsRcvfile.selectedIndex == 1)
	{
		if(fr.txRcvfileCnt.value == "")
		{
			pStr = pStr + "紙本來文併同歸檔為「是」時，數量不可為空白。\n";
			if (pIsValid)
			    
			    $("#txRcvfileCnt")[0].focus();
			pIsValid = false;
		}
		else if(fr.txRcvfileCnt.value == "0")
		{
			pStr = pStr + "紙本來文併同歸檔為「是」時，數量不可為0。\n";
			if (pIsValid)
                
			    $("#txRcvfileCnt")[0].focus();
			pIsValid = false;
		}
	}
	
	if (pStr != "")
	{
		pStr = "以下欄位不可為空白:\n" + pStr;
		alert(alertTitle+"\n"+pStr);
		pIsValid = false;
	}

	return  pIsValid;
}

function Self_CallWS(argService, argFunName, argAsync, argParam)
{
    return jf_CallWS(argService, argFunName, argAsync, argParam);
}

function wsGetVolSeq()
{
    
    var param2 = new Array(7);
    param2[0] = document.all["tbYEAR"].value;
	param2[1] = document.all["tbCLS"].value;
	param2[2] = document.all["tbCASE"].value;
	param2[3] = jf_PADL(document.all["tbVOL"].value, 4, "0");
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","TAITRA_GetMaxVolSeq",false,param2);
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
	else if(argCallerId=="EAC005")
	{
		if (EAC005 == "CLS")
		{
			if(document.all["lbReturnValue"].length>0)
			{
				document.all["tbCLS"].value = document.all["lbReturnValue"].options[1].value;
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
		}
	}
	else if(argCallerId=="AKM330C3")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all.tbDOC_NO.value = document.all.lbReturnValue.options[0].text;
			document.all.txDocNoChange.value = document.all.tbDOC_NO.value;
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
	else if (argCallerId == "EAI014") {
		if (document.all["lbReturnValue"].length > 0) {
			document.all.txCountryCode.value = document.all.lbReturnValue.options[0].value;
		}
	}
	else if (argCallerId == "EAI015") {
		if (document.all["lbReturnValue"].length > 0) {
			document.all.txProductCode.value = document.all.lbReturnValue.options[0].value;
		}
	}
	
	if(document.all["lbReturnValue"].options!=null)
		document.all["lbReturnValue"].options.length = 0;
	
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
			    $("#tbIDATE")[0].focus();
			}
			else
			    $("#tbIDATE")[0].focus();
		}
    }
    if(argResult.id == iCallID_CLS)  //分類號 onblur
    {
		IsCls=false;
		if (jf_IsWebServiceSuccess_AKM330(argResult))
		{
			WSResult = argResult.value;
			document.all["txClsName"].value = WSResult.ClsName;
			document.all["htxClsKey"].value = WSResult.CLS_KEY;
			document.all["tbVerNo"].value = WSResult.VerNo;
			var arrFileNo = document.all.OtxFullFileNo.value.split('|');

			var strAltMsg = "分類號已異動，以下欄位將依新分類號資訊更新，請確認後再進行儲存：";
			var strColumn = "";

			if (document.all["tbVerNo"].value + "|" + document.all["tbCLS"].value != arrFileNo[0] + "|" + arrFileNo[2]) {
				bGetKeyBeforeSave = false;


				document.all["tbKeep_Year"].value = WSResult.KeepYear;
				if (strColumn != "")
					strColumn += "、保存年限";
				else
					strColumn += "保存年限";

				if (document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value == "") {
					for (var i = 0; i < document.all["dlAPPLYLIMIT"].length; i++) {
						if (document.all["dlAPPLYLIMIT"].options[i].value == WSResult.ApplyLimit) {
							document.all["dlAPPLYLIMIT"].selectedIndex = i;
							break;
						}
					}
					if (strColumn != "")
						strColumn += "、應用限制";
					else
						strColumn += "應用限制";
				}

				if (document.all["tbCrtDate"].value != "") {
					if (document.all["tbYEAR"].value == "")
						document.all["tbYEAR"].value = document.all["tbCrtDate"].value.substring(0, 3);
					if (!document.all["tbExtRmvSec_Date"].disabled) {
						if (document.all["tbKeep_Year"].value == "" || document.all["tbKeep_Year"].value == "?") { document.all["tbExtRmvSec_Date"].value = ""; }
						else {
							var str = document.all["tbKeep_Year"].value + "0000";
							var str1 = parseInt(document.all["tbCrtDate"].value, 10) + parseInt(str, 10);
							if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer) {
								document.all["tbExtRmvSec_Date"].value = jf_PADL(str1.toString(), 7, "0");//[001600]Modify by Cola 需先將str1轉為string才可正常運作
								if (strColumn != "")
									strColumn += "、應解密日期";
								else
									strColumn += "應解密日期";
							}
						}
					}
				}
			}

			document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
			alert(strAltMsg + strColumn);
		}
		else
		{
        	bGetKeyBeforeSave = false;
			if (!(jf_Trim(document.all["txInpFileDate"].value) != "" && obj.ErrorClass.ErrMessage[0].indexOf("細分類") >= 0 && NotModifyCls && OriginVer_Cls == document.all["tbVerNo"].value + document.all["tbCLS"].value))
			{
				if (jf_Trim(document.all["txInpFileDate"].value) != "" && obj.ErrorClass.ErrMessage[0].indexOf("細分類") >= 0 && !ModifyCls && OriginVer_Cls == document.all["tbVerNo"].value + document.all["tbCLS"].value)
				{
					//ModifyCls = true;
					if (window.confirm("此份公文先前已使用非最下層分類號編目，是否要修正分類號？\n (確認代表是，取消代表否)"))
					{
						ModifyCls = true;
						$("#tbCLS")[0].focus();
					}
					else
						NotModifyCls = true;
				}
					//其餘情形照舊	
				else
				{	
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
						//補國別--等資訊
						SetFileCaseToTaitraValue("");
					}
					flagtemp = false;

					if (obj.ErrorClass.ErrMessage[0].substring(0, 3) == "年度號")
						$("#tbYEAR")[0].focus();
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
    //Cloud 案次號onblur相關邏輯轉卷次號欄位處理
	//if (argResult.id == iCallID_CASE) //案次號 onblur
	//{

	//	if (argResult.error) {
	//		alert(argResult.errorDetail.string);
	//		$("#tbCASE")[0].focus();
	//		return;
	//	}
	//	WSResult = argResult.value;

	//	if (WSResult.ErrorClass.ErrMessage.length != 0)  //有err
	//	{
	//		document.all["txCaseName"].value = "";
	//		document.all["htxCaseKey"].value = "";
	//		document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
	//		bGetKeyBeforeSave = false;
	//		if (WSResult.ErrorClass.ErrMessage[0] == "無符合條件資料。") {
	//			if (document.all["tbCASE"].value != document.all["INITS_FILENO"].value &&
	//				document.all["tbCASE"].value != document.all["INIT_FILENO"].value &&
	//				document.all["tbCASE"].value != document.all["DEPT_CASE"].value) {
	//				if (document.all["tbDATA_TYPE"].value != "RE") {
	//					if (!IsOpenAKM330C1) {
	//						if (window.confirm("輸入的案次號不存在，是否要線上立案?")) {
	//							var pUrl = "";
	//							pUrl = "AKM330C1.aspx?argCYR=" + document.all("tbYEAR").value + "&argCNO=" + document.all("tbCLS").value + "&argFNM=" + document.all("tbCASE").value;
	//							pUrl += "&argVER=" + document.all("tbVerNo").value; //增加傳入版本 #2006.11.24 Andy
	//							OpenWindow(pUrl);
	//							IsOpenAKM330C1 = true;
	//						}
	//						else {
	//							document.all("tbCASE").value = "";
	//							document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
	//						}
	//					}
	//				}
	//			}
	//			else {
	//				alert(WSResult.ErrorClass.ErrMessage[0]);//調整位置，應先Alert再Focus才不會有錯						
	//				$("#tbCASE")[0].focus();
	//			}
	//		}
	//		else {
	//			alert(WSResult.ErrorClass.ErrMessage[0]);//調整位置，應先Alert再Focus才不會有錯
	//			$("#tbYEAR")[0].focus();
	//		}
	//	}
	//	else {
	//		//帶出案名
	//		document.all.txCaseName.value = WSResult.CaseName;
	//		document.all.htxCaseKey.value = WSResult.Key;
	//		document.all.txCaseSecNo.value = WSResult.SecNo;
	//		if (WSResult.CaseYear != "")
	//			document.all.tbYEAR.value = WSResult.CaseYear;
	//		document.all.OtxFullFileNo.value = document.all.tbVerNo.value + "|" + document.all.tbYEAR.value + "|" + document.all.tbCLS.value + "|" + document.all.tbCASE.value;
	//	}
	//}
    
    if(argResult.id == iCallID_ComNo)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			var str = WSResult.ComType;
			if (str=="2")
			{
			    alert("輸入的併案文號為子文\n其母文為" + WSResult.Com_No + "，請重新輸入");
			    $("#tbCOM_NO")[0].focus();
			}
			else
			{
			    if(WSResult.doc_state=="")
			        WSResult.doc_state=0;
			    if (parseInt(WSResult.doc_state) < 20)
			    {
			        alert("公文" + document.all["tbCOM_NO"].value + "尚未歸檔，不可設定為參照文號。");
			        document.all["tbCOM_NO"].value = "";
			        IsRight = false;
			    }
                else
				IsRight=true;
			}
		}
		else
		    $("#tbCOM_NO")[0].focus();
    }
    if(argResult.id == iCallID_ComNo1)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all.htxFileYear.value		= WSResult.RtnField0[0];
			document.all.htxFileCls.value		= WSResult.RtnField1[0];
			document.all.htxFileCase.value		= WSResult.RtnField2[0];
			document.all.htxFileVol.value		= WSResult.RtnField3[0];
			document.all.htxFileSeq.value		= WSResult.RtnField4[0];
			
			strComClsKey 						= WSResult.RtnField5[0];
			if (document.all.cbComNo.checked)
				document.all.htxClsKey.value		= WSResult.RtnField5[0];
			
			if (document.all.cbComNo.checked)
				document.all.htxCaseKey.value		= WSResult.RtnField6[0];
			
			DeptNo								= WSResult.RtnField7[0];
			document.all.htxDocFileType.value	= WSResult.RtnField8[0];
			if (document.all.htxDocFileType.value == "")//預設紙本檔案
				document.all.htxDocFileType.value = "1";
			uDeptName							= WSResult.RtnField9[0];
			document.all.htxKeepYaer.value		= WSResult.RtnField10[0];  //增加回傳KeepYear
			document.all.hdlSECRET.innerText		= WSResult.RtnField11[0];  //增加回傳密等
			document.all.hdlRmvSec_Cond.innerText = WSResult.RtnField13[0];  //增加回傳解密條件
			document.all.hMSecSeq.value = WSResult.RtnField14[0];  //增加回傳解密條件
			
		}
		else
		{
		    $("#tbCOM_NO")[0].focus();
			flagtemp=false;
		}
    }

    if(argResult.id == iCallID_Vol)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			//外貿件次號(目次號)為4碼
			document.all["tbSEQ"].value = jf_PADL(WSResult.SeqNo,4,"0");			
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
			
			//1140904 案次號ONBLUR不做事情
			//if(jf_Trim(document.all["tbVerNo"].value) != ""  && jf_Trim(document.all["tbCLS"].value) != "")
			//{
			//	var param = new Array(5);
			//	param[0] = document.all["tbYEAR"].value;
			//	param[1] = document.all["tbCLS"].value;
			//	param[2] = document.all["tbCASE"].value;
			//	param[3] = "";//ONLBLUR時，更換案次號，鍵值還未取回不可使用-故傳入空白
			//	param[4] = document.all["tbVerNo"].value;

			//	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
			//	iCallID_CASE = RtnObj.id;
			//	OnWSResult(RtnObj);
			//}
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
			    $("#tbATT_SEQ")[0].focus();
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
        $("#txSecSeq")[0].focus(); //for checking duplicate
    }

    if(argResult.id == iCallID_Seq)
    {
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
		if (argResult.value.RtnField0==null || (argResult.value.RtnField0!=null &&  argResult.value.RtnField0[0] == "true"))
    	{
    	}
    	else
    	{
		    if (document.all["tbCOM_NO"].value != "" && document.all["tbCOM_NO"].value != document.all["tbDOC_NO"].value && document.all["cbComNo"].checked)
		    {
		        return;
		    }
		    
		    var SunDocList = "";
		    if (document.all["tbCOM_NO"].value != "" && document.all["tbCOM_NO"].value == document.all["tbDOC_NO"].value && document.all["cbComNo"].checked)
		    {
		        SunDocList = AK.AKM330_TAITRA.GetSunDoc(document.all["h_sourceorgno"].value, document.all["tbDOC_NO"].value).value;
		    }
    		for (iDoc = 0; iDoc < RtnObj.value.RtnField0.length; iDoc++)
    		{
    		    
    			if (RtnObj.value.RtnField0[iDoc] != document.all["tbDOC_NO"].value)
    			{
    			    if (SunDocList != "")
    			    {
    			        if (SunDocList.indexOf(RtnObj.value.RtnField0[iDoc]) != -1)
    			            continue;
    			    }
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
		    $("#tbCOM_NO")[0].focus();
    }
        
           
    //95.10.12 950489 David
    //同步化二級科室
    if(argResult.id == CallWS_ID_SECT)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
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
					SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
					document.all.dlSect.options.add(SectDropListChild);
				}
				
				if(document.all["dlSect"].options.length > 10)
				{
					document.all["dlSect"].size = 10;
				}
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
					else
					{
						document.all["dlEmp"].size = document.all["dlEmp"].options.length;
					}
				}
			}
			else
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
					else
					{	
						document.all["dlEmp"].size = document.all["dlEmp"].options.length;
					}
				}
			}
		}	
    }
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
			
			var bAlert = true;
    		if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
			
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
    argResult = null;
	
}

var iCallID_DEPT_ISU = null;
var iCallID_CLS = null;
var iCallID_CLS1 = null;
var iCallID_CASE = null;
var iCallID_CASE1 = null;
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
var iCallID_ComSeq = null;	//呼叫檢查檔案併件流水號是否有存在的ID

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
			document.all["txVolTotalPage"].value = "";
			break;
		case "tbVOL":
			document.all["tbSEQ"].value = "";
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
		    
			if (document.all.tbExtRmvSec_Date.value == "" && !bISNaer)
			document.all.tbExtRmvSec_Date.value = jf_PADL(nRmvSecYear,3,"0") + strCrtDate.substring(3,7);	
			break;
		case "tbCNT":
			if(document.all["dlDocFileType"].options[document.all.dlDocFileType.selectedIndex].value == "1")
			{
				var strTotalPage = parseInt(document.all["tbCNT"].value) + parseInt(document.all["H_VolPage"].value) + parseInt(document.all["H_SepPage"].value);
				document.all["txVolTotalPage"].value = strTotalPage;
			}
			break;
	}
}


var arEvent = [];
var bIsDoubleMsg=false;
var bHasCheck = false;
function TbOnBlur(argTextBox)
{
    var xObjectName = argTextBox;
 
    if (argTextBox != "tbCLS" && argTextBox != "tbVerNo")
    { 
        arEvent.pop();
	}

	//START
	if (argTextBox == "tbSEQ")
	{
		//外貿該欄位為4碼
		if(document.all["tbSEQ"].value == "0000")
		{	
			alert(alertTitle + "\n件次號 值為0000 "+"編目 請從0001起\n");
			document.all["tbSEQ"].value = "";
		    $("#tbSEQ")[0].focus();
		}
	}
	if (argTextBox == "tbVOL")
	{
		//組成完整案次號
		SetValueToFileCase();
		if(document.all["tbVOL"].value == "0000")
		{
			alert(alertTitle + "\n卷次號 值為0000 "+"編卷 請從0001起\n");
			document.all["tbVOL"].value = "";
		    
		    $("#tbVOL")[0].focus();
			
			document.all["txVolTotalPage"].value = "";
		}	
		else if(document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "")
		{
			//修改此段取得案卷名、分類號鍵值
			var VolInfo = AK.AKM330_TAITRA.GetVolInfo(document.all["h_sourceorgno"].value, document.all["tbYEAR"].value, document.all["htxClsKey"].value, document.all["tbCASE"].value, document.all["tbVOL"].value);
			if (VolInfo.value[0] != "") {
				document.all.htxCaseKey.value = VolInfo.value[0];
				document.all.txCaseName.value = VolInfo.value[1];
			}
			else {
				alert('該案卷不存在，請重新輸入。');
				document.all["tbVOL"].value = "";
			}
			
			
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
			CurrentObjId = argTextBox;
			jf_GetClassVer("Year");
			if (jf_Trim(document.all["tbVerNo"].value) != "" && jf_Trim(document.all["tbCLS"].value) != "" && jf_Trim(document.all["tbCASE"].value) != "")
			{
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

	//分類號 & 版本別
	if (argTextBox=="tbCLS" || argTextBox=="tbVerNo")
	{
	    
		if(arEvent.length==0)
			arEvent.push(argTextBox);
		else{
			if(argTextBox!=arEvent[0])
			{
				console.log ('argTextBox阻擋');
				return;
			}
		}
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
			document.all["htxClsKey"].value = "";
			arEvent.pop();
			return;
		}
		

		if(argTextBox=="tbCLS")
		{
			var strLmtClsLen = document.all.h_lbClsLen.innerText;
			if(strLmtClsLen !=null&&jf_Trim(strLmtClsLen)!=""&&strLmtClsLen!="0")
			{
				var iLmtClsLen = parseInt(strLmtClsLen);
				if(iLmtClsLen!=0)
				{
					var inpClsNo = jf_Trim(document.all["tbCLS"].value);
					if(inpClsNo!=""&&inpClsNo.length<iLmtClsLen)
					{

					    alert("分類號至少需輸入" + strLmtClsLen + "碼!!");
					    $("#tbCLS")[0].focus();
					    arEvent.pop();
						return;
					}
				}
			}
		}
	    
		var param1 = new Array(3);
		param1[0] = document.all["tbVerNo"].value;
		param1[1] = document.all["tbCLS"].value;
		param1[2] = document.all["tbYEAR"].value;
        param1[0] = encodeURI(document.all["tbVerNo"].value);
        param1[1] = encodeURI(document.all["tbCLS"].value);
        param1[2] = encodeURI(document.all["tbYEAR"].value);
        //1051205   Kenny   [1051150]   修改Client Potential Code Injection--End--
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCLS",false,param1);

		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);

		//改成所有案次號一律去call ws帶案名 #2006.03.19 Andy
		//組成案次號

		if(jf_Trim(document.all["tbVerNo"].value) != "" && jf_Trim(document.all["tbCLS"].value) != "" && jf_Trim(document.all["tbCASE"].value) != "")
		{
            
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
	
	//案次號
	if (argTextBox=="tbCASE")
	{
		if (document.all["tbCASE"].value=="")
		{
			//案名改由卷次號取得
			//document.all["txCaseName"].innerText = "";
			document.all["htxCaseKey"].innerText = "";
			return;
		}
	    
		//改成所有案次號一律去call ws帶案名 #2006.03.19 Andy
		if(jf_Trim(document.all["tbVerNo"].value) != ""  && jf_Trim(document.all["tbCLS"].value) != "")
		{
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

	//卷次號
	if (argTextBox=="tbVOL")
	{
		if (document.all["tbVOL"].value=="")
			return;
		else
			document.all["tbVOL"].value=jf_PADL(document.all["tbVOL"].value,4,'0');
	}

	//國別
	if (argTextBox == "txCountryCode") {
		if (document.all["txCountryCode"].value == "")
			return;
		else
			document.all["txCountryCode"].value = jf_PADR(document.all["txCountryCode"].value, 3, '0');
	}
	//處別
	if (argTextBox == "txOfficeCode") {
		if (document.all["txOfficeCode"].value == "")
			return;
		else
			document.all["txOfficeCode"].value = jf_PADL(document.all["txOfficeCode"].value, 3, '0');
	}
	//細目號/產品別
	if (argTextBox == "txProductCode") {
		if (document.all["txProductCode"].value == "")
			return;
		else
			document.all["txProductCode"].value = jf_PADR(document.all["txProductCode"].value, 3, '0');
	}

	//目次號
	if (argTextBox=="tbSEQ")
	{
		if (document.all["tbSEQ"].value=="")
			return;
		else
			document.all["tbSEQ"].value=jf_PADL(document.all["tbSEQ"].value,4,'0');
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
		    $("#tbType")[0].focus();
		}
	}

	//來文日期
	if (argTextBox=="tbFDATE")
	{
		//設定文件產生日期
		SetCrtDate();
		if (document.all["tbFDATE"].value=="")
		{
			if (document.all["tbCDATE"].value=="")
			{
				document.all["tbExtRmvSec_Date"].value="";
			}
			else
			{
				if (document.all["tbIDATE"].value=="")
				{
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
							if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer)
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
			    $("#tbFDATE")[0].focus();
			}
			else
			{
				if (document.all["tbIDATE"].value=="")
				{
					
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
					
							if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						}
					}
				}
			}
		}
	}

	//發文日期
	if (argTextBox=="tbIDATE")
	{
		//設定文件產生日期
		SetCrtDate();
		if (document.all["tbIDATE"].value=="")
		{
			if (document.all["tbFDATE"].value=="")
			{
				if (document.all["tbCDATE"].value=="")
				{
					
					document.all["tbExtRmvSec_Date"].value="";
				}
				else
				{
					//修改文件產生日期取得邏輯
					
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
							if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						}
					}
				}
			}
			else
			{
				
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
						if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer)
						document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//[---]Modify by Cola 需先將str1轉為string才可正常運作
						
					}
				}
			}
		}
		else
		{
			//補滿7碼
			document.all["tbIDATE"].value=jf_PADL(document.all["tbIDATE"].value,7,"0");
			
			if (!jf_CheckCDATE(document.all["tbIDATE"].value))
			{
			    alert("日期格式錯誤");
			    $("#tbIDATE")[0].focus();
			}
			else
			{
				//if (document.all["tbCrtDate"].value=="")
				//{
					//修改文件產生日期取得邏輯
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
							if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer)
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
			
			document.getElementById("cbComNo").style.pointerEvents = "none";
			document.getElementById('cbComNo').style.opacity = "0.4";
			document.all["cbComNo"].checked = false;
			$("#tbYEAR")[0].focus();
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
			
			document.getElementById("cbComNo").style.pointerEvents = "";
			document.getElementById('cbComNo').style.opacity = "1";
		    
		    $("#cbComNo")[0].focus();
		}
				
		if (document.all["tbDATA_TYPE"].value!="RE")
		{
		    
		    var param1 = new Array(1);
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
				RtnFldName[10] = "KEEP_YEAR";  //增加回傳母文的KEEP_YEAR
				RtnFldName[11] = "SEC_NO";  //增加回傳密等
				RtnFldName[12] = "RMVSEC_CODE";  //增加回傳解密條件
				RtnFldName[13] = "RMVSEC_COND";  //增加回傳解密條件
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

				if (DeptNo != "")
				{
					//檢查此帳號是否可點收、維護此份公文
					var param = new Array(3);
					param[0] = DeptNo;
					param[1] = document.all.txUser.value;
					param[2] = document.all["tbCOM_NO"].value;
										
					RtnObj = jf_CallWS("lib/AK_LIB.asmx","ChkUserDocPriv",false,param);
					iCallID_ChkUserDocPriv = RtnObj.id;
					strStoreNo = "";
					OnWSResult(RtnObj);

					if(strStoreNo=="")  //無庫房代碼=無權限
					{	
						//0981111	Howard	0980587 依庫房管理模式設定錯誤訊息
						if(document.all.h_StoreMode && document.all.h_StoreMode.value == "1") 
						{		
							//依據公文歸檔庫房
						    var StoreName = AK.AKM330_TAITRA.GetStoreName(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
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
					    $("#tbCOM_NO")[0].focus();
						return;
					}
					
					//檢核通過，自動將併件設為checked
					if(document.all.tbCOM_NO.value != "")
					{
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
							document.all["dlRmvSec_Cond:Text"].value = document.all.hdlRmvSec_Cond.innerText ;//0960725 子文的解密條件要和母文一樣
						}
							
							//取得母文的VER_NO
							var ComVerNo = "";
							var KeyName = new Array(2)
							KeyName[0] = "SOURCE_ORGNO";
							KeyName[1] = "PRIMARY_KEY";
							var KeyValue = new Array(2);
							KeyValue[0] = document.all["tbOrgNo"].value;
							
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
							//修正ONBLUR母文異常的錯誤避免因自動勾選併件時CbOnClick()會在CALLWS導致VERNO被洗掉先儲存起來
							if(jf_IsWebServiceSuccess(RtnObj))
							{
								WSResult = RtnObj.value;
								var tempVerNo=WSResult.RtnField0[0];
								document.all["htxVerNo"].value=tempVerNo;
							}
							
							document.all.AKM330_DefaultComStatus.TEXT
							if(document.all.AKM330_DefaultComStatus.value == "Y")
							{
								document.all.cbComNo.checked = true;
								CbOnClick("cbComNo");
							}
							//增加母文文號ONBLUR時，跳出提醒更新案次號警示
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
							if(jf_IsWebServiceSuccess(RtnObj) && document.all.cbComNo.checked)
							{
								
								document.all.tbVerNo.value=tempVerNo;
								document.all.tbCLS.value = document.all.htxFileCls.value;
								TbOnBlur('tbCLS')
							}

					}
				} // end if (DeptNo != "")
				else
				{
					/*取消併件母文之承辦單位檢查
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
	}
	
	
	
	
    //收創文日期
    
    
	if (argTextBox == "tbRDATE" || argTextBox == "txStoreDate")
	{
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
		//修正輸入辦畢日期後，未ONBLUR直接按下儲存會造成WORK_DATE出錯的異常BUG,增加一變數判斷是否已檢核過
		if (bHasCheck)
		{
			bHasCheck = false;
			return true;
		}
		bHasCheck = true;
		//設定文件產生日期
		SetCrtDate();
		if (document.all["tbCDATE"].value=="")
		{
			document.all["tbCTIME"].value="";
			return true;
		}
		else
		{
			//補滿7碼
			document.all["tbCDATE"].value=jf_PADL(document.all["tbCDATE"].value,7,"0");
			if (!jf_CheckCDATE(document.all["tbCDATE"].value))
			{
			    alert("辦畢日期格式錯誤");
			    $("#tbCDATE")[0].focus();
				bHasCheck = false;
				return false;
			}
			else
			{
				if (document.all["tbIDATE"].value=="" && document.all["tbFDATE"].value=="")
				{
					//修改文件產生日期取得邏輯
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
							if (document.all["tbExtRmvSec_Date"].value == "" && !bISNaer)
							document.all["tbExtRmvSec_Date"].value=jf_PADL(str1.toString(),7,"0");//需先將str1轉為string才可正常運作
					    }
					
				    }
			     }
			 return true;
			 }
		}
	}

	//增加檢查結案時間格式
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
			    $("#tbCDATE")[0].focus();
				return;
			}
			//補滿4碼
			document.all["tbCTIME"].value=jf_PADL(document.all["tbCTIME"].value,4,"0");
			
			if (!CheckTIME("tbCTIME"))
			{
			    alert("時間格式錯誤");
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
			    $("#tbRmvSec_Date")[0].focus();
			}
		}
	}
	
	//應解密日期
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
			    $("#tbExtRmvSec_Date")[0].focus();
			}
		}
	}	

	//公文文號
	if (argTextBox=="tbDOC_NO")
	{
		Page_BlockSubmit = false;
	
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
    
	if (argTextBox == "tbFromNo" || argTextBox == "tbIssueNo") {
	    Page_BlockSubmit = false;
	    document.all[argTextBox].title = jf_Trim(document.all[argTextBox].value);
	}
	
}

function DlOnBlur(argDl)
{
	
	//密等
	if (argDl=="dlSECRET")
	{
		var dlSECRET_Index = document.all["dlSECRET"].options[document.all["dlSECRET"].selectedIndex].value;
		Change_dllIssueNoWord(dlSECRET_Index);		

		if(dlSECRET_Index > "1")
		{
			ddlSelect("dlAPPLYLIMIT",document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(1,2));
	
			document.all.txSecSeq.disabled = false;
    
		    document.all.txSecSeq.style.backgroundColor = "#FFFFFF";
			
			document.all.dlRmvSec_Cond.disabled = false;
			document.all.dlRmvSec_Cond_Text.disabled = false;
			document.all.dlRmvSec_Cond_Text.style.backgroundColor = "FFFFFF";
			
			document.all.tbExtRmvSec_Date.disabled = false;
			document.all.tbExtRmvSec_Date.style.backgroundColor = "FFFFFF";
			
			document.all.btSecSeq.disabled = false;

			document.all.tbRmvSec_Date.disabled = true;
			document.all.tbRmvSec_Date.style.backgroundColor = "LightGrey";
		    
			if (document.all["tbDOC_NO"].value != document.all["tbCOM_NO"].value && document.all["cbComNo"].checked) {
			    document.all["btSecSeq"].disabled = true;
			    document.all["txSecSeq"].disabled = true;
			    document.all.txSecSeq.style.backgroundColor = "LightGrey";
			    document.all["txSecSeq"].value = document.all.hMSecSeq.value;
			}
		    

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
			//改為依照環境變數判斷如何設定
			ddlSelect("dlAPPLYLIMIT",document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(0,1));
			
			if (document.all["tbDOC_NO"].value != document.all["tbCOM_NO"].value) {
			    document.all["txSecSeq"].value = "";
			}

		}
	}
	
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
	
	//待編目案件
	if (argDl == "dlFILE_DOC")
	{
		Page_BlockSubmit=false;
		document.all["tbDOC_NO"].value		=document.all["dlFILE_DOC"].options[document.all["dlFILE_DOC"].selectedIndex].text;
		document.all["txDocNoChange"].value	=document.all["dlFILE_DOC"].options[document.all["dlFILE_DOC"].selectedIndex].text;
		//此欄位於dlFILE_DOC_onchange後被設定為1 ，以此來判斷此次clientonload是否於剛剛執行完dlFILE_DOC_onchange
		document.all["btOpenChecker"].value = "1";		
		if (document.all.txDocNoChange.value != "") {
		    // 於__doPostBack前加上IsServerHandling=true;避免重複執行
		    IsServerHandling = true;
		    __doPostBack("txDocNoChange", "");
		}
	}
	
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
			
			document.all.dlIsRcvfile.style.backgroundColor = "";
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
			document.all.txRcvfileCnt.style.backgroundColor = "LightGrey"			
			document.all.txRcvfileCnt.value = "";
		}
		else
		{
			document.all.txRcvfileCnt.disabled = false;
			
			document.all.txRcvfileCnt.style.backgroundColor = "";
		}
	}
	
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
//新增承辦人職稱欄位，取得承辦人職稱
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

//密等與應用限制之連動 (應用限制下拉選單依照argSelectValue設定至對應值)
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
function CbOnClick(argCheckBox) {
	var xObjectName = "";
	var checkMode = "";

	if (event.target.id != null)
		xObjectName = event.target.id;

	else {
		xObjectName = "cbComNo";
		checkMode = "clientOnLoad";
	}
	//併件
	if (argCheckBox == "cbComNo") {
		if (document.all[xObjectName].checked) {
			//帶出併案母文所隱藏的檔號
			if (jf_Trim(document.all.tbCOM_NO.value) == "") {
				alert('請先輸入參照文號');

				$("#tbCOM_NO")[0].focus();
				return;
			}
			//判斷參照之文號有無編目日期，若無，且子文有完整檔號-則不可併件 -- start --
			else if (jf_Trim(document.all.tbCOM_NO.value) != "" && (document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value)) {

				var tmp = AK.AKM330_TAITRA.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value;
				if (jf_Trim(tmp) == "") {
					alert('輸入之參照文號尚未完成編目，不允許併件，請先將該筆公文完成編目。');
					document.all["tbCOM_NO"].value = "";

					$("#tbCOM_NO")[0].focus();
					document.all[xObjectName].checked = false;
					return;
				}
			}
			//Cola -- end --

			//母文為電子文、子文為紙本文 或 母文為紙本文、子文為電子文時 show msg
			//1.檔號均空白 -> 帶出年、分類、案
			//2.檔號任一有值 -> 不帶
			if (document.all.dlDocFileType.options[document.all.dlDocFileType.selectedIndex].value != document.all.htxDocFileType.value) {

				if (jf_Trim(AK.AKM330_TAITRA.CheckInpFile(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value).value) != "") {
					if (document.all.tbYEAR.value == "" && document.all.tbCLS.value == "" && document.all.tbCASE.value == "" && document.all.tbVOL.value == "" && document.all.tbSEQ.value == "") {
						document.all.tbYEAR.value = document.all.htxFileYear.value;
						document.all.tbCLS.value = document.all.htxFileCls.value;
						document.all.tbCASE.value = document.all.htxFileCase.value;
						//補國別--等資訊
						SetFileCaseToTaitraValue("htxFileCase");
						document.all.tbVerNo.value = document.all.htxVerNo.value;
						if (document.all.htxDocFileType.value == "2")
							alert("併件母文為電子檔案，而此公文為紙本檔案，所以檔號只帶出母文的年度號、分類號、案次號\n母文的檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value);
						else
							alert("併件母文為紙本檔案，而此公文為電子檔案，所以檔號只帶出母文的年度號、分類號、案次號\n母文的檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value);
					}
					else {
						if (document.all.htxDocFileType.value == "2")
							alert("併件母文為電子檔案，而此公文為紙本檔案，所以不自動帶出母文檔號\n母文的檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value);
						else
							alert("併件母文為紙本檔案，而此公文為電子檔案，所以不自動帶出母文檔號\n母文的檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value);
					}
				}
			}
			else  //母子文一致，帶出母文檔號
			{
				if (document.all["tbYEAR"].value != "" && document.all["tbCLS"].value != "" && document.all["tbCASE"].value != "" && document.all["tbVOL"].value != "" && document.all["tbSEQ"].value != "" && document.all.tbCOM_NO.value != document.all.tbDOC_NO.value || document.all.AK_AKM330_FILESET_MSG.value == "Y") {
					if (document.all.tbYEAR.value != document.all.htxFileYear.value || document.all.tbCLS.value != document.all.htxFileCls.value || document.all.tbCASE.value != document.all.htxFileCase.value || document.all.tbVOL.value != document.all.htxFileVol.value || document.all.tbSEQ.value != document.all.htxFileSeq.value)

						if (document.all.AK_AKM330_FILESET_MSG.value != "Y") {
							var tmp_child_fileno = document.all.tbYEAR.value + "-" + document.all.tbCLS.value + "-" + document.all.tbCASE.value + "-" + document.all.tbVOL.value + "-" + document.all.tbSEQ.value;

							var strAlter = "母子文檔號不同，母文檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value + ",子文檔號為：" + tmp_child_fileno + ", 檔號將被取代成與母文同，請確認是否執行併件。";
							if (document.all.dlSECRET.selectedIndex >= 2)
								strAlter = "母子文檔號不同，母文檔號為：" + document.all.htxFileYear.value + "-" + document.all.htxFileCls.value + "-" + document.all.htxFileCase.value + "-" + document.all.htxFileVol.value + "-" + document.all.htxFileSeq.value + ",子文檔號為：" + tmp_child_fileno + ", 檔號與密件另存流水號將被取代成與母文同，請確認是否執行併件。"

							if (window.confirm(strAlter)) {
								document.all.tbYEAR.value = document.all.htxFileYear.value;
								document.all.tbCLS.value = document.all.htxFileCls.value;
								document.all.tbCASE.value = document.all.htxFileCase.value;
								//補國別--等資訊
								SetFileCaseToTaitraValue("htxFileCase");
								document.all.tbVOL.value = document.all.htxFileVol.value;
								document.all.tbSEQ.value = document.all.htxFileSeq.value;

								document.all.tbVerNo.value = document.all.htxVerNo.value;

								if (document.all.dlSECRET.selectedIndex >= 2) {
									document.all["btSecSeq"].disabled = true;
									document.all["txSecSeq"].disabled = true;
									document.all.txSecSeq.style.backgroundColor = "LightGrey";
									document.all["txSecSeq"].value = document.all.hMSecSeq.value;
								}

								if (document.all["txStoreDate"].value == "")
									document.all["txStoreDate"].value = document.all.hMStoreDate.value;
							}
							else {
								document.all[xObjectName].checked = false;
							}
						}
						else {

							var strAlter = "併件時子文檔號將被取代成與母文一致，是否確定併件。"

							if (document.all.dlSECRET.selectedIndex >= 2)
								strAlter = "併件時子文檔號與密件另存流水號將被取代成與母文一致，是否確定併件。"
							if (window.confirm(strAlter)) {
								document.all.tbYEAR.value = document.all.htxFileYear.value;
								document.all.tbCLS.value = document.all.htxFileCls.value;
								document.all.tbCASE.value = document.all.htxFileCase.value;
								//補國別--等資訊
								SetFileCaseToTaitraValue("htxFileCase");
								document.all.tbVOL.value = document.all.htxFileVol.value;
								document.all.tbSEQ.value = document.all.htxFileSeq.value;
								document.all.tbVerNo.value = document.all.htxVerNo.value;

								if (document.all.dlSECRET.selectedIndex >= 2) {
									document.all["btSecSeq"].disabled = true;
									document.all["txSecSeq"].disabled = true;
									document.all.txSecSeq.style.backgroundColor = "LightGrey";
									document.all["txSecSeq"].value = document.all.hMSecSeq.value;
								}

								if (document.all["txStoreDate"].value == "")
									document.all["txStoreDate"].value = document.all.hMStoreDate.value;
							}
							else {
								document.all[xObjectName].checked = false;
							}
							if (checkMode == "clientOnLoad")
								return;
						}
				}
				else if (document.all.tbCOM_NO.value != document.all.tbDOC_NO.value) {
					document.all.tbYEAR.value = document.all.htxFileYear.value;
					document.all.tbCLS.value = document.all.htxFileCls.value;
					document.all.tbCASE.value = document.all.htxFileCase.value;
					//補國別--等資訊
					SetFileCaseToTaitraValue("htxFileCase");
					document.all.tbVOL.value = document.all.htxFileVol.value;
					document.all.tbSEQ.value = document.all.htxFileSeq.value;

					document.all.tbVerNo.value = document.all.htxVerNo.value;

					if (document.all.dlSECRET.selectedIndex >= 2) {
						document.all["btSecSeq"].disabled = true;
						document.all["txSecSeq"].disabled = true;
						document.all.txSecSeq.style.backgroundColor = "LightGrey";
						document.all["txSecSeq"].value = document.all.hMSecSeq.value;
					}
					if (document.all["txStoreDate"].value == "")
						document.all["txStoreDate"].value = document.all.hMStoreDate.value;

				}
			}
			GetClsName();

			if (document.all.txFileComboSeq)//Matte 0961022 001504
			{
				document.all["txFileComboSeq"].readOnly = false;
				document.all["txFileComboSeq"].className = "";
				GetFileComBoSeq();
			}
		}
		//95.11.01 950869 David
		else {
			if (jf_Trim(document.all["tbCOM_NO"].value) != "") {
				var strAlter = "取消併件須重新編卷,確定嗎?"
				if (document.all.dlSECRET.selectedIndex >= 2)
					strAlter = "取消併件須重新編卷及取得密件另存流水號,確定嗎?"
				if (window.confirm(strAlter)) {


					document.all["tbVOL"].value = "";
					document.all["tbSEQ"].value = "";
					document.all["txVolTotalPage"].value = "";

					if (document.all.txFileComboSeq)//Matte 0961022 001504
					{
						document.all["txFileComboSeq"].readOnly = true;
						document.all["txFileComboSeq"].className = "DisplayOnly";
						document.all["txFileComboSeq"].value = "";
					}
					//提醒同步密件流水號
					if (document.all.dlSECRET.selectedIndex >= 2) {
						document.all["btSecSeq"].disabled = false;
						document.all["txSecSeq"].disabled = false;
						document.all.txSecSeq.style.backgroundColor = "#FFFFFF";
						document.all["txSecSeq"].value = "";
					}
				}
				else {
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

		opener.window.CallBack("AKM330");


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
	    document.all["tbIssueNo"].value = strINoWord + "字第" + strINo + "號";
	    //* 2023.04.13   Cloud   考試院序7、34 來發文字號增加以tootip顯示完整字號
	    document.all["tbIssueNo"].title = document.all["tbIssueNo"].value;
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
	    document.all["tbFromNo"].value = strINoWord + "字第" + strINo + "號";
	    //* 2023.04.13   Cloud   考試院序7、34 來發文字號增加以tootip顯示完整字號
	    document.all["tbFromNo"].title = document.all["tbFromNo"].value;
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
	if (!CheckDeptChang(argDLObj))
		return;

	var strArr1 = new Array();
	var strArr2 = new Array();	
	var bAction = true;
	

	var bDept = false;
	var bSect = false;

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
    }
    else
    {
		if(argDLObj == "dlDept1" || argDLObj == "NoSect1" || argDLObj == "NoSect2")
		{
			if(document.all["dlDept1"].selectedIndex != -1)
			{
				strArr1 = document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value.split(':');	
				document.all["txDeptNo_h"].value = strArr1[0];
			}
			else
				bAction = false;
		}
		if(argDLObj == "dlSect")	
		{			
			if(document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "" )
			{
				strArr2 = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value.split(':');				
				
				document.all["txSectNo_h"].value = strArr2[2];
				document.all["txSectName_h"].value = strArr2[3];						
			}
			else if(jf_Trim(document.all["dlSect_Text"].value) == "")
			{
				strArr1 = document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value.split(':');	
				document.all["txDeptNo_h"].value = strArr1[0];
				
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
	
	var param2 = new Array(1);
	
	param2[0] = strArr2[2];	
	
	var param3 = new Array(1);
	param3[0] = strArr1[0];
	
	var RtnObjSect;	
	
	
    if ((argDLObj == "dlDept1" || argDLObj == "OdlDept1") && bAction)
		{	
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
    	
    	if (argDLObj.toUpperCase().indexOf("O") != -1)
    		CallWS_ID_OSECT = RtnObjSect.id;
		else
			CallWS_ID_SECT = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
    if ((argDLObj == "dlSect" || argDLObj == "OdlSect1") && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param2);
    
    	if (argDLObj.toUpperCase().indexOf("O") != -1)
    		CallWS_ID_OEmp1 = RtnObjSect.id;
    	else
			CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	
    if ((argDLObj == "NoSect1" || argDLObj == "ONoSect1") && bAction)
		{
			RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param3);
	    	
	    	if (argDLObj.toUpperCase().indexOf("O") != -1 && argDLObj != "NoSect1" && argDLObj != "NoSect2")
	    		CallWS_ID_OEmp1 = RtnObjSect.id;
	    	else
				CallWS_ID_Emp1 = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
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
	
}
//1130206 Cloud 1131337 增加判斷單位、科別有變動才做連動
function CheckDeptChang(argId) {
	if(argId=="NoSect2" || argId=="NoSect1" || argId=="ONoSect2" || argId=="ONoSect1")//程式自行觸發的連動直接回true
		return true;
	switch (argId) {
		
		case "dlDept1":
			if (jf_Trim(document.all["dlDept1_Text"].value) == jf_Trim(document.all["CheckDept"].value))
				return false;
			else
				return true;
			break;
		case "OdlDept1":
			if (jf_Trim(document.all["OdlDept1_Text"].value) == jf_Trim(document.all["CheckODept"].value))
				return false;
			else
				return true;
			break;
		case "dlSect":
			if (jf_Trim(document.all["dlSect_Text"].value) == jf_Trim(document.all["CheckSect"].value))
				return false;
			else
				return true;
			break;
		case "OdlSect1":
			if (jf_Trim(document.all["OdlSect1_Text"].value) == jf_Trim(document.all["CheckOSect"].value))
				return false;
			else
				return true;
			break;
	}
}
function fnKeepCheckValue(argId) {
	switch (argId) {
		case "dlDept1":
			document.all["CheckDept"].value = document.all["dlDept1_Text"].value
			break;
		case "OdlDept1":
			document.all["CheckODept"].value = document.all["OdlDept1_Text"].value
			break;
		case "dlSect":
			document.all["CheckSect"].value = document.all["dlSect_Text"].value
			break;
		case "OdlSect1":
			document.all["CheckOSect"].value = document.all["OdlSect1_Text"].value
			break;
	}
}

CheckComNoHiddenField();
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
    SumComWin = open(sUrl, "SumComWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    
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
        
        var resultE = AK.AKM330_TAITRA.GetFileComSeq(document.all["h_sourceorgno"].value, document.all["tbCOM_NO"].value);
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
		
		if (jf_Trim(document.all["txDocFileType"].value) == "2")
			document.all["txFileComboSeq"].value = "";		
	}	
}

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
	    $('#'+id).focus();
		document.all[id].value = "";
	}
}


function GetParam(p)
{
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
	
	fnKeepCheckValue(argObj);
	
	if(argObj=="All")
	{
		document.all.txDeptName.value = document.all["dlDept1_Text"].value;
		document.all.txSectName.value = document.all["dlSect_Text"].value;
		document.all.txEmpName.value = document.all["dlEmp_Text"].value;
        document.all.OtxDeptName.value = document.all["OdlDept1_Text"].value;
        document.all.OtxSectName.value = document.all["OdlSect1_Text"].value;
        document.all.OtxEmpName.value = document.all["OdlEmp1_Text"].value;
    	
	}
	//Gabby--END
}
function GetClsName()
{
    var param1 = new Array(3);
    
    param1[0] = encodeURI(document.all["tbVerNo"].value);
    param1[1] = encodeURI(document.all["tbCLS"].value);
    param1[2] = encodeURI(document.all["tbYEAR"].value);
    
    RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);
    iCallID_CLS = RtnObj.id;
    OnWSResult(RtnObj);
}
//1031226   Cloud   增加函式，for取得案次名
function GetCASEName()
{
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
//新增函式，以長官核判日期、發文日期、來文日期判斷文件產生日期
function SetCrtDate()
{
	var strTempCrtDate = document.all["tbCrtDate"].value;
	if(document.all["tbIDATE"].value != "")//發文日期
		strTempCrtDate = document.all["tbIDATE"].value;
	else if(document.all["tbFDATE"].value != "")//來文日期
		strTempCrtDate = document.all["tbFDATE"].value;
	else if(document.all["h_txApprovedDate"].value != "")//長官核判日期
		strTempCrtDate = document.all["h_txApprovedDate"].value;

	if(strTempCrtDate=="")
		strTempCrtDate = document.all["tbCDATE"].value;

		if(strTempCrtDate.length>7)
			strTempCrtDate = strTempCrtDate.substring(0,7);
	document.all["tbCrtDate"].value = strTempCrtDate;
}

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
//增加年度/版本互轉WS
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
function CheckDosState(argCallFrom)
{
	if (document.all["cbIsmiss"].checked && document.all["cbIsDestroy"].checked)
	{
		alert('不可同時勾選[毀損無法修復]與[已遺失]。');
		document.all[argCallFrom].checked = false;

	}
}
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
function CallBackByImgView()
{
	return opener.theSSO.MP.queryDocList.CallBackByImgView();
	opener.window.focus();
}
//組合國別/處別/細目號/產品別至案次號
function SetValueToFileCase() {
	document.all.tbCASE.value = document.all.txCountryCode.value + "-" + document.all.txOfficeCode.value + "-" + document.all.txProductCode.value;
}
function SetFileCaseToTaitraValue(argFileCase) {
	if (argFileCase == "") {//傳入空白表示清空
		document.all.txCountryCode.value = "";
		document.all.txOfficeCode.value = "";
		document.all.txProductCode.value = "";
	}
	else {
		document.all.txCountryCode.value = document.all[argFileCase].value.split('-')[0];
		document.all.txOfficeCode.value = document.all[argFileCase].value.split('-')[1];
		document.all.txProductCode.value = document.all[argFileCase].value.split('-')[2];
	}
}