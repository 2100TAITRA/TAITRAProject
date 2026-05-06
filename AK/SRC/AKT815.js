/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.12.22	David	951353	職訓局 - 新增BorFlag欄位
 * 2013.06.13	Cloud	1020442	因原程式撰寫方式易被攻擊，修改將資料列放入DATAGRID方式
 * 2016.04.24	Kenny	1050087 二代公文系統相關修改
 * 1051019      Joe		1050087		二代修正配合行動平台
 * 1070709      Zen     1070678 弱掃XSS修正
 * 1071017      Zen     1070678 弱掃Client Potential XSS修正
 * 1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文、調整顯示的錯誤訊息
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050624	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050624	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
//alert("event.srcElement.id="+event.srcElement.id);
//alert("document.activeElement.id="+document.activeElement.id);
//alert("xObjectName="+xObjectName);
	switch (xObjectName)
	{
		case "btCleanDg"://清除
			Page_BlockSubmit = true;
			if (document.all["dg1"] != null)
			{
				//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
				//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
				for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
				{
					if (document.all["dg1__ctl"+iRow+"_cb1"].checked == true)
						document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
				}
			}
			break;
		case "btAll"://全選
			Page_BlockSubmit = true;
			if (document.all["dg1"] != null)
			{
				//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
				//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
				for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
				{
					if (document.all["dg1__ctl"+iRow+"_cb1"].checked == false)
						document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
				}
			}
			break;
		case "btChange"://反向
			Page_BlockSubmit = true;
			if (document.all["dg1"] != null)
			{
				//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
				//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
				for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
				{
					if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
						document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
					else
						document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
				}
			}
			break;
		case "btConfirm"://確定
			Page_BlockSubmit = true;
			/*justin 0930819 修改：onblur()已做完新增功能，故在按下確定不再重複執行*/
			if (document.all["txDocNo"].value == "")
			{
				//1050624	Kenny	[1050087]   二代公文系統相關修改
				//document.all["txDocNo"].focus();
				$('#txDocNo').focus();
				jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["公文文號"])),"");
			}
			else
			{
				/*
				if (CheckType())
					UpdateRow();
				document.all["txDocNo"].value = "";
				*/
				DocNo_Onblur(); //改成DocNo_Onblur統一處理 #2007.04.02 Andy
			}
			break;
		case "btQuit"://取消
			Page_BlockSubmit = true;
			var strSysDate = document.all["H_Date"].value;
			document.all["rbRet"].checked = true;
			rb_OnClick("rbRet");
			document.all["txDocNo"].value= "";
			document.all["txDate"].value = strSysDate;
			break;
		//若focus在文號欄位按下toolbar會導致xObjectName=txDocNo
		case "txDocNo":
			Page_BlockSubmit = true;
			break;
	}	
}
//1050624	Kenny	[1050087]   二代公文系統相關修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050624	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	bUserExit = false;
	
	switch (xObjectName)
	{
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var strSysDate = document.all["H_Date"].value;
			jf_ConfirmClean();
			document.all["rbRet"].checked = true;
			rb_OnClick("rbRet");
			document.all["txDate"].value = strSysDate;
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//1050624	Kenny	[1050087]   二代公文系統相關修改，移除無用code
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, null);
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//儲存後恢復預設狀態
	if (document.all["H_Save"].value != "")
	{
		document.all["rbRet"].checked= true;
		document.all["H_Save"].value = ""
	}
	
	if (document.all["rbRet"].checked)
		rb_OnClick("rbRet");
	else
		rb_OnClick("rbBor");
}

