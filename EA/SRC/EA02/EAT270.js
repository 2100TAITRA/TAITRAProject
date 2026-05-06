/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.02.05		David	960016	批次編目作業，希望可以提供一次指定多筆公文同一檔號功能
 * 96.11.30		Cola	001054	若某公文已有編目日期，則不允許再將部份檔號清空
 * 1021108		Eileen	1020886	新增判斷是否為台科大，若目前使用機關為台科大，則不判斷「是否有編目日期」
 * 1060502		Kevin_C	1050087	升二代
 * 1070709      Zen     1070678 弱掃XSS修正
 * 1070830      Zen     1070678 弱掃Ajax修正 * 1100204      Zen     1090927 取消使用document.activeElement * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
var wsGetDocNoID;
var wsGetClsCaseID;
var wsGetComNoID;
var wsGetFileNoID;

//1060503	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null);
	jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
	var xObjectName = event.target.id;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
		case "btConfirm":
			Page_BlockSubmit=true;
			btConfirmProc();
			document.all["btAccess"].disabled = false;
			break;
		case "btHelpCls":
		case "btHelpCase":
			//V3版尚未有查詢程式09409
			Page_BlockSubmit=true;
			break;
		case "txDocNo"://focus在txDocNo物件按下"確認"，會導致document.activeElement.id抓到txDocNo
			Page_BlockSubmit=true;
			break;
		//96.02.05 960016 David 
		case "btAccess":
			Page_BlockSubmit=true;
			fnBtAccess();
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060503	Kevin_C	1050087	升二代
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

	//1060503	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;

	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = !CheckBeforeSave();
			//1060503	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean(false))
			{
				fnSetTextBoxReadWrite("txDocNo");
				document.all["txDocNo"].value		= "";
				document.all["H_No"].value			= "";//按下清除允許刪除
				document.all["txVolMaxPage"].value	= document.all["H_VolMaxPage"].value;
				document.all["txTolerance"].value	= document.all["H_Tolerance"].value;
				document.all["txDefPage"].value		= document.all["H_DefPage"].value;
				document.all["cbAutoAdd"].checked	= true;
				document.all["cbAutoVol"].checked	= true;
				document.all["dvNewValue"].innerHTML = "";
				cbAutoVol_onclick();
				//1060503	Kevin_C	1050087	升二代
				//document.all["txDocNo"].focus();
				$('txDocNo').focus();
			}
			break;

		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = true;
			if (CheckBeforeDelete())
				DeleteSelected();
			jf_SelectBarSubmit();
			break;
	}
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult, iRow, argComNo)
{
    //webserver回傳後動作
    if (argResult.id == wsGetDocNoID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			var docObj = new Object();
            //1070709 Zen 1070678 弱掃XSS修正
            //docObj.DocNo = document.all["txDocNo"].value;
            docObj.DocNo = HtmlEncode(document.all["txDocNo"].value);
			docObj.ComNo	= jf_Trim(argResult.value.RtnField0[0]);
			docObj.SecNo	= jf_Trim(argResult.value.RtnField1[0]);
			docObj.SecNm	= GetDropDownListTextByValue("dlSec", docObj.SecNo)
			docObj.SecSeq	= jf_Trim(argResult.value.RtnField2[0]);
			docObj.FileYear	= jf_Trim(argResult.value.RtnField3[0]);
			docObj.FileCls	= jf_Trim(argResult.value.RtnField4[0]);
			docObj.FileCase	= jf_Trim(argResult.value.RtnField5[0]);
			docObj.FileVol	= jf_Trim(argResult.value.RtnField6[0]);
			docObj.FileSeq	= jf_Trim(argResult.value.RtnField7[0]);
			docObj.DocType	= jf_Trim(argResult.value.RtnField8[0]);
			docObj.CrtDate	= jf_Trim(argResult.value.RtnField9[0]);
			docObj.DocState	= jf_Trim(argResult.value.RtnField10[0]);
			docObj.ClsKey	= jf_Trim(argResult.value.RtnField11[0]);
			docObj.CaseKey	= jf_Trim(argResult.value.RtnField12[0]);
			docObj.ComStatus= jf_Trim(argResult.value.RtnField13[0]);
			//[001054]Add by Cola 新增抓取編目日期INPFILE_DATE, 用以判斷此份公文是否編目, 若已編, 則不允許再將部份檔號清空
			docObj.INPFILE_DATE= jf_Trim(argResult.value.RtnField14[0]);
			//[0970427]Add by Cola 新增檔案數量 / 附件有無資訊
            //1070709 Zen 1070678 弱掃XSS修正
            //var FileCntAttach = EAT270.GetDocData(document.all["txDocNo"].value, document.all["H_Source"].value).value;
            //1070830 Zen 1070678 弱掃Ajax修正
            //var FileCntAttach = HtmlEncode(EAT270.GetDocData(document.all["txDocNo"].value, document.all["H_Source"].value).value);
            var FileCntAttach = HtmlEncode(EA02.EAT270.GetDocData(document.all["txDocNo"].value, document.all["H_Source"].value).value);
			docObj.FILE_CNT   = FileCntAttach.split(',')[0];
			docObj.FILE_UNIT  = FileCntAttach.split(',')[1];
			docObj.FILE_Attach= FileCntAttach.split(',')[2];

			
			

			if (!fnCheckDocState1(docObj.DocState))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+docObj.DocNo+"尚未歸檔，無法進行編目"])),"");
				return;
			}
			if (!fnCheckDocState2(docObj.DocState))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+docObj.DocNo+fnGetStatusName(docObj.DocState)+"，無法進行編目"])),"");
				return;
			}
			//檔號檢查
			/*允許檔號修正
			if (fnShortOfFileNoCheck(docObj))
			{
				document.all["txDocNo"].select();
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+docObj.DocNo+"之檔號是完整的，無法進行編目"])),"");
				return;
			}*/

			if (document.all["cbAutoAdd"].checked)
			{
				InsertRows(docObj);
				//方便連續輸入
				document.all["txDocNo"].value = "";
				//1060503	Kevin_C	1050087	升二代
				//document.all["txDocNo"].focus();
				$('txDocNo').focus();
			}
			else
			{
				AddForm(docObj);
				//供確認判斷
				document.all["H_No"].value = "NEW";
			}
		}
		else
		{
			document.all["txDocNo"].select();
		}
    }
    else if (argResult.id == wsGetClsCaseID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			var RtnObj = argResult.value;
			if (document.all["txFileYear"].value == "")
				document.all["txFileYear"].value= RtnObj.CaseYear;
			document.all["txFileCls"].value		= RtnObj.ClsNo;
			document.all["txFileCase"].value	= RtnObj.CaseNo;
			document.all["H_ClsKey"].value		= RtnObj.ClsKey;
			document.all["H_CaseKey"].value		= RtnObj.CaseKey;
		}
		else
		{
			//1060503	Kevin_C	1050087	升二代
			//document.all["txFileCls"].focus();
			$('txFileCls').focus();
			document.all["txFileCase"].value = "";
			document.all["H_CaseKey"].value = "";
		}
    }
    else if (argResult.id == wsGetComNoID)
    {
		if (argResult.value.m_bSuccess)
		{
			var comObj = new Object();
			comObj.DocNo	= jf_Trim(argResult.value.RtnField0[0]);
			comObj.ComNo	= jf_Trim(argResult.value.RtnField1[0]);
			comObj.FileYear	= jf_Trim(argResult.value.RtnField2[0]);
			comObj.FileCls	= jf_Trim(argResult.value.RtnField3[0]);
			comObj.FileCase	= jf_Trim(argResult.value.RtnField4[0]);
			comObj.FileVol	= jf_Trim(argResult.value.RtnField5[0]);
			comObj.FileSeq	= jf_Trim(argResult.value.RtnField6[0]);
			comObj.DocType	= jf_Trim(argResult.value.RtnField7[0]);
			comObj.CrtDate	= jf_Trim(argResult.value.RtnField8[0]);
			//檔號檢查
			if (!fnShortOfFileNoCheck1(comObj))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"相關文號："+argComNo+"之檔號不完全，無法進行併件"])),"");
				return false;
			}
			//檔號檢查
			if (!fnIsSameFileNo1(iRow, comObj))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"之檔號與相關文號："+argComNo+"之檔號不相同，無法進行併件"])),"");
				return false;
			}
			//檔案種類檢查
			//1060503	Kevin_C	1050087	升二代
			//if (document.all["dg1__ctl"+iRow+"_lbDocType"].innerText != comObj.DocType)
			if (document.all["dg1__ctl"+iRow+"_lbDocType"].textContent != comObj.DocType)
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"與相關文號："+argComNo+"之檔案種類不符合，無法進行併件"])),"");
				return false;
			}
			//分類號檢查
			//1060503	Kevin_C	1050087	升二代
			//var msg = CheckSameFileCls2(document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText, document.all["dg1__ctl"+iRow+"_lbCrtDate"].innerText, comObj)
			var msg = CheckSameFileCls2(document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent, document.all["dg1__ctl"+iRow+"_lbCrtDate"].textContent, comObj)
			if (msg != "")
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"與相關文號："+argComNo+"之"+msg+"不符合，無法進行併件"])),"");
				return false;
			}
			//子文檢查
			if (!fnCheckComNo(argComNo, comObj.ComNo))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"之相關文號："+argComNo+"為子文，無法被併件"])),"");
				return false;
			}
			return true;
		}
		else
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["輸入之相關文號："+argComNo+"不存在"])),"");
			return false;
		}
    }
    else if (argResult.id == wsGetFileNoID)
    {
		if (argResult.value.m_bSuccess == false)
			return true;
		var strDocNo = jf_Trim(argResult.value.RtnField0[0]);
		if (strDocNo == "")
			return true;
		if (fnIndexOf(strDocNo))//若檔號已存在於dg表示要編目,就不考慮原檔號
			return true;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"之檔號與文號："+strDocNo+"之檔號相同，未併件無法進行編目"])),"");
		return false;
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
}

