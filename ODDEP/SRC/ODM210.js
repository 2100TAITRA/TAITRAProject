/*
DATE		SA		PRG		MGR_NO	DESC
0980305		Stella	Jane	0980130	輸入主要公文號後，系統自動帶出公文主旨於案件名稱
1050418		Cloud	Joe		1050087 二代系統升級
1050520		Cloud	JOE		1050087	二代系統升級，調整focus寫法
1050803		Cloud	Joe		1050087	修改子視窗大小
1110103     Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050418	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050418	Joe	1050087	二代系統升級
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

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
	
	switch (xObjectName)
	{
		/*
		case "btHelp":
			Page_BlockSubmit=true;
			Calendar(document.all["txTDate"],event.screenX,event.screenY);
			break;
		case "btCalc":
			Page_BlockSubmit=true;
			CalcDate();
			break;
			*/
	}	
}

//1050418	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050418	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var strYear = document.all["H_Now"].value;
			jf_ConfirmClean();
			document.all["H_Now"].value=strYear;
			CleanDg();
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txCaseNo"].focus();
			$('#txCaseNo').focus();
			break;
		case "btSearch":
			//1050803	Joe		1050087		開啟子視窗不需POSTBACK
			Page_BlockSubmit = true;
			var strUrl = "";
			var strCaseNo = document.all["txCaseNo"].value;
			strUrl = "ODI210.aspx?rtnObj=lbReturnValue&argCaseNo="+strCaseNo;
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(strUrl, "ODR210", 700, 520 );
			jf_OpenChildWin(strUrl, "ODR210", 800, 600 );
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckBeforePrint();
			//1050418	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId == "ODI210")
	{
		document.all["txCaseNo"].value = document.all.lbReturnValue.options[0].text;
		jf_OpenButtonSubmit();
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	//1050803	Joe	1050087	二代系統升級
	// jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//jf_CallWS("Template/lib/SYS.asmx", "Get_WorkDate", false, null);
	//1050803	Joe	1050087	二代系統升級
	// jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, null);
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		var strDocNo=document.all["txDocNo"].value;
		document.all["txDocNo"].value="";
		if(jf_IsWebServiceSuccess(callObj))
		{
			document.all["txProperty"].value = GetListBoxText("lbProperty",argResult.value.RtnField0[0]);
			document.all["txBType"].value = GetListBoxText("lbBType",argResult.value.RtnField1[0]);
			document.all["txDocNo"].value=strDocNo;
			return true;
		}
		else
		{
			document.all["txDocNo"].value = "";
			document.all["txBType"].value = "";
			document.all["txProperty"].value = "";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			return false;
		}
    }
    else if(argResult.id == wsID)
    {
		if(jf_IsWebServiceSuccess(callObj))
		{
			document.all["txCaseName"].value = argResult.value.RtnField0[0];
			return true;
		}
		else
		{
			document.all["txDocNo"].value = "";
			document.all["txBType"].value = "";
			document.all["txProperty"].value = "";
			document.all["txCaseName"].value = "";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			return false;
		}
    }
    /*
    if (argResult.id == wsGetDateID)
    {
		//檢查執行是否成功
		if(!argResult.error)
			document.all["txTDate"].value = argResult.value;
	}
	*/
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	
		if(DocNo_Onblur())
		{
			if (CheckBeforSave())
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
		}
	
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	/*if (document.all["dlProperty"].selectedIndex == 0)
	{
		strErrMsg = "公文性質不可空白\n" + strErrMsg;
		document.all["dlProperty"].focus();
	}*/
	/*
	if (document.all["txTDate"].value == "")
	{
		strErrMsg = "預計結案日不可空白\n" + strErrMsg;
		document.all["txTDate"].focus();
	}*/
	if (document.all["txDocNo"].value == "")
	{
		strErrMsg = "主要公文號不可空白\n" + strErrMsg;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txDocNo"].focus();
		$('#txDocNo').focus();
	}
	if (document.all["txCaseName"].value == "")
	{
		strErrMsg = "案件名稱不可空白\n" + strErrMsg;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txCaseName"].focus();
		$('#txCaseName').focus();
	}
	if (document.all["txNewDate"].value == "")
	{
		strErrMsg = "立案日期不可空白\n" + strErrMsg;
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txNewDate"].focus();
		$('#txNewDate').focus();
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtnbool;
}
/*
function Calendar(t,x,y)
{
	var sPath = "calendar.htm";
	strFeatures = "dialogWidth=337px;dialogHeight=330px;center=yes;help=no;status=no;dialogLeft="+x+";dialogTop="+y;
	var st = t.value;
	var sDate = "";
	
	sDate = showModalDialog(sPath,st,strFeatures);	//DD/MM/YYYY
	if( typeof(sDate)=="undefined" ) sDate = "";
	st = formatDate(sDate, 0);
	
	if(st!="")	t.value = st;
}

//轉換日期的格式 11/02/2003 --> 0920211
function formatDate(sDate)
{	
	//checkDate
	if(sDate=="")	return "";
	var arrayDate = sDate.split("/");
	iDay = parseInt(arrayDate[0]);
	iMon = parseInt(arrayDate[1]);
	iYea = parseInt(arrayDate[2]) - 1911;
	return jf_PADL(String(iYea),3,"0") + jf_PADL(String(iMon),2,"0") + jf_PADL(String(iDay),2,"0");
}
*/
/*
var wsGetDateID;
function CalcDate()
{
	if (document.all["txCount"].value == "")
	{
		document.all["txCount"].focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["計算天數"])),"");
	}
	else
	{
		var argWSParam = new Array(2);
		
		argWSParam[0] = document.all["H_Now"].value;
		argWSParam[1] = parseInt(document.all["txCount"].value);
		callObj = jf_CallWS("Template/lib/SYS.asmx", "Get_WorkDate", false, argWSParam);
		wsGetDateID = callObj.id;
		OnWSResult(callObj);
	}
}
*/
function CheckBeforePrint()
{
	var bRtn = true;
	return bRtn;
}