function OnWSResult(argResult)
{
    if (argResult.id == wsBorTranID)
    {
		if (!argResult.value.ErrorClass.IsErr)
		{
			var strBorNo = argResult.value.RtnField0[0];
			var strSeqNo = argResult.value.RtnField1[0];
			//用BOR_NO.SEQ_NO向BORROW_DETAIL檢查
			CheckBorDetail(strBorNo,strSeqNo);
		}
		else
		{
			//1140717      Andy    1140954  調整顯示的錯誤訊息
			//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文原件未被借出，無法執行歸還或展期"])),"");
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["該公文無法執行歸還或展期：" + argResult.value.ErrorClass.ErrMessage])), "");
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
		}
	}
	else if (argResult.id == wsBorDeatilID)
	{
		//是否已歸還
		if (!argResult.value.ErrorClass.IsErr)
		{
			var strBorRange= argResult.value.RtnField0[0];
			var strDocNm   = argResult.value.RtnField1[0];
			var strBorNo   = argResult.value.RtnField2[0];
			var strSeqNo   = argResult.value.RtnField3[0];
			var strDocNo   = argResult.value.RtnField4[0];
			var strBorDate = argResult.value.RtnField5[0];
			var strDueDate = argResult.value.RtnField6[0];
			var strBorCnt  = argResult.value.RtnField7[0];
			
			//95.12.22 951353 David
			var strBorFlag  = argResult.value.RtnField8[0];
			
			var strErrMSg;

			//是否為單文借出
			if ((strBorRange == "1") || (strBorRange == "0"))
			{
				//是否解出數量為1
				if (strDocNm == "1")
				{
					//第二階段檢查
					if (CheckType())
					{
						//95.09.20 David 展期次數達三次不予新增
						if(CheckBotTimes(strBorCnt))
						{
							handleRow(strSeqNo,strDocNo,strBorNo,strBorDate,strDueDate,strBorCnt,strBorFlag);
							//paul 為了方便可以繼續刷下一筆,所以必需把FOCUS再移向txDocNo上
							document.all["txDocNo"].value="";
							//1050624	Kenny	[1050087]   二代公文系統相關修改
							//document.all["txDocNo"].focus();
							$('#txDocNo').focus();
						}
					}
				}
				else
				{
					strErrMsg = "該筆公文屬於調案單號："+strBorNo+"，單序："+strSeqNo+"的調案資料，\n"
							+   "因該筆資料與併件公文一起借出，無法在本程式執行歸還或展期。\n"
							+   "請執行AKT810 調案歸還及展期作業。";
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
					//1050624	Kenny	[1050087]   二代公文系統相關修改
					//document.all["txDocNo"].focus();
					$('#txDocNo').focus();
				}
			}
			else if (strBorRange == "2")
			{
				strErrMsg = "該筆公文屬於調案單號："+strBorNo+"，單序："+strSeqNo+"的調案資料，\n"
						+   "因該筆資料調案範圍為整卷，無法在本程式執行歸還或展期。\n"
						+   "請執行AKT810 調案歸還及展期作業。";
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
				//1050624	Kenny	[1050087]   二代公文系統相關修改
				//document.all["txDocNo"].focus();
				$('#txDocNo').focus();
			}
			else if (strBorRange == "3")
			{
				strErrMSg = "該筆公文屬於調案單號："+strBorNo+"，單序："+strSeqNo+"的調案資料，\n"
						+   "因該筆資料調案範圍為整案，無法在本程式執行歸還或展期。\n"
						+   "請執行AKT810 調案歸還及展期作業。";
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMSg])),"");
				//1050624	Kenny	[1050087]   二代公文系統相關修改
				//document.all["txDocNo"].focus();
				$('#txDocNo').focus();
			}
		}
		else
		{
			//1140717      Andy    1140954  調整顯示的錯誤訊息
			//strErrMSg = "公文原件未被借出，無法執行歸還或展期";
			strErrMSg = "該公文無法執行歸還或展期：" + argResult.value.ErrorClass.ErrMessage;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMSg])),"");
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
		}
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050624	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//############################################################################################
//								ButtonClick		function
//############################################################################################
//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	
	if (document.all["dg1"] == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要有一筆資料"])),"");
		return bRtnbool;
	}
		
	//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
	//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl" + iRow + "_cb1"].checked == false)
		{
			bRtnbool = true;
			break;
		}
	}
	if (bRtnbool)
		SaveHiddenValue();
	else
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要有一筆資料沒有勾選取消"])),"");
	}
	return bRtnbool;
}