/*****************************************************************************
*
*		事 件 區
* 
*****************************************************************************/
function txDocNo_onblur()
{
	var strSource = document.all["H_Source"].value;
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	if (strDocNo == "") return;

	var arKeyName = new Array(2);
	arKeyName[0]    = "SOURCE_ORGNO";
	arKeyName[1]    = "DOC_NO";
	var arKeyValue = new Array(strSource, strDocNo);
	var arRtnFldName = new Array(14);
	arRtnFldName[0] = "COM_NO";
	arRtnFldName[1] = "SEC_NO";
	arRtnFldName[2] = "SEC_SEQ";
	arRtnFldName[3] = "FILE_YEAR";
	arRtnFldName[4] = "FILE_CLS";
	arRtnFldName[5] = "FILE_CASE";
	arRtnFldName[6] = "FILE_VOL";
	arRtnFldName[7] = "FILE_SEQ";
	arRtnFldName[8] = "DOCFILE_TYPE";
	arRtnFldName[9] = "CRT_DATE";
	arRtnFldName[10] = "DOC_STATE";
	arRtnFldName[11] = "CLS_KEY";
	arRtnFldName[12] = "CASE_KEY";
	arRtnFldName[13] = "COM_STATUS";
	//[001054]Add by Cola 新增抓取編目日期INPFILE_DATE, 用以判斷此份公文是否編目, 若已編, 則不允許再將部份檔號清空
	arRtnFldName[14] = "INPFILE_DATE";
	
	var arOrdFldName = new Array("DOC_NO");

	var argWSParam = new Array(5);
	argWSParam[0] = "DOC_MAIN";
	argWSParam[1] = arKeyName;
	argWSParam[2] = arKeyValue;
	argWSParam[3] = arRtnFldName;
	argWSParam[4] = arOrdFldName;
	var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
	wsGetDocNoID = callObj.id;
	OnWSResult(callObj);
}

function FileNo_onblur()
{
	var strSource	= document.all["H_Source"].value;
	var strYear		= jf_Trim(document.all["txFileYear"].value);
	var strClsNo	= jf_Trim(document.all["txFileCls"].value);
	var strCaseNo	= jf_Trim(document.all["txFileCase"].value);
	var actObject	= document.activeElement.id;
	var srcObject	= event.srcElement.id;

//	if (document.all[srcObject].value == "")
//		return;
	if (strClsNo == "")
	{
		document.all["H_ClsKey"].value		= "";
		document.all["H_CaseKey"].value		= "";
		return;
	}
	if (strClsNo+strCaseNo == "")
		return;
//	if (strClsNo == "" && strCaseNo != "")
//		return;
//	if (srcObject == "txFileCls" && actObject == "txFileCase")
//		return;

	var argWSParam = new Array(5);
	argWSParam[0] = strSource;
	argWSParam[1] = "";
	argWSParam[2] = strClsNo;
	argWSParam[3] = strYear;
	argWSParam[4] = strCaseNo;
	var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, argWSParam);
	wsGetClsCaseID = callObj.id;
	OnWSResult(callObj);
}

function cbAutoVol_onclick()
{
	if (document.all["cbAutoVol"].checked)
	{
		document.all["txVolMaxPage"].className = "InputFieldText";
		document.all["txVolMaxPage"].readOnly = false;
		document.all["txTolerance"].className = "InputFieldText";
		document.all["txTolerance"].readOnly = false;
		document.all["txDefPage"].className = "InputFieldText";
		document.all["txDefPage"].readOnly = false;
	}
	else
	{
		document.all["txVolMaxPage"].className = "DisplayOnly";
		document.all["txVolMaxPage"].readOnly = true;
		document.all["txVolMaxPage"].style.color = "Navy";
		document.all["txTolerance"].className = "DisplayOnly";
		document.all["txTolerance"].readOnly = true;
		document.all["txTolerance"].style.color = "Navy";
		document.all["txDefPage"].className = "DisplayOnly";
		document.all["txDefPage"].readOnly = true;
		document.all["txDefPage"].style.color = "Navy";
	}
}

//點選確認鍵
function btConfirmProc()
{
	var strSeq = jf_Trim(document.all["H_No"].value);
    //1070709 Zen 1070678 弱掃XSS修正--begin
    //var strFileVol = jf_Trim(document.all["txFileVol"].value);
    //var strFileSeq = jf_Trim(document.all["txFileSeq"].value);
    var strFileVol = jf_Trim(HtmlEncode(document.all["txFileVol"].value));
    var strFileSeq = jf_Trim(HtmlEncode(document.all["txFileSeq"].value));
    //1070709 Zen 1070678 弱掃XSS修正--end
	if (strSeq == "")
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先點選欲維護之公文文號"])),"");
		//1060503	Kevin_C	1050087	升二代
		//document.all["txDocNo"].focus();
		$('txDocNo').focus();
		return;
	}

	//併件檢查
	var strComNo = jf_Trim(document.all["txComNo"].value);
	if (document.all["cbIsCom"].checked && strComNo == "")
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["勾選併件時，相關文號不可以空白"])),"");
		//1060503	Kevin_C	1050087	升二代
		//document.all["txComNo"].focus();
		$('txComNo').focus();
		return;
	}

	//還原txDocNo之css
	fnSetTextBoxReadWrite("txDocNo");

	//新增 or 修改 資料
	var docObj = new Object();
    //1070709 Zen 1070678 弱掃XSS修正--begin
    //docObj.DocNo = jf_Trim(document.all["txDocNo"].value);
    //docObj.ComNo = jf_Trim(document.all["txComNo"].value);
    docObj.DocNo = jf_Trim(HtmlEncode(document.all["txDocNo"].value));
    docObj.ComNo = jf_Trim(HtmlEncode(document.all["txComNo"].value));
    //1070709 Zen 1070678 弱掃XSS修正--end
	if (document.all["cbIsCom"].checked)
		docObj.ComStatus	= "1";
	else
		docObj.ComStatus	= "0";
	docObj.SecNo	= ""
	//1060503	Kevin_C	1050087	升二代
	//docObj.SecNm	= jf_Trim(document.all["lbSecNm"].innerText);
	docObj.SecNm	= jf_Trim(document.all["lbSecNm"].textContent);
    //1070709 Zen 1070678 弱掃XSS修正--begin
    //docObj.SecSeq = jf_Trim(document.all["txSecSeq"].value);
    //docObj.FileYear = jf_Trim(document.all["txFileYear"].value);
    //docObj.FileCls = jf_Trim(document.all["txFileCls"].value);
    //docObj.FileCase = jf_Trim(document.all["txFileCase"].value);
    docObj.SecSeq = jf_Trim(HtmlEncode(document.all["txSecSeq"].value));
    docObj.FileYear = jf_Trim(HtmlEncode(document.all["txFileYear"].value));
    docObj.FileCls = jf_Trim(HtmlEncode(document.all["txFileCls"].value));
    docObj.FileCase = jf_Trim(HtmlEncode(document.all["txFileCase"].value));
    //1070709 Zen 1070678 弱掃XSS修正--end
	docObj.FileVol	= strFileVol;
	if (strFileVol != "")
		docObj.FileVol = jf_PADL(strFileVol, 4, "0");
	docObj.FileSeq	= strFileSeq;
	if (strFileSeq != "")
		docObj.FileSeq = jf_PADL(strFileSeq, 3, "0");
    //1070709 Zen 1070678 弱掃XSS修正--begin
    //docObj.DocType = jf_Trim(document.all["H_DocType"].value);
    //docObj.CrtDate = jf_Trim(document.all["H_CrtDate"].value);
    //docObj.ClsKey = jf_Trim(document.all["H_ClsKey"].value);
    //docObj.CaseKey = jf_Trim(document.all["H_CaseKey"].value);
    ////[001054]Add by Cola 新增記錄編目日期
    //docObj.INPFILE_DATE = jf_Trim(document.all["H_INPFILE_DATE"].value);
    ////[0970427]Add by Cola 新增檔案數量 / 附件有無資訊
    //var FileCntAttach = EAT270.GetDocData(document.all["txDocNo"].value, document.all["H_Source"].value).value;
    docObj.DocType = jf_Trim(HtmlEncode(document.all["H_DocType"].value));
    docObj.CrtDate = jf_Trim(HtmlEncode(document.all["H_CrtDate"].value));
    docObj.ClsKey = jf_Trim(HtmlEncode(document.all["H_ClsKey"].value));
    docObj.CaseKey = jf_Trim(HtmlEncode(document.all["H_CaseKey"].value));
    docObj.INPFILE_DATE = jf_Trim(HtmlEncode(document.all["H_INPFILE_DATE"].value));
    //1070830 Zen 1070678 弱掃Ajax修正
    //var FileCntAttach = HtmlEncode(EAT270.GetDocData(document.all["txDocNo"].value, document.all["H_Source"].value).value);
    var FileCntAttach = HtmlEncode(EA02.EAT270.GetDocData(document.all["txDocNo"].value, document.all["H_Source"].value).value);
    //1070709 Zen 1070678 弱掃XSS修正--end
	docObj.FILE_CNT   = FileCntAttach.split(',')[0];
	docObj.FILE_UNIT  = FileCntAttach.split(',')[1];
	docObj.FILE_Attach= FileCntAttach.split(',')[2];	
	
	
	if (strSeq == "NEW")
		InsertRows(docObj);
	else
		UpdateRows(docObj, strSeq);

	//若併件文號存在於dg中,一併更新
	var iSeq = fnIndexOf(docObj.ComNo);
	if (iSeq != 0)
	{
		//1060503	Kevin_C	1050087	升二代 -S
		//document.all["dg1__ctl"+iSeq+"_lbIsComNo"].innerText = fnIsComNoText(docObj.ComStatus);
		//document.all["dg1__ctl"+iSeq+"_lbComNo"].innerText = docObj.ComNo;
		document.all["dg1__ctl"+iSeq+"_lbIsComNo"].textContent = fnIsComNoText(docObj.ComStatus);
		document.all["dg1__ctl"+iSeq+"_lbComNo"].textContent = docObj.ComNo;
		//1060503	Kevin_C	1050087	升二代 -E
	}

	//母文取消併件
	if (docObj.ComStatus == "0")
	{
		for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
		{
			//1060503	Kevin_C	1050087	升二代 -S
			//if (document.all["dg1__ctl"+iRow+"_lbComNo"].innerText == docObj.ComNo)
				//document.all["dg1__ctl"+iRow+"_lbIsComNo"].innerText = "否";
			if (document.all["dg1__ctl"+iRow+"_lbComNo"].textContent == docObj.ComNo)
				document.all["dg1__ctl"+iRow+"_lbIsComNo"].textContent = "否";
				//1060503	Kevin_C	1050087	升二代 -E
		}
	}
	//清空隱藏欄位
	document.all["H_No"].value = "";
	//清空畫面
	CleanForm();
	//方便連續輸入
	//1060503	Kevin_C	1050087	升二代
	//document.all["txDocNo"].focus();
	$('txDocNo').focus();
}

