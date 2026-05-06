/*****************************************************************************************************
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 *100.08.15		Jeff	1000631	配合檔管局特殊媒體類型，因應修改畫面欄位名稱一併修正跳出提示時的欄位名稱
 *103.08.28		Cloud	1020726	配合NLB修改使用者資訊取得方式
 *103.12.05     CLOUD    --     因NET4.5環境無法使用舊版AJAX元件對SESSION進行READWRITW，修改使用新版AJAX元件
 *105.08.15     Zen     1050700 XSS修正
 * 1060608      Justin  1050087 二代公文修改
 *1060831       Zen     1060742 弱點掃描修正
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1090316		Cloud	1081139	修改版本/年度onbllur 支援互轉 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1100218		Joe		1100203	弱掃修正Client Potential Code Injection
 * 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況 * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
 ****************************************************************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
var uOrgNo = "";
var uPlanNo = "";
var FILENO_SEP = "";
var alertTitle = "您輸入之資料有誤，明細如下，請更正後重試";
var DocInfo;
var ComDocInfo
var EditObjList = new Array('txSubject','txFileVer','txFileYear','txFileCls','txFileCase','txFileVol','txFileSeq','txComNo','cbComNo','btAutoVol','btCancelDoc','ibtCLS','ibtCASE');
var ShowObjList = new Array('txSubject','txFileVerB','txFileYearB','txFileClsB','txFileCaseB','txFileVolB','txFileSeqB','txRpsDept','txRpsUser','txClsNameB','txCaseNameB','txComNo','txFileVer','txFileYear','txFileCls','txFileCase','txFileVol','txFileSeq','txClsName','txCaseName');
var SystemSet;
var IsOpenAKM330C1=false;
//1060608 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-S
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	uOrgNo = $$("SOURCE_ORGNO").value;
	uPlanNo = $$("txPlanNo").value;
	FILENO_SEP = $$("FILENO_SEP").value;
	
    //1070830 Zen 1070678 弱掃Ajax修正
    //var ret = EAT417.GetSystemSet(uOrgNo);
    var ret = EA41.EAT417.GetSystemSet(uOrgNo);
	SystemSet = ret.value;
	if(!ret.error)
	{
		if(SystemSet.ErrMsg != "")
			alert(SystemSet.ErrMsg);					
	}
	else
	{
		var err = ret.error;
		alert(err.name+"\n"+err.description);
	}
    //1060608 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060608 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit=true;
	switch (xObjectName)
	{
		case "btKeyHelp":
			var pUrl = "";
			pUrl = "../EA40/EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
			break;
		case "btLoadDoc":
			var txDocNo = $$("txDocNo");
			if (jf_Trim(txDocNo.value) != "")
			{
				//1060831 Zen 1060742 弱掃XSS修正
				//if (LoadDocInfo(txDocNo.value))
				if (LoadDocInfo(encodeURI(txDocNo.value)))
				{
					SetObjDisable(txDocNo);
					SetObjDisable($$("btLoadDoc"));
					SetObjListEnable();
					//1060608 Justin [1050087] 二代公文修改
					//$("txSubject").focus();
					$('#txSubject').focus();
				}
			}
			else
			{
				txDocNo.value = "";
				//1000815	Jeff	1000631		因應欄位名稱修改，警示訊息一併作修改
				//alert("請輸入公文文號！");
				alert("請輸入文(編)號！");
			}
			break;
		case "btCancelDoc":
			ClearObjList();
			var txDocNo = $$("txDocNo");
			SetObjEnable(txDocNo);
			SetObjEnable($$("btLoadDoc"));
			SetObjListDisable();
			break;
		case "btAutoVol":
			if (!ChkEFileVolNo())
			{
				if (DocInfo.DocFileType == "2") //電子檔案
					alert("電子檔案的卷次號必須以 " + SystemSet.INIT_EVOLNO + " 開頭，請確認卷次號後再存檔");
				else
					alert("紙本檔案的卷次號不可以 " + SystemSet.INIT_EVOLNO + " 開頭，請確認卷次號後再存檔");
				//1060608 Justin [1050087] 二代公文修改
				//$("txFileVol").focus();
				$('#txFileVol').focus();
				break;
			}

			var isCom = false;
			//併件檢核
			if ($$("txComNo").value != "" && $$("txDocNo").value != $$("txComNo").value && $$("cbComNo").checked == true)
			{
				//1070830 Zen 1070678 弱掃Ajax修正
				//var ret = EAT417.GetDocInfo($$("txComNo").value, uOrgNo);
				var ret = EA41.EAT417.GetDocInfo($$("txComNo").value, uOrgNo);
				ComDocInfo = ret.value;
				if (!ret.error)
				{
					if (ComDocInfo.ErrMsg != "")
					{
						alert(ComDocInfo.ErrMsg);
						return;
					}
				}
				else
				{
					var err = ret.error;
					alert(err.name + "\n" + err.description);
					return;
				}
				var strFileYear = $$("txFileYear").value
				var strFileCls = $$("txFileCls").value
				var strFileCase = $$("txFileCase").value
				var strFileVol = $$("txFileVol").value
				var strFileSeq = $$("txFileSeq").value

				if (jf_Trim(ComDocInfo.InpFileDate) == "" && strFileYear != "" && strFileCls != "" && strFileCase != "" && strFileVol != "" && strFileSeq != "")
				{
					alert("參照文號尚未編目，不允許進行併件作業，請先將併件母文(參照文號)編目後才可將併件子文編目，或者將併件關係解除。");
					return;
				}
				else if (jf_Trim(ComDocInfo.InpFileDate) != "" && strFileYear != "" && strFileCls != "" && strFileCase != "" && strFileVol != "" && strFileSeq != "")
				{
					if (strFileYear != ComDocInfo.FileYear || strFileCls != ComDocInfo.FileCls || strFileCase != ComDocInfo.FileCase || strFileVol != ComDocInfo.FileVol || strFileSeq != ComDocInfo.FileSeq)
					{
						var ComFileNo = ComDocInfo.FileYear + FILENO_SEP + ComDocInfo.FileCls + FILENO_SEP + ComDocInfo.FileCase + FILENO_SEP + ComDocInfo.FileVol + FILENO_SEP + ComDocInfo.FileSeq;
						if (window.confirm("併件子文檔號與併件母文檔號不同\n母文檔號：" + ComFileNo + "\n是否依併件母文檔號進行儲存？"))
						{
							$$("txFileVer").value = ComDocInfo.VerNo;
							$$("txFileYear").value = ComDocInfo.FileYear;
							$$("txFileCls").value = ComDocInfo.FileCls;
							$$("txFileCase").value = ComDocInfo.FileCase;
							$$("txFileVol").value = ComDocInfo.FileVol;
							$$("txFileSeq").value = ComDocInfo.FileSeq;
							$$("htxClsKey").value = ComDocInfo.ClsKey;
							$$("htxCaseKey").value = ComDocInfo.CaseKey;
							isCom = true;
						}
						else
						{
							alert("併件子文檔號必須與併件母文檔號相同，請確定參照文號是否正確，或者將併件關係解除。");
							return;
						}
					}
				}
			}

			//leslie	待處理，需分為"自動編卷"及"儲存"兩種功能

			if ($$("txFileVol").value != "" && $$("txFileSeq").value != "")
			{
				if (!CheckUpdateFileNo())
				{
					if (!isCom)	//設定併件時已問過...不再重覆詢問
					{
						if (CheckFileValueProcess(1))
						{
							if (window.confirm("確定以所輸入之檔號進行儲存？"))
							{ }
							else
							{
								//1060608 Justin [1050087] 二代公文修改
								//$("txFileSeq").focus();
								$('#txFileSeq').focus();
								return;
							}
						}
						else
						{
							break;
						}
					}
				}
			}

			if ($$("txFileVol").value == "" && $$("txFileSeq").value != "")
			{
				alert("目次號有值且卷次號為空白，系統無法自動編卷");
				//1060608 Justin [1050087] 二代公文修改
				//$("txFileSeq").focus();
				$('#txFileSeq').focus();
				return;
			}
			//leslie	待處理，需分為"自動編卷"及"儲存"兩種功能

			if ($$("txFileCls").value == "")
			{
				alert("分類號欄位不可空白");
				//1060608 Justin [1050087] 二代公文修改
				//$("txFileCls").focus();
				$('#txFileCls').focus();
				return;
			}

			if ($$("txFileYear").value == "")
			{
				alert("年度號欄位不可為空白");
				//1060608 Justin [1050087] 二代公文修改
				//$("txFileYear").focus();
				$('#txFileYear').focus();
				return;
			}

			if ($$("txFileCase").value == "")
			{
				var param1 = new Array(3);

				//1050815 Zen 1050700 XSS修正--begin
				//param1[0] = $$("txFileVer").value;
				//param1[1] = $$("txFileCls").value;
				//param1[2] = $$("txFileYear").value;
				param1[0] = encodeURI($$("txFileVer").value);
				param1[1] = encodeURI($$("txFileCls").value);
				param1[2] = encodeURI($$("txFileYear").value);
				//1050815 Zen 1050700 XSS修正--end

				RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, param1);
				iCallID_CLS1 = RtnObj.id;
				OnWSResult(RtnObj);
			}
			else
				IsGetCase = true;

			if (IsGenCase)
			{
				//可使用通案
				IsGenCase = false;
				//若有單位預設案次號則以單位預設案次號為主
				if (DocInfo.DEPT_CASE == "")
				{
					IsGetCase = true;
					if (parseInt(DocInfo.SecNo, 10) > 1)
						$$("txFileCase").value = SystemSet.INITS_FILENO;
					else
						$$("txFileCase").value = SystemSet.INIT_FILENO;
				}
				else
				{
					IsGetCase = true;
					$$("txFileCase").value = DocInfo.DEPT_CASE;
				}
			}

			if (IsGetCase)
			{
				//自動編卷
				IsGetCase = false;
				if ($$("txFileYear").value == "" || $$("txFileCase").value == "")
				{
					alert("請提供完整的檔號(年度號、分類號、案次號)");
					if ($$("txFileYear").value == "")
						//1060608 Justin [1050087] 二代公文修改
						//$("txFileYear").focus();
						$('#txFileYear').focus();
					else
						//$("txFileCase").focus();
						$('#txFileCase').focus();
				}
				else
				{
					if ($$("htxClsKey").value == "")
						$$("txFileCls").onblur();
					if ($$("htxCaseKey").value == "")
						$$("txFileCase").onblur();
					var para = new Array();
					para[0] = DocInfo.DocNo;
					para[1] = DocInfo.VerNo;

					//1050815 Zen 1050700 XSS修正--begin
					//para[2] = $$("txFileYear").value;
					//para[3] = $$("txFileCls").value;
					//para[4] = $$("txFileCase").value;
					//para[5] = $$("txFileVol").value;
					//para[6] = $$("txFileSeq").value;
					//para[7] = $$("htxClsKey").value;
					//para[8] = $$("htxCaseKey").value;
					//para[9] = $$("txSubject").value;
					//para[10] = $$("txComNo").value;
					para[2] = encodeURI($$("txFileYear").value);
					para[3] = encodeURI($$("txFileCls").value);
					para[4] = encodeURI($$("txFileCase").value);
					para[5] = encodeURI($$("txFileVol").value);
					para[6] = encodeURI($$("txFileSeq").value);
					para[7] = encodeURI($$("htxClsKey").value);
					para[8] = encodeURI($$("htxCaseKey").value);
					para[9] = encodeURI($$("txSubject").value);
					para[10] = encodeURI($$("txComNo").value);
					//1050815 Zen 1050700 XSS修正--end

					para[11] = ($$("cbComNo").checked) ? "1" : "0";

					//103.08.28		Cloud	1020726	配合NLB修改使用者資訊取得方式(MERGE)
					//var ret = EAT417.SaveDocInfo($$("txPlanNo").value,uOrgNo,para);
					//103.12.05     CLOUD    因NET4.5環境無法使用舊版AJAX元件對SESSION進行READWRITW，修改使用新版AJAX元件
					//var ret = EAT417.SaveDocInfo($$("txPlanNo").value,uOrgNo,para,GetParam("SAMLart"));
					var ret = EA41.EAT417.SaveDocInfo($$("txPlanNo").value, uOrgNo, para, GetParam("SAMLart"));

					if (!ret.error)
					{
						var newVolSeq = ret.value;
						if (newVolSeq.ErrMsg != "")
							alert(newVolSeq.ErrMsg);
						else
						{
							if (newVolSeq.FileVol != "" && newVolSeq.FileSeq != "")
								alert("編卷完成，新檔號：" + $$("txFileYear").value + FILENO_SEP + $$("txFileCls").value + FILENO_SEP + $$("txFileCase").value + FILENO_SEP + newVolSeq.FileVol + FILENO_SEP + newVolSeq.FileSeq);
							ClearObjList();
							var txDocNo = $$("txDocNo");
							SetObjEnable(txDocNo);
							SetObjEnable($$("btLoadDoc"));
							SetObjListDisable();
						}
					}
					else
					{
						var err = ret.error;
						alert(err.name + "\n" + err.description);
					}
				}
			}
			break;
		case "ibtCLS":
			var pUrl = "";
			//1090317	Cloud 1081109 開啟eac005 前檢核分類號有值至少需有版本別或年度
			if ($$("txFileCls").value != "" && $$("txFileYear").value == "" && $$("txFileVer").value == "")
			{
				alert('分類號有值時，至少需輸入版本別或年度號才可查詢。')
				return;
			}
			EAC005 = "CLS";
			pUrl = "../EA01/EAC005.aspx?FILE_CLS=" + $$("txFileCls").value + "&FILE_YEAR=" + $$("txFileYear").value + "&MODE=1&nFrom=AKM330&VER_NO=" + $$("txFileVer").value + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(pUrl, "EAC005", 750, 500);
			Page_BlockSubmit = true;
			break;
		case "ibtCASE":
			var pUrl = "";
			EAC005 = "CASE";
			pUrl = "../EA01/EAC005.aspx?FILE_CLS=" + $$("txFileCls").value + "&FILE_YEAR=" + $$("txFileYear").value + "&MODE=2&nFrom=AKM330&VER_NO=" + $$("txFileVer").value + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(pUrl, "EAC005", 750, 500);
			Page_BlockSubmit = true;
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060608 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060608 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060608 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060608 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
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
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txKeyFld"].value == "")
	{
	    strErrMsg += "鍵值欄位不可空白\n";
	    //1060608 Justin [1050087] 二代公文修改
	    //document.all["txKeyFld"].focus();
	    $('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
	    strErrMsg += "必要欄位不可空白\n";
	    //1060608 Justin [1050087] 二代公文修改
	    //document.all["txRequireFld"].focus();
	    $('#txRequireFld').focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/

var IsRight=false;
var IsGenCase=false;
var IsGetCase=false;
var IsDuplicate=true;
var IsCls=false;
var strSeq = "";
var iCallID_ChkUserDocPriv = null;
var iCallID_CLS = null;
var iCallID_CLS1 = null;
var iCallID_CASE = null;
var iCallID_CASE1 = null;

//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
	var WSResult;
	var ErrMsg = "";
	
	if(argResult.id == iCallID_CLS)  //分類號 onblur
    {
		IsCls=false;
		if(jf_IsWebServiceSuccess_AKM330(argResult))
		{
			WSResult = argResult.value;
			if(WSResult.CLS_KEY == "" || WSResult.VerNo == "")
			{
				alert("無此分類號，請輸入正確版本別或分類號");
				$$("txClsName").value = "";
				$$("txCaseName").value = "";
				$$("txFileCase").value = "";
				$$("txFileVol").value = "";
				$$("txFileSeq").value = "";
				$$("htxClsKey").value = "";
				$$("htxCaseKey").value = "";
				
				return;
			}
			$$("txClsName").value = WSResult.ClsName;
			$$("htxClsKey").value = WSResult.ClsKey;
			$$("txFileVer").value = WSResult.VerNo;
			
			if (WSResult.IS_LOWEST != "1")
			{
				alert("此分類號其下還有其他細分類，請填入細分類號");
				return;
			}
			
			if (WSResult.GenCase=="1")
			{
				if ($$("txFileCase").value=="")
				{
					IsCls=true;
					//若有單位預設案次號則以單位預設案次號為主
					if (DocInfo.DEPT_CASE == "")
					{
						if (parseInt(DocInfo.SecNo,10)>1)
							$$("txFileCase").value = SystemSet.INITS_FILENO;
						else
							$$("txFileCase").value = SystemSet.INIT_FILENO;
					}
					else
						$$("txFileCase").value = DocInfo.DEPT_CASE;
				}
			}

		}
		else
		{
			alert(obj.m_strErrMsg);
			//1080317	Cloud	1081109 測到bug 一併修
			//if(obj.ErrorClass.ErrMessage[0].text.indexOf("、")<0) 
			//}
				$$("txClsName").value = "";
				$$("txCaseName").value = "";
				$$("txFileCase").value = "";
				$$("txFileVol").value = "";
				$$("txFileSeq").value = "";
				$$("htxClsKey").value = "";
				$$("htxCaseKey").value = "";
			//}
			flagtemp=false;
			
			if (CurrOnBlurField == "txFileYear")
			    //1060608 Justin [1050087] 二代公文修改
			    //$("txFileYear").focus();//年度號不正確
				$('#txFileYear').focus();
			//1090317 Cloud 1081109 配合訊息調整，修改判斷
			//else if (obj.m_strErrMsg.indexOf("、")>=0)
			else if (obj.m_strErrMsg.indexOf("該年度內有多個版本") >= 0)
			    //$("txFileVer").focus();
			    $('#txFileVer').focus();
			else
			    //$("txFileCls").focus();
			    $('#txFileCls').focus();
		}
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
			    //1060608 Justin [1050087] 二代公文修改
			    //$("txFileCase").focus();
			    $('#txFileCase').focus();
			}
		}
		else
		    //1060608 Justin [1050087] 二代公文修改
		    //$("txFileCls").focus();
		    $('#txFileCls').focus();
    }
	
    if(argResult.id == iCallID_CASE) //案次號 onblur
    {
		if(argResult.error)
		{
		    alert(argResult.errorDetail.string);
		    //1060608 Justin [1050087] 二代公文修改
		    //$("txFileCase").focus();
		    $('#txFileCase').focus();
			return;
		}
		WSResult = argResult.value;
		if (WSResult.m_strErrMsg.length!=0)  //
		{
			$$("txCaseName").value="";
			$$("htxCaseKey").value="";

			if(WSResult.m_strErrMsg.substring(0,5)=="無此案次號")
			{
				if($$("txFileCase").value!=SystemSet.INITS_FILENO && 
				$$("txFileCase").value!=SystemSet.INIT_FILENO && 
				$$("txFileCase").value!=DocInfo.DEPT_CASE)
				{
					if (!IsOpenAKM330C1) 
					{
						if (window.confirm("輸入的案次號不存在，是否要線上立案?"))
						{
							var pUrl = "";
							pUrl = "../../../AK/AKM330C1.aspx?argCYR="+$$("txFileYear").value+"&argCNO="+$$("txFileCls").value+"&argFNM="+$$("txFileCase").value;
							pUrl += "&argVER="+$$("txFileVer").value+"&SAMLart="+GetParam("SAMLart"); 
							OpenWindow(pUrl);
							IsOpenAKM330C1 = true;
						}
					} 
				}
				else
				{
				    alert(WSResult.m_strErrMsg);
				    //1060608 Justin [1050087] 二代公文修改
				    //$("txFileCase").focus();
				    $('#txFileCase').focus();
				}
			}
			else
			{
			    alert(WSResult.m_strErrMsg);
			    //1060608 Justin [1050087] 二代公文修改
			    //$("txFileYear").focus();
			    $('#txFileYear').focus();
			}
		}
		else
		{
			//帶出案名
			$$("txCaseName").value = WSResult.CaseName;
			$$("htxCaseKey").value = WSResult.CaseKey;
			if (WSResult.CaseYear != "")
				$$("txFileYear").value = WSResult.CaseYear;
		}
    }
    if(argResult.id == iCallID_CASE1)  //CLS_NO onblur -> case_no 不存在 -> 線上立案
    {
		if(argResult.error)
		{
		    alert(argResult.errorDetail.string);
		    //1060608 Justin [1050087] 二代公文修改
		    //$("txFileCase").focus();
		    $('#txFileCase').focus();
			//1090317	Cloud	1081109 補上給予空白避免不斷迴圈
		    $('#txFileCase').value = "";
		    $$("htxCaseKey").value = "";
			return;
		}
		
		WSResult = argResult.value;
		if (WSResult.m_strErrMsg.length!=0)
		{
			$$("txCaseName").value="";
			$$("htxCaseKey").value="";

			if(WSResult.m_strErrMsg.substring(0,5)=="無此案次號")
			{
				if($$("txFileCase").value!=SystemSet.INITS_FILENO && 
				$$("txFileCase").value!=SystemSet.INIT_FILENO && 
				$$("txFileCase").value!=DocInfo.DEPT_CASE)
				{
					if (!IsOpenAKM330C1) 
					{
						if (window.confirm("輸入的案次號不存在，是否要線上立案?"))
						{
						    var pUrl = "";
						    //1060608 Justin [1050087] 二代公文修改
						    //$("txFileVol").focus();
						    $('#txFileVol').focus();
							pUrl = "../../../AK/AKM330C1.aspx?argCYR="+$$("txFileYear").value+"&argCNO="+$$("txFileCls").value+"&argFNM="+$$("txFileCase").value;
							OpenWindow(pUrl);
							IsOpenAKM330C1 = true;
						}
					} 
				}
				else
				{
				    alert(WSResult.m_strErrMsg);
				    //1060608 Justin [1050087] 二代公文修改
				    //$("txFileCase").focus();
				    $('#txFileCase').focus();
				}
			}
			else
			{
			    alert(WSResult.m_strErrMsg);
			    //1060608 Justin [1050087] 二代公文修改
			    //$("txFileYear").focus();
			    $('#txFileYear').focus();
			}
		}
    }
    //1090317 Cloud 1081109 修改支援叫用年度/版本互轉-s
    else if (argResult.id == wsGetVerYearID)
    {
		//* 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
    	//if (jf_IsWebServiceSuccess(argResult))
		if (!argResult.error && argResult.value.m_bSuccess)
    	{
    		if (CurrOBjdID == "txFileYear")
    		{
    			document.all["txFileVer"].value = argResult.value.strVerNo;
    			oldYearValue = document.all["txFileYear"].value;
    			if ($$("txFileCls").value != "")
    			{
    				var param1 = new Array(4);
    				param1[0] = uOrgNo;
    				param1[1] = $$("txFileVer").value;
    				param1[2] = $$("txFileCls").value;
    				param1[3] = $$("txFileYear").value;
    				RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, param1);
    				iCallID_CLS = RtnObj.id;
    				OnWSResult(RtnObj);
    			}
    		}
    		else
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			var WSResult = argResult.value;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["txFileYear"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					oldYearValue = document.all["txFileYear"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < WSResult.strSdate || document.all["txFileYear"].value > WSResult.strEdate)
    				{
    					if (document.all["txFileYear"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					oldYearValue = document.all["txFileYear"].value = WSResult.strEdate;
    				}
    			}
    		}
    	}
    	else
    	{

    		if (callObj.value.m_strErrMsg.indexOf("輸入年度含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
				//* 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-S
				var bAlert = true;		
				if(document.all["txFileVer"].value!="")
				{
								
					var checkmsg = argResult.value.m_strErrMsg.split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["txFileVer"].value)
							{
								bAlert = false;
								break;
							}
						}
					}
				}
				if(bAlert)
				{
					document.all["txFileVer"].value = "";
					document.all["txFileVer"].focus();
					oldYearValue = document.all["txFileYear"].value;
					//* 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
					alert(argResult.value.m_strErrMsg);
				}
				
    		}
    		else
    		{
				//* 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
				alert(argResult.value.m_strErrMsg);
    			document.all[CurrOBjdID].value = "";
    			$('#' + CurrOBjdID).focus();
    		}


    	}
    }
	//1090317 Cloud 1081109 修改支援叫用年度/版本互轉-e
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	var lbReturn = $$("lbReturnValue")
	if (argCallerId == "EAT400C1")
	{
		var txPlanNo = $$("txPlanNo");
		txPlanNo.value = lbReturn.options[0].value;
		if(txPlanNo.value != "")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btOpen";	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",0);
			}
		}
	    //1060608 Justin [1050087] 二代公文修改
		//txPlanNo.focus();
		$('#txPlanNo').focus();
	}
	else if(argCallerId=="EAC005")
	{
		if (EAC005 == "CLS")
		{
			if(lbReturn.length>0)
			{
				$$("txFileCls").value=lbReturn.options[1].value;
				$$("txFileVer").value = lbReturn.options[0].value;
				TbOnBlur("txFileCls");
			}
		}
		else
		{
			if(lbReturn.length>0)
			{
				$$("txFileCase").value=lbReturn.options[2].value;
				if(lbReturn.options[0].value!="")
					$$("txFileYear").value=lbReturn.options[0].value;
				$$("htxCaseKey").value=lbReturn.options[3].value;
				TbOnBlur("txFileCase");
			}		
		}
	}
	
	if (argCallerId=="AKM330C1")
	{
		if(lbReturn.length==3)
		{	
			if (lbReturn.options[1].value != "")
				$$("txCaseName").value=lbReturn.options[1].value;
			if (lbReturn.options[2].value != "")
				$$("htxCaseKey").value=lbReturn.options[2].value;
		}
		IsOpenAKM330C1 = false;
	}
	
	//清空lbReturnValue物件
	if($$("lbReturnValue").options != null)
		$$("lbReturnValue").options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//偷懶專用
//1060608 Justin [1050087] 二代公文修改-修改函式名避免與jquery衝突
//function $(O)
function $$(O)
{
	return document.getElementById(O)
}

function SetObjListEnable()
{
	for(var i=0;i<EditObjList.length;i++)
		SetObjEnable($$(EditObjList[i]));
}

function SetObjListDisable()
{
	for(var i=0;i<EditObjList.length;i++)
		SetObjDisable($$(EditObjList[i]));
}

function ClearObjList()
{
	var cMode = jf_ReadCookie("Mode");
	if(cMode == "Clean")	//清除模式
	{//EditObjList ShowObjList
		for(var i=0;i<ShowObjList.length;i++)
		{
			var Obj = $$(ShowObjList[i]);
			if(Obj.type == 'text')
				Obj.value = "";
		}
		$$("txDocNo").value = "";
	}
}

function SetObjEnable(Obj)
{
	if(Obj.type == 'text')
	{
		Obj.readOnly = false;
		Obj.style.backgroundColor = "white";
	}
	else
	{
		Obj.disabled = false;
	}
}

function SetObjDisable(Obj)
{
	if(Obj.type == 'text')
	{
		Obj.readOnly = true;
		Obj.style.backgroundColor = "Gainsboro";
	}
	else
	{
		Obj.disabled = true;
	}
}

function OpenWindow(argUrl)
{
	var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,toolbar=no,resizable=yes";
	uChildWinHandle=open(argUrl,null,gChidkWinStyle);
}

function LoadDocInfo(argDocNo)
{
    //1070830 Zen 1070678 弱掃Ajax修正
    //var ret = EAT417.GetPlanDocInfo(argDocNo, uPlanNo, uOrgNo)
    var ret = EA41.EAT417.GetPlanDocInfo(argDocNo, uPlanNo, uOrgNo)
	if(!ret.error)
	{
		DocInfo = ret.value;
		if(DocInfo.ErrMsg == "")
		{
			$$("txRpsDept").value = DocInfo.DeptName;
			$$("txRpsUser").value = DocInfo.EmpName;
			$$("txSubject").value = DocInfo.FromSubject;
			$$("txFileVerB").value = DocInfo.VerNo;
			$$("txFileYearB").value = DocInfo.FileYear;
			$$("txFileClsB").value = DocInfo.FileCls;
			$$("txFileCaseB").value = DocInfo.FileCase;
			$$("txFileVolB").value = DocInfo.FileVol;
			$$("txFileSeqB").value = DocInfo.FileSeq;
			$$("txComNo").value = DocInfo.ComNo;
			$$("cbComNo").checked = (DocInfo.ComStatus=="1")?true:false;
			$$("txClsNameB").value = DocInfo.ClsName;
			$$("txCaseNameB").value = DocInfo.CaseName;
			$$("txFileVer").value = DocInfo.VerNo;
			$$("txFileYear").value = DocInfo.FileYear;
			$$("txFileCls").value = DocInfo.FileCls;
			$$("txFileCase").value = DocInfo.FileCase;
			$$("txFileVol").value = DocInfo.FileVol;
			$$("txFileSeq").value = DocInfo.FileSeq;
			$$("txFileCls").onblur();
			$$("txFileCase").onblur();
			//if(DocInfo.ComStatus == "1")
				$$("txComNo").onblur();
			return true;
		}
		else
		{
			alert(DocInfo.ErrMsg)//Alert出錯誤訊息
		}
	}
	else
	{
		var err = ret.error;
		alert(err.name+"\n"+err.description);
	}
	return false;
}

function TbOnChange(argTextBox)
{
	var xObjectName = "";
	if(document.activeElement!=null)
		xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
		return;
	
	switch(argTextBox)
	{
		case "txFileYear":
		case "txFileCls":
		case "txFileCase":
			$$("txFileVol").value = "";
			$$("txFileSeq").value = "";
			break;
		case "txFileVol":
			$$("txFileSeq").value = "";
			break;
	}
}
var CurrOnBlurField = "";
var bIsDoubleMsg = false;
//1090316 Cloud 1081109 補上取得版本別
var wsGetVerYearID = null;
var CurrOBjdID = null;
var oldYearValue = "";
var bfocusVer = false;
function TbOnBlur(argTextBox)
{
	CurrOnBlurField = argTextBox;
	var xObjectName = argTextBox;
	var txCurrObj = $$(xObjectName);

	if (argTextBox == "txFileSeq")
	{
		if(txCurrObj.value == "000")
		{	
			alert(alertTitle + "\n目次號 值為000 "+"編卷 請從001起\n");
			txCurrObj.value = "";
		    //1060608 Justin [1050087] 二代公文修改
			//txCurrObj.focus();
			$('#txFileSeq').focus();
		}
	}
	if (argTextBox == "txFileVol")
	{
		if(txCurrObj.value == "0000")
		{
			alert(alertTitle + "\n卷次號 值為0000 "+"編卷 請從0001起\n");
			txCurrObj.value = "";
		    //1060608 Justin [1050087] 二代公文修改
			//txCurrObj.focus();
			$('#txFileVol').focus();
		}	
	}
	
	//年度號
	if (argTextBox=="txFileYear")
	{
		if(txCurrObj.value=="")
			return;
		else
		{
			if (bIsDoubleMsg == true)
			{
				bIsDoubleMsg = false;
				return;
			}
			if ((document.activeElement.id == "txFileCls" && event.srcElement.id == "txFileYear") || (document.activeElement.id == "txFileYear" && event.srcElement.id == "txFileCls"))
			{
				bIsDoubleMsg = true;
			}
			txCurrObj.value = jf_PADL(txCurrObj.value, 3, "0");
			//1090317 Cloud 1081109 補上取得版本別-S
			if (oldYearValue != document.all["txFileYear"].value)
			{
				CurrOBjdID = "txFileYear";
				var arWSParam = new Array(3);
				//1100218	Joe		1100203		弱掃修正Client Potential Code Injection
				// arWSParam[0] = document.all["txFileYear"].value;
				// arWSParam[1] = document.all["txFileVer"].value;
				arWSParam[0] = encodeURI(document.all["txFileYear"].value);
				arWSParam[1] = encodeURI(document.all["txFileVer"].value);
				arWSParam[2] = "Year";
				callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
				wsGetVerYearID = callObj.id;
				OnWSResult(callObj);
				
			}

			
			if(jf_Trim($$("txFileVer").value) != "" && jf_Trim($$("txFileCls").value) != "" && jf_Trim($$("txFileCase").value) != "")
			{
				var param = new Array(4);
				param[0] = uOrgNo;
				param[1] = $$("txFileYear").value;
				param[2] = $$("htxClsKey").value;
				param[3] = $$("txFileCase").value;

				RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx","ws_CheckCase",false,param);
				iCallID_CASE = RtnObj.id;
				OnWSResult(RtnObj);
			}
		}
	}

	//分類號 & 版本別
	if (argTextBox=="txFileCls" || argTextBox=="txFileVer")
	{
		if (bIsDoubleMsg == true)
		{
			bIsDoubleMsg = false;
			return;
		}
		if ((document.activeElement.id == "txFileCls" && event.srcElement.id == "txFileVer") || (document.activeElement.id == "txFileVer" && event.srcElement.id == "txFileCls"))
		{
			bIsDoubleMsg = true;
		}
		//1090317 Cloud 1081109 補上取得版本別-S
		if (argTextBox == "txFileVer" && document.all["txFileVer"].value != "")
		{
			CurrOBjdID = "txFileVer";
			var arWSParam = new Array(3);
			//1100218	Joe		1100203		弱掃修正Client Potential Code Injection
			// arWSParam[0] = document.all["txFileYear"].value;
			// arWSParam[1] = document.all["txFileVer"].value;
			arWSParam[0] = encodeURI(document.all["txFileYear"].value);
			arWSParam[1] = encodeURI(document.all["txFileVer"].value);
			arWSParam[2] = "VerNo";
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
			wsGetVerYearID = callObj.id;
			OnWSResult(callObj);
		}
		//1090317 Cloud 1081109 補上取得版本別-E
		if ($$("txFileCls").value=="")
		{
		    //1060608 Justin [1050087] 二代公文修改
		    //$$("txClsName").innerText = "";
		    $$("txClsName").value = "";
			$$("htxClsKey").value 	= "";
			return;
		}

		if(argTextBox=="txFileCls")
		{
		    //1060608 Justin [1050087] 二代公文修改
		    //var strLmtClsLen = document.all.h_lbClsLen.innerText;
		    var strLmtClsLen = document.all.h_lbClsLen.value;
			if(strLmtClsLen !=null&&jf_Trim(strLmtClsLen)!=""&&strLmtClsLen!="0")
			{
				var iLmtClsLen = parseInt(strLmtClsLen);
				if(iLmtClsLen!=0)
				{
					var inpClsNo = jf_Trim($$("txFileCls").value);
					if(inpClsNo!=""&&inpClsNo.length<iLmtClsLen)
					{

					    alert("分類號至少需輸入" + strLmtClsLen + "碼!!");
					    //1060608 Justin [1050087] 二代公文修改
					    //$("txFileCls").focus();
					    $('#txFileCls').focus();
						return;
					}
				}
			}
		}
		var param1 = new Array(4);
		param1[0] = uOrgNo;
		param1[1] = $$("txFileVer").value;
		param1[2] = $$("txFileCls").value;
		param1[3] = $$("txFileYear").value;
		RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx","ws_GetCls",false,param1);

		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);

		if(jf_Trim($$("txFileVer").value) != "" && jf_Trim($$("txFileCls").value) != "" && jf_Trim($$("txFileCase").value) != "")
		{
			var param = new Array(4);
			param[0] = uOrgNo;
			param[1] = $$("txFileYear").value;
			param[2] = $$("htxClsKey").value;
			param[3] = $$("txFileCase").value;

			RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx","ws_CheckCase",false,param);
			iCallID_CASE1 = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}
	
	//案次號
	if (argTextBox=="txFileCase")
	{
		if ($$("txFileCase").value=="")
		{
		    /*1060608 Justin [1050087] 二代公文修改
			$$("txCaseName").innerText = "";
			$$("htxCaseKey").innerText = "";*/
		    $$("txCaseName").value = "";
		    $$("htxCaseKey").value = "";
			return;
		}

		if(jf_Trim($$("txFileVer").value) != ""  && jf_Trim($$("txFileCls").value) != "")
		{
			var param = new Array(4);
			param[0] = uOrgNo;
			param[1] = $$("txFileYear").value;
			param[2] = $$("htxClsKey").value;
			param[3] = $$("txFileCase").value;

			RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx","ws_CheckCase",false,param);
			iCallID_CASE = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}

	//卷次號
	if (argTextBox=="txFileVol")
	{
		if (txCurrObj.value=="")
			return;
		else
		{
			txCurrObj.value=jf_PADL(txCurrObj.value,4,'0');
		}
	}

	//目次號
	if (argTextBox=="txFileSeq")
	{
		if (txCurrObj.value=="")
			return;
		else
		{
			txCurrObj.value=jf_PADL(txCurrObj.value,3,'0');
		}
	}
	
	//併案母文 **********************************************************
	if (argTextBox=="txComNo")
	{
		var cbComNo = $$("cbComNo");
		if (txCurrObj.value=="")
		{
			cbComNo.disabled=true;
			cbComNo.checked = false;
		    //1060608 Justin [1050087] 二代公文修改
			//$("txFileYear").focus();
			$('#txFileYear').focus();
			return;
		}
		else
		{
		    cbComNo.disabled = false;
		    //1060608 Justin [1050087] 二代公文修改
		    //cbComNo.focus();
		    $('#cbComNo').focus();
		}
	    //1060831 Zen 1060742 弱掃XSS修正
		//var ret = EAT417.GetDocInfo(txCurrObj.value, uOrgNo);
        //1070830 Zen 1070678 弱掃Ajax修正
        //var ret = EAT417.GetDocInfo(encodeURI(txCurrObj.value), uOrgNo);
        var ret = EA41.EAT417.GetDocInfo(encodeURI(txCurrObj.value), uOrgNo);
		ComDocInfo = ret.value;
		if(!ret.error)
		{
			if(ComDocInfo.ErrMsg != "")
			{
				alert(ComDocInfo.ErrMsg);	
				return;
			}
			else
			{
				if(cbComNo.checked)
				{
					$$("txFileVer").value = ComDocInfo.VerNo;
					$$("txFileCls").value = ComDocInfo.FileCls;
					TbOnBlur('txFileCls')
				}
				
				if(SystemSet.AK_AKM330_COM_STATUS == "Y")
				{
					cbComNo.checked = true;
					CbOnClick("cbComNo");
				}
			}
		}
		else
		{
			var err = ret.error;
			alert(err.name+"\n"+err.description);
			return;
		}
	}
}