//同步化處理
function SaveHiddenValue()
{
	var str1 = ":";
	var str2 = "|";
	var strBuffer = "";
	var strValue = "";
	var strBorNo;
	var strSeqNo;
	var strDocNo;
	var strType;
	var strDesc;
	
	//95.12.22 951353 David
	var strBorFlag;
	
	//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
	//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl" + iRow + "_cb1"].checked == false)
		{
			//1050624	Kenny	[1050087]   二代公文系統相關修改--Start--
			//strBorNo= document.all["dg1__ctl" + iRow + "_lbBorNo"].innerText;
			//strSeqNo= document.all["dg1__ctl" + iRow + "_H_Seq"].innerText;
			//strDocNo= document.all["dg1__ctl" + iRow + "_hlDocNo"].innerText;
			//strType = document.all["dg1__ctl" + iRow + "_lbType"].innerText;
			//strDesc = document.all["dg1__ctl" + iRow + "_lbBorDesc"].innerText;
			strBorNo= document.all["dg1__ctl" + iRow + "_lbBorNo"].textContent;
			strSeqNo= document.all["dg1__ctl" + iRow + "_H_Seq"].textContent;
			strDocNo= document.all["dg1__ctl" + iRow + "_hlDocNo"].textContent;
			strType = document.all["dg1__ctl" + iRow + "_lbType"].textContent;
			strDesc = document.all["dg1__ctl" + iRow + "_lbBorDesc"].textContent;
			//1050624	Kenny	[1050087]   二代公文系統相關修改--End--
			
			//95.12.22 951353 David
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//strBorFlag = document.all["dg1__ctl" + iRow + "_lbHBFlag"].innerText;
			strBorFlag = document.all["dg1__ctl" + iRow + "_lbHBFlag"].textContent;
			
			//帶回[調案單號+序+公文文號+異動別+異動說明]
			//95.12.22 951353 David
			//strValue += strBuffer + strBorNo + str1 + strSeqNo + str1 + strDocNo + str1 + strType + str1 + strDesc;
			strValue += strBuffer + strBorNo + str1 + strSeqNo + str1 + strDocNo + str1 + strType + str1 + strDesc + str1 + strBorFlag;
			
			strBuffer = str2;
		}
	}
	
	document.all["H_Value"].value = strValue;
}

//############################################################################################
//								Event		function
//############################################################################################
var wsBorTranID;//宣告webserver回傳值id
function DocNo_Onblur()
{
	//1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文
	//var arKeyName = new Array(2);
	//var arKeyValue = new Array(2);
	var arKeyName = new Array(3);
	var arKeyValue = new Array(3);
	var arRtnFldName = new Array(2);
	var arOrdFldName = new Array(1);
	var strDocNo = jf_Trim(document.all["txDocNo"].value);

	if (!IsServerHandling)
	{
		if (strDocNo != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "DOC_NO";
			arKeyName[1]    = "EXEC_TYPE";
			//1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文
			arKeyName[2] = "SOURCE_ORGNO";
			arKeyValue[2] = document.all["nOrgID"].value
			arKeyValue[0]   = strDocNo;
			arKeyValue[1]   = "1";
			arRtnFldName[0] = "BOR_NO";
			arRtnFldName[1] = "SEQ_NO";
			arOrdFldName[0] = "BOR_NO DESC";

			var arWSParam = new Array(5);
			arWSParam[0] = "BORROW_TRAN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsBorTranID = callObj.id;
			OnWSResult(callObj);
		}
	}
}

var wsBorDeatilID;//宣告webserver回傳值id
function CheckBorDetail(argBorNo,argSeqNo)
{
	//1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文
	//var arKeyName = new Array(3);
	//var arKeyValue = new Array(3);
	var arKeyName = new Array(4);
	var arKeyValue = new Array(4);
	//95.12.22 951353 David
	//var arRtnFldName = new Array(8);
	var arRtnFldName = new Array(9);
	
	var arOrdFldName = new Array(2);
	var strDocNo = jf_Trim(document.all["txDocNo"].value);

	arKeyName[0] = "BOR_NO";
	arKeyName[1] = "SEQ_NO";
	arKeyName[2] = "IS_RET";
	//1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文
	arKeyName[3] = "SOURCE_ORGNO";
	arKeyValue[3] = document.all["nOrgID"].value
	arKeyValue[0]= argBorNo;
	arKeyValue[1]= argSeqNo;
	arKeyValue[2]= "0";
	arRtnFldName[0] = "BOR_RANGE";
	arRtnFldName[1] = "DOC_NM";
	arRtnFldName[2] = "BOR_NO";
	arRtnFldName[3] = "SEQ_NO";
	arRtnFldName[4] = "DOC_NO";
	arRtnFldName[5] = "BOR_DATE";
	arRtnFldName[6] = "DUE_DATE";
	arRtnFldName[7] = "REBOR_COUNT";
	
	//95.12.22 951353 David
	arRtnFldName[8] = "BOR_FLAG";
	
	arOrdFldName[0] = "BOR_NO";
	arOrdFldName[1] = "SEQ_NO";

	var arWSParam = new Array(5);
	arWSParam[0] = "BORROW_DETAIL";
	arWSParam[1] = arKeyName;
	arWSParam[2] = arKeyValue;
	arWSParam[3] = arRtnFldName;
	arWSParam[4] = arOrdFldName;
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
	wsBorDeatilID = callObj.id;
	OnWSResult(callObj);
}