function CheckBeforeSave()
{
	//判斷是否為修改模式
	if (CheckModifyMode())
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前正維護文號："+document.all["txDocNo"].value+"之資料，請先按下確認鍵後再執行批次編目"])),"");
		return false;
	}
	//至少一筆檢查
	if (!CheckDetail())
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一筆明細資料"])),"");
		return false;
	}
	//自動換卷屬性檢查
	if (!CheckVolInfo())
		return false;
	//分類號不可空白
	if (!CheckFileCls())
		return false;
	//相關文號之檔號及檔案種類檢查
	if (!CheckComFileNo())
		return false;
	//密件流水號不可重複檢查
	if (!CheckSecSeqDuplicate())
		return false;
	//清空已存在資料
	document.all["txDocInfo"].value = "";
	document.all["txComInfo"].value = "";

	//放入隱藏TextBox 供判斷是否為母文用
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1060503	Kevin_C	1050087	升二代
		//var strComNo = document.all["dg1__ctl"+iRow+"_lbComNo"].innerText;
		var strComNo = document.all["dg1__ctl"+iRow+"_lbComNo"].textContent;
		if (strComNo != "")
			document.all["txComInfo"].value += strComNo + ":";
	}

	//放入隱藏TextBox 供server端取用
	var buf="";
	document.all["H_DATA"].value = "";
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1060503	Kevin_C	1050087	升二代 -S
		//var strDocNo		= document.all["dg1__ctl"+iRow+"_hlDocNo"].innerText;
		//var strComNo		= document.all["dg1__ctl"+iRow+"_lbComNo"].innerText;
		//var strComStatus	= fnIsComNoValue(document.all["dg1__ctl"+iRow+"_lbIsComNo"].innerText);
		//var strFileNo		= document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText;
		//var strSecSeq		= document.all["dg1__ctl"+iRow+"_lbSecSeq"].innerText;
		//var strClsCase		= document.all["dg1__ctl"+iRow+"_lbClsCaseKey"].innerText;
		var strDocNo		= document.all["dg1__ctl"+iRow+"_hlDocNo"].textContent;
		var strComNo		= document.all["dg1__ctl"+iRow+"_lbComNo"].textContent;
		var strComStatus	= fnIsComNoValue(document.all["dg1__ctl"+iRow+"_lbIsComNo"].textContent);
		var strFileNo		= document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent;
		var strSecSeq		= document.all["dg1__ctl"+iRow+"_lbSecSeq"].textContent;
		var strClsCase		= document.all["dg1__ctl"+iRow+"_lbClsCaseKey"].textContent;
		//1060503	Kevin_C	1050087	升二代 -E
		if (document.all["txComInfo"].value.indexOf(strDocNo) >= 0 && strComStatus == "1")//被當母文
			document.all["txDocInfo"].value += buf + strDocNo + "-" + strDocNo + "-" + strComStatus + "-" + strSecSeq + "-" + strClsCase + "-" + strFileNo;
		else
			document.all["txDocInfo"].value += buf + strDocNo + "-" + strComNo + "-" + strComStatus + "-" + strSecSeq + "-" + strClsCase + "-" + strFileNo;
		buf = ":";
		
		//[0970427]Add by Cola 存放 檔案數量
		var strFILE_CNT     = document.all["dg1__ctl"+iRow+"_txFILE_CNT"].value;
		try
		{
			strFILE_CNT = parseInt(strFILE_CNT.toString()).toString();
		}
		catch(e){}
		{
			if (strFILE_CNT == "NaN")
				strFILE_CNT = "0";
		}
		
		var strFILE_UNIT_NO     = document.all["dg1__ctl"+iRow+"_dlFILE_UNIT"].options[document.all["dg1__ctl"+iRow+"_dlFILE_UNIT"].selectedIndex].value;
		//1060503	Kevin_C	1050087	升二代
		//var strFILE_UNIT_NAME   = document.all["dg1__ctl"+iRow+"_dlFILE_UNIT"].options[document.all["dg1__ctl"+iRow+"_dlFILE_UNIT"].selectedIndex].innerText;
		var strFILE_UNIT_NAME   = document.all["dg1__ctl"+iRow+"_dlFILE_UNIT"].options[document.all["dg1__ctl"+iRow+"_dlFILE_UNIT"].selectedIndex].textContent;
		
		if (document.all["H_DATA"].value !="")
			document.all["H_DATA"].value += ","+strFILE_CNT+","+strFILE_UNIT_NO+","+strFILE_UNIT_NAME;
		else
			document.all["H_DATA"].value += strFILE_CNT+","+strFILE_UNIT_NO+","+strFILE_UNIT_NAME;
	}
	return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function AddForm(argObj)
{
	//公文文號
	document.all["txDocNo"].value = argObj.DocNo;
	//相關文號
	document.all["txComNo"].value = argObj.ComNo;
	//併件
	if (argObj.ComStatus == "1")
		document.all["cbIsCom"].checked = true;
	else
		document.all["cbIsCom"].checked = false;
	//密等
	//1060503	Kevin_C	1050087	升二代
	//document.all["lbSecNm"].innerText = argObj.SecNm;
	document.all["lbSecNm"].textContent = argObj.SecNm;
	//密件流水號
	//1060503	Kevin_C	1050087	升二代
	//document.all["txSecSeq"].innerText = argObj.SecSeq;
	document.all["txSecSeq"].value = argObj.SecSeq;
	//檔號
	document.all["txFileYear"].value = argObj.FileYear;
	document.all["txFileCls"].value  = argObj.FileCls;
	document.all["txFileCase"].value = argObj.FileCase;
	document.all["txFileVol"].value  = argObj.FileVol;
	document.all["txFileSeq"].value  = argObj.FileSeq;
	//檔案類型
	document.all["H_DocType"].value  = argObj.DocType;
	//文件產生日期
	document.all["H_CrtDate"].value  = argObj.CrtDate;
	//分類號與案次號鍵值
	document.all["H_ClsKey"].value	 = argObj.ClsKey;
	document.all["H_CaseKey"].value  = argObj.CaseKey;
	//[001054]Add by Cola 記錄編目日期
	document.all["H_INPFILE_DATE"].value  = argObj.INPFILE_DATE;
}