function CbOnClick(argCheckBox)
{
	var xObjectName = "";
    //1100204 Zen 1090927 取消使用document.activeElement	//if (document.activeElement != null)
    //	xObjectName = document.activeElement.id;
	if (event.target != null)
	    xObjectName = event.target.id;
	
	//併件
	if (argCheckBox=="cbComNo")
	{
		var cbComNo = $$(xObjectName);
		if(cbComNo.checked)
		{
			var txYear = $$("txFileYear");
			var txCls  = $$("txFileCls");
			var txCase = $$("txFileCase");
			var txVol  = $$("txFileVol");
			var txSeq  = $$("txFileSeq");
			var txCom  = $$("txComNo");
			var txDoc  = $$("txDocNo");
						
			//帶出併案母文所隱藏的檔號
			if(jf_Trim(txCom.value) == "")
			{
			    alert('請先輸入參照文號');
			    //1060608 Justin [1050087] 二代公文修改
			    //txCom.focus();
			    $('#txComNo').focus();
				return;
			}						
			//判斷參照之文號有無編目日期，若無，且子文有完整檔號-則不可併件 
			else if(jf_Trim(txCom.value) != "" && (txYear.value != "" && txCls.value != "" && txCase.value != "" && txVol.value != "" && txSeq.value != "" && txCom.value != txDoc.value ) )
			{
				if (jf_Trim(ComDocInfo.InpFileDate) == "")
				{
					alert('輸入之參照文號尚未完成編目，不允許併件，請先將該筆公文完成編目。');
					txCom.value = "";
				    //1060608 Justin [1050087] 二代公文修改
					//txCom.focus();
					$('#txComNo').focus();
					cbComNo.checked = false;
					return;
				}
			}
			
			var ComFileNo = ComDocInfo.FileYear+FILENO_SEP+ComDocInfo.FileCls+FILENO_SEP+ComDocInfo.FileCase+FILENO_SEP+ComDocInfo.FileVol+FILENO_SEP+ComDocInfo.FileSeq;
			
			//母文為電子文、子文為紙本文 或 母文為紙本文、子文為電子文時 show msg
			//1.檔號均空白 -> 帶出年、分類、案
			//2.檔號任一有值 -> 不帶
			if(DocInfo.DocFileType != ComDocInfo.DocFileType) 
			{
				//若母文尚未編目, 則不顯示訊息
				if (ComDocInfo.InpFileDate != "")
				{			
					if(txYear.value == "" && txCls.value == "" && txCase.value == "" && txVol.value == "" && txSeq.value == "")
					{
						$$("txFileVer").value = ComDocInfo.VerNo;
						txYear.value = ComDocInfo.FileYear;
						txCls.value = ComDocInfo.FileCls;
						if(ComDocInfo.DocFileType == "2")
							alert("併件母文為電子檔案，而此公文為紙本檔案，所以檔號只帶出母文的年度號、分類號、案次號\n母文的檔號為："+ComFileNo);
						else
							alert("併件母文為紙本檔案，而此公文為電子檔案，所以檔號只帶出母文的年度號、分類號、案次號\n母文的檔號為："+ComFileNo);
					}
					else
					{
						if(ComDocInfo.DocFileType == "2")
							alert("併件母文為電子檔案，而此公文為紙本檔案，所以不自動帶出母文檔號\n母文的檔號為："+ComFileNo);
						else
							alert("併件母文為紙本檔案，而此公文為電子檔案，所以不自動帶出母文檔號\n母文的檔號為："+ComFileNo);
					}
				}
			}
			else  //母子文一致，帶出母文檔號
			{
				//若子文有完整之檔號, 則需先尋問使用者是否要覆蓋
				if (txYear.value != "" && txCls.value != "" && txCase.value != "" && txVol.value != "" && txSeq.value != "" && txCom.value != txDoc.value)
				{
					if(txYear.value != ComDocInfo.FileYear || txCls.value != ComDocInfo.FileCls || txCase.value != ComDocInfo.FileCase || txVol.value != ComDocInfo.FileVol || txSeq.value != ComDocInfo.FileSeq)
					{
						var tmp_child_fileno = txYear.value+FILENO_SEP+txCls.value+FILENO_SEP+txCase.value+FILENO_SEP+txVol.value+FILENO_SEP+txSeq.value;
						if ( window.confirm("母子文檔號不同，母文檔號為："+ComFileNo+",子文檔號為："+tmp_child_fileno+", 檔號將被取代成與母文同，請確認是否執行併件。"))
						{
							$$("txFileVer").value = ComDocInfo.VerNo;
							txYear.value	= ComDocInfo.FileYear;
							txCls.value		= ComDocInfo.FileCls;
							txCase.value	= ComDocInfo.FileCase;
							txVol.value		= ComDocInfo.FileVol;
							txSeq.value		= ComDocInfo.FileSeq;
							$$("htxClsKey").value = ComDocInfo.ClsKey;
							$$("htxCaseKey").value = ComDocInfo.CaseKey;				
						}
						else
						{
							cbComNo.checked = false;
						}
					}
				}
				else if (txCom.value != txDoc.value)
				{
					$$("txFileVer").value = ComDocInfo.VerNo;
					txYear.value	= ComDocInfo.FileYear;
					txCls.value		= ComDocInfo.FileCls;
					txCase.value	= ComDocInfo.FileCase;
					txVol.value		= ComDocInfo.FileVol;
					txSeq.value		= ComDocInfo.FileSeq;
					$$("htxClsKey").value = ComDocInfo.ClsKey;
					$$("htxCaseKey").value = ComDocInfo.CaseKey;
				}
			}
			
			//帶出分類名
			txCls.onblur();
			//帶出案名
			txCase.onblur();
			
		}
		else
		{
			if(jf_Trim($$("txComNo").value) != "")
			{
				if(window.confirm("取消併件須重新編卷,確定嗎?"))
				{
					$$("txFileVol").value = "";
					$$("txFileSeq").value = "";
				}					
				else
				{
					cbComNo.checked = true;
				}
			}
		}
	}
}

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
	KeyValue[0] = uOrgNo;
	KeyValue[1] = $$("txFileYear").value;
	KeyValue[2] = $$("txFileCls").value;
	KeyValue[3] = $$("txFileCase").value;
	KeyValue[4] = $$("txFileVol").value;
	KeyValue[5] = $$("txFileSeq").value;
	KeyValue[6] = $$("txDocNo").value;
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
	if($$("txFileYear").value == "" || $$("txFileCls").value == "" || $$("txFileCase").value == "" || $$("txFileVol").value == "" || $$("txFileSeq").value == "")
		return true;
	else
	{
		RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx","GetFieldValue",false,param);
		if(RtnObj.value==null || RtnObj.value.RtnField0[0]=="true")
			return true;
		else
		{
			//表併件
			if ($$("cbComNo").checked == true)
			{
				if ($$("txComNo").value == RtnObj.value.RtnField0[0])
					return true;
				if ($$("txComNo").value == RtnObj.value.RtnField1[0])
					return true;
			}
			//非併件
			if(RtnObj.value.RtnField1[0] != "")				
			{
				//因WS已取得值，但此次取得的COM_NO"不為空白"
				//表示此文已是併件，此次動作應為使用者欲取消併件
				//所以其檔號會與先前併件的文號重複
				//應提示使用者重新編卷
				if($$("txDocNo").value != RtnObj.value.RtnField1[0])
				{
					if(argType == 1)
					//1000815	Jeff	1000631		因應欄位名稱修改，警示訊息一併作修改
						//alert("檔號與公文文號："+RtnObj.value.RtnField0[0]+"相同，請重新編卷");	
						alert("文(編)號："+RtnObj.value.RtnField0[0]+"相同，請重新編卷");				
				}
				else
					return RtnObj.value.RtnField1[0];
			}
			else
				//因WS已取得值，此次動作COM_NO為"空白"
				//表示此文的檔號與非併件某一個文號的檔號重複
				//所以應提示使用者目前此份文的檔號與WS取得的檔號重複
				//提示使用者重新編卷
				//1000815	Jeff	1000631		因應欄位名稱修改，警示訊息一併作修改
				//alert("檔號與公文文號："+RtnObj.value.RtnField0[0]+"相同，請重新編卷");
				alert("文(編)號："+RtnObj.value.RtnField0[0]+"相同，請重新編卷");
		    //1060608 Justin [1050087] 二代公文修改
			//$("txFileSeq").focus();
			$('#txFileSeq').focus();
			return false;
		}
		if (RtnObj.value.ErrorClass.IsErr)
			return false;
		else
			return true;
	}
}