/*
//DocNo onblur第二階段檢查
function CheckType()
{
	var bRtn = false;
	var strErrMsg = "";
	var strDate = document.all["txDate"].value;
	
	var strEntryDate = document.all["lbDate"].value;	//歸還/展期日期	David 95.09.14
	if (document.all["rbRet"].checked)
	{
		//David 95.09.14
		if(strEntryDate == "")
		{	
			strErrMsg = "歸還日期";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
		}
		//David 95.09.14
		if(document.all["dlKeepNo"].selectedIndex == "0")
		{
			strErrMsg = "保存狀況";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
		}
		//若為空白則帶入系統日
		if (strDate == "")
			document.all["txDate"].value = document.all["H_Date"].value;
		bRtn = true;
	}
	else if (document.all["rbBor"].checked)
	{
		//David 95.09.14
		if(strEntryDate == "")
		{	
			strErrMsg = "展期日期";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
		}
		if(document.all["txDesc"].value == "")
		{
			strErrMsg = "展期原因說明";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");			
		}
		//若為空白則帶入系統日
		if (strDate == "")
			document.all["txDate"].value = document.all["H_Date"].value;
		
		if (document.all["dlReason"].selectedIndex == 0)
		{
			strErrMsg = "展期原因";
			//document.all["txDocNo"].value = "";
			document.all["dlReason"].focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
		}
		else
			bRtn = true;
	}
	return bRtn;
}
*/
//Function重寫 #2007.04.02 Andy
//DocNo onblur第二階段檢查
function CheckType()
{
	var bRtn = false;
	var strErrMsg = "";
	var strDate = document.all["txDate"].value;
	
	if (document.all["rbRet"].checked)
	{
		//若為空白則帶入系統日
		if (strDate == "")
			document.all["txDate"].value = document.all["H_Date"].value;
			
		if(document.all["dlKeepNo"].selectedIndex == "0")
		{
			strErrMsg += "保存狀況";
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlKeepNo"].focus();
			$('#dlKeepNo').focus();
		}
			
		if(strErrMsg != "")
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
			bRtn = false;
		}
		else
			bRtn = true;
	}
	else if (document.all["rbBor"].checked)
	{
		//若為空白則帶入系統日
		if (strDate == "")
			document.all["txDate"].value = document.all["H_Date"].value;
			
		if (document.all["dlReason"].selectedIndex == 0)
		{
			strErrMsg += "展期原因";
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlReason"].focus();
			$('#dlReason').focus();
		}
		
		if(document.all["txDesc"].value == "")
		{
			if(strErrMsg != "")
				strErrMsg += "、";
			strErrMsg += "原因說明";
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txDesc"].focus();
			$('#txDesc').focus();
		}
		
		if(strErrMsg != "")
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
			bRtn = false;
		}
		else
			bRtn = true;
	}
	return bRtn;
}

//若dg已有該筆公文文號則用Update,否則用Insert
function handleRow(argSeqNo,argDocNo,argBorNo,argBorDate,argDueDate,argBorCnt,argBorFlag)
{
	var strDate;
	var strType="";
	var strBorDesc="";
	
    //1071017 Zen 1070678 弱掃Client Potential XSS修正
	//strDate = document.all["txDate"].value;
	strDate = HtmlEncode(document.all["txDate"].value);
	if (document.all["rbRet"].checked)
	{
		strType = "歸還";
		strBorDesc = "歸還日期：" + GetFormat(strDate) + "，保存狀況：" + GetKeepState();
	}
	else if (document.all["rbBor"].checked)
	{
		strType = "展期";
	    //1070709 Zen 1070678 弱掃XSS修正
	    //var index = document.all["dlReason"].selectedIndex;
		var index = HtmlEncode(document.all["dlReason"].selectedIndex);
		strBorDesc = "展期日期：" + GetFormat(strDate) + "，\n"
					+"應歸日期：" + GetFormat(argDueDate) + "，\n"
                    //1070709 Zen 1070678 弱掃Path Traversal修正--begin
                    //+ "展期原因：" + document.all["dlReason"].options[index].text + ","
								  //+ document.all["txDesc"].value;
                    + "展期原因：" + HtmlEncode(document.all["dlReason"].options[index].text) + ","
								  + HtmlEncode(document.all["txDesc"].value);
	                //1070709 Zen 1070678 弱掃Path Traversal修正--end
	}
	if (argBorCnt == "")
		argBorCnt = "0";
	
	if (!CheckDocNoExist(argDocNo))
		InsertRow(argSeqNo,argDocNo,argBorNo,argBorDate,argDueDate,argBorCnt,strType,strBorDesc,argBorFlag);
	else
		UpdateRow();
		
	//做完處理後清空公文文號
	document.all["txDocNo"].value = "";
}