//新增一筆Row
function InsertRows(argObj)
{
	if (IsDocNoExist(argObj.DocNo))
		return;

	var InsertRow = document.all["dg1"].insertRow();
	var len = document.all["dg1"].rows.length;	//先Insert so長度已+1

	//ID整除==單數序
	//1060503	Kevin_C	1050087	升二代
	//if (len % 2==0)
	//	InsertRow.style.backgroundColor = "#F7F7DE";
	////置中
	//InsertRow.style.textAlign = "Center";
	
	//序
	var lbSEQ_NO = document.createElement("span");
	lbSEQ_NO.setAttribute("id","dg1__ctl"+len+"_lbSEQ_NO");
	//1060503	Kevin_C	1050087	升二代
	//lbSEQ_NO.setAttribute("innerText",len-1);
	lbSEQ_NO.textContent = len-1;
	InsertRow.insertCell(0).appendChild(lbSEQ_NO);
	//1060503	Kevin_C	1050087	升二代
	//lbSEQ_NO.style.color = "Navy";

	//選取
	var cbSelect = document.createElement("input");
	cbSelect.setAttribute("type","checkbox");
	cbSelect.setAttribute("id","dg1__ctl"+len+"_cbSelect");
	InsertRow.insertCell(1).appendChild(cbSelect);
	//1060503	Kevin_C	1050087	升二代
	//cbSelect.style.color = "Navy";

	//公文文號
	var hlDocNo = document.createElement("a");
	hlDocNo.setAttribute("id","dg1__ctl"+len+"_hlDocNo");
	hlDocNo.setAttribute("href","javascript:ModifyValue('"+(len-1)+"')");
	//1060503	Kevin_C	1050087	升二代
	//hlDocNo.setAttribute("innerText", argObj.DocNo);
	hlDocNo.textContent = argObj.DocNo;
	InsertRow.insertCell(2).appendChild(hlDocNo);

	//相關文號
	var lbComNo = document.createElement("span");
	lbComNo.setAttribute("id","dg1__ctl"+len+"_lbComNo");
	//1060503	Kevin_C	1050087	升二代
	//lbComNo.setAttribute("innerText", argObj.ComNo);
	lbComNo.textContent = argObj.ComNo;
	InsertRow.insertCell(3).appendChild(lbComNo);
	//1060503	Kevin_C	1050087	升二代
	//lbComNo.style.color = "Navy";

	//併件
	var lbIsComNo = document.createElement("span");
	lbIsComNo.setAttribute("id","dg1__ctl"+len+"_lbIsComNo");
	//1060503	Kevin_C	1050087	升二代
	//lbIsComNo.setAttribute("innerText",fnIsComNoText(argObj.ComStatus));
	lbIsComNo.textContent = fnIsComNoText(argObj.ComStatus);
	InsertRow.insertCell(4).appendChild(lbIsComNo);
	//1060503	Kevin_C	1050087	升二代
	//lbIsComNo.style.color = "Navy";

	//密等
	var lbSecName = document.createElement("span");
	lbSecName.setAttribute("id","dg1__ctl"+len+"_lbSecName");
	//1060503	Kevin_C	1050087	升二代
	//lbSecName.setAttribute("innerText", argObj.SecNm);
	lbSecName.textContent = argObj.SecNm;
	InsertRow.insertCell(5).appendChild(lbSecName);
	//1060503	Kevin_C	1050087	升二代
	//lbSecName.style.color = "Navy";

	//密件流水號
	var lbSecSeq = document.createElement("span");
	lbSecSeq.setAttribute("id","dg1__ctl"+len+"_lbSecSeq");
	//1060503	Kevin_C	1050087	升二代
	//lbSecSeq.setAttribute("innerText", argObj.SecSeq);
	lbSecSeq.textContent = argObj.SecSeq;
	InsertRow.insertCell(6).appendChild(lbSecSeq);
	//1060503	Kevin_C	1050087	升二代
	//lbSecSeq.style.color = "Navy";

	//檔號
	var lbFileNo = document.createElement("span");
	lbFileNo.setAttribute("id","dg1__ctl"+len+"_lbFileNo");
	//1060503	Kevin_C	1050087	升二代
	//lbFileNo.setAttribute("innerText",GetFileNo1(argObj));
	lbFileNo.textContent = GetFileNo1(argObj);
	InsertRow.insertCell(7).appendChild(lbFileNo);
	//1060503	Kevin_C	1050087	升二代
	//lbFileNo.style.color = "Navy";

	//檔案類型(hide)
	var lbDocType = document.createElement("span");
	lbDocType.setAttribute("id","dg1__ctl"+len+"_lbDocType");
	//1060503	Kevin_C	1050087	升二代 -S
	//lbDocType.setAttribute("innerText",argObj.DocType);
	//lbDocType.setAttribute("className", "hide");
	lbDocType.textContent = argObj.DocType;
	lbDocType.setAttribute("class", "hide");
	//1060503	Kevin_C	1050087	升二代 -E
	InsertRow.cells[7].appendChild(lbDocType);
	//1060503	Kevin_C	1050087	升二代
	//lbDocType.style.color = "Navy";

	//文件產生日期(hide)
	var lbCrtDate = document.createElement("span");
	lbCrtDate.setAttribute("id","dg1__ctl"+len+"_lbCrtDate");
	//1060503	Kevin_C	1050087	升二代 -S
	//lbCrtDate.setAttribute("innerText",argObj.CrtDate);
	//lbCrtDate.setAttribute("className","hide");
	lbCrtDate.textContent = argObj.CrtDate;
	lbCrtDate.setAttribute("class", "hide");
	//1060503	Kevin_C	1050087	升二代 -E
	InsertRow.cells[7].appendChild(lbCrtDate);
	//1060503	Kevin_C	1050087	升二代
	//lbCrtDate.style.color = "Navy";

	//分類號與案次號鍵值(hide)
	var lbClsCaseKey = document.createElement("span");
	lbClsCaseKey.setAttribute("id","dg1__ctl"+len+"_lbClsCaseKey");
	//1060503	Kevin_C	1050087	升二代 -S
	//lbClsCaseKey.setAttribute("innerText",GetClsCaseStr(argObj));
	//lbClsCaseKey.setAttribute("className", "hide");
	lbClsCaseKey.textContent = GetClsCaseStr(argObj);
	lbClsCaseKey.setAttribute("class", "hide");
	//1060503	Kevin_C	1050087	升二代 -E
	InsertRow.cells[7].appendChild(lbClsCaseKey);
	//1060503	Kevin_C	1050087	升二代
	//lbClsCaseKey.style.color = "Navy";
	
	//[001054]Add by Cola編目日期(hide)
	var lbInpFileDate = document.createElement("span");
	lbInpFileDate.setAttribute("id","dg1__ctl"+len+"_lbInpFileDate");
	//1060503	Kevin_C	1050087	升二代 -S
	//lbInpFileDate.setAttribute("innerText",argObj.INPFILE_DATE);
	//lbInpFileDate.setAttribute("className","hide");
	lbInpFileDate.textContent = argObj.INPFILE_DATE;
	lbInpFileDate.setAttribute("class", "hide");
	//1060503	Kevin_C	1050087	升二代 -E
	InsertRow.cells[7].appendChild(lbInpFileDate);
	//1060503	Kevin_C	1050087	升二代
	//lbInpFileDate.style.color = "Navy";	
	
	//[0970427]Add by Cola 新增檔案數量 / 附件有無資訊
	var txFILE_CNT = document.createElement("input");
	txFILE_CNT.setAttribute("id","dg1__ctl"+len+"_txFILE_CNT");
	txFILE_CNT.setAttribute("value",argObj.FILE_CNT);
	//txFILE_CNT.style.setAttribute("IME-MODE","disabled");//沒用, 因此另外使用當parseInt為NaN時, 自動設為0
	//1060503	Kevin_C	1050087	升二代
	//txFILE_CNT.style.setAttribute("width","20px");
	txFILE_CNT.style.width = "3.5em";
	InsertRow.insertCell(8).appendChild(txFILE_CNT);
	//1060503	Kevin_C	1050087	升二代
	//txFILE_CNT.style.color = "Navy";	
	
	
	var dlFILE_UNIT = document.createElement("select");	
	dlFILE_UNIT.setAttribute("id", "dg1__ctl" + len + "_dlFILE_UNIT");
	//1060503	Kevin_C	1050087	升二代
	//dlFILE_UNIT.style.width = "45px";	
	dlFILE_UNIT.style.width = "3.5em";
	InsertRow.cells[8].appendChild(dlFILE_UNIT);
	//1060503	Kevin_C	1050087	升二代
	//dlFILE_UNIT.style.color = "Navy";	
	
    //1070830 Zen 1070678 弱掃Ajax修正
    //var strDocCategory = EAT270.GetDocCategory(document.all["H_Source"].value).value;
    var strDocCategory = EA02.EAT270.GetDocCategory(document.all["H_Source"].value).value;
	
	for (var k = 0 ; k < strDocCategory.split(',').length ; k=k+2)
	{
		var dlopt = document.createElement("option");	
		dlopt.setAttribute("value",strDocCategory.split(',')[k]);
		//1060503	Kevin_C	1050087	升二代
		//dlopt.setAttribute("innerText",strDocCategory.split(',')[k+1]);	
		dlopt.textContent = strDocCategory.split(',')[k+1];	
		//若相等, 設定selected
		if (strDocCategory.split(',')[k+1] == argObj.FILE_UNIT )
			dlopt.setAttribute("selected","selected");	
		
		dlFILE_UNIT.appendChild(dlopt);
	}
	
	var lbFILE_Attach = document.createElement("span");
	lbFILE_Attach.setAttribute("id","dg1__ctl"+len+"_lbFILE_Attach");
	//1060503	Kevin_C	1050087	升二代
	//lbFILE_Attach.setAttribute("innerText",argObj.FILE_Attach);
	lbFILE_Attach.textContent = argObj.FILE_Attach;
	InsertRow.insertCell(9).appendChild(lbFILE_Attach);
	//1060503	Kevin_C	1050087	升二代
	//lbFILE_Attach.style.color = "Navy";			

	//顯示最後一次更新資料
	ShowLastInsertValue(argObj);
}