var wsDuplicateID;
var wsID;
function DocNo_Onblur()
{
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	var arKeyName   = new Array(1);
	var arKeyValue  = new Array(1);
	var arRtnFldName= new Array(2);
	var arOrdFldName= new Array(1);
	
	if (strDocNo == "")
	{
		document.all["txDocNo"].value = "";
		return true;
	}
	
	arKeyName[0]   = "DOC_NO";
	arKeyValue[0]  = strDocNo;
	arRtnFldName[0]= "DOC_PROPERTY";
	arRtnFldName[1]= "B_TYPE_NO";
	arOrdFldName[0]= "DOC_NO";

	var arWSParam = new Array(5);
	arWSParam[0] = "DOC_EXTRA";
	arWSParam[1] = arKeyName;
	arWSParam[2] = arKeyValue;
	arWSParam[3] = arRtnFldName;
	arWSParam[4] = arOrdFldName;
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
	wsDuplicateID = callObj.id;
	//0980305 輸入主要公文號後，系統自動帶出公文主旨於案件名稱[0980130]-Jane
	if(OnWSResult(callObj))
	{
		var argKeyName   = new Array(1);
		var argKeyValue  = new Array(1);
		var argRtnFldName= new Array(1);
		var argOrdFldName= new Array(1);
		argKeyName[0]   = "DOC_NO";
		argKeyValue[0]  = strDocNo;
		argRtnFldName[0]= "FROM_SUBJECT";
		argOrdFldName[0]= "DOC_NO";
		var argWSParam = new Array(5);
		argWSParam[0] = "DOC_MAIN";
		argWSParam[1] = argKeyName;
		argWSParam[2] = argKeyValue;
		argWSParam[3] = argRtnFldName;
		argWSParam[4] = argOrdFldName;
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, argWSParam);
		wsID = callObj.id;
		if(OnWSResult(callObj))
			return true;
		else
			return false;
		
	}
	else
		return false;
	
	
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function GetListBoxText(argObjID,argObjValue)
{
	var bRtn="";
	if (argObjValue == "")
		return bRtn;
	if (document.all[argObjID] == null)
		return bRtn;
	for (var iList=0;iList<document.all[argObjID].options.length;iList++)
	{
		if (document.all[argObjID].options[iList].value == argObjValue)
		{
			bRtn = document.all[argObjID].options[iList].text;
			break;
		}
	}
	return bRtn;
}

function CleanDg()
{
	for (var RowCount=2 ; RowCount < document.all.dg3.rows.length+1; RowCount++)
	{
		document.all["dg3__ctl"+RowCount+"_lbDocNo"].textContent = "";
		document.all["dg3__ctl"+RowCount+"_lbDate"].textContent = "";
		document.all["dg3__ctl"+RowCount+"_txSubject"].value = "";
	}
	document.all["txBType"].value = "";
	document.all["txProperty"].value = "";
}