//新增一筆row
//95.12.22 951353 David
//function InsertRow(argSeqNo,argDocNo,argBorNo,argBorDate,argDueDate,argBorCnt,argType,argBorDesc)
function InsertRow(argSeqNo,argDocNo,argBorNo,argBorDate,argDueDate,argBorCnt,argType,argBorDesc,argBorFlag)
{
	
	var InsertRow;
	var len;
	
	InsertRow = document.all["dg1"].insertRow();
	len = document.all["dg1"].rows.length;	//先Insert so長度已+1

	//ID不整除==雙數序
	if (len % 2==1)
		InsertRow.style.backgroundColor = "#F7F7DE";
	//置中
	//1050624	Kenny	[1050087]   二代公文系統相關修改；移除欄位靠左靠右屬性
	//InsertRow.style.textAlign = "Center";
	
	//取消
	var cb1 = document.createElement("input");
	cb1.setAttribute("type","checkbox");
	cb1.setAttribute("id","dg1__ctl"+len+"_cb1");
	InsertRow.insertCell(0).appendChild(cb1);
	//1050624	Kenny	[1050087]   二代公文系統相關修改；調整為不設定checkbox寬度不然會長胖
	//cb1.style.width = "20px";
	
	//序
	var lbSeq = document.createElement("span");
	lbSeq.setAttribute("id","dg1__ctl"+len+"_lbSeq");
	//1050624	Kenny	[1050087]   二代公文系統相關修改；因已無法用設定名稱為innerText的屬性設定顯示文字，改以JQuery語法設定
	//lbSeq.setAttribute("innerText",len);
	$(lbSeq).text(len-1);  // 因標頭關係，真正序號為dataGrid行數-1
	InsertRow.insertCell(1).appendChild(lbSeq);
	lbSeq.style.width = "15px";
	
	//隱藏序(hide)
	var lbHSeq = document.createElement("span");
	lbHSeq.setAttribute("id","dg1__ctl"+len+"_H_Seq");
	//1050624	Kenny	[1050087]   二代公文系統相關修改；因已無法用設定名稱為innerText的屬性設定顯示文字，改以JQuery語法設定
	//lbHSeq.setAttribute("innerText",argSeqNo);
	$(lbHSeq).text(argSeqNo);
	//lbHSeq.setAttribute("className","hide");
	InsertRow.cells[1].appendChild(lbHSeq);
	lbHSeq.className = "hide";
	
	//95.12.22 951353 David
	//隱藏BOR_FLAG
	var lbHBFlag = document.createElement("span");
	lbHBFlag.setAttribute("id","dg1__ctl"+len+"_lbHBFlag");
	//1050624	Kenny	[1050087]   二代公文系統相關修改；因已無法用設定名稱為innerText的屬性設定顯示文字，改以JQuery語法設定
	//lbHBFlag.setAttribute("innerText",argBorFlag);
	$(lbHBFlag).text(argBorFlag);
	//lbHSeq.setAttribute("className","hide");
	InsertRow.cells[1].appendChild(lbHBFlag);
	lbHBFlag.className = "hide";
	// 2013.06.13	Cloud	1020442	因原程式撰寫方式易被攻擊，修改將資料列放入DATAGRID方式-START
	//1050624	Kenny	[1050087]   二代公文系統相關修改；outerHTML為IE ONLY方法，調整為innerHTML且<tr>需配合aspx改為小寫--Start--
	//var oldOutHtml = document.all["dg1"].outerHTML
	//oldOutHtml = oldOutHtml.substring(0,oldOutHtml.lastIndexOf("</TR>"))
	var oldOutHtml = document.all["dg1"].innerHTML;
	oldOutHtml = oldOutHtml.substring(0,oldOutHtml.lastIndexOf("</tr>"));
	//1050624	Kenny	[1050087]   二代公文系統相關修改；outerHTML為IE ONLY方法，調整為innerHTML且<tr>需配合aspx改為小寫--End--
	//公文文號
	/*var hlDocNo = document.createElement("A");
	hlDocNo.setAttribute("id","dg1__ctl"+len+"_hlDocNo");
	hlDocNo.setAttribute("innerText",argDocNo);
	InsertRow.insertCell(2).appendChild(hlDocNo);
	hlDocNo.href = "javascript:ModifyInfo('" + argDocNo + "','" + len + "')";
	hlDocNo.style.width = "60px";
	//調案單號
	var lbBorNo = document.createElement("span");
	lbBorNo.setAttribute("id","dg1__ctl"+len+"_lbBorNo");
	lbBorNo.setAttribute("innerText",argBorNo);
	InsertRow.insertCell(3).appendChild(lbBorNo);
	lbBorNo.style.width = "60px";
	
	//調案日期
	var lbBorDate = document.createElement("span");
	lbBorDate.setAttribute("id","dg1__ctl"+len+"_lbBorDate");
	lbBorDate.setAttribute("innerText",GetFormat(argBorDate));
	InsertRow.insertCell(4).appendChild(lbBorDate);
	lbBorDate.style.width = "50px";
	
	//應歸日期
	var lbDueDate = document.createElement("span");
	lbDueDate.setAttribute("id","dg1__ctl"+len+"_lbDueDate");
	lbDueDate.setAttribute("innerText",GetFormat(argDueDate));
	InsertRow.insertCell(5).appendChild(lbDueDate);
	lbDueDate.style.width = "50px";
	
	//展期次數
	var lbBorCnt = document.createElement("span");
	lbBorCnt.setAttribute("id","dg1__ctl"+len+"_lbBorCnt");
	lbBorCnt.setAttribute("innerText",argBorCnt);
	InsertRow.insertCell(6).appendChild(lbBorCnt);
	lbBorCnt.style.width = "45px";
	
	//異動別
	var lbType = document.createElement("span");
	lbType.setAttribute("id","dg1__ctl"+len+"_lbType");
	lbType.setAttribute("innerText",argType);
	InsertRow.insertCell(7).appendChild(lbType);
	lbType.style.width = "40px";
	
	//異動說明
	var lbBorDesc = document.createElement("span");
	lbBorDesc.setAttribute("id","dg1__ctl"+len+"_lbBorDesc");
	lbBorDesc.setAttribute("innerText",argBorDesc);
	InsertRow.insertCell(8).appendChild(lbBorDesc);
	lbBorDesc.style.width = "220px";
	lbBorDesc.style.textAlign = "left";*/	
	//1100623	Joe		1100789		弱掃修正Client Potential XSS
	// var InserRow =  "<TD><A style='WIDTH: 60px' id= 'dg1__ctl"+len+"_hlDocNo' href='javascript:ModifyInfo(\""+ argDocNo +"\",\""+len+"\")'>"+argDocNo+"</A></TD>";
		// InserRow +=  "<TD><SPAN style='WIDTH: 60px' id=dg1__ctl"+len+"_lbBorNo>"+argBorNo+"</SPAN></TD>";
		// InserRow +=  "<TD><SPAN style='WIDTH: 50px' id=dg1__ctl"+len+"_lbBorDate>"+GetFormat(argBorDate)+"</SPAN></TD>";
		// InserRow +=  "<TD><SPAN style='WIDTH: 50px' id=dg1__ctl"+len+"_lbDueDate>"+GetFormat(argDueDate)+"</SPAN></TD>";
		// InserRow +=  "<TD><SPAN style='WIDTH: 45px' id=dg1__ctl"+len+"_lbBorCnt>"+argBorCnt+"</SPAN></TD>";
		// InserRow +=  "<TD><SPAN style='WIDTH: 40px' id=dg1__ctl"+len+"_lbType>"+argType+"</SPAN></TD>";
		// InserRow +=  "<TD><SPAN style='TEXT-ALIGN: left; WIDTH: 220px' id=dg1__ctl"+len+"_lbBorDesc>"+argBorDesc+"</SPAN></TD>";
	var InserRow =  "<TD><A style='WIDTH: 60px' id= 'dg1__ctl"+len+"_hlDocNo' href='javascript:ModifyInfo(\""+ HtmlEncode(argDocNo) +"\",\""+len+"\")'>"+HtmlEncode(argDocNo)+"</A></TD>";
		InserRow +=  "<TD><SPAN style='WIDTH: 60px' id=dg1__ctl"+len+"_lbBorNo>"+HtmlEncode(argBorNo)+"</SPAN></TD>";
		InserRow +=  "<TD><SPAN style='WIDTH: 50px' id=dg1__ctl"+len+"_lbBorDate>"+HtmlEncode(GetFormat(argBorDate))+"</SPAN></TD>";
		InserRow +=  "<TD><SPAN style='WIDTH: 50px' id=dg1__ctl"+len+"_lbDueDate>"+HtmlEncode(GetFormat(argDueDate))+"</SPAN></TD>";
		InserRow +=  "<TD><SPAN style='WIDTH: 45px' id=dg1__ctl"+len+"_lbBorCnt>"+HtmlEncode(argBorCnt)+"</SPAN></TD>";
		InserRow +=  "<TD><SPAN style='WIDTH: 40px' id=dg1__ctl"+len+"_lbType>"+HtmlEncode(argType)+"</SPAN></TD>";
		InserRow +=  "<TD><SPAN style='TEXT-ALIGN: left; WIDTH: 220px' id=dg1__ctl"+len+"_lbBorDesc>"+HtmlEncode(argBorDesc)+"</SPAN></TD>";
	//1050624	Kenny	[1050087]   二代公文系統相關修改；outerHTML為IE ONLY方法，調整為innerHTML且<tr>需配合aspx改為小寫
	//document.all["dg1"].outerHTML = oldOutHtml+InserRow+"</TR></TBODY></TABLE>";
	document.all["dg1"].innerHTML = oldOutHtml+InserRow+"</tr></TBODY></TABLE>";
	// 2013.06.13	Cloud	1020442	因原程式撰寫方式易被攻擊，修改將資料列放入DATAGRID方式-END	
}