//修改該筆Row
function UpdateRows(argObj, strSeq)
{
	var len = Number(strSeq)+1;
	//相關文號
	//1060503	Kevin_C	1050087	升二代
	//document.all["dg1__ctl"+len+"_lbComNo"].innerText = argObj.ComNo;
	document.all["dg1__ctl"+len+"_lbComNo"].textContent = argObj.ComNo;
	//併件
	//1060503	Kevin_C	1050087	升二代
	//document.all["dg1__ctl"+len+"_lbIsComNo"].innerText = fnIsComNoText(argObj.ComStatus);
	document.all["dg1__ctl"+len+"_lbIsComNo"].textContent = fnIsComNoText(argObj.ComStatus);
	//密等
	//1060503	Kevin_C	1050087	升二代
	//document.all["dg1__ctl"+len+"_lbSecName"].innerText = argObj.SecNm;
	document.all["dg1__ctl"+len+"_lbSecName"].textContent = argObj.SecNm;
	//密件流水號
	//1060503	Kevin_C	1050087	升二代
	//document.all["dg1__ctl"+len+"_lbSecSeq"].innerText = argObj.SecSeq;
	document.all["dg1__ctl"+len+"_lbSecSeq"].textContent = argObj.SecSeq;
	//檔號
	//1060503	Kevin_C	1050087	升二代
	//document.all["dg1__ctl"+len+"_lbFileNo"].innerText = GetFileNo1(argObj);
	document.all["dg1__ctl"+len+"_lbFileNo"].textContent = GetFileNo1(argObj);
	//分類號與案次號鍵值
	//1060503	Kevin_C	1050087	升二代
	//document.all["dg1__ctl"+len+"_lbClsCaseKey"].innerText = GetClsCaseStr(argObj);
	document.all["dg1__ctl"+len+"_lbClsCaseKey"].textContent = GetClsCaseStr(argObj);
	//以下不會在畫面上維護(僅供檢核用)
	//檔案類型
	//文件產生日期
}

//點選的文號資料放入UI維護區中
function ModifyValue(iSeq)
{
	//96.02.07 960016 David
	document.all["btAccess"].disabled = true;
	
	var rowId = Number(iSeq)+1;
	//1060503	Kevin_C	1050087	升二代
	//var strFileNo = document.all["dg1__ctl"+rowId+"_lbFileNo"].innerText;
	var strFileNo = document.all["dg1__ctl"+rowId+"_lbFileNo"].textContent;
	var argFileNo = new Array("", "", "", "", "");
	argFileNo = strFileNo.split('-');

	//加入Form
	var docObj = new Object();
	//1060503	Kevin_C	1050087	升二代 -S
	//docObj.DocNo		= document.all["dg1__ctl"+rowId+"_hlDocNo"].innerText;
	//docObj.ComNo		= document.all["dg1__ctl"+rowId+"_lbComNo"].innerText;
	//docObj.ComStatus	= fnIsComNoValue(document.all["dg1__ctl"+rowId+"_lbIsComNo"].innerText);
	docObj.DocNo		= document.all["dg1__ctl"+rowId+"_hlDocNo"].textContent;
	docObj.ComNo		= document.all["dg1__ctl"+rowId+"_lbComNo"].textContent;
	docObj.ComStatus	= fnIsComNoValue(document.all["dg1__ctl"+rowId+"_lbIsComNo"].textContent);
	//1060503	Kevin_C	1050087	升二代 -E
	docObj.SecNo		= ""
	//1060503	Kevin_C	1050087	升二代 -S
	//docObj.SecNm		= document.all["dg1__ctl"+rowId+"_lbSecName"].innerText;
	//docObj.SecSeq		= document.all["dg1__ctl"+rowId+"_lbSecSeq"].innerText;
	docObj.SecNm		= document.all["dg1__ctl"+rowId+"_lbSecName"].textContent;
	docObj.SecSeq		= document.all["dg1__ctl"+rowId+"_lbSecSeq"].textContent;
	//1060503	Kevin_C	1050087	升二代 -E
	docObj.FileYear		= "";
	docObj.FileCls		= "";
	docObj.FileCase		= "";
	docObj.FileVol		= "";
	docObj.FileSeq		= "";
	//1060503	Kevin_C	1050087	升二代 -S
	//docObj.DocType		= document.all["dg1__ctl"+rowId+"_lbDocType"].innerText;
	//docObj.CrtDate		= document.all["dg1__ctl"+rowId+"_lbCrtDate"].innerText;
	//var strKey = document.all["dg1__ctl"+rowId+"_lbClsCaseKey"].innerText;
	docObj.DocType		= document.all["dg1__ctl"+rowId+"_lbDocType"].textContent;
	docObj.CrtDate		= document.all["dg1__ctl"+rowId+"_lbCrtDate"].textContent;
	var strKey = document.all["dg1__ctl"+rowId+"_lbClsCaseKey"].textContent;
	//1060503	Kevin_C	1050087	升二代 -E
	var argKey = strKey.split('-');
	docObj.ClsKey	= argKey[0];
	docObj.CaseKey	= argKey[1];
	if (argFileNo.length >= 2)
	{
		docObj.FileYear	= argFileNo[0];
		docObj.FileCls	= argFileNo[1];
	}
	if (argFileNo.length >= 3)
		docObj.FileCase = argFileNo[2];
	if (argFileNo.length >= 4)
		docObj.FileVol = argFileNo[3];
	if (argFileNo.length == 5)
		docObj.FileSeq = argFileNo[4];
	AddForm(docObj);

	//公文文號disable
	fnSetTextBoxReadOnly("txDocNo");
	//供確認判斷
	document.all["H_No"].value = iSeq;
}

function CheckBeforeDelete()
{
	var strSeq = jf_Trim(document.all["H_No"].value);
	if (strSeq == "")
		return true;
	if (strSeq == "NEW")
		return true;
	jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["尚未修改確認,不可刪除選取"])),"");
	return false;
}

//清除勾選的row
function DeleteSelected()
{
	var len = document.all["dg1"].rows.length;
	var iCount=0;
	//若有勾選則將下一筆value寫入上一筆
	for (var iCheck=2;iCheck<len+1;iCheck++)
	{
		if (iCheck > iCheck-iCount)
		{
			//1060503	Kevin_C	1050087	升二代 -S
			//document.all["dg1__ctl"+(iCheck-iCount)+"_hlDocNo"].innerText	= document.all["dg1__ctl"+iCheck+"_hlDocNo"].innerText;
			//document.all["dg1__ctl"+(iCheck-iCount)+"_lbComNo"].innerText	= document.all["dg1__ctl"+iCheck+"_lbComNo"].innerText;
			//document.all["dg1__ctl"+(iCheck-iCount)+"_lbIsComNo"].innerText	= document.all["dg1__ctl"+iCheck+"_lbIsComNo"].innerText;
			//document.all["dg1__ctl"+(iCheck-iCount)+"_lbSecName"].innerText	= document.all["dg1__ctl"+iCheck+"_lbSecName"].innerText;
			//document.all["dg1__ctl"+(iCheck-iCount)+"_lbSecSeq"].innerText	= document.all["dg1__ctl"+iCheck+"_lbSecSeq"].innerText;
			//document.all["dg1__ctl"+(iCheck-iCount)+"_lbFileNo"].innerText	= document.all["dg1__ctl"+iCheck+"_lbFileNo"].innerText;
			document.all["dg1__ctl"+(iCheck-iCount)+"_hlDocNo"].textContent	= document.all["dg1__ctl"+iCheck+"_hlDocNo"].textContent;
			document.all["dg1__ctl"+(iCheck-iCount)+"_lbComNo"].textContent	= document.all["dg1__ctl"+iCheck+"_lbComNo"].textContent;
			document.all["dg1__ctl"+(iCheck-iCount)+"_lbIsComNo"].textContent	= document.all["dg1__ctl"+iCheck+"_lbIsComNo"].textContent;
			document.all["dg1__ctl"+(iCheck-iCount)+"_lbSecName"].textContent	= document.all["dg1__ctl"+iCheck+"_lbSecName"].textContent;
			document.all["dg1__ctl"+(iCheck-iCount)+"_lbSecSeq"].textContent	= document.all["dg1__ctl"+iCheck+"_lbSecSeq"].textContent;
			document.all["dg1__ctl"+(iCheck-iCount)+"_lbFileNo"].textContent	= document.all["dg1__ctl"+iCheck+"_lbFileNo"].textContent;
			//1060503	Kevin_C	1050087	升二代 -E
		}
		if (document.all["dg1__ctl"+iCheck+"_cbSelect"].checked)
			iCount++;
	}
	//清空CheckBox
	for (var iRow=2;iRow<document.all["dg1"].rows.length;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
	}

	//剩下最後的iCount筆刪掉
	for (var iDel=1;iDel<=iCount;iDel++)
	{
		document.all["dg1"].deleteRow(len-iDel);
	}
}

