/*
 * DATE		PRG		MGR_NO		DESC
 * 1070105   Justin   1050087     二代公文修改
 * 1070830   Justin   1070678     弱掃AJAX修改
 * 1110103	Zen     1101292     修正多次點擊重複PostBack之問題
 */
/*****************************************************************************
*
*   Declaration 區
*
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo","_lbFromSubject");
//1070105 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//宣告目前批號欄位
var WorkBatchID = "";
//1070830 Justin [1070678]弱掃AJAX修改
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1070105 Justin [1050087] 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070105 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    /*1070105 Justin [1050087] 二代公文修改
		case "btCalS":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			break;
		case "btCalE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			break;*/
		case "btBatchNoS":   //送文批號子視窗
			var pUrl = "";
			pUrl = "EDI355.aspx";
			WorkBatchID = "txBatNoS";
			jf_OpenChildWin(pUrl,"EDI355",700,500);
			Page_BlockSubmit = true;
			break;
		case "btBatchNoE":   //送文批號子視窗
			var pUrl = "";
			WorkBatchID = "txBatNoE";
			pUrl = "EDI355.aspx";
			jf_OpenChildWin(pUrl,"EDI355",700,500);
			Page_BlockSubmit = true;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070105 Justin [1050087] 二代公文修改 
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
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1070105 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckBeforeSearch();
		    //1070105 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btBatch":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1070105 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1070105 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforPrint();
		    //1070105 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforPrint();
		    //1070105 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
				if (window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
	//檢核DataGrid是否為空
	if (!CheckDataGrid())
	{
		strErrMsg += "至少勾選一筆資料";
		bRtnbool = false;
	}
	//清空批號
	if(jf_Trim(document.all.txBatNoS.value) != "")
		document.all.txBatNoS.value = "";
	if(jf_Trim(document.all.txBatNoE.value) != "")
		document.all.txBatNoE.value = "";
		
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txBatNoS"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
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
	if(argCallerId == "EDI355")
	{
		document.all[WorkBatchID].value = document.all["lbReturnValue"].options[0].value;
	    //1070105 Justin [1050087] 二代公文修改
        //document.all[WorkBatchID].focus();
		$('#' + WorkBatchID).focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核批號是否為空
function CheckUnEmpty(argFieldNameS,argFieldNameE,argErrMsg)
{
	if(jf_Trim(document.all[argFieldNameS].value) == "" &&  jf_Trim(document.all[argFieldNameE].value) =="")
	{
	    //若批號皆為空時
	    //1070105 Justin [1050087] 二代公文修改
	    //document.all[argFieldNameS].focus();
	    $('#' + argFieldNameS).focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argErrMsg])),"");		
		return false;
	}
	else
	{	//批號(起)為空時
		if(jf_Trim(document.all[argFieldNameS].value) == "")
		{
			if(CheckIsBatchNo(argFieldNameE))
			{
				document.all[argFieldNameS].value = jf_Trim(document.all[argFieldNameE].value) ;
				return true;
			}
			else
				return false;
		}//批號(訖)為空時
		else if (jf_Trim(document.all[argFieldNameE].value) == "")
		{	
			if(CheckIsBatchNo(argFieldNameS))
			{
				document.all[argFieldNameE].value = jf_Trim(document.all[argFieldNameS].value);
				return true;
			}
			else
				return false;
		}//批號皆不為空時
		else
		{
			if(!CheckIsBatchNo(argFieldNameS))
				return false;
			if(!CheckIsBatchNo(argFieldNameE))
				return false;	
		}
	}
	return true;
}
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	if(!CheckUnEmpty("txBatNoS","txBatNoE","批號不可為空白"))
		return false;
	return true;
}

//檢核DataGrid是否有勾選
function CheckDataGrid()
{
	var bRtn = false;
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
		{
			bRtn = true;
			break;
		}
	}
	return bRtn;
}

function jf_CheckBeforeSearch()
{
	var bRtn = true;
	var strSDate	=	jf_Trim(document.all.txDateS.value);
	var strEDate	=	jf_Trim(document.all.txDateE.value);
	var strSTime	=	jf_Trim(document.all.txTimeS.value);
	var strETime	=	jf_Trim(document.all.txTimeE.value);
	
	if( strSDate == "" && strEDate== "" )
	{
		var strErrMsg = "發文日期不可為空白";
		if(strSTime =="" && strETime =="")
		{
			strErrMsg +="\n發文時間不可為空白";
		}
	    //1070105 Justin [1050087] 二代公文修改
		//document.all.txDateS.focus();
		$('#txDateS').focus();
		alert(strErrMsg);
		bRtn = false;
	}
	
	if(!CheckDATE("txDateS","發文日期(起)"))
	{
		document.all.txDateS.value = "";
		bRtn = false;
	}
	if(!CheckDATE("txDateE","發文日期(訖)"))
	{
		document.all.txDateE.value = "";
		bRtn = false;
	}
	
	if (strSDate != "" && strEDate != "")
	{
		try
		{
			var nSDate = parseFloat(jf_Trim(document.all.txDateS.value));
			var nEDate = parseFloat(jf_Trim(document.all.txDateE.value));
			if(nEDate < nSDate)
			{
			    //1070105 Justin [1050087] 二代公文修改
			    //document.all["txDateS"].focus();
			    $('#txDateS').focus();
			    argFieldName
				alert("發文日期(起)值不可大於迄值");
				bRtn = false;
			}
		}
		catch(e)
		{
		    //1070105 Justin [1050087] 二代公文修改
		    //document.all["txDateS"].focus();
		    $('#txDateS').focus();
			alert("發文日期起迄值輸入有誤，僅可輸入數字");
			bRtn = false;
		}
	}
	if(bRtn)
	{
		//清空批號
		document.all.txBatNoS.value ="";
		document.all.txBatNoE.value ="";
		//預設帶入發文時間欄位
		if(strSDate == "")
			document.all.txDateS.value = strEDate;
		if(strEDate == "")
			document.all.txDateE.value = strSDate;
		if(jf_Trim(document.all.txTimeS.value) =="")
			document.all.txTimeS.value = "0600";
		else
			document.all.txTimeS.value =jf_PADL(document.all.txTimeS.value,4,'0');
		if(jf_Trim(document.all.txTimeE.value) =="")
			document.all.txTimeE.value = "2200";
		else
			document.all.txTimeE.value = jf_PADL(document.all.txTimeE.value,4,'0');
	}
	return bRtn;
}

function CheckIsBatchNo (argFieldName)
{
	if(jf_Trim(document.all[argFieldName].value) =="")
		return;
	var ErrMsg ="該筆批號非您所屬單位之送文批號，請重新輸入";
	//取得使用者資訊
	var strOrgNo = document.all.hOrgNo.value;
	var strUserId = document.all.hUserId.value;
	var strOuID = document.all.hOuId.value;
	//檢核批號(訖)
    //1070830 Justin [1070678]弱掃AJAX修改
	//var strBatchNo = EDR355.CheckBatchNo(strOrgNo, document.all[argFieldName].value, strUserId, strOuID).value;
	var strBatchNo = ED3.EDR355.CheckBatchNo(strOrgNo, document.all[argFieldName].value, strUserId, strOuID).value;
	
	if(strBatchNo == "")
	{
	    document.all[argFieldName].value = "";
	    //1070105 Justin [1050087] 二代公文修改
	    //document.all[argFieldName].focus();
	    $('#' + argFieldName).focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
		return false;
	}
	return true;	
}
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
		    //1070105 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}