//更新指定的row
function UpdateRow()
{
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	var iSeq;
	var str1;
	var strDate;
	var strType;
	var strBorDesc;
	var strDueDate;

	str1 = "，";
	strDate = document.all["txDate"].value;
	//取出異動的index
	//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
	//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		//1050624	Kenny	[1050087]   二代公文系統相關修改
		//if (document.all["dg1__ctl" + iRow + "_hlDocNo"].innerText == strDocNo)
		if (document.all["dg1__ctl" + iRow + "_hlDocNo"].textContent == strDocNo)
			iSeq = iRow;
	}
	
	if (document.all["rbRet"].checked)
	{
		strType = "歸還";
		//David 95.09.14
		strBorDesc = "歸還日期：" + GetFormat(strDate) + "，保存狀況：" + GetKeepState();
	}
	else if (document.all["rbBor"].checked)
	{
		strType = "展期";
		var index = document.all["dlReason"].selectedIndex;
		//1050624	Kenny	[1050087]   二代公文系統相關修改
		//strDueDate = document.all["dg1__ctl" + iSeq + "_lbDueDate"].innerText;
		strDueDate = document.all["dg1__ctl" + iSeq + "_lbDueDate"].textContent;

		strBorDesc = "展期日期：" + GetFormat(strDate) + "，\n"
					+"應歸日期：" + strDueDate + "，\n"
					+"展期原因：" + document.all["dlReason"].options[index].text + "," 
								  + document.all["txDesc"].value;
	}
	
	if (iSeq != 0)
	{
		//1050624	Kenny	[1050087]   二代公文系統相關修改--Start--
		//document.all["dg1__ctl" + iSeq + "_lbType"].innerText = strType;
		//document.all["dg1__ctl" + iSeq + "_lbBorDesc"].innerText = strBorDesc;
		document.all["dg1__ctl" + iSeq + "_lbType"].textContent = strType;
		document.all["dg1__ctl" + iSeq + "_lbBorDesc"].textContent = strBorDesc;
		//1050624	Kenny	[1050087]   二代公文系統相關修改--End--
	}
}