function CheckVolInfo()
{
	if (document.all["cbAutoVol"].checked == false)
		return true;

	var strErrMsg = "";
	var strBuffer = "";
	if (document.all["txDefPage"].value == "")
	{
		//1060503	Kevin_C	1050087	升二代
		//document.all["txDefPage"].focus();
		$('txDefPage').focus();
		strErrMsg = "公文預設頁數"+strBuffer+strErrMsg;
		strBuffer = "、";
	}
	if (document.all["txTolerance"].value == "")
	{
		//1060503	Kevin_C	1050087	升二代
		//document.all["txTolerance"].focus();
		$('txTolerance').focus();
		strErrMsg = "寬限值"+strBuffer+strErrMsg;
		strBuffer = "、";
	}
	if (document.all["txVolMaxPage"].value == "")
	{
		//1060503	Kevin_C	1050087	升二代
		//document.all["txVolMaxPage"].focus();
		$('txVolMaxPage').focus();
		strErrMsg = "每卷最大頁"+strBuffer+strErrMsg;
		strBuffer = "、";
	}

	if (strErrMsg != "")
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["勾選自動換卷時，"+strErrMsg])),"");
		return false;
	}
	return true;
}

function CheckComFileNo()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1060503	Kevin_C	1050087	升二代
		//if (document.all["dg1__ctl"+iRow+"_lbIsComNo"].innerText != "是")
		if (document.all["dg1__ctl"+iRow+"_lbIsComNo"].textContent != "是")
		{
			if (!fnCheckDocFileNoIsExist(iRow))
				return false;
			continue;
		}
		//1060503	Kevin_C	1050087	升二代
		//var strComNo = document.all["dg1__ctl"+iRow+"_lbComNo"].innerText;
		var strComNo = document.all["dg1__ctl"+iRow+"_lbComNo"].textContent;
		var iSeq = fnIndexOf(strComNo);
		if (iSeq == 0)//相關文號不在dg內
		{
			if (!fnIsShortOfFileNo(strComNo, iRow))
				return false;
		}
		else//相關文號在dg內
		{
			//1060503	Kevin_C	1050087	升二代 -S
			//var strDocDocType	= document.all["dg1__ctl"+iRow+"_lbDocType"].innerText;
			//var strDocFileNo	= document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText;
			//var strDocCrtDate	= document.all["dg1__ctl"+iRow+"_lbCrtDate"].innerText;
			//var strComDocType	= document.all["dg1__ctl"+iSeq+"_lbDocType"].innerText;
			//var strComFileNo	= document.all["dg1__ctl"+iSeq+"_lbFileNo"].innerText;
			//var strComCrtDate	= document.all["dg1__ctl"+iSeq+"_lbCrtDate"].innerText;
			//var strComDocNo		= document.all["dg1__ctl"+iSeq+"_hlDocNo"].innerText;
			//var strComComNo		= document.all["dg1__ctl"+iSeq+"_lbComNo"].innerText;
			var strDocDocType	= document.all["dg1__ctl"+iRow+"_lbDocType"].textContent;
			var strDocFileNo	= document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent;
			var strDocCrtDate	= document.all["dg1__ctl"+iRow+"_lbCrtDate"].textContent;
			var strComDocType	= document.all["dg1__ctl"+iSeq+"_lbDocType"].textContent;
			var strComFileNo	= document.all["dg1__ctl"+iSeq+"_lbFileNo"].textContent;
			var strComCrtDate	= document.all["dg1__ctl"+iSeq+"_lbCrtDate"].textContent;
			var strComDocNo		= document.all["dg1__ctl"+iSeq+"_hlDocNo"].textContent;
			var strComComNo		= document.all["dg1__ctl"+iSeq+"_lbComNo"].textContent;
			//1060503	Kevin_C	1050087	升二代 -E
			//檔號檢查
			if (!fnIsSameFileNo2(iRow, iSeq))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"之檔號與相關文號："+strComDocNo+"之檔號不相同，無法進行併件"])),"");
				return false;
			}
			//檔案種類檢查
			if (strDocDocType != strComDocType)
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"與相關文號："+strComNo+"之檔案種類不符合，無法進行併件"])),"");
				return false;
			}
			//分類號檢查
			var msg = CheckSameFileCls1(strDocFileNo, strDocCrtDate, strComFileNo, strComCrtDate);
			if (msg != "")
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"與相關文號："+strComNo+"之"+msg+"不符合，無法進行併件"])),"");
				return false;
			}
			//子文檢查
			if (!fnCheckComNo(strComDocNo, strComComNo))
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"之相關文號："+strComNo+"為子文，無法被併件"])),"");
				return false;
			}
		}
	}
	return true;
}

//不可重複檢查
function CheckSecSeqDuplicate()
{
	var strErrMsg= "";
	for(var iRow = 2; iRow <= document.all.dg1.rows.length; iRow++)
	{
		//1060503	Kevin_C	1050087	升二代
		//var strValue1 = document.all["dg1__ctl" + iRow + "_lbSecSeq"].innerText;
		var strValue1 = document.all["dg1__ctl" + iRow + "_lbSecSeq"].textContent;
		if (strValue1 == "") continue;
		for(var iCol = iRow+1; iCol <= document.all.dg1.rows.length; iCol++)
		{
			//1060503	Kevin_C	1050087	升二代
			//var strValue2 = document.all["dg1__ctl" + iCol + "_lbSecSeq"].innerText;
			var strValue2 = document.all["dg1__ctl" + iCol + "_lbSecSeq"].textContent;
			if (strValue2 == "") continue;
			if (strValue1 == strValue2)
			{
				jf_ShowMsg(FormatStr( jf_GetErrMsg(CustErr), new Array(["序 "+(iRow-1)+" 之密件流水號與序 "+(iCol-1)+" 重複"]) ), "" );
				return false;
			}
		}
	}
	return true;
}

function fnIsShortOfFileNo(argComNo, iRow)
{
	var strSource = document.all["H_Source"].value;
	if (argComNo == "") return true;

	var arKeyName = new Array(2);
	arKeyName[0]    = "SOURCE_ORGNO";
	arKeyName[1]    = "DOC_NO";
	var arKeyValue = new Array(strSource, argComNo);
	var arRtnFldName = new Array(9);
	arRtnFldName[0] = "DOC_NO";
	arRtnFldName[1] = "COM_NO";
	arRtnFldName[2] = "FILE_YEAR";
	arRtnFldName[3] = "FILE_CLS";
	arRtnFldName[4] = "FILE_CASE";
	arRtnFldName[5] = "FILE_VOL";
	arRtnFldName[6] = "FILE_SEQ";
	arRtnFldName[7] = "DOCFILE_TYPE";
	arRtnFldName[8] = "CRT_DATE";
	var arOrdFldName = new Array("DOC_NO");

	var argWSParam = new Array(5);
	argWSParam[0] = "DOC_MAIN";
	argWSParam[1] = arKeyName;
	argWSParam[2] = arKeyValue;
	argWSParam[3] = arRtnFldName;
	argWSParam[4] = arOrdFldName;
	var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
	wsGetComNoID = callObj.id;
	return OnWSResult(callObj, iRow, argComNo);
}

//若檔號滿的,檢查是否已存在於DB
function fnCheckDocFileNoIsExist(iRow)
{
	//1060503	Kevin_C	1050087	升二代
	//var strFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText;
	var strFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent;
	if (!fnShortOfFileNoCheck2(strFileNo))
		return true;//若檔號未滿,不進行以下檢查

	var strSource = document.all["H_Source"].value;
	var argFileNo = strFileNo.split('-');

	if (!fnCheckDuplicateFileNo(iRow))
		return false;
	
	var arKeyName = new Array(6);
	arKeyName[0]    = "SOURCE_ORGNO";
	arKeyName[1]    = "FILE_YEAR";
	arKeyName[2]    = "FILE_CLS";
	arKeyName[3]    = "FILE_CASE";
	arKeyName[4]    = "FILE_VOL";
	arKeyName[5]    = "FILE_SEQ";
	var arKeyValue = new Array(6);
	arKeyValue[0]	= strSource;
	arKeyValue[1]	= argFileNo[0];
	arKeyValue[2]	= argFileNo[1];
	arKeyValue[3]	= argFileNo[2];
	arKeyValue[4]	= argFileNo[3];
	arKeyValue[5]	= argFileNo[4];
	var arRtnFldName = new Array(2);
	arRtnFldName[0] = "DOC_NO";
	arRtnFldName[1] = "COM_NO";
	var arOrdFldName = new Array("DOC_NO");

	var argWSParam = new Array(5);
	argWSParam[0] = "DOC_MAIN";
	argWSParam[1] = arKeyName;
	argWSParam[2] = arKeyValue;
	argWSParam[3] = arRtnFldName;
	argWSParam[4] = arOrdFldName;
	var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
	wsGetFileNoID = callObj.id;
	return OnWSResult(callObj, iRow);
}