function COM_NO_onChange(argObjName)
{
	$$("cbComNo").checked = false;
}

//開啟AKI811用
function jf_OpenSumComWin(sUrl)
{
	SumComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
	SumComWin.focus();
}

//檢核電子檔案的卷號
function ChkEFileVolNo()
{
	var FileVol = $$("txFileVol");
	if (FileVol.value!="")
	{
		if(DocInfo.DocFileType =="2") //電子檔案
		{
			if(FileVol.value.substring(0,2) != SystemSet.INIT_EVOLNO)
				return false;
		}
		else
		{
			if(FileVol.value.substring(0,2) == SystemSet.INIT_EVOLNO)
				return false;
		}
	}
	return true;
}


//取得指定網址參數
function GetParam(p)
{
    //1050815 Zen 1050700 XSS修正
    //var strUrl = document.location.toString();
    var strUrl = encodeURI(document.location.toString());

	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if(rg_szItems.length==2)
	{
		var rg_szItems2 = rg_szItems[1].split("&");
		for(var i=0; i<rg_szItems2.length; i++)
		{
			var rg_items = rg_szItems2[i].split("=");
			if(rg_items[0] == p)//"SAMLart")
				return rg_items[1];
		}
		
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
		if(!obj.m_bSuccess)
		{
			if( obj.m_bRedirect)
			{
			   jf_RedirectToCustomErrPage();
			}
			return false;
		}
	}
	
	return true;
	
}

function CheckUpdateFileNo()
{
	if($$("txFileVerB").value == $$("txFileVer").value && $$("txFileYearB").value == $$("txFileYear").value 
		&& $$("txFileClsB").value == $$("txFileCls").value && $$("txFileCaseB").value == $$("txFileCase").value 
		&& $$("txFileVolB").value == $$("txFileVol").value && $$("txFileSeqB").value == $$("txFileSeq").value)
		return true;
	return false
}