//將點選的資料帶到上面供使用者修改
function ModifyInfo(argDocNo,argSeq)
{
	var strSplit = "，";
	var strDot = ",";
	var str1 = "：";
	var argInfo;
	var strType;
	var argBor;
	//1050624	Kenny	[1050087]   二代公文系統相關修改--Start--
	//strDesc = document.all["dg1__ctl" + argSeq + "_lbBorDesc"].innerText;
	//strType = document.all["dg1__ctl" + argSeq + "_lbType"].innerText;
	strDesc = document.all["dg1__ctl" + argSeq + "_lbBorDesc"].textContent;
	strType = document.all["dg1__ctl" + argSeq + "_lbType"].textContent;
	//1050624	Kenny	[1050087]   二代公文系統相關修改--End--
	argInfo = strDesc.split(strSplit);
	
	//公文文號
	document.all["txDocNo"].value = argDocNo;
	//異動別
	if (strType == "歸還")
	{
		document.all["rbRet"].checked = true;
		rb_OnClick("rbRet");
	}
	else
	{
		document.all["rbBor"].checked = true;
		rb_OnClick("rbBor");
	}
	//展期/歸還日期
	document.all["txDate"].value = fnGetNumber(argInfo[0]);
	//原因說明
	if (document.all["rbBor"].checked)
	{
		if (argInfo[2] != null)
		{
			argBor = argInfo[2].split(strDot);
			var strReason = argBor[0];
			document.all["dlReason"].selectedIndex = GetIndex(strReason.substring(strReason.indexOf(str1)+1));
			document.all["txDesc"].value = argBor[1];
		}
	}
}