/*****************************************************************************
*
*	小 函 式 區
* 
*****************************************************************************/
function CleanForm()
{
	document.all["txDocNo"].value		= "";
	//1060503	Kevin_C	1050087	升二代
	//document.all["txComNo"].innerText	= "";
	document.all["txComNo"].value	= "";
	document.all["cbIsCom"].checked		= false;
	//1060503	Kevin_C	1050087	升二代
	//document.all["lbSecNm"].innerText	= "";
	document.all["lbSecNm"].textContent	= "";
	document.all["txSecSeq"].value		= "";
	document.all["txFileYear"].value	= "";
	document.all["txFileCls"].value		= "";
	document.all["txFileCase"].value	= "";
	document.all["txFileVol"].value		= "";
	document.all["txFileSeq"].value		= "";
	document.all["H_DocType"].value		= "";
	document.all["H_CrtDate"].value		= "";
	document.all["H_ClsKey"].value		= "";
	document.all["H_CaseKey"].value		= "";
}

function IsDocNoExist(strDocNo)
{
	if (document.all.dg1 == null)
		return false;
	if (document.all.dg1.rows.length == 0)
		return false;
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1060503	Kevin_C	1050087	升二代
		//if (document.all["dg1__ctl"+iRow+"_hlDocNo"].innerText == strDocNo)
		if (document.all["dg1__ctl"+iRow+"_hlDocNo"].textContent == strDocNo)
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+strDocNo+"已存在於捲動區中，不允許再加入"])),"");
			return true;
		}
	}
	return false;
}

//用value取出DropDownList的text
function GetDropDownListTextByValue(argObjId, argValue)
{
	for (var iArr=0;iArr<document.all[argObjId].options.length;iArr++)
	{
		if (document.all[argObjId].options[iArr].value == argValue)
            //1070709 Zen 1070678 弱掃XSS修正
            //return document.all[argObjId].options[iArr].text;
            return HtmlEncode(document.all[argObjId].options[iArr].text);
	}
	return "";
}

function fnIsComNoText(comValue)
{
	if (comValue == "1")
		return "是";
	return "否";
}

function fnIsComNoValue(comValue)
{
	if (comValue == "是")
		return "1";
	return "0";
}

function GetFileNo1(argObj)
{
	if (argObj.FileSeq != "")
		return argObj.FileYear + "-" + argObj.FileCls + "-" + argObj.FileCase + "-" + argObj.FileVol + "-" + argObj.FileSeq;
	else if (argObj.FileVol != "")
		return argObj.FileYear + "-" + argObj.FileCls + "-" + argObj.FileCase + "-" + argObj.FileVol;
	else if (argObj.FileCase != "")
		return argObj.FileYear + "-" + argObj.FileCls + "-" + argObj.FileCase;
	else
		return argObj.FileYear + "-" + argObj.FileCls;
}

function GetFileNo2(argFileNo)
{
	var ret = "";
	var buf = "";
	for (var iArr=0;iArr<argFileNo.length;iArr++)
	{
		ret += buf + argFileNo[iArr];
		buf = "-";
	}
	return ret;
}

//判斷是否為修改文號模式
function CheckModifyMode()
{
	if (document.all["txDocNo"].readOnly == true)
		return true;
	return false;
}

//至少一筆檢查
function CheckDetail()
{
	if (document.all.dg1 == null)
		return false;
	if (document.all.dg1.rows.length <= 1)
		return false;
	return true;
}

//分類號不可空白
function CheckFileCls()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1060503	Kevin_C	1050087	升二代 -S
		//var strFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText;
		//var strDocNo = document.all["dg1__ctl"+iRow+"_hlDocNo"].innerText;
		var strFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent;
		var strDocNo = document.all["dg1__ctl"+iRow+"_hlDocNo"].textContent;
		//1060503	Kevin_C	1050087	升二代 -E
		if (fnIsFileClsEmpty(strFileNo))
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["待編目文號："+strDocNo+"之分類號不可空白"])),"");
			return false;
		}
	}
	return true;
}

//判斷分類號是否空白
function fnIsFileClsEmpty(strFileNo)
{
	if (strFileNo == "")
		return true;
	var argFileNo = strFileNo.split('-');
	if (argFileNo[1] == "")
		return true;
	return false;
}

//判斷傳入的文號是否存在於dg內
function fnIndexOf(argComNo)
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1060503	Kevin_C	1050087	升二代
		//if (document.all["dg1__ctl"+iRow+"_hlDocNo"].innerText == argComNo)
		if (document.all["dg1__ctl"+iRow+"_hlDocNo"].textContent == argComNo)
			return iRow;
	}
	return 0;
}

//判斷檔號完不完整
function fnShortOfFileNoCheck1(argObj)
{
	if (argObj.FileYear == "")
		return false;
	if (argObj.FileCls == "")
		return false;
	if (argObj.FileCase == "")
		return false;
	if (argObj.FileVol == "")
		return false;
	if (argObj.FileSeq == "")
		return false;
	return true;
}

//判斷檔號完不完整
function fnShortOfFileNoCheck2(strFileNo)
{
	if (strFileNo == "")
		return false;
	var argFileNo = strFileNo.split('-');
	if (argFileNo.length != 5)
		return false;
	if (jf_Trim(argFileNo[4]) == "")
		return false;
	return true;
}

//若檔號完整,必須與併案文號相同
function fnIsSameFileNo1(iRow, argObj)
{
	//1060503	Kevin_C	1050087	升二代
	//var strFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText;
	var strFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent;
	if (!fnShortOfFileNoCheck2(strFileNo))
		return true;
	if (strFileNo == GetFileNo1(argObj))//檔號與相關文號相同
		return true;
	return false;
}

//若檔號完整,必須與併案文號相同
function fnIsSameFileNo2(iRow, iSeq)
{
	//1060503	Kevin_C	1050087	升二代
	//var strDocFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText;
	var strDocFileNo = document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent;
	if (!fnShortOfFileNoCheck2(strDocFileNo))
		return true;

	//1060503	Kevin_C	1050087	升二代
	//var strComFileNo = document.all["dg1__ctl"+iSeq+"_lbFileNo"].innerText;
	var strComFileNo = document.all["dg1__ctl"+iSeq+"_lbFileNo"].textContent;
	if (!fnShortOfFileNoCheck2(strComFileNo))
		return true;

	var argDocFileNo = strDocFileNo.split('-');
	var argComFileNo = strComFileNo.split('-');
	if (GetFileNo2(argDocFileNo) == GetFileNo2(argComFileNo))//檔號與相關文號相同
		return true;
	return false;
}

function fnCheckComNo(argComNo, argComComNo)
{
	if (argComComNo == "")//相關文號未併件
		return true;
	if (argComNo == argComComNo)//相關文號屬於母文
		return true;
	return false;
}

function CheckSameFileCls1(strDocFileNo, strDocCrtDate, strComFileNo, strComCrtDate)
{
	var argDocFileNo = strDocFileNo.split('-');
	var argComFileNo = strComFileNo.split('-');

	if (argDocFileNo[0] == "")
		argDocFileNo[0] = fnGetYear(strDocCrtDate);
	if (argComFileNo[0] == "")
		argComFileNo[0] = fnGetYear(strComCrtDate);

	if (argDocFileNo[0] == argComFileNo[0] && argDocFileNo[1] == argComFileNo[1])
		return "";

	var tag = "";
	var buf = "";
	if (argDocFileNo[0] != argComFileNo[0])
	{
		tag += buf + "年度號";
		buf = "、";
	}
	if (argDocFileNo[1] != argComFileNo[1])
	{
		tag += buf + "分類號";
		buf = "、";
	}
	return tag;
}

function CheckSameFileCls2(strDocFileNo, strDocCrtDate, argObj)
{
	var argDocFileNo = strDocFileNo.split('-');
	if (argDocFileNo[0] == "")
		argDocFileNo[0] = fnGetYear(strDocCrtDate);

	if (argDocFileNo[0] == argObj.FileYear && argDocFileNo[1] == argObj.FileCls)
		return "";

	var tag = "";
	var buf = "";
	if (argDocFileNo[0] != argObj.FileYear)
	{
		tag += buf + "年度號";
		buf = "、";
	}
	if (argDocFileNo[1] != argObj.FileCls)
	{
		tag += buf + "分類號";
		buf = "、";
	}
	return tag;
}

function fnCheckDuplicateFileNo(iRow)
{
	for (var iArr=2;iArr<document.all.dg1.rows.length+1;iArr++)
	{
		if (iArr == iRow)
			continue;
		//1060503	Kevin_C	1050087	升二代
		//if (document.all["dg1__ctl"+iArr+"_lbFileNo"].innerText == document.all["dg1__ctl"+iRow+"_lbFileNo"].innerText)
		if (document.all["dg1__ctl"+iArr+"_lbFileNo"].textContent == document.all["dg1__ctl"+iRow+"_lbFileNo"].textContent)
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(iRow-1)+"之檔號與序"+(iArr-1)+"之檔號相同，未併件無法進行編目"])),"");
			return false;
		}
	}
	return true;
}

function fnGetYear(argYear)
{
	if (argYear == "")
		return "";
	if (argYear.length >= 3)
		return argYear.substring(0, 3);
	return argYear;
}

function fnSetTextBoxReadWrite(elementId)
{
	document.all[elementId].className = "InputFieldText";
	document.all[elementId].readOnly = false;
	document.all[elementId].disabled = false;//disabled=true會導致server看不到value
}

function fnSetTextBoxReadOnly(elementId)
{
	document.all[elementId].className = "DisplayOnly";
	document.all[elementId].readOnly = true;
	document.all[elementId].style.color = "Navy";
	document.all[elementId].disabled = true;//避免觸發onclick事件
}

function fnCheckDocState1(argDocState)
{
	if (argDocState == "")
		return false;
	if (Number(argDocState) < 20)//20:點收
		return false;
	return true;
}

function fnCheckDocState2(argDocState)
{
	if (argDocState == "")
		return false;
	if (Number(argDocState) > 27)//30:已銷毀
		return false;
	return true;
}

function fnGetStatusName(argDocState)
{
	switch (argDocState)
	{
		case "30":
		default:
			return "已銷毀";
		case "35":
			return "提供文史機關使用";
		case "40":
			return "已移轉";
		case "50":
			return "已移交";
		case "90":
			return "待刪除";
	}
}

function GetClsCaseStr(argObj)
{
	return argObj.ClsKey + "-" + argObj.CaseKey;
}

function ShowLastInsertValue(argObj)
{
	document.all["dvNewValue"].innerHTML = "公文文號："		+ argObj.DocNo						+ "；";
	document.all["dvNewValue"].innerHTML += "相關文號："	+ argObj.ComNo						+ "；";
	document.all["dvNewValue"].innerHTML += "併件："		+ fnIsComNoText(argObj.ComStatus)	+ "<BR>";
	document.all["dvNewValue"].innerHTML += "密等："		+ argObj.SecNm						+ "；";
	document.all["dvNewValue"].innerHTML += "檔號："		+ GetFileNo1(argObj);
}

//96.02.05 960016 David
//批次編目檔號設定功能
function fnBtAccess()
{
	var DgSize = document.all["dg1"].rows.length;
	var ClsKey = document.all["H_ClsKey"].value;
	var CaseKey = document.all["H_CaseKey"].value;
	var ClsCaseKey = ClsKey+"-"+CaseKey;
	var Year = document.all["txFileYear"].value;
	var Cls = document.all["txFileCls"].value;
	var Case = document.all["txFileCase"].value;
	var Vol = document.all["txFileVol"].value;
	var Seq = document.all["txFileSeq"].value;
	
	//設定前檢核
	var iCheckCnt = 0;
	for(var i=0;i<DgSize-1;i++)
	{
		var isCheck = document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked;
		if(isCheck)
			iCheckCnt++;
	}
	if(iCheckCnt == 0)
	{
		alert("請選擇至少一筆資料");
		return;
	}
	if(jf_Trim(Year) == "" && jf_Trim(Cls) == "" && jf_Trim(Case) == "" && jf_Trim(Vol) == "" && jf_Trim(Seq) == "")
	{
		alert("欲設定之檔號內容不可皆為空白");
		//1060503	Kevin_C	1050087	升二代
		//document.all["txFileYear"].focus();
		$('txFileYear').focus();
		return;
	}
	else if(jf_Trim(Year) == "")
	{
		alert("欲設定之年度號不可為空白");
		//1060503	Kevin_C	1050087	升二代
		//document.all["txFileYear"].focus();
		$('txFileYear').focus();
		return;
	}
	else if(jf_Trim(Cls) == "")
	{
		alert("欲設定之分類號不可為空白");
		//1060503	Kevin_C	1050087	升二代
		//document.all["txFileCls"].focus();
		$('txFileCls').focus();
		return;
	}
	//[001054]Add by Cola 若該份公文已有編目日期, 則不允許將部份檔號清空 -- start --
	var tmpdata = "";
	for(var i=0;i<DgSize-1;i++)
	{
		if(document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked)
		{
			//1021108	Eileen	1020886	新增判斷是否為台科大，若目前使用機關為台科大，則不判斷「是否有編目日期」
			//1060503	Kevin_C	1050087	升二代 -S
			////if(document.all["dg1__ctl"+(i+2)+"_lbInpFileDate"].innerText != "")
			//if( ( document.all["dg1__ctl"+(i+2)+"_lbInpFileDate"].innerText != "" ) && document.all.H_OrgNickName.value != "NTUST" )
			if(document.all["dg1__ctl"+(i+2)+"_lbInpFileDate"].textContent != "")
			if( ( document.all["dg1__ctl"+(i+2)+"_lbInpFileDate"].textContent != "" ) && document.all.H_OrgNickName.value != "NTUST" )
			//1060503	Kevin_C	1050087	升二代 -E
			{
				if(jf_Trim(Year) == "" || jf_Trim(Cls) == "" || jf_Trim(Case) == "" || jf_Trim(Vol) == "" || jf_Trim(Seq) == "")
					//1060503	Kevin_C	1050087	升二代
					//tmpdata += "公文文號："+document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText+"因已有編目日期，不允許再將部份檔號清空。\n";
					tmpdata += "公文文號："+document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent+"因已有編目日期，不允許再將部份檔號清空。\n";
			}
				
		}
	}
	if (tmpdata !="")
	{
		tmpdata += "請先將檔號修正為完整檔號後，或將有編目日期之公文設定為不勾選，再進行套用。";
		alert(tmpdata);
		return;
	}
	//Cola -- end --
	
	
	//取得DG中併案文號於Arr
	var ComArr = new Array();
	var isExist = false;
	var Index = 0;
	for(var i=0;i<DgSize-1;i++)
	{
		if(document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked)
		{
			//1060503	Kevin_C	1050087	升二代
			//var ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].innerText;
			var ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].textContent;
			for(var j=0;j<ComArr.length;j++)
			{
				if(ComArr[j] == ComNo)
				{
					isExist = true;
					break;
				}
			}
			if(!isExist && jf_Trim(ComNo)!= "")
			{	
				ComArr[Index] = ComNo;
				Index++;
				isExist = false;
			}
			else if(Index == 0 && jf_Trim(ComNo)!= "" && ComNo != null)
			{
				ComArr[Index] = ComNo;
				Index++;
				isExist = false;
			}
		}
	}
	ComArr.sort();
	
	//套用前檢核
	if(ComArr.length >= 2)
	{
		if(jf_Trim(Year) != "" && jf_Trim(Cls)!="" && jf_Trim(Case)!="" && jf_Trim(Vol)!="" && jf_Trim(Seq)!="")
		{		
			alert("不同參照文號不可套用相同檔號");
			return;
		}
	}
	else
	{
		for(var i=0;i<DgSize-1;i++)
		{
			//1060503	Kevin_C	1050087	升二代
			//var ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].innerText;
			var ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].textContent;
			if(jf_Trim(ComNo) != ComArr[0])
			{
				if(jf_Trim(Year) != "" && jf_Trim(Cls)!="" && jf_Trim(Case)!="" && jf_Trim(Vol)!="" && jf_Trim(Seq)!="")
				{		
					if(document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked)
					{
						alert("序"+(i+1)+",非併案文號不可與併案文號套用相同檔號");
						return;
					}
				}
			}
		}
	}
	
	//設定ClsKey、CaseKey值
	for(var i=0;i<DgSize-1;i++)
	{
		var isCheck = document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked;
		if(isCheck)
		{
			//1060503	Kevin_C	1050087	升二代 -S
			//document.all["dg1__ctl"+(i+2)+"_lbClsCaseKey"].innerText = ClsCaseKey;	//Key值
			//document.all["dg1__ctl"+(i+2)+"_lbFileNo"].innerText = 
			document.all["dg1__ctl"+(i+2)+"_lbClsCaseKey"].textContent = ClsCaseKey;	Key值
			document.all["dg1__ctl"+(i+2)+"_lbFileNo"].textContent = 
			//1060503	Kevin_C	1050087	升二代 -E
				Year+"-"+Cls+"-"+Case+"-"+Vol+"-"+Seq;
		}
	}
}

//1070709 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}