//檢查公文文號是否已存在於dg1中
function CheckDocNoExist(argDocNo)
{
	if (document.all["dg1"] == null)
		return false;
	//1050624	Kenny	[1050087]   二代公文系統相關修改；因標頭為第一個row因此判斷是否無資料時條件調整為1
	//if (document.all["dg1"].rows.length == 0)
	if (document.all["dg1"].rows.length == 1)
		return false;
	
	//1050624	Kenny	[1050087]   二代公文系統相關修改；加入固定標頭(此標頭屬於第一列資料iRow=1)因此逐筆巡行時須從iRow=2開始
	//for (var iRow=1;iRow<document.all["dg1"].rows.length+1;iRow++)
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		//1050624	Kenny	[1050087]   二代公文系統相關修改
		//if (document.all["dg1__ctl" + iRow + "_hlDocNo"].innerText == argDocNo)
		if (document.all["dg1__ctl" + iRow + "_hlDocNo"].textContent == argDocNo)
			return true;
	}
	return false;
}

//取出DropDownList的index
function GetIndex(argValue)
{
	for (var iItem=0;iItem<document.all["dlReason"].options.length;iItem++)
	{
		if (document.all["dlReason"].options[iItem].text == argValue)
			return iItem;
	}
	return 0;
}

function rb_OnClick(srcElementID)
{
	//歸還
	if (srcElementID == "rbRet")
	{
		//1050624	Kenny	[1050087]   二代公文系統相關修改
		//document.all["lbDate"].innerText = "歸還日期：";
		document.all["lbDate"].textContent = "歸還日期：";
		document.all["lbReason"].className = "hide";
		document.all["dlReason"].className = "hide";
		document.all["lbDesc"].className = "hide";
		document.all["txDesc"].className = "hide";
		document.all["dlReason"].value = "";
		document.all["txDesc"].value = "";
		//David 95.09.14
		document.all["dlKeepNo"].className = "";
		document.all["Label3"].className = "";		
	}
	//展期
	else if (srcElementID == "rbBor")
	{
		//1050624	Kenny	[1050087]   二代公文系統相關修改
		//document.all["lbDate"].innerText = "展期日期：";
		document.all["lbDate"].textContent = "展期日期：";
		document.all["lbReason"].className = "";
		document.all["dlReason"].className = "";
		document.all["lbDesc"].className = "";
		document.all["txDesc"].className = "";
		//David 95.09.14
		document.all["dlKeepNo"].className = "hide";
		document.all["Label3"].className = "hide";		
	}
}

//############################################################################################
//					其		他		共		用		function
//############################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}

//取出字串中所有的數字
function fnGetNumber(argStr)
{ 
	var StrLen    = argStr.length;
	var NumStr   = "";
	var returnStr = "";

	for (i = 0; i < StrLen ; i++) 
	{ 
		NumStr = argStr.substring(i,i+1);
		if (fnIsNum(NumStr))
			returnStr = returnStr + NumStr;
	}
	return  returnStr;
}

function fnIsNum(s)
{
	switch (s)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true;
			break;
	}
	return false;	
}

//日期格式轉換
function GetFormat(argDate)
{
	if (argDate.length == 7)
		return argDate.substring(0,3) + "/" + argDate.substring(3,5) + "/" + argDate.substring(5,7);
	return argDate;
}

//David 95.09.14 
function GetKeepState()
{
	var rtnValue = "";
	var SelectIndex = document.all["dlKeepNo"].selectedIndex;
	//var SelectValue = document.all["dlKeepNo"].options[SelectIndex].value;
	//1050624	Kenny	[1050087]   二代公文系統相關修改
	//var SelectValue = document.all["dlKeepNo"].options[SelectIndex].innerText;
	var SelectValue = document.all["dlKeepNo"].options[SelectIndex].textContent;
	return SelectValue;
}

function CheckBotTimes(argBotCnt)
{
	//僅選擇展期才判斷是否已展期三次 #2007.04.02 Andy
	if(document.all["rbBor"].checked)
	{
		if(argBotCnt >= 3)
		{
			alert("本調案單展期次數已達三次，不允許再次展期");
			//1050624	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			return false;
		}
		else
			return true;
	}
	else
		return true;
}

//1070